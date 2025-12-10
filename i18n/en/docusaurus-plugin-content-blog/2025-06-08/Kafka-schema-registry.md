---
title: "Kafka schema registry"
date: 2025-06-08T15:51
tags: [kafka, schema]
description: This article explains how to manage Kafka schemas using a schema registry.
authors: haril
---

:::info[Sample code]

[GitHub - songkg7/kafka-schema-registry-demo](https://github.com/songkg7/kafka-schema-registry-demo)

:::

## Problems

- When the message specification changes, DTO updates are required for each dependent module or Git Repository.
    - Backward or forward compatibility is often broken.
    - The complexity of DTO management increases linearly.
    - Java has many inconveniences, especially when dealing with JSON-based messages.
- Kafka transmits messages in `ByteArray` format, but it is recommended to deserialize and manage them at the application level.
    - The process of serializing data into `ByteArray` every time it is put into a payload, and the reverse process, occurs every time.
    - Increased code complexity.
    - ByteArray - JSON - Object

<!-- truncate -->

## ByteArray + DTO + ObjectMapper Approach

Assuming the Kafka message is in JSON format:

```kotlin
data class User(
    val id: String,
    val name: String,
    val email: String?,
    val age: Int?,
    val createdAt: Long
)

val rawBytes: ByteArray = record.value()
val user = objectMapper.readValue(rawBytes, User::class.java)
```

- **Schema information is managed directly in the code** (e.g., DTO class)
- The structure of the Kafka message must be in **JSON format**
- **Schema Registry is not required**
- If the message structure changes, the DTO must also change, and **compatibility checks are manual**

## GenericRecord (Avro + Schema Registry)

```kotlin
val record = consumerRecord.value() as GenericRecord
val name = record.get("name").toString()
```

- Can operate without a DTO (`GenericRecord`), or use a generated class
- When the message structure changes, it can evolve safely with the Registry's compatibility policy

## SpecificRecord (Avro + Schema Registry)

```avro
// user.avsc
{
  "type": "record",
  "name": "User",
  "fields": [...]
}
```

```java
// Auto-generated
public class User extends SpecificRecordBase implements SpecificRecord {
    private String id;
    private String name;
    ...
}
```

```kotlin
@KafkaListener(topics = ["\${kafka.topic.user}"], groupId = "\${spring.kafka.consumer.group-id}")
fun consume(user: User) {
    val userId = user.getId()
    logger.info("Received user with id: {}, name: {}", userId, user.getName())
    
    users[userId] = user
}
```

The code is generated, so it can be referenced directly.

- Static type support
    - Ensures stability during serialization/deserialization
    - Excellent IDE support
- Fully compatible with Kafka Schema Registry
- High performance
    - GenericRecord is relatively slow due to reflection

## Schema Definition and Usage

- Sample created using IntelliJ Junie

```kotlin
plugins {
    id("com.github.davidmc24.gradle.plugin.avro") version "1.9.1"
}

repositories {
    mavenCentral()
    maven {
        url = uri("https://packages.confluent.io/maven/")
    }
}

dependencies {
    // Avro and Schema Registry
    implementation("org.apache.avro:avro:1.11.3")
    implementation("io.confluent:kafka-avro-serializer:7.5.1")
    implementation("io.confluent:kafka-schema-registry-client:7.5.1")
}

avro {
    isCreateSetters.set(true)
    isCreateOptionalGetters.set(false)
    isGettersReturnOptional.set(false)
    fieldVisibility.set("PRIVATE")
    outputCharacterEncoding.set("UTF-8")
    stringType.set("String")
    templateDirectory.set(null as String?)
    isEnableDecimalLogicalType.set(true)
}
```

User schema definition

```avro
{
  "namespace": "com.haril.kafkaschemaregistrydemo.schema",
  "type": "record",
  "name": "User",
  "fields": [
    {
      "name": "id",
      "type": "string"
    },
    {
      "name": "name",
      "type": "string"
    },
    {
      "name": "email",
      "type": ["null", "string"],
      "default": null
    },
    {
      "name": "age",
      "type": ["null", "int"],
      "default": null
    },
    {
      "name": "createdAt",
      "type": {
        "type": "long",
        "logicalType": "timestamp-millis"
      }
    }
  ]
}
```

You can see that the `User` class is automatically generated,

![](https://i.imgur.com/JlYqpIE.png)

![](https://i.imgur.com/ZoROVtp.png)

and can be referenced and used in other modules.

## Schema Updates

- If the schema information is not in the registry, Kafka uploads the schema to the connected schema registry when a message is published.
- It can also be updated using the Web UI.

## Schema Compatibility Policies

The main policies are as follows:

| Mode         | Description                            | Example                       |
| ---------- | ----------------------------- | ------------------------ |
| `BACKWARD` | Consumers with the old version can understand new messages | Fields can be added, but not removed |
| `FORWARD`  | Consumers with the new version can understand old messages | Fields can be removed, but not added |
| `FULL`     | Compatible in both directions                     | Only limited changes are allowed |
| `NONE` | No compatibility guarantee for any changes             | High risk of consumer crash on change ↑ |

When using the `BACKWARD` policy, you must **specify a default value when adding a field to the schema** so that Consumers using the old version of the schema can safely deserialize it. It is also possible to specify `null` as the default, which means the field is optional.

:::warning[Kafka Streams only supports BACKWARD.]

The `FULL` policy is convenient because it maintains bidirectional compatibility, but Kafka Streams only supports the `BACKWARD` policy, which limits the options.

:::

If you use the `GenericRecord` approach, the schema is loaded dynamically. In this case, even if the schema changes, the service does not need to be redeployed.

```java
ConsumerRecord<String, GenericRecord> record = ...
GenericRecord value = record.value();

Integer age = (Integer) value.get("age");
String name = value.get("name").toString();
```

It can be enabled with the `props.put("specific.avro.reader", false)` setting, and can provide an experience similar to using a `Map`.

| Item    | `SpecificRecord`                | `GenericRecord`       |
| ----- | ------------------------------- | --------------------- |
| Usage | Pre-generate Java/Kotlin classes from Avro schema | Parse schema at runtime and use dynamically |
| Performance    | Fast and type-safe                       | Slightly slower and less type-safe     |
| Flexibility   | Requires code regeneration on schema change              | Responds flexibly to schema changes   |
| Recommended for | Services with a fixed schema                    | When schemas change frequently or are diverse    |

The following use cases might be considered for using GenericRecord:

- **Kafka consumer platform** that needs to handle various schemas
- **Schema registry-based multi-team environment** (if schema versions change frequently)
- **When the Avro schema is managed externally**, making it difficult to create classes internally

A useful approach is to generate objects from `.avsc` files in the Producer, where a clear data schema is needed, and use `GenericRecord` on the Consumer side for dynamic response.

## Schema management and Monitoring

> Landoop UI

![](https://i.imgur.com/Vkygcbi.png)

Continuously records schema change history.

![](https://i.imgur.com/ZN44eb3.png)

In the Kafka UI, you can see that the value has been changed to the schema registry.

![](https://i.imgur.com/kEtXwQU.png)

## Conclusion

### Pros

- Instead of dealing with multiple nested DTOs, you only need to manage one avsc file, which reduces the management burden.
- All services **query the schema in real-time from the Schema Registry**
    - Since the message does not contain schema information, network bandwidth is used efficiently.
- Kafka messages include a **schema ID (magic byte + schema ID)**, so consumers can automatically deserialize without having the `.avsc` file locally.
- Particularly useful when multiple teams publish messages to a single stream pipeline or topic.
    - Prevents strange data from entering the pipeline.

### Cons

- Must be deployed through a separate API server.
- Collaboration with the infrastructure team is required.
    - An infrastructure layer like [AWS Glue Schema Registry](https://docs.aws.amazon.com/ko_kr/glue/latest/dg/schema-registry-integrations.html) needs to be set up.
- If the Schema Registry goes down, the pipeline may stop, which can increase management points.

### So when is it good to use?

- When setting up a project from the beginning
- When multiple teams share a single pipeline
- When there is a dedicated team in the company that specializes in Kafka
- When you are familiar with protobuf

## Reference

- [Confluent Schema Registry 도입기!. Schema Registry 도입을 위한 PoC 여정을 소개합니다! \| by Suyeon Kim \| YOGIYO Tech Blog - 요기요 기술블로그](https://techblog.yogiyo.co.kr/confluent-schema-registry-%EB%8F%84%EC%9E%85%EA%B8%B0-54d112b9b53f)
- [Kafka 와 Confluent Schema Registry 를 사용한 스키마 관리 #1](https://medium.com/@gaemi/kafka-%EC%99%80-confluent-schema-registry-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%8A%A4%ED%82%A4%EB%A7%88-%EA%B4%80%EB%A6%AC-1-cdf8c99d2c5c)
- [Kafka 와 Confluent Schema Registry 를 사용한 스키마 관리 #2](https://medium.com/@gaemi/kafka-%EC%99%80-confluent-schema-registry-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%8A%A4%ED%82%A4%EB%A7%88-%EA%B4%80%EB%A6%AC-2-bfa96622a974)
- [Kafka 와 Confluent Schema Registry 를 사용한 스키마 관리 #3](https://medium.com/@gaemi/kafka-%EC%99%80-confluent-schema-registry-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%8A%A4%ED%82%A4%EB%A7%88-%EA%B4%80%EB%A6%AC-3-96b0f070d0f1)
- [Kafka with Schema Registry and Avro Serialization](https://howtodoinjava.com/kafka/kafka-with-avro-and-schema-registry/?utm_source=chatgpt.com)
- [Kafka Schema Registry and JSON Schema: A Comprehensive Guide \| Pravin on Software](https://pravin.dev/posts/kafka-schema-registry-and-json-schema-a-comprehensive-guide/?utm_source=chatgpt.com)
- [\[번역\] 에이브로(Avro), 프로토콜 버퍼(Protocol Buffers) 그리고 스리프트(Thrift)의 스키마 변경(evolution)](http://sjava.net/2012/12/%EB%B2%88%EC%97%AD-%EC%97%90%EC%9D%B4%EB%B8%8C%EB%A1%9Cavro-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C-%EB%B2%84%ED%8D%BCprotocol-buffers-%EC%93%B0%EB%A6%AC%ED%94%84%ED%8A%B8thrift%EC%9D%98-%EC%8A%A4/)

---
title: "Kafkaスキーマレジストリ"
date: 2025-06-08T15:51
tags: [kafka, schema]
description: Kafkaスキーマを管理する方法であるスキーマレジストリについて説明します
authors: haril
---

:::info[サンプルコード]

[GitHub - songkg7/kafka-schema-registry-demo](https://github.com/songkg7/kafka-schema-registry-demo)

:::

## 問題点

- メッセージ仕様が変更された場合、依存するモジュールやGitリポジトリごとにDTOの更新が必要です。
    - 下位互換性や上位互換性が頻繁に壊れます。
    - DTO管理の複雑さが線形的に増加します。
    - Javaは特にJSONベースのメッセージを扱うのに不便な点が多いです。
- Kafkaは`ByteArray`形式でメッセージを送信しますが、アプリケーションレベルではこれをデシリアライズして管理することが推奨されます。
    - ペイロードにデータを格納するたびに`ByteArray`にシリアライズするプロセス、およびその逆のプロセスが毎回行われます。
    - コードの複雑さが増加します。
    - ByteArray - JSON - Object

<!-- truncate -->

## ByteArray + DTO + ObjectMapper方式

KafkaメッセージがJSON形式であると仮定します：

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

- **スキーマ情報をコードで直接管理**（例：DTOクラス）
- Kafkaメッセージの構造が**JSON形式**である必要があります
- **スキーマレジストリは不要**
- メッセージ構造が変わるとDTOも変更する必要があり、**互換性チェックは手動**

## GenericRecord (Avro + スキーマレジストリ)

```kotlin
val record = consumerRecord.value() as GenericRecord
val name = record.get("name").toString()
```

- DTOなしでも動作可能（`GenericRecord`）、または生成されたクラスを使用可能
- メッセージ構造が変更された場合、レジストリの互換性ポリシーにより安全に進化可能

## SpecificRecord (Avro + スキーマレジストリ)

```avro
// user.avsc
{
  "type": "record",
  "name": "User",
  "fields": [...]
}
```

```java
// 自動生成
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

コードが生成されているため、直接参照可能です。

- 静的型サポート
    - シリアライズ/デシリアライズ時の安定性を保証
    - IDEのサポートが優れている
- Kafkaスキーマレジストリと完全互換
- 高性能
    - GenericRecordはリフレクションを利用するため比較的に遅い

## スキーマの定義と使用

- IntelliJ Junieを使用してサンプルを作成

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

Userスキーマの定義

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

`User`クラスが自動的に生成されたことが確認でき、

![](https://i.imgur.com/JlYqpIE.png)

![](https://i.imgur.com/ZoROVtp.png)

他のモジュールから参照して使用できます。

## スキーマの更新

- レジストリにスキーマ情報がない場合、Kafkaはメッセージが発行される際に接続されたスキーマレジストリにスキーマをアップロードします。
- Web UIを使用して更新することもできます。

## スキーマ互換性ポリシー

代表的なポリシーは以下の通りです：

| モード         | 説明                            | 例                       |
| ---------- | ----------------------------- | ------------------------ |
| `BACKWARD` | 旧バージョンのコンシューマは新しいメッセージを理解可能 | フィールド追加可能、削除は不可         |
| `FORWARD`  | 新バージョンのコンシューマは古いメッセージを理解可能 | フィールド削除可能、追加は不可         |
| `FULL`     | 双方向で互換性あり                     | 限定的な変更のみ許可               |
| `NONE` | どの変更も互換性を保証しない             | 変更時にコンシューマがクラッシュする危険性↑ |

`BACKWARD`ポリシーを使用する場合、**スキーマにフィールドを追加する際にデフォルト値を指定**する必要があります。これにより、旧バージョンのスキーマを使用するコンシューマも安全にスキーマをデシリアライズできます。`null`をデフォルトとして指定することも可能で、この場合はオプションフィールドであることを意味します。

:::warning[Kafka StreamsはBACKWARDのみをサポートします。]

`FULL`ポリシーは双方向の互換性が維持されるため便利ですが、Kafka Streamsは`BACKWARD`ポリシーのみをサポートするため、選択肢が限られます。

:::

`GenericRecord`方式を使用する場合、スキーマは動的にロードされます。この場合、スキーマが変更されてもサービスの再デプロイは不要です。

```java
ConsumerRecord<String, GenericRecord> record = ...
GenericRecord value = record.value();

Integer age = (Integer) value.get("age");
String name = value.get("name").toString();
```

`props.put("specific.avro.reader", false)`設定で有効にでき、`Map`を使用するのと同様の体験を提供できます。

| 項目    | `SpecificRecord`                | `GenericRecord`       |
| ----- | ------------------------------- | --------------------- |
| 使用方法 | AvroスキーマからJava/Kotlinクラスを事前に生成 | 実行時にスキーマを解析して動的に使用 |
| パフォーマンス    | 高速で型安全                       | やや遅く、型安全性が低い     |
| 柔軟性   | スキーマ変更時にコードの再生成が必要              | スキーマ変更に柔軟に対応可能   |
| 推奨状況 | スキーマが固定されたサービス                    | スキーマが頻繁に変わるか多様な場合    |

以下のような使用状況では、GenericRecordの使用を検討できます：

- 様々なスキーマを処理する必要がある**Kafkaコンシューマプラットフォーム**
- **スキーマレジストリベースのマルチチーム環境**（スキーマバージョンが頻繁に変わる場合）
- **Avroスキーマが外部で管理**されており、内部でクラスを作成するのが困難な場合

プロデューサーでは明確なデータスキーマが必要なため、`.avsc`ファイルを通じてオブジェクトを生成し、コンシューマー側では`GenericRecord`を使用して動的に対応する方法も有用です。

## スキーマ管理とモニタリング

> Landoop UI

![](https://i.imgur.com/Vkygcbi.png)

スキーマの変更履歴を継続的に記録します。

![](https://i.imgur.com/ZN44eb3.png)

Kafka UIでは、値がスキーマレジストリに変更されたことを確認できます。

![](https://i.imgur.com/kEtXwQU.png)

## 結論

### 利点

- 複数のネストされたDTOを扱う代わりに、1つのavscファイルだけを管理すればよいため、管理負担が比較的軽減されます。
- すべてのサービスは**スキーマレジストリからリアルタイムでスキーマを照会**
    - メッセージにスキーマ情報が含まれないため、ネットワーク帯域幅を効率的に使用できます。
- Kafkaメッセージには**スキーマID（マジックバイト + スキーマID）**が含まれるため、コンシューマはローカルに`.avsc`がなくても自動的にデシリアライズできます。
- 複数のチームが1つのストリームパイプラインやトピックにメッセージを発行する場合に特に有用です。
    - パイプラインに不正なデータが入るのを防ぎます。

### 欠点

- 別のAPIサーバーを通じてデプロイする必要があります。
- インフラチームとの協力が必要です。
    - [AWS Glue Schema Registry](https://docs.aws.amazon.com/ko_kr/glue/latest/dg/schema-registry-integrations.html)のようなインフラレイヤーを設定する必要があります。
- スキーマレジストリがダウンした場合、パイプラインが停止する可能性があり、管理ポイントが増える可能性があります。

### いつ使うのが良いか？

- プロジェクトの初期段階で設定から始める場合
- 複数のチームが1つのパイプラインを共有して使用する場合
- 会社にKafkaを専門的に扱う別のチームがある場合
- protobufに慣れている場合

## 参考文献

- [Confluent Schema Registry導入記！Schema Registry導入のためのPoCの旅を紹介します！ \| by Suyeon Kim \| YOGIYO Tech Blog - 요기요 기술블로그](https://techblog.yogiyo.co.kr/confluent-schema-registry-%EB%8F%84%EC%9E%85%EA%B8%B0-54d112b9b53f)
- [KafkaとConfluent Schema Registryを使用したスキーマ管理 #1](https://medium.com/@gaemi/kafka-%EC%99%80-confluent-schema-registry-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%8A%A4%ED%82%A4%EB%A7%88-%EA%B4%80%EB%A6%AC-1-cdf8c99d2c5c)
- [KafkaとConfluent Schema Registryを使用したスキーマ管理 #2](https://medium.com/@gaemi/kafka-%EC%99%80-confluent-schema-registry-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%8A%A4%ED%82%A4%EB%A7%88-%EA%B4%80%EB%A6%AC-2-bfa96622a974)
- [KafkaとConfluent Schema Registryを使用したスキーマ管理 #3](https://medium.com/@gaemi/kafka-%EC%99%80-confluent-schema-registry-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%8A%A4%ED%82%A4%EB%A7%88-%EA%B4%80%EB%A6%AC-3-96b0f070d0f1)
- [Kafka with Schema Registry and Avro Serialization](https://howtodoinjava.com/kafka/kafka-with-avro-and-schema-registry/?utm_source=chatgpt.com)
- [Kafka Schema Registry and JSON Schema: A Comprehensive Guide \| Pravin on Software](https://pravin.dev/posts/kafka-schema-registry-and-json-schema-a-comprehensive-guide/?utm_source=chatgpt.com)
- [\[翻訳\] Avro、Protocol Buffers、Thriftのスキーマ変更（evolution）](http://sjava.net/2012/12/%EB%B2%88%EC%97%AD-%EC%97%90%EC%9D%B4%EB%B8%8C%EB%A1%9Cavro-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C-%EB%B2%84%ED%8D%BCprotocol-buffers-%EC%93%B0%EB%A6%AC%ED%94%84%ED%8A%B8thrift%EC%9D%98-%EC%8A%A4/)

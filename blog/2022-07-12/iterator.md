---
title: "[Java] First collection(일급 컬렉션)을 더욱 Collection 답게 - iterable"
date: 2022-07-15 20:00:00 +0900
tags: [java, iterable, iterator]
categories: [Java]
authors: haril
---

## Overview

```java
// Iterable 을 구현하고 있는 java Collection.
public interface Collection<E> extends Iterable<E>
```

일급 컬렉션은 객체를 다루는데에 있어서 굉장히 유용한 방법 중 하나다. 하지만 일급 컬렉션이라는 이름이 무색하게도 `Collection` 을 `field` 로 가지고 있을 뿐 실제 `Collection` 은 아니기 때문에, `Collection` 이 제공하는 다양한 method 들을 사용할 수는 없다. 이 글에선 `Iterable` 을 활용해서 일급 컬렉션을 진짜 `Collection` 처럼 쓸 수 있는 방법을 소개해본다.

<!-- Iterable 은 iterator() 를 제공하는 interface 이지만, iterator() 가 정확히 무엇인지에 대해서는 이 글에서 다루지 않는다. iterator() 에 대해 자세히 알고 싶다면 아래 글을 먼저 참고해보시길 바란다. -->

간단한 예제를 작성해보자.

<!-- truncate -->

## Example

```java
@Value
public class LottoNumber {
    int value;

    public static LottoNumber create(int value) {
        return new LottoNumber(value);
    }
}
```

```java
public class LottoNumbers {

    private final List<LottoNumber> lottoNumbers;

    private LottoNumbers(List<LottoNumber> lottoNumbers) {
        this.lottoNumbers = lottoNumbers;
    }

    public static LottoNumbers create(LottoNumber... numbers) {
        return new LottoNumbers(List.of(numbers));
    }

    // isEmpty() method 를 delegate 하여 List 의 method 를 사용할 수 있다.
    public boolean isEmpty() {
        return lottoNumbers.isEmpty();
    }
}
```

`LottoNumbers` 는 `LottoNumber` 를 리스트로 가지는 일급 컬렉션이다. 리스트가 비어있는지 확인하기 위해서 `isEmpty()` 를 구현해놨다.

간단하게 `isEmpty()` 테스트를 작성해보자.

```java
@Test
void isEmpty() {
    LottoNumber lottoNumber = LottoNumber.create(7);
    LottoNumbers lottoNumbers = LottoNumbers.create(lottoNumber);

    assertThat(lottoNumbers.isEmpty()).isFalse();
}
```

그렇게 나쁘진 않지만, `AssertJ` 에는 `Collection` 을 테스트할 수 있는 다양한 method 들이 제공된다.

- `has..`
- `contains...`
- `isEmpty()`

수십여가지의 이 편리한 assert method 들을 일급 컬렉션은 `Collection` 이 아니기 때문에 사용할 수 없다.

좀 더 정확히는 `iterator()` 로 **원소들을 순회할 수 없기 때문에** 사용할 수 없다. `iterator()` 를 사용하기 위해선 `Iterable` 을 구현해주면 된다.

구현은 매우 간단하다.

```java
public class LottoNumbers implements Iterable<LottoNumber> {

    //...

    @Override
    public Iterator<LottoNumber> iterator() {
        return lottoNumbers.iterator();
    }
}
```

일급 컬렉션은 이미 `Collection` 을 가지고 있기 때문에 `isEmpty()` 를 위임한 것처럼, 그대로 반환해주면 끝이다.

```java
@Test
void isEmpty_iterable() {
    LottoNumber lottoNumber = LottoNumber.create(7);
    LottoNumbers lottoNumbers = LottoNumbers.create(lottoNumber);

    assertThat(lottoNumbers).containsExactly(lottoNumber);
    assertThat(lottoNumbers).isNotEmpty();
    assertThat(lottoNumbers).hasSize(1);
}
```

다양한 테스트 method 들을 사용할 수 있게 되었다.

비단 테스트뿐만 아니라 기능 구현에 있어서도 편리하게 사용할 수 있다.

```java
for (LottoNumber lottoNumber : lottoNumbers) {
    System.out.println("lottoNumber: " + lottoNumber);
}
```

for 문이 `iterator()` 를 사용하기 때문에 가능해지는 것이다.

## Conclusion

`Iterable` 을 구현한 것만으로도 훨씬 풍부한 기능을 사용할 수 있게 된다. 구현 방법도 어렵지 않고 기능 확장에 가깝기 때문에 일급 컬렉션이라면 `Iterable` 을 적극적으로 활용해보자.

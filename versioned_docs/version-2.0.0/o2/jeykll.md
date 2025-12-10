---
sidebar_position: 3
---

# Jekyll

O2 는 Jekyll 마크다운 문법 변환 기능을 제공합니다. 지원되는 포맷들은 다음과 같습니다.

## Wiki link

Obsidian 의 Wiki link 문법은 기본 마크다운 링크로 변환됩니다.

### AS-IS

```md
[[What is Obsidian?]]
```

### TO-BE

```md
[What is Obsidian?](/What%20is%20Obsidian%3F)
```

## Image

Obsidian 의 이미지 문법은 기본 마크다운 문법으로 변환됩니다.

### AS-IS

```md
![[NewJeans.png]]
```

### TO-BE

```md
![image](/assets/img/<yyyy-MM-dd>-<title>/NewJeans.png)
```

`yyyy-MM-dd` 는 문서 내 `date` 또는 `updated` frontMatter 에 기반하여 변환됩니다. 링크가 깨지지 않도록 첨부파일들도 적절하게 이동됩니다.

## Resize image

Obsidian 의 이미지 크기 조절 문법은 Jekyll 의 이미지 크기 조절 문법으로 변환됩니다.

### AS-IS

```md
![[NewJeans.png|100]]
```

### TO-BE

```md
![image](/assets/img/<yyyy-MM-dd>-<title>/NewJeans.png){: width="100" }
```

## Resize image (width & height)

이미지의 폭과 높이 또한 변환할 수 있습니다.

### AS-IS

```md
![[NewJeans.png|100x200]]
```

### TO-BE

```md
![image](/assets/img/<yyyy-MM-dd>-<title>/NewJeans.png){: width="100" height="200" }
```

## Embeds

Obsidian 의 embeds 문법은 기본 링크로 변환됩니다.

### AS-IS

```md
![[Obsidian#This is Obsidian!]]
```

### TO-BE

```md
[Obsidian](/Obsidian#This%20is%20Obsidian!)
```

## Comments

Obsidian 의 주석 문법은 Jekyll 의 주석 문법으로 변환됩니다.

### AS-IS

```md
%% This is a comment %%
```

### TO-BE

```md
<!-- This is a comment -->
```

## Footnotes

Obsidian 의 각주 문법은 Jekyll 의 각주 문법으로 변환됩니다.

### AS-IS

```md
[^1]
```

### TO-BE

```md
[^fn-nth-1]
```

현재는 simple 방식만 지원합니다.

## Curly braces

Obsidian 의 중괄호 문법은 Jekyll 의 중괄호 문법으로 변환됩니다.

### AS-IS

```md
{{ content }}
```

### TO-BE

```md
{% raw %}{{ content }}{% endraw %}
```

이 기능은 설정에서 토글을 통해 활성화할 수 있습니다.

## 그 외

나머지 문법들은 무시됩니다. 변환하고 싶은 문법이 있다면 이슈로 알려주세요.

## References

- [Obsidian](https://obsidian.md/)
- [Jekyll](https://jekyllrb.com/)

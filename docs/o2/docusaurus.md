---
sidebar_position: 4
---

# Docusaurus

O2 는 Docusaurus 마크다운 문법 변환 기능을 제공합니다. 지원되는 포맷들은 다음과 같습니다.

## Wiki link

Obsidian 의 Wiki link 는 텍스트로 변환됩니다.

### AS-IS

```md
[[What is Obsidian?]]
```

### TO-BE

```md
What is Obsidian?
```

## Image

:::warning

아직 이미지 변환은 지원하지 않습니다.

:::

:::tip

[imgur plugin](https://github.com/gavvvr/obsidian-imgur-plugin) 을 사용하면 이미지를 파일로 관리할 필요가 없어집니다.

:::

## Embeds

Obsidian 의 Embeds 는 텍스트로 변환됩니다.

### AS-IS

```md
![[Obsidian#This is Obsidian]]
```

### TO-BE

```md
Obsidian
```

## Footnotes

Obsidian 의 각주 문법은 Docusaurus 의 각주 문법으로 변환됩니다.

:::warning

현재는 obsidian simple footnote 방식만 지원합니다.

:::

### AS-IS

```md
[^1]
```

### TO-BE

```md
[^fn-nth-1]
```

## Frontmatter

### updated

원본 글에 `updated` frontmatter 가 존재한다면, 변환 결과의 `date` frontmatter value 를 `updated` 의 value 로 대체합니다.

### authors

Docusaurus 에서는 `authors` 를 사용하여 작성자를 표시합니다.
설정에 입력된 값이 있다면 변환 결과에 authors frontmatter 가 추가됩니다.

```
authors: haril
```


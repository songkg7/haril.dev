---
sidebar_position: 5
---

# Docusaurus

O2 provides functionality to convert Obsidian markdown syntax. The supported formats are as follows:

## Wiki Link

Obsidian's Wiki links are converted to plain text.

**AS-IS**

```md
[[What is Obsidian?]]
```

**TO-BE**

```md
What is Obsidian?
```

## Image

:::warning

Image conversion is not supported yet.

:::

## Embeds

Obsidian's Embeds are converted to plain text.

**AS-IS**

```md
![[Obsidian#This is Obsidian]]
```

**TO-BE**

```md
Obsidian
```

## Footnotes

Obsidian's footnote syntax is converted to Docusaurus footnote syntax.

:::warning

Currently, only the Obsidian simple footnote format is supported.

:::

**AS-IS**

```md
[^1]
```

**TO-BE**

```md
[^fn-nth-1]
```
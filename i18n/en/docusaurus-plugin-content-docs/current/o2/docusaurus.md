---
sidebar_position: 4
---

# Docusaurus

O2 provides a feature to convert Markdown syntax to Docusaurus format. The supported formats are as follows:

## Wiki Link

Obsidian's Wiki links are converted to plain text.

### Before

```md
[[What is Obsidian?]]
```

### After

```md
What is Obsidian?
```

## Image

:::warning

Image conversion is not supported yet.

:::

:::tip

Using the [imgur plugin](https://github.com/gavvvr/obsidian-imgur-plugin) means you don't need to manage images as files.

:::

## Embeds

Obsidian's Embeds are converted to plain text.

### Before

```md
![[Obsidian#This is Obsidian]]
```

### After

```md
Obsidian
```

## Footnotes

Obsidian's footnote syntax is converted to Docusaurus footnote syntax.

:::warning

Currently, only the Obsidian simple footnote method is supported.

:::

### Before

```md
[^1]
```

### After

```md
[^fn-nth-1]
```

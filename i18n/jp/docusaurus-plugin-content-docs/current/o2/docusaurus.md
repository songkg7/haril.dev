---
sidebar_position: 4
---

# Docusaurus

O2はMarkdownの構文をDocusaurus形式に変換する機能を提供します。サポートされている形式は以下の通りです。

## ウィキリンク

Obsidianのウィキリンクはプレーンテキストに変換されます。

### 変換前

```md
[[What is Obsidian?]]
```

### 変換後

```md
What is Obsidian?
```

## 画像

:::warning

画像の変換はまだサポートされていません。

:::

:::tip

[imgurプラグイン](https://github.com/gavvvr/obsidian-imgur-plugin)を使用すると、画像をファイルとして管理する必要がなくなります。

:::

## 埋め込み

Obsidianの埋め込みはプレーンテキストに変換されます。

### 変換前

```md
![[Obsidian#This is Obsidian]]
```

### 変換後

```md
Obsidian
```

## 脚注

Obsidianの脚注構文はDocusaurusの脚注構文に変換されます。

:::warning

現在、Obsidianのシンプルな脚注方法のみがサポートされています。

:::

### 変換前

```md
[^1]
```

### 変換後

```md
[^fn-nth-1]
```
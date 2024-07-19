---
sidebar_position: 3
---

# Jekyll

O2は、JekyllのMarkdown構文に変換する機能を提供します。サポートされている形式は以下の通りです。

## Wikiリンク

ObsidianのWikiリンク構文は、標準のMarkdownリンクに変換されます。

### 変換前

```md
[[What is Obsidian?]]
```

### 変換後

```md
[What is Obsidian?](/What%20is%20Obsidian%3F)
```

## 画像

Obsidianの画像構文は、標準のMarkdown構文に変換されます。

### 変換前

```md
![[NewJeans.png]]
```

### 変換後

```md
![image](/assets/img/<yyyy-MM-dd>-<title>/NewJeans.png)
```

`yyyy-MM-dd`は、ドキュメントの`date`または`updated`フロントマターに基づいて変換されます。添付ファイルも適切に移動され、リンクが切れないようにします。

## 画像のリサイズ

Obsidianの画像リサイズ構文は、Jekyllの画像リサイズ構文に変換されます。

### 変換前

```md
![[NewJeans.png|100]]
```

### 変換後

```md
![image](/assets/img/<yyyy-MM-dd>-<title>/NewJeans.png){: width="100" }
```

## 画像のリサイズ（幅と高さ）

画像の幅と高さも変換できます。

### 変換前

```md
![[NewJeans.png|100x200]]
```

### 変換後

```md
![image](/assets/img/<yyyy-MM-dd>-<title>/NewJeans.png){: width="100" height="200" }
```

## 埋め込み

Obsidianの埋め込み構文は、標準のリンクに変換されます。

### 変換前

```md
![[Obsidian#This is Obsidian!]]
```

### 変換後

```md
[Obsidian](/Obsidian#This%20is%20Obsidian!)
```

## コメント

Obsidianのコメント構文は、Jekyllのコメント構文に変換されます。

### 変換前

```md
%% This is a comment %%
```

### 変換後

```md
<!-- This is a comment -->
```

## 脚注

Obsidianの脚注構文は、Jekyllの脚注構文に変換されます。

### 変換前

```md
[^1]
```

### 変換後

```md
[^fn-nth-1]
```

現在、シンプルな方法のみサポートされています。

## 中括弧

Obsidianの中括弧構文は、Jekyllの中括弧構文に変換されます。

### 変換前

```md
{{ content }}
```

### 変換後

```md
{% raw %}{{ content }}{% endraw %}
```

この機能は設定でオンまたはオフに切り替えることができます。

## その他

その他の構文は無視されます。変換してほしい構文があれば、issueを通じてお知らせください。

## 参考文献

- [Obsidian](https://obsidian.md/)
- [Jekyll](https://jekyllrb.com/)
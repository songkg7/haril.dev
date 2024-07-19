---
sidebar_position: 2
---

# 設定

O2は、変換されたドキュメントを適切なプラットフォームに転送するためのカスタム設定オプションを提供します。

## Jekyll

```text
あなたのJekyllプロジェクト (例: /Users/user1/Documents/GitHub/user1.github.io)
├── _posts (変換されたノートが配置される場所)
└── assets
    └── img
        └── yyyy-MM-dd-title (添付ファイルが配置される場所。yyyy-MM-ddは変換日付に置き換えられます)
```

- `Jekyll path`にJekyllプロジェクトの絶対パスを入力します。
  - 例: /Users/user1/Documents/GitHub/user1.github.io
- 添付ファイルは`<jekyll path>/assets/img/<yyyy-MM-dd>`フォルダに日付ごとに整理されてコピーされます。
- 添付ファイルの保存先パスを変更したい場合は、`Relative resource path`の値を変更します。
  - 例: `assets/img` -> `images`
- `Auto create folders`を有効にすると、必要なフォルダが存在しない場合に自動的に作成されます。

## Docusaurus

:::warning[WIP]

添付ファイルの転送はまだサポートされていません。

:::

```text
あなたのDocusaurusプロジェクト (例: /Users/user1/Documents/GitHub/user1.github.io)
└── blog
    ├── yyyy-MM-dd
    │   └── title.md (変換されたノートが配置される場所)
    │   └── attachments.webp
    └── static
        └── img
            └── yyyy-MM-dd-title (添付ファイルが配置される場所。yyyy-MM-ddは変換日付に置き換えられます)
```

- `Docusaurus path`にDocusaurusプロジェクトの絶対パスを入力します。
  - 例: /Users/user1/Documents/GitHub/user1.github.io
- 変換されたドキュメントは`<docusaurus path>/blog/yyyy-MM-dd`フォルダに作成されます。日付形式は設定で変更できます。
- 添付ファイルはリンクされたドキュメントと同じフォルダに保存され、効果的にグループ化されます。
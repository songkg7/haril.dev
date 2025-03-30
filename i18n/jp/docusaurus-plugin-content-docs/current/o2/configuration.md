---
title: 設定
sidebar_position: 2
---

# 設定

O2は様々な設定オプションを提供し、動作をカスタマイズすることができます。以下は、利用可能な全ての設定の詳細ガイドです。

## パス設定

### Readyフォルダ
- **名前**: 他の構文に変換するノートを配置するフォルダ
- **デフォルト**: `ready`
- **説明**: 変換準備が整ったノートを配置するフォルダです。

### アーカイブフォルダ
- **名前**: ノートをアーカイブするフォルダ
- **デフォルト**: `archive`
- **説明**: 変換後のノートが保管されるフォルダです（自動アーカイブが有効な場合）。

### 添付ファイルフォルダ
- **名前**: 添付ファイルを保存するフォルダ
- **デフォルト**: `attachments`
- **説明**: すべての添付ファイル（画像、ファイルなど）が保存されるフォルダです。

## 機能

### フォルダの自動作成
- **デフォルト**: 無効
- **説明**: 有効にすると、必要なフォルダが存在しない場合に自動的に作成されます。

### 自動アーカイブ
- **デフォルト**: 無効
- **説明**: 有効にすると、変換後のノートが自動的にアーカイブフォルダに移動されます。

### 中括弧の変換（Jekyll）
- **デフォルト**: 無効
- **説明**: 有効にすると、二重中括弧がJekyllのrawタグに変換されます。

### フロントマター時間の更新
- **デフォルト**: 無効
- **説明**: 有効にすると、'updated'フロントマターが存在する場合、'date'フロントマターが'updated'の値で置き換えられます。

## Jekyll設定

### Jekyllパス
- **説明**: Jekyllワークスペースが配置されている絶対パスです。
- **例**: `/Users/username/blog`

### 相対リソースパス
- **デフォルト**: `assets/img`
- **説明**: Jekyllプロジェクトでリソース（画像、添付ファイル）が保存される相対パスです。

### Liquidフィルター
- **説明**: JekyllのLiquidテンプレートフィルターの設定です。

## Docusaurus設定

### Docusaurusパス
- **説明**: Docusaurusワークスペースが配置されている絶対パスです。
- **例**: `/Users/username/website`

### 日付抽出パターン
- **説明**: ノートタイトルから日付を抽出するために使用されるパターンです。
- **オプション**: 様々な日付形式に対応するパターンが提供されます。

### 著者
- **説明**: Docusaurusフロントマターの著者情報です。
- **形式**: 複数の著者の場合はカンマで区切ります（例：`jmarcey, slorber`）

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
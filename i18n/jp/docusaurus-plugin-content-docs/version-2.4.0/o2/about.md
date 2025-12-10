---
title: O2について
sidebar_position: 1
---

# O2 - 一度書いて、複数のプラットフォームに変換

O2は、ObsidianのMarkdownファイルをJekyllやDocusaurusなどの他のプラットフォーム形式に変換できるObsidianプラグインです。「O2」という名前は「Obsidian to Other platforms」（Obsidianから他のプラットフォームへ）を表しています。

## 主な機能

- ObsidianのMarkdownをJekyll（Chirpyテーマ）形式に変換
- ObsidianのMarkdownをDocusaurus形式に変換
- 処理済みファイルの自動アーカイブ
- カスタマイズ可能なフォルダ構造
- フロントマターとメタデータの保持
- 添付ファイルと画像の処理

## 前提条件

### Vault構造

Obsidian vaultは以下のようなフォルダ構造を持つ必要があります（フォルダ名は設定で変更可能）：

```text
Your vault
├── ready （変換したいノートを配置するフォルダ）
├── archive （変換前のオリジナルノートを保管するフォルダ）
└── attachments （添付ファイルを保管するフォルダ）
```

変換プロセス中、vault内の他のフォルダは無視されます。

## 使用方法

1. 変換したいノートを`ready`フォルダに移動
2. Obsidianのコマンドパレットを`cmd + p`（macOS）または`ctrl + p`（Windows/Linux）で開く
3. `O2: Grammar Transformation`コマンドを検索して実行
4. 設定に従ってファイルが変換されます

## 推奨プラグイン

O2は以下のObsidianプラグインと相性が良いです：

- [imgur](https://github.com/gavvvr/obsidian-imgur-plugin)：画像処理に推奨
- [Update frontmatter time on edit](https://github.com/beaussan/update-time-on-edit-obsidian)：正確なタイムスタンプの維持に役立ちます

## プラットフォームサポート

現在、O2は以下のプラットフォームへの変換をサポートしています：

- Jekyll（Chirpyテーマ）
- Docusaurus

各プラットフォームには、必要に応じてカスタマイズできる独自の設定があります。

## 貢献について

O2への貢献を歓迎します！貢献したい場合は：

1. 大きな変更の場合は、まずissueやディスカッションを開いてください
2. リポジトリをフォークし、フィーチャーブランチを作成してください
3. 変更を加え、テストがパスすることを確認してください
4. プルリクエストを提出してください

O2のビルドと開発に関する詳細な情報は、[Obsidianプラグイン開発ドキュメント](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)をご覧ください。

## サポート

O2が役立ち、開発をサポートしたい場合は：

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V8KX38Q)

## ライセンス

O2は[MITライセンス](https://choosealicense.com/licenses/mit/)の下で公開されています。
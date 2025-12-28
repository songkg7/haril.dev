---
title: "JekyllブログをDocusaurusに移行する"
date: 2024-07-22 17:54:45 +0900  
tags: [docusaurus, blog, algolia, react]  
categories: null  
authors: haril  
description: "JekyllブログをDocusaurusに移行する際に直面した問題とその解決策の概要。"
---

最近、ブログを新しいプラットフォームに移行する作業を行いました。様々な問題に直面し、その解決策をメモしておいたので、他の人にも役立つかもしれないと思い、ここに詳細な移行プロセスを記録します。

<!-- truncate -->

## 概要

![my-home](https://i.imgur.com/ootNbaX.png)

- 2024年4月、ブログが突然ダウンしました。
    - 問題はJdelivery CDNに関連していました。
    - 時間が経てば解決するかもしれませんが、積み重なった不便さから、自分が誤ったコードを書いたと誤解してしまいました。
- Jekyllは制約が多く、メンテナンスが難しかったため、Docusaurusに移行することにしました。
    - 特にブログがフォークを通じて構築されていたため、GitHubの貢献が記録されず、がっかりしました。
- O2でDocusaurusサポートを求める既存の問題がありましたが、私はそれを使ったことがなく、解決できませんでした - [\[FR\] support mkdocs-material, docusaurus · songkg7/o2 · Discussion #346 · GitHub](https://github.com/songkg7/o2/discussions/346)

これらの理由が重なり、ブログの移行を決断しました。

## Docusaurusの特徴

- Reactで構築
- 技術文書とブログの両方をサポート
- バージョン管理とi18nをサポート
- プラグインで機能を拡張可能
- MarkdownとMDXでドキュメントを作成可能

## 言語

TypeScript。最近のプロジェクトではTSから離れる試みもありますが、個人的には必要性を感じませんでした。JSよりもTSが好きなので、環境をTSで設定しました。

## パッケージマネージャー

Docusaurusはnpm、yarn、pnpmをサポートしています。npmを多用してきたので、今回はpnpmかyarnを試してみたかったです。

最終的にyarnを選んだ理由は以下の通りです：

- pnpmでGitHub Actionsを設定する際に気に入らない点がありました。
- 決定的な要因は、Toss techブログの[パッケージマネージャーに関する投稿](https://toss.tech/article/lightning-talks-package-manager)で、これを読んでyarnに切り替えました。

パッケージマネージャーを選んだら、ブログをチェックできます。

```bash
yarn start
```

## ブログまたはドキュメント

Docusaurusはドキュメントモードとブログモードの両方を提供します。開発ブログにはブログモードだけで十分なので、ドキュメントページを削除することを考えました。しかし、これではメインのランディングページがなくなり、デザイン要素が失われると感じました。

考えた末、ランディングページを保持し、ブログモードだけにするのではなく、ドキュメント形式を変更することにしました。

## Mermaid

Mermaidはコードで簡単に図を作成できるツールで、頻繁に使用しています。Docusaurusはプラグインを通じてこれをサポートしているので、追加しましょう。

```bash
yarn add @docusaurus/theme-mermaid
```

```ts
const config: Config = {
    markdown: {
        mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],
};
```

詳細は[公式ドキュメント](https://docusaurus.io/docs/markdown-features/diagrams)を参照してください。

## Latex

時々、数式を入力する必要があります。データエンジニアや数学を頻繁に使用する人にとってはさらに一般的です。通常、これにはLatexが使用されるので、Docusaurusに設定しましょう。

DocusaurusはKatexプラグインを通じてLatexをサポートしています。

```bash
yarn add remark-math@6 rehype-katex@7
```

```ts
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  presets: [
    [
      'classic',
      {
        blog: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      },
    ],
  ],
};
```

CSSも含めます。

```ts
const config: Config = {
    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:
                'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],
};
```

## コードブロックのハイライト

Javaはデフォルトでサポートされていないため、prism設定を通じてbashと一緒に追加しました。頻繁に使用する言語がハイライトされない場合は、必要に応じて追加できます。

```ts
const config: Config = {
    themeConfig: {
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['java', 'bash'],
        },
    },
};
```

## GitHub Pagesへのデプロイ

デプロイ方法はいくつかありますが、すべてをGitHub内で処理したかったので、GitHub Pagesを選びました。デフォルトのドメイン（`~.github.io`）もクリーンで便利です。

GitHub Actionsを使ってCI/CDを設定し、投稿が公開されるたびにブログを自動的にデプロイするようにしましょう。まず、`./.github/workflows/`にyamlファイルを作成します。内容は以下の通りです：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build:
    name: Build Docusaurus
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: yarn

      - name: Install dependencies
        run: yarn install --frozen-lockfile
      - name: Build website
        run: yarn run build

      - name: Upload Build Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    name: Deploy to GitHub Pages
    needs: build

    permissions:
      pages: write
      id-token: write

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

次に、`Settings > Pages`でSourceを`GitHub Actions`に設定してデプロイを完了します。これで、mainブランチにプッシュするたびに自動的にデプロイがトリガーされます。

![source](https://i.imgur.com/E2pWDp6.png)

:::warning[ソースを確認]

Sourceを`Deploy from a branch`に設定すると、デプロイプロセス中にブログサービスが中断される可能性があります。

:::

## カスタムドメインの接続

デフォルトのGitHubドメイン（`~.github.io`）でも問題ありませんが、ブログをよりプロフェッショナルに見せるためにドメインを購入することにしました。カスタムドメインを持つことで、将来的にプラットフォームを変更する際にもSEOを維持しやすくなります。

### ドメインの購入と登録

- GoDaddyでharil.devドメインを購入（年間費用：$20）
- GitHub Pagesにカスタムドメインを登録。
- まず、既存のドメインのIPアドレスを確認します。

```bash
dig songkg7.github.io
```

![execute-dig](https://i.imgur.com/76RPRYC.png)

このドメイン情報をGoDaddyのレコードに登録します。

![register-godaddy-record](https://i.imgur.com/lUEshGu.png)

次に、GitHub Pagesの設定に移動し、購入したドメインを登録します。

![custom-domain](https://i.imgur.com/ImiE0kj.png)

## オプション：ドメインのハイジャック防止のための検証

- プロフィール設定 -> Pagesに移動
- IPを追加したのと同じようにTXTレコードを追加

![before-verifiy](https://i.imgur.com/PH3fifE.png)

1と2の値をGoDaddyのレコードにコピーします。

![add-a-record](https://i.imgur.com/eMYlw2I.png)

レコードを追加した後、Verifyボタンをクリックします。

![verifed-domains](https://i.imgur.com/bBquRwp.png)

これでドメインの検証が完了し、ハイジャックから保護されます。~~このドメインをハイジャックしたい人がいるとは思えませんが...~~

## Giscusコメント

Docusaurusでは既存のコンポーネントのデザインを変更できます。Giscusコンポーネントを実装して追加することで、簡単にコメント機能を追加できます。

参考：[Add Giscus Comments to Docusaurus 3 Blog Posts and Doc Pages | Riku Block](https://rikublock.dev/docs/tutorials/giscus-integration/)

## 検索エンジン

投稿数が多くないとはいえ、リストが1ページを超えると検索機能が必要だと感じました。投稿をインデックス化することで、訪問者がタイトルだけでなく内容でも検索できるようになり、探している情報を見つけやすくなります。

Docusaurusで使用できる商用検索エンジンは2つあります：

- Algolia
    - 無料版では、クローラーが週に一度検索インデックスを更新します。
    - Docusaurusが公式に推奨しています。
    - インデックスの更新を手動でトリガーできます。
- [Orama](https://askorama.ai/)
    - 実装が非常に簡単です。分析が不要な場合、コードを貼り付けるだけで済みます。
    - デプロイトリガーを検出し、デプロイ時にインデックスを更新します。
    - OpenAI統合によるセマンティック検索をサポートします。
    - Algoliaのやや不格好なUIに比べて、より美しいUIを持っています。個人的にはデザインも機能と同じくらい重要視しています。

Algoliaの欠点は、デプロイ時にインデックスが自動的に更新されないことです。より良いUI/UXを考慮して、Oramaを選びました。

![orama](https://i.imgur.com/VCp0Eee.png)

_Oramaのメインページも美しい_

しかし、Oramaはまだ[韓国語のトークン化](https://docs.askorama.ai/open-source/supported-languages/)をサポートしていないため、韓国語の検索ができず、ロールバックせざるを得ませんでした 😭。私の主な読者は韓国人なので、Algoliaに戻しました。

### Algolia検索が結果を返さない場合

DocusaurusでAlgolia検索APIを使用する場合：

```json
[
  "language:en",
  [
    "docusaurus_tag:default",
    "docusaurus_tag:docs-default-3.2.1",
    "docusaurus_tag:docs-community-current",
    "docusaurus_tag:docs-docs-tests-current"
  ]
]
```

これらのパラメータは動的に生成され、リクエストと共に送信されます。これらのパラメータは検索エンジンでファセットとして知られるフィルターとして機能し、以下を含みます：

- `docusaurus-tag`
- `lang`
- `language`
- `type`
- `version`

したがって、Algoliaインデックスを作成する際には、これらのファセットを**設定する必要があります**。DocSearchインデックスが作成される際にこれらのファセットが設定されていないことがよくあります。

これは、DocSearchの承認後にDocusaurusの設定が反映される前にクローラーが実行されると発生する可能性があります。

解決策は、必要なインデックスファセットがすべて存在するか確認し、欠けているものを追加することです。

:::warning

contextualSearchを`false`に設定して無効にすると検索が機能しますが、推奨されません。

:::

![facets](https://i.imgur.com/57DUIyE.jpeg)

上記のファセットがすべて存在する必要があります。私の場合、`docusaurus_tag`ファセットが欠けていたので、手動で追加しました。

`Index > Configuration > Filtering and faceting - Facets`で`+ Add an Attribute`をクリックして欠けている属性を追加できます。

![add-an-attribute](https://i.imgur.com/x9qjnxI.png)

これで検索が正しく機能するはずです。

![search](https://i.imgur.com/XPVw3UJ.png)

### インデックス更新直後に検索が機能しない問題

- 新しい記事を投稿し、クローラーを手動でトリガーしてインデックスを更新した後、新しい記事が検索できませんでした。
- Algoliaインデックスを直接クエリすると新しい記事が表示されました。
- contextualSearchをローカルで無効にしても効果がありませんでした。
- 問題はAPIにあるようでした。
- クローラーをトリガーした直後の検索結果は正しかったが、新しいウィンドウでテストすると古いバージョンに戻りました。
- 分散検索ネットワーク（DSN）技術がインデックスの更新反映に遅延を引き起こしている可能性があると疑いました。
- 問題は約1日後に解決しました。

## i18n

英語圏からの訪問者が多く、英語のブログを運営して練習と広範なリーチを目指したいと思いました。Docusaurusはi18nをサポートしているので、実装することにしました。

```bash
yarn run write-translations --locale en
```

[Docusaurus](https://docusaurus.io/docs/i18n/tutorial)

次の課題はドキュメントの翻訳です。

### 手動翻訳...？

- 韓国語で書かれた記事を英語に翻訳したい。
- PRに`title.md`ファイルだけが含まれている場合、それを翻訳して`/en/title.md`として含めることはできるでしょうか？
- これに対するよく知られた解決策はないようです。
- Sweep AIを試しましたが、翻訳用に設計されていませんでした。
- GitHub Action + Open AIまたはDeepL APIを使用するのはどうでしょうか？
- 基本的なページ（404ページなど）は、ホスティングサービスによっては翻訳されたページにリダイレクトされないことがあります。GitHub Pagesはこれをサポートしていません。

そのようなGitHubアクションが既に存在することを発見しました（偉大な頭脳は同じことを考えるものです）。

- [GPT Translate · Actions · GitHub Marketplace · GitHub](https://github.com/marketplace/actions/gpt-translate)

有料のOpenAI APIトークンが必要ですが、既に持っていたので問題ありませんでした。

- [🌐 Add LLM Translations by github-actions\[bot\] · Pull Request #10 · songkg7/haril.dev · GitHub](https://github.com/songkg7/songkg7.github.io/pull/10/files)

かなりうまく機能します。日本語も勉強しているので、記事を書いた後に英語と日本語でコンテンツを提供する予定です。

## SEO

- フロントマターを充実させる
    - Docusaurusはフロントマターに基づいてメタ情報を生成します。
- [OpenGraph](https://www.opengraph.xyz/)でメタ情報を簡単に確認できます。

## UpdateAtとUpdateBy

オプションを有効にするだけでOKです。追加の前書きは不要です。

更新はgitの履歴に基づいて決定されるため、GitHub Actionsでクローンする際のdepthオプションを確認してください。デフォルトでは最新のコミットのみを取得するようになっています。

updateBy機能をロールバックした理由：

- 自動化されたタスクがGitHub Actionsを修正者として表示するのが気に入らなかったため。
- 編集ボタンを公開して共同作業を促進することを目指しているが、多くのPRを期待していないため。

現在のところ、updateAtだけで十分です。

## 移行のヒント: フォルダ構造の調整

![ls-tree](https://i.imgur.com/ucjhZ0G.png)

_既存のディレクトリ構造。Markdownドキュメントは`_posts`フォルダに直接配置されています。_

Docusaurusはファイルをフォルダごとに整理することをサポートしており、画像などのリソースをグループ化するのに便利です。投稿の数を考えると、フォルダ構造を一度に調整するシェルスクリプトを書くのが良いでしょう。

```bash
#!/bin/bash

# すべての.mdファイルに対して実行
for file in *.md; do
  # ファイル名から日付を抽出
  date=$(echo $file | rg -o '\d{4}-\d{2}-\d{2}')

  # 日付のディレクトリを作成（既に存在する場合は無視）
  mkdir -p "$date"

  # ファイルをディレクトリに移動
  mv "$file" "$date/"
done

# 各ディレクトリに対して実行
for dir in */; do
    # ファイル名からyyyy-MM-dd部分を削除
    new_filename=$(ls $dir | sed "s/[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}-//g")
    mv "$dir/$(ls $dir)" "$dir/$new_filename"
done
```

![after-script-execution](https://i.imgur.com/B8q31Qu.png)

すべてのファイルが一度に整然と移動されました。次に、投稿で参照されているリソースを適切なディレクトリに移動します。

`ripgrep`コマンドを使用してローカルリソースへの参照を見つけます。

![ripgrep](https://i.imgur.com/YkUnVRQ.png)

ファイルの相対パスを使用して、それらを適切に移動できます。

1. 各リソースファイルを`blog/{yyyy-MM-dd}`に移動します。
2. 投稿内の参照を`img`から`./resource.webp`に修正します。

シェルスクリプトを使用すればこれも迅速かつ容易にできますが、リソース画像が少なかったため手動で行いました。

これはあなたへの演習として残しておきます。😜（GPTに助けを求めると簡単にできるでしょう）

## 画像の代替テキスト

- 以前は画像の代替テキストを無視していましたが、スクリーンリーダーを使用する人々のためにテキスト代替が必要であることを学びました。
- このことを知って、代替テキストの重要性を認識しました。
- GitHubはこれに関するワークフローを追加しており、確認する価値があります。
    - [GitHub - github/accessibility-alt-text-bot: An action to remind users to add alt text on Issues, Pull Requests, and Discussions](https://github.com/github/accessibility-alt-text-bot)

## 結論

簡単なKPT（Keep, Problem, Try）振り返りを行います。

- 古いブログを即座にシャットダウンして新しいブログを作成した際に、リダイレクトを設定しなかったことを後悔しています。
    - 既存の訪問者を考慮して、少なくともリダイレクトを設定すべきでした。
    - URLを変更しないようにしようとしましたが、計画通りにはいきませんでした。
- リダイレクトを設定しなかったことは重大なミスでした。トラフィックログは一貫して404エラーを示しています。
- 前のプラットフォームでエレガントに維持するのが難しかった点にもっと注意を払うべきです。
    - 例：デザイン、フロントエンド技術の適用など

## 参考文献

- [About custom domains and GitHub Pages - GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [Add Giscus Comments to Docusaurus 3 Blog Posts and Doc Pages | Riku Block](https://rikublock.dev/docs/tutorials/giscus-integration/)
- [Docusaurus](https://docusaurus.io/docs/search#algolia-troubleshooting)
- [No results with Docusaurus contextual search - Open Q&A - Algolia Community](https://discourse.algolia.com/t/no-results-with-docusaurus-contextual-search/19409/7)


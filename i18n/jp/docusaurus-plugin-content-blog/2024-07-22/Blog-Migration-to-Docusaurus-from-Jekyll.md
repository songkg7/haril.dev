title: "JekyllブログをDocusaurusに移行する"
date: 2024-07-22 17:54:45 +0900
tags: [docusaurus, blog, algolia, react]
categories: null
authors: haril
description: "JekyllブログをDocusaurusにマイグレーションする過程で直面した問題とその解決方法をまとめました。"
---

最近、ブログプラットフォームの移行作業を行いました。この過程で問題に直面するたびに、エレガントな解決方法はないかと考えながらメモを取っていましたが、需要があるかもしれないと思い、記事として公開することにしました。

<!-- truncate -->

## 概要

![my-home](https://i.imgur.com/ootNbaX.png)

- 2024年4月、突然~~世界が崩壊し~~ブログが壊れました
    - Jdelivery CDNの問題
    - 少し待てば問題は解決したかもしれませんが、その間に溜まった不便さからコードを間違えて書いたのではないかと誤解しました。
- Jekyllは自由度が高くなく、メンテナンスの不便さなど全体的に管理が難しいと感じていたため、Docusaurusにマイグレーションを試みました。
    - 特にフォークを通じてブログを構成する特性上、GitHubに草の記録が残らないのが残念でした。
- O2の問題の中にdocusaurusをサポートしてほしいという要望がありましたが、使ったことがなかったため解決できませんでした - [\[FR\] support mkdocs-material, docusaurus · songkg7/o2 · Discussion #346 · GitHub](https://github.com/songkg7/o2/discussions/346)

以上の総合的な理由からブログをマイグレーションすることに決定しました。

## Docusaurusの特徴

- Reactベース
- 技術文書、ブログの両方が可能
- バージョン管理、i18nなどが整備されている
- プラグインで機能拡張が可能
- MarkdownだけでなくMDXでも文書作成が可能

## 言語

TypeScript。最近いくつかのプロジェクトでTSから離れようとする試みがありましたが、個人的には共感できませんでした。むしろJSを選ぶ理由が見つからないため、TSで環境を構築しました。

## パッケージマネージャー

Docusaurusはnpm、yarn、pnpmをすべてサポートしています。npmは使いすぎたので、今回はpnpmかyarnのどちらかを使ってみることにしました。

結論から言うと、yarnを選びました。理由は以下の通りです。

- pnpmではGitHub Actionを設定する際に気に入らない部分がありました。
- 決定的に、2023年5月23日にトス技術ブログに掲載された[パッケージマネージャー関連の記事](https://toss.tech/article/lightning-talks-package-manager)を見てyarnに変更しました。

パッケージマネージャーを選んだら、すぐにブログを確認できます。

```bash
yarn start
```

## Blog or Docs

Docusaurusにはdocsとblogモードがそれぞれ存在し、docsは技術文書のためのフォーマットです。開発ブログにはblogモードだけで十分だったため、blog onlyに設定してdocsページを削除しようかと考えました。しかし、これではメインのランディングページがなくなるため、何か物足りない感じがしました。デザインできる要素が一つ減る感じです。

悩んだ末、ランディングページを維持するためにblog onlyは諦め、docsを別の形に変更することにしました。

## Mermaid

Mermaidはダイアグラムをコードで簡単かつ迅速に描くのに適しており、普段からよく使うツールです。Docusaurusではプラグインでサポートされているので、これを含めることにしました。

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

時々数式を入力する必要があります。おそらくデータエンジニア職や数学を多用する職種なら、そのようなユースケースが多いでしょう。一般的に数式入力にはLatex方式を使用するため、Docusaurusでも使用できるように設定しましょう。

DocusaurusではKatexプラグインでLatexを使用できます。

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

CSSも含めて設定します。

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

Javaがデフォルトでサポートされていないため（...?!）、prism設定を通じてJavaを追加しました。ついでにbashも追加しました。もしよく使う言語がハイライトされない場合は適宜追加してください。

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

デプロイ方法はいくつかありますが、GitHubを離れずに一箇所で全て処理したかったため、GitHub Pagesを使うことにしました。基本ドメインも`~.github.io`のようにきれいに使えるので悪くないオプションです。

ブログ記事を作成すると自動でデプロイされるように、GitHub Actionsを通じてCI/CDを構成しましょう。まず`./.github/workflows/`にyamlファイルを一つ作成します。内容は以下の通りです。

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
    # Review gh actions docs if you want to further define triggers, paths, etc
    # https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on

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

    # Grant GITHUB_TOKEN the permissions required to make a Pages deployment
    permissions:
      pages: write # to deploy to Pages
      id-token: write # to verify the deployment originates from an appropriate source

    # Deploy to the github-pages environment
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

その後、`Settings > Pages`でSourceを`GitHub Actions`に設定すればデプロイ完了です。以降はmainブランチにコミットがプッシュされるたびに自動でデプロイ作業が進行します。

![source](https://i.imgur.com/E2pWDp6.png)

:::warning[Sourceを確認しよう]

もしSourceを`Deploy from a branch`に設定した場合、デプロイ過程でブログサービスが中断される現象が発生する可能性があります。

:::

## カスタムドメインの接続

基本のGitHubドメイン（~.github.io）を使っても大きな問題はありませんが、ブログを移行するついでにドメインも購入して、ちょっとギークな開発者の雰囲気を出してみようと思います。もし将来GitHub Pages以外のプラットフォームを使ってデプロイすることになっても、ドメインがあればSEOを維持しやすくなるでしょう。

### ドメインの購入と登録

- haril.devドメインをgodaddyで購入（年間20ドル）
- GitHub Pagesにカスタムドメインを登録する必要があります。
- 既存のドメインのIPアドレスを確認しましょう。

```bash
dig songkg7.github.io
```

![execute-dig](https://i.imgur.com/76RPRYC.png)

このドメイン情報をgodaddyのレコードに登録します。

![register-godaddy-record](https://i.imgur.com/lUEshGu.png)

その後、GitHubページの設定に行き、購入したドメインを登録すれば設定完了です。

![custom-domain](https://i.imgur.com/ImiE0kj.png)

## オプション: ドメインの認証でハイジャック防止

- プロフィール設定 -> ページ
- IPを追加したのと同様にTXTも追加

![before-verifiy](https://i.imgur.com/PH3fifE.png)

1番がキーで2番が値のような感じです。godaddyに行き、レコードに上記の値をそれぞれコピーして入れます。

![add-a-record](https://i.imgur.com/eMYlw2I.png)

レコードを追加して少し待った後、Verifyボタンをクリックすると、

![verifed-domains](https://i.imgur.com/bBquRwp.png)

このようにドメイン認証が完了し、ドメインハイジャック攻撃から保護できるようになります。~~誰がこんなドメインをハイジャックしようとするのかと思いますが...~~

## Giscusコメント

Docusaurusでは既存コンポーネントのデザインを修正できます。Giscusコンポーネントを実装して追加することで、コメント機能を簡単に実装できます。

参考: [Add Giscus Comments to Docusaurus 3 Blog Posts and Doc Pages | Riku Block](https://rikublock.dev/docs/tutorials/giscus-integration/)

## 検索エンジン

大量の投稿を発行するわけではありませんが、投稿リストが1ページを超えてスクロールが必要だと感じた瞬間から、検索機能があればいいなと思いました。投稿を検索できるようにインデックス化しておけば、タイトルだけでなく投稿内容でも検索が可能になり、訪問者が欲しい情報を見つけやすくなるでしょう。

Docusaurusで使用できる商用検索エンジンは2つあります。

- Algolia
    - 無料版ではクローラーが週に一度だけ動作して検索インデックスを更新
    - Docusaurusが公式に推奨する検索エンジン
    - 手動でトリガーしてインデックスを更新できる
- [Orama](https://askorama.ai/)
    - 適用が非常に簡単。特に分析が必要なければコードを貼り付けるだけで適用が完了
    - デプロイトリガーを検知し、デプロイが行われたときにインデックスを更新
    - openAIと連携した意味論的検索もサポート
    - やや無骨なAlgoliaに比べてUIが美しい。個人的には機能だけでなくデザインも重要視する

Algoliaはデプロイ時に自動でインデックスが更新されない点が残念で、UI/UXがより良かったOramaを適用しました。

![orama](https://i.imgur.com/VCp0Eee.png)

_oramaのメインページも美しい_

しかし、すぐにロールバックせざるを得ませんでした。Oramaではまだ[韓国語トークナイザーがサポートされていないため](https://docs.askorama.ai/open-source/supported-languages/)、韓国語検索が不可能でした 😭。メインターゲット層が国内である以上、韓国語検索は必須なので、残念ながらAlgoliaを使用することにしました。

### Algolia検索で何も表示されない場合

docusaurusでalgolia検索APIを使用する場合

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

このようなパラメータを動的に生成して一緒にリクエストします。このとき使用されるパラメータは一種のフィルターで、検索エンジンではfacetsと呼ばれ、以下のような種類があります。

- `docusaurus-tag`
- `lang`
- `language`
- `type`
- `version`

したがって、Algoliaインデックスを作成したときにこれらのfacetsは**必ずインデックスに設定されている必要があります**。しかし、しばしばこれらのfacetsが設定されていない状態でDocSearchインデックスが作成されることがあります。

DocSearchの承認を受けると、Docusaurusの使用に関連するクローラー設定の変更が反映される前にクローラーが動作することがあるためです。このとき、インデックス設定が固定されているため、Docusaurusの設定が反映されません。

解決方法は、必要なすべてのインデックスfacetsが存在するかどうかを直接確認し、存在しない場合は追加することです。

:::warning

contextualSearchを`false`にして無効化すると検索が動作しますが、お勧めしません。

:::

![facets](https://i.imgur.com/57DUIyE.jpeg)

上記のfacetsがすべて必要です。私は`docusaurus_tag` facetsが表示されなかったため、直接追加しました。

`Index > Configuration > Filtering and faceting - Facets`の`+ Add an Attribute`で欠落した属性を追加できます。

![add-an-attribute](https://i.imgur.com/x9qjnxI.png)

その後、検索が正常に動作することを確認できます。

![search](https://i.imgur.com/XPVw3UJ.png)

### 記事作成直後にインデックスを更新しても検索されない問題

- 新しい記事を投稿した後、手動でクローラーをトリガーしてインデックスを更新しましたが、検索されません。
- Algoliaインデックスに直接アクセスしてクエリを実行すると、新しい記事が正常に検索されます。
- ローカルでcontextualSearchをfalseにしても検索されませんでした。
- APIを使用するときだけ検索されないようです。
- APIパラメータを調査する必要があります。
- クローリングを再度トリガーした直後は検索結果が正常でしたが、新しいウィンドウを開いてテストすると再び以前のバージョンの検索結果が表示されました。
- DSN（分散検索ネットワーク）という技術を使用しており、分散された環境によって更新されたインデックスが画面にすぐに反映されないのではないかと疑っています。
- 一日ほど経つと正常に反映されました。

## i18n

以前から英語を母国語とする国からのユーザーが流入することが多く、ついでに英語の勉強も兼ねて英語ブログを運営してみたいと思っていました。Docusaurusではi18n国際化機能がサポートされているため、適用することにしました。

```bash
yarn run write-translations --locale en
```

[Docusaurus](https://docusaurus.io/docs/i18n/tutorial)

問題は文書の翻訳作業です。

### 翻訳を手作業で...？

- 韓国語の文書を書いたら英語に翻訳されるようにしたい。
- `title.md`ファイルだけがPRに含まれている場合、翻訳して`/en/title.md`ファイルとしてPRに含めることができるのではないか？
- 既存のものの
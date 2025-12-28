---
date: 2024-06-26 13:02:15 +0900
authors: haril
title: "開発ツールのバージョン管理、mise"
tags: [mise, version-manager]
categories: null
description: 開発ツールの複数バージョンを切り替えて使用するにはどうすればいいでしょうか？今回はmiseを使って開発環境を便利に管理する方法を見ていきます。
---

## 概要

- 一つの開発言語だけでなく、さまざまな開発言語を使っていますか？
- sdkman、rvm、nvmなどの複数のパッケージマネージャーのコマンドを覚えるのに疲れたことはありませんか？
- 開発環境をもっと速く、便利に管理したくありませんか？

miseを使えば、どの言語やツールを使っても正確に必要なバージョンを使用でき、他のバージョンに切り替えたり、プロジェクトごとにバージョンを指定することも可能です。ファイルで明示するため、チームメンバー間でどのバージョンを使うか議論するなどのコミュニケーションコストも減らせます。

これまでこの分野で最も有名だったのはasdfでした[^fn-nth-1]。しかし、最近miseを使い始めてからは、miseの方がUXの面で少し優れていると感じています。今回は簡単な使用例を紹介しようと思います。

![mise vs asdf](https://i.imgur.com/9gGGfot.png)

_意図的かどうかは分かりませんが、ウェブページさえも似ています。_

## mise-en-place、mise

`mise`（「ミーズ」と発音するようです）は開発環境設定ツールです。この名前はフランス料理の用語に由来し、大まかに「設定」または「所定の位置に置く」と訳されます。料理を始める前にすべての道具と材料が所定の位置に準備されている必要があるという意味だそうです。

簡単な特徴を列挙すると以下の通りです。

<!-- truncate -->

- ほとんどの開発言語およびツールをサポートするパッケージマネージャー
- プラグイン形式で追加可能
- Shellで書かれたasdfとは異なり、Rustで書かれている
- asdfの機能に加えて、direnvのように環境変数を設定する機能も提供

## インストール

インストールはbrewを通じて行えます。

```bash
brew install mise
# または
curl https://mise.run | sh
```

```bash
mise --version
# mise 2024.6.6
```

### miseの有効化

ガイドに従って有効化コマンドを実行します。

```bash
# bash
echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc

# zsh
echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zshrc
```

## 使用例

### 依存バージョン管理

新しい環境に就職または転職して新しい機器を受け取ったと仮定しましょう。新しい場所ではJavaを基本的に使用しているので、必要なバージョンをインストールできるか確認します。

```bash
mise ls-remote java
```

![mise version list](https://i.imgur.com/8kzA8dE.png)

:::tip[fuzzy finder, fzf]

バージョンが多すぎて困惑する場合は`mise ls-remote java | fzf`を使ってみてください

:::

`corretto-11.0.18.10.1`をインストールし、基本的なJavaバージョンとして設定しました。

```bash
mise use --global java@corretto-11.0.18.10.1
```

![languege select 1](https://i.imgur.com/PT7UxD1.png)

![languege select 2](https://i.imgur.com/Arqxubw.png)

記事執筆時点でのJavaのLTSは21です。21をインストールし、よく使っている17も一緒にインストールしてみましょう。

```bash
mise install java@17 java@21
```

![mise install java](https://i.imgur.com/pdBt4or.png)

インストールが完了した後、`mise ls`コマンドを使うとどの言語がインストールされているか確認できます。

```bash
mise ls
```

![mise list](https://i.imgur.com/lecwTLv.png)

ちょうどチームリーダーが新しいプロジェクトはJava 21でやってみようと言っています。まず**そのプロジェクトだけでJava 21を使用**してみると良さそうです。

```bash
mkdir project && cd project
touch .mise.toml
mise use java@21
```

miseを使用する際は、`.mise.toml`というファイルを使ってどのバージョンを使用するか明示します[^fn-nth-2]。

```toml
# ~/project/.mise.toml
[tools]
java = "21"
```

再度`mise ls`を実行すると、`Config Source`の変更とともに適用中のJavaバージョンが変更されたことを確認できます。

![mise list 2](https://i.imgur.com/HVX9ASk.png)

![check languege version](https://i.imgur.com/kNLORwK.png)

:::tip

これまでasdfを使っていて`.tool-versions`ファイルが既にある場合は、`tool-versions`をそのまま使用することもできます。

:::

これでプロジェクトごとに異なるJavaバージョンを使用できるようになりました[^fn-nth-3]。どのJavaバージョンを使用するかは`.mise.toml`ファイルに明示されているので、チームメンバー間での開発環境の違いによる問題も最小限に抑えられそうです。

考えてみると、Java 11はもう不要かもしれません。17をデフォルトとして使い、11は削除します。

```bash
mise use --global java@17
mise uninstall java@corretto-11.0.18.10.1
```

さて、業務で使用する言語のインストールは終わったので、個人的によく使う言語をもう少しインストールしましょう。

私はObsidianのプラグインである[O2](https://github.com/songkg7/o2)をTypeScriptで開発しています。nodeの最新安定版をインストールします。

```bash
mise use node@lts
```

Pythonを使ったデータクレンジング作業も時々あります。

```bash
mise use python@3.12.3 # Pythonはバージョンに敏感なので、できるだけ具体的なバージョンを使用しています。
```

業務用メッセンジャーボットをgolangで作ったり、トラフィック実験に使うAPIもgolangで作っています。

```bash
mise use go@latest
```

~~Rust、Rubyなどもたまに使いますが省略...~~

ああ、なんだかたくさんありますね。一度にインストールできるといいですね。

`~/.config/mise/config.toml`に明示しておき

```toml
# ~/.config/mise/config.toml
[tools]
java = "corretto-11.0.18.10.1"
node = "lts"
go = "latest"
python = "3.12.3"
```

`mise install`を使うと必要な依存関係を一度にインストールできます。

```bash
mise install
```

![install all langueges](https://i.imgur.com/jmFlah3.png)

もちろん、単にコマンドで一度に処理しても構いません。`~/.config/mise/config.toml`に明示されていない言語は自動的に追加されます。

```bash
mise use --global node@lts python@3.12.3 go@latest
```

![install multi languege one command](https://i.imgur.com/I9KtmEi.png)

![install multi languege one command 2](https://i.imgur.com/46FKxVA.png)

:::tip

私は通常、開発言語だけを管理していますが、gradleやawscliなどの他のツールもmiseを通じてバージョン管理が可能です。

:::

### 環境変数管理

> mise = asdf + **direnv**

miseを使うと、異なるプロジェクトごとに異なる個別の環境変数も指定できます。[direnv](https://direnv.net/)で得られるユーザー体験と完全に同じです。いや、むしろ`.envrc`ファイルを管理しなくても済むので、より便利に感じます。

`.mise.toml`に簡単な変数を一つ定義してみましょう。

```toml
[env]
HELLO = 'WORLD'
```

:::warning

`.mise.toml`に定義した環境変数が適用されるには、`mise trust`というコマンドを通じて確認する必要があります。これは他のプロジェクトファイルをダウンロードして自動的に実行されることでセキュリティ問題が発生するのを防ぐためです。

:::

`echo`で出力してみると、環境変数が正常に動作していることを確認できます。

![](https://i.imgur.com/jyU0Rwj.png)

`~/project/.mise.toml`に設定された情報は`~/project`ディレクトリ内でのみ有効なので、このスコープを外れるとHELLO環境変数も自動的に解除されます。

![](https://i.imgur.com/Sb11T0T.png)

`.mise.toml`を直接編集せずに、CLIを通じて管理することもできます。

```bash
mise set HELLO=world
mise set HELLO
# world
mise set
# key    value source
# HELLO  WORLD ~/project/.mise.toml
mise unset HELLO
mise set
# key    value source
```

簡単ですね？globalで環境変数を管理する必要がある場合は、前述の通り`~/.config/mise/config.toml`に定義しておけば良いです。

```bash
mise set -g GLOBAL='mise is insane!'
mise set
# key     value           source
# GLOBAL  mise is insane! ~/.config/mise/config.toml
```

特定の開発環境に必要な情報をすべて`.mise.toml`にまとめて共有すれば、はるかに簡単に環境設定を終えることができます。前述の通り、miseではパッケージバージョンも管理できるので、`asdf`もall-in-oneに近い非常に優れたツールでしたが、環境変数まで管理できる点はmiseをさらに特別なものにしています。

## 結論

このようにして大まかな開発環境の構成が終わりました。言語をインストールしただけで何が終わりだって？他の部分は[dotfile管理](https://haril.dev/blog/2023/03/26/chezmoi-awesome-dotfile-manager)を参考にしてください。皆さん、新しい機器を受け取って開発環境を構成するのに1〜2時間かかると思うので、残りの時間は開発書籍でも読もうと思います。

![image](./1.webp)

## 参考文献

- [mise](https://github.com/jdx/mise)

---

[^fn-nth-1]: 2024年6月時点でGitHub Star 21k
[^fn-nth-2]: [mise configuration](https://mise.jdx.dev/configuration.html)
[^fn-nth-3]: 例としてJavaを使用しただけで、JavaはIntelliJで設定するのが好ましいです。
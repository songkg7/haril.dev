---
title: "知っておくと便利な開発者ツール - CLIエディション"
date: 2025-03-30T14:14
tags: [cli]
description: MacOSを使用する際に非常に便利に使えるツールを紹介します。
authors: haril
image: https://i.imgur.com/zgIVoVN.png
---

![](https://i.imgur.com/zgIVoVN.png)

## 概要

最高のアプリを紹介した[前回の記事](https://haril.dev/blog/2025/03/16/Best-Tools-of-2025-Apps)に続いて、Command Line Interface（以下CLI）のおすすめツールを見ていきます。今回紹介するツールは全て、筆者が最低6ヶ月以上使用しており、新しい環境をセットアップする際に必ず導入しているものです。

## zoxide

[GitHub - ajeetdsouza/zoxide: A smarter cd command. Supports all major shells.](https://github.com/ajeetdsouza/zoxide)

一度でも訪れたディレクトリのパスを覚える必要がなくなるツールです。例えば以下のような場合です：

```bash
cd ~/.config/somewhere/longlong/path

# 次回からは以下のコマンドで直接アクセス可能
z path
```

これは非常に便利で、特定の設定ファイルがどこにあるかを覚えておく必要がなくなります。`zi`を使用すると優先順位リストが表示され、ファジー検索も可能です。

一度使うと、このツールを使用する前には戻れなくなるでしょう。

## mise

[GitHub - jdx/mise: dev tools, env vars, task runner](https://github.com/jdx/mise)

各種環境変数や言語、パッケージのバージョンマネージャーです。構造的に非常に安定性が高く、Rustで実装されているため速度も速いです。直感的なコマンドにより、学習曲線が大幅に緩和されています。

既に本ブログで[記事として紹介](https://haril.dev/blog/2024/06/27/Easy-devtools-version-management-mise)するほど、非常に愛用しているツールです。miseの役割を果たす類似ツールは他にもありますが、個人的にはその中で最もおすすめできると考えています。例えば、direnvはmiseで完全に代替可能で、nixは過度に複雑で汎用性が低いです。

様々な言語を扱うプログラミングマルチリンガルであれば、ぜひ試してみてください。

## chezmoi

[chezmoi](https://www.chezmoi.io/)

複数のデバイスを使用している場合、開発環境の同期は非常に面倒です。特にCLIを頻繁に使用する開発者にとってはなおさらです。

完全に同期を諦めるつもりでなければ、どのように同期できるか悩んでいる場合はchezmoiを試してみてください。新しい機器を購入しても、初期設定に時間を費やす必要がなくなります。

miseと同様に、本ブログに使用方法に関する[記事](https://haril.dev/blog/2023/04/08/chezmoi-basic-settings)がありますので参考にしてください。

## fzf

[GitHub - junegunn/fzf: :cherry\_blossom: A command-line fuzzy finder](https://github.com/junegunn/fzf)

GitHubスター約70k、これ以上の説明が必要でしょうか（参考までに、spring-frameworkは57kです）。

韓国人開発者のjunegunn氏が管理するオープンソースのファジーファインダーで、標準入出力パイプラインを通じて驚異的な汎用性を誇ります。

**検索が必要な場合、種類に関係なくfzfを使えば良いです。**様々なパッケージが利用しているため、fzfの存在を知らなくても、既に間接的に使用していた可能性があります。

## fd

[GitHub - sharkdp/fd: A simple, fast and user-friendly alternative to 'find'](https://github.com/sharkdp/fd)

`find`コマンドを代替します。

Rustで作成されており、`find`と比べて最大50%速いとされています。ハイライトも綺麗で、コマンドオプションも`find`よりもはるかに直感的です。

## ripgrep

[GitHub - BurntSushi/ripgrep: ripgrep recursively searches directories for a regex pattern while respecting your gitignore](https://github.com/BurntSushi/ripgrep)

`grep`コマンドを代替します。名前はripgrepですが、コマンドは`rg`を使用します。

`fd`と同様に、Rustで作成されています。`grep`と比べて、出力からより多様な情報を得ることができます。コマンドも直感的で使いやすく、速度も速いため、使わない理由がありません。

まさに'RIP, grep'です。

## lsd

![](https://i.imgur.com/VMB6SHj.png)

[GitHub - lsd-rs/lsd: The next gen ls command](https://github.com/lsd-rs/lsd)

`ls`コマンドを代替します。

`ls`コマンドは非常によく使用されるコマンドです。コマンド自体は古いものですが、出力から得られる情報は多くありません。`lsd`を使用すると、既存の`ls`を完全に代替することができます。

## bat

![](https://i.imgur.com/r04J8qn.png)

[GitHub - sharkdp/bat: A cat(1) clone with wings.](https://github.com/sharkdp/bat)

`cat`コマンドを代替します。

`cat`コマンドは単純な出力ですが、`bat`を使用するとコードハイライトを楽しむことができます。
ある程度目の利く開発者なら、行出力がシェルパイプラインを妨げるのではないかと心配するかもしれませんが、
全く妨げません。心配せずに新しい技術を楽しみましょう。

![](https://i.imgur.com/VYxO8gx.png)

_筆者は`bat`コマンドのエイリアスを`cat`に設定して使用しています。_

## HTTPie

[HTTPie – API testing client that flows with you](https://httpie.io/)

`curl`を代替します。

アプリ版もあるためどちらの記事に含めるべきか悩みましたが、個人的にはCLIでのみ使用しているため、こちらの記事に含めました。

なぜ`curl`の代わりにHTTPieを好むかというと、非常に直感的だからです。簡単なGETリクエストは以下のように送信できます：

```bash
https httpie.io/hello
```

レスポンスは以下のようにフォーマットされて返ってきます：

![](https://i.imgur.com/A0sI2WH.png)

`curl`のレスポンスを思い出してみてください。開発者も綺麗なものが好きです。

## Orbstack

[OrbStack · Fast, light, simple Docker & Linux](https://orbstack.dev/)

Docker Desktopを代替します。

Dockerコンテナを使用する際に少し速くなり、いくつかのバグも解消されます。しかし、本当の真価はVMを使用する際に発揮されます。従来VMの使用が難しかったMacでも、非常に軽量にVMを実行できます。UbuntuやKali Linuxなどのテストが必要な場合、orbstackを使用すると非常に高速で便利に管理できますので、試してみてください。個人的に非常に面白い経験でした。

## atuin

[GitHub - atuinsh/atuin: ✨ Magical shell history](https://github.com/atuinsh/atuin)

chezmoiを使用すると使用するツールの設定は同期できましたが、atuinを使用すると会社で使用したコマンド履歴を同期できます。もう会社で使用したコマンドが何だったか思い出そうと苦労する必要はありません。

:::warning

一つ残念な点は、ターミナルとしてWarpを使用している場合、atuinを完全に活用することが難しいという点です。Warpは独自の履歴機能を提供しており、atuinと干渉があります。以下のコマンドを使用すると履歴からコマンドを検索できるため、暫定的な対処として使用しています：

```bash
atuin history list | fzf
```

:::

## trash-cli

ターミナルに「ゴミ箱」機能を実装します。したがって、もう`rm -rf /`を恐れる必要はありません。いつでも復元が可能だからです。

開発者最大の敵である`rm -rf /`から解放されるというのに、それ以上の理由が必要でしょうか？

## まとめ

ここまで、個人的に非常に気に入っている様々なツールを紹介してきました。

実際、これ以外にもおすすめできるツールはいくらでもありますが、誰かが何をおすすめしても、自分の手に馴染んだものが一番良いものです。残りは自分の環境に合わせて探して使ってみましょう。

:::info

使用中の全てのツールは[こちら](https://github.com/songkg7/dotfiles/blob/main/Brewfile)で確認できます。

::: 
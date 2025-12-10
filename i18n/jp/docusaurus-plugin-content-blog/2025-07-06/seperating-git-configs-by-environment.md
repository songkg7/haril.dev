---
title: "環境ごとに異なるgit設定を適用する方法"
date: 2025-07-06T09:54:56+09:00
tags: [git]
description: "個人環境と業務環境のgit設定を条件によって分岐させる方法について説明します。"
updated: 2025-07-06T10:43
authors: haril
---

## TL;DR

- `includeIf`構文を使用すると、特定の条件を満たすgit設定ファイルのみを適用できます。
- 業務環境と個人環境を分離するのに便利です。

## 問題点

- 業務用の開発環境と個人の開発環境が分かれています。
- しかし、グローバルなgit configは個人環境を基準に設定しているため、chezmoiで設定ファイルを同期する際に、業務用の開発環境に個人の設定が上書きされてしまう問題がありました。
- 業務環境と個人環境を安定して分離するにはどうすればよいでしょうか？

<!-- truncate -->

## 解決策

Gitには、このような場合に条件ごとに設定ファイルを切り替える方法が提供されています。それが[includeIf](https://git-scm.com/docs/git-config#_includes)です。
`include`はモジュール化のように外部ファイルをgit設定に含めるものですが、ここに条件式を適用することで、特定の条件を満たす場合にのみ設定ファイルが含まれるようにするのです。

一部の会社では、コミット時にメールアドレスと名前をチェックするルールがあるため、これを守らないとコミットできません。

```bash
# ~/projects/company
git config --get user.email
# songkg7@gmail.com <- 会社のメールアドレスではなく、個人のアカウントのメールアドレスが設定されている場合、コミットは拒否されます。
```

`user.name`と`user.email`が会社のアカウントとして設定されるように構成してみましょう。まず、`~/.gitconfig-work`というファイルを作成し、次のように必要な設定を定義しました。

```toml
# ~/.gitconfig-work
[user]
name = kyungkeun.song
email = kyungkeun.song@42dot.ai
```

```toml
# ~/.gitconfig OR ~/.config/git/config
[includeIf "hasconfig:remote.*.url:git@ssh.github.company.com:**/**"]
path = ~/.gitconfig-work

[includeIf "gitdir:~/projects/company/"]
path = ~/.gitconfig-work
```

上の設定は、git remoteのパスが定義されたパスに設定されている場合に`~/.gitconfig-work`の設定を含めます。下の設定はディレクトリベースの設定で、gitが呼び出されるパスが定義されたディレクトリ内であれば`~/.gitconfig-work`の設定を含めます。両方の設定を一緒に定義して、万が一のルール違反が発生しないように設定しました。

:::note

個人的には、HOMEディレクトリに設定ファイルが散らかっているのが好きではないので、`~/.config/`以下のパスに設定することを好みます。

:::

その後、定義されたパスのgitディレクトリにアクセスしてuser.nameまたはemailを確認すると、

![](https://i.imgur.com/NBuF6bp.png)

`.git`フォルダが作成される前は個人の設定が適用され、`.git`フォルダが作成された瞬間に`includeIf`が動作して業務用の設定が適用されることが確認できます。

## 結論

在宅勤務を許可している会社では、やむを得ず個人の機器で業務を行う場合がありますが、そのような場合に便利に利用できるでしょう。

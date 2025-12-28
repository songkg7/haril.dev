---
title: "ネットワークモニタリングのためのツール集"
date: 2025-03-02T20:32
tags: [tool, network, k6, ngrinder, jmeter, locust]
categories: null
authors: haril
image: https://i.imgur.com/LuUWLuZ.png
description: ネットワークデバッグに使用できる様々なツールについて解説します。
---

![banner](https://i.imgur.com/LuUWLuZ.png)

## 概要

プレゼンテーションの準備をどこから始めればよいかわからない方のために簡単にまとめたセッションです。ネットワークモニタリングや実験に使用できる様々なツールを紹介し、その使用方法について説明します。

## 環境

ネットワークを学ぶためにはどのような環境を準備すべきでしょうか？もちろん、学びたいトピックによって異なりますが、よく使用される方法をいくつか見てみましょう。

<!-- truncate -->

### 1. EC2インスタンスの作成とパブリックIPの公開

#### メリット

- 最も一般的な方法
- 物理的に異なる機器であるため、ローカル環境の影響を受けず、最も正確なテストが可能

#### デメリット

- 有料のため、リソースの管理に注意が必要
- ネットワーク設定が必要で、インフラに関する理解が必要

### 2. Dockerで特定のOSコンテナを実行

#### メリット

- dockerさえインストールされていれば簡単にセットアップ可能
- 無料

#### デメリット

- docker execを通じてコンテナに直接アクセスする必要があり、この体験はあまり良くない
- dockerコンテナで異なるOSを起動するのは、コンテナの目的に合致した方法ではない
- ホストマシンのリソースを借りて使用するため、完全に分離されたテストではない

### 3. VM

#### メリット

- ホストマシンのOSと異なるOSを使用する必要がある場合に有用
- 物理的に分離された環境構築が可能

#### デメリット

- Macでのセットアップが複雑
- 別のOSを実行するためのリソースが多く必要

## パフォーマンステストツール

### Apache Bench

[ab - Apache HTTP server benchmarking tool - Apache HTTP Server Version 2.4](https://httpd.apache.org/docs/2.4/programs/ab.html)

ターミナルで使用できる非常にシンプルなベンチマークツール

### K6

[Load testing for engineering teams \| Grafana k6](https://k6.io/)

Grafana Labsが開発しているパフォーマンステストツール。モダンなインターフェース、使用方法、様々なユースケースをサポートしています。

[この記事](https://haril.dev/blog/2023/11/10/Spring-MVC-Traffic-Testing)でもK6を使用しました。**一般的にパフォーマンステストが必要な場合は、K6を最も推奨します**

### nGrinder

[nGrinder](https://naver.github.io/ngrinder/)

Naverが開発しているパフォーマンステストツール。分散環境テストに適しています。多くの使用事例があり、日本語のドキュメントも豊富で、日本の開発者にとってアクセスしやすいツールです。

### JMeter

[Apache JMeter - Apache JMeter™](https://jmeter.apache.org/)

### Locust

[Locust - A modern load testing framework](https://locust.io/)

Pythonで作成されたパフォーマンステストツール。環境がPythonに特化している場合、他のツールと比べて利点があります。

## 従来のネットワークモニタリングツール

- ネットワーク関連の実験には、結果を比較するためにネットワークモニタリング関連ツールの使用法が必要です

### `lsof`

```bash
lsof path/to/file # ファイルを開いているプロセスを表示
lsof -i :8080 # ローカルインターネットポートを通じて開かれているプロセスを表示
lsof -p PID # 指定されたPIDが開いているファイルの一覧を表示
```

- lsof = Lists open files（開いているファイルを一覧表示）
- どのファイルがどのプロセスによって開かれているかを表示するコマンド = ファイルディスクリプタの確認が可能
- アプリケーション開発中にポートが既に使用されているというエラーを見たときに、一度は使用したことがあるコマンド
- killコマンドと組み合わせて、8080ポートを占有しているIntelliJを強制終了するのに最もよく使用されているのではないでしょうか...

### `ifconfig`

```bash
ifconfig
```

- ネットワーク機器確認の基本コマンド
- [net-tools](https://github.com/giftnuss/net-tools)に含まれています

### `netstat`

- ネットワーク接続、ルーティングテーブル、ネットワークインターフェースの統計情報を表示するために使用されるツール

```bash
netstat -p tcp -van
```

## モダンなネットワークモニタリングツール

### やや古くなったNet-tools

- かなり古いnet-tools = **約26年**
- **最後のコミットが14年前**
- 最近ではiproute2というプロジェクトの新しいコマンドが使用されています
- ubuntu 18.04からはnet-toolsは含まれなくなりました
- Macの場合は`brew install iproute2mac`コマンドで新しいツールを使用できます

### `ip`

ifconfigに代わるコマンド

```bash
ip address show # ネットワークインターフェース情報
ip route show # ルーティング要素
ip neighbor show # ARPテーブルに登録された既知のホスト = サブネットワークに含まれるもの
```

### `ss`

- ソケットの状態を確認するユーティリティ
- netstatの改良版
- 最近のLinuxディストリビューションではnetstatよりもssの使用を推奨

```bash
ss -a # すべてのソケットを表示
ss -t # TCPソケットを表示
ss -u # UDPソケットを表示
ss -lt src :80 # 80ポートのリスニングソケットを表示
```

### Bandwhich

- ネットワーク帯域幅モニタリングツール
- どのようなリクエストが行き来しているかリアルタイムでモニタリング可能

```bash
bandwhich
```

## 実践

目的は、nginxサーバーを素早く起動し、ネットワークテスト用途として使用できるかどうかを確認することです。

- VMの作成にはOrbstackを使用
- orbstackはVMを便利に扱うための機能を提供

まず、ubuntuマシンを作成

```bash
orb create ubuntu
```

仮想マシンが正常に作成されたか確認

```bash
orb list
```

sshを通じて作成した仮想マシンにアクセス

```bash
ssh orb
# または
ssh machine@orb
```

現在接続している仮想マシンのアーキテクチャを確認

```bash
uname -a
arch
```

準備完了。

簡単なネットワークリクエストテストのためにNginXをインストール

```bash
sudo apt update
sudo apt install nginx
```

localhost または http://ubuntu.orb.local/ にアクセスしてみましょう

![](https://i.imgur.com/2OAjyz9.png)

以下のコマンドでTCP接続が作成されるのをモニタリングできます：

```bash
watch ss -taonp
```

curlやhttpieでリクエストを送信すると、すぐにtime_wait状態に変わります。これは、リクエストに対する応答を受け取った場合に即座に接続を切断するメカニズムが内部に存在するためです。

![](https://i.imgur.com/ftNEOoK.png)

![](https://i.imgur.com/XO1oqk9.png)

## まとめ

ネットワーク状態をモニタリングするための方法と使用できるツールについて見てきました。各ツールには特化した分野があり、用途も様々です。複数のツールを知っておくことがデバッグに有利でしょう。すべてのツールを詳しく知る必要はなく、「こういうものもあるんだ」程度で見ておき、必要なときに詳しく調べれば十分役立つと考えられます。

## 参考文献

- https://www.lesstif.com/lpt/linux-socket-ss-socket-statistics-91947283.html
- https://awesometic.tistory.com/125 
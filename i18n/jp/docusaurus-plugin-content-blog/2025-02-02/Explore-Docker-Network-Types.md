---
title: "Dockerのネットワークタイプ"
date: 2025-02-02T21:31
tags: [docker, network, study]
categories: null
authors: haril
description: Dockerで利用可能な様々なネットワークタイプについて解説します。
---

## 概要

Dockerには合計6つのネットワークタイプがあります：

- Bridge
- Host
- IPvlan
- MACvlan
- Overlay
- None

多くのバックエンド開発者は、ネットワークタイプについてあまり知らないか、知っていてもbridgeだけを使用しているのではないかと思います。
私も関連内容が気になり、勉強会を行いました。この記事は、その勉強会で発表した内容の一部を抜粋したものです。

[Orbstack](https://orbstack.dev/)を使用してVMを実行し、実践的な演習を行います。

<!-- truncate -->

## Dockerのネットワーク管理

```bash
orb create ubuntu
ssh orb
# ip addr showを実行してネットワークインターフェース設定を確認
sudo apt install docker.io -y
# ip addr showを実行してネットワークインターフェース設定を確認、docker0インターフェースが追加されている
sudo gpasswd -a $USER docker # sudoなしで実行できるよう現在のユーザーにdocker実行権限を追加
```

![](https://i.imgur.com/Eu3w1T0.png)

![](https://i.imgur.com/wf6vS1n.png)

docker0インターフェースはDockerのデフォルトネットワークインターフェースで、ブリッジとして動作します。

```bash
# dockerネットワークインターフェース一覧
docker network ls
```

## デフォルトネットワーク（bridge）

![](https://i.imgur.com/0m7hPgu.png)

サービスを1つ実行して、ネットワークの状態を再度確認してみましょう。

```bash
docker run -itd --rm --name one busybox
ip addr show
```

![](https://i.imgur.com/B2BuLb0.png)

docker0インターフェースに接続されているのが分かります。いくつかのサービスをさらに実行してみましょう。

```bash
docker run -itd --rm --name two busybox
docker run -itd --rm --name web nginx
ip addr show
```

![](https://i.imgur.com/KapxOIK.png)

![](https://i.imgur.com/cuV2zBx.png)

コンテナ間の通信をテストするために、まずIPを出力してみましょう。

```bash
# IP確認
docker inspect -f '{{.NetworkSettings.Networks.bridge.IPAddress}}' {container_name}
# 172.17.0.3
```

```bash
docker exec -it one sh
ping google.com
```

外部ネットワークとの通信が可能です。

```bash
ping 172.17.0.3
# 通信可能
```

先ほどnginxを実行しました。このnginxにアクセスできるでしょうか？UbuntuのIPだった198.19.249.147でアクセスしてみましょう。

![](https://i.imgur.com/GfDg2OA.png)

コンテナにアクセスするには、ポートがマッピングされている必要があります。コンテナのポートをホストマシンのポート80に接続してみましょう。

```bash
docker run -itd --rm --name web -p 80:80 nginx
```

![](https://i.imgur.com/souVECS.png)

これで十分にサイドプロジェクトをデプロイして外部に公開できます。しかし、Dockerではデフォルトネットワークの使用を推奨していません。そして、これから見ていくuser-definedネットワークの使用を推奨しています。なぜでしょうか？

## User-definedブリッジ

Dockerでユーザー定義ネットワークを使用するのは非常に簡単です。

```bash
docker network create numbers
```

デフォルトでブリッジタイプとして作成されます。

```bash
ip addr show
```

![](https://i.imgur.com/zxhdBGW.png)

仮想ネットワークデバイスが1つ追加されているのが分かります。ネットワークサブネットは172.18.0.1/16が割り当てられています。

いくつかのサービスを追加してネットワークを見てみましょう。

```bash
docker run -itd --rm --name three --network numbers busybox
docker run -itd --rm --name four --network numbers busybox
```

![](https://i.imgur.com/kvd8goV.png)

```bash
docker inspect numbers
```

![](https://i.imgur.com/4A9mUbg.png)

ネットワークに属するコンテナの情報を確認できます。なぜこのように使用する必要があるのでしょうか？

その理由は、デフォルトネットワークから完全に分離できるからです。oneにアクセスしてthreeにpingを送ってみましょう。

![](https://i.imgur.com/F9DZ0Q2.png)

twoにpingを送った時とは異なり、通信できません。しかし、threeはfourと依然として通信できます。

![](https://i.imgur.com/GCsBQ4F.png)

ネットワーク間の相互分離は非常に重要な機能です。

第二に、DNS解決機能を提供するからです。同じユーザー定義ネットワークに属している場合、IPではなくコンテナ名でも通信できます。

![](https://i.imgur.com/PfiY7qi.png)

このDNS機能は非常に便利です。コンテナ環境では、サービスが頻繁に再起動されたりデプロイされたりする可能性があるためです。コンテナは作成されるたびにIPが変更されますが、DNSではなくIPで通信する場合、頻繁にアプリケーション設定を変更する必要があるかもしれません。

### user-definedネットワークを使用すべき理由

- デフォルトネットワークから分離された環境構築が可能
- DNS解決

## Host

ポートマッピングなしでコンテナのサービスを外部に公開できないでしょうか？

```bash
docker run -itd --rm --name web --network host nginx
```

ポートを公開する代わりに、hostネットワークを使用します。ホストマシンとコンテナ間のネットワーク分離がなく、仮想インターフェースもありません。このコンテナはDockerなしで実行されているかのように動作するため、コンテナ内のサービスに直接アクセスできます。

![](https://i.imgur.com/pdGZBr1.png)

Dockerコンテナのサービスがホストから分離されず、ポートスキャンに直接さらされるため、セキュリティ上の問題が発生する可能性がある点に注意が必要です。ポートスキャンの危険性については、前回Nmapを見たときに説明したので省略します。

## IPvlan

> IPvlanネットワークは、ユーザーにIPv4とIPv6のアドレス指定の完全な制御を提供します。VLANドライバーはその上に構築され、オペレーターにレイヤー2 VLANタグ付けの完全な制御と、アンダーレイネットワーク統合に興味のあるユーザーのためのIPvlan L3ルーティングも提供します。

従来、コンテナは外部ネットワークとの通信にブリッジを使用します。これはうまく機能しますが、ネットワーク構成に複雑さを追加します。また、ネットワークホップが追加されることでパフォーマンス上のペナルティも発生します。

![](https://i.imgur.com/fr7JZI8.png)

IPvlanはネットワーク仮想化技術です。ユーザーにIPv4およびIPv6アドレス指定の完全な制御を提供します。ネットワーク分離にブリッジを使用せず、ホストネットワーク機器に直接接続することで、非常に軽量なネットワーク構成が可能です。そのため、ポートマッピングは必要ありません。

- 高性能ネットワーキング
- セキュリティ分離

```bash
docker network create -d ipvlan \
    --subnet=198.19.249.0/24 \
    --gateway=198.19.249.1 \
    -o ipvlan_mode=l2 \
    -o parent=eth0 my-ipvlan-net
```

```bash
docker run -itd --rm --name web --network my-ipvlan-net nginx
```

![](https://i.imgur.com/kdKrXYx.png)

_ネットワークインターフェースを作成しません。_

198.19.249.2にアクセスすると、nginxページが表示されるのが確認できます。

## MACvlan

> Macvlanネットワークを使用すると、コンテナにMACアドレスを割り当てることができ、ネットワーク上の物理デバイスとして表示されます。DockerデーモンはMACアドレスによってコンテナにトラフィックをルーティングします。`macvlan`ドライバーの使用は、Dockerホストのネットワークスタックを経由するのではなく、物理ネットワークに直接接続されることを期待するレガシーアプリケーションを扱う場合に最適な選択となることがあります。

![](https://i.imgur.com/PV3WpG8.png)

MACvlanを使用すると、コンテナにMACアドレスを割り当てて、ネットワーク上で物理デバイスとして表示できます。DockerデーモンはMACアドレスに基づいてコンテナにトラフィックをルーティングします。これは、Dockerホストのネットワークスタックを経由するのではなく、物理ネットワークに直接接続されることを期待するレガシーアプリケーションを扱う場合に役立ちます。

例を挙げてみましょう。Webサービスを構築し、大容量のファイルをダウンロードして使用しようとしているとします。ファイルの容量は数百ギガバイトに達する可能性がありますが、使用しているサーバーは1台です。

サーバーにネットワークカードが1枚しかない場合、問題が発生する可能性があります。これは、リソースを大量に使用する可能性があるためです。また、1Gbpsで通信する場合、この作業にかかる時間は非常に長くなり、提供するWebサービスも常に遅くなってしまいます。

そのため、4つのインターフェースすべてを監視するように設定する必要があります。このとき、MACアドレスはすべて異なるように設定する必要があります。これを可能にする技術がmacvlanです。

```bash
docker network create -d macvlan \
    --subnet=192.168.1.0/24 \
    --gateway=192.168.1.1 \
    -o parent=eth0 macvlan_net
```

- `-d macvlan`: Macvlanドライバーを使用してネットワークを作成
- `--subnet`: ネットワークのサブネットを指定
- `--gateway`: デフォルトゲートウェイを指定
- `-o parent`: ホストの実際のネットワークインターフェースを指定（ここでは`eth0`）

```bash
docker run -itd --rm --network macvlan_net --name five busybox
```

```bash
docker exec -it five sh
ip addr
# MACアドレスがホストと異なることが確認できます
```

### モード

- bridge: デフォルトモード。コンテナ同士および外部ネットワークと通信可能。ホストとの直接通信は不可能ですが、ホストに別のmacvlanインターフェースを追加することで通信可能
- 802.1q: vlanタグ付けによってネットワークを分離。マルチテナント環境で有用。各vlanに対して別のサブネットを割り当て可能 
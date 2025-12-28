---
title: "[Shell] 面倒なダミーファイルを簡単に整理する方法"
date: 2024-10-12 00:27:57 +0900
tags: [shell, gum, fd, trash-cli]
authors: haril
description: "ダミーファイルの整理が面倒ですか？この記事では、シェルスクリプトを活用してダミーファイルを簡単に整理する方法をご紹介します。"
---

## 概要

複数のデバイスでクラウドストレージを使用していますか？それなら、おそらく衝突ファイルが少しずつ増えていく経験をしたことがあるでしょう。

![衝突ファイルが増えている様子を示すアニメーション](https://i.imgur.com/wExLU6I.gif)

_隙あらば増えていく衝突ファイル_

ファイルが同期される前に編集作業を行ったり、ネットワークの問題で同期が少し遅れたりするなど、さまざまな理由で衝突ファイルは増え続けます。

個人的には常にきれいな状態を好むので、こうしたダミーファイルを定期的に削除しています。

しかし、今日は何だか繰り返しの作業が面倒に感じます。久しぶりにシェルスクリプトを書いて、開発者らしさを出してみようと思います。

<!-- truncate -->

## シェルスクリプトの作成

シェルスクリプトの知識があると、こうしたちょっとした作業を自動化するのに非常に有利です。最近ではGPTが非常に優秀なので、以下のスクリプトがよくわからない場合はGPTを活用してみるのも良いでしょう。

```bash
#!/bin/bash

# 'conflict'を含むファイルを検索
file_list=$(find . -type f -name "*conflict*" 2>/dev/null)

# 検索されたファイルがなければ終了
if [ -z "$file_list" ]; then
    echo "No files containing 'conflict' found. Exiting." >&2
    exit 0
fi

# ファイルリストを表示し、選択
echo "Found the following files containing 'conflict':"
select_files=()
i=1
while IFS= read -r file; do
    echo "$i) $file"
    select_files+=("$file")
    ((i++))
done <<< "$file_list"

# ユーザーに削除するファイルの選択を要求
echo "Enter the numbers of the files you want to delete (e.g., 1 2 3), or 'a' for all, or 'q' to quit:"
read -r selection

# 選択の処理
selected_files=()
if  $selection == "q" ; then
    echo "Operation cancelled. Exiting."
    exit 0
elif  $selection == "a" ; then
    selected_files=("${select_files[@]}")
else
    for num in $selection; do
        if [[ $num =~ ^[0-9]+$ ]] && ((num > 0 && num <= ${#select_files[@]})); then
            selected_files+=("${select_files[$((num-1))]}")
        fi
    done
fi

# 選択されたファイルがなければ終了
if [ ${#selected_files[@]} -eq 0 ]; then
    echo "No valid files selected. Exiting."
    exit 0
fi

# 選択されたファイルリストを表示
echo "The following files will be deleted:"
printf '%s\n' "${selected_files[@]}"
echo

# ユーザーに確認を要求
read -p "Are you sure you want to delete these files? (y/N): " confirm

if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    # 各選択されたファイルを削除
    for file in "${selected_files[@]}"; do
        if [ -e "$file" ]; then
            echo "Deleting: $file"
            rm -f "$file"
        else
            echo "File not found: $file"
        fi
    done
    echo "File deletion process completed."
else
    echo "Operation cancelled. No files were deleted."
fi
```

簡単にやりたい作業をいくつかのステップで書いてみました。一度実行してみましょうか？

![first-result](https://i.imgur.com/wI3rvym.gif)

本当に削除するか確認作業を経て、最終的にファイル削除が完了します 🎉

機能的には要求を十分に満たしているので、この程度でも十分に使えるでしょう。特別なパッケージが必要なわけでもないので、単にスクリプトが必要だった方はここまで読んでいただければ十分です。

私は実際に使ってみて、いくつか気になる点があったので、少しだけ優雅に改良してみようと思います。

1. `rm` は特性上、誤って削除した場合の復元が難しい
2. 削除すべきファイルが多い場合、フィルタリングが少し面倒

## もう少し優雅に

![salt](https://i.imgur.com/VkruAdx.png)

少しの~~塩~~ツールを使うだけでUXを劇的に改善できます。Linuxの基本コマンドだけを使っていた以前のスクリプトとは異なり、いくつかの依存関係が追加されますが、それだけの価値はあるでしょう。

私たちが使うツールについて簡単に紹介すると、

- `fd`[^fn-nth-1] : `find`コマンドを改善したRustベースのコマンドです。高速で簡単な検索をサポートします。
- `gum`[^fn-nth-2] : Golangで書かれた洗練されたCLI作成ツールで、シェル文法に慣れていなくても様々な機能を実装できます。
- `trash-cli`[^fn-nth-3]: 一般的に考える「ゴミ箱」の概念をCLIに持ち込んだもので、誤ってファイルを削除しても復元できるため、`rm`コマンドを恐れる必要がなくなります。

それぞれのツールはこれだけで紹介するには惜しいほど魅力的なツールです。しかし、今回の記事ですべてを扱うには内容が多すぎるため、詳細は別の記事で紹介します。

これでスクリプトを以下のように書くことができます。

```bash
#!/bin/bash

IFS=$'\n'

# gum, fd, trash-cli がインストールされているか確認
if ! command -v gum &> /dev/null || ! command -v fd &> /dev/null || ! command -v trash &> /dev/null; then
    echo "Error: This script requires 'gum', 'fd', and 'trash-cli' to be installed."
    echo "Please install them and try again."
    exit 1
fi

# fdを使用してconflictedを含むファイルを検索
file_list=$(fd -H -I -t f 'conflicted')

# 検索されたファイルがなければ終了
if [ -z "$file_list" ]; then
    gum style --foreground 208 "No files containing 'conflict' found. Exiting."
    exit 0
fi

# gum chooseを使用してファイルを選択
selected_files=$(echo "$file_list" | gum choose --no-limit --header "Select files to delete (Space to select, Enter to confirm):")

# 選択されたファイルがなければ終了
if [ -z "$selected_files" ]; then
    gum style --foreground 208 "No files selected. Exiting."
    exit 0
fi

# 選択されたファイルリストを表示
gum style --border normal --padding "1 2" --border-foreground 212 "The following files will be deleted:"
echo "$selected_files"
echo

# gum confirmを使用してユーザーに確認を要求
if gum confirm "Are you sure you want to delete these files?"; then
    # 選択されたファイルを削除
    echo "$selected_files" | tr '\n' '\0' | xargs -0 trash
    gum style --foreground 212 "File deletion process completed."
else
    gum style --foreground 213 "Operation cancelled. No files were deleted."
fi
```

:::warning

一部のコマンドはOSによっては動作しない場合があります。

:::

- `gum`と`fd`がインストールされているか確認します。
- `fd -H -I -t f 'conflict'`コマンドを使用して、ファイル名に'conflict'を含むすべてのファイルを検索します。
    - `-H`: 隠しファイルも含む
    - `-I`: 無視パターン (.gitignoreなど) を無視
    - `-t f`: 通常のファイルのみを検索
- `gum choose`を使用して、ユーザーが削除するファイルを選択できるようにします。
- 選択されたファイルリストを表示します。
- `gum confirm`を使用して、ユーザーに削除確認を要求します。
- 確認された場合、選択されたファイルを削除します。
- `gum style`を使用して、結果メッセージに色を適用します。

![result](https://i.imgur.com/evtMYm4.gif)

特に努力をしなくても、セレクターや確認画面を活用して、より直感的なスクリプト機能を実現しました。`rm`ベースのスクリプトとは異なり、削除されたファイルはいつでも復元可能なので、より安全です🔒

## 結論

今回の記事では、些細な不便さから問題を認識し、どのように解決していくかを記述しました。

私は`conflicted`というキーワードでのみ検索するようにスクリプトを書きましたが、必要に応じてこの部分を外部から注入する形に変えれば、ファイルをフィルタリングする方法としても削除できます。この記事で紹介した内容は、使い方次第で本当に役立つと思います。

最後に、この記事を最後まで読んでくださった皆さんに、コマンドの一片をプレゼントとして残しておきます。

```bash
fd -IH | fzf -m | xargs -I{} trash "{}"
```

😜💣

[^fn-nth-1]: [GitHub - sharkdp/fd: A simple, fast and user-friendly alternative to 'find'](https://github.com/sharkdp/fd)
[^fn-nth-2]: [GitHub - charmbracelet/gum: A tool for glamorous shell scripts 🎀](https://github.com/charmbracelet/gum)
[^fn-nth-3]: [GitHub - andreafrancia/trash-cli: Command line interface to the freedesktop.org trashcan.](https://github.com/andreafrancia/trash-cli)

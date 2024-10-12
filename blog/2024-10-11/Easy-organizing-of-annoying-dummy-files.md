---
title: "[Shell] 귀찮은 더미파일 쉽게 정리하기"
date: 2024-10-12 00:27:57 +0900
tags: [shell, gum, fd, trash-cli]
authors: haril
categories: null
description: "더미파일을 정리하는데 귀찮으신가요? 이번 글에서는 shell 스크립트를 활용하여 더미파일을 쉽게 정리하는 방법을 소개해드립니다."
---

## Overview

여러 기기에서 클라우드 스토리지를 사용하시나요? 그렇다면 아마도 충돌 파일이 조금씩 늘어나는 경험을 해보셨을 것 같아요.

![충돌파일이 늘어나있는 모습을 보여주는 애니메이션](https://i.imgur.com/wExLU6I.gif)

_틈만 나면 늘어나는 conflicted 파일_

파일이 동기화되기 전에 수정작업을 하거나, 네트워크 이슈로 동기화가 조금 지연되었거나 하는, 여러 이유로 충돌파일은 계속해서 늘어만 갑니다.

개인적으로 항상 깔끔한 상태를 좋아하는 편이라, 이런 더미파일들을 주기적으로 지워주고 있어요.

그런데 뭔가 오늘따라 반복적인 작업이 귀찮네요. 오랜만에 shell 을 작성해서 개발자 티를 좀 내보려 합니다.

<!-- truncate -->

## Shell 작성하기

shell 스크립트에 대한 지식이 있으면 이런 소소한 일들을 자동화하는데에 정말 유리합니다. 요즘은 GPT 가 정말 잘 만들어주기 때문에 아래 스크립트에 대해 잘 이해가 안되신다면 GPT 를 활용해보시는 것도 좋을 것 같아요.

```bash
#!/bin/bash

# 'conflict'를 포함하는 파일 검색
file_list=$(find . -type f -name "*conflict*" 2>/dev/null)

# 검색된 파일이 없으면 종료
if [ -z "$file_list" ]; then
    echo "No files containing 'conflict' found. Exiting." >&2
    exit 0
fi

# 파일 목록 출력 및 선택
echo "Found the following files containing 'conflict':"
select_files=()
i=1
while IFS= read -r file; do
    echo "$i) $file"
    select_files+=("$file")
    ((i++))
done <<< "$file_list"

# 사용자에게 삭제할 파일 선택 요청
echo "Enter the numbers of the files you want to delete (e.g., 1 2 3), or 'a' for all, or 'q' to quit:"
read -r selection

# 선택 처리
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

# 선택된 파일이 없으면 종료
if [ ${#selected_files[@]} -eq 0 ]; then
    echo "No valid files selected. Exiting."
    exit 0
fi

# 선택된 파일 목록 출력
echo "The following files will be deleted:"
printf '%s\n' "${selected_files[@]}"
echo

# 사용자에게 확인 요청
read -p "Are you sure you want to delete these files? (y/N): " confirm

if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    # 각 선택된 파일에 대해 삭제 수행
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

간단하게 원하는 작업을 몇 단계에 걸쳐서 적어봤어요. 한 번 실행해볼까요?

![first-result](https://i.imgur.com/wI3rvym.gif)

정말로 삭제할건지 확인작업을 거치고, 최종 파일 삭제까지 완료됩니다 🎉

기능적으로는 요구사항을 충실히 만족했으니 이 정도로도 충분히 사용할 수 있을거에요. 특별한 패키지가 필요한 것도 아니니 단순히 스크립트가 필요했던 분이라면 여기까지만 읽으셔도 됩니다.

저는 직접 사용해보다보니 몇 가지 아쉬운 점이 눈에 띄어서 조금만 우아하게 고쳐볼까 합니다.

1. `rm` 은 특성상 실수로 제거될 경우 복구가 어려움
2. 삭제해야할 파일이 많다면 필터링이 다소 귀찮을 수 있음

## 조금 더 우아하게

![salt](https://i.imgur.com/VkruAdx.png)

약간의 ~~소금~~도구만 사용해도 UX 를 극적으로 개선할 수 있어요. Linux 기본 명령만 사용했던 이전 스크립트와 달리 몇가지 의존성이 추가되지만, 충분한 가치는 있을거에요.

우리가 뿌릴 도구에 대해 간단하게만 소개해보자면,

- `fd`[^fn-nth-1] : `find` 명령을 개선한 Rust 기반의 명령어에요. 빠르고 간편한 검색을 지원해줘요.
- `gum`[^fn-nth-2] : Golang 으로 작성된 세련된 CLI 작성 도구로, shell 문법에 익숙하지 않더라도 다양한 기능을 구현할 수 있게 해준답니다.
- `trash-cli`[^fn-nth-3]: 일반적으로 생각하는 '휴지통'의 개념을 cli 로 가져온 것이에요. 실수로 파일을 지우더라도 복구할 수 있게 해주기 때문에, `rm` 명령어를 더 이상 두려워할 필요가 없어질거에요.

각각의 도구들은 이렇게 짧게 소개하기 아쉬울 정도로 매력적인 도구들이에요. 하지만 이번 글에서 모두 다루기에는 내용이 방대하기 때문에, 자세한 내용은 별도의 글로 소개해볼게요.

이제 스크립트를 아래처럼 작성할 수 있게 됩니다.

```bash
#!/bin/bash

IFS=$'\n'

# gum, fd, trash-cli 가 설치되어 있는지 확인
if ! command -v gum &> /dev/null || ! command -v fd &> /dev/null || ! command -v trash &> /dev/null; then
    echo "Error: This script requires 'gum', 'fd', and 'trash-cli' to be installed."
    echo "Please install them and try again."
    exit 1
fi

# fd를 사용하여 'conflicted'를 포함하는 파일 검색
file_list=$(fd -H -I -t f 'conflicted')

# 검색된 파일이 없으면 종료
if [ -z "$file_list" ]; then
    gum style --foreground 208 "No files containing 'conflict' found. Exiting."
    exit 0
fi

# gum choose를 사용하여 파일 선택
selected_files=$(echo "$file_list" | gum choose --no-limit --header "Select files to delete (Space to select, Enter to confirm):")

# 선택된 파일이 없으면 종료
if [ -z "$selected_files" ]; then
    gum style --foreground 208 "No files selected. Exiting."
    exit 0
fi

# 선택된 파일 목록 출력
gum style --border normal --padding "1 2" --border-foreground 212 "The following files will be deleted:"
echo "$selected_files"
echo

# gum confirm을 사용하여 사용자에게 확인 요청
if gum confirm "Are you sure you want to delete these files?"; then
    # 선택된 파일에 대해 삭제 수행
    trash $selected_files
    gum style --foreground 212 "File deletion process completed."
else
    gum style --foreground 213 "Operation cancelled. No files were deleted."
fi
```

- `gum`과 `fd`가 설치되어 있는지 확인합니다.
- `fd -H -I -t f 'conflict'` 명령을 사용하여 파일명에 'conflict'를 포함하는 모든 파일을 검색합니다.
    - `-H`: 숨김 파일도 포함
    - `-I`: 무시 패턴 (.gitignore 등)을 무시
    - `-t f`: 일반 파일만 검색
- `gum choose`를 사용하여 사용자가 삭제할 파일을 선택할 수 있게 합니다.
- 선택된 파일 목록을 표시합니다.
- `gum confirm`을 사용하여 사용자에게 삭제 확인을 요청합니다.
- 확인되면 선택된 파일들을 삭제합니다.
- `gum style`을 사용하여 결과 메시지에 색상을 적용합니다.

![result](https://i.imgur.com/evtMYm4.gif)

별다른 노력을 하지 않았는데도 selector 나 confirm 창을 활용해서 더 직관적인 스크립트 기능을 구현했어요. `rm` 기반의 스크립트와는 달리 삭제된 파일들은 언제든지 복구가 가능하기 때문에 훨씬 더 안전하기까지 하죠 🔒

## Conclusion

이번 글에서는 사소한 불편함에서 문제를 인식하는 것부터 어떻게 해결해 나가는지 적어봤어요.

저는 `conflicted` 라는 키워드로만 찾도록 스크립트를 적었지만, 필요에 따라 이 부분도 외부 주입 형태로 바꾼다면 파일을 필터링하는 방식으로도 지우실 수 있을거에요. 이 글에서 소개해드린 내용들은 사용하기에 따라서 정말 유용할거라고 생각해요.

마지막으로, 이 글을 끝까지 읽으신 여러분께 명령어 한 조각을 선물로 남겨둡니다.

```bash
fd -IH | fzf -m | xargs -I{} trash "{}"
```

😜💣

[^fn-nth-1]: [GitHub - sharkdp/fd: A simple, fast and user-friendly alternative to 'find'](https://github.com/sharkdp/fd)
[^fn-nth-2]: [GitHub - charmbracelet/gum: A tool for glamorous shell scripts 🎀](https://github.com/charmbracelet/gum)
[^fn-nth-3]: [GitHub - andreafrancia/trash-cli: Command line interface to the freedesktop.org trashcan.](https://github.com/andreafrancia/trash-cli)


---
sidebar_position: 2
---

# 설정

O2 는 변환된 문서를 플랫폼에 맞게 이동시키기 위한 커스텀 설정 기능을 제공합니다.

## Jekyll

```text
your jekyll project (ex: /Users/user1/Documents/GitHub/user1.github.io)
├── _posts (where the converted notes are placed)
└── assets
    └── img
        └── yyyy-MM-dd-title (where the attachments are placed. yyyy-MM-dd is replaced by the date of converting)
```

- `Jekyll path` 는 Jekyll 프로젝트의 절대 경로를 입력합니다
  - ex: /Users/user1/Documents/GitHub/user1.github.io
- 첨부파일들은 `<jekyll path>/assets/img/<yyyy-MM-dd>` 폴더에 날짜별로 복사됩니다.
- 만약 첨부파일 복사대상경로를 변경하고 싶다면 `Relative resource path` 값을 변경하면 됩니다.
  - ex: `assets/img` -> `images`
- `Auto create folders` 를 활성화하면, 필요한 폴더가 없을 경우 자동으로 생성합니다.

## Docusaurus

:::warning

현재 Docusaurus 를 위한 첨부파일 이동 기능은 지원되지 않습니다. 이 기능은 향후 업데이트에서 추가될 예정입니다.

:::

```text
your docusaurus project (ex: /Users/user1/Documents/GitHub/user1.github.io)
└── blog
    ├── yyyy-MM-dd
    │   └── title.md (where the converted notes are placed)
    │   └── attachments.webp
    └── static
        └── img
            └── yyyy-MM-dd-title (where the attachments are placed. yyyy-MM-dd is replaced by the date of converting)
```

- `Docusaurus path` 는 Docusaurus 프로젝트의 절대경로를 입력합니다
  - ex: /Users/user1/Documents/GitHub/user1.github.io
- 변환된 문서는 `<docusaurus path>/blog/yyyy-MM-dd` 폴더에 생성됩니다. 생성되는 날짜 포맷은 설정에서 변경가능합니다.
- 첨부파일은 링크되는 문서와 효과적으로 그룹화하기 위해 문서와 같은 폴더에 저장됩니다.

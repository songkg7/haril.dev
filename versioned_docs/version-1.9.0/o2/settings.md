---
sidebar_position: 3
---

# 설정

![](https://i.imgur.com/PGb8LU1.png)

## Jekyll

```text
your jekyll project (ex: /Users/user1/Documents/GitHub/user1.github.io)
├── _posts (where the converted notes are placed)
└── assets
    └── img
        └── yyyy-MM-dd-title (where the attachments are placed. yyyy-MM-dd is replaced by the date of converting)
```

- `Jekyll path` 는 Jekyll 프로젝트의 절대경로를 입력합니다
  - ex: /Users/user1/Documents/GitHub/user1.github.io
- 첨부파일들은 `assets/img/<yyyy-MM-dd>` 폴더에 날짜별로 복사됩니다.
  - 만약 경로를 변경하고 싶다면 `Relative resource path` 값을 변경하면 됩니다.
    - ex: `assets/img` -> `images`
- `Auto create folders` 를 활성화하면, 필요한 폴더가 없을 경우 자동으로 생성합니다.

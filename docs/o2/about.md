---
sidebar_position: 1
---

# About

O2 는 Obsidian Markdown 파일을 다른 플랫폼의 문법으로 변환해주는 도구입니다.

## 전제조건

### Vault 구조

기본적으로 아래와 같은 Obsidian Vault 구조를 가져야 합니다.

```text
Your vault
├── ready (변환하고 싶은 문서 경로)
├── archive (Optional. 변환이 완료된 문서의 백업 경로)
└── attachments (첨부파일 경로)
```

다른 디렉토리들은 무시됩니다.

:::tip

기본 경로 이름은 설정에서 변경할 수 있습니다.

:::

## 사용법

변환 준비가 완료된 노트가 있다면, `ready` 폴더로 이동시켜주세요.

그 후, Obsidian 의 `cmd + p` 단축키를 이용하여 `O2: convert to Other Platform` 명령을 실행해주세요.

문서는 사본을 통해 변환되며, 원본에 영향을 주지 않습니다.
`Auto archive` 토글을 활성화시킬 경우, 변환된 문서는 `archive` 폴더로 이동됩니다.

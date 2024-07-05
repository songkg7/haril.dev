---
sidebar_position: 1
---

# About

O2 는 Obsidian Markdown 파일을 Jekyll 등 다른 Markdown 플랫폼으로 변환해주는 도구입니다.

하지만 현재는 Jekyll 만 지원합니다. 앞으로 더 많은 플랫폼을 지원할 예정입니다.
추가할 기능이나 제안사항이 있으시면 알려주세요.

## 전제조건

### Vault 구조

기본적으로 아래와 같은 Obsidian Vault 구조를 가져야 합니다.

```text
Your vault
├── ready (where the notes you want to convert are placed)
├── backup (where the original notes before converting are placed)
└── attachments (where the attachments are placed)
```

다른 디렉토리들은 무시됩니다.

:::tip

기본 경로 이름은 설정에서 변경할 수 있습니다.

:::

## 사용법

변환 준비가 완료된 노트가 있다면, `ready` 폴더로 이동시켜주세요.

그 후, Obsidian 의 `cmd + p` 단축키를 이용하여 `O2: convert to Jekyll Chirpy` 명령을 실행해주세요.

변환된 파일은 `ready` 폴더에서 `backup` 폴더로 이동됩니다. 변환 중 예외가 발생하면, `backup` 폴더에 원본 노트를 확인할 수 있습니다.

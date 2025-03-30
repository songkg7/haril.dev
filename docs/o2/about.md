---
title: O2 소개
sidebar_position: 1
---

# O2 - 한 번 작성하고, 여러 플랫폼으로 변환하기

O2는 Obsidian 마크다운 파일을 Jekyll이나 Docusaurus와 같은 다른 플랫폼의 형식으로 변환해주는 Obsidian 플러그인입니다. "O2"라는 이름은 "Obsidian to Other platforms"를 의미합니다.

## 주요 기능

- Obsidian 마크다운을 Jekyll (Chirpy 테마) 형식으로 변환
- Obsidian 마크다운을 Docusaurus 형식으로 변환
- 처리된 파일 자동 아카이빙
- 사용자 정의 가능한 폴더 구조
- frontmatter와 메타데이터 보존
- 첨부파일과 이미지 처리

## 사전 요구사항

### Vault 구조

Obsidian vault는 다음과 같은 폴더 구조를 가져야 합니다 (폴더 이름은 설정에서 변경 가능):

```text
Your vault
├── ready (변환할 노트를 위치시키는 폴더)
├── archive (변환이 완료된 노트가 보관되는 폴더)
└── attachments (첨부파일이 저장되는 폴더)
```

변환 과정에서 다른 폴더들은 무시됩니다.

## 사용 방법

1. 변환하고 싶은 노트를 `ready` 폴더로 이동
2. Obsidian의 명령 팔레트를 `cmd + p` (macOS) 또는 `ctrl + p` (Windows/Linux)로 열기
3. `O2: Grammar Transformation` 명령을 검색하고 실행
4. 설정에 따라 파일이 변환됩니다

## 추천 플러그인

O2는 다음 Obsidian 플러그인들과 잘 작동합니다:

- [imgur](https://github.com/gavvvr/obsidian-imgur-plugin): 이미지 처리에 추천
- [Update frontmatter time on edit](https://github.com/beaussan/update-time-on-edit-obsidian): 정확한 타임스탬프 유지에 도움

## 지원 플랫폼

현재 O2는 다음 플랫폼으로의 변환을 지원합니다:

- Jekyll (Chirpy 테마)
- Docusaurus

각 플랫폼은 필요에 따라 사용자 정의할 수 있는 고유한 설정과 구성을 가지고 있습니다.

## 기여하기

O2에 기여하는 것을 환영합니다! 기여하고 싶으시다면:

1. 큰 변경사항의 경우, 먼저 이슈나 토론을 열어주세요
2. 저장소를 포크하고 기능 브랜치를 만드세요
3. 변경사항을 만들고 테스트가 통과하는지 확인하세요
4. 풀 리퀘스트를 제출하세요

O2 빌드와 개발에 대한 자세한 정보는 [Obsidian 플러그인 개발 문서](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)를 참조하세요.

## 후원

O2가 도움이 되었고 개발을 지원하고 싶으시다면:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V8KX38Q)

## 라이선스

O2는 [MIT 라이선스](https://choosealicense.com/licenses/mit/) 하에 배포됩니다.

---
title: Docusaurus
sidebar_position: 4
---

# Docusaurus 통합

O2는 Obsidian 노트를 Docusaurus 블로그 포스트로 변환하는 기능을 제공하며, Docusaurus의 블로그 기능과 마크다운 확장을 지원합니다.

## 프로젝트 구조

Docusaurus와 함께 O2를 사용할 때의 프로젝트 구조는 다음과 같습니다:

```text
your-docusaurus-project/
└── blog/
    ├── YYYY-MM-DD/      # 날짜 기반 포스트 폴더
    │   ├── title.md     # 변환된 블로그 포스트
    │   └── assets/      # 포스트별 첨부파일
    └── authors.yml      # 선택사항: 작성자 정보
```

## 기능

### 마크다운 변환
O2는 다양한 Obsidian 특화 마크다운 기능을 Docusaurus 호환 형식으로 자동 변환합니다:

1. **위키 링크**: `[[노트 제목]]` → `[노트 제목](노트-제목)`
2. **콜아웃**: Docusaurus 스타일 알림으로 변환
3. **각주**: 각주를 올바르게 보존하고 형식화
4. **주석**: HTML 주석으로 변환
5. **Front Matter**: Docusaurus 특화 front matter 필드 추가

### Front Matter 처리
- 기존 front matter 보존
- 필수 Docusaurus 필드 추가:
  - `slug`
  - `title`
  - `authors` (설정 가능)
  - `tags` (존재하는 경우)
- 날짜 필드 적절히 처리

### 파일 구성
- 더 나은 구성을 위한 날짜 기반 폴더 생성
- 포스트와 함께 첨부파일 유지
- 다양한 날짜 추출 패턴 지원

## 설정

### 필수 설정
1. **Docusaurus 경로**: Docusaurus 프로젝트의 절대 경로 설정
   ```
   예시: /Users/username/website
   ```

2. **작성자**: 블로그 포스트의 기본 작성자 설정
   ```
   형식: 작성자1, 작성자2
   ```

### 날짜 추출 패턴
O2는 블로그 포스트 구성을 위한 다양한 날짜 패턴을 지원합니다:

1. **기본 패턴**: `YYYY-MM-DD`
2. **시간 포함**: `YYYY-MM-DD-HH-mm`
3. **사용자 정의 패턴**: 설정을 통해 구성 가능

## 사용 예시

1. Obsidian에서 새 노트 작성:
   ```markdown
   ---
   title: Docusaurus 시작하기
   tags: [docusaurus, 튜토리얼]
   ---

   # 시작하기

   유용한 팁이 있습니다:

   > [!tip]
   > Docusaurus는 멋집니다!

   자세한 내용은 [[설치 가이드]]를 확인하세요.

   여기 이미지가 있습니다: ![[screenshot.png]]
   ```

2. 노트를 `ready` 폴더로 이동

3. O2 변환 명령 실행

4. Docusaurus에서의 변환된 파일:
   ```markdown
   ---
   title: Docusaurus 시작하기
   authors: [default-author]
   tags: [docusaurus, 튜토리얼]
   slug: docusaurus-시작하기
   ---

   # 시작하기

   유용한 팁이 있습니다:

   :::tip
   Docusaurus는 멋집니다!
   :::

   자세한 내용은 [설치 가이드](설치-가이드)를 확인하세요.

   여기 이미지가 있습니다: ![screenshot](./screenshot.png)
   ```

## 문제 해결

1. **Front Matter 문제**
   - 필수 필드가 있는지 확인
   - 작성자 이름이 authors.yml 파일과 일치하는지 확인
   - slug 생성이 올바른지 확인

2. **이미지 링크**
   - 이미지가 블로그 포스트 폴더에 올바르게 복사되었는지 확인
   - 상대 경로가 올바른지 확인
   - 이미지 확장자가 지원되는지 확인

3. **날짜 처리**
   - 날짜 패턴이 설정된 패턴과 일치하는지 확인
   - 날짜가 유효한지 확인
   - 폴더 구조가 예상 형식과 일치하는지 확인

4. **알림 변환**
   - 콜아웃 구문이 올바른지 확인
   - 사용자 정의 콜아웃 유형이 올바르게 매핑되는지 확인
   - Docusaurus에서 알림 스타일이 적용되는지 확인

## 알려진 제한사항

1. **첨부파일 처리**
   - 현재 첨부파일은 포스트와 함께 저장됨
   - 전역 첨부파일 디렉토리 지원 없음
   - 이미지가 아닌 첨부파일에 대한 제한적 지원

2. **MDX 호환성**
   - 일부 MDX 기능은 수동 조정이 필요할 수 있음
   - 복잡한 JSX 컴포넌트는 검토가 필요할 수 있음

3. **버전 관리**
   - 내장 버전 관리 지원 없음
   - 버전 관리된 문서는 수동 관리 필요


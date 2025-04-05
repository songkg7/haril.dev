---
title: Jekyll
sidebar_position: 3
---

# Jekyll 통합

O2는 Obsidian 노트를 Jekyll 블로그 포스트로 변환하는 포괄적인 지원을 제공하며, 특히 Chirpy 테마에 최적화되어 있습니다.

## 프로젝트 구조

Jekyll과 함께 O2를 사용할 때의 프로젝트 구조는 다음과 같습니다:

```text
your-jekyll-project/
├── _posts/           # 변환된 노트가 위치하는 곳
└── assets/
    └── img/         # 첨부파일이 저장되는 곳
        └── YYYY-MM-DD-title/  # 각 포스트의 첨부파일을 위한 날짜 기반 폴더
```

## 기능

### 마크다운 변환
O2는 다양한 Obsidian 특화 마크다운 기능을 Jekyll 호환 형식으로 자동 변환합니다:

1. **위키 링크**: `[[노트 제목]]` → `[노트 제목](노트-제목)`
2. **리소스 링크**: 이미지와 파일 링크를 Jekyll 자산 경로로 변환
3. **콜아웃**: Obsidian 콜아웃을 Jekyll 호환 형식으로 변환
4. **각주**: 각주를 올바르게 보존하고 형식화
5. **주석**: HTML 주석을 적절히 처리
6. **임베드**: 파일 임베드 처리
7. **중괄호**: 이중 중괄호를 Jekyll raw 태그로 선택적 변환

### Front Matter 처리
- 기존 front matter 보존
- 'updated' 타임스탬프 기반으로 날짜 필드 업데이트 가능
- 필요한 Jekyll front matter 필드 자동 추가

### 파일 구성
- 변환된 파일을 Jekyll의 `_posts` 디렉토리로 자동 이동
- 첨부파일을 위한 날짜 기반 폴더 생성
- 적절한 파일 명명 규칙 유지 (`YYYY-MM-DD-title.md`)

## 설정

### 필수 설정
1. **Jekyll 경로**: Jekyll 프로젝트의 절대 경로 설정
   ```
   예시: /Users/username/blog
   ```

2. **상대 리소스 경로**: 첨부파일이 저장될 위치 설정
   ```
   기본값: assets/img
   ```

### 선택적 기능
1. **중괄호 변환**
   - 활성화 시 `{{ variable }}` 를 `{% raw %}{{ variable }}{% endraw %}` 로 변환
   - Liquid 템플릿 구문을 그대로 표시해야 할 때 유용

2. **Frontmatter 시간 업데이트**
   - 활성화 시 'date' 필드를 'updated' 타임스탬프로 업데이트
   - 포스트 날짜를 정확하게 유지하는 데 도움

## 사용 예시

1. Obsidian에서 새 노트 작성:
   ```markdown
   ---
   title: 첫 번째 포스트
   date: 2024-03-30
   categories: [기술, 튜토리얼]
   tags: [obsidian, jekyll]
   ---

   # 첫 번째 포스트

   다양한 Obsidian 기능을 사용한 테스트 포스트입니다:

   > [!note]
   > 이것은 콜아웃입니다

   여기 이미지가 있습니다: ![[image.png]]

   그리고 다른 노트로의 [[위키 링크]]가 있습니다.
   ```

2. 노트를 `ready` 폴더로 이동

3. O2 변환 명령 실행

4. Jekyll에서의 변환된 파일:
   ```markdown
   ---
   title: 첫 번째 포스트
   date: 2024-03-30
   categories: [기술, 튜토리얼]
   tags: [obsidian, jekyll]
   ---

   # 첫 번째 포스트

   다양한 Obsidian 기능을 사용한 테스트 포스트입니다:

   {: .prompt-info }
   > 이것은 콜아웃입니다

   여기 이미지가 있습니다: ![image](/assets/img/2024-03-30-my-first-post/image.png)

   그리고 다른 노트로의 [위키 링크](wiki-link)가 있습니다.
   ```

## 문제 해결

1. **이미지 누락**
   - Jekyll 경로가 올바르게 설정되었는지 확인
   - assets 디렉토리가 존재하고 쓰기 권한이 있는지 확인
   - 이미지가 Obsidian 첨부파일 폴더에 있는지 확인

2. **잘못된 링크**
   - 상대 리소스 경로가 올바르게 설정되었는지 확인
   - 파일 이름이 예상 형식과 일치하는지 확인

3. **Front Matter 문제**
   - front matter가 유효한 YAML인지 확인
   - Jekyll 테마에 필요한 필드 확인
   - 날짜가 올바른 형식(YYYY-MM-DD)인지 확인

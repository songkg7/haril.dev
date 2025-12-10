---
title: Daily note 작성법
tags: [tip]
description: daily note 를 적는 방법에 대해 개인적인 팁을 공유합니다.
date: 2025-06-05T19:27
authors: haril
---

## Overview

회사에서 시켜서, 혹은 개인의 니즈로 인해 daily 라고 부르는 일일 노트를 적곤 한다. 

필자 또한 daily 를 적고 있다. 처음에는 회사의 요구로 인해 적기 시작했지만,
적는 방식에 대해 많은 시행착오를 거쳐가면서 현재는 개인적인 용도로도 많이 적게 되었다.

이런 daily 는 어떻게 작성해야 편하게 적으면서도 활용도를 최대한 높일 수 있는지 간단하게 적어보려고 한다.

<!-- truncate -->

## daily 를 쓰는 이유

- 그 날 있었던, 했던 일 또는 사건에 대한 정리
- 내일 해야할 일에 대한 정리
    - 그리고 이 내용을 daily scrum 으로 활용함
- 매일 적지 않으면 무엇을 하려했는지 휘발되는 경우가 많음
- daily 를 적다가 필요하다면 특정 키워드는 별개의 글로 분리할 수도 있음
    - daily 를 모든 글의 진입점으로 접근하는 방식

## daily 노트 쓰는 법

- Obsidian template 활용
- 할 일(todo)은 task 로 생성
- Dataview 를 사용하여 남은 todo 를 다음날로 넘김
- todo 에 체크할 경우, 어느날짜에 체크했는지 표시됨
    - Obsidian 설정에서 해당 옵션 활성화 필요
- 태그 등으로 최대한 구체적인 메타데이터를 남겨서 분석에 활용
- 백업 및 동기화는 git, iCloud Drive 를 활용 중
    - iCloud Drive 를 사용하여 멀티 디바이스 동기화를 구성하고, git 으로 2차 백업을 유지한다.
    다만 `daily/` 등의 민감한 파일이 들어있는 폴더는 `.gitignore` 에 명시하여 실수로 공유되는 것을 방지했다.

```
## Memo

- 앨저넌에게 꽃을
- [ ] Kafka Schema registry research 공유 #code-review

## Daily Scrum

2025-06-05
- 포스팅하기

todo
- pipeline 로직 수정
- Kafka schema registry review

## Review

```

위 샘플은 daily 노트의 간략한 형태다. 첫 번째 라인에서 Memo 섹션을 확인할 수 있다. 간단한 메모와 함께 todo 를 기록해두는데,
이후 생성할 daily 노트의 review 섹션에 포함되게 되어서 수시로 살펴볼 수 있게끔 하고 있다.

Daily Scrum 섹션은 이 daily 를 작성하는 날에 무엇을 했고, 그 다음날에는 무엇을 할지를 간략하게 기록한다.
이 부분은 팀원들과 공유하는 용도로 쓰고 있다.

마지막으로 Review 섹션은 앞서 언급했듯, 아직 완료되지 않은 task 를 다시 살펴볼 수 있게 하기 위한 섹션이다.
이 부분에 대해서는 아래 Obsidian Template 문단을 참고.

## Plugin

매번 같은 형태의 타이틀을 작성하는 것은 매우 번거로우므로, 몇가지 플러그인을 활용해서 자동화한다.

### Obsidian Template

실제로 사용중인 daily template 은 아래처럼 만들어놓고 사용하고 있다.

```text
---
title: {{title}}
date: {{date}}T{{time}}
tags: daily
description: 
---

## Memo

## Daily Scrum

{{date}}
- 

todo
- 

---

## Review

``dataview
task
from "daily"
where !checked AND date(file.name) <= date(this.file.name) - dur(1 day)
``
```

:::warning

escape 문자 문제로 Review 섹션의 코드블럭의 역따옴표 개수가 맞지 않으니 유의

:::

![](https://i.imgur.com/QbtOw9f.png)

업무내용을 적고 있어서 구체적인 부분들은 블러처리했지만, 해결되지 않은 todo 는 다음날의 daily 에 보이게 되는 구조다. todo 를 체크하면 자연스럽게 리스트에서 사라진다.

todo 옆에는 어떤 주제인지 간단한 태그를 남겨두곤 하는데, 이럴 경우 Dataview 에서 특정 태그가 달려있는 todo list 만 추출해낼 수 있기 때문에 유용하다.

### Dataview

Dataview 는 Obsidian 의 핵심 플러그인 중 하나로, 노트 안에 작성된 메타데이터들을 쿼리할 수 있게 한다. 자세한 정보는 [공식 문서](https://blacksmithgu.github.io/obsidian-dataview/)를  참고해주시고, 이 글에서는 daily 를 적을 때 활용한 부분에 대해서만 설명한다.

예시로, 아래는 code-review 태그를 붙여둔 task 를 모아보는 쿼리다.

```dataview
TASK
WHERE !completed AND contains(tags, "#code-review")
```

### Templater

[GitHub - SilentVoid13/Templater: A template plugin for obsidian](https://github.com/SilentVoid13/Templater)

복잡한 템플릿 생성을 도와주는 플러그인. daily 에서는 간단하게 사용하고 있다. Dataview 와 조합해서 기본 템플릿 문법으로 처리하기 어려운 부분을 해결하고 있다.

## Conclusion

- daily 노트는 자신의 워크플로우에 최적화된 템플릿을 만들어서 작성하도록 하자.
- 전날 어떤 일들을 했는지 메모해두고, 다음날로 컨텍스트가 이어지도록 설계하면 유용하다.
- 메타데이터를 잘 남겨두면 Dataview 등을 통해 분석하기 매우 편하다.


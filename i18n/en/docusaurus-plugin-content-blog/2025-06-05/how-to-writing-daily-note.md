---
title: How to Write Daily Notes
tags: [tip]
description: Sharing personal tips on how to write daily notes.
date: 2025-06-05T19:27
authors: haril
---

## Overview

Whether it's required by the company or for personal needs, many of us write daily notes.

I also write daily notes. Initially, I started because it was a company requirement, but after much trial and error with my writing methods, I now write them frequently for personal use as well.

I'd like to briefly share how to write these daily notes comfortably while maximizing their utility.

<!-- truncate -->

## Why Write Daily Notes?

- To summarize the events, tasks, or incidents of the day.
- To organize tasks for the next day.
    - This content is then used for the daily scrum.
- If not written daily, it's easy to forget what you intended to do.
- If needed, specific keywords from the daily note can be separated into a new article.
    - Approaching the daily note as an entry point to all other writings.

## How to Write Daily Notes

- Utilize Obsidian templates.
- Create to-do items as tasks.
- Use Dataview to carry over unfinished todos to the next day.
- When a todo is checked off, it shows the date it was completed.
    - This option needs to be enabled in Obsidian settings.
- Leave as much specific metadata as possible, such as tags, for analysis.
- I use git and iCloud Drive for backup and synchronization.
    - While I use iCloud Drive for syncing between devices, I specify sensitive folders like `daily/` in `.gitignore` to avoid committing them to git.

```
## Memo

- Flowers for Algernon
- [ ] Share Kafka Schema registry research #code-review

## Daily Scrum

2025-06-05
- Write a post

todo
- Modify pipeline logic
- Kafka schema registry review

## Review

```

The sample above is a brief format of a daily note. You can see the Memo section on the first line. I jot down simple memos along with todos, which are then included in the review section of the next daily note for regular review.

The Daily Scrum section briefly records what was done on the day the daily note was written and what will be done the next day. I use this part for sharing with team members.

Finally, the Review section, as mentioned earlier, is for reviewing unfinished tasks. Refer to the Obsidian Template section below for this part.

## Plugins

Since writing the same title format every time is very cumbersome, I automate it using a few plugins.

### Obsidian Template

I use the daily template below.

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
where !completed AND date(file.name) <= date(this.file.name) - dur(1 day)
``
```

:::warning

Be aware that the number of backticks in the code block of the Review section may be incorrect due to escape character issues.

:::

![](https://i.imgur.com/QbtOw9f.png)

I've blurred out the specific details as they contain work-related content, but the structure is such that unresolved todos appear in the next day's daily note. Checking off a todo naturally removes it from the list.

I often leave a simple tag next to a todo to indicate its topic. This is useful because you can then use Dataview to extract a todo list with a specific tag.

### Dataview

Dataview is one of Obsidian's core plugins, allowing you to query metadata written in your notes. For more information, please refer to the [official documentation](https://blacksmithgu.github.io/obsidian-dataview/), and in this article, I will only explain the parts utilized when writing daily notes.

For example, the query below gathers tasks tagged with #code-review.

```dataview
TASK
WHERE !completed AND contains(tags, "#code-review")
```

### Templater

[GitHub - SilentVoid13/Templater: A template plugin for obsidian](https://github.com/SilentVoid13/Templater)

A plugin that helps create complex templates. I use it simply for daily notes. It works in combination with Dataview to solve parts that are difficult to handle with the basic template syntax.

## Conclusion

- Let's create and write daily notes using a template optimized for your workflow.
- It's useful to memo what you did the previous day and design it so that the context carries over to the next day.
- Leaving good metadata makes it very convenient to analyze later using tools like Dataview.

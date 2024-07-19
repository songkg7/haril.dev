---
sidebar_position: 1
---

# Introduction

O2 is a tool that converts Obsidian Markdown files into the syntax of other platforms.

:::warning[Breaking Changes]

Previously, converted files were automatically moved to an archive. If you wanted to revise the document, you had to open the blog platform project in a code editor or move the archived document back, which was inconvenient. This often led to discrepancies between the original Obsidian document and the published version as more revisions were made.

Given that blog posts often undergo frequent revisions shortly after being published, it was necessary to implement a loose synchronization state that allows for some level of revision within Obsidian and frequent updates to the blog platform.

Therefore, starting from version 2.0, **converted files are no longer moved to an archive**. The conversion process now creates a copy in place, allowing you to continue revisions within Obsidian. If you no longer wish to make changes in Obsidian, you can manually exclude the document from the ready directory.

You can enable the `Auto archive` toggle to use an automatic backup feature similar to the previous version.

:::

## Prerequisites

### Vault Structure

Your Obsidian Vault should have the following structure:

```text
Your vault
├── ready (Path for documents you want to convert)
├── archive (Optional. Backup path for converted documents)
└── attachments (Path for attachments)
```

Other directories will be ignored.

:::tip

You can change the default path names in the settings.

:::

## Usage

1. Move the note you want to convert to the `ready` folder.
2. Use the `cmd + p` shortcut in Obsidian to run the `O2: convert to Other Platform` command.
3. The document will be converted to the syntax of the platforms defined in the settings.
    - The document is converted through a copy, so the original remains unaffected.
    - If the `Auto archive` toggle is enabled, the converted document will be moved to the `archive` folder.

:::info[Why Use the Ready Concept]

- O2 follows the PARA paradigm, where documents are not fixed to a specific category and can be moved to different categories as needed.
- If we relied solely on front matter for categorization, we would need to scan the front matter of all documents to find those to convert, which could cause performance issues for users with a large number of documents. By using a **dedicated directory for conversion**, O2 efficiently narrows the search scope.

:::

## Articles

- [Developing the O2 Plugin](https://haril.dev/blog/2023/02/22/develop-obsidian-plugin)
- [Contributing to Open Source Obsidian Plugins](https://l2hyunn.github.io/posts/Obsidian-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4-%EA%B8%B0%EC%97%AC%ED%95%98%EA%B8%B0/)

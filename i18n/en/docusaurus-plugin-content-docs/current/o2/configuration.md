---
sidebar_position: 2
---

# Configuration

O2 offers custom configuration options to transfer converted documents to the appropriate platform.

## Jekyll

```text
your jekyll project (e.g., /Users/user1/Documents/GitHub/user1.github.io)
├── _posts (where the converted notes are placed)
└── assets
    └── img
        └── yyyy-MM-dd-title (where the attachments are placed. yyyy-MM-dd is replaced by the date of conversion)
```

- Enter the absolute path of your Jekyll project in `Jekyll path`.
  - e.g., /Users/user1/Documents/GitHub/user1.github.io
- Attachments are copied to the `<jekyll path>/assets/img/<yyyy-MM-dd>` folder, organized by date.
- If you want to change the destination path for attachments, modify the `Relative resource path` value.
  - e.g., `assets/img` -> `images`
- Enable `Auto create folders` to automatically create necessary folders if they do not exist.

## Docusaurus

:::warning[WIP]

Attachment transfer is not yet supported.

:::

```text
your docusaurus project (e.g., /Users/user1/Documents/GitHub/user1.github.io)
└── blog
    ├── yyyy-MM-dd
    │   └── title.md (where the converted notes are placed)
    │   └── attachments.webp
    └── static
        └── img
            └── yyyy-MM-dd-title (where the attachments are placed. yyyy-MM-dd is replaced by the date of conversion)
```

- Enter the absolute path of your Docusaurus project in `Docusaurus path`.
  - e.g., /Users/user1/Documents/GitHub/user1.github.io
- Converted documents are created in the `<docusaurus path>/blog/yyyy-MM-dd` folder. The date format can be changed in the settings.
- Attachments are stored in the same folder as the linked document to effectively group them together.

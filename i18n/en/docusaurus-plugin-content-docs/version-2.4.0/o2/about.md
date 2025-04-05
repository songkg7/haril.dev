---
title: About O2
sidebar_position: 1
---

# O2 - Write Once, Convert to Multiple Platforms

O2 is an Obsidian plugin that allows you to convert your Obsidian Markdown files to other Markdown platforms such as Jekyll or Docusaurus. The name "O2" represents the idea of "Obsidian to Other platforms".

## Features

- Convert Obsidian Markdown to Jekyll (Chirpy theme) format
- Convert Obsidian Markdown to Docusaurus format
- Automatic archiving of processed files
- Customizable folder structure
- Preserves frontmatter and metadata
- Handles attachments and images

## Prerequisites

### Vault Structure

Your Obsidian vault should have the following folder structure (folder names can be customized in settings):

```text
Your vault
├── ready (where the notes you want to convert are placed)
├── archive (where the original notes before converting are placed)
└── attachments (where the attachments are placed)
```

Other folders in your vault will be ignored during the conversion process.

## How to Use

1. Move the notes you want to convert to the `ready` folder
2. Open Obsidian's command palette using `cmd + p` (macOS) or `ctrl + p` (Windows/Linux)
3. Search for and execute the command `O2: Grammar Transformation`
4. Your files will be converted according to your settings

## Recommended Plugins

O2 works well with the following Obsidian plugins:

- [imgur](https://github.com/gavvvr/obsidian-imgur-plugin): Recommended for image handling
- [Update frontmatter time on edit](https://github.com/beaussan/update-time-on-edit-obsidian): Helps maintain accurate timestamps

## Platform Support

Currently, O2 supports conversion to:

- Jekyll (Chirpy theme)
- Docusaurus

Each platform has its own specific settings and configurations that can be customized according to your needs.

## Contributing

We welcome contributions to O2! If you'd like to contribute:

1. For major changes, please open an issue or discussion first
2. Fork the repository and create your feature branch
3. Make your changes and ensure tests pass
4. Submit a pull request

For detailed information about building and developing O2, please visit [Obsidian Plugin Development Documentation](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin).

## Support

If you find O2 helpful and would like to support its development:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V8KX38Q)

## License

O2 is published under the [MIT License](https://choosealicense.com/licenses/mit/).

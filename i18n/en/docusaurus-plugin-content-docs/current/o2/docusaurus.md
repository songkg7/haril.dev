---
title: Docusaurus
sidebar_position: 4
---

# Docusaurus Integration

O2 supports converting Obsidian notes to Docusaurus blog posts while maintaining compatibility with Docusaurus's blog features and markdown extensions.

## Project Structure

When converting notes to Docusaurus, O2 follows this structure:

```text
your-docusaurus-project/
├── blog/
│   └── YYYY-MM-DD/
│       ├── title.md
│       └── assets/
└── static/
    └── img/
        └── blog/
            └── YYYY-MM-DD-title/
                └── attachments
```

- Blog posts are organized in date-based folders
- Assets are stored alongside their respective posts
- Static assets are maintained in the img directory

## Features

O2 automatically converts various Obsidian-specific markdown features to Docusaurus-compatible format:

### Wiki Links
- Internal links (`[[note]]`) are converted to relative URLs
- Alias links (`[[note|alias]]`) preserve the alias text
- Heading links (`[[note#heading]]`) are converted to anchor links

### Resource Links
- Image links are updated to use Docusaurus's asset path
- File attachments are copied to the static directory
- Relative paths are converted to absolute URLs

### Callouts
- Obsidian callouts are converted to Docusaurus admonitions
- Callout types (note, warning, etc.) are preserved
- Custom styling is maintained where possible

### Footnotes
- Inline footnotes are preserved
- Reference-style footnotes are maintained
- Footnote numbering is automatically handled

### Comments
- HTML comments are preserved
- Obsidian-specific comments are handled appropriately

### Front Matter
- Existing fields are preserved
- Required Docusaurus fields are added:
  - `slug`
  - `title`
  - `authors`
  - `tags`

## File Organization

- Posts are organized in date-based folders (YYYY-MM-DD)
- Assets are stored alongside their posts
- Date extraction supports various patterns:
  - Filename: `YYYY-MM-DD-title.md`
  - Front matter: `date` field
  - File creation date (fallback)

## Configuration

Required settings:
- Absolute path to Docusaurus project
- Default authors for blog posts

Optional settings:
- Date extraction patterns
- Asset organization preferences
- Auto-archive after conversion

## Usage Example

Original Obsidian note:
```markdown
---
title: My Note
tags: [obsidian, notes]
---

# My First Note

Here's an [[internal link]] and an image:
![[image.png]]

> [!note]
> This is a callout

Some text with a [^footnote].

[^footnote]: This is the footnote text.
```

Converted Docusaurus post:
```markdown
---
slug: my-note
title: My Note
authors: [default]
tags: [obsidian, notes]
---

# My First Note

Here's a [internal link](/blog/internal-link) and an image:
![image](/img/blog/2024-03-20-my-note/image.png)

:::note
This is a callout
:::

Some text with a [^footnote].

[^footnote]: This is the footnote text.
```

## Troubleshooting

Common issues and solutions:

### Front Matter
- Verify required fields are present
- Check authors configuration
- Validate slug generation

### Image Links
- Check static directory structure
- Verify image path configuration
- Ensure proper permissions

### Date Handling
- Review date extraction patterns
- Check file naming conventions
- Verify front matter dates

### Admonition Conversion
- Check callout syntax
- Verify admonition types
- Review custom styling

## Known Limitations

1. Asset Handling
   - Large files may need manual optimization
   - Some file types may require special handling

2. MDX Compatibility
   - Some Obsidian features may not work in MDX
   - Custom components need manual adjustment

3. Version Control
   - Asset versioning needs manual management
   - Consider using Git LFS for large files

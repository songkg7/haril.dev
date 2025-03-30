---
title: Jekyll
sidebar_position: 3
---

# Jekyll Integration

O2 supports converting Obsidian notes to Jekyll blog posts while maintaining compatibility with Jekyll's blog features and markdown extensions.

## Project Structure

When converting notes to Jekyll, O2 follows this structure:

```text
your-jekyll-project/
├── _posts/
│   └── YYYY-MM-DD-title.md
└── assets/
    └── img/
        └── YYYY-MM-DD-title/
            └── attachments
```

- Converted notes are placed in the `_posts` directory
- Attachments are stored in `assets/img/YYYY-MM-DD-title/`
- The date format follows Jekyll's post naming convention

## Features

O2 automatically converts various Obsidian-specific markdown features to Jekyll-compatible format:

### Wiki Links
- Internal links (`[[note]]`) are converted to Jekyll post URLs
- Alias links (`[[note|alias]]`) preserve the alias text
- Heading links (`[[note#heading]]`) are converted to anchor links

### Resource Links
- Image links are updated to use Jekyll's asset path
- File attachments are copied to the assets directory
- Relative paths are converted to absolute URLs

### Callouts
- Obsidian callouts are converted to Jekyll-compatible blockquotes
- Callout types (note, warning, etc.) are preserved
- Custom styling is maintained where possible

### Footnotes
- Inline footnotes are preserved
- Reference-style footnotes are maintained
- Footnote numbering is automatically handled

### Comments
- HTML comments are preserved
- Obsidian-specific comments are handled appropriately

### Embeds
- Note embeds are converted to include tags
- Image embeds are converted to proper markdown
- Other embeds are preserved as links

### Curly Braces
- Double curly braces can be escaped for Liquid templates
- Optional conversion to raw tags is available

## Front Matter Handling

O2 preserves existing front matter and adds necessary Jekyll fields:

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS +ZONE
categories: [category1, category2]
tags: [tag1, tag2]
---
```

## File Organization

- Converted files are moved to Jekyll's `_posts` directory
- Files are renamed to match Jekyll's date-based naming convention
- Attachments are organized in date-based folders

## Configuration

Required settings:
- Absolute path to Jekyll project
- Relative resource path for attachments

Optional features:
- Curly brace conversion
- Frontmatter time updates
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

Converted Jekyll post:
```markdown
---
layout: post
title: "My Note"
date: 2024-03-20 10:00:00 +0900
tags: [obsidian, notes]
---

# My First Note

Here's a [internal link]({% post_url 2024-03-20-internal-link %}) and an image:
![image](/assets/img/2024-03-20-my-note/image.png)

> **Note**
> This is a callout

Some text with a [^footnote].

[^footnote]: This is the footnote text.
```

## Troubleshooting

Common issues and solutions:

### Missing Images
- Verify the assets directory exists
- Check image path configuration
- Ensure proper permissions

### Incorrect Links
- Check Jekyll path configuration
- Verify post naming convention
- Review link conversion settings

### Front Matter Problems
- Validate YAML syntax
- Check required fields
- Verify date format 
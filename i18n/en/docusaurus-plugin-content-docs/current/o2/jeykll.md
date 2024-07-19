---
sidebar_position: 3
---

# Jekyll

O2 provides functionality to convert Jekyll markdown syntax. The supported formats are as follows:

## Wiki link

Obsidian's Wiki link syntax is converted to standard markdown links.

### AS-IS

```md
[[What is Obsidian?]]
```

### TO-BE

```md
[What is Obsidian?](/What%20is%20Obsidian%3F)
```

## Image

Obsidian's image syntax is converted to standard markdown syntax.

### AS-IS

```md
![[NewJeans.png]]
```

### TO-BE

```md
![image](/assets/img/<yyyy-MM-dd>-<title>/NewJeans.png)
```

`yyyy-MM-dd` is converted based on the `date` or `updated` frontMatter in the document. Attachments are also moved appropriately to ensure links do not break.

## Resize image

Obsidian's image resizing syntax is converted to Jekyll's image resizing syntax.

### AS-IS

```md
![[NewJeans.png|100]]
```

### TO-BE

```md
![image](/assets/img/<yyyy-MM-dd>-<title>/NewJeans.png){: width="100" }
```

## Resize image (width & height)

You can also convert the width and height of images.

### AS-IS

```md
![[NewJeans.png|100x200]]
```

### TO-BE

```md
![image](/assets/img/<yyyy-MM-dd>-<title>/NewJeans.png){: width="100" height="200" }
```

## Embeds

Obsidian's embed syntax is converted to standard links.

### AS-IS

```md
![[Obsidian#This is Obsidian!]]
```

### TO-BE

```md
[Obsidian](/Obsidian#This%20is%20Obsidian!)
```

## Comments

Obsidian's comment syntax is converted to Jekyll's comment syntax.

### AS-IS

```md
%% This is a comment %%
```

### TO-BE

```md
<!-- This is a comment -->
```

## Footnotes

Obsidian's footnote syntax is converted to Jekyll's footnote syntax.

### AS-IS

```md
[^1]
```

### TO-BE

```md
[^fn-nth-1]
```

Currently, only the simple method is supported.

## Curly braces

Obsidian's curly brace syntax is converted to Jekyll's curly brace syntax.

### AS-IS

```md
{{ content }}
```

### TO-BE

```md
{% raw %}{{ content }}{% endraw %}
```

This feature can be toggled on or off in the settings.

## Others

Other syntaxes are ignored. If there are any syntaxes you would like to be converted, please let us know through an issue.

## References

- [Obsidian](https://obsidian.md/)
- [Jekyll](https://jekyllrb.com/)

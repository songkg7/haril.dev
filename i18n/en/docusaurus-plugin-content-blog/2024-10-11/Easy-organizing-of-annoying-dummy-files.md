---
title: "[Shell] Easily Organize Annoying Dummy Files"
date: October 12, 2024
tags: [shell, gum, fd, trash-cli]
authors: haril
description: "Are you tired of organizing dummy files? In this post, we'll show you how to easily tidy up those files using a shell script."
---

## Overview

Do you use cloud storage across multiple devices? If so, you've probably noticed the gradual increase of conflict files.

![Animation showing an increase in conflict files](https://i.imgur.com/wExLU6I.gif)

_Conflict files that keep piling up whenever you turn around_

Conflict files tend to accumulate for various reasons, such as making edits before files are synced or experiencing network delays.

Personally, I like to keep things tidy, so I regularly delete these dummy files. However, today I find the repetitive task a bit tedious. So, I thought I'd write a shell script to automate the process and show off my developer skills.

<!-- truncate -->

## Writing the Shell Script

Having knowledge of shell scripting is incredibly useful for automating small tasks like this. Nowadays, GPT can generate scripts quite well, so if you don't fully understand the script below, you might want to give GPT a try.

```bash
#!/bin/bash

# Search for files containing 'conflict'
file_list=$(find . -type f -name "*conflict*" 2>/dev/null)

# Exit if no files are found
if [ -z "$file_list" ]; then
    echo "No files containing 'conflict' found. Exiting." >&2
    exit 0
fi

# Display and select files
echo "Found the following files containing 'conflict':"
select_files=()
i=1
while IFS= read -r file; do
    echo "$i) $file"
    select_files+=("$file")
    ((i++))
done <<< "$file_list"

# Prompt user to select files to delete
echo "Enter the numbers of the files you want to delete (e.g., 1 2 3), or 'a' for all, or 'q' to quit:"
read -r selection

# Handle selection
selected_files=()
if  $selection == "q" ; then
    echo "Operation cancelled. Exiting."
    exit 0
elif  $selection == "a" ; then
    selected_files=("${select_files[@]}")
else
    for num in $selection; do
        if [[ $num =~ ^[0-9]+$ ]] && ((num > 0 && num <= ${#select_files[@]})); then
            selected_files+=("${select_files[$((num-1))]}")
        fi
    done
fi

# Exit if no valid files are selected
if [ ${#selected_files[@]} -eq 0 ]; then
    echo "No valid files selected. Exiting."
    exit 0
fi

# Display selected files
echo "The following files will be deleted:"
printf '%s\n' "${selected_files[@]}"
echo

# Confirm deletion
read -p "Are you sure you want to delete these files? (y/N): " confirm

if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    # Delete each selected file
    for file in "${selected_files[@]}"; do
        if [ -e "$file" ]; then
            echo "Deleting: $file"
            rm -f "$file"
        else
            echo "File not found: $file"
        fi
    done
    echo "File deletion process completed."
else
    echo "Operation cancelled. No files were deleted."
fi
```

I've outlined the steps for the desired task in a simple manner. Shall we give it a try?

![first-result](https://i.imgur.com/wI3rvym.gif)

After confirming whether you really want to delete the files, the final deletion is completed 🎉

Functionally, this script meets the requirements, so it should be quite usable. If you just needed a simple script without any special packages, you can stop reading here.

However, after using it myself, I noticed a few areas for improvement, so let's refine it a bit more elegantly.

1. `rm` makes it difficult to recover files if deleted by mistake.
2. Filtering files can be cumbersome if there are many to delete.

## A More Elegant Approach

![salt](https://i.imgur.com/VkruAdx.png)

With just a sprinkle of ~~salt~~ tools, you can dramatically improve the user experience. Unlike the previous script that only used basic Linux commands, this version adds a few dependencies, but they're worth it.

Here's a brief introduction to the tools we'll be using:

- `fd`: A Rust-based command that improves upon the `find` command, offering fast and easy searches.
- `gum`: A tool written in Golang for creating stylish CLI scripts, allowing you to implement various features even if you're not familiar with shell syntax.
- `trash-cli`: A CLI tool that brings the concept of a 'trash bin' to the command line, allowing you to recover files if deleted by mistake, so you no longer need to fear the `rm` command.

Each of these tools is so appealing that it's hard to introduce them briefly. However, since covering them all in this post would be too extensive, I'll introduce them in separate articles.

Now, you can write the script like this:

```bash
#!/bin/bash

IFS=$'\n'

# Check if gum, fd, and trash-cli are installed
if ! command -v gum &> /dev/null || ! command -v fd &> /dev/null || ! command -v trash &> /dev/null; then
    echo "Error: This script requires 'gum', 'fd', and 'trash-cli' to be installed."
    echo "Please install them and try again."
    exit 1
fi

# Use fd to search for files containing 'conflicted'
file_list=$(fd -H -I -t f 'conflicted')

# Exit if no files are found
if [ -z "$file_list" ]; then
    gum style --foreground 208 "No files containing 'conflict' found. Exiting."
    exit 0
fi

# Use gum choose to select files
selected_files=$(echo "$file_list" | gum choose --no-limit --header "Select files to delete (Space to select, Enter to confirm):")

# Exit if no files are selected
if [ -z "$selected_files" ]; then
    gum style --foreground 208 "No files selected. Exiting."
    exit 0
fi

# Display selected files
gum style --border normal --padding "1 2" --border-foreground 212 "The following files will be deleted:"
echo "$selected_files"
echo

# Use gum confirm to request confirmation from the user
if gum confirm "Are you sure you want to delete these files?"; then
    # Delete selected files
    echo "$selected_files" | tr '\n' '\0' | xargs -0 trash
    gum style --foreground 212 "File deletion process completed."
else
    gum style --foreground 213 "Operation cancelled. No files were deleted."
fi
```

:::warning

Some commands may not work, depending on the OS.

:::

- Checks if `gum`, `fd`, and `trash-cli` are installed.
- Uses `fd -H -I -t f 'conflict'` to search for all files containing 'conflict' in their names.
    - `-H`: Includes hidden files
    - `-I`: Ignores ignore patterns (e.g., .gitignore)
    - `-t f`: Searches for regular files only
- Uses `gum choose` to allow the user to select files to delete.
- Displays the list of selected files.
- Uses `gum confirm` to request confirmation from the user before deletion.
- Deletes the selected files.
- Uses `gum style` to apply colors to the result messages.

![result](https://i.imgur.com/evtMYm4.gif)

Without much effort, we implemented a more intuitive script using selectors and confirmation windows. Unlike the `rm`-based script, the deleted files can be recovered at any time, making it much safer 🔒

## Conclusion

In this post, I walked you through recognizing a minor inconvenience and how to address it.

I wrote the script to search for files with the keyword `conflicted`, but you can modify this part to accept external input, allowing you to filter files in various ways. I believe the content introduced in this post will be very useful depending on how you use it.

Finally, for those who read this post to the end, here's a little command snippet as a gift:

```bash
fd -IH | fzf -m | xargs -I{} trash "{}"
```

😜💣

[^fn-nth-1]: [GitHub - sharkdp/fd: A simple, fast and user-friendly alternative to 'find'](https://github.com/sharkdp/fd)
[^fn-nth-2]: [GitHub - charmbracelet/gum: A tool for glamorous shell scripts 🎀](https://github.com/charmbracelet/gum)
[^fn-nth-3]: [GitHub - andreafrancia/trash-cli: Command line interface to the freedesktop.org trashcan.](https://github.com/andreafrancia/trash-cli)

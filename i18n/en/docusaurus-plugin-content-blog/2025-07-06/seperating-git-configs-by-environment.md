---
title: "Applying Different Git Configurations by Environment"
date: 2025-07-06T09:54:56+09:00
tags: [git]
description: "Explains how to conditionally apply different git configurations for personal and work environments."
updated: 2025-07-06T10:43
authors: haril
---

## TL;DR

- The `includeIf` syntax allows you to apply git configuration files only when specific conditions are met.
- Useful for separating work and personal environments.

## Problems

- Work and personal development environments are separate.
- However, the global git config is set based on the personal environment, causing personal settings to overwrite work settings when syncing configuration files with chezmoi.
- How can work and personal environments be stably separated?

<!-- truncate -->

## Solution

Git provides a way to apply different configuration files based on conditions for such cases. This is [includeIf](https://git-scm.com/docs/git-config#_includes).
`include` is like modularization, including external files in the git configuration, and by applying a conditional expression, the configuration file is included only when specific conditions are met.

Some companies have rules that check email and name upon commit, and if these are not followed, commits can be rejected.

```bash
# ~/projects/company
git config --get user.email
# songkg7@gmail.com <- If a personal account email is set instead of the company email, the commit will be rejected.
```

Let's configure `user.name` and `user.email` to be set to the company account. First, create a file named `~/.gitconfig-work` and define the necessary settings as follows.

```toml
# ~/.gitconfig-work
[user]
name = kyungkeun.song
email = kyungkeun.song@42dot.ai
```

```toml
# ~/.gitconfig OR ~/.config/git/config
[includeIf "hasconfig:remote.*.url:git@ssh.github.company.com:**/**"]
path = ~/.gitconfig-work

[includeIf "gitdir:~/projects/company/"]
path = ~/.gitconfig-work
```

The top setting includes the `~/.gitconfig-work` configuration if the git remote path is set to the defined path. The bottom setting is directory-based, including `~/.gitconfig-work` if git is called within the defined directory. Both settings are defined together to prevent any unforeseen rule violations.

:::note

Personally, I prefer not to have configuration files scattered in the HOME directory, so I prefer to set them under `~/.config/`.

:::

After accessing the git directory of the defined path and checking user.name or email,

![](https://i.imgur.com/NBuF6bp.png)

you can see that the personal settings are applied before the `.git` folder is created, and the moment the `.git` folder is created, `includeIf` is triggered, and the work settings are applied.

## Conclusion

For companies that allow remote work, there may be cases where you have to use personal equipment for work. This can be very useful in such situations.

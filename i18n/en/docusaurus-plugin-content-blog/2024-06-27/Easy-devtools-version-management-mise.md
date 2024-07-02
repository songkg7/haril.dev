---
date: 2024-06-26 13:02:15 +0900
authors: haril
title: "Managing Development Tool Versions with mise"
tags: [mise, version-manager]
categories: null
description: What should you do if you need to switch between multiple versions of development tools? In this post, we explore how to conveniently manage your development environment using mise.
---

## Overview

- Do you use a variety of programming languages rather than just one?
- Have you ever felt fatigued from memorizing commands for multiple package managers like sdkman, rvm, nvm, etc.?
- Would you like to manage your development environment more quickly and conveniently?

With mise, you can use the exact version of any language or tool you need, switch between different versions, and specify versions for each project. By specifying versions in a file, you can reduce communication costs among team members about which version to use.

Until now, the most famous tool in this field was asdf[^fn-nth-1]. However, after starting to use mise recently, I found that mise offers a slightly better user experience. In this post, I will introduce some simple use cases.

![mise vs asdf](https://i.imgur.com/9gGGfot.png)

_Not sure if it's intentional, but even the web pages look similar._

## mise-en-place, mise

`mise` (pronounced 'meez') is a tool for setting up development environments. The name comes from a French culinary term that roughly translates to "setting" or "putting in place." It means having all your tools and ingredients ready before you start cooking.

Here are some of its simple features:

<!-- truncate -->

- Supports almost all programming languages and tools as a package manager
- Can be extended with plugins
- Written in Rust, unlike asdf which is written in Shell
- Provides features for setting environment variables like direnv

## Installation

You can install it via brew.

```bash
brew install mise
# or
curl https://mise.run | sh
```

```bash
mise --version
# mise 2024.6.6
```

### Activate mise

Follow the guide to run the activation command.

```bash
# bash
echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc

# zsh
echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zshrc
```

## Use Cases

### Managing Dependency Versions

Let's assume you've joined a new company and received a new machine. The new place primarily uses Java, so let's check if we can install the required version.

```bash
mise ls-remote java
```

![mise version list](https://i.imgur.com/8kzA8dE.png)

:::tip[fuzzy finder, fzf]

If too many versions are listed, you can use `mise ls-remote java | fzf`.

:::

Let's install `corretto-11.0.18.10.1` and set it as the default Java version.

```bash
mise use --global java@corretto-11.0.18.10.1
```

![language select 1](https://i.imgur.com/PT7UxD1.png)

![language select 2](https://i.imgur.com/Arqxubw.png)

As of writing, the LTS version of Java is 21. Let's install version 21 and also the frequently used version 17.

```bash
mise install java@17 java@21
```

![mise install java](https://i.imgur.com/pdBt4or.png)

After installation, you can check which languages are installed using the `mise ls` command.

```bash
mise ls
```

![mise list](https://i.imgur.com/lecwTLv.png)

Suppose your team leader suggests using Java 21 for a new project. It would be good to use Java 21 only for that project.

```bash
mkdir project && cd project
touch .mise.toml
mise use java@21
```

When using mise, you specify which version to use in a file called `.mise.toml`[^fn-nth-2].

```toml
# ~/project/.mise.toml
[tools]
java = "21"
```

Running `mise ls` again will show the change in the `Config Source` and the applied Java version.

![mise list 2](https://i.imgur.com/HVX9ASk.png)

![check language version](https://i.imgur.com/kNLORwK.png)

:::tip

If you've been using asdf and already have a `.tool-versions` file, you can continue to use `tool-versions`.

:::

Now you can use different Java versions for different projects. By specifying the Java version in the `.mise.toml` file, you can minimize issues caused by differences in development environments among team members.

Thinking about it, Java 11 is no longer needed. Let's set 17 as the default and remove 11.

```bash
mise use --global java@17
mise uninstall java@corretto-11.0.18.10.1
```

Now that we've installed the languages needed for work, let's install some personal favorites.

I'm developing an Obsidian plugin called [O2](https://github.com/songkg7/o2) using TypeScript. Let's install the latest stable version of node.

```bash
mise use node@lts
```

I also occasionally do data cleaning tasks using Python.

```bash
mise use python@3.12.3 # Python is sensitive to versions, so I use the most specific version possible.
```

I also create bots for work using golang and APIs for traffic experiments.

```bash
mise use go@latest
```

~~I also use Rust, Ruby, etc., but I'll skip those...~~

Wow, that's a lot. It would be nice to install everything at once.

After specifying them in `~/.config/mise/config.toml`,

```toml
# ~/.config/mise/config.toml
[tools]
java = "corretto-11.0.18.10.1"
node = "lts"
go = "latest"
python = "3.12.3"
```

you can install all dependencies at once using `mise install`.

```bash
mise install
```

![install all languages](https://i.imgur.com/jmFlah3.png)

Of course, you can also handle it all at once with a command. Languages not specified in `~/.config/mise/config.toml` will be appended automatically.

```bash
mise use --global node@lts python@3.12.3 go@latest
```

![install multiple languages with one command](https://i.imgur.com/I9KtmEi.png)

![install multiple languages with one command 2](https://i.imgur.com/46FKxVA.png)

:::tip

I usually only manage programming languages, but you can also manage other tools like gradle or awscli with mise.

:::

### Managing Environment Variables

> mise = asdf + **direnv**

With mise, you can specify different environment variables for different projects. The user experience is identical to what you get with [direnv](https://direnv.net/). In fact, it's even more convenient since you don't have to manage a `.envrc` file.

Let's define a simple variable in `.mise.toml`.

```toml
[env]
HELLO = 'WORLD'
```

:::warning

To apply environment variables defined in `.mise.toml`, you need to confirm them using the `mise trust` command. This is to prevent security issues that could arise from automatically executing files downloaded from other projects.

:::

You can verify that the environment variable is working correctly by using `echo`.

![](https://i.imgur.com/jyU0Rwj.png)

The information set in `~/project/.mise.toml` is only valid within the `~/project` directory. Once you leave this scope, the HELLO environment variable will be automatically unset.

![](https://i.imgur.com/Sb11T0T.png)

You can also manage it via CLI without directly editing `.mise.toml`.

```bash
mise set HELLO=world
mise set HELLO
# world
mise set
# key    value source
# HELLO  WORLD ~/project/.mise.toml
mise unset HELLO
mise set
# key    value source
```

Simple, right? If you need to manage environment variables globally, you can define them in `~/.config/mise/config.toml` as mentioned earlier.

```bash
mise set -g GLOBAL='mise is insane!'
mise set
# key     value           source
# GLOBAL  mise is insane! ~/.config/mise/config.toml
```

If you share the `.mise.toml` file containing the necessary information for a specific development environment, setting up the environment will be much easier. As mentioned earlier, mise can also manage package versions. While `asdf` is an excellent all-in-one tool, the ability to manage environment variables makes mise even more special.

## Conclusion

This concludes the basic setup of the development environment. You might wonder if just installing languages is enough. For other aspects, refer to [Managing Dotfiles](https://haril.dev/blog/2023/03/26/chezmoi-awesome-dotfile-manager). Since setting up a new development environment usually takes 1-2 hours, I'll spend the remaining time reading some development books.

![image](./1.webp)

## Reference

- [mise](https://github.com/jdx/mise)

---

[^fn-nth-1]: As of June 2024, GitHub Star 21k
[^fn-nth-2]: [mise configuration](https://mise.jdx.dev/configuration.html)
[^fn-nth-3]: Java is used as an example, but I prefer setting it up in IntelliJ.

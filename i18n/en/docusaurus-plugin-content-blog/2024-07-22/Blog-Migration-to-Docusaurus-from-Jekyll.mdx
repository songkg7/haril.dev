---
title: "Migrating a Jekyll Blog to Docusaurus"
date: 2024-07-22 17:54:45 +0900  
tags: [docusaurus, blog, algolia, react]  
categories: null  
authors: haril  
description: "A summary of the issues encountered and solutions found while migrating a Jekyll blog to Docusaurus."
---

Recently, I undertook the task of moving my blog to a new platform. As I encountered various issues, I jotted down potential solutions, thinking they might be useful to others. Here’s a detailed account of the migration process.

<!-- truncate -->

## Overview

![my-home](https://i.imgur.com/ootNbaX.png)

- In April 2024, my blog suddenly broke down.
    - The issue was related to Jdelivery CDN.
    - Although the problem might have resolved itself with time, the accumulated inconvenience led me to mistakenly believe I had written faulty code.
- Jekyll felt restrictive and difficult to maintain, prompting me to migrate to Docusaurus.
    - Especially since the blog was built via a fork, GitHub contributions weren’t being recorded, which was disappointing.
- There was an existing issue requesting Docusaurus support in O2, but I hadn’t used it before and couldn’t resolve it - [\[FR\] support mkdocs-material, docusaurus · songkg7/o2 · Discussion #346 · GitHub](https://github.com/songkg7/o2/discussions/346)

These reasons collectively led to the decision to migrate the blog.

## Features of Docusaurus

- Built on React
- Supports both technical documentation and blogging
- Includes version control and i18n
- Functionality can be extended with plugins
- Supports writing documents in Markdown and MDX

## Language

TypeScript. Although there have been attempts to move away from TS in some recent projects, I personally didn’t see the need. I prefer TS over JS, so I set up the environment with TS.

## Package Manager

Docusaurus supports npm, yarn, and pnpm. Having used npm extensively, I wanted to try either pnpm or yarn this time.

In the end, I chose yarn for the following reasons:

- There were some aspects of setting up GitHub Actions with pnpm that I didn’t like.
- A decisive factor was a [post on the Toss tech blog](https://toss.tech/article/lightning-talks-package-manager) about package managers, which led me to switch to yarn.

With the package manager chosen, you can now check the blog.

```bash
yarn start
```

## Blog or Docs

Docusaurus offers both docs and blog modes. Since a development blog only needs the blog mode, I considered removing the docs page. However, this would eliminate the main landing page, which felt like a loss of a design element.

After some thought, I decided to keep the landing page and modify the docs format instead of going blog-only.

## Mermaid

Mermaid is a tool I frequently use for quickly and easily creating diagrams with code. Docusaurus supports it via a plugin, so let’s include it.

```bash
yarn add @docusaurus/theme-mermaid
```

```ts
const config: Config = {
    markdown: {
        mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],
};
```

For more details, refer to the [official documentation](https://docusaurus.io/docs/markdown-features/diagrams).

## Latex

Occasionally, I need to input mathematical formulas. For data engineers or those who frequently use math, this is even more common. Typically, Latex is used for this, so let’s set it up in Docusaurus.

Docusaurus supports Latex through the Katex plugin.

```bash
yarn add remark-math@6 rehype-katex@7
```

```ts
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  presets: [
    [
      'classic',
      {
        blog: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      },
    ],
  ],
};
```

Include the CSS as well.

```ts
const config: Config = {
    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:
                'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],
};
```

## Code Block Highlight

Since Java isn’t supported by default, I added it through the prism settings, along with bash. If your frequently used language isn’t highlighted, you can add it as needed.

```ts
const config: Config = {
    themeConfig: {
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['java', 'bash'],
        },
    },
};
```

## Deploying to GitHub Pages

There are several deployment methods, but I wanted to handle everything within GitHub, so I chose GitHub Pages. The default domain (`~.github.io`) is also clean and convenient.

Let’s set up CI/CD with GitHub Actions to automatically deploy the blog whenever a post is published. First, create a yaml file in `./.github/workflows/`. Here’s the content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build:
    name: Build Docusaurus
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: yarn

      - name: Install dependencies
        run: yarn install --frozen-lockfile
      - name: Build website
        run: yarn run build

      - name: Upload Build Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    name: Deploy to GitHub Pages
    needs: build

    permissions:
      pages: write
      id-token: write

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Then, set the Source to `GitHub Actions` in `Settings > Pages` to complete the deployment. From now on, every push to the main branch will trigger an automatic deployment.

![source](https://i.imgur.com/E2pWDp6.png)

:::warning[Check the Source]

If you set the Source to `Deploy from a branch`, the blog service might be interrupted during the deployment process.

:::

## Connecting a Custom Domain

Using the default GitHub domain (`~.github.io`) is fine, but I decided to buy a domain to give my blog a more professional feel. Having a custom domain will also make it easier to maintain SEO if I switch platforms in the future.

### Purchasing and Registering a Domain

- Purchased the domain haril.dev from GoDaddy (annual cost: $20)
- Registered the custom domain with GitHub Pages.
- First, check the IP address of the existing domain.

```bash
dig songkg7.github.io
```

![execute-dig](https://i.imgur.com/76RPRYC.png)

Register this domain information in the GoDaddy records.

![register-godaddy-record](https://i.imgur.com/lUEshGu.png)

Then, go to the GitHub Pages settings and register the purchased domain.

![custom-domain](https://i.imgur.com/ImiE0kj.png)

## Optional: Verifying the Domain to Prevent Hijacking

- Go to Profile Settings -> Pages
- Add a TXT record just like you added the IP

![before-verifiy](https://i.imgur.com/PH3fifE.png)

Copy the values from 1 and 2 into the GoDaddy records.

![add-a-record](https://i.imgur.com/eMYlw2I.png)

After adding the record, click the Verify button.

![verifed-domains](https://i.imgur.com/bBquRwp.png)

This completes the domain verification, protecting it from hijacking. ~~Though it’s hard to imagine anyone wanting to hijack this domain...~~

## Giscus Comments

Docusaurus allows you to modify the design of existing components. By implementing and adding the Giscus component, you can easily add a comment feature.

Reference: [Add Giscus Comments to Docusaurus 3 Blog Posts and Doc Pages | Riku Block](https://rikublock.dev/docs/tutorials/giscus-integration/)

## Search Engine

While I don’t publish a huge number of posts, once the list of posts exceeded a single page, I felt the need for a search feature. Indexing the posts would allow visitors to search not just by title but also by content, making it easier to find what they’re looking for.

There are two commercial search engines you can use with Docusaurus:

- Algolia
    - In the free version, the crawler updates the search index once a week.
    - Officially recommended by Docusaurus.
    - You can manually trigger the index update.
- [Orama](https://askorama.ai/)
    - Very easy to implement. If no analysis is needed, you can just paste the code.
    - Detects deployment triggers and updates the index upon deployment.
    - Supports semantic search with OpenAI integration.
    - Has a prettier UI compared to the somewhat clunky Algolia. I personally value design as much as functionality.

Algolia’s downside is that it doesn’t automatically update the index upon deployment. Given the better UI/UX, I chose Orama.

![orama](https://i.imgur.com/VCp0Eee.png)

_Orama’s main page is also beautiful_

However, I had to roll back because Orama doesn’t [support Korean tokenization](https://docs.askorama.ai/open-source/supported-languages/) yet, making Korean search impossible 😭. Since my main audience is Korean, I had to switch back to Algolia.

### If Algolia Search Returns No Results

When using the Algolia search API with Docusaurus:

```json
[
  "language:en",
  [
    "docusaurus_tag:default",
    "docusaurus_tag:docs-default-3.2.1",
    "docusaurus_tag:docs-community-current",
    "docusaurus_tag:docs-docs-tests-current"
  ]
]
```

These parameters are dynamically generated and sent with the request. These parameters act as filters, known as facets in search engines, and include:

- `docusaurus-tag`
- `lang`
- `language`
- `type`
- `version`

Therefore, when creating an Algolia index, these facets **must be set**. Often, these facets are not set when the DocSearch index is created.

This can happen if the crawler runs before the Docusaurus settings are reflected after DocSearch approval.

The solution is to check if all necessary index facets are present and add any that are missing.

:::warning

Disabling contextualSearch by setting it to `false` will make the search work, but it’s not recommended.

:::

![facets](https://i.imgur.com/57DUIyE.jpeg)

All the above facets must be present. In my case, the `docusaurus_tag` facet was missing, so I added it manually.

You can add missing attributes in `Index > Configuration > Filtering and faceting - Facets` by clicking `+ Add an Attribute`.

![add-an-attribute](https://i.imgur.com/x9qjnxI.png)

After this, the search should work correctly.

![search](https://i.imgur.com/XPVw3UJ.png)

### Issue with Search Not Working Immediately After Index Update

- After posting a new article and manually triggering the crawler to update the index, the new article wasn’t searchable.
- Querying the Algolia index directly showed the new article.
- Disabling contextualSearch locally didn’t help.
- The issue seemed to be with the API.
- The search results were correct immediately after triggering the crawl, but reverted to the old version when tested in a new window.
- Suspected that the distributed search network (DSN) technology might be causing a delay in reflecting the updated index.
- The issue resolved itself after about a day.

## i18n

I’ve had a significant number of visitors from English-speaking countries and wanted to run an English blog for both practice and broader reach. Docusaurus supports i18n, so I decided to implement it.

```bash
yarn run write-translations --locale en
```

[Docusaurus](https://docusaurus.io/docs/i18n/tutorial)

Now, the challenge is translating the documents.

### Manual Translation...?

- I want articles written in Korean to be translated into English.
- If only the `title.md` file is included in the PR, could it be translated and included as `/en/title.md`?
- There doesn’t seem to be a well-known solution for this.
- Tried using Sweep AI, but it wasn’t designed for translation.
- How about using GitHub Action + Open AI or DeepL API?
- Some basic pages like the 404 page might not redirect to the translated page depending on the hosting service. GitHub Pages doesn’t support this.

I found that such a GitHub action already exists (great minds think alike).

- [GPT Translate · Actions · GitHub Marketplace · GitHub](https://github.com/marketplace/actions/gpt-translate)

It requires a paid OpenAI API token, but since I already had one, it wasn’t a big deal.

- [🌐 Add LLM Translations by github-actions\[bot\] · Pull Request #10 · songkg7/haril.dev · GitHub](https://github.com/songkg7/songkg7.github.io/pull/10/files)

It works quite well. Since I’m also studying Japanese, I plan to provide content in English and Japanese after writing an article and proofreading the translations.

## SEO

- Enrich the front matter
    - Docusaurus generates meta information based on the front matter.
- You can easily check meta information on [OpenGraph](https://www.opengraph.xyz/).

## UpdateAt and UpdateBy

Just enable the option; no additional front matter is needed.

Since it determines updates based on git history, check the depth option when cloning in GitHub Action. The default is to fetch only the latest commit.

I rolled back the updateBy feature because:

- Automated tasks showed GitHub Action as the modifier, which I didn’t like.
- Although I aim for collaboration by exposing the edit button, I don’t expect many PRs.

For now, updateAt alone seems sufficient.

## Migration Tip: Adjusting Folder Structure

![ls-tree](https://i.imgur.com/ucjhZ0G.png)

_Existing directory structure. Markdown documents are directly under the `_posts` folder._

Docusaurus supports organizing files by folders, which is convenient for grouping resources like images. Given the number of posts, let’s write a shell script to adjust the structure in one go.

```bash
#!/bin/bash

# Execute for all .md files
for file in *.md; do
  # Extract date from the filename
  date=$(echo $file | rg -o '\d{4}-\d{2}-\d{2}')

  # Create a directory for the date (ignore if it already exists)
  mkdir -p "$date"

  # Move the file to the directory
  mv "$file" "$date/"
done

# Execute for each directory
for dir in */; do
    # Remove the yyyy-MM-dd part from the filename
    new_filename=$(ls $dir | sed "s/[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}-//g")
    mv "$dir/$(ls $dir)" "$dir/$new_filename"
done
```

![after-script-execution](https://i.imgur.com/B8q31Qu.png)

All files are neatly moved in one go. Next, move the resources referenced in the posts to the appropriate directories.

Use the `ripgrep` command to find references to local resources.

![ripgrep](https://i.imgur.com/YkUnVRQ.png)

With the relative paths of the files, you can move them accordingly.

1. Move each resource file to `blog/{yyyy-MM-dd}`.
2. Modify the references in the posts to `./resource.webp` instead of `img`.

Using a shell script would make this quick and easy, but since there were only a few resource images, I did it manually.

I’ll leave this as an exercise for you. 😜 (Asking GPT for help would make this a breeze)

## Image Alt-Text

- I used to neglect alt-text for images, but I learned it’s essential for accessibility, providing text alternatives for those using screen readers.
- Knowing this, I realized the importance of alt-text.
- GitHub has added a workflow for this, which is worth checking out.
    - [GitHub - github/accessibility-alt-text-bot: An action to remind users to add alt text on Issues, Pull Requests, and Discussions](https://github.com/github/accessibility-alt-text-bot)

## Conclusion

Here’s a brief KPT (Keep, Problem, Try) retrospective.

- Regret not setting up redirects when impulsively shutting down the old blog and creating a new one.
    - Considering existing visitors, I should have at least set up redirects.
    - Tried to keep URLs unchanged, but it didn’t work out as planned.
- Not setting up redirects was a significant mistake. The traffic logs show consistent 404 errors.
- Let’s pay more attention to aspects that were hard to maintain elegantly on the previous platform.
    - e.g., design, applying frontend technologies

## Reference

- [About custom domains and GitHub Pages - GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [Add Giscus Comments to Docusaurus 3 Blog Posts and Doc Pages | Riku Block](https://rikublock.dev/docs/tutorials/giscus-integration/)
- [Docusaurus](https://docusaurus.io/docs/search#algolia-troubleshooting)
- [No results with Docusaurus contextual search - Open Q&A - Algolia Community](https://discourse.algolia.com/t/no-results-with-docusaurus-contextual-search/19409/7)

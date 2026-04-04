# Repository Guidelines

## Project Structure & Module Organization
This repository is a Docusaurus site for `haril.dev`. Long-form content lives in `blog/YYYY-MM-DD/*.mdx`, product and reference docs live in `docs/` and `versioned_docs/`, and localized strings live under `i18n/en` and `i18n/jp`. Custom UI code is in `src/`: page entries in `src/pages`, reusable React components in `src/components`, theme overrides in `src/theme`, and global styling in `src/css/custom.scss`. Static assets belong in `static/img`.

## Build, Test, and Development Commands
Use Yarn for all local work.

- `yarn install`: install dependencies with the repo's Yarn 4 setup.
- `yarn start`: run the local Docusaurus dev server.
- `yarn build`: produce the production site in `build/`; this is the main validation step used in CI.
- `yarn serve`: preview the built output locally.
- `yarn typecheck`: run `tsc` against the TypeScript and theme customizations.
- `yarn write-translations`: refresh translation files after locale-facing content changes.

## Coding Style & Naming Conventions
Follow the existing Docusaurus + TypeScript style from `.eslintrc`. Source files use TypeScript/TSX and SCSS, single quotes in TSX, and 2-space indentation in SCSS. Prefer PascalCase for React component files (`HomepageGalaxy/index.tsx`), camelCase for variables and helper functions, and kebab-case or date-based folder names for content (`blog/2025-03-16/...`). Keep MDX front matter explicit and consistent: `title`, `date`, `tags`, `categories`, `authors`, and descriptive metadata such as `description` or banner image when applicable.

## Testing Guidelines
There is no separate unit test suite in this repo; contributors should treat `yarn build` and `yarn typecheck` as required checks before opening a PR. When editing posts or docs, also verify internal links, code fences, and locale-specific content render correctly in `yarn start`. Name new blog posts within their dated directory and keep assets alongside the post when they are post-specific.

## Commit & Pull Request Guidelines
Recent history favors short, imperative subjects such as `update broken links` and scoped maintenance commits like `style: remove footer within homepage`. Keep commits focused and use an optional prefix such as `style:` when the change is presentation-only. PRs should summarize the affected area, mention any changed routes or locales, and include screenshots for homepage, theme, or visual styling updates. The PR template also expects banner image and `description` front matter checks, grammar review, and accurate references.

## Configuration Tips
Build and deploy workflows consume `GOOGLE_ANALYTICS_TRACKING_ID`, `GOOGLE_TAG_MANAGER`, and `ORAMA_CLOUD_API_KEY`. Keep secrets in GitHub Actions or local env configuration, not in committed source.

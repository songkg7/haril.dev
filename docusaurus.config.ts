import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const config: Config = {
	title: "HARIL",
	tagline: "Learning more, Growing better.",
	favicon: "img/favicon/favicon.ico",

	// Set the production url of your site here
	url: "https://haril.dev",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "songkg7", // Usually your GitHub org/user name.
	projectName: "haril.dev", // Usually your repo name.
	trailingSlash: false,

	onBrokenLinks: "throw",
	markdown: {
		hooks: {
			onBrokenMarkdownLinks: "warn",
		},
		mermaid: true,
	},

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "kr",
		locales: ["kr", "en", "jp"],
		localeConfigs: {
			kr: {
				label: "한국어",
			},
			en: {
				label: "English",
				htmlLang: "en-GB",
			},
			jp: {
				label: "日本語",
			},
		},
	},

	plugins: ["docusaurus-plugin-sass"],
	future: {
		v4: true,
	},

	themes: ["@docusaurus/theme-mermaid"],

	// katex
	stylesheets: [
		{
			href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
			type: "text/css",
			integrity:
				"sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
			crossorigin: "anonymous",
		},
	],

	scripts: [
		{
			src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6035015699405439",
			async: true,
			crossorigin: "anonymous",
		},
	],

	presets: [
		[
			"classic",
			{
				googleTagManager: {
					containerId: process.env.GOOGLE_TAG_MANAGER,
				},
				gtag: {
					trackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
					anonymizeIP: true,
				},
				docs: {
					sidebarPath: "./sidebars.ts",
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: "https://github.com/songkg7/haril.dev/blob/main/",
				},
				blog: {
					showReadingTime: true,
					blogTitle: "Haril Dev",
					blogDescription:
						"A blog about software development, programming, and computer science.",
					blogSidebarTitle: "All Posts",
					blogSidebarCount: "ALL",
					remarkPlugins: [remarkMath],
					rehypePlugins: [rehypeKatex],
					editLocalizedFiles: true,
					showLastUpdateTime: true,
					showLastUpdateAuthor: false,
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: "https://github.com/songkg7/haril.dev/blob/main/",
				},
				theme: {
					customCss: "./src/css/custom.scss",
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		image: "img/social-card-standard.webp",
		algolia: {
			// The application ID provided by Algolia
			appId: "D6WFZWSD4D",
			// Public API key: it is safe to commit it
			apiKey: "0a4b92132d7b910ad83d3e1bb4b0f4a9",
			indexName: "haril",
			insights: true,
		},
		navbar: {
			// title: 'Haril Dev',
			logo: {
				alt: "Haril profile Logo",
				src: "img/favicon/ms-icon-310x310.png",
			},
			items: [
				{
					type: "localeDropdown",
					position: "right",
				},
				{
					to: "/blog",
					label: "Blog",
					position: "left",
				},
				{
					type: "docSidebar",
					sidebarId: "docSidebar",
					position: "left",
					label: "Docs",
				},
				{
					type: "docsVersionDropdown",
					position: "right",
					dropdownActiveClassDisabled: true,
				},
				{
					to: "/blog/archive",
					label: "Archive",
					position: "left",
				},
				{
					"aria-label": "GitHub Repository",
					className: "navbar--github-link",
					href: "https://github.com/songkg7",
					position: "right",
				},
			],
		},
		footer: {
			copyright: `Copyright © ${new Date().getFullYear()} Haril Song, All Rights Reserved.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
			additionalLanguages: [
				"java",
				"bash",
				"json",
				"sql",
				"toml",
				"docker",
				"yaml",
			],
		},
	} satisfies Preset.ThemeConfig,
};

export default config;

import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import search from "@easyops-cn/docusaurus-search-local";
import * as pkg from "./package.json";

const url = pkg.homepage;
const title = pkg.description;
const description = pkg.description;
const editUrl = `${pkg.repository}/blob/main`;
const docsRouteBasePath = "/";
const githubUrl = "https://github.com/originator-profile";
const localeConfigs = {
  ja: {
    label: "日本語",
    path: "ja",
    baseUrl: "/ja/",
  },
  en: {
    label: "English",
    path: "en",
    baseUrl: "/en/",
  },
} as const;
const locales = Object.keys(localeConfigs);
const defaultLocale = locales[0];
const currentLocale = (
  process.env.DOCUSAURUS_CURRENT_LOCALE! in localeConfigs
    ? process.env.DOCUSAURUS_CURRENT_LOCALE
    : defaultLocale
) as keyof typeof localeConfigs;

const footerLinks = {
  ja: [
    {
      title: "関連リンク",
      items: [
        {
          label: "組合について",
          href: "https://originator-profile.org/ja-JP/about",
        },
        {
          label: "お問い合わせ",
          href: "https://originator-profile.org/ja-JP/contact/",
        },
        {
          label: "プライバシーポリシー",
          href: "https://originator-profile.org/ja-JP/privacy/",
        },
      ],
    },
  ],
  en: [
    {
      title: "More",
      items: [
        {
          label: "About",
          href: "https://originator-profile.org/en-US/about",
        },
        {
          label: "Contact",
          href: "https://originator-profile.org/en-US/contact/",
        },
        {
          label: "Privacy Policy",
          href: "https://originator-profile.org/en-US/privacy/",
        },
      ],
    },
  ],
}[currentLocale];

export default {
  url,
  baseUrl: "/",
  favicon: "favicon.png",
  title,
  tagline: description,
  trailingSlash: true,
  i18n: {
    locales,
    defaultLocale,
    localeConfigs,
  },
  markdown: {
    format: "detect",
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: docsRouteBasePath,
          editUrl,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarPath: "sidebar.config.ts",
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      search,
      {
        docsRouteBasePath,
        language: locales,
      } satisfies search.PluginOptions,
    ],
    "@r74tech/docusaurus-plugin-panzoom",
    "docusaurus-plugin-image-zoom",
  ],
  themeConfig: {
    navbar: {
      logo: {
        alt: "Originator Profile Logo",
        src: "logo.svg",
        srcDark: "logoDark.svg",
      },
      items: [
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Tools",
          items: [
            {
              label: "Playground",
              href: "https://playground.originator-profile.org/",
            },
            {
              label: "Debugger",
              href: "https://playground.originator-profile.org/app/debugger",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: githubUrl,
            },
            {
              label: "Architectural Overview",
              href: "https://github.com/originator-profile/doc-opf-architectural-overview",
            },
          ],
        },
        ...footerLinks,
      ],
      copyright: `Copyright © 2022-${new Date().getFullYear()} <a href="https://originator-profile.org/">Originator Profile Collaborative Innovation Partnership (OP-CIP)</a>, All rights reserved.`,
    },
    zoom: {
      // NOTE: @r74tech/docusaurus-plugin-panzoom 向けの設定。mermaid 図の移動・拡大が目的
      selectors: [
        '.mermaid[data-processed="true"] svg',
        ".docusaurus-mermaid-container svg",
      ],
      wrap: true,
      timeout: 1000,
      // NOTE: docusaurus-plugin-image-zoom 向けの設定。画像要素の拡大が目的
      config: {
        margin: 32,
      },
    },
  } satisfies Preset.ThemeConfig,
  future: {
    v4: true,
    faster: true,
  },
} satisfies Config;

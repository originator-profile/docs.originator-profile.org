import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import search from "@easyops-cn/docusaurus-search-local";
import * as pkg from "./package.json";

const url = pkg.homepage;
const title = pkg.description;
const description = pkg.description;
const editUrl = `${pkg.repository}/blob/main`;
const githubUrl = "https://github.com/originator-profile/originator-profile";
const locales = ["ja", "en"];
const docsRouteBasePath = "/";

export default {
  url,
  baseUrl: "/",
  favicon: "favicon.png",
  title,
  tagline: description,
  trailingSlash: true,
  i18n: {
    locales,
    defaultLocale: locales[0],
    localeConfigs: {
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
    },
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
        {
          href: githubUrl,
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://originator-profile.org/",
          label: "OP-CIP",
          position: "right",
        },
      ],
    },
    footer: {
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
    experimental_faster: true,
  },
} satisfies Config;

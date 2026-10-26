---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/ff1666a/README.ja.md
---

# Technical Document Site of Originator Profile

[日本語版はこちら 🇯🇵](./README.ja.md)

## About this repository

This repository contains draft specifications (OPB: Originator Profile Blueprint), technical documentation, and the source code for the documentation site of [Originator Profile](https://originator-profile.org/).

It is built with [Docusaurus](https://docusaurus.io/), and all content is written in [Markdown (CommonMark)](https://docusaurus.io/docs/markdown-features) and [MDX](https://docusaurus.io/docs/markdown-features/react) formats.

### Documentation Site

https://docs.originator-profile.org/

This repository is deployed as the OP's technical documentation site on [Cloudflare Pages](https://developers.cloudflare.com/pages/).
Updates to this repository will be automatically reflected within a few minutes.

### Folder Structure

This repository uses [Docusaurus's multilingual support feature](https://docusaurus.io/docs/i18n/introduction) to provide pages in both Japanese and English.

- docs/ —— Japanese documentation (original)
  - See the "Editing Rules" section below for the subfolder structure.
- i18n/en/docusaurus-plugin-content-docs/current/ —— English documentation (translation)
  - English documentation is created with the same directory and file names as the Japanese documentation.
- static/ —— [Static Assets](https://docusaurus.io/docs/static-assets)
  - Copied to each locale directory (`/ja/`, `/en/`) during Docusaurus build
- public/ —— Locale-independent root-level files
  - Files placed directly in the root of `pages/` after build
  - public/index.html —— Redirects to `/ja/` or `/en/` depending on the browser language on the root page (`/`)
  - public/404.html —— Custom 404 page. Redirects non-locale paths according to the browser language, and displays locale-enabled 404s using the 404 for each locale
  - public/\_redirects —— [Cloudflare Pages redirect settings](https://developers.cloudflare.com/pages/configuration/redirects/)

### pnpm Scripts

- `pnpm build`: Builds the documentation site
- `pnpm preview`: Starts a local server to preview the documentation site
- `pnpm preview --locale en`: Starts a local server to preview the English content of the documentation site

### Documentation Guidelines

- Documents concerning deprecated specifications should have a "⚠" symbol in the title.
  　Example: `# Certificate ⚠`

### Integration of OPF Documents

This repository integrates OPF document repositories into `opf-source/<name>/` using Git Subtree and publishes them at `https://docs.originator-profile.org/<name>/`.

| name  | Repository                                                                                             |
| ----- | ------------------------------------------------------------------------------------------------------ |
| `aov` | [doc-opf-architectural-overview](https://github.com/originator-profile/doc-opf-architectural-overview) |

During the build process, `copy-opf.mjs` copies the English HTML file in `opf-source/<name>/` to `pages/<name>/index.html`, and the Japanese HTML file, if any, to `pages/ja/<name>/index.html`. Assets such as drawings are copied into each directory. The Japanese version overwrites the page generated from the sidebar stub `docs/<name>/index.mdx`.

#### How to Update OPF Documents

`.github/workflows/update-opf-source.yml` fetches the latest version of each repository daily and pushes it to main. To fetch it manually, use the following command. `<url>` is `https://github.com/originator-profile/<repository>.git` for public repositories and `git@github.com:originator-profile/<repository>.git` for private repositories. For private repositories, if you do not have read permissions, please request permission from the administrator.

```bash
git subtree pull --prefix=opf-source/<name> <url> main --squash
```

#### How to Add OPF Documents

1. Add the repository with `git subtree add --prefix=opf-source/<name> <url> main --squash`
2. Add the HTML file name (and `jaHtml` if there is a Japanese version) and asset directories to `sources` in `copy-opf.mjs`
3. Add `name` and `url` to `matrix` in `.github/workflows/update-opf-source.yml`. For a private repository, use its SSH URL, register a deploy key, and add a step that sets up the SSH key (register the secret in the `update-opf-source` environment and reference it statically as `secrets.<NAME>`)
4. Add a redirect from `/en/<name>/*` to `/<name>/:splat` in `public/_redirects`. If there is no Japanese version, also add one from `/ja/<name>/*`
5. Add `/<name>/` to the locale-independent path check in `public/404.html`
6. Add `docs/<name>/` (a stub like `docs/aov/`) and register it in `TOP_LEVEL_RULES` of `scripts/check-numbering.js`
7. Add links to `src/pages/index.mdx`, `docs/getting-started.md`, and their English versions

## About Originator Profile Project

Originator Profile Collaborative Innovation Partnership develops technologies to enable verification of the authenticity of information creators and originators. We aim for the global adoption of technologies to make the web a healthier and more transparent place.

For more details, please visit the project website  
https://originator-profile.org/

About Originator Profile Collaborative Innovation Partnership  
https://originator-profile.org/en-US/about/

## About Originator Profile Charter

Originator Profile Collaborative Innovation Partnership has established its fundamental principles and operational framework as the “Originator Profile Charter.”  
https://originator-profile.org/en-US/charter/

## License

Copyright 2025 Originator Profile Collaborative Innovation Partnership

This repository is licensed as follows:

- **Documentation and site content** are licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](LICENSE).
- **Code used to build and publish the site** (e.g., Docusaurus configuration) is licensed under the [MIT License](LICENSE-CODE).

Copies of each license are available at:

- CC BY 4.0: https://creativecommons.org/licenses/by/4.0/
- MIT License: https://opensource.org/licenses/MIT

All materials are provided “AS IS” without any warranties. See each license text for details.

## How to Participate and Contribute

To contribute to the technical specifications or software developed under the Originator Profile project, you must either agree to the Developer Certificate of Origin (by adding a sign-off line, “Signed-off-by”, in your pull request) or agree to the Contributor License Agreement.  
https://docs.originator-profile.org/contributing/

## Contact

If you wish to participate or contribute as a developer, please review “How to Participate and Contribute” and create proposals or Pull Requests on this GitHub repository. For other general questions or inquiries, please use the following form:  
https://originator-profile.org/en-US/contact/

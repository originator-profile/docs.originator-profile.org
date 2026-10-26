# Technical Document Site of Originator Profile

[English version 🇬🇧](./README.md)

## このリポジトリについて

このリポジトリは [Originator Profile](https://originator-profile.org/) の仕様案 (OPB: Originator Profile Blueprint) や技術ドキュメントの執筆・翻訳、サイトとして公開するコードを収めたリポジトリです。

[Docusaurus](https://docusaurus.io/) を採用しており、コンテンツは [Markdown (commonmark)](https://docusaurus.io/docs/markdown-features) および [MDX](https://docusaurus.io/docs/markdown-features/react) フォーマットで記載します。

### ドキュメントサイト

https://docs.originator-profile.org/

本リポジトリを OP の技術ドキュメントサイトとして [Cloudflare Pages](https://developers.cloudflare.com/pages/) でデプロイしています。
このリポジトリを更新すると自動的に数分で反映されます。

### フォルダ構成

本リポジトリでは [Docusaurs の多言語対応機能](https://docusaurus.io/docs/i18n/introduction)を用いて、日本語と英語の両方のページを用意しています。

- docs/ —— 日本語ドキュメント (オリジナル)
  - 配下の構成については下記「編集ルール」セクションを参照
- i18n/en/docusaurus-plugin-content-docs/current/ —— 英語ドキュメント (翻訳)
  - 英語ドキュメントは日本語ドキュメントと同じディレクトリ名やファイル名で作成します。
- static/ —— [静的アセット](https://docusaurus.io/docs/static-assets)
  - Docusaurus のビルド時に各ロケールディレクトリ（`/ja/`, `/en/`）にコピーされます
- public/ —— ロケール非依存のルートレベルファイル
  - ビルド後に `pages/` のルートに直接配置されるファイル群
  - public/index.html —— ルートページ（`/`）でブラウザ言語に応じて `/ja/` または `/en/` にリダイレクト
  - public/404.html —— カスタム 404 ページ。ロケールなしパスをブラウザ言語に応じてリダイレクト・ロケール付き 404 を各ロケールの 404 を使って表示
  - public/\_redirects —— [Cloudflare Pages のリダイレクト設定](https://developers.cloudflare.com/pages/configuration/redirects/)

### pnpm スクリプト

- `pnpm build`: ドキュメントサイトをビルドします
- `pnpm preview`: ドキュメントサイトをプレビューするためのローカルサーバーを起動します
- `pnpm preview --locale en`: ドキュメントサイトの英語コンテンツをプレビューするためのローカルサーバーを起動します

### 文書作成時の規約

- 非推奨（deprecated）となった仕様に関する文書は、タイトルに「⚠」をつけてください。
  例: `# Certificate ⚠`

### OPF 文書の統合

本リポジトリでは、OPF 文書のリポジトリを Git Subtree を使用して `opf-source/<name>/` に統合し、`https://docs.originator-profile.org/<name>/` で公開しています。

| name        | リポジトリ                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| `aov`       | [doc-opf-architectural-overview](https://github.com/originator-profile/doc-opf-architectural-overview) |
| `core`      | [doc-opf-core-specification](https://github.com/originator-profile/doc-opf-core-specification)         |
| `web-media` | [doc-opf-web-media](https://github.com/originator-profile/doc-opf-web-media)                           |
| `email`     | [doc-opf-email](https://github.com/originator-profile/doc-opf-email)                                   |

ビルド時に `copy-opf.mjs` が `opf-source/<name>/` の英語版 HTML を `pages/<name>/index.html` に、日本語版 HTML があれば `pages/ja/<name>/index.html` にコピーします。図などの資産はそれぞれのディレクトリにコピーします。日本語版は、サイドバー用のスタブ `docs/<name>/index.mdx` が出力したページを上書きします。

#### OPF 文書の更新方法

`.github/workflows/update-opf-source.yml` が毎日各リポジトリの最新版を取得し、main に push します。手動で取得する場合は以下のコマンドを使用します。`<url>` は `https://github.com/originator-profile/<repository>.git` です。

```bash
git subtree pull --prefix=opf-source/<name> <url> main --squash
```

#### OPF 文書の追加方法

1. `copy-opf.mjs` の `sources` に HTML ファイル名（日本語版があれば `jaHtml` も）と資産ディレクトリを追加する
2. `.github/workflows/update-opf-source.yml` の `matrix` に `name` と `url` を追加する
3. `public/_redirects` に `/en/<name>/*` から `/<name>/:splat` へのリダイレクトを追加する。日本語版が無い場合は `/ja/<name>/*` も追加する
4. `public/404.html` のロケール非依存パスの判定に `/<name>/` を追加する
5. `docs/<name>/`（`docs/aov/` と同様のスタブ。日本語版があれば `PathnameRedirect` に `jaTo="/ja/<name>/"` も渡す）を追加し、`scripts/check-numbering.js` の `TOP_LEVEL_RULES` に登録する
6. `src/pages/index.mdx`・`docs/getting-started.md` とそれぞれの英語版にリンクを追加する。リンクは `pathname:///<name>/` の形で書く

マージ後、`update-opf-source` Workflow を `workflow_dispatch` で実行すると、`opf-source/<name>/` が無い文書は `git subtree add` で取り込まれます。取り込むまでの間、`copy-opf.mjs` はその文書を飛ばします。本リポジトリは公開リポジトリなので、取り込んだ時点で文書の内容も公開されます。`matrix` への追加は公開してよい時点で行ってください。

## Originator Profile プロジェクトについて

Originator Profile 技術研究組合では、情報の作成者や発信者の真正性を確認可能とするための技術を開発しています。Web の世界をより健全で透明性の高いものとするための技術のグローバルな普及を目指しています。

詳しくはプロジェクトの Web サイトをご覧ください  
https://originator-profile.org/

Originator Profile 技術研究組合について  
https://originator-profile.org/ja-JP/about/

## Originator Profile 憲章について

Originator Profile 技術研究組合では基本理念と運用制度の在り方を「Originator Profile 憲章」として定めています。  
https://originator-profile.org/ja-JP/charter/

## ライセンス

Copyright 2025 Originator Profile Collaborative Innovation Partnership

このリポジトリのライセンスは次の通りです。

- **ドキュメントおよびサイト上で公開されるコンテンツ** は、[Creative Commons Attribution 4.0 International License (CC BY 4.0)](LICENSE) の下でライセンスされています。
- **サイト構築や公開に用いるコード**（例: Docusaurus 関連部分）は、[MIT License](LICENSE-CODE) の下でライセンスされています。

各ライセンスの写しは次の場所から入手できます。

- CC BY 4.0: https://creativecommons.org/licenses/by/4.0/
- MIT License: https://opensource.org/licenses/MIT

何れのライセンスでも「現状のまま（AS IS）」で提供され、いかなる保証も行いません。詳細は各ライセンスの本文をご覧ください。

## 参加・貢献するには

Originator Profile で開発する技術仕様やソフトウェアに貢献いただくには Developer Certificate of Origin に同意しプルリクエストでサインオフ (Signed-off-by 行) を付与していただくか、Contributor License Agreement に同意していただく必要があります。  
https://docs.originator-profile.org/contributing/

## お問い合わせ

開発者として参加・貢献いただける場合は「参加・貢献するには」を確認の上で、本 GitHub 上で提案や Pull Request を作成してください。それ以外の一般的なご質問やお問い合わせについては次のフォームをご利用ください。  
https://originator-profile.org/ja-JP/contact/

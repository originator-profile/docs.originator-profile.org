# Technical Document Site of Originator Profile

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

### Architectural Overview (AOV) 文書の統合

本リポジトリでは、[Architectural Overview 文書](https://github.com/originator-profile/doc-opf-architectural-overview)を Git Subtree を使用して統合し、https://docs.originator-profile.org/aov/ で公開しています。

ビルド時に `aov-source/` から `aov/` にコピーされ、html のリネームも行われます。

#### AOV 文書の更新方法

AOV リポジトリの内容が更新された場合、以下のコマンドで最新版を取得できます。現在はまだ doc-opf-architectural-overview リポジトリが非公開なので、読み取り権限がなければ、管理者に権限追加を依頼してください。

```bash
git subtree pull --prefix=aov-source \
  git@github.com:originator-profile/doc-opf-architectural-overview.git main --squash
```

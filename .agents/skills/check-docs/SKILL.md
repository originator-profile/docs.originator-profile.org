---
name: check-docs
description: docs.originator-profile.org のドキュメント品質チェックを行うスキル。採番規約の検証（check-numbering.js）と翻訳の original コミット整合性チェック（check-original-commits.js）を実行する。ユーザーが「採番チェック」「番号規約の確認」「翻訳チェック」「originalコミットの確認」などを要求したときに使用する。
---

# check-docs スキル

2種類のスクリプトでドキュメント品質を検査する。

## スクリプト一覧

### 1. 採番規約チェック: `scripts/check-numbering.js`

Diátaxisグループに基づく採番規約（position値）を検査する。

**採番規約:**

| 範囲 | Diátaxisグループ              | 対象                                                                     |
| ---- | ----------------------------- | ------------------------------------------------------------------------ |
| 1xx  | 理解指向・理論（Explanation） | `docs/tech/`                                                             |
| 2xx  | 情報指向・理論（Reference）   | `docs/opb/`, `docs/terminology/`                                         |
| 3xx  | 目標指向・実践（How-to）      | `docs/troubleshooting/`, `docs/error-reference/`, `docs/contributing.md` |
| 4xx  | 学習指向・実践（Tutorial）    | （未使用）                                                               |

**チェック内容:**

- `_category_.yml` の `position` が規約範囲内か
- `contributing.md` の `sidebar_position` が規約範囲内か
- 対象ファイル/ディレクトリの存在確認

```bash
scripts/check-numbering.js
```

**出力例:**

```
✅ 採番規約に違反するエントリはありません。
❌ docs/terminology/_category_.yml: position 250 は規約範囲外です（期待値: 200-299）
```

### 2. 翻訳コミット整合性チェック: `scripts/check-original-commits.js`

翻訳ファイル（i18n/）の `original` フロントマターが指すコミットと、原文の最新コミットを比較する。

**チェック内容:**

- `original` フロントマターの存在と形式（`/blob/{commit}/{path}`）
- パスの一致確認
- コミットが最新か（古い翻訳の検出）

```bash
scripts/check-original-commits.js
scripts/check-original-commits.js --locale=en
```

**出力例:**

```
✅ All translation files reference the latest source documents.
❌ README.md: latest commit 71686843add89eea55e7e2fa93d03c287c41b360 (frontmatter a1e3410)
```

## ワークフロー

**ドキュメント構成変更後:** 採番規約チェックを実行し、エラーがあれば `position` / `sidebar_position` を修正する。

**翻訳作業の前後:** 整合性チェックを実行し、`outdated` エラーがあれば `original` フロントマターと翻訳内容を更新する。

```bash
# 両方まとめて実行
pnpm check
```

## 前提条件

- Node.js、`git` がインストール済み
- `pnpm install` で `gray-matter`、`shelljs` がインストール済み

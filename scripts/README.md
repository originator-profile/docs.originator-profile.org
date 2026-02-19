# Scripts

本リポジトリでのドキュメント執筆または翻訳に便利なスクリプト群です。

## 前提

[リファレンス実装開発ガイド](https://cip.docs.originator-profile.org/development/)の記載と同等の環境を用意してください。

## 初期設定

次のコマンドをターミナルで実行してください。

```shell
git clone git@github.com:originator-profile/docs.originator-profile.org.git
cd docs.originator-profile
pnpm install
```

## `check-numbering.js`

採番規約（Diátaxisグループ別の position 値）への適合性をチェックします。

採番規約の概要:

| 範囲 | Diátaxisグループ              | 対象                                                                     |
| ---- | ----------------------------- | ------------------------------------------------------------------------ |
| 1xx  | 理解指向・理論（Explanation） | `docs/tech/`                                                             |
| 2xx  | 情報指向・理論（Reference）   | `docs/opb/`, `docs/terminology/`                                         |
| 3xx  | 目標指向・実践（How-to）      | `docs/troubleshooting/`, `docs/error-reference/`, `docs/contributing.md` |
| 4xx  | 学習指向・実践（Tutorial）    | （未使用）                                                               |

### 使い方

```console
$ node scripts/check-numbering.js
✅ 採番規約に違反するエントリはありません。
```

違反がある場合:

```console
$ node scripts/check-numbering.js
❌ docs/terminology/_category_.yml: position 250 は規約範囲外です（期待値: 200-299）

1 issue(s) detected.
```

## `check-original-commits.js`

原文に対応した翻訳かどうかを、翻訳文書 Front Matter の original プロパティの値に基づいてチェックします。

### 使い方

```console
$ node scripts/check-original-commits.js
❌ README.md: latest commit 71686843add89eea55e7e2fa93d03c287c41b360 (frontmatter a1e3410)

1 issue(s) detected.
```

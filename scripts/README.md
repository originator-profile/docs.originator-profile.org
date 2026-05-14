# Scripts

本リポジトリでのドキュメント執筆または翻訳に便利なスクリプト群です。

## 前提

[リファレンス実装開発ガイド](https://cip.docs.originator-profile.org/development/)の記載と同等の環境を用意してください。

## 初期設定

次のコマンドをターミナルで実行してください。

```shell
git clone git@github.com:originator-profile/docs.originator-profile.org.git
cd docs.originator-profile.org
pnpm install
```

## `check-numbering.js`

採番規約（Diátaxisグループ別の position 値）への適合性をチェックします。

採番規約の概要:

| 範囲 | Diátaxisグループ              |
| ---- | ----------------------------- |
| 1xx  | 学習指向・実践（Tutorial）    |
| 2xx  | 理解指向・理論（Explanation） |
| 3xx  | 目標指向・実践（How-to）      |
| 4xx  | 情報指向・理論（Reference）   |

### 使い方

```console
$ scripts/check-numbering.js
✅ 採番規約に違反するエントリはありません。
```

違反がある場合:

```console
$ scripts/check-numbering.js
❌ docs/terminology/_category_.yml: position 350 は規約範囲外です（期待値: 400-499）

1 issue(s) detected.
```

## `check-original-commits.js`

原文に対応した翻訳かどうかを、翻訳文書 Front Matter の original プロパティの値に基づいてチェックします。

### 使い方

```console
$ node --no-warnings scripts/check-original-commits.js --fix
❌ i18n/en/docusaurus-plugin-content-docs/current/README.md: outdated commit (recorded: 1234567, latest: abcdef0)
   fixed: https://github.com/originator-profile/docs.originator-profile.org/blob/abcdef0/docs/README.md

1 issue(s) detected.
1 file(s) updated.
```

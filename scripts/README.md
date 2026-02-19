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

# Scripts

本リポジトリでのドキュメント執筆または翻訳に便利なスクリプト群です。

## 前提

[開発ガイド](https://cip.docs.originator-profile.org/development/)の記載と同等の環境を用意してください。

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
$ node scripts/check-original-commits.js
❌ README.md: latest commit 71686843add89eea55e7e2fa93d03c287c41b360 (frontmatter a1e3410)

1 issue(s) detected.
```

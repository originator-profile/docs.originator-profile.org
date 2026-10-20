---
sidebar_position: 6
original: https://github.com/originator-profile/docs.originator-profile.org/blob/ca6a115/docs/error-reference/op-inspector-debugger/warnings/UNSPECIFIED.md
tags:
  - Error Reference
slug: /error-reference/UNSPECIFIED
---

# UNSPECIFIED

## コード: UNSPECIFIED

種類が特定されていない通知やエラーに割り当てられるコードです。

## メッセージ

通知の内容によって異なります。メッセージを確認してください。

## 発生する状況

- 構造化された詳細を伴わない警告・情報が通知された場合。
- エラーオブジェクトに `code` (`ERR_*`) が設定されていない場合。
- エラー以外の値が例外として投げられた場合。

## 解決策

- `UNSPECIFIED` 自体には固有の原因や解決策はありません。表示されているメッセージや詳細、位置を手がかりに原因を確認してください。
- [エラーコード一覧](../../index.mdx)に該当するエラーコードがないか確認してください。

## 関連情報

- [エラーコード一覧](../../index.mdx)

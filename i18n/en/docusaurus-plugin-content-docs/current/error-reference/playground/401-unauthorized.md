---
sidebar_position: 2
---

# 401 Unauthorized

:::note
このページは翻訳中です。
:::

## エラーコード: 401

認証情報が不正な場合に発生します。

## エラーメッセージ

- "Invalid password"

## エラーの原因

- ユーザー名またはパスワードなどの認証情報が正しくない可能性があります。

## 例

- 以下は、パスワードが異なる場合の例です。

```sh
curl -X POST https://example/ca -H content-type:application/json -u <username>:<invalid password> -d '{...}'
```

出力:

```
{"statusCode":401,"error":"Unauthorized","message":"Invalid password"}
```

## 解決策

- ユーザー名およびパスワードが正しいか確認してください。

## 関連情報

- [Content Attestation Server Playground](/playground/)

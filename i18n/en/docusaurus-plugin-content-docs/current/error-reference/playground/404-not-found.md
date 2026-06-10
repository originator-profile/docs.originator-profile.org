---
sidebar_position: 4
---

# 404 Not Found

:::note
このページは翻訳中です。
:::

## エラーコード: 404

未定義のエンドポイントへアクセスした場合に発生します。

## エラーメッセージ

- "404 Not Found"

## エラーの原因

- 用意されていない操作・エンドポイントにアクセスした可能性があります。

## 例

- 以下は、DELETE 操作を使用した場合の例です。

```sh
curl -X DELETE https://example/ca/urn:uuid:1d45253a-4c4b-4f68-863c-077e24245532 -u <username>:<password>
```

## 解決策

- 対象の URL やエンドポイント、HTTP メソッドが正しいか確認してください。

## 関連情報

- [Content Attestation Server Playground](/playground/)

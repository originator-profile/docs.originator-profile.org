---
sidebar_position: 4
---

# 404 Not Found

## エラーコード: 404

存在しないリソースへアクセスした場合に発生します。

## エラーメッセージ

- "Not Found"
- "resource not found."
- "Holder with ID <holderId> does not exist. Please ensure the account is registered."
- "The issuer or holder specified in the Web Media Profile does not exist in the system."
- "The issuer or holder specified in the Profile Annotation does not exist in the system."
- "Website Profile not found."
- "OP Account not found."
- "Issuer with ID <issuerId> not found."
- "Holder with ID <holderId> not found."

## エラーの原因

- 用意されていない操作・エンドポイントにアクセスした可能性があります。
- PrismaClientKnownRequestError の "P2025" エラーが発生した可能性があります。
  （詳細は [Prisma のエラーリファレンス](https://www.prisma.io/docs/orm/reference/error-reference#p2025)を参照してください。）
- Profile Annotation・Web Media Profile の登録・更新時に入力 JSON の `credentialSubject.id` が DB に存在しない可能性があります。
- Profile Annotation・Web Media Profile の登録・更新時に "Foreign key constraint violated" または、PrismaClientKnownRequestError の "P2003" エラーが発生した可能性があります。
  （詳細は [Prisma のエラーリファレンス](https://www.prisma.io/docs/orm/reference/error-reference#p2003)を参照してください。）
- 指定した Website Profile が見つからなかった可能性があります。
- DB で OP Account が見つからなかった可能性があります。
- DB で Issuer ID が 見つからなかった可能性があります。
- DB で Holder ID が見つからなかった可能性があります。

## 例

- 以下は、用意されていない操作・エンドポイントにアクセスした場合の例です。

```sh
curl -X GET https://example/pa -u <username>:<password>
```

- 以下は、DB に存在しない Website Profile を取得しようとした場合の例です。

```sh
curl -X GET https://example/wsp/https%3A%2F%2Fexample.com -u <username>:<password>
```

## 解決策

- それぞれのエラーメッセージを確認してください。
- 対象の URL やエンドポイント、HTTP メソッドが正しいか確認してください。
- Profile Annotation・Web Media Profile の入力 JSON の `credentialSubject.id` や `issuer` を確認してください。
- DB に存在するデータを指定してください。

## 関連情報

- [Prisma Error Reference](https://www.prisma.io/docs/orm/reference/error-reference)

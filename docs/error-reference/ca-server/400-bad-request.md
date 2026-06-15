---
sidebar_position: 1
---

# 400 Bad Request

## エラーコード: 400

主に JSON スキーマのバリデーションエラーがある場合に発生します。

## エラーメッセージ

- "One or more validations failed trying to process your request."
- "PrismaClientKnownRequestError: <エラーコード>"
- "Web Media Profile must have credentialSubject.id"
- "Profile Annotation must have credentialSubject.id"
- "<Site Profile の検証におけるエラーメッセージ>"

## エラーの原因

- 入力 JSON が期待されるスキーマ（必須項目・型・フォーマット）を満たしていない可能性があります。
- PrismaClientKnownRequestError（P2025 以外）が発生した可能性があります。
  （詳細は [Prisma のエラーリファレンス](https://www.prisma.io/docs/orm/reference/error-reference#prismaclientknownrequesterror)を参照してください。）
- Web Media Profile または Profile Annotation の登録・更新時に `credentialSubject.id` が含まれていない可能性があります。
- Site Profile の登録・更新時に、Site Profile の検証に失敗した可能性があります。
  （詳細は [Site Profile](../../opb/site-profile.md) を参照してください。）

## 例

- 以下は、必須項目である `issuer` が含まれていない場合の例です。

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    {
      "@language": "en-US"
    }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "credentialSubject": {
    "type": "Article",
    "headline": "Example Web Page",
    "image": {
      "id": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="
    },
    "description": "An example web page for content attestation",
    "author": ["John Doe"],
    "editor": ["Jane Smith"],
    "datePublished": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z"
  },
  "allowedUrl": ["https://example.com/*"],
  "target": [
    {
      "type": "TextTargetIntegrity",
      "cssSelector": "#main",
      "content": "data:text/html,<div id=\"main\">Hello, world!</div>"
    }
  ]
}
```

出力:

```
{"statusCode":400,"error":"Bad Request","message":"One or more validations failed trying to process your request.","failedValidations":{"body":{"issuer":"must be present"}}}
```

## 解決策

- 入力 JSON の必須項目・型・フォーマットまたはレスポンスメッセージのエラー内容を確認してください。
- PrismaClientKnownRequestError が発生している場合は、Prisma のエラーリファレンスを参照してください。
- Web Media Profile・Profile Annotation の `credentialSubject.id` は必ず含めてください。
- Site Profile の検証が通るよう、入力内容を修正してください。

## 関連情報

- [Prisma Error Reference](https://www.prisma.io/docs/orm/reference/error-reference)
- [Site Profile](../../opb/site-profile.md)

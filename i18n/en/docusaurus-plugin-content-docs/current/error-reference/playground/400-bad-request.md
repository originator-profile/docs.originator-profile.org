---
sidebar_position: 1
---

# 400 Bad Request

:::note
このページは翻訳中です。
:::

## エラーコード: 400

JSON スキーマのバリデーションエラーの場合に発生します。

## エラーメッセージ

- "One or more validations failed trying to process your request."

## エラーの原因

- 入力 JSON が期待されるスキーマ（必須項目・型・フォーマット）を満たしていない可能性があります。

## 例

- 以下は、入力 JSON の必須項目である `issuer` が含まれていない場合の例です。

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

## 関連情報

- [Content Attestation Server Playground](/playground/)

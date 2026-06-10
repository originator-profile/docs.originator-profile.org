---
sidebar_position: 3
---

# 403 Forbidden

:::note
このページは翻訳中です。
:::

## エラーコード: 403

`issuer` と OP Account ID が不一致だった場合、または Playground モードで DELETE 操作を行った場合に発生します。

## エラーメッセージ

- "Delete operations are not allowed in playground mode"
- "OP Account ID does not match the issuer of the Website Profile."
- "OP Account ID does not match the issuer of the Content Attestation."
- "OP Account ID does not match the issuer of the Web Media Profile."
- "OP Account ID does not match the issuer of the Profile Annotation."

## エラーの原因

- Website Profile・Content Attestation・Web Media Profile・Profile Annotation の登録・更新時に 入力 JSON の `issuer` と発行に使用している OP Account ID が一致していない可能性があります。
- Playground モードで DELETE 操作を使用した可能性があります。

## 例

- 以下は、Content Attestation の発行に使用している OP Account ID と入力 JSON の `issuer` が異なっている場合の例です。

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
  "issuer": "dns:another.com",
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

## 解決策

- 入力 JSON の `issuer` と、使用している OP Account ID が一致しているか確認してください。
- Playground モードで DELETE 操作をしていないか確認してください。

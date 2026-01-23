---
sidebar: 2
tags:
  - Error Reference
  - Content Attestation
  - Content Integrity Descriptor
---

# ERR_CONTENT_ATTESTATION_VERIFY_FAILED

## エラーコード: ERR_CONTENT_ATTESTATION_VERIFY_FAILED

Content Attestation の検証に失敗した場合に発生します。

## エラーメッセージ

- "URL not allowed. Expected: `<期待される URL>` Actual: `<実際の URL>`"
- "Origin not allowed. Expected: `<期待される Origin>` Actual: `<実際の Origin>`"
- "Content Attestation verify failed"
- "Content Attestation Target integrity verification failed for element(s): `<メッセージ>`"

## エラーの原因

- Content Attestation の VC の検証に失敗している可能性があります。
  [`ERR_VC_VERIFY_FAILED`](../vc/ERR_VC_VERIFY_FAILED.md) にてより詳しい原因を知ることができます。
- Content Attestation に含まれている `allowedUrl` と 実際の URL が異なっている可能性があります。
- Content Attestation に含まれている `allowedOrigin` と 実際の Origin が異なっている可能性があります。
- Content Attestation に含まれている Target integrity の検証に失敗している可能性があります。

## 例

- Core Profile と合わないプライベート鍵を使用して Content Attestation を発行。
- `allowedUrl` に Content Attestation を設置する Web ページの URL を含めていない。
  Content Attestation を https://media.example.com/articles/2024-06-30 に設置しようとしたが、`allowedUrl` を https://media.example.com/articles/2024-06-31 とした場合。

```
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "ja" }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "dns:example.com",
  "credentialSubject": {
    "id": "urn:uuid:78550fa7-f846-4e0f-ad5c-8d34461cb95b",
    "type": "Article",
    "headline": "<記事のタイトル>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
    },
    "description": "<Webページの説明>",
    "author": ["山田花子"],
    "editor": ["山田太郎"],
    "datePublished": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z",
    "genre": "Arts & Entertainment"
  },
  "allowedUrl": ["https://media.example.com/articles/2024-06-31"],
  "target": [
    {
      "type": "VisibleTextTargetIntegrity",
      "cssSelector": "<CSS セレクター>",
      "integrity": "sha256-GYC9PqfIw0qWahU6OlReQfuurCI5VLJplslVdF7M95U="
    },
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-+M3dMZXeSIwAP8BsIAwxn5ofFWUtaoSoDfB+/J8uXMo="
    }
  ]
}
```

- Target Integrity の値が異なる。

## 解決策

- 検証に失敗している Content Attestation の内容をご確認ください。
- Content Attestation に含まれている `allowedUrl` の値が適切かご確認ください。
- Content Attestation に含まれている `allowedOrigin` の値が適切かご確認ください。
  `allowedOrigin` は非推奨です。
- Content Attestation に含まれている Target Integrity の値が適切かご確認ください。
  より詳しくは [Content Attestation](../../opb/ca.md) にて確認することができます。

## 関連情報

- [`Content Attestation`](../../opb/ca.md)
- [`ERR_CONTENT_ATTESTATION_INVALID`](./ERR_CONTENT_ATTESTATION_INVALID.md)
- [`ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED`](../cas/ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED.md)
- [`ERR_VC_VERIFY_FAILED`](../vc/ERR_VC_VERIFY_FAILED.md)

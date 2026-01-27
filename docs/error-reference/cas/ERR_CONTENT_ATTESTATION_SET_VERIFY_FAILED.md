---
sidebar_position: 1
tags:
  - Error Reference
  - Content Attestation
---

# ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED

## エラーコード: ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED

Content Attestation Set に含まれている Content Attestation の検証に失敗した場合に発生します。

## エラーメッセージ

- "Content Attestation Set verify failed"

## エラーの原因

- Content Attestation Set に含まれている Content Attestation の検証に失敗している場合があります。

検証の失敗は次の原因を含みます。

- Content Attestation の復号に失敗している可能性があります。
  [`ERR_CONTENT_ATTESTATION_INVALID`](../ca/ERR_CONTENT_ATTESTATION_INVALID.md) にてより詳しい原因を知ることができます。
- Content Attestation に対する適切な Core Profile が見つからなかった可能性があります。
  [`ERR_CORE_PROFILE_NOT_FOUND`](../op/ERR_CORE_PROFILE_NOT_FOUND.md) にてより詳しい原因を知ることができます。
- Content Attestation の検証に失敗している可能性があります。
  [`ERR_CONTENT_ATTESTATION_VERIFY_FAILED`](../ca/ERR_CONTENT_ATTESTATION_VERIFY_FAILED.md) にてより詳しい原因を知ることができます。

## 例

- Content Attestation の `issuer` を Core Profile の `credentialSubject.id` と異なるものにして発行。
  Core Profile の `credentialSubject.id` が `dns:example.com` の時、 Content Attestation の `issuer` を `dns:another.com` として発行。

```
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "ja" }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "dns:another.com",
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
  "allowedUrl": ["https://media.example.com/articles/2024-06-30"],
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

## 解決策

- 検証に失敗している Content Attestion の内容をご確認ください。
- Core Profile の `credentialSubject.id` の値や Content Attestation の `issuer` が適切に設定されているかご確認ください。

## 関連情報

- [`Content Attestation`](../../opb/ca.md)
- [`Content Attestation Set`](../../opb/content-attestation-set.md)
- [`ERR_CONTENT_ATTESTATION_INVALID`](../ca/ERR_CONTENT_ATTESTATION_INVALID.md)
- [`ERR_CONTENT_ATTESTATION_VERIFY_FAILED`](../ca/ERR_CONTENT_ATTESTATION_VERIFY_FAILED.md)
- [`ERR_CORE_PROFILE_NOT_FOUND`](../op/ERR_CORE_PROFILE_NOT_FOUND.md)

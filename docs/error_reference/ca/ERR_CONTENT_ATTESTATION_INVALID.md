---
sidebar: 1
tags:
  - Troubleshooting
  - Content Attestation
---

# ERR_CONTENT_ATTESTATION_INVALID

## エラーコード: ERR_CONTENT_ATTESTATION_INVALID

Content Attestation が無効な形式になっている場合に発生します。

## エラーメッセージ

- "Invalid CA"
- "allowedUrl and allowedOrigin are exclusive"
- "Content Attestation validate failed"
- "Target is empty"

## エラーの原因

- Content Attestation の復号に失敗している可能性があります。
  [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md) にてより詳しい原因を知ることができます。
- Content Attestation の VC の妥当性確認に失敗している可能性があります。
- Content Attestation に `allowedUrl` と `allowedOrigin` の両方が含まれている可能性があります。
- Content Attestation の `target` プロパティが空となっている可能性があります。

## 例

- Content Attestation の文頭を一部欠損した形で設置。

```
<script type="application/cas+json">
  [
    {
      "attestation": "yJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9.e...",
      "main": true
    }
  ]
</script>
```

- `target` プロパティが空の状態で Content Attestation を発行。

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
  "allowedUrl": ["https://media.example.com/articles/2024-06-30"],
  "target": []
}
```

## 解決策

- 無効な形式となっている Content Attestation の内容をご確認ください。
- Content Attestation に `allowedUrl` と `allowedOrigin` 両方を含まないでください。
  より詳しくは [Content Attestation](../../opb/ca.md) にて確認することができます。
  allowedOrigin は非推奨です。

## 関連情報

- [`Content Attestation`](../../opb/ca.md)
- [`ERR_CONTENT_ATTESTATION_VERIFY_FAILED`](./ERR_CONTENT_ATTESTATION_VERIFY_FAILED.md)
- [`ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED`](../cas/ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED.md)
- [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md)

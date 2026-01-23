---
sidebar: 2
tags:
  - Error Reference
  - Profile Annotation
  - Web Media Specific Model
  - Content Attestation
---

# ERR_CORE_PROFILE_NOT_FOUND

## エラーコード: ERR_CORE_PROFILE_NOT_FOUND

Core Profile が見つからなかった場合に発生します。

## エラーメッセージ

- "Missing Core Profile `<issuer>`"
- "Appropriate Core Profile not found"

## エラーの原因

- Originator Profile Set に Core Profile が含まれていない可能性があります。
- Core Profile の検証結果が見つからなかった可能性があります。
- 適切な Core Profile が見つからなかった可能性があります。

## 例

- Profile Annotation の `issuer` を Core Profile の `credentialSubject.id` と異なるものにして発行。
  Core Profile の `credentialSubject.id` が `dns:profile-annotator.example.org` の時、 Profile Annotation の `issuer` を `dns:another.org` とする。

```
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    {
      "@language": "ja"
    }
  ],
  "type": ["VerifiableCredential", "ProfileAnnotation"],
  "issuer": "dns:another.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.org",
    "name": "<PA 名>",
    "description": "<PA の説明>",
    "annotation": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "ProfileAnnotationPolicy",
      "name": "<Profile Annotation Policy 名>",
      "description": "<Profile Annotation Policy の説明>",
      "ref": "https://annotation.example.org/about"
    }
  }
}
```

- Content Attestation の `issuer` を Core Profile の `credentialSubject.id` と異なるものにして発行。
  Core Profile の `credentialSubject.id` が `dns:example.com` の時、 Content Attestation の `issuer` を `dns:another.com` とする。

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

- Originator Profile Set に Core Profile が含まれているかご確認ください。
- Core Profile の `credentialSubject.id` の値や Profile Annotation・Web Media Profile・Website Profile・Content Attestation の `issuer` が適切に設定されているかご確認ください。

## 関連情報

- [`Content Attestation`](../../opb/ca.md)
- [`Core Profile`](../../opb/cp.md)
- [`Profile Annotation`](../../opb/pa.md)
- [`Web Media Profile`](../../opb/web-media-profile.md)
- [`Website Profile`](../../opb/website-profile.md)
- [`ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED`](../cas/ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED.md)
- [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](../op/ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md)
- [`ERR_SITE_PROFILE_INVALID`](../sp/ERR_SITE_PROFILE_INVALID.md)

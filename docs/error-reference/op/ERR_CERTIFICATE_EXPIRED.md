---
sidebar: 1
tags:
  - Error Reference
  - Profile Annotation
---

# ERR_CERTIFICATE_EXPIRED

## エラーコード: ERR_CERTIFICATE_EXPIRED

Profile Annotation に含まれている証明書の有効期限チェックに失敗した場合に発生します。

## エラーメッセージ

- "Certificate not yet valid"
- "Certificate expired"

## エラーの原因

- 証明書の有効期限が開始していない可能性があります。
- 証明書の有効期限が切れている可能性があります。

## 例

- Profile Annotation の `validFrom` プロパティに現在の日付より後のものが設定されている。

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
  "issuer": "dns:profile-annotator.example.org",
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
  },
  "validFrom": "2030-03-31T14:59:59Z"
}
```

- Profile Annotation の `validUntil` プロパティに現在の日付より前のものが設定されている。

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
  "issuer": "dns:profile-annotator.example.org",
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
  },
  "validUntil": "2022-03-31T14:59:59Z"
}
```

## 解決策

- `validFrom`、`validUntil` を有効な期限に設定してください。
  より詳しくは [Profile Annotation](../../opb/pa.md) にて確認することができます。

## 関連情報

- [`Profile Annotation`](../../opb/pa.md)
- [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](./ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md)

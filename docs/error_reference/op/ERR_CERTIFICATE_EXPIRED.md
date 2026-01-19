---
sidebar: 54
tags:
  - Trouble Shooting
  - Profile Annotation
---

# ERR_CERTIFICATE_EXPIRED

## エラーコード：ERR_CERTIFICATE_EXPIRED

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
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "ja" }
  ],
  "type": ["VerifiableCredential", "Certificate"],
  "issuer": "dns:cert-issuer.example.org",
  "credentialSubject": {
    "id": "dns:cert-holder.example.jp",
    "type": "CertificateProperties",
    "description": "この事業者は、〇〇の審査を経て〇〇の認証を取得しました。",
    "image": {
      "id": "https://example.com/certification-mark.svg",
      "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
    },
    "certifier": "〇〇認証機構",
    "verifier": "〇〇協会",
    "certificationSystem": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "CertificationSystem",
      "name": "<認証制度名>",
      "description": "<認証制度の説明>",
      "ref": "https://certification.example.org/about"
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
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "ja" }
  ],
  "type": ["VerifiableCredential", "Certificate"],
  "issuer": "dns:cert-issuer.example.org",
  "credentialSubject": {
    "id": "dns:cert-holder.example.jp",
    "type": "CertificateProperties",
    "description": "この事業者は、〇〇の審査を経て〇〇の認証を取得しました。",
    "image": {
      "id": "https://example.com/certification-mark.svg",
      "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
    },
    "certifier": "〇〇認証機構",
    "verifier": "〇〇協会",
    "certificationSystem": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "CertificationSystem",
      "name": "<認証制度名>",
      "description": "<認証制度の説明>",
      "ref": "https://certification.example.org/about"
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

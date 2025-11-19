---
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# 組織実在性証明書

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

- 組織実在性証明書: OP 保有組織の実在性を保証する証明書 (Certificate)

## 組織実在性証明書のプロパティ

[Certificate](../certificate.md) に従います。

### プロパティ

#### `@context`

REQUIRED. [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。

#### `credentialSubject`

REQUIRED. 日本における実在性を表す JSON-LD Node Object です。

- `id`: REQUIRED. 証明書保有組織の OP ID です。
- `type`: REQUIRED. `CertificateProperties` にしてください。
- `description`: OPTIONAL. この証明書に関する説明です（文字列）。
- `name`: REQUIRED. 法人名
- `corporateNumber`: REQUIRED. 法人番号
- `postalCode`: REQUIRED. 郵便番号
- `addressCountry`: REQUIRED. ISO 3166-1 alpha-2 国コードを指定します。日本の場合は `JP` です。
- `addressRegion`: REQUIRED. 都道府県
- `addressLocality`: REQUIRED. 市区町村
- `streetAddress`: REQUIRED. 番地・ビル名
- `certificationSystem`: REQUIRED. [認証制度](./certification-system.md)でなければなりません (MUST)。

:::note
日本以外の組織実在性証明書のプロパティに関しては検討中です。
:::

## Appendix

### 例

_このセクションは非規範的です。_

プロパティの具体例を次に示します。

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    {
      "@language": "ja"
    }
  ],
  "type": ["VerifiableCredential", "Certificate"],
  "issuer": "dns:ovac.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "CertificateProperties",
    "addressCountry": "JP",
    "name": "○○新聞社 (※開発用サンプル)",
    "corporateNumber": "0000000000000",
    "postalCode": "000-0000",
    "addressRegion": "東京都",
    "addressLocality": "千代田区",
    "streetAddress": "○○○",
    "certificationSystem": {
      "id": "urn:uuid:def09cbd-6e8e-4c73-856d-5e00dffde643",
      "type": "CertificationSystem",
      "name": "架空組織実在性検証局 実在証明",
      "description": "この組織は、法人登記の照会等により組織が実在していることが確認できました。",
      "ref": "https://ovac.exp.originator-profile.org/"
    },
    "certifier": "架空組織実在性検証局",
    "image": {
      "id": "https://ovac.exp.originator-profile.org/image.png",
      "digestSRI": "sha256-mnvgmCrOr6G7F3CqphnQxVDBeQob5EFstF/n7jNNVwg="
    }
  }
}
```

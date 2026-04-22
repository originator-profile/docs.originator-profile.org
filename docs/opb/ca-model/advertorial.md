---
tags:
  - Content Attestation
  - Web Media Specific Model
---

# Content Attestation of Advertorial

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

- Content Attestation (CA)

## 記事広告のプロパティ

[Content Attestation](../ca.md) に従います。

### プロパティ

#### 記事広告のプロパティ一覧 {#advertorial-properties}
| Name | Type | Description |
|------|------|-------------|
| `@context` | `array` | **REQUIRED.** [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。 |
| `type` | `array` | **REQUIRED.** 必ず `["VerifiableCredential", "ContentAttestation"]` にしてください (MUST)。 |
| `credentialSubject` | `object` | **REQUIRED.** 次の [credentialSubject のプロパティ](#credential-subject-properties)を含む JSON-LD Node Object です。 |
| `allowedUrl` | `array` | **REQUIRED.** Content Attestation に定義済みのプロパティです。空配列にしてはなりません (MUST NOT)。 |
| `target` | `array` | **REQUIRED.** Content Attestation に定義済みのプロパティです。空配列にしてはなりません (MUST NOT)。 |

#### credentialSubject のプロパティ一覧 {#credential-subject-properties}
| Name | Type | Description |
|------|------|-------------|
| `type` | `string` | **REQUIRED.** `Advertorial` でなければなりません (MUST)。 |
| `headline` | `string` | **REQUIRED.** 記事広告のタイトルです。|
| `description` | `string` | **REQUIRED.** 記事広告の説明です。 |
| `image` | `object` | **OPTIONAL.** 記事広告のサムネイル画像です。サムネイル画像がある場合指定するべきです (RECOMMENDED)。 [`image` データ型](../context.md#the-image-datatype) の JSON-LD Node Object でなければなりません (MUST)。このプロパティで CA を[検証](../context.md#image-datatype-の検証)することができます。 |
| `datePublished` | `string` | **OPTIONAL.** 公開日時 (ISO 8601) です。 |
| `dateModified` | `string` | **OPTIONAL.** 最終更新日時 (ISO 8601) です。 |
| `author` | `array` | **OPTIONAL.** 著者名の配列です。 |
| `editor` | `array` | **OPTIONAL.** 編集者名の配列です。 |
| `sponsor` | `array` | **OPTIONAL.** スポンサー名の配列です。 |
| `genre` | `string` | **OPTIONAL.** ジャンルです。 |

## Appendix

### 例

_このセクションは非規範的です。_

記事広告の具体例を次に示します。

```json
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
    "type": "Advertorial",
    "headline": "<記事広告Webページのタイトル>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-WNn1owxcJX6uwrNFOhPX+npz4j46s3a1cExjX5wWVxw="
    },
    "description": "<記事広告Webページの説明>",
    "author": ["山田花子"],
    "editor": ["山田太郎"],
    "sponsor": ["<スポンサー名>"],
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

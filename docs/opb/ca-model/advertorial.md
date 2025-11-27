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

#### `@context`

REQUIRED. [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。

#### `type`

REQUIRED. 必ず `["VerifiableCredential", "ContentAttestation"]` にしてください (MUST)。

#### `credentialSubject`

記事広告を表す JSON-LD Node Object です。OP-CIP の開発したアプリケーションは、次のプロパティを利用します。

- `type`: REQUIRED. `Advertorial` でなければなりません (MUST)。
- `headline`: REQUIRED. 記事広告のタイトル。
- `description`: REQUIRED. 記事広告の説明（文字列）。
- `image`: OPTIONAL. 記事広告のサムネイル画像。サムネイル画像がある場合指定するべきです (RECOMMENDED)。 [`image` データ型](../context.md#the-image-datatype) の JSON-LD Node Object でなければなりません (MUST)。このプロパティで CA を[検証](../context.md#image-datatype-の検証)することができます。
- `datePublished`: OPTIONAL. 公開日時 (ISO 8601)
- `dateModified`: OPTIONAL. 最終更新日時 (ISO 8601)
- `author`: OPTIONAL. 著者名（文字列）の配列
- `editor`: OPTIONAL. 編集者名（文字列）の配列
- `sponsor`: OPTIONAL. スポンサー名 (文字列) の配列
- `genre`: OPTIONAL. ジャンル（文字列）

#### `allowedUrl`

REQUIRED. Content Attestation に定義済みのプロパティ。空配列にしてはなりません (MUST NOT)。

#### `target`

REQUIRED. Content Attestation に定義済みのプロパティ。空配列にしてはなりません (MUST NOT)。

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

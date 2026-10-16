---
tags:
  - Content Attestation
  - Web Media Specific Model
---

# Content Attestation of Audio

:::note

このページは翻訳中です。

:::

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

- Content Attestation (CA)

## Audio のデータモデル

[Content Attestation](../ca.md) に従います。

### プロパティ

#### Audio のプロパティ一覧 {#audio-properties}

| Name                | Type                   | Description                                                                                                                                                                        |
| ------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]`             | **REQUIRED.** [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。 |
| `type`              | `string[]`             | **REQUIRED.** 必ず `["VerifiableCredential", "ContentAttestation"]` にしてください (MUST)。                                                                                        |
| `issuer`            | `string`               | **REQUIRED.** CA 発行者の [OP ID](../op-id.md) でなければなりません (MUST)。                                                                                                       |
| `credentialSubject` | `object`               | **REQUIRED.** 次の [credentialSubject のプロパティ](#credential-subject-properties)を含む JSON-LD Node Object です。                                                               |
| `allowedUrl`        | `string` \| `string[]` | **REQUIRED.** Content Attestation に定義済みのプロパティです。空配列にしてはなりません (MUST NOT)。                                                                                |
| `target`            | `object[]`             | **REQUIRED.** Content Attestation に定義済みのプロパティです。空配列にしてはなりません (MUST NOT)。                                                                                |

#### credentialSubject のプロパティ一覧 {#credential-subject-properties}

| Name             | Type       | Description                                                                                                                                                                                                                                                                                        |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `string`   | **REQUIRED.** CA ID でなければなりません (MUST)。 CA ID は [UUIDv4](https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-4) の URN 形式の文字列です。コンテンツと CA ID は一対一対応します。                                                                                              |
| `type`           | `string`   | **REQUIRED.** `Audio` でなければなりません (MUST)。                                                                                                                                                                                                                                                |
| `name`           | `string`   | **REQUIRED.** 音声のタイトルです。                                                                                                                                                                                                                                                                 |
| `description`    | `string`   | **REQUIRED.** 音声の説明です。                                                                                                                                                                                                                                                                     |
| `image`          | `object`   | **OPTIONAL.** 音声のサムネイル画像です。サムネイル画像がある場合指定するべきです (RECOMMENDED)。 [`image` データ型](../context.md#the-image-datatype) の JSON-LD Node Object でなければなりません (MUST)。このプロパティで CA を[検証](../context.md#verifying-image-datatype)することができます。 |
| `dateCreated`    | `string`   | **OPTIONAL.** 作成日時です。[`dateTimeStamp` データ型](../context.md#the-datetimestamp-datatype) でなければなりません (MUST)。                                                                                                                                                                     |
| `dateModified`   | `string`   | **OPTIONAL.** 最終更新日時です。[`dateTimeStamp` データ型](../context.md#the-datetimestamp-datatype) でなければなりません (MUST)。                                                                                                                                                                 |
| `creator`        | `string[]` | **OPTIONAL.** 作成者の配列です。                                                                                                                                                                                                                                                                   |
| `encodingFormat` | `string`   | **OPTIONAL.** コンテンツの符号化形式です。[MIME タイプ](https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/MIME_types)でなければなりません (MUST)。                                                                                                                                             |
| `genre`          | `string`   | **OPTIONAL.** ジャンルです。                                                                                                                                                                                                                                                                       |

## Appendix

### 例

_このセクションは非規範的です。_

音声の具体例を次に示します。

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
    "type": "Audio",
    "name": "<音声のタイトル>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-WNn1owxcJX6uwrNFOhPX+npz4j46s3a1cExjX5wWVxw="
    },
    "description": "<音声の説明>",
    "dateCreated": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z",
    "creator": ["山田花子"],
    "encodingFormat": "audio/mpeg",
    "genre": "Arts & Entertainment"
  },
  "allowedUrl": ["https://media.example.com/*"],
  "target": [
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-+M3dMZXeSIwAP8BsIAwxn5ofFWUtaoSoDfB+/J8uXMo="
    }
  ]
}
```

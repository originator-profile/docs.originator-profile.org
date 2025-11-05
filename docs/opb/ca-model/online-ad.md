---
tags:
  - Content Attestation
  - Web Media Specific Model
---

# Content Attestation of Online Ad Type

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

- Content Attestation (CA)

## Online Ad のデータモデル

### プロパティ

#### `@context`

REQUIRED. [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。

#### `type`

REQUIRED. 必ず `["VerifiableCredential", "ContentAttestation"]` にしてください (MUST)。

#### `credentialSubject`

広告を表す JSON-LD Node Object です。次のプロパティを含みます。

:::note

`credentialSubject` 内のプロパティは https://schema.org/CreativeWork を参考に決定しました。個々のプロパティの解釈、要不要について schema.org にどこまで準拠するかは OP を利用する企業との意見交換を踏まえて決めていく予定です。

:::

- `type`: REQUIRED. `OnlineAd` でなければなりません (MUST)。
- `name`: OPTIONAL. 広告のタイトル。
- `description`: OPTIONAL. 広告の説明（文字列）。
- `image`: OPTIONAL. 広告のサムネイル画像。サムネイル画像があるならば指定するべきです (RECOMMENDED)。 [`image` データ型](../context.md#the-image-datatype) の JSON-LD Node Object でなければなりません (MUST)。このプロパティで CA を[検証](../context.md#image-datatype-の検証)することができます。

**注意:** `name` 、 `description` 、 `image` プロパティはそれぞれ OPTIONAL ですが、3つのうち少なくとも1つを含まなければなりません (MUST)。

- `genre`: OPTIONAL. 文字列。
- `landingPageUrl`: OPTIONAL. 広告をクリックした際、最終的に表示されるページ（ランディングページ）の URL 。
- `adReportContact`: OPTIONAL. 広告に対する報告窓口。 [`page` データ型](../context.md#the-page-datatype) の JSON-LD Node Object でなければなりません (MUST)。
- `adReviewGuidelines`: OPTIONAL. 広告審査ガイドラインの情報。 [`page` データ型](../context.md#the-page-datatype) の JSON-LD Node Object でなければなりません (MUST)。
- `targetingPolicy`: OPTIONAL. ターゲティング広告に関するポリシー。 [`page` データ型](../context.md#the-page-datatype) の JSON-LD Node Object でなければなりません (MUST)。
- `adDataHandlingPolicy`: OPTIONAL. 広告配信に関する情報の取り扱いに関しての情報。 [`page` データ型](../context.md#the-page-datatype) の JSON-LD Node Object でなければなりません (MUST)。
- `adDisplayRationale.page`: OPTIONAL. この広告が表示されている理由 (Web ページ)。[`page` データ型](../context.md#the-page-datatype) の JSON-LD Node Object でなければなりません (MUST)。
- `adDisplayRationale.description`: OPTIONAL. この広告が表示されている理由 (文字列)。

:::note

画像・バナー広告以外の広告に関するプロパティの定義については、今後の課題として検討中です。

:::

#### `allowedUrl`

REQUIRED. Content Attestation に定義済みのプロパティ。空配列にしてはなりません (MUST NOT)。

#### `target`

REQUIRED. Content Attestation に定義済みのプロパティ。空配列にしてはなりません (MUST NOT)。

## Appendix

### 例

_このセクションは非規範的です。_

Advertisement の具体例を次に示します。

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
    "type": "OnlineAd",
    "name": "<広告のタイトル>",
    "description": "<広告の説明>",
    "image": {
      "id": "https://ad.example.com/image.png",
      "digestSRI": "sha256-5uQVtkoRdTFbimAz3Wz5GQcuBRLt7tDMD5JRtGFo9/M="
    },
    "landingPageUrl": "https://advertiser.example.com",
    "adReportContact": {
      "id": "https://ad.example.com/contact",
      "name": "広告に対する報告窓口"
    },
    "adReviewGuidelines": {
      "id": "https://ad.example.com/guidelines",
      "name": "広告審査ガイドライン"
    },
    "targetingPolicy": {
      "id": "https://ad.example.com/targeting",
      "name": "ターゲティング広告に関するポリシー"
    },
    "adDataHandlingPolicy": {
      "id": "https://ad.example.com/datahandling",
      "name": "広告配信に関する情報の取り扱いについての説明"
    },
    "adDisplayRationale": {
      "page": {
        "id": "https://ad.example.com/rationale",
        "name": "この広告が表示されている理由"
      },
      "description": "現在閲覧中のコンテンツと関連性が高いため。"
    }
  },
  "allowedUrl": ["https://ad.example.com/*"],
  "target": [
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-rLDPDYArkNcCvnq0h4IgR7MVfJIOCCrx4z+w+uywc64="
    }
  ]
}
```

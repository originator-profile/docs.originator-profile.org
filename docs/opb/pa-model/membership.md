---
sidebar_position: 2
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# 業界団体所属証 PA

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

- Profile Annotation (PA)
- 業界団体所属証 PA: OP 保有組織の業界団体の所属を保証する Profile Annotation

## 業界団体所属証 PA のプロパティ

[Profile Annotation](../pa.md) に従います。

### プロパティ

#### 業界団体所属証 PA のプロパティ一覧 {#membership-properties}

| Name                | Type       | Description                                                                                                                                                                        |
| ------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]` | **REQUIRED.** [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。 |
| `type`              | `string[]` | **REQUIRED.** 必ず `["VerifiableCredential", "ProfileAnnotation"]` にしてください (MUST)。                                                                                         |
| `issuer`            | `string`   | **REQUIRED.** PA 発行者の [OP ID](../op-id.md) でなければなりません (MUST)。                                                                                                       |
| `credentialSubject` | `object`   | **REQUIRED.** 次の [credentialSubject のプロパティ](#credential-subject-properties)を含む JSON-LD Node Object です。                                                               |
| `validFrom`         | `string`   | **OPTIONAL.** [Profile Annotation](../pa.md#profile-annotation-properties) に準拠します。含める場合、業界団体への所属が成立した時点を含めてください。                              |

#### credentialSubject のプロパティ一覧 {#credential-subject-properties}

| Name          | Type     | Description                                                                                                                                                                                                                                              |
| ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | `string` | **REQUIRED.** PA 保有組織の [OP ID](../op-id.md) です。                                                                                                                                                                                                  |
| `type`        | `string` | **REQUIRED.** `Membership` にしてください。                                                                                                                                                                                                              |
| `name`        | `string` | **OPTIONAL.** この PA の名前です。                                                                                                                                                                                                                       |
| `description` | `string` | **OPTIONAL.** この PA に関する説明です。                                                                                                                                                                                                                 |
| `image`       | `object` | **OPTIONAL.** [`image` データ型](../context.md#the-image-datatype) の JSON-LD Node Object でなければなりません (MUST)。このプロパティで Profile Annotation の画像が改ざんされていないかを[検証](../context.md#image-datatype-の検証)することができます。 |
| `annotation`  | `object` | **REQUIRED.** [Profile Annotation Policy](./pa-policy.md) でなければなりません (MUST)。                                                                                                                                                                  |

## Appendix

### 例

_このセクションは非規範的です。_

業界団体所属証 PA のデータモデルの具体例を次に示します。

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
  "type": ["VerifiableCredential", "ProfileAnnotation"],
  "issuer": "dns:medreg.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "Membership",
    "image": {
      "id": "https://medreg.exp.originator-profile.org/image.png",
      "digestSRI": "sha256-DP800gBJ225266yAyzf2VefM0OD+3nFSSKh6gy8WUnQ="
    },
    "annotation": {
      "id": "urn:uuid:2dbf9afe-af9c-4c6a-b6df-70a9565fec5e",
      "type": "ProfileAnnotationPolicy",
      "name": "架空報道団体登録センター 登録報道機関",
      "description": "この組織は、架空報道団体登録センターに登録済みの報道機関です。",
      "ref": "https://medreg.exp.originator-profile.org/"
    }
  },
  "validFrom": "2024-03-31T15:00:00Z"
}
```

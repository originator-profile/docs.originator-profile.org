---
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# 自治体認証 PA

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

- Profile Annotation (PA)
- 自治体認証 PA: OP 保有組織の自治体による認証を保証する Profile Annotation

## 自治体認証 PA のプロパティ

[Profile Annotation](../pa.md) に従います。

### プロパティ

#### 自治体認証 PA のプロパティ一覧 {#local-government-certification-properties}

| Name                | Type       | Description                                                                                                                                                                        |
| ------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]` | **REQUIRED.** [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。 |
| `type`              | `string[]` | **REQUIRED.** 必ず `["VerifiableCredential", "ProfileAnnotation"]` にしてください (MUST)。                                                                                         |
| `issuer`            | `string`   | **REQUIRED.** PA 発行者の [OP ID](../op-id.md) でなければなりません (MUST)。                                                                                                       |
| `credentialSubject` | `object`   | **REQUIRED.** 次の [credentialSubject のプロパティ](#credential-subject-properties)を含む JSON-LD Node Object です。                                                               |

#### credentialSubject のプロパティ一覧 {#credential-subject-properties}

| Name          | Type     | Description                                                                                                                                                                                                                                              |
| ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | `string` | **REQUIRED.** PA 保有組織の [OP ID](../op-id.md) です。                                                                                                                                                                                                  |
| `type`        | `string` | **REQUIRED.** `JP-LocalGovernmentCertificate` にしてください。                                                                                                                                                                                           |
| `name`        | `string` | **OPTIONAL.** この PA の名前です。                                                                                                                                                                                                                       |
| `description` | `string` | **OPTIONAL.** この PA に関する説明です。                                                                                                                                                                                                                 |
| `image`       | `object` | **OPTIONAL.** [`image` データ型](../context.md#the-image-datatype) の JSON-LD Node Object でなければなりません (MUST)。このプロパティで Profile Annotation の画像が改ざんされていないかを[検証](../context.md#image-datatype-の検証)することができます。 |
| `annotation`  | `object` | **REQUIRED.** [Profile Annotation Policy](./pa-policy.md) でなければなりません (MUST)。                                                                                                                                                                  |

:::note

日本以外の自治体認証 PA のプロパティに関しては検討中です。

:::

## Appendix

### 例

_このセクションは非規範的です。_

自治体認証 PA の具体例を次に示します。

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
  "issuer": "dns:lgac.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "JP-LocalGovernmentCertificate",
    "image": {
      "id": "https://lgac.exp.originator-profile.org/image.png",
      "digestSRI": "sha256-sbXuUuLz8dhRdPPpoiu4U+sjWLqIjjzJ7DPGxDZYxNM="
    },
    "annotation": {
      "id": "urn:uuid:203a2553-f1a8-40ba-9df0-4e508aa8511d",
      "type": "ProfileAnnotationPolicy",
      "name": "架空自治体認証センター 自治体証明",
      "description": "この組織は、地方自治法に基づき、組織および運営されている地方公共団体です。",
      "ref": "https://lgac.exp.originator-profile.org/"
    }
  }
}
```

::::warning[移行が必要です]

次にあるような以前の [Certificate](../certificate.md) を拡張する形式を使用している場合、2027-01-01 以降は検証できなくなります。それまでに発行者は本文書に定める形式への移行が必要です。

---

## 自治体認証証明書のプロパティ

[Certificate](../certificate.md) に従います。

### プロパティ

#### `@context`

REQUIRED. [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。

#### `credentialSubject`

REQUIRED. 自治体認証証明書を表す JSON-LD Node Object です。

- `id`: REQUIRED. 証明書保有組織の OP ID です。
- `type`: REQUIRED. `CertificateProperties` にしてください。
- `description`: OPTIONAL. この証明書に関する説明です（文字列）。
- `image`: OPTIONAL. [`image` データ型](../context.md#the-image-datatype) の JSON-LD Node Object でなければなりません (MUST)。このプロパティで Certificate の画像が改ざんされていないかを[検証](../context.md#image-datatype-の検証)することができます。
- `certifier`: OPTIONAL. 認証機関の名前です。
- `verifier`: OPTIONAL. 検証機関の名前です。
- `certificationSystem.id`: REQUIRED. 認証制度の ID を URI 形式で指定してください。
- `certificationSystem.type`: REQUIRED. `CertificationSystem` でなければなりません (MUST)。
- `certificationSystem.name`: REQUIRED. 認証制度の名前です。
- `certificationSystem.description`: OPTIONAL. 認証制度の説明です（文字列）。
- `certificationSystem.ref`: RECOMMENDED. 認証制度の詳細を知るための人が読むためのページの URL です。

:::note

日本以外の自治体認証証明書のプロパティに関しては検討中です。

:::

## Appendix

### 例

_このセクションは非規範的です。_

自治体認証証明書の具体例を次に示します。

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
  "issuer": "dns:lgac.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "CertificateProperties",
    "certificationSystem": {
      "id": "urn:uuid:203a2553-f1a8-40ba-9df0-4e508aa8511d",
      "type": "CertificationSystem",
      "name": "架空自治体認証センター 自治体証明",
      "description": "この組織は、地方自治法に基づき、組織および運営されている地方公共団体です。",
      "ref": "https://lgac.exp.originator-profile.org/"
    },
    "certifier": "架空組織実在性検証局",
    "image": {
      "id": "https://lgac.exp.originator-profile.org/image.png",
      "digestSRI": "sha256-sbXuUuLz8dhRdPPpoiu4U+sjWLqIjjzJ7DPGxDZYxNM="
    }
  }
}
```

::::

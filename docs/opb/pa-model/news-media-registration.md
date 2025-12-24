---
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# 報道機関登録証 PA

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

- Profile Annotation (PA)
- 報道機関登録証 PA: OP 保有組織の報道機関の所属を保証する Profile Annotation

## 報道機関登録証 PA のプロパティ

[Profile Annotation](../pa.md) に従います。

### プロパティ

#### `@context`

REQUIRED. [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。

#### `credentialSubject`

- `id`: REQUIRED. PA 保有組織の OP ID です。
- `type`: REQUIRED. `NewsMediaRegistration` にしてください。
- `name`: OPTIONAL. この PA の名前です (文字列)。
- `description`: OPTIONAL. この PA に関する説明です（文字列）。
- `image`: OPTIONAL. [`image` データ型](../context.md#the-image-datatype) の JSON-LD Node Object でなければなりません (MUST)。このプロパティで Profile Annotation の画像が改ざんされていないかを[検証](../context.md#image-datatype-の検証)することができます。
- `annotation`: REQUIRED. [Profile Annotation Policy](./pa-policy.md) でなければなりません (MUST)。

#### `validFrom`

OPTIONAL. [Profile Annotation](../pa.md#validfrom) に準拠します。含める場合、報道機関としての登録が成立した日付の開始時刻を含めてください。

## Appendix

### 例

_このセクションは非規範的です。_

報道機関登録証 PA のデータモデルの具体例を次に示します。

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
    "type": "NewsMediaRegistration",
    "image": {
      "id": "https://medreg.exp.originator-profile.org/image.png"
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

::::warning 移行が必要です

次にあるような以前の [Certificate](../certificate.md) を拡張する形式を使用している場合、2027-01-01 以降は検証できなくなります。それまでに発行者は本文書に定める形式への移行が必要です。

---

## 報道機関登録証明書のプロパティ

[Certificate](../certificate.md) に従います。

### プロパティ

#### `@context`

REQUIRED. [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。

#### `type`

REQUIRED. `["VerifiableCredential", "Certificate"]` でなければなりません (MUST)。

#### `issuer`

REQUIRED. 証明書発行組織の OP ID です。

:::note

現在、報道機関登録証明書は報道機関から OP 申請を受けた OP レジストリが発行しています。そのため `issuer` プロパティの値は OP レジストリの OP ID になります。

:::

#### `credentialSubject`

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

#### `validFrom`

OPTIONAL. [Certificate Data Model](../certificate.md#validfrom) に準拠します。含める場合、報道機関としての登録が成立した日付の開始時刻を含めてください。

## Appendix

### 例

_このセクションは非規範的です。_

報道機関登録証明書のデータモデルの具体例を次に示します。

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
  "issuer": "dns:medreg.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "CertificateProperties",
    "certificationSystem": {
      "id": "urn:uuid:2dbf9afe-af9c-4c6a-b6df-70a9565fec5e",
      "type": "CertificationSystem",
      "name": "架空報道団体登録センター 登録報道機関",
      "description": "この組織は、架空報道団体登録センターに登録済みの報道機関です。",
      "ref": "https://medreg.exp.originator-profile.org/"
    },
    "certifier": "架空報道団体登録センター",
    "image": {
      "id": "https://medreg.exp.originator-profile.org/image.png"
    },
    "validFrom": "2024-03-31T15:00:00Z"
  }
}
```

::::

---
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# 広告認証 PA

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

- Profile Annotation (PA)
- 広告認証 PA : OP 保有組織の広告認証を保証する Profile Annotation

## 広告認証 PA のプロパティ

[Profile Annotation](../pa.md) に従います。

### プロパティ

#### 広告認証 PA のプロパティ一覧 {#advertising-certification-properties}

| Name                | Type     | Description                                                                                                                                                                        |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `array`  | **REQUIRED.** [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。 |
| `type`              | `array`  | **REQUIRED.** 必ず `["VerifiableCredential", "ProfileAnnotation"]` にしてください (MUST)。                                                                                         |
| `issuer`            | `string` | **REQUIRED.** PA 発行者の [OP ID](../op-id.md) でなければなりません (MUST)。                                                                                                       |
| `credentialSubject` | `object` | **REQUIRED.** 次の [credentialSubject のプロパティ](#credential-subject-properties)を含む JSON-LD Node Object です。                                                               |
| `validFrom`         | `string` | **OPTIONAL.** [Profile Annotation](../pa.md#profile-annotation-properties) に準拠します。広告認証の交付日の最初の時刻を指定してください。                                          |
| `validUntil`        | `string` | **OPTIONAL.** [Profile Annotation](../pa.md#profile-annotation-properties) に準拠します。広告認証の有効期限の日時の最後の時刻を指定してください。                                  |

#### credentialSubject のプロパティ一覧 {#credential-subject-properties}

| Name          | Type     | Description                                                                                                                                                                                                                                              |
| ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | `string` | **REQUIRED.** PA 保有組織の [OP ID](../op-id.md) です。                                                                                                                                                                                                  |
| `type`        | `string` | **REQUIRED.** `AdvertisingQualityCertificate` にしてください。                                                                                                                                                                                           |
| `name`        | `string` | **OPTIONAL.** この PA の名前です。                                                                                                                                                                                                                       |
| `description` | `string` | **OPTIONAL.** この PA に関する説明です。                                                                                                                                                                                                                 |
| `image`       | `object` | **OPTIONAL.** [`image` データ型](../context.md#the-image-datatype) の JSON-LD Node Object でなければなりません (MUST)。このプロパティで Profile Annotation の画像が改ざんされていないかを[検証](../context.md#image-datatype-の検証)することができます。 |
| `verifier`    | `string` | **OPTIONAL.** 検証機関の名前です。                                                                                                                                                                                                                       |
| `annotation`  | `object` | **REQUIRED.** [Profile Annotation Policy](./pa-policy.md) でなければなりません (MUST)。                                                                                                                                                                  |

## Appendix

### 例

_このセクションは非規範的です。_

広告認証 PA の具体例を次に示します。

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
  "issuer": "dns:adcert.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "AdvertisingQualityCertificate",
    "image": {
      "id": "https://adcert.exp.originator-profile.org/image.png",
      "digestSRI": "sha256-3NHzrzdlO0zbE/57iK6kLKe8WtKR7ezVh7xL0q4poFg="
    },
    "verifier": "架空広告監査機構",
    "annotation": {
      "id": "urn:uuid:8029ece0-b327-4a7e-b586-3e442cb82d92",
      "type": "ProfileAnnotationPolicy",
      "name": "架空広告認証センター ブランドセーフティ認証",
      "description": "この事業者は、広告主のブランド価値を毀損するような違法、不当なサイト、コンテンツ、アプリケーションへの広告掲載を防ぐ対策を実施しています。",
      "ref": "https://adcert.exp.originator-profile.org/"
    }
  },
  "validFrom": "2024-03-31T15:00:00Z",
  "validUntil": "2030-03-31T14:59:59Z"
}
```

:::warning 移行が必要です

次にあるような以前の [Certificate](../certificate.md) を拡張する形式を使用している場合、2027-01-01 以降は検証できなくなります。それまでに発行者は本文書に定める形式への移行が必要です。

---

## 広告認証証明書のプロパティ

[Certificate](../certificate.md) に従います。

### プロパティ

#### `@context`

REQUIRED. [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。

#### `credentialSubject`

REQUIRED. 広告認証証明書を表す JSON-LD Node Object です。

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

OPTIONAL. [Certificate Data Model](../certificate.md#certificate-properties) に準拠します。広告認証の交付日の最初の時刻を指定してください。

#### `validUntil`

OPTIONAL. [Certificate Data Model](../certificate.md#certificate-properties) に準拠します。広告認証の有効期限の日時の最後の時刻を指定してください。

## Appendix

### 例

_このセクションは非規範的です。_

広告認証証明書の具体例を次に示します。

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
  "issuer": "dns:adcert.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "CertificateProperties",
    "certificationSystem": {
      "id": "urn:uuid:8029ece0-b327-4a7e-b586-3e442cb82d92",
      "type": "CertificationSystem",
      "name": "架空広告認証センター ブランドセーフティ認証",
      "description": "この事業者は、広告主のブランド価値を毀損するような違法、不当なサイト、コンテンツ、アプリケーションへの広告掲載を防ぐ対策を実施しています。",
      "ref": "https://adcert.exp.originator-profile.org/"
    },
    "certifier": "架空広告認証センター",
    "image": {
      "id": "https://adcert.exp.originator-profile.org/image.png",
      "digestSRI": "sha256-3NHzrzdlO0zbE/57iK6kLKe8WtKR7ezVh7xL0q4poFg="
    },
    "validFrom": "2024-03-31T15:00:00Z",
    "validUntil": "2030-03-31T14:59:59Z"
  }
}
```

:::

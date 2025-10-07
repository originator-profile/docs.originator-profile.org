---
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# 広告認証証明書

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

- 広告認証証明書: OP 保有組織の広告認証を保証する証明書 (Certificate)

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
- `certificationSystem.name`: REQUIRED.　認証制度の名前です。
- `certificationSystem.description`: OPTIONAL. 認証制度の説明です（文字列）。
- `certificationSystem.ref`: RECOMMENDED. 認証制度の詳細を知るための人が読むためのページの URL です。

#### `validFrom`

OPTIONAL. [Certificate Data Model](../certificate.md#validfrom) に準拠します。広告認証の交付日の最初の時刻を指定してください。

#### `validUntil`

OPTIONAL. [Certificate Data Model](../certificate.md#validuntil) に準拠します。広告認証の有効期限の日時の最後の時刻を指定してください。

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
      "id": "https://adcert.exp.originator-profile.org/image.png"
    },
    "validFrom": "2024-03-31T15:00:00Z",
    "validUntil": "2030-03-31T14:59:59Z"
  }
}
```

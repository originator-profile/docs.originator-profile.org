---
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# 自治体認証証明書

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

- 自治体認証証明書: OP 保有組織の自治体による認証を保証する証明書 (Certificate)

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
- `certificationSystem`: REQUIRED. [認証制度](./certification-system.md)でなければなりません (MUST)。

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
      "id": "https://lgac.exp.originator-profile.org/image.png"
    }
  }
}
```

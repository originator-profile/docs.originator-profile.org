---
sidebar_position: 21
tags:
  - Base Model
---

# Core Profile

## 用語

本文書に説明のない用語については、[用語](./terminology.md)を参照してください。

- Core Profile (CP)
- Originator Profile (OP)
- Originator Profile Identifier (OP ID)
- OP VC Data Model Conforming Document (OP VC DM 準拠文書)
- Profile Annotation (PA)

## Core Profile (CP) のデータモデル {#data-model}

Core Profile は OP VC DM 準拠文書でなければなりません (MUST)。他に以下のプロパティを含みます。

### プロパティ {#properties}

#### Core Profile のプロパティ一覧 {#core-profile-properties}
| Name | Type | Description |
|------|------|-------------|
| `@context` | `array` | **REQUIRED.** 必ず先頭が `https://www.w3.org/ns/credentials/v2`、その次が `https://originator-profile.org/ns/credentials/v1` である配列でなければなりません (MUST)。 |
| `type` | `array` | **REQUIRED.** 必ず `["VerifiableCredential", "CoreProfile"]` にしてください (MUST)。 |
| `issuer` | `string` | **REQUIRED.** VC 発行組織の [OP ID](./op-id.md) でなければなりません (MUST)。 |
| `credentialSubject` | `object` | **REQUIRED.** 次の [credentialSubject のプロパティ](#credential-subject-properties)を含む JSON-LD Node Object です。 |

#### credentialSubject のプロパティ一覧 {#credential-subject-properties}
| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | **REQUIRED.** CP 保有組織の [OP ID](./op-id.md) でなければなりません (MUST)。 |
| `type` | `string` | **REQUIRED.** `Core` でなければなりません (MUST)。 |
| `jwks` | `object` | **REQUIRED.** [JWK Set](https://www.rfc-editor.org/rfc/rfc7517.html#section-5) でなければなりません (MUST)。CP 保有組織の公開鍵の集合です。 |

## 拡張性 {#extensibility}

発行者は [OP VC Data Model](./op-vc-data-model.md) および本文書に未定義のプロパティを Core Profile に追加してはなりません (MUST NOT) 。仕様策定者も Core Profile へのプロパティの追加を避けることが強く推奨されます (SHOULD)。

Web Media Profile あるいは [Profile Annotation](./pa.md) を拡張して発行することを検討してください。

## Appendix

### 例

_このセクションは非規範的です。_

Core Profile の具体例を次に示します。

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1"
  ],
  "type": ["VerifiableCredential", "CoreProfile"],
  "issuer": "dns:example.org",
  "credentialSubject": {
    "id": "dns:example.jp",
    "type": "Core",
    "jwks": {
      "keys": [
        {
          "x": "ypAlUjo5O5soUNHk3mlRyfw6ujxqjfD_HMQt7XH-rSg",
          "y": "1cmv9lmZvL0XAERNxvrT2kZkC4Uwu5i1Or1O-4ixJuE",
          "crv": "P-256",
          "kid": "jJYs5_ILgUc8180L-pBPxBpgA3QC7eZu9wKOkh9mYPU",
          "kty": "EC"
        }
      ]
    }
  }
}
```

---
tags:
  - Base Model
  - Profile Annotation
---

# Profile Annotator 登録証 PA

Profile Annotator 登録証 PA は、OP レジストリが登録要件として認めている Profile Annotator であることを示すための PA です。

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

## Profile Annotator 登録証 PA のデータモデル

[Profile Annotation](../pa.md) に従います。

### プロパティ

#### `@context`

REQUIRED. [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。

#### `type`

REQUIRED. 必ず `["VerifiableCredential", "ProfileAnnotation"]` にしてください (MUST)。

#### `issuer`

REQUIRED. OP レジストリの OP ID でなければなりません (MUST)。

Profile Annotator 登録証 PA は OP レジストリが発行する PA です。OP レジストリは Profile Annotator 候補の組織を審査し、適格と認めた場合にこの PA を発行します。

#### `credentialSubject`

- `id`: REQUIRED. Profile Annotator 登録証 PA を保有する組織（Profile Annotator）の OP ID でなければなりません (MUST)。
- `type`: REQUIRED. `ProfileAnnotatorRegistration` でなければなりません (MUST)。
- `annotatorName`: REQUIRED. Profile Annotator の名称です（文字列）。
- `description`: OPTIONAL. この Profile Annotator に関する説明です（文字列）。
- `annotationScheme`: REQUIRED. この Profile Annotator が発行を認められている Profile Annotation を一意に識別する URI の配列でなければなりません (MUST)。
- `annotation`: REQUIRED. Profile Annotator 登録制度を示す [Profile Annotation Policy](./pa-policy.md) でなければなりません (MUST)。

:::note

Profile Annotator 登録制度の ID について、同じ OP レジストリが運営する Profile Annotator 登録制度で、登録要件が同一である場合は、同じ値であるべきです。

:::

## 検証

Profile Annotator 登録証 PA を受け取った検証者は、次の検証を行うことができます（SHOULD）：

1. Profile Annotator 登録証 PA が [OP VC Data Model](../op-vc-data-model.md) および [Securing Mechanism](../securing-mechanism.md) に従って検証可能であることを確認する
2. `issuer` が信頼できる OP レジストリの OP ID であることを確認する
3. Profile Annotator が発行した PA が準拠する認証制度の ID が、この Profile Annotator PA の `credentialSubject.annotationScheme` プロパティに含まれていることを確認する

## ユースケース

Profile Annotator 登録証 PA は、次のようなユースケースで使用されます：

- OP レジストリが、特定の PA を発行する資格を持つ組織を管理する
- 検証者が、受け取った PA の発行者が適切な資格を持っているかを確認する
- Profile Annotator が、自身の資格を証明する

例えば、「組織実在性証明書」を発行できる認証機関を OP レジストリが認定する場合、その認証機関に対して Profile Annotator 登録証 PA を発行します。検証者は、受け取った「組織実在証 PA 」の発行者が持つ Profile Annotator 登録証 PA を確認することで、その発行者が適切な資格を持っていることを検証できます。

## Appendix

### 例

_このセクションは非規範的です。_

Profile Annotator 登録証 PA のデータモデルの具体例を次に示します。

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    {
      "@language": "ja-JP"
    }
  ],
  "type": ["VerifiableCredential", "ProfileAnnotation"],
  "issuer": "dns:op-registry.example.org",
  "credentialSubject": {
    "id": "dns:pa-issuer.example.jp",
    "type": "ProfileAnnotatorRegistration",
    "name": "Profile Annotator 登録証",
    "description": "組織実在性証明書および広告認証証明書の発行を認められた Profile Annotator です。",
    "annotatorName": "株式会社〇〇認証機構",
    "annotationScheme": [
      "urn:uuid:def09cbd-6e8e-4c73-856d-5e00dffde643",
      "urn:uuid:8029ece0-b327-4a7e-b586-3e442cb82d92"
    ],
    "annotation": {
      "id": "urn:uuid:5927e1da-e422-47c8-a5b8-efa6f5a45dd7",
      "type": "ProfileAnnotationPolicy",
      "name": "OP レジストリ Profile Annotator 登録制度",
      "description": "OP レジストリが運営する Profile Annotator の登録制度です。登録要件を満たした組織に対して Profile Annotator PA を発行します。",
      "ref": "https://op-registry.example.org/pa-issuer-registration"
    }
  }
}
```

この例では、`dns:op-registry.example.org` という OP レジストリが、`dns:pa-issuer.example.jp` という組織に対して Profile Annotator 登録証 PA を発行しています。この組織は2つの認証制度（組織実在性証明と広告認証）に準拠した PA を発行する資格を持っています。

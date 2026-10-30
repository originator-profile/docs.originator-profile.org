---
sidebar_position: 4
tags:
  - Base Model
  - Profile Annotation
---

# Profile Annotation Issuer 認定証 PA

Profile Annotation Issuer 認定証 PA は、OP レジストリが認定要件を満たすと認めた Profile Annotation Issuer であることを示すための PA です。

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

## Profile Annotation Issuer 認定証 PA のデータモデル

[Profile Annotation](../pa.md) に従います。

### プロパティ

#### Profile Annotation Issuer 認定証 PA のプロパティ一覧 {#issuer-accreditation-properties}

| Name                | Type       | Description                                                                                                                                                                                                                                                    |
| ------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]` | **REQUIRED.** [OP VC Data Model](../op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。                                                                             |
| `type`              | `string[]` | **REQUIRED.** 必ず `["VerifiableCredential", "ProfileAnnotation"]` にしてください (MUST)。                                                                                                                                                                     |
| `issuer`            | `string`   | **REQUIRED.** OP レジストリの [OP ID](../op-id.md) でなければなりません (MUST)。Profile Annotation Issuer 認定証 PA は OP レジストリが発行する PA です。OP レジストリは Profile Annotation Issuer 候補の組織を審査し、適格と認めた場合にこの PA を発行します。 |
| `credentialSubject` | `object`   | **REQUIRED.** 次の [credentialSubject のプロパティ](#credential-subject-properties)を含む JSON-LD Node Object です。                                                                                                                                           |

#### credentialSubject のプロパティ一覧 {#credential-subject-properties}

| Name                   | Type       | Description                                                                                                                                                                           |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string`   | **REQUIRED.** Profile Annotation Issuer 認定証 PA を保有する組織（Profile Annotation Issuer）の [OP ID](../op-id.md) でなければなりません (MUST)。                                    |
| `type`                 | `string`   | **REQUIRED.** `IssuerAccreditation` でなければなりません (MUST)。旧値 `ProfileAnnotationIssuerRegistration` については[旧名称との互換性](#backward-compatibility)を参照してください。 |
| `name`                 | `string`   | **OPTIONAL.** PA 名です。                                                                                                                                                             |
| `annotationIssuerName` | `string`   | **REQUIRED.** Profile Annotation Issuer の名称です。                                                                                                                                  |
| `description`          | `string`   | **OPTIONAL.** この Profile Annotation Issuer に関する説明です。                                                                                                                       |
| `annotationScheme`     | `string[]` | **REQUIRED.** この Profile Annotation Issuer が発行を認められている Profile Annotation を一意に識別する URI の配列でなければなりません (MUST)。                                       |
| `annotation`           | `object`   | **REQUIRED.** Profile Annotation Issuer 認定制度を示す [Profile Annotation Policy](./pa-policy.md) でなければなりません (MUST)。                                                      |

:::note

Profile Annotation Issuer 認定制度の ID について、同じ OP レジストリが運営する Profile Annotation Issuer 認定制度で、認定要件が同一である場合は、同じ値であるべきです。

:::

### Issuer Accreditation との関係

`IssuerAccreditation` は、[OPF Core](pathname:///ja/core/) の Issuer Accreditation と同じ type です。
Issuer Accreditation は Profile Annotation Issuer 以外の立場の認定にも使われるため、`credentialSubject.type` が `IssuerAccreditation` で、かつ `credentialSubject.annotationScheme` を持つ PA を、Profile Annotation Issuer としての認定 (Profile Annotation Issuer 認定証 PA) として扱います。

### 旧名称との互換性 {#backward-compatibility}

この PA は、以前は「Profile Annotation Issuer 登録証 PA」という名称で、`credentialSubject.type` に `ProfileAnnotationIssuerRegistration` を用いていました。
`ProfileAnnotationIssuerRegistration` は非推奨 (deprecated) です。
OP レジストリは、新たに発行する Profile Annotation Issuer 認定証 PA の `credentialSubject.type` に `ProfileAnnotationIssuerRegistration` を使用するべきではありません (SHOULD NOT)。

検証者は、後方互換性のため、`credentialSubject.type` が `ProfileAnnotationIssuerRegistration` である PA を受け付け、`IssuerAccreditation` と同等に扱うべきです (SHOULD)。

## Profile Annotation Issuer 認定証 PA の検証

検証者は、Profile Annotation Issuer が保有する Profile Annotation Issuer 認定証 PA について、[OP VC Data Model](../op-vc-data-model.md) および [Securing Mechanism](../securing-mechanism.md) に従った検証を行うことができます（SHOULD）。ここでの検証は認定証 PA 自体の真正性の確認（[VC Data Model 2.0 の verification](https://www.w3.org/TR/vc-data-model-2.0/#terminology)）であり、その `issuer` が信頼できる OP レジストリであるかどうかの判断は含みません。

## Profile Annotation Issuer の認可確認

検証者は、PA を受け取った際、その発行者が OP レジストリによって認可された Profile Annotation Issuer であるかどうかを、次の手順で確認できます（SHOULD）。この確認は、検証者自身の要件を満たすかどうかを判断する、[VC Data Model 2.0 の validation](https://www.w3.org/TR/vc-data-model-2.0/#terminology) に相当します。

`credentialSubject.annotationScheme` を持たない `IssuerAccreditation` は、この確認では読み飛ばします。

1. その Profile Annotation Issuer が保有する Profile Annotation Issuer 認定証 PA の `issuer` が、信頼できる OP レジストリの OP ID であることを確認する
2. 検証対象の PA が準拠する認証制度の ID が、その Profile Annotation Issuer 認定証 PA の `credentialSubject.annotationScheme` プロパティに含まれていることを確認する

Profile Annotation Issuer が Profile Annotation Issuer 認定証 PA を保有していない場合、この確認は未実施（未確認）として扱われます。認可を確認できないことは、検証対象の PA 自体が無効であることを直ちに意味するものではありませんが、未確認の PA をどう扱うか（許容するか、無効として扱うか）は検証者のポリシーに依存します。

前項の「Profile Annotation Issuer 認定証 PA の検証」は暗号学的な検証であるため決定的な結果を返します。これに対し、この認可確認は、検証者が信頼する OP レジストリさえ定まれば手続き自体は決定的ですが、どの OP レジストリを信頼するかは検証者のポリシーに依存するため、確認結果は検証者ごとに異なることがあります。

## ユースケース

Profile Annotation Issuer 認定証 PA は、次のようなユースケースで使用されます：

- OP レジストリが、特定の PA を発行する資格を持つ組織を管理する
- 検証者が、受け取った PA の発行者が適切な資格を持っているかを確認する
- Profile Annotation Issuer が、自身の資格を証明する

例えば、「組織実在性証明書」を発行できる認証機関を OP レジストリが認定する場合、その認証機関に対して Profile Annotation Issuer 認定証 PA を発行します。検証者は、受け取った「組織実在証 PA 」の発行者が持つ Profile Annotation Issuer 認定証 PA を確認することで、その発行者が適切な資格を持っていることを検証できます。

## Appendix

### 例

_このセクションは非規範的です。_

Profile Annotation Issuer 認定証 PA のデータモデルの具体例を次に示します。

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
  "issuer": "dns:op-registry.example.org",
  "credentialSubject": {
    "id": "dns:profile-annotation-issuer.example.jp",
    "type": "IssuerAccreditation",
    "name": "Profile Annotation Issuer 認定証",
    "description": "OP レジストリは、この組織を組織実在性証明書および広告認証証明書の発行者として認定しました。",
    "annotationIssuerName": "株式会社〇〇認証機構",
    "annotationScheme": [
      "urn:uuid:def09cbd-6e8e-4c73-856d-5e00dffde643",
      "urn:uuid:8029ece0-b327-4a7e-b586-3e442cb82d92"
    ],
    "annotation": {
      "id": "urn:uuid:5927e1da-e422-47c8-a5b8-efa6f5a45dd7",
      "type": "ProfileAnnotationPolicy",
      "name": "OP レジストリ Profile Annotation Issuer 認定制度",
      "description": "OP レジストリが運営する Profile Annotation Issuer の認定制度です。認定要件を満たした組織に対して Profile Annotation Issuer 認定証 PA を発行します。",
      "ref": "https://op-registry.example.org/issuer-accreditation"
    }
  }
}
```

この例では、`dns:op-registry.example.org` という OP レジストリが、`dns:profile-annotation-issuer.example.jp` という組織に対して Profile Annotation Issuer 認定証 PA を発行しています。この組織は2つの認証制度（組織実在性証明と広告認証）に準拠した PA を発行する資格を持っています。

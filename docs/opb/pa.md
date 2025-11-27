---
sidebar_position: 22
tags:
  - Base Model
  - Profile Annotation
---

# Profile Annotation

Profile Annotation は Core Profile の主体に関する情報を表明するための VC の共通データモデルです。

## 用語

本文書に説明のない用語については、[用語](./terminology.md)を参照してください。

- Core Profile (CP)
- Originator Profile Identifier (OP ID)
- OP VC Data Model Conforming Document (OP VC DM 準拠文書)
- Profile Annotation (PA)

## Profile Annotation (PA) のデータモデル

Profile Annotation は OP VC DM 準拠文書でなければなりません (MUST)。他に以下のプロパティを含みます。

### プロパティ

#### `@context`

[OP VC Data Model](./op-vc-data-model.md) に従ってください (MUST)。

#### `type`

REQUIRED. 必ず `["VerifiableCredential", "ProfileAnnotation"]` にしてください (MUST)。

#### `issuer`

REQUIRED. PA 発行者の OP ID でなければなりません (MUST)。

#### `credentialSubject.id`

REQUIRED. PA 保有組織の OP ID でなければなりません (MUST)。

#### `credentialSubject.name`

OPTIONAL. PA 名。文字列でなければなりません (MUST)。

#### `credentialSubject.description`

OPTIONAL. PA の説明。文字列でなければなりません (MUST)。

#### `credentialSubject.image`

OPTIONAL. [`image` データ型](./context.md#the-image-datatype) の JSON-LD Node Object でなければなりません (MUST)。このプロパティで Profile Annotation の画像が改ざんされていないかを[検証](./context.md#image-datatype-の検証)することができます。

#### `credentialSubject.annotationScheme`

OPTIONAL. `credentialSubject` JSON-LD Node Object で表明される PA のほかに、 `credentialSubject.annotation` プロパティの Profile Annotation Policy に基づいて発行される一連の Profile Annotation の集合です。Profile Annotation を一意に識別する URI の配列でなければなりません (MUST)。

#### `credentialSubject.annotation`

REQUIRED. [Profile Annotation Policy](./pa-model/pa-policy.md) でなければなりません (MUST)。

:::note

Profile Annotation で検証する属性あるいは発行ポリシーが同種で、Profile Annotation を保有する組織だけが異なるものは、同じ `annotation.id` の値であるべき (SHOULD) です。

また、Profile Annotation Policy の名前、説明、URL は発行時点で最新の内容であるべき (SHOULD) です。

:::

#### `validFrom`

OPTIONAL. Profile Annotation の有効期間の開始日時です。[VC Data Model 2.0 4.9節 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period) に準拠します。[`dateTimeStamp` データ型](./context.md#the-datetimestamp-datatype) でなければなりません (MUST)。

この値を指定しないとき、有効期間の開始日時はなし（`validUntil` より過去のどの時点でも有効とする）を示します。

:::note

`validUntil` プロパティと同様に、この値は Profile Annotation が含む情報の有効期間の開始日時であり、 VC の署名の有効期間の開始日時とは異なります。現在 OP で採用している Securing Mechanism である [VC-JOSE-COSE](https://www.w3.org/TR/vc-jose-cose/) の JWT における `exp` (expired at) クレームや `iat` (issued at) クレームとは異なる意味を持ち、異なる値を指定することができます。

詳細は `validUntil` プロパティの注釈を参照してください。

:::

#### `validUntil`

OPTIONAL. Profile Annotation の有効期限です。[VC Data Model 2.0 4.9節 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period) に準拠します。[`dateTimeStamp` データ型](./context.md#the-datetimestamp-datatype) でなければなりません (MUST)。

このプロパティの値は、Profile Annotation が含む情報が正しい最後の時刻を表します。

この値を指定しないとき、有効期限なし（無期限）を示します。

:::note

この値は Profile Annotation が含む情報の有効期限であり、 VC の署名の有効期限とは異なります。現在 OP で採用している Securing Mechanism である [VC-JOSE-COSE](https://www.w3.org/TR/vc-jose-cose/) の JWT では、署名の有効期限は JWT の `exp` (expired at) クレームで指定します。 `validUntil` プロパティの値は `exp` クレームとは異なる値にすることができます。

異なる値を指定したいシナリオとして、有効期限が遠い将来の第三者認証を証明する VC を、定期的に再発行したいケースがあります。例えば、 `2050-12-31T15:00:00Z` に失効する第三者認証をこの仕様に基づいて Profile Annotation として発行する場合です。そのとき、署名の危殆化や鍵の漏洩によるセキュリティリスクを軽減するために、Profile Annotation を定期的に再発行することが考えられます。定期的な再発行を促すため、署名に有効期限を設け、1年ごとに署名が失効するようにします。その場合、署名の有効期限（1年後）を `exp` クレームに指定し、 `validUntil` は再発行した日付によらず `2050-12-31T15:00:00Z` にすることで、再発行を行いながら、第三者認証の有効期限を正確に表現することができます。

プロパティの定義については [VC Data Model 2.0 4.9節 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period) を参照ください。

:::

## 拡張性 {#extensibility}

発行者は [OP VC Data Model](./op-vc-data-model.md) および本文書に未定義のプロパティを追加してもよいです (MAY) が、その場合は `credentialSubject.annotation.id` プロパティを異なる値にしなければなりません (MUST)。

また、[Verifiable Credentials Data Model 2.0 セクション 5.2](https://www.w3.org/TR/vc-data-model-2.0/#extensibility)に従って拡張することを検討してください (RECOMMENDED)。

## Appendix

### 例

_このセクションは非規範的です。_

PA の具体例を次に示します。

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    {
      "@language": "ja"
    }
  ],
  "type": ["VerifiableCredential", "ProfileAnnotation"],
  "issuer": "dns:profile-annotator.example.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.org",
    "name": "<PA 名>",
    "description": "<PA の説明>",
    "annotation": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "ProfileAnnotationPolicy",
      "name": "<Profile Annotation Policy 名>",
      "description": "<Profile Annotation Policy の説明>",
      "ref": "https://annotation.example.org/about"
    }
  }
}
```

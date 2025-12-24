---
sidebar_position: 23
tags:
  - Profile Annotation
---

# Certificate

:::warning 非推奨になりました

2027-01-01 以降、Certificate は検証できなくなります。それまでに [Profile Annotation](./pa.md) を発行するよう変更してください。

:::

## 用語

本文書に説明のない用語については、[用語](./terminology.md)を参照してください。

- Profile Annotation (PA)
- 認証制度

## Certificate のデータモデル

[Profile Annotation](./pa.md) に従います。

### プロパティ

#### `@context`

REQUIRED. [OP VC Data Model](./op-vc-data-model.md) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。

#### `type`

REQUIRED. 必ず `["VerifiableCredential", "Certificate"]` にしてください (MUST)。

#### `credentialSubject`

- `id`: REQUIRED. Certificate を保有する組織の OP ID です。
- `type`: REQUIRED. 個別の Certificate を定義している文書で指定します。
- `description`: OPTIONAL. この証明書に関する説明です（文字列）。
- `image`: OPTIONAL. [`image` データ型](./context.md#the-image-datatype) の JSON-LD Node Object でなければなりません (MUST)。このプロパティで Certificate の画像が改ざんされていないかを[検証](./context.md#image-datatype-の検証)することができます。
- `certifier`: OPTIONAL. 認証機関の名前です。
- `verifier`: OPTIONAL. 検証機関の名前です。
- `certificationSystem.id`: REQUIRED. 認証制度の ID を URI 形式で指定してください。
- `certificationSystem.type`: REQUIRED. `CertificationSystem` でなければなりません (MUST)。
- `certificationSystem.name`: REQUIRED. 認証制度の名前です。
- `certificationSystem.description`: OPTIONAL. 認証制度の説明です（文字列）。
- `certificationSystem.ref`: RECOMMENDED. 認証制度の詳細を知るための人が読むためのページの URL です。

:::note

Certificate が証明する内容、証明の根拠あるいは証拠が同種で、Certificate を保有する組織だけが異なるものは、同じ `certificationSystem.id` の値であるべきです。

また、認証制度の名前、説明、URL は発行時点で最新の内容であるべきです。

:::

#### `validFrom`

OPTIONAL. 認証の有効期間の開始日時です。[VC Data Model 2.0 4.9節 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period) に準拠します。[`dateTimeStamp` データ型](./context.md#the-datetimestamp-datatype) でなければなりません (MUST)。

この値を指定しないとき、有効期間の開始日時はなし（`validUntil` より過去のどの時点でも有効とする）を示します。

:::note

`validUntil` プロパティと同様に、この値は Certificate が含む情報の有効期間の開始日時であり、 VC の署名の有効期間の開始日時とは異なります。現在 OP で採用している Securing Mechanism である [VC-JOSE-COSE](https://www.w3.org/TR/vc-jose-cose/) の JWT における `exp` (expired at) クレームや `iat` (issued at) クレームとは異なる意味を持ち、異なる値を指定することができます。

詳細は `validUntil` プロパティの注釈を参照してください。

:::

#### `validUntil`

OPTIONAL. 認証の有効期限です。[VC Data Model 2.0 4.9節 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period) に準拠します。[`dateTimeStamp` データ型](./context.md#the-datetimestamp-datatype) でなければなりません (MUST)。

このプロパティの値は、 Certificate が含む情報が正しい最後の時刻を表します。

この値を指定しないとき、有効期限なし（無期限）を示します。

:::note

この値は Certificate が含む情報の有効期限であり、 VC の署名の有効期限とは異なります。現在 OP で採用している Securing Mechanism である [VC-JOSE-COSE](https://www.w3.org/TR/vc-jose-cose/) の JWT では、署名の有効期限は JWT の `exp` (expired at) クレームで指定します。 `validUntil` プロパティの値は `exp` クレームとは異なる値にすることができます。

異なる値を指定したいシナリオとして、有効期限が遠い将来の第三者認証を証明する VC を、定期的に再発行したいケースがあります。例えば、 `2050-12-31T15:00:00Z` に失効する第三者認証をこの仕様に基づいて Certificate として発行する場合です。そのとき、署名の危殆化や鍵の漏洩によるセキュリティリスクを軽減するために、 Certificate を定期的に再発行することが考えられます。定期的な再発行を促すため、署名に有効期限を設け、1年ごとに署名が失効するようにします。その場合、署名の有効期限（1年後）を `exp` クレームに指定し、 `validUntil` は再発行した日付によらず `2050-12-31T15:00:00Z` にすることで、再発行を行いながら、第三者認証の有効期限を正確に表現することができます。

プロパティの定義については [VC Data Model 2.0 4.9節 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period) を参照ください。

:::

## Appendix

### 例

_このセクションは非規範的です。_

Certificate のデータモデルの具体例を次に示します。

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "ja" }
  ],
  "type": ["VerifiableCredential", "Certificate"],
  "issuer": "dns:cert-issuer.example.org",
  "credentialSubject": {
    "id": "dns:cert-holder.example.jp",
    "type": "CertificateProperties",
    "description": "この事業者は、〇〇の審査を経て〇〇の認証を取得しました。",
    "image": {
      "id": "https://example.com/certification-mark.svg",
      "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
    },
    "certifier": "〇〇認証機構",
    "verifier": "〇〇協会",
    "certificationSystem": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "CertificationSystem",
      "name": "<認証制度名>",
      "description": "<認証制度の説明>",
      "ref": "https://certification.example.org/about"
    }
  },
  "validFrom": "2024-03-31T15:00:00Z",
  "validUntil": "2030-03-31T14:59:59Z"
}
```

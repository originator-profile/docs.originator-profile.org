---
sidebar_position: 28
tags:
  - Web Media Specific Model
---

# Web Media Profile

## 用語

本文書に説明のない用語については、[用語](./terminology.md)を参照してください。

- OP VC Data Model Conforming Document (OP VC DM 準拠文書)
- Originator Profile Identifier (OP ID)
- Web Media Profile (WMP)

## Web Media Profile (WMP) のデータモデル

Web Media Profile は OP VC DM 準拠文書でなければなりません (MUST)。他に以下のプロパティを含みます。

### プロパティ

#### `@context`

[OP VC Data Model](./op-vc-data-model.md#context) に従ってください (MUST)。

#### `type`

REQUIRED. 必ず `["VerifiableCredential", "WebMediaProfile"]` にしてください (MUST)。

#### `issuer`

REQUIRED. WMP 保有組織の Core Profile の発行者でなければなりません (MUST)。

:::note

WMP 記載の情報は Core Profile を発行する組織が審査で確認します。

:::

#### `credentialSubject`

REQUIRED. Web メディアの発信者を表す JSON-LD Node Object です。

- `id`: REQUIRED. WMP 保有組織の OP ID でなければなりません (MUST)。
- `type`: REQUIRED. `OnlineBusiness` でなければなりません (MUST)。
- `url`: REQUIRED. 組織の公式ページへの URL でなければなりません (MUST)。
- `name`: REQUIRED. 組織名です。
- `logo`: OPTIONAL. 組織のロゴ画像です。 [`image` データ型](./context.md#the-image-datatype) の JSON-LD Node Object でなければなりません (MUST)。このプロパティで WMP のロゴ画像が改ざんされていないかを[検証](./context.md#image-datatype-の検証)することができます。
- `email`: OPTIONAL. 組織の代表メールアドレスです。
- `telephone`: OPTIONAL. 組織の代表電話番号です。
- `contactPoint`: OPTIONAL. お問い合わせページの情報です。 [`page` データ型](./context.md#the-page-datatype) の JSON-LD Node Object でなければなりません (MUST)。
- `informationTransmissionPolicy`: OPTIONAL. 情報発信ポリシーページの情報です。 [`page` データ型](./context.md#the-page-datatype) の JSON-LD Node Object でなければなりません (MUST)。
- `publishingPrinciple`: OPTIONAL. 編集ガイドラインの情報です。 [`page` データ型](./context.md#the-page-datatype) の JSON-LD Node Object でなければなりません (MUST)。
- `privacyPolicy`: OPTIONAL. プライバシーポリシーページの情報です。 [`page` データ型](./context.md#the-page-datatype) の JSON-LD Node Object でなければなりません (MUST)。
- `description`: OPTIONAL. 組織に関する自由形式テキスト。[`description` データ型](./context.md#the-description-datatype)またはその配列でなければなりません (MUST)。

:::note

`informationTransmissionPolicy` プロパティに含める情報発信ポリシーは [Originator Profile 憲章](https://originator-profile.org/ja-JP/charter/) の第3条1号において OP ID 付与の必須条件とされています。

:::

:::note

Originator Profile 憲章第3条1号への遵守を検証可能な形で表明するための、`informationTransmissionPolicy` プロパティ等の一部または WMP 全体への WMP 保有組織による署名を含める仕様については、検討中です。

- `informationTransmissionPolicy` プロパティ等の一部への WMP 保有組織による署名: [JWS Compact Serialization](https://www.rfc-editor.org/rfc/rfc7515.html#section-3.1) 形式のプロパティの追加
- WMP 全体への発行者と WMP 保有組織による二重署名: [JWS JSON Serialization](https://www.rfc-editor.org/rfc/rfc7515.html#section-3.2)形式による WMP の署名

:::

:::note

`description` プロパティに2つ以上の `description` データ型の要素が含まれている場合、同じ内容のテキストコンテンツを複数の符号化形式で表現することを目的とすべきです。また、複数の符号化形式でテキストコンテンツを提供するのであれば、アプリケーション実装者が定めるセキュリティポリシーに対応できるように、要素の1つは `text/plain` 形式のテキストコンテンツにすることを推奨します。

:::

## 拡張性

発行者は [OP VC Data Model](./op-vc-data-model.md) および本文書に未定義のプロパティを追加してもよいです (MAY) が、その場合は [Verifiable Credentials Data Model 2.0 セクション 5.2](https://www.w3.org/TR/vc-data-model-2.0/#extensibility)に従って拡張してください (RECOMMENDED)。

## Appendix

### 例

_このセクションは非規範的です。_

WMP の具体例を次に示します。

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    { "@language": "ja" }
  ],
  "type": ["VerifiableCredential", "WebMediaProfile"],
  "issuer": "dns:wmp-issuer.example.org",
  "credentialSubject": {
    "id": "dns:wmp-holder.example.jp",
    "type": "OnlineBusiness",
    "url": "https://www.wmp-holder.example.jp/",
    "name": "○○メディア (※開発用サンプル)",
    "logo": {
      "id": "https://www.wmp-holder.example.jp/logo.svg",
      "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
    },
    "email": "contact@wmp-holder.example.jp",
    "telephone": "0000000000",
    "contactPoint": {
      "id": "https://wmp-holder.example.jp/contact",
      "name": "お問い合わせ"
    },
    "informationTransmissionPolicy": {
      "id": "https://wmp-holder.example.jp/statement",
      "name": "情報発信ポリシー"
    },
    "privacyPolicy": {
      "id": "https://wmp-holder.example.jp/privacy",
      "name": "プライバシーポリシー"
    },
    "description": {
      "text": "<!doctype html><title>description</title><p>この文章はこの Web メディアに関する<strong>補足情報</strong>です。</p>",
      "encodingFormat": "text/html"
    }
  }
}
```

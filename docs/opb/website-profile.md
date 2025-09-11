---
sidebar_position: 5
---

# Website Profile (WSP) Data Model

## 用語

本文書に説明のない用語については、[用語](./terminology.md)を参照してください。

- Originator Profile Identifier (OP ID)
- OP VC Data Model Conforming Document (OP VC DM 準拠文書)
- Website Profile (WSP)

## Website Profile のデータモデル

Website Profile は OP VC DM 準拠文書でなければなりません (MUST)。他に以下のプロパティを含みます。

### `@context`

REQUIRED. [OP VC Data Model](./op-vc-data-model.md#context) に従ってください (MUST)。さらに、3つ目の値を `"https://originator-profile.org/ns/cip/v1"` にしなければなりません (MUST)。

### `type`

REQUIRED. 必ず `["VerifiableCredential", "WebsiteProfile"]` にしてください (MUST)。

### `issuer`

REQUIRED. Web サイト保有組織の OP ID にしてください (MUST)。

### `credentialSubject`

REQUIRED. 次のプロパティを含む JSON-LD Node Object です。

#### `id`

REQUIRED. Web サイトの URL を含めてください (MUST)。複数の URL に同じコンテンツが存在する場合は、最も代表的な URL を指定します。

#### `type`

REQUIRED. `WebSite` でなければなりません (MUST)。

#### `name`

REQUIRED. Web サイトの名称です。

#### `image`

OPTIONAL. Web サイトのサムネイル画像です。 [`image` データ型](./context.md#the-image-datatype) の JSON-LD Node Object でなければなりません (MUST)。このプロパティで WSP のサムネイル画像が改ざんされていないかを[検証](./context.md#image-datatype-の検証)することができます。

#### `description`

OPTIONAL. Web サイトの説明です (文字列)。

#### `allowedOrigin`

REQUIRED. 提示するWebサイトを識別するための [RFC 6454](https://www.rfc-editor.org/rfc/rfc6454) オリジン (スキーム、ホスト名、ポート番号) をASCII形式で表した文字列あるいはその文字列の配列です。
パス、クエリ、フラグメントは含めてはなりません (MUST NOT)。
また、デフォルトポート (例: `https:` の 443、`http:` の 80) は、[W3C URL Standard](https://url.spec.whatwg.org/) に基づき省略された形式で表現します。
このプロパティでWSPが正当なオリジンのWebサイトに設置されているかどうかを[検証](#verification)することができます。

具体例:

✅ 有効:

- `https://example.com` (`https:` スキームのデフォルトポート 443 が省略された形式)
- `http://example.com:8080` (デフォルトではないポートなので明示)

❌ 無効:

- `https://example.com/` (パスが含まれている)
- `https://example.com/path` (パスが含まれている)
- `http://example.com/?query=1` (クエリが含まれている)
- `https://example.com#section` (フラグメントが含まれている)

## 検証プロセス {#verification}

WSP の検証者は次のことを検証することができます。

- [OP VC Data Model に準拠した VC の検証](./op-vc-data-model.md#verification)
- `allowedOrigin` の検証

### `allowedOrigin` の検証

検証者は次の手順に従って `allowedOrigin` プロパティを検証できます (OPTIONAL)。

1. WSP が提示された Web ページの URL オリジンを取得します。
2. `allowedOrigin` プロパティの文字列と 1\. で得た URL オリジンが一致するか確認します。

## Appendix

### 例

_このセクションは非規範的です。_

Website Profile データモデルの非規範的な例を次に示します。

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "ja" }
  ],
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "dns:example.com",
  "credentialSubject": {
    "id": "https://media.example.com",
    "type": "WebSite",
    "name": "<Webサイトのタイトル>",
    "description": "<Webサイトの説明>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-Upwn7gYMuRmJlD1ZivHk876vXHzokXrwXj50VgfnMnY="
    },
    "allowedOrigin": ["https://media.example.com"]
  }
}
```

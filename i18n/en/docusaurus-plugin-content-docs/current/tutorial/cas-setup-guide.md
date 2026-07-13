---
sidebar_position: 2
---

# Content Attestation の設置

:::note

このページは翻訳中です。

:::

## 目的

Content Attestation (CA) を検証可能にします。

## 方法

`/.well-known/sp.json` > `originators` プロパティに含まれる OP と HTML 中 の Content Attestation Set (CAS) を使用します。あらかじめ [Site Profile の設置](./sp-setup-guide.md) をご確認ください。

:::note

**OP の追加**

Content Attestation Set の検証にはすべての Content Attestation <ruby>発行者<rt>issuer</rt></ruby>の OP が必要です。

OP を追加する方法としては、[Site Profile の設置](./sp-setup-guide.md) にある手順、あるいは HTML 中に script 要素を用いて OP を埋め込む方法があります。

具体例:

```html
<script type="application/ops+json">
  [
    {
      "core": "eyJ...",
      "annotations": ["eyJ..."],
      "media": ["eyJ..."]
    }
  ]
</script>
```

HTML 中に OP を埋め込む方法の詳細は [Linking Content Attestation Set and Originator Profile Set to A HTML Document](https://docs.originator-profile.org/opb/link-to-html/) をご確認ください。

:::

:::note[OP 登録できない場合]

OP 登録できない場合は、テスト環境である Content Attestation Server Playground を使用して Content Attestation の発行ができます。  
詳しくは [Content Attestation Server Playground の API ドキュメント](https://playground.originator-profile.org/#tag/ca/POST/ca)をご確認ください。

Content Attestation Server Playground を使用して発行したものは本番環境では使用できません。詳細は [Content Attestation Server Playground](/playground/) をご確認ください。

:::

## 手順

記事/コンテンツを OP に対応させるための処理をします。これは、記事/コンテンツの作成や更新時に**都度必要**となる処理です。

1. [Content Attestation (CA) の作成](#step1): 記事/コンテンツの作成時に、それに対応する Content Attestation (CA) を作成します。
2. [Content Attestation Set (CAS) の作成](#step2): ページ中の Content Attestation のリストを含めた Content Attestation Set を作成します。
3. [Content Attestation Set の追加](#step3): ページ HTML 中に Content Attestation Set を追加します。この参照は、script 要素を用いて実現します。

## ステップ1. Content Attestation の作成 {#step1}

Content Attestation の作成には以下の方法があります。

- [CA Server を使用する方法](#ca-server): [`/ca`](https://playground.originator-profile.org/#tag/ca) エンドポイントを使用
- OPVC CLI を使用する方法：`opvc ca:sign` コマンドを使用
- [jwt.io](https://jwt.io) を使用する方法：指定されたJSONフォーマットを使用

### CA Server を使用する方法 {#ca-server}

:::note

このセクション「CA Server を使用する方法」では、Content Attestation Server Playground を前提として説明しています。
Playground と本番環境の CA Server は API 仕様が共通ですが、認証手順が異なります。

本番環境の CA Server を利用する場合は、認証手順が異なるため、ご利用のサーバーが提供するマニュアルに従って設定してください。

:::

[`/ca`](https://playground.originator-profile.org/#tag/ca) エンドポイントを使用して作成します。

必要なパラメータをリクエストのボディに付与して POST メソッドを送ることで登録できます。

このエンドポイントは更新にも使用します。 既に Content Attestation (CA) が登録されている場合、既存の CA を更新します。

詳しくは [Content Attestation Server Playground の API ドキュメント](https://playground.originator-profile.org/#tag/ca/POST/ca) を参照してください。

具体例:

```
$ curl -X POST https://playground.originator-profile.org/ca \
    -H content-type:application/json \
    -u Basic認証ユーザー名:Basic認証パスワード \
    -d '{...}'
```

実行後、コンソールに表示される "eyJ” から始まる文字列が Content Attestation です。

指定するファイルは以下の形式です。

article-content-attestation.example.json

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    {
      "@language": "<言語・地域コード>"
    }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "<OP ID>",
  "credentialSubject": {
    "id": "<CA ID (登録時省略可・更新時必須)>",
    "type": "Article",
    "headline": "<コンテンツのタイトル>",
    "description": "<コンテンツの説明>",
    "image": {
      "id": "<サムネイル画像URL>",
      "content": "<コンテンツ (data:// 形式URL)>"
    },
    "datePublished": "<公開日時>",
    "dateModified": "<最終更新日時>",
    "author": ["<著者名>"],
    "editor": ["<編集者名>"],
    "genre": "<ジャンル>"
  },
  "allowedUrl": ["<CAの使用を許可するWebページのURL Pattern>"],
  "target": [
    {
      "type": "<Content Integrity Descriptorの種別>",
      "content": "<コンテンツ本体 (text/html or URL)>",
      "cssSelector": "<CSS セレクター (optional)>"
    }
  ],
  "issuedAt": "<発行日時 (optional)>",
  "expiredAt": "<期限切れ日時 (optional)>"
}
```

具体例:

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
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "type": "Article",
    "headline": "Originator Profile 検証サイト",
    "description": "Originator Profile 検証サイトです。",
    "image": {
      "id": "https://example.com/image.svg",
      "content": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="
    },
    "author": ["山田花子"],
    "editor": ["山田太郎"],
    "datePublished": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z",
    "genre": "Arts & Entertainment"
  },
  "allowedUrl": ["https://media.example.com/articles/2024-06-30"],
  "target": [
    {
      "type": "VisibleTextTargetIntegrity",
      "cssSelector": "h1",
      "content": "<!doctype html><html><head></head><body><h1>Originator Profile 検証サイト</h1></body></html>"
    },
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-+M3dMZXeSIwAP8BsIAwxn5ofFWUtaoSoDfB+/J8uXMo="
    }
  ]
}
```

プロパティの詳細は次の文書をご確認ください。

- [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/)
- [Content Attestation of Article Type](https://docs.originator-profile.org/opb/ca-model/article/)
- [`/ca`](https://playground.originator-profile.org/#tag/ca)

### 別の方法: OPVC CLI を使用する方法

`opvc ca:sign` コマンドを使用して作成します。
詳細は [OPVC CLI のドキュメント](/opvc-cli/#publish-content-attestation) を参照してください。

具体例:

```
$ opvc ca:sign -i ./account-key.example.priv.json --input ./article-content-attestation.example.json
eyJ...
```

実行後、コンソールに表示される "eyJ” から始まる文字列が Content Attestation です。

OPVC CLI のインストール方法は [OPVC CLI インストール方法](/opvc-cli/#install) をご確認ください。

-i オプションにはプライベート鍵を指定します。

--input オプションには Content Attestation に関する情報を JSON で記述し、指定します。

指定するファイルは以下の形式です。

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    {
      "@language": "<言語・地域コード>"
    }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "<OP ID>",
  "credentialSubject": {
    "type": "Article",
    "headline": "<コンテンツのタイトル>",
    "description": "<コンテンツの説明>",
    "image": {
      "id": "<サムネイル画像URL>",
      "content": "<コンテンツ (file:// 形式も可)>"
    },
    "datePublished": "<公開日時>",
    "dateModified": "<最終更新日時>",
    "author": ["<著者名>"],
    "editor": ["<編集者名>"],
    "genre": "<ジャンル>"
  },
  "allowedUrl": ["<CAの使用を許可するWebページのURL Pattern>"],
  "target": [
    {
      "type": "<Content Integrity Descriptorの種別>",
      "cssSelector": "<CSS セレクター>"
    }
  ]
}
```

具体例:

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
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "type": "Article",
    "headline": "<Webページのタイトル>",
    "description": "<Webページの説明>",
    "image": {
      "id": "https://example.com/image.webp",
      "content": "file:///path/to/image.webp"
    },
    "author": ["山田花子"],
    "editor": ["山田太郎"],
    "datePublished": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z",
    "genre": "Arts & Entertainment"
  },
  "allowedUrl": ["https://media.example.com/articles/2024-06-30"],
  "target": [
    {
      "type": "VisibleTextTargetIntegrity",
      "cssSelector": "<CSS セレクター>"
    },
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-+M3dMZXeSIwAP8BsIAwxn5ofFWUtaoSoDfB+/J8uXMo="
    }
  ]
}
```

プロパティの詳細は [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/) と [Content Attestation of Article Type](https://docs.originator-profile.org/opb/ca-model/article/) をご確認ください。

### 別の方法: [jwt.io](https://jwt.io) を使用する方法

指定された JSON フォーマットを使用し、JWT を作成します。

[JSON Web Token（JWT）デバッガー](https://jwt.io) にアクセスして、「JWT エンコーダー」を選択します。
その後、画面左側の「ヘッダー」、「ペイロード」、「JWT に署名」それぞれに値を入力してください。

具体例:
JSON Web Token（JWT）デバッガー の画面の「ヘッダー」に以下を入力します。

```json
{
  "alg": "ES256",
  "kid": "jJYs5_ILgUc8180L-pBPxBpgA3QC7eZu9wKOkh9mYPU",
  "typ": "vc+jwt",
  "cty": "vc"
}
```

ヘッダー の `kid` は JWK Thumbprint です。プライベート鍵の `kid` プロパティと同じ値に変更します。

JSON Web Token（JWT） の画面の「ペイロード」に以下を入力します。

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
  "type": ["VerifiableCredential", "ContentAttestation"],
  "iss": "dns:media.example.com",
  "sub": "urn:uuid:41632705-9600-49df-b80d-a357d474f37e",
  "iat": 1687827458,
  "exp": 1719449858,
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "id": "urn:uuid:41632705-9600-49df-b80d-a357d474f37e",
    "type": "Article",
    "headline": "<Webページのタイトル>",
    "image": {
      "id": "https://example.com/image.webp",
      "digestSRI": "sha256-WNn1owxcJX6uwrNFOhPX+npz4j46s3a1cExjX5wWVxw="
    },
    "description": "<Webページの説明>",
    "author": ["山田花子"],
    "editor": ["山田太郎"],
    "datePublished": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z",
    "genre": "Arts & Entertainment"
  },
  "allowedUrl": ["https://media.example.com/articles/2024-06-30"],
  "target": [
    {
      "type": "VisibleTextTargetIntegrity",
      "cssSelector": "<CSS セレクター>",
      "integrity": "sha256-GYC9PqfIw0qWahU6OlReQfuurCI5VLJplslVdF7M95U="
    },
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-+M3dMZXeSIwAP8BsIAwxn5ofFWUtaoSoDfB+/J8uXMo="
    }
  ]
}
```

ペイロード の `iss` と `issuer` の値を自分の OP ID に書き換えます。

具体例:

```
dns:media.example.com
```

UUID を生成し、ペイロードの `sub` と `credentialSubject.id` の値を、生成した UUID の `urn:uuid:` を前に付けた文字列に書き換えます。

具体例:

```
$ uuidgen
41632705-9600-49df-b80d-a357d474f37e
: この場合 "urn:uuid:41632705-9600-49df-b80d-a357d474f37e" となります
```

プロパティの詳細は [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/) と [Content Attestation of Article Type](https://docs.originator-profile.org/opb/ca-model/article/) をご確認ください。

JSON Web Token（JWT） の画面の「JWT に署名」にて「秘密鍵の形式」を「JWK」にし、アカウントのプライベート鍵を貼り付けます。

プライベート鍵を貼り付けると、画面の右側には JWT が表示されます。このとき得られる "eyJ" から始まる文字列が CA です。

## ステップ2. Content Attestation Set の作成 {#step2}

Content Attestation Set は、ページ中の Content Attestation のリストを含む形で作成します。

具体例:

```json
["eyJ..."]
```

_「[Content Attestation Set](https://docs.originator-profile.org/opb/content-attestation-set/)」より_

Content Attestation Set は Content Attestation の配列です。

## ステップ3. Content Attestation Set の追加 {#step3}

ページ HTML に Content Attestation Set を追加します。以下の script タグを使用します：

具体例:

```html
<script type="application/cas+json">
  ["eyJ..."]
</script>
```

詳細は [Linking Content Attestation Set and Originator Profile Set to A HTML Document](https://docs.originator-profile.org/opb/link-to-html/) を参照してください。

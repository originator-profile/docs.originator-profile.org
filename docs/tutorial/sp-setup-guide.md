---
sidebar_position: 1
---

# Site Profile の設置

## 目的

サイト全体を OP に対応させます。

## 方法

OP 登録した originators を使用して、Website Profile の発行、Site Profile の作成、設置をします。

:::note[OP 登録できない場合]

OP 登録できない場合は、テスト環境である Content Attestation Server Playground を使用して Site Profile の発行ができます。  
詳しくは [Content Attestation Server Playground の Site Profile 発行セクション](/playground/#issue-site-profile)をご確認ください。

Content Attestation Server Playground を使用して発行したものは本番環境では使用できません。詳細は [Content Attestation Server Playground](/playground/) をご確認ください。

:::

## 手順

サイト全体を OP に対応させるためには、以下の手順を実行します。

1. [Website Profile の作成](#step1)
2. [`/.well-known/sp.json` の作成と配置](#step2)

## ステップ1. Website Profile の作成 {#step1}

Website Profile の作成には以下のいずれかの方法をとることができます。

- CA Server を使用する方法: [`/wsp`](https://playground.originator-profile.org/#tag/wsp) エンドポイントを使用
- OPVC CLI を使用する方法：[`opvc wsp:sign`](https://github.com/originator-profile/originator-profile/tree/main/packages/opvc) コマンドを使用
- [jwt.io](https://jwt.io) を使用する方法：指定された JSON フォーマットを使用

※ Website Profile の作成を省き、Site Profile の作成（Site Profile 作成の中で Website Profile の作成を行います。）をすることも可能です。  
詳しくは [CA Server を使用して Site Profile を作成する方法](#site-profile-ca-server)を参照してください。

### CA Server を使用する方法 {#ca-server}

:::note

このセクション「CA Server を使用する方法」では、Content Attestation Server Playground を前提として説明しています。
Playground と本番環境の CA Server は API 仕様が共通ですが、認証手順が異なります。

本番環境の CA Server を利用する場合は、認証手順が異なるため、ご利用のサーバーが提供するマニュアルに従って設定してください。

:::

[`/wsp`](https://playground.originator-profile.org/#tag/wsp) エンドポイントに POST リクエストを送信します。

必要なパラメータをリクエストのボディに付与して POST メソッドを送ることで登録できます。

このエンドポイントは更新にも使用します。 既に Website Profile (WSP) が登録されている場合、既存の WSP を更新します。

詳しくは [Content Attestation Server Playground の API ドキュメント](https://playground.originator-profile.org/#tag/wsp/POST/wsp) を参照してください。

具体例:

```
$ curl -X POST https://playground.originator-profile.org/wsp \
    -H content-type:application/json \
    -u Basic認証ユーザー名:Basic認証パスワード \
    -d '[{...}]'
```

実行後、コンソールに表示される “eyJ” から始まる文字列が WSP です。

指定するファイルは以下の形式です。

website-profile.example.json

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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "<OP ID>",
  "credentialSubject": {
    "id": "<WebサイトのURL(形式: https://<ホスト名>/)>",
    "allowedOrigin": ["<Webサイトのオリジン (形式: https://<ホスト名>)>"],
    "type": "WebSite",
    "name": "<Webサイトのタイトル>",
    "description": "<Webサイトの説明>",
    "image": {
      "id": "<サムネイル画像URL>",
      "content": "<コンテンツ (data:// URL)>"
    }
  },
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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "id": "https://media.example.com/",
    "allowedOrigin": ["https://media.example.com"],
    "type": "WebSite",
    "name": "Originator Profile 検証サイト",
    "description": "Originator Profile 検証サイトです。",
    "image": {
      "id": "https://example.com/image.svg",
      "content": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="
    }
  }
}
```

プロパティの詳細は次の文書をご確認ください。

- [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/)
- [Website Profile (WSP)](https://docs.originator-profile.org/opb/website-profile/)
- [`/wsp`](https://playground.originator-profile.org/#tag/wsp)

### 別の方法: CLI を使用する方法

`opvc wsp:sign` コマンドを使用して作成します。  
詳細は [OPVC CLI のドキュメント](/opvc-cli/#publish-website-profile) を参照してください。

具体例:

```
$ opvc wsp:sign -i ./account-key.example.priv.json --input ./website-profile.example.json
eyJ...
```

実行後、コンソールに表示される “eyJ” から始まる文字列が WSP です。

CLI のインストール方法は [OPVC CLI インストール方法](/opvc-cli/#install) をご確認ください。

-i オプションにはプライベート鍵を指定します。

--input オプションには WSP に関する情報を JSON で記述し、指定します。

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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "<OP ID>",
  "credentialSubject": {
    "id": "<WebサイトのURL (形式: https://<ホスト名>/)>",
    "allowedOrigin": ["<Webサイトのオリジン (形式: https://<ホスト名>)>"],
    "type": "WebSite",
    "name": "<Webサイトの名称>",
    "description": "<Webサイトの説明>",
    "image": {
      "id": "<サムネイル画像URL>",
      "content": "<コンテンツ (file:// 形式も可)>"
    }
  }
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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "id": "https://media.example.com/",
    "allowedOrigin": ["https://media.example.com"],
    "type": "WebSite",
    "name": "<Webサイトのタイトル>",
    "description": "<Webサイトの説明>",
    "image": {
      "id": "https://example.com/image.webp",
      "content": "file://path/to/image.webp"
    }
  }
}
```

プロパティの詳細は [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/) と [Website Profile (WSP)](https://docs.originator-profile.org/opb/website-profile/) をご確認ください。

### 別の方法: [jwt.io](https://www.jwt.io/) を使用する方法

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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "iss": "dns:media.example.com",
  "sub": "https://media.example.com",
  "iat": 1687827458,
  "exp": 1719449858,
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "id": "https://media.example.com/",
    "allowedOrigin": ["https://media.example.com"],
    "type": "WebSite",
    "name": "<Webサイトのタイトル>",
    "description": "<Webサイトの説明>",
    "image": {
      "id": "https://example.com/image.webp",
      "digestSRI": "sha256-6o+sfGX7WJsNU1YPUlH3T56bJDR43Laz6nm142RJyNk="
    }
  }
}
```

ペイロードの `iss` と `issuer` の値を自分の OP ID に書き換えます。

具体例:

```
dns:media.example.com
```

プロパティの詳細は [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/) と [Website Profile (WSP)](https://docs.originator-profile.org/opb/website-profile/) をご確認ください。

JSON Web Token（JWT） の画面の「JWT に署名」にて「秘密鍵の形式」を「JWK」にし、アカウントのプライベート鍵を貼り付けます。

プライベート鍵を貼り付けると、画面の右側には JWT が表示されます。このとき得られる "eyJ" から始まる文字列が WSP です。

## ステップ2. `/.well-known/sp.json` の作成と配置 {#step2}

### Site Profile の作成

Site Profile の作成には以下のいずれかの方法をとることができます。

- ステップ 1 にて発行した Website Profile を使用する方法
- CA Server を使用する方法: [`/sp`](https://playground.originator-profile.org/#tag/sp) エンドポイントを使用

#### ステップ 1 にて発行した Website Profile を使用する方法

Website Profile を含む形式で Site Profile (sp.json) を作成します。

形式:

```json
{
  "originators": [...<OP-CIPから受け取ったOPS>],
  "sites": ["<WSP>"]
}
```

具体例:

```json
{
  "originators": [
    {
      "core": "eyJ...",
      "annotations": ["eyJ...", "eyJ..."],
      "media": ["eyJ..."]
    },
    {
      "core": "eyJ...",
      "annotations": ["eyJ..."],
      "media": ["eyJ..."]
    }
  ],
  "sites": ["eyJ..."]
}
```

_[Site Profile](https://docs.originator-profile.org/opb/site-profile/) より_

`originators` プロパティにはサイト運営者自身の OP 以外にもサイト上で配信する記事の CA <ruby>発行者<rt>issuer</rt></ruby>の OP を含めることが可能です。

#### CA Server を使用する方法 {#site-profile-ca-server}

:::note

このセクション「CA Server を使用する方法」では、Content Attestation Server Playground を前提として説明しています。
Playground と本番環境の CA Server は API 仕様が共通ですが、認証手順が異なります。

本番環境の CA Server を利用する場合は、認証手順が異なるため、ご利用のサーバーが提供するマニュアルに従って設定してください。

:::

[`/sp`](https://playground.originator-profile.org/#tag/sp) エンドポイントに POST リクエストを送信します。

必要なパラメータをリクエストのボディに付与して POST メソッドを送ることで登録できます。

このエンドポイントは更新にも使用します。 既に Site Profile (SP) が登録されている場合、既存の SP を更新します。

詳しくは [Content Attestation Server Playground の API ドキュメント](https://playground.originator-profile.org/#tag/sp/POST/sp) を参照してください。

具体例:

```
$ curl -X POST https://playground.originator-profile.org/sp \
    -H content-type:application/json \
    -u Basic認証ユーザー名:Basic認証パスワード \
    -d '{...}'
```

実行後、コンソールに表示される "{" から "}" までの文字列が SP です。

指定するファイルは以下の形式です。

site-profile.example.json

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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "<OP ID>",
  "credentialSubject": {
    "id": "<WebサイトのURL(形式: https://<ホスト名>/)>",
    "allowedOrigin": ["<Webサイトのオリジン (形式: https://<ホスト名>)>"],
    "type": "WebSite",
    "name": "<Webサイトのタイトル>",
    "description": "<Webサイトの説明>",
    "image": {
      "id": "<サムネイル画像URL>",
      "content": "<コンテンツ (data:// URL)>"
    }
  },
  "issuedAt": "<発行日時 (optional)>",
  "expiredAt": "<期限切れ日時 (optional)>",
  "originators": [
    {
      "core": "<Core Profile>",
      "media": ["<Web Media Profile (optional)>"],
      "annotations": ["<Profile Annotation (optional)>"]
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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "id": "https://media.example.com/",
    "allowedOrigin": ["https://media.example.com"],
    "type": "WebSite",
    "name": "Originator Profile 検証サイト",
    "description": "Originator Profile 検証サイトです。",
    "image": {
      "id": "https://example.com/image.svg",
      "content": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="
    }
  },
  "originators": [
    {
      "core": "eyJ...",
      "media": ["eyJ..."],
      "annotations": ["eyJ..."]
    }
  ]
}
```

`originators` プロパティにはサイト運営者自身の OP 以外にもサイト上で配信する記事の CA <ruby>発行者<rt>issuer</rt></ruby>の OP を含めることが可能です。

プロパティの詳細は次の文書をご確認ください。

- [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/)
- [Website Profile (WSP)](https://docs.originator-profile.org/opb/website-profile/)
- [Site Profile (SP)](https://docs.originator-profile.org/opb/site-profile/)
- [`/sp`](https://playground.originator-profile.org/#tag/sp)

### Site Profile (sp.json) の配置

sp.json は Web サイトの Well-known URL `/.well-known/sp.json` にアクセスできるように配置します。

具体例:

```
$ curl -i https://media.example.com/.well-known/sp.json
HTTP/2 200
content-type: application/json

{
  "originators": [
    { "core": "eyJ...", "annotations": ["eyJ..."], "media": ["eyJ..."] }
  ],
  "sites": ["eyJ..."]
}
```

---
sidebar_position: 350
---

# OPVC CLI

:::note
このページは翻訳中です。
:::

OPVC CLI は、Originator Profile (OP) 仕様に準拠した Verifiable Credential (VC) を作成・管理するためのツールです。  
Core Profile (CP)、Profile Annotation (PA)、Web Media Profile (WMP)、Website Profile (WSP)、Content Attestation (CA) などの OP に関連する VC をコマンドラインから発行できます。  
このドキュメントでは、OPVC CLI を使用し、実際に CP や PA などの VC を発行することで、Originator Profile の理解を深めることができます。

## 始め方

### インストール

OPVC CLI は、以下のいずれかの方法でインストールできます。
お好きな方法を選択してください。

#### ソースからインストールする方法

```sh
git clone https://github.com/originator-profile/originator-profile.git
cd originator-profile/packages/opvc
pnpm install
npm i -g .
```

#### `npx` もしくは `npm` を使用してインストールする方法

```sh
# npx
npx -y @originator-profile/opvc

# npm
npm i -g @originator-profile/opvc
```

### 動作確認

インストールが完了したら、CLI が正しく動作しているか確認してください。

```sh
opvc help
```

## 事前準備

### 鍵の生成

各 VC を発行するにはプライベート鍵が必要になります。
以下のコマンドによって鍵を生成します。

```sh
opvc key-gen -o <鍵を保存するファイル名>
```

:::note
鍵を保存するファイル名は拡張子を除いて指定してください。  
`<output>.priv.json`（プライベート鍵） と `<output>.pub.json`（パブリック鍵）が生成されます。
:::

生成した鍵のファイルおよびこれから必要になるインプットファイルの配置場所については自由です。コマンド実行時に `--input` や `-i` で正しいパスを指定できれば問題ありません。

## Core Profile (CP) の発行方法

このセクションでは Core Profile を発行します。Core Profile について詳細に知りたい場合は、[Core Profile](./opb/cp.md) を確認してください。  
Core Profile は Originator を識別・検証するための基礎となるものです。

### インプットファイルの作成

Core Profile の発行に必要なインプットファイル（JSON ファイル）を作成します。  
各プロパティについて必須となるものやそれぞれの意味については、[Core Profile のプロパティ](./opb/cp.md#properties)を確認してください。

例: cp.json

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

### Core Profile の発行

以下のコマンドを実行することで署名済みの Core Profile を発行します。
署名済みの VC が標準出力に表示されます。

```sh
opvc sign -i <作成したプライベート鍵のファイルパス> --input <作成した JSON ファイルのパス>
```

出力例:

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9...
```

## Profile Annotation (PA) の発行方法

このセクションでは、Profile Annotation を発行します。Profile Annotation について詳細に知りたい場合は、[Profile Annotation](./opb/pa.md) を確認してください。  
Profile Annotation は、検証済み属性を Core Profile に結び付ける署名付き情報です。

### インプットファイルの作成

Profile Annotation の発行に必要なインプットファイル（JSON ファイル）を作成します。  
各プロパティについて必須となるものやそれぞれの意味については、[Profile Annotation のプロパティ](./opb/pa.md#properties)を確認してください。

例: annotation.json

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
    "type": "<PA タイプ>",
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

### Profile Annotation の発行

以下のコマンドを実行することで署名済みの Profile Annotation を発行します。
署名済みの VC が標準出力に表示されます。

```sh
opvc sign -i <作成したプライベート鍵のファイルパス> --input <作成した JSON ファイルのパス>
```

出力例:

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9...
```

## Web Media Profile (WMP) の発行方法

このセクションでは、 Web Media Profile を発行します。Web Media Profile について詳細に知りたい場合は、[Web Media Profile](./opb/web-media-profile.md) を確認してください。  
Web Media Profile は、Web メディアの実態や信頼性を示す署名付き情報です。

### インプットファイルの作成

Web Media Profile の発行に必要なインプットファイル（JSON ファイル）を作成します。  
各プロパティについて必須となるものやそれぞれの意味については、[Web Media Profile のプロパティ](./opb/web-media-profile.md#properties)を確認してください。

例: media.json

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
    "publishingPrinciple": {
      "id": "https://wmp-holder.example.jp/editorial-guidelines",
      "name": "編集ガイドライン"
    },
    "privacyPolicy": {
      "id": "https://wmp-holder.example.jp/privacy",
      "name": "プライバシーポリシー"
    },
    "description": [
      {
        "text": "この文章はこの Web メディアに関する補足情報です。",
        "encodingFormat": "text/plain"
      },
      {
        "text": "<p>この文章はこの Web メディアに関する補足情報です。</p>",
        "encodingFormat": "text/html"
      }
    ]
  }
}
```

### Web Media Profile の発行

以下のコマンドを実行することで署名済みの Web Media Profile を発行します。
署名済みの VC が標準出力に表示されます。

```sh
opvc sign -i <作成したプライベート鍵のファイルパス> --input <作成した JSON ファイルのパス>
```

出力例:

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9...
```

## Website Profile (WSP) の発行方法

このセクションでは、Website Profile を発行します。Website Profile について詳細に知りたい場合は、[Website Profile](./opb/website-profile.md) を確認してください。  
Website Profile は、Web サイトの正当性を示す署名付き情報です。

### インプットファイルの作成

Website Profile の発行に必要なインプットファイル（JSON ファイル）を作成します。  
各プロパティについて必須となるものやそれぞれの意味については、[Website Profile のプロパティ](./opb/website-profile.md#properties)を確認してください。

例: site.json

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

### Website Profile の発行

以下のコマンドを実行することで署名済みの Website Profile を発行します。
署名済みの VC が標準出力に表示されます。

```sh
opvc wsp:sign -i <作成したプライベート鍵のファイルパス> --input <作成した JSON ファイルのパス>
```

出力例:

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9...
```

## Content Attestation (CA) の発行方法

このセクションでは Content Attestation を発行します。Content Attestation について詳細に知りたい場合は、[Content Attestation](./opb/ca.md) を確認してください。  
Content Attestation は、コンテンツが正当に Originator によって作られたことを示す署名付き情報です。

### インプットファイルの作成

Content Attestation の発行に必要なインプットファイル（JSON ファイル）を作成します。  
各プロパティについて必須となるものやそれぞれの意味については、[Content Attestation のプロパティ](./opb/ca.md#properties)を確認してください。

例: ca.json

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "ja" }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "dns:example.com",
  "credentialSubject": {
    "id": "urn:uuid:78550fa7-f846-4e0f-ad5c-8d34461cb95b",
    "type": "Article",
    "headline": "<記事のタイトル>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
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

### Content Attestation の発行

以下のコマンドを実行することで Content Attestation を発行します。
署名済みの VC が標準出力に表示されます。

```sh
opvc ca:sign -i <作成したプライベート鍵のファイルパス> --input <作成した JSON ファイルのパス>
```

出力例:

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9...
```

## コマンド一覧

以下は OPVC CLI のコマンド一覧になります。  
各コマンドの詳細なオプションは [README](https://github.com/originator-profile/originator-profile/blob/main/packages/opvc) を確認してください。

- opvc ca:sign
- opvc ca:unsigned
- opvc help [COMMAND]
- opvc key-gen
- opvc sign
- opvc wsp:sign
- opvc wsp:unsigned

## 参考情報

- [opvc - Originator Profile Verifiable Credential command line tool](https://github.com/originator-profile/originator-profile/blob/main/packages/opvc)

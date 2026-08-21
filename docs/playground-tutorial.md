---
sidebar_position: 120
---

# Playground 環境で OP 対応を体験するチュートリアル

## 概要

このチュートリアルでは、[Content Attestation Server Playground](https://playground.originator-profile.org) を使用して、OP 対応に必要となる一連の手順を試験環境で確認します。  
Site Profile と Content Attestation の発行・設置・検証までの流れを段階的に把握することを目的としています。

本チュートリアルでは、以下の内容を試験環境で確認できます。

- Site Profile（SP）の発行と設置
- Content Attestation（CA）の発行と設置

:::note

本チュートリアルは本番登録不要の「試験的な OP 対応」です。

:::

## Step 1: Site Profile を Playground で発行する

- [Content Attestation Server Playground の SP 発行 API](https://playground.originator-profile.org/#tag/sp/POST/sp) を開きます。
- 画面右側の Test Request を使用します。
- Request Body の `allowedOrigin` に OP 対応しようとしているサイトのオリジンを含めてください。
  - 例: `http://localohost:8080`
  - 各プロパティについては [Site Profile](/opb/site-profile/) や [Website Profile](/opb/website-profile/) を参照してください。
- Send を押してください。
  - 認証を求められた場合は、[Content Attestation Server Playground](https://playground.originator-profile.org) にある認証情報を使用してください。
- 200 OK とともに、Site Profile が返ってくることを確認してください。

## Step 2: Site Profile をサイトに設置する

- 返ってきた JSON を sp.json として、 Web サイトの Well-known URL `/.well-known/sp.json` にアクセスできるように配置します。

具体例:

```shell
$ curl -i http://localhost:8080/.well-known/sp.json
HTTP/2 200
content-type: application/json

{
  "originators": [
    { "core": "eyJ...", "annotations": ["eyJ..."], "media": ["eyJ..."] }
  ],
  "sites": ["eyJ..."]
}
```

:::note

この時点で テストビルド版 OP Inspector で Site Profile の確認が可能になります。

:::

また Step 1、Step 2 に関しては [Site Profile の設置ドキュメント](/tutorial/sp-setup-guide#site-profile-ca-server) も参考にしてください。

## Step 3: Content Attestation を Playground で発行する

- [Content Attestation Server Playground の CA 発行 API](https://playground.originator-profile.org/#tag/ca/POST/ca) を開きます。
- 画面右側の Test Request を使用します。
- Request Body の `allowedUrl` に CA を設置する URL を含めてください。
  - 例: `http://localhost:8080/*`
- Request Body の `target` に コンテンツに合わせた [Content Integrity Descriptor](/opb/content-integrity-descriptor/) を設定してください。
  - 例:
    ```json
    {
      "type": "TextTargetIntegrity",
      "cssSelector": "#text-target-integrity",
      "integrity": "sha256-TL6t/lWLByyNME0lFhb6JrT3RaTF+f2md84n5YTQtx4="
    }
    ```
- その他、`credentialSubject` の値をコンテンツに合わせて変更しても構いません。
  - 各プロパティについては [Content Attestation](/opb/ca/) を参照してください。
- Send を押してください。
  - 認証を求められた場合は、[Content Attestation Server Playground](https://playground.originator-profile.org) にある認証情報を使用してください。
- 200 OK とともに、Content Attestation が返ってくることを確認してください。

## Step 4: Content Attestation を設置する

- 返ってきた JSON をページ HTML に Content Attestation Set として追加します。
- 以下の script タグを使用します。

具体例:

```html
<script type="application/cas+json">
  ["eyJ..."]
</script>
```

また Step 3、Step 4 に関しては [Content Attestation の設置ドキュメント](/tutorial/cas-setup-guide#ca-server) も参考にしてください。

## Step 5: テストビルド版 OP Inspector で確認する

- テストビルド版 OP Inspector をインストールする。
  - テストビルド版 OP Inspector のインストールについては、[Content Attestation Server Playground のガイド](/playground/#verification-method)を参照してください。
  - OP Inspector の使い方は [OP Inspector のガイド](/inspector/)を参照してください。
- OP Inspector ガイドに従い、検証に成功していることを確認してください。

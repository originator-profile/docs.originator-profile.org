---
sidebar_position: 340
---

# Content Attestation Server Playground

[Content Attestation Server Playground](https://playground.originator-profile.org/) は、Content Attestation の発行から OP Inspector での検証までのワークフローをテストできる環境です。

:::warning
Playground はテスト専用の環境です。Playground で発行した Content Attestation や Site Profile は本番環境では使用できません。
:::

:::note
Playground での発行の他に CP、PA、WMP 等の発行を試せるコマンドラインツールである OPVC CLI を提供しています。  
[OPVC CLI](./opvc-cli.md) を参照してください。
:::

## Playground の使い方

### 画面の説明

![](assets/playground.excalidraw.svg)

画面は「左」「中央」「右」の3つのペイン (列) で構成されています。

- **左ペイン: ナビゲーション (Sidebar)**:
  APIエンドポイントの目次です。目的のエンドポイントを検索・選択できます。
- **中央ペイン: ドキュメント (Documentation)**:
  左ペインで選択されたAPIの詳細な仕様が表示されます。エンドポイントのURL、機能の概要文、必須および任意のパラメータ (Query、Path、Headers)、リクエストボディのデータ構造 (Schema) が記載されています。
- **右ペイン: APIクライアント (API Client)**:
  ドキュメント上で直接APIリクエストを実行できるテスト環境です。各種プログラミング言語 (Node.js、Pythonなど) やコマンドラインツール (cURL) に対応した実装用のコードスニペットが自動生成され、コピーして開発に活用できます。

APIの動作確認を行う方法は以下の通りです。

1. **APIの選択**:
   画面上部の検索バーを利用するか、左ペインのナビゲーションから、確認したいAPIエンドポイントを選択します。
2. **パラメーターの入力**:
   中央ペインで仕様を確認しながら、右ペイン (または中央ペイン下部) の「Test Request」ボタンをクリックし、必要なパラメーターを入力できます。リクエストボディに必要なJSON形式でデータを入力することが可能です。
3. **リクエストの送信**:
   「Send」ボタンをクリックし、対象のサーバーへAPIリクエストを送信します。
4. **レスポンスの確認**:
   リクエスト送信後、画面上にレスポンスのステータスコード (例: `200 OK`) や、サーバーから返却されたデータ (JSON形式など) が表示されます。想定通りの結果が得られているかを確認できます。

### Site Profile の発行

Playground の [`/sp`](https://playground.originator-profile.org/#tag/sp) エンドポイントに POST リクエストを送信します。

```sh
curl -X POST https://playground.originator-profile.org/sp \
  -H content-Type:application/json \
  -u Basic認証ユーザー名:Basic認証パスワード \
  -d '{ ... }'
```

リクエストボディの各プロパティの詳細は [Website Profile (WSP) データモデル](/opb/website-profile/) および [Site Profile (SP)](/opb/site-profile/) をご確認ください。

### 検証方法

OP Inspector をインストールした状態で、Site Profile を配置したウェブサイトにアクセスすることで検証を行えます。
検証するにはテストビルド版の OP Inspector が必要です。

:::warning
テストビルド版の OP Inspector は Playground 環境専用です。本番環境の Content Attestation を検証できません。また、Playground で発行した Content Attestation や Site Profile は通常ビルド版の OP Inspector で検証できません。
:::

[GitHub Releases (canary)](https://github.com/originator-profile/originator-profile/releases/tag/canary) から OP Inspector (テストビルド) をダウンロードし、インストールできます。

| ブラウザ | ファイル名                                                            |
| -------- | --------------------------------------------------------------------- |
| Chrome   | [`_testing_op_inspector-chromium-canary.zip`][chrome]                 |
| Firefox  | [`_testing_op_inspector-firefox-desktop-canary.zip`][firefox-desktop] |

[chrome]: https://github.com/originator-profile/originator-profile/releases/download/canary/_testing_op_inspector-chromium-canary.zip
[firefox-desktop]: https://github.com/originator-profile/originator-profile/releases/download/canary/_testing_op_inspector-firefox-desktop-canary.zip

### Playground でのエラーコード

Playground を使用している際に発生する可能性のあるエラーコードと、その意味・発生原因についてまとめます。

| エラーコード | エラー       | 原因                                |
| ------------ | ------------ | ----------------------------------- |
| 400          | Bad Request  | JSON スキーマのバリデーションエラー |
| 401          | Unauthorized | 認証情報が不正な場合のエラー        |
| 403          | Forbidden    | issuer と OP Account ID の不一致    |
| 404          | Not Found    | 未定義のエンドポイントへのアクセス  |

#### 400 Bad Request

- メッセージ: "One or more validations failed trying to process your request."
- 原因: 入力 JSON が期待されるスキーマ（必須項目・型・フォーマット）を満たしていない
- 対策: 必須項目の不足、型不一致、フォーマット不正がないか、入力の内容を確認する

#### 401 Unauthorized

- メッセージ: "Invalid password"
- 原因: ユーザー名またはパスワードなどの認証情報が正しくない
- 対策: ユーザー名およびパスワードが正しいか確認する

#### 403 Forbidden

- メッセージ:
  - "OP Account ID does not match the issuer of the Website Profile."
  - "OP Account ID does not match the issuer of the Content Attestation."
- 原因: 入力 JSON の issuer と、発行に使用している OP Account ID が一致していない
- 対策: 入力 JSON の issuer と、使用している OP Account ID が一致しているか確認する

#### 404 Not Found

- メッセージ: "404 Not Found"
- 原因: 用意されていない操作・エンドポイントにアクセスした場合に発生する
- 対策: 対象の URL やエンドポイント、HTTP メソッドが正しいか確認する

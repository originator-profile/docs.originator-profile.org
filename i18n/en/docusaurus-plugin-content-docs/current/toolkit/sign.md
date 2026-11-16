---
sidebar_position: 2
---

# Sign

:::note

このページは翻訳中です。

:::

[Sign](https://playground.originator-profile.org/app/sign) は、Originator Profile における [Content Attestation (CA)](/opb/ca/) および [Site Profile (SP)](/opb/site-profile) を発行できるツールです。

## Sign の使い方

### 画面の説明

![](../assets/sign.png)

Sign の画面は、以下のレイアウトと操作性になっています。

- 画面の左側が入力フォーム、右側が出力結果です。
- 入力が空でなく、バリデーションを通過すると「Sign」ボタンを押下することができます。
- 「Sign」ボタンを押下した際、Basic 認証を求められた場合は [Playground](https://playground.originator-profile.org/) の認証情報を入力してください。

:::note
現在、入力フォームは JSON 形式のみに対応しています。
:::

### Content Attestation タブ

Content Attestation タブでは、入力フォームに JSON を入力して CA を発行することができます。入力する JSON についての詳細は [Content Attestation (CA) データモデル](/opb/ca/#properties)をご確認ください。  
用途に合わせて以下の2つのモードを提供しています。

#### Playground モード:

Playground 環境を使用して、CA の発行をテストできます。  
「CA Server Settings」のチェックボックスが無効（初期状態）のときは、このモードになります。

:::note

Playground モードで発行した CA は本番環境では使用できません。詳しくは [Playground のガイド](../playground.md)を参照してください。

:::

#### CA Server モード:

本番環境の CA Server を使って CA を発行します。  
「CA Server Settings」のチェックボックスを有効にし、次の項目をすべて入力してください。入力が欠けていると「Sign」ボタンは押下できません。

| 項目   | 内容                                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------- |
| issuer | CA の発行者 (Issuer)                                                                                                      |
| ccsp   | ccspConfig の値。設定内容は [CA Client](https://www.npmjs.com/package/@originator-profile/ca-client) を参照してください。 |

### Site Profile タブ

Site Profile タブでは、入力フォームに JSON を入力をして SP を発行することができます。入力する JSON についての詳細は [Website Profile (WSP) データモデル](/opb/website-profile/#properties)および [Site Profile (SP)](/opb/site-profile/)をご確認ください。

:::note

Playground モードで発行した SP は本番環境では使用できません。詳しくは [Playground のガイド](../playground.md)を参照してください。

:::

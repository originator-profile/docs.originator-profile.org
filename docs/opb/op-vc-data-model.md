---
sidebar_position: 11
---

# OP VC Data Model

OP の仕様ではいくつかの VC を定めています。それらの VC は [VC DM 2.0 準拠文書](https://www.w3.org/TR/vc-data-model-2.0/#dfn-conforming-document) を基にした共通のデータモデルに準拠しています。そのデータモデルをこの文書で定めます。

## VC のデータモデル {#data-model}

[VC DM 2.0 準拠文書](https://www.w3.org/TR/vc-data-model-2.0/#dfn-conforming-document)でなければなりません (MUST)。

### プロパティ {#properties}

#### `@context` {#context}

REQUIRED. URL の順序つき配列。必ず先頭が `https://www.w3.org/ns/credentials/v2`、その次が `https://originator-profile.org/ns/credentials/v1` である配列でなければなりません (MUST)。また、配列の末尾の要素で VC 内の文字列の言語を `@language` タグで示さなければなりません (MUST)。つまり、言語が日本語だとすると `{"@language": "ja"}` を配列の末尾に含めてください。

#### `type` {#type}

REQUIRED. 必ず値が `VerifiableCredential` であるか、値に `VerifiableCredential` を含む [JSON-LD 語彙](https://www.w3.org/TR/json-ld11/#terms)の配列でなければなりません (MUST)。

#### `credentialSubject` {#credential-subject}

REQUIRED. JSON-LD Node Object です。

#### `credentialSubject.type` {#credential-subject-type}

OPTIONAL. 値は [JSON-LD 語彙](https://www.w3.org/TR/json-ld11/#terms)かその配列でなければなりません (MUST)。

#### `credentialSubject.id` {#credential-subject-id}

REQUIRED. 識別子です。識別子の形式は各 VC のデータモデルを定める文書で取り扱います。

#### `issuer` {#issuer}

REQUIRED. VC 発行組織の [OP ID](./op-id.md) でなければなりません (MUST)。

## 検証プロセス {#verification}

本文書のデータモデルに準拠する VC は、次の手順で検証することができます。

1. 検証する VC を取得
   - 特定のドメインから取得するときは、[Site Profile](./site-profile.md) から取得します (RECOMMENDED)
   - 特定の Web ページから取得するときは、[HTML 文書への Content Attestation Set と Originator Profile Set の紐付け](./link-to-html.md)から取得します (RECOMMENDED)
2. 検証する VC の発行組織の検証鍵を [OP ID](./op-id.md) で取得
3. [Securing Mechanisms](https://www.w3.org/TR/vc-data-model-2.0/#securing-mechanisms) に定められたアルゴリズムで検証
4. [The `image` Datatype](./context.md#the-image-datatype) が使われているプロパティを[検証](./context.md#image-datatype-の検証)

:::info

Originator Profile 技術研究組合が開発するアプリケーションで使用される Securing Mechanisms については、[OP VC Securing Mechanism](./securing-mechanism.md) を参照してください。

:::

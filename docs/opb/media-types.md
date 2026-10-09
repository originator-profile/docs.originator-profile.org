---
sidebar_position: 35
---

# Media Types

## 概要

本文書では、OP で定める VCs とその配布形式を表すメディアタイプを定義します。

:::note

本文書で定義するメディアタイプは IANA に登録されていません。

:::

## 用語

本文書に説明のない用語については、[用語](./terminology.md)を参照してください。

- Profile Annotation (PA)
- Content Attestation (CA)
- Originator Profile Set (OPS)
- Content Attestation Set (CAS)

## メディアタイプ一覧 {#registry}

| メディアタイプ            | 内容      | 形式                                                                                                         |
| ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| `application/op-set+json` | OPS       | [OPS の JSON Serialization](./originator-profile-set.md#json-serialization)                                  |
| `application/ca-set+json` | CAS       | [CAS の JSON Serialization](./content-attestation-set.md#json-serialization)                                 |
| `application/pa+jwt`      | 1 件の PA | [Securing Mechanism](./securing-mechanism.md) で保護した JWT ([JWS Compact Serialization](#single-vc-types)) |
| `application/ca+jwt`      | 1 件の CA | [Securing Mechanism](./securing-mechanism.md) で保護した JWT ([JWS Compact Serialization](#single-vc-types)) |

## 単体の VC のメディアタイプ {#single-vc-types}

`application/pa+jwt` および `application/ca+jwt` の内容は、それぞれ 1 件の PA および CA を [Securing Mechanism](./securing-mechanism.md) にしたがって保護した JWT の [JWS Compact Serialization](https://www.rfc-editor.org/rfc/rfc7515.html#section-7.1) でなければなりません (MUST)。

JWT の `typ` ヘッダーパラメーターは、本メディアタイプによらず [Securing Mechanism](./securing-mechanism.md) の定めにしたがいます。

これらのメディアタイプは、Web ページへの紐づけには用いません。Web ページに CA を紐づけるには、CAS を [Linking](./link-to-html.md) にしたがって紐づけます。

## Set のメディアタイプの意味 {#set-types}

`application/op-set+json` および `application/ca-set+json` の内容は、検証に必要な VC をすべて含むことを要求しません。
配布者は、検証に必要な VC を複数の OPS や CAS に分けて配布することができます (MAY)。たとえば、CA 発行者の OP と PA 発行者の OP を別々の OPS として配布できます。
検証者は、[入力範囲](./verifier-processing-model/content-attestation-set.mdx#input-scope)に含まれる OPS を合わせて検証に用います。

:::note

レジストレーションチェーン全体を含み、それ単独で検証できる OPS は、オフラインでの検証などで有用な場合があります。
本文書は、そうした OPS を区別するメディアタイプを定義しません。

:::

## 非推奨のメディアタイプ {#deprecated}

次のメディアタイプは非推奨です。将来削除される予定です。

| 非推奨のメディアタイプ | 代わりに用いるメディアタイプ |
| ---------------------- | ---------------------------- |
| `application/ops+json` | `application/op-set+json`    |
| `application/cas+json` | `application/ca-set+json`    |

配布者は、非推奨のメディアタイプを用いてはなりません (MUST NOT)。
検証者は、非推奨のメディアタイプを、代わりに用いるメディアタイプと同じものとして扱うべきです (SHOULD)。

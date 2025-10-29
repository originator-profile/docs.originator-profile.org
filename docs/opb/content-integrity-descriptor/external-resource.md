---
tags:
  - Content Integrity Descriptor
  - Web Media Specific Model
---

# External Resource Integrity

## 概要

本文書で定義される External Resource Target は画像や動画などの外部リソースファイルの完全性を保証するための Content Attestation (CA) のプロパティです。 URL が参照するリソースの完全性を保証できる一方で、扱える URL はユーザーエージェントに依らず同じバイト列をレスポンスとして返却するものに限られます。

:::note

この target について実証実験の参加企業の方々からフィードバックをいただく予定です。また関連する仕様のアップデートの状況を見ながらよりよい方法を将来追加する可能性があります。

参考: 画像加工を伴う CDN 利用時の検証可能化方法の検討

:::

## 範囲

- 静的なファイルを扱います。
- JavaScript 等によって生成される動的なリソースは本文書の範囲外です。
- Adaptive Bitrate Streaming で配信される動画は扱いません。単一の動画ファイルとして配信される動画のみ扱います。
- background-image CSS プロパティや content CSS プロパティといった CSS で取得表示されるリソースは本文書の範囲外です。
- [コンテンツネゴシエーション](https://developer.mozilla.org/docs/Web/HTTP/Content_negotiation)による動的なリソースは本文書の範囲外です。

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

- Content Attestation (CA)

## External Resource Target の形式

JSON オブジェクトでなければなりません。
External Resource Target の具体例を次に示します。

```json
{
  "type": "ExternalResourceTargetIntegrity",
  "integrity": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
}
```

以下のプロパティが定義されます:

- `type`: REQUIRED. 必ず `ExternalResourceTargetIntegrity` でなければなりません (MUST)。
- `integrity`: REQUIRED. [`sriString` データ型](../context.md#the-sristring-datatype) でなければなりません (MUST)。使用可能なハッシュ関数については[ハッシュアルゴリズム](../algorithm.md#hash-algorithm)に準拠してください (MUST)。具体例: `sha256-4HLmAAYVRClrk+eCIrI1Rlf5/IKK0+wGoYjRs9vzl7U=`

## 設定方法

`integrity` プロパティと同じ値を HTML 要素の `integrity` 属性に指定します。

### 例

source 要素と img 要素を External Resource Target から参照する場合の具体例を次に示します。

External Resource Target:

```json
[
  {
    "type": "ExternalResourceTargetIntegrity",
    "integrity": "sha256-4HLmAAYVRClrk+eCIrI1Rlf5/IKK0+wGoYjRs9vzl7U="
  },
  {
    "type": "ExternalResourceTargetIntegrity",
    "integrity": "sha256-t7WZSGxDdqGvGg/FLw6wk9KFQy5StT1MquCf/htwjBo= sha256-4HLmAAYVRClrk+eCIrI1Rlf5/IKK0+wGoYjRs9vzl7U="
  }
]
```

このとき Web ページの HTML の source 要素と img 要素に次のように `integrity` 属性を付与します。

```html
<picture>
  <source
    srcset="image.jpg"
    media="(min-width: 400px)"
    integrity="sha256-4HLmAAYVRClrk+eCIrI1Rlf5/IKK0+wGoYjRs9vzl7U="
  />
  <img
    src="https://cdn.example.com/image.jpg"
    integrity="sha256-t7WZSGxDdqGvGg/FLw6wk9KFQy5StT1MquCf/htwjBo= sha256-4HLmAAYVRClrk+eCIrI1Rlf5/IKK0+wGoYjRs9vzl7U="
  />
</picture>
```

video 要素を External Resource Target から参照する場合の具体例を次に示します。

External Resource Target:

```json
[
  {
    "type": "ExternalResourceTargetIntegrity",
    "integrity": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w= sha256-zc3KMRPJkbv6p7sOq5Di/CNe+4XyqBBuiKjzP3A3NP0="
  },
  {
    "type": "ExternalResourceTargetIntegrity",
    "integrity": "sha256-zc3KMRPJkbv6p7sOq5Di/CNe+4XyqBBuiKjzP3A3NP0="
  }
]
```

このとき Web ページの HTML の source 要素と video 要素に次のように `integrity` 属性を付与します。

```html
<video
  integrity="sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w= sha256-zc3KMRPJkbv6p7sOq5Di/CNe+4XyqBBuiKjzP3A3NP0="
  poster="https://cdn.example.com/poster.jpg"
>
  <source
    src="https://cdn.example.com/video.mp4"
    integrity="sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
    type="video/mp4"
  />
  <source
    src="https://cdn.example.com/video.webm"
    integrity="sha256-zc3KMRPJkbv6p7sOq5Di/CNe+4XyqBBuiKjzP3A3NP0="
    type="video/webm"
  />
</video>
```

:::note

この場合、src 属性に指定された外部リソースが検証され、poster 属性に指定された外部リソースは検証されません。poster 属性に指定された外部リソースを検証可能にするための仕様は検討中です。

:::

a 要素を External Resource Target から参照する場合の具体例を次に示します。

External Resource Target:

```json
[
  {
    "type": "ExternalResourceTargetIntegrity",
    "integrity": "sha256-Ip3vuwzubwJnOlzeKQ0Gc+daDcMc7EOYnIqypOyn4bs="
  }
]
```

このとき Web ページの HTML の a 要素に次のように `integrity` 属性を付与します。

```html
<a
  href="https://cdn.example.com/document.pdf"
  integrity="sha256-Ip3vuwzubwJnOlzeKQ0Gc+daDcMc7EOYnIqypOyn4bs="
  type="application/pdf"
  >PDF</a
>
```

## 検証プロセス

1. `integrity` プロパティと同じ値を `integrity` HTML 属性に含む要素を検索します。
   - 要素が1つも見つからない場合、検証失敗として扱うことがあります。
2. 手順1に該当した要素に対応するリソースを取得します。
   - リソースは、要素の種類に応じた属性またはプロパティの URL に GET リクエストを送り取得します。
     - img 要素: [`HTMLImageElement.currentSrc` プロパティ](https://developer.mozilla.org/ja/docs/Web/API/HTMLImageElement/currentSrc)
     - video 要素または audio 要素: [`HTMLMediaElement.currentSrc` プロパティ](https://developer.mozilla.org/ja/docs/Web/API/HTMLMediaElement/currentSrc)
     - その他の要素: `src` 属性
   - ネットワークエラーが発生した場合、検証失敗として扱うことがあります。(例: [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) `Failed to fetch.` など)
3. その結果と integrity プロパティを [SRI セクション 3.3.5](https://www.w3.org/TR/SRI/#does-response-match-metadatalist) に規定されている方法で検証します。
   - サポートしていないハッシュアルゴリズムの場合、検証失敗として扱うことがあります。

## 要素位置特定方法

`integrity` プロパティと同じ値を `integrity` HTML 属性に対し完全一致で検索します。

:::info

次の場合には、`integrity` プロパティと `integrity` HTML 属性の値の両者が同じ値になるように注意する必要があります。

- `integrity` プロパティの値が 2 件以上の SRI ハッシュである
- `integrity` HTML 属性の値に読みやすさのために空白文字または改行文字を使用している

:::

## 参考文献

- [W3C Subresource Integrity](https://www.w3.org/TR/SRI/)
- [webappsec-subresource-integrity/signature-based-restrictions-explainer.markdown at main · w3c/webappsec-subresource-integrity](https://github.com/w3c/webappsec-subresource-integrity/blob/main/signature-based-restrictions-explainer.markdown)
- [Content Security Policy Level 3](https://w3c.github.io/webappsec-csp/)
- [Apply subresource integrity to `<img>` tags · Issue #113 · w3c/webappsec-subresource-integrity](https://github.com/w3c/webappsec-subresource-integrity/issues/113)
- [integrity for downloads · Issue #68 · w3c/webappsec-subresource-integrity](https://github.com/w3c/webappsec-subresource-integrity/issues/68)
- [SRI: Integrity enforcement on downloads · Issue #497 · w3c/webappsec](https://github.com/w3c/webappsec/issues/497)
- [\[SRI\] Support signatures/asymm key · Issue #449 · w3c/webappsec](https://github.com/w3c/webappsec/issues/449)
- [Consideration: Allow integrity-check based on signature instead of actual hash · Issue #85 · w3c/webappsec-subresource-integrity](https://github.com/w3c/webappsec-subresource-integrity/issues/85)

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
- 動画ファイルについては Adaptive Bitrate Streaming で配信される動画は扱いません。単一の動画ファイルとして配信される動画のみ扱います。
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
  "cssSelector": "#hero-image",
  "integrity": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
}
```

以下のプロパティが定義されます:

| Name          | Type     | Description                                                                                                                                                                                                                                                                            |
| ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`        | `string` | **REQUIRED.** 必ず `ExternalResourceTargetIntegrity` でなければなりません (MUST)。                                                                                                                                                                                                     |
| `integrity`   | `string` | **REQUIRED.** [`sriString` データ型](../context.md#the-sristring-datatype) でなければなりません (MUST)。使用可能なハッシュ関数については[ハッシュアルゴリズム](../algorithm.md#hash-algorithm)に準拠してください (MUST)。具体例: `sha256-4HLmAAYVRClrk+eCIrI1Rlf5/IKK0+wGoYjRs9vzl7U=` |
| `cssSelector` | `string` | **OPTIONAL.** 必ず [CSS セレクター (Selectors Level 3)](https://www.w3.org/TR/selectors-3/) でなければなりません (MUST)。このプロパティがある場合、対象となる HTML 要素の特定に `integrity` 属性ではなく CSS セレクターを使用します。具体例: `#hero-image`                             |

:::note

CA 発行者は、ページの動的な変化によらず `cssSelector` がマッチする要素が変わらないように `cssSelector` を指定してください (RECOMMENDED)。たとえば、`cssSelector` に `img` などのタグ名だけを指定するのではなく、 `#hero-image`, `img.rareClassName` のようにより詳細な CSS セレクターを指定してください。対象要素を安定的に一意に特定するような CSS セレクターがないときには、ページを更新して、対象要素に id 属性を指定するなどして特定しやすいようなページ設計をしてください (RECOMMENDED)。

:::

:::note

`cssSelector` プロパティは複数の要素にマッチすることがあります。`querySelectorAll()` メソッドは id セレクターであってもマッチしたすべての要素を返すため、[`id` 属性](https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute)の値が文書内で重複しているページでは `#hero-image` のような id セレクターでも複数の要素がマッチします。

複数の要素がマッチする場合、それらすべての要素に対応するリソースが `integrity` プロパティと一致しなければなりません (MUST)。CA 発行者は、複数の要素にマッチしうる `cssSelector` を指定する場合、それらすべての要素が `integrity` プロパティと一致するリソースを参照するようにしてください (MUST)。これにより、検証結果がマッチした要素のうちどれを選ぶかに依存しません。

:::

## 設定方法

検証対象の HTML 要素は、次のいずれかの方法で特定できるようにします。

- `cssSelector` プロパティを使用する場合: 検証対象の HTML 要素にマッチする CSS セレクターを `cssSelector` プロパティに指定します。
- `cssSelector` プロパティを使用しない場合: `integrity` プロパティと同じ値を HTML 要素の `integrity` 属性に指定します。

### 例

#### `cssSelector` プロパティで要素を特定する場合

source 要素と img 要素を `cssSelector` プロパティで参照する場合の具体例を次に示します。

External Resource Target:

```json
[
  {
    "type": "ExternalResourceTargetIntegrity",
    "cssSelector": "#hero-image-source",
    "integrity": "sha256-4HLmAAYVRClrk+eCIrI1Rlf5/IKK0+wGoYjRs9vzl7U="
  },
  {
    "type": "ExternalResourceTargetIntegrity",
    "cssSelector": "#hero-image",
    "integrity": "sha256-t7WZSGxDdqGvGg/FLw6wk9KFQy5StT1MquCf/htwjBo= sha256-4HLmAAYVRClrk+eCIrI1Rlf5/IKK0+wGoYjRs9vzl7U="
  }
]
```

このとき Web ページの HTML の source 要素と img 要素に、次のように CSS セレクターがマッチするようにします。

```html
<picture>
  <source
    id="hero-image-source"
    srcset="image.jpg"
    media="(min-width: 400px)"
  />
  <img id="hero-image" src="https://cdn.example.com/image.jpg" />
</picture>
```

video 要素を `cssSelector` プロパティで参照する場合の具体例を次に示します。

External Resource Target:

```json
[
  {
    "type": "ExternalResourceTargetIntegrity",
    "cssSelector": "#product-video",
    "integrity": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w= sha256-zc3KMRPJkbv6p7sOq5Di/CNe+4XyqBBuiKjzP3A3NP0="
  },
  {
    "type": "ExternalResourceTargetIntegrity",
    "cssSelector": "#product-video-mp4",
    "integrity": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
  },
  {
    "type": "ExternalResourceTargetIntegrity",
    "cssSelector": "#product-video-webm",
    "integrity": "sha256-zc3KMRPJkbv6p7sOq5Di/CNe+4XyqBBuiKjzP3A3NP0="
  }
]
```

このとき Web ページの HTML の video 要素と source 要素に、次のように CSS セレクターがマッチするようにします。

```html
<video id="product-video" poster="https://cdn.example.com/poster.jpg">
  <source
    id="product-video-mp4"
    src="https://cdn.example.com/video.mp4"
    type="video/mp4"
  />
  <source
    id="product-video-webm"
    src="https://cdn.example.com/video.webm"
    type="video/webm"
  />
</video>
```

同じリソースを参照する複数の要素をひとつの External Resource Target で参照する場合の具体例を次に示します。

External Resource Target:

```json
{
  "type": "ExternalResourceTargetIntegrity",
  "cssSelector": ".site-logo",
  "integrity": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
}
```

このとき Web ページの HTML の img 要素に、次のように CSS セレクターがマッチするようにします。`.site-logo` は 2 つの img 要素にマッチするため、そのどちらも `integrity` プロパティと一致しなければなりません (MUST)。

```html
<header>
  <img class="site-logo" src="https://cdn.example.com/logo.png" />
</header>
<footer>
  <img class="site-logo" src="https://cdn.example.com/logo.png" />
</footer>
```

#### `integrity` 属性で要素を特定する場合

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

### 注意事項

:::note

video 要素を参照する場合、src 属性に指定された外部リソースが検証され、poster 属性に指定された外部リソースは検証されません。poster 属性に指定された外部リソースを検証可能にするための仕様は検討中です。

:::

:::note

a 要素の `href` 属性で指定された外部リソースを検証可能にするための仕様は検討中です。現在の検証プロセスでは `src` 属性または `currentSrc` プロパティを使用したリソース取得のみが定義されています。詳しくは GitHub Issue [#127](https://github.com/originator-profile/docs.originator-profile.org/issues/127) をご確認ください。

:::

:::note[実装上の注意点]

[SRI セクション 5.3](https://www.w3.org/TR/sri/#cross-origin-data-leakage) にあるように、攻撃者が既知あるいは事前に計算したハッシュ値により、[同一オリジンポリシー](https://developer.mozilla.org/ja/docs/Web/Security/Same-origin_policy)に違反してクロスオリジンリソースの内容を推測することを防ぐために、SRI 検証結果をクロスオリジンリソースの読み込み可否に使用する場合には、事前に[CORS](https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/CORS) プロトコルを使用してクロスオリジンリソースがリクエスト元と明示的に共有されていることを確認してください。

:::

## 検証プロセス

1. External Resource Target に対応する HTML 要素を検索します。
   - `cssSelector` プロパティがある場合、`cssSelector` プロパティの CSS セレクターで指定した要素を検索します。対象の要素は、そのページの `document` のルート要素 (例えば、 HTML 文書の場合は `<html>` 要素) から、`querySelectorAll()` メソッドを使用して検索します。
     - `cssSelector` プロパティの構文エラーがある場合、検証失敗として扱うことがあります。(例: [`DOMException`](https://developer.mozilla.org/en-US/docs/Web/API/DOMException) `SyntaxError`)
   - `cssSelector` プロパティがない場合、`integrity` プロパティと同じ値を `integrity` 属性に含む要素を検索します。
   - 要素が1つも見つからない場合、検証失敗として扱うことがあります。
2. 手順1に該当したすべての要素に対応するリソースを取得します。
   - リソースは、要素の種類に応じた属性またはプロパティの URL に GET リクエストを送り取得します。
     - img 要素: [`HTMLImageElement.currentSrc` プロパティ](https://developer.mozilla.org/ja/docs/Web/API/HTMLImageElement/currentSrc)
     - video 要素または audio 要素: [`HTMLMediaElement.currentSrc` プロパティ](https://developer.mozilla.org/ja/docs/Web/API/HTMLMediaElement/currentSrc)
     - その他の要素: `src` 属性
   - ネットワークエラーが発生した場合、検証失敗として扱うことがあります。(例: [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) `Failed to fetch.` など)
3. 手順2で取得したそれぞれのリソースと `integrity` プロパティを [SRI セクション 3.3.5](https://www.w3.org/TR/SRI/#does-response-match-metadatalist) に規定されている方法で検証します。
   - 手順1に該当した要素が複数ある場合、そのすべてのリソースが `integrity` プロパティと一致しなければなりません (MUST)。1つでも一致しないリソースがある場合、検証失敗として扱わなければなりません (MUST)。
   - サポートしていないハッシュアルゴリズムの場合、検証失敗として扱うことがあります。

## 要素位置特定方法

`cssSelector` プロパティの有無に応じて次のように要素を特定します。

- `cssSelector` プロパティがある場合: `cssSelector` プロパティの CSS セレクターで指定した要素を検索します。
- `cssSelector` プロパティがない場合: `integrity` プロパティと同じ値を HTML 要素の `integrity` 属性に対し完全一致で検索します。

:::info

`cssSelector` プロパティがなく次の場合には、`integrity` プロパティと HTML 要素の `integrity` 属性値の両者が同じ値になるように注意する必要があります。

- `integrity` プロパティの値が 2 件以上の SRI ハッシュである
- HTML 要素の `integrity` 属性値に読みやすさのために空白文字または改行文字を使用している

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

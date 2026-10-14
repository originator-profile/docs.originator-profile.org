---
sidebar_position: 34
---

# Linking Content Attestation Set and Originator Profile Set to A HTML Document

## 概要

本文書では、 Content Attestation Set および Originator Profile Set を特定の Web ページに紐づける方法を定義します。Web ページの HTML に CAS や OPS またはその URL を含む HTML 要素を挿入することで紐づけます。紐づけられた VC を利用して、ユーザーエージェントは Web ページやその発信者の情報を検証してユーザーに表示することができます。

## 用語

本文書に説明のない用語については、[用語](./terminology.md)を参照してください。

- Content Attestation (CA)
- Content Attestation Set (CAS)
- Originator Profile Set (OPS)

## 方法

script 要素を使用します。埋め込みと参照のどちらの方法も使用可能です。

type 属性を使用してデータの種類が CAS または OPS であることを示さなければなりません (MUST)。 CAS の場合は `application/ca-set+json` を、 OPS の場合は `application/op-set+json` を type 属性に指定しなければなりません (MUST)。非推奨のメディアタイプの扱いは[メディアタイプ](./media-types.md#deprecated)にしたがいます。

### 埋め込み

script 要素のコンテンツに JSON オブジェクトを記述します。

#### 例

_このセクションは非規範的です。_

単一の CA を含む CAS を埋め込む例を次に示します。

```htmlembedded
<script type="application/ca-set+json">
["eyJ..."]
</script>
```

2つの CA を含む CAS を埋め込む例を次に示します。

```htmlembedded
<script type="application/ca-set+json">
["eyJ...", "eyJ..."]
</script>
```

1つの OP を含む OPS を埋め込む例を次に示します。

```htmlembedded
<script type="application/op-set+json">
[
  {
    "core": "eyJ...",
    "annotations": ["eyJ..."],
    "media": ["eyJ..."]
  }
]
</script>
```

### 外部参照

src 属性に CAS または OPS の URL を記述します。

#### 例

_このセクションは非規範的です。_

URL で CAS を参照する具体例を次に示します。

```htmlembedded
<script type="application/ca-set+json" src="https://example.com/cas.json"></script>
```

URL で OPS を参照する例を次に示します。

```htmlembedded
<script type="application/op-set+json" src="https://example.com/ops.json"></script>
```

## 複数の CAS・OPS の紐づけ {#multiple-sets}

CAS や OPS は、検証に必要な VC をすべて含む必要はありません。
配布者は、検証に必要な VC を複数の CAS や OPS に分け、それぞれを別の script 要素で紐づけることができます (MAY)。たとえば、CA 発行者の OP と PA 発行者の OP を別々の OPS として紐づけることができます。
検証者は、[入力範囲](./verifier-processing-model/content-attestation-set.mdx#input-scope)に含まれる OPS を合わせて検証に用います。

:::note

含まれる VC の検証に必要な OP をすべて含み、それ単独で検証できる OPS は、オフラインでの検証などで有用な場合があります。
そうした OPS を区別するメディアタイプは定義していません。

:::

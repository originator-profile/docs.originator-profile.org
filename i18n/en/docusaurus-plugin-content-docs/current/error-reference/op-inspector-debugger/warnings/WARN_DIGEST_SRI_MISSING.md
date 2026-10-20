---
sidebar_position: 3
original: https://github.com/originator-profile/docs.originator-profile.org/blob/8c83e24/docs/error-reference/op-inspector-debugger/warnings/WARN_DIGEST_SRI_MISSING.md
tags:
  - Error Reference
  - Base Model
slug: /error-reference/WARN_DIGEST_SRI_MISSING
---

# WARN_DIGEST_SRI_MISSING

## 警告コード: WARN_DIGEST_SRI_MISSING

[`image` データ型](../../../opb/context.md#the-image-datatype)のプロパティに `digestSRI` が設定されていない場合に通知されます。検証の失敗としては扱われませんが、2027 年以降はエラーになる予定です。

## 警告メッセージ

- "digestSRI is missing. This will become an error after 2027. See: https://docs.originator-profile.org/opb/context/#the-image-datatype"

## 警告の原因

- 次のいずれかの `image` データ型のプロパティに `digestSRI` が設定されていません。
  - Web メディアの `logo`
  - Profile Annotation の `image`
  - Site Profile の `image`
  - Content Attestation の `image`

## 例

- `image` に `id` のみが設定されている。

```json
{
  "image": {
    "id": "https://example.com/image.png"
  }
}
```

## 解決策

- `digestSRI` に画像の完全性を保証するハッシュ値を設定してください。

```json
{
  "image": {
    "id": "https://example.com/image.png",
    "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
  }
}
```

より詳しくは [`image` データ型](../../../opb/context.md#the-image-datatype)にて確認することができます。

## 関連情報

- [`image` データ型](../../../opb/context.md#the-image-datatype)
- [`WARN_DIGEST_SRI_INVALID`](./WARN_DIGEST_SRI_INVALID.md)

---
sidebar_position: 4
tags:
  - Error Reference
  - Base Model
slug: /error-reference/WARN_DIGEST_SRI_INVALID
---

# WARN_DIGEST_SRI_INVALID

## 警告コード: WARN_DIGEST_SRI_INVALID

[`image` データ型](../../opb/context.md#the-image-datatype)のプロパティの `digestSRI` による検証に失敗した場合に通知されます。検証の失敗としては扱われませんが、2027 年以降はエラーになる予定です。

## 警告メッセージ

- "digestSRI verification failed. This will become an error after 2027. See: https://docs.originator-profile.org/opb/context/#the-image-datatype"

## 警告の原因

- `id` の URL から取得した画像が、`digestSRI` のハッシュ値と一致していません。画像が差し替えられたか、`digestSRI` の値が誤っている可能性があります。
- `digestSRI` に使用可能なハッシュアルゴリズムが含まれていません。
- `id` の URL から画像を取得できませんでした。

## 例

- 画像を更新したが、`digestSRI` を更新していない。

```json
{
  "image": {
    "id": "https://example.com/image.png",
    "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
  }
}
```

## 解決策

- `id` の URL から画像を取得できることを確認してください。
- 現在配信している画像から `digestSRI` を再計算し、設定し直してください。
  `digestSRI` の検証方法は [`image` データ型の検証](../../opb/context.md#image-datatype-の検証)にて確認することができます。

## 関連情報

- [`image` データ型](../../opb/context.md#the-image-datatype)
- [`WARN_DIGEST_SRI_MISSING`](./WARN_DIGEST_SRI_MISSING.md)

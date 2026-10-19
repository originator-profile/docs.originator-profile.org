---
sidebar_position: 2
tags:
  - Error Reference
  - Content Attestation
slug: /error-reference/WARN_VISIBLE_TEXT_TARGET_INTEGRITY_DEPRECATED
---

# WARN_VISIBLE_TEXT_TARGET_INTEGRITY_DEPRECATED

## 警告コード: WARN_VISIBLE_TEXT_TARGET_INTEGRITY_DEPRECATED

Content Attestation の `target` に、非推奨の `VisibleTextTargetIntegrity` が含まれている場合に通知されます。検証の失敗としては扱われません。

## 警告メッセージ

- "[OP Warning] VisibleTextTargetIntegrity is deprecated in Content Attestation and will be removed after October 2027. innerText-based rendering is platform-dependent and incompatible across browser implementations and cannot serve as a basis for integrity verification. See: https://docs.originator-profile.org/opb/content-integrity-descriptor/visible-text/"

## 警告の原因

- Content Attestation の `target` に `type` が `VisibleTextTargetIntegrity` の [Content Integrity Descriptor](../../../opb/content-integrity-descriptor/index.mdx) が含まれています。
- `innerText` により取得されるレンダリング結果はブラウザ実装に依存し、ブラウザ間で一致しないため、完全性検証の根拠として適切ではありません。

## 例

- Content Attestation の `target` に `VisibleTextTargetIntegrity` が設定されている。

```json
{
  "target": [
    {
      "type": "VisibleTextTargetIntegrity",
      "cssSelector": "<CSS セレクター>",
      "integrity": "sha256-GtNUUolQVlwIkQU9JknWkwkhfdiVmHr/BOnLFFHC5jI="
    }
  ]
}
```

## 解決策

- `VisibleTextTargetIntegrity` の使用を避けてください。代わりに [TextTargetIntegrity](../../../opb/content-integrity-descriptor/text.md) や [ExternalResourceTargetIntegrity](../../../opb/content-integrity-descriptor/external-resource.md) の使用を検討してください。
  より詳しくは [Visible Text within DOM Integrity](../../../opb/content-integrity-descriptor/visible-text.md) にて確認することができます。

## 関連情報

- [`Visible Text within DOM Integrity`](../../../opb/content-integrity-descriptor/visible-text.md)
- [`Content Attestation`](../../../opb/ca.md)

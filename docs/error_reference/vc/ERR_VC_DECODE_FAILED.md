---
sidebar: 1
tags:
  - Troubleshooting
---

# ERR_VC_DECODE_FAILED

## エラーコード: ERR_VC_DECODE_FAILED

VC の復号に失敗している場合に発生します。

## エラーメッセージ

- "JWT VC Decoding Failure"

## エラーの原因

- JWT が無効の形式となっている可能性があります。

## 例

- JWT の文頭が欠損した形で配置。

```
{
  "core": "yJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ..."
}
```

## 解決策

- JWT VC の形式を確認してください。

## 関連情報

- [`OP VC Data Model`](../../opb/op-vc-data-model.md)
- [`OP VC Securing Mechanism`](../../opb/securing-mechanism.md)
- [`ERR_CONTENT_ATTESTATION_INVALID`](../ca/ERR_CONTENT_ATTESTATION_INVALID.md)
- [`ERR_ORIGINATOR_PROFILE_INVALID`](../op/ERR_ORIGINATOR_PROFILE_INVALID.md)
- [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](../op/ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md)
- [`ERR_SITE_PROFILE_INVALID`](../sp/ERR_SITE_PROFILE_INVALID.md)

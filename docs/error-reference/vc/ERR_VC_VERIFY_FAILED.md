---
sidebar: 2
tags:
  - Error Reference
---

# ERR_VC_VERIFY_FAILED

## エラーコード: ERR_VC_VERIFY_FAILED

VC の検証に失敗した場合に発生します。

## エラーメッセージ

- "JWT VC Verification Failure"

## エラーの原因

- JWT の検証に失敗している可能性があります。

## 例

- JWT の文末が欠損した形で配置。

```
{
  "core": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcE...RXpun0HYErCDkbzuEMkXO8edtMM_8Znlm6fzElEKWg79ShDrvRKGQNkr41cpl7ycLzFIbKk7epRTlStlq"
}
```

## 解決策

- VC の仕様を確認してください。

## 関連情報

- [`OP VC Data Model`](../../opb/op-vc-data-model.md)
- [`OP VC Securing Mechanism`](../../opb/securing-mechanism.md)
- [`ERR_CONTENT_ATTESTATION_VERIFY_FAILED`](../ca/ERR_CONTENT_ATTESTATION_VERIFY_FAILED.md)
- [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](../op/ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md)
- [`ERR_SITE_PROFILE_VERIFY_FAILED`](../sp/ERR_SITE_PROFILE_VERIFY_FAILED.md)

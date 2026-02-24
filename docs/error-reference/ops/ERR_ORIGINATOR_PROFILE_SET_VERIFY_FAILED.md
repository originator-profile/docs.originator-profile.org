---
sidebar_position: 2
tags:
  - Error Reference
slug: /error-reference/ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED
---

# ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED

## エラーコード: ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED

Originator Profile Set の検証に失敗した場合に発生します。

## エラーメッセージ

- "Originator Profile Set verify failed"

## エラーの原因

- Originator Profile Set に含まれている Core Profile、Profile Annotation、Web Media Profile の検証に失敗している場合があります。
  [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](../op/ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md) にてより詳しい原因を知ることができます。

## 例

- Core Profile の文末を一部欠損した形で設置。

```
    <script type="application/ops+json">
      [
        {
          "core": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwt...RXpun0HYErCDkbzuEMkXO8edtMM_8Znlm6fzElEKWg79ShDrvRKGQNkr41cpl7ycLzFIbKk7epRTlStlq"
          "annotations": [
            "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ...
          ],
          "media": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ..."
        }
      ]
    </script>
```

## 解決策

- 検証に失敗している Core Profile、Profile Annotation、Web Media Profile の内容をご確認ください。

## 関連情報

- [`Originator Profile Set`](../../opb/originator-profile-set.md)
- [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](../op/ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md)
- [`ERR_SITE_PROFILE_VERIFY_FAILED`](../sp/ERR_SITE_PROFILE_VERIFY_FAILED.md)

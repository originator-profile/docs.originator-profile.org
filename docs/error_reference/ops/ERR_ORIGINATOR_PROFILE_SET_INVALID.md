---
sidebar: 58
tags:
  - Trouble Shooting
---

# ERR_ORIGINATOR_PROFILE_SET_INVALID

## エラーコード：ERR_ORIGINATOR_PROFILE_SET_INVALID

Originator Profile Set が無効な形式になっている場合に発生します。

## エラーメッセージ

- "Invalid Originator Profile Set"

## エラーの原因

- Originator Profile Set の復号に失敗している可能性があります。
  [`ERR_ORIGINATOR_PROFILE_INVALID`](../op/ERR_ORIGINATOR_PROFILE_INVALID.md) にてより詳しい原因を知ることができます。

## 例

- Core Profile の文頭を一部欠損した形で設置。

```
    <script type="application/ops+json">
      [
        {
          "core": "yJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ...",
          "annotations": [
            "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ...
          ],
          "media": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ..."
        }
      ]
    </script>
```

## 解決策

- 無効な形式となっている Core Profile、Profile Annotation、Web Media Profile をご確認ください。

## 関連情報

- [`Originator Profile Set`](../../opb/originator-profile-set.md)
- [`ERR_ORIGINATOR_PROFILE_INVALID`](../op/ERR_ORIGINATOR_PROFILE_INVALID.md)
- [`ERR_SITE_PROFILE_INVALID`](../sp/ERR_SITE_PROFILE_INVALID.md)

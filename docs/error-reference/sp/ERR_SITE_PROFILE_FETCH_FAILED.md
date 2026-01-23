---
sidebar: 1
tags:
  - Error Reference
---

# ERR_SITE_PROFILE_FETCH_FAILED

## エラーコード: ERR_SITE_PROFILE_FETCH_FAILED

Site Profile の取得に失敗した場合に発生します。

## エラーメッセージ

- "Site Profile fetch failed"
- "Site Profile fetch failed: `<メッセージ>`"
- "Unknown Error"

## エラーの原因

- Site Profile の取得に失敗している可能性があります。
- Site Profile が設置されていない可能性があります。
- Site Profile の JSON parse に失敗した可能性があります。

## 例

- Site Profile の設置していない Web ページにて拡張機能を使用。
- Site Profile の JSON の形式が不正。

```
{
  "originators": [
    {
      "core": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ...",
      "annotations": [
        "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ...
      ],
      "media": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ..."
    }
  ],,
  "credential": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ..."
}
```

## 解決策

- 適切な形で Site Profile を 設置してください。
- Site Profile の形式を確認してください。
  より詳しくは [Site Profile](../../opb/site-profile.md) にて確認することができます。

## 関連情報

- [`Site Profile`](../../opb/site-profile.md)

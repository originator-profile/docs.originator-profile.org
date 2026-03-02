---
sidebar_position: 2
tags:
  - Error Reference
slug: /error-reference/ERR_SITE_PROFILE_FETCH_INVALID
---

# ERR_SITE_PROFILE_FETCH_INVALID

## エラーコード: ERR_SITE_PROFILE_FETCH_INVALID

Site Profile 取得時に Site Profile が無効な形式になっている場合に発生します。

## エラーメッセージ

- "Site Profile Must be a single Site Profile"

## エラーの原因

- Site Profile が複数設置されている可能性があります。

## 例

- Site Profile を配列の中に入れる。

```
[
  {
    "originators": [
      {
        "core": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ...",
        "annotations": [
          "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ...
        ],
        "media": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ..."
      }
    ],
    "credential": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ..."
  }
]
```

## 解決策

- [Site Profile](../../opb/site-profile.md) の仕様に沿った形で配置してください。

## 関連情報

- [`Site Profile`](../../opb/site-profile.md)

---
sidebar: 2
tags:
  - Error Reference
---

# ERR_SITE_PROFILE_FETCH_INVALID

## Error Code: ERR_SITE_PROFILE_FETCH_INVALID

This error occurs when the Site Profile is in an invalid format during retrieval.

## Error Message

- "Site Profile Must be a single Site Profile"

## Causes

- Multiple Site Profiles may have been located.

## Examples

- The Site Profile may have been located inside an array.

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

## Resolution

- Locate the [Site Profile](../../opb/site-profile.md) in accordance with the Site Profile specification.

## Related Information

- [`Site Profile`](../../opb/site-profile.md)

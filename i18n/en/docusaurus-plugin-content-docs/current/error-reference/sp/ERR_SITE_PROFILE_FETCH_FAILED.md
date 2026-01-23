---
sidebar: 1
tags:
  - Error Reference
---

# ERR_SITE_PROFILE_FETCH_FAILED

## Error Code: ERR_SITE_PROFILE_FETCH_FAILED

This error occurs when retrieval of the Site Profile fails.

## Error Message

- "Site Profile fetch failed"
- "Site Profile fetch failed: `<Message>`"
- "Unknown Error"

## Causes

- The Site Profile may have failed to be retrieved.
- The Site Profile may not be located.
- The Site Profile's JSON may have failed to parse.

## Examples

- The extension was used on web page where no Site Profile is located.
- The Site Profile's JSON is in an invalid format.
  JSON syntax error caused by a double comma.

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

## Resolution

- Locate the Site Profile in the correct format.
- Confirm the format of the Site Profile.
  Additional details can be found in [Site Profile](../../opb/site-profile.md).

## Related Information

- [`Site Profile`](../../opb/site-profile.md)

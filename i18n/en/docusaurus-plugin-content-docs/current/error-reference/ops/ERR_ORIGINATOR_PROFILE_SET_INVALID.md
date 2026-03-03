---
sidebar_position: 1
original: https://github.com/originator-profile/docs.originator-profile.org/blob/0eea912/docs/error-reference/ops/ERR_ORIGINATOR_PROFILE_SET_INVALID.md
tags:
  - Error Reference
slug: /error-reference/ERR_ORIGINATOR_PROFILE_SET_INVALID
---

# ERR_ORIGINATOR_PROFILE_SET_INVALID

## Error Code: ERR_ORIGINATOR_PROFILE_SET_INVALID

This error occurs when the Originator Profile Set is in an invalid format.

## Error Message

- "Invalid Originator Profile Set"

## Causes

- Decoding of the Originator Profile Set may have failed.
  Additional details can be found in [`ERR_ORIGINATOR_PROFILE_INVALID`](../op/ERR_ORIGINATOR_PROFILE_INVALID.md).

## Examples

- The Core Profile is placed with part of its header missing.

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

## Resolution

- Review the Core Profile, Profile Annotation, and Web Media Profile and correct any invalid formatting.

## Related Information

- [`Originator Profile Set`](../../opb/originator-profile-set.md)
- [`ERR_ORIGINATOR_PROFILE_INVALID`](../op/ERR_ORIGINATOR_PROFILE_INVALID.md)
- [`ERR_SITE_PROFILE_INVALID`](../sp/ERR_SITE_PROFILE_INVALID.md)

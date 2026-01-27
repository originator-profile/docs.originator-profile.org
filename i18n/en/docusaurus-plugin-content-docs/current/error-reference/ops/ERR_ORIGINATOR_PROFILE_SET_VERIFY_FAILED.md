---
sidebar_position: 2
tags:
  - Error Reference
---

# ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED

## Error Code: ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED

This error occurs when verification of the Originator Profile Set fails.

## Error Message

- "Originator Profile Set verify failed"

## Causes

- Verification of the Core Profile, Profile Annotation, or Web Media Profile included in the Originator Profile Set may have failed.
  Additional details can be found in [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](../op/ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md).

## Examples

- The Core Profile is placed with part of its footer missing.

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

## Resolution

- Review the Core Profile, Profile Annotation, and Web Media Profile that failed verification.

## Related Information

- [`Originator Profile Set`](../../opb/originator-profile-set.md)
- [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](../op/ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md)
- [`ERR_SITE_PROFILE_VERIFY_FAILED`](../sp/ERR_SITE_PROFILE_VERIFY_FAILED.md)

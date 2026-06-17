---
sidebar_position: 1
original: https://github.com/originator-profile/docs.originator-profile.org/blob/484ee39/docs/error-reference/op-inspector-debugger/vc/ERR_VC_DECODE_FAILED.md
tags:
  - Error Reference
slug: /error-reference/ERR_VC_DECODE_FAILED
---

# ERR_VC_DECODE_FAILED

## Error Code: ERR_VC_DECODE_FAILED

This error occurs when the VC fails to decode.

## Error Message

- "JWT VC Decoding Failure"

## Causes

- The JWT may be in an invalid format.

## Examples

- The JWT is placed with part of its header missing.

```
{
  "core": "yJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ..."
}
```

## Resolution

- Review the format of the JWT VC.

## Related Information

- [`OP VC Data Model`](../../../opb/op-vc-data-model.md)
- [`OP VC Securing Mechanism`](../../../opb/securing-mechanism.md)
- [`ERR_CONTENT_ATTESTATION_INVALID`](../ca/ERR_CONTENT_ATTESTATION_INVALID.md)
- [`ERR_ORIGINATOR_PROFILE_INVALID`](../op/ERR_ORIGINATOR_PROFILE_INVALID.md)
- [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](../op/ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md)
- [`ERR_SITE_PROFILE_INVALID`](../sp/ERR_SITE_PROFILE_INVALID.md)

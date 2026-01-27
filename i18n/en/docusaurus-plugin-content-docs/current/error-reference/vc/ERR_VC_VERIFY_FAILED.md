---
sidebar: 2
tags:
  - Error Reference
---

# ERR_VC_VERIFY_FAILED

## Error Code: ERR_VC_VERIFY_FAILED

The error occurs when verification of the VC fails.

## Error Message

- "JWT VC Verification Failure"

## Causes

- Verification of the JWT may have failed.

## Examples

- The JWT is placed with part of its footer missing.

```
{
  "core": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcE...RXpun0HYErCDkbzuEMkXO8edtMM_8Znlm6fzElEKWg79ShDrvRKGQNkr41cpl7ycLzFIbKk7epRTlStlq"
}
```

## Resolution

- Review the VC specification.

## Related Information

- [`OP VC Data Model`](../../opb/op-vc-data-model.md)
- [`OP VC Securing Mechanism`](../../opb/securing-mechanism.md)
- [`ERR_CONTENT_ATTESTATION_VERIFY_FAILED`](../ca/ERR_CONTENT_ATTESTATION_VERIFY_FAILED.md)
- [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](../op/ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md)
- [`ERR_SITE_PROFILE_VERIFY_FAILED`](../sp/ERR_SITE_PROFILE_VERIFY_FAILED.md)

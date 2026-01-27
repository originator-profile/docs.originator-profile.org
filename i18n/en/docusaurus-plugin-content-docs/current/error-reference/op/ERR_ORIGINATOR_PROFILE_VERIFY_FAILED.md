---
sidebar: 4
tags:
  - Error Reference
  - Profile Annotation
  - Web Media Specific Model
---

# ERR_ORIGINATOR_PROFILE_VERIFY_FAILED

## Error Code: ERR_ORIGINATOR_PROFILE_VERIFY_FAILED

This error occurs when verification of the Originator Profile fails.

## Error Message

- "Core Profile verify failed"
- "Profile Annotation verify failed"
- "Web Media Profile verify failed"

## Causes

- Verification of the Core Profile may have failed.
- Verification of the Profile Annotation may have failed.
- Verification of the Web Media Profile may have failed.

Verification failures may include the following causes:

- The decoding may have failed.
  Additional details can be found in [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md)
- The verification result for the Core Profile may not have been found.
- The Core Profile referenced by the Profile Annotation's `issuer` may not have been found.
  Additional details can be found in [`ERR_CORE_PROFILE_NOT_FOUND`](./ERR_CORE_PROFILE_NOT_FOUND.md).
- The Core Profile referenced by the Web Media Profile's `issuer` may not have been found.
  Additional details can be found in [`ERR_CORE_PROFILE_NOT_FOUND`](./ERR_CORE_PROFILE_NOT_FOUND.md).
- The signature verification may have failed.
- The Profile Annotation may be outside its valid time period.
  Additional details can be found in [`ERR_CERTIFICATE_EXPIRED`](./ERR_CERTIFICATE_EXPIRED.md).

## Examples

- The Core Profile is placed with part of its footer missing.

```
    <script type="application/ops+json">
      [
        {
          "core": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcE...RXpun0HYErCDkbzuEMkXO8edtMM_8Znlm6fzElEKWg79ShDrvRKGQNkr41cpl7ycLzFIbKk7epRTlStlq"
        }
      ]
    </script>
```

- The `validFrom` property in the Profile Annotation is set to a date later than the current date.

```
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    {
      "@language": "en"
    }
  ],
  "type": ["VerifiableCredential", "ProfileAnnotation"],
  "issuer": "dns:profile-annotator.example.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.org",
    "name": "<PA Name>",
    "description": "<Description of PA>",
    "annotation": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "ProfileAnnotationPolicy",
      "name": "<Profile Annotation Policy Name>",
      "description": "<Description of Profile Annotation Policy>",
      "ref": "https://annotation.example.org/about"
    }
  },
  "validFrom": "2030-03-31T14:59:59Z"
}
```

## Resolution

- Review the [Core Profile](../../opb/cp.md), [Profile Annotation](../../opb/pa.md), and [Web Media Profile](../../opb/web-media-profile.md) that failed verification.
  Additional details can be found in the error code documentation corresponding to the cause of the failure or in the relevant specifications.

## Related Information

- [`Core Profile`](../../opb/cp.md)
- [`Profile Annotation`](../../opb/pa.md)
- [`Web Media Profile`](../../opb/web-media-profile.md)
- [`ERR_CERTIFICATE_EXPIRED`](../op/ERR_CERTIFICATE_EXPIRED.md)
- [`ERR_CORE_PROFILE_NOT_FOUND`](../op/ERR_CORE_PROFILE_NOT_FOUND.md)
- [`ERR_ORIGINATOR_PROFILE_INVALID`](../op/ERR_ORIGINATOR_PROFILE_INVALID.md)
- [`ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED`](../ops/ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED.md)
- [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md)
- [`ERR_VC_VERIFY_FAILED`](../vc/ERR_VC_VERIFY_FAILED.md)

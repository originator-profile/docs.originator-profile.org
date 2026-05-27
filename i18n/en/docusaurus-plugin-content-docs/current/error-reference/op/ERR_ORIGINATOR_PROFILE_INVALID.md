---
sidebar_position: 3
original: https://github.com/originator-profile/docs.originator-profile.org/blob/0eea912/docs/error-reference/op/ERR_ORIGINATOR_PROFILE_INVALID.md
tags:
  - Error Reference
  - Profile Annotation
  - Web Media Specific Model
slug: /error-reference/ERR_ORIGINATOR_PROFILE_INVALID
---

# ERR_ORIGINATOR_PROFILE_INVALID

## Error Code: ERR_ORIGINATOR_PROFILE_INVALID

This error occurs when the Originator Profile is in an invalid format.

## Error Message

- "Core Profile decode failed"
- "Profile Annotation decode failed"
- "Web Media Profile decode failed"
- "Subject mismatch between Core Profile and Web Media Profile"
- "Subject mismatch between Core Profile and Profile Annotation"

## Causes

- Decoding of the Core Profile may have failed.
- Decoding of the Profile Annotation may have failed.
- Decoding of the Web Media Profile may have failed.
- The Core Profile's `credentialSubject.id` may not match the Profile Annotation's `credentialSubject.id`.
- The Core Profile's `credentialSubject.id` may not match the Web Media Profile's `credentialSubject.id`.

## Examples

- The Core Profile is placed with part of its header missing.

```
    <script type="application/ops+json">
      [
        {
          "core": "yJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ..."
        }
      ]
    </script>
```

- A Core Profile is issued with a `credentialSubject.id` value that does not match the Profile Annotation’s `credentialSubject.id.`
  For example, when the Core Profile's `credentialSubject.id` is `dns:profile-annotation-issuer.example.org`, the Profile Annotation's was issued with `credentialSubject.id` is `dns:another.org`.

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
  "issuer": "dns:profile-annotation-issuer.example.org",
  "credentialSubject": {
    "id": "dns:another.org",
    "name": "<PA Name>",
    "description": "<Description of PA>",
    "annotation": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "ProfileAnnotationPolicy",
      "name": "<Profile Annotation Policy Name>",
      "description": "<Description of Profile Annotation Policy>",
      "ref": "https://annotation.example.org/about"
    }
  }
}
```

## Resolution

- Review that the Core Profile, Profile Annotation, and Web Media Profile and correct any invalid formatting.
  Additional details can be found in [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md).
- Confirm that the `credentialSubject.id` values in the Core Profile and Profile Annotation match.
  Additional details can be found in [Core Profile](../../opb/cp.md) and [Profile Annotation](../../opb/pa.md).
- Confirm that the `credentialSubject.id` values in the Core Profile and Web Media Profile match.
  Additional details can be found in [Core Profile](../../opb/cp.md) and [Web Media Profile](../../opb/web-media-profile.md).

## Related Information

- [`Core Profile`](../../opb/cp.md)
- [`Profile Annotation`](../../opb/pa.md)
- [`Web Media Profile`](../../opb/web-media-profile.md)
- [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](../op/ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md)
- [`ERR_ORIGINATOR_PROFILE_SET_INVALID`](../ops/ERR_ORIGINATOR_PROFILE_SET_INVALID.md)
- [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md)

---
sidebar_position: 3
original: https://github.com/originator-profile/docs.originator-profile.org/blob/484ee39/docs/error-reference/op-inspector-debugger/sp/ERR_SITE_PROFILE_INVALID.md
tags:
  - Error Reference
slug: /error-reference/ERR_SITE_PROFILE_INVALID
---

# ERR_SITE_PROFILE_INVALID

## Error Code: ERR_SITE_PROFILE_INVALID

This error occurs when the Site Profile is in an invalid format during verification.

## Error Message

- "Originator Profile Set invalid"
- "Website Profile invalid"
- "Appropriate Core Profile not found"

## Causes

- The Originator Profile Set in the Site Profile may be in an invalid format.
  Additional details can be found in [`ERR_ORIGINATOR_PROFILE_SET_INVALID`](../ops/ERR_ORIGINATOR_PROFILE_SET_INVALID.md).
- Decoding of the Website Profile may have failed.
  Additional details can be found in [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md).
- Include an appropriate Website Profile whose `issuer` matches the `credentialSubject.id` in the Core Profile of the Originator Profile Set.
  Additional details can be found in [`ERR_CORE_PROFILE_NOT_FOUND`](../op/ERR_CORE_PROFILE_NOT_FOUND.md).

## Examples

- The Website Profile is placed with part of its header missing.

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
  ],
  "credential": "yJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ..."
}
```

- A Website Profile is issued with an `issuer` value that does not match the Core Profile's `credentialSubject.id`.
  For example, when the Core Profile's `credentialSubject.id` is `dns:example.com`, the Website Profile was issued with `"issuer": "dns:another.com"`.

```
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "en" }
  ],
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "dns:another.com",
  "credentialSubject": {
    "id": "https://media.example.com",
    "type": "WebSite",
    "name": "<Title of Web site>",
    "description": "<Description of Web site>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-Upwn7gYMuRmJlD1ZivHk876vXHzokXrwXj50VgfnMnY="
    },
    "allowedOrigin": ["https://media.example.com"]
  }
}
```

## Resolution

- Review the Originator Profile Set.
  Additional details can be found in [`Originator Profile Set`](../../../opb/originator-profile-set.md).
- Review the Website Profile.
  Additional details can be found in [`Website Profile`](../../../opb/website-profile.md).
- Confirm that the Core Profile's `credentialSubject.id` values of the Originator Profile Set and the `issuer` values in the Website Profile is configured correctly.

## Related Information

- [`Website Profile`](../../../opb/website-profile.md)
- [`Originator Profile Set`](../../../opb/originator-profile-set.md)
- [`Site Profile`](../../../opb/site-profile.md)
- [`ERR_CORE_PROFILE_NOT_FOUND`](../op/ERR_CORE_PROFILE_NOT_FOUND.md)
- [`ERR_ORIGINATOR_PROFILE_SET_INVALID`](../ops/ERR_ORIGINATOR_PROFILE_SET_INVALID.md)
- [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md)

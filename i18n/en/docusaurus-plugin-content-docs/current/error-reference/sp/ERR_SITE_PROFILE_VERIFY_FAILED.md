---
sidebar_position: 4
original: https://github.com/originator-profile/docs.originator-profile.org/blob/0eea912/docs/error-reference/sp/ERR_SITE_PROFILE_VERIFY_FAILED.md
tags:
  - Error Reference
slug: /error-reference/ERR_SITE_PROFILE_VERIFY_FAILED
---

# ERR_SITE_PROFILE_VERIFY_FAILED

## Error Code: ERR_SITE_PROFILE_VERIFY_FAILED

This error occurs when verification of the Site Profile fails.

## Error Message

- "Originator Profile Set verify failed"
- "Website Profile verify failed"
- "Origin not allowed"

## Causes

- Verification of The Originator Profile Set in the Site Profile may have failed.
  Additional details can be found in [`ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED`](../ops/ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED.md).
- Verification of the Website Profile may have failed.
  Additional details can be found in [`ERR_VC_VERIFY_FAILED`](../vc/ERR_VC_VERIFY_FAILED.md).
- The `allowedOrigin` specified in the Website Profile may not match the actual origin.

## Examples

- The Website Profile is placed with part of its footer missing.

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
  "credential": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4ME...GUyq3sbQiEO_tCjS2UY3gi9vOTS8NvlA_htihDJZUT8DZliZ7mgkrr3NRxDGVUeT9s2svRLt2gA"
}
```

- The `allowedOrigin` property does not include the origin of the web page where the Website Profile is placed.
  For example, while the Site Profile is intended to be placed at https://media.example.com, the Website Profile actually has the `allowedOrigin` property set to https://another.com.

```
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "en" }
  ],
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "dns:example.com",
  "credentialSubject": {
    "id": "https://media.example.com",
    "type": "WebSite",
    "name": "<Title of Web site>",
    "description": "<Description of Web site>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-Upwn7gYMuRmJlD1ZivHk876vXHzokXrwXj50VgfnMnY="
    },
    "allowedOrigin": ["https://another.com"]
  }
}
```

## Resolution

- Review the Core Profile, Profile Annotation, and Web Media Profile that have failed verification.
- Review the Website Profile.
  More details can be found in [Website Profile](../../opb/website-profile.md).
- Confirm that the value of `allowedOrigin` included in the Website Profile is appropriate.

## Related Information

- [`Website Profile`](../../opb/website-profile.md)
- [`Originator Profile Set`](../../opb/originator-profile-set.md)
- [`Site Profile`](../../opb/site-profile.md)
- [`ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED`](../ops/ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED.md)
- [`ERR_VC_VERIFY_FAILED`](../vc/ERR_VC_VERIFY_FAILED.md)

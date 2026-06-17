---
sidebar_position: 1
original: https://github.com/originator-profile/docs.originator-profile.org/blob/484ee39/docs/error-reference/op-inspector-debugger/ca/ERR_CONTENT_ATTESTATION_INVALID.md
tags:
  - Error Reference
  - Content Attestation
slug: /error-reference/ERR_CONTENT_ATTESTATION_INVALID
---

# ERR_CONTENT_ATTESTATION_INVALID

## Error Code: ERR_CONTENT_ATTESTATION_INVALID

This error occurs when the Content Attestation is in an invalid format.

## Error Message

- "Invalid CA"
- "allowedUrl and allowedOrigin are exclusive"
- "Content Attestation validate failed"
- "Target is empty"

## Causes

- Decoding of the Content Attestation may have failed.
  Additional details can be found in [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md).
- The validity check of the Content Attestation's VC may have failed.
- The Content Attestation may contain both `allowedUrl` and `allowedOrigin`.
- The `target` property of the Content Attestation may be empty.

## Examples

- A Content Attestation is placed with part of its header missing.

```
<script type="application/cas+json">
  [
    {
      "attestation": "yJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9.e...",
      "main": true
    }
  ]
</script>
```

- A Content Attestation was issued with an empty `target` property.

```
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "en" }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "dns:example.com",
  "credentialSubject": {
    "id": "urn:uuid:78550fa7-f846-4e0f-ad5c-8d34461cb95b",
    "type": "Article",
    "headline": "<Article Title>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
    },
    "description": "<Web page description>",
    "author": ["Jane Smith"],
    "editor": ["John Smith"],
    "datePublished": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z",
    "genre": "Arts & Entertainment"
  },
  "allowedUrl": ["https://media.example.com/articles/2024-06-30"],
  "target": []
}
```

## Resolution

- Review the Content Attestation and correct any invalid formatting.
- Do not include both `allowedUrl` and `allowedOrigin` in the Content Attestation.
  Additional details can be found in [Content Attestation](../../../opb/ca.md).
  Note that `allowedOrigin` is deprecated.

## Related Information

- [`Content Attestation`](../../../opb/ca.md)
- [`ERR_CONTENT_ATTESTATION_VERIFY_FAILED`](./ERR_CONTENT_ATTESTATION_VERIFY_FAILED.md)
- [`ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED`](../cas/ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED.md)
- [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md)

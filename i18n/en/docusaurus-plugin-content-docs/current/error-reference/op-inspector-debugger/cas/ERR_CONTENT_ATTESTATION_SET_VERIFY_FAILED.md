---
sidebar_position: 1
original: https://github.com/originator-profile/docs.originator-profile.org/blob/0eea912/docs/error-reference/cas/ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED.md
tags:
  - Error Reference
  - Content Attestation
slug: /error-reference/ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED
---

# ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED

## Error Code: ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED

This error occurs when verification of a Content Attestation included in the Content Attestation Set fails.

## Error Message

- "Content Attestation Set verify failed"

## Causes

- One or more Content Attestations included in the Content Attestation Set may have failed verification.

Verification failures may include the following causes:

- Decoding of the Content Attestation may have failed.
  Additional details can be found in [`ERR_CONTENT_ATTESTATION_INVALID`](../ca/ERR_CONTENT_ATTESTATION_INVALID.md).
- An appropriate Core Profile for the Content Attestation may not have been found.
  Additional details can be found in [`ERR_CORE_PROFILE_NOT_FOUND`](../op/ERR_CORE_PROFILE_NOT_FOUND.md).
- Verification of the Content Attestation may have failed.
  Additional details can be found in [`ERR_CONTENT_ATTESTATION_VERIFY_FAILED`](../ca/ERR_CONTENT_ATTESTATION_VERIFY_FAILED.md).

## Examples

- A Content Attestation was issued with an `issuer` value that does not match the Core Profile's `credentialSubject.id`.
  For example, when the Core Profile's `credentialSubject.id` is `dns:example.com`, the Content Attestation was issued with `"issuer": "dns:another.com"`.

```
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "en" }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "dns:another.com",
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
  "target": [
    {
      "type": "VisibleTextTargetIntegrity",
      "cssSelector": "<CSS Selector>",
      "integrity": "sha256-GYC9PqfIw0qWahU6OlReQfuurCI5VLJplslVdF7M95U="
    },
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-+M3dMZXeSIwAP8BsIAwxn5ofFWUtaoSoDfB+/J8uXMo="
    }
  ]
}
```

## Resolution

- Review the Content Attestation that failed verification to ensure its contents are correct.
- Confirm that the Core Profile's `credentialSubject.id` and the Content Attestation's `issuer` are configured appropriately.

## Related Information

- [`Content Attestation`](../../../opb/ca.md)
- [`Content Attestation Set`](../../../opb/content-attestation-set.md)
- [`ERR_CONTENT_ATTESTATION_INVALID`](../ca/ERR_CONTENT_ATTESTATION_INVALID.md)
- [`ERR_CONTENT_ATTESTATION_VERIFY_FAILED`](../ca/ERR_CONTENT_ATTESTATION_VERIFY_FAILED.md)
- [`ERR_CORE_PROFILE_NOT_FOUND`](../op/ERR_CORE_PROFILE_NOT_FOUND.md)

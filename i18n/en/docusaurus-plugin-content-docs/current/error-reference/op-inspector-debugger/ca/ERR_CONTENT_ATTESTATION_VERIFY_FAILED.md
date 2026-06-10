---
sidebar_position: 2
original: https://github.com/originator-profile/docs.originator-profile.org/blob/79f0e46/docs/error-reference/ca/ERR_CONTENT_ATTESTATION_VERIFY_FAILED.md
tags:
  - Error Reference
  - Content Attestation
  - Content Integrity Descriptor
slug: /error-reference/ERR_CONTENT_ATTESTATION_VERIFY_FAILED
---

# ERR_CONTENT_ATTESTATION_VERIFY_FAILED

## Error Code: ERR_CONTENT_ATTESTATION_VERIFY_FAILED

This error occurs when verification of the Content Attestation fails.

## Error Message

- "URL not allowed. Expected: `<expected URL>` Actual: `<actual URL>`"
- "Origin not allowed. Expected: `<expected Origin>` Actual: `<actual Origin>`"
- "Content Attestation verify failed"
- "Content Attestation Target integrity verification failed for element(s): `<message>`"
- "Content Attestation Target integrity fetch failed for element(s): `<message>`"

## Causes

- Verification of the Content Attestation's VC may have failed.
  Additional details can be found in [`ERR_VC_VERIFY_FAILED`](../vc/ERR_VC_VERIFY_FAILED.md).
- The `allowedUrl` specified in the Content Attestation may not match the actual URL, or it may be formatted in a way that is invalid as a URLPattern.
- The `allowedOrigin` specified in the Content Attestation may not match the actual origin.
- Verification of the Target Integrity included in the Content Attestation may have failed.
- Retrieval of the Target Integrity included in the Content Attestation may have failed(e.g., due to CORS restrictions).

## Examples

- A Content Attestation was issued using a private key that does not match the Core Profile.
- The `allowedUrl` property does not include the URL of the web page where the Content Attestation is placed.
- An invalid URLPattern is set in `allowedUrl` (e.g., using only `*`, providing an incomplete pattern).

For example, the Content Attestation was intended to be placed at https://media.example.com/articles/2024-06-30, but `allowedUrl` was set to https://media.example.com/articles/2024-06-31.

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
  "allowedUrl": ["https://media.example.com/articles/2024-06-31"],
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

- The Target Integrity value does not match.
- The integrity information for the image or resource cannot be retrieved due to CORS restrictions.

## Resolution

- Review the Content Attestation that failed verification and ensure its contents are correct.
- Confirm that the value of `allowedUrl` included in the Content Attestation is appropriate.
  - Configure `allowedUrl` according to the URLPattern specification.
    If the value is not a valid URLPattern, an error will appear in the browser's developer console, where you can check additional details.
- Confirm that the value of `allowedOrigin` included in the Content Attestation is appropriate.
  Note that `allowedOrigin` is deprecated.
- Confirm that the value of Target Integrity included in the Content Attestation is appropriate.
  Additional details can be found in [Content Attestation](../../../opb/ca.md).
  - If the retrieval of the Integrity value is blocked by CORS restrictions, a CORS error will be shown in the browser's developer console.
    Ensure that the server hosting the target resource is configured with the appropriate CORS settings.

## Related Information

- [`Content Attestation`](../../../opb/ca.md)
- [`ERR_CONTENT_ATTESTATION_INVALID`](./ERR_CONTENT_ATTESTATION_INVALID.md)
- [`ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED`](../cas/ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED.md)
- [`ERR_VC_VERIFY_FAILED`](../vc/ERR_VC_VERIFY_FAILED.md)

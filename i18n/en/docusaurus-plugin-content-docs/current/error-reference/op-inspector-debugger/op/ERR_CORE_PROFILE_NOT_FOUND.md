---
sidebar_position: 2
original: https://github.com/originator-profile/docs.originator-profile.org/blob/484ee39/docs/error-reference/op-inspector-debugger/op/ERR_CORE_PROFILE_NOT_FOUND.md
tags:
  - Error Reference
  - Profile Annotation
  - Web Media Specific Model
  - Content Attestation
slug: /error-reference/ERR_CORE_PROFILE_NOT_FOUND
---

# ERR_CORE_PROFILE_NOT_FOUND

## Error Code: ERR_CORE_PROFILE_NOT_FOUND

This error occurs when the Core Profile cannot be found.

## Error Message

- "Missing Core Profile `<issuer>`"
- "Appropriate Core Profile not found"

## Causes

- The Originator Profile Set may not contain a Core Profile.
- The verification result for the Core Profile may not have been found.
- An appropriate Core Profile may not have been found.

## Examples

- A Profile Annotation is issued with an `issuer` value that does not match the Core Profile's `credentialSubject.id`.
  For example, when the Core Profile's `credentialSubject.id` is `dns:profile-annotation-issuer.example.org`, the Profile Annotation was issued with `"issuer": "dns:another.org"`.

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
  "issuer": "dns:another.org",
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
  }
}
```

- A Content Attestation is issued with an `issuer` value that does not match the Core Profile's `credentialSubject.id`.
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

- Confirm that the Originator Profile Set includes a Core Profile.
- Confirm that the Core Profile's `credentialSubject.id` and the `issuer` values in the Profile Annotation, Web Media Profile, Website Profile, and Content Attestation are set correctly.

## Related Information

- [`Content Attestation`](../../../opb/ca.md)
- [`Core Profile`](../../../opb/cp.md)
- [`Profile Annotation`](../../../opb/pa.md)
- [`Web Media Profile`](../../../opb/web-media-profile.md)
- [`Website Profile`](../../../opb/website-profile.md)
- [`ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED`](../cas/ERR_CONTENT_ATTESTATION_SET_VERIFY_FAILED.md)
- [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](../op/ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md)
- [`ERR_SITE_PROFILE_INVALID`](../sp/ERR_SITE_PROFILE_INVALID.md)

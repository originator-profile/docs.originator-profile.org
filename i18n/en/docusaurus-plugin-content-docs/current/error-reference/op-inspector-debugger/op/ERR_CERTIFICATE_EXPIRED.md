---
sidebar_position: 1
original: https://github.com/originator-profile/docs.originator-profile.org/blob/484ee39/docs/error-reference/op-inspector-debugger/op/ERR_CERTIFICATE_EXPIRED.md
tags:
  - Error Reference
  - Profile Annotation
slug: /error-reference/ERR_CERTIFICATE_EXPIRED
---

# ERR_CERTIFICATE_EXPIRED

## Error Code: ERR_CERTIFICATE_EXPIRED

This error occurs when the system fails to validate the certificate validity period included in the Profile Annotation.

## Error Message

- "Certificate not yet valid"
- "Certificate expired"

## Causes

- The certificate's validity period has not yet started.
- The certificate's validity period has already expired.

## Examples

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
  "issuer": "dns:profile-annotation-issuer.example.org",
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

- The `validUntil` property in the Profile Annotation is set to a date earlier than the current date.

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
  "validUntil": "2022-03-31T14:59:59Z"
}
```

## Resolution

- Configure the `validFrom` and `validUntil` properties to valid date values within the certificate’s effective validity period.
  Additional details can be found in [Profile Annotation](../../../opb/pa.md).

## Related Information

- [`Profile Annotation`](../../../opb/pa.md)
- [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](./ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md)

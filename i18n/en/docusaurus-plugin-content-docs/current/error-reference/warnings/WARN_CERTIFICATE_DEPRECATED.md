---
sidebar_position: 1
original: https://github.com/originator-profile/docs.originator-profile.org/blob/710d107/docs/error-reference/warnings/WARN_CERTIFICATE_DEPRECATED.md
tags:
  - Error Reference
  - Profile Annotation
slug: /error-reference/WARN_CERTIFICATE_DEPRECATED
---

# WARN_CERTIFICATE_DEPRECATED

## Warning Code: WARN_CERTIFICATE_DEPRECATED

This warning is reported when a Profile Annotation in the deprecated [Certificate](../../opb/certificate.md) format is detected. It is not treated as a verification failure.

## Warning Message

- "Certificate is deprecated (OP[`i`].PA[`j`])"

`i` indicates the position of the OP within the Originator Profile Set, and `j` indicates the position of the PA within that OP.

## Causes

- The `type` of the Profile Annotation does not include `ProfileAnnotation`. It may have been issued in the legacy Certificate format (where `type` is `["VerifiableCredential", "Certificate"]`).

## Examples

- `type` is set to `["VerifiableCredential", "Certificate"]`.

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "ja" }
  ],
  "type": ["VerifiableCredential", "Certificate"],
  "issuer": "dns:cert-issuer.example.org",
  "credentialSubject": {
    "id": "dns:cert-holder.example.jp",
    "type": "CertificateProperties",
    "certificationSystem": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "CertificationSystem",
      "name": "<Certification system name>"
    }
  }
}
```

## Resolution

- Certificates can no longer be verified on or after 2027-01-01. Before then, switch to issuing a [Profile Annotation](../../opb/pa.md).
  The Certificate specification can be found in [Certificate](../../opb/certificate.md).

## Related Information

- [`Certificate`](../../opb/certificate.md)
- [`Profile Annotation`](../../opb/pa.md)
- [`INFO_PA_ISSUER_NOT_REGISTERED`](./INFO_PA_ISSUER_NOT_REGISTERED.md)

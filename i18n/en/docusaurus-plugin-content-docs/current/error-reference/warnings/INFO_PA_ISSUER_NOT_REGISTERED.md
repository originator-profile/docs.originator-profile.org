---
sidebar_position: 5
original: https://github.com/originator-profile/docs.originator-profile.org/blob/3eaf521/docs/error-reference/warnings/INFO_PA_ISSUER_NOT_REGISTERED.md
tags:
  - Error Reference
  - Profile Annotation
slug: /error-reference/INFO_PA_ISSUER_NOT_REGISTERED
---

# INFO_PA_ISSUER_NOT_REGISTERED

## Information Code: INFO_PA_ISSUER_NOT_REGISTERED

The verifier reports this information when it cannot confirm, through a [Profile Annotation Issuer Accreditation PA](../../opb/pa-model/issuer-accreditation.md), that the issuer of a Profile Annotation is authorized to issue PAs under that PA's `credentialSubject.annotation` ([Profile Annotation Policy](../../opb/pa-model/pa-policy.md)). It is information, not a warning, and does not count as a verification failure.

## Information Message

- "Profile Annotation Issuer is not registered for this annotation scheme (OP[`i`].PA[`j`] issuer: `<OP ID of the issuer>`, scheme: `<ID of the Profile Annotation Policy>`)"

`i` indicates the position of the OP within the Originator Profile Set, and `j` indicates the position of the PA within that OP. `scheme` is the ID of the Profile Annotation Policy; if it cannot be obtained, it is `unknown`.

## Causes

- The Profile Annotation Issuer does not hold a Profile Annotation Issuer Accreditation PA.
- The `credentialSubject.annotationScheme` of the Profile Annotation Issuer Accreditation PA does not include the ID of the Profile Annotation Policy being verified.
- The `issuer` of the Profile Annotation Issuer Accreditation PA is not an OP Registry trusted by the verifier.
- The PA being verified does not have a Profile Annotation Policy ID set.

## Examples

- The ID of the Profile Annotation Policy is not included in the `credentialSubject.annotationScheme` of the Profile Annotation Issuer Accreditation PA.

`credentialSubject.annotation` of the PA being verified:

```json
{
  "annotation": {
    "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
    "type": "ProfileAnnotationPolicy"
  }
}
```

`credentialSubject.annotationScheme` of the Profile Annotation Issuer Accreditation PA:

```json
{
  "annotationScheme": ["urn:uuid:def09cbd-6e8e-4c73-856d-5e00dffde643"]
}
```

## Resolution

- Being unable to confirm authorization does not immediately mean that the PA being verified is itself invalid. How unconfirmed PAs are handled depends on the verifier's policy.
- If you issue PAs, have an OP Registry issue a Profile Annotation Issuer Accreditation PA to you, and make sure that its `annotationScheme` includes the ID of the Profile Annotation Policy of the PAs you issue.
  For details, see [Profile Annotation Issuer Accreditation PA](../../opb/pa-model/issuer-accreditation.md).

## Related Information

- [`Profile Annotation Issuer Accreditation PA`](../../opb/pa-model/issuer-accreditation.md)
- [`Profile Annotation`](../../opb/pa.md)
- [`WARN_CERTIFICATE_DEPRECATED`](./WARN_CERTIFICATE_DEPRECATED.md)

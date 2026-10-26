---
sidebar_position: 5
original: https://github.com/originator-profile/docs.originator-profile.org/blob/710d107/docs/error-reference/warnings/INFO_PA_ISSUER_NOT_REGISTERED.md
tags:
  - Error Reference
  - Profile Annotation
slug: /error-reference/INFO_PA_ISSUER_NOT_REGISTERED
---

# INFO_PA_ISSUER_NOT_REGISTERED

## Information Code: INFO_PA_ISSUER_NOT_REGISTERED

This information is reported when it cannot be confirmed that the issuer of a Profile Annotation is authorized, by a [Profile Annotation Issuer Registration PA](../../opb/pa-model/profile-annotation-issuer-registration.md), to issue PAs based on that PA's `credentialSubject.annotation` ([Profile Annotation Policy](../../opb/pa-model/pa-policy.md)). It is reported as information rather than a warning, and is not treated as a verification failure.

## Information Message

- "Profile Annotation Issuer is not registered for this annotation scheme (OP[`i`].PA[`j`] issuer: `<OP ID of the issuer>`, scheme: `<ID of the Profile Annotation Policy>`)"

`i` indicates the position of the OP within the Originator Profile Set, and `j` indicates the position of the PA within that OP. `scheme` is the ID of the Profile Annotation Policy; if it cannot be obtained, it is `unknown`.

## Causes

- The Profile Annotation Issuer does not hold a Profile Annotation Issuer Registration PA.
- The `credentialSubject.annotationScheme` of the Profile Annotation Issuer Registration PA does not include the ID of the Profile Annotation Policy being verified.
- The `issuer` of the Profile Annotation Issuer Registration PA is not an OP Registry trusted by the verifier.
- The PA being verified does not have a Profile Annotation Policy ID set.

## Examples

- The ID of the Profile Annotation Policy is not included in the `credentialSubject.annotationScheme` of the Profile Annotation Issuer Registration PA.

`credentialSubject.annotation` of the PA being verified:

```json
{
  "annotation": {
    "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
    "type": "ProfileAnnotationPolicy"
  }
}
```

`credentialSubject.annotationScheme` of the Profile Annotation Issuer Registration PA:

```json
{
  "annotationScheme": ["urn:uuid:def09cbd-6e8e-4c73-856d-5e00dffde643"]
}
```

## Resolution

- Being unable to confirm authorization does not immediately mean that the PA being verified is itself invalid. How unconfirmed PAs are handled depends on the verifier's policy.
- If you issue PAs, have an OP Registry issue a Profile Annotation Issuer Registration PA to you, and make sure that its `annotationScheme` includes the ID of the Profile Annotation Policy of the PAs you issue.
  Additional details can be found in [Profile Annotation Issuer Registration PA](../../opb/pa-model/profile-annotation-issuer-registration.md).

## Related Information

- [`Profile Annotation Issuer Registration PA`](../../opb/pa-model/profile-annotation-issuer-registration.md)
- [`Profile Annotation`](../../opb/pa.md)
- [`WARN_CERTIFICATE_DEPRECATED`](./WARN_CERTIFICATE_DEPRECATED.md)

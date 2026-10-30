---
sidebar_position: 4
original: https://github.com/originator-profile/docs.originator-profile.org/blob/9c419e8/docs/opb/pa-model/profile-annotation-issuer-accreditation.md
tags:
  - Base Model
  - Profile Annotation
---

# Profile Annotation Issuer Accreditation PA

Profile Annotation Issuer Accreditation PA is a PA that shows the OP Registry has found a Profile Annotation Issuer to meet its accreditation requirements.

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

## Profile Annotation Issuer Accreditation PA Data Model

It follows [Profile Annotation](../pa.md).

### Property

#### Profile Annotation Issuer Accreditation PA Properties {#profile-annotation-issuer-accreditation-properties}

| Name                | Type       | Description                                                                                                                                                                                                                                                          |
| ------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]` | **REQUIRED.** It MUST comply with [OP VC Data Model](../op-vc-data-model.md). In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.                                                                                                     |
| `type`              | `string[]` | **REQUIRED.** It MUST be `["VerifiableCredential", "ProfileAnnotation"]`.                                                                                                                                                                                            |
| `issuer`            | `string`   | **REQUIRED.** It MUST be the [OP ID](../op-id.md) of the OP Registry. The OP Registry issues the Profile Annotation Issuer Accreditation PA. It reviews organizations that apply to become Profile Annotation Issuers and issues this PA to those it finds eligible. |
| `credentialSubject` | `object`   | **REQUIRED.** A JSON-LD Node Object containing the following [credentialSubject properties](#credential-subject-properties).                                                                                                                                         |

#### credentialSubject Properties {#credential-subject-properties}

| Name                   | Type       | Description                                                                                                                                                        |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                   | `string`   | **REQUIRED.** It MUST be the [OP ID](../op-id.md) of the organization that holds the Profile Annotation Issuer Accreditation PA (the Profile Annotation Issuer).   |
| `type`                 | `string`   | **REQUIRED.** It MUST be `IssuerAccreditation`. For the legacy value `ProfileAnnotationIssuerRegistration`, see [Backward Compatibility](#backward-compatibility). |
| `name`                 | `string`   | **OPTIONAL.** PA name.                                                                                                                                             |
| `annotationIssuerName` | `string`   | **REQUIRED.** The name of the Profile Annotation Issuer.                                                                                                           |
| `description`          | `string`   | **OPTIONAL.** A description of this Profile Annotation Issuer.                                                                                                     |
| `annotationScheme`     | `string[]` | **REQUIRED.** It MUST be an array of URIs that uniquely identify the Profile Annotations this Profile Annotation Issuer is authorized to issue.                    |
| `annotation`           | `object`   | **REQUIRED.** It MUST be a [Profile Annotation Policy](./pa-policy.md) that identifies the Profile Annotation Issuer accreditation scheme.                         |

:::note

If one OP Registry runs Profile Annotation Issuer accreditation schemes with identical accreditation requirements, those schemes SHOULD share the same ID.

:::

### Relation to Issuer Accreditation

`IssuerAccreditation` is the same type as the Issuer Accreditation in [OPF Core](pathname:///core/).
An Issuer Accreditation can also accredit standings other than Profile Annotation Issuer. A PA whose `credentialSubject.type` is `IssuerAccreditation` and whose `credentialSubject` has `annotationScheme` is treated as an accreditation as a Profile Annotation Issuer (a Profile Annotation Issuer Accreditation PA).

### Backward Compatibility {#backward-compatibility}

This PA was formerly named "Profile Annotation Issuer Registration PA", and its `credentialSubject.type` was `ProfileAnnotationIssuerRegistration`.
`ProfileAnnotationIssuerRegistration` is deprecated.
The OP Registry SHOULD NOT use `ProfileAnnotationIssuerRegistration` as the `credentialSubject.type` of a newly issued Profile Annotation Issuer Accreditation PA.

For backward compatibility, a verifier SHOULD accept a PA whose `credentialSubject.type` is `ProfileAnnotationIssuerRegistration` and treat it the same as `IssuerAccreditation`.

## Verification of Profile Annotation Issuer Accreditation PA

A verifier SHOULD verify the Profile Annotation Issuer Accreditation PA that a Profile Annotation Issuer holds, following the [OP VC Data Model](../op-vc-data-model.md) and [Securing Mechanism](../securing-mechanism.md). This step checks that the Accreditation PA itself is authentic ([verification in VC Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/#terminology)). It does not decide whether the `issuer` is a trusted OP Registry.

## Verification of Profile Annotation Issuer Authorization

When a verifier receives a PA, it SHOULD use the following steps to check whether the issuer of that PA is a Profile Annotation Issuer authorized by the OP Registry. This check corresponds to [validation in VC Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/#terminology), where the verifier decides whether a credential meets its own requirements.

The check skips any `IssuerAccreditation` without `credentialSubject.annotationScheme`.

1. Confirm that the `issuer` of the Profile Annotation Issuer Accreditation PA held by the Profile Annotation Issuer is the OP ID of a trusted OP Registry.
2. Confirm that the `credentialSubject.annotationScheme` property of that Profile Annotation Issuer Accreditation PA contains the ID of the certification scheme that the PA under verification follows.

If the Profile Annotation Issuer does not hold a Profile Annotation Issuer Accreditation PA, the check counts as not performed (unverified). Failing to confirm authorization does not by itself make the PA under verification invalid. Whether to accept an unverified PA or treat it as invalid depends on the verifier's policy.

[Verification of Profile Annotation Issuer Accreditation PA](#verification-of-profile-annotation-issuer-accreditation-pa) is cryptographic, so it gives a definite result. The authorization check is also deterministic once the verifier has chosen which OP Registry to trust. That choice depends on the verifier's policy, so different verifiers can reach different results.

## Use Cases

The Profile Annotation Issuer Accreditation PA is used in the following cases:

- The OP Registry keeps track of which organizations may issue specific PAs.
- A verifier checks whether the issuer of a received PA is qualified to issue it.
- A Profile Annotation Issuer proves its own qualifications.

For example, when the OP Registry accredits a certification body to issue "Organization Existence Certificates", it issues a Profile Annotation Issuer Accreditation PA to that body. A verifier that receives an "Organization Existence PA" checks the Profile Annotation Issuer Accreditation PA held by its issuer to confirm that the issuer is qualified.

## Appendix

### Example

_This is non-normative._

The following is an example of a Profile Annotation Issuer Accreditation PA.

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    {
      "@language": "en"
    }
  ],
  "type": ["VerifiableCredential", "ProfileAnnotation"],
  "issuer": "dns:op-registry.example.org",
  "credentialSubject": {
    "id": "dns:profile-annotation-issuer.example.jp",
    "type": "IssuerAccreditation",
    "name": "Profile Annotation Issuer Accreditation",
    "description": "The OP Registry has accredited this organization as an issuer of Organization Existence Certificates and Ad Verification Certificates.",
    "annotationIssuerName": "XX Certification Organization Co., Ltd.",
    "annotationScheme": [
      "urn:uuid:def09cbd-6e8e-4c73-856d-5e00dffde643",
      "urn:uuid:8029ece0-b327-4a7e-b586-3e442cb82d92"
    ],
    "annotation": {
      "id": "urn:uuid:5927e1da-e422-47c8-a5b8-efa6f5a45dd7",
      "type": "ProfileAnnotationPolicy",
      "name": "OP Registry Profile Annotation Issuer Accreditation Scheme",
      "description": "Profile Annotation Issuer accreditation scheme run by the OP Registry. The OP Registry issues a Profile Annotation Issuer Accreditation PA to each organization that meets the accreditation requirements.",
      "ref": "https://op-registry.example.org/profile-annotation-issuer-accreditation"
    }
  }
}
```

In this example, the OP Registry `dns:op-registry.example.org` issues a Profile Annotation Issuer Accreditation PA to the organization `dns:profile-annotation-issuer.example.jp`. This organization is accredited to issue PAs under two certification schemes, Organization Existence Certification and Ad Certification.

---
sidebar_position: 4
original: https://github.com/originator-profile/docs.originator-profile.org/blob/ea2fa3d/docs/opb/pa-model/profile-annotation-issuer-registration.md
tags:
  - Base Model
  - Profile Annotation
---

# Profile Annotation Issuer Accreditation PA

Profile Annotation Issuer Accreditation PA is a Profile Annotation used to indicate that the Profile Annotation Issuer is recognized by the OP Registry as meeting its accreditation requirements.

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

## Profile Annotation Issuer Accreditation PA Data Model

Complies with the [Profile Annotation](../pa.md).

### Property

#### Profile Annotation Issuer Accreditation PA Properties {#profile-annotation-issuer-accreditation-properties}

| Name                | Type       | Description                                                                                                                                                                                                                                                                                         |
| ------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]` | **REQUIRED.** It MUST comply with [OP VC Data Model](../op-vc-data-model.md). In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.                                                                                                                                    |
| `type`              | `string[]` | **REQUIRED.** It MUST be `["VerifiableCredential", "ProfileAnnotation"]`.                                                                                                                                                                                                                           |
| `issuer`            | `string`   | **REQUIRED.** It MUST be the [OP ID](../op-id.md) of the OP Registry. The Profile Annotation Issuer Accreditation PA is a PA issued by the OP Registry. The OP Registry examines organizations that are candidates for Profile Annotation Issuers and issues this PA when they are deemed eligible. |
| `credentialSubject` | `object`   | **REQUIRED.** A JSON-LD Node Object containing the following [credentialSubject properties](#credential-subject-properties).                                                                                                                                                                        |

#### credentialSubject Properties {#credential-subject-properties}

| Name                   | Type       | Description                                                                                                                                                                         |
| ---------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string`   | **REQUIRED.** It MUST be the [OP ID](../op-id.md) of the organization holding the Profile Annotation Issuer Accreditation PA (the Profile Annotation Issuer).                       |
| `type`                 | `string`   | **REQUIRED.** It MUST be `ProfileAnnotationIssuerAccreditation`. For the legacy value `ProfileAnnotationIssuerRegistration`, see [Backward Compatibility](#backward-compatibility). |
| `name`                 | `string`   | **OPTIONAL.** PA name.                                                                                                                                                              |
| `annotationIssuerName` | `string`   | **REQUIRED.** The name of the Profile Annotation Issuer.                                                                                                                            |
| `description`          | `string`   | **OPTIONAL.** The description regarding this Profile Annotation Issuer.                                                                                                             |
| `annotationScheme`     | `string[]` | **REQUIRED.** It MUST be an array of URIs that uniquely identify the Profile Annotations which this Profile Annotation Issuer is authorized to issue.                               |
| `annotation`           | `object`   | **REQUIRED.** It MUST be a [Profile Annotation Policy](./pa-policy.md) that indicates the Profile Annotation Issuer accreditation scheme.                                           |

:::note

Regarding the ID of the Profile Annotation Issuer accreditation scheme, if the accreditation requirements are identical across Profile Annotation Issuer accreditation schemes operated by the same OP Registry, the IDs SHOULD be the same value.

:::

### Backward Compatibility {#backward-compatibility}

This PA was formerly named "Profile Annotation Issuer Registration PA" and used `ProfileAnnotationIssuerRegistration` as the value of `credentialSubject.type`.
`ProfileAnnotationIssuerRegistration` is deprecated.
The OP Registry SHOULD NOT use `ProfileAnnotationIssuerRegistration` as the `credentialSubject.type` of a newly issued Profile Annotation Issuer Accreditation PA.

For backward compatibility, a verifier SHOULD accept a PA whose `credentialSubject.type` is `ProfileAnnotationIssuerRegistration` and treat it as equivalent to `ProfileAnnotationIssuerAccreditation`.

## Verification of Profile Annotation Issuer Accreditation PA

A verifier SHOULD perform verification on the Profile Annotation Issuer Accreditation PA held by the Profile Annotation Issuer, in accordance with the [OP VC Data Model](../op-vc-data-model.md) and [Securing Mechanism](../securing-mechanism.md). The verification here concerns confirming the authenticity of the Accreditation PA itself (as defined in [VC Data Model 2.0 verification](https://www.w3.org/TR/vc-data-model-2.0/#terminology)) and does not include determining whether the `issuer` is a trusted OP Registry.

## Verification of Profile Annotation Issuer Authorization

Upon receiving a PA, a verifier SHOULD verify whether the issuer is a Profile Annotation Issuer authorized by the OP Registry using the following procedure. This verification corresponds to the [validation defined in the VC Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/#terminology) for determining whether the verifier's own requirements are met.

1. Verify that the `issuer` of the Profile Annotation Issuer Accreditation PA held by the Profile Annotation Issuer is an OP ID from a trusted OP Registry.
2. Verify that the ID of the certification scheme to which the PA under verification conforms is included in the `credentialSubject.annotationScheme` property of that Profile Annotation Issuer Accreditation PA.

If the Profile Annotation Issuer does not possess a Profile Annotation Issuer Accreditation PA, this check is treated as unperformed (unverified). While the inability to confirm authorization does not immediately imply that the PA under verification is itself invalid, how an unverified PA is handled—whether it is accepted or treated as invalid—depends on the verifier's policy.

The "Verification of Profile Annotation Issuer Accreditation PA" described in the previous section is a cryptographic verification that yields a definitive result. In contrast, while the procedure for this authorization check is deterministic once the OP Registry trusted by the verifier is established, the result may vary among verifiers because the choice of which OP Registry to trust depends on the verifier's policy.

## Use Cases

The Profile Annotation Issuer Accreditation PA is used in the following use cases:

- The OP Registry manages organizations authorized to issue specific PAs.
- A verifier confirms that the issuer of a received PA holds the appropriate qualifications.
- The Profile Annotation Issuer proves its own qualification.

For example, when the OP Registry accredits a certification body to issue an "Organization Existence Certificate," it issues a Profile Annotation Issuer Accreditation PA to that body. A verifier can verify that the issuer of a received "Organization Existence PA" has the appropriate qualifications by checking the Profile Annotation Issuer Accreditation PA held by that issuer.

## Appendix

### Example

_This is non-normative._

Below is an example of Profile Annotation Issuer Accreditation PA.

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
    "type": "ProfileAnnotationIssuerAccreditation",
    "name": "Profile Annotation Issuer Accreditation",
    "description": "This Profile Annotation Issuer is accredited to issue Organization Existence Certificates and Ad Verification Certificates.",
    "annotationIssuerName": "XX Certification Organization Co., Ltd.",
    "annotationScheme": [
      "urn:uuid:def09cbd-6e8e-4c73-856d-5e00dffde643",
      "urn:uuid:8029ece0-b327-4a7e-b586-3e442cb82d92"
    ],
    "annotation": {
      "id": "urn:uuid:5927e1da-e422-47c8-a5b8-efa6f5a45dd7",
      "type": "ProfileAnnotationPolicy",
      "name": "OP Registry Profile Annotation Issuer Accreditation Scheme",
      "description": "This is the Profile Annotation Issuer accreditation scheme operated by the OP Registry. The Profile Annotation Issuer Accreditation PA is issued to organizations that meet the accreditation requirements.",
      "ref": "https://op-registry.example.org/profile-annotation-issuer-accreditation"
    }
  }
}
```

In this example, the OP Registry, `dns:op-registry.example.org`, issues a Profile Annotation Issuer Accreditation PA to the organization, `dns:profile-annotation-issuer.example.jp`. This organization is accredited to issue PAs that comply with two certification schemes (Organization Existence Certification and Ad Certification).

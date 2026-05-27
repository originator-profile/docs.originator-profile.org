---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/5fe8e60/docs/opb/pa-model/profile-annotation-issuer-registration.md
tags:
  - Base Model
  - Profile Annotation
---

# Profile Annotation Issuer Registration PA

Profile Annotation Issuer Registration PA is a Profile Annotation used to indicate that the Profile Annotation Issuer is recognized by the OP Registry as meeting its registration requirements.

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

## Profile Annotation Issuer Registration PA Data Model

Complies with the [Profile Annotation](../pa.md).

### Property

#### Profile Annotation Issuer Registration PA Properties {#profile-annotation-issuer-registration-properties}

| Name                | Type       | Description                                                                                                                                                                                                                                                                                        |
| ------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]` | **REQUIRED.** It MUST comply with [OP VC Data Model](../op-vc-data-model.md). In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.                                                                                                                                   |
| `type`              | `string[]` | **REQUIRED.** It MUST be `["VerifiableCredential", "ProfileAnnotation"]`.                                                                                                                                                                                                                          |
| `issuer`            | `string`   | **REQUIRED.** It MUST be the [OP ID](../op-id.md) of the OP Registry. The Profile Annotation Issuer Registration PA is a PA issued by the OP Registry. The OP Registry examines organizations that are candidates for Profile Annotation Issuers and issues this PA when they are deemed eligible. |
| `credentialSubject` | `object`   | **REQUIRED.** A JSON-LD Node Object containing the following [credentialSubject properties](#credential-subject-properties).                                                                                                                                                                       |

#### credentialSubject Properties {#credential-subject-properties}

| Name                   | Type       | Description                                                                                                                                                  |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                   | `string`   | **REQUIRED.** It MUST be the [OP ID](../op-id.md) of the organization holding the Profile Annotation Issuer Registration PA (the Profile Annotation Issuer). |
| `type`                 | `string`   | **REQUIRED.** It MUST be `ProfileAnnotationIssuerRegistration`.                                                                                              |
| `name`                 | `string`   | **OPTIONAL.** PA name.                                                                                                                                       |
| `annotationIssuerName` | `string`   | **REQUIRED.** The name of the Profile Annotation Issuer.                                                                                                     |
| `description`          | `string`   | **OPTIONAL.** The description regarding this Profile Annotation Issuer.                                                                                      |
| `annotationScheme`     | `string[]` | **REQUIRED.** It MUST be an array of URIs that uniquely identify the Profile Annotations which this Profile Annotation Issuer is authorized to issue.        |
| `annotation`           | `object`   | **REQUIRED.** It MUST be a [Profile Annotation Policy](./pa-policy.md) that indicates the Profile Annotation Issuer registration scheme.                     |

:::note

Regarding the ID of the Profile Annotation Issuer registration scheme, if the registration requirements are identical across Profile Annotation Issuer registration schemes operated by the same OP Registry, the IDs SHOULD be the same value.

:::

## Verification

A verifier who receives a Profile Annotation Issuer Registration PA SHOULD perform the following verification steps:

1. Confirm that the Profile Annotation Issuer Registration PA is verifiable according to the [OP VC Data Model](../op-vc-data-model.md) and the [Securing Mechanism](../securing-mechanism.md).
2. Confirm that the `issuer` is the OP ID of a trusted OP Registry.
3. Confirm that the ID of the certification scheme to which the PA issued by the Profile Annotation Issuer complies is included in the `credentialSubject.annotationScheme` property of this Profile Annotation Issuer PA.

## Use Cases

The Profile Annotation Issuer Registration PA is used in the following use cases:

- The OP Registry manages organizations authorized to issue specific PAs.
- A verifier confirms that the issuer of a received PA holds the appropriate qualifications.
- The Profile Annotation Issuer proves its own qualification.

For example, when the OP Registry certifies a certification body authorized to issue an "Organization Existence Certificate," it issues a Profile Annotation Issuer Registration PA to that body. A verifier can verify that the issuer of a received "Organization Existence PA" has the appropriate qualifications by checking the Profile Annotation Issuer Registration PA held by that issuer.

## Appendix

### Example

_This is non-normative._

Below is an example of Profile Annotation Issuer Registration PA.

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
    "type": "ProfileAnnotationIssuerRegistration",
    "name": "Profile Annotation Issuer Certificate",
    "description": "This Profile Annotation Issuer is authorized to issue Organization Existence Certificates and Ad Verification Certificates.",
    "annotationIssuerName": "XX Certification Organization Co., Ltd.",
    "annotationScheme": [
      "urn:uuid:def09cbd-6e8e-4c73-856d-5e00dffde643",
      "urn:uuid:8029ece0-b327-4a7e-b586-3e442cb82d92"
    ],
    "annotation": {
      "id": "urn:uuid:5927e1da-e422-47c8-a5b8-efa6f5a45dd7",
      "type": "ProfileAnnotationPolicy",
      "name": "OP Registry Profile Annotation Issuer Registration Scheme",
      "description": "This is the Profile Annotation Issuer registration scheme operated by the OP Registry. The Profile Annotation Issuer PA is issued to organizations that meet the registration requirements.",
      "ref": "https://op-registry.example.org/profile-annotation-issuer-registration"
    }
  }
}
```

In this example, the OP Registry, `dns:op-registry.example.org`, issues a Profile Annotation Issuer Registration PA to the organization, `dns:profile-annotation-issuer.example.jp`. This organization is authorized to issue PAs that comply with two certification schemes (Organization Existence Certification and Ad Certification).

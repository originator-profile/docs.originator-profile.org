---
tags:
  - Base Model
  - Profile Annotation
---

# Profile Annotator Registration PA

Profile Annotator Registration PA is a Profile Annotation used to indicate that the Profile Annotator is recognized by the OP Registry as meeting its registration requirements.

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

## Profile Annotator Registration PA Data Model

Complies with the [Profile Annotation](../pa.md).

### Property

#### `@context`

REQUIRED. It MUST comply with [OP VC Data Model](../op-vc-data-model.md) . In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.

#### `type`

REQUIRED. It MUST be `["VerifiableCredential", "ProfileAnnotation"]`.

#### `issuer`

REQUIRED. It MUST be the OP ID of the OP Registry.

The Profile Annotator Registration PA is a PA issued by the OP Registry. The OP Registry examines organizations that are candidates for Profile Annotators and issues this PA when they are deemed eligible.

#### `credentialSubject`

- `id`: REQUIRED. It MUST be the OP ID of the organization holding the Profile Annotator Registration PA (the Profile Annotator).
- `type`: REQUIRED. It MUST be `ProfileAnnotatorRegistration`.
- `annotatorName`: REQUIRED. The name of the Profile Annotator (string).
- `description`: OPTIONAL. The description regarding this Profile Annotator (string).
- `annotationScheme`: REQUIRED. It MUST be an array of URIs that uniquely identify the Profile Annotations which this Profile Annotator is authorized to issue.
- `annotation`: REQUIRED. It MUST be a Profile Annotation Policy that indicates the Profile Annotator registration scheme.

:::note

Regarding the ID of the Profile Annotator registration scheme, if the registration requirements are identical across Profile Annotator registration schemes operated by the same OP Registry, the IDs SHOULD be the same value.

:::

## Verification

A verifier who receives a Profile Annotator Registration PA SHOULD perform the following verification steps:

1. Confirm that the Profile Annotator Registration PA is verifiable according to the [OP VC Data Model](../op-vc-data-model.md) and the [Securing Mechanism](../securing-mechanism.md).
2. Confirm that the `issuer` is the OP ID of a trusted OP Registry.
3. Confirm that the ID of the certification scheme to which the PA issued by the Profile Annotator complies is included in the `credentialSubject.annotationScheme` property of this Profile Annotator PA.

## Use Cases

The Profile Annotator Registration PA is used in the following use cases:

- The OP Registry manages organizations authorized to issue specific PAs.
- A verifier confirms that the issuer of a received PA holds the appropriate qualifications.
- The Profile Annotator proves its own qualification.

For example, when the OP Registry certifies a certification body authorized to issue an "Organization Existence Certificate," it issues a Profile Annotator Registration PA to that body. A verifier can verify that the issuer of a received "Organization Existence PA" has the appropriate qualifications by checking the Profile Annotator Registration PA held by that issuer.

## Appendix

### Example

_This is non-normative._

Below is an example of Profile Annotator Registration PA.

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
    "id": "dns:pa-issuer.example.jp",
    "type": "ProfileAnnotatorRegistration",
    "name": "Profile Annotator Certificate",
    "description": "This Profile Annotator is authorized to issue Organization Existence Certificates and Ad Verification Certificates.",
    "annotatorName": "XX Certification Organization Co., Ltd.",
    "annotationScheme": [
      "urn:uuid:def09cbd-6e8e-4c73-856d-5e00dffde643",
      "urn:uuid:8029ece0-b327-4a7e-b586-3e442cb82d92"
    ],
    "annotation": {
      "id": "urn:uuid:5927e1da-e422-47c8-a5b8-efa6f5a45dd7",
      "name": "OP Registry Profile Annotator Registration Scheme",
      "description": "This is the Profile Annotator registration scheme operated by the OP Registry. The Profile Annotator PA is issued to organizations that meet the registration requirements.",
      "ref": "https://op-registry.example.org/pa-issuer-registration"
    }
  }
}
```

In this example, the OP Registry, `dns:op-registry.example.org`, issues a Profile Annotator Registration PA to the organization, `dns:pa-issuer.example.jp`. This organization is authorized to issue PAs that comply with two certification schemes (Organization Existence Certification and Ad Certification).

---
sidebar_position: 2
original: https://github.com/originator-profile/docs.originator-profile.org/blob/ea2fa3d/docs/opb/pa-model/membership.md
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# Industry Association Membership Certification PA

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Profile Annotation (PA)
- Industry Association Membership Certification PA: PA that guarantees the industry association membership of the OP-holding organization

## Industry Association Membership Certification PA Properties

It MUST comply with [Profile Annotation](../pa.md).

### Property

#### Industry Association Membership Certification PA Properties {#membership-properties}

| Name                | Type       | Description                                                                                                                                                                                 |
| ------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]` | **REQUIRED.** It MUST comply with [OP VC Data Model](../op-vc-data-model.md). In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.                            |
| `type`              | `string[]` | **REQUIRED.** It MUST be `["VerifiableCredential", "ProfileAnnotation"]`.                                                                                                                   |
| `issuer`            | `string`   | **REQUIRED.** It MUST be the [OP ID](../op-id.md) of the PA issuer.                                                                                                                         |
| `credentialSubject` | `object`   | **REQUIRED.** A JSON-LD Node Object containing the following [credentialSubject properties](#credential-subject-properties).                                                                |
| `validFrom`         | `string`   | **OPTIONAL.** Conforms to the [Profile Annotation](../pa.md#profile-annotation-properties). If included, set this to the time at which the industry association membership was established. |

#### credentialSubject Properties {#credential-subject-properties}

| Name          | Type     | Description                                                                                                                                                                                                                          |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`          | `string` | **REQUIRED.** The [OP ID](../op-id.md) of an organization holding the PA.                                                                                                                                                            |
| `type`        | `string` | **REQUIRED.** Set it to `Membership`.                                                                                                                                                                                                |
| `name`        | `string` | **OPTIONAL.** The name of this PA.                                                                                                                                                                                                   |
| `description` | `string` | **OPTIONAL.** It is a description of this PA.                                                                                                                                                                                        |
| `image`       | `object` | **OPTIONAL.** MUST be a JSON-LD Node Object of type [`image` datatype](../context.md#the-image-datatype). This property allows you to [verify](../context.md#verifying-image-datatype) that the PA image has not been tampered with. |
| `annotation`  | `object` | **REQUIRED.** It MUST be a [Profile Annotation Policy](./pa-policy.md).                                                                                                                                                              |

## Appendix

### Example

_This is non-normative._

Below is a concrete example of an industry association membership certification PA.

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
  "issuer": "dns:medreg.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "Membership",
    "image": {
      "id": "https://medreg.exp.originator-profile.org/image.png",
      "digestSRI": "sha256-DP800gBJ225266yAyzf2VefM0OD+3nFSSKh6gy8WUnQ="
    },
    "annotation": {
      "id": "urn:uuid:2dbf9afe-af9c-4c6a-b6df-70a9565fec5e",
      "type": "ProfileAnnotationPolicy",
      "name": "Fictitious News Media Organization Registration Center Registration Certificate",
      "description": "This organization holds a registration with the Fictitious News Media Organization Registration Center.",
      "ref": "https://medreg.exp.originator-profile.org/"
    }
  },
  "validFrom": "2024-03-31T15:00:00Z"
}
```

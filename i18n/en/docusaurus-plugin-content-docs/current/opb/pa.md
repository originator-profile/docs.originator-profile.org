---
sidebar_position: 22
original: https://github.com/originator-profile/docs.originator-profile.org/blob/5fe8e60/docs/opb/pa.md
tags:
  - Base Model
  - Profile Annotation
---

# Profile Annotation

The Profile Annotation is VC's common data model for expressing information about Core Profile subjects.

## Terminology

For terms not explained in this document, please see [Terminology](./terminology.md).

- Core Profile (CP)
- Originator Profile Identifier (OP ID)
- OP VC Data Model Conforming Document (OP VC DM Conforming Document)
- Profile Annotation (PA)

## Profile Annotation (PA) Data Model

The Profile Annotation MUST be an OP VC DM compliant document and contains the following properties:

### Property

#### Profile Annotation Properties {#profile-annotation-properties}

| Name                | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]` | **REQUIRED.** It MUST conform to the [OP VC Data Model](./op-vc-data-model.md).                                                                                                                                                                                                                                                                                                                                                                                            |
| `type`              | `string[]` | **REQUIRED.** It MUST be `["VerifiableCredential", "ProfileAnnotation"]`.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `issuer`            | `string`   | **REQUIRED.** It MUST be the [OP ID](./op-id.md) of the PA issuer.                                                                                                                                                                                                                                                                                                                                                                                                         |
| `credentialSubject` | `object`   | **REQUIRED.** A JSON-LD Node Object containing the following [credentialSubject properties](#credential-subject-properties).                                                                                                                                                                                                                                                                                                                                               |
| `validFrom`         | `string`   | **OPTIONAL.** The start date and time of the Profile Annotation's validity period. Conforms to [VC Data Model 2.0 Section 4.9 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period). MUST be a [`dateTimeStamp` data type](./context.md#the-datetimestamp-datatype). If this value is not specified, it indicates that there is no start date and time of the validity period (valid any time before `validUntil`).                                   |
| `validUntil`        | `string`   | **OPTIONAL.** The expiration date of the Profile Annotation. Conforms to [VC Data Model 2.0 Section 4.9 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period). MUST be a [`dateTimeStamp` data type](./context.md#the-datetimestamp-datatype). The value of this property represents the last time that the information contained in the Profile Annotation was correct. If this value is not specified, it indicates no expiration date (unlimited). |

:::note

`validFrom` and `validUntil` are the start date and time of the validity period and the expiration date of the information contained in the Profile Annotation, and they are different from the start date and time of the validity period and the expiration date of the VC signature. In JWTs of [VC-JOSE-COSE](https://www.w3.org/TR/vc-jose-cose/), the Securing Mechanism currently adopted by OPs, the start date and time of the validity period and the expiration date of the signature are specified by the `iat` (issued at) and `exp` (expired at) claims of the JWT. The values of the `validFrom` and `validUntil` properties can be different from the `iat` and `exp` claim.

A scenario in which you might want to specify a different value is when you want to periodically reissue a VC that attests to a third-party certificate whose expiration date is far in the future. For example, suppose you issue a Profile Annotation based on this specification that contains a third-party certificate that expires on `2050-12-31T15:00:00Z`. In that case, you might consider periodically reissuing the Profile Annotation to reduce security risks caused by signature compromise or key leakage. To encourage periodic reissues, you can set an expiration date for the signature, and have the signature expire every year. In this case, you can specify the signature expiration date (one year later) in the `exp` claim, and set `validUntil` to `2050-12-31T15:00:00Z` regardless of the reissue date, thereby accurately representing the expiration date of the third-party certificate while reissuing it.

See [VC Data Model 2.0 Section 4.9 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period) for property definitions.

:::

#### credentialSubject Properties {#credential-subject-properties}

| Name               | Type       | Description                                                                                                                                                                                                                                                                                                |
| ------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `string`   | **REQUIRED.** It MUST be the [OP ID](./op-id.md) of the PA holding organization.                                                                                                                                                                                                                           |
| `type`             | `string`   | **REQUIRED.** PA type name. Existing types are listed in the [Profile Annotation Type Registry](./pa-model/index.mdx#registry), and additional types may be defined as an extension.                                                                                                                       |
| `name`             | `string`   | **OPTIONAL.** PA name.                                                                                                                                                                                                                                                                                     |
| `description`      | `string`   | **OPTIONAL.** Description of the PA.                                                                                                                                                                                                                                                                       |
| `image`            | `object`   | **OPTIONAL.** It MUST be a JSON-LD Node Object of type [`image` datatype](./context.md#the-image-datatype). This property allows you to [verify](./context.md#verifying-image-datatype) that the PA image has not been tampered with.                                                                      |
| `annotationScheme` | `string[]` | **OPTIONAL.** This is a set of Profile Annotations issued based on the Profile Annotation Policy of the `credentialSubject.annotation` property, in addition to the PA asserted in the `credentialSubject` JSON-LD Node Object. It MUST be an array of URIs that uniquely identify the Profile Annotation. |
| `annotation`       | `object`   | **REQUIRED.** It MUST be a [Profile Annotation Policy](./pa-model/pa-policy.md).                                                                                                                                                                                                                           |

:::note

Profile Annotations where the attributes to be validated or the issuing policy are of the same kind, but only the organization holding the Profile Annotation differs, SHOULD have the same `annotation.id` value.

Furthermore, the name, description, and URL of the Profile Annotation Policy SHOULD be up-to-date at the time of issuance.

:::

## Extensibility {#extensibility}

The issuer MAY add properties not defined in the [OP VC Data Model](./op-vc-data-model.md) and this document, but in such cases, it MUST follow the [registration process](./pa-model/index.mdx#registration-process).

## Appendix

### Example

_This is non-normative._

Below is an example of PA.

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    {
      "@language": "en"
    }
  ],
  "type": ["VerifiableCredential", "ProfileAnnotation"],
  "issuer": "dns:profile-annotator.example.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.org",
    "type": "<PA Type>",
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

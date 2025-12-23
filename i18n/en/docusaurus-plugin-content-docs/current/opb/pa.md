---
sidebar_position: 22
original: https://github.com/originator-profile/docs.originator-profile.org/blob/188b3f2/docs/opb/pa.md
tags:
  - Base Model
  - Profile Annotation
---

# Profile Annotation

The Profile Annotation is VC's common data model for expressing information about Core Profile subjects.

:::note

When issuing Profile Annotation as VC, it must be extended according to [extensibility](#extensibility). It must not be issued as PA without extension.

:::

## Terminology

For terms not explained in this document, please see [Terminology](./terminology.md).

- Core Profile (CP)
- Originator Profile Identifier (OP ID)
- OP VC Data Model Conforming Document (OP VC DM Conforming Document)
- Profile Annotation (PA)

## Profile Annotation (PA) Data Model

The Profile Annotation MUST be an OP VC DM compliant document and contains the following properties:

### Property

#### `@context`

It MUST conform to the [OP VC Data Model](./op-vc-data-model.md).

#### `type`

REQUIRED. It MUST be `["VerifiableCredential", "ProfileAnnotation"]`.

#### `issuer`

REQUIRED. It MUST be the OP ID of the PA issuer.

#### `credentialSubject.id`

REQUIRED. It MUST be the OP ID of the PA holding organization.

#### `credentialSubject.name`

OPTIONAL. PA name. It MUST be a string.

#### `credentialSubject.description`

OPTIONAL. Description of the PA. It MUST be a string.

#### `credentialSubject.image`

OPTIONAL. It MUST be a JSON-LD Node Object of type [`image` datatype](./context.md#the-image-datatype). This property allows you to [verify](./context.md#image-datatype-verification) that the PA image has not been tampered with.

#### `credentialSubject.annotationScheme`

OPTIONAL. This is a set of Profile Annotations issued based on the Profile Annotation Policy of the `credentialSubject.annotation` property, in addition to the PA asserted in the `credentialSubject` JSON-LD Node Object. It MUST be an array of URIs that uniquely identify the Profile Annotation.

#### `credentialSubject.annotation`

REQUIRED. It MUST be a [Profile Annotation Policy](./pa-model/pa-policy.md).

:::note

Profile Annotations where the attributes to be validated or the issuing policy are of the same kind, but only the organization holding the Profile Annotation differs, SHOULD have the same `annotation.id` value.

Furthermore, the name, description, and URL of the Profile Annotation Policy SHOULD be up-to-date at the time of issuance.

:::

#### `validFrom`

OPTIONAL. The start date and time of the Profile Annotation's validity period. Conforms to [VC Data Model 2.0 Section 4.9 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period). MUST be a [`dateTimeStamp` data type](./context.md#the-datetimestamp-datatype).

If this value is not specified, it indicates that there is no start date and time of the validity period (valid any time before `validUntil`).

:::note

Like the `validUntil` property, this value is the start date and time of the validity period of the information contained in the Profile Annotation, and is different from the start date and time of the validity period of the VC signature. It has a different meaning and can have a different value than the `exp` (expired at) claim and `iat` (issued at) claim in JWTs of [VC-JOSE-COSE](https://www.w3.org/TR/vc-jose-cose/), the Securing Mechanism currently adopted by OPs.

See the notes for the `validUntil` property for more information.

:::

#### `validUntil`

OPTIONAL. The expiration date of the Profile Annotation Conforms to [VC Data Model 2.0 Section 4.9 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period). MUST be a [`dateTimeStamp` data type](./context.md#the-datetimestamp-datatype).

The value of this property represents the last time that the information contained in the Profile Annotation was correct.

If this value is not specified, it indicates no expiration date (unlimited).

:::note

This value is the expiration date of the information contained in the Profile Annotation and is different from the expiration date of the VC signature. In JWTs of [VC-JOSE-COSE](https://www.w3.org/TR/vc-jose-cose/), the Securing Mechanism currently adopted by OPs, the expiration date of the signature is specified by the `exp` (expired at) claim of the JWT. The value of the `validUntil` property can be different from the `exp` claim.

A scenario in which you might want to specify a different value is when you want to periodically reissue a VC that attests to a third-party certificate whose expiration date is far in the future. For example, suppose you issue a Profile Annotation based on this specification that contains a third-party certificate that expires on `2050-12-31T15:00:00Z`. In that case, you might consider periodically reissuing the Profile Annotation to reduce security risks caused by signature compromise or key leakage. To encourage periodic reissues, you can set an expiration date for the signature, and have the signature expire every year. In this case, you can specify the signature expiration date (one year later) in the `exp` claim, and set `validUntil` to `2050-12-31T15:00:00Z` regardless of the reissue date, thereby accurately representing the expiration date of the third-party certificate while reissuing it.

See [VC Data Model 2.0 Section 4.9 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period) for property definitions.

:::

## Extensibility {#extensibility}

The issuer MAY add properties not defined in the [OP VC Data Model](./op-vc-data-model.md) and this document, but in such cases, they MUST follow the [registration process](./pa-model/index.mdx#registration-process).

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

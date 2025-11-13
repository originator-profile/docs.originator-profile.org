---
sidebar_position: 23
original: https://github.com/originator-profile/docs.originator-profile.org/blob/08529c8/docs/opb/certificate.md
tags:
  - Profile Annotation
---

# Certificate

## Terminology

For terms not explained in this document, please see [Terminology](./terminology.md).

- Profile Annotation (PA)
- Certification Scheme

## Certificate Data Model

The Certificate Data Model follows the [Profile Annotation](./pa.md).

### Property

#### `@context`

REQUIRED. It MUST conform to the [OP VC Data Model](./op-vc-data-model.md) and MUST have the third value set to `"https://originator-profile.org/ns/cip/v1"`.

#### `type`

REQUIRED. It MUST be `["VerifiableCredential", "Certificate"]`.

#### `credentialSubject`

- `id`: REQUIRED. The OP ID of the organization that holds the certificate.
- `type`: REQUIRED. This is specified in the document that defines the individual Certificate.
- `description`: OPTIONAL. A description of this certificate (string).
- `image`: OPTIONAL. It MUST be a JSON-LD Node Object of type [`image` datatype](./context.md#the-image-datatype). This property allows you to [verify](./context.md#image-datatype-verification) that the certificate image has not been tampered with.
- `certifier`: OPTIONAL. The name of the certification authority.
- `verifier`: OPTIONAL. The name of the verification authority.
- `certificationSystem.id`: REQUIRED. Please specify the ID of the certification system in URI format.
- `certificationSystem.type`: REQUIRED. MUST be `CertificationSystem`.
- `certificationSystem.name`: REQUIRED. The name of the certification system.
- `certificationSystem.description`: OPTIONAL. A description of the certification system (string).
- `certificationSystem.ref`: RECOMMENDED. A URL for people to read to find out more about the certification system.

:::note

Certificates that attest to the same content, basis, or evidence, and differ only in the organization holding the certificate, should have the same `certificationSystem.id` value.

Additionally, the certification system name, description and URL should be up to date at the time of publication.

:::

#### `validFrom`

OPTIONAL. The start date and time of the certificate's validity period. Conforms to [VC Data Model 2.0 Section 4.9 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period). MUST be a [`dateTimeStamp` data type](./context.md#the-datetimestamp-datatype).

If this value is not specified, it indicates that there is no start date and time of the validity period (valid any time before `validUntil`).

:::note

Like the `validUntil` property, this value is the start date and time of the validity period of the information contained in the Certificate, and is different from the start date and time of the validity period of the VC signature. It has a different meaning and can have a different value than the `exp` (expired at) claim and `iat` (issued at) claim in JWTs of [VC-JOSE-COSE](https://www.w3.org/TR/vc-jose-cose/), the Securing Mechanism currently adopted by OPs.

See the notes for the `validUntil` property for more information.

:::

#### `validUntil`

OPTIONAL. The expiration date of the certificate. Conforms to [VC Data Model 2.0 Section 4.9 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period). MUST be a [`dateTimeStamp` data type](./context.md#the-datetimestamp-datatype).

The value of this property represents the last time that the information contained in the Certificate was correct.

If this value is not specified, it indicates no expiration date (unlimited).

:::note

This value is the expiration date of the information contained in the Certificate and is different from the expiration date of the VC signature. In JWTs of [VC-JOSE-COSE](https://www.w3.org/TR/vc-jose-cose/), the Securing Mechanism currently adopted by OPs, the expiration date of the signature is specified by the `exp` (expired at) claim of the JWT. The value of the `validUntil` property can be different from the `exp` claim.

A scenario in which you might want to specify a different value is when you want to periodically reissue a VC that attests to a third-party certificate whose expiration date is far in the future. For example, suppose you issue a Certificate based on this specification that contains a third-party certificate that expires on `2050-12-31T15:00:00Z`. In that case, you might consider periodically reissuing the Certificate to reduce security risks caused by signature compromise or key leakage. To encourage periodic reissues, you can set an expiration date for the signature, and have the signature expire every year. In this case, you can specify the signature expiration date (one year later) in the `exp` claim, and set `validUntil` to `2050-12-31T15:00:00Z` regardless of the reissue date, thereby accurately representing the expiration date of the third-party certificate while reissuing it.

See [VC Data Model 2.0 Section 4.9 Validity Period](https://www.w3.org/TR/vc-data-model-2.0/#validity-period) for property definitions.

:::

## Appendix

### Example

_This section is non-normative._

The following is a concrete example of Certificate Data Model :

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "en" }
  ],
  "type": ["VerifiableCredential", "Certificate"],
  "issuer": "dns:cert-issuer.example.org",
  "credentialSubject": {
    "id": "dns:cert-holder.example.jp",
    "type": "CertificateProperties",
    "description": "This business operator has passed the ____ inspection and obtained ____ certification.",
    "image": {
      "id": "https://example.com/certification-mark.svg",
      "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
    },
    "certifier": "XX Certification Authority",
    "verifier": "XX Association",
    "certificationSystem": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "CertificationSystem",
      "name": "<The name of the certification scheme>",
      "description": "<A description of the certification scheme>",
      "ref": "https://certification.example.org/about"
    }
  },
  "validFrom": "2024-03-31T15:00:00Z",
  "validUntil": "2030-03-31T14:59:59Z"
}
```

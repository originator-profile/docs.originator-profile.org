---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/b10a57d/docs/opb/pa-model/news-media-registration.md
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# News Media Registration Certificate

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- News Media Registration Certificate: Certificate that guarantees the news media affiliation of the OP-holding organization

## News Media Registration Certificate Properties

It MUST comply with [Certificate](../certificate.md).

### Property

#### `@context`

REQUIRED. It MUST comply with [OP VC Data Model](../op-vc-data-model.md) . In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.

#### `type`

REQUIRED. `It MUST comply with ["VerifiableCredential", "Certificate"]` .

#### `issuer`

REQUIRED. It is the OP ID of the organization issuing the certificate.

:::note

Currently, news media registration certificates are issued by OP registries that receive OP applications from news media organizations, so the value of the `issuer` property is the OP ID of the OP registry.

:::

#### `credentialSubject`

- `id`: REQUIRED. It is the OP ID of the organization holding the certificate.
- `type`: REQUIRED. Set it to `CertificateProperties`.
- `description`: OPTIONAL. It is a description of this certificate (string).
- `image`: OPTIONAL. It MUST be a JSON-LD Node Object of type [`image` datatype](../context.md#the-image-datatype). This property allows you to [verify](../context.md#image-datatype-validation) that the image in the Certificate has not been tampered with.
- `certifier`: OPTIONAL. The name of the certification authority.
- `verifier`: OPTIONAL. The name of the verifier.
- `certificationSystem`: REQUIRED. MUST be a [Certification System](./certification-system.md).

#### `validFrom`

OPTIONAL. Conforms to the [Certificate Data Model](../certificate.md#validfrom). If included, please include the start time of the date your media organization registration was established.

## Appendix

### Example

_This is non-normative._

Below is a concrete example of a news media registration certificate.

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
  "type": ["VerifiableCredential", "Certificate"],
  "issuer": "dns:medreg.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "CertificateProperties",
    "certificationSystem": {
      "id": "urn:uuid:2dbf9afe-af9c-4c6a-b6df-70a9565fec5e",
      "type": "CertificationSystem",
      "name": "Fictitious News Media Organization Registration Center Registration Certificate",
      "description": "This organization holds a registration with the Fictitious News Media Organization Registration Center.",
      "ref": "https://medreg.exp.originator-profile.org/"
    },
    "certifier": "Fictitious News Media Organization Registration Center",
    "image": {
      "id": "https://medreg.exp.originator-profile.org/image.png"
    },
    "validFrom": "2024-03-31T15:00:00Z"
  }
}
```

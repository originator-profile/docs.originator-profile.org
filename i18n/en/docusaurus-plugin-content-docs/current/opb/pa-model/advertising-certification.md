---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/b10a57d/docs/opb/pa-model/advertising-certification.md
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# Advertising Certification Certificate

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Advertising Certification Certificate: Certificate that guarantees the advertising certification of the OP-holding organization

## Advertising Certification Certificate Properties

It MUST comply with [Certificate](../certificate.md) .

### Property

#### `@context`

REQUIRED. It MUST comply with [OP VC Data Model](../op-vc-data-model.md) . In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.

#### `credentialSubject`

REQUIRED. It is a JSON-LD Node Object representing an Advertising Certification Certificate.

- `id`: REQUIRED. The OP ID of an organization holding the certificate.
- `type`: REQUIRED. Set it to `CertificateProperties`
- `description`: OPTIONAL. It is a description of this certificate (string).
- `image`: OPTIONAL. MUST be a JSON-LD Node Object of type `image`. This property allows you to verify that the image in the Certificate has not been tampered with.
- `certifier`: OPTIONAL. The name of the certification authority.
- `verifier`: OPTIONAL. The name of the verifier.
- `certificationSystem`: REQUIRED. MUST be a [Certification System](./certification-system.md).

#### `validFrom`

OPTIONAL. Conforms to the [Certificate Data Model](../certificate.md#validfrom). Specify the earliest time on the date the advertising certification was issued.

#### `validUntil`

OPTIONAL. Conforms to the [Certificate Data Model](../certificate.md#validuntil). Specify the latest time for the expiration date and time of the advertising certification.

## Appendix

### Example

_This section is non-normative._

Below is a concrete example of an advertising certification certificate.

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
  "issuer": "dns:adcert.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "CertificateProperties",
    "certificationSystem": {
      "id": "urn:uuid:8029ece0-b327-4a7e-b586-3e442cb82d92",
      "type": "CertificationSystem",
      "name": "Fictitious Advertisement Certification Center Brand Safety Certified",
      "description": "This organization is committed to preventing the display of advertisements on illegal or inappropriate sites, content, or applications that could potentially harm the brand value of advertisers.",
      "ref": "https://adcert.exp.originator-profile.org/"
    },
    "certifier": "Fictitious Advertisement Certification Center",
    "image": {
      "id": "https://adcert.exp.originator-profile.org/image.png"
    },
    "validFrom": "2024-03-31T15:00:00Z",
    "validUntil": "2030-03-31T14:59:59Z"
  }
}
```

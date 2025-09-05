---
sidebar_position: 6
original: https://github.com/originator-profile/docs.originator-profile.org/blob/d46eeb3/docs/opb/certificate.md
---

# Certificate Data Model

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
- `description`: OPTIONAL. A description of this certificate.
- `image`: OPTIONAL. It MUST be a JSON-LD Node Object of type [`image` datatype](./context.md#the-image-datatype). This property allows you to [verify](./context.md#image-datatype-verification) that the certificate image has not been tampered with.
- `certifier`: OPTIONAL. The name of the certification authority.
- `verifier`: OPTIONAL. The name of the verification authority.
- `certificationSystem.id`: REQUIRED. Please specify the ID of the certification system in URI format.
- `certificationSystem.type`: REQUIRED. MUST be `CertificationSystem`.
- `certificationSystem.name`: REQUIRED. The name of the certification system.
- `certificationSystem.description`: OPTIONAL. A description of the certification system.
- `certificationSystem.ref`: RECOMMENDED. A URL for people to read to find out more about the certification system.

:::note

Certificates that attest to the same content, basis, or evidence, and differ only in the organization holding the certificate, should have the same `certificationSystem.id` value.

Additionally, the certification system name, description and URL should be up to date at the time of publication.

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
  "issuer": "dns:pa-issuer.example.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "CertificateProperties",
    "certificationSystem": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "CertificationSystem",
      "name": "<The name of the certification scheme>",
      "description": "<A description of the certification scheme>",
      "ref": "https://certification.example.org/about"
    },
    "description": "A description of this certificate"
  }
}
```

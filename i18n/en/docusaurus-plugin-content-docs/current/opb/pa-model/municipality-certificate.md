---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/b10a57d/docs/opb/pa-model/municipality-certificate.md
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# Municipality Certification Certificate

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Municipality Certification Certificate: Certificate that guarantees the municipal certification of the OP-holding organization

## Municipality Certification Certificate Properties

It MUST comply with [Certificate](../certificate.md) .

### Property

#### `@context`

REQUIRED. It MUST comply with [OP VC Data Model](../op-vc-data-model.md) . In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.

#### `credentialSubject`

REQUIRED. It is a JSON-LD Node Object representing a Municipality Certification Certificate.

- `id`: REQUIRED. The OP ID of an organization holding the certificate.
- `type`: REQUIRED. Set it to `CertificateProperties`
- `description`: OPTIONAL. It is a description of this certificate (string).
- `image`: OPTIONAL. MUST be a JSON-LD Node Object of type `image`. This property allows you to verify that the image in the Certificate has not been tampered with.
- `certifier`: OPTIONAL. The name of the certification authority.
- `verifier`: OPTIONAL. The name of the verifier.
- `certificationSystem.id`: REQUIRED. Specify the ID of the certification system in URI format.
- `certificationSystem.type`: REQUIRED. MUST be a `CertificationSystem`.
- `certificationSystem.name`: REQUIRED. The name of the certification system.
- `certificationSystem.description`: OPTIONAL. A description of the certification system (string).
- `certificationSystem.ref`: RECOMMENDED. The URL of a page people can read to learn more about the certification system.

:::note

Properties for municipality certification certificates outside of Japan are under consideration.

:::

## Appendix

### Example

_This section is non-normative._

Below is a concrete example of a municipality certification certificate.

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
  "issuer": "dns:lgac.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "CertificateProperties",
    "certificationSystem": {
      "id": "urn:uuid:203a2553-f1a8-40ba-9df0-4e508aa8511d",
      "type": "CertificationSystem",
      "name": "Fictitious Municipality Certification Center Municipal Certification",
      "description": "This organization is a local public entity organized and operated in accordance with the Local Autonomy Law.",
      "ref": "https://lgac.exp.originator-profile.org/"
    },
    "certifier": "Fictitious Organization Existence Verification Authority",
    "image": {
      "id": "https://lgac.exp.originator-profile.org/image.png"
    }
  }
}
```

---
sidebar_position: 3
original: https://github.com/originator-profile/docs.originator-profile.org/blob/7a2ce79/docs/opb/pa.md
---

# Profile Annotation Data Model

The Profile Annotation Data Model is VC's common data model for expressing information about Core Profile subjects.

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

REQUIRED. It MUST conform to the [OP VC Data Model](./op-vc-data-model.md).

#### `issuer`

REQUIRED. It MUST be the OP ID of the PA issuer.

#### `credentialSubject.id`

REQUIRED. It MUST be the OP ID of the PA holding organization.

#### `credentialSubject.description`

OPTIONAL. It MUST be a string.

## Extensibility {#extensibility}

If you wish to extend PA, you MUST create a new Credential Type based on the context definition in `https://originator-profile.org/ns/credentials/v1#ProfileAnnotation`.

## Appendix

### Example

_This is non-normative._

Below is an example of PA. In this example, there are a few more properties added, but this is due to the data model extending PA.

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
  "issuer": "dns:localhost",
  "credentialSubject": {
    "id": "dns:localhost",
    "type": "Organization",
    "addressCountry": "JP",
    "name": "Originator Profile Collaborative Initiative Partnership (for develoment purposes)",
    "corporateNumber": "8010005035933",
    "postalCode": "100-8055",
    "addressRegion": "Tokyo",
    "addressLocality": "Chiyoda",
    "streetAddress": "Outemachi 1-7-1",
    "certificationSystem": {
      "id": "urn:uuid:5374a35f-57ce-43fd-84c3-2c9b0163e3df",
      "type": "CertificationSystem",
      "name": "Corporate Number System Web-API",
      "ref": "https://www.houjin-bangou.nta.go.jp/"
    }
  }
}
```

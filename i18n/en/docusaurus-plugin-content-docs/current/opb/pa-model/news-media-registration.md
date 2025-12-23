---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/4a7db5d/docs/opb/pa-model/news-media-registration.md
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# News Media Registration PA

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Profile Annotation (PA)
- News Media Registration PA: PA that guarantees the news media affiliation of the OP-holding organization

## News Media Registration PA Properties

[Profile Annotation](../pa.md) に従います。

### Property

#### `@context`

REQUIRED. It MUST comply with [OP VC Data Model](../op-vc-data-model.md) . In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.

#### `credentialSubject`

- `id`: REQUIRED. The OP ID of an organization holding the PA.
- `type`: REQUIRED. Set it to `NewsMediaRegistration`
- `name`: OPTIONAL. The name of this PA (string).
- `description`: OPTIONAL. It is a description of this PA (string).
- `image`: OPTIONAL. MUST be a JSON-LD Node Object of type [`image` datatype](./context.md#the-image-datatype). This property allows you to [verify](./context.md#image-datatype-verification) that the PA image has not been tampered with.
- `annotation`: REQUIRED. It MUST be a [Profile Annotation Policy](./pa-policy.md).

#### `validFrom`

OPTIONAL. Conforms to the [Profile Annotation](../pa.md#validfrom). If included, please include the start time of the date your media organization registration was established.

## Appendix

### Example

_This is non-normative._

Below is a concrete example of a news media registration PA.

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
    "type": "NewsMediaRegistration",
    "image": {
      "id": "https://medreg.exp.originator-profile.org/image.png"
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

:::warning Migration Required

If you are using a previous format that extends [Certificate](../certificate.md), such as the one below, it will become unverifiable after 2027-01-01. The issuer MUST migrate to the format defined in this document by then.

---

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
- `certificationSystem.id`: REQUIRED. Specify the ID of the certification system in URI format.
- `certificationSystem.type`: REQUIRED. MUST be `CertificationSystem`.
- `certificationSystem.name`: REQUIRED. The name of the certification system.
- `certificationSystem.description`: OPTIONAL. A description of the certification system (string).
- `certificationSystem.ref`: RECOMMENDED. A URL for people to read to find out more about the certification system.

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

::::

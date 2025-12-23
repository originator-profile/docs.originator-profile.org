---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/188b3f2/docs/opb/pa-model/existence.md
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# Organization Existence PA

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Organization Existence PA: PA that guarantees the existence of the OP-holding organization

## Organization Existence PA Properties

It MUST comply with [Profile Annotation](../pa.md) .

### Property

#### `@context`

REQUIRED. It MUST comply with [OP VC Data Model](../op-vc-data-model.md) . In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.

#### `credentialSubject`

REQUIRED. It is JSON-LD Node Object that represents organization existence certificate.

- `id`: REQUIRED. The OP ID of an organization holding the PA.
- `type`: REQUIRED. Set it to `JP-OrganizationExistenceCertificate`.
- `name`: OPTIONAL. The name of this PA (string).
- `description`: OPTIONAL. A description of this PA (string).
- `image`: OPTIONAL. MUST be a JSON-LD Node Object of type [`image` datatype](./context.md#the-image-datatype). This property allows you to [verify](./context.md#image-datatype-verification) that the PA image has not been tampered with.
- `corporateName`: REQUIRED. Company name.
- `corporateNumber`: REQUIRED. Corporate number
- `postalCode`: REQUIRED. postal code
- `addressCountry`: REQUIRED. Specifies the ISO 3166-1 alpha-2 country code, for example `JP` for Japan.
- `addressRegion`: REQUIRED. Prefectures
- `addressLocality`: REQUIRED. City,town,village
- `streetAddress`: REQUIRED. Street address and building name
- `annotation`: REQUIRED. It MUST be a [Profile Annotation Policy](./pa-policy.md).

:::note
The properties of the organization existence PA outside of Japan are currently under consideration.
:::

## Appendix

### Example

_This section is non-normative._

Below is a concrete example of an organization existence PA.

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
  "issuer": "dns:ovac.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "JP-OrganizationExistenceCertificate",
    "image": {
      "id": "https://ovac.exp.originator-profile.org/image.png",
      "digestSRI": "sha256-mnvgmCrOr6G7F3CqphnQxVDBeQob5EFstF/n7jNNVwg="
    },
    "corporateName": "ABC Newspaper (* Development Sample)",
    "corporateNumber": "0000000000000",
    "postalCode": "000-0000",
    "addressCountry": "JP",
    "addressRegion": "Tokyo",
    "addressLocality": "Chiyoda",
    "streetAddress": "000",
    "annotation": {
      "id": "urn:uuid:def09cbd-6e8e-4c73-856d-5e00dffde643",
      "type": "ProfileAnnotationPolicy",
      "name": "Fictitious Organization Verification Authority Existence Certification",
      "description": "This organization has been verified to exist through corporate registration inquiry and other means.",
      "ref": "https://ovac.exp.originator-profile.org/"
    }
  }
}
```

::::warning Migration Required

If you are using a previous format that extends [Certificate](../certificate.md), such as the one below, it will become unverifiable after 2027-01-01. The issuer MUST migrate to the format defined in this document by then.

---

## Organization Existence Certificate Properties

Complies with [Certificate](../certificate.md).

### Property

#### `@context`

REQUIRED. It MUST comply with [OP VC Data Model](../op-vc-data-model.md) . In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1" `.

#### `credentialSubject`

REQUIRED. It is JSON-LD Node Object that represents organization existence certificate.

- `id`: REQUIRED. OP ID of the certificate holding organization.
- `type`: REQUIRED. It should be `CertificateProperties`.
- `description`: OPTIONAL. A description of this certificate (string).
- `name`: REQUIRED. Company name
- `corporateNumber`: REQUIRED. Corporate number
- `postalCode`: REQUIRED. postal code
- `addressCountry`: REQUIRED. Specifies the ISO 3166-1 alpha-2 country code, for example `JP` for Japan.
- `addressRegion`: REQUIRED. Prefectures
- `addressLocality`: REQUIRED. City,town,village
- `streetAddress`: REQUIRED. Street address and building name
- `certificationSystem.id`: REQUIRED. Specify the ID of the certification system in URI format.
- `certificationSystem.type`: REQUIRED. It MUST be `CertificationSystem`.
- `certificationSystem.name`: REQUIRED. The name of the certification system.
- `certificationSystem.description`: OPTIONAL. Explaining the certification system (string).
- `certificationSystem.ref`: RECOMMENDED. The URL of a human-readable page to learn more about the certification system.

:::note
The properties of the organization existence certificate outside of Japan are currently under consideration.
:::

## Appendix

### Example

_This section is non-normative._

Below is a concrete example of an organization existence certificate.

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
  "issuer": "dns:ovac.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "CertificateProperties",
    "addressCountry": "JP",
    "name": "ABC Newspaper (* Development Sample)",
    "corporateNumber": "0000000000000",
    "postalCode": "000-0000",
    "addressRegion": "Tokyo",
    "addressLocality": "Chiyoda",
    "streetAddress": "000",
    "certificationSystem": {
      "id": "urn:uuid:def09cbd-6e8e-4c73-856d-5e00dffde643",
      "type": "CertificationSystem",
      "name": "Fictitious Organization Verification Authority Existence Certification",
      "description": "This organization has been verified to exist through corporate registration inquiry and other means.",
      "ref": "https://ovac.exp.originator-profile.org/"
    },
    "certifier": "Fictitious Organization Verification Authority",
    "image": {
      "id": "https://ovac.exp.originator-profile.org/image.png",
      "digestSRI": "sha256-mnvgmCrOr6G7F3CqphnQxVDBeQob5EFstF/n7jNNVwg="
    }
  }
}
```

::::

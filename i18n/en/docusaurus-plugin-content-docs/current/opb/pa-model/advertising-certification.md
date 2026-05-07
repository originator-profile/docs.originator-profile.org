---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/7d651b3/docs/opb/pa-model/advertising-certification.md
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# Advertising Certification PA

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Profile Annotation (PA)
- Advertising Certification PA: Profile Annotation that guarantees the advertising certification of the OP-holding organization

## Advertising Certification PA Properties

It MUST comply with [Profile Annotation](../pa.md) .

### Property

#### Advertising Certification PA Properties {#advertising-certification-properties}

| Name                | Type       | Description                                                                                                                                                                            |
| ------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]` | **REQUIRED.** It MUST comply with [OP VC Data Model](../op-vc-data-model.md). In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.                       |
| `type`              | `string[]` | **REQUIRED.** It MUST be `["VerifiableCredential", "ProfileAnnotation"]`.                                                                                                              |
| `issuer`            | `string`   | **REQUIRED.** It MUST be the [OP ID](../op-id.md) of the PA issuer.                                                                                                                    |
| `credentialSubject` | `object`   | **REQUIRED.** A JSON-LD Node Object containing the following [credentialSubject properties](#credential-subject-properties).                                                           |
| `validFrom`         | `string`   | **OPTIONAL.** Conforms to the [Profile Annotation](../pa.md#profile-annotation-properties). Specify the earliest time on the date the advertising certification was issued.            |
| `validUntil`        | `string`   | **OPTIONAL.** Conforms to the [Profile Annotation](../pa.md#profile-annotation-properties). Specify the latest time for the expiration date and time of the advertising certification. |

#### credentialSubject Properties {#credential-subject-properties}

| Name          | Type     | Description                                                                                                                                                                                                                          |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`          | `string` | **REQUIRED.** The [OP ID](../op-id.md) of an organization holding the PA.                                                                                                                                                            |
| `type`        | `string` | **REQUIRED.** Set it to `AdvertisingQualityCertificate`.                                                                                                                                                                             |
| `name`        | `string` | **OPTIONAL.** The name of this PA.                                                                                                                                                                                                   |
| `description` | `string` | **OPTIONAL.** It is a description of this PA.                                                                                                                                                                                        |
| `image`       | `object` | **OPTIONAL.** MUST be a JSON-LD Node Object of type [`image` datatype](../context.md#the-image-datatype). This property allows you to [verify](../context.md#verifying-image-datatype) that the PA image has not been tampered with. |
| `verifier`    | `string` | **OPTIONAL.** The name of the verifier.                                                                                                                                                                                              |
| `annotation`  | `object` | **REQUIRED.** It MUST be a [Profile Annotation Policy](./pa-policy.md).                                                                                                                                                              |

## Appendix

### Example

_This section is non-normative._

Below is a concrete example of an advertising certification PA.

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
  "issuer": "dns:adcert.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "AdvertisingQualityCertificate",
    "image": {
      "id": "https://adcert.exp.originator-profile.org/image.png",
      "digestSRI": "sha256-3NHzrzdlO0zbE/57iK6kLKe8WtKR7ezVh7xL0q4poFg="
    },
    "verifier": "Fictitious Advertising Audit Bureau",
    "annotation": {
      "id": "urn:uuid:8029ece0-b327-4a7e-b586-3e442cb82d92",
      "type": "ProfileAnnotationPolicy",
      "name": "Fictitious Advertisement Certification Center Brand Safety Certified",
      "description": "This organization is committed to preventing the display of advertisements on illegal or inappropriate sites, content, or applications that could potentially harm the brand value of advertisers.",
      "ref": "https://adcert.exp.originator-profile.org/"
    }
  },
  "validFrom": "2024-03-31T15:00:00Z",
  "validUntil": "2030-03-31T14:59:59Z"
}
```

:::warning Migration Required

If you are using a previous format that extends [Certificate](../certificate.md), such as the one below, it will become unverifiable after 2027-01-01. The issuer MUST migrate to the format defined in this document by then.

---

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
- `certificationSystem.id`: REQUIRED. Specify the ID of the certification system in URI format.
- `certificationSystem.type`: REQUIRED. MUST be a `CertificationSystem`.
- `certificationSystem.name`: REQUIRED. The name of the certification system.
- `certificationSystem.description`: OPTIONAL. A description of the certification system (string).
- `certificationSystem.ref`: RECOMMENDED. The URL of a page people can read to learn more about the certification system.

#### `validFrom`

OPTIONAL. Conforms to the [Certificate Data Model](../certificate.md#certificate-properties). Specify the earliest time on the date the advertising certification was issued.

#### `validUntil`

OPTIONAL. Conforms to the [Certificate Data Model](../certificate.md#certificate-properties). Specify the latest time for the expiration date and time of the advertising certification.

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
      "id": "https://adcert.exp.originator-profile.org/image.png",
      "digestSRI": "sha256-3NHzrzdlO0zbE/57iK6kLKe8WtKR7ezVh7xL0q4poFg="
    },
    "validFrom": "2024-03-31T15:00:00Z",
    "validUntil": "2030-03-31T14:59:59Z"
  }
}
```

:::

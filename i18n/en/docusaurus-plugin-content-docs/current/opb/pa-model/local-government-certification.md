---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/7d651b3/docs/opb/pa-model/local-government-certification.md
tags:
  - Jurisdiction Specific Model
  - Profile Annotation
---

# Local Government Certification PA

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Profile Annotation (PA)
- Local Government Certification PA: A Profile Annotation that guarantees certification by the local government of the OP-holding organization.

## Local Government Certification PA Properties

It MUST comply with [Profile Annotation](../pa.md).

### Property

#### Local Government Certification PA Properties {/_ #local-government-certification-properties _/}

| Name                | Type       | Description                                                                                                                                                      |
| ------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]` | **REQUIRED.** It MUST comply with [OP VC Data Model](../op-vc-data-model.md). In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`. |
| `type`              | `string[]` | **REQUIRED.** It MUST be `["VerifiableCredential", "ProfileAnnotation"]`.                                                                                        |
| `issuer`            | `string`   | **REQUIRED.** It MUST be the [OP ID](../op-id.md) of the PA issuer.                                                                                              |
| `credentialSubject` | `object`   | **REQUIRED.** A JSON-LD Node Object containing the following [credentialSubject properties](#credential-subject-properties).                                     |

#### credentialSubject Properties {/_ #credential-subject-properties _/}

| Name          | Type     | Description                                                                                                                                                                                                                          |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`          | `string` | **REQUIRED.** The [OP ID](../op-id.md) of an organization holding the PA.                                                                                                                                                            |
| `type`        | `string` | **REQUIRED.** Set it to `JP-LocalGovernmentCertificate`.                                                                                                                                                                             |
| `name`        | `string` | **OPTIONAL.** The name of this PA.                                                                                                                                                                                                   |
| `description` | `string` | **OPTIONAL.** It is a description of this PA.                                                                                                                                                                                        |
| `image`       | `object` | **OPTIONAL.** MUST be a JSON-LD Node Object of type [`image` datatype](../context.md#the-image-datatype). This property allows you to [verify](../context.md#verifying-image-datatype) that the PA image has not been tampered with. |
| `annotation`  | `object` | **REQUIRED.** It MUST be a [Profile Annotation Policy](./pa-policy.md).                                                                                                                                                              |

:::note[Properties for local government certification PA outside of Japan are under consideration.]
:::

## Appendix

### Example

_This section is non-normative._

Below is a concrete example of a local government certification PA.

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
  "issuer": "dns:lgac.exp.originator-profile.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.jp",
    "type": "JP-LocalGovernmentCertificate",
    "image": {
      "id": "https://lgac.exp.originator-profile.org/image.png",
      "digestSRI": "sha256-sbXuUuLz8dhRdPPpoiu4U+sjWLqIjjzJ7DPGxDZYxNM="
    },
    "annotation": {
      "id": "urn:uuid:203a2553-f1a8-40ba-9df0-4e508aa8511d",
      "type": "ProfileAnnotationPolicy",
      "name": "Fictitious Local Government Authentication Center Local Government Certification",
      "description": "This organization is a local public entity organized and operated in accordance with the Local Autonomy Law.",
      "ref": "https://lgac.exp.originator-profile.org/"
    }
  }
}
```

::::warning Migration Required

If you are using a previous format that extends [Certificate](../certificate.md), such as the one below, it will become unverifiable after 2027-01-01. The issuer MUST migrate to the format defined in this document by then.

---

## Municipality Certification Certificate Properties

It MUST comply with [Certificate](../certificate.md).

### Property

#### `@context`

REQUIRED. It MUST comply with [OP VC Data Model](../op-vc-data-model.md). In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.

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

:::note[Properties for municipality certification certificates outside of Japan are under consideration.]
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
      "id": "https://lgac.exp.originator-profile.org/image.png",
      "digestSRI": "sha256-sbXuUuLz8dhRdPPpoiu4U+sjWLqIjjzJ7DPGxDZYxNM="
    }
  }
}
```

::::

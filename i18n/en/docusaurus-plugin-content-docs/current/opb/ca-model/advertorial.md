---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/2e21af3/docs/opb/ca-model/advertorial.md
tags:
  - Content Attestation
  - Web Media Specific Model
---

# Content Attestation of Advertorial

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Content Attestation (CA)

## Advertorial Properties

Complies with [Content Attestation](../ca.md).

### Property

#### Advertorial Properties {#advertorial-properties}

| Name                | Type                   | Description                                                                                                                                                       |
| ------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]`             | **REQUIRED.** It MUST comply with [OP VC Data Model](../op-vc-data-model.md). Additionally, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`. |
| `type`              | `string[]`             | **REQUIRED.** It MUST be `["VerifiableCredential", "ContentAttestation"]`.                                                                                        |
| `issuer`            | `string`               | **REQUIRED.** It MUST be the [OP ID](../op-id.md) of the CA issuer.                                                                                               |
| `credentialSubject` | `object`               | **REQUIRED.** A JSON-LD Node Object containing the following [credentialSubject properties](#credential-subject-properties).                                      |
| `allowedUrl`        | `string` \| `string[]` | **REQUIRED.** Properties defined for Content Attestation. It MUST NOT be an empty array.                                                                          |
| `target`            | `object[]`             | **REQUIRED.** Properties defined for Content Attestation. It MUST NOT be an empty array.                                                                          |

#### credentialSubject Properties {#credential-subject-properties}

| Name            | Type       | Description                                                                                                                                                                                                                                                                             |
| --------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`            | `string`   | **REQUIRED.** MUST be a CA ID. CA ID is a [UUIDv4](https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-4) URN format string. There is a one-to-one correspondence between content and CA IDs.                                                                                 |
| `type`          | `string`   | **REQUIRED.** It MUST be `Advertorial`.                                                                                                                                                                                                                                                 |
| `headline`      | `string`   | **REQUIRED.** Title of the advertorial.                                                                                                                                                                                                                                                 |
| `description`   | `string`   | **REQUIRED.** A description of the advertorial.                                                                                                                                                                                                                                         |
| `image`         | `object`   | **OPTIONAL.** A thumbnail image for the advertorial. RECOMMENDED if a thumbnail image is available. It MUST be a JSON-LD Node Object of type [`image` datatype](../context.md#the-image-datatype). This property allows you to [verify](../context.md#verifying-image-datatype) the CA. |
| `datePublished` | `string`   | **OPTIONAL.** Published date and time (ISO 8601).                                                                                                                                                                                                                                       |
| `dateModified`  | `string`   | **OPTIONAL.** Last modified date (ISO 8601).                                                                                                                                                                                                                                            |
| `author`        | `string[]` | **OPTIONAL.** An array of author names.                                                                                                                                                                                                                                                 |
| `editor`        | `string[]` | **OPTIONAL.** An array of editor names.                                                                                                                                                                                                                                                 |
| `sponsor`       | `string[]` | **OPTIONAL.** An array of sponsor names.                                                                                                                                                                                                                                                |
| `genre`         | `string`   | **OPTIONAL.** Genre.                                                                                                                                                                                                                                                                    |

## Appendix

### example

_This section is non-normative._

Below is an example of Advertorial.

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "en" }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "dns:example.com",
  "credentialSubject": {
    "id": "urn:uuid:78550fa7-f846-4e0f-ad5c-8d34461cb95b",
    "type": "Advertorial",
    "headline": "<Title of the Advertorial Web page>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-WNn1owxcJX6uwrNFOhPX+npz4j46s3a1cExjX5wWVxw="
    },
    "description": "<A description of Advertorial Web page>",
    "author": ["Jane Smith"],
    "editor": ["John Smith"],
    "sponsor": ["<Sponsor name>"],
    "datePublished": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z",
    "genre": "Arts & Entertainment"
  },
  "allowedUrl": ["https://media.example.com/articles/2024-06-30"],
  "target": [
    {
      "type": "VisibleTextTargetIntegrity",
      "cssSelector": "<CSS Selector>",
      "integrity": "sha256-GYC9PqfIw0qWahU6OlReQfuurCI5VLJplslVdF7M95U="
    },
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-+M3dMZXeSIwAP8BsIAwxn5ofFWUtaoSoDfB+/J8uXMo="
    }
  ]
}
```

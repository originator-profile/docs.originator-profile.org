---
tags:
  - Content Attestation
  - Web Media Specific Model
original: https://github.com/originator-profile/docs.originator-profile.org/blob/2886c02/docs/opb/ca-model/image.md
---

# Content Attestation of Image

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Content Attestation (CA)

## Image Data Model

Follows [Content Attestation](../ca.md).

### Properties

#### List of Image Properties {#image-properties}

| Name                | Type                   | Description                                                                                                                                                      |
| ------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]`             | **REQUIRED.** You MUST follow the [OP VC Data Model](../op-vc-data-model.md). Furthermore, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`. |
| `type`              | `string[]`             | **REQUIRED.** It MUST be set to `["VerifiableCredential", "ContentAttestation"]`.                                                                                |
| `issuer`            | `string`               | **REQUIRED.** It MUST be the [OP ID](../op-id.md) of the CA issuer.                                                                                              |
| `credentialSubject` | `object`               | **REQUIRED.** A JSON-LD Node Object containing the following [credentialSubject properties](#credential-subject-properties).                                     |
| `allowedUrl`        | `string` \| `string[]` | **REQUIRED.** It is a property defined for Content Attestation. It MUST NOT be an empty array.                                                                   |
| `target`            | `object[]`             | **REQUIRED.** It is a property defined for Content Attestation. It MUST NOT be an empty array.                                                                   |

#### List of properties for `credentialSubject` {#credential-subject-properties}

| Name             | Type       | Description                                                                                                                                                                                                                                                                                    |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `string`   | **REQUIRED.** It MUST be a CA ID. A CA ID is a string in URN format representing a [UUIDv4](https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-4). There is a one-to-one correspondence between content and a CA ID.                                                                |
| `type`           | `string`   | **REQUIRED.** It MUST be an `Image`.                                                                                                                                                                                                                                                           |
| `name`           | `string`   | **REQUIRED.** This is the title of the image.                                                                                                                                                                                                                                                  |
| `description`    | `string`   | **REQUIRED.** This is a description of the image.                                                                                                                                                                                                                                              |
| `image`          | `object`   | **OPTIONAL.** This is a thumbnail image. It should be provided if a thumbnail is available (RECOMMENDED). It MUST be a JSON-LD Node Object of the [`image` data type](../context.md#the-image-datatype). This property can be used to [verify](../context.md#verifying-image-datatype) the CA. |
| `dateCreated`    | `string`   | **OPTIONAL.** This is the creation timestamp. It MUST be of the [`dateTimeStamp` data type](../context.md#the-datetimestamp-datatype).                                                                                                                                                         |
| `dateModified`   | `string`   | **OPTIONAL.** This is the last-updated timestamp. It MUST be of the [`dateTimeStamp` data type](../context.md#the-datetimestamp-datatype).                                                                                                                                                     |
| `creator`        | `string[]` | **OPTIONAL.** This is an array of creators.                                                                                                                                                                                                                                                    |
| `encodingFormat` | `string`   | **OPTIONAL.** This is the encoding format for the content. It MUST be a [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types).                                                                                                                                      |
| `genre`          | `string`   | **OPTIONAL.** It is a genre.                                                                                                                                                                                                                                                                   |

## Appendix

### Example

_This section is non-normative._

The following is an example of a Content Attestation for an image.

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
    "type": "Image",
    "name": "<Image Title>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-WNn1owxcJX6uwrNFOhPX+npz4j46s3a1cExjX5wWVxw="
    },
    "description": "<Image description>",
    "dateCreated": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z",
    "creator": ["Jane Smith"],
    "encodingFormat": "image/png",
    "genre": "Arts & Entertainment"
  },
  "allowedUrl": ["https://media.example.com/*"],
  "target": [
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-+M3dMZXeSIwAP8BsIAwxn5ofFWUtaoSoDfB+/J8uXMo="
    }
  ]
}
```

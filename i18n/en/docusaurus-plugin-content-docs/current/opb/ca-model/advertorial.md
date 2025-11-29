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

#### `@context`

REQUIRED. It MUST complies with [OP VC Data Model](../op-vc-data-model.md) . Additionally, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.

#### `type`

REQUIRED. It MUST be `["VerifiableCredential", "ContentAttestation"]`.

#### `credentialSubject`

This is a JSON-LD Node Object that represents the advertorial. The application developed by Originator Profile Collaborative Innovation Partnership (OP-CIP) uses the following properties:

- `type`: REQUIRED. It MUST be `Advertorial`.
- `headline`: REQUIRED. Title of the advertorial.
- `description`: REQUIRED. A description of the advertorial (string).
- `image`: OPTIONAL. A thumbnail image for the advertorial. RECOMMENDED if a thumbnail image is available. It MUST be a JSON-LD Node Object of type [`image` datatype](../context.md#the-image-datatype). This property allows you to [verify](../context.md#image-datatype-validate) the CA.
- `datePublished`: OPTIONAL. Published date and time (ISO 8601)
- `dateModified`: OPTIONAL. Last modified date (ISO 8601)
- `author`: OPTIONAL. An array of author names (strings)
- `editor`: OPTIONAL. An array of editor names (strings)
- `sponsor`: OPTIONAL. An array of sponsor names (strings)
- `genre`: OPTIONAL. Genre (string)

#### `allowedUrl`

REQUIRED. Properties defined for Content Attestation. It MUST NOT be an empty array.

#### `target`

REQUIRED. Properties defined for Content Attestation. It MUST NOT be an empty array.

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

---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/a92c90a/docs/opb/ca-guide/online-ad.md
tags:
  - Content Attestation
  - Web Media Specific Model
---

# Content Attestation of Online Ad Type

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Content Attestation (CA)

## Online Ad Data Model

### Property

#### `@context`

REQUIRED. It MUST follow the [OP VC Data Model](../op-vc-data-model.md). In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`.

#### `type`

REQUIRED. It MUST be `["VerifiableCredential", "ContentAttestation"]`.

#### `credentialSubject`

It is a JSON-LD Node Object representing the ad, containing the following properties:

:::note

The properties within `credentialSubject` were decided with reference to https://schema.org/CreativeWork.
We plan to decide the extent to which we will comply with schema.org regarding the interpretation of each property and whether it is necessary or not, based on discussions with companies that use OP.

:::

- `type`: REQUIRED. It MUST be `OnlineAd`.
- `name`: REQUIRED. It is the title of the ad.
- `description`: REQUIRED. It is ad description (plain text)
- `image`: OPTIONAL. It is a thumbnail image for the ad. It is RECOMMENDED that a thumbnail image be specified if one is available. It MUST be a JSON-LD Node Object of type [`image` datatype](../context.md#the-image-datatype). This property allows you to [verify](../context.md#image-datatype-validate) the CA.
- `genre`: OPTIONAL. It is character string.
- `landingPageUrl`: OPTIONAL. The URL of the page (landing page) that is ultimately displayed when the ad is clicked.

#### `allowedUrl`

REQUIRED. It is a property defined for Content Attestation. It MUST NOT be an empty array.

#### `target`

REQUIRED. It is a property defined for Content Attestation. It MUST NOT be an empty array.

## Appendix

### Example

_This section is non-normative_

Below is an example of Advertisement.

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
    "type": "OnlineAd",
    "name": "<Title of Advertisement>",
    "description": "<a description of Advertisement>",
    "image": {
      "id": "https://ad.example.com/image.png",
      "digestSRI": "sha256-5uQVtkoRdTFbimAz3Wz5GQcuBRLt7tDMD5JRtGFo9/M="
    },
    "landingPageUrl": "https://advertiser.example.com"
  },
  "allowedUrl": ["https://ad.example.com/*"],
  "target": [
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-rLDPDYArkNcCvnq0h4IgR7MVfJIOCCrx4z+w+uywc64="
    }
  ]
}
```

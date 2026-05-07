---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/10e55fd/docs/opb/ca-model/online-ad.md
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

#### Online Ad Properties {#online-ad-properties}

| Name                | Type                   | Description                                                                                                                                                     |
| ------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]`             | **REQUIRED.** It MUST follow the [OP VC Data Model](../op-vc-data-model.md). In addition, the third value MUST be `"https://originator-profile.org/ns/cip/v1"`. |
| `type`              | `string[]`             | **REQUIRED.** It MUST be `["VerifiableCredential", "ContentAttestation"]`.                                                                                      |
| `issuer`            | `string`               | **REQUIRED.** It MUST be the [OP ID](../op-id.md) of the CA issuer.                                                                                             |
| `credentialSubject` | `object`               | **REQUIRED.** A JSON-LD Node Object containing the following [credentialSubject properties](#credential-subject-properties).                                    |
| `allowedUrl`        | `string` \| `string[]` | **REQUIRED.** It is a property defined for Content Attestation. It MUST NOT be an empty array.                                                                  |
| `target`            | `object[]`             | **REQUIRED.** It is a property defined for Content Attestation. It MUST NOT be an empty array.                                                                  |

#### credentialSubject Properties {#credential-subject-properties}

:::info[Attention]
The `name`, `description`, and `image` properties are each OPTIONAL, but at least one of the three MUST be included.
:::

| Name                   | Type     | Description                                                                                                                                                                                                                                                                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string` | **REQUIRED.** MUST be a CA ID. CA ID is a [UUIDv4](https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-4) URN format string. There is a one-to-one correspondence between content and CA IDs.                                                                                                          |
| `type`                 | `string` | **REQUIRED.** It MUST be `OnlineAd`.                                                                                                                                                                                                                                                                             |
| `name`                 | `string` | **OPTIONAL.** It is the title of the ad.                                                                                                                                                                                                                                                                         |
| `description`          | `string` | **OPTIONAL.** It is ad description.                                                                                                                                                                                                                                                                              |
| `image`                | `object` | **OPTIONAL.** It is a thumbnail image for the ad. It is RECOMMENDED that a thumbnail image be specified if one is available. It MUST be a JSON-LD Node Object of type [`image` datatype](../context.md#the-image-datatype). This property allows you to [verify](../context.md#verifying-image-datatype) the CA. |
| `genre`                | `string` | **OPTIONAL.** Genre.                                                                                                                                                                                                                                                                                             |
| `landingPageUrl`       | `string` | **OPTIONAL.** The URL of the page (landing page) that is ultimately displayed when the ad is clicked.                                                                                                                                                                                                            |
| `adReportContact`      | `object` | **OPTIONAL.** Contact point for reporting ads. MUST be a JSON-LD Node Object of type [`page` datatype](../context.md#the-page-datatype).                                                                                                                                                                         |
| `adReviewGuidelines`   | `object` | **OPTIONAL.** Information about ad review guidelines. MUST be a JSON-LD Node Object of type [`page` datatype](../context.md#the-page-datatype).                                                                                                                                                                  |
| `targetingPolicy`      | `object` | **OPTIONAL.** Policy regarding targeted advertising. MUST be a JSON-LD Node Object of type [`page` datatype](../context.md#the-page-datatype).                                                                                                                                                                   |
| `adDataHandlingPolicy` | `object` | **OPTIONAL.** Information regarding the handling of information related to ad serving. MUST be a JSON-LD Node Object of type [`page`](../context.md#the-page-datatype).                                                                                                                                          |
| `adDisplayRationale`   | `object` | **OPTIONAL.** A JSON-LD Node Object containing the following [adDisplayRationale Properties](#ad-display-rationale-properties).                                                                                                                                                                                  |

#### adDisplayRationale Properties {#ad-display-rationale-properties}

| Name          | Type     | Description                                                                                                                                     |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `page`        | `object` | **OPTIONAL.** The reason this ad is being displayed(web page). MUST be a JSON-LD Node Object of type [`page`](../context.md#the-page-datatype). |
| `description` | `string` | **OPTIONAL.** The reason this ad is being displayed.                                                                                            |

:::note

The properties within `credentialSubject` were decided with reference to https://schema.org/CreativeWork.
We plan to decide the extent to which we will comply with schema.org regarding the interpretation of each property and whether it is necessary or not, based on discussions with companies that use OP.

:::

:::note

The definition of properties for advertisements other than image or banner ads is under consideration for future work.

:::

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
    "landingPageUrl": "https://advertiser.example.com",
    "adReportContact": {
      "id": "https://ad.example.com/contact",
      "name": "Contact point for reporting ads"
    },
    "adReviewGuidelines": {
      "id": "https://ad.example.com/guidelines",
      "name": "Information about ad review guidelines"
    },
    "targetingPolicy": {
      "id": "https://ad.example.com/targeting",
      "name": "Policy regarding targeted advertising"
    },
    "adDataHandlingPolicy": {
      "id": "https://ad.example.com/datahandling",
      "name": "Information regarding the handling of information related to ad serving"
    },
    "adDisplayRationale": {
      "page": {
        "id": "https://ad.example.com/rationale",
        "name": "The reason this ad is being displayed"
      },
      "description": "Because it's relevant to the content you're currently viewing."
    }
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

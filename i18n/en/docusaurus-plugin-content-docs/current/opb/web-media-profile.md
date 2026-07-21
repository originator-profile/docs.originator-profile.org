---
sidebar_position: 28
original: https://github.com/originator-profile/docs.originator-profile.org/blob/c6370d4/docs/opb/web-media-profile.md
tags:
  - Web Media Specific Model
---

# Web Media Profile

## Terminology

For terms not explained in this document, please see [Terminology](./terminology.md).

- OP VC Data Model Conforming Document (OP VC DM Compliance Document)
- Originator Profile Identifier (OP ID)
- Web Media Profile (WMP)

## Web Media Profile (WMP) Data Model

The Web Media Profile MUST be an OP VC DM compliant document and includes the following properties:

### Property {#properties}

#### Web Media Profile (WMP) Properties {#web-media-profile-properties}

| Name                | Type       | Description                                                                                                                  |
| ------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `@context`          | `string[]` | **REQUIRED.** It MUST conform to the [OP VC Data Model](./op-vc-data-model.md#vc-properties).                                |
| `type`              | `string[]` | **REQUIRED.** It MUST be `["VerifiableCredential", "WebMediaProfile"]`.                                                      |
| `issuer`            | `string`   | **REQUIRED.** It MUST be the issuer of the Core Profile of the WMP holder organization.                                      |
| `credentialSubject` | `object`   | **REQUIRED.** A JSON-LD Node Object containing the following [credentialSubject properties](#credential-subject-properties). |

#### credentialSubject Properties {#credential-subject-properties}

| Name                            | Type                   | Description                                                                                                                                                                                                                                                                      |
| ------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                            | `string`               | **REQUIRED.** It MUST be the [OP ID](./op-id.md) of the WMP holding organization.                                                                                                                                                                                                |
| `type`                          | `string`               | **REQUIRED.** It MUST be `OnlineBusiness`.                                                                                                                                                                                                                                       |
| `url`                           | `string`               | **REQUIRED.** The URL MUST point to an official page of your organization.                                                                                                                                                                                                       |
| `name`                          | `string`               | **REQUIRED.** The organization name.                                                                                                                                                                                                                                             |
| `logo`                          | `object`               | **OPTIONAL.** The logo image of your organization. It MUST be a JSON-LD Node Object of type [`image` datatype](./context.md#the-image-datatype). This property allows you to [verify](./context.md#verifying-image-datatype) that the WMP logo image has not been tampered with. |
| `email`                         | `string`               | **OPTIONAL.** The main email address of your organization.                                                                                                                                                                                                                       |
| `telephone`                     | `string`               | **OPTIONAL.** The main phone number of your organization.                                                                                                                                                                                                                        |
| `contactPoint`                  | `object`               | **OPTIONAL.** Contact page information. It MUST be a JSON-LD Node Object of type [`page` datatype](./context.md#the-page-datatype).                                                                                                                                              |
| `informationTransmissionPolicy` | `object`               | **OPTIONAL.** Information about the information transmission policy page. It MUST be a JSON-LD Node Object of type [`page` datatype](./context.md#the-page-datatype).                                                                                                            |
| `publishingPrinciple`           | `object`               | **OPTIONAL.** Information about the editorial guidelines. It MUST be a JSON-LD Node Object of type [`page` datatype](./context.md#the-page-datatype).                                                                                                                            |
| `privacyPolicy`                 | `object`               | **OPTIONAL.** Privacy policy page information. It MUST be a JSON-LD Node Object of type [`page` datatype](./context.md#the-page-datatype).                                                                                                                                       |
| `description`                   | `object` \| `object[]` | **OPTIONAL.** A free-form text about the organization. It MUST be of [`description` datatype](./context.md#the-description-datatype) or an array of such type.                                                                                                                   |

:::note

For operational guidance on VC signature validity period (`iat`, `exp`), refer to [Validity Period of OP, SP, and CA](../tech/validity-period.mdx).

:::

:::note

The information contained in the WMP will be reviewed by the organization that issues the Core Profile.

:::

:::note

The information transmission policy to be included in the `informationTransmissionPolicy` property is a required condition for granting an OP ID under Article 3, Paragraph 1 of the [Originator Profile Charter](https://originator-profile.org/en-US/charter/).

:::

:::note

The specification is currently under consideration to include the signature of the WMP holder organization on a part of the WMP, such as the `informationTransmissionPolicy` property, or on the entire WMP, to verify the Originator Profile organization's explicit affirmation of compliance with Article 3, Paragraph 1 of the Charter.

- Signature by the WMP holder organization on a part of the WMP (e.g., the `informationTransmissionPolicy` property): Adding a property in the [JWS Compact Serialization](https://www.rfc-editor.org/rfc/rfc7515.html#section-3.1) format.
- Dual signature by the issuer and the WMP holder organization on the entire WMP: Signing the WMP using the [JWS JSON Serialization](https://www.rfc-editor.org/rfc/rfc7515.html#section-3.2) format.

:::

:::note

When the `description` property contains two or more elements of the `description` datatype, the intention should be to represent the same text content in multiple encoding formats. Furthermore, if text content is provided in multiple encoding formats, we recommend that one of the elements be `text/plain` content so that application implementers can comply with their defined security policy.

:::

## Extensibility

Issuers MAY add properties not defined in the [OP VC Data Model](./op-vc-data-model.md) and in this document, but are RECOMMENDED to extend them in accordance with [Verifiable Credentials Data Model 2.0 Section 5.2](https://www.w3.org/TR/vc-data-model-2.0/#extensibility).

## Appendix

### Example

_This section is non-normative_

Below is an example of WMP

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    { "@language": "en" }
  ],
  "type": ["VerifiableCredential", "WebMediaProfile"],
  "issuer": "dns:wmp-issuer.example.org",
  "credentialSubject": {
    "id": "dns:wmp-holder.example.jp",
    "type": "OnlineBusiness",
    "url": "https://www.wmp-holder.example.jp/",
    "name": "ABC media (* Development Sample)",
    "logo": {
      "id": "https://www.wmp-holder.example.jp/logo.svg",
      "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
    },
    "email": "contact@wmp-holder.example.jp",
    "telephone": "0000000000",
    "contactPoint": {
      "id": "https://wmp-holder.example.jp/contact",
      "name": "inquiry"
    },
    "informationTransmissionPolicy": {
      "id": "https://wmp-holder.example.jp/statement",
      "name": "Information Transmission Policy"
    },
    "publishingPrinciple": {
      "id": "https://wmp-holder.example.jp/editorial-guidelines",
      "name": "Editorial Guidelines"
    },
    "privacyPolicy": {
      "id": "https://wmp-holder.example.jp/privacy",
      "name": "Privacy Policy"
    },
    "description": [
      {
        "text": "This text is supplementary information about this web media.",
        "encodingFormat": "text/plain"
      },
      {
        "text": "<p>This text is supplementary information about this web media.</p>",
        "encodingFormat": "text/html"
      }
    ]
  }
}
```

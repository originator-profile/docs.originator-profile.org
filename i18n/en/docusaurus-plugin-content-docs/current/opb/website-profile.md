---
sidebar_position: 5
original: https://github.com/originator-profile/docs.originator-profile.org/blob/9ceac67/docs/opb/website-profile.md
---

# Website Profile (WSP) Data Model

## Terminology

For terms not explained in this document, please see [Terminology](./terminology.md).

- Originator Profile Identifier (OP ID)
- OP VC Data Model Conforming Document (OP VC DM Compliance Document)
- Website Profile (WSP)

## Website Profile Data Model

The Website Profile MUST be an OPVC DM compliant document and includes the following properties:

### `@context`

REQUIRED. It MUST conform to the [OP VC Data Model](./op-vc-data-model.md#context) and MUST have the third value set to `"https://originator-profile.org/ns/cip/v1"`.

### `type`

REQUIRED. It MUST be `["VerifiableCredential", "WebsiteProfile"]`.

### `issuer`

REQUIRED. It MUST be the OP ID of the organization owning the website.

### `credentialSubject`

REQUIRED. It is a JSON-LD Node Object with the following properties:

#### `id`

REQUIRED. It MUST be the Web site URL. If the same content exists on multiple URLs, specify the most representative URL.

#### `type`

REQUIRED. It MUST be `WebSite`.

#### `name`

REQUIRED. The name of the Web site.

#### `image`

OPTIONAL. A thumbnail image for the website. It MUST be a JSON-LD Node Object of type [`image` datatype](./context.md#the-image-datatype). This property allows you to [verify](./context.md#image-datatype-validation) that the thumbnail image in the WSP has not been tampered with.

#### `description`

OPTIONAL. A description of the Web site.

#### `allowedOrigin`

REQUIRED. A string or array of strings that represents the [RFC 6454](https://www.rfc-editor.org/rfc/rfc6454) origin (scheme, hostname, port number) in ASCII format to identify the website to be presented. It MUST NOT include a path, query, or fragment. In addition, the default port (e.g. 443 for `https:`, 80 for `http:`) is expressed in an abbreviated format based on the [W3C URL Standard](https://url.spec.whatwg.org/).
This property allows you to [verify](#verification) whether the WSP is installed on a website of a legitimate origin.

Examples:

✅ Valid:

- `https://example.com` (the default port 443 for the `https:` scheme is omitted)
- `http://example.com:8080` (not the default port, so be explicit)

❌ Invalid:

- `https://example.com/` (path included)
- `https://example.com/path` (path included)
- `http://example.com/?query=1` (query included)
- `https://example.com#section` (fragment included)

## Verification process {#verification}

The WSP verifier can verify the following:

- [Verification of VC conformance to the OP VC Data Model](./op-vc-data-model.md#verification)
- `allowedOrigin` verification

### Verification of `allowedOrigin`

The verifier can verify the `allowedOrigin` property by following these steps (OPTIONAL):

1. Get the URL origin of the web page that presented the WSP.
2. Check whether the string in the `allowedOrigin` property matches the URL origin obtained in 1\.

## Appendix

### Example

_This section is non-normative._

Below is a non-normative example of Website Profile Data Model.

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "en" }
  ],
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "dns:example.com",
  "credentialSubject": {
    "id": "https://media.example.com",
    "type": "WebSite",
    "name": "<Title of Web site>",
    "description": "<Description of Web site>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-Upwn7gYMuRmJlD1ZivHk876vXHzokXrwXj50VgfnMnY="
    },
    "allowedOrigin": ["https://media.example.com"]
  }
}
```

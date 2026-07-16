---
sidebar_position: 2
original: https://github.com/originator-profile/docs.originator-profile.org/blob/798ebea/docs/tutorial/cas-setup-guide.md
---

# Setting Up Content Attestation

## Objective

Enable verification of Content Attestation (CA).

## Method

Use the OP(s) included in the `originators` property of `/.well-known/sp.json` and the Content Attestation Set (CAS) within the HTML. Please review the [Site Profile Setup Guide](./sp-setup-guide.md) beforehand.

:::note

**Adding OPs**

OPs for all Content Attestation issuers are required to verify the Content Attestation Set.

You can add OPs by following the steps in the [Site Profile Setup Guide](./sp-setup-guide.md) or by embedding the OP directly into the HTML using a `<script>` element.

Example:

```html
<script type="application/ops+json">
  [
    {
      "core": "eyJ...",
      "annotations": ["eyJ..."],
      "media": ["eyJ..."]
    }
  ]
</script>
```

For details on how to embed an OP into HTML, please refer to [Linking Content Attestation Set and Originator Profile Set to A HTML Document](https://docs.originator-profile.org/opb/link-to-html/).

:::

:::note[If you cannot register an OP]

If you are unable to register an OP, you can issue a Content Attestation using the Content Attestation Server Playground (a test environment).
For details, please refer to the [Content Attestation Server Playground API documentation](https://playground.originator-profile.org/#tag/ca/POST/ca).

Content Attestations issued using the Content Attestation Server Playground cannot be used in the production environment. For details, please refer to [Content Attestation Server Playground](/playground/).

:::

## Procedure

Perform the necessary steps to make an article or content OP-compliant. This process is **required every time** an article or content is created or updated.

1. [Create Content Attestation (CA)](#step1): Create a corresponding Content Attestation (CA) when creating the article or content.
2. [Create Content Attestation Set (CAS)](#step2): Create a Content Attestation Set that includes the list of Content Attestations on the page.
3. [Add Content Attestation Set](#step3): Add the Content Attestation Set to the page HTML. This reference is implemented using a `script` element.

## Step 1. Create Content Attestation {#step1}

The following methods are available for creating a Content Attestation:

- [Using the CA Server](#ca-server): Use the [`/ca`](https://playground.originator-profile.org/#tag/ca) endpoint.
- Using the OPVC CLI: Use the `opvc ca:sign` command.
- [Using jwt.io](https://jwt.io): Use the specified JSON format.

### Using the CA Server {#ca-server}

:::note

This section, "Using the CA Server," describes the process based on the Content Attestation Server Playground.
While the Playground and the production CA Server share the same API specifications, their authentication procedures differ. If you are using a production CA server, the authentication procedure differs; please configure it according to the manual provided by your server.

:::

Create it using the [`/ca`](https://playground.originator-profile.org/#tag/ca) endpoint.

You can register it by sending a POST request with the required parameters included in the request body.

This endpoint is also used for updates. If Content Attestation (CA) is already registered, it updates the existing CA.

For details, please refer to the [Content Attestation Server Playground API documentation](https://playground.originator-profile.org/#tag/ca/POST/ca).

Example:

```
$ curl -X POST https://playground.originator-profile.org/ca \
    -H content-type:application/json \
    -u Basic AuthenticationUsername:BasicAuthenticationPassword \
    -d '{...}'
```

After execution, the string starting with "eyJ" displayed in the console is the Content Attestation.

The specified file must be in the following format.

article-content-attestation.example.json

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    {
      "@language": "<Language/Region Code>"
    }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "<OP ID>",
  "credentialSubject": {
    "id": "<CA ID (Optional at registration; required at updating)>",
    "type": "Article",
    "headline": "<Content Title>",
    "description": "<Content Description>",
    "image": {
      "id": "<Thumbnail Image URL>",
      "content": "<Content (data:// format URL)>"
    },
    "datePublished": "<Publication Date/Time>",
    "dateModified": "<Last Modified Date/Time>",
    "author": ["<Author Name>"],
    "editor": ["<Editor Name>"],
    "genre": "<Genre>"
  },
  "allowedUrl": ["<URL Pattern of the webpage permitted to use the CA>"],
  "target": [
    {
      "type": "<Type of Content Integrity Descriptor>",
      "content": "<Content Body (text/html or URL)>",
      "cssSelector": "<CSS Selector (optional)>"
    }
  ],
  "issuedAt": "<Issuance Date/Time (optional)>",
  "expiredAt": "<Expiration Date/Time (optional)>"
}
```

Example:

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    {
      "@language": "en-US"
    }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "type": "Article",
    "headline": "Originator Profile Verification Site",
    "description": "This is an Originator Profile verification site.",
    "image": {
      "id": "https://example.com/image.svg",
      "content": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="
    },
    "author": ["Jane Smith"],
    "editor": ["John Smith"],
    "datePublished": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z",
    "genre": "Arts & Entertainment"
  },
  "allowedUrl": ["https://media.example.com/articles/2024-06-30"],
  "target": [
    {
      "type": "VisibleTextTargetIntegrity",
      "cssSelector": "h1",
      "content": "<!doctype html><html><head></head><body><h1>Originator Profile Verification Site</h1></body></html>"
    },
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-+M3dMZXeSIwAP8BsIAwxn5ofFWUtaoSoDfB+/J8uXMo="
    }
  ]
}
```

Please refer to the following documents for details on the properties:

- [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/)
- [Content Attestation of Article Type](https://docs.originator-profile.org/opb/ca-model/article/)
- [`/ca`](https://playground.originator-profile.org/#tag/ca)

### Alternative Method: Using the OPVC CLI

Create it using the `opvc ca:sign` command.
For details, please refer to the [OPVC CLI documentation](/opvc-cli/#publish-content-attestation).

Example:

```
$ opvc ca:sign -i ./account-key.example.priv.json --input ./article-content-attestation.example.json
eyJ...
```

After execution, the string starting with "eyJ" displayed in the console is the Content Attestation.

Please check the [OPVC CLI installation instructions](/opvc-cli/#install) for how to install the OPVC CLI.

Specify the private key for the `-i` option.

Specify the information regarding the Content Attestation in JSON format for the `--input` option.

The file to be specified follows this format:

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    {
      "@language": "<Language/Region Code>"
    }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "<OP ID>",
  "credentialSubject": {
    "type": "Article",
    "headline": "<Content Title>",
    "description": "<Content Description>",
    "image": {
      "id": "<Thumbnail Image URL>",
      "content": "<Content (file:// format also accepted)>"
    },
    "datePublished": "<Publication Date/Time>",
    "dateModified": "<Last Modified Date/Time>",
    "author": ["<Author Name>"],
    "editor": ["<Editor Name>"],
    "genre": "<Genre>"
  },
  "allowedUrl": ["<URL pattern of the web page that allows the use of the CA>"],
  "target": [
    {
      "type": "<Type of Content Integrity Descriptor>",
      "cssSelector": "<CSS Selector>"
    }
  ]
}
```

Example:

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    {
      "@language": "en-US"
    }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "type": "Article",
    "headline": "<Web page Title>",
    "description": "<Web page Description>",
    "image": {
      "id": "https://example.com/image.webp",
      "content": "file:///path/to/image.webp"
    },
    "author": ["Jane Smith"],
    "editor": ["John Smith"],
    "datePublished": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z",
    "genre": "Arts & Entertainment"
  },
  "allowedUrl": ["https://media.example.com/articles/2024-06-30"],
  "target": [
    {
      "type": "VisibleTextTargetIntegrity",
      "cssSelector": "<CSS Selector>"
    },
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-+M3dMZXeSIwAP8BsIAwxn5ofFWUtaoSoDfB+/J8uXMo="
    }
  ]
}
```

For details on the properties, please refer to the [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/) and [Content Attestation of Article Type](https://docs.originator-profile.org/opb/ca-model/article/).

### Alternative Method: Using [jwt.io](https://jwt.io)

Create a JWT using the specified JSON format.

Visit the [JSON Web Token (JWT) Debugger](https://jwt.io) and select the "JWT Encoder" option.
Then, enter the appropriate values for the "Header," "Payload," and "Sign JWT" sections on the left side of the screen.

Example:

Enter the following into the "Header" section of the JSON Web Token (JWT) Debugger screen.

```json
{
  "alg": "ES256",
  "kid": "jJYs5_ILgUc8180L-pBPxBpgA3QC7eZu9wKOkh9mYPU",
  "typ": "vc+jwt",
  "cty": "vc"
}
```

The `kid` in the header is the JWK Thumbprint. Change it to the same value as the `kid` property of the private key.

Enter the following into the "Payload" section of the JSON Web Token (JWT) screen.

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    {
      "@language": "en-US"
    }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "iss": "dns:media.example.com",
  "sub": "urn:uuid:41632705-9600-49df-b80d-a357d474f37e",
  "iat": 1687827458,
  "exp": 1719449858,
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "id": "urn:uuid:41632705-9600-49df-b80d-a357d474f37e",
    "type": "Article",
    "headline": "<Web page Title>",
    "image": {
      "id": "https://example.com/image.webp",
      "digestSRI": "sha256-WNn1owxcJX6uwrNFOhPX+npz4j46s3a1cExjX5wWVxw="
    },
    "description": "<Web page Description>",
    "author": ["Jane Smith"],
    "editor": ["John Smith"],
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

Replace the `iss` and `issuer` values in the payload with your own OP ID.

Example:

```
dns:media.example.com
```

Generate a UUID and overwrite the values of `sub` and `credentialSubject.id` in the payload with a string consisting of the generated UUID prefixed with `urn:uuid:`.

Example:

```
$ uuidgen
41632705-9600-49df-b80d-a357d474f37e
: In this case, it becomes "urn:uuid:41632705-9600-49df-b80d-a357d474f37e".
```

For details on the properties, please refer to the [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/) and [Content Attestation of Article Type](https://docs.originator-profile.org/opb/ca-model/article/).

On the JSON Web Token (JWT) screen, under "Sign JWT," set the "Private Key Format" to "JWK" and paste your account's private key.

Once you paste the private key, the JWT will appear on the right side of the screen. The string starting with "eyJ" obtained at this point is the CA.

## Step 2. Creating a Content Attestation Set {#step2}

Create the Content Attestation Set by including a list of the Content Attestations found on the page.

Example:

```json
["eyJ..."]
```

_From "[Content Attestation Set](https://docs.originator-profile.org/opb/content-attestation-set/)"_

Content Attestation Set is an array of Content Attestations.

## Step 3. Adding the Content Attestation Set {#step3}

Add the Content Attestation Set to the page HTML. Use the following script tag:

Example:

```html
<script type="application/cas+json">
  ["eyJ..."]
</script>
```

For details, please refer to [Linking Content Attestation Set and Originator Profile Set to A HTML Document](https://docs.originator-profile.org/opb/link-to-html/).

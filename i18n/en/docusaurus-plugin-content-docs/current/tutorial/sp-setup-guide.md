---
sidebar_position: 1
original: https://github.com/originator-profile/docs.originator-profile.org/blob/798ebea/docs/tutorial/sp-setup-guide.md
---

# Setting Up the Site Profile

## Objective

Enable the entire site for OP (Originator Profile).

## Method

Use the originators registered with OP to issue a Website Profile, then create and deploy the Site Profile.

:::note[If OP registration is not possible]

If you cannot register with OP, you can issue a Site Profile using the Content Attestation Server Playground (a test environment).
For details, please check the [Site Profile Issuance section of the Content Attestation Server Playground](/playground/#issue-site-profile).

Profiles issued using the Content Attestation Server Playground cannot be used in a production environment. Please see the [Content Attestation Server Playground](/playground/) for details.

:::

## Procedure

Follow the steps below to enable the entire site for OP:

1. [Create the Website Profile](#step1)
2. [Create and deploy `/.well-known/sp.json`](#step2)

## Step 1. Create the Website Profile {#step1}

You can create a Website Profile using any of the following methods:

- Using the CA Server: Use the [`/wsp`](https://playground.originator-profile.org/#tag/wsp) endpoint.
- Using the OPVC CLI: Use the [`opvc wsp:sign`](https://github.com/originator-profile/originator-profile/tree/main/packages/opvc) command.
- Using [jwt.io](https://jwt.io): Use the specified JSON format.

*Note: You can also skip the separate Website Profile creation step and proceed directly to Site Profile creation (the Website Profile is created as part of the Site Profile creation process).
For details, please refer to [How to create a Site Profile using the CA Server](#site-profile-ca-server).

### How to Use the CA Server {#ca-server}

:::note

This section, "How to Use the CA Server," describes the process based on the Content Attestation Server Playground.
While the Playground and production CA Servers share the same API specifications, their authentication procedures differ.

If you are using a production CA Server, please follow the documentation provided by your specific server, as the authentication procedure will be different.

:::

Send a POST request to the [`/wsp`](https://playground.originator-profile.org/#tag/wsp) endpoint.

You can register by sending a POST request with the required parameters included in the request body.

This endpoint is also used for updates; if a Website Profile (WSP) is already registered, it will update the existing WSP.

For details, please refer to the [Content Attestation Server Playground API documentation](https://playground.originator-profile.org/#tag/wsp/POST/wsp).

Example:

```
$ curl -X POST https://playground.originator-profile.org/wsp \
    -H content-type:application/json \
    -u Basic Authentication Username:Basic Authentication Password \
    -d '[{...}]'
```

After execution, the string starting with "eyJ" displayed in the console is the WSP.

The specified file must be in the following format.

website-profile.example.json

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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "<OP ID>",
  "credentialSubject": {
    "id": "<WebサイトのURL(形式: https://<Hostname>/)>",
    "allowedOrigin": ["<Website origin (format: https://<hostname>))>"],
    "type": "WebSite",
    "name": "<Website Title>",
    "description": "<Website Description>",
    "image": {
      "id": "<Thumbnail Image URL>",
      "content": "<Content (data:// URL)>"
    }
  },
  "issuedAt": "<Issuance Day/Time (optional)>",
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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "id": "https://media.example.com/",
    "allowedOrigin": ["https://media.example.com"],
    "type": "WebSite",
    "name": "Originator Profile Verification site",
    "description": "This is Originator Profile Verification site.",
    "image": {
      "id": "https://example.com/image.svg",
      "content": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="
    }
  }
}
```

Please refer to the following documents for details on the properties:

- [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/)
- [Website Profile (WSP)](https://docs.originator-profile.org/opb/website-profile/)
- [`/wsp`](https://playground.originator-profile.org/#tag/wsp)

### Alternative Method: Using the CLI

Create it using the `opvc wsp:sign` command.
For details, please refer to the [OPVC CLI documentation](/opvc-cli/#publish-website-profile).

Example:

```
$ opvc wsp:sign -i ./account-key.example.priv.json --input ./website-profile.example.json
eyJ...
```

After execution, the string starting with “eyJ” displayed on the console is WSP.

For information on how to install CLI, please check [OPVC CLI installation method](/opvc-cli/#install).

Specify the private key for the -i option.

Specify the --input option by writing information about the WSP in JSON.

The specified file has the following format.

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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "<OP ID>",
  "credentialSubject": {
    "id": "<Website URL (Format: https://<hostname>)/)>",
    "allowedOrigin": ["<Website Origin (format: https://<hostname>))>"],
    "type": "WebSite",
    "name": "<Website Name>",
    "description": "<Website Description>",
    "image": {
      "id": "<Thumbnail image URL>",
      "content": "<Content (file:// format also accepted)>"
    }
  }
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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "id": "https://media.example.com/",
    "allowedOrigin": ["https://media.example.com"],
    "type": "WebSite",
    "name": "<Website Name>",
    "description": "<Website Description>",
    "image": {
      "id": "https://example.com/image.webp",
      "content": "file://path/to/image.webp"
    }
  }
}
```

For details on the properties, please refer to the [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/) and [Website Profile (WSP)](https://docs.originator-profile.org/opb/website-profile/).

### Alternative Method: Using [jwt.io](https://www.jwt.io/)

Create a JWT using the specified JSON format.

Visit the [JSON Web Token (JWT) Debugger](https://jwt.io) and select "JWT Encoder."
Then, enter the values ​​for "Header," "Payload," and "Sign JWT" on the left side of the screen.

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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "iss": "dns:media.example.com",
  "sub": "https://media.example.com",
  "iat": 1687827458,
  "exp": 1719449858,
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "id": "https://media.example.com/",
    "allowedOrigin": ["https://media.example.com"],
    "type": "WebSite",
    "name": "<Website Name>",
    "description": "<Website Description>",
    "image": {
      "id": "https://example.com/image.webp",
      "digestSRI": "sha256-6o+sfGX7WJsNU1YPUlH3T56bJDR43Laz6nm142RJyNk="
    }
  }
}
```

Replace the `iss` and `issuer` values ​​in the payload with your own OP ID.

Example:

```
dns:media.example.com
```

For details on the properties, please refer to the [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/) and [Website Profile (WSP)](https://docs.originator-profile.org/opb/website-profile/).

On the JSON Web Token (JWT) screen, under "Sign JWT," set the "Private Key Format" to "JWK" and paste your account's private key.

Once the private key is pasted, the JWT will appear on the right side of the screen. The string starting with "eyJ" obtained at this stage is the WSP.

## Step 2. Creating and Deploying `/.well-known/sp.json` {#step2}

### Creating the Site Profile

You can create the Site Profile using either of the following methods:

- Using the Website Profile issued in Step 1
- Using the CA Server: Utilizing the [`/sp`](https://playground.originator-profile.org/#tag/sp) endpoint

#### Using the Website Profile issued in Step 1

Create the Site Profile (`sp.json`) in a format that includes the Website Profile.

Format:

```json
{
  "originators": [...<OPS received from OP-CIP>],
  "sites": ["<WSP>"]
}
```

Example:

```json
{
  "originators": [
    {
      "core": "eyJ...",
      "annotations": ["eyJ...", "eyJ..."],
      "media": ["eyJ..."]
    },
    {
      "core": "eyJ...",
      "annotations": ["eyJ..."],
      "media": ["eyJ..."]
    }
  ],
  "sites": ["eyJ..."]
}
```

_From [Site Profile](https://docs.originator-profile.org/opb/site-profile/)_

The `originators` property can include not only the site operator's own OP but also the OPs of the CAs (Content Attestation issuers) for articles distributed on the site.

#### Using a CA Server {#site-profile-ca-server}

:::note

This section, "Using a CA Server," describes the process based on the Content Attestation Server Playground.
While the Playground and production CA servers share the same API specifications, their authentication procedures differ.

If you are using a production CA server, please follow the configuration instructions provided by your specific server, as the authentication procedure will be different.

:::

Send a POST request to the [`/sp`](https://playground.originator-profile.org/#tag/sp) endpoint.

You can register by sending a POST request with the required parameters included in the request body.

This endpoint is also used for updates; if a Site Profile (SP) is already registered, it will update the existing SP.

For details, please refer to the [Content Attestation Server Playground API documentation](https://playground.originator-profile.org/#tag/sp/POST/sp).

Example:

```
$ curl -X POST https://playground.originator-profile.org/sp \
    -H content-type:application/json \
    -u Basic Authentication Username:Basic Authentication Password \
    -d '{...}'
```

After execution, the string displayed in the console from "{" to "}" is the SP.

The specified file must be in the following format.

site-profile.example.json

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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "<OP ID>",
  "credentialSubject": {
    "id": "<Website URL (format: https://<hostname>)/)>",
    "allowedOrigin": ["<Website Origin (format: https://<hostname>))>"],
    "type": "WebSite",
    "name": "<website Title>",
    "description": "<Website Description>",
    "image": {
      "id": "<Thumbnail image URL>",
      "content": "<Content (data:// URL)>"
    }
  },
  "issuedAt": "<Issuance Day/Time (optional)>",
  "expiredAt": "<Expiration Date/Time (optional)>"
  "originators": [
    {
      "core": "<Core Profile>",
      "media": ["<Web Media Profile (optional)>"],
      "annotations": ["<Profile Annotation (optional)>"]
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
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "dns:media.example.com",
  "credentialSubject": {
    "id": "https://media.example.com/",
    "allowedOrigin": ["https://media.example.com"],
    "type": "WebSite",
    "name": "Originator Profile Verification site",
    "description": "This is Originator Profile Verification site.",
    "image": {
      "id": "https://example.com/image.svg",
      "content": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="
    }
  },
  "originators": [
    {
      "core": "eyJ...",
      "media": ["eyJ..."],
      "annotations": ["eyJ..."]
    }
  ]
}
```

The `originators` property can include not only the site operator's own OP but also the OP of the CA issuer for articles distributed on the site.

Please refer to the following document for details on the property.

- [OP VC Securing Mechanism](https://docs.originator-profile.org/opb/securing-mechanism/)
- [Website Profile (WSP)](https://docs.originator-profile.org/opb/website-profile/)
- [Site Profile (SP)](https://docs.originator-profile.org/opb/site-profile/)
- [`/sp`](https://playground.originator-profile.org/#tag/sp)

### Placing the Site Profile (sp.json)

Place `sp.json` so that it is accessible via the website's well-known URL: `/.well-known/sp.json`.

Example:

```
$ curl -i https://media.example.com/.well-known/sp.json
HTTP/2 200
content-type: application/json

{
  "originators": [
    { "core": "eyJ...", "annotations": ["eyJ..."], "media": ["eyJ..."] }
  ],
  "sites": ["eyJ..."]
}
```

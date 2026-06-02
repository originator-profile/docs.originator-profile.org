---
sidebar_position: 350
original: https://github.com/originator-profile/docs.originator-profile.org/blob/414d960/docs/opvc-cli.md
---

# OPVC CLI

OPVC CLI is a tool for creating and managing Verifiable Credentials (VC) that comply with the Originator Profile (OP) specification.
You can issue VCs related to OPs such as Core Profile (CP), Profile Annotation (PA), Web Media Profile (WMP), Website Profile (WSP), and Content Attestation (CA) from the command line.
This document helps you better understand the Originator Profile by actually issuing VCs such as CP and PA using the OPVC CLI.

## How to get started

### Install

OPVC CLI can be installed using one of the following methods:
Choose your preferred method.

#### Install from source

```sh
git clone https://github.com/originator-profile/originator-profile.git
cd originator-profile/packages/opvc
pnpm install
npm i -g .
```

#### Install via `npx` or `npm`

:::note
If using `npx`, replace `opvc` with `npx -y @originator-profile/opvc`
:::

```sh
# npx
npx -y @originator-profile/opvc

# npm
npm i -g @originator-profile/opvc
```

### Verify installation

Please check if the CLI is installed correctly and you can execute the following commands.

```sh
opvc help
```

If installed correctly, a list of available commands and instructions on how to use them will be displayed.

## Prerequisites

### Key generation

A private key is required to issue each VC.
Generate a key with the following command.

```sh
opvc key-gen -o <File name to save the key>
```

:::note
Specify the file name to save the key without the extension.  
`<output>.priv.json` (private key) and `<output>.pub.json` (public key) will be generated.
:::

You are free to decide where to place the generated key file and the input files that will be needed from now on. There is no problem if you can specify the correct path with `--input` or `-i` when executing the command.

## How to publish a Core Profile (CP)

This section explains how to publish a Core Profile. If you want to know more about Core Profile, check out [Core Profile](./opb/cp.md).
Core Profile is the basis for identifying and verifying Originators.

### Creating an input file

Create the input file (JSON file) required to publish a Core Profile.
Please check [Core Profile properties](./opb/cp.md#properties) for the required properties and their meanings.

Example file name: cp.json

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1"
  ],
  "type": ["VerifiableCredential", "CoreProfile"],
  "issuer": "dns:example.org",
  "credentialSubject": {
    "id": "dns:example.jp",
    "type": "Core",
    "jwks": {
      "keys": [
        {
          "x": "ypAlUjo5O5soUNHk3mlRyfw6ujxqjfD_HMQt7XH-rSg",
          "y": "1cmv9lmZvL0XAERNxvrT2kZkC4Uwu5i1Or1O-4ixJuE",
          "crv": "P-256",
          "kid": "jJYs5_ILgUc8180L-pBPxBpgA3QC7eZu9wKOkh9mYPU",
          "kty": "EC"
        }
      ]
    }
  }
}
```

### Publishing a Core Profile

Publish the signed a Core Profile by running the following command.
The signed VC is displayed on standard output.

```sh
opvc sign -i <File path of created private key> --input <Path to the JSON file you created>
```

Example output of the above command:

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9...
```

## How to publish a Profile Annotation (PA)

This section describes how to publish a Profile Annotation. If you want to know more about Profile Annotation, check out [Profile Annotation](./opb/pa.md).
Profile Annotation is signed information that connects validated attributes to Core Profile.

### Creating an input file

Create the input file (JSON file) required to publish a Profile Annotation.
Please check [Profile Annotation Properties](./opb/pa.md#properties) for the required properties and their meanings.

Example file name: annotation.json

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    {
      "@language": "en"
    }
  ],
  "type": ["VerifiableCredential", "ProfileAnnotation"],
  "issuer": "dns:profile-annotation-issuer.example.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.org",
    "type": "<PA type>",
    "name": "<PA name>",
    "description": "<PA description>",
    "annotation": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "ProfileAnnotationPolicy",
      "name": "<Profile Annotation Policy name>",
      "description": "<Profile Annotation Policy description>",
      "ref": "https://annotation.example.org/about"
    }
  }
}
```

### Publishing a Profile Annotation

Publish the signed a Profile Annotation by running the following command.
The signed VC is displayed on standard output.

```sh
opvc sign -i <File path of created private key> --input <Path to the JSON file you created>
```

Example output of the above command:

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9...
```

## How to publish a Web Media Profile (WMP)

This section describes how to publish a Web Media Profile. If you want to know more about Web Media Profile, check out [Web Media Profile](./opb/web-media-profile.md).
Web Media Profile is signed information that indicates the identity and trustworthiness of web media.

### Creating an input file

Create the input file (JSON file) required to publish a Web Media Profile.
Please check [Web Media Profile Properties](./opb/web-media-profile.md#properties) for the required properties and their meanings.

Example file name: media.json

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
    "name": "Media Name (*Development sample)",
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
      "name": "Information dissemination policy"
    },
    "publishingPrinciple": {
      "id": "https://wmp-holder.example.jp/editorial-guidelines",
      "name": "Editing guidelines"
    },
    "privacyPolicy": {
      "id": "https://wmp-holder.example.jp/privacy",
      "name": "Privacy policy"
    },
    "description": [
      {
        "text": "This article provides supplementary information regarding this web media.",
        "encodingFormat": "text/plain"
      },
      {
        "text": "<p>This article provides supplementary information regarding this web media.</p>",
        "encodingFormat": "text/html"
      }
    ]
  }
}
```

### Publishing a Web Media Profile

Publish the signed a Web Media Profile by running the following command.
The signed VC is displayed on standard output.

```sh
opvc sign -i <File path of created private key> --input <Path to the JSON file you created>
```

Example output of the above command:

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9...
```

## How to publish a Website Profile (WSP)

This section explains how to publish a Website Profile. If you want to know more about Website Profile, please check [Website Profile](./opb/website-profile.md).
Website Profile is signed information that indicates the legitimacy of a website.

### Creating an input file

Create the input file (JSON file) required to publish a Website Profile.
Please check [Website Profile Properties](./opb/website-profile.md#properties) for the required properties and their meanings.

Example file name: site.json

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
    "name": "<Website title>",
    "description": "<Website description>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-Upwn7gYMuRmJlD1ZivHk876vXHzokXrwXj50VgfnMnY="
    },
    "allowedOrigin": ["https://media.example.com"]
  }
}
```

### Publishing a Website Profile

Publish the signed a Website Profile by executing the following command.
The signed VC is displayed on standard output.

```sh
opvc wsp:sign -i <File path of created private key> --input <Path to the JSON file you created>
```

Example output of the above command:

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9...
```

## How to publish a Content Attestation (CA)

This section explains how to publish a Content Attestation. If you want to learn more about Content Attestation, check out [Content Attestation](./opb/ca.md).
Content Attestation is signed information that indicates that the content was legitimately created by the Originator.

### Creating an input file

Create the input file (JSON file) required to publish a Content Attestation.
Please check [Content Attestation Properties](./opb/ca.md#properties) for the required properties and their meanings.

Example file name: ca.json

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
    "type": "Article",
    "headline": "<Article title>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
    },
    "description": "<Web page description>",
    "author": ["Jane Smith"],
    "editor": ["John Doe"],
    "datePublished": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z",
    "genre": "Arts & Entertainment"
  },
  "allowedUrl": ["https://media.example.com/articles/2024-06-30"],
  "target": [
    {
      "type": "VisibleTextTargetIntegrity",
      "cssSelector": "<CSS selector>",
      "integrity": "sha256-GYC9PqfIw0qWahU6OlReQfuurCI5VLJplslVdF7M95U="
    },
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-+M3dMZXeSIwAP8BsIAwxn5ofFWUtaoSoDfB+/J8uXMo="
    }
  ]
}
```

### Publishing a　Content Attestation

Publish a Content Attestation by executing the following command.
The signed VC is displayed on standard output.

```sh
opvc ca:sign -i <File path of created private key> --input <Path to the JSON file you created>
```

Example output of the above command:

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9...
```

## Command list

Below is a list of OPVC CLI commands.
Please check [README](https://github.com/originator-profile/originator-profile/tree/main/packages/opvc#readme) for detailed options for each command.

- opvc ca:sign
- opvc ca:unsigned
- opvc help [COMMAND]
- opvc key-gen
- opvc sign
- opvc wsp:sign
- opvc wsp:unsigned

## Reference information

- [opvc - Originator Profile Verifiable Credential command line tool](https://github.com/originator-profile/originator-profile/tree/main/packages/opvc)

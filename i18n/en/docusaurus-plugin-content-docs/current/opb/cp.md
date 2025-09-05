---
sidebar_position: 2
original: https://github.com/originator-profile/docs.originator-profile.org/blob/9ceac67/docs/opb/cp.md
---

# Core Profile Data Model

## Terminology

For terms not explained in this document, please see [Terminology](./terminology.md).

- Core Profile (CP)
- Originator Profile (OP)
- Originator Profile Identifier (OP ID)
- OP VC Data Model Conforming Document (OP VC DM Compliance Document)
- Profile Annotation (PA)

## Core Profile (CP) Data Model {#data-model}

The Core Profile MUST be an OP VC DM compliant document and includes the following properties:

### Properties {#properties}

#### `@context` {#context}

REQUIRED. An ordered array of URLs, which MUST start with `https://www.w3.org/ns/credentials/v2`, followed by `https://originator-profile.org/ns/credentials/v1`.

#### `type` {#type}

REQUIRED. It MUST be `["VerifiableCredential", "CoreProfile"]`.

#### `credentialSubject` {#credential-subject}

REQUIRED. JSON-LD Node Object

#### `credentialSubject.id` {#credential-subject-id}

REQUIRED. It MUST be the OP ID of the CP holding organization.

#### `credentialSubject.type` {#credential-subject-type}

REQUIRED. It MUST be `Core`.

#### `credentialSubject.jwks` {#credential-subject-jwks}

REQUIRED. It MUST be a [JWK Set](https://www.rfc-editor.org/rfc/rfc7517.html#section-5), which is the set of public keys of the CP-holding organizations.

#### `issuer` {#issuer}

REQUIRED. It MUST be the [OP ID](./op-id.md) of the VC issuing organization.

## Extensibility {#extensibility}

Issuers MUST NOT add properties to the Core Profile that are not defined in the [OP VC Data Model](./op-vc-data-model.md) and this document, and specification developers SHOULD strongly avoid adding properties to the Core Profile.

If you need to do this, consider extending and publishing the Web Media Profile or [Profile Annotation](./pa.md).

## Appendix

### Example

_This section is non-normative._

Below is an example of a Core Profile:

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

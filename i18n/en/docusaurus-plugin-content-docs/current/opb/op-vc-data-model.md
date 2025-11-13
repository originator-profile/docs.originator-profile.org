---
sidebar_position: 11
original: https://github.com/originator-profile/docs.originator-profile.org/blob/28c3ada/docs/opb/op-vc-data-model.md
---

# OP VC Data Model

The OP specification defines several VCs that conform to a common data model based on the [VC DM 2.0 Conforming Document](https://www.w3.org/TR/vc-data-model-2.0/#dfn-conforming-document), which is specified in this document.

## VC Data Model {#data-model}

It MUST conform to the [VC DM 2.0 Conforming Document](https://www.w3.org/TR/vc-data-model-2.0/#dfn-conforming-document).

### Properties {#properties}

#### `@context` {#context}

REQUIRED. An ordered array of URLs. The array MUST start with `https://www.w3.org/ns/credentials/v2`, followed by `https://originator-profile.org/ns/credentials/v1`. The last element of the array SHOULD indicate the language of the string in VC with the `@language` tag. For example, if the language is Japanese, include `{"@language": "ja"}` at the end of the array.

#### `type` {#type}

REQUIRED. The value MUST be a `VerifiableCredential` or an array of [JSON-LD terms](https://www.w3.org/TR/json-ld11/#terms) whose value contains a `VerifiableCredential`.

#### `credentialSubject` {#credential-subject}

REQUIRED. JSON-LD Node Object

#### `credentialSubject.type` {#credential-subject-type}

OPTIONAL. The value MUST be a term in the [JSON-LD vocabulary](https://www.w3.org/TR/json-ld11/#terms) or an array thereof.

#### `credentialSubject.id` {#credential-subject-id}

REQUIRED. An identifier. The format of the identifier is specified in the data model document for each VC.

#### `issuer` {#issuer}

REQUIRED. It MUST be the [OP ID](./op-id.md) of the VC issuing organization.

## Internationalization {#internationalization}

The language used in each VC can be identified by the `@language` tag specified in the [@context property of the OP VC Data Model](/opb/op-vc-data-model.md#context). Application implementers SHOULD use VCs written in the appropriate language for display, matching the application user's locale.

:::note Implementation Notes

Application implementers must take the following considerations when the user's locale cannot be obtained, or when VCs matching the user's locale are unavailable:

1. Fallback to VCs with the language code `en`.
2. If VCs from step 1 are unavailable, fallback to any obtained VCs.

:::

## Verification Process {#verification}

A VC that conforms to the data model in this document can be verified by following these steps:

1. Get the VC to be verified
   - When getting from a specific domain, get it from [Site Profile](./site-profile.md) (RECOMMENDED)
   - When getting from a specific web page, get it from [Linking Content Attestation Set and Originator Profile Set to HTML Document](./link-to-html.md) (RECOMMENDED)
2. Get the verification key of the issuing organization of the VC to be verified by [OP ID](./op-id.md).
3. Verify using the algorithms defined in [Securing Mechanisms](https://www.w3.org/TR/vc-data-model-2.0/#securing-mechanisms)
4. Verify properties that use [The `image` Datatype](./context.md#the-image-datatype)

:::info

For information on the Securing Mechanisms used in applications developed by the Originator Profile Collaborative Innovation Partnership, see [OP VC Securing Mechanism](./securing-mechanism.md).

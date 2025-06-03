---
sidebar_position: 4
original: https://github.com/originator-profile/docs.originator-profile.org/blob/e45538b/docs/opb/ca.md
---

# Content Attestation Data Model

:::note

The subjects of CA verification were (1) verification based on specific events caused by active confirmation operations by users when a page load is completed, and (2) verification during dynamic loading and rewriting of DOM in real time, but (2) highly real-time timing is not expected as a target of CA verification.

The reason is that algorithms that target rendered text as the signature target, such as changing the target element of a CSS selector or [Visible Text Target](/opb/target-guide/visible-text.md), are not compatible with real-time verification during DOM rewriting, and there is an impact on browser performance/power consumption.

The verification of information senders assumed by OP is different from the blocks embedded in the pages of dangerous sites, and there is no security need to avoid loading itself. As mentioned above, it includes a signature verification algorithm that targets rendered text, so there are restrictions on the verification timing, and browser behavior other than blocking loading is also possible, such as not blocking loading/rendering but verifying after loading, and if the verification does not pass, hiding the target content and displaying a warning. For the above reasons, CA verification is currently not anticipated to take place at times that require real-time processing, such as at the time of loading or during rendering processing.

:::

## Terminology

For terms not explained in this document, please see [Terminology](./terminology.md).

- Originator Profile (OP)
- Originator Profile Identifier (OP ID)
- Content Attestation (CA)
- Target Integrity

## Content Attestation (CA) Data Model

Content Attestation MUST be an OP VC DM compliant document and contain the following properties:

### Property

#### `@context`

It MUST conform to the [OP VC Data Model](./op-vc-data-model.md#context).

#### `type`

REQUIRED. It MUST be `["VerifiableCredential", "ContentAttestation"]`.

#### `credentialSubject.id`

REQUIRED. MUST be a CA ID. CA ID is a [UUIDv4](https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-4) URN format string. There is a one-to-one correspondence between content and CA IDs.

#### `allowedUrl`

OPTIONAL. The URL for which information is asserted by this CA.
The string MUST be a [URL Pattern string](https://urlpattern.spec.whatwg.org/#pattern-strings). This property allows you to [verify](#allowed-url-validation) whether the CA is located on a web page with a valid URL.

#### `allowedOrigin`

OPTIONAL. The string following the [ASCII Serialization](https://www.rfc-editor.org/rfc/rfc6454#section-6.2) of the [Origin](https://www.rfc-editor.org/rfc/rfc6454) about which information asserted by this CA is the subject. This property allows you to [verify](#allowed-origin-validation) whether the CA is located on a web page of a valid origin.

Examples: `"https://example.com"`, `["https://a.example.com", "https://b.example.com"]`

#### `target`

REQUIRED. It MUST be Target Integrity.

Target Integrity is a mechanism for ensuring the integrity of parts of content. This property allows you to [verify](#target-integrity-validation) that specific information in the content that corresponds to the CA has not been tampered with.
You can use the ones registered in the [Target Integrity Registry](./target-guide/index.mdx).

## Examples

_This section is non-normative._

Here is an example CA that is tied to content published at https://media.example.com/articles/2024-06-30:

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
    "headline": "<Article Title>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
    },
    "description": "<Web page description>",
    "author": ["Jane Smith"],
    "editor": ["John Smith"],
    "datePublished": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z",
    "genre": "Arts & Entertainment"
  },
  "allowedUrl": "https://media.example.com/articles/2024-06-30",
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

This CA is tied to advertising content served on web pages under https://ad.example.com.

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
    "name": "<Ad title>",
    "description": "<Ad Description>",
    "image": {
      "id": "https://ad.example.com/image.png",
      "digestSRI": "sha256-5uQVtkoRdTFbimAz3Wz5GQcuBRLt7tDMD5JRtGFo9/M="
    }
  },
  "allowedOrigin": "https://ad.example.com",
  "target": {
    "type": "ExternalResourceTargetIntegrity",
    "integrity": "sha256-rLDPDYArkNcCvnq0h4IgR7MVfJIOCCrx4z+w+uywc64="
  }
}
```

:::note

The example includes properties not defined in this document, see [Extensibility](#extensibility) for information on how to add undefined properties.

:::

## Extensibility {#extensibility}

Issuers MUST NOT add properties to a Content Attestation that are not defined in the [OP VC Data Model](./op-vc-data-model.md) and this document.

Issuers MAY add properties that are not defined in the [OP VC Data Model](./op-vc-data-model.md) and this document, but are RECOMMENDED to do so as per [Verifiable Credentials Data Model 2.0 Section 5.2](https://www.w3.org/TR/vc-data-model-2.0/#extensibility).
:::info

For information about properties used in applications developed by the Originator Profile Collaborative Innovation Partnership, please refer to the following Originator Profile Blueprint (OPB) documents:

- [Article Data Model](./ca-guide/article.md)
- [Online Ad Data Model](./ca-guide/online-ad.md)

:::

### Target Integrity Scalability

See [Target Integrity](./target-guide/index.mdx).

## Verification Process {#verification}

A CA verifier can verify:

1. [Verification of VC conformance to the OP VC Data Model](./op-vc-data-model.md#verification)
2. Verifying `allowedUrl` (Optional)
3. Verifying `allowedOrigin` (Optional)
4. Verifying Target Integrity

### `allowedUrl` validation {#allowed-url-validation}

Optionally, the verifier can verify the `allowedUrl` property by following these steps:

1. Obtain the URL of the web page that the CA refers to.
2. The CA checks whether each element of the `allowedUrl` property array matches the URL obtained in step 1. The algorithm uses the [URL Pattern `test(input, baseURL)` method](https://urlpattern.spec.whatwg.org/#dom-urlpattern-test).

:::note

Percent-encoded characters are normalized to uppercase according to [RFC 3986 Section 2.1](https://www.rfc-editor.org/rfc/rfc3986#section-2.1) before comparison.

:::

### `allowedOrigin` validation {#allowed-origin-validation}

A verifier can verify the `allowedOrigin` property by following these steps (OPTIONAL):

1. Obtain the URL origin of the web page that CA refers to.
2. If CA contains an `allowedOrigin` property, search that array for a URL origin of 1\.
   1. If the `allowedOrigin` property is not included, validation is considered successful.

### Verifying Target Integrity

Verifiers SHOULD verify the Target Integrity of the `target` property as long as the verification process defined for each Target Integrity type is feasible.

:::note

Depending on the type of Target Integrity, verification may not be possible in the verifier's environment. For example, in an environment where browser rendering is not possible, Target Integrity that requires browser rendering results for verification cannot be verified.

:::

Verifiers MUST verify the Target Integrity using the verification methods defined for each type of Target Integrity, and if the verification fails, it is RECOMMENDED that the Target Integrity verification fail be displayed to the viewer. It is RECOMMENDED that the Target Integrity verification failure be not displayed to the user with the same or higher severity as the CA verification failure.

### Reporting the verification results

_This section is non-normative_

After running the verification, you need to communicate the results to your users. The following is a recommended method for reporting verification results:

- If the CA is successfully verified, it will be displayed to the user as a verified CA.
- If the CA fails to be verified, a brief explanation of the type and reason will be provided to the user.

[OP Extension](https://github.com/originator-profile/profile-share/tree/main/apps/web-ext) may return the following error when validating the CA:

- [CaInvalid](https://reference.originator-profile.org/ts/classes/_originator-profile_verify.CaInvalid)
- [CoreProfileNotFound](https://reference.originator-profile.org/ts/classes/_originator-profile_verify.CoreProfileNotFound)
- [CaVerifyFailed](https://reference.originator-profile.org/ts/classes/_originator-profile_verify.CaVerifyFailed)
  - "Content Attestation verify failed" ... Verification of VC conforming to OP VC Data Model failed
  - "URL not allowed" ... Verification of `allowedUrl` failed (OPTIONAL)
  - "Origin not allowed" ... Verification of `allowedOrigin` failed (OPTIONAL)
  - "Target integrity verification failed" ... Verification of [Target Integrity](./target-guide/index.mdx) failed

For other data structures, please see the following references:

- [Verified Content Attestation (CA)](https://reference.originator-profile.org/ts/types/_originator-profile_verify.VerifiedCa)

Input:

- Content Attestation (CA)
- The URL of the web page that presented the CA (OPTIONAL)
- [Verified Originator Profile (OP)](https://reference.originator-profile.org/ts/types/_originator-profile_verify.VerifiedOp)

```mermaid
flowchart TD
    Start((Start)) --> DecodeCa{Decode and Validate CA}
    DecodeCa -- Failure --> CaInvalid[CaInvalid]
    CaInvalid --> End((Complete))
    DecodeCa -- Success --> RetrieveCa{Resolved CA issuer's<br>verified OP}
    RetrieveCa -- Failure --> CoreProfileNotFound[CoreProfileNotFound]
    CoreProfileNotFound --> End((Complete))
    RetrieveCa -- Success --> VerifyCa{Verify CA}
    VerifyCa -- Failure --> CaVerifyFailed[CaVerifyFailed]
    CaVerifyFailed --> End((Complete))
    VerifyCa -- Success --> VerifiedCa[Verified CA]
    VerifiedCa --> End((Complete))
```

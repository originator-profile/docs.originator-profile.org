---
sidebar_position: 103
original: https://github.com/originator-profile/docs.originator-profile.org/blob/a3fb119/docs/opb/algorithm.md
---

# Cryptographic algorithms

:::note

The references and standards for cryptographic algorithm support are subject to ongoing review and may be updated as needed.

:::

## Signature Algorithm

The signing algorithm used when verifying a signature MUST meet the following requirements:

The allowed list (validating side) is:

- `ES256` (RECOMMENDED)
- `ES384`
- `ES512`
- `PS256`
- `PS384`
- `PS512`

You MUST support one of the signature algorithms included in these allowed lists.

Verifiers MUST refuse to verify with any signature algorithm not included in this allowed list.

We recommend `ES256` as a good balance between performance and security, but do not prohibit the use of other signature algorithms.

Implementers are RECOMMENDED to periodically review algorithms and discontinue use of compromised algorithms.

:::note

The C2PA 2.0 signature algorithms allowed list includes `EdDSA`[^1], **but at the time of writing this document there are a number of implementations that do not support it** [^2], so `EdDSA` is not included in the allowed list.

[^1]: https://c2pa.org/specifications/specifications/2.0/specs/C2PA_Specification.html#_signature_algorithms

[^2]: https://github.com/WICG/webcrypto-secure-curves/issues/20

:::

:::note

For the time being, applications developed by the Originator Profile Collaborative Innovation Partnership (OP-CIP) will only support the ES256 signature algorithm.

:::

## Hash algorithm {#hash-algorithm}

Applications that comply with the OP's specifications MUST meet the following requirements for the hash algorithms used when generating and verifying the `integrity` property value of the CA's Content Integrity Descriptor and when generating and verifying the `digestSRI` property value of each VC.

Verifiers MUST support verification using SHA-256 hash values, and MAY support verification using SHA-384 and SHA-512 hash values.

Implementers should periodically review hash algorithms and avoid using compromised hash algorithms.

:::note

For the time being, applications developed by OP-CIP will only support the SHA-256 hash algorithm.

:::

## Security Considerations {#security-considerations}

_This section is non-normative._

This section is included to inform of the expected algorithm migration as required by [RFC 7696 Section 2.2.3](https://www.rfc-editor.org/rfc/rfc7696.html#section-2.2.3), and it references [NIST SP 800-57 Part 1](https://doi.org/10.6028/NIST.SP.800-57pt1r5), a document on U.S. Federal agency key management recommendations for guidance on key refresh and periodic review of cryptographic algorithms, as well as [NIST SP 800-131A Rev.3 (Initial Public Draft)](https://doi.org/10.6028/NIST.SP.800-131Ar3.ipd), a document on the transitioning of cryptographic algorithm use, as follows:

### Security Strengths

The NIST SP 800-131A Rev.3 (Initial Public Draft), based on the security strengths defined in NIST SP 800-57 Part 1, recommends against the use of various cryptographic algorithms and key lengths with a security strength of less than 128 bits beginning in 2031. It further calls for a migration to a security strength of 128 bits or greater or to post-quantum cryptographic algorithms.

The security strengths corresponding to the allowed list of cryptographic algorithms defined in this document are as follows:

Signing Algorithms

- ES256: 128 bits
- ES384: 192 bits
- ES512: 256 bits
- PS256: ~128 bits [^1]
- PS384: ~192 bits  [^1]
- PS512: ~256 bits  [^1]

[^1]: Depends on key size. For a key length of 3072 bits: 128 bits

Hash Algorithms

- SHA-256: 128 bits
- SHA-384: 192 bits
- SHA-512: 256 bits

### Recommended Cryptoperiods

NIST SP 800-57 Part 1 Section 5.3.6 provides the recommended cryptoperiods for the following key types:

- Signing Keys: 1 to 3 years for the period of use for signing.
- Verification Keys: A few years (dependent on key size).

It is advisable to update keys based on these recommended cryptoperiods, and for establishing longer cryptoperiods, the necessity of key updates due to key compromise should be considered.

### Migration to New Cryptographic Algorithms and Key Lengths

NIST SP 800-57 Part 1 Section 5.6.4 discusses the considerations for migration due to the lifetime of the cryptographic algorithms and key lengths in use (the point at which the protection of data by that algorithm and key length is no longer considered secure).

If the period for which signature verification must be possible exceeds the lifetime of the cryptographic algorithm and key length, no new signatures should be created with that algorithm and key length. Furthermore, data that is already within the signature verification period should be re-signed with a different cryptographic algorithm and key length to provide protection for the remaining period.

### Cryptographic Key Protection and Assurance Requirements

NIST SP 800-57 Part 1 Section 6.1.1 outlines the cryptographic key protection and assurance requirements as follows:

- Signing Keys: Assurance of confidentiality and integrity throughout their possession, from generation until the end of the cryptoperiod.
- Verification Keys: Assurance of integrity and availability of their validity, from generation until the signed data no longer requires verification.

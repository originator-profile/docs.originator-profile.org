---
sidebar_position: 103
original: https://github.com/originator-profile/docs.originator-profile.org/blob/a3fb119/docs/opb/algorithm.md
---

# Cryptographic algorithms

:::note

Regarding support for cryptographic algorithms, we are currently discussing what standards to use as references when deciding on specifications.

Reference: Consideration of specifying and recommending keys and algorithms in preparation for compromise.

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

---
sidebar_position: 35
---

# Media Types

## Summary

This document defines media types for the VCs defined by OP and their distribution formats.

:::note

The media types defined in this document are not registered with IANA.

:::

## Terminology

For terms not explained in this document, see [Terminology](./terminology.md).

- Profile Annotation (PA)
- Content Attestation (CA)
- Originator Profile Set (OPS)
- Content Attestation Set (CAS)

## List of Media Types {#registry}

| Media Type                | Content     | Format                                                                                                           |
| ------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `application/op-set+json` | OPS         | [JSON Serialization for OPS](./originator-profile-set.md#json-serialization)                                     |
| `application/ca-set+json` | CAS         | [JSON Serialization for CAS](./content-attestation-set.md#json-serialization)                                    |
| `application/pa+jwt`      | A single PA | JWT secured by the [Securing Mechanism](./securing-mechanism.md) ([JWS Compact Serialization](#single-vc-types)) |
| `application/ca+jwt`      | A single CA | JWT secured by the [Securing Mechanism](./securing-mechanism.md) ([JWS Compact Serialization](#single-vc-types)) |

## Media Types for a Single VC {#single-vc-types}

The content of `application/pa+jwt` and `application/ca+jwt` MUST be the [JWS Compact Serialization](https://www.rfc-editor.org/rfc/rfc7515.html#section-7.1) of a JWT that secures a single PA or CA, respectively, in accordance with the [Securing Mechanism](./securing-mechanism.md).

The `typ` header parameter of the JWT follows the [Securing Mechanism](./securing-mechanism.md), independently of these media types.

These media types are not used to link to a web page. To link a CA to a web page, link a CAS in accordance with [Linking](./link-to-html.md).

## Deprecated Media Types {#deprecated}

The following media types are deprecated and will no longer be supported on or after 2027-11-01.

| Deprecated Media Type  | Replacement               |
| ---------------------- | ------------------------- |
| `application/ops+json` | `application/op-set+json` |
| `application/cas+json` | `application/ca-set+json` |

A distributor MUST NOT use deprecated media types.
A verifier SHOULD treat a deprecated media type as equivalent to its replacement.

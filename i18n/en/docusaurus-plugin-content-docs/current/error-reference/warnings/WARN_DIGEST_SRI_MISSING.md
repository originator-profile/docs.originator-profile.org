---
sidebar_position: 3
original: https://github.com/originator-profile/docs.originator-profile.org/blob/710d107/docs/error-reference/warnings/WARN_DIGEST_SRI_MISSING.md
tags:
  - Error Reference
  - Base Model
slug: /error-reference/WARN_DIGEST_SRI_MISSING
---

# WARN_DIGEST_SRI_MISSING

## Warning Code: WARN_DIGEST_SRI_MISSING

This warning is reported when `digestSRI` is not set on a property of the [`image` datatype](../../opb/context.md#the-image-datatype). It is not treated as a verification failure, but it is planned to become an error after 2027.

## Warning Message

- "digestSRI is missing. This will become an error after 2027. See: https://docs.originator-profile.org/opb/context/#the-image-datatype"

## Causes

- `digestSRI` is not set on one of the following properties of the `image` datatype:
  - `logo` of a Web media
  - `image` of a Profile Annotation
  - `image` of a Site Profile
  - `image` of a Content Attestation

## Examples

- Only `id` is set in `image`.

```json
{
  "image": {
    "id": "https://example.com/image.png"
  }
}
```

## Resolution

- Set `digestSRI` to a hash value that ensures the integrity of the image.

```json
{
  "image": {
    "id": "https://example.com/image.png",
    "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
  }
}
```

Additional details can be found in [`image` datatype](../../opb/context.md#the-image-datatype).

## Related Information

- [`image` datatype](../../opb/context.md#the-image-datatype)
- [`WARN_DIGEST_SRI_INVALID`](./WARN_DIGEST_SRI_INVALID.md)

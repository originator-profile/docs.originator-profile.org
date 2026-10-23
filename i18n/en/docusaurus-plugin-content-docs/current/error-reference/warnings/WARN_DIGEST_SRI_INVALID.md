---
sidebar_position: 4
original: https://github.com/originator-profile/docs.originator-profile.org/blob/710d107/docs/error-reference/warnings/WARN_DIGEST_SRI_INVALID.md
tags:
  - Error Reference
  - Base Model
slug: /error-reference/WARN_DIGEST_SRI_INVALID
---

# WARN_DIGEST_SRI_INVALID

## Warning Code: WARN_DIGEST_SRI_INVALID

This warning is reported when verification using `digestSRI` fails for a property of the [`image` datatype](../../opb/context.md#the-image-datatype). It is not treated as a verification failure, but it is planned to become an error after 2027.

## Warning Message

- "digestSRI verification failed. This will become an error after 2027. See: https://docs.originator-profile.org/opb/context/#the-image-datatype"

## Causes

- The image retrieved from the `id` URL does not match the hash value in `digestSRI`. The image may have been replaced, or the `digestSRI` value may be incorrect.
- `digestSRI` does not contain any supported hash algorithm.
- The image could not be retrieved from the `id` URL.

## Examples

- The image was updated, but `digestSRI` was not.

```json
{
  "image": {
    "id": "https://example.com/image.png",
    "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
  }
}
```

## Resolution

- Make sure the image can be retrieved from the `id` URL.
- Recalculate `digestSRI` from the image currently being served and set it again.
  The verification method for `digestSRI` can be found in [Verifying `image` Datatype](../../opb/context.md#verifying-image-datatype).

## Related Information

- [`image` datatype](../../opb/context.md#the-image-datatype)
- [`WARN_DIGEST_SRI_MISSING`](./WARN_DIGEST_SRI_MISSING.md)

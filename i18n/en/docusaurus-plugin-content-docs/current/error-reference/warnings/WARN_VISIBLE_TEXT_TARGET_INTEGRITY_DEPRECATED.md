---
sidebar_position: 2
original: https://github.com/originator-profile/docs.originator-profile.org/blob/710d107/docs/error-reference/warnings/WARN_VISIBLE_TEXT_TARGET_INTEGRITY_DEPRECATED.md
tags:
  - Error Reference
  - Content Attestation
slug: /error-reference/WARN_VISIBLE_TEXT_TARGET_INTEGRITY_DEPRECATED
---

# WARN_VISIBLE_TEXT_TARGET_INTEGRITY_DEPRECATED

## Warning Code: WARN_VISIBLE_TEXT_TARGET_INTEGRITY_DEPRECATED

This warning is reported when the `target` of a Content Attestation includes the deprecated `VisibleTextTargetIntegrity`. It is not treated as a verification failure.

## Warning Message

- "[OP Warning] VisibleTextTargetIntegrity is deprecated in Content Attestation and will be removed after October 2027. innerText-based rendering is platform-dependent and incompatible across browser implementations and cannot serve as a basis for integrity verification. See: https://docs.originator-profile.org/opb/content-integrity-descriptor/visible-text/"

## Causes

- The `target` of the Content Attestation includes a [Content Integrity Descriptor](../../opb/content-integrity-descriptor/index.mdx) whose `type` is `VisibleTextTargetIntegrity`.
- The rendering result obtained via `innerText` depends on the browser implementation and does not match across browsers, so it is not suitable as a basis for integrity verification.

## Examples

- `VisibleTextTargetIntegrity` is set in the `target` of the Content Attestation.

```json
{
  "target": [
    {
      "type": "VisibleTextTargetIntegrity",
      "cssSelector": "<CSS selector>",
      "integrity": "sha256-GtNUUolQVlwIkQU9JknWkwkhfdiVmHr/BOnLFFHC5jI="
    }
  ]
}
```

## Resolution

- Avoid using `VisibleTextTargetIntegrity`. Consider using [TextTargetIntegrity](../../opb/content-integrity-descriptor/text.md) or [ExternalResourceTargetIntegrity](../../opb/content-integrity-descriptor/external-resource.md) instead.
  Additional details can be found in [Visible Text within DOM Integrity](../../opb/content-integrity-descriptor/visible-text.md).

## Related Information

- [`Visible Text within DOM Integrity`](../../opb/content-integrity-descriptor/visible-text.md)
- [`Content Attestation`](../../opb/ca.md)

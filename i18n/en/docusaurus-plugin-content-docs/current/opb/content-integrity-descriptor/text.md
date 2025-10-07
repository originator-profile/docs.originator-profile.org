---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/5773be6/docs/opb/content-integrity-descriptor/text.md
tags:
  - Content Integrity Descriptor
  - Web Media Specific Model
---

# Text within DOM Integrity

## Summary

This document describes a format for ensuring the integrity of the text content contained within target elements.

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Content Attestation (CA)

## Text Target format

Below is Text Target format

```json
{
  "type": "TextTargetIntegrity",
  "cssSelector": "<CSS Selector>",
  "integrity": "sha256-GtNUUolQVlwIkQU9JknWkwkhfdiVmHr/BOnLFFHC5jI="
}
```

### JSON Schema

```json
{
  "title": "Text Target",
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "enum": ["TextTargetIntegrity"]
    },
    "integrity": {
      "type": "string"
    },
    "cssSelector": {
      "type": "string"
    }
  },
  "additionalProperties": true,
  "required": ["type", "integrity", "cssSelector"]
}
```

### Property

- `type`: REQUIRED. It is the type of Content Integrity Descriptor. It MUST be `TextTargetIntegrity`.
- `integrity`: REQUIRED.It MUST be the [`sriString` data type](../context.md#the-sristring-datatype). For available hash functions, it MUST conform to [Hash Algorithm](../algorithm.md#hash-algorithm-hash-algorithm). Example: `sha256-4HLmAAYVRClrk+eCIrI1Rlf5/IKK0+wGoYjRs9vzl7U=`
- `cssSelector`: REQUIRED. It MUST be a [CSS Selector (Selectors Level 3)](https://www.w3.org/TR/selectors-3/).

:::note

CA issuers are RECOMMENDED to specify `cssSelector` so that the elements that `cssSelector` matches do not change regardless of dynamic changes to the page. For example, specify a more detailed CSS selector such as `#paragraphID` or `p.rareClassName`, rather than just specifying a tag name such as `p` for `cssSelector`. If there is no CSS selector that stably and uniquely identifies the target element, it is RECOMMENDED to update the page and design the page so that it is easier to specify an id attribute for the target element.

:::

## Validation Process

1. Searches for an element specified by a CSS selector in the `cssSelector` property. The target element is searched for using the `querySelectorAll()` method, starting from the root element of the page's `document` (for example, the `<html>` element for an HTML document).
   - If there is a syntax error in the `cssSelector` property, it may be treated as a verification failure (e.g. [`DOMException`](https://developer.mozilla.org/en-US/docs/Web/API/DOMException) `SyntaxError`).
   - If no elements are found, it may be treated as a verification failure.
     If `null` is obtained, converts the target to an empty string.
2. Gets the target element's [descendant text content](https://dom.spec.whatwg.org/#concept-descendant-text-content), which is the value of the element's `textContent` attribute. If `null` is obtained, converts the target to an empty string ("").
3. Encode all objects into UTF-8. If there are multiple objects, combine their contents.
4. Validate the result and the `integrity` property using the methods specified in [SRI section 3.3.5](https://www.w3.org/TR/SRI/#does-response-match-metadatalist).
   - If an unsupported hash algorithm is used, it may be treated as a verification failure.

:::note

Text Targets use the [`textContent` attribute](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) and are different from the [`innerText` attribute](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText).
See [Differences from innerText - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext) for the main differences between the two.

:::

## How to identify element location

Searches for an element specified by the CSS selector in the `cssSelector` property.

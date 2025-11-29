---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/4a7db5d/docs/opb/content-integrity-descriptor/html.md
tags:
  - Content Integrity Descriptor
  - Web Media Specific Model
---

# HTML Fragment Integrity

## Summary

This document describes a format for ensuring the HTML integrity of the target element as a string.

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Content Attestation (CA)

## HTML Target format

HTML Target is expressed in the following format:

```json
{
  "type": "HtmlTargetIntegrity",
  "cssSelector": "<CSS Selector>",
  "integrity": "sha256-GtNUUolQVlwIkQU9JknWkwkhfdiVmHr/BOnLFFHC5jI="
}
```

### JSON Schema

```json
{
  "title": "HTML Target",
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "enum": ["HtmlTargetIntegrity"]
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

- `type`: REQUIRED.The type of Content Integrity Descriptor. It MUST be `HtmlTargetIntegrity`.
- `integrity`: REQUIRED. It MUST be the [`sriString` data type](../context.md#the-sristring-datatype). For available hash functions, it MUST conform to [Hash Algorithm](../algorithm.md#hash-algorithm). Example: `sha256-4HLmAAYVRClrk+eCIrI1Rlf5/IKK0+wGoYjRs9vzl7U=`
- `cssSelector`: REQUIRED. It MUST be a [CSS Selector (Selectors Level 3)](https://www.w3.org/TR/selectors-3/).

:::note

CA issuers should specify `cssSelector` so that the elements that `cssSelector` matches will not change regardless of dynamic changes to the page (RECOMMENDED). For example, instead of specifying only a tag name such as `p` for `cssSelector`, specify a more specific CSS selector such as `#paragraphID` or `p.rareClassName`. If there is no CSS selector that can stably and uniquely identify the target element, it is RECOMMENDED to update the page and design the page so that it is easier to identify, for example by specifying an id attribute for the target element.

:::

## Validation Process

1. It searches for an element specified by the CSS selector in the `cssSelector` property. The target element is searched for using the `querySelectorAll()` method, starting from the root element of the page's `document` (for example, the `<html>` element for an HTML document).
   - If there is a syntax error in the `cssSelector` property, it may be treated as a verification failure (e.g. [`DOMException`](https://developer.mozilla.org/en-US/docs/Web/API/DOMException) `SyntaxError`).
   - If no elements are found, it may be treated as a verification failure.
2. Use the [`outerHTML` attribute](https://developer.mozilla.org/docs/Web/API/Element/outerHTML) of those elements to get their target as a `DOMString`, and if the element is not in UTF-8, encode it in a way that conforms to the [WHATWG Encoding Standard](https://encoding.spec.whatwg.org/).
3. Encode all objects into UTF-8. If there are multiple objects, combine their contents.
4. Validate the result and the `integrity` property using the methods specified in [SRI section 3.3.5](https://www.w3.org/TR/SRI/#does-response-match-metadatalist).
   - If an unsupported hash algorithm is used, it may be treated as a verification failure.

## How to identify element location

Searches for an element specified by the CSS selector in the `cssSelector` property.

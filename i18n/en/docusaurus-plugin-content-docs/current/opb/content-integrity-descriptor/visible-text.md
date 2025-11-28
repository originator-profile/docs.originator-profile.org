---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/4a7db5d/docs/opb/content-integrity-descriptor/visible-text.md
tags:
  - Content Integrity Descriptor
  - Web Media Specific Model
---

# Visible Text within DOM Integrity

## Summary

This document describes a format for ensuring the integrity of the rendered text of target elements.

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Content Attestation (CA)

## Visible Text Target Format

Below is a format of Visible Text Target.

```json
{
  "type": "VisibleTextTargetIntegrity",
  "cssSelector": "<CSS Selector>",
  "integrity": "sha256-GtNUUolQVlwIkQU9JknWkwkhfdiVmHr/BOnLFFHC5jI="
}
```

### JSON Schema

```json
{
  "title": "Visible Text Target",
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "enum": ["VisibleTextTargetIntegrity"]
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

- The type of Content Integrity Descriptor. It MUST be `VisibleTextTargetIntegrity`.
- `integrity`: REQUIRED. It MUST be the [`sriString` data type](../context.md#the-sristring-datatype). For available hash functions, it MUST conform to [Hash Algorithm](../algorithm.md#hash-algorithm-hash-algorithm). Example: `sha256-4HLmAAYVRClrk+eCIrI1Rlf5/IKK0+wGoYjRs9vzl7U=`
- `cssSelector`: REQUIRED. It MUST be a [CSS Selector (Selectors Level 3)](https://www.w3.org/TR/selectors-3/).

## Validation Process

1. Searches for an element specified by a CSS selector in the `cssSelector` property.
   The target element is searched for using the `querySelectorAll()` method, starting from the root element of the page's `document` (for example, the `<html>` element for an HTML document).
   - If there is a syntax error in the `cssSelector` property, it may be treated as a verification failure (e.g. [`DOMException`](https://developer.mozilla.org/en-US/docs/Web/API/DOMException) `SyntaxError`).
   - If no elements are found, it may be treated as a verification failure.
2. Use the [`innerText` attribute](https://html.spec.whatwg.org/multipage/dom.html#the-innertext-idl-attribute) of those elements to get the target as a `DOMString`.
3. Encode all objects into UTF-8. If there are multiple objects, combine their contents.
4. Validate the result and the `integrity` property using the methods specified in [SRI section 3.3.5](https://www.w3.org/TR/SRI/#does-response-match-metadatalist).
   - If an unsupported hash algorithm is used, it may be treated as a verification failure.

:::note

The string obtained by the [`innerText` attribute](https://html.spec.whatwg.org/multipage/dom.html#the-innertext-idl-attribute) is defined in [HTML Standard Chapter 3](https://html.spec.whatwg.org/multipage/dom.html) as the "as rendered" text obtained by executing [get the text steps](https://html.spec.whatwg.org/multipage/dom.html#get-the-text-steps). If you run [get the text steps](https://html.spec.whatwg.org/multipage/rendering.html#being-rendered) on an element that is [being rendered](https://html.spec.whatwg.org/multipage/dom.html#get-the-text-steps), you will get a string that has been processed after the [rendered text collection steps](https://html.spec.whatwg.org/multipage/dom.html#rendered-text-collection-steps) have been run, with newline characters and other processing added.

:::

:::note

Visible Text Targets use the [`innerText` attribute](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) and are different from the [`textContent` attribute](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent).
See [Differences from innerText - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext) for the main differences between the two.

:::

## How to identify element location

Searches for an element specified by the CSS selector in the `cssSelector` property.

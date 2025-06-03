---
sidebar_position: 22
original: https://github.com/originator-profile/docs.originator-profile.org/blob/de02d42/docs/opb/link-to-html.md
---

# Linking Content Attestation Set and Originator Profile Set to A HTML Document

## Summary

This document defines how a Content Attestation Set and an Originator Profile Set can be associated with a particular web page by inserting an HTML element containing the CAS and/or OPS or their URL into the HTML of the web page. Using the associated VC, a user agent can verify information about the web page and its originator and display it to the user.

## Terminology

For any terms not explained in this document, please see [Terminology](./terminology.md).

- Content Attestation (CA)
- Content Attestation Set (CAS)
- Originator Profile Set (OPS)

## Method

Use the script element. You can use either the embedded or referenced method.

The type attribute MUST be used to indicate whether the data type is CAS or OPS. For CAS, the type attribute MUST be set to `application/cas+json`, and for OPS, the type attribute MUST be set to `application/ops+json`.

### Embedded method

For embedded method, enter a JSON object in the content of the script element.

#### Examples

_This section is non-normative._

Below is an example of embedding a CAS with a single CA:

```htmlembedded
<script type="application/cas+json">
["eyJ..."]
</script>
```

Below is an example of embedding a CAS that contains two CAs:

```htmlembedded
<script type="application/cas+json">
["eyJ...", "eyJ..."]
</script>
```

Below is an example of embedding an OPS containing a single OP:

```htmlembedded
<script type="application/ops+json">
[
  {
    "core": "eyJ...",
    "annotations": ["eyJ..."],
    "media": "eyJ..."
  }
]
</script>
```

### Referenced method

For referenced method, enter the URL of the CAS or OPS in the src attribute.

The integrity attribute MUST specify a hash value of the resource referenced by the URL.
The hash value is used to verify subresource integrity (SRI).
The format of the hash value MUST be the integrity-metadata format of [SRI Section 3.5](https://www.w3.org/TR/SRI/#the-integrity-attribute). Supported hash functions MUST conform to [Hash Algorithms](./algorithm.md#hash-algorithm).

#### Examples

_This section is non-normative._

Below is an example of referencing a CAS in a URL:

```htmlembedded
<script type="application/cas+json" src="https://example.com/cas.json" integrity="sha256-XnUoFByIs5DIz6wAvte7AfpYeqPrs42KLR1Mlg9+A/M="></script>
```

Below is is an example of referencing a OPS in a URL:

```htmlembedded
<script type="application/ops+json" src="https://example.com/ops.json" integrity="sha256-XnUoFByIs5DIz6wAvte7AfpYeqPrs42KLR1Mlg9+A/M="></script>
```

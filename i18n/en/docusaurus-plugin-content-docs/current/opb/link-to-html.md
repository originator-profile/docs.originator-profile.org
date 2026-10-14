---
sidebar_position: 34
original: https://github.com/originator-profile/docs.originator-profile.org/blob/3a24ba2/docs/opb/link-to-html.md
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

The type attribute MUST be used to indicate whether the data type is CAS or OPS. For CAS, the type attribute MUST be set to `application/ca-set+json`, and for OPS, the type attribute MUST be set to `application/op-set+json`. Deprecated media types are handled as described in [Media Types](./media-types.md#deprecated).

### Embedded method

For embedded method, enter a JSON object in the content of the script element.

#### Examples

_This section is non-normative._

Below is an example of embedding a CAS with a single CA:

```htmlembedded
<script type="application/ca-set+json">
["eyJ..."]
</script>
```

Below is an example of embedding a CAS that contains two CAs:

```htmlembedded
<script type="application/ca-set+json">
["eyJ...", "eyJ..."]
</script>
```

Below is an example of embedding an OPS containing a single OP:

```htmlembedded
<script type="application/op-set+json">
[
  {
    "core": "eyJ...",
    "annotations": ["eyJ..."],
    "media": ["eyJ..."]
  }
]
</script>
```

### Referenced method

For referenced method, enter the URL of the CAS or OPS in the src attribute.

#### Examples

_This section is non-normative._

Below is an example of referencing a CAS in a URL:

```htmlembedded
<script type="application/ca-set+json" src="https://example.com/cas.json"></script>
```

Below is an example of referencing an OPS in a URL:

```htmlembedded
<script type="application/op-set+json" src="https://example.com/ops.json"></script>
```

## Linking Multiple CASs and OPSs {#multiple-sets}

A CAS or an OPS is not required to include all the VCs needed for verification.
A distributor MAY split the VCs needed for verification across multiple CASs or OPSs and link each of them with a separate script element. For example, the OPs of CA issuers and the OPs of PA issuers can be linked as separate OPSs.
A verifier uses the OPSs within the [input scope](./verifier-processing-model/content-attestation-set.mdx#input-scope) together for verification.

:::note

An OPS that includes all the OPs needed to verify the VCs it contains, and can therefore be verified on its own, may be useful, for example, for offline verification.
No media type is defined to distinguish such an OPS.

:::

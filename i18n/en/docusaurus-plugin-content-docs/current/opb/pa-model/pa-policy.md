---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/c759397/docs/opb/pa-model/pa-policy.md
tags:
  - Profile Annotation
---

# Profile Annotation Policy

## Terminology

For terms not explained in this document, please see [Terminology](../terminology.md).

- Profile Annotation (PA)
- Profile Annotation Policy

## Profile Annotation Policy Data Model

### Property

#### Profile Annotation Policy Properties {/_ #profile-annotation-policy-properties _/}

| Name          | Type     | Description                                                                                        |
| ------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `id`          | `string` | **REQUIRED.** Specify the ID of the Profile Annotation Policy in URI format.                       |
| `type`        | `string` | **REQUIRED.** It MUST be `ProfileAnnotationPolicy`.                                                |
| `name`        | `string` | **REQUIRED.** The name of the Profile Annotation Policy.                                           |
| `description` | `string` | **OPTIONAL.** The description of the Profile Annotation Policy.                                    |
| `ref`         | `string` | **RECOMMENDED.** The URL of a human-readable page for details about the Profile Annotation Policy. |

## Appendix

### Example

_This is non-normative._

Below is an example of Profile Annotation Policy.

```json
{
  "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
  "type": "ProfileAnnotationPolicy",
  "name": "<Profile Annotation Policy Name>",
  "description": "<Description of Profile Annotation Policy>",
  "ref": "https://annotation.example.org/about"
}
```

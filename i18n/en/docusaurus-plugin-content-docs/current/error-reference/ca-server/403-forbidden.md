---
sidebar_position: 3
original: https://github.com/originator-profile/docs.originator-profile.org/blob/ad5dc8d/docs/error-reference/ca-server/403-forbidden.md
---

# 403 Forbidden

## Error Code: 403

This error occurs when the `issuer` and OP Account ID do not match, or when a DELETE operation is performed in Playground mode.

## Error Message

- "Delete operations are not allowed in playground mode"
- "OP Account ID does not match the issuer of the Website Profile."
- "OP Account ID does not match the issuer of the Content Attestation."
- "OP Account ID does not match the issuer of the Web Media Profile."
- "OP Account ID does not match the issuer of the Profile Annotation."

## Causes of the Error

- When registering or updating a Website Profile, Content Attestation, Web Media Profile, or Profile Annotation, the `issuer` in the input JSON may not match the OP Account ID used for issuance.
- You may have used a DELETE operation in Playground mode.

## Example

- The following is an example where the OP Account ID used for issuing a Content Attestation and the `issuer` in the input JSON are different.

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    {
      "@language": "en-US"
    }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "dns:another.com",
  "credentialSubject": {
    "type": "Article",
    "headline": "Example Web Page",
    "image": {
      "id": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="
    },
    "description": "An example web page for content attestation",
    "author": ["John Doe"],
    "editor": ["Jane Smith"],
    "datePublished": "2023-07-04T19:14:00Z",
    "dateModified": "2023-07-04T19:14:00Z"
  },
  "allowedUrl": ["https://example.com/*"],
  "target": [
    {
      "type": "TextTargetIntegrity",
      "cssSelector": "#main",
      "content": "data:text/html,<div id=\"main\">Hello, world!</div>"
    }
  ]
}
```

Output:

```
{"statusCode":403,"error":"Forbidden","message":"OP Account ID does not match the issuer of the Content Attestation."}
```

## Solution

- Verify that the `issuer` in the input JSON matches the OP Account ID you are using.
- Check that you have not performed any DELETE operations in Playground mode.

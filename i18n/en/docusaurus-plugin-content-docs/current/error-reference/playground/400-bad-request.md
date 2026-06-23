---
sidebar_position: 1
original: https://github.com/originator-profile/docs.originator-profile.org/blob/ad5dc8d/docs/error-reference/playground/400-bad-request.md
---

# 400 Bad Request

## Error Code: 400

This error occurs in the case of a JSON schema validation error.

## Error Message

- "One or more validations failed trying to process your request."

## Causes

- The input JSON may not meet the expected schema (required fields, types, format).

## Examples

- The following is an example where the required field `issuer` is missing from the input JSON.

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
{"statusCode":400,"error":"Bad Request","message":"One or more validations failed trying to process your request.","failedValidations":{"body":{"issuer":"must be present"}}}
```

## Resolution

- Check the required fields, types, and format of the input JSON, or the error details in the response message.

## Related Information

- [Content Attestation Server Playground](/playground/)

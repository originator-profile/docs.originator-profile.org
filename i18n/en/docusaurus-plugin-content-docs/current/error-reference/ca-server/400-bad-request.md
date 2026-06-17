---
sidebar_position: 1
original: https://github.com/originator-profile/docs.originator-profile.org/blob/ad5dc8d/docs/error-reference/ca-server/400-bad-request.md
---

# 400 Bad Request

## Error Code: 400

This error primarily occurs when there are validation errors in the JSON schema.

## Error Messages

- "One or more validations failed trying to process your request."
- "PrismaClientKnownRequestError: <Error Code>"
- "Web Media Profile must have credentialSubject.id"
- "Profile Annotation must have credentialSubject.id"
- "`<Error message during Site Profile verification>`"

## Causes of the Error

- The input JSON may not meet the expected schema (required fields, types, and format).
- A PrismaClientKnownRequestError (other than P2025) may have occurred.
  (See [the Prisma Error Reference](https://www.prisma.io/docs/orm/reference/error-reference#prismaclientknownrequesterror) for details.)
- The `credentialSubject.id` may not have been included when registering or updating the Web Media Profile or Profile Annotation.
- Site Profile verification may have failed when registering or updating the Site Profile.
  (See [the Site Profile](../../opb/site-profile.md) for details.)

## Example

- The following is an example where the required field `issuer` is not included.

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

## Solution

- Check the required fields, types, and format of the input JSON, or the error details in the response message.
- If a PrismaClientKnownRequestError occurs, refer to the Prisma error reference.
- Ensure that `credentialSubject.id` is included in the Web Media Profile and Profile Annotation.
- Modify the input content so that the Site Profile validation passes.

## Related Information

- [Prisma Error Reference](https://www.prisma.io/docs/orm/reference/error-reference)
- [Site Profile](../../opb/site-profile.md)

---
sidebar_position: 1
original: https://github.com/originator-profile/docs.originator-profile.org/blob/fcee115/docs/error-reference/ca-server/400-bad-request.md
---

# 400 Bad Request

## Error Code: 400

This error primarily occurs when there are validation errors in the JSON schema.

## Error Message

- "One or more validations failed trying to process your request."
- "PrismaClientKnownRequestError: \<Error Code\>"
- "Web Media Profile must have credentialSubject.id"
- "Profile Annotation must have credentialSubject.id"
- "\<Error message during Site Profile verification\>"

## Causes

- The input JSON may not meet the expected schema (required fields, types, and format).
- A PrismaClientKnownRequestError (other than P2025) may have occurred.
  (See [the Prisma Error Reference](https://www.prisma.io/docs/orm/reference/error-reference#prismaclientknownrequesterror) for details.)
- The `credentialSubject.id` may not have been included when registering or updating the Web Media Profile or Profile Annotation.
- Site Profile verification may have failed when registering or updating the Site Profile.
  (For details, please refer to the [Error Reference for Site Profile](/error-reference/op-inspector-debugger/sp).)
- Additionally, since the Originator Profile Set is validated as part of the Site Profile validation process, the validation of the Originator Profile Set may have failed.  
(For details, please refer to the [Error Reference for Originator Profile Set](/error-reference/op-inspector-debugger/ops) or the [Error Reference for Originator Profile](/error-reference/op-inspector-debugger/op).)

## Examples

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

## Resolution

- Check the required fields, types, and format of the input JSON, or the error details in the response message.
- If a PrismaClientKnownRequestError occurs, refer to the Prisma error reference.
- Ensure that `credentialSubject.id` is included in the Web Media Profile and Profile Annotation.
- Please correct the input so that the Site Profile or Originator Profile Set passes validation.  
(If validation for the Site Profile or Originator Profile Set fails, referring to the [Error Reference for Site Profiles](/error-reference/op-inspector-debugger/sp), [Error Reference for Originator Profile Sets](/error-reference/op-inspector-debugger/ops), or [Error Reference for Originator Profiles](/error-reference/op-inspector-debugger/op) may help identify the cause.)

## Related Information

- [Prisma Error Reference](https://www.prisma.io/docs/orm/reference/error-reference)
- [Site Profile](../../opb/site-profile.md)
- [Originator Profile Set](../../opb/originator-profile-set.md)
- [Error reference for Site Profile](/error-reference/op-inspector-debugger/sp)
- [Error reference for Originator Profile Set](/error-reference/op-inspector-debugger/ops)
- [Error reference for Originator Profile](/error-reference/op-inspector-debugger/op)

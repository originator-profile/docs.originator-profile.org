---
sidebar_position: 4
original: https://github.com/originator-profile/docs.originator-profile.org/blob/ad5dc8d/docs/error-reference/ca-server/404-not-found.md
---

# 404 Not Found

## Error code: 404

Occurs when accessing a resource that does not exist.

## Error message

- "Not Found"
- "resource not found."
- "Holder with ID <holderId> does not exist. Please ensure the account is registered."
- "The issuer or holder specified in the Web Media Profile does not exist in the system."
- "The issuer or holder specified in the Profile Annotation does not exist in the system."
- "Website Profile not found."
- "OP Account not found."
- "Issuer with ID <issuerId> not found."
- "Holder with ID <holderId> not found."

## Causes of the Error

- You may have attempted to access an operation or endpoint that is not available.
- You may have encountered a PrismaClientKnownRequestError "P2025".
(For details, please refer to the [Prisma Error Reference](https://www.prisma.io/docs/orm/reference/error-reference#p2025).)
- The `credentialSubject.id` in the JSON entered during Profile Annotation/Web Media Profile registration/update may not exist in the database.
- You may have encountered a "Foreign key constraint violated" or a PrismaClientKnownRequestError "P2003" during Profile Annotation/Web Media Profile registration/update.
(For details, please refer to the [Prisma Error Reference](https://www.prisma.io/docs/orm/reference/error-reference#p2003).)
- The specified Website Profile may not have been found.
- The OP Account may not have been found in the database.
- The Issuer ID may not have been found in the database.
- The Holder ID may not have been found in the database.

## Example

- The following is an example of accessing an operation or endpoint that is not available.

```sh
curl -X GET https://example/pa -u <username>:<password>
```

Output:

```
{"statusCode":404,"error":"Not Found","message":"Not found."}
```

- The following is an example of attempting to retrieve a Website Profile that does not exist in the database.

```sh
curl -X GET https://example/wsp/https%3A%2F%2Fexample.com -u <username>:<password>
```

Output:

```
{"statusCode":404,"error":"Not Found","message":"Website Profile not found."}
```

## Solution

- Check each error message.
- Verify that the target URL, endpoint, and HTTP method are correct.
- Check the `credentialSubject.id` and `issuer` in the input JSON for Profile Annotation and Web Media Profile.
- Specify data that exists in the database.

## Related Information

- [Prisma Error Reference](https://www.prisma.io/docs/orm/reference/error-reference)

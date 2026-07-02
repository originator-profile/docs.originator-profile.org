---
sidebar_position: 2
original: https://github.com/originator-profile/docs.originator-profile.org/blob/ad5dc8d/docs/error-reference/playground/401-unauthorized.md
---

# 401 Unauthorized

## Error code: 401

This occurs when the authentication information is invalid.

## Error message

- "Invalid password"

## Cause of the error

- Authentication information, such as the username or password, may be incorrect.

## Example

- The following is an example of what happens when the passwords do not match.

```sh
curl -X POST https://example/ca -H content-type:application/json -u <username>:<invalid password> -d '{...}'
```

Output:

```
{"statusCode":401,"error":"Unauthorized","message":"Invalid password"}
```

## Resolution

- Please check that your username and password are correct.

## Related Information

- [Content Attestation Server Playground](/playground/)

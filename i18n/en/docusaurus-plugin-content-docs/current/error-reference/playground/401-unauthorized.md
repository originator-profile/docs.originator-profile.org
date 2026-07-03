---
sidebar_position: 2
original: https://github.com/originator-profile/docs.originator-profile.org/blob/ad5dc8d/docs/error-reference/playground/401-unauthorized.md
---

# 401 Unauthorized

## Error Code: 401

This error occurs when the authentication information is invalid.

## Error Message

- "Invalid password"

## Causes

- Authentication information, such as the username or password, may be incorrect.

## Examples

- The following is an example of what happens when the passwords do not match.

```sh
curl -X POST https://example/ca -H content-type:application/json -u <username>:<invalid password> -d '{...}'
```

Output:

```
{"statusCode":401,"error":"Unauthorized","message":"Invalid password"}
```

## Resolution

- Check that your username and password are correct.

## Related Information

- [Content Attestation Server Playground](/playground/)

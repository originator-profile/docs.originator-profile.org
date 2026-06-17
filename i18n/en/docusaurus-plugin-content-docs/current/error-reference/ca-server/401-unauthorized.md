---
sidebar_position: 2
original: https://github.com/originator-profile/docs.originator-profile.org/blob/ad5dc8d/docs/error-reference/ca-server/401-unauthorized.md
---

# 401 Unauthorized

## Error Code: 401

This error occurs when authentication credentials are invalid.

## Error Message

- "Invalid password"

## Cause of the Error

- The authentication information, such as the username or password, may be incorrect.

## Example

- The following is an example of what happens when the password is incorrect.

```sh
curl -X POST https://example/ca -H content-type:application/json -u <username>:<invalid password> -d '{...}'
```

Output:

```
{"statusCode":401,"error":"Unauthorized","message":"Invalid password"}
```

## Solution

- Please verify that your username and password are correct.

---
sidebar_position: 4
original: https://github.com/originator-profile/docs.originator-profile.org/blob/ad5dc8d/docs/error-reference/playground/404-not-found.md
---

# 404 Not Found

## Error Code: 404

This occurs when accessing an undefined endpoint.

## Error Message

- "404 Not Found"

## Cause of the Error

- You may have attempted to access an operation or endpoint that is not available.

## Example

- The following is an example using the DELETE operation.

```sh
curl -X DELETE https://example/ca/urn:uuid:1d45253a-4c4b-4f68-863c-077e24245532 -u <username>:<password>
```

Output:

```
404 Not Found
```

## Solution

- Verify that the target URL, endpoint, and HTTP method are correct.

## Related Information

- [Content Attestation Server Playground](/playground/)

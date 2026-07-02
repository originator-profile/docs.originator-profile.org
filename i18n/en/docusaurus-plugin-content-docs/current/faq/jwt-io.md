---
sidebar_position: 4
original: https://github.com/originator-profile/docs.originator-profile.org/blob/4cb55e7/docs/faq/jwt-io.md
---

# How to Use jwt.io

- VCs specified by the OP can be signed with JWT.
- For the format of signing with JWT, refer to the [OP VC Securing Mechanism](https://docs.originator-profile.org/en/opb/securing-mechanism/).

## How to Verify JWT Signature

Example of JWT

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY3JlZGVudGlhbHMvdjEiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY2lwL3YxIix7IkBsYW5ndWFnZSI6ImphIn1dLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiV2Vic2l0ZVByb2ZpbGUiXSwiaXNzdWVyIjoiZG5zOmV4YW1wbGUuY29tIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJodHRwczovL21lZGlhLmV4YW1wbGUuY29tIiwidHlwZSI6IldlYlNpdGUiLCJuYW1lIjoiPFdlYuOCteOCpOODiOOBruOCv-OCpOODiOODqz4iLCJkZXNjcmlwdGlvbiI6IjxXZWLjgrXjgqTjg4jjga7oqqzmmI4-IiwiaW1hZ2UiOnsiaWQiOiJodHRwczovL21lZGlhLmV4YW1wbGUuY29tL2ltYWdlLnBuZyIsImRpZ2VzdFNSSSI6InNoYTI1Ni1VcHduN2dZTXVSbUpsRDFaaXZIazg3NnZYSHpva1hyd1hqNTBWZ2ZuTW5ZPSJ9LCJhbGxvd2VkT3JpZ2luIjpbImh0dHBzOi8vbWVkaWEuZXhhbXBsZS5jb20iXX0sImlzcyI6ImRuczpleGFtcGxlLmNvbSIsInN1YiI6Imh0dHBzOi8vbWVkaWEuZXhhbXBsZS5jb20iLCJpYXQiOjE3ODE4NDQ0NDUsImV4cCI6MTgxMzM4MDQ0NX0.6RWZsUVYTO2yBUWgOpDgNAt-JbVkeQvyLxz-r8-VIzzLls9wqpA-QDZUKuseVgtUZ-z9af9XHPUZHsYqjQx6qA
```

1. Visit the [JSON Web Token (JWT) Debugger](https://jwt.io) and paste the VC specified by the OP into the "Encoded" field on the left.
2. In the "Verify Signature" section at the bottom right of the screen, set the "Public Key Format" to JWK and paste the public key found in the VC issuer's Core Profile.
3. If "Signature Verified" appears below the "Encoded" field, the verification is successful.

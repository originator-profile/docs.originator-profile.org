---
sidebar_position: 4
original: https://github.com/originator-profile/cip.docs.originator-profile.org/blob/995a25f/docs/studies/general-instruction/jwt-io.md
---

# How to Use jwt.io

:::note
このページは翻訳中です。
:::

- VCs specified by the OP can be signed with JWT.
- For the format of signing with JWT, refer to the [OP VC Securing Mechanism](https://docs.originator-profile.org/en/opb/securing-mechanism/).

## How to Verify JWT Signature

Example of JWT

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY3JlZGVudGlhbHMvdjEiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY2lwL3YxIix7IkBsYW5ndWFnZSI6ImphIn1dLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiV2Vic2l0ZVByb2ZpbGUiXSwiaXNzdWVyIjoiZG5zOmV4YW1wbGUuY29tIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJodHRwczovL21lZGlhLmV4YW1wbGUuY29tIiwidHlwZSI6IldlYlNpdGUiLCJuYW1lIjoiPFdlYuOCteOCpOODiOOBruOCv-OCpOODiOODqz4iLCJkZXNjcmlwdGlvbiI6IjxXZWLjgrXjgqTjg4jjga7oqqzmmI4-IiwiaW1hZ2UiOnsiaWQiOiJodHRwczovL21lZGlhLmV4YW1wbGUuY29tL2ltYWdlLnBuZyIsImRpZ2VzdFNSSSI6InNoYTI1Ni1VcHduN2dZTXVSbUpsRDFaaXZIazg3NnZYSHpva1hyd1hqNTBWZ2ZuTW5ZPSJ9LCJhbGxvd2VkT3JpZ2luIjpbImh0dHBzOi8vbWVkaWEuZXhhbXBsZS5jb20iXX0sImlzcyI6ImRuczpleGFtcGxlLmNvbSIsInN1YiI6Imh0dHBzOi8vbWVkaWEuZXhhbXBsZS5jb20iLCJpYXQiOjE3ODE4NDQ0NDUsImV4cCI6MTgxMzM4MDQ0NX0.6RWZsUVYTO2yBUWgOpDgNAt-JbVkeQvyLxz-r8-VIzzLls9wqpA-QDZUKuseVgtUZ-z9af9XHPUZHsYqjQx6qA
```

1. [JSON Web Token（JWT）デバッガー](https://jwt.io) にアクセスして、左側の「エンコードされた値」に OP で定める VC を貼り付けます。
2. JSON Web Token（JWT）デバッガーの画面の右下、「JWT 署名の検証」にて、「公開鍵の形式」を JWK に設定し、VC 発行者の Core Profile に含まれる公開鍵を貼り付けます。
3. 「エンコードされた値」下部に Signature Verified と表示されれば OK です。

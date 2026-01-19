---
sidebar: 62
tags:
  - Trouble Shooting
---

# ERR_SITE_PROFILE_INVALID

## エラーコード：ERR_SITE_PROFILE_INVALID

Site Profile 検証時に Site Profile が無効な形式になっている場合に発生します。

## エラーメッセージ

- "Originator Profile Set invalid"
- "Website Profile invalid"
- "Appropriate Core Profile not found"

## エラーの原因

- Site Profile の Originator Profile Set が無効な形式となっている可能性があります。
  [`ERR_ORIGINATOR_PROFILE_SET_INVALID`](../ops/ERR_ORIGINATOR_PROFILE_SET_INVALID.md) にてより詳しい原因を知ることができます。
- Website Profile の復号に失敗した可能性があります。
  [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md) にてより詳しい原因を知ることができます。
- Originator Profile Set の Core Profile の `credentialSubject.id` と Website Profile の `issuer` が異なっている可能性があります。
  [`ERR_CORE_PROFILE_NOT_FOUND`](../op/ERR_CORE_PROFILE_NOT_FOUND.md) にてより詳しい原因を知ることができます。

## 例

- Website Profile の文頭が一部欠損した形で配置。

```
{
  "originators": [
    {
      "core": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ...",
      "annotations": [
        "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ...
      ],
      "media": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ..."
    }
  ],,
  "credential": "yJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ..."
}
```

- Website Profile の `issuer` を Core Profile の `credentialSubject.id` と異なるものにして発行。
  Core Profile の `credentialSubject.id` が `dns:example.com` の時、 Profile Annotation の `issuer` を `dns:another.com` とする。

```
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "ja" }
  ],
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "dns:another.com",
  "credentialSubject": {
    "id": "https://media.example.com",
    "type": "WebSite",
    "name": "<Webサイトのタイトル>",
    "description": "<Webサイトの説明>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-Upwn7gYMuRmJlD1ZivHk876vXHzokXrwXj50VgfnMnY="
    },
    "allowedOrigin": ["https://media.example.com"]
  }
}
```

## 解決策

- Originator Profile Set の内容をご確認ください。
  より詳しくは [`Originator Profile Set`](../../opb/originator-profile-set.md) にて確認することができます。
- Website Profile の内容をご確認ください。
  より詳しくは [`Website Profile`](../../opb/website-profile.md) にて確認することができます。
- Originator Profile Set の Core Profile の `credentialSubject.id` と Website Profile の `issuer` が一致する適切な Website Profile を含めてください。

## 関連情報

- [`Website Profile`](../../opb/website-profile.md)
- [`Originator Profile Set`](../../opb/originator-profile-set.md)
- [`Site Profile`](../../opb/site-profile.md)
- [`ERR_CORE_PROFILE_NOT_FOUND`](../op/ERR_CORE_PROFILE_NOT_FOUND.md)
- [`ERR_ORIGINATOR_PROFILE_SET_INVALID`](../ops/ERR_ORIGINATOR_PROFILE_SET_INVALID.md)
- [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md)

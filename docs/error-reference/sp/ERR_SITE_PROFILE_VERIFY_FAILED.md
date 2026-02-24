---
sidebar_position: 4
tags:
  - Error Reference
slug: /error-reference/ERR_SITE_PROFILE_VERIFY_FAILED
---

# ERR_SITE_PROFILE_VERIFY_FAILED

## エラーコード: ERR_SITE_PROFILE_VERIFY_FAILED

Site Profile の検証に失敗した場合に発生します。

## エラーメッセージ

- "Originator Profile Set verify failed"
- "Website Profile verify failed"
- "Origin not allowed"

## エラーの原因

- Site Profile の Originator Profile Set の検証に失敗した可能性があります。[`ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED`](../ops/ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED.md) にてより詳しい原因を知ることができます。
- Website Profile の検証に失敗した可能性があります。[`ERR_VC_VERIFY_FAILED`](../vc/ERR_VC_VERIFY_FAILED.md) にてより詳しい原因を知ることができます。
- `allowedOrigin` の値が異なっている可能性があります。

## 例

- Website Profile の文末が一部欠損した形で配置。

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
  ],
  "credential": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4ME...GUyq3sbQiEO_tCjS2UY3gi9vOTS8NvlA_htihDJZUT8DZliZ7mgkrr3NRxDGVUeT9s2svRLt2gA"
}
```

- `allowedOrigin` プロパティが異なる Website Profile を Site Profile に配置。
  次の例では、Origin が https://media.example.com のサイトに設置する Site Profile に対して、 `allowedOrigin` プロパティを https://another.com として Website Profile を発行。

```
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "ja" }
  ],
  "type": ["VerifiableCredential", "WebsiteProfile"],
  "issuer": "dns:example.com",
  "credentialSubject": {
    "id": "https://media.example.com",
    "type": "WebSite",
    "name": "<Webサイトのタイトル>",
    "description": "<Webサイトの説明>",
    "image": {
      "id": "https://media.example.com/image.png",
      "digestSRI": "sha256-Upwn7gYMuRmJlD1ZivHk876vXHzokXrwXj50VgfnMnY="
    },
    "allowedOrigin": ["https://another.com"]
  }
}
```

## 解決策

- 検証に失敗している Core Profile、Profile Annotation、Web Media Profile の内容をご確認ください。
- Website Profile の内容をご確認ください。
  より詳しくは [Website Profile](../../opb/website-profile.md) にて確認することができます。
- Website Profile の `allowedOrigin` が適切な値となっているかご確認ください。

## 関連情報

- [`Website Profile`](../../opb/website-profile.md)
- [`Originator Profile Set`](../../opb/originator-profile-set.md)
- [`Site Profile`](../../opb/site-profile.md)
- [`ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED`](../ops/ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED.md)
- [`ERR_VC_VERIFY_FAILED`](../vc/ERR_VC_VERIFY_FAILED.md)

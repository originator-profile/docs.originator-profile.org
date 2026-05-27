---
sidebar_position: 3
tags:
  - Error Reference
  - Profile Annotation
  - Web Media Specific Model
slug: /error-reference/ERR_ORIGINATOR_PROFILE_INVALID
---

# ERR_ORIGINATOR_PROFILE_INVALID

## エラーコード: ERR_ORIGINATOR_PROFILE_INVALID

Originator Profile が無効な形式になっている場合に発生します。

## エラーメッセージ

- "Core Profile decode failed"
- "Profile Annotation decode failed"
- "Web Media Profile decode failed"
- "Subject mismatch between Core Profile and Web Media Profile"
- "Subject mismatch between Core Profile and Profile Annotation"

## エラーの原因

- Core Profile の復号に失敗している可能性があります。
- Profile Annotation の復号に失敗している可能性があります。
- Web Media Profile の復号に失敗している可能性があります。
- Core Profile と Profile Annotation の `credentialSubject.id` が一致していない可能性があります。
- Core Profile と Web Media Profile の `credentialSubject.id` が一致していない可能性があります。

## 例

- Core Profile の文頭を一部欠損した形で設置。

```
    <script type="application/ops+json">
      [
        {
          "core": "yJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcEJQeEJwZ0EzUUM3ZVp1OXdLT2toOW1ZUFUiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ..."
        }
      ]
    </script>
```

- Core Profile の `credentialSubject.id` と Profile Annotation の `credentialSubject.id` を異なるものにして発行。
  次の例では、Core Profile の `credentialSubject.id` が `dns:cert-holder.example.jp` の時、 Profile Annotation の `credentialSubject.id` を `dns:another.org` とする。

```
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    {
      "@language": "ja"
    }
  ],
  "type": ["VerifiableCredential", "ProfileAnnotation"],
  "issuer": "dns:profile-annotation-issuer.example.org",
  "credentialSubject": {
    "id": "dns:another.org",
    "name": "<PA 名>",
    "description": "<PA の説明>",
    "annotation": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "ProfileAnnotationPolicy",
      "name": "<Profile Annotation Policy 名>",
      "description": "<Profile Annotation Policy の説明>",
      "ref": "https://annotation.example.org/about"
    }
  }
}
```

## 解決策

- 無効な形式となっている Core Profile、Profile Annotation、Web Media Profile をご確認ください。
  より詳しくは [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md) にて確認することができます。
- Core Profile と Profile Annotation の `credentialSubject.id` が一致しているかご確認ください。
  より詳しくは [Core Profile](../../opb/cp.md) と [Profile Annotation](../../opb/pa.md) にて確認することができます。
- Core Profile と Web Media Profile の `credentialSubject.id` が一致しているかご確認ください。
  より詳しくは [Core Profile](../../opb/cp.md) と [Web Media Profile](../../opb/web-media-profile.md) にて確認することができます。

## 関連情報

- [`Core Profile`](../../opb/cp.md)
- [`Profile Annotation`](../../opb/pa.md)
- [`Web Media Profile`](../../opb/web-media-profile.md)
- [`ERR_ORIGINATOR_PROFILE_VERIFY_FAILED`](../op/ERR_ORIGINATOR_PROFILE_VERIFY_FAILED.md)
- [`ERR_ORIGINATOR_PROFILE_SET_INVALID`](../ops/ERR_ORIGINATOR_PROFILE_SET_INVALID.md)
- [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md)

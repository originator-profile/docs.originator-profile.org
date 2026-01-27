---
sidebar_position: 4
tags:
  - Error Reference
  - Profile Annotation
  - Web Media Specific Model
---

# ERR_ORIGINATOR_PROFILE_VERIFY_FAILED

## エラーコード: ERR_ORIGINATOR_PROFILE_VERIFY_FAILED

Originator Profile の検証に失敗した場合に発生します。

## エラーメッセージ

- "Core Profile verify failed"
- "Profile Annotation verify failed"
- "Web Media Profile verify failed"

## エラーの原因

- Core Profile の検証に失敗している可能性があります。
- Profile Annotation の検証に失敗している可能性があります。
- Web Media Profile の検証に失敗している可能性があります。

検証の失敗は次の原因を含みます。

- 復号に失敗している可能性があります。
  [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md) にてより詳しい原因を知ることができます。
- Core Profile の検証結果が見つからなかった可能性があります。
- Profile Annotation 発行者の Core Profile が見つからなかった可能性があります。
  [`ERR_CORE_PROFILE_NOT_FOUND`](./ERR_CORE_PROFILE_NOT_FOUND.md) にてより詳しい原因を知ることができます。
- Web Media Profile 発行者の Core Profile が見つからなかった可能性があります。
  [`ERR_CORE_PROFILE_NOT_FOUND`](./ERR_CORE_PROFILE_NOT_FOUND.md) にてより詳しい原因を知ることができます。
- 署名の検証に失敗した可能性があります。
- Profile Annotation が有効期限外となっている可能性があります。
  [`ERR_CERTIFICATE_EXPIRED`](./ERR_CERTIFICATE_EXPIRED.md) にてより詳しい原因を知ることができます。

## 例

- Core Profile の文末を一部欠損した形で設置。

```
    <script type="application/ops+json">
      [
        {
          "core": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpKWXM1X0lMZ1VjODE4MEwtcE...RXpun0HYErCDkbzuEMkXO8edtMM_8Znlm6fzElEKWg79ShDrvRKGQNkr41cpl7ycLzFIbKk7epRTlStlq"
        }
      ]
    </script>
```

- Profile Annotation の `validFrom` プロパティに現在の日付より後のものが設定されている。

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
  "issuer": "dns:profile-annotator.example.org",
  "credentialSubject": {
    "id": "dns:pa-holder.example.org",
    "name": "<PA 名>",
    "description": "<PA の説明>",
    "annotation": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "ProfileAnnotationPolicy",
      "name": "<Profile Annotation Policy 名>",
      "description": "<Profile Annotation Policy の説明>",
      "ref": "https://annotation.example.org/about"
    }
  },
  "validFrom": "2030-03-31T14:59:59Z"
}
```

## 解決策

- 検証失敗となっている [Core Profile](../../opb/cp.md)、[Profile Annotation](../../opb/pa.md)、[Web Media Profile](../../opb/web-media-profile.md) の内容をご確認ください。
  より詳しくは、エラーの原因に対応したエラーコードドキュメントまたは、仕様から確認することができます。

## 関連情報

- [`Core Profile`](../../opb/cp.md)
- [`Profile Annotation`](../../opb/pa.md)
- [`Web Media Profile`](../../opb/web-media-profile.md)
- [`ERR_CERTIFICATE_EXPIRED`](../op/ERR_CERTIFICATE_EXPIRED.md)
- [`ERR_CORE_PROFILE_NOT_FOUND`](../op/ERR_CORE_PROFILE_NOT_FOUND.md)
- [`ERR_ORIGINATOR_PROFILE_INVALID`](../op/ERR_ORIGINATOR_PROFILE_INVALID.md)
- [`ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED`](../ops/ERR_ORIGINATOR_PROFILE_SET_VERIFY_FAILED.md)
- [`ERR_VC_DECODE_FAILED`](../vc/ERR_VC_DECODE_FAILED.md)
- [`ERR_VC_VERIFY_FAILED`](../vc/ERR_VC_VERIFY_FAILED.md)

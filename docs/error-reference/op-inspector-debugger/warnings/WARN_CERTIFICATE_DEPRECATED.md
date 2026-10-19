---
sidebar_position: 1
tags:
  - Error Reference
  - Profile Annotation
slug: /error-reference/WARN_CERTIFICATE_DEPRECATED
---

# WARN_CERTIFICATE_DEPRECATED

## 警告コード: WARN_CERTIFICATE_DEPRECATED

非推奨の [Certificate](../../../opb/certificate.md) 形式の Profile Annotation を検出した場合に通知されます。検証の失敗としては扱われません。

## 警告メッセージ

- "Certificate is deprecated (OP[`i`].PA[`j`])"

`i` は Originator Profile Set 内の OP の位置、`j` はその OP に含まれる PA の位置を表します。

## 警告の原因

- Profile Annotation の `type` に `ProfileAnnotation` が含まれていません。旧形式の Certificate（`type` が `["VerifiableCredential", "Certificate"]`）で発行されている可能性があります。

## 例

- `type` が `["VerifiableCredential", "Certificate"]` になっている。

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    { "@language": "ja" }
  ],
  "type": ["VerifiableCredential", "Certificate"],
  "issuer": "dns:cert-issuer.example.org",
  "credentialSubject": {
    "id": "dns:cert-holder.example.jp",
    "type": "CertificateProperties",
    "certificationSystem": {
      "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
      "type": "CertificationSystem",
      "name": "<認証制度名>"
    }
  }
}
```

## 解決策

- 2027-01-01 以降、Certificate は検証できなくなります。それまでに [Profile Annotation](../../../opb/pa.md) を発行するよう変更してください。
  Certificate の仕様は [Certificate](../../../opb/certificate.md) にて確認することができます。

## 関連情報

- [`Certificate`](../../../opb/certificate.md)
- [`Profile Annotation`](../../../opb/pa.md)
- [`INFO_PA_ISSUER_NOT_REGISTERED`](./INFO_PA_ISSUER_NOT_REGISTERED.md)

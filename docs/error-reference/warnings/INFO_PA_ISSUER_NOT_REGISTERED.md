---
sidebar_position: 5
tags:
  - Error Reference
  - Profile Annotation
slug: /error-reference/INFO_PA_ISSUER_NOT_REGISTERED
---

# INFO_PA_ISSUER_NOT_REGISTERED

## 情報コード: INFO_PA_ISSUER_NOT_REGISTERED

Profile Annotation の発行者が、その PA の `credentialSubject.annotation`（[Profile Annotation Policy](../../opb/pa-model/pa-policy.md)）に基づく PA の発行を、[Profile Annotation Issuer 認定証 PA](../../opb/pa-model/profile-annotation-issuer-accreditation.md) によって認可されていることを確認できなかった場合に通知されます。警告ではなく情報として通知され、検証の失敗としては扱われません。

## 情報メッセージ

- "Profile Annotation Issuer is not registered for this annotation scheme (OP[`i`].PA[`j`] issuer: `<発行者の OP ID>`, scheme: `<Profile Annotation Policy の ID>`)"

`i` は Originator Profile Set 内の OP の位置、`j` はその OP に含まれる PA の位置を表します。`scheme` は Profile Annotation Policy の ID で、取得できない場合は `unknown` になります。

## 情報の原因

- Profile Annotation Issuer が Profile Annotation Issuer 認定証 PA を保有していません。
- Profile Annotation Issuer 認定証 PA の `credentialSubject.annotationScheme` に、検証対象の Profile Annotation Policy の ID が含まれていません。
- Profile Annotation Issuer 認定証 PA の `issuer` が、検証者が信頼する OP レジストリではありません。
- 検証対象の PA に Profile Annotation Policy の ID が設定されていません。

## 例

- Profile Annotation Policy の ID が、Profile Annotation Issuer 認定証 PA の `credentialSubject.annotationScheme` に含まれていない。

検証対象 PA の `credentialSubject.annotation`:

```json
{
  "annotation": {
    "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
    "type": "ProfileAnnotationPolicy"
  }
}
```

Profile Annotation Issuer 認定証 PA の `credentialSubject.annotationScheme`:

```json
{
  "annotationScheme": ["urn:uuid:def09cbd-6e8e-4c73-856d-5e00dffde643"]
}
```

## 解決策

- 認可を確認できないことは、検証対象の PA 自体が無効であることを直ちに意味しません。未確認の PA をどう扱うかは検証者のポリシーに依存します。
- PA を発行している場合は、OP レジストリから Profile Annotation Issuer 認定証 PA を発行してもらい、`annotationScheme` に発行する Profile Annotation Policy の ID が含まれていることを確認してください。
  より詳しくは [Profile Annotation Issuer 認定証 PA](../../opb/pa-model/profile-annotation-issuer-accreditation.md) にて確認することができます。

## 関連情報

- [`Profile Annotation Issuer 認定証 PA`](../../opb/pa-model/profile-annotation-issuer-accreditation.md)
- [`Profile Annotation`](../../opb/pa.md)
- [`WARN_CERTIFICATE_DEPRECATED`](./WARN_CERTIFICATE_DEPRECATED.md)

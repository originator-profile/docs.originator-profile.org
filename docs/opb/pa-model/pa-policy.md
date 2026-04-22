---
tags:
  - Profile Annotation
---

# Profile Annotation Policy

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

- Profile Annotation (PA)
- Profile Annotation Policy

## Profile Annotation Policy のデータモデル

### プロパティ

#### Profile Annotation Policy のプロパティ一覧 {#profile-annotation-policy-properties}
| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | **REQUIRED.** Profile Annotation Policy の ID を URI 形式で指定してください。 |
| `type` | `array` | **REQUIRED.** `ProfileAnnotationPolicy` でなければなりません (MUST)。 |
| `name` | `string` | **REQUIRED.** Profile Annotation Policy の名前です。 |
| `description` | `string` | **OPTIONAL.** Profile Annotation Policy の説明です。 |
| `ref` | `string` | **RECOMMENDED.** Profile Annotation Policy の詳細を知るための人が読むためのページの URL です。 |

## Appendix

### 例

_このセクションは非規範的です。_

Profile Annotation Policy のデータモデルの具体例を次に示します。

```json
{
  "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
  "type": "ProfileAnnotationPolicy",
  "name": "<Profile Annotation Policy 名>",
  "description": "<Profile Annotation Policy の説明>",
  "ref": "https://annotation.example.org/about"
}
```

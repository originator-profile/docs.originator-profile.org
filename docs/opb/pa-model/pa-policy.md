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

#### `id`

REQUIRED. Profile Annotation Policy の ID を URI 形式で指定してください。

#### `type`

REQUIRED. `ProfileAnnotationPolicy` でなければなりません (MUST)。

#### `name`

REQUIRED. Profile Annotation Policy の名前です (文字列)。

#### `description`

OPTIONAL. Profile Annotation Policy の説明です (文字列)。

#### `ref`

RECOMMENDED. Profile Annotation Policy の詳細を知るための人が読むためのページの URL です。

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

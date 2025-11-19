---
tags:
  - Profile Annotation
---

# 認証制度

認証制度は、Profile Annotation (PA) の発行根拠となる第三者認証制度を識別し、その詳細情報を提供するための PA のサブモデルです。

## 用語

本文書に説明のない用語については、[用語](../terminology.md)を参照してください。

## 認証制度のデータモデル

### プロパティ

#### `id`

REQUIRED. 認証制度の ID を URI 形式で指定してください。

#### `type`

REQUIRED. `CertificationSystem` でなければなりません (MUST)。

#### `name`

REQUIRED. 認証制度の名前です。

#### `description`

OPTIONAL. 認証制度の説明です（文字列）。

#### `ref`

RECOMMENDED. 認証制度の詳細を知るための人が読むためのページの URL です。

## Appendix

### 例

_このセクションは非規範的です。_

認証制度のデータモデルの具体例を次に示します。

```json
{
  "id": "urn:uuid:14270f8f-9f1c-4f89-9fa4-8c93767a8404",
  "type": "CertificationSystem",
  "name": "<認証制度名>",
  "description": "<認証制度の説明>",
  "ref": "https://certification.example.org/about"
}
```

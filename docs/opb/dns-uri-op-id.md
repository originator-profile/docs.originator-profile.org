---
sidebar_position: 33
---

# DNS URI OP ID

## 用語

本文書に説明のない用語については、[用語](./terminology.md)を参照してください。

- Core Profile (CP)
- Originator Profile (OP)
- Originator Profile Identifier (OP ID)
- Originator Profile Set (OPS)
- Site Profile (SP)

## 形式

[DNS URI](https://www.rfc-editor.org/rfc/rfc4501.html) でなければなりません (MUST)。

例:

```
dns:example.org
```

## 公開鍵の配布 {#public-key-distribution}

OP ID 保有組織の OP を得ることで公開鍵を得ることができます。

## OP の取得プロセス {#resolve}

OP ID 保有組織の OP を得るには、[Originator Profile Set (OPS)](./originator-profile-set.md) を取得してから、[Core Profile (CP)](./cp.md) 保有組織の OP ID を検索します。

OPS を得るには、[Site Profile](./site-profile.md) に定められた方法で特定のドメインから取得するか、[HTML 文書への Originator Profile Set の紐づけ](./link-to-html.md)に定められた方法で特定の Web ページから取得してください (RECOMMENDED)。

:::note

DNS URI OP ID 単体での OP の取得プロセスは未定義です。

:::

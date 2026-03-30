---
sidebar_position: 41
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

ID は、[RFC 4501](https://www.rfc-editor.org/rfc/rfc4501.html) の定義する DNS URI のうち、`dnsauthority` および `dnsquery` を含まない形式 `dns:<dnsname>` でなければならない (MUST)。
当該 `dnsname` は [RFC 1034](https://www.rfc-editor.org/rfc/rfc1034) および [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035) の定める完全修飾ドメイン名 (FQDN) であり、かつ [RFC 1123](https://www.rfc-editor.org/rfc/rfc1123) が規定するホスト名に適合しなければならない。国際化ドメイン名を使用する場合は [RFC 5890](https://www.rfc-editor.org/rfc/rfc5890) に従い A-label 表現 (Punycode) を用いなければならない。いずれの場合も末尾に `.` を含めてはならない (MUST)。
ただし、`dns:localhost` は [RFC 6761](https://www.rfc-editor.org/rfc/rfc6761.html) が定める特殊用途ドメイン名 `localhost` を使用する特別な形式であり、本来の FQDN 要件の例外として、開発・テスト環境においてのみ使用してよい (MAY)。本番環境で使用してはならない (MUST NOT)。

例:

✅ 有効:

- `dns:example.org`
- `dns:docs.example.org`
- `dns:xn--eckwd4c7cu47r2wf.jp` (`ドメイン名例.jp` の A-label 表現)
- `dns:localhost` (開発・テスト環境に限る)

❌ 無効:

- `dns:example.com.` (末尾に `.` を含めてはならない)
- `dns:example_domain.org` (ホスト名は LDH すなわち英数字とハイフンだけが利用でき `_` などは使えない)
- `dns:_dmarc.example.com` (アンダースコア名としては有効だがホスト名には適合しない)
- `dns://8.8.8.8/example.com` (dnsauthority を含む)
- `dns:example.com?TYPE=A` (dnsquery を含む)
- `dns:*.example.com` (ワイルドカード)

:::note

運用上認めるホスト名は更に制限されることがあり得ます。
例えば、OP 保有組織が保有するドメインであり、かつその組織の情報が掲載された公式 Web サイトが公開されていることを登録要件とすることなどが考えられます。

:::

## 公開鍵の配布 {#public-key-distribution}

OP ID 保有組織の OP を得ることで公開鍵を得ることができます。

## OP の取得プロセス {#resolve}

OP ID 保有組織の OP を得るには、[Originator Profile Set (OPS)](./originator-profile-set.md) を取得してから、[Core Profile (CP)](./cp.md) 保有組織の OP ID を検索します。

OPS を得るには、[Site Profile](./site-profile.md) に定められた方法で特定のドメインから取得するか、[HTML 文書への Originator Profile Set の紐づけ](./link-to-html.md)に定められた方法で特定の Web ページから取得してください (RECOMMENDED)。

:::note

DNS URI OP ID 単体での OP の取得プロセスは未定義です。

:::

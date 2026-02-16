---
sidebar_position: 41
original: https://github.com/originator-profile/docs.originator-profile.org/blob/2d456cb/docs/opb/dns-uri-op-id.md
---

# DNS URI OP ID

## Terminology

For terms not explained in this document, please see [Terminology](./terminology.md).

- Core Profile (CP)
- Originator Profile (OP)
- Originator Profile Identifier (OP ID)
- Originator Profile Set (OPS)
- Site Profile (SP)

## Form

The ID MUST be of the form `dns:<dnsname>`, as defined in [RFC 4501](https://www.rfc-editor.org/rfc/rfc4501.html), excluding the `dnsauthority` and `dnsquery` components.
The `dnsname` must be a fully qualified domain name (FQDN) as defined in [RFC 1034](https://www.rfc-editor.org/rfc/rfc1034) and [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035), and must conform to the hostname specification in [RFC 1123](https://www.rfc-editor.org/rfc/rfc1123). If an internationalized domain name is used, it must use the A-label representation (Punycode) as specified in [RFC 5890](https://www.rfc-editor.org/rfc/rfc5890). In either case, it MUST NOT contain a trailing `.`.

Example:

✅ Valid:

- `dns:example.org`
- `dns:docs.example.org`
- `dns:xn--eckwd4c7cu47r2wf.jp` (A-label representation of `domainname.jp`)

❌ Disabled:

- `dns:example.com.` (Do not include the trailing `.`)
- `dns:example_domain.org` (Hostname must be LDH, i.e. alphanumeric characters and hyphens only, no `_` etc.)
- `dns:_dmarc.example.com` (valid as an underscore name, but not a hostname)
- `dns://8.8.8.8/example.com` (including dnsauthority)
- `dns:example.com?TYPE=A` (including dnsquery)
- `dns:*.example.com` (wildcard)

:::note

The host names permitted for operational reasons may be further restricted.
For example, a registration requirement could be that the domain is owned by an organization that owns an OP and that the organization has an official website with information about that organization.

:::

## Public key distribution {#public-key-distribution}

You can obtain the public key by obtaining the OP of the organization that holds the OP ID.

## Process for obtaining OP {#resolve}

To get OP of OP ID holder, get [Originator Profile Set (OPS)](./originator-profile-set.md) and then search for OP ID of [Core Profile (CP)](./cp.md) holder.

To obtain OPS, obtain them from a specific domain using the methods defined in the [Site Profile](./site-profile.md) or obtain them from a specific web page using the methods defined in [Linking an Originator Profile Set to an HTML Document](./link-to-html.md) (RECOMMENDED).

:::note

The process for retrieving an OP using the DNS URI OP ID alone is undefined.

---
sidebar_position: 33
original: https://github.com/originator-profile/docs.originator-profile.org/blob/6388d81/docs/opb/dns-uri-op-id.md
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

It MUST be a [DNS URI](https://www.rfc-editor.org/rfc/rfc4501.html).

Example:

```
dns:example.org
```

## Public key distribution {#public-key-distribution}

You can obtain the public key by obtaining the OP of the organization that holds the OP ID.

## Process for obtaining OP {#resolve}

To get OP of OP ID holder, get [Originator Profile Set (OPS)](./originator-profile-set.md) and then search for OP ID of [Core Profile (CP)](./cp.md) holder.

To obtain OPS, obtain them from a specific domain using the methods defined in the [Site Profile](./site-profile.md) or obtain them from a specific web page using the methods defined in [Linking an Originator Profile Set to an HTML Document](./link-to-html.md) (RECOMMENDED).

:::note

The process for retrieving an OP using the DNS URI OP ID alone is undefined. Instead, [did:op DID Method](./other/did-op.md) is being considered.

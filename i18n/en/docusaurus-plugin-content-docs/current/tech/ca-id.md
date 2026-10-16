---
sidebar_position: 4
original: https://github.com/originator-profile/docs.originator-profile.org/blob/e99183a/docs/tech/ca-id.md
---

# How to determine CA ID

This page explains in what units Content Attestation IDs (CA IDs) are assigned and how to handle them when updating or deleting content.
For more information on the CA data model and validation process, see the [Originator Profile Blueprint (OPB)](/opb/) pages.

## Decision guide {#decision-guide}

| Scene                                                                    | CA ID                              |
| :----------------------------------------------------------------------- | :--------------------------------- |
| Extension of validity period                                             | [Can be maintained](#keep-ca-id)   |
| Updating the signing key                                                 | [Can be maintained](#key-rotation) |
| Correction of typos and additions                                        | [Can be maintained](#keep-ca-id)   |
| Change titles and thumbnails without changing the main idea              | [Can be maintained](#keep-ca-id)   |
| The display changes depending on the device, but the content is the same | [Can be maintained](#granularity)  |
| Replace with different content using the same URL                        | [Newly assigned](#new-ca-id)       |
| Rewritten so much that the main idea has changed                         | [New assignment](#new-ca-id)       |
| Splitting an article into multiple pages                                 | [Assign new](#new-ca-id)           |
| Contents vary depending on device                                        | [New assignment](#new-ca-id)       |
| Withdrawing content                                                      | [Do not reuse](#delete-ca)         |

## What is Content Attestation (CA)? {#what-ca}

A CA is signed data that verifies that content originates from the originator and has not been altered [^aov-ca].
Content here refers to a piece of information issued by a sender, and is not limited to web pages [^aov-content].
The CA ID is the ID listed in `credentialSubject.id` of the CA, and is a string in UUIDv4 URN format (for example, `urn:uuid:78550fa7-f846-4e0f-ad5c-8d34461cb95b`)[^ca-id].
A CA ID has a one-to-one correspondence with the content a publisher is presenting at a given time [^ca-id].
When switching CA IDs, maintain correspondence by no longer presenting the old CA (see [Issuance with new CA ID](#new-ca-id)).
If you have multiple pieces of content on a single page, you can issue a CA for each piece of content and present them together in a Content Attestation Set (CAS) [^cas].

The CA ID is an independent conceptual ID that is separate from the CMS article ID and web page URL.
By maintaining CA IDs, the CMS can manage the correspondence between articles and their content with CAs.

The ID that identifies the issuer of the CA is written in `issuer` of the CA [^ca-issuer][^op-id].
CAs issued by one organization have the same `issuer`.
It is up to the CA issuer to decide which content to assign a CA ID to.
The publisher is responsible for determining the identity of the content, including how much of the content is considered one piece of content and whether the updated content is the same content as before the update.

## Content unit and CA ID granularity {#granularity}

The granularity of a CA ID is determined by how the publisher differentiates content.

Different URLs are often treated as different content.
In this context, URLs are different if they are not equal when compared according to the [WHATWG URL Standard](https://url.spec.whatwg.org/) [^url-equivalence].
For example, if you have an article with multiple pages, each page will display different body text, so you can assign a different CA ID to each page.
For each page's CA, `allowedUrl` specifies the URL of that page [^allowed-url].

On the other hand, URLs are not the only way to distribute content.
If you want to change the display depending on the device viewing the same URL, you can use the same CA ID if the content is the same for each device.
If the content is different, assign a different CA ID to each device and issue each CA separately.
In either case, the `target` of the CA you present to each device must match what that device sees [^target-integrity].
On the other hand, if you want to provide the same content with multiple URLs, you can list multiple URL Patterns in `allowedUrl` and use one CA [^allowed-url].

## Update CA {#update-ca}

Assign the CA ID as an ID that independently identifies each piece of content.
CA IDs themselves do not represent relationships between CAs.
The relationship between the content before and after the update, each page of a divided article, and the content distributed by device cannot be expressed by the way CA IDs are assigned.

### Reissue with same CA ID {#keep-ca-id}

The issuer can reissue the CA and update the CAS with the same CA ID, as long as the issuer can guarantee that the content is semantically the same.
Even if you correct typos or add additions, you can continue to use the same CA ID if the publisher can guarantee that it's the same article.

However, there is a difference between being able to maintain your CA ID and not having to reissue your CA.
If you change the target of `target`, it will no longer match the hash recorded in the existing CA and validation will fail [^target-integrity].
If you change the content, please reissue the CA and update the CAS regardless of whether you want to keep the CA ID.

Typical scenarios for reissuing a CA ID while preserving it are:

- Extension of validity period: Reissue with only `iat` and `exp` changed (see [OP, SP, CA validity period](/tech/validity-period.mdx)).
- Update signing key: Re-sign with the new key before removing the old key from the CP. The `kid` in the JWT header changes [^kid]. See the next section for details.
- Updates to the content that do not change the meaning: corrections of typos, additions, etc. Changing the title or thumbnail also falls under this category, as long as the gist of the article does not change. The values ​​of `target` and `credentialSubject` will change.

### Signing key update {#key-rotation}

What changes with the key update is the set of public keys contained in the CP issued to the OP ID [^terminology-cp].
Updating the signing key does not require changing the OP ID or CA ID.

The validity of a CA is dependent on the validity of the OP of the organization that issued it.
The existing CA remains valid as long as the OP is within its validity period and the CP contains the public key of the key used to sign the CA (see [CA validity period](/tech/validity-period.mdx#validity-period-of-content-attestation-ca)).
Therefore, reissuing the OP to add a new key to the CP does not require reissuing the existing CA.

On the other hand, if you remove the old key's public key from the CP, all CAs that signed with that key will be revoked all at once (see [Why keep validity periods short](/tech/validity-period.mdx#Why-keep-validity-periods-short)).
Before removing the old key, reissue the CA that signed with that key with a new key, keeping the same CA ID, and update the CAS.

### Issuing with new CA ID {#new-ca-id}

If the content is no longer semantically the same as it was before the update, assign a new CA ID and issue the CA.
For example, if you replace a page with the same URL with a different article, or if you rewrite an article so much that the main idea has changed.

You can use a new CA ID even if the meaning is the same.
Although the CA ID itself cannot be changed, issuers can add or delete CAs at their discretion.
Switching to a new CA ID can be treated as a combination of adding a new CA and removing the old CA.

When switching to a new CA ID, do not put the old CA and new CA in the same CAS, and remove the old CA from the CAS.
Placing both side by side presents two CAs for the same content and can make it difficult for viewers to determine which one represents the current content.
Also, if you leave the old CA in place, it will become a validation failure when the old CA expires.
If you only manage the validity period of the new CA, it is easy to overlook this expiration.

## Delete CA {#delete-ca}

Removal of a CA is at the discretion of the issuer.
When you withdraw content, remove the CA from CAS.

:::note

If you are managing the CA in a CA Server, also remove the CA from the CA Server by specifying the CA ID in the CA Server's removal endpoint (see [How to use CA Server](/tutorial/cas-setup-guide.md#ca-server), [Example in WordPress](/site-cases/wordpress.md)).

:::

A CA that remains, such as on a page that has been cloned to another URL, will still successfully validate until the validity period expires, as long as the URL of that page satisfies `allowedUrl` (see [How to determine the validity period of WSPs and CAs](/tech/validity-period.mdx#choosing-validity-period)).
Removal from the CAS does not invalidate the CA itself.

Do not reuse the CA ID of a deleted CA for other content.
Reuse causes different pieces of content to be assigned the same CA ID, breaking the correspondence between content and CA ID.

[^aov-ca]: Definition of "Content Attestation" in [OP Architectural Overview (AOV)](pathname:///aov/#dfn-content-attestation).

[^aov-content]: Definition of "Content" for [AOV](pathname:///aov/#dfn-content). Delivery as a web page is one of the delivery methods described in AOV's Web Media Specific Model.

[^ca-id]: [List of properties of `credentialSubject` in Content Attestation](/opb/ca.md#credential-subject-properties). Each CA model (such as [Article Data Model](/opb/ca-model/article.md)) has the same provisions.

[^cas]: [Content Attestation Set](/opb/content-attestation-set.md). A CAS can contain multiple CAs. Set `main` to `true` on the entry for the main content's CA.

[^ca-issuer]: `issuer` of [Content Attestation property list](/opb/ca.md#content-attestation-properties).

[^op-id]: [Originator Profile Identifier (OP ID)](/opb/op-id.md).

[^url-equivalence]: [URL equivalence](https://url.spec.whatwg.org/#url-equivalence) from the WHATWG URL Standard.

[^allowed-url]: `allowedUrl` in [Content Attestation property list](/opb/ca.md#content-attestation-properties) and [`allowedUrl` validation](/opb/ca.md#allowed-url-validation). `allowedUrl` is a URL Pattern string or array thereof.

[^target-integrity]: [Content Integrity Descriptor Validation](/opb/ca.md#target-integrity-validation).

[^terminology-cp]: [Terminology "Core Profile (CP)"](/opb/terminology.md#core-profile-cp) and [Core Profile](/opb/cp.md). A CP is a VC that proves that a set of public keys corresponds to a subject with a certain OP ID.

[^kid]: [OP VC Securing Mechanism header](/opb/securing-mechanism.md#header).

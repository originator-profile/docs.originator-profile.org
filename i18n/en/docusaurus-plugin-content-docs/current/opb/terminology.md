---
sidebar_position: 1
original: https://github.com/originator-profile/docs.originator-profile.org/blob/3d0649e/docs/opb/terminology.md
---

# Terminology

## Originator Profile Identifier (OP ID)

ID of the organization that owns the Core Profile. IDs registered in the [OP ID Registry](./op-id.md) can be used.

## Originator Profile (OP)

Data summarizing VCs represented as the subject of a certain organization.

## Originator Profile Set (OPS)

The data model and data representation defined in the [Originator Profile Set](./originator-profile-set.md) . Data summarizing VCs related to an organization.

## OP VC Data Model Conforming Document (OP VC DM conforming document)

A JSON-LD document that conforms to the [OP VC Data Model](./op-vc-data-model.md).

## Core Profile (CP)

VC defined in [Core Profile](./cp.md).
Cryptographically proves that a set of public keys corresponds to a subject of a certain OP ID.

## Profile Annotation (PA)

VC defined in [Profile Annotation](./pa.md).
VC describing information about the organization. Appropriate entities will sign according to the information.

## Web Media Profile (WMP)

VC defined in [Web Media Profile](./web-media-profile.md).
This describes the information required to display information about the organization that holds the OP ID to users so that they can understand what kind of organization it is.

## Website Profile (WSP)

A VC defined in a [Website Profile](./website-profile.md) that represents the website of the OP ID-holding organization.

## Site Profile (SP)

Data format for delivering the Originator Profile and Website Profile defined in [Site Profile](./site-profile.md).

## OP holding organization

The organization that owns the OP ID pointed to by the CP's `credentialSubject.id` property.

## OP Registry

An organization that reviews organizations seeking OP IDs and issues OP IDs and Core Profiles.
The Core Profile is signed by the OP Registry.

## Verifier

Software that receives and validates VC defined by the OP and the data compiled from it. Examples include user agents used by end users to browse content on the Internet, and bots such as search engine crawlers.

## Web Content

An element that represents a single piece of information represented by multiple DOM elements on a Web page.
A single piece of Web Content is published by a single organization. It does not necessarily fit into a single element in the DOM.

## Content Attestation (CA)

A collection of information about the authenticity of content defined in [Content Attestation](./ca.md)

## CA ID

The ID specified in the CA's `credentialSubject.id` property. It has one-to-one correspondence with Web Content.

## Content Attestation Set (CAS)

A representation format for presenting multiple Content Attestations defined in the [Content Attestation Set Originator Profile Blueprint (OPB) document](./content-attestation-set.md)

## Content Integrity Descriptor

A piece of data contained in a CA that is used to ensure the integrity of content. It includes data to identify the location of the content and the output of a one-way hash function such as SHA-256.

## Target Element

The DOM element that Content Integrity Descriptor identifies.

## Target Location

The position of the target element specified by a given target integrity, or the position of the first element if there is more than one.

## Target Text

The target element of a target integrity is converted to a string representation in a manner specified by the target integrity. The target integrity guarantees the integrity of this value.

## Certificate

[Certificate](./certificate.md) Information defined in an Originator Profile Blueprint (OPB) document that proves that the issuer has stated the contents to the OP-holding organization. Certificate.

## Certification System

A system for cryptographically verifying that the information a [Certificate](./certificate.md) cryptographically attests to is actually true, operated by a certification authority.

## Certifier

The entity that operates the certification system. It is not necessarily the issuer of the certificate.

## JSON-LD Node Object

This refers to a [node object](https://www.w3.org/TR/json-ld11/#dfn-node-object) defined in [JSON-LD 1.1](https://www.w3.org/TR/json-ld11/#dfn-node-object). It has almost the same format as a JSON Object.

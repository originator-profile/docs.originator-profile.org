---
sidebar_position: 101
original: https://github.com/originator-profile/docs.originator-profile.org/blob/9ceac67/docs/opb/process.md
---

# Originator Profile Blueprint

## Summary

The goal of the Originator Profile is to "For Healthier future of the Internet." To achieve this goal, we need to standarize OP technology internationally and create an environment where anyone can use OP technology as a matter of course.
To achieve this, first of all, it is necessary for OP technology to openly incorporate the wisdom of various people, and for its design to be improved based on consensus and trust by the community, and for anyone to verify in documents at any time with transparency.
Doing so will make the technology development process of the OP technology community itself trustworthy, paving the way for international standardization of OP technology.

## Process

To add an Originator Profile Blueprint (OPB), submit a draft OPB via a GitHub Pull Request.

Example: docs/opb/process.md … This document

The community will discuss and revise the code via GitHub Pull Requests.

An OPB is considered active when a GitHub Pull Request has been merged into the default branch.
An OPB is active when it means that the community is ready to accept an implementation based on the OPB.

Updates to active OPBs will be made through discussions on GitHub Issues and changes via GitHub Pull Requests.

For the time being, there are no restrictions on the scale or frequency of updates to active OPBs, but the content will be frozen and revisions will be managed when the technical specification is published publicly or proposed to a standards body.
However, even in such cases, this does not apply to annotations such as links to existing technical specifications, security constraints, and implementation notes.

## Notes

In creating the OPB, we used the Rust project's [Rust RFC](https://github.com/rust-lang/rfcs) as a reference.

OPBs are a series of documents proposed to international standardization organizations, but the standardization process differs depending on the standardization organization.

For reference, the following introduces the standardization process at [IETF](https://www.ietf.org/) and [W3C](https://www.w3.org/).

### IETF RFC

When an RFC is proposed to the IETF, the RFC's status progresses from Internet Draft (I-D) -> Proposed Standard -> Internet Standard.

To become an Internet Standard, multiple interoperable implementations are required, and many popular RFCs remain as Proposed Standards.

- Submit the draft to the appropriate [Working Group (WG)](https://datatracker.ietf.org/wg/) under the name draft-YOURNAME-brief-subject. Once the draft is adopted, rename it to draft-ietf-WGNAME-brief-subject. From this point on, the IETF WG owns the copyright to the document and the right to make modifications to it.
- WG Last Call (WGLC) -> Review by [Area Directors (AD)](https://www.ietf.org/about/groups/iesg/members/) -> IETF Last Call -> Publication by RFC Production Center (RPC)
- RFCs are classified as Standards Track (STD), Informational, Experimental, Best Current Practice (BCP), and Historical.
- See the central resource site for authors of an Internet-Draft (I-D) : https://authors.ietf.org/

### The W3C Recommendation Track

#### Classification of Technical Reports

- Recommendations
- Notes
  - Example: https://www.w3.org/TR/vc-imp-guide/
- Registries
  - Example: https://www.w3.org/TR/webcodecs-codec-registry/
  - WebCodec report: https://www.w3.org/TR/?filter-tr-name=&status%5B%5D=dry

https://www.w3.org/2023/Process-20231103/#recs-and-notes

#### Recommendation Track

https://www.w3.org/2023/Process-20231103/#rec-track

1. Working Draft (WD)
   - Publication of the First Public Working Draft to start the process
   - It will be published thereafter at https://www.w3.org/TR/
2. Candidate Recommendation (CR)
   1. Candidate Recommendation Snapshot (CRS)
      - It will be updated when there are [substantive changes](https://www.w3.org/2023/Process-20231103/#correction-classes) since the last CRS.
   2. Candidate Recommendation Draft (CRD)
      - It will be updated whenever changes have been made since the last draft that are deemed worthy of review from outside the Working Group.
3. Proposed Recommendation (PR)
4. W3C Recommendation (REC)

When a draft or specification is discarded, it may be in one of the following states: Rescinded Candidate Recommendation, Superseded Recommendation, Obsolete Recommendation, Rescinded Recommendation, Discontinued Draft.

- WD does not have to have consensus within the Working Group, and does not have to meet all of the WG's requirements.
- When going from WD to CR, all WG requirements must be met.
- When moving from CR to PR, [implementation](https://www.w3.org/2023/Process-20231103/#implementation-experience) is required. [substantive changes](https://www.w3.org/2023/Process-20231103/#correction-classes) must not be included from the CR. Features marked as feature at risk in the CR can be removed.
- To become a REC, a review by the Advisory Committee is required.

Other requirements include the need to keep a record of what changes were made, undergo a [wide review](https://www.w3.org/2023/Process-20231103/#wide-review), and a minimum number of days for the review period.

Each Working Group SHOULD adopt its own process in addition to this.

---
original: https://github.com/originator-profile/docs.originator-profile.org/blob/e6b2767/docs/getting-started.md
sidebar_position: 100
---

# Getting Started

## About This Page

This page provides guidance to help you choose the knowledge and resources you need, depending on your purpose when using the Originator Profile technology and its related tools.

## Overview and Usage Flow

Please refer to the following for an overview of Originator Profile.

- [About Originator Profile](../tech/)

When using Originator Profile, the following steps will help you understand the system more easily.

1. Understand the basic concepts of Originator Profile  
   Refer to [About Originator Profile](../tech/).
2. Review the specifications as needed  
   After reading the overview, referring to the [Originator Profile Blueprint (OPB)](../opb/) will help deepen your understanding of the terminology and specifications, making it easier to follow the guides.  
   You can also refer to the [Originator Profile Blueprint (OPB)](../opb/) whenever you encounter unclear points while reading the guides.
3. Select the appropriate tool guide based on your purpose

Originator Profile provides the following tools and guides for issuing and verifying content.

- OP Inspector
- Content Attestation Server Playground
- OPVC CLI
- WordPress Plugin (CA Manager)
- Debugger

## Based on Your Purpose

Please refer to the following guides depending on your intended use.

- **Verify Content in the Browser**  
  This browser extension allows you to verify content on websites that support Originator Profile.  
  Use it when you want to check the originator information and verification results directly on a webpage.  
  → [OP Inspector](../inspector/)

- **Issuing Content Signatures in a Test Environment**  
  This is a test environment (Content Attestation Server Playground) where you can issue Content Attestation and Site Profile.  
  You can also verify the issued Content Attestation or Site Profile using the test‑build version of the OP Inspector.  
  → [Content Attestation Server Playground](../playground/)

- **Issuing OP**  
  The OPVC CLI is a command-line tool that lets you try issuing CP, PA, WMP and other OP-related credentials.  
  → [OPVC CLI](../opvc-cli/)

- **Using Content Signing in WordPress**  
  A WordPress plugin (CA Manager) is available to issue Content Attestation when publishing articles.  
  → [WordPress Plugin (CA Manager)](../site-cases/wordpress)

## Next Steps

If you want to explore the specifications in more detail, please refer to the following:

- [Originator Profile Blueprint (OPB)](../opb/)
- [Architectural Overview (AOV)](pathname:///aov/)

In addition, the following tool is available for debugging:

- [Debugger](../debugger/)  
  You can use it to test issued Content Attestation Set and Site Profile, and to check for errors during verification.

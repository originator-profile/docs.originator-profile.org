---
sidebar_position: 120
original: https://github.com/originator-profile/docs.originator-profile.org/blob/3b2ea94/docs/playground-tutorial.md
---

# Tutorial: Experiencing OP Implementation in the Playground Environment

## Overview

In this tutorial, you will use the [Content Attestation Server Playground](https://playground.originator-profile.org) to verify the steps required for OP (Originator Profile) implementation within a test environment.
The goal is to gain a step-by-step understanding of the entire workflow—from the issuance and deployment of Site Profiles and Content Attestations to their verification.

This tutorial allows you to verify the following processes in the test environment:

- Issuance and deployment of Site Profiles (SP)
- Issuance and deployment of Content Attestations (CA)

:::note

This tutorial is an "experimental OP implementation" that does not require production registration.

:::

## Step 1: Issue the Site Profile in the Playground

- Open the [SP Issuance API for the Content Attestation Server Playground](https://playground.originator-profile.org/#tag/sp/POST/sp).
- Use the "Test Request" section on the right side of the screen.
- Include the origin of the site you are trying to enable for OP support in the `allowedOrigin` field of the request body.
  - Example: `http://localhost:8080`
  - Refer to [Site Profile](/opb/site-profile/) or [Website Profile](/opb/website-profile/) for details on each property.
  - If you are using both Japanese and English Website Profiles, please include the origin of the site you intend to make OP-compatible in the `allowedOrigin` field for both profiles.
- Press Send.
  - If authentication is requested, please use the credentials found at the [Content Attestation Server Playground](https://playground.originator-profile.org).
- Verify that the Site Profile is returned along with a 200 OK status.

## Step 2: Deploy the Site Profile on the site

- Take the returned JSON, name it `sp.json`, and place it so that it is accessible at the website's well-known URL: `/.well-known/sp.json`.

Example:

```shell
$ curl -i http://localhost:8080/.well-known/sp.json
HTTP/2 200
content-type: application/json

{
  "originators": [
    { "core": "eyJ...", "annotations": ["eyJ..."], "media": ["eyJ..."] }
  ],
  "sites": ["eyJ..."]
}
```

:::note

At this point, you will be able to check the Site Profile using the test build of OP Inspector.
Refer to the instructions in [Step 5](#step5) for information on how to obtain and install the test build of OP Inspector.

:::

For Step 1 and Step 2, please also refer to the [Site Profile setup guide](/tutorial/sp-setup-guide#site-profile-ca-server).

## Step 3: Issue a Content Attestation in the Playground

- Open the [CA Issuance API for the Content Attestation Server Playground](https://playground.originator-profile.org/#tag/ca/POST/ca).
- Use the "Test Request" section on the right side of the screen.
- Include the URL where the CA will be deployed in the `allowedUrl` field of the request body.
  - Example: `http://localhost:8080/*`
- Set the `target` in the request body to a [Content Integrity Descriptor](/opb/content-integrity-descriptor/) appropriate for the content.
  - Example:
    ```json
    {
      "type": "TextTargetIntegrity",
      "cssSelector": "#text-target-integrity",
      "integrity": "sha256-TL6t/lWLByyNME0lFhb6JrT3RaTF+f2md84n5YTQtx4="
    }
    ```
- Additionally, you may modify the value of `credentialSubject` to suit the content.
  - Refer to [Content Attestation](/opb/ca/) for details on each property.
- Press Send.
  - If authentication is requested, please use the credentials found at the [Content Attestation Server Playground](https://playground.originator-profile.org).
- Verify that a Content Attestation is returned along with a 200 OK response.

## Step 4: Deploy Content Attestation

- Add the returned JSON to the page HTML as a Content Attestation Set.
- Use the following script tag.

Example:

```html
<script type="application/cas+json">
  ["eyJ..."]
</script>
```

For Steps 3 and 4, please also refer to the [Content Attestation setup guide](/tutorial/cas-setup-guide#ca-server).

## Step 5: Verify using the test build of OP Inspector {#step5}

- Install the test build of OP Inspector.
  - For instructions on installing the test build of OP Inspector, please refer to the [Content Attestation Server Playground guide](/playground/#verification-method).
  - Refer to the [OP Inspector Guide](/inspector/) for information on how to use OP Inspector.
- Follow the OP Inspector guide and confirm that verification has been successful.

---
sidebar_position: 340
original: https://github.com/originator-profile/docs.originator-profile.org/blob/69fde4c/docs/playground.md
---

# Content Attestation Server Playground

[Content Attestation Server Playground](https://playground.originator-profile.org/) is an environment where you can test the workflow from publishing content attestation to verifying it with a browser extension.

:::warning
Playground is a testing environment only. Content Attestations and Site Profiles published in Playground cannot be used in a production environment.
:::

:::note
A command-line tool, OPVC CLI, is also available for trying the issuance of CP, PA, WMP, and other profiles in addition to issuing them in the Playground.  
For more information, see the [OPVC CLI](./opvc-cli.md) documentation.
:::

## How to use Playground

### Screen description

![](assets/playground.excalidraw.svg)

The screen is composed of three panes (columns): "left," "center," and "right."

- **Left pane: Navigation (Sidebar)**:
  This is an index of API endpoints. You can search for and select the endpoint you want.
- **Center pane: Document**:
  The center pane displays detailed specifications for the API selected in the left pane. It includes the endpoint URL, a function summary, required and optional parameters (Query, Path, Headers), and the request body data structure (Schema).
- **Right pane: API Client**:
  This is a test environment that allows you to execute API requests directly within the documentation. Implementation code snippets are automatically generated for various programming languages ​​(Node.js, Python, etc.) and command-line tools (cURL), which you can copy and use in your development.

The following is how to verify that the API is working correctly.

1. **Select an API**:
   Use the search bar at the top of the screen, or select the API endpoint you want to check from the navigation in the left pane.
2. **Enter the parameters**:
   You can check the specifications in the central pane, then click the "Test Request" button in the right pane (or at the bottom of the central pane) and enter the necessary parameters. You can enter the data in the required JSON format in the request body.
3. **Send a request**:
   Click the "Send" button to send an API request to the target server.
4. **Check the response**:
   After submitting the request, the response status code (e.g., `200 OK`) and the data returned from the server (in JSON format, etc.) will be displayed on the screen. You can then verify whether you have obtained the expected results.

### Issue a Site Profile

A POST request is sent to the Playground endpoint [`/sp`](https://playground.originator-profile.org/#tag/sp).

```sh
curl -X POST https://playground.originator-profile.org/sp \
  -H content-Type:application/json \
  -u BasicAuthenticationUsername:BasicAuthenticationPassword \
  -d '{ ... }'
```

For details on each property in the request body, please refer to the [Website Profile (WSP) Data Model](/opb/website-profile/) and [Site Profile (SP)](/opb/site-profile/).

### Verification method

You can perform verification by accessing the website where Site Profile is deployed, with OP Inspector installed.

A test build of OP Inspector is required for verification.

:::warning
The test build version of OP Inspector is for the Playground environment only. It cannot verify content attestations in the production environment. Also, content attestations and site profiles published in Playground cannot be verified with the standard build version of OP Inspector.
:::

You can download and install OP Inspector (test build) from [GitHub Releases (canary)](https://github.com/originator-profile/originator-profile/releases/tag/canary).

| Browser | File name                                                             |
| ------- | --------------------------------------------------------------------- |
| Chrome  | [`_testing_op_inspector-chromium-canary.zip`][chrome]                 |
| Firefox | [`_testing_op_inspector-firefox-desktop-canary.zip`][firefox-desktop] |

[chrome]: https://github.com/originator-profile/originator-profile/releases/download/canary/_testing_op_inspector-chromium-canary.zip
[firefox-desktop]: https://github.com/originator-profile/originator-profile/releases/download/canary/_testing_op_inspector-firefox-desktop-canary.zip

### Error Codes in Playground

This section summarizes possible error codes that may occur when using the Playground API client, along with their meanings and causes.

| Error Code | Error        | Cause                                     |
| ---------- | ------------ | ----------------------------------------- |
| 400        | Bad Request  | JSON schema validation error              |
| 401        | Unauthorized | Error due to invalid credentials          |
| 403        | Forbidden    | Mismatch between issuer and OP Account ID |
| 404        | Not Found    | Access to an undefined endpoint           |

#### 400 Bad Request

- Message: "One or more validations failed trying to process your request."
- Cause: The input JSON does not meet the expected schema (required fields, types, format).
- Solution: Check the required fields, types, and format of the input JSON, or the error content in the response message.

#### 401 Unauthorized

- Message: "Invalid password"
- Cause: Incorrect authentication information such as username or password.
- Solution: Verify that the username and password are correct.

#### 403 Forbidden

- Message:
  - "OP Account ID does not match the issuer of the Website Profile."
  - "OP Account ID does not match the issuer of the Content Attestation."
- Cause: The issuer in the input JSON does not match the OP Account ID used for issuance.
- Solution: Verify that the issuer in the input JSON matches the OP Account ID being used.

#### 404 Not Found

- Message: "404 Not Found"
- Cause: Occurs when accessing an operation or endpoint that is not available.
- Solution: Verify that the target URL, endpoint, and HTTP method are correct.

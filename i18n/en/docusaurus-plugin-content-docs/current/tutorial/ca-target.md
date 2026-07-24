---
sidebar_position: 3
---

# Content and HTML elements to be verified

We will explain the content and HTML elements to be verified using specific examples.

Content Attestation (CA) includes [Content Integrity Descriptor](/opb/content-integrity-descriptor/) (`target` property), which guarantees the integrity of the content it verifies.
Content Integrity Descriptor defines the following different types of targets (`type` property) based on Subresource Integrity (SRI):

- [HTML Target](/opb/content-integrity-descriptor/html/) (`HTMLTargetIntegrity`): Part of an HTML document
- [Text Target](/opb/content-integrity-descriptor/text/) (`TextTargetIntegrity`): DOM text
- [Visible Text Target](/opb/content-integrity-descriptor/visible-text/) (`VisibleTextTargetIntegrity`): Rendered Text
- [External Resource Target](/opb/content-integrity-descriptor/external-resource/) (`ExternalResourceTargetIntegrity`): `img`、`audio`、`video` Internally or externally referenced media resources such as elements

A CA, or a set of CAs (CA Set), that combines these makes it possible to verify the integrity of the target content.

![](./assets/content-attestation-set.webp)

### Specific examples

Example: https://originator-profile.org/en-US/chief-director/:

```html
<script
  type="application/cas+json"
  src="/cas/en-US.chief-director.cas.json"
></script>
```

Specify that it is a CA Set by adding a script tag (`<script type="application/cas+json">`) in the HTML document ([Linking](/opb/link-to-html/)).
Within the script tag, you can either write an array of CA ([CAS](/opb/content-attestation-set/)) or reference CAS in the `src` attribute.

https://originator-profile.org/cas/en-US.chief-director.cas.json

```json
[
  "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwX1hDazM2dFFrUlpsQnhEckhzMVhldHBUZUZYdDRfVlRSbHlEa0YyQWsiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY3JlZGVudGlhbHMvdjEiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY2lwL3YxIix7IkBsYW5ndWFnZSI6ImphIn1dLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQ29udGVudEF0dGVzdGF0aW9uIl0sImlzc3VlciI6ImRuczpvcHJleHB0Lm9yaWdpbmF0b3ItcHJvZmlsZS5vcmciLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0eXBlIjoiQXJ0aWNsZSIsImhlYWRsaW5lIjoi55CG5LqL6ZW344Oh44OD44K744O844K4IiwiZGVzY3JpcHRpb24iOiLjgqTjg7Pjgr_jg7zjg43jg4Pjg4jjga_lnLDnkIPlhajkvZPjgafkuIDjgaTjga7nqbrplpPjgILnpL7kvJrjgavlpKfjgY3jgarliKnnm4rjgpLjgoLjgZ_jgonjgZfjgabjgYTjgb7jgZnjgYzjgIHlgb3jg7voqqTmg4XloLHjgoToqrnorJfkuK3lgrfmi6HmlaPjgajjgYTjgYbmlrDjgZ_jgaroqrLpoYzjgoLnlJ_jgZjjgabjgYTjgb7jgZnjgILjgZ3jga7op6PmsbrmioDooZPjgajjgZfjgaZPUOOCkuaPkOahiOOBl-OBvuOBmSIsImltYWdlIjp7ImlkIjoiaHR0cHM6Ly9vcmlnaW5hdG9yLXByb2ZpbGUub3JnL29ncC1qYS5wbmciLCJkaWdlc3RTUkkiOiJzaGEyNTYtRlcxRWhCRFArOHE2OG10YldpWlBqMnlmaGpFVC9oZmt4OTgwd1R0RlVPaz0ifSwiZGF0ZVB1Ymxpc2hlZCI6IjIwMjUtMDMtMDVUMDM6MzI6MjQuNTAwWiIsImRhdGVNb2RpZmllZCI6IjIwMjUtMDMtMDVUMDM6MzI6MjkuODM3WiIsImF1dGhvciI6WyJPcmlnaW5hdG9yIFByb2ZpbGUg5oqA6KGT56CU56m257WE5ZCIIl0sImVkaXRvciI6WyJPcmlnaW5hdG9yIFByb2ZpbGUg5oqA6KGT56CU56m257WE5ZCIIl0sImdlbnJlIjoidGVjaG5vbG9neSIsImlkIjoidXJuOnV1aWQ6ZmRmZTdkY2UtOGE4My00MTk5LWI0YTAtNjYyY2M4OWIyYzIxIn0sImFsbG93ZWRVcmwiOlsiaHR0cHM6Ly9vcmlnaW5hdG9yLXByb2ZpbGUub3JnL2phLUpQL2NoaWVmLWRpcmVjdG9yLyIsImh0dHA6Ly9sb2NhbGhvc3Q6NDMyMS9qYS1KUC9jaGllZi1kaXJlY3RvcigvPykiLCJodHRwczovL2ludGVncml0eS1wb3N0LXByb2Nlc3Mub3JpZ2luYXRvci1wcm9maWxlLW9yZy5wYWdlcy5kZXYvamEtSlAvY2hpZWYtZGlyZWN0b3IoLz8pIl0sInRhcmdldCI6W3sidHlwZSI6IlRleHRUYXJnZXRJbnRlZ3JpdHkiLCJjc3NTZWxlY3RvciI6Im1haW4iLCJpbnRlZ3JpdHkiOiJzaGEyNTYtd1VIdDNKSVpoTndjejYyR090Mm5GY2hQNHlKdHNyY2lMc1ZTZWI1ZktsQT0ifSx7InR5cGUiOiJFeHRlcm5hbFJlc291cmNlVGFyZ2V0SW50ZWdyaXR5IiwiaW50ZWdyaXR5Ijoic2hhMjU2LWNpYVg1dE9QTWhKaUdQbUxqLytKdEpVaENrSHNYTkw0NWJlUHYzZzNndU09In1dLCJpc3MiOiJkbnM6b3ByZXhwdC5vcmlnaW5hdG9yLXByb2ZpbGUub3JnIiwic3ViIjoidXJuOnV1aWQ6ZmRmZTdkY2UtOGE4My00MTk5LWI0YTAtNjYyY2M4OWIyYzIxIiwiaWF0IjoxNzQxMTQ1OTkwLCJleHAiOjE3NzI2ODE5OTB9.D0J_PQC4qbAp0YM8Ml3qP4caMBnkgm6ZOCHJrlhv7lS7of1wryg93_K7FeKDYs-H83MkfvlSQiPL5pTALUhV4g"
]
```

Specifically, CA is a string (JWT) that starts with "eyJ" as shown below.

```
eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwX1hDazM2dFFrUlpsQnhEckhzMVhldHBUZUZYdDRfVlRSbHlEa0YyQWsiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY3JlZGVudGlhbHMvdjEiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY2lwL3YxIix7IkBsYW5ndWFnZSI6ImphIn1dLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQ29udGVudEF0dGVzdGF0aW9uIl0sImlzc3VlciI6ImRuczpvcHJleHB0Lm9yaWdpbmF0b3ItcHJvZmlsZS5vcmciLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0eXBlIjoiQXJ0aWNsZSIsImhlYWRsaW5lIjoi55CG5LqL6ZW344Oh44OD44K744O844K4IiwiZGVzY3JpcHRpb24iOiLjgqTjg7Pjgr_jg7zjg43jg4Pjg4jjga_lnLDnkIPlhajkvZPjgafkuIDjgaTjga7nqbrplpPjgILnpL7kvJrjgavlpKfjgY3jgarliKnnm4rjgpLjgoLjgZ_jgonjgZfjgabjgYTjgb7jgZnjgYzjgIHlgb3jg7voqqTmg4XloLHjgoToqrnorJfkuK3lgrfmi6HmlaPjgajjgYTjgYbmlrDjgZ_jgaroqrLpoYzjgoLnlJ_jgZjjgabjgYTjgb7jgZnjgILjgZ3jga7op6PmsbrmioDooZPjgajjgZfjgaZPUOOCkuaPkOahiOOBl-OBvuOBmSIsImltYWdlIjp7ImlkIjoiaHR0cHM6Ly9vcmlnaW5hdG9yLXByb2ZpbGUub3JnL29ncC1qYS5wbmciLCJkaWdlc3RTUkkiOiJzaGEyNTYtRlcxRWhCRFArOHE2OG10YldpWlBqMnlmaGpFVC9oZmt4OTgwd1R0RlVPaz0ifSwiZGF0ZVB1Ymxpc2hlZCI6IjIwMjUtMDMtMDVUMDM6MzI6MjQuNTAwWiIsImRhdGVNb2RpZmllZCI6IjIwMjUtMDMtMDVUMDM6MzI6MjkuODM3WiIsImF1dGhvciI6WyJPcmlnaW5hdG9yIFByb2ZpbGUg5oqA6KGT56CU56m257WE5ZCIIl0sImVkaXRvciI6WyJPcmlnaW5hdG9yIFByb2ZpbGUg5oqA6KGT56CU56m257WE5ZCIIl0sImdlbnJlIjoidGVjaG5vbG9neSIsImlkIjoidXJuOnV1aWQ6ZmRmZTdkY2UtOGE4My00MTk5LWI0YTAtNjYyY2M4OWIyYzIxIn0sImFsbG93ZWRVcmwiOlsiaHR0cHM6Ly9vcmlnaW5hdG9yLXByb2ZpbGUub3JnL2phLUpQL2NoaWVmLWRpcmVjdG9yLyIsImh0dHA6Ly9sb2NhbGhvc3Q6NDMyMS9qYS1KUC9jaGllZi1kaXJlY3RvcigvPykiLCJodHRwczovL2ludGVncml0eS1wb3N0LXByb2Nlc3Mub3JpZ2luYXRvci1wcm9maWxlLW9yZy5wYWdlcy5kZXYvamEtSlAvY2hpZWYtZGlyZWN0b3IoLz8pIl0sInRhcmdldCI6W3sidHlwZSI6IlRleHRUYXJnZXRJbnRlZ3JpdHkiLCJjc3NTZWxlY3RvciI6Im1haW4iLCJpbnRlZ3JpdHkiOiJzaGEyNTYtd1VIdDNKSVpoTndjejYyR090Mm5GY2hQNHlKdHNyY2lMc1ZTZWI1ZktsQT0ifSx7InR5cGUiOiJFeHRlcm5hbFJlc291cmNlVGFyZ2V0SW50ZWdyaXR5IiwiaW50ZWdyaXR5Ijoic2hhMjU2LWNpYVg1dE9QTWhKaUdQbUxqLytKdEpVaENrSHNYTkw0NWJlUHYzZzNndU09In1dLCJpc3MiOiJkbnM6b3ByZXhwdC5vcmlnaW5hdG9yLXByb2ZpbGUub3JnIiwic3ViIjoidXJuOnV1aWQ6ZmRmZTdkY2UtOGE4My00MTk5LWI0YTAtNjYyY2M4OWIyYzIxIiwiaWF0IjoxNzQxMTQ1OTkwLCJleHAiOjE3NzI2ODE5OTB9.D0J_PQC4qbAp0YM8Ml3qP4caMBnkgm6ZOCHJrlhv7lS7of1wryg93_K7FeKDYs-H83MkfvlSQiPL5pTALUhV4g
```

JWT can be converted to JSON by decoding it.

[![View in JWT.io](https://jwt.io/img/badge.svg)](https://jwt.io/#debugger-io?token=eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwX1hDazM2dFFrUlpsQnhEckhzMVhldHBUZUZYdDRfVlRSbHlEa0YyQWsiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY3JlZGVudGlhbHMvdjEiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY2lwL3YxIix7IkBsYW5ndWFnZSI6ImphIn1dLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQ29udGVudEF0dGVzdGF0aW9uIl0sImlzc3VlciI6ImRuczpvcHJleHB0Lm9yaWdpbmF0b3ItcHJvZmlsZS5vcmciLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0eXBlIjoiQXJ0aWNsZSIsImhlYWRsaW5lIjoi55CG5LqL6ZW344Oh44OD44K744O844K4IiwiZGVzY3JpcHRpb24iOiLjgqTjg7Pjgr_jg7zjg43jg4Pjg4jjga_lnLDnkIPlhajkvZPjgafkuIDjgaTjga7nqbrplpPjgILnpL7kvJrjgavlpKfjgY3jgarliKnnm4rjgpLjgoLjgZ_jgonjgZfjgabjgYTjgb7jgZnjgYzjgIHlgb3jg7voqqTmg4XloLHjgoToqrnorJfkuK3lgrfmi6HmlaPjgajjgYTjgYbmlrDjgZ_jgaroqrLpoYzjgoLnlJ_jgZjjgabjgYTjgb7jgZnjgILjgZ3jga7op6PmsbrmioDooZPjgajjgZfjgaZPUOOCkuaPkOahiOOBl-OBvuOBmSIsImltYWdlIjp7ImlkIjoiaHR0cHM6Ly9vcmlnaW5hdG9yLXByb2ZpbGUub3JnL29ncC1qYS5wbmciLCJkaWdlc3RTUkkiOiJzaGEyNTYtRlcxRWhCRFArOHE2OG10YldpWlBqMnlmaGpFVC9oZmt4OTgwd1R0RlVPaz0ifSwiZGF0ZVB1Ymxpc2hlZCI6IjIwMjUtMDMtMDVUMDM6MzI6MjQuNTAwWiIsImRhdGVNb2RpZmllZCI6IjIwMjUtMDMtMDVUMDM6MzI6MjkuODM3WiIsImF1dGhvciI6WyJPcmlnaW5hdG9yIFByb2ZpbGUg5oqA6KGT56CU56m257WE5ZCIIl0sImVkaXRvciI6WyJPcmlnaW5hdG9yIFByb2ZpbGUg5oqA6KGT56CU56m257WE5ZCIIl0sImdlbnJlIjoidGVjaG5vbG9neSIsImlkIjoidXJuOnV1aWQ6ZmRmZTdkY2UtOGE4My00MTk5LWI0YTAtNjYyY2M4OWIyYzIxIn0sImFsbG93ZWRVcmwiOlsiaHR0cHM6Ly9vcmlnaW5hdG9yLXByb2ZpbGUub3JnL2phLUpQL2NoaWVmLWRpcmVjdG9yLyIsImh0dHA6Ly9sb2NhbGhvc3Q6NDMyMS9qYS1KUC9jaGllZi1kaXJlY3RvcigvPykiLCJodHRwczovL2ludGVncml0eS1wb3N0LXByb2Nlc3Mub3JpZ2luYXRvci1wcm9maWxlLW9yZy5wYWdlcy5kZXYvamEtSlAvY2hpZWYtZGlyZWN0b3IoLz8pIl0sInRhcmdldCI6W3sidHlwZSI6IlRleHRUYXJnZXRJbnRlZ3JpdHkiLCJjc3NTZWxlY3RvciI6Im1haW4iLCJpbnRlZ3JpdHkiOiJzaGEyNTYtd1VIdDNKSVpoTndjejYyR090Mm5GY2hQNHlKdHNyY2lMc1ZTZWI1ZktsQT0ifSx7InR5cGUiOiJFeHRlcm5hbFJlc291cmNlVGFyZ2V0SW50ZWdyaXR5IiwiaW50ZWdyaXR5Ijoic2hhMjU2LWNpYVg1dE9QTWhKaUdQbUxqLytKdEpVaENrSHNYTkw0NWJlUHYzZzNndU09In1dLCJpc3MiOiJkbnM6b3ByZXhwdC5vcmlnaW5hdG9yLXByb2ZpbGUub3JnIiwic3ViIjoidXJuOnV1aWQ6ZmRmZTdkY2UtOGE4My00MTk5LWI0YTAtNjYyY2M4OWIyYzIxIiwiaWF0IjoxNzQxMTQ1OTkwLCJleHAiOjE3NzI2ODE5OTB9.D0J_PQC4qbAp0YM8Ml3qP4caMBnkgm6ZOCHJrlhv7lS7of1wryg93_K7FeKDYs-H83MkfvlSQiPL5pTALUhV4g)

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://originator-profile.org/ns/credentials/v1",
    "https://originator-profile.org/ns/cip/v1",
    {
      "@language": "ja"
    }
  ],
  "type": ["VerifiableCredential", "ContentAttestation"],
  "issuer": "dns:oprexpt.originator-profile.org",
  "credentialSubject": {
    "type": "Article",
    "headline": "Message from Chief Director",
    "description": "The Internet is a single space for the entire planet. While it has brought great benefits to society, it has also created new challenges, such as the spread of false and misleading information and slander. We propose OP as a technology to solve these problems.",
    "image": {
      "id": "https://originator-profile.org/ogp-ja.png",
      "digestSRI": "sha256-FW1EhBDP+8q68mtbWiZPj2yfhjET/hfkx980wTtFUOk="
    },
    "datePublished": "2025-03-05T03:32:24.500Z",
    "dateModified": "2025-03-05T03:32:29.837Z",
    "author": ["the Originator Profile Collaborative Innovation Partnership"],
    "editor": ["the Originator Profile Collaborative Innovation Partnership"],
    "genre": "technology",
    "id": "urn:uuid:fdfe7dce-8a83-4199-b4a0-662cc89b2c21"
  },
  "allowedUrl": [
    "https://originator-profile.org/ja-JP/chief-director/",
    "http://localhost:4321/ja-JP/chief-director(/?)",
    "https://integrity-post-process.originator-profile-org.pages.dev/ja-JP/chief-director(/?)"
  ],
  "target": [
    {
      "type": "TextTargetIntegrity",
      "cssSelector": "main",
      "integrity": "sha256-wUHt3JIZhNwcz62GOt2nFchP4yJtsrciLsVSeb5fKlA="
    },
    {
      "type": "ExternalResourceTargetIntegrity",
      "integrity": "sha256-ciaX5tOPMhJiGPmLj/+JtJUhCkHsXNL45bePv3g3guM="
    }
  ],
  "iss": "dns:oprexpt.originator-profile.org",
  "sub": "urn:uuid:fdfe7dce-8a83-4199-b4a0-662cc89b2c21",
  "iat": 1741145990,
  "exp": 1772681990
}
```

Typical properties:

- [`credentialSubject`](/opb/ca-model/article/#credential-subject-properties): In the concept of Verifiable Credentials (VC), the property that indicates the subject to which a certificate (credential) is addressed.
  - `headline`: Content title
  - `description`: Content Description
- [`allowedUrl`](/opb/ca-model/article/#article-properties): URL Pattern [`test(input, baseURL)`](https://urlpattern.spec.whatwg.org/#dom-urlpattern-test) Algorithm-specific allowed range
- [`target`](/opb/ca-model/article/#article-properties): Content Integrity Descriptor (Array)
  - `type`
    - [`HTMLTargetIntegrity`](/opb/content-integrity-descriptor/html/): Part of an HTML document
    - [`TextTargetIntegrity`](/opb/content-integrity-descriptor/text/): DOM text
    - [`VisibleTextTargetIntegrity`](/opb/content-integrity-descriptor/visible-text/): Rendered text
    - [`ExternalResourceTargetIntegrity`](/opb/content-integrity-descriptor/external-resource/): `img`、`audio`、`video` Internally or externally referenced media resources such as elements

Display example:

![](./assets/content-info.png)

## For articles (static HTML elements containing content to display)

Recommended Content Integrity Descriptor:

- `HTMLTargetIntegrity`
- `TextTargetIntegrity` … Default type of WordPress plugin (CA Manager)
- `VisibleTextTargetIntegrity`

Specify a CSS selector (the `cssSelector` property) that targets the article body.
When doing this, you should avoid elements that are dynamically rewritten depending on the timing of access, user, or environment (e.g., advertisements or timestamps), as it is difficult to guarantee their integrity.

### About CSS selectors

Selecting elements with CSS selectors is the same as the `document.querySelectorAll()` algorithm used by browsers.

- [ID selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/ID_selectors)
- [Class selectoer](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors)
- [Type selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors)

In any Content Integrity Descriptor, if there are two or more elements that match the selector, they are all combined and the integrity (`integrity` property) is calculated.

### About "Integrity"

Use the `integrity` property to check the integrity of the UTF-8 byte sequence of the concatenated text.

Specific examples:

```
sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=
```

You can check the hash value of the UTF-8 byte sequence of the target HTML or text by using the console in the developer tools.

:::note

Launching Developer Tools

- Right-click > Select [Verify]
- [More tools] > Select [Developer tools]
- For Windows/Linux: `Ctrl`+`Shift`+`I`
- For macOS: `⌘ (Command)`+`⌥ (Option)`+`I`

:::

Enter the following code into the console:

```js
// Caution: This is development code, please run it only if you understand the potential risks.

// The type of content to be verified (Example: TextTargetIntegrity)
let type = "TextTargetIntegrity";

// CSS selector of the content to verify
let cssSelector = `[itemprop="articleBody"]`;

let elms = Array.from(document.querySelectorAll(cssSelector));
let targetText = null;
switch (type) {
  case "HTMLTargetIntegrity":
    targetText = elms.map((e) => e.outerHTML).join("");
    break;
  case "TextTargetIntegrity":
    targetText = elms.map((e) => e.textContent).join("");
    break;
  case "VisibleTextTargetIntegrity":
    targetText = elms.map((e) => e.innerText).join("");
    break;
  default:
    throw new Error(`Invalid type: ${type}`);
}
let integrity = `sha256-${btoa(
  String.fromCharCode(
    ...new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(targetText),
      ),
    ),
  ),
)}`;
console.log({ type, cssSelector, integrity });
```

Execution example:

![Developer tool > Console](./assets/devtools-console.webp)

## For images (static `img` elements with no interaction):

Recommended Content Integrity Descriptor:

- `ExternalResourceTargetIntegrity`

For `img` elements, the integrity of the image media resource specified by the `integrity` and `src` attributes is checked.
Media resources that are dynamically rewritten depending on the timing of access or the user or environment should be avoided, as it is difficult to guarantee their integrity.

### About "Integrity"

Use the `integrity` property to check integrity.
In the case of `ExternalResourceTargetIntegrity`, the target is the byte sequence of the media resource.

You can check the hash value of the byte sequence of the target media resource by using the developer tools console.

Enter the following code into the console:

```js
// Caution: This is development code, please run it only if you understand the potential risks.

// The type of content to be verified
let type = "ExternalResourceTargetIntegrity";

// The URL of the target media resource
let url = "https://op.cms.am/wp-includes/images/w-logo-blue-white-bg.png";

let res = await fetch(url);
let data = await res.arrayBuffer();

let integrity = `sha256-${btoa(
  String.fromCharCode(
    ...new Uint8Array(await crypto.subtle.digest("SHA-256", data)),
  ),
)}`;

console.log({ type, integrity });
```

Execution example:

![Developer tool > Console](./assets/devtools-console-image-integrity.webp)

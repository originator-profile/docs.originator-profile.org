---
sidebar_position: 102
original: https://github.com/originator-profile/docs.originator-profile.org/blob/b10a57d/docs/opb/context.md
---

# Contexts, Vocabularies, and Types

## Datatypes

### The `sriString` Datatype

It MUST conform to the definition in [Verifiable Credentials Data Model v2.0 Section B.3.1](https://www.w3.org/TR/vc-data-model-2.0/#the-sristring-datatype). For permitted hashes, they MUST conform to [hash algorithms](./algorithm.md#hash-algorithm).

Example 1:

```
sha256-GtNUUolQVlwIkQU9JknWkwkhfdiVmHr/BOnLFFHC5jI=
```

Example 2:

```
sha256-I4OoejARWbxpTQ1HEccoxIaOIMUjEIgxEfJXJDAjwoI=
sha384-dN4FeVmV5DQb/C8iAY+sBUjLjFfB+knXZJ3RT2GyJg8Tco4SPQYwxNpe2M50b9ON
```

### The `image` Datatype

The value of the `image` data type is a JSON-LD Node Object and contains the following properties:

- `id`: REQUIRED. The URL of the image.
- `digestSRI`: RECOMMENDED. A hash value to ensure the integrity of the image. It MUST be of the [`sriString` datatype](#the-sristring-datatype).

Example:

```json
{
  "id": "https://example.com/image.png",
  "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
}
```

#### Verifying `image` Datatype

A verifier can verify properties of the `image` datatype by following these steps (OPTIONAL):

1. Get the image by sending a GET request to the URL of the `id` property.

2. Verify the image obtained in 1. against the `digestSRI` property by the method as specified in [SRI section 3.3.5](https://www.w3.org/TR/SRI/#does-response-match-metadatalist).

### The `page` Datatype

`page` The data type value is a JSON-LD Node Object that contains the following properties:

- `id`: REQUIRED. The URL of the Web page.
- `name`: REQUIRED. The title of the Web page.

### The `dateTimeStamp` Datatype

The value of the `dateTimeStamp` data type MUST be a `dateTimeStamp` string from [W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes section 3.3.7 dateTime](https://www.w3.org/TR/xmlschema11-2/#dateTime), which corresponds to the http://www.w3.org/2001/XMLSchema#dateTime data type in the JSON-LD context.

### The `description` Datatype

A subset of the https://schema.org/description data type. It is either a string or a JSON-LD Node Object that contains the following properties:

- `text`: REQUIRED. The Text Content (string).
- `encodingFormat`: REQUIRED. The encoding format for the text content. It MUST be a [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types).

Example of JSON-LD Node Object:

```json
{
  "text": "<!doctype html><title>Example</title><h1>Headline</h1>",
  "encodingFormat": "text/html"
}
```

:::note Security Considerations

Application implementers should take the following points into consideration for text content other than the `text/plain` format:

- Do not assume that text content will be encoded into another format (e.g. converting from `text/markdown` to `text/html`), due to the risk of XSS vulnerabilities in the conversion process.
- When using `text/html` text content for display, the following countermeasures should be taken:
  - Prohibition of external resource loading, or restriction via an allow list
  - Rendering in a sandboxed iframe with CSP restrictions
  - Prohibition of stylesheet loading, or restriction via an allow list
- If an array of the `description` datatype is available, consider prioritizing reference to text content in a lower security risk format (such as `text/plain`).

:::

## Contexts

_This section is non-normative._

:::note

These context definitions do not reflect the latest specifications. Please refer to each specification document for the definition of each VC and property.

:::

### https://originator-profile.org/ns/credentials/v1

_This section is non-normative._

```json
{
  "@context": {
    "@version": 1.1,
    "@base": "https://originator-profile.org/ns/credentials/v1",
    "@protected": true,
    "op": "https://originator-profile.org/ns/credentials/v1#",
    "Image": {
      "@id": "https://originator-profile.org/ns/credentials/v1#image",
      "@context": {
        "@protected": true,
        "id": {
          "@id": "https://schema.org/image",
          "@type": "@id"
        },
        "digestSRI": {
          "@id": "https://www.w3.org/2018/credentials#digestSRI",
          "@type": "https://www.w3.org/2018/credentials#sriString"
        }
      }
    },
    "page": {
      "@id": "https://originator-profile.org/ns/v1#page",
      "@protected": true,
      "@context": {
        "id": {
          "@id": "https://schema.org/url",
          "@type": "@id"
        },
        "name": "https://schema.org/name"
      }
    },
    "allowedUrl": "https://schema.org/url",
    "ContentAttestation": {
      "@id": "https://originator-profile.org/ns/credentials/v1#ContentAttestation",
      "@context": {
        "@protected": true,
        "allowedUrl": "op:allowedUrl",
        "target": {
          "@id": "https://originator-profile.org/ns/credentials/v1#target",
          "@type": "@id"
        }
      }
    },
    "CoreProfile": "https://originator-profile.org/ns/credentials/v1#CoreProfile",
    "Core": {
      "@id": "https://originator-profile.org/ns/credentials/v1#Core",
      "@context": {
        "@protected": true,
        "id": "@id",
        "jwks": {
          "@id": "https://originator-profile.org/ns/credentials/v1#jwks",
          "@type": "@json"
        }
      }
    },
    "ProfileAnnotation": "https://originator-profile.org/ns/credentials/v1#ProfileAnnotation",
    "WebMediaProfile": "https://originator-profile.org/ns/credentials/v1#WebMediaProfile",
    "WebMediaSubject": {
      "@id": "https://originator-profile.org/ns/credentials/v1#WebMediaSubject",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "url": "https://schema.org/url",
        "name": "https://schema.org/name",
        "logo": "op:Image",
        "email": "https://schema.org/email",
        "telephone": "https://schema.org/telephone",
        "title": "https://schema.org/title",
        "image": "op:Image",
        "description": "https://schema.org/description",
        "origin": {
          "@id": "https://originator-profile.org/ns/credentials/v1#origin",
          "@type": "https://schema.org/url"
        },
        "contactTitle": "https://schema.org/title",
        "contactUrl": "https://schema.org/url",
        "privacyPolicyTitle": "https://schema.org/title",
        "privacyPolicyUrl": "https://schema.org/url",
        "publishingPrincipleTitle": "https://schema.org/title",
        "publishingPrincipleUrl": "https://schema.org/url"
      }
    },
    "WebsiteProfile": "https://originator-profile.org/ns/credentials/v1#WebsiteProfile",
    "Website": {
      "@id": "https://originator-profile.org/ns/credentials/v1#Website",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "title": "https://schema.org/title",
        "image": "op:Image",
        "description": "https://schema.org/description",
        "origin": {
          "@id": "https://originator-profile.org/ns/credentials/v1#origin",
          "@type": "https://schema.org/url"
        }
      }
    }
  }
}
```

### https://originator-profile.org/ns/cip/v1

_This section is non-normative._

```json
{
  "@context": {
    "@version": 1.1,
    "@base": "https://originator-profile.org/ns/cip/v1",
    "@protected": true,
    "cip": "https://originator-profile.org/ns/cip/v1#",
    "op": "https://originator-profile.org/ns/credentials/v1#",
    "CertificateSubject": {
      "@id": "https://originator-profile.org/ns/cip/v1#CertificateSubject",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "description": "https://schema.org/description",
        "image": "op:image",
        "certificationSystem": {
          "@id": "https://originator-profile.org/ns/cip/v1#certificationSystem",
          "@type": "@id"
        },
        "verifier": "https://schema.org/name",
        "certifier": "https://schema.org/name"
      }
    },
    "CertificationSystem": {
      "@id": "https://originator-profile.org/ns/cip/v1#CertificationSystem",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "name": "https://schema.org/name",
        "description": "https://schema.org/description",
        "ref": {
          "@id": "https://originator-profile.org/ns/cip/v1#ref",
          "@type": "@id"
        }
      }
    },
    "ECJP": {
      "@id": "https://originator-profile.org/ns/cip/v1#ECJP",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "addressCountry": "https://schema.org/addressCountry",
        "name": "https://schema.org/name",
        "corporateNumber": "https://schema.org/identifier",
        "postalCode": "https://schema.org/postalCode",
        "addressRegion": "https://schema.org/addressRegion",
        "addressLocality": "https://schema.org/addressLocality",
        "streetAddress": "https://schema.org/streetAddress",
        "certificationSystem": {
          "@id": "https://originator-profile.org/ns/cip/v1#certificationSystem",
          "@type": "@id"
        }
      }
    },
    "Certificate": {
      "@id": "https://originator-profile.org/ns/cip/v1#Certificate",
      "@context": {
        "@protected": true,
        "certificationSystem": {
          "@id": "https://originator-profile.org/ns/cip/v1#certificationSystem",
          "@type": "@id"
        }
      }
    },
    "ExistenceCertificateInJapan": "https://originator-profile.org/ns/cip/v1#ExistenceCertificateInJapan",
    "WebArticle": {
      "@id": "https://originator-profile.org/ns/cip/v1#WebArticle",
      "@context": {
        "@protected": true,
        "title": "https://schema.org/title",
        "image": "op:image",
        "source": "https://schema.org/url",
        "description": "https://schema.org/description",
        "author": "https://schema.org/author",
        "editor": "https://schema.org/editor",
        "datePublished": "https://schema.org/datePublished",
        "dateModified": "https://schema.org/dateModified",
        "category": "cip:category"
      }
    },
    "OnlineAd": {
      "@id": "https://originator-profile.org/ns/cip/v1#OnlineAd",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "title": "https://schema.org/title",
        "image": "op:image",
        "description": "https://schema.org/description",
        "landingPageUrl": "https://schema.org/url",
        "adReportContact": {
          "@id": "https://originator-profile.org/ns/cip/v1#adReportContact",
          "@type": "https://originator-profile.org/ns/v1#page"
        },
        "adReviewGuidelines": {
          "@id": "https://originator-profile.org/ns/cip/v1#adReviewGuidelines",
          "@type": "https://originator-profile.org/ns/v1#page"
        },
        "targetingPolicy": {
          "@id": "https://originator-profile.org/ns/cip/v1#targetingPolicy",
          "@type": "https://originator-profile.org/ns/v1#page"
        },
        "adDataHandlingPolicy": {
          "@id": "https://originator-profile.org/ns/cip/v1#adDataHandlingPolicy",
          "@type": "https://originator-profile.org/ns/v1#page"
        },
        "adDisplayRationale": {
          "@id": "https://originator-profile.org/ns/cip/v1#adDisplayRationale",
          "@context": {
            "page": {
              "@id": "https://originator-profile.org/ns/v1#page",
              "@type": "@id"
            },
            "description": "https://schema.org/description"
          }
        }
      }
    },
    "Integrity": {
      "@id": "https://originator-profile.org/ns/cip/v1#integrity",
      "@type": "https://www.w3.org/2018/credentials#sriString"
    },
    "HtmlTargetIntegrity": {
      "@id": "op:HtmlTargetIntegrity",
      "@context": {
        "@protected": true,
        "type": "@type",
        "integrity": "cip:Integrity",
        "cssSelector": "https://schema.org/cssSelector"
      }
    },
    "VisibleTextTargetIntegrity": {
      "@id": "op:VisibleTextTargetIntegrity",
      "@context": {
        "@protected": true,
        "type": "@type",
        "integrity": "cip:Integrity",
        "cssSelector": "https://schema.org/cssSelector"
      }
    },
    "TextTargetIntegrity": {
      "@id": "op:TextTargetIntegrity",
      "@context": {
        "@protected": true,
        "type": "@type",
        "integrity": "cip:Integrity",
        "cssSelector": "https://schema.org/cssSelector"
      }
    },
    "ExternalResourceTargetIntegrity": {
      "@id": "op:ExternalResourceTargetIntegrity",
      "@context": {
        "@protected": true,
        "type": "@type",
        "integrity": "cip:Integrity"
      }
    }
  }
}
```

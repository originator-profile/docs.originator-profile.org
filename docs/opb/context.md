---
sidebar_position: 102
---

# Contexts, Vocabularies, and Types

## Datatypes

### The `sriString` Datatype

[Verifiable Credentials Data Model v2.0 セクション B.3.1](https://www.w3.org/TR/vc-data-model-2.0/#the-sristring-datatype) の定義に準拠してください (MUST)。使用可能なハッシュについては[ハッシュアルゴリズム](./algorithm.md#hash-algorithm)に準拠してください (MUST)。

例1:

```
sha256-GtNUUolQVlwIkQU9JknWkwkhfdiVmHr/BOnLFFHC5jI=
```

例2:

```
sha256-I4OoejARWbxpTQ1HEccoxIaOIMUjEIgxEfJXJDAjwoI=
sha384-dN4FeVmV5DQb/C8iAY+sBUjLjFfB+knXZJ3RT2GyJg8Tco4SPQYwxNpe2M50b9ON
```

### The `image` Datatype

`image` データ型の値は、 JSON-LD Node Object であり、次のプロパティを含みます。

- `id`: REQUIRED. 画像の URL です。
- `digestSRI`: RECOMMENDED. 画像の完全性を保証するためのハッシュ値です。 [`sriString` データ型](#the-sristring-datatype) でなければなりません (MUST)。

例:

```json
{
  "id": "https://example.com/image.png",
  "digestSRI": "sha256-OYP9B9EPFBi1vs0dUqOhSbHmtP+ZSTsUv2/OjSzWK0w="
}
```

#### `image` Datatype の検証

検証者は次の手順に従って `image` データ型のプロパティを検証できます (OPTIONAL)。

1. `id` プロパティの URL に GET リクエストを送り画像を取得します。
2. 1\. で取得した画像と `digestSRI` プロパティを [SRI セクション 3.3.5](https://www.w3.org/TR/SRI/#does-response-match-metadatalist) に規定されている方法で検証します。

### The `page` Datatype

`page` データ型の値は、 JSON-LD Node Object であり、次のプロパティを含みます。

- `id`: REQUIRED. Web ページの URL です。
- `name`: REQUIRED. Web ページのタイトルです。

### The `dateTimeStamp` Datatype

`dateTimeStamp` データ型の値は、 [W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes セクション 3.3.7 dateTime](https://www.w3.org/TR/xmlschema11-2/#dateTime) の `dateTimeStamp` 文字列でなければなりません (MUST)。 JSON-LD Context では http://www.w3.org/2001/XMLSchema#dateTime データ型に対応します。

### The `description` Datatype

https://schema.org/description データ型のサブセットです。文字列または次のプロパティを含む JSON-LD Node Object です。

- `text`: REQUIRED. テキストコンテンツ (文字列)。
- `encodingFormat`: REQUIRED. テキストコンテンツの符号化形式。[MIME タイプ](https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/MIME_types)でなければなりません (MUST)。

JSON-LD Node Object の例:

```json
{
  "text": "<p>This is an example description in HTML format.</p>",
  "encodingFormat": "text/html"
}
```

:::note セキュリティの考慮事項

アプリケーション実装者は、`text/plain` 形式以外のテキストコンテンツについて、次の点に考慮してください。

- テキストコンテンツの別の形式への符号化（例えば、`text/markdown` 形式から `text/html` 形式への変換など）を前提とすることは、変換処理のXSS脆弱性へのリスクから避けるべきです。
- `text/html` 形式のテキストコンテンツを表示に使用する場合は、次のような対策を講じるべきです。
  - 外部リソース読み込みの禁止、または許可リストによる制限
  - CSP 制限を設けた sandbox iframe での描画
  - スタイルシート読み込みの禁止、または許可リストによる制限
- `description` データ型の配列が取得できる場合は、よりセキュリティリスクの少ない形式（`text/plain` 形式など）のテキストコンテンツを優先して参照することを検討してください。

:::

:::note

OP-CIPが開発したアプリケーションでは、HTMLタグの許可リストとして `<br>`, `<p>`, `<ol>`, `<ul>`, `<li>` のみを許可しています。

[実装例を参照](https://github.com/originator-profile/originator-profile/blob/v0.4.0-beta.5/packages/ui/src/utils/use-sanitized-html-for-description.ts#L18-L25)

:::

## Contexts

_このセクションは非規範的です。_

### https://originator-profile.org/ns/credentials/v1

_このセクションは非規範的です。_

```json
{
  "@context": {
    "@version": 1.1,
    "@base": "https://originator-profile.org/ns/credentials/v1",
    "@protected": true,
    "op": "https://originator-profile.org/ns/credentials/v1#",
    "image": {
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
    "annotationScheme": {
      "@id": "https://originator-profile.org/ns/credentials/v1#annotationScheme",
      "@type": "@id",
      "@container": "@set"
    },
    "annotation": "op:ProfileAnnotationPolicy",
    "ProfileAnnotationPolicy": {
      "@id": "https://originator-profile.org/ns/credentials/v1#ProfileAnnotationPolicy",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "name": "https://schema.org/name",
        "description": "https://schema.org/description",
        "ref": "op:page"
      }
    },
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
    "ProfileAnnotation": {
      "@id": "https://originator-profile.org/ns/credentials/v1#ProfileAnnotation",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "name": "https://schema.org/name",
        "description": "https://schema.org/description",
        "image": "op:image",
        "annotationScheme": "op:annotationScheme",
        "annotation": "op:annotation"
      }
    },
    "WebMediaProfile": "https://originator-profile.org/ns/credentials/v1#WebMediaProfile",
    "OnlineBusiness": {
      "@id": "https://originator-profile.org/ns/credentials/v1#OnlineBusiness",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "url": "https://schema.org/url",
        "name": "https://schema.org/name",
        "logo": {
          "@id": "https://schema.org/logo",
          "@type": "op:image"
        },
        "email": "https://schema.org/email",
        "telephone": "https://schema.org/telephone",
        "description": "https://schema.org/description",
        "contactPoint": {
          "@id": "https://schema.org/contactPoint",
          "@type": "op:page"
        },
        "informationTransmissionPolicy": {
          "@id": "https://originator-profile.org/ns/credentials/v1#informationTransmissionPolicy",
          "@type": "op:page"
        },
        "privacyPolicy": {
          "@id": "https://schema.org/privacyPolicy",
          "@type": "op:page"
        }
      }
    },
    "WebsiteProfile": "https://originator-profile.org/ns/credentials/v1#WebsiteProfile",
    "WebSite": {
      "@id": "https://originator-profile.org/ns/credentials/v1#WebSite",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "name": "https://schema.org/name",
        "image": {
          "@id": "https://schema.org/image",
          "@type": "op:image"
        },
        "description": "https://schema.org/description",
        "allowedOrigin": {
          "@id": "https://originator-profile.org/ns/credentials/v1#allowedOrigin",
          "@type": "https://schema.org/url"
        }
      }
    }
  }
}
```

### https://originator-profile.org/ns/cip/v1

_このセクションは非規範的です。_

```json
{
  "@context": {
    "@version": 1.1,
    "@base": "https://originator-profile.org/ns/cip/v1",
    "@protected": true,
    "cip": "https://originator-profile.org/ns/cip/v1#",
    "op": "https://originator-profile.org/ns/credentials/v1#",
    "ProfileAnnotatorRegistration": {
      "@id": "https://originator-profile.org/ns/cip/v1#ProfileAnnotatorRegistration",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "annotatorName": "https://schema.org/name"
      }
    },
    "JP-OrganizationExistenceCertificate": {
      "@id": "https://originator-profile.org/ns/cip/v1#JP-OrganizationExistenceCertificate",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "corporateName": "https://schema.org/legalName",
        "corporateNumber": "https://schema.org/taxID",
        "postalCode": "https://schema.org/postalCode",
        "addressCountry": "https://schema.org/addressCountry",
        "addressRegion": "https://schema.org/addressRegion",
        "addressLocality": "https://schema.org/addressLocality",
        "streetAddress": "https://schema.org/streetAddress"
      }
    },
    "AdvertisingQualityCertificate": {
      "@id": "https://originator-profile.org/ns/cip/v1#AdvertisingQualityCertificate",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "verifier": "https://schema.org/name",
      }
    },
    "NewsMediaRegistration": {
      "@id": "https://originator-profile.org/ns/cip/v1#NewsMediaRegistration",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type"
      }
    },
    "JP-LocalGovernmentCertificate": {
      "@id": "https://originator-profile.org/ns/cip/v1#JP-LocalGovernmentCertificate",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type"
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
    "Article": {
      "@id": "https://originator-profile.org/ns/cip/v1#Article",
      "@context": {
        "@protected": true,
        "headline": "https://schema.org/headline",
        "description": "https://schema.org/description",
        "image": "op:image",
        "datePublished": {
          "@id": "https://schema.org/datePublished",
          "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
        },
        "dateModified": {
          "@id": "https://schema.org/dateModified",
          "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
        },
        "author": "https://schema.org/author",
        "editor": "https://schema.org/editor",
        "genre": "https://schema.org/genre"
      }
    },
    "Advertorial": {
      "@id": "https://originator-profile.org/ns/cip/v1#Advertorial",
      "@context": {
        "@protected": true,
        "headline": "https://schema.org/headline",
        "description": "https://schema.org/description",
        "image": "op:image",
        "datePublished": {
          "@id": "https://schema.org/datePublished",
          "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
        },
        "dateModified": {
          "@id": "https://schema.org/dateModified",
          "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
        },
        "author": "https://schema.org/author",
        "editor": "https://schema.org/editor",
        "sponsor": "https://schema.org/sponsor",
        "genre": "https://schema.org/genre"
      }
    },
    "CertificateProperties": "https://originator-profile.org/ns/cip/v1#CertificateProperties",
    "Certificate": {
      "@id": "https://originator-profile.org/ns/cip/v1#Certificate",
      "@context": {
        "@protected": true,
        "description": "https://schema.org/description",
        "image": "op:image",
        "certifier": "https://schema.org/name",
        "verifier": "https://schema.org/name",
        "certificationSystem": {
          "@id": "https://originator-profile.org/ns/cip/v1#certificationSystem",
          "@type": "@id"
        }
      }
    },
    "OnlineAd": {
      "@id": "https://originator-profile.org/ns/cip/v1#OnlineAd",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "name": "https://schema.org/name",
        "description": "https://schema.org/description",
        "image": "op:image",
        "genre": "https://schema.org/genre",
        "landingPageUrl": {
          "@id": "https://schema.org/url",
          "@type": "@id"
        },
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

---
sidebar_position: 3
---

# 検証対象のコンテンツ・HTML 要素について

検証対象のコンテンツ・HTML 要素について具体的な事例を交えて解説します。

Content Attestation (CA) にはその検証対象のコンテンツの<ruby>完全性<rt>integrity</rt></ruby>を保証する [Content Integrity Descriptor](/opb/content-integrity-descriptor/) (`target` プロパティ) が含まれます。
Content Integrity Descriptor には Subresource Integrity (SRI) を基盤とする対象の異なる以下の種別 (`type` プロパティ) が定義されています:

- [HTML Target](/opb/content-integrity-descriptor/html/) (`HTMLTargetIntegrity`): HTML 文書の一部
- [Text Target](/opb/content-integrity-descriptor/text/) (`TextTargetIntegrity`): DOM テキスト
- [Visible Text Target](/opb/content-integrity-descriptor/visible-text/) (`VisibleTextTargetIntegrity`): レンダリング時のテキスト
- [External Resource Target](/opb/content-integrity-descriptor/external-resource/) (`ExternalResourceTargetIntegrity`): `img`、`audio`、`video` 要素など内部または外部参照されるメディアリソース

これらを組み合わせた CA、あるいは CA の集合 (CA Set) によって、対象のコンテンツの完全性が検証可能となります。

![](./assets/content-attestation-set.webp)

### 具体例

https://originator-profile.org/ja-JP/chief-director/ の例:

```html
<script
  type="application/cas+json"
  src="/cas/ja-JP.chief-director.cas.json"
></script>
```

HTML 文書内に script タグ (`<script type="application/cas+json">`) を記述することによって CA Set を提示します ([Linking](/opb/link-to-html/))。
script タグ内には、CA の配列 ([CAS](/opb/content-attestation-set/)) を記述するか、`src` 属性でその CAS を参照することが可能です。

https://originator-profile.org/cas/ja-JP.chief-director.cas.json

```json
[
  "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwX1hDazM2dFFrUlpsQnhEckhzMVhldHBUZUZYdDRfVlRSbHlEa0YyQWsiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY3JlZGVudGlhbHMvdjEiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY2lwL3YxIix7IkBsYW5ndWFnZSI6ImphIn1dLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQ29udGVudEF0dGVzdGF0aW9uIl0sImlzc3VlciI6ImRuczpvcHJleHB0Lm9yaWdpbmF0b3ItcHJvZmlsZS5vcmciLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0eXBlIjoiQXJ0aWNsZSIsImhlYWRsaW5lIjoi55CG5LqL6ZW344Oh44OD44K744O844K4IiwiZGVzY3JpcHRpb24iOiLjgqTjg7Pjgr_jg7zjg43jg4Pjg4jjga_lnLDnkIPlhajkvZPjgafkuIDjgaTjga7nqbrplpPjgILnpL7kvJrjgavlpKfjgY3jgarliKnnm4rjgpLjgoLjgZ_jgonjgZfjgabjgYTjgb7jgZnjgYzjgIHlgb3jg7voqqTmg4XloLHjgoToqrnorJfkuK3lgrfmi6HmlaPjgajjgYTjgYbmlrDjgZ_jgaroqrLpoYzjgoLnlJ_jgZjjgabjgYTjgb7jgZnjgILjgZ3jga7op6PmsbrmioDooZPjgajjgZfjgaZPUOOCkuaPkOahiOOBl-OBvuOBmSIsImltYWdlIjp7ImlkIjoiaHR0cHM6Ly9vcmlnaW5hdG9yLXByb2ZpbGUub3JnL29ncC1qYS5wbmciLCJkaWdlc3RTUkkiOiJzaGEyNTYtRlcxRWhCRFArOHE2OG10YldpWlBqMnlmaGpFVC9oZmt4OTgwd1R0RlVPaz0ifSwiZGF0ZVB1Ymxpc2hlZCI6IjIwMjUtMDMtMDVUMDM6MzI6MjQuNTAwWiIsImRhdGVNb2RpZmllZCI6IjIwMjUtMDMtMDVUMDM6MzI6MjkuODM3WiIsImF1dGhvciI6WyJPcmlnaW5hdG9yIFByb2ZpbGUg5oqA6KGT56CU56m257WE5ZCIIl0sImVkaXRvciI6WyJPcmlnaW5hdG9yIFByb2ZpbGUg5oqA6KGT56CU56m257WE5ZCIIl0sImdlbnJlIjoidGVjaG5vbG9neSIsImlkIjoidXJuOnV1aWQ6ZmRmZTdkY2UtOGE4My00MTk5LWI0YTAtNjYyY2M4OWIyYzIxIn0sImFsbG93ZWRVcmwiOlsiaHR0cHM6Ly9vcmlnaW5hdG9yLXByb2ZpbGUub3JnL2phLUpQL2NoaWVmLWRpcmVjdG9yLyIsImh0dHA6Ly9sb2NhbGhvc3Q6NDMyMS9qYS1KUC9jaGllZi1kaXJlY3RvcigvPykiLCJodHRwczovL2ludGVncml0eS1wb3N0LXByb2Nlc3Mub3JpZ2luYXRvci1wcm9maWxlLW9yZy5wYWdlcy5kZXYvamEtSlAvY2hpZWYtZGlyZWN0b3IoLz8pIl0sInRhcmdldCI6W3sidHlwZSI6IlRleHRUYXJnZXRJbnRlZ3JpdHkiLCJjc3NTZWxlY3RvciI6Im1haW4iLCJpbnRlZ3JpdHkiOiJzaGEyNTYtd1VIdDNKSVpoTndjejYyR090Mm5GY2hQNHlKdHNyY2lMc1ZTZWI1ZktsQT0ifSx7InR5cGUiOiJFeHRlcm5hbFJlc291cmNlVGFyZ2V0SW50ZWdyaXR5IiwiaW50ZWdyaXR5Ijoic2hhMjU2LWNpYVg1dE9QTWhKaUdQbUxqLytKdEpVaENrSHNYTkw0NWJlUHYzZzNndU09In1dLCJpc3MiOiJkbnM6b3ByZXhwdC5vcmlnaW5hdG9yLXByb2ZpbGUub3JnIiwic3ViIjoidXJuOnV1aWQ6ZmRmZTdkY2UtOGE4My00MTk5LWI0YTAtNjYyY2M4OWIyYzIxIiwiaWF0IjoxNzQxMTQ1OTkwLCJleHAiOjE3NzI2ODE5OTB9.D0J_PQC4qbAp0YM8Ml3qP4caMBnkgm6ZOCHJrlhv7lS7of1wryg93_K7FeKDYs-H83MkfvlSQiPL5pTALUhV4g"
]
```

CA は具体的にはこのような "eyJ" から始まる文字列 (JWT) です。

```
eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwX1hDazM2dFFrUlpsQnhEckhzMVhldHBUZUZYdDRfVlRSbHlEa0YyQWsiLCJ0eXAiOiJ2Yytqd3QiLCJjdHkiOiJ2YyJ9.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY3JlZGVudGlhbHMvdjEiLCJodHRwczovL29yaWdpbmF0b3ItcHJvZmlsZS5vcmcvbnMvY2lwL3YxIix7IkBsYW5ndWFnZSI6ImphIn1dLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQ29udGVudEF0dGVzdGF0aW9uIl0sImlzc3VlciI6ImRuczpvcHJleHB0Lm9yaWdpbmF0b3ItcHJvZmlsZS5vcmciLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0eXBlIjoiQXJ0aWNsZSIsImhlYWRsaW5lIjoi55CG5LqL6ZW344Oh44OD44K744O844K4IiwiZGVzY3JpcHRpb24iOiLjgqTjg7Pjgr_jg7zjg43jg4Pjg4jjga_lnLDnkIPlhajkvZPjgafkuIDjgaTjga7nqbrplpPjgILnpL7kvJrjgavlpKfjgY3jgarliKnnm4rjgpLjgoLjgZ_jgonjgZfjgabjgYTjgb7jgZnjgYzjgIHlgb3jg7voqqTmg4XloLHjgoToqrnorJfkuK3lgrfmi6HmlaPjgajjgYTjgYbmlrDjgZ_jgaroqrLpoYzjgoLnlJ_jgZjjgabjgYTjgb7jgZnjgILjgZ3jga7op6PmsbrmioDooZPjgajjgZfjgaZPUOOCkuaPkOahiOOBl-OBvuOBmSIsImltYWdlIjp7ImlkIjoiaHR0cHM6Ly9vcmlnaW5hdG9yLXByb2ZpbGUub3JnL29ncC1qYS5wbmciLCJkaWdlc3RTUkkiOiJzaGEyNTYtRlcxRWhCRFArOHE2OG10YldpWlBqMnlmaGpFVC9oZmt4OTgwd1R0RlVPaz0ifSwiZGF0ZVB1Ymxpc2hlZCI6IjIwMjUtMDMtMDVUMDM6MzI6MjQuNTAwWiIsImRhdGVNb2RpZmllZCI6IjIwMjUtMDMtMDVUMDM6MzI6MjkuODM3WiIsImF1dGhvciI6WyJPcmlnaW5hdG9yIFByb2ZpbGUg5oqA6KGT56CU56m257WE5ZCIIl0sImVkaXRvciI6WyJPcmlnaW5hdG9yIFByb2ZpbGUg5oqA6KGT56CU56m257WE5ZCIIl0sImdlbnJlIjoidGVjaG5vbG9neSIsImlkIjoidXJuOnV1aWQ6ZmRmZTdkY2UtOGE4My00MTk5LWI0YTAtNjYyY2M4OWIyYzIxIn0sImFsbG93ZWRVcmwiOlsiaHR0cHM6Ly9vcmlnaW5hdG9yLXByb2ZpbGUub3JnL2phLUpQL2NoaWVmLWRpcmVjdG9yLyIsImh0dHA6Ly9sb2NhbGhvc3Q6NDMyMS9qYS1KUC9jaGllZi1kaXJlY3RvcigvPykiLCJodHRwczovL2ludGVncml0eS1wb3N0LXByb2Nlc3Mub3JpZ2luYXRvci1wcm9maWxlLW9yZy5wYWdlcy5kZXYvamEtSlAvY2hpZWYtZGlyZWN0b3IoLz8pIl0sInRhcmdldCI6W3sidHlwZSI6IlRleHRUYXJnZXRJbnRlZ3JpdHkiLCJjc3NTZWxlY3RvciI6Im1haW4iLCJpbnRlZ3JpdHkiOiJzaGEyNTYtd1VIdDNKSVpoTndjejYyR090Mm5GY2hQNHlKdHNyY2lMc1ZTZWI1ZktsQT0ifSx7InR5cGUiOiJFeHRlcm5hbFJlc291cmNlVGFyZ2V0SW50ZWdyaXR5IiwiaW50ZWdyaXR5Ijoic2hhMjU2LWNpYVg1dE9QTWhKaUdQbUxqLytKdEpVaENrSHNYTkw0NWJlUHYzZzNndU09In1dLCJpc3MiOiJkbnM6b3ByZXhwdC5vcmlnaW5hdG9yLXByb2ZpbGUub3JnIiwic3ViIjoidXJuOnV1aWQ6ZmRmZTdkY2UtOGE4My00MTk5LWI0YTAtNjYyY2M4OWIyYzIxIiwiaWF0IjoxNzQxMTQ1OTkwLCJleHAiOjE3NzI2ODE5OTB9.D0J_PQC4qbAp0YM8Ml3qP4caMBnkgm6ZOCHJrlhv7lS7of1wryg93_K7FeKDYs-H83MkfvlSQiPL5pTALUhV4g
```

JWT はデコードすることで JSON に変換できます。

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
    "headline": "理事長メッセージ",
    "description": "インターネットは地球全体で一つの空間。社会に大きな利益をもたらしていますが、偽・誤情報や誹謗中傷拡散という新たな課題も生じています。その解決技術としてOPを提案します",
    "image": {
      "id": "https://originator-profile.org/ogp-ja.png",
      "digestSRI": "sha256-FW1EhBDP+8q68mtbWiZPj2yfhjET/hfkx980wTtFUOk="
    },
    "datePublished": "2025-03-05T03:32:24.500Z",
    "dateModified": "2025-03-05T03:32:29.837Z",
    "author": ["Originator Profile 技術研究組合"],
    "editor": ["Originator Profile 技術研究組合"],
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

代表的なプロパティ:

- [`credentialSubject`](/opb/ca-model/article/#credential-subject-properties): Verifiable Credentials (VC) の概念において、証明書 (クレデンシャル) が対象とする主体を指すプロパティ
  - `headline`: コンテンツのタイトル
  - `description`: コンテンツの説明（文字列）
- [`allowedUrl`](/opb/ca-model/article/#article-properties): URL Pattern [`test(input, baseURL)`](https://urlpattern.spec.whatwg.org/#dom-urlpattern-test) アルゴリズムによって許可する範囲
- [`target`](/opb/ca-model/article/#article-properties): Content Integrity Descriptor (配列)
  - `type`
    - [`HTMLTargetIntegrity`](/opb/content-integrity-descriptor/html/): HTML 文書の一部
    - [`TextTargetIntegrity`](/opb/content-integrity-descriptor/text/): DOM テキスト
    - [`VisibleTextTargetIntegrity`](/opb/content-integrity-descriptor/visible-text/): レンダリング時のテキスト
    - [`ExternalResourceTargetIntegrity`](/opb/content-integrity-descriptor/external-resource/): `img`、`audio`、`video` 要素など内部または外部参照されるメディアリソース

表示例:

![](./assets/content-info.png)

## 記事 (表示内容を含む静的なHTML要素) の場合

推奨される Content Integrity Descriptor:

- `HTMLTargetIntegrity`
- `TextTargetIntegrity` … WordPress プラグイン (CA Manager) の既定の種別
- `VisibleTextTargetIntegrity`

記事の本文を対象とする CSS セレクター (`cssSelector` プロパティ) を指定します。
このとき、アクセスするタイミングやユーザー・環境に応じて動的に書き換わる (例: 広告やタイムスタンプなど) 要素は完全性の保証が困難なため避けなければなりません。

### CSS セレクターについて

CSS セレクターによる要素の選択はブラウザーが使用する `document.querySelectorAll()` アルゴリズムと同じです。

- [ID セレクター](https://developer.mozilla.org/ja/docs/Web/CSS/ID_selectors)
- [クラスセレクター](https://developer.mozilla.org/ja/docs/Web/CSS/Class_selectors)
- [要素型セレクター](https://developer.mozilla.org/ja/docs/Web/CSS/Type_selectors)

いずれの Content Integrity Descriptor でもセレクターに一致する要素が2つ以上存在する場合はすべて結合し、完全性 (`integrity` プロパティ) を計算します。

### 「完全性」について

`integrity` プロパティを使用し完全性をチェックします。結合して得られるテキストの UTF-8 バイト列がその対象となります。

具体例:

```
sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=
```

開発者ツールのコンソールを使うことで対象の HTML・テキストの UTF-8 バイト列のハッシュ値を確認することが可能です。

:::note

開発者ツールの起動

- 右クリック > [検証] を選択
- [その他のツール] > [デベロッパー ツール] を選択
- Windows/Linux の場合: `Ctrl`+`Shift`+`I`
- macOS の場合: `⌘ (Command)`+`⌥ (Option)`+`I`

:::

コンソールに以下のコードを入力します:

```js
// 注意: 開発目的のコードです。潜在的なリスクを理解した上で実行してください。

// 検証対象のコンテンツの種別 (例: TextTargetIntegrity)
let type = "TextTargetIntegrity";

// 検証対象のコンテンツの CSS セレクター
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
    throw new Error(`無効なtype: ${type}`);
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

実行例:

![開発者ツール > コンソール](./assets/devtools-console.webp)

## 画像 (インタラクションを伴わない静的な `img` 要素) の場合

推奨される Content Integrity Descriptor:

- `ExternalResourceTargetIntegrity`

`img` 要素の場合、`integrity` 属性と `src` 属性で指定した画像のメディアリソースの完全性をチェックします。
このとき、アクセスするタイミングやユーザー・環境に応じて動的に書き換わるメディアリソースは完全性の保証が困難なため避けなければなりません。

### 「完全性」について

`integrity` プロパティを使用し完全性をチェックします。
`ExternalResourceTargetIntegrity` の場合はメディアリソースのバイト列がその対象となります。

開発者ツールのコンソールを使うことで対象のメディアリソースのバイト列のハッシュ値を確認することが可能です。

コンソールに以下のコードを入力します:

```js
// 注意: 開発目的のコードです。潜在的なリスクを理解した上で実行してください。

// 検証対象のコンテンツの種別
let type = "ExternalResourceTargetIntegrity";

// 対象のメディアリソースのURL
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

実行例:

![開発者ツール > コンソール](./assets/devtools-console-image-integrity.webp)

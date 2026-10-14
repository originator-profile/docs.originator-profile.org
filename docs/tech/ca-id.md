---
sidebar_position: 4
---

# CA ID の決め方

本ページでは、Content Attestation の ID (CA ID) をどの単位で割り当てるか、コンテンツを更新、削除するときにどう扱うか説明します。
CA のデータモデルや検証プロセスの詳細は [Originator Profile Blueprint (OPB)](/opb/) の各ページを参照してください。

## 判断の目安 {#decision-guide}

| 場面                                       | CA ID                          |
| :----------------------------------------- | :----------------------------- |
| 有効期間の延長                             | [維持できる](#keep-ca-id)      |
| 署名鍵の更新                               | [維持できる](#key-rotation)    |
| 誤字の訂正や追記                           | [維持できる](#keep-ca-id)      |
| 主旨が変わらないタイトルやサムネイルの変更 | [維持できる](#keep-ca-id)      |
| デバイスごとに表示を変えるが内容は同一     | [維持できる](#granularity)     |
| 同じ URL での別コンテンツへの差し替え      | [新しく割り当てる](#new-ca-id) |
| 主旨が変わるほどの書き直し                 | [新しく割り当てる](#new-ca-id) |
| 記事の複数ページへの分割公開               | [新しく割り当てる](#new-ca-id) |
| デバイスごとに内容が異なる                 | [新しく割り当てる](#new-ca-id) |
| コンテンツの取り下げ                       | [再利用しない](#delete-ca)     |

## Content Attestation (CA) とは {#what-ca}

CA は、コンテンツが発信者から発せられたものであり、改変されていないことを確認するための署名付きデータです[^aov-ca]。
ここでいうコンテンツは、発信者から発せられる情報の一片を指し、Web ページに限られません[^aov-content]。
CA ID は、その CA の `credentialSubject.id` に記載する ID で、UUIDv4 の URN 形式の文字列です (例: `urn:uuid:78550fa7-f846-4e0f-ad5c-8d34461cb95b`)[^ca-id]。
CA ID は、ある時点で発行者が提示しているコンテンツと一対一対応します[^ca-id]。
CA ID を切り替えるときは、旧 CA の提示をやめることで対応関係を保ちます ([新しい CA ID での発行](#new-ca-id) を参照)。
1 つのページに複数のコンテンツがあれば、それぞれに CA を発行し、Content Attestation Set (CAS) にまとめて提示できます[^cas]。

CA ID は、CMS の記事 ID や Web ページの URL とは別の独立した概念の ID です。
CMS は CA ID を保持することで、記事とその記事のコンテンツの CA との対応関係を管理できます。

CA の発行者を識別する ID は、CA の `issuer` に記載します[^ca-issuer][^op-id]。
1 つの組織が発行する CA は同じ `issuer` を持ちます。
CA ID をどのコンテンツに割り当てるかは、CA の発行者が決めます。
どこまでを一つのコンテンツと見なすか、更新後のコンテンツが更新前と同じコンテンツと言えるか、コンテンツの同一性は発行者が判断し、その判断に責任を持ちます。

## コンテンツの単位と CA ID の粒度 {#granularity}

CA ID の粒度は、発行者がコンテンツをどの単位で区別するかで決まります。

多くの場合、URL が異なれば別のコンテンツとして扱います。
ここで URL が異なるとは、[WHATWG URL Standard](https://url.spec.whatwg.org/) に従って URL を比較したときに等しくないことを指します[^url-equivalence]。
たとえば複数ページに分かれた記事では、ページごとに表示される本文が異なるので、ページごとに別の CA ID を割り当てます。
各ページの CA の `allowedUrl` には、そのページの URL を指定します[^allowed-url]。

一方、コンテンツを出し分ける手段は URL に限りません。
同じ URL で閲覧するデバイスによって表示を変える場合、デバイスごとの内容が意味として同一なら、同じ CA ID を使えます。
内容が異なるなら、デバイスごとに別の CA ID を割り当て、それぞれの CA を出し分けます。
いずれの場合も、各デバイスに提示する CA の `target` は、そのデバイスで表示される内容と一致している必要があります[^target-integrity]。
反対に、同じコンテンツを複数の URL で提供する場合は、`allowedUrl` に複数の URL Pattern を列挙して、1 つの CA で対応することもできます[^allowed-url]。

## CA の更新 {#update-ca}

CA ID は、各コンテンツを独立に識別する ID として割り当ててください。
CA ID そのものは、CA 同士の関係を表しません。
更新前と更新後のコンテンツ、分割した記事の各ページ、デバイスごとに出し分けたコンテンツの関係は、CA ID の付け方では表現できません。

### 同じ CA ID での再発行 {#keep-ca-id}

発行者は、コンテンツが意味として同一であると保証できる範囲で、同じ CA ID のまま CA を再発行し、CAS を更新設置できます。
誤字を訂正したり追記したりしても、発行者が同じ記事であると保証できるなら、同じ CA ID を使い続けられます。

ただし、CA ID を維持できることと、CA を再発行しなくてよいことは別です。
`target` の対象となる内容を変更すると、既存の CA に記録されたハッシュと一致しなくなり、検証に失敗します[^target-integrity]。
内容を変更したら、CA ID を維持するかどうかに関わらず、CA を再発行して CAS を更新設置してください。

CA ID を維持したまま再発行する典型的な場面は次のとおりです。

- 有効期間の延長：`iat` と `exp` だけを変えて再発行します ([OP, SP, CA の有効期間](/tech/validity-period.mdx) を参照)。
- 署名鍵の更新：古い鍵を CP から取り除く前に、新しい鍵で署名し直します。JWT ヘッダーの `kid` が変わります[^kid]。詳しくは次の節を参照してください。
- 意味が変わらない範囲の内容の更新：誤字の訂正や追記などです。タイトルやサムネイルの変更も、記事の主旨が変わらなければこれに当たります。`target` や `credentialSubject` の値が変わります。

### 署名鍵の更新 {#key-rotation}

鍵の更新で変わるのは、OP ID に対して発行される CP に含まれる公開鍵の集合です[^terminology-cp]。
署名鍵を更新しても、OP ID や CA ID を変える必要はありません。

CA の有効性は、その CA を発行した組織の OP の有効性に依存します。
OP が有効期間内にあり、CA の署名に使った鍵の公開鍵が CP に含まれている限り、既存の CA は引き続き有効です ([CA の有効期間](/tech/validity-period.mdx#content-attestation-ca-の有効期間) を参照)。
したがって、新しい鍵を CP に追加するために OP を再発行しても、既存の CA を再発行する必要はありません。

一方、古い鍵の公開鍵を CP から取り除くと、その鍵で署名したすべての CA がまとめて失効します ([有効期間を短く保つ理由](/tech/validity-period.mdx#有効期間を短く保つ理由) を参照)。
古い鍵を取り除く前に、その鍵で署名した CA を、同じ CA ID のまま新しい鍵で再発行し、CAS を更新設置してください。

### 新しい CA ID での発行 {#new-ca-id}

コンテンツが更新前と意味として同一と言えなくなった場合は、新しい CA ID を割り当てて CA を発行します。
たとえば、同じ URL のページを別の記事に差し替えた場合や、主旨が変わるほど記事を書き直した場合です。

意味として同一と言える場合でも、新しい CA ID にしてかまいません。
CA ID そのものは変更できませんが、CA の追加と削除は発行者が任意に行えます。
新しい CA ID への切り替えは、新しい CA の追加と古い CA の削除の組み合わせとして扱えます。

新しい CA ID に切り替えるときは、旧 CA と新 CA を同じ CAS に並べず、旧 CA を CAS から取り除いてください。
両方を並べると、同じコンテンツについて 2 つの CA が提示され、どちらが現在の内容を表しているかを閲覧者が判別しにくくなるおそれがあります。
また、旧 CA を残したままにすると、旧 CA の有効期間が切れた時点で、その CA は検証エラーになります。
新 CA の有効期間だけを管理していると、この期限切れを見落としやすくなります。

## CA の削除 {#delete-ca}

CA の削除は、発行者の判断で行います。
コンテンツを取り下げたときは、その CA を CAS から削除します。

:::note

CA Server で CA を管理している場合は、CA Server の削除エンドポイントに CA ID を指定して、CA Server からも CA を削除してください ([CA Server を使用する方法](/tutorial/cas-setup-guide.md#ca-server)、[WordPress での例](/site-cases/wordpress.md) を参照)。

:::

別の URL に複製されたページなどに残った CA も、そのページの URL が `allowedUrl` を満たす限り、有効期間が切れるまで検証に成功します ([WSP と CA の有効期間の決め方](/tech/validity-period.mdx#choosing-validity-period) を参照)。
CAS から削除しても、CA そのものは失効しません。

削除した CA の CA ID は、別のコンテンツに再利用しないでください。
再利用すると、異なる複数のコンテンツに同じ CA ID が割り当てられ、コンテンツと CA ID の対応関係が崩れます。

[^aov-ca]: [OP Architectural Overview (AOV)](pathname:///aov/#dfn-content-attestation) の「Content Attestation」の定義。

[^aov-content]: [AOV](pathname:///aov/#dfn-content) の「Content」の定義。Web ページとしての配信は、AOV の Web Media Specific Model で説明される配信方法の一つです。

[^ca-id]: [Content Attestation の `credentialSubject` のプロパティ一覧](/opb/ca.md#credential-subject-properties)。各 CA モデル ([Article Data Model](/opb/ca-model/article.md) など) にも同じ定めがあります。

[^cas]: [Content Attestation Set](/opb/content-attestation-set.md)。CAS には複数の CA を含められ、メインコンテンツに対する CA には `main` を指定します。

[^ca-issuer]: [Content Attestation のプロパティ一覧](/opb/ca.md#content-attestation-properties) の `issuer`。

[^op-id]: [Originator Profile Identifier (OP ID)](/opb/op-id.md)。

[^url-equivalence]: WHATWG URL Standard の [URL equivalence](https://url.spec.whatwg.org/#url-equivalence)。

[^allowed-url]: [Content Attestation のプロパティ一覧](/opb/ca.md#content-attestation-properties) の `allowedUrl` と、[`allowedUrl` の検証](/opb/ca.md#allowed-url-validation)。`allowedUrl` は URL Pattern string またはその配列です。

[^target-integrity]: [Content Integrity Descriptor の検証](/opb/ca.md#target-integrity-validation)。

[^terminology-cp]: [用語の「Core Profile (CP)」](/opb/terminology.md#core-profile-cp) と [Core Profile](/opb/cp.md)。CP は、ある OP ID の主体に公開鍵の集合が対応していることを証明する VC です。

[^kid]: [OP VC Securing Mechanism のヘッダー](/opb/securing-mechanism.md#ヘッダー)。

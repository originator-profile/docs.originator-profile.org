---
sidebar_position: 101
---

# Originator Profile Blueprint

## 概要

「デジタル空間にもっと信頼を」が Originator Profile の目指すゴールです。このゴールを達成するには、OP 技術を国際標準化し、誰もが OP 技術を当たり前のように利用してもらえる環境を創造する必要があります。それを実現するためには、まずは、OP 技術がさまざまな人々の知恵をオープンに取り込みながら、コミュニティによる合意と信頼性に基づいてその設計が改善されてきたことが、透明性を持って、いつでも誰でも、文書で確認できることが必要です。そうすることで、OP 技術コミュニティの技術開発のプロセスそのものが信頼性のあるものとなり、OP 技術の国際標準化への道が拓けていきます。

「Originator Profile Blueprint (OPB) 」は、OP 技術の設計に関わる新しい機能追加や大幅な変更がまとめられた文書シリーズで、最終的には、IETF や W3C などの国際標準化団体に提案することになります。

## プロセス

OPB を追加するには、OPB の草案を GitHub Pull Request によって提出します。

例: docs/opb/process.md … この文書

GitHub Pull Request によってコミュニティでの議論と改稿を行います。

GitHub Pull Request がデフォルトブランチにマージされると、その OPB はアクティブであるとみなします。
OPB がアクティブであるということは、OPB に基づいた実装をコミュニティが受け入れる準備ができていることを意味します。

アクティブとなった OPB の更新については、GitHub Issues での議論と GitHub Pull Request での変更をもって実施します。

アクティブとなった OPB の更新の規模や頻度に当面の間制約はありませんが、技術仕様の外部への公開や、技術仕様を標準化団体に提案する段階で、内容の固定とリビジョンの管理をおこないます。ただし、その場合も既存の技術仕様との関連、セキュリティ制約、実装ノートといった注釈についてはこの限りではありません。

## 付注

OPBの作成にあたり、Rust プロジェクトの[Rust RFC](https://github.com/rust-lang/rfcs) を参考として作成しました。

OPBは、国際標準化団体に提案する文書シリーズですが、その標準化のプロセスは標準化団体によって異なります。以下に参考情報として、[IETF](https://www.ietf.org/)と[W3C](https://www.w3.org/)でどのような標準化プロセスを経るのかを紹介します。

### IETF RFC

IETFにRFCを提案した場合は、そのRFCの位置付けは、 Internet Draft (I-D) -> Proposed Standard -> Internet Standard　と進行していく。

Internet Standard になるには複数の相互運用性のある実装が必要で、普及している RFC でも Proposed Standard のままのものは多い。

#### プロセス

- draft-YOURNAME-brief-subject の名前で適切な [Working Group (WG)](https://datatracker.ietf.org/wg/) に草案を提出する。草案が adopt (採用) されたら draft-ietf-WGNAME-brief-subject に名前変更。これ以降は IETF, WG にドキュメントの著作権、変更の権利が移る。
- WG Last Call (WGLC) -> [Area Director (AD)](https://www.ietf.org/about/groups/iesg/members/) によるレビュー -> IETF Last Call -> RFC Production Center (RPC) による出版作業
- RFC の分類として Standards Track (STD), Informational, Experimental, Best Current Practice (BCP), Historical がある。
- I-D 著者向けのページ: https://authors.ietf.org/

### The W3C Recommendation Track

#### Technical Reports の分類

- Recommendations
- Notes
  - 例: https://www.w3.org/TR/vc-imp-guide/
- Registries
  - 例: https://www.w3.org/TR/webcodecs-codec-registry/
  - WebCodec のレポート: https://www.w3.org/TR/?filter-tr-name=&status%5B%5D=dry

https://www.w3.org/2023/Process-20231103/#recs-and-notes

#### Recommendation Track

https://www.w3.org/2023/Process-20231103/#rec-track

1. Working Draft (WD)
   - First Public Working Draft を公開してプロセス開始
   - これ以降 https://www.w3.org/TR/ で公開される
2. Candidate Recommendation (CR)
   1. Candidate Recommendation Snapshot (CRS)
      - 前回 CRS から [substantive changes](https://www.w3.org/2023/Process-20231103/#correction-classes) があったときに更新
   2. Candidate Recommendation Draft (CRD)
      - 前回の草案から WG 外からのレビューに値する変更があったときに更新
3. Proposed Recommendation (PR)
4. W3C Recommendation (REC)

草案、仕様を捨てたりしたときの状態として Rescinded Candidate Recommendation, Superseded Recommendation, Obsolete Recommendation, Rescinded Recommendation, Discontinued Draft がある。

- WD は Working Group 内の合意が得られてなくても構わない。 WG の requirements を全て満たす必要もない。
- WD -> CR の際には WG の requirements を全て満たす必要がある。
- CR -> PR の際には[実装](https://www.w3.org/2023/Process-20231103/#implementation-experience)が必要。 CR から [substantive changes](https://www.w3.org/2023/Process-20231103/#correction-classes) を入れてはならない。 CR で feature at risk とマークした機能を除くことはできる。
- REC になるためには Advisery Comittee のレビューを受ける必要がある。

あとはどういう変更をしたか記録しておく必要性、[wide review](https://www.w3.org/2023/Process-20231103/#wide-review) を受けること、レビュー期間の最低日数などの要件がある。

各 WG はこれに加えて独自のプロセスを採用すべき (SHOULD) 。

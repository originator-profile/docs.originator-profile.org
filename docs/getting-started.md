---
sidebar_position: 100
---

# Getting Started

## このページについて

このページは Originator Profile の技術及び関連ツールを利用する際に、目的に応じて必要となる知識やガイドを選択できるようにするための案内ページです。

## 概要と利用の流れ

Originator Profile の概要については以下を参照してください。

- [Originator Profile について](../tech/)

Originator Profile を利用する際は、以下の流れで読み進めると理解しやすくなります。

1. Originator Profile の基本概念を把握する  
   [Originator Profile について](../tech/) を参照してください。
2. 必要に応じて仕様で詳細を確認する  
   概要を読んだ後に [Originator Profile Blueprint (OPB)](../opb/) を参照すると、用語や仕様の理解が深まり、ガイドをスムーズに進められます。  
   また、ガイドの途中で不明点が出た場合も、[Originator Profile Blueprint (OPB)](../opb/) を参照して補完できます。
3. 目的に応じて利用するツールのガイドを選択する

Originator Profile では、発行や検証のために以下のツールとガイドを提供しています。

- OP Inspector
- Content Attestation Server Playground
- WordPress プラグイン (CA Manager)
- Debugger

## 利用目的に応じて

利用目的に応じて、以下のガイドを参照してください。

- **ブラウザーでコンテンツを検証したい**  
  Originator Profile に対応した Web サイトのコンテンツを検証できるブラウザ拡張機能です。  
  Web サイト上でコンテンツの発信者情報や検証結果を確認したい場合に利用します。  
  → [OP Inspector](./inspector.md)

- **テスト環境でコンテンツ署名を発行したい**  
  Content Attestation や Site Profile を発行できるテスト環境（Content Attestation Server Playground）です。  
  テスト用にビルドされた OP Inspector を用いて検証まで行うことができます。  
  → [Content Attestation Server Playground](./playground.md)

- **WordPress にてコンテンツへの署名機能を利用したい**  
  記事公開時に Content Attestation を発行するプラグイン（CA Manager）を提供しています。  
  → [WordPress プラグイン (CA Manager)](https://github.com/originator-profile/originator-profile/blob/main/packages/wordpress/README.md)

## 次のステップ

より詳細な仕様を理解したい場合は、以下を参照してください。

- [Originator Profile Blueprint (OPB)](../opb/)
- [Architectural Overview (AOV)](pathname:///aov/)

また、デバッグツールとして、以下のツールも提供されています。

- [Debugger](./debugger.md)  
  発行した Content Attestation Set や Site Profile のテストができ、検証時のエラーを確認できます。

/**
 * AOV（Architectural Overview）文書をpagesディレクトリにコピーし、適切にリネームする
 * ロケール非依存のページとして /aov/ に配置する
 *
 * @example
 * ```shell
 * node copy-aov.mjs
 * ```
 */
import shell from "shelljs";

shell.echo("-n", "AOV文書をpagesディレクトリにコピーします…");

// pagesディレクトリ内にaovディレクトリを作成
shell.mkdir("-p", "pages/aov");

// HTMLファイルをindex.htmlとしてコピー
shell.cp("aov-source/opf-aov-pub.html", "pages/aov/index.html");

// Drawingsディレクトリをコピー
shell.cp("-R", "aov-source/Drawings", "pages/aov/");

shell.echo("完了");

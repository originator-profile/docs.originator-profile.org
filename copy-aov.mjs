/**
 * AOV（Architecture Overview）文書をstaticディレクトリにコピーし、適切にリネームする
 *
 * @example
 * ```shell
 * node copy-aov.mjs
 * ```
 */
import shell from "shelljs";

shell.echo("-n", "AOV文書をstaticディレクトリにコピーします…");

// staticディレクトリ内にaovディレクトリを作成
shell.mkdir("-p", "static/aov");

// HTMLファイルをindex.htmlとしてコピー
shell.cp("aov-source/opf-aov-pub.html", "static/aov/index.html");

// Drawingsディレクトリをコピー
shell.cp("-R", "aov-source/Drawings", "static/aov/");

shell.echo("完了");

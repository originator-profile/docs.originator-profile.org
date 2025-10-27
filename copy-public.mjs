/**
 * public/ディレクトリの内容をpagesディレクトリのルートにコピーする
 * ロケール非依存のファイル（index.html, _worker.js, _redirectsなど）を配置
 *
 * @example
 * ```shell
 * node copy-public.mjs
 * ```
 */
import shell from "shelljs";

shell.echo("-n", "public/ディレクトリの内容をpagesディレクトリにコピーします…");

// pagesディレクトリの確認（存在しない場合は作成）
shell.mkdir("-p", "pages");

// public/ディレクトリの全ファイルをpagesのルートにコピー
shell.cp("-R", "public/*", "pages/");

shell.echo("完了");

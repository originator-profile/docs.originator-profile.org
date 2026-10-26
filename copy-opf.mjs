/**
 * opf-source/ に取り込んだ OPF 文書を pages ディレクトリにコピーし、適切にリネームする
 * 英語版はロケール非依存のページとして /<name>/ に、日本語版は /ja/<name>/ に配置する
 *
 * @example
 * ```shell
 * node copy-opf.mjs
 * ```
 */
import shell from "shelljs";

/** @type {{ name: string; html: string; jaHtml?: string; assets: string[] }[]} */
const sources = [
  { name: "aov", html: "opf-aov-pub.html", assets: ["Drawings"] },
];

shell.echo("-n", "OPF文書をpagesディレクトリにコピーします…");

/**
 * @param {string} src
 * @param {string} html
 * @param {string[]} assets
 * @param {string} dest
 */
function copy(src, html, assets, dest) {
  shell.mkdir("-p", dest);
  shell.cp(`${src}/${html}`, `${dest}/index.html`);
  for (const asset of assets) {
    shell.cp("-R", `${src}/${asset}`, `${dest}/`);
  }
}

for (const { name, html, jaHtml, assets } of sources) {
  const src = `opf-source/${name}`;
  copy(src, html, assets, `pages/${name}`);
  // NOTE: docs/<name>/ のサイドバー用スタブが出力した pages/ja/<name>/index.html を上書きする
  if (jaHtml) copy(src, jaHtml, assets, `pages/ja/${name}`);
}

shell.echo("完了");

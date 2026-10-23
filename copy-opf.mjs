/**
 * opf-source/ に取り込んだ OPF 文書を pages ディレクトリにコピーし、適切にリネームする
 * ロケール非依存のページとして /<name>/ に配置する
 *
 * @example
 * ```shell
 * node copy-opf.mjs
 * ```
 */
import shell from "shelljs";

/** @type {{ name: string; html: string; assets: string[] }[]} */
const sources = [
  { name: "aov", html: "opf-aov-pub.html", assets: ["Drawings"] },
];

shell.echo("-n", "OPF文書をpagesディレクトリにコピーします…");

for (const { name, html, assets } of sources) {
  const src = `opf-source/${name}`;
  const dest = `pages/${name}`;

  shell.mkdir("-p", dest);
  shell.cp(`${src}/${html}`, `${dest}/index.html`);
  for (const asset of assets) {
    shell.cp("-R", `${src}/${asset}`, `${dest}/`);
  }
}

shell.echo("完了");

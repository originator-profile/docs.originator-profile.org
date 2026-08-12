#!/usr/bin/env -S node --no-warnings
// @ts-check
import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const docsRoot = path.join(repoRoot, "docs");

/**
 * 採番規約
 *
 * 百の位がDiátaxisグループを表す。
 *
 * 範囲  Diátaxisグループ
 * 1xx   学習指向・実践（Tutorial, Learn）
 * 2xx   理解指向・理論（Explanation）
 * 3xx   目標指向・実践（How-to, Guide）
 * 4xx   情報指向・理論（Reference）
 */

const RANGE_TUTORIAL /*    */ = [100, 199]; // 1xx: 学習指向・実践（Tutorial）
const RANGE_EXPLANATION /* */ = [200, 299]; // 2xx: 理解指向・理論（Explanation）
const RANGE_HOW_TO /*      */ = [300, 399]; // 3xx: 目標指向・実践（How-to）
const RANGE_REFERENCE /*   */ = [400, 499]; // 4xx: 情報指向・理論（Reference）

const TOP_LEVEL_RULES = {
  tech: RANGE_EXPLANATION,
  aov: RANGE_REFERENCE,
  opb: RANGE_REFERENCE,
  terminology: RANGE_REFERENCE,
  troubleshooting: RANGE_HOW_TO,
  faq: RANGE_HOW_TO,
  tutorial: RANGE_TUTORIAL,
  development: RANGE_HOW_TO,
  "site-cases": RANGE_HOW_TO,
  "error-reference": RANGE_HOW_TO,
  "contributing.md": RANGE_HOW_TO,
  "inspector.md": RANGE_HOW_TO,
  "debugger.md": RANGE_HOW_TO,
  "playground.md": RANGE_HOW_TO,
  "opvc-cli.md": RANGE_HOW_TO,
  "getting-started.md": RANGE_TUTORIAL,
};

/** TOP_LEVEL_RULES への登録が不要なエントリ */
const IGNORED_ENTRIES = new Set(["assets", "releases"]);

const issues = [];

/**
 * _category_.yml から position を読み取る。
 * 存在しない / 数値でない場合は null を返す。
 * @param {string} categoryFile
 */
async function readCategoryPosition(categoryFile) {
  try {
    await fs.access(categoryFile);
  } catch {
    return null;
  }
  const content = await fs.readFile(categoryFile, "utf8");
  const match = content.match(/^position:\s*(\d+)/m);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Markdown/MDX の Front Matter から sidebar_position を読み取る。
 * 存在しない / 数値でない場合は null を返す。
 * @param {string} file
 */
async function readSidebarPosition(file) {
  const content = await fs.readFile(file, "utf8");
  const { data } = matter(content);
  const v = data.sidebar_position;
  return typeof v === "number" ? v : null;
}

/**
 * @param {number} position
 * @param {[number, number]} range
 */
function checkRange(position, [min, max]) {
  return min <= position && position <= max;
}

const entries = await fs.readdir(docsRoot, { withFileTypes: true });
const seen = new Set();

for (const entry of entries) {
  const name = entry.name;
  if (IGNORED_ENTRIES.has(name)) continue;

  if (!(name in TOP_LEVEL_RULES)) {
    issues.push({ type: "unregistered", target: `docs/${name}` });
    continue;
  }
  seen.add(name);

  // @ts-expect-error name は in チェック済みだが string 型のままなので
  const range = TOP_LEVEL_RULES[name];
  const isFile = name.endsWith(".md") || name.endsWith(".mdx");
  const target = isFile ? `docs/${name}` : `docs/${name}/_category_.yml`;
  const position = isFile
    ? await readSidebarPosition(path.join(docsRoot, name))
    : await readCategoryPosition(path.join(docsRoot, name, "_category_.yml"));

  if (position === null) {
    const detail = isFile
      ? "sidebar_position が見つかりません"
      : "position が見つかりません";
    issues.push({ type: "missingPosition", target, detail });
  } else if (!checkRange(position, range)) {
    issues.push({
      type: "outOfRange",
      target,
      position,
      expected: `${range[0]}-${range[1]}`,
    });
  }
}

for (const name of Object.keys(TOP_LEVEL_RULES)) {
  if (!seen.has(name)) {
    const suffix = name.endsWith(".md") || name.endsWith(".mdx") ? "" : "/";
    issues.push({ type: "missing", target: `docs/${name}${suffix}` });
  }
}

if (issues.length === 0) {
  console.log("✅ 採番規約に違反するエントリはありません。");
  process.exit(0);
}

for (const issue of issues) {
  const prefix = `❌ ${issue.target}`;
  switch (issue.type) {
    case "missing":
      console.log(`${prefix}: ファイル/ディレクトリが見つかりません`);
      break;
    case "missingPosition":
      console.log(`${prefix}: ${issue.detail}`);
      break;
    case "outOfRange":
      console.log(
        `${prefix}: position ${issue.position} は規約範囲外です（期待値: ${issue.expected}）`,
      );
      break;
    case "unregistered":
      console.log(
        `${prefix}: TOP_LEVEL_RULES に未登録です（IGNORED_ENTRIES に追加するか、規約に登録してください）`,
      );
      break;
  }
}

console.log(`\n${issues.length} issue(s) detected.`);
process.exit(1);

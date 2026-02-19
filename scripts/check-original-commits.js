#!/usr/bin/env -S node --no-warnings
// @ts-check
import matter from "gray-matter";
import fs from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import shell from "shelljs";

const REPO_URL =
  "https://github.com/originator-profile/docs.originator-profile.org";
const SUPPORTED_EXTENSIONS = new Set([".md", ".mdx"]);
const locale =
  (process.argv.find((arg) => arg.startsWith("--locale=")) || "").split(
    "=",
  )[1] ||
  process.env.LOCALE ||
  "en";
const fixMode = process.argv.includes("--fix");

const repoRoot = path.resolve(import.meta.dirname, "..");
const i18nMappings = [
  {
    i18nRoot: path.join(
      repoRoot,
      "i18n",
      locale,
      "docusaurus-plugin-content-docs",
      "current",
    ),
    sourceRoot: path.join(repoRoot, "docs"),
  },
  {
    i18nRoot: path.join(
      repoRoot,
      "i18n",
      locale,
      "docusaurus-plugin-content-pages",
    ),
    sourceRoot: path.join(repoRoot, "src", "pages"),
  },
];

// Ensure git is available before we start.
if (!shell.which("git")) {
  console.error("git executable not found on PATH");
  process.exit(2);
}

for (const { i18nRoot } of i18nMappings) {
  if (!fs.existsSync(i18nRoot)) {
    console.error(`Translation root not found: ${i18nRoot}`);
    process.exit(2);
  }
}

// ShellJS needs to be quiet so the report is easy to read.
shell.config.silent = true;

/**
 * Escapes a string for safe inclusion in a shell command.
 * This function wraps the input in single quotes and escapes any embedded single quotes,
 * preventing shell command injection attacks.
 * @example shellQuote("foo'bar") // 'foo'\''bar'
 * @param {string} value The string to be escaped for shell usage.
 * @returns {string} The shell-escaped string.
 */
function shellQuote(value) {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

/**
 * @param {string} value The file path to normalize.
 * @returns {string} The normalized file path with forward slashes.
 */
function normalizePath(value) {
  return value.replace(/\\/g, "/");
}

/**
 * Builds the expected `original` URL for a given source file path and commit hash.
 * @param {string} commitHash Full or short commit hash.
 * @param {string} repoRelativePath Repo-relative path with forward slashes.
 * @returns {string}
 */
function buildOriginalUrl(commitHash, repoRelativePath) {
  const shortHash = commitHash.slice(0, 7);
  return `${REPO_URL}/blob/${shortHash}/${repoRelativePath}`;
}

/**
 * Fetches the latest commit hash for a given file path.
 * @param {string} filePath Absolute path to the source file.
 * @returns {{ hash: string } | { error: string } | null}
 */
function getLatestCommit(filePath) {
  const result = shell.exec(
    `git log -n 1 --pretty=format:%H -- ${shellQuote(filePath)}`,
  );
  if (result.code !== 0) {
    return { error: result.stderr.trim() || "git log failed" };
  }
  const hash = result.stdout.trim();
  if (!hash) return null;
  return { hash };
}

/**
 * Rewrites the `original` frontmatter field in a translation file.
 * @param {string} file Absolute path to the translation file.
 * @param {string} newUrl The new value for `original`.
 * @returns {Promise<void>}
 */
async function fixOriginalUrl(file, newUrl) {
  const raw = await readFile(file);
  const text = raw.toString();
  const hasFrontmatter = text.startsWith("---");
  const re = /^original:\s*(.+)\s*$/m;
  const hasOriginal = re.test(text);

  let updated;
  if (!hasFrontmatter) {
    updated = `\
---
original: ${newUrl}
---
${text}`;
  } else if (!hasOriginal) {
    updated = text.replace(
      /^---\s*$/m,
      `\
original: ${newUrl}
---`,
    );
  } else {
    updated = text.replace(re, `original: ${newUrl}`);
  }

  await writeFile(file, updated);
}

/** @type {Array<{type: string, relative: string, file: string, docsPath: string, detail?: string, recordedPath?: string, expectedPath?: string, latestCommit?: string, recordedCommit?: string}>} */
const issues = [];

for (const { i18nRoot, sourceRoot } of i18nMappings) {
  const files = shell
    .find(i18nRoot)
    .filter((file) => SUPPORTED_EXTENSIONS.has(path.extname(file)));

  for (const file of files) {
    const relative = path.relative(i18nRoot, file);
    const docsPath = path.join(sourceRoot, relative);
    const { data: frontmatter = {} } = matter(await readFile(file));
    const originalUrl = frontmatter.original;

    if (!originalUrl) {
      issues.push({ type: "missingOriginal", relative, file, docsPath });
      continue;
    }

    const match = originalUrl.match(/\/blob\/([0-9a-fA-F]{7,40})\/(.+)$/);
    if (!match) {
      issues.push({
        type: "invalidOriginal",
        relative,
        file,
        docsPath,
        detail: originalUrl,
      });
      continue;
    }

    const [, recordedCommit, recordedPath] = match;
    const expectedPath = normalizePath(path.relative(repoRoot, docsPath));
    if (normalizePath(recordedPath) !== expectedPath) {
      issues.push({
        type: "pathMismatch",
        relative,
        file,
        docsPath,
        recordedPath,
        expectedPath,
      });
      continue;
    }

    const result = shell.exec(
      `git log -n 1 --pretty=format:%H -- ${shellQuote(docsPath)}`,
    );
    if (result.code !== 0) {
      issues.push({
        type: "gitError",
        relative,
        file,
        docsPath,
        detail: result.stderr.trim() || "git log returned no commit",
      });
      continue;
    }

    const latestCommit = result.stdout.trim();
    if (!latestCommit.toLowerCase().startsWith(recordedCommit.toLowerCase())) {
      issues.push({
        type: "outdated",
        relative,
        file,
        docsPath,
        latestCommit,
        recordedCommit,
      });
    }
  }
}

if (issues.length === 0) {
  console.log(
    "✅ All translation files reference the latest source documents.",
  );
  process.exit(0);
}

let fixedCount = 0;

for (const issue of issues) {
  const prefix = `❌ ${normalizePath(path.relative(repoRoot, issue.file))}`;

  // Build suggested URL where possible.
  const expectedPath = normalizePath(path.relative(repoRoot, issue.docsPath));
  const commitResult =
    issue.type === "outdated"
      ? { hash: /** @type {string} */ (issue.latestCommit) }
      : getLatestCommit(issue.docsPath);
  const suggestedUrl =
    commitResult && !("error" in commitResult)
      ? buildOriginalUrl(commitResult.hash, expectedPath)
      : null;

  switch (issue.type) {
    case "missingOriginal":
      console.log(`${prefix}: missing "original" frontmatter`);
      break;
    case "invalidOriginal":
      console.log(`${prefix}: invalid original URL -> ${issue.detail}`);
      break;
    case "pathMismatch":
      console.log(
        `${prefix}: original path mismatch (recorded: ${issue.recordedPath}, expected: ${issue.expectedPath})`,
      );
      break;
    case "gitError":
      console.log(`${prefix}: git error -> ${issue.detail}`);
      break;
    case "outdated":
      console.log(
        `${prefix}: outdated commit (recorded: ${issue.recordedCommit}, latest: ${String(issue.latestCommit).slice(0, 7)})`,
      );
      break;
  }

  if (suggestedUrl) {
    if (fixMode) {
      await fixOriginalUrl(issue.file, suggestedUrl);
      console.log(`   fixed: ${suggestedUrl}`);
      fixedCount++;
    } else {
      console.log(`↓
original: ${suggestedUrl}
`);
    }
  }
}

console.log(`\n${issues.length} issue(s) detected.`);

if (fixMode && fixedCount > 0) {
  console.log(`${fixedCount} file(s) updated.`);
}

if (!fixMode && issues.length > 0) {
  console.log(`Tip: to apply fixes automatically, run:
  scripts/check-original-commits.js --fix`);
}

process.exit(1);

#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const matter = require("gray-matter");

const SUPPORTED_EXTENSIONS = new Set([".md", ".mdx"]);
const locale =
  (process.argv.find((arg) => arg.startsWith("--locale=")) || "").split(
    "=",
  )[1] ||
  process.env.LOCALE ||
  "en";

const repoRoot = path.resolve(__dirname, "..");
const docsRoot = path.join(repoRoot, "docs");
const i18nRoot = path.join(
  repoRoot,
  "i18n",
  locale,
  "docusaurus-plugin-content-docs",
  "current",
);

// Ensure git is available before we start.
if (!shell.which("git")) {
  console.error("git executable not found on PATH");
  process.exit(2);
}

if (!fs.existsSync(i18nRoot)) {
  console.error(`Translation root not found: ${i18nRoot}`);
  process.exit(2);
}

// ShellJS needs to be quiet so the report is easy to read.
shell.config.silent = true;

/**
 * Escapes a string for safe inclusion in a shell command.
 * This function wraps the input in single quotes and escapes any embedded single quotes,
 * preventing shell command injection attacks.
 * Example: foo'bar becomes 'foo'\''bar'
 */
function shellQuote(value) {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

function normalizePath(value) {
  return value.replace(/\\/g, "/");
}

const issues = [];

shell
  .find(i18nRoot)
  .filter((file) => SUPPORTED_EXTENSIONS.has(path.extname(file)))
  .forEach((file) => {
    const relative = path.relative(i18nRoot, file);
    const docsPath = path.join(docsRoot, relative);
    const { data: frontmatter = {} } = matter(fs.readFileSync(file, "utf8"));
    const originalUrl = frontmatter.original;

    if (!originalUrl) {
      issues.push({ type: "missingOriginal", relative });
      return;
    }

    const match = originalUrl.match(/\/blob\/([0-9a-fA-F]{7,40})\/(.+)$/);
    if (!match) {
      issues.push({ type: "invalidOriginal", relative, detail: originalUrl });
      return;
    }

    const [, recordedCommit, recordedPath] = match;
    const expectedPath = normalizePath(path.relative(repoRoot, docsPath));
    if (normalizePath(recordedPath) !== expectedPath) {
      issues.push({
        type: "pathMismatch",
        relative,
        recordedPath,
        expectedPath,
      });
    }

    const result = shell.exec(
      `git log -n 1 --pretty=format:%H -- ${shellQuote(docsPath)}`,
    );
    if (result.code !== 0) {
      issues.push({
        type: "gitError",
        relative,
        detail: result.stderr.trim() || "git log returned no commit",
      });
      return;
    }

    const latestCommit = result.stdout.trim();
    if (!latestCommit.toLowerCase().startsWith(recordedCommit.toLowerCase())) {
      issues.push({
        type: "outdated",
        relative,
        latestCommit,
        recordedCommit,
      });
    }
  });

if (issues.length === 0) {
  console.log(
    "✅ All translation files reference the latest source documents.",
  );
  process.exit(0);
}

for (const issue of issues) {
  const prefix = `❌ ${issue.relative}`;
  switch (issue.type) {
    case "missingOriginal":
      console.log(`${prefix}: missing "original" frontmatter`);
      break;
    case "invalidOriginal":
      console.log(`${prefix}: invalid original URL -> ${issue.detail}`);
      break;
    case "pathMismatch":
      console.log(
        `${prefix}: original path ${issue.recordedPath} (expected ${issue.expectedPath})`,
      );
      break;
    case "gitError":
      console.log(`${prefix}: git error -> ${issue.detail}`);
      break;
    case "outdated":
      console.log(
        `${prefix}: latest commit ${issue.latestCommit} (frontmatter ${issue.recordedCommit})`,
      );
      break;
  }
}

console.log(`\n${issues.length} issue(s) detected.`);
process.exit(1);

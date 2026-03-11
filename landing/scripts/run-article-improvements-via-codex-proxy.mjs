#!/usr/bin/env node

import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const landingRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(landingRoot, "..");

const DEFAULT_CSV_PATH =
  "/Users/test/Downloads/offlinetools.org_PageTrafficReport_3_10_2026.csv; filename_=UTF-8''offlinetools.org_PageTrafficReport_3_10_2026.csv";
const DEFAULT_KEYWORD_CSV_PATH =
  "/Users/test/Downloads/offlinetools.org_KeywordReport_3_10_2026.csv; filename_=UTF-8''offlinetools.org_KeywordReport_3_10_2026.csv";

const DEFAULT_OUTPUT_ROOT = path.join(landingRoot, ".article-improver");
const DEFAULT_TIMEOUT_SECONDS = 600;
const MAX_MAPPED_QUERIES_PER_PAGE = 8;

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "best",
  "by",
  "can",
  "for",
  "from",
  "how",
  "i",
  "in",
  "into",
  "is",
  "it",
  "my",
  "of",
  "on",
  "or",
  "the",
  "their",
  "this",
  "to",
  "use",
  "using",
  "what",
  "when",
  "why",
  "with",
  "your",
]);

const GENERIC_MATCH_TOKENS = new Set([
  "api",
  "apis",
  "data",
  "debug",
  "file",
  "files",
  "format",
  "formatter",
  "formatters",
  "formatting",
  "json",
  "offline",
  "plugin",
  "plugins",
  "string",
  "strings",
  "tool",
  "tools",
  "viewer",
]);

const LOW_QUALITY_QUERY_PATTERNS = [
  /\badvice needed\b/,
  /\bcountdown timer listen\b/,
  /\beligibility\b/,
  /\beligibility\/policies\b/,
  /\bfehler\b/,
  /\bjsonoffline tools\b/,
  /\bpolic(?:ies|ieds)\b/,
  /\btoolbox offline\b/,
  /\byou dont have an extension\b/,
];

const SEARCH_OPERATOR_PATTERNS = [/\b-?site:/, /\bintitle:/, /\binurl:/, /\bfiletype:/];

const KEYWORD_ROUTE_HINTS = [
  {
    pattern: /\bunexpected end of json input\b/,
    slugs: new Set(["unexpected-end-of-json-input-causes-and-fixes"]),
    score: 40,
  },
  {
    pattern: /\bmatlab\b|\bjsondecode\b|\bjsonencode\b/,
    slugs: new Set(["matlab-json-parsing-and-formatting-functions"]),
    score: 20,
  },
  {
    pattern: /\bcsharp\b|\bdotnet\b|\bnewtonsoft\b/,
    slugs: new Set(["c-sharp-and-net-json-formatter-implementation"]),
    score: 20,
  },
  {
    pattern: /\bvscode\b|\bvisual studio code\b/,
    slugs: new Set(["creating-vs-code-extensions-for-json-formatting", "top-10-json-debugging-extensions-for-vs-code"]),
    score: 14,
  },
  {
    pattern: /\bintellij\b|\bjetbrains\b/,
    slugs: new Set([
      "implementing-json-formatter-plugins-for-jetbrains-ides",
      "intellij-ideas-json-debugging-capabilities",
    ]),
    score: 16,
  },
  {
    pattern: /\bsublime text\b/,
    slugs: new Set(["creating-sublime-text-packages-for-json-formatting"]),
    score: 20,
  },
  {
    pattern: /\btrailing comma\b|\bremoving comma from json object\b/,
    slugs: new Set(["handling-trailing-commas-in-json-a-formatters-approach"]),
    score: 24,
  },
  {
    pattern: /\bcase sensitive\b/,
    slugs: new Set(["case-sensitivity-issues-in-json-formatting"]),
    score: 24,
  },
  {
    pattern: /\bmultiline\b|\bline break\b/,
    slugs: new Set(["line-break-problems-in-multi-line-json-strings"]),
    score: 20,
  },
  {
    pattern: /\binvalid json responses from apis\b/,
    slugs: new Set(["malformed-json-in-api-responses-handling-strategies"]),
    score: 28,
  },
  {
    pattern: /\bjson duplicate key\b|\bduplicate keys\b/,
    slugs: new Set(["duplicate-keys-in-json-detection-and-resolution-strategies"]),
    score: 26,
  },
  {
    pattern: /\bjson ast\b|\bast json\b|\babstract syntax tree\b/,
    slugs: new Set(["abstract-syntax-trees-in-json-formatter-construction"]),
    score: 24,
  },
  {
    pattern: /\bdocker config json\b|\bconfig json docker\b/,
    slugs: new Set(["docker-container-configuration-with-json"]),
    score: 24,
  },
  {
    pattern: /\bjenkins\b.*\breadjson\b|\bread json jenkins\b/,
    slugs: new Set(["jenkins-pipeline-json-configuration-techniques"]),
    score: 22,
  },
];

const PAGE_QUERY_HINTS = {
  "abstract-syntax-trees-in-json-formatter-construction": ["json ast", "ast json", "abstract syntax tree json"],
  "c-sharp-and-net-json-formatter-implementation": [
    "c# format json string",
    "c# json formatter",
    "json formatter c#",
    "newtonsoft json pretty print",
    "dotnet json formatter",
  ],
  "case-sensitivity-issues-in-json-formatting": ["is json case sensitive"],
  "creating-sublime-text-packages-for-json-formatting": [
    "sublime text format json",
    "format json in sublime text",
    "sublime text json formatter",
  ],
  "creating-vs-code-extensions-for-json-formatting": [
    "vscode format json",
    "format json vscode",
    "format json in vscode",
    "vs code json formatter",
    "visual studio code json formatter",
    "json formatter extension vscode",
    "json extension for vs code",
  ],
  "docker-container-configuration-with-json": ["docker config json", "config json docker", "config.json docker"],
  "duplicate-keys-in-json-detection-and-resolution-strategies": [
    "json duplicate key",
    "json stringify retaining duplicate keys",
  ],
  "handling-trailing-commas-in-json-a-formatters-approach": ["trailing comma json", "removing comma from json object"],
  "implementing-json-formatter-plugins-for-jetbrains-ides": [
    "jetbrains json formatter",
    "intellij json formatter plugin",
  ],
  "intellij-ideas-json-debugging-capabilities": [
    "intellij format json",
    "format json in intellij",
    "intellij json formatter",
    "intellij format json file",
  ],
  "jenkins-pipeline-json-configuration-techniques": [
    "jenkins readjson",
    "read json jenkins",
    "jenkins pipeline read json",
  ],
  "line-break-problems-in-multi-line-json-strings": ["json multiline string", "json line break", "line break in json"],
  "malformed-json-in-api-responses-handling-strategies": ["invalid json responses from apis"],
  "matlab-json-parsing-and-formatting-functions": [
    "matlab json",
    "matlab jsondecode",
    "jsondecode matlab",
    "matlab jsonencode",
    "json encode matlab",
    "matlab write to json file",
  ],
  "top-10-json-debugging-extensions-for-vs-code": [
    "vscode json debugger",
    "debug json file",
    "best json extension for vscode",
  ],
  "unexpected-end-of-json-input-causes-and-fixes": ["unexpected end of json input"],
};

function parseArgs(argv) {
  const options = {
    csvPath: DEFAULT_CSV_PATH,
    keywordCsvPath: DEFAULT_KEYWORD_CSV_PATH,
    outputRoot: DEFAULT_OUTPUT_ROOT,
    timeoutSeconds: DEFAULT_TIMEOUT_SECONDS,
    limit: null,
    slug: null,
    pageUrl: null,
    startAt: null,
    dryRun: false,
    manifestOnly: false,
    includeCompleted: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--") {
      continue;
    } else if (arg === "--csv") {
      options.csvPath = argv[++index];
    } else if (arg === "--keyword-csv") {
      options.keywordCsvPath = argv[++index];
    } else if (arg === "--output-root") {
      options.outputRoot = argv[++index];
    } else if (arg === "--timeout-seconds") {
      options.timeoutSeconds = Number(argv[++index]);
    } else if (arg === "--limit") {
      options.limit = Number(argv[++index]);
    } else if (arg === "--slug") {
      options.slug = argv[++index];
    } else if (arg === "--page-url") {
      options.pageUrl = argv[++index];
    } else if (arg === "--start-at") {
      options.startAt = argv[++index];
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--manifest-only") {
      options.manifestOnly = true;
    } else if (arg === "--include-completed") {
      options.includeCompleted = true;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!Number.isFinite(options.timeoutSeconds) || options.timeoutSeconds <= 0) {
    throw new Error(`Invalid --timeout-seconds value: ${options.timeoutSeconds}`);
  }

  if (options.limit !== null && (!Number.isInteger(options.limit) || options.limit <= 0)) {
    throw new Error(`Invalid --limit value: ${options.limit}`);
  }

  return options;
}

function printHelp() {
  console.log(`Usage: pnpm improve:articles:proxy -- [options]

Options:
  --csv <path>              Page traffic CSV report path
  --keyword-csv <path>      Keyword report CSV path used for query filtering and mapping
  --output-root <path>      Directory for prompts, logs, and summaries
  --timeout-seconds <n>     Per-page timeout in seconds (default: ${DEFAULT_TIMEOUT_SECONDS})
  --limit <n>               Only run the first N queued pages
  --slug <slug>             Only run a single article slug
  --page-url <url>          Only run a single article URL
  --start-at <slug>         Start queue at this slug
  --dry-run                 Generate manifest and prompts without calling codex-proxy
  --manifest-only           Alias for dry-run, but still writes queue artifacts
  --include-completed       Do not skip tasks already marked success in the latest summary
  --help                    Show this help
`);
}

function parseCsv(text) {
  const rows = [];
  let current = [];
  let value = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        value += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        value += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === ",") {
      current.push(value);
      value = "";
      continue;
    }

    if (char === "\n") {
      current.push(value);
      rows.push(current);
      current = [];
      value = "";
      continue;
    }

    if (char === "\r") {
      continue;
    }

    value += char;
  }

  if (value.length > 0 || current.length > 0) {
    current.push(value);
    rows.push(current);
  }

  return rows;
}

function toNumber(value) {
  if (!value) {
    return 0;
  }

  const normalized = String(value).replace(/[%,$\s]/g, "");
  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatNumber(value) {
  return Number.isFinite(value) ? value.toLocaleString("en-US") : "0";
}

function formatPercent(clicks, impressions) {
  if (!impressions) {
    return "0.00%";
  }

  return `${((clicks / impressions) * 100).toFixed(2)}%`;
}

function formatPosition(value) {
  if (!Number.isFinite(value)) {
    return "n/a";
  }

  return value.toFixed(2);
}

function sanitizeFileName(value) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, "-");
}

function titleFromSlug(slug) {
  const replacements = new Map([
    ["json", "JSON"],
    ["api", "API"],
    ["apis", "APIs"],
    ["vs", "VS"],
    ["vba", "VBA"],
    ["matlab", "MATLAB"],
    ["c", "C"],
    ["csharp", "C#"],
    ["cpp", "C++"],
    ["dotnet", ".NET"],
    ["net", ".NET"],
    ["sql", "SQL"],
    ["css", "CSS"],
    ["html", "HTML"],
    ["yaml", "YAML"],
    ["csv", "CSV"],
    ["ci", "CI"],
    ["cd", "CD"],
    ["jetbrains", "JetBrains"],
    ["kubernetes", "Kubernetes"],
    ["powershells", "PowerShell"],
    ["devops", "DevOps"],
    ["gdpr", "GDPR"],
    ["jwt", "JWT"],
    ["vs-code", "VS Code"],
  ]);

  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => replacements.get(part.toLowerCase()) ?? `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function stripTitleSuffix(title) {
  return title.replace(/\s+\|\s+.+$/, "").trim();
}

function extractArticleTitle(filePath, fallbackSlug) {
  const source = readFileSync(filePath, "utf8");
  const metadataMatch = source.match(/title:\s*"([^"]+)"/);
  if (metadataMatch) {
    return stripTitleSuffix(metadataMatch[1]);
  }

  const h1Match = source.match(/<h1[^>]*>\s*([^<]+?)\s*<\/h1>/);
  if (h1Match) {
    return h1Match[1].trim();
  }

  return titleFromSlug(fallbackSlug);
}

function detectQueryColumns(headers) {
  const queryColumns = [];

  headers.forEach((header, index) => {
    const normalized = header.toLowerCase().trim();
    if (
      normalized === "query" ||
      normalized === "queries" ||
      normalized === "search query" ||
      normalized === "search queries" ||
      normalized === "keyword" ||
      normalized === "keywords"
    ) {
      queryColumns.push(index);
    }
  });

  return queryColumns;
}

function normalizeForMatching(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/c#/g, " csharp ")
    .replace(/\bc sharp\b/g, " csharp ")
    .replace(/\.net/g, " dotnet ")
    .replace(/\bdot net\b/g, " dotnet ")
    .replace(/\bvisual studio code\b/g, " vscode ")
    .replace(/\bvs code\b/g, " vscode ")
    .replace(/json\.parse/g, " json parse ")
    .replace(/json\.stringify/g, " json stringify ")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s./+\-]+/g, " ")
    .replace(/[./+\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeForMatching(value) {
  return normalizeForMatching(value)
    .split(" ")
    .map((token) => token.trim())
    .filter(Boolean);
}

function dedupeStrings(values) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function compareKeywordPriority(left, right) {
  if (right.impressions !== left.impressions) {
    return right.impressions - left.impressions;
  }

  if (right.clicks !== left.clicks) {
    return right.clicks - left.clicks;
  }

  if (left.avgPosition !== right.avgPosition) {
    return left.avgPosition - right.avgPosition;
  }

  return left.keyword.localeCompare(right.keyword);
}

function canonicalizeKeyword(value) {
  const tokens = tokenizeForMatching(value).filter((token) => !STOP_WORDS.has(token));
  return tokens.sort().join(" ");
}

function inspectKeywordRow(row) {
  const rawKeyword = String(row.keyword ?? "").toLowerCase();
  const normalized = normalizeForMatching(row.keyword);
  const tokens = normalized.split(" ").filter(Boolean);

  if (!normalized) {
    return { keep: false, reason: "empty" };
  }

  if (!/[a-z]/.test(normalized)) {
    return { keep: false, reason: "no_letters" };
  }

  if (normalized.length < 3) {
    return { keep: false, reason: "too_short" };
  }

  if (tokens.length > 10) {
    return { keep: false, reason: "too_many_terms" };
  }

  if (/(https?:\/\/|www\.|\.com\b|\.org\b|\.net\b)/.test(rawKeyword)) {
    return { keep: false, reason: "url_or_domain" };
  }

  if (LOW_QUALITY_QUERY_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return { keep: false, reason: "noise_pattern" };
  }

  if (SEARCH_OPERATOR_PATTERNS.some((pattern) => pattern.test(rawKeyword))) {
    return { keep: false, reason: "search_operator" };
  }

  if (/[<>()[\]{}]/.test(rawKeyword)) {
    return { keep: false, reason: "log_fragment" };
  }

  if (row.impressions < 5 && row.clicks === 0) {
    return { keep: false, reason: "low_volume" };
  }

  const informativeTokens = tokens.filter((token) => !STOP_WORDS.has(token));
  if (informativeTokens.length < 2 && !tokens.includes("json")) {
    return { keep: false, reason: "low_signal" };
  }

  return {
    keep: true,
    normalized,
    tokens,
    canonicalKeyword: canonicalizeKeyword(row.keyword),
  };
}

function loadKeywordReport(keywordCsvPath) {
  const csvText = readFileSync(keywordCsvPath, "utf8");
  const rows = parseCsv(csvText.replace(/^\uFEFF/, ""));

  if (rows.length < 2) {
    throw new Error(`Keyword CSV has no data rows: ${keywordCsvPath}`);
  }

  const headers = rows[0];
  const keywordIndex = headers.findIndex((header) => header.trim().toLowerCase() === "keyword");
  if (keywordIndex === -1) {
    throw new Error(`Keyword CSV is missing the Keyword column: ${keywordCsvPath}`);
  }

  const impressionsIndex = headers.findIndex((header) => header.trim().toLowerCase() === "impressions");
  const clicksIndex = headers.findIndex((header) => header.trim().toLowerCase() === "clicks");
  const avgPositionIndex = headers.findIndex((header) => header.trim().toLowerCase() === "avg. position");

  const acceptedRows = [];
  const rejectedRows = [];

  for (const row of rows.slice(1)) {
    const keyword = row[keywordIndex]?.trim();
    if (!keyword) {
      continue;
    }

    const record = {
      keyword,
      impressions: toNumber(row[impressionsIndex]),
      clicks: toNumber(row[clicksIndex]),
      avgPosition: toNumber(row[avgPositionIndex]),
    };

    const inspection = inspectKeywordRow(record);
    if (!inspection.keep) {
      rejectedRows.push({
        ...record,
        reason: inspection.reason,
      });
      continue;
    }

    acceptedRows.push({
      ...record,
      normalized: inspection.normalized,
      tokens: inspection.tokens,
      canonicalKeyword: inspection.canonicalKeyword,
    });
  }

  acceptedRows.sort(compareKeywordPriority);

  return {
    headers,
    totalRows: rows.length - 1,
    acceptedRows,
    rejectedRows,
  };
}

function buildTaskProfile(task) {
  const aliasPhrases = new Set([
    normalizeForMatching(task.title),
    normalizeForMatching(titleFromSlug(task.articleSlug)),
    normalizeForMatching(task.articleSlug.replace(/-/g, " ")),
    ...(PAGE_QUERY_HINTS[task.articleSlug] ?? []).map((hint) => normalizeForMatching(hint)),
  ]);

  const tokenSet = new Set();
  for (const phrase of aliasPhrases) {
    for (const token of tokenizeForMatching(phrase)) {
      tokenSet.add(token);
    }
  }

  return {
    task,
    aliasPhrases,
    tokenSet,
  };
}

function scoreKeywordAgainstTask(keywordRow, profile) {
  let score = 0;

  if (profile.aliasPhrases.has(keywordRow.normalized)) {
    score += 40;
  }

  for (const phrase of profile.aliasPhrases) {
    if (!phrase || phrase === keywordRow.normalized) {
      continue;
    }

    if (keywordRow.normalized.includes(phrase) && phrase.split(" ").length >= 2) {
      score += 14;
    } else if (phrase.includes(keywordRow.normalized) && keywordRow.tokens.length >= 2) {
      score += 12;
    }
  }

  let overlap = 0;
  let informativeOverlap = 0;
  for (const token of keywordRow.tokens) {
    if (!profile.tokenSet.has(token)) {
      continue;
    }

    overlap += 1;
    if (GENERIC_MATCH_TOKENS.has(token)) {
      score += 1;
    } else {
      score += 5;
      informativeOverlap += 1;
    }
  }

  if (informativeOverlap >= 2) {
    score += 8;
  } else if (informativeOverlap === 1) {
    score += 3;
  }

  if (keywordRow.tokens.length > 1 && overlap === keywordRow.tokens.length) {
    score += 10;
  } else if (keywordRow.tokens.length > 2 && overlap / keywordRow.tokens.length >= 0.75) {
    score += 5;
  }

  for (const hint of KEYWORD_ROUTE_HINTS) {
    if (hint.slugs.has(profile.task.articleSlug) && hint.pattern.test(keywordRow.normalized)) {
      score += hint.score;
    }
  }

  return score;
}

function dedupeMappedQueries(assignments) {
  const byCanonicalKeyword = new Map();

  for (const assignment of assignments) {
    const existing = byCanonicalKeyword.get(assignment.canonicalKeyword);
    if (!existing || compareKeywordPriority(assignment, existing) < 0 || assignment.score > existing.score) {
      byCanonicalKeyword.set(assignment.canonicalKeyword, assignment);
    }
  }

  return Array.from(byCanonicalKeyword.values())
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return compareKeywordPriority(left, right);
    })
    .slice(0, MAX_MAPPED_QUERIES_PER_PAGE);
}

function assignKeywordQueries(tasks, keywordReport) {
  const profiles = tasks.map((task) => buildTaskProfile(task));
  const assignmentsByPage = new Map(tasks.map((task) => [task.pageUrl, []]));
  const mappedKeywords = [];
  const unmappedKeywords = [];

  for (const keywordRow of keywordReport.acceptedRows) {
    let bestMatch = null;
    let secondBestScore = 0;

    for (const profile of profiles) {
      const score = scoreKeywordAgainstTask(keywordRow, profile);
      if (bestMatch === null || score > bestMatch.score) {
        secondBestScore = bestMatch?.score ?? 0;
        bestMatch = { task: profile.task, score };
      } else if (score > secondBestScore) {
        secondBestScore = score;
      }
    }

    const confidentMatch =
      bestMatch !== null && bestMatch.score >= 18 && (bestMatch.score >= 28 || bestMatch.score - secondBestScore >= 4);

    if (!confidentMatch) {
      unmappedKeywords.push(keywordRow);
      continue;
    }

    const assignment = {
      ...keywordRow,
      score: bestMatch.score,
    };

    assignmentsByPage.get(bestMatch.task.pageUrl)?.push(assignment);
    mappedKeywords.push({
      articleSlug: bestMatch.task.articleSlug,
      pageUrl: bestMatch.task.pageUrl,
      ...assignment,
    });
  }

  const enrichedTasks = tasks.map((task) => {
    const mappedQueries = dedupeMappedQueries(assignmentsByPage.get(task.pageUrl) ?? []);
    const pageReportQueries = dedupeStrings(task.explicitQueries);
    const combinedQueries = dedupeStrings([...pageReportQueries, ...mappedQueries.map((query) => query.keyword)]);

    return {
      ...task,
      pageReportQueries,
      mappedQueries,
      explicitQueries: combinedQueries,
      intentSeeds:
        combinedQueries.length > 0 ? combinedQueries : deriveIntentSeeds(task.title, task.toolSlug, task.articleSlug),
    };
  });

  return {
    tasks: enrichedTasks,
    mappedKeywords,
    unmappedKeywords,
  };
}

function deriveIntentSeeds(title, toolSlug, articleSlug) {
  const seeds = new Set();
  const basePhrase = articleSlug.replace(/-/g, " ");

  seeds.add(title);
  seeds.add(basePhrase);
  seeds.add(`${title} guide`);

  if (toolSlug === "json-formatter" && !title.toLowerCase().includes("json")) {
    seeds.add(`JSON formatter ${basePhrase}`);
  }

  return Array.from(seeds)
    .map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function buildPrompt(task) {
  const pageReportQueryBlock =
    task.pageReportQueries.length > 0
      ? task.pageReportQueries.map((query) => `- ${query}`).join("\n")
      : "- The page traffic CSV does not contain page-level query pairs for this article.";

  const mappedKeywordBlock =
    task.mappedQueries.length > 0
      ? task.mappedQueries
          .map(
            (query) =>
              `- ${query.keyword} (keyword impressions: ${formatNumber(query.impressions)}, clicks: ${formatNumber(query.clicks)}, avg position: ${formatPosition(query.avgPosition)}, match score: ${query.score})`
          )
          .join("\n")
      : "- No filtered keyword-report queries were confidently matched to this page.";

  const intentSeedBlock = task.intentSeeds.map((query) => `- ${query}`).join("\n");

  return `You are improving one article in the Offlinetools landing project.

Use live web search. It is required for this task because the article should be updated with current, useful information for real search users.

Repository root: ${repoRoot}
Landing app root: ${landingRoot}
Target page URL: ${task.pageUrl}
Target route file: ${task.filePath}
Target article title: ${task.title}
Target tool slug: ${task.toolSlug}
Target article slug: ${task.articleSlug}

Traffic context from the CSV report dated March 10, 2026:
- Impressions: ${formatNumber(task.impressions)}
- Clicks: ${formatNumber(task.clicks)}
- CTR: ${formatPercent(task.clicks, task.impressions)}
- Average position: ${formatPosition(task.avgPosition)}

Page-level queries directly present in the page traffic CSV:
${pageReportQueryBlock}

Filtered queries mapped from the site-level keyword CSV:
${mappedKeywordBlock}

Derived intent seeds to improve coverage for:
${intentSeedBlock}

Instructions:
1. Read the target article and determine what it currently lacks for a user searching this topic.
2. Stay focused on the target route file. Do not inspect unrelated article pages unless absolutely necessary.
3. The environment does not have \`rg\`. If you need search tools, use \`grep\`, \`find\`, or \`sed\`.
4. Use live web search and prioritize current primary sources where facts may have changed.
5. Keep research efficient: use only the minimum searches needed to confirm current behavior, usually no more than 2 authoritative web searches unless the first results are clearly insufficient.
6. Once you have enough confirmed detail to improve the article, move to editing immediately.
7. Use the mapped queries as intent signals, not as instructions to stuff awkward phrases verbatim. If a keyword is low quality, broken, or unnatural, cover the underlying user need in clean language.
8. Improve the target article so it better answers the topic and likely search intent behind the queries or intent seeds above.
9. Focus on practical value: clearer explanation, stronger topical coverage, accurate current details, better examples, troubleshooting, caveats, compatibility or version notes, and decision-making guidance where useful.
10. Tighten the introduction and structure so the page is useful for a search visitor who lands directly on it.
11. If the current title or description is weak, improve metadata too, but keep the route unchanged.
12. Keep the existing React/Next.js page style and do not introduce unnecessary shared refactors.
13. Do not inspect package or config files unless the build fails and you need them to debug.
14. Edit only what is needed for this page unless a tiny local fix is necessary to keep the build green.
15. After editing, run \`pnpm build\` in ${landingRoot} and fix any issue caused by your changes.

Final response:
- Briefly state what you improved.
- State whether \`pnpm build\` passed.`;
}

function loadTasks(csvPath) {
  const csvText = readFileSync(csvPath, "utf8");
  const rows = parseCsv(csvText.replace(/^\uFEFF/, ""));

  if (rows.length < 2) {
    throw new Error(`CSV has no data rows: ${csvPath}`);
  }

  const headers = rows[0];
  const pageIndex = headers.findIndex((header) => header.trim().toLowerCase() === "page");
  if (pageIndex === -1) {
    throw new Error(`CSV is missing the Page column: ${csvPath}`);
  }

  const impressionsIndex = headers.findIndex((header) => header.trim().toLowerCase() === "impressions");
  const clicksIndex = headers.findIndex((header) => header.trim().toLowerCase() === "clicks");
  const avgPositionIndex = headers.findIndex((header) => header.trim().toLowerCase() === "avg. position");
  const queryColumns = detectQueryColumns(headers);

  const byPage = new Map();

  for (const row of rows.slice(1)) {
    const pageUrl = row[pageIndex]?.trim();
    if (!pageUrl || !pageUrl.startsWith("https://offlinetools.org/a/")) {
      continue;
    }

    const parsedUrl = new URL(pageUrl);
    const parts = parsedUrl.pathname.split("/").filter(Boolean);
    if (parts.length !== 3 || parts[0] !== "a") {
      continue;
    }

    const toolSlug = parts[1];
    const articleSlug = parts[2];
    const filePath = path.join(landingRoot, "app", "a", toolSlug, articleSlug, "page.tsx");
    if (!existsSync(filePath)) {
      continue;
    }

    const current = byPage.get(pageUrl) ?? {
      pageUrl,
      toolSlug,
      articleSlug,
      filePath,
      impressions: 0,
      clicks: 0,
      weightedPositionTotal: 0,
      explicitQueries: new Set(),
    };

    const impressions = toNumber(row[impressionsIndex]);
    const clicks = toNumber(row[clicksIndex]);
    const avgPosition = toNumber(row[avgPositionIndex]);

    current.impressions += impressions;
    current.clicks += clicks;
    current.weightedPositionTotal += avgPosition * (impressions || 1);

    for (const columnIndex of queryColumns) {
      const query = row[columnIndex]?.trim();
      if (query) {
        current.explicitQueries.add(query);
      }
    }

    byPage.set(pageUrl, current);
  }

  const tasks = Array.from(byPage.values()).map((task) => {
    const title = extractArticleTitle(task.filePath, task.articleSlug);
    const explicitQueries = Array.from(task.explicitQueries);
    const intentSeeds =
      explicitQueries.length > 0 ? explicitQueries : deriveIntentSeeds(title, task.toolSlug, task.articleSlug);

    return {
      ...task,
      title,
      avgPosition: task.impressions ? task.weightedPositionTotal / task.impressions : 0,
      explicitQueries,
      intentSeeds,
    };
  });

  tasks.sort((left, right) => {
    if (right.impressions !== left.impressions) {
      return right.impressions - left.impressions;
    }

    return left.pageUrl.localeCompare(right.pageUrl);
  });

  return {
    tasks,
    hasExplicitQueryColumns: queryColumns.length > 0,
    headers,
  };
}

function loadCompletedSuccesses(summaryPath) {
  if (!existsSync(summaryPath)) {
    return new Set();
  }

  const lines = readFileSync(summaryPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const successes = new Set();
  for (const line of lines) {
    try {
      const record = JSON.parse(line);
      if (record.status === "success" && record.pageUrl) {
        successes.add(record.pageUrl);
      }
    } catch {
      // Ignore malformed historical entries.
    }
  }

  return successes;
}

function filterTasks(tasks, options, completedSuccesses) {
  let queue = tasks;

  if (options.slug) {
    queue = queue.filter((task) => task.articleSlug === options.slug);
  }

  if (options.pageUrl) {
    queue = queue.filter((task) => task.pageUrl === options.pageUrl);
  }

  if (options.startAt) {
    const startIndex = queue.findIndex((task) => task.articleSlug === options.startAt);
    if (startIndex === -1) {
      throw new Error(`Could not find --start-at slug in queue: ${options.startAt}`);
    }
    queue = queue.slice(startIndex);
  }

  if (!options.includeCompleted) {
    queue = queue.filter((task) => !completedSuccesses.has(task.pageUrl));
  }

  if (options.limit !== null) {
    queue = queue.slice(0, options.limit);
  }

  return queue;
}

function ensureDirectory(dirPath) {
  mkdirSync(dirPath, { recursive: true });
}

function createRunLayout(outputRoot) {
  ensureDirectory(outputRoot);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const runRoot = path.join(outputRoot, timestamp);
  const promptsDir = path.join(runRoot, "prompts");
  const logsDir = path.join(runRoot, "logs");

  ensureDirectory(runRoot);
  ensureDirectory(promptsDir);
  ensureDirectory(logsDir);

  return {
    runRoot,
    promptsDir,
    logsDir,
    manifestPath: path.join(runRoot, "manifest.json"),
    summaryPath: path.join(runRoot, "summary.jsonl"),
  };
}

function runCodexTask(task, runLayout, timeoutSeconds) {
  const safeSlug = sanitizeFileName(task.articleSlug);
  const promptPath = path.join(runLayout.promptsDir, `${safeSlug}.md`);
  const lastMessagePath = path.join(runLayout.logsDir, `${safeSlug}.last-message.txt`);
  const logPath = path.join(runLayout.logsDir, `${safeSlug}.log`);
  const prompt = buildPrompt(task);

  writeFileSync(promptPath, prompt, "utf8");

  return new Promise((resolve) => {
    const logStream = createWriteStream(logPath, { flags: "w" });
    const command =
      `source ~/.zshrc >/dev/null 2>&1 && ` +
      `codex-proxy --search exec ` +
      `-C ${shellQuote(repoRoot)} ` +
      `--color never ` +
      `-m gpt-5.4 ` +
      `-c ${shellQuote('model_reasoning_effort="xhigh"')} ` +
      `-c ${shellQuote('model_reasoning_summary="detailed"')} ` +
      `-o ${shellQuote(lastMessagePath)} ` +
      `-`;

    const child = spawn("zsh", ["-lc", command], {
      cwd: repoRoot,
      detached: true,
      stdio: ["pipe", "pipe", "pipe"],
    });

    const startedAt = new Date().toISOString();
    let settled = false;
    let timedOut = false;

    const finish = (result) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      logStream.end();
      resolve({
        pageUrl: task.pageUrl,
        articleSlug: task.articleSlug,
        filePath: task.filePath,
        promptPath,
        logPath,
        lastMessagePath,
        startedAt,
        endedAt: new Date().toISOString(),
        timeoutSeconds,
        ...result,
      });
    };

    child.stdout.on("data", (chunk) => {
      logStream.write(chunk);
    });

    child.stderr.on("data", (chunk) => {
      logStream.write(chunk);
    });

    child.on("error", (error) => {
      finish({
        status: "spawn_error",
        exitCode: null,
        signal: null,
        timedOut,
        error: error.message,
      });
    });

    child.on("close", (code, signal) => {
      finish({
        status: timedOut ? "timeout" : code === 0 ? "success" : "failed",
        exitCode: code,
        signal,
        timedOut,
      });
    });

    child.stdin.end(prompt);

    const timer = setTimeout(() => {
      timedOut = true;

      try {
        process.kill(-child.pid, "SIGTERM");
      } catch {
        // Process already exited.
      }

      setTimeout(() => {
        try {
          process.kill(-child.pid, "SIGKILL");
        } catch {
          // Process already exited.
        }
      }, 5000).unref();
    }, timeoutSeconds * 1000);
  });
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const runLayout = createRunLayout(options.outputRoot);
  const latestSummaryPath = path.join(options.outputRoot, "latest-summary.jsonl");
  const completedSuccesses = loadCompletedSuccesses(latestSummaryPath);

  const { tasks: pageTasks, hasExplicitQueryColumns, headers } = loadTasks(options.csvPath);
  const keywordReport = loadKeywordReport(options.keywordCsvPath);
  const { tasks, mappedKeywords, unmappedKeywords } = assignKeywordQueries(pageTasks, keywordReport);
  const queue = filterTasks(tasks, options, completedSuccesses);

  const manifest = {
    createdAt: new Date().toISOString(),
    csvPath: options.csvPath,
    keywordCsvPath: options.keywordCsvPath,
    repoRoot,
    landingRoot,
    timeoutSeconds: options.timeoutSeconds,
    hasExplicitQueryColumns,
    csvHeaders: headers,
    keywordCsvHeaders: keywordReport.headers,
    keywordReportSummary: {
      totalRows: keywordReport.totalRows,
      acceptedRows: keywordReport.acceptedRows.length,
      rejectedRows: keywordReport.rejectedRows.length,
      mappedRows: mappedKeywords.length,
      unmappedRows: unmappedKeywords.length,
      rejectionReasons: keywordReport.rejectedRows.reduce((counts, row) => {
        counts[row.reason] = (counts[row.reason] ?? 0) + 1;
        return counts;
      }, {}),
    },
    queuedTasks: queue.map((task, index) => ({
      queueIndex: index + 1,
      pageUrl: task.pageUrl,
      toolSlug: task.toolSlug,
      articleSlug: task.articleSlug,
      filePath: task.filePath,
      title: task.title,
      impressions: task.impressions,
      clicks: task.clicks,
      avgPosition: task.avgPosition,
      pageReportQueries: task.pageReportQueries,
      mappedQueries: task.mappedQueries,
      explicitQueries: task.explicitQueries,
      intentSeeds: task.intentSeeds,
    })),
  };

  writeFileSync(runLayout.manifestPath, JSON.stringify(manifest, null, 2), "utf8");

  const promptPreviewDir = path.join(runLayout.runRoot, "prompts");
  for (const task of queue) {
    const prompt = buildPrompt(task);
    const safeSlug = sanitizeFileName(task.articleSlug);
    writeFileSync(path.join(promptPreviewDir, `${safeSlug}.md`), prompt, "utf8");
  }

  if (options.dryRun || options.manifestOnly) {
    console.log(`Prepared ${queue.length} queued tasks.`);
    console.log(`Manifest: ${runLayout.manifestPath}`);
    console.log(`Prompts: ${promptPreviewDir}`);
    console.log(`Explicit query columns found: ${hasExplicitQueryColumns ? "yes" : "no"}`);
    console.log(`Filtered keyword rows: ${keywordReport.acceptedRows.length}/${keywordReport.totalRows}`);
    console.log(`Mapped keyword rows: ${mappedKeywords.length}`);
    return;
  }

  for (let index = 0; index < queue.length; index += 1) {
    const task = queue[index];
    const result = await runCodexTask(task, runLayout, options.timeoutSeconds);
    const line = JSON.stringify({
      queueIndex: index + 1,
      queueTotal: queue.length,
      ...result,
    });

    writeFileSync(runLayout.summaryPath, `${line}\n`, { flag: "a" });
    writeFileSync(latestSummaryPath, `${line}\n`, { flag: "a" });

    console.log(`[${index + 1}/${queue.length}] ${task.articleSlug}: ${result.status}`);
  }

  console.log(`Run complete. Summary: ${runLayout.summaryPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

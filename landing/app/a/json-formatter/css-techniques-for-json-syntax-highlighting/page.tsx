import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Techniques for JSON Syntax Highlighting in HTML | Offline Tools",
  description:
    "Learn how to show highlighted JSON in HTML with CSS classes, safe token rendering, line wrapping, and modern light/dark theme techniques.",
};

export default function CssJsonHighlightingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">CSS Techniques for JSON Syntax Highlighting</h1>

      <div className="space-y-6">
        <p>
          If you want to show highlighted JSON in HTML, the practical pattern is: parse the JSON, output HTML spans for
          each token type, then let CSS handle color, spacing, wrapping, and theme. CSS is excellent at presentation,
          but it cannot read raw JSON text and decide which characters are keys, strings, numbers, or punctuation on
          its own.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What CSS Can and Cannot Do</h2>
        <p>
          A good JSON highlighter has two separate jobs. First, something other than CSS must identify the tokens and
          emit HTML. Second, CSS makes that HTML readable and usable inside the page.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>CSS can color keys, strings, numbers, booleans, nulls, and punctuation.</li>
          <li>CSS can preserve indentation, control line height, and manage overflow or wrapping.</li>
          <li>CSS can switch themes with custom properties and dark-mode media queries.</li>
          <li>CSS cannot safely tokenize raw JSON text by itself.</li>
        </ul>
        <p>
          That distinction matters because many examples on the web jump straight into colors and skip the HTML layer.
          For search intent like "HTML syntax highlighting JSON data", the missing step is usually the token markup.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Emit Tokenized HTML First</h2>
        <p>
          Use semantic code markup, then wrap each JSON token in a class you can target. A small read-only viewer often
          ends up with HTML like this:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="whitespace-pre-wrap text-sm">
            {`<pre class="json-viewer wrap" aria-label="Formatted JSON">
  <code>
    <span class="json-punctuation">{</span>
    <span class="json-line">
      <span class="json-key">"name"</span><span class="json-punctuation">: </span><span class="json-string">"Offline Tools"</span><span class="json-punctuation">,</span>
    </span>
    <span class="json-line">
      <span class="json-key">"items"</span><span class="json-punctuation">: </span><span class="json-number">12</span><span class="json-punctuation">,</span>
    </span>
    <span class="json-line">
      <span class="json-key">"published"</span><span class="json-punctuation">: </span><span class="json-boolean">true</span>
    </span>
    <span class="json-punctuation">}</span>
  </code>
</pre>`}
          </pre>
        </div>
        <p>
          Keep the outer <code>&lt;pre&gt;</code> and <code>&lt;code&gt;</code> elements. They provide the right
          semantics for formatted code or data, and they work well with screen readers, copy/paste, and code-block
          styling.
        </p>

        <h2 className="text-2xl font-semibold mt-8">2. Use CSS for Readability, Not Parsing</h2>
        <p>
          The core CSS is simple. Preserve the formatting, choose readable colors, and decide whether long lines should
          scroll or wrap.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="whitespace-pre-wrap text-sm">
            {`pre.json-viewer {
  margin: 0;
  padding: 1rem;
  border-radius: 0.75rem;
  overflow: auto;
  background: var(--json-bg);
  color: var(--json-text);
}

pre.json-viewer code {
  display: block;
  white-space: pre;
  tab-size: 2;
  line-height: 1.6;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

pre.json-viewer.wrap code {
  white-space: pre-wrap;
}

.json-key {
  color: var(--json-key);
  font-weight: 600;
}

.json-string {
  color: var(--json-string);
  overflow-wrap: anywhere;
}

.json-number { color: var(--json-number); }
.json-boolean { color: var(--json-boolean); }
.json-null { color: var(--json-null); }
.json-punctuation { color: var(--json-punctuation); }`}
          </pre>
        </div>
        <p>
          Two details are easy to miss. If you want the exact IDE-style layout, keep <code>white-space: pre</code> and
          allow horizontal scrolling. If you want long strings and URLs to wrap inside the code block, switch to{" "}
          <code>pre-wrap</code> and add <code>overflow-wrap: anywhere</code> to the token spans that may contain long
          unbroken text.
        </p>
        <p>
          If your data uses tabs for indentation, <code>tab-size</code> lets you normalize them without modifying the
          actual JSON text.
        </p>

        <h2 className="text-2xl font-semibold mt-8">3. Theme It with CSS Variables</h2>
        <p>
          Custom properties are still the cleanest way to theme a JSON viewer. Define the palette once, then switch
          the values for dark mode.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="whitespace-pre-wrap text-sm">
            {`:root {
  --json-bg: #f8fafc;
  --json-text: #0f172a;
  --json-key: #0f766e;
  --json-string: #b45309;
  --json-number: #7c3aed;
  --json-boolean: #2563eb;
  --json-null: #6b7280;
  --json-punctuation: #475569;
}

@media (prefers-color-scheme: dark) {
  :root {
    --json-bg: #0f172a;
    --json-text: #e2e8f0;
    --json-key: #5eead4;
    --json-string: #fdba74;
    --json-number: #c4b5fd;
    --json-boolean: #93c5fd;
    --json-null: #94a3b8;
    --json-punctuation: #cbd5e1;
  }
}`}
          </pre>
        </div>
        <p>
          Current browser support also makes <code>light-dark()</code> usable in many projects, but it only works when{" "}
          <code>color-scheme: light dark</code> is in effect. If you need the broadest compatibility, the media-query
          version above is still the safest default.
        </p>

        <h2 className="text-2xl font-semibold mt-8">4. Generate the HTML Safely</h2>
        <p>
          The CSS is the easy part. The harder part is creating HTML that is both correct and safe. Avoid regex-only
          replacements on raw JSON strings for anything beyond a demo. Escaped quotes, unicode escapes, nested arrays,
          and edge cases around numbers make that approach brittle very quickly.
        </p>
        <p>
          A safer pattern is to parse JSON first, then walk the parsed value and render each token type deliberately.
          Escape HTML before inserting string content into the page.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="whitespace-pre-wrap text-sm">
            {`const escapeHtml = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const pad = (depth) => "  ".repeat(depth);

function renderJson(value, depth = 0) {
  if (value === null) return '<span class="json-null">null</span>';
  if (typeof value === "string") {
    return \`<span class="json-string">"\${escapeHtml(value)}"</span>\`;
  }
  if (typeof value === "number") {
    return \`<span class="json-number">\${String(value)}</span>\`;
  }
  if (typeof value === "boolean") {
    return \`<span class="json-boolean">\${value}</span>\`;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '<span class="json-punctuation">[ ]</span>';
    }

    const items = value.map((item) => \`\${pad(depth + 1)}\${renderJson(item, depth + 1)}\`);
    return [
      '<span class="json-punctuation">[</span>',
      items.join(',\\n'),
      \`\${pad(depth)}<span class="json-punctuation">]</span>\`,
    ].join('\\n');
  }

  const entries = Object.entries(value);
  if (entries.length === 0) {
    return '<span class="json-punctuation">{ }</span>';
  }

  const lines = entries.map(([key, item]) =>
    \`\${pad(depth + 1)}<span class="json-key">"\${escapeHtml(key)}"</span><span class="json-punctuation">: </span>\${renderJson(item, depth + 1)}\`
  );

  return [
    '<span class="json-punctuation">{</span>',
    lines.join(',\\n'),
    \`\${pad(depth)}<span class="json-punctuation">}</span>\`,
  ].join('\\n');
}

const parsed = JSON.parse(rawJson);
container.innerHTML = \`<pre class="json-viewer wrap"><code>\${renderJson(parsed)}</code></pre>\`;`}
          </pre>
        </div>
        <p>
          This approach is still lightweight, but it avoids the common mistake of trying to infer JSON structure from a
          few string replacements.
        </p>

        <h2 className="text-2xl font-semibold mt-8">5. Common Problems and Fixes</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Colors do not apply: make sure you are styling emitted spans such as <code>.json-key</code> and not the raw
            JSON text alone.
          </li>
          <li>
            Very long URLs break the layout: use a wrapping mode with <code>white-space: pre-wrap</code> and{" "}
            <code>overflow-wrap: anywhere</code>.
          </li>
          <li>
            User content turns into live HTML: escape <code>&lt;</code>, <code>&gt;</code>, and <code>&amp;</code>{" "}
            before injecting strings.
          </li>
          <li>
            Invalid JSON gives inconsistent output: run <code>JSON.parse</code> first and show a separate parse error
            state instead of trying to highlight malformed input.
          </li>
          <li>
            Dark mode looks muddy: verify contrast on both the background and each token color, especially punctuation
            and null values.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">When CSS-First Highlighting Is Enough</h2>
        <p>
          This approach works well when you need a read-only JSON block on a marketing page, documentation page, admin
          UI, or debugging view. It stays small, fast, and easy to theme.
        </p>
        <p>
          If you also need folding, line numbers, search, editable content, very large payloads, or support for many
          languages, a dedicated syntax-highlighting or editor library is usually the better choice. Even then, the same
          CSS ideas still apply because those libraries usually emit token classes underneath.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Bottom Line</h2>
        <p>
          The best CSS technique for JSON syntax highlighting is not a clever selector. It is a clean division of work:
          generate reliable HTML tokens first, then use CSS to control readability, wrapping, theme, and contrast.
        </p>
        <p>
          If you build your viewer around <code>&lt;pre&gt;</code>, <code>&lt;code&gt;</code>, token classes, custom
          properties, and safe HTML escaping, you will end up with JSON output that looks good in real pages and holds
          up under real data.
        </p>
      </div>
    </>
  );
}

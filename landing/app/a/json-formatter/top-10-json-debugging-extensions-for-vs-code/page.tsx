import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Box,
  Bug,
  Check,
  Code,
  Eye,
  FlaskConical,
  FolderSearch,
  Info,
  ListTodo,
  Palette,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best JSON Debugging Extensions for VS Code (2026) | Article",
  description:
    "Current VS Code picks for debugging JSON files, API payloads, JSON with comments, and runtime objects, plus the built-in features you should use first.",
};

type QuickPick = {
  label: string;
  answer: string;
};

type Extension = {
  name: string;
  icon: LucideIcon;
  summary: string;
  bestFor: string;
  whyItHelps: string;
  caveat: string;
  example: string;
};

const quickPicks: QuickPick[] = [
  {
    label: "Best single add-on for malformed JSON files",
    answer:
      "Error Lens, because it puts parse and schema errors directly on the line instead of hiding them in the Problems panel.",
  },
  {
    label: "Best for API response debugging",
    answer:
      "REST Client if you prefer text-based request files, or Thunder Client if you want a GUI inside VS Code.",
  },
  {
    label: "Best for exploring large nested payloads",
    answer: "JSON Viewer for a tree view, or JSON Crack when you want a visual map of relationships.",
  },
  {
    label: "Best for JSON with comments",
    answer:
      "Usually no extension at all. Use VS Code's built-in JSON with Comments language mode (`jsonc`) first, then add Prettier if you want consistent formatting.",
  },
  {
    label: "Best for Java objects that need to be viewed as JSON",
    answer:
      "Debugger for Java, then evaluate your serializer in the Debug Console when you need the actual JSON string.",
  },
];

const extensions: Extension[] = [
  {
    name: "Error Lens",
    icon: Bug,
    summary:
      "Error Lens is the fastest way to make invalid JSON obvious. It renders diagnostics inline, so missing commas, stray quotes, and schema problems appear exactly where they happen.",
    bestFor: "Raw JSON files, copied API responses, and config files that keep failing validation.",
    whyItHelps:
      "VS Code already knows when JSON is broken. Error Lens makes that feedback impossible to miss, which is why it is the best default recommendation for most people searching for a VS Code JSON debugger.",
    caveat:
      "It does not replace validation. It only displays diagnostics produced by VS Code or another language service.",
    example:
      "You paste a minified payload into a scratch file, miss one comma, and the exact line is annotated immediately instead of forcing you to scan the full document.",
  },
  {
    name: "REST Client",
    icon: FlaskConical,
    summary:
      "REST Client lets you send HTTP requests from `.http` or `.rest` files and inspect the formatted JSON response without leaving the editor.",
    bestFor: "Debugging request and response payloads from REST APIs, GraphQL endpoints, and webhook flows.",
    whyItHelps:
      "It keeps the whole feedback loop in one place: request body, headers, auth, response status, and JSON output. That is often more useful than a pure formatter when the bug is really in the API conversation.",
    caveat:
      "The workflow is text-first. If you want a click-heavy GUI, Thunder Client is usually easier.",
    example:
      "You can replay a failing POST request, tweak one field in the JSON body, resend it, and compare the next response in seconds.",
  },
  {
    name: "JSON Viewer",
    icon: Eye,
    summary:
      "JSON Viewer turns a dense document into a tree so you can expand and collapse objects instead of line-scrolling through them.",
    bestFor: "Huge nested payloads, logs, and responses where the problem is finding the right branch of the object graph.",
    whyItHelps:
      "Tree navigation is much faster than manual brace matching when you are trying to answer simple questions like where a value lives or whether two sibling objects have the same shape.",
    caveat:
      "It is primarily an exploration tool, not a schema or contract validator.",
    example:
      "A 2,000-line API response becomes manageable because you can collapse irrelevant arrays and inspect only the failing `errors` branch.",
  },
  {
    name: "JSON Crack",
    icon: FolderSearch,
    summary:
      "JSON Crack visualizes JSON as a connected graph, which helps when the structure itself is the thing you need to understand.",
    bestFor: "Deeply nested payloads, onboarding to unfamiliar APIs, and diagramming complex data relationships.",
    whyItHelps:
      "A graph view makes parent-child relationships and repeated structures obvious in ways a text editor usually does not.",
    caveat:
      "It is excellent for orientation, but not the best tool for fixing one-character syntax mistakes.",
    example:
      "If you inherit a large event payload with nested arrays of objects, JSON Crack shows the shape quickly enough to explain it to another developer.",
  },
  {
    name: "Thunder Client",
    icon: FlaskConical,
    summary:
      "Thunder Client is an API client with a UI inside VS Code, including request collections and a readable response viewer.",
    bestFor: "People who want Postman-like convenience while staying in VS Code.",
    whyItHelps:
      "It is often the quickest way to reproduce a bad response, verify a fix, and keep related calls organized without managing request files by hand.",
    caveat:
      "Some collaboration and advanced workflow features are outside the free core experience, so check the current plan details before standardizing on it for a team.",
    example:
      "You can store login, refresh-token, and profile calls in one collection and debug the JSON response chain in one pane.",
  },
  {
    name: "Paste JSON as Code",
    icon: Box,
    summary:
      "Paste JSON as Code generates types and models from sample JSON, which is extremely useful when debugging contract mismatches.",
    bestFor: "Turning sample payloads into TypeScript, C#, Go, or other language models to catch shape errors faster.",
    whyItHelps:
      "A generated model makes hidden assumptions visible. If a field flips from string to array or optional to required, you notice that sooner.",
    caveat:
      "The output is only as good as the sample. Messy or incomplete samples can create overly permissive types.",
    example:
      "After an API change, you paste the new response and regenerate interfaces to see exactly which fields moved or changed type.",
  },
  {
    name: "Prettier - Code formatter",
    icon: Code,
    summary:
      "Prettier is not a JSON debugger by itself, but it is still one of the best supporting extensions because readable structure makes JSON bugs easier to spot.",
    bestFor: "Teams that want consistent formatting in `json` and `jsonc` files across local edits, commits, and reviews.",
    whyItHelps:
      "Stable formatting reduces noise in diffs and makes missing brackets, odd nesting, and duplicated sections stand out faster.",
    caveat:
      "Formatting is not validation. A perfectly formatted payload can still violate a schema or API contract.",
    example:
      "If your repo has `package.json`, `tsconfig.json`, and custom config files, setting Prettier as the default formatter keeps them all readable.",
  },
  {
    name: "Sort JSON objects",
    icon: Check,
    summary:
      "Sort JSON objects alphabetizes keys so you can compare two payloads or config files without fighting random field order.",
    bestFor: "Diff-heavy debugging, fixture maintenance, and cleaning up API samples before review.",
    whyItHelps:
      "When keys are stable, real differences surface immediately. That makes it easier to debug why one payload passes and another fails.",
    caveat:
      "Sorting changes presentation. It should not be used blindly if humans rely on a custom order for readability.",
    example:
      "Two nearly identical response fixtures become easy to compare after both are normalized to the same key order.",
  },
  {
    name: "indent-rainbow",
    icon: Palette,
    summary:
      "indent-rainbow colorizes indentation levels, which sounds simple but pays off quickly in deeply nested JSON.",
    bestFor: "Visually tracking nesting depth in arrays and objects while scanning long files.",
    whyItHelps:
      "It reduces the time spent counting spaces and matching block depth by eye, especially when you are working in raw text instead of a tree viewer.",
    caveat:
      "It is a visual aid only. It will not tell you whether a payload is valid or schema-correct.",
    example:
      "A suspiciously indented block inside an array is easy to spot because its level color breaks the pattern around it.",
  },
  {
    name: "Debugger for Java",
    icon: Search,
    summary:
      "Debugger for Java belongs on this list for one specific reason: sometimes the JSON bug is really a runtime object bug, not a file-editing bug.",
    bestFor: "Backend debugging when a Java object serializes to unexpected JSON.",
    whyItHelps:
      "It lets you inspect fields, evaluate expressions, and verify object state before serialization. That is often the missing step when someone searches for how to view a Java object as JSON in the VS Code debugger.",
    caveat:
      "It is not a JSON editor. Use it when the payload is produced by running code, not when you are fixing a static JSON document.",
    example:
      "If your project already uses Jackson, you can inspect the object first and then evaluate `objectMapper.writeValueAsString(order)` in the Debug Console to verify the actual serialized output.",
  },
  {
    name: "VS Code JSON language service companions",
    icon: Info,
    summary:
      "This final slot is deliberate: for many workflows, the best 'extension' is pairing VS Code's built-in JSON support with one lightweight helper such as Error Lens or Prettier instead of stacking niche add-ons.",
    bestFor: "People who want the smallest setup that still catches most JSON mistakes.",
    whyItHelps:
      "VS Code already ships schema-aware validation, IntelliSense, formatting, folding, symbol navigation, JSON with Comments support, and bracket pair colorization.",
    caveat:
      "If a guide still tells you to install Bracket Pair Colorizer 2 first, that recommendation is dated. Modern VS Code already includes bracket pair colorization.",
    example:
      "A surprisingly effective setup for many developers is built-in JSON support plus Error Lens and nothing else.",
  },
];

const recommendedStacks = [
  {
    name: "Best lightweight stack",
    tools: "Built-in JSON support + Error Lens",
    reason: "The smallest setup that still catches syntax and schema errors quickly.",
  },
  {
    name: "Best API debugging stack",
    tools: "REST Client + Error Lens + JSON Crack",
    reason: "Reproduce the request, read the response cleanly, and understand the payload shape fast.",
  },
  {
    name: "Best config and JSONC stack",
    tools: "Built-in JSONC mode + Prettier + Sort JSON objects",
    reason: "Useful when you edit commented config files and want clean diffs.",
  },
  {
    name: "Best backend contract stack",
    tools: "Paste JSON as Code + Error Lens + Debugger for Java",
    reason: "Helps when the problem is a mismatch between runtime objects and the JSON you expect to emit.",
  },
];

export default function JsonDebuggingExtensionsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Bug className="mr-3" size={36} /> Top 10 JSON Debugging Extensions for VS Code
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          Searchers usually mean three different things when they look for a VS Code JSON debugger: they want to fix an
          invalid JSON file, inspect JSON coming back from an API, or understand a large nested payload quickly. Those
          are different jobs, so there is no single extension that wins every time.
        </p>
        <p>
          The best answer in 2026 is usually to start with VS Code&apos;s built-in JSON support, then add one focused
          extension for the job in front of you. This roundup was refreshed against current VS Code documentation and
          active Marketplace listings in March 2026, so it avoids a few outdated recommendations that still show up in
          older blog posts.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Quick Answer: Which JSON Extension Is Best?</h2>
        <ul className="list-disc pl-6 space-y-2">
          {quickPicks.map((pick) => (
            <li key={pick.label}>
              <strong>{pick.label}:</strong> {pick.answer}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Use VS Code&apos;s Built-In JSON Features First</h2>
        <p>
          Before installing anything, make sure you are actually using what VS Code already gives you for free. The
          built-in JSON language service is stronger than many people realize.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Schema-aware validation and IntelliSense for many common config files.</li>
          <li>Formatting, folding, outline navigation, and symbol search.</li>
          <li>JSON with Comments (`jsonc`) mode for commented configuration files.</li>
          <li>`JSON: Sort Document` support for JSONC files.</li>
          <li>Built-in bracket pair colorization and matching.</li>
        </ul>
        <p>
          That last point matters: if an article still recommends Bracket Pair Colorizer 2 as a must-install JSON tool,
          it is showing its age. Modern VS Code already covers that job.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How to Handle JSON with Comments</h2>
        <p>
          If you searched for a VS Code extension to debug JSON with comments, start by switching the file to
          <strong> JSON with Comments</strong> mode instead of hunting for a special parser extension. This is the
          correct approach for files like `settings.json`, `tsconfig.json`, `.eslintrc`, and other human-edited config
          files that allow comments.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm">
          <code>{`{
  "files.associations": {
    "*.jsonc": "jsonc",
    ".eslintrc": "jsonc"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.bracketPairColorization.enabled": true
}`}</code>
        </pre>
        <p>
          In practice, that setup answers a lot of the real search intent behind queries like &quot;best JSON extension
          for VS Code&quot; and &quot;VS Code extension to debug JSON with comments&quot; without overcomplicating your
          editor.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Top 10 Current Picks</h2>
        <ol className="list-decimal pl-6 space-y-8">
          {extensions.map((extension) => {
            const Icon = extension.icon;

            return (
              <li key={extension.name}>
                <h3 className="text-xl font-semibold flex items-center mb-2">
                  {extension.name} <Icon className="ml-2" size={20} />
                </h3>
                <p>{extension.summary}</p>
                <p>
                  <strong>Best for:</strong> {extension.bestFor}
                </p>
                <p>
                  <strong>Why it helps:</strong> {extension.whyItHelps}
                </p>
                <p>
                  <strong>Watch out for:</strong> {extension.caveat}
                </p>
                <p>
                  <strong>Example use:</strong> {extension.example}
                </p>
              </li>
            );
          })}
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Recommended Setups</h2>
        <ul className="list-disc pl-6 space-y-2">
          {recommendedStacks.map((stack) => (
            <li key={stack.name}>
              <strong>{stack.name}:</strong> {stack.tools}. {stack.reason}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Common Questions</h2>
        <ul className="list-disc pl-6 space-y-4">
          <li>
            <Info className="inline-block mr-1" size={18} />
            <strong>How do I debug a JSON file in VS Code?</strong> Open it in `json` mode, format it, check the
            Problems panel, and install Error Lens if you want the errors inline. If the JSON came from an API, reproduce
            the request with REST Client or Thunder Client instead of debugging the file in isolation.
          </li>
          <li>
            <Info className="inline-block mr-1" size={18} />
            <strong>Which extension is best for JSON exploration?</strong> JSON Viewer is better for tree-style
            inspection inside the editor, while JSON Crack is better when you want a quick mental model of a very nested
            payload.
          </li>
          <li>
            <Info className="inline-block mr-1" size={18} />
            <strong>How do I view a Java object as JSON in the VS Code debugger?</strong> Use Debugger for Java to
            inspect the object state first. If you need the serialized JSON string, evaluate your serializer in the Debug
            Console, such as `objectMapper.writeValueAsString(order)`, assuming your project already has that serializer
            available.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Practical Tips</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <ListTodo className="inline-block mr-1" size={18} />
            Use `jsonc` for commented config files instead of forcing them through a strict JSON validator.
          </li>
          <li>
            <ListTodo className="inline-block mr-1" size={18} />
            When a payload is too large to scan line-by-line, switch to a tree or graph view before you start editing.
          </li>
          <li>
            <ListTodo className="inline-block mr-1" size={18} />
            If two payloads look similar but behave differently, sort keys first and compare the normalized versions.
          </li>
          <li>
            <ListTodo className="inline-block mr-1" size={18} />
            Treat formatters as readability tools, not as proof that the JSON matches your API contract.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
        <p>
          If you want the shortest possible recommendation, use built-in JSON support plus Error Lens for static files,
          REST Client for API payloads, and JSON Viewer or JSON Crack when the structure is the problem. That covers the
          majority of real-world JSON debugging in VS Code without turning your editor into an extension pile.
        </p>
      </div>
    </>
  );
}

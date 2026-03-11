import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Visualize JSON as Graphs and Charts | Offline Tools",
  description:
    "Learn how to turn JSON into tree diagrams, tables, timelines, bar charts, and network graphs. See how to reshape nested data, choose the right visual, and avoid common JSON charting mistakes.",
};

export default function JsonVisualizationArticle() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Visualizing JSON as Graphs and Charts</h1>

      <div className="space-y-6">
        <p>
          JSON is easy for software to read, but raw JSON is rarely the best format for a human to analyze. If you are
          trying to understand an API response, compare values over time, or explain relationships between records, a
          graph or chart is usually more useful than a deeply nested text view.
        </p>

        <p>
          The key is to choose the visual based on the <span className="font-medium">question</span> you want to
          answer, not just the fact that the source happens to be JSON. In practice, most JSON visualization work comes
          down to three jobs: showing structure, showing measurements, or showing relationships.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Graphs and Charts Solve Different Problems</h2>
        <p>
          Searchers often mix these terms together, but they are not interchangeable. Picking the wrong one is the
          fastest way to create a confusing result.
        </p>

        <div className="my-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-lg font-medium">Tree Graphs</h3>
            <p className="mt-2 text-sm">
              Best for nested JSON with a single root object. Use them to inspect hierarchy, depth, repeated child
              structures, or folder-like data.
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-lg font-medium">Network Graphs</h3>
            <p className="mt-2 text-sm">
              Best for records that reference each other with IDs, links, or dependencies. Use them when the
              relationships between entities matter more than the raw values.
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-lg font-medium">Charts</h3>
            <p className="mt-2 text-sm">
              Best for arrays of observations. Use bar, line, scatter, or area charts after flattening the JSON into
              rows with clear fields such as date, category, and numeric value.
            </p>
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Choose the Visual by JSON Shape</h2>
        <p>
          A simple rule helps: find the repeating unit in the JSON, then choose the visual that matches that unit.
        </p>

        <div className="my-6 space-y-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <div>
            <h3 className="text-lg font-medium">1. A nested object with children arrays</h3>
            <p className="text-sm">
              Use a <span className="font-medium">tree</span>, <span className="font-medium">radial tree</span>, or{" "}
              <span className="font-medium">treemap</span>. This is common for menus, folder structures, org charts,
              ASTs, and configuration trees.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">2. An array of similar objects</h3>
            <p className="text-sm">
              Use a <span className="font-medium">table</span> first, then a bar, line, scatter, or histogram once you
              know which fields are dimensions and which fields are measures.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">3. Records with IDs plus references</h3>
            <p className="text-sm">
              Use a <span className="font-medium">network graph</span> or <span className="font-medium">Sankey</span>{" "}
              if the JSON expresses dependencies, ownership, flows, or many-to-many links.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">4. Time-stamped events or measurements</h3>
            <p className="text-sm">
              Use a <span className="font-medium">line chart</span>, <span className="font-medium">area chart</span>,
              or <span className="font-medium">heatmap</span>. Parse dates before plotting and aggregate to the right
              time interval so the chart stays readable.
            </p>
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">A Practical Workflow</h2>
        <p>
          Before you send JSON into a visualization library, do a short cleanup pass. This usually matters more than
          the library choice.
        </p>

        <ol className="my-4 list-decimal space-y-4 pl-6">
          <li>
            <span className="font-medium">Validate and inspect the JSON.</span>
            <p className="mt-1 text-sm">
              Use a formatter or tree viewer to find the root object, repeated arrays, missing keys, and inconsistent
              nesting. This tells you whether your data is hierarchical, tabular, or relational.
            </p>
          </li>

          <li>
            <span className="font-medium">Pick the observation level.</span>
            <p className="mt-1 text-sm">
              Decide what one row or one node should represent: an order, a user, a sensor reading, a file, or a
              service dependency. Do not chart the entire API response as one blob.
            </p>
          </li>

          <li>
            <span className="font-medium">Flatten or extract only the needed fields.</span>
            <p className="mt-1 text-sm">
              Most charts want a row-oriented structure such as an array of objects. Pull the relevant sub-array out of
              the response and discard summary metadata that does not belong in the chart.
            </p>
          </li>

          <li>
            <span className="font-medium">Parse types explicitly.</span>
            <p className="mt-1 text-sm">
              Convert number-like strings to numbers, parse dates, normalize booleans, and decide how to handle nulls.
              A chart built on string values will usually sort or scale incorrectly.
            </p>
          </li>

          <li>
            <span className="font-medium">Aggregate before rendering large data.</span>
            <p className="mt-1 text-sm">
              Thousands of points or nodes are rarely readable. Bin values, group categories, or summarize time series
              before you visualize them.
            </p>
          </li>
        </ol>

        <h2 className="mt-8 text-2xl font-semibold">Example: Nested API JSON to a Trend Chart</h2>
        <p>
          Many real API responses include both summary metadata and the repeated records you actually want to plot.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Raw JSON</h3>
          <div className="mt-2 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`{
  "account": "north-01",
  "generatedAt": "2026-03-10T08:00:00Z",
  "summary": {
    "orders": 126,
    "revenue": 5410.75
  },
  "daily": [
    { "date": "2026-03-07", "orders": "41", "revenue": 1705.5 },
    { "date": "2026-03-08", "orders": "38", "revenue": 1602.25 },
    { "date": "2026-03-09", "orders": "47", "revenue": 2103.0 }
  ]
}`}
            </pre>
          </div>

          <h3 className="mt-4 text-lg font-medium text-green-600 dark:text-green-400">What to chart</h3>
          <p className="mt-2 text-sm">
            The useful observation level is each entry inside <span className="font-mono text-xs">daily</span>. A line
            chart can plot <span className="font-mono text-xs">date</span> on the X-axis and either{" "}
            <span className="font-mono text-xs">orders</span> or{" "}
            <span className="font-mono text-xs">revenue</span> on the Y-axis.
          </p>

          <div className="mt-3 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`[
  { "date": "2026-03-07", "orders": 41, "revenue": 1705.5 },
  { "date": "2026-03-08", "orders": 38, "revenue": 1602.25 },
  { "date": "2026-03-09", "orders": 47, "revenue": 2103.0 }
]`}
            </pre>
          </div>

          <p className="mt-3 text-sm">
            After the transformation, the charting step is simple. You now have one row per day, one date field, and
            two numeric measures.
          </p>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm dark:border-blue-900 dark:bg-blue-950/40">
          <p>
            Current chart libraries often let you skip part of the reshaping step. Vega-Lite supports inline JSON via{" "}
            <span className="font-mono text-xs">data.values</span> and remote JSON via{" "}
            <span className="font-mono text-xs">data.url</span>. If the records you need are nested, its data format
            options can target a property such as <span className="font-mono text-xs">daily</span> instead of the whole
            response.
          </p>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Example: Hierarchical JSON to a Tree or Treemap</h2>
        <p>
          If your JSON already has nested <span className="font-mono text-xs">children</span>, treat it as hierarchy
          first. A tree diagram helps with structure. A treemap helps when each node also has a size.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`{
  "name": "root",
  "children": [
    {
      "name": "images",
      "children": [
        { "name": "logo.png", "size": 4200 },
        { "name": "hero.jpg", "size": 18200 }
      ]
    },
    {
      "name": "scripts",
      "children": [
        { "name": "app.js", "size": 9100 },
        { "name": "vendor.js", "size": 27500 }
      ]
    }
  ]
}`}
            </pre>
          </div>

          <p className="mt-3 text-sm">
            This shape works well for a tree graph because there is a single root and a clear parent-child chain. If
            you care about relative size instead of path structure, a treemap is better because the{" "}
            <span className="font-mono text-xs">size</span> values can control area.
          </p>

          <p className="mt-3 text-sm">
            D3&apos;s current hierarchy tools are built for this kind of JSON.{" "}
            <span className="font-mono text-xs">d3.hierarchy()</span> can consume nested objects directly, and layouts
            such as <span className="font-mono text-xs">tree()</span> or{" "}
            <span className="font-mono text-xs">treemap()</span> then compute positions from that structure.
          </p>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Example: JSON Records to a Network Graph</h2>
        <p>
          Network graphs only make sense when your JSON expresses relationships between entities. They are not a
          generic replacement for tables or charts.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`[
  { "id": "web", "dependsOn": ["api", "auth"] },
  { "id": "api", "dependsOn": ["db", "queue"] },
  { "id": "auth", "dependsOn": ["db"] }
]`}
            </pre>
          </div>

          <p className="mt-3 text-sm">A typical graph renderer wants two arrays: nodes and links.</p>

          <div className="mt-3 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`{
  "nodes": [
    { "id": "web" },
    { "id": "api" },
    { "id": "auth" },
    { "id": "db" },
    { "id": "queue" }
  ],
  "links": [
    { "source": "web", "target": "api" },
    { "source": "web", "target": "auth" },
    { "source": "api", "target": "db" },
    { "source": "api", "target": "queue" },
    { "source": "auth", "target": "db" }
  ]
}`}
            </pre>
          </div>

          <p className="mt-3 text-sm">
            If your data only contains counts, dates, or categories, a network graph is probably the wrong choice. Use
            one only when the links themselves are the story.
          </p>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Current Tooling Notes</h2>
        <p>
          Modern visualization libraries can work directly with JSON, but they expect different shapes. Knowing that
          expectation saves time.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <span className="font-medium">Vega-Lite:</span> Good for declarative charts. Its data model accepts
              inline JSON records and remote JSON files, and its format settings can extract nested record arrays from a
              larger response.
            </li>
            <li>
              <span className="font-medium">Apache ECharts:</span> Good for dashboards and interactive charts. Its{" "}
              <span className="font-mono text-xs">dataset</span> and{" "}
              <span className="font-mono text-xs">series.encode</span> features work well once your JSON is flattened
              into rows or columns.
            </li>
            <li>
              <span className="font-medium">D3:</span> Best when you need custom control. It is especially strong for
              hierarchy and graph layouts, but you usually need to do your own data preparation first.
            </li>
          </ul>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Common Mistakes When Visualizing JSON</h2>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <span className="font-medium">Plotting nested objects without extracting rows first.</span> Most charts
              need one observation per row, not a deeply nested response.
            </li>
            <li>
              <span className="font-medium">Leaving numbers and dates as strings.</span> This causes wrong sorting,
              broken axes, and category scales where continuous scales were expected.
            </li>
            <li>
              <span className="font-medium">Treating missing values as zero by default.</span> A null measurement often
              means unknown or not reported, not zero.
            </li>
            <li>
              <span className="font-medium">Choosing a network graph for large unrelated data.</span> Node-link
              diagrams become unreadable quickly when there are hundreds of nodes and dense edges.
            </li>
            <li>
              <span className="font-medium">Using pie charts for too many categories.</span> If the JSON contains many
              labels or values close together, bar charts are usually easier to compare.
            </li>
          </ul>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Bottom Line</h2>
        <p>
          JSON itself is not a visualization type. It is just the transport format. To visualize JSON well, first find
          the repeated unit you care about, then reshape the data into the structure a tree, network, table, or chart
          actually needs.
        </p>

        <p>
          If you start by formatting and inspecting the JSON, the right visual usually becomes obvious. Nested objects
          point to trees, arrays of records point to charts, and linked IDs point to graphs. That small decision-making
          step produces cleaner visuals and much better analysis than jumping straight from raw JSON to a random chart.
        </p>
      </div>
    </>
  );
}

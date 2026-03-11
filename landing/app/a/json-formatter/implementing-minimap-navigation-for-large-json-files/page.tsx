import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Minimap Navigation for Large JSON Files | Offline Tools",
  description:
    "Build a fast JSON minimap with line-based rendering, scroll sync, large-file performance safeguards, and current Monaco or CodeMirror integration guidance.",
};

export default function MinimapJsonNavigationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing Minimap Navigation for Large JSON Files</h1>

      <div className="space-y-6">
        <p>
          A useful JSON minimap is not just a tiny copy of the document. For large files, it should act as a fast
          structural overview that lets users jump between regions, keep their place, and spot dense or unusual
          sections without forcing the browser to render the entire file twice. If you are building a JSON formatter,
          viewer, or editor, the implementation details matter more than the visual gimmick.
        </p>

        <p>
          The main job of a minimap for JSON is navigation, not decoration. Search users usually need three things:
          instant orientation in a deeply nested payload, precise jump-to-section behavior, and performance that stays
          smooth even when the file is far too large to paint line-by-line DOM previews.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-lg font-medium">What a good JSON minimap should provide</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>A stable overview of the whole document, even when the main editor is virtualized</li>
            <li>Click and drag navigation that maps predictably to scroll position</li>
            <li>Visual encoding for structure, such as depth, keys, arrays, primitives, and validation errors</li>
            <li>A lightweight rendering path that does not duplicate the cost of the main editor</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Start With a Structural Line Model</h2>
        <p>
          The biggest improvement over a naive implementation is to stop thinking in terms of tiny characters. For JSON,
          line-level structure is usually enough. After formatting or loading the payload, build a compact line model
          that stores the information your minimap actually needs.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Useful fields per line</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Depth:</span> indentation level or nesting depth
            </li>
            <li>
              <span className="font-medium">Dominant token kind:</span> brace, key, string, number, boolean, null, or
              error
            </li>
            <li>
              <span className="font-medium">Offsets:</span> start and end position for jump-to-line or reveal-range
              behavior
            </li>
            <li>
              <span className="font-medium">Flags:</span> folded, search-hit, validation-error, or active-selection
            </li>
          </ul>
        </div>

        <p>
          This model gives you a cheap way to aggregate thousands of lines into a few hundred pixel rows. It also makes
          scroll synchronization much easier because the minimap can operate on stable line or offset metadata instead
          of DOM measurements from a second copy of the editor content.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Render to Canvas, Not Thousands of DOM Nodes</h2>
        <p>
          For large JSON files, canvas is usually the right default. A minimap built from one absolutely positioned
          element per token or per line looks simple at first, but it scales badly. A canvas-based minimap keeps the
          DOM small, redraws quickly, and makes it easy to overlay the current viewport.
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Group many source lines into a single minimap row when the document is taller than the minimap.</li>
          <li>Draw the dominant token kind for each row and use width or opacity to reflect nesting depth.</li>
          <li>Paint the viewport indicator last so it stays sharp during scroll and drag operations.</li>
          <li>Redraw inside <code>requestAnimationFrame</code> and cache derived row data when possible.</li>
        </ul>

        <p>
          If your editor supports files that can exceed a few megabytes, do the JSON parsing, token classification, or
          row bucketing in a Web Worker so the first load does not freeze the main thread.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Use Scroll Math That Matches User Expectations</h2>
        <p>
          The minimap should map pointer position to the main scroll range, not to raw document height. That distinction
          matters when the editor has padding, sticky headers, or internal viewport margins. A reliable formula is:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>{`ratio = clamp((pointerY - minimapTop) / minimapHeight, 0, 1)
targetScrollTop = ratio * max(0, contentHeight - viewportHeight)

viewportTop = (scrollTop / max(1, contentHeight)) * minimapHeight
viewportHeight = max(minThumbSize, (viewportHeight / max(1, contentHeight)) * minimapHeight)`}</pre>
          </div>
        </div>

        <p>
          For precision, drag the center of the viewport thumb rather than the top edge, and debounce hover previews
          separately from scroll updates. If your editor supports wrapped lines, either disable wrapping in large JSON
          mode or make sure your height map reflects wrapped visual lines, otherwise the minimap and main view will
          drift out of sync.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Implementation Sketch</h2>
        <p>
          This pattern stays practical: build a small line model, aggregate it into draw rows, and keep interaction math
          separate from rendering. The code below is intentionally simplified, but it is closer to a production design
          than a token-per-div demo.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Line-based canvas minimap sketch</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`type LineKind = "brace" | "key" | "string" | "number" | "literal" | "error";

type LineMeta = {
  line: number;
  depth: number;
  kind: LineKind;
  startOffset: number;
  endOffset: number;
};

const COLORS: Record<LineKind, string> = {
  brace: "#94a3b8",
  key: "#f59e0b",
  string: "#10b981",
  number: "#3b82f6",
  literal: "#8b5cf6",
  error: "#ef4444",
};

function buildLineModel(prettyJson: string): LineMeta[] {
  const lines = prettyJson.split("\\n");
  const keyPattern = /^"[^"]+"\\s*:/;
  let offset = 0;

  return lines.map((lineText, line) => {
    const trimmed = lineText.trim().replace(/,$/, "");
    const indentWidth = lineText.length - lineText.trimStart().length;
    const depth = Math.max(0, Math.floor(indentWidth / 2));

    let kind: LineKind = "error";
    if (trimmed === "{" || trimmed === "}" || trimmed === "[" || trimmed === "]") {
      kind = "brace";
    } else if (keyPattern.test(trimmed)) {
      kind = "key";
    } else if (/^"/.test(trimmed)) {
      kind = "string";
    } else if (/^-?\\d/.test(trimmed)) {
      kind = "number";
    } else if (/^(true|false|null)$/.test(trimmed)) {
      kind = "literal";
    }

    const startOffset = offset;
    offset += lineText.length + 1;

    return {
      line,
      depth,
      kind,
      startOffset,
      endOffset: offset - 1,
    };
  });
}

function drawMinimap(
  ctx: CanvasRenderingContext2D,
  lines: LineMeta[],
  width: number,
  height: number,
  scrollTop: number,
  viewportHeight: number,
  contentHeight: number
) {
  const safeContentHeight = Math.max(1, contentHeight);
  const rows = Math.max(1, Math.floor(height));
  const linesPerRow = Math.max(1, Math.ceil(lines.length / rows));

  ctx.clearRect(0, 0, width, height);

  for (let row = 0; row < rows; row++) {
    const start = row * linesPerRow;
    if (start >= lines.length) break;

    let dominant = lines[start];
    let maxDepth = dominant.depth;

    for (let i = start + 1; i < Math.min(lines.length, start + linesPerRow); i++) {
      if (dominant.kind === "brace" && lines[i].kind !== "brace") dominant = lines[i];
      if (lines[i].depth > maxDepth) maxDepth = lines[i].depth;
    }

    const depthFactor = Math.min(1, (maxDepth + 1) / 10);
    const left = width * 0.12;
    const rowWidth = width * (0.36 + depthFactor * 0.5);

    ctx.fillStyle = COLORS[dominant.kind];
    ctx.fillRect(left, row, rowWidth, 1);
  }

  const thumbTop = (scrollTop / safeContentHeight) * height;
  const thumbHeight = Math.max(12, (viewportHeight / safeContentHeight) * height);

  ctx.fillStyle = "rgba(37, 99, 235, 0.18)";
  ctx.strokeStyle = "rgba(37, 99, 235, 0.78)";
  ctx.fillRect(0, thumbTop, width, thumbHeight);
  ctx.strokeRect(0.5, thumbTop + 0.5, width - 1, Math.max(1, thumbHeight - 1));
}

function scrollTargetFromPointer(
  clientY: number,
  rect: DOMRect,
  contentHeight: number,
  viewportHeight: number
) {
  const ratio = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
  return ratio * Math.max(0, contentHeight - viewportHeight);
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The important design choice is aggregation. A large JSON file might contain tens of thousands of lines, but
            the minimap may only be 200 to 600 pixels tall. Bucket the document first, then draw one row per pixel.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Current Editor Integration Options</h2>
        <p>
          If you are not building the editor surface from scratch, the quickest path is to lean on the editor that you
          already use and customize from there.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Monaco Editor</h3>
          <p className="mt-2">
            As of March 11, 2026, Monaco still exposes built-in minimap controls such as{" "}
            <code>enabled</code>, <code>renderCharacters</code>, <code>showSlider</code>, <code>side</code>,{" "}
            <code>scale</code>, and <code>size</code>. For JSON, a block-style minimap is usually clearer and lighter
            than rendering tiny characters.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-3">
            <pre>{`monaco.editor.create(container, {
  value: formattedJson,
  language: "json",
  minimap: {
    enabled: true,
    renderCharacters: false,
    side: "right",
    showSlider: "mouseover",
    size: "fit",
    scale: 1,
  },
});`}</pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">CodeMirror 6</h3>
          <p className="mt-2">
            CodeMirror 6 documents viewport-based rendering and view-plugin extension points. That is a strong fit for a
            custom minimap sidecar: keep the editor virtualized, listen for viewport and height changes, and draw the
            minimap from editor state rather than cloning the visible DOM.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Large-File Guardrails</h2>
        <p>
          Most minimap problems on large JSON files are performance bugs disguised as UI bugs. If the model and scroll
          math are right but the browser still feels slow, the bottleneck is usually elsewhere.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Guardrails worth shipping</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Do not rebuild the whole minimap on every keystroke if only a small range changed.</li>
            <li>Use a worker for parsing and classification when payload size or formatting cost becomes noticeable.</li>
            <li>Keep line wrapping off for large JSON mode unless your height map handles wrapped visual lines.</li>
            <li>Support keyboard and search-based navigation so the minimap is helpful, not required.</li>
            <li>Show errors, search hits, or selected ranges as overlays because those are high-value jump targets.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">When a Minimap Is Not Enough</h2>
        <p>
          A minimap helps users navigate visually, but it should be paired with search, folding, and path-based
          navigation. For example, jumping to <code>items[4200].payload.metadata</code> is faster with a search field or
          tree path than with a drag gesture alone. The best JSON tools treat the minimap as one navigation surface
          among several.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing minimap navigation for large JSON files works best when you optimize for structure, not tiny text.
          Build a compact line model, aggregate it into a canvas-based overview, keep scroll math honest, and let the
          main editor stay virtualized. If you do that, the minimap becomes genuinely useful for real-world JSON
          payloads instead of becoming a second expensive copy of the document.
        </p>
      </div>
    </>
  );
}

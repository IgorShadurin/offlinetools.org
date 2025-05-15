import type { Metadata } from "next";
import {
  Cog,
  Zap,
  Box,
  Eye,
  Plus,
  Code,
  Layers,
  Puzzle,
  Share2,
  Flame,
  ShieldAlert,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Building a JSON Formatter Plugin Ecosystem | Offline Tools",
  description:
    "Explore the concepts and architecture behind creating a flexible and extensible JSON formatter with a plugin ecosystem.",
};

export default function JsonFormatterPluginEcosystemArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Building a JSON Formatter Plugin Ecosystem
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is the de facto standard for data
          interchange on the web and in countless applications. While native
          tools and browser developer consoles offer basic JSON formatting,
          real-world scenarios often demand more sophisticated capabilities:
          handling massive datasets, visualizing specific data types,
          integrating with other tools, or providing custom user experiences.
        </p>
        <p>
          Building a JSON formatter with a robust plugin ecosystem addresses
          these needs by allowing developers to extend and customize the core
          functionality. This article explores the concepts, architecture, and
          implementation ideas behind creating such an ecosystem.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Cog className="w-6 h-6" /> The Core JSON Formatter
        </h2>
        <p>
          At its heart, a JSON formatter takes a raw JSON string and presents
          it in a human-readable, structured format. Basic features typically
          include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Parsing:</strong> Turning the JSON string into a usable
            data structure (like a JavaScript object or array).
          </li>
          <li>
            <strong>Indentation:</strong> Adding whitespace to show hierarchy,
            making nested structures clear.
          </li>
          <li>
            <strong>Syntax Highlighting:</strong> Coloring different parts of
            the JSON (keys, strings, numbers, booleans, null) for easier
            reading.
          </li>
          <li>
            <strong>Collapsing/Expanding:</strong> Allowing users to hide/show
            nested objects and arrays.
          </li>
        </ul>
        <p>
          A basic formatter is essential, but it&apos;s often static and
          unaware of the semantic meaning of the data it displays.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Puzzle className="w-6 h-6" /> Why a Plugin Ecosystem?
        </h2>
        <p>
          The limitations of a basic formatter become apparent when dealing
          with:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Large Data:</strong> Simply displaying a massive JSON object
            can be overwhelming and slow. Plugins could offer filtering,
            pagination, or summarized views.
          </li>
          <li>
            <strong>Specific Data Types:</strong> A string might be a timestamp,
            a URL, a base64 image, or even embedded JSON. A plugin could
            recognize this and render it interactively (e.g., a clickable link,
            an image preview, or a nested formatter).
          </li>
          <li>
            <strong>Custom Views:</strong> Sometimes, you want to see a JSON
            object not just as a tree, but as a table, a chart, or a custom
            widget based on its known structure.
          </li>
          <li>
            <strong>Actions:</strong> Users might want to copy a specific value,
            send a value to another tool, or trigger an action based on the
            data.
          </li>
          <li>
            <strong>Annotations:</strong> Highlighting specific parts based on
            validation rules, search results, or user-defined criteria.
          </li>
        </ul>
        <p>
          A plugin ecosystem allows the core formatter to remain focused and
          maintainable while offloading specific functionalities to modular,
          developer-created extensions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Layers className="w-6 h-6" /> Designing the Architecture
        </h2>
        <p>
          A successful plugin architecture requires defining clear interfaces
          and extension points.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Box className="w-5 h-5 inline-block mr-1" /> Plugin Types
        </h3>
        <p>Plugins could specialize in different areas:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Value Renderers:</strong> Overrides how specific primitive
            values (strings, numbers) are displayed, potentially adding custom
            JSX.
          </li>
          <li>
            <strong>Node Annotators:</strong> Adds visual cues (borders,
            backgrounds, icons) to entire nodes (objects, arrays, key-value
            pairs).
          </li>
          <li>
            <strong>Action Providers:</strong> Adds buttons, context menu items,
            or drag-and-drop capabilities to nodes.
          </li>
          <li>
            <strong>Structure Transformers:</strong> Provides alternative views
            or summaries for specific object/array structures.
          </li>
          <li>
            <strong>Global Modifiers:</strong> Affects formatter-wide behavior
            like sorting keys, filtering nodes, or custom collapsing logic.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">
          <Code className="w-5 h-5 inline-block mr-1" /> Plugin Interface (API)
        </h3>
        <p>
          The core formatter needs a contract for plugins. A TypeScript
          interface is ideal for this. What data does a plugin receive? What
          should it return?
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Plugin Interfaces:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`interface JsonNode &#x7b;
  path: (string | number)[];
  key: string | number | null;
  value: any;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  parentType: 'object' | 'array' | null;
&#x7d;

interface ValueRendererPlugin &#x7b;
  name: string;
  shouldHandle?(node: JsonNode): boolean;
  renderValue(node: JsonNode): React.ReactNode;
&#x7d;

interface NodeAnnotatorPlugin &#x7b;
  name: string;
  shouldAnnotate?(node: JsonNode): boolean;
  getAnnotation?(node: JsonNode): &#x7b; className?: string; style?: React.CSSProperties; icon?: React.ReactNode &#x7d;;
&#x7d;

interface ActionProviderPlugin &#x7b;
  name: string;
  shouldProvideActions?(node: JsonNode): boolean;
  getActions?(node: JsonNode): &#x7b; label: string; onClick: (node: JsonNode) => void; icon?: React.ReactNode &#x7d;[];
&#x7d;

`}
            </pre>
          </div>
        </div>
        <p>
          Each plugin type defines specific methods (`shouldHandle`,
          `renderValue`, etc.) that the core formatter will call. The
          <code>JsonNode</code> interface is crucial, providing context about
          the current piece of data being processed (its value, type, key, and
          path within the overall structure).
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Plus className="w-5 h-5 inline-block mr-1" /> Plugin Registration
        </h3>
        <p>
          The core formatter needs a way to know which plugins are available.
          This could be a simple array of plugin instances passed to the
          formatter component or a global registry.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Plugin Registration:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`
import &#x7b; MyCoreFormatter &#x7d; from './core-formatter';
import &#x7b; TimestampPlugin &#x7d; from './plugins/timestamp-plugin';
import &#x7b; UrlPlugin &#x7d; from './plugins/url-plugin';

const registeredPlugins = [
  new TimestampPlugin(),
  new UrlPlugin(),

];

function App() &#x7b;
  const jsonString = '...';
  const parsedData = JSON.parse(jsonString);

  return (
    &lt;MyCoreFormatter data=&#x7b;parsedData&#x7d; plugins=&#x7b;registeredPlugins&#x7d; /&gt;
  );
&#x7d;


import &#x7b; PluginRegistry &#x7d; from './plugin-registry';
import &#x7b; TimestampPlugin &#x7d; from './plugins/timestamp-plugin';
import &#x7b; UrlPlugin &#x7d; from './plugins/url-plugin';

PluginRegistry.register(new TimestampPlugin());
PluginRegistry.register(new UrlPlugin());


import &#x7b; PluginRegistry &#x7d; from './plugin-registry';

function MyCoreFormatter(&#x7b; data &#x7d;: &#x7b; data: any &#x7d;) &#x7b;
  const plugins = PluginRegistry.getAll();

&#x7d;`}
            </pre>
          </div>
        </div>
        <p>
          Passing plugins explicitly via props offers better testability and
          locality, while a global registry might be simpler for applications
          with many plugins used everywhere.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Eye className="w-5 h-5 inline-block mr-1" /> Extension Points & Rendering
        </h3>
        <p>
          The core formatter&apos;s rendering logic is where plugins hook in.
          When rendering a value or a node, the formatter iterates through the
          registered plugins of the relevant type and asks if any want to
          handle it using the `shouldHandle` (or similar) method.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Rendering Logic with Plugins:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`
interface JsonNodeRendererProps &#x7b;
  node: JsonNode;
  plugins: (ValueRendererPlugin | NodeAnnotatorPlugin | ActionProviderPlugin)[];

&#x7d;

function JsonNodeRenderer(&#x7b; node, plugins &#x7d;: JsonNodeRendererProps) &#x7b;
  const valueRenderer = plugins
    .filter(p => typeof (p as ValueRendererPlugin).renderValue === 'function')
    .find(p => (p as ValueRendererPlugin).shouldHandle?.(node));

  const annotatorPlugins = plugins
    .filter(p => typeof (p as NodeAnnotatorPlugin).getAnnotation === 'function')
    .filter(p => (p as NodeAnnotatorPlugin).shouldAnnotate?.(node));

  const actionPlugins = plugins
    .filter(p => typeof (p as ActionProviderPlugin).getActions === 'function')
    .filter(p => (p as ActionProviderPlugin).shouldProvideActions?.(node));

  const annotations = annotatorPlugins.map(p => (p as NodeAnnotatorPlugin).getAnnotation?.(node)).filter(Boolean);
  const actions = actionPlugins.flatMap(p => (p as ActionProviderPlugin).getActions?.(node) || []);

  const nodeClassName = annotations.map(a => a.className).join(' ');
  const nodeStyle = annotations.reduce((acc, a) => ({ ...acc, ...a.style }), &#x7b;&#x7d;);
  const nodeIcons = annotations.map(a => a.icon).filter(Boolean);

  const keyElement = node.key !== null ? (
    &lt;span className="json-key"&gt;&#x7b;node.key&#x7d;:&lt;/span&gt;
  ) : null;

  let valueElement;
  if (valueRenderer) &#x7b;
    valueElement = valueRenderer.renderValue(node);
  &#x7d; else &#x7b;
    switch (node.type) &#x7b;
      case 'object':
        valueElement = (
          &lt;span className="json-brace"&gt;&#x7b;&#x7d;&lt;/span&gt;

          &lt;span className="json-brace"&gt;&#x7d;&#x7d;&lt;/span&gt;
        );
        break;
      case 'array':
        valueElement = (
          &lt;span className="json-bracket"&gt;[&#x7d;&lt;/span&gt;

          &lt;span className="json-bracket"&gt;]&#x7d;&lt;/span&gt;
        );
        break;
      case 'string':
        valueElement = &lt;span className="json-string"&gt;"&#x7b;node.value&#x7d;"&lt;/span&gt;;
        break;

      default:
        valueElement = &lt;span className="json-value"&gt;&#x7b;String(node.value)&#x7d;&lt;/span&gt;;
    &#x7d;
  &#x7d;

  return (
    &lt;div className=&#x7b;\`json-node \$&#x7b;nodeClassName&#x7d;\`&#x7d; style=&#x7b;nodeStyle&#x7d;&gt;
      &#x7b;keyElement&#x7d;
      &#x7b;nodeIcons&#x7d;
      &#x7b;valueElement&#x7d;
      &#x7b;actions.length > 0 && (
        &lt;span className="json-actions"&gt;
          &#x7b;actions.map((action, i) => (
            &lt;button key=&#x7b;i&#x7d; onClick=&#x7b;() => action.onClick(node)&#x7d;&gt;
              &#x7b;action.icon&#x7d; &#x7b;action.label&#x7d;
            &lt;/button&gt;
          ))&#x7d;
        &lt;/span&gt;
      )&#x7d;
    &lt;/div&gt;
  );
&#x7d;
`}
            </pre>
          </div>
        </div>
        <p>
          This conceptual code illustrates how the `JsonNodeRenderer` component
          would receive the `JsonNode` data and the list of plugins. It then
          queries the plugins to see if they apply and uses their output (JSX,
          styles, actions) in its rendering.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Zap className="w-6 h-6" /> Implementing a Sample Plugin: Timestamp Formatter
        </h2>
        <p>
          Let&apos;s imagine a simple `ValueRendererPlugin` that detects string
          values that look like timestamps and renders them in a more
          human-friendly way alongside the raw timestamp.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Timestamp Plugin:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`
export class TimestampPlugin implements ValueRendererPlugin &#x7b;
  name = 'timestamp-formatter';

  shouldHandle(node: JsonNode): boolean &#x7b;
    if (node.type !== 'string' || typeof node.value !== 'string') &#x7b;
      return false;
    &#x7d;
    const date = new Date(node.value);
    return !isNaN(date.getTime()) && date.toISOString() === node.value;
  &#x7d;

  renderValue(node: JsonNode): React.ReactNode &#x7b;
    const rawTimestamp = node.value as string;
    const date = new Date(rawTimestamp);
    const formattedDate = date.toLocaleString();

    return (
      &lt;span className="json-value json-string"&gt;
        "&#x7b;rawTimestamp&#x7d;"
        &lt;span className="text-xs text-gray-500 ml-2"&gt;
          (&#x7b;formattedDate&#x7d;)
        &lt;/span&gt;
      &lt;/span&gt;
    );
  &#x7d;
&#x7d;
`}
            </pre>
          </div>
        </div>
        <p>
          This plugin checks if a string value can be parsed into a valid
          date. If it can, it provides custom JSX to display both the original
          string and a formatted version. The core formatter would use this
          JSX instead of its default string rendering when
          `TimestampPlugin.shouldHandle` returns `true`.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Share2 className="w-6 h-6" /> Advantages of the Ecosystem
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Extensibility:</strong> Easily add new features or handle
            new data types without modifying the core formatter.
          </li>
          <li>
            <strong>Modularity:</strong> Plugins are self-contained units of
            functionality.
          </li>
          <li>
            <strong>Reusability:</strong> Plugins can potentially be shared and
            used across different applications using the same formatter core.
          </li>
          <li>
            <strong>Community Contributions:</strong> A well-designed API can
            encourage external developers to build and share plugins.
          </li>
          <li>
            <strong>Tailored Experiences:</strong> Applications can bundle
            specific sets of plugins relevant to their domain.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ShieldAlert className="w-6 h-6" /> Challenges
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>API Design:</strong> Defining a flexible yet stable plugin
            API is crucial and challenging. Changes to the core API can break
            plugins.
          </li>
          <li>
            <strong>Performance:</strong> Iterating through many plugins for
            every node, especially on large JSON, can impact performance.
            Plugins need to be efficient in their `shouldHandle` checks.
          </li>
          <li>
            <strong>Plugin Conflicts:</strong> What happens if multiple plugins
            want to handle the same node or render the same value? A priority
            system or clear rules are needed.
          </li>
          <li>
            <strong>Security:</strong> If plugins can execute arbitrary code
            (less of a concern in a server-side rendering context like Next.js
            pages, but relevant for client-side formatters), sandboxing might
            be necessary.
          </li>
          <li>
            <strong>Discoverability:</strong> Users need to know what plugins
            exist and how to install/enable them.
          </li>
          <li>
            <strong>Maintenance:</strong> Maintaining the core API and potentially
            a collection of official plugins requires ongoing effort.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Flame className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          Building a JSON formatter with a plugin ecosystem transforms a basic
          utility into a powerful, adaptable tool. By carefully designing the
          core formatter, defining clear plugin interfaces, and establishing
          extension points, developers can create a platform that can be easily
          extended to handle the diverse and evolving needs of working with
          JSON data. While challenges exist, the benefits in terms of
          flexibility and community enablement make it a worthwhile
          architectural approach.
        </p>
      </div>
    </>
  );
}
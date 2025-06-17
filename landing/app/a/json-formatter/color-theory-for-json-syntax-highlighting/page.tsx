import type { Metadata } from "next";
import { Palette, Code, Eye, Accessibility, SwatchBook, Lightbulb, Monitor } from "lucide-react";

export const metadata: Metadata = {
  title: "Color Theory for JSON Syntax Highlighting | Offline Tools",
  description:
    "Explore the principles of color theory applied to JSON syntax highlighting for improved readability and developer experience.",
};

export default function ColorTheoryJsonHighlightingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Palette className="w-8 h-8" /> Color Theory for JSON Syntax Highlighting
      </h1>

      <div className="space-y-6">
        <p>
          Syntax highlighting is a crucial feature in code editors and IDEs that displays source code, markup, or other
          text files in different colors and fonts according to the category of terms. For data formats like JSON,
          effective syntax highlighting significantly enhances readability, making it easier to parse the structure and
          quickly identify different data types and elements. At the heart of effective syntax highlighting lies the
          thoughtful application of <strong>Color Theory</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> The Structure of JSON
        </h2>
        <p>
          Before we dive into colors, let's quickly review the basic components of JSON syntax. JSON is built around two
          structures:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            An <strong>object</strong>: a collection of name/value pairs. In various languages, this is realized as an
            object, record, struct, dictionary, hash table, keyed list, or associative array. Starts with{" "}
            <code>&#x7b;</code> and ends with <code>&#x7d;</code>.
          </li>
          <li>
            An <strong>array</strong>: an ordered list of values. In most languages, this is realized as an array,
            vector, list, or sequence. Starts with <code>[</code> and ends with <code>]</code>.
          </li>
        </ul>
        <p>These structures are nested. The values can be:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            A <strong>string</strong>: A sequence of Unicode characters, wrapped in double quotes.
          </li>
          <li>
            A <strong>number</strong>: An integer or a floating-point number.
          </li>
          <li>
            A <strong>boolean</strong>: <code>true</code> or <code>false</code>.
          </li>
          <li>
            <code>null</code>
          </li>
          <li>
            Another <strong>object</strong>
          </li>
          <li>
            Another <strong>array</strong>
          </li>
        </ul>
        <p>
          JSON also uses punctuation like <code>:</code> (separates key from value in an object) and
          <code>,</code> (separates pairs in an object or values in an array).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb className="w-6 h-6" /> Mapping Syntax Elements to Color Categories
        </h2>
        <p>
          The fundamental goal is to assign distinct colors to different types of elements in the JSON structure. This
          allows the developer's eye to quickly distinguish between, say, a string value and a number, or between a key
          name and structural brackets.
        </p>
        <p>Common categories for coloring in JSON include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Keys/Properties:</strong> The names in the name/value pairs of an object (always strings).
          </li>
          <li>
            <strong>Strings:</strong> The actual string values.
          </li>
          <li>
            <strong>Numbers:</strong> Numeric values.
          </li>
          <li>
            <strong>Booleans:</strong> The keywords <code>true</code> and <code>false</code>.
          </li>
          <li>
            <strong>Null:</strong> The keyword <code>null</code>.
          </li>
          <li>
            <strong>Punctuation/Structure:</strong> Brackets <code>[ ]</code>, braces <code>&#x7b; &#x7d;</code>, colons{" "}
            <code>:</code>, and commas <code>,</code>.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <SwatchBook className="w-6 h-6" /> Choosing Your Palette: Principles
        </h2>
        <p>
          Selecting colors isn't just about making code look pretty; it's about creating a functional visual aid. Here
          are some color theory principles to consider:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Contrast:</strong> Ensure sufficient contrast between the text color and the background color for
            readability. Also, ensure colors assigned to different syntax elements are distinct enough to be easily
            differentiated.
          </li>
          <li>
            <strong>Visual Hierarchy:</strong> Use color intensity and saturation to guide the eye. More important or
            frequently scanned elements might use slightly more prominent colors, while less crucial elements (like
            punctuation) might be muted.
          </li>
          <li>
            <strong>Consistency:</strong> Once a color is assigned to a category (e.g., blue for strings), it should be
            used consistently throughout the highlighted code.
          </li>
          <li>
            <strong>Meaning (Optional but Helpful):</strong> While not strictly necessary for JSON, some languages
            benefit from conventional color meanings (e.g., red for errors, green for success). For JSON, consistency is
            more important than ingrained meaning.
          </li>
          <li>
            <strong>Color Blindness:</strong> A significant portion of the population experiences color blindness. Avoid
            relying *solely* on hue to distinguish elements. Using different shades, saturations, or even subtle font
            variations (though less common in JSON highlighting) can help. Test your palette using color blindness
            simulators.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Monitor className="w-6 h-6" /> Common Color Schemes & Examples
        </h2>
        <p>
          Different editors and themes use various approaches. Here's a look at common patterns and a simulated example
          using conceptual color classes.
        </p>

        <h3 className="text-xl font-semibold mt-6">Scheme 1: Bright & Contrasting (Often Dark Themes)</h3>
        <p>This scheme uses vibrant colors against a dark background to make different elements pop.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Keys:</strong> Light blue or cyan. Distinct and easily scanned.
          </li>
          <li>
            <strong>Strings:</strong> Orange or yellow. Stands out from keys and structural elements.
          </li>
          <li>
            <strong>Numbers/Booleans/Null:</strong> Purple or magenta. A different hue for primitives.
          </li>
          <li>
            <strong>Punctuation/Structure:</strong> Muted gray or the base text color. Less attention-grabbing.
          </li>
        </ul>
        <p>Simulated Example:</p>
        <div className="bg-gray-900 p-4 rounded-lg my-4 text-sm overflow-x-auto">
          <pre>
            <span className="text-gray-500">&#x7b;</span>
            <br />
            {"  "}
            <span className="text-cyan-400">&quot;name&quot;</span>
            <span className="text-gray-500">:</span> <span className="text-orange-400">&quot;Alice&quot;</span>
            <span className="text-gray-500">,</span>
            <br />
            {"  "}
            <span className="text-cyan-400">&quot;age&quot;</span>
            <span className="text-gray-500">:</span> <span className="text-purple-400">30</span>
            <span className="text-gray-500">,</span>
            <br />
            {"  "}
            <span className="text-cyan-400">&quot;isStudent&quot;</span>
            <span className="text-gray-500">:</span> <span className="text-purple-400">false</span>
            <span className="text-gray-500">,</span>
            <br />
            {"  "}
            <span className="text-cyan-400">&quot;courses&quot;</span>
            <span className="text-gray-500">:</span> <span className="text-gray-500">[</span>
            <br />
            {"    "}
            <span className="text-orange-400">&quot;Math&quot;</span>
            <span className="text-gray-500">,</span>
            <br />
            {"    "}
            <span className="text-orange-400">&quot;Science&quot;</span>
            <br />
            {"  "}
            <span className="text-gray-500">]</span>
            <br />
            <span className="text-gray-500">&#x7d;</span>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Scheme 2: Muted & Professional (Often Light Themes)</h3>
        <p>
          This scheme uses softer, less saturated colors that are easier on the eyes over long periods, especially on a
          light background.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Keys:</strong> Dark blue or navy.
          </li>
          <li>
            <strong>Strings:</strong> Dark green or olive.
          </li>
          <li>
            <strong>Numbers/Booleans/Null:</strong> Brown or dark red.
          </li>
          <li>
            <strong>Punctuation/Structure:</strong> Light gray or the base text color.
          </li>
        </ul>
        <p>Simulated Example:</p>
        <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm overflow-x-auto">
          <pre>
            <span className="text-gray-500">&#x7b;</span>
            <br />
            {"  "}
            <span className="text-blue-700">&quot;product&quot;</span>
            <span className="text-gray-500">:</span> <span className="text-green-700">&quot;Laptop&quot;</span>
            <span className="text-gray-500">,</span>
            <br />
            {"  "}
            <span className="text-blue-700">&quot;price&quot;</span>
            <span className="text-gray-500">:</span> <span className="text-red-700">1200.50</span>
            <span className="text-gray-500">,</span>
            <br />
            {"  "}
            <span className="text-blue-700">&quot;inStock&quot;</span>
            <span className="text-gray-500">:</span> <span className="text-red-700">true</span>
            <span className="text-gray-500">,</span>
            <br />
            {"  "}
            <span className="text-blue-700">&quot;features&quot;</span>
            <span className="text-gray-500">:</span> <span className="text-gray-500">[</span>
            <br />
            {"    "}
            <span className="text-green-700">&quot;Lightweight&quot;</span>
            <span className="text-gray-500">,</span>
            <br />
            {"    "}
            <span className="text-green-700">&quot;SSD&quot;</span>
            <br />
            {"  "}
            <span className="text-gray-500">]</span>
            <span className="text-gray-500">,</span>
            <br />
            {"  "}
            <span className="text-blue-700">&quot;warranty&quot;</span>
            <span className="text-gray-500">:</span> <span className="text-red-700">null</span>
            <br />
            <span className="text-gray-500">&#x7d;</span>
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Accessibility className="w-6 h-6" /> Accessibility Considerations
        </h2>
        <p>
          As mentioned, designing for accessibility is crucial. Here are specific points related to JSON highlighting:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Sufficient Contrast Ratio:</strong> Ensure that the contrast between the text color and the
            background meets WCAG standards (e.g., 4.5:1 for normal text, 3:1 for large text). Tools are available
            online to check color combinations.
          </li>
          <li>
            <strong>Avoid Color-Only Information:</strong> While color is the primary differentiator, don't rely *only*
            on hue. For example, if two elements are only distinguishable by a subtle color difference that someone with
            color blindness might miss, consider if the highlighting is truly effective for them.
          </li>
          <li>
            <strong>Themability:</strong> Good highlighting systems often allow users to customize colors. This is the
            most flexible way to ensure accessibility for individual needs and preferences.
          </li>
        </ul>
        <p className="flex items-start gap-2">
          <Eye className="w-5 h-5 mt-1 flex-shrink-0" /> Think about how your chosen colors appear under different
          lighting conditions or on different monitors.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Applying color theory to JSON syntax highlighting transforms raw text into a visually navigable structure. By
          carefully selecting colors that provide sufficient contrast, establish a clear visual hierarchy, and are
          mindful of accessibility, developers can significantly improve the readability and usability of JSON data,
          making development tasks involving JSON much more efficient and less error-prone. It's a small detail in the
          world of developer tools, but one with a large impact on daily workflow.
        </p>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { Accessibility, EyeOff, Eye, Code, ListChecks, TextQuote, Palette, MoveVertical } from "lucide-react";

export const metadata: Metadata = {
  title: "Accessible JSON Diff Views for Vision-Impaired Users",
  description:
    "Learn how to design and implement accessible JSON diff views for developers and users with vision impairments.",
};

export default function AccessibleJsonDiffViewArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Accessibility className="w-8 h-8" />
        Accessible JSON Diff Views for Vision-Impaired Users
      </h1>

      <div className="space-y-6">
        <p>
          Comparing different versions of JSON data is a common task for developers and technical users. Tools that
          visualize these differences, often called "diff views," are invaluable for quickly identifying what has
          changed. However, traditional diff views, which heavily rely on visual cues like side-by-side layouts and
          color-coding, can pose significant challenges for individuals with vision impairments.
        </p>
        <p>
          Ensuring accessibility in these tools isn't just about compliance; it's about enabling all users, regardless
          of their visual abilities, to effectively understand data changes. This article explores strategies and
          techniques to build more accessible JSON diff views.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <EyeOff className="w-6 h-6" /> The Challenge of Traditional Diff Views
        </h2>
        <p>
          Standard diff views typically present two versions of a file or data structure side-by-side or inline,
          highlighting additions, deletions, and changes using colors (often green for additions, red for deletions, and
          yellow/blue for changes). While intuitive for sighted users, this approach has several accessibility issues:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Color Dependency:</strong> Relies heavily on color to convey meaning, which is inaccessible to users
            with color vision deficiency or those using monochromatic displays.
          </li>
          <li>
            <strong>Spatial Layout:</strong> Side-by-side views can be difficult for screen reader users to navigate and
            understand the correspondence between the two versions.
          </li>
          <li>
            <strong>Visual Highlighting:</strong> Changes are often indicated by highlighting specific characters or
            lines, which might not be properly announced or interpreted by screen readers.
          </li>
          <li>
            <strong>Complexity:</strong> Large or deeply nested JSON structures make visual scanning difficult even for
            sighted users, and can be overwhelming when navigating line by line with assistive technology.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListChecks className="w-6 h-6" /> Accessibility Principles for Diff Views
        </h2>
        <p>
          To build accessible diff views, we must consider WCAG (Web Content Accessibility Guidelines) principles,
          particularly:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Perceivable:</strong> Information and user interface components must be presentable to users in ways
            they can perceive. This means not relying solely on color, and providing alternatives for visual content.
          </li>
          <li>
            <strong>Operable:</strong> User interface components and navigation must be operable. Keyboard accessibility
            and focus management are crucial.
          </li>
          <li>
            <strong>Understandable:</strong> Information and the operation of user interface must be understandable.
            Providing clear structure, semantic meaning, and supplementary text descriptions helps.
          </li>
          <li>
            <strong>Robust:</strong> Content must be robust enough that it can be interpreted reliably by a wide variety
            of user agents, including assistive technologies. Using standard HTML and ARIA attributes supports this.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> Designing Accessible JSON Diff Representations
        </h2>
        <p>Instead of just showing raw text with colors, we can enrich the representation with semantic structure.</p>

        <h3 className="text-xl font-semibold mt-6">1. Semantic Structure for Changed Elements</h3>
        <p>
          JSON is structured data. A diff isn't just lines of text; it's about changes to specific properties, array
          elements, or values. We can represent these changes using semantic HTML.
        </p>
        <p>Consider a simple JSON object change:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Original:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`&#x7b;
  "name": "Alice",
  "age": 30
&#x7d;`}
          </pre>
          <h4 className="text-lg font-medium mt-4">Modified:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`&#x7b;
  "name": "Alice",
  "age": 31,
  "city": "London"
&#x7d;`}
          </pre>
        </div>
        <p>A traditional diff might show:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Traditional Diff (Conceptual):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`&#x7b;
  "name": "Alice",
<span className="bg-red-200 dark:bg-red-800">  "age": 30</span>
<span className="bg-green-200 dark:bg-green-800">  "age": 31,</span>
<span className="bg-green-200 dark:bg-green-800">  "city": "London"</span>
&#x7d;`}
          </pre>
        </div>
        <p>
          An accessible approach could structure this differently. Instead of just lines, we could represent changes at
          the "property" level, perhaps using lists or definition lists.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Accessible Semantic Diff (Conceptual HTML Structure):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`&lt;div aria-label="JSON Object Difference"&gt;
  &lt;div aria-label="Property name: name"&gt;
    &lt;strong&gt;name:&lt;/strong&gt; "Alice" &lt;!-- Unchanged --&gt;
  &lt;/div&gt;
  &lt;div aria-label="Property name: age. Changed."&gt;
    &lt;strong&gt;age:&lt;/strong&gt;
    &lt;del className="sr-only"&gt;Original value: 30.&lt;/del&gt;
    &lt;span className="sr-only"&gt;Changed to:&lt;/span&gt; 31
    &lt;!-- Visual styling (color/underline) can be applied with CSS classes --&gt;
  &lt;/div&gt;
  &lt;div aria-label="Property name: city. Added."&gt;
    &lt;strong&gt;city:&lt;/strong&gt;
    &lt;span className="sr-only"&gt;Added value:&lt;/span&gt; "London"
    &lt;!-- Visual styling (color/underline) can be applied with CSS classes --&gt;
  &lt;/div&gt;
&lt;/div&gt;`}
            </pre>
          </div>
          <p className="mt-2">
            (<code>sr-only</code> is a common utility class to visually hide content but keep it available for screen
            readers).
          </p>
        </div>
        <p>
          This structured approach allows a screen reader to announce "JSON Object Difference", then navigate to
          "Property name: name", then "Property name: age. Changed. Original value: 30. Changed to: 31", and "Property
          name: city. Added. Added value: London".
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <TextQuote className="w-5 h-5" /> Providing Textual Summaries
        </h3>
        <p>
          Supplementing the visual diff with a textual summary can be highly beneficial. This summary could list the
          number of additions, deletions, and changes, and perhaps even list the paths of the changed properties.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Textual Summary Example:</h4>
          <p>Summary of changes: 1 property added, 1 property changed.</p>
          <ul>
            <li>
              Property <code>age</code> changed from 30 to 31.
            </li>
            <li>
              Property <code>city</code> added with value "London".
            </li>
          </ul>
        </div>
        <p>
          This provides a high-level overview that is easily consumed by screen readers and can help users quickly
          understand the scope of changes before diving into the detailed diff.
        </p>

        <h3 className="text-xl font-semibold mt-6">3. High Contrast and Non-Color Indicators</h3>
        <p className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Don't rely on color alone. Use additional visual indicators:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Icons:</strong> Small icons next to changed/added/deleted items (
            <MoveVertical className="inline w-4 h-4" /> for changed,{" "}
            <span className="inline-block transform rotate-90 scale-x-[-1]">
              {" "}
              <MoveVertical className="inline w-4 h-4 text-green-600 dark:text-green-400" />
            </span>{" "}
            for added,{" "}
            <span className="inline-block transform rotate-90">
              {" "}
              <MoveVertical className="inline w-4 h-4 text-red-600 dark:text-red-400" />
            </span>{" "}
            for deleted - conceptual use of MoveVertical)
          </li>
          <li>
            <strong>Underlines/Overlines:</strong> Different styles for underlines or overlines.
          </li>
          <li>
            <strong>Bold/Italic Text:</strong> Use text formatting judiciously.
          </li>
          <li>
            <strong>Border/Background Patterns:</strong> While less common for text diffs, patterns could be used for
            larger blocks.
          </li>
        </ul>
        <p>Ensure sufficient color contrast ratios for any colors used, even if they are supplementary indicators.</p>

        <h3 className="text-xl font-semibold mt-6">4. Keyboard Navigation and Focus Management</h3>
        <p>
          Users navigating with keyboards or assistive technologies need a clear and logical tab order. Ensure focus
          indicators are visible. Consider adding keyboard shortcuts to jump between changes.
        </p>
        <p>
          If using a tree-like structure for the JSON diff, ensure the tree is navigable with arrow keys according to
          standard tree view interaction patterns.
        </p>

        <h3 className="text-xl font-semibold mt-6">5. ARIA Attributes</h3>
        <p>
          Use ARIA (Accessible Rich Internet Applications) attributes to provide additional context to assistive
          technologies where native HTML semantics are insufficient.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>aria-label</code> or <code>aria-describedby</code>: Provide concise descriptions for changed elements,
            indicating if something was added, deleted, or changed, and perhaps summarizing the change.
          </li>
          <li>
            <code>role</code>: If using custom interactive elements (though we aim for static here), assign appropriate
            roles like <code>role="treeitem"</code> for tree views.
          </li>
          <li>
            <code>aria-atomic</code> and <code>aria-live</code>: Potentially used if the diff view updates dynamically,
            but less relevant for a static display.
          </li>
        </ul>
        <p>
          Example using <code>aria-label</code> on a diff line container:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">ARIA Example:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`&lt;div role="listitem" aria-label="Line 5: Changed."&gt;
  &lt;span className="line-number"&gt;5&lt;/span&gt;
  &lt;span className="line-content line-changed"&gt;  "age": &lt;del&gt;30&lt;/del&gt; &lt;ins&gt;31&lt;/ins&gt;&lt;/span&gt;
&lt;/div&gt;`}
          </pre>
          <p className="mt-2">
            (Conceptual use of <code>&lt;del&gt;</code> and <code>&lt;ins&gt;</code> tags, which have semantic meaning).
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">6. Handling Large Diffs and Navigation</h3>
        <p>Large JSON diffs can be overwhelming. Consider features that help users navigate:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Summaries per Section:</strong> If the JSON is structured (e.g., contains logical sections), provide
            summaries for changes within each section.
          </li>
          <li>
            <strong>Jump to Next/Previous Change:</strong> Provide controls or keyboard shortcuts to easily move between
            points of difference.
          </li>
          <li>
            <strong>Expand/Collapse:</strong> For tree-based views, allow collapsing unchanged branches to focus on the
            parts that matter. Ensure the expand/collapse state is accessible.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Eye className="w-6 h-6" /> Implementing an Accessible Diff View
        </h2>
        <p>Implementing these concepts involves several steps:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Parsing the JSON and the Diff:</strong> Use a library that not only computes the difference but can
            also output a structured representation of the changes (e.g., a list of added/deleted/changed paths and
            values).
          </li>
          <li>
            <strong>Rendering with Semantic HTML:</strong> Instead of rendering lines, render the JSON structure
            (objects, arrays, key-value pairs) using appropriate HTML elements (e.g., <code>&lt;dl&gt;</code>,
            <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code> for object properties; <code>&lt;ul&gt;</code>
            or <code>&lt;ol&gt;</code> for arrays).
          </li>
          <li>
            <strong>Marking Changes Semantically:</strong> Wrap changed parts with elements that convey meaning (e.g.,
            using classes like <code>.added</code>, <code>.deleted</code>, <code>.changed</code>, or even native
            elements like <code>&lt;ins&gt;</code> and <code>&lt;del&gt;</code> carefully). Add visually hidden text or
            ARIA attributes to explain the change for screen readers.
          </li>
          <li>
            <strong>Styling:</strong> Use CSS to apply visual indicators (colors, icons, borders) based on the semantic
            classes, ensuring good contrast. Do not use <code>!important</code> unless absolutely necessary, and allow
            users to override styles if possible (e.g., via browser extensions).
          </li>
          <li>
            <strong>Adding ARIA and Keyboard Support:</strong> Enhance interactive elements (if any) and key change
            locations with ARIA attributes and ensure full keyboard navigability.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Building accessible JSON diff views requires moving beyond simple line-based, color-coded visualizations. By
          focusing on semantic structure, providing textual alternatives, using non-color indicators, and implementing
          proper keyboard and ARIA support, developers can create tools that are usable and effective for everyone,
          including users with vision impairments. This not only expands the potential user base but also leads to a
          more robust and maintainable codebase through structured representation of data differences.
        </p>
      </div>
    </>
  );
}

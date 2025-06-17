import type { Metadata } from "next";
import {
  Grid,
  Palette,
  Component,
  Code,
  ListTree,
  Diff,
  Copy,
  Lightbulb,
  Accessibility,
  BookOpenText,
  ChevronRight,
  ChevronDown,
  MoonStar,
  CheckCheck,
  X,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Design System for JSON Formatting Tools | Offline Tools",
  description:
    "Explore the process and benefits of creating a design system tailored for JSON formatting, validation, and transformation tools.",
};

export default function DesignSystemJsonToolsArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Crafting a Design System for JSON Formatting Tools</h1>

        <section className="space-y-6">
          <p>
            Building effective tools for developers, especially those dealing with data like JSON, requires more than
            just robust functionality. A well-designed user interface significantly enhances usability, reduces
            cognitive load, and builds user trust. This is where a <strong>Design System</strong> becomes invaluable.
          </p>
          <p>
            For JSON formatting, validation, and transformation tools, a dedicated design system ensures consistency
            across different features (formatter, validator, diff checker, converter), streamlines the development
            process, and provides a cohesive user experience. This article explores the key considerations and
            components involved in creating such a system.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4 flex items-center">
            <Grid className="mr-3 text-blue-500" size={28} /> What is a Design System?
          </h2>
          <p>
            A design system is a comprehensive set of standards, guidelines, and reusable components that teams use to
            build consistent digital products. It&apos;s not just a style guide; it&apos;s a living library of patterns,
            principles, and practices that ensure coherence and efficiency in design and development workflows.
          </p>
          <p>
            For a suite of JSON tools, this means defining how input areas look, how formatted JSON is presented, how
            errors are displayed, the style of buttons, spacing rules, typography, and more.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4 flex items-center">
            <Lightbulb className="mr-3 text-yellow-500" size={28} /> Why a Design System for JSON Tools?
          </h2>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>
              <strong>Consistency:</strong> Ensures the same visual language and interaction patterns are used whether
              the user is formatting, validating, or comparing JSON. This reduces confusion and makes the tools
              intuitive.
            </li>
            <li>
              <strong>Efficiency:</strong> Developers and designers work faster by using pre-built, documented
              components instead of designing and coding from scratch every time.
            </li>
            <li>
              <strong>Scalability:</strong> As new features or tools are added, the design system provides a framework
              to maintain consistency without reinventing the wheel.
            </li>
            <li>
              <strong>Quality & Maintainability:</strong> Centralizing design decisions makes updates easier and reduces
              the likelihood of design drift or inconsistencies creeping in over time.
            </li>
            <li>
              <strong>User Experience:</strong> A predictable and coherent interface builds trust and makes the tools
              more pleasant and effective to use.
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4 flex items-center">
            <Component className="mr-3 text-green-500" size={28} /> Core Components & Considerations
          </h2>

          <h3 className="text-2xl font-semibold mt-6 flex items-center">
            <Palette className="mr-2 text-red-400" /> Colors & Typography
          </h3>
          <p>
            Define a clear color palette, including primary, secondary, accent, success, warning, and error colors.
            Crucially, consider defining colors for syntax highlighting within JSON code blocks. Typography rules should
            cover fonts, sizes, weights, and line heights for headings, body text, and code.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
            <h4 className="text-xl font-medium mb-2">Example: Syntax Highlighting Colors</h4>
            <p className="text-sm">Define roles like:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                <code>--color-json-key: #a77e10;</code> (e.g., a shade of brown/orange)
              </li>
              <li>
                <code>--color-json-string: #067d17;</code> (e.g., a shade of green)
              </li>
              <li>
                <code>--color-json-number: #1a0dad;</code> (e.g., a shade of blue)
              </li>
              <li>
                <code>--color-json-boolean: #880080;</code> (e.g., a shade of purple)
              </li>
              <li>
                <code>--color-json-null: #880080;</code> (e.g., same as boolean)
              </li>
              <li>
                <code>--color-json-punctuation: #333;</code> (e.g., a dark grey)
              </li>
            </ul>
            <p className="mt-2 text-sm font-mono">
              Define these as CSS variables or tokens for easy management, including dark mode variants.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mt-6 flex items-center">
            <Code className="mr-2 text-purple-500" /> Code Input/Output Areas
          </h3>
          <p>These are central to JSON tools. The design system should specify:</p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>Visual style of the text areas (borders, background, padding).</li>
            <li>Scrollbar styling.</li>
            <li>Syntax highlighting rules based on the color palette.</li>
            <li>Handling of line numbers (optional but helpful).</li>
            <li>Read-only vs. editable states.</li>
            <li>Placeholder text style.</li>
            <li>Error highlighting (e.g., red underline for invalid JSON).</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-6 flex items-center">
            <ListTree className="mr-2 text-teal-500" /> Visualizing Hierarchy and Structure
          </h3>
          <p>
            JSON&apos;s nested nature means tools often need to visualize its structure, especially in tree views or
            collapsed sections. The design system should define:
          </p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>
              Styles for expansion/collapse toggles (e.g., arrows <ChevronRight /> / <ChevronDown />
              ).
            </li>
            <li>Indentation levels.</li>
            <li>Visual cues for different data types (object, array, string, number, boolean, null).</li>
            <li>Hover states for elements.</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-6 flex items-center">
            <Diff className="mr-2 text-orange-500" /> Diff and Comparison Views
          </h3>
          <p>Tools comparing two JSON inputs need a consistent way to highlight differences. Define styles for:</p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>Added lines/values.</li>
            <li>Deleted lines/values.</li>
            <li>Changed lines/values.</li>
            <li>Line-by-line or character-by-character diff highlighting.</li>
          </ul>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-sm">
            <h4 className="text-xl font-medium mb-2">Example: Diff Styling (CSS)</h4>
            <pre className="whitespace-pre-wrap break-all">
              {`/* Assuming a structure where lines are wrapped in a diff component */
.diff-added {
  background-color: rgba(144, 238, 144, 0.3); /* Light green */
  border-left: 3px solid #32cd32; /* Lime green */
}

.diff-deleted {
  background-color: rgba(250, 128, 114, 0.3); /* Light coral */
  border-left: 3px solid #f08080; /* Light red */
}

.diff-changed {
  background-color: rgba(173, 216, 230, 0.3); /* Light blue */
  border-left: 3px solid #add8e6; /* Light blue */
}

/* Optional: highlight changes within a line */
.diff-changed span.highlight {
  background-color: rgba(255, 255, 0, 0.5); /* Yellow */
  border-radius: 2px;
}`}
            </pre>
          </div>

          <h3 className="text-2xl font-semibold mt-6 flex items-center">
            Buttons & Actions (<Copy className="mx-1 text-blue-600" />)
          </h3>
          <p>
            Clearly define styles for primary, secondary, and tertiary buttons, including states (hover, active,
            disabled). Specific actions like &quot;Format&quot;, &quot;Validate&quot;, &quot;Copy&quot;,
            &quot;Clear&quot; should use consistent button styles. Icons (like <Copy /> for copy) should also have
            defined sizes and spacing relative to text.
          </p>

          <h3 className="text-2xl font-semibold mt-6 flex items-center">
            <Accessibility className="mr-2 text-indigo-500" /> Accessibility
          </h3>
          <p>A crucial part of any design system. For JSON tools, this includes:</p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>Ensuring sufficient color contrast, especially for syntax highlighting and text areas.</li>
            <li>Defining keyboard navigation and focus states for all interactive elements.</li>
            <li>Using ARIA attributes where necessary for complex widgets.</li>
            <li>Providing text alternatives for icons.</li>
            <li>Designing for different screen sizes and zoom levels.</li>
            <li>
              Implementing dark mode/themes correctly (<MoonStar className="inline mx-0.5" />
              ).
            </li>
          </ul>

          <h3 className="text-2xl font-semibold mt-6 flex items-center">Error and Success States</h3>
          <p>
            How does the tool communicate success (e.g., &quot;JSON is valid&quot;), warnings, or errors (&quot;Invalid
            JSON&quot;)?
          </p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>
              Consistent visual treatment (color, icons like <CheckCheck className="inline mx-0.5 text-green-600" /> for
              success, <X className="inline mx-0.5 text-red-600" /> for errors).
            </li>
            <li>Placement of messages (e.g., above or below the input area).</li>
            <li>Linking errors to specific lines in the JSON input if possible.</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4 flex items-center">
            Implementing and Documenting the System
          </h2>
          <p>A design system is only effective if it&apos;s accessible and easy to use by the team.</p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>
              <BookOpenText className="inline mr-2 text-blue-400" /> Documentation: Create a central place (e.g., a
              dedicated website) documenting all components, principles, and usage guidelines. Show examples of
              components in different states.
            </li>
            <li>
              Component Library: Implement the design system components as reusable UI components (e.g., React, Vue, Web
              Components). This is the practical toolkit for developers.
            </li>
            <li>
              Tooling: Use tools like Storybook to develop, document, and test UI components in isolation. Implement
              linting rules to enforce design system usage where possible.
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Conclusion</h2>
          <p>
            Creating a design system for JSON formatting tools is an investment that pays off by leading to a more
            consistent, maintainable, and user-friendly product suite. By thoughtfully defining core visual styles,
            component behaviors, and specific considerations for handling structured data like JSON, teams can build
            robust tools that developers love to use. It transforms a collection of utilities into a cohesive, polished
            experience.
          </p>
        </section>
      </article>
    </div>
  );
}

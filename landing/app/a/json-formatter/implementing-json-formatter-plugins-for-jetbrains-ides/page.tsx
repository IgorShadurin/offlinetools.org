import type { Metadata } from "next";
import { Code, Settings, CheckCheck, Info, Feather, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Implementing JSON Formatter Plugins for JetBrains IDEs",
  description:
    "A comprehensive guide on building custom JSON formatter plugins for IntelliJ IDEA, PyCharm, WebStorm, and other JetBrains IDEs.",
};

export default function JsonFormatterPluginArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Feather className="w-8 h-8 mr-3 text-blue-500" />
        Implementing JSON Formatter Plugins for JetBrains IDEs
      </h1>

      <div className="space-y-6">
        <p>
          JetBrains IDEs like IntelliJ IDEA, PyCharm, WebStorm, and others are renowned for their powerful code
          formatting capabilities. While they come with excellent built-in formatters for many languages, you might
          encounter scenarios where you need a custom formatter for a specific JSON dialect, a configuration file using
          JSON-like syntax, or simply want to tailor the default formatting behavior more precisely than the standard
          settings allow. This is where plugin development comes in.
        </p>
        <p>
          Implementing a formatter as a JetBrains plugin involves diving into the IDE's internal APIs, particularly
          those related to parsing, syntax trees, and code style. This article provides a conceptual overview and guides
          you through the key components required to build a JSON formatter plugin.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="w-6 h-6 mr-2 text-blue-500" />
          Understanding the JetBrains Platform
        </h2>
        <p>
          JetBrains IDEs are built on the IntelliJ Platform. Plugins extend the functionality of this platform. For
          language-specific features like parsing, highlighting, code completion, and formatting, you'll typically
          develop a "Language Plugin". A formatter is a specific component within a language plugin.
        </p>
        <p>
          The core concept behind most IDE features, including formatting, is the Abstract Syntax Tree (AST) or more
          specifically, the Program Structure Interface (PSI). The IDE first parses your code into a PSI tree, which is
          a hierarchical representation of the code's structure. The formatter then traverses this tree and applies
          formatting rules.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-blue-500" />
          Key Components for Formatting
        </h2>
        <p>
          To implement a formatter, you'll need to define several components and link them together via your plugin's
          configuration file (`plugin.xml`). The main components involved in formatting are:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Language Definition:</strong> You need to define a specific <code>com.intellij.lang.Language</code>{" "}
            instance for JSON (or your custom JSON-like language). While a standard JSON language is built-in, for a
            custom formatter, you might need to override aspects or define a new language ID if it's a variation.
          </li>
          <li>
            <strong>Parser Definition:</strong> A <code>com.intellij.lang.ParserDefinition</code> tells the IDE how to
            parse your language's text into a PSI tree. This is crucial because the formatter operates on this tree
            structure.
          </li>
          <li>
            <strong>Formatter Provider:</strong> A <code>com.intellij.psi.codeStyle.LanguageInjector</code> is used to
            inject a formatter into specific contexts, but for a primary language formatter, you mostly rely on standard
            extensions. The core formatting logic is provided via a{" "}
            <code>com.intellij.psi.codeStyle.FormattingModelBuilder</code>.
          </li>
          <li>
            <strong>Formatting Model Builder:</strong> The <code>FormattingModelBuilder</code> creates a{" "}
            <code>com.intellij.psi.codeStyle.FormattingModel</code> for a given PSI element. This model contains the
            structure (using "Blocks") and rules for formatting.
          </li>
          <li>
            <strong>Block Implementation:</strong> This is the heart of the formatter. You'll create classes
            implementing <code>com.intellij.formatting.Block</code> (often by extending{" "}
            <code>com.intellij.formatting.AbstractBlock</code> or similar base classes provided by the platform). Each
            Block corresponds to a node or a range of nodes in the PSI tree and is responsible for:
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Providing child Blocks.</li>
              <li>Defining indentation rules relative to its parent.</li>
              <li>Defining spacing rules before and after itself and its children.</li>
              <li>Defining wrapping rules (e.g., whether an array should wrap items).</li>
              <li>Handling alignment.</li>
            </ul>
          </li>
          <li>
            <strong>Code Style Settings:</strong> To make your formatter configurable via the IDE's settings dialog,
            you'll implement classes extending <code>com.intellij.psi.codeStyle.CodeStyleSettings</code> and integrate a
            settings panel using Swing or Kotlin UI DSL.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-blue-500" />
          Conceptual Implementation Steps
        </h2>
        <p>
          Here's a simplified outline of the process you'd follow in Java or Kotlin within the IntelliJ Platform SDK:
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Set up the Development Environment</h3>
        <p>
          You'll need the IntelliJ Platform SDK, typically managed via Gradle. Create a new plugin project using the
          SDK.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Define Your Language and Parser</h3>
        <p>
          Create classes for your language (e.g., <code>JsonishLanguage</code>) and its parser definition (e.g.,{" "}
          <code>JsonishParserDefinition</code>). The parser definition links your lexer and parser implementations to
          the language.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example plugin.xml snippet (conceptual):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`&lt;extensions defaultExtensionNs="com.intellij"&gt;
  &lt;language implementationClass="com.example.JsonishLanguage" id="Jsonish" /&gt;
  &lt;lang.parserDefinition implementationClass="com.example.JsonishParserDefinition" lang="Jsonish" /&gt;
  &lt;!-- Other language features like Lexer, Commenter, etc. --&gt;
&lt;/extensions&gt;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Implement the Formatting Model Builder</h3>
        <p>
          Create a class (e.g., <code>JsonishFormattingModelBuilder</code>) that implements{" "}
          <code>FormattingModelBuilder</code>. Its main method, <code>createModel</code>, will take a PSI element and
          return a <code>FormattingModel</code>. This model is built around your custom <code>Block</code>{" "}
          implementation.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example plugin.xml snippet (conceptual):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`&lt;extensions defaultExtensionNs="com.intellij"&gt;
  &lt;!-- ... language and parser definitions ... --&gt;
  &lt;lang.formatter implementationClass="com.example.JsonishFormattingModelBuilder" lang="Jsonish" /&gt;
&lt;/extensions&gt;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">4. Develop Your Block Implementation</h3>
        <p>
          This is the most complex part. You'll likely create a class like <code>JsonishBlock</code> (extending{" "}
          <code>AbstractBlock</code> or similar).
        </p>
        <p>
          Inside your <code>JsonishBlock</code>:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The <code>buildChildren()</code> method recursively creates child <code>Block</code> objects for the
            children of the current PSI element.
          </li>
          <li>
            The <code>getIndent()</code> method returns the indentation for the current block based on its type (e.g.,
            increase indent inside objects and arrays).
          </li>
          <li>
            The <code>getSpacing()</code> method defines spaces between child elements (e.g., space after colon, space
            after comma). This uses the <code>com.intellij.formatting.SpacingBuilder</code>.
          </li>
          <li>
            The <code>getWrap()</code> method defines wrapping rules (e.g., wrap array elements if they exceed line
            length).
          </li>
          <li>
            The <code>getAlignment()</code> method defines alignment rules (e.g., align colons in an object).
          </li>
        </ul>
        <p>
          You'll need to identify the specific PSI element types produced by your parser (e.g., object, array, property,
          key, value, comma, colon) and write logic in your <code>JsonishBlock</code> to handle the formatting rules for
          each type.
        </p>

        <h3 className="text-xl font-semibold mt-6">5. Add Code Style Settings (Optional but Recommended)</h3>
        <p>
          Implement classes to manage settings and create a UI panel. This allows users to customize indentation size,
          spacing options, etc., for your formatter. This involves working with{" "}
          <code>com.intellij.psi.codeStyle.CodeStyleSettingsProvider</code> and{" "}
          <code>com.intellij.psi.codeStyle.CustomCodeStyleSettings</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example plugin.xml snippet (conceptual):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`&lt;extensions defaultExtensionNs="com.intellij"&gt;
  &lt;!-- ... other definitions ... --&gt;
  &lt;codeStyleSettingsProvider implementation="com.example.JsonishCodeStyleSettingsProvider" /&gt;
&lt;/extensions&gt;`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-blue-500" />
          Formatting Logic Details
        </h2>
        <p>
          Implementing the <code>Block</code> logic is where most of your effort will go.
        </p>

        <h3 className="text-xl font-semibold mt-6">Indentation</h3>
        <p>
          Use <code>com.intellij.formatting.Indent.getIndent()</code> factory methods. Common types include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>Indent.getNoneIndent()</code>: No indentation (for elements at the top level or within containers that
            don't indent their children).
          </li>
          <li>
            <code>Indent.getNormalIndent()</code>: Standard indentation level (for children of objects/arrays).
          </li>
          <li>
            <code>Indent.getSmartIndent(type)</code>: Context-aware indentation.
          </li>
        </ul>
        <p>
          You'll typically define that children of object (&#x7b;...&#x7d;) and array ([&#x7b;...&#x7d;]) PSI elements
          get <code>NormalIndent</code> relative to their parent block.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Indentation Logic (within a Block class):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`// In JsonishBlock.getIndent()
if (psiElement.getParent() != null &&
    (psiElement.getParent().getNode().getElementType() == JsonishElementTypes.OBJECT ||
     psiElement.getParent().getNode().getElementType() == JsonishElementTypes.ARRAY)) {
  return Indent.getNormalIndent();
}
return Indent.getNoneIndent();`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Spacing</h3>
        <p>
          Use <code>com.intellij.formatting.SpacingBuilder</code>. You define rules like:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Space before/after tokens (e.g., require one space after a colon).</li>
          <li>Spaces around operators (not applicable to standard JSON, but relevant for JSON-like syntaxes).</li>
          <li>Blank lines (e.g., minimum blank lines between top-level elements).</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Spacing Logic (using SpacingBuilder):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`// In JsonishFormattingModelBuilder, initialize SpacingBuilder
private static SpacingBuilder createSpaceBuilder(CodeStyleSettings settings) {
  return new SpacingBuilder(settings, JsonishLanguage.INSTANCE)
    .after(JsonishTokenTypes.COLON).singleSpace() // Space after colon
    .before(JsonishTokenTypes.COLON).none()      // No space before colon
    .after(JsonishTokenTypes.COMMA).singleSpace() // Space after comma
    .around(JsonishTokenTypes.EQ).singleSpace()   // Example for '=' if syntax uses it
    .withinPair(JsonishTokenTypes.LBRACE, JsonishTokenTypes.RBRACE).spaceIf(settings.SPACE_WITHIN_BRACES, true) // Space inside {}
    .withinPair(JsonishTokenTypes.LBRACKET, JsonishTokenTypes.RBRACKET).spaceIf(settings.SPACE_WITHIN_BRACKETS, true); // Space inside []
}

// In JsonishBlock.getSpacing()
return spacingBuilder.getSpacing(getParent(), psiElement, child.getNode());`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Wrapping and Alignment</h3>
        <p>
          Use <code>com.intellij.formatting.Wrap.createWrap()</code> and{" "}
          <code>com.intellij.formatting.Alignment.createAlignment()</code>. These are used within your Block's{" "}
          <code>buildChildren()</code> method to associate wrapping or alignment rules with specific child blocks.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Wrapping: You can enforce wrapping (<code>Wrap.createWrap(WrapType.ALWAYS, true)</code>), wrap if needed (
            <code>WrapType.CHOP_DOWN_IF_NECCESSARY</code>), etc. Useful for putting object properties or array elements
            on new lines.
          </li>
          <li>Alignment: Useful for aligning elements like the colons in object properties or values in an array.</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Wrap/Alignment (within buildChildren):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`// Inside JsonishBlock.buildChildren() loop, when adding child blocks:
// Example: Wrap and align property values in an object
if (childPsi.getNode().getElementType() == JsonishElementTypes.PROPERTY_VALUE) {
  Block childBlock = new JsonishBlock(childPsi, getAlignment(), getIndent(), getWrap(), spacingBuilder, settings);
  blocks.add(childBlock);
} else {
  // ... handle other types ...
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCheck className="w-6 h-6 mr-2 text-blue-500" />
          Putting It Together (Conceptual)
        </h2>
        <p>
          Your <code>FormattingModelBuilder</code> will typically:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Get the root PSI element for the file/code fragment.</li>
          <li>
            Create a root <code>JsonishBlock</code> for this element.
          </li>
          <li>
            Initialize a <code>SpacingBuilder</code> with rules based on the current code style settings.
          </li>
          <li>
            Pass the <code>SpacingBuilder</code> and settings down through the recursive creation of child blocks in the{" "}
            <code>buildChildren()</code> method of your <code>JsonishBlock</code>.
          </li>
          <li>
            The <code>getSpacing()</code> method in each block uses the <code>SpacingBuilder</code> to determine spacing
            between its own children.
          </li>
          <li>
            The <code>getIndent()</code>, <code>getWrap()</code>, and <code>getAlignment()</code> methods define rules
            applied *to* the current block relative to its parent, or applied *to* its children.
          </li>
        </ol>
        <p>
          The IDE's formatting engine then uses this model of blocks and rules to calculate the desired layout and apply
          changes to the document.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertCircle className="w-6 h-6 mr-2 text-blue-500" />
          Challenges and Tips
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>PSI Tree Understanding:</strong> The biggest hurdle is understanding the structure of the PSI tree
            generated by your parser (or the standard JSON parser). Use the "PsiViewer" plugin in the IDE Dev instance
            to inspect the tree for example JSON code.
          </li>
          <li>
            <strong>SpacingBuilder Complexity:</strong> Configuring the <code>SpacingBuilder</code> for all token types
            and contexts can be tricky. Start simple and add rules incrementally.
          </li>
          <li>
            <strong>Debugging:</strong> Debugging formatter code can be challenging. Use logging and the IDE's debugging
            tools extensively while running a Dev instance of the IDE with your plugin.
          </li>
          <li>
            <strong>Performance:</strong> Formatting is a frequent operation. Ensure your block creation and rule
            application logic is efficient to avoid performance bottlenecks. Avoid excessive PSI traversals within
            formatting methods.
          </li>
          <li>
            <strong>Testing:</strong> Write tests for your formatter. The platform provides testing utilities for
            formatting.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Feather className="w-6 h-6 mr-2 text-blue-500" />
          Conclusion
        </h2>
        <p>
          Building a custom formatter plugin for JetBrains IDEs, even for a seemingly simple format like JSON, is a
          non-trivial task that requires understanding the IntelliJ Platform's architecture, particularly its PSI and
          formatting APIs. However, it offers immense power to create highly tailored code style experiences. By
          defining your language elements, building a robust PSI tree, and implementing the <code>Block</code> structure
          with precise rules for indentation, spacing, wrapping, and alignment, you can integrate a professional-grade
          formatter directly into the developer's workflow within their preferred IDE. While this article provides a
          high-level overview, the actual implementation details reside within the IntelliJ Platform SDK documentation
          and require coding in Java or Kotlin.
        </p>
      </div>
    </>
  );
}

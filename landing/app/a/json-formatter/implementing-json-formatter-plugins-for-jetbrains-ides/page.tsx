import type { Metadata } from "next";
import { Code, Settings, CheckCheck, Info, Feather, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Build a JSON Formatter Plugin for JetBrains IDEs",
  description:
    "Current IntelliJ Platform guidance for building a JSON formatter plugin, including lang.formatter, AsyncDocumentFormattingService, code style settings, and testing.",
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
          JetBrains IDEs already ship with a capable formatter for standard JSON. A custom plugin makes sense when you
          need more than the built-in JSON code style settings can provide: support for a JSON-like language, a
          canonical house style, schema-aware formatting, or delegation to an external formatter that already exists in
          your toolchain.
        </p>
        <p>
          The key decision is choosing the right IntelliJ Platform integration point. In the current JetBrains SDK
          docs, built-in formatter logic lives behind <code>com.intellij.lang.formatter</code>, external formatter
          integrations use <code>com.intellij.formattingService</code>, and structural edits that go beyond whitespace
          belong in a <code>PostFormatProcessor</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="w-6 h-6 mr-2 text-blue-500" />
          Choose the Right Formatter Strategy
        </h2>
        <p>
          Before you write any plugin code, decide which of these paths matches your actual problem:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Use the built-in JSON formatter</strong> if you only need different indentation, wrapping, or
            spacing defaults for plain <code>.json</code> files.
          </li>
          <li>
            <strong>Use a custom language formatter</strong> if your plugin owns a JSON dialect or JSON-like file type
            and the IDE should compute spacing, indents, wraps, and alignment directly from PSI.
          </li>
          <li>
            <strong>Use an external formatting service</strong> if your formatter already exists as a CLI or another
            executable and your plugin should delegate instead of recreating every rule in <code>Block</code> logic.
          </li>
          <li>
            <strong>Use post-format processing</strong> if you need token or syntax changes after formatting, such as
            adding commas, rewriting quotes, or inserting boilerplate.
          </li>
        </ul>
        <p>
          For most "JSON formatter plugin" use cases, the real choice is between a custom{" "}
          <code>FormattingModelBuilder</code> and an <code>AsyncDocumentFormattingService</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-blue-500" />
          What a Current JetBrains Formatter Plugin Needs
        </h2>
        <p>
          If you are formatting a custom JSON dialect inside the IDE, these are the parts that matter today:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Parser definition:</strong> your formatter only works well if the PSI tree cleanly represents
            objects, arrays, properties, literals, commas, colons, and any extensions such as comments or trailing
            commas.
          </li>
          <li>
            <strong>
              <code>FormattingModelBuilder</code>
            </strong>
            : this builds the root formatting model from the current <code>FormattingContext</code>.
          </li>
          <li>
            <strong>
              <code>AbstractBlock</code>-based block tree
            </strong>
            : blocks usually mirror PSI nodes and decide indent, spacing, wrapping, and alignment.
          </li>
          <li>
            <strong>
              <code>SpacingBuilder</code>
            </strong>
            : this is still the simplest way to express JSON punctuation rules such as no space before a colon and one
            space after it.
          </li>
          <li>
            <strong>
              <code>getChildAttributes()</code> and <code>isIncomplete()</code>
            </strong>
            : these are easy to skip, but they drive how the IDE indents new lines when users press Enter in partially
            typed JSON.
          </li>
          <li>
            <strong>Code style settings providers:</strong> expose only the toggles users actually expect, such as
            indent size, spaces after <code>:</code>, spaces within braces, wrapping of arrays, or alignment behavior.
          </li>
        </ul>
        <p>
          One current SDK caveat matters a lot: JetBrains documents that the formatter primarily controls whitespace
          between adjacent leaf blocks. If your plugin must sort keys, insert missing syntax, or rewrite tokens, do
          that in a post-processor or an external formatter instead of forcing it into spacing rules.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-blue-500" />
          Minimal Registration and Builder Example
        </h2>
        <p>
          For a custom JSON-like language, the current formatter registration is centered on{" "}
          <code>com.intellij.lang.formatter</code>. The important detail is that the formatter extension now uses the{" "}
          <code>language</code> attribute:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">plugin.xml (formatter-related parts)</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`<extensions defaultExtensionNs="com.intellij">
  <lang.parserDefinition
      language="Jsonish"
      implementationClass="com.example.jsonish.JsonishParserDefinition" />

  <lang.formatter
      language="Jsonish"
      implementationClass="com.example.jsonish.JsonishFormattingModelBuilder" />

  <codeStyleSettingsProvider
      implementation="com.example.jsonish.JsonishCodeStyleSettingsProvider" />

  <langCodeStyleSettingsProvider
      implementation="com.example.jsonish.JsonishLanguageCodeStyleSettingsProvider" />

  <fileTypeIndentOptionsProvider
      implementation="com.example.jsonish.JsonishIndentOptionsProvider" />
</extensions>`}
            </pre>
          </div>
        </div>
        <p>
          A minimal builder should create a PSI-based formatting model, not a fully custom formatting engine:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Kotlin example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`final class JsonishFormattingModelBuilder : FormattingModelBuilder {
  override fun createModel(formattingContext: FormattingContext): FormattingModel {
    val settings = formattingContext.codeStyleSettings
    val rootBlock = JsonishBlock(
      formattingContext.node,
      Wrap.createWrap(WrapType.NONE, false),
      Alignment.createAlignment(),
      createSpacingBuilder(settings)
    )

    return FormattingModelProvider.createFormattingModelForPsiFile(
      formattingContext.containingFile,
      rootBlock,
      settings
    )
  }

  private fun createSpacingBuilder(settings: CodeStyleSettings) =
    SpacingBuilder(settings, JsonishLanguage)
      .before(JsonishTypes.COLON).none()
      .after(JsonishTypes.COLON).spaceIf(true)
      .before(JsonishTypes.COMMA).none()
      .after(JsonishTypes.COMMA).spaceIf(true)
}`}
            </pre>
          </div>
        </div>
        <p>
          The <code>JsonishBlock</code> class should usually extend <code>AbstractBlock</code>, recursively build child
          blocks for non-whitespace nodes, and compute indentation from container types such as objects and arrays.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-blue-500" />
          Code Style Settings Users Actually Need
        </h2>
        <p>
          A formatter plugin feels incomplete if users cannot discover or change its behavior in Settings. The current
          JetBrains tutorial flow still uses three pieces:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>CustomCodeStyleSettings</code> for your language-specific options.
          </li>
          <li>
            <code>CodeStyleSettingsProvider</code> to create the settings object and the settings page.
          </li>
          <li>
            <code>LanguageCodeStyleSettingsProvider</code> to expose standard spacing, blank-line, and wrapping
            controls plus a code sample.
          </li>
        </ul>
        <p>
          If your JSON dialect should default to two-space indents, tabs disabled, or another nonstandard indent
          behavior, add a <code>FileTypeIndentOptionsProvider</code> too. That keeps your defaults explicit instead of
          depending on whatever the user last configured globally.
        </p>
        <p>
          Keep the setting surface small. JSON users typically expect predictable indentation, colon and comma spacing,
          wrapping rules for long arrays and objects, and maybe whether properties should align. Anything more complex
          quickly turns into noise unless your dialect has real extra syntax.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCheck className="w-6 h-6 mr-2 text-blue-500" />
          Testing, Debugging, and 2026 Compatibility Notes
        </h2>
        <p>
          Current JetBrains tutorials still run formatter plugins with the Gradle <code>runIde</code> task. In the IDE
          development instance, inspect your tree with the PsiViewer plugin or the built-in PSI viewer before you debug
          spacing bugs at the block layer.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Test nested objects and arrays with both short and long lines so wrapping decisions are obvious.
          </li>
          <li>
            Test incomplete JSON, because Enter handling depends on <code>getChildAttributes()</code> and{" "}
            <code>isIncomplete()</code>.
          </li>
          <li>
            Test any JSON extensions explicitly, such as comments, unquoted keys, trailing commas, or multiline string
            forms.
          </li>
          <li>
            Test large files, because formatting runs often and expensive PSI walks are noticeable.
          </li>
        </ul>
        <p>
          As of early 2026, JetBrains' public SDK docs still describe <code>lang.formatter</code> for in-IDE
          formatting, <code>AsyncDocumentFormattingService</code> for external formatters, and code style settings based
          on <code>CustomCodeStyleSettings</code>, <code>CodeStyleSettingsProvider</code>, and{" "}
          <code>LanguageCodeStyleSettingsProvider</code>. That is the baseline to target unless you have a strong reason
          to depend on newer internal APIs.
        </p>
        <p>
          Useful current references are the JetBrains{" "}
          <a
            href="https://plugins.jetbrains.com/docs/intellij/code-formatting.html"
            className="text-blue-600 underline dark:text-blue-400"
          >
            Code Formatter
          </a>{" "}
          docs, the{" "}
          <a
            href="https://plugins.jetbrains.com/docs/intellij/formatter.html"
            className="text-blue-600 underline dark:text-blue-400"
          >
            formatter tutorial step
          </a>
          , the{" "}
          <a
            href="https://plugins.jetbrains.com/docs/intellij/code-style-settings.html"
            className="text-blue-600 underline dark:text-blue-400"
          >
            code style settings guide
          </a>
          , and the{" "}
          <a
            href="https://plugins.jetbrains.com/docs/intellij/lexer-and-parser-definition.html"
            className="text-blue-600 underline dark:text-blue-400"
          >
            parser definition guide
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertCircle className="w-6 h-6 mr-2 text-blue-500" />
          Common Mistakes to Avoid
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Do not wire a primary formatter through <code>LanguageInjector</code>. That is the wrong API for this job.
          </li>
          <li>
            Do not assume a formatter can handle semantic rewrites. Whitespace formatting and document transformation are
            separate concerns in the platform.
          </li>
          <li>
            Do not copy the built-in JSON formatter unless you truly need a new language. If your files are standard
            JSON, a settings tweak is cheaper to build and easier to maintain.
          </li>
          <li>
            Do not ship an external formatter integration without clear failure handling when the binary is missing,
            slow, or returns invalid output.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Feather className="w-6 h-6 mr-2 text-blue-500" />
          Bottom Line
        </h2>
        <p>
          The modern way to build a JSON formatter plugin for JetBrains IDEs is straightforward once you pick the right
          extension point. Use <code>FormattingModelBuilder</code> and an <code>AbstractBlock</code> tree for a custom
          JSON language, use <code>AsyncDocumentFormattingService</code> when an external formatter should stay the
          source of truth, and keep structural rewrites out of spacing rules. That gives search visitors a realistic
          implementation path instead of an abstract tour of old APIs.
        </p>
      </div>
    </>
  );
}

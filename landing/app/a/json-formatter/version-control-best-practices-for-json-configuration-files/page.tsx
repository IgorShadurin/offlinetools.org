import type { Metadata } from "next";
import {
  GitCommitHorizontal,
  FileDiff,
  FolderTree,
  Settings,
  Shield,
  CheckCheck,
  FileCode,
  GripVertical,
  Waypoints,
  CodeXml,
  LockKeyhole,
  RefreshCw,
  GitPullRequest,
  ClipboardList,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Version Control Best Practices for JSON Configuration Files | Your Site Name",
  description:
    "Learn effective strategies for managing JSON configuration files using version control systems like Git.",
};

export default function JsonConfigVersionControl() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Version Control Best Practices for JSON Configuration Files</h1>

      <div className="space-y-6">
        <p>
          Configuration files are the backbone of many applications, defining everything from database connections and
          API endpoints to feature flags and user interface settings. JSON (JavaScript Object Notation) is a popular
          format for these configurations due to its simplicity, readability, and widespread support across languages.
          However, managing changes to JSON config files within a version control system like Git can present unique
          challenges.
        </p>
        <p>
          This article explores best practices for versioning your JSON configuration files, ensuring maintainability,
          reducing merge conflicts, and improving collaboration among developers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileDiff className="mr-2" size={24} />
          The Challenge: Merge Conflicts &amp; Readability
        </h2>
        <p>
          The primary challenge with JSON configuration files in version control is managing changes made by multiple
          developers simultaneously. JSON&apos;s structure (especially arrays and objects) can lead to frequent and
          sometimes confusing merge conflicts if not handled carefully. Poorly formatted or large, monolithic JSON files
          exacerbate these issues, making it hard to understand what changed between versions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCheck className="mr-2" size={24} />
          Core Principles
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Consistency is Key:</strong> Establish and enforce a consistent format for all JSON config files.
          </li>
          <li>
            <strong>Minimize Conflicts:</strong> Structure your configuration to reduce the likelihood and complexity of
            merge conflicts.
          </li>
          <li>
            <strong>Keep it Readable:</strong> Ensure changes are easy to review and understand.
          </li>
          <li>
            <strong>Security First:</strong> Never store sensitive data directly in version-controlled config files.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ClipboardList className="mr-2" size={24} />
          Best Practices in Detail
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <GitCommitHorizontal className="mr-2" size={20} />
          1. Atomic Commits for Config Changes
        </h3>
        <p>
          Just like code, configuration changes should be committed atomically. A single commit should represent a
          single logical change (e.g., adding a new feature flag, updating a service endpoint, changing a timeout
          value). Avoid bundling unrelated config changes into one commit, as this makes reverting or understanding
          history more difficult.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileCode className="mr-2" size={20} />
          2. Consistent Formatting (Indentation, Whitespace, Newlines)
        </h3>
        <p>
          Inconsistent formatting is a major cause of merge conflicts and diff noise. Ensure everyone on the team uses
          the same indentation (spaces or tabs), line endings, and spacing around keys/values, commas, and colons.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Bad (Inconsistent Formatting):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            &#x7b; &quot;app&quot;: &#x7b; &quot;name&quot;: &quot;My App&quot;, &quot;version&quot;: &quot;1.0&quot;
            &#x7d;, &quot;features&quot;: [ &#x7b; &quot;name&quot;: &quot;featureA&quot;, &quot;enabled&quot;: true
            &#x7d; ,&#x7b; &quot;name&quot;: &quot;featureB&quot;, &quot;enabled&quot;: false &#x7d;] &#x7d;
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Good (Consistent Formatting):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            &#x7b; &quot;app&quot;: &#x7b; &quot;name&quot;: &quot;My App&quot;, &quot;version&quot;: &quot;1.0&quot;
            &#x7d;, &quot;features&quot;: [ &#x7b; &quot;name&quot;: &quot;featureA&quot;, &quot;enabled&quot;: true
            &#x7d;, &#x7b; &quot;name&quot;: &quot;featureB&quot;, &quot;enabled&quot;: false &#x7d; ] &#x7d;
          </pre>
        </div>
        <p>
          Use code formatters (like Prettier, ESLint with formatting rules, or editor-specific formatters) and integrate
          them into your pre-commit hooks or CI pipeline to automate this.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <GripVertical className="mr-2" size={20} />
          3. Sort Keys Alphabetically
        </h3>
        <p>
          Within objects, sorting keys alphabetically dramatically reduces merge conflicts when keys are added or
          removed. If keys are unsorted, adding a new key can affect lines far from the actual change, causing
          unnecessary conflicts. Sorting ensures that changes to object properties are localized.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Bad (Unsorted Keys):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            &#x7b; &quot;api&quot;: &#x7b; &quot;timeout&quot;: 5000, &quot;baseUrl&quot;:
            &quot;https://api.example.com&quot; &#x7d;, &quot;logging&quot;: &#x7b; &quot;level&quot;: &quot;info&quot;
            &#x7d;, &quot;database&quot;: &#x7b; &quot;host&quot;: &quot;localhost&quot;, &quot;port&quot;: 5432 &#x7d;
            &#x7d;
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Good (Sorted Keys):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            &#x7b; &quot;api&quot;: &#x7b; &quot;baseUrl&quot;: &quot;https://api.example.com&quot;,
            &quot;timeout&quot;: 5000 &#x7d;, &quot;database&quot;: &#x7b; &quot;host&quot;: &quot;localhost&quot;,
            &quot;port&quot;: 5432 &#x7d;, &quot;logging&quot;: &#x7b; &quot;level&quot;: &quot;info&quot; &#x7d; &#x7d;
          </pre>
        </div>
        <p>
          Again, automated tools (like JSON sorters or formatters with sorting options) are essential for enforcing
          this.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Waypoints className="mr-2" size={20} />
          4. One Property Per Line (or Logical Group)
        </h3>
        <p>
          Avoid putting multiple key-value pairs or array elements on a single line, especially in lists or object
          definitions. This makes it harder to see changes in diffs and increases the chance of line-level conflicts.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Bad (Multiple items per line):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            &#x7b; &quot;users&quot;: [&quot;alice&quot;, &quot;bob&quot;, &quot;charlie&quot;], &quot;settings&quot;:
            &#x7b; &quot;theme&quot;: &quot;dark&quot;, &quot;language&quot;: &quot;en-US&quot; &#x7d; &#x7d;
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Good (One item/property per line):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            &#x7b; &quot;users&quot;: [ &quot;alice&quot;, &quot;bob&quot;, &quot;charlie&quot; ], &quot;settings&quot;:
            &#x7b; &quot;language&quot;: &quot;en-US&quot;, &quot;theme&quot;: &quot;dark&quot; &#x7d; &#x7d;
          </pre>
        </div>
        <p>Combining this with sorted keys (as shown in the &quot;Good&quot; example) makes diffs extremely clean.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <LockKeyhole className="mr-2" size={20} />
          5. Never Store Sensitive Data
        </h3>
        <p>
          Database passwords, API keys, private certificates, and other secrets should &lt;em&gt;never&lt;/em&gt; be
          committed to version control, even in private repositories. Use environment variables, dedicated secrets
          management systems (like HashiCorp Vault, AWS Secrets Manager, Azure Key Vault), or configuration libraries
          that handle secrets injection at runtime.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Bad (Secrets in config):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            &#x7b; &quot;database&quot;: &#x7b; &quot;host&quot;: &quot;localhost&quot;, &quot;port&quot;: 5432,
            &quot;user&quot;: &quot;admin&quot;, &quot;password&quot;: &quot;SuperSecretPassword123!&quot; // 🚨 DANGER
            🚨 &#x7d; &#x7d;
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Good (Use placeholders/references):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            &#x7b; &quot;database&quot;: &#x7b; &quot;host&quot;: &quot;localhost&quot;, &quot;port&quot;: 5432,
            &quot;user&quot;: &quot;admin&quot;, &quot;password&quot;: &quot;&#x24;&#x7b;DB_PASSWORD&#x7d;&quot; //
            Placeholder resolved at runtime &#x7d; &#x7d;
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FolderTree className="mr-2" size={20} />
          6. Structure Configuration Files Logically
        </h3>
        <p>
          Avoid a single, massive JSON file for your entire application&apos;s configuration. Break it down into
          smaller, logical files or directories based on functionality, module, or service. This limits the scope of
          changes and reduces the likelihood of different teams or features touching the same file.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Bad (Monolithic):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">config.json</pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Good (Structured):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            config/ database.json api.json features.json ui_settings.json
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Settings className="mr-2" size={20} />
          7. Handle Environment-Specific Configurations
        </h3>
        <p>
          Configurations often vary between environments (development, staging, production). Do not store all
          environment variations in a single file. Common patterns include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Separate files per environment:</strong> &lt;code&gt;config.development.json&lt;/code&gt;,
            &lt;code&gt;config.staging.json&lt;/code&gt;, &lt;code&gt;config.production.json&lt;/code&gt;.
          </li>
          <li>
            <strong>Environment folders:</strong> &lt;code&gt;config/development/&lt;/code&gt;,
            &lt;code&gt;config/staging/&lt;/code&gt;, etc.
          </li>
          <li>
            <strong>Configuration Overrides:</strong> A base config file with environment-specific files that override
            base values.
          </li>
        </ul>
        <p>
          The chosen method depends on your application&apos;s needs and deployment process. Ensure your application
          loads the correct configuration file based on the current environment.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CodeXml className="mr-2" size={20} />
          8. Consider Alternative Configuration Formats/Languages
        </h3>
        <p>
          While JSON is simple, other formats like YAML, TOML, or even using JavaScript/TypeScript files (for more
          complex logic or comments) might offer advantages depending on the project:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>YAML/TOML:</strong> More human-readable than JSON, often support comments, and can be less prone to
            syntax errors like misplaced commas.
          </li>
          <li>
            <strong>JS/TS:</strong> Allows for dynamic configuration, computed values, comments, and using your
            language&apos;s module system for organization. Requires your application to load and evaluate code, which
            might have security implications if not done carefully.
          </li>
        </ul>
        <p>Regardless of the format, the principles of consistency, structure, and avoiding secrets still apply.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <GitPullRequest className="mr-2" size={20} />
          9. Implement Code Reviews (Including Config Changes)
        </h3>
        <p>
          Reviewing changes to configuration files is just as important as reviewing code. Pull Requests/Merge Requests
          should clearly show configuration changes. Encourage reviewers to check for:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Adherence to formatting and sorting rules.</li>
          <li>Correctness of values.</li>
          <li>Accidental inclusion of sensitive data.</li>
          <li>Impact on different environments.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <RefreshCw className="mr-2" size={20} />
          10. Use Tools to Help
        </h3>
        <p>Leverage automation wherever possible:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Formatters:</strong> Prettier, &lt;code&gt;jsonlint --sort-keys&lt;/code&gt;, or IDE-specific tools.
          </li>
          <li>
            <strong>Linters:</strong> ESLint plugins, JSON Schema validators to enforce structure and data types.
          </li>
          <li>
            <strong>CI/CD Pipelines:</strong> Automate formatting checks, validation, and deployment of configurations.
          </li>
          <li>
            <strong>JSON Comparison Tools:</strong> Use diffing tools that understand JSON structure for clearer visual
            diffs.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="mr-2" size={24} />
          Example: Dealing with a Merge Conflict
        </h2>
        <p>Let&apos;s see how sorting and consistent formatting help with a simple conflict.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Original:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            &#x7b; &quot;features&quot;: &#x7b; &quot;featureA&quot;: true, &quot;featureB&quot;: false &#x7d; &#x7d;
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Change A (Add featureC, keeping sorted):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            &#x7b; &quot;features&quot;: &#x7b; &quot;featureA&quot;: true, &quot;featureB&quot;: false,
            &quot;featureC&quot;: true &#x7d; &#x7d;
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Change B (Add featureD, keeping sorted):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            &#x7b; &quot;features&quot;: &#x7b; &quot;featureA&quot;: true, &quot;featureB&quot;: false,
            &quot;featureD&quot;: false &#x7d; &#x7d;
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Merge Result (No Conflict):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            &#x7b; &quot;features&quot;: &#x7b; &quot;featureA&quot;: true, &quot;featureB&quot;: false,
            &quot;featureC&quot;: true, &quot;featureD&quot;: false &#x7d; &#x7d;
          </pre>
        </div>
        <p>
          Because both changes added a new key in the correct sorted position and used consistent formatting, Git could
          automatically merge them without conflict. If sorting wasn&apos;t applied, the new keys could have been
          inserted at different positions, leading to a conflict on the lines around the insertion points.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Shield className="mr-2" size={24} />
          Conclusion
        </h2>
        <p>
          Managing JSON configuration files in version control doesn&apos;t have to be a source of frustration. By
          implementing consistent formatting, sorting keys, structuring files logically, rigorously excluding sensitive
          data, and leveraging automated tools, teams can significantly reduce merge conflicts, improve the readability
          of changes, and maintain a clear and reliable configuration history. Adopting these practices will make
          working with JSON configurations a much smoother part of your development workflow.
        </p>
      </div>
    </>
  );
}

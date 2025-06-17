import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Custom Themes in JSON Formatters | Offline Tools",
  description:
    "Learn how to implement and customize themes for your JSON formatter to enhance readability and user experience.",
};

export default function ImplementingCustomThemesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing Custom Themes in JSON Formatters</h1>

      <div className="space-y-6">
        <p>
          Customizing the appearance of a JSON formatter is a popular feature that significantly enhances usability and
          readability. Developers and users often prefer different color schemes or fonts to suit their environment,
          reduce eye strain, or simply personalize their tools. Implementing custom themes allows you to provide this
          flexibility in your JSON formatter.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Implement Custom Themes?</h2>
        <p>Providing theming options isn&apos;t just a cosmetic choice; it offers practical benefits:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Improved Readability:</span> Different color schemes (like light, dark, or
              high-contrast) cater to various lighting conditions and user preferences.
            </li>
            <li>
              <span className="font-medium">Accessibility:</span> Users with visual impairments may require specific
              color combinations or higher contrast.
            </li>
            <li>
              <span className="font-medium">User Preference:</span> Allowing users to choose a theme they like makes the
              tool more enjoyable to use.
            </li>
            <li>
              <span className="font-medium">Integration:</span> Matching the formatter&apos;s theme to the surrounding
              application provides a consistent look and feel.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Core Concepts of JSON Formatter Theming</h2>
        <p>
          JSON formatters typically apply syntax highlighting, meaning different parts of the JSON structure (keys,
          strings, numbers, booleans, null, brackets) are colored differently. Theming involves changing these colors
          and potentially other visual aspects like background, font, or spacing.
        </p>
        <p>
          The implementation relies on associating specific styles (colors, fonts, etc.) with the different types of
          tokens or elements within the formatted JSON output.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Methods for Implementing Theming</h2>
        <p>There are several common ways to apply themes to rendered JSON output:</p>

        <h3 className="text-xl font-medium mt-6 mb-3">1. CSS Classes</h3>
        <p>
          This is a very common and flexible approach. As you parse and format the JSON, wrap each token (key, value,
          punctuation) in an element (like a <code>&lt;span&gt;</code>) and assign a specific CSS class based on its
          type. Then, define CSS rules for these classes within different theme stylesheets.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example Structure:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`<div class="json-container theme-dark">
  <span class="json-punctuation">{</span>
  <span class="json-key">"name"</span>
  <span class="json-punctuation">:</span>
  <span class="json-string">"Example"</span>
  <span class="json-punctuation">,</span>
  <!-- ... other tokens ... -->
  <span class="json-punctuation">}</span>
</div>`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Example CSS (Partial):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`.theme-light .json-key { color: #a31515; }
.theme-light .json-string { color: #008000; }
.theme-light .json-number { color: #098677; }
.theme-light .json-boolean { color: #0000ff; }
.theme-light .json-null { color: #808080; }
.theme-light .json-punctuation { color: #333; }

.theme-dark .json-key { color: #9cdcfe; }
.theme-dark .json-string { color: #ce9178; }
.theme-dark .json-number { color: #b5cea8; }
.theme-dark .json-boolean { color: #569cd6; }
.theme-dark .json-null { color: #d4d4d4; }
.theme-dark .json-punctuation { color: #cccccc; }

/* Common styles */
.json-container { font-family: monospace; }`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            You can switch themes by changing the parent class (e.g., <code>theme-light</code> or{" "}
            <code>theme-dark</code>) on the JSON container element.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6 mb-3">2. CSS Variables (Custom Properties)</h3>
        <p>
          This is a modern and highly recommended approach, especially in web applications. Define CSS variables (like{" "}
          <code>--json-key-color</code>, <code>--json-string-color</code>) on a parent element or the
          <code>:root</code>. Set the values of these variables according to the current theme. Your JSON formatter
          elements then use these variables for their colors.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example CSS (Partial):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`:root {
  /* Default or light theme variables */
  --json-key-color: #a31515;
  --json-string-color: #008000;
  /* ... other colors ... */
}

.theme-dark {
  --json-key-color: #9cdcfe;
  --json-string-color: #ce9178;
  /* ... override other colors ... */
}

.json-key { color: var(--json-key-color); }
.json-string { color: var(--json-string-color); }
/* ... other token styles using variables ... */`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Applying Theme:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`<div class="json-container theme-dark">
  {/* Formatted JSON structure */}
</div>

<div class="json-container theme-light">
  {/* Formatted JSON structure */}
</div>`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Switching themes is again done by changing the class on the container. CSS variables make it cleaner as the
            token styles don&apos;t need to list rules for every single theme class combination.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6 mb-3">3. Inline Styles (Less Recommended for Complex Themes)</h3>
        <p>
          You could directly apply styles (<code>style="..."</code>) to each token element based on the currently
          selected theme. This is generally less maintainable for complex themes than using CSS classes or variables,
          especially when dealing with many styles or states.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example Structure:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`<div>
  <span style="color: #333;">{</span>
  <span style="color: #a31515;">"name"</span>
  <span style="color: #333;">:</span>
  <span style="color: #008000;">"Example"</span>
  <span style="color: #333;">,</span>
  <!-- ... -->
  <span style="color: #333;">}</span>
</div>`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            To change the theme, you would need to re-render the JSON with different inline styles.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementing in a Component (React/Next.js Example)</h2>
        <p>
          In a framework like React or Next.js, you can manage the current theme state and apply it to your formatter
          component.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example Component Structure:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`import React, { useState } from 'react';

// Assume jsonFormatter function takes json string and returns JSX with spans/classes
// Assume themes object defines color palettes for different themes

const themes = {
  light: {
    keyColor: '#a31515',
    stringColor: '#008000',
    // ... other colors
  },
  dark: {
    keyColor: '#9cdcfe',
    stringColor: '#ce9178',
    // ... other colors
  },
};

function JSONFormatter({ jsonString }) {
  const [currentTheme, setCurrentTheme] = useState('light'); // State to hold theme

  const formattedJson = formatJsonWithSpans(jsonString, themes[currentTheme]); // Pass colors to formatter

  return (
    <div className={\`json-container theme-\${currentTheme}\`}> {/* Use theme class */}
      {formattedJson}
    </div>
  );
}

// Helper function (conceptual)
function formatJsonWithSpans(jsonString, themeColors) {
  // Parse JSON, iterate through tokens, and generate JSX
  // Apply styles based on token type and themeColors
  // Example:
  // if token is key: <span style={{ color: themeColors.keyColor }}>...</span>
  // OR using classes: <span class="json-key">...</span> (CSS handles colors via theme- class)
  // This part depends heavily on your parsing/rendering logic
  return <pre>Example formatted JSON with spans</pre>; // Placeholder
}

// Usage in another component:
// <JSONFormatter jsonString='{"example": "data"}' />`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            In this example, we use a state variable to track the theme. The <code>formatJsonWithSpans</code> function
            would be responsible for generating the HTML structure with the appropriate styles or classes applied based
            on the selected theme&apos;s color palette or the corresponding CSS class name. Using CSS variables (Method
            2) with a theme class on the container is often the cleanest implementation in this scenario.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Providing Theme Selection to Users</h2>
        <p>Once the theming mechanism is in place, you need to provide controls for users to change the theme.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Common UI Elements:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              Dropdown/Select menu with theme names (e.g., &quot;Light&quot;, &quot;Dark&quot;, &quot;Monokai&quot;)
            </li>
            <li>Toggle switch (for simple light/dark mode)</li>
            <li>Radio buttons</li>
            <li>
              Detecting system preference (<code>@media (prefers-color-scheme: dark)</code> CSS query)
            </li>
          </ul>
          <h3 className="text-lg font-medium mt-4">Persistence:</h3>
          <p className="text-sm">
            Store the user&apos;s theme preference (e.g., in <code>localStorage</code>) so it persists across sessions.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Considerations and Challenges</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Performance:</span> Applying styles to potentially thousands of individual{" "}
            <span></span> elements needs to be efficient. CSS classes and variables are generally performant.
          </li>
          <li>
            <span className="font-medium">Specificity:</span> Ensure your theme styles have sufficient specificity to
            override default styles, but not so much that they are hard to manage.
          </li>
          <li>
            <span className="font-medium">Customization Options:</span> Decide whether users can just pick from
            predefined themes or if they can customize individual colors (which adds complexity).
          </li>
          <li>
            <span className="font-medium">Maintaining Themes:</span> As you add more themes or token types, managing the
            color palettes can become complex. Consider a configuration object or file for themes.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Pro Tip:</h3>
          <p className="mt-2">
            When designing your formatter&apos;s output structure, wrap each meaningful JSON token (key, string, number,
            boolean, null, punctuation like :, , [], {}) in a specific element (e.g., <span></span>) with a class
            indicating its type. This makes applying any kind of styling, including themes, much easier.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing custom themes in a JSON formatter significantly improves the user experience by allowing
          personalization and enhancing readability. Using CSS classes or, preferably, CSS variables tied to a parent
          theme class are robust and maintainable approaches. By carefully structuring your formatter&apos;s output and
          managing theme states, you can provide a flexible and appealing tool for working with JSON data.
        </p>
      </div>
    </>
  );
}

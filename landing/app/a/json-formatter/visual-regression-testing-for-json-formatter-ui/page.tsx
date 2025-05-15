import type { Metadata } from "next";
import {
  Camera,
  Palette,
  Check,
  Wrench,
  AlertCircle,
  Code,
  Eye,
  Microscope,
  Gem,
  Paintbrush,
} from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Visual Regression Testing for JSON Formatter UI | Offline Tools",
  description:
    "Learn how to implement Visual Regression Testing (VRT) for a JSON Formatter UI to ensure consistent visual presentation across changes.",
};

export default function VisualRegressionJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Visual Regression Testing for JSON Formatter UI
      </h1>

      <div className="space-y-6">
        <p>
          Building a JSON Formatter UI involves more than just parsing and
          pretty-printing data. The visual presentation—indentation, syntax
          highlighting, error indicators, expand/collapse toggles—is crucial
          for usability. Any unintentional change to the styling, layout, or
          rendering logic can significantly degrade the user experience. This
          is where{" "}
          <strong>Visual Regression Testing (VRT)</strong> becomes invaluable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Eye className="inline-block" /> What is Visual Regression Testing?
        </h2>
        <p>
          Visual Regression Testing is a quality assurance process that verifies
          the visual appearance of a web application or component. It works by
          capturing screenshots of pages or specific UI elements in a known
          "baseline" state. In subsequent test runs, new screenshots are
          captured and automatically compared against these baselines.
        </p>
        <p>
          If there are differences beyond a defined threshold, the test fails,
          alerting developers to potential visual regressions—unintended changes
          in the UI's appearance introduced by code modifications. These
          differences could be anything from a few pixels shift in padding to
          major layout breaks or color changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Palette className="inline-block" /> Why VRT for a JSON Formatter?
        </h2>
        <p>
          A JSON Formatter UI is highly visual. Users rely on consistent
          indentation, color-coding, and structural cues to understand complex
          data. While traditional unit and integration tests can verify that
          the data is parsed and structured correctly, they don't guarantee
          that it <em>looks</em> right to the user.
        </p>
        <p>Here's why VRT is particularly important for this type of UI:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start gap-2">
            <Check className="min-w-4 w-4 h-4 mt-1" />{" "}
            <strong>Syntax Highlighting:</strong> Ensures different JSON
            data types (strings, numbers, booleans, null, keys) are
            consistently colored and styled according to the theme. Changes
            to CSS or highlighting logic can easily break this.
          </li>
          <li className="flex items-start gap-2">
            <Check className="min-w-4 w-4 h-4 mt-1" />{" "}
            <strong>Indentation and Structure:</strong> Verifies that nested
            objects and arrays are correctly indented, maintaining the
            hierarchical structure visually. Even minor CSS tweaks can
            impact spacing.
          </li>
          <li className="flex items-start gap-2">
            <Check className="min-w-4 w-4 h-4 mt-1" />{" "}
            <strong>Error States:</strong> Confirms that invalid JSON input
            is displayed with clear visual error indicators (e.g., wavy
            underlines, error icons, error messages) in the correct positions.
          </li>
          <li className="flex items-start gap-2">
            <Check className="min-w-4 w-4 h-4 mt-1" />{" "}
            <strong>Expand/Collapse Functionality:</strong> Checks that the
            UI correctly renders when sections of JSON are collapsed or
            expanded, ensuring toggles are visible and positioning is correct.
          </li>
          <li className="flex items-start gap-2">
            <Check className="min-w-4 w-4 h-4 mt-1" />{" "}
            <strong>Theming:</strong> If your formatter supports different
            themes (dark/light), VRT is essential to ensure all elements
            render correctly in each theme.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertCircle className="inline-block" /> Challenges for VRT on Dynamic JSON
          UI
        </h2>
        <p>
          While powerful, VRT on a JSON formatter presents specific challenges:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Dynamic Content:</strong> The input JSON is arbitrary.
            Testing every possible structure and size is impractical. You need
            to select representative test cases.
          </li>
          <li>
            <strong>Scrollable Areas:</strong> Long JSON inputs will require
            scrolling. VRT tools need to handle capturing the full height or
            specific scrolled positions.
          </li>
          <li>
            <strong>State Changes:</strong> Testing collapsed vs. expanded states
            requires triggering UI interactions before capturing the screenshot.
          </li>
          <li>
            <strong>Performance:</strong> Parsing and rendering large JSON
            can take time, potentially leading to flaky tests if screenshots
            are captured before rendering is complete. Waiting strategies are
            needed.
          </li>
          <li>
            <strong>Environment Consistency:</strong> Screenshots must be
            consistent across different test runs. Font rendering, browser
            versions, and operating systems can introduce minor variations.
            Using consistent containerized environments is crucial.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench className="inline-block" /> Tools and Approaches
        </h2>
        <p>Several types of tools can facilitate VRT:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Browser Automation Frameworks (Playwright, Cypress, Puppeteer):</strong>
            These tools can navigate to pages, inject JSON input, interact
            with the UI (like clicking collapse toggles), and capture screenshots.
            They often have built-in VRT capabilities or integrate with plugins.
            <p className="italic mt-1 text-sm text-gray-600 dark:text-gray-400">
              Example: Using Playwright to load the formatter page, paste JSON, and take a screenshot.
            </p>
          </li>
          <li>
            <strong>Storybook Addons:</strong> If your formatter component is
            developed in isolation using Storybook, addons exist to capture
            screenshots for each story (different states/inputs) and compare
            them over time.
            <p className="italic mt-1 text-sm text-gray-600 dark:text-gray-400">
              Example: Defining Storybook stories for valid JSON, invalid JSON, empty object, etc., and using a VRT addon.
            </p>
          </li>
          <li>
            <strong>Dedicated VRT Platforms/Services (Chromatic, Percy, Applitools):</strong>
            These tools are specifically designed for VRT, offering advanced
            comparison algorithms, cloud storage for baselines, and workflows
            for reviewing and approving visual changes. They often integrate
            with CI/CD pipelines.
            <p className="italic mt-1 text-sm text-gray-600 dark:text-gray-400">
              Example: Connecting a VRT service to your GitHub repository to automatically check visual changes on every pull request.
            </p>
          </li>
        </ul>
        <p>
          The choice of tool depends on your project setup, complexity, and
          budget. For a component-level VRT, Storybook addons are often
          convenient. For end-to-end page testing, browser automation tools
          or dedicated platforms are more suitable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Camera className="inline-block" /> Writing Effective VRT Test Cases
        </h2>
        <p>
          For a JSON Formatter UI, you need to cover various scenarios to
          ensure robust visual coverage. Here are some examples of test cases:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Basic Valid JSON:</strong> Test a simple object and a
            simple array.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre><code className="whitespace-pre-wrap text-sm">{`{ "name": "test", "value": 123 }`}</code></pre>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre><code className="whitespace-pre-wrap text-sm">{`[ 1, "two", true, null ]`}</code></pre>
            </div>
          </li>
          <li>
            <strong>Nested JSON:</strong> Test objects containing arrays and
            objects containing nested objects, and vice versa, to verify
            indentation and structure.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre><code className="whitespace-pre-wrap text-sm">{`{
  "user": {
    "id": 1,
    "address": {
      "city": "Null Island",
      "zip": "00000"
    },
    "tags": [ "new", "active" ]
  }
}`}</code></pre>
            </div>
          </li>
          <li>
            <strong>Invalid JSON:</strong> Provide malformed JSON to ensure
            error states are clearly and correctly displayed.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre><code className="whitespace-pre-wrap text-sm">{`{ "name": "test", "value": } // Missing value`}</code></pre>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre><code className="whitespace-pre-wrap text-sm">{`[ 1, 2, 3,, ] // Trailing comma`}</code></pre>
            </div>
          </li>
          <li>
            <strong>Large JSON:</strong> Use a large JSON string to test
            performance, scrolling behavior, and rendering consistency with
            many lines.
          </li>
          <li>
            <strong>Edge Cases:</strong> Test empty objects <code>&#x7b;&#x7d;</code>,
            empty arrays <code>[]</code>, JSON with only a primitive value (e.g., <code>"hello"</code> or <code>123</code>),
            JSON with special characters or Unicode.
          </li>
          <li>
            <strong>State Changes:</strong> For nested structures, write tests that:
            <ul className="list-circle pl-6 space-y-1 mt-2">
              <li>Capture the initial state (potentially all expanded).</li>
              <li>Programmatically click collapse toggles and capture screenshots of the collapsed state.</li>
              <li>Programmatically click collapse toggles again to expand and capture the re-expanded state.</li>
            </ul>
          </li>
          <li>
            <strong>Different Themes:</strong> If themes are supported, run
            the same test cases for each theme (light, dark, etc.) to ensure
            color schemes and styling are correct.
          </li>
          <li>
            <strong>Different Viewports:</strong> Test on a few key screen sizes
            (e.g., desktop, tablet, mobile) to catch responsive issues in the
            formatter's layout.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="inline-block" /> Conceptual Test Structure Example
        </h2>
        <p>
          While the exact code varies greatly depending on the VRT tool, the
          logical steps often look like this (using pseudo-code inspired by
          browser automation tools):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">VRT Test Scenario (Conceptual):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`test('should correctly format and display valid nested JSON', async ({ page }) => {
  // 1. Navigate to the JSON Formatter page
  await page.goto('/json-formatter');

  // 2. Define the JSON input
  const jsonInput = \`{
  "product": {
    "id": "abc-123",
    "details": {
      "name": "Example Widget",
      "price": 19.99,
      "inStock": true,
      "tags": ["gadget", "electronic"]
    }
  },
  "metadata": null
}\`;

  // 3. Find the input area (e.g., a textarea or editor) and paste the JSON
  //    (This requires knowing the specific element selectors of your UI)
  const inputElement = page.locator('#json-input-area'); // Replace with actual selector
  await inputElement.fill(jsonInput);

  // 4. Trigger formatting if it's not automatic (e.g., click a "Format" button)
  //    const formatButton = page.locator('#format-button'); // Replace with actual selector
  //    await formatButton.click();

  // 5. Wait for the formatter UI to render the output
  //    (Crucial step, might need specific waits based on UI updates)
  await page.waitForSelector('#formatted-output-area pre code', { state: 'visible' }); // Replace with actual selector

  // 6. Capture a screenshot of the specific formatter output area
  //    Using the output area helps isolate the VRT to the formatter itself.
  const outputArea = page.locator('#formatted-output-area'); // Replace with actual selector
  //    Some VRT tools have specific methods, or you use the browser tool's screenshot method
  //    await outputArea.screenshot({ path: 'screenshots/nested-json-formatted.png' }); // Example save path

  // 7. The VRT tool automatically compares this screenshot to the baseline
  //    await expect(outputArea).toHaveScreenshot('nested-json-formatted.png', { threshold: 0.1 }); // Example assertion with threshold
});

test('should display error state for invalid JSON', async ({ page }) => {
  await page.goto('/json-formatter');
  const invalidJson = \`{ "missing": value \`; // Clearly invalid

  const inputElement = page.locator('#json-input-area');
  await inputElement.fill(invalidJson);

  // Wait for error indicators to appear
  await page.waitForSelector('.error-indicator', { state: 'visible' }); // Replace with actual selector

  const outputArea = page.locator('#formatted-output-area');
  // await expect(outputArea).toHaveScreenshot('invalid-json-error.png');
});

test('should correctly render collapsed state', async ({ page }) => {
  await page.goto('/json-formatter');
  const nestedJson = \`{ "a": { "b": [1, 2] } }\`;

  const inputElement = page.locator('#json-input-area');
  await inputElement.fill(nestedJson);
  await page.waitForSelector('.collapse-toggle', { state: 'visible' }); // Replace with actual selector

  // Capture initial (expanded) state
  // await expect(page.locator('#formatted-output-area')).toHaveScreenshot('nested-json-expanded.png');

  // Click a collapse toggle (e.g., the one for key "a")
  const toggleForA = page.locator('text="a":').locator('.collapse-toggle'); // Find toggle near key 'a'
  await toggleForA.click();

  // Wait for the section to visually collapse
  // (Might require specific waits or checking element visibility/attributes)
  await page.waitForSelector('text="a": + .collapsed-content', { state: 'visible' }); // Example wait

  // Capture collapsed state
  // await expect(page.locator('#formatted-output-area')).toHaveScreenshot('nested-json-collapsed.png');
});`}
            </pre>
          </div>
          <p className="mt-4">
            This conceptual code highlights finding the UI elements, providing input,
            triggering actions (like formatting or collapsing), waiting for the UI to update,
            and then capturing a screenshot of the relevant area for comparison.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Gem className="inline-block" /> Benefits of VRT for Your Formatter
        </h2>
        <p>Implementing VRT for your JSON formatter provides significant benefits:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Check className="inline-block mr-1" />{" "}
            <strong>Catches UI Bugs Early:</strong> Detects unintended visual
            changes that unit or integration tests would miss.
          </li>
          <li>
            <Check className="inline-block mr-1" />{" "}
            <strong>Ensures Consistency:</strong> Guarantees the formatter looks
            and behaves the same way visually across different inputs and
            potentially different browsers/environments.
          </li>
          <li>
            <Check className="inline-block mr-1" />{" "}
            <strong>Increases Confidence in Refactoring/Updates:</strong> Allows
            you to refactor the formatting logic or update dependencies (like
            styling libraries) with more confidence, knowing VRT will flag
            any visual side effects.
          </li>
          <li>
            <Check className="inline-block mr-1" />{" "}
            <strong>Improves Collaboration:</strong> Provides a clear visual
            artifact (the diff image) for designers and developers to review
            and discuss unexpected changes.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Microscope className="inline-block" /> Setting Up and Maintaining VRT
        </h2>
        <p>
          Setting up VRT involves selecting a tool, configuring your test
          environment (often in a CI/CD pipeline for consistency), writing
          test scenarios, and generating initial baselines.
        </p>
        <p>
          Maintenance is key. When visual changes are intentional (e.g., a
          design update or a new feature), you'll need to review the diffs
          and update the baselines. This process should be integrated into
          your development workflow. Flaky tests due to inconsistent
          environments or timing issues need to be addressed by improving
          waits or standardizing the test environment.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Paintbrush className="inline-block" /> Conclusion
        </h2>
        <p>
          For a UI component like a JSON formatter where visual accuracy and
          consistency are paramount for user comprehension and experience,
          Visual Regression Testing is not just a nice-to-have, but a critical
          part of a robust testing strategy. By capturing and comparing screenshots
          of various states and inputs, VRT helps you catch subtle styling bugs,
          layout shifts, and rendering inconsistencies that can degrade usability,
          ensuring your formatter remains a reliable and pleasant tool for working
          with JSON data.
        </p>
      </div>
    </>
  );
}
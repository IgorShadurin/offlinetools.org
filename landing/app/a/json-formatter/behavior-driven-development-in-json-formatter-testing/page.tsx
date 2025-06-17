import type { Metadata } from "next";
import {
  Sparkles,
  ClipboardCheck,
  FlaskConical,
  Users,
  Code,
  FileJson,
  BadgeCheck,
  Info, // Import the Info icon
} from "lucide-react"; // Using allowed icons

export const metadata: Metadata = {
  title: "BDD in JSON Formatter Testing | Offline Tools",
  description:
    "Explore how Behavior-Driven Development (BDD) can be effectively applied to testing JSON formatter tools, improving collaboration and clarity.",
};

export default function BddJsonFormatterTestingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-blue-500" /> Behavior-Driven Development in JSON Formatter Testing
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          Testing tools, especially those that process data like JSON formatters, requires precision. Ensuring that
          valid JSON is formatted correctly and invalid input is handled gracefully is crucial. While traditional unit
          and integration tests are essential, adopting a Behavior-Driven Development (BDD) approach can bring
          significant benefits, focusing on how the *user* expects the formatter to behave.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <Users className="w-6 h-6 text-green-500" /> What is Behavior-Driven Development (BDD)?
        </h2>
        <p>
          BDD is an agile software development process that encourages collaboration among developers, QA analysts, and
          non-technical or business participants. It bridges the gap between technical specifications and business
          requirements by defining application behavior in clear, human-readable text.
        </p>
        <p>
          At its core, BDD uses a Ubiquitous Language shared across the team. This language is often structured using
          the Gherkin syntax, which follows a simple Given/When/Then structure to describe scenarios:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Given:</strong> Describes the initial context or state of the system.
          </li>
          <li>
            <strong>When:</strong> Describes an action or event performed by a user or external system.
          </li>
          <li>
            <strong>Then:</strong> Describes the expected outcome or result of the action.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <FileJson className="w-6 h-6 text-purple-500" /> Why BDD for JSON Formatter Testing?
        </h2>
        <p>
          Applying BDD to a JSON formatter might seem overly complex for a seemingly simple tool, but it offers several
          advantages:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Clear Specification:</strong> Gherkin scenarios provide unambiguous specifications of how the
            formatter should behave under various conditions (validity, different data types, formatting options).
          </li>{" "}
          {/* Added missing closing tag */}
          <li>
            <strong>Collaboration:</strong> Non-technical stakeholders (like content creators or analysts who might use
            the tool) can understand and even contribute to the test cases, ensuring the tool meets real-world needs.
          </li>
          <li>
            <strong>Focus on User Value:</strong> Tests are written from the perspective of someone using the formatter,
            ensuring that key user interactions and expected results are covered.
          </li>
          <li>
            <strong>Executable Documentation:</strong> The scenarios serve as living documentation that is always
            up-to-date because they are the tests themselves.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <ClipboardCheck className="w-6 h-6 text-teal-500" /> Applying BDD: Writing Scenarios
        </h2>
        <p>
          Let's look at how we can write Gherkin scenarios for common JSON formatter behaviors. These scenarios can be
          written in plain text files (e.g., `.feature` files) and then automated using BDD frameworks like Cucumber,
          Jest-Cucumber, or similar tools.
        </p>

        <h3 className="text-xl font-semibold mt-6">Scenario 1: Formatting Valid JSON</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Scenario: Successfully format a simple JSON object</h4>
          <pre className="overflow-x-auto">
            {`Feature: JSON Formatter
  As a user
  I want to format JSON input
  So that it is readable and structured

  Scenario: Successfully format a simple JSON object
    Given I have valid JSON input
    """
    {"name":"Alice","age":30,"city":"New York"}
    """
    When I format the JSON
    Then the output should be correctly indented JSON
    """
    {
      "name": "Alice",
      "age": 30,
      "city": "New York"
    }
    """`}
          </pre>
        </div>
        <p>
          This scenario clearly defines the input (Given), the action (When), and the expected output (Then). The triple
          quotes (`"""`) are used for multi-line string arguments in Gherkin.
        </p>

        <h3 className="text-xl font-semibold mt-6">Scenario 2: Handling Invalid JSON</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Scenario: Report error for invalid JSON input</h4>
          <pre className="overflow-x-auto">
            {`Feature: JSON Formatter
  Scenario: Report error for invalid JSON input
    Given I have invalid JSON input
    """
    {"name":"Alice","age":30,"city":"New York",} // Trailing comma is invalid
    """
    When I format the JSON
    Then an error should be reported`}
          </pre>
        </div>
        <p>
          Here, the expected outcome is not a formatted string but a specific error condition. The "Then" step could be
          refined to check for a specific error message or type.
        </p>

        <h3 className="text-xl font-semibold mt-6">Scenario 3: Using Formatting Options (e.g., indentation)</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Scenario: Format with 4-space indentation</h4>
          <pre className="overflow-x-auto">
            {`Feature: JSON Formatter
  Scenario: Format with 4-space indentation
    Given I have valid JSON input
    """
    {"item":"book","price":19.99}
    """
    And I set the indentation to 4 spaces
    When I format the JSON
    Then the output should be correctly indented JSON with 4 spaces
    """
    {
        "item": "book",
        "price": 19.99
    }
    """`}
          </pre>
        </div>
        <p>
          This shows how additional context (And steps) can be added to the Given section to specify configuration or
          options before the action is performed.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <Code className="w-6 h-6 text-orange-500" /> Implementing Step Definitions
        </h2>
        <p>
          Once the scenarios are written, the next step is to automate them. This involves writing "step definitions" –
          small pieces of code that link the Gherkin steps to the actual application code or testing library.
        </p>
        <p>
          Using a library like `jest-cucumber` with Jest in TypeScript, you would write functions that match the Gherkin
          step text.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Step Definition Example (TypeScript):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { Given, When, Then, defineFeature } from 'jest-cucumber';
import { formatJson } from '../src/json-formatter'; // Assume this is your formatter function

// Define the feature file
defineFeature('./json-formatter.feature', feature => {

  let jsonInput: string;
  let formattedOutput: string | null;
  let formattingError: Error | null;
  let indentationSpaces: number = 2; // Default indentation

  Given(/^I have valid JSON input$/, (input: string) => {
    jsonInput = input;
    formattedOutput = null;
    formattingError = null;
  });

  Given(/^I have invalid JSON input$/, (input: string) => {
    jsonInput = input;
    formattedOutput = null;
    formattingError = null;
  });

  Given(/^I set the indentation to (\\d+) spaces$/, (spaces: string) => {
    indentationSpaces = parseInt(spaces, 10);
  });

  When(/^I format the JSON$/, () => {
    try {
      // Call your actual formatter logic
      formattedOutput = formatJson(jsonInput, { indent: indentationSpaces });
      formattingError = null;
    } catch (error: any) {
      formattedOutput = null;
      formattingError = error;
    }
  });

  Then(/^the output should be correctly indented JSON$/, (expectedOutput: string) => {
    // Use a testing assertion library (like Jest's expect)
    expect(formattingError).toBeNull();
    expect(formattedOutput?.trim()).toBe(expectedOutput.trim());
  });

   Then(/^the output should be correctly indented JSON with (\\d+) spaces$/, (spaces: string, expectedOutput: string) => {
    expect(formattingError).toBeNull();
    expect(formattedOutput?.trim()).toBe(expectedOutput.trim());
   });

  Then(/^an error should be reported$/, () => {
    expect(formattingError).not.toBeNull();
    expect(formattedOutput).toBeNull();
    // Optional: Check for a specific error message or type
    // expect(formattingError).toBeInstanceOf(JsonParseError);
  });
});
`}
            </pre>
          </div>
        </div>
        <p>
          Each step definition is a function that executes the necessary code to fulfill the step's description. The
          parameters from the Gherkin step (like the multi-line string inputs or the number of spaces) are passed as
          arguments to these functions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <FlaskConical className="w-6 h-6 text-red-500" /> Testing More Complex Scenarios
        </h2>
        <p>BDD becomes increasingly valuable when dealing with more complex formatter requirements, such as:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Handling different JSON data types (arrays, nested objects, numbers, booleans, null).</li>
          <li>Specific formatting options (e.g., sorting keys, compact output).</li>
          <li>Edge cases (empty objects/arrays, JSON with comments, invalid Unicode characters).</li>
          <li>Handling large JSON inputs (performance considerations).</li>
        </ul>
        <p>
          Each of these can be captured as distinct scenarios in your `.feature` files, providing a comprehensive suite
          of tests and documentation.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Scenario: Format JSON with nested arrays and objects</h4>
          <pre className="overflow-x-auto">
            {`Feature: JSON Formatter Options

  Scenario: Format JSON with nested arrays and objects and 2-space indentation
    Given I have valid JSON input
    """
    {"id":123,"data":{"items":[1,"two",{"nested":true}],"config":null}}
    """
    And I set the indentation to 2 spaces
    When I format the JSON
    Then the output should be correctly indented JSON with 2 spaces
    """
    {
      "id": 123,
      "data": {
        "items": [
          1,
          "two",
          {
            "nested": true
          }
        ],
        "config": null
      }
    }
    """`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <BadgeCheck className="w-6 h-6 text-yellow-500" /> Benefits Beyond Testing
        </h2>
        <p>
          Implementing BDD for your JSON formatter testing offers benefits that extend beyond just having automated
          tests:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Improved Communication:</strong> The shared language and scenarios facilitate better understanding
            between team members.
          </li>
          <li>
            <strong>Clear Requirements:</strong> Writing scenarios forces clarity on expected behavior before coding
            begins.
          </li>
          <li>
            <strong>Reduced Rework:</strong> Misunderstandings are caught early in the process, reducing costly rework
            later.
          </li>
          <li>
            <strong>Executable Specifications:</strong> The feature files act as up-to-date documentation of what the
            formatter *does*, not just what it *should* do.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <Info className="w-6 h-6 text-blue-500" /> Considerations
        </h2>
        <p>While beneficial, adopting BDD requires commitment:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Initial Learning Curve:</strong> Team members need to learn Gherkin and the chosen BDD framework.
          </li>
          <li>
            <strong>Maintenance Overhead:</strong> Scenarios and step definitions must be maintained as the formatter
            evolves. Well-structured step definitions can mitigate this.
          </li>
          <li>
            <strong>Scope:</strong> Not every single test case needs to be a BDD scenario. Focus on key behaviors and
            user-facing functionality; unit tests are still valuable for internal logic.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Behavior-Driven Development, while often associated with complex business applications, can be a powerful
          methodology even for tools like JSON formatters. By focusing on the expected behavior from a user's
          perspective and using clear, collaborative language like Gherkin, teams can build more robust, well-specified,
          and user-friendly formatters. It shifts the focus from testing implementation details to testing observable
          outcomes, leading to higher confidence in the tool's functionality and better alignment across the development
          team.
        </p>
      </div>
    </>
  );
}

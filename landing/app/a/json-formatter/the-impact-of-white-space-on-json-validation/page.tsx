import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about white space impact on JSON validation
 */
export const metadata: Metadata = {
  title: "The Impact of White Space on JSON Validation | Offline Tools",
  description:
    "Understand how white space affects JSON validation and learn best practices for handling white space in your JSON documents.",
};

/**
 * Article page component for the impact of white space on JSON validation
 */
export default function WhiteSpaceInJsonValidationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">The Impact of White Space on JSON Validation</h1>

      <div className="space-y-6">
        <p>
          White space in JSON documents—spaces, tabs, line breaks, and other invisible characters—plays a significant
          role in readability but can also affect validation. Understanding how JSON parsers handle white space is
          crucial for avoiding unexpected errors and ensuring your JSON is both valid and maintainable. This article
          explores the rules governing white space in JSON and practical strategies for handling it effectively.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What Counts as White Space in JSON?</h2>
        <p>According to the JSON specification, white space in JSON can consist of:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>Space characters (U+0020)</li>
            <li>Horizontal tabs (U+0009)</li>
            <li>Line feeds (U+000A)</li>
            <li>Carriage returns (U+000D)</li>
          </ul>
        </div>

        <p>
          These characters are significant for human readability but are generally insignificant to JSON parsers when
          used in appropriate places. However, their misuse can lead to validation errors.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Where White Space Is Allowed</h2>

        <p>
          In the JSON specification, white space can appear in several places without affecting the validity of the
          document:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Before and after structural characters (<code>{"{"}</code>, <code>{"}"}</code>, <code>{"["}</code>,{" "}
              <code>{"]"}</code>, <code>{":"}</code>, <code>{","}</code>)
            </li>
            <li>Between key-value pairs</li>
            <li>Between array elements</li>
            <li>Around the root value of the document</li>
            <li>Between tokens in general</li>
          </ul>
        </div>
      </div>
    </>
  );
}

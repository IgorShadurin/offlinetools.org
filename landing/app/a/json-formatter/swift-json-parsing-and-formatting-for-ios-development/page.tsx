import type { Metadata } from "next";
import { AlertTriangle, Book, Box, CheckCircle, Code, Feather, HelpCircle, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Swift JSON Parsing and Formatting for iOS Development | Offline Tools",
  description:
    "Learn the practical Swift JSON workflow for iOS apps: decode API responses, encode request bodies, pretty-print JSON, handle dates and keys, and debug Codable errors fast.",
};

export default function SwiftJsonGuidePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-4 text-center text-3xl font-bold">Swift JSON Parsing and Formatting for iOS Development</h1>

      <p className="text-lg text-gray-700 dark:text-gray-300">
        For most iOS projects, the right default is simple: use{" "}
        <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">Codable</code> with{" "}
        <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">JSONDecoder</code> and{" "}
        <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">JSONEncoder</code> for typed app
        models, and reach for{" "}
        <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">JSONSerialization</code> only
        when the payload shape is unknown or you just need to reformat raw JSON. If you are starting from a minified API
        response, pretty-print it first so nested objects, nulls, and inconsistent keys are obvious before you write the
        model.
      </p>

      <div className="mt-8 space-y-10">
        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Book className="mr-2 text-blue-500" /> Start With The Best Default
          </h2>
          <p>
            Search visitors usually want the shortest path to working code. In current iOS development, that path is
            still{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">Codable</code>. It gives you
            type safety, fewer runtime casts, and cleaner compile-time failures when the payload changes.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              Use <strong>Codable</strong> when the API has a known schema and you want Swift structs or enums.
            </li>
            <li>
              Use <strong>JSONSerialization</strong> when the response is unstructured, has dynamic keys, or you are
              building a generic formatter/debugging tool.
            </li>
            <li>
              Use <strong>pretty-printed JSON</strong> for logs, fixtures, snapshots, and debugging, not because servers
              need it.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Code className="mr-2 text-green-500" /> Decode JSON From An API Response
          </h2>
          <p>
            Apple&apos;s async Foundation APIs make the common flow straightforward: build a request, fetch data with{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">URLSession.shared.data(for:)</code>,
            then decode it with a configured decoder.
          </p>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre>
              <code className="language-swift text-sm">
                {`struct UserResponse: Codable {
    let id: Int
    let fullName: String
    let isActive: Bool
    let createdAt: Date
}

func fetchUser(id: Int) async throws -> UserResponse {
    var request = URLRequest(url: URL(string: "https://api.example.com/users/\\(id)")!)
    request.setValue("application/json", forHTTPHeaderField: "Accept")

    let (data, response) = try await URLSession.shared.data(for: request)

    guard let httpResponse = response as? HTTPURLResponse,
          200..<300 ~= httpResponse.statusCode else {
        throw URLError(.badServerResponse)
    }

    let decoder = JSONDecoder()
    decoder.keyDecodingStrategy = .convertFromSnakeCase
    decoder.dateDecodingStrategy = .iso8601

    return try decoder.decode(UserResponse.self, from: data)
}`}
              </code>
            </pre>
          </div>
          <p>
            This example covers the real-world pieces the boilerplate examples often skip: HTTP status validation,
            snake_case conversion, and ISO 8601 date parsing. If your project still supports older OS versions, you can
            keep the same models and decoder setup while using the older completion-handler networking APIs instead of
            async/await.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Feather className="mr-2 text-purple-500" /> Encode And Pretty-Print JSON
          </h2>
          <p>
            Formatting JSON for iOS work usually means one of two things: creating a request body or making JSON easy to
            read in logs and tests.{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">JSONEncoder</code> handles both.
          </p>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre>
              <code className="language-swift text-sm">
                {`struct UpdateUserRequest: Encodable {
    let fullName: String
    let isActive: Bool
    let tags: [String]
    let updatedAt: Date
}

let payload = UpdateUserRequest(
    fullName: "Alice Smith",
    isActive: true,
    tags: ["beta", "ios"],
    updatedAt: Date()
)

let encoder = JSONEncoder()
encoder.keyEncodingStrategy = .convertToSnakeCase
encoder.dateEncodingStrategy = .iso8601
encoder.outputFormatting = [.prettyPrinted, .sortedKeys, .withoutEscapingSlashes]

let body = try encoder.encode(payload)
let jsonString = String(decoding: body, as: UTF8.self)

print(jsonString)`}
              </code>
            </pre>
          </div>
          <p>
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">.prettyPrinted</code> makes the
            output readable,{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">.sortedKeys</code> gives you
            deterministic output for tests and reviews, and{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">.withoutEscapingSlashes</code>{" "}
            keeps URLs readable in debug output.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Box className="mr-2 text-orange-500" /> Keys, Acronyms, Dates, And Missing Values
          </h2>
          <p>
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">.convertFromSnakeCase</code> is
            a good default, but it is not magic. Apple&apos;s documentation specifically notes that it cannot infer the
            capitalization of acronyms or initialisms. For example, a backend key like{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">base_uri</code> maps to{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">baseUri</code>, not{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">baseURI</code>.
          </p>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre>
              <code className="language-swift text-sm">
                {`struct FileRecord: Codable {
    let fileURL: URL
    let baseURI: URL
    let expiresAt: Date?

    private enum CodingKeys: String, CodingKey {
        case fileURL = "file_url"
        case baseURI = "base_uri"
        case expiresAt = "expires_at"
    }
}`}
              </code>
            </pre>
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              Use <strong>explicit CodingKeys</strong> for acronym-heavy fields like{" "}
              <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">userID</code>,{" "}
              <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">URL</code>, or{" "}
              <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">URI</code>.
            </li>
            <li>
              Use <strong>optionals</strong> only when the backend really allows missing or null values. Optional
              everything is easy, but it weakens your model.
            </li>
            <li>
              Use <strong>ISO 8601 strategies</strong> when the API sends standards-based timestamps. If the server uses
              custom date strings, switch to a custom formatter or a custom decode implementation.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <HelpCircle className="mr-2 text-yellow-500" /> When JSONSerialization Is The Better Tool
          </h2>
          <p>
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">JSONSerialization</code> is not
            outdated. It is just a different tool. Use it when you do not want a fixed model type yet.
          </p>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre>
              <code className="language-swift text-sm">
                {`let object = try JSONSerialization.jsonObject(with: data)

if let dictionary = object as? [String: Any] {
    print(dictionary["debug_flag"] ?? "missing")
}

let prettyData = try JSONSerialization.data(
    withJSONObject: object,
    options: [.prettyPrinted, .sortedKeys]
)

let prettyJSON = String(decoding: prettyData, as: UTF8.self)
print(prettyJSON)`}
              </code>
            </pre>
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Good for dynamic keys, ad-hoc inspection, formatter utilities, and migration work.</li>
            <li>Less good for production app models because it pushes type checking to runtime.</li>
            <li>
              A practical rule: if you already know the shape of the payload, go back to{" "}
              <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">Codable</code>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <AlertTriangle className="mr-2 text-red-500" /> Debug Decoding Failures Fast
          </h2>
          <p>
            Most Swift JSON bugs are not parser bugs. They are contract bugs: wrong key, wrong type, wrong root object,
            or unexpectedly null data. Do not stop at{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">
              {"catch { print(error) }"}
            </code>
            .
            Inspect the actual{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">DecodingError</code>.
          </p>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre>
              <code className="language-swift text-sm">
                {`do {
    let user = try decoder.decode(UserResponse.self, from: data)
    print(user)
} catch let DecodingError.keyNotFound(key, context) {
    let path = context.codingPath.map { $0.stringValue }.joined(separator: ".")
    print("Missing key \\(key.stringValue) at \\(path)")
} catch let DecodingError.typeMismatch(type, context) {
    let path = context.codingPath.map { $0.stringValue }.joined(separator: ".")
    print("Type mismatch for \\(type) at \\(path)")
} catch let DecodingError.valueNotFound(type, context) {
    let path = context.codingPath.map { $0.stringValue }.joined(separator: ".")
    print("Missing value for \\(type) at \\(path)")
} catch {
    print("Unexpected error: \\(error)")
}`}
              </code>
            </pre>
          </div>
          <p>
            That extra context usually tells you exactly what to fix: make a property optional, add a{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">CodingKeys</code> mapping,
            change the root decode type from{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">User.self</code> to{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">[User].self</code>, or write a
            custom initializer for inconsistent backend data.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Zap className="mr-2 text-teal-500" /> Performance And Compatibility Notes
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              For typical mobile payloads, Foundation&apos;s JSON APIs are plenty fast. Large responses are where you start
              paying attention to memory and background work.
            </li>
            <li>
              Avoid heavy decoding on the main actor if the payload is large enough to affect scrolling or first paint.
            </li>
            <li>
              The async networking example on this page assumes{" "}
              <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">URLSession</code> async APIs,
              which are appropriate for modern iOS targets. Older targets can still use the same models with completion
              handlers.
            </li>
            <li>
              If your backend sends inconsistent types like{" "}
              <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">"42"</code> sometimes and{" "}
              <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">42</code> other times, add a
              narrow custom decoder for that field instead of weakening your whole model.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <CheckCircle className="mr-2 text-green-500" /> Practical Takeaway
          </h2>
          <p>
            For a current Swift JSON parsing and formatting workflow on iOS, the best baseline is: pretty-print the raw
            payload, model it with{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">Codable</code>, decode with a
            configured{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">JSONDecoder</code>, encode with
            a configured{" "}
            <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">JSONEncoder</code>, and switch
            to <code className="rounded bg-gray-100 p-1 text-sm font-mono dark:bg-gray-800">JSONSerialization</code> only
            when the structure is intentionally dynamic. That keeps the code Swifty, debuggable, and aligned with how
            current iOS apps actually talk to JSON APIs.
          </p>
        </section>
      </div>
    </div>
  );
}

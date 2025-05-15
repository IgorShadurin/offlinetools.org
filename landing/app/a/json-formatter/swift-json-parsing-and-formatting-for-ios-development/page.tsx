import type { Metadata } from "next";
import {
  Code,
  Book,
  AlertTriangle,
  Feather,
  Zap,
  Box,
  HelpCircle,
  CheckCircle,
} from "lucide-react"; // Import Lucide icons

export const metadata: Metadata = {
  title: "Swift JSON Parsing and Formatting for iOS Development | Your App Name",
  description:
    "A comprehensive guide to handling JSON data in Swift for iOS development using Codable.",
};

export default function SwiftJsonGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Swift JSON Parsing and Formatting for iOS Development
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Book className="mr-2 text-blue-500" /> Introduction: Why JSON?
          </h2>
          <p>
            JSON (JavaScript Object Notation) has become the de facto standard
            for exchanging data between client and server in mobile development.
            Its human-readable format and lightweight nature make it ideal for
            APIs. For iOS developers using Swift, efficiently parsing incoming
            JSON data into native Swift objects and encoding Swift objects back
            into JSON format for sending data is a fundamental skill.
          </p>
          <p className="mt-2">
            Swift's built-in{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Codable
            </code>{" "}
            protocol provides a powerful, type-safe, and often boilerplate-free
            way to handle this. This guide will walk you through leveraging{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Codable
            </code>{" "}
            for both parsing (decoding) and formatting (encoding) JSON in your
            iOS applications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 text-green-500" /> Parsing JSON with Codable
            (Decoding)
          </h2>
          <p>
            Parsing JSON means taking a JSON string or data blob and
            transforming it into Swift objects you can work with. Swift's{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              JSONDecoder
            </code>{" "}
            is the primary tool for this, working in conjunction with the{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Decodable
            </code>{" "}
            protocol.
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">The Decodable Protocol</h3>
          <p>
            Any type that conforms to the{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Decodable
            </code>{" "}
            protocol can be decoded from a JSON representation. Swift can
            automatically synthesize the conformance for most types, including
            structs, classes, and enums, as long as all their properties are
            also{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Decodable
            </code>
            .
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Basic Decoding Example</h3>
          <p>
            Let's say you have a JSON representing a user:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`{
  "id": 1,
  "name": "Alice Smith",
  "is_active": true,
  "balance": 150.75
}`}
              </code>
            </pre>
          </div>
          <p>
            To decode this into a Swift struct, you first define the struct that
            conforms to{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Decodable
            </code>{" "}
            (or better yet,{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Codable
            </code>
            , which combines{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Decodable
            </code>{" "}
            and{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Encodable
            </code>
            ).
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-swift text-sm">
                {`struct User: Codable {
    let id: Int
    let name: String
    let isActive: Bool // Note: Swift uses camelCase, JSON used snake_case
    let balance: Double
}`}
              </code>
            </pre>
          </div>
          <p className="mt-4">
            Notice the mismatch between{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              is_active
            </code>{" "}
            in JSON and{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              isActive
            </code>{" "}
            in Swift. We'll address this with{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              CodingKeys
            </code>{" "}
            shortly. First, the decoding process:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-swift text-sm">
                {`let jsonString = """
{
  "id": 1,
  "name": "Alice Smith",
  "is_active": true,
  "balance": 150.75
}
"""

let jsonData = jsonString.data(using: .utf8)! // Convert string to Data

let decoder = JSONDecoder()

do {
    let user = try decoder.decode(User.self, from: jsonData)
    print("Decoded User: \\(user.name), Active: \\(user.isActive)")
} catch {
    print("Error decoding JSON: \\(error)")
}`}
              </code>
            </pre>
          </div>
          <p className="mt-4">
            This code attempts to decode the{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              jsonData
            </code>{" "}
            into an instance of the{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              User
            </code>{" "}
            struct. If successful, you get a{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              User
            </code>{" "}
            object; otherwise, it throws an error (e.g., data format mismatch,
            missing key).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Feather className="mr-2 text-purple-500" /> Formatting JSON with
            Codable (Encoding)
          </h2>
          <p>
            Encoding JSON means taking a Swift object and transforming it into a
            JSON string or data blob suitable for sending, for example, in a
            network request body. Swift's{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              JSONEncoder
            </code>{" "}
            is used for this, working with the{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Encodable
            </code>{" "}
            protocol.
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">The Encodable Protocol</h3>
          <p>
            Types that conform to{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Encodable
            </code>{" "}
            can be converted into a JSON representation. Like{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Decodable
            </code>
            , Swift can often synthesize conformance automatically if all
            properties are also{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Encodable
            </code>
            .
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Basic Encoding Example</h3>
          <p>
            Using the same{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              User
            </code>{" "}
            struct (which conforms to{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Codable
            </code>
            ):
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-swift text-sm">
                {`let newUser = User(id: 2, name: "Bob Johnson", isActive: false, balance: 5.0)

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted // Optional: for readable output

do {
    let jsonData = try encoder.encode(newUser)
    let jsonString = String(data: jsonData, encoding: .utf8)!
    print("Encoded JSON:\\n\\(jsonString)")
} catch {
    print("Error encoding JSON: \\(error)")
}`}
              </code>
            </pre>
          </div>
          <p className="mt-4">
            This code converts the{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              newUser
            </code>{" "}
            object into{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Data
            </code>
            , then into a string for printing. Note that by default, Swift encodes
            properties using their Swift names (camelCase). The output would be:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`{
  "id" : 2,
  "name" : "Bob Johnson",
  "isActive" : false,
  "balance" : 5
}`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Box className="mr-2 text-orange-500" /> Handling Mismatched JSON Keys
            with CodingKeys
          </h2>
          <p>
            APIs often use snake_case (e.g.,{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              is_active
            </code>
            ), while Swift convention is camelCase (e.g.,{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              isActive
            </code>
            ). To map between these, you can define a nested enum called{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              CodingKeys
            </code>{" "}
            that conforms to the{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              CodingKey
            </code>{" "}
            protocol (String raw value is common).
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-swift text-sm">
                {`struct User: Codable {
    let id: Int
    let name: String
    let isActive: Bool
    let balance: Double

    private enum CodingKeys: String, CodingKey {
        case id
        case name
        case isActive = "is_active" // Map "is_active" from JSON to isActive in Swift
        case balance
    }
}`}
              </code>
            </pre>
          </div>
          <p className="mt-4">
            Now, when you use{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              JSONDecoder
            </code>{" "}
            to decode the original JSON with{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              is_active
            </code>
            , it will correctly map it to the{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              isActive
            </code>{" "}
            property. Similarly,{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              JSONEncoder
            </code>{" "}
            will encode the{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              isActive
            </code>{" "}
            property as{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              is_active
            </code>
            .
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">KeyDecodingStrategy</h3>
          <p>
            For common transformations like snake_case to camelCase across many
            properties, you can use{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              JSONDecoder.keyDecodingStrategy
            </code>{" "}
            instead of manually defining{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              CodingKeys
            </code>{" "}
            for every property.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-swift text-sm">
                {`struct User: Codable {
    let id: Int
    let name: String
    let isActive: Bool // Swift property name
    let balance: Double
}

// ... assuming jsonData is the same as before ...

let decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase // Automatically maps is_active to isActive

do {
    let user = try decoder.decode(User.self, from: jsonData)
    print("Decoded User with strategy: \\(user.name), Active: \\(user.isActive)")
} catch {
    print("Error decoding JSON with strategy: \\(error)")
}`}
              </code>
            </pre>
          </div>
          <p className="mt-4">
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              .convertFromSnakeCase
            </code>{" "}
            is one of several built-in strategies. There's also{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              .convertToSnakeCase
            </code>{" "}
            for encoding. You can also define a{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              .custom
            </code>{" "}
            strategy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-red-500" /> Handling Optional Values
            and Missing Keys
          </h2>
          <p>
            JSON keys might be missing, or their values might be null. Swift
            handles this gracefully if you declare the corresponding properties
            as optionals (`?`).
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`{
  "id": 3,
  "name": "Charlie Brown",
  "bio": null
  // "balance" key is missing
}`}
              </code>
            </pre>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-swift text-sm">
                {`struct UserProfile: Codable {
    let id: Int
    let name: String
    let bio: String? // Can be null or missing
    let balance: Double? // Can be missing

    // No CodingKeys needed if Swift names match or using strategy
}

let jsonStringOptional = """
{
  "id": 3,
  "name": "Charlie Brown",
  "bio": null
}
"""

let jsonDataOptional = jsonStringOptional.data(using: .utf8)!
let decoderOptional = JSONDecoder()
// decoderOptional.keyDecodingStrategy = .convertFromSnakeCase // Apply if needed

do {
    let profile = try decoderOptional.decode(UserProfile.self, from: jsonDataOptional)
    print("Decoded Profile: \\(profile.name)")
    print("Bio: \\(profile.bio ?? "N/A")") // bio is nil
    print("Balance: \\(profile.balance ?? 0.0)") // balance is nil because key was missing
} catch {
    print("Error decoding JSON with optionals: \\(error)")
}`}
              </code>
            </pre>
          </div>
          <p className="mt-4">
            If a non-optional property is missing or its value is null in the
            JSON,{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              JSONDecoder
            </code>{" "}
            will throw a{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              DecodingError
            </code>
            . Make sure your Swift properties match the JSON's nullability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <HelpCircle className="mr-2 text-yellow-500" /> Custom Decoding and
            Encoding
          </h2>
          <p>
            Sometimes, the automatic synthesis provided by{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Codable
            </code>{" "}
            isn't sufficient. You might need to:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Decode a single value that isn't wrapped in a dictionary/array.</li>
            <li>Handle types not natively supported by JSON (like custom structs, enums with associated values).</li>
            <li>Transform data during decoding (e.g., converting a date string to a{" "}
              <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
                Date
              </code>
              ).
            </li>
            <li>Decode nested or complex structures that don't directly map to simple properties.</li>
          </ul>
          <p className="mt-4">
            For these cases, you can manually implement the{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              init(from decoder: Decoder)
            </code>{" "}
            (for decoding) and{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              encode(to encoder: Encoder)
            </code>{" "}
            (for encoding) methods.
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Example: Decoding Date Strings</h3>
          <p>
            JSON often represents dates as strings. Swift's{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Date
            </code>{" "}
            type isn't a standard JSON type.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`{
  "event_name": "Swift Meetup",
  "event_date": "2023-10-27T10:00:00Z"
}`}
              </code>
            </pre>
          </div>
          <p className="mt-4">
            You can tell{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              JSONDecoder
            </code>{" "}
            how to handle date strings using its{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              dateDecodingStrategy
            </code>
            .
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-swift text-sm">
                {`struct Event: Codable {
    let eventName: String
    let eventDate: Date

    private enum CodingKeys: String, CodingKey {
        case eventName = "event_name"
        case eventDate = "event_date"
    }
}

let jsonStringEvent = """
{
  "event_name": "Swift Meetup",
  "event_date": "2023-10-27T10:00:00Z"
}
"""
let jsonDataEvent = jsonStringEvent.data(using: .utf8)!

let decoderEvent = JSONDecoder()
// ISO 8601 format is common for dates
decoderEvent.dateDecodingStrategy = .iso8601

do {
    let event = try decoderEvent.decode(Event.self, from: jsonDataEvent)
    print("Event: \\(event.eventName), Date: \\(event.eventDate)")
} catch {
    print("Error decoding event JSON: \\(error)")
}`}
              </code>
            </pre>
          </div>
          <p className="mt-4">
            There are several built-in date strategies, or you can define a{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              .custom
            </code>{" "}
            one. Similarly,{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              JSONEncoder
            </code>{" "}
            has a{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              dateEncodingStrategy
            </code>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Box className="mr-2 text-indigo-500" /> Working with Nested and Complex
            JSON
          </h2>
          <p>
            JSON structures are often nested.{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Codable
            </code>{" "}
            handles this naturally as long as the nested types also conform to{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Codable
            </code>
            .
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`{
  "order_id": "12345",
  "customer": {
    "name": "Diana Prince",
    "address": {
      "street": "Themyscira Rd",
      "city": "Paradise Island"
    }
  },
  "items": [
    {
      "item_id": "A99",
      "quantity": 2
    },
    {
      "item_id": "B50",
      "quantity": 1
    }
  ]
}`}
              </code>
            </pre>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-swift text-sm">
                {`struct Order: Codable {
    let orderId: String
    let customer: Customer
    let items: [OrderItem]

    private enum CodingKeys: String, CodingKey {
        case orderId = "order_id"
        case customer
        case items
    }
}

struct Customer: Codable {
    let name: String
    let address: Address
}

struct Address: Codable {
    let street: String
    let city: String
}

struct OrderItem: Codable {
    let itemId: String
    let quantity: Int

    private enum CodingKeys: String, CodingKey {
        case itemId = "item_id"
        case quantity
    }
}

let jsonStringOrder = """
... (the JSON above) ...
""" // Assume the JSON string is defined

let jsonDataOrder = jsonStringOrder.data(using: .utf8)!
let decoderOrder = JSONDecoder()
// decoderOrder.keyDecodingStrategy = .convertFromSnakeCase // Could also use strategy

do {
    let order = try decoderOrder.decode(Order.self, from: jsonDataOrder)
    print("Order \\(order.orderId) for \\(order.customer.name)")
    print("Items: \\(order.items.count)")
} catch {
    print("Error decoding order JSON: \\(error)")
}`}
              </code>
            </pre>
          </div>
          <p className="mt-4">
            By defining each nested structure as its own{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Codable
            </code>{" "}
            type, the decoder automatically handles the hierarchy. Arrays of
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Codable
            </code>{" "}
            elements are also decoded directly into Swift arrays.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2 text-teal-500" /> Performance Considerations
          </h2>
          <p>
            Swift's{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Codable
            </code>{" "}
            implementation is generally very efficient. For most typical app
            use cases, its performance will be more than adequate.
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              <strong>Data Size:</strong> Decoding/encoding very large JSON payloads (hundreds of MBs or more)
              might be slow or memory-intensive. For such extreme cases, consider streaming parsers or
              alternative libraries, although this is rare for typical mobile API responses.
            </li>
            <li>
              <strong>Manual vs. Synthesized:</strong> While manual{" "}
              <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
                init(from:)
              </code>{" "}
              and{" "}
              <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
                encode(to:)
              </code>{" "}
              allow flexibility, the synthesized implementations are highly optimized by the Swift compiler.
              Avoid manual implementation unless necessary.
            </li>
            <li>
              <strong>Background Threads:</strong> JSON operations can block the main thread if the data is large
              or processing is complex. Perform decoding/encoding on a background queue (e.g., using{" "}
              <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
                DispatchQueue.global().async
              </code>
              ) if the source data isn't trivial.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-orange-500" /> Common Pitfalls
          </h2>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              <strong>Type Mismatches:</strong> JSON values must exactly match the Swift property type (e.g., JSON
              number 1.0 must map to Double, not Int, unless you handle it manually).
            </li>
            <li>
              <strong>Optional vs. Required:</strong> Declaring a property as non-optional (`String`) when the
              JSON key might be missing or null will cause a decoding error. Use optionals (`String?`) where
              appropriate.
            </li>
            <li>
              <strong>Key Mismatches:</strong> Swift property names must match JSON keys exactly, or you must use{" "}
              <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
                CodingKeys
              </code>{" "}
              or{" "}
              <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
                keyDecodingStrategy
              </code>
              .
            </li>
            <li>
              <strong>Root Element:</strong> Ensure your decoding call matches the root of the JSON. If the JSON is
              a dictionary, decode to a struct/class. If it's an array, decode to `[YourStruct]`.
            </li>
            <li>
              <strong>Error Handling:</strong> Always use a `do-catch` block around decoding/encoding operations,
              as they are failable and throw errors.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <CheckCircle className="mr-2 text-green-500" /> Conclusion: Embrace Codable
          </h2>
          <p>
            Swift's{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              Codable
            </code>{" "}
            is the recommended and most Swifty way to handle JSON parsing and
            formatting in iOS development. It offers type safety, reduces
            boilerplate compared to manual JSON serialization using{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              JSONSerialization
            </code>
            , and is highly performant for most common scenarios. By
            understanding{" "}
            <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded text-sm font-mono">
              CodingKeys
            </code>
            , decoding/encoding strategies, and how to handle optional values
            and errors, you can efficiently work with JSON data in your iOS
            apps.
          </p>
        </section>
      </div>
    </div>
  );
}
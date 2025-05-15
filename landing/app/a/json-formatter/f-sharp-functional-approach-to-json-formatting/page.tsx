import type { Metadata } from "next";
import { Code, Box, Workflow, GitCommit, ArrowRightCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "F# Functional Approach to JSON Formatting | Offline Tools",
  description:
    "Explore the functional paradigms of F# for elegant and robust JSON serialization and deserialization, with examples using Thoth.Json.Net.",
};

export default function FSharpJsonFormattingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Code className="w-8 h-8 text-blue-500" />
        F# Functional Approach to JSON Formatting
      </h1>

      <div className="space-y-6">
        <p>
          Handling JSON data is a ubiquitous task in modern software development, whether you're building web services, configuration systems, or data pipelines. While many languages offer built-in JSON support, the functional approach in F# brings unique benefits, emphasizing clarity, robustness, and type safety through immutability, pattern matching, and powerful composition techniques.
        </p>
        <p>
          This article explores how F# handles JSON formatting (serialization) and parsing (deserialization) from a functional perspective, highlighting the advantages and providing practical examples. We'll primarily look at using libraries that embrace functional principles, such as <code>Thoth.Json.Net</code>, which is popular in the F# ecosystem.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Box className="w-6 h-6 text-green-500" />
          Why a Functional Approach?
        </h2>
        <p>
          Traditional object-oriented or imperative approaches often rely on mutable state and side effects during serialization/deserialization. F#'s functional paradigm encourages:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Immutability:</strong> Data structures are typically immutable, leading to predictable behavior and easier reasoning about code.
          </li>
          <li>
            <strong>Pure Functions:</strong> Serialization and deserialization logic can be encapsulated in pure functions that map input data to output data without side effects.
          </li>
          <li>
            <strong>Type Safety:</strong> F#'s strong type system helps catch potential errors at compile time, including mismatches between F# types and JSON structure.
          </li>
          <li>
            <strong>Composition:</strong> Complex encoders (for serialization) and decoders (for deserialization) can be built by composing simpler functions, making code modular and reusable.
          </li>
          <li>
            <strong>Pattern Matching:</strong> Effectively handle different JSON structures or different cases within F# types (like discriminated unions).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Workflow className="w-6 h-6 text-purple-500" />
          Representing JSON Structure in F#
        </h2>
        <p>
          Conceptually, JSON can be represented in F# using a discriminated union:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`type JsonValue =
    | JsonString of string
    | JsonNumber of decimal // or float/int
    | JsonBoolean of bool
    | JsonArray of JsonValue list
    | JsonObject of (string * JsonValue) list // A list of key-value pairs
    | JsonNull`}
          </pre>
        </div>
        <p>
          Libraries like <code>Thoth.Json.Net</code> often use a similar internal representation or provide functions that operate on this conceptual model. When serializing, you map an F# value to this structure; when deserializing, you map from this structure (obtained from parsing the string) back to an F# value.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <GitCommit className="w-6 h-6 text-red-500" />
          Serialization (Encoding)
        </h2>
        <p>
          Serialization is the process of converting an F# value into a JSON string. In a functional style, this is achieved by creating an "encoder" function for each specific F# type you want to serialize. Libraries provide basic encoders for primitive types, and you compose them to handle complex types like records, lists, and maps.
        </p>
        <p>
          Let's use <code>Thoth.Json.Net.Encode</code> as an example. It provides functions like <code>string</code>, <code>int</code>, <code>bool</code>, <code>list</code>, <code>obj</code>, etc.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Encoding a Simple Record</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`open Thoth.Json.Net
open System

// Define an F# record type
type Person = {
    Name: string
    Age: int
    IsStudent: bool
    RegisteredDate: DateTime
}

// Define an encoder function for the Person type
// It takes a Person object and returns a JsonValue representation
let encodePerson (person: Person) : JsonValue =
    Encode.object [ // Start building a JSON object
        "name", Encode.string person.Name // Encode the 'Name' field
        "age", Encode.int person.Age     // Encode the 'Age' field
        "isStudent", Encode.bool person.IsStudent // Encode 'IsStudent'
        "registeredDate", Encode.string (person.RegisteredDate.ToString("o")) // Encode DateTime as string (ISO 8601)
    ]

// Create a Person value
let bob = {
    Name = "Bob Smith"
    Age = 25
    IsStudent = true
    RegisteredDate = new DateTime(2023, 10, 27, 10, 30, 0, DateTimeKind.Utc)
}

// Encode the Person value to JsonValue
let bobJsonValue = encodePerson bob

// Convert the JsonValue to a formatted JSON string
let bobJsonString = Encode.toFormattedJsonString 2 bobJsonValue

// Output (example):
// {
//   "name": "Bob Smith",
//   "age": 25,
//   "isStudent": true,
//   "registeredDate": "2023-10-27T10:30:00.0000000Z"
// }`}
            </pre>
          </div>
        </div>
        <p>
          Notice how <code>encodePerson</code> is a pure function. It takes a <code>Person</code> and returns a <code>JsonValue</code>. We use composition: <code>Encode.object</code> takes a list of key-value pairs, where values are produced by other encoder functions like <code>Encode.string</code>, <code>Encode.int</code>, etc. Finally, <code>Encode.toFormattedJsonString</code> is a separate function to convert the <code>JsonValue</code> tree into a string.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ArrowRightCircle className="w-6 h-6 text-blue-500" />
          Deserialization (Decoding)
        </h2>
        <p>
          Deserialization is the reverse process: converting a JSON string into an F# value. This is typically handled by defining "decoder" functions. Functional JSON libraries often use a concept of a decoder that takes a <code>JsonValue</code> and attempts to produce a specific F# type, usually returning a <a href="https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/results" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline"><code>Result&lt;'a, string&gt;</code></a> type, where <code>Ok 'a</code> indicates success with the decoded value, and <code>Error string</code> indicates failure with an error message. This handles parsing errors gracefully.
        </p>
        <p>
          <code>Thoth.Json.Net.Decode</code> provides functions like <code>string</code>, <code>int</code>, <code>bool</code>, <code>list</code>, <code>field</code>, and operators for composing them, like <code>&gt;&gt;.</code> (the bind operator for decoders).
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Decoding to the Simple Record (using Operators)</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`open Thoth.Json.Net
open System

// Assume Person type is defined as above

// Define a decoder function for the Person type
// It takes a JsonValue and returns a Result<Person, string>
let decodePerson : Decoder<Person> =
    // Decode a field named "name" as a string, then bind the result
    Decode.field "name" Decode.string
    >>. // If successful, decode the next field...
    Decode.field "age" Decode.int
    >>. // ...and the next...
    Decode.field "isStudent" Decode.bool
    >>. // ...and the last field, converting the string back to DateTime
    Decode.field "registeredDate" Decode.string
    |> Decode.map (fun (((name, age), isStudent), dateString) ->
        // This map function takes the tuple of decoded values
        // and constructs the Person record.
        // Note: Decoding the DateTime string needs care,
        // using a library helper or specific parsing logic.
        // For simplicity, let's assume it's always parseable ISO 8601.
        let registeredDate = DateTime.Parse(dateString)
        { Name = name; Age = age; IsStudent = isStudent; RegisteredDate = registeredDate }
    )

// Assume bobJsonString contains the JSON string from the previous example

// Parse the JSON string into a JsonValue (this can fail if the string is invalid JSON)
let parseResult = Decode.fromString<JsonValue> bobJsonString

// Attempt to decode the JsonValue into a Person (this can fail if structure/types mismatch)
match parseResult with
| Ok jsonValue ->
    let decodeResult = decodePerson jsonValue
    match decodeResult with
    | Ok person ->
        printfn "Successfully decoded: %A" person
        // Output: Successfully decoded: {Name = "Bob Smith"; Age = 25; IsStudent = true; RegisteredDate = 10/27/2023 10:30:00 AM} (DateTime format depends on locale)
    | Error errorMsg ->
        fprintfn "Decoding failed: %s" errorMsg
| Error errorMsg ->
    fprintfn "Parsing failed: %s" errorMsg`}
            </pre>
          </div>
        </div>
        <p>
          The use of the <code>&gt;&gt;.</code> operator chains decoder steps together. Each step attempts to decode a specific field or structure. The final <code>Decode.map</code> function is applied to the successfully decoded values to construct the final F# value (the <code>Person</code> record). The entire decoding process is wrapped in a <code>Result</code> type, providing explicit error handling.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6 text-teal-500" />
          More Complex Examples (Lists, Nested Objects)
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Encoding/Decoding a List of People</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`open Thoth.Json.Net
open System

// Assume Person type and encodePerson/decodePerson are defined

type Household = {
    Address: string
    Residents: Person list
}

// Encoder for Household
let encodeHousehold (household: Household) : JsonValue =
    Encode.object [
        "address", Encode.string household.Address
        // Use Encode.list with the existing encodePerson function
        "residents", Encode.list encodePerson household.Residents
    ]

// Decoder for Household
let decodeHousehold : Decoder<Household> =
    Decode.field "address" Decode.string
    >>. // Use Decode.list with the existing decodePerson decoder
    Decode.field "residents" (Decode.list decodePerson)
    |> Decode.map (fun (address, residents) ->
        // Construct the Household record
        { Address = address; Residents = residents }
    )

let alice = { Name = "Alice Brown"; Age = 30; IsStudent = false; RegisteredDate = DateTime.UtcNow }
let charlie = { Name = "Charlie Davis"; Age = 5; IsStudent = false; RegisteredDate = DateTime.UtcNow }

let myHousehold = {
    Address = "123 Maple St"
    Residents = [bob; alice; charlie] // Use the 'bob' value from earlier
}

// Encode
let householdJsonString = encodeHousehold myHousehold |> Encode.toFormattedJsonString 2

// Decode
let decodedHouseholdResult =
    householdJsonString
    |> Decode.fromString<JsonValue> // First parse the string
    |> Result.bind decodeHousehold // Then attempt to decode the JsonValue

match decodedHouseholdResult with
| Ok household ->
    printfn "Successfully decoded Household: %A" household
| Error errorMsg ->
    fprintfn "Decoding Household failed: %s" errorMsg`}
            </pre>
          </div>
        </div>
        <p>
          This demonstrates the power of composition. We reused the <code>encodePerson</code> and <code>decodePerson</code> functions to handle lists of people within the <code>Household</code> type.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Workflow className="w-6 h-6 text-purple-500" />
          Functional Error Handling
        </h2>
        <p>
          As seen in the decoding examples, the use of the <code>Result&lt;'a, string&gt;</code> type is idiomatic F# for handling operations that might fail.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>Decode.fromString&lt;JsonValue&gt;</code> handles errors related to the JSON string format itself (e.g., malformed syntax).
          </li>
          <li>
            The individual field and type decoders (like <code>Decode.field</code>, <code>Decode.string</code>, <code>Decode.list decodePerson</code>) handle errors related to the JSON structure or data types not matching the expected F# type.
          </li>
          <li>
            The <code>Result.bind</code> (or <code>&gt;&gt;=</code>) and <code>Result.map</code> functions (or <code>|&gt; Result.map</code>) allow you to chain operations on the <code>Result</code>, propagating errors automatically. If any decoding step fails, the entire composition fails, returning an <code>Error</code> result with the first error encountered.
          </li>
        </ul>
        <p>
          This contrasts with exceptions often used in imperative programming, making the success or failure outcome explicit in the function's type signature and encouraging handling errors where they occur.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Box className="w-6 h-6 text-green-500" />
          Benefits Summarized
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Predictability:</strong> Immutability and pure functions make serialization/deserialization logic easy to test and understand.
          </li>
          <li>
            <strong>Type Safety:</strong> The compiler helps ensure your F# types match the JSON structure you expect.
          </li>
          <li>
            <strong>Modularity:</strong> Encoders and decoders are simple, reusable functions that can be composed.
          </li>
          <li>
            <strong>Explicit Error Handling:</strong> The <code>Result</code> type forces you to consider failure cases explicitly.
          </li>
          <li>
            <strong>Maintainability:</strong> Changes to your F# types or JSON structure often require only localized changes to the corresponding encoders/decoders.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Adopting a functional approach to JSON formatting in F#, particularly with libraries designed for this style like <code>Thoth.Json.Net</code>, offers significant advantages in terms of code clarity, robustness, and maintainability. By treating serialization and deserialization as compositions of pure functions and using the type system and <code>Result</code> type for error handling, developers can build reliable JSON handling logic that is less prone to runtime surprises compared to approaches relying heavily on reflection, mutation, or exceptions. While other libraries exist (including wrappers around .NET's <code>System.Text.Json</code>), the composition-based functional decoders/encoders stand out as a powerful and idiomatic way to handle structured data in F#.
        </p>
      </div>
    </>
  );
}
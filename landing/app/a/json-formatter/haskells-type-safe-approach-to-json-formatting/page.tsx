import type { Metadata } from "next";
import { ShieldCheck, Code, Type, BookOpen, Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Haskell's Type-Safe Approach to JSON Formatting | Offline Tools",
  description:
    "Explore how Haskell leverages its powerful type system to provide compile-time safety when working with JSON data.",
};

export default function HaskellTypeSafeJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <ShieldCheck className="mr-3 text-green-600" size={32} /> Haskell's Type-Safe Approach to JSON Formatting
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          JSON (JavaScript Object Notation) is the ubiquitous data format for web services and APIs. While incredibly
          flexible, its dynamic nature in many languages (like JavaScript or Python) means that errors related to data
          structure mismatch or incorrect types often only surface at runtime. This can lead to unexpected crashes or
          subtle data corruption issues in production.
        </p>
        <p>
          Haskell, a purely functional language known for its strong static type system, offers a different perspective.
          By representing JSON structures using rich algebraic data types, Haskell allows developers to catch a vast
          array of potential JSON formatting and parsing errors at compile-time, significantly enhancing reliability and
          maintainability.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Type className="mr-2 text-blue-600" /> The Problem with Dynamic JSON
        </h2>
        <p>Consider a simple JSON object representing a user:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": ["Math", "Science"]
}`}
          </pre>
        </div>
        <p>
          In a dynamically typed language, if you expect the <code>age</code> field to be a number but receive a string,
          or if the <code>courses</code> field is missing entirely, your program might crash or behave incorrectly only
          when that specific code path is executed with the malformed data.
        </p>
        <div className="flex items-start bg-yellow-100 p-3 rounded-lg text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
          <AlertTriangle className="mt-1 mr-3 shrink-0" />
          <p>
            <strong>Runtime Errors:</strong> The danger with dynamic JSON handling is that issues like missing fields,
            incorrect data types, or structural changes in the JSON schema are typically discovered only when the
            program is running, potentially in production.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <BookOpen className="mr-2 text-purple-600" /> Haskell's Type-Centric Solution
        </h2>
        <p>
          Haskell tackles this by defining precise data types that mirror the expected JSON structure. The most popular
          library for JSON handling in Haskell is{" "}
          <a
            href="https://hackage.haskell.org/package/aeson"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            <code>aeson</code>
          </a>
          . It provides a type class called <code>ToJSON</code> (for encoding Haskell types to JSON) and{" "}
          <code>FromJSON</code> (for decoding JSON into Haskell types).
        </p>
        <p>
          By implementing these type classes for your custom data types, you tell Haskell exactly how instances of those
          types should be represented as JSON and how to convert JSON back into those types.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2 text-cyan-600" /> Defining Types and Deriving Instances
        </h3>
        <p>Let's represent the user JSON structure in Haskell:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="font-mono text-sm text-gray-700 dark:text-gray-300">User.hs</h4>
          <pre className="text-sm language-haskell">
            {`{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE OverloadedStrings #-} -- Useful for string literals

import GHC.Generics
import Data.Aeson

data User = User
  { userName :: String
  , userAge :: Int
  , userIsStudent :: Bool
  , userCourses :: [String]
  } deriving (Show, Generic)`}
          </pre>
        </div>
        <p>
          Here we define a data type <code>User</code> with fields matching the JSON structure. The magic comes with
          deriving the <code>Generic</code> instance. This tells the compiler to automatically generate the necessary
          boilerplate code for several type classes, including <code>ToJSON</code> and <code>FromJSON</code>, which we
          can derive like this:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="font-mono text-sm text-gray-700 dark:text-gray-300">User.hs (continued)</h4>
          <pre className="text-sm language-haskell">
            {`data User = User
  { userName :: String
  , userAge :: Int
  , userIsStudent :: Bool
  , userCourses :: [String]
  } deriving (Show, Generic, ToJSON, FromJSON)`}
          </pre>
        </div>
        <p>
          With this simple addition, the Haskell compiler now knows how to automatically convert a <code>User</code>{" "}
          value to a JSON object and attempt to convert a JSON object back into a <code>User</code> value. The field
          names in the data type are automatically mapped to JSON keys (with options for customization).
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Lightbulb className="mr-2 text-yellow-600" /> How Type Safety Works
        </h3>
        <p>Let's look at encoding and decoding examples.</p>

        <h4 className="text-lg font-semibold mt-4">Encoding (Haskell to JSON)</h4>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="font-mono text-sm text-gray-700 dark:text-gray-300">Main.hs</h4>
          <pre className="text-sm language-haskell">
            {`import Data.Aeson
import Data.ByteString.Lazy.Char8 as LBS (putStrLn)
import User (User(..)) -- Import our User type

main :: IO ()
main = do
  let alice = User
        { userName = "Alice"
        , userAge = 30
        , userIsStudent = False
        , userCourses = ["Math", "Science"]
        }
  -- encode converts a ToJSON instance to a ByteString
  let jsonOutput = encode alice
  LBS.putStrLn jsonOutput
  -- Output: {"userName":"Alice","userAge":30,"userIsStudent":false,"userCourses":["Math","Science"]}`}{" "}
          </pre>
        </div>
        <p>
          If you tried to create a <code>User</code> value with an incorrect type (e.g., <code>userAge = "thirty"</code>
          ), the compiler would immediately raise a type error. The structure is enforced at the point of creating the
          Haskell value, before it's ever encoded to JSON.
        </p>

        <h4 className="text-lg font-semibold mt-4">Decoding (JSON to Haskell)</h4>
        <p>
          This is where type safety truly shines for *consuming* JSON.
          <code>aeson</code> provides functions like <code>decode</code> or <code>eitherDecode</code> which attempt to
          parse a JSON ByteString into a specific Haskell type.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="font-mono text-sm text-gray-700 dark:text-gray-300">Main.hs</h4>
          <pre className="text-sm language-haskell">
            {`import Data.Aeson
import Data.ByteString.Lazy.Char8 as LBS (pack, putStrLn)
import User (User(..))
import Data.Either (either) -- To handle the result of eitherDecode

main :: IO ()
main = do
  let jsonInputGood = LBS.pack "{\\"userName\\":\\"Alice\\",\\"userAge\\":30,\\"userIsStudent\\":false,\\"userCourses\\":[\\"Math\\",\\"Science\\"]}"
  let jsonInputBad = LBS.pack "{\\"name\\":\\"Bob\\",\\"age\\":\\"twenty\\",\\"isStudent\\":true}" -- Age is wrong type

  -- eitherDecode returns Left String (error) or Right User (success)
  let resultGood :: Either String User
      resultGood = eitherDecode jsonInputGood

  let resultBad :: Either String User
      resultBad = eitherDecode jsonInputBad

  putStrLn "Decoding Good JSON:"
  either putStrLn print resultGood -- Prints the User value on success

  putStrLn "\\nDecoding Bad JSON:"
  either putStrLn print resultBad -- Prints the error message on failure`}
          </pre>
        </div>
        <p>
          The type signature <code>Either String User</code> for the result of <code>eitherDecode</code> is key. It
          forces you, the developer, to explicitly handle the case where decoding fails (represented by the
          <code>Left String</code> constructor, containing an error message). You cannot get a <code>User</code> value
          out of <code>eitherDecode</code> unless the parsing *and* type validation succeeded according to the
          <code>FromJSON</code> instance derived for <code>User</code>.
        </p>
        <div className="flex items-start bg-green-100 p-3 rounded-lg text-green-800 dark:bg-green-800 dark:text-green-100">
          <CheckCircle className="mt-1 mr-3 shrink-0" />
          <p>
            <strong>Compile-Time Safety:</strong> Because the expected JSON structure is baked into your Haskell data
            types, the compiler can verify that your code attempting to process a <code>User</code> value is sound. If
            the JSON fails to decode into a <code>User</code>, your program has to explicitly deal with that failure
            case, rather than crashing later when it tries to access a non-existent field or a field with an unexpected
            type.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ShieldCheck className="mr-2 text-teal-600" /> Benefits of This Approach
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Early Error Detection:</strong> Many JSON format errors (wrong types, missing fields) are caught at
            compile time during development, not at runtime in production.
          </li>
          <li>
            <strong>Code Clarity:</strong> Your data types serve as clear, executable documentation for the expected
            JSON structure.
          </li>
          <li>
            <strong>Refactoring Safety:</strong> If the JSON schema changes, updating your Haskell data types will cause
            compile-time errors wherever your code is affected, guiding you through the necessary changes.
          </li>
          <li>
            <strong>Increased Confidence:</strong> You can be much more confident that if your JSON decoding succeeds,
            the resulting data structure is exactly what your types say it is.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 text-red-600" /> Considerations and Complexities
        </h2>
        <p>While powerful, the type-safe approach isn't without its nuances:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Schema Evolution:</strong> Handling optional fields or versions of a JSON schema requires more
            sophisticated type design (e.g., using <code>Maybe</code> for optional fields) and potentially custom{" "}
            <code>FromJSON</code> instances if the changes are complex.
          </li>
          <li>
            <strong>Dynamic JSON:</strong> If you truly need to work with JSON whose structure is unknown or highly
            variable at compile time,
            <code>aeson</code> provides a generic <code>Value</code> type (representing any JSON value). However,
            working with <code>Value</code> involves runtime checks and pattern matching, trading away some of the
            compile-time safety.
          </li>
          <li>
            <strong>Learning Curve:</strong> Understanding Haskell's type system and how <code>aeson</code> uses type
            classes and generics requires initial investment.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Lightbulb className="mr-2 text-blue-600" /> Conclusion
        </h2>
        <p>
          Haskell's type-safe approach to JSON formatting, primarily through the
          <code>aeson</code> library and its integration with the language's powerful type system, offers a robust
          alternative to dynamic JSON handling. By defining your data structures upfront using algebraic data types and
          deriving or implementing <code>ToJSON</code>/<code>FromJSON</code> instances, you shift potential runtime
          errors into compile-time errors, leading to more reliable, maintainable, and predictable code when working
          with structured data like JSON. While it requires embracing a different paradigm, the safety and confidence
          gained are significant benefits, especially for critical backend services.
        </p>
      </div>
    </>
  );
}

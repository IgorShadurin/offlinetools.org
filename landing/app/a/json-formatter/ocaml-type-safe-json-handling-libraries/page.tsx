import type { Metadata } from "next";
import { Lock, Code, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "OCaml Type-Safe JSON Handling Libraries | Offline Tools",
  description:
    "Explore OCaml libraries like Yojson and ppx_yojson_conv for safe and efficient JSON encoding and decoding.",
};

export default function OCamlTypeSafeJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Lock className="mr-3 text-blue-600" size={36} />
        OCaml Type-Safe JSON Handling Libraries
      </h1>

      <div className="space-y-6">
        <p>
          Handling JSON data is a ubiquitous task in modern software development, especially when interacting with web
          services, APIs, or configuration files. While JSON is dynamic and flexible, OCaml is a statically-typed
          language that emphasizes type safety at compile time. This fundamental difference poses a challenge: how do
          you reliably convert dynamic JSON data into structured OCaml types and vice-versa without losing type safety?
        </p>
        <p>
          Manually parsing and generating JSON in OCaml can be tedious and error-prone. It often involves pattern
          matching on abstract JSON types (`Yojson.Safe.t`, `Data_encoding.json`, etc.) and performing type assertions
          or checks at runtime. Errors in this process can lead to runtime exceptions (`Invalid_argument`, `Failure`,
          etc.) that are not caught by the compiler.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-green-600" size={24} />
          The Solution: Libraries with Type Derivation
        </h2>
        <p>
          Fortunately, the OCaml ecosystem provides powerful libraries that bridge this gap by leveraging OCaml&apos;s
          metaprogramming capabilities (specifically,{" "}
          <a
            href="https://github.com/ocaml/ocaml/wiki/Preprocessor"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ppx derivers
          </a>
          ). These libraries allow you to automatically generate the necessary JSON encoding and decoding functions
          directly from your OCaml type definitions. This approach ensures that if your OCaml code compiles, your JSON
          handling code for those types is also type-correct.
        </p>

        <h3 className="text-xl font-semibold mt-6">Key Libraries</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Yojson:</strong> A widely-used, comprehensive JSON library for OCaml. It provides core types for
            representing JSON and functions for parsing and printing. Its true power for type safety comes from
            integrations like `ppx_yojson_conv`.
          </li>
          <li>
            <strong>ppx_yojson_conv:</strong> A ppx rewriter that generates `of_yojson` and `to_yojson` functions for
            OCaml types annotated with `[@@deriving yojson]`. This is the standard way to get type-safe, automatic JSON
            serialization/deserialization with Yojson.
          </li>
          <li>
            <strong>Data.Json.Extended (part of Core/Base/Async):</strong> Another option within the Jane Street
            ecosystem. It provides a different API and uses the `[@@deriving sexp, json]` syntax (deriving `json`
            typically implies deriving `sexp` first). While also type-safe, `ppx_yojson_conv` is often considered more
            idiomatic and independent of the Jane Street libraries.
          </li>
          {/* <li>Data_encoding: Used frequently in the Tezos ecosystem. Provides a combinator-based approach for defining encodings, including JSON.</li> */}
        </ul>

        <p>
          For most general-purpose OCaml development requiring type-safe JSON handling, the combination of
          <strong>Yojson</strong> and <strong>ppx_yojson_conv</strong> is the de facto standard and the most flexible
          approach. We will focus on this combination.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-600" size={24} />
          Using Yojson with ppx_yojson_conv
        </h2>
        <p>
          The process is simple: define your OCaml type and add the `[@@deriving yojson]` annotation. The ppx rewriter,
          when run during compilation, will generate two functions for your type `t`:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>t_of_yojson : Yojson.Safe.t -&gt; t</code> (for decoding JSON to your type)
          </li>
          <li>
            <code>t_to_yojson : t -&gt; Yojson.Safe.t</code> (for encoding your type to JSON)
          </li>
        </ul>
        <p>
          The generated `of_yojson` function handles type checking at runtime. If the JSON structure or types do not
          match the OCaml definition, it will raise a `Json_encoding.Json_error` exception (or similar, depending on the
          exact ppx version and configuration), indicating a deserialization failure.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example: Simple Record Type</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">OCaml Code (`user.ml`):</h4>
          <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900">
            {`(* Assuming you have enabled ppx_yojson_conv in your build system (e.g., dune) *)
type user = {
  id: int;
  name: string;
  email: string option; (* Optional field *)
  is_active: bool;
} [@@deriving yojson]

(* Now you have user_of_yojson and user_to_yojson functions available *)

let sample_user = {
  id = 1;
  name = "Alice";
  email = Some "alice@example.com";
  is_active = true;
}

let sample_user_json = user_to_yojson sample_user

(* sample_user_json will be a Yojson.Safe.t value *)
(* You can then convert it to a string: *)
let sample_user_json_string = Yojson.Safe.to_string ~std:true sample_user_json

(* Printing the string representation *)
let () = Printf.printf "Encoded JSON: %s\\n" sample_user_json_string

(* Decoding from a JSON string *)
let json_string_to_decode = {| {"id": 2, "name": "Bob", "email": null, "is_active": false} |}

let decoded_user_result =
  try
    Ok (user_of_yojson (Yojson.Safe.from_string json_string_to_decode))
  with
  | Yojson.Json_error err -> Error err
  | Failure err -> Error err (* Catch potential errors from from_string *)

let () =
  match decoded_user_result with
  | Ok user ->
      Printf.printf "Decoded user: { id: %d; name: %s; email: %s; is_active: %b }\\n"
        user.id user.name (match user.email with Some e -> e | None -> "None") user.is_active
  | Error err ->
      Printf.eprintf "Error decoding JSON: %s\\n" err;
      exit 1 (* Indicate failure *)

(* Example of decoding failure (e.g., wrong type for id) *)
let bad_json_string = {| {"id": "three", "name": "Charlie", "is_active": true} |}

let decoded_bad_user_result =
  try
    Ok (user_of_yojson (Yojson.Safe.from_string bad_json_string))
  with
  | Yojson.Json_error err -> Error err
  | Failure err -> Error err

let () =
  match decoded_bad_user_result with
  | Ok _user -> Printf.printf "Unexpectedly decoded bad JSON!\\n"
  | Error err -> Printf.eprintf "Successfully caught decoding error: %s\\n" err
`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Note: Running this requires setting up a build system like Dune that enables `ppx_yojson_conv`.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example: Variant Type</h3>
        <p>
          Variants are OCaml&apos;s way of representing sum types or enums. `ppx_yojson_conv` handles these elegantly,
          typically encoding them as JSON objects with a single key representing the constructor name and the value
          being the argument (or an empty object for constructors without arguments).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">OCaml Code (`status.ml`):</h4>
          <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900">
            {`type task_status =
  | Todo
  | InProgress of string (* Assignee's name *)
  | Done of { completion_date: string; verified_by: string option }
  | Cancelled of string (* Reason *)
[@@deriving yojson]

(* Encoding examples *)
let todo_status_json = task_status_to_yojson Todo
let () = Printf.printf "Encoded Todo: %s\\n" (Yojson.Safe.to_string ~std:true todo_status_json)
(* Output: {"Todo":[]} or similar, depending on ppx version *)

let inprogress_status_json = task_status_to_yojson (InProgress "Bob")
let () = Printf.printf "Encoded InProgress: %s\\n" (Yojson.Safe.to_string ~std:true inprogress_status_json)
(* Output: {"InProgress":["Bob"]} or similar *)

let done_status_json = task_status_to_yojson (Done { completion_date = "2023-10-27"; verified_by = Some "Alice" })
let () = Printf.printf "Encoded Done: %s\\n" (Yojson.Safe.to_string ~std:true done_status_json)
(* Output: {"Done":[{"completion_date":"2023-10-27","verified_by":"Alice"}]} or similar *)

let cancelled_status_json = task_status_to_yojson (Cancelled "Not needed anymore")
let () = Printf.printf "Encoded Cancelled: %s\\n" (Yojson.Safe.to_string ~std:true cancelled_status_json)
(* Output: {"Cancelled":["Not needed anymore"]} or similar *)


(* Decoding example *)
let json_string_inprogress = {| {"InProgress": ["Charlie"]} |}
let decoded_inprogress = task_status_of_yojson (Yojson.Safe.from_string json_string_inprogress)
let () = Printf.printf "Decoded: %s\\n" (match decoded_inprogress with InProgress name -> Printf.sprintf "InProgress(%s)" name | _ -> "Other status")

(* Decoding failure example *)
let bad_json_variant = {| {"Doing": []} |} (* Unknown constructor *)
let decoded_bad_variant_result =
  try
    Ok (task_status_of_yojson (Yojson.Safe.from_string bad_json_variant))
  with
  | Yojson.Json_error err -> Error err
  | Failure err -> Error err

let () =
  match decoded_bad_variant_result with
  | Ok _ -> Printf.printf "Unexpectedly decoded bad variant!\\n"
  | Error err -> Printf.eprintf "Successfully caught bad variant error: %s\\n" err
`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Customizing JSON Keys</h3>
        <p>
          By default, `ppx_yojson_conv` uses the OCaml field or constructor names. You can customize the JSON key names
          using attributes:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">OCaml Code with Attributes:</h4>
          <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900">
            {`type product = {
  id: string [@key "product_id"]; (* Use "product_id" in JSON *)
  name: string;
  price_cents: int [@key "price"]; (* Use "price" *)
} [@@deriving yojson]

let sample_product = { id = "abc-123"; name = "Widget"; price_cents = 999 }
let sample_product_json_string =
  product_to_yojson sample_product
  |> Yojson.Safe.to_string ~std:true

let () = Printf.printf "Encoded Product: %s\\n" sample_product_json_string
(* Output will use "product_id" and "price" keys *)

let json_string_to_decode_product = {| {"product_id": "xyz-456", "name": "Gadget", "price": 1299} |}
let decoded_product =
  product_of_yojson (Yojson.Safe.from_string json_string_to_decode_product)

let () = Printf.printf "Decoded Product: { id: %s; name: %s; price_cents: %d }\\n"
  decoded_product.id decoded_product.name decoded_product.price_cents
`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="mr-2 text-teal-600" size={24} />
          Advantages of Type-Safe JSON Handling
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Compile-Time Safety:</strong> The most significant benefit. If your OCaml types change, the compiler
            will flag errors if your `[@@deriving yojson]` annotation becomes invalid (e.g., due to conflicting field
            names).
          </li>
          <li>
            <strong>Reduced Runtime Errors:</strong> While decoding can still fail if the *input JSON data* doesn&apos;t
            match the *expected type structure*, errors related to your OCaml type definition or trivial mapping
            mistakes are eliminated at compile time. The runtime errors you might encounter during decoding are
            specific, structured errors indicating data mismatch, not generic exceptions from manual processing.
          </li>
          <li>
            <strong>Less Boilerplate:</strong> Manually writing encoding/decoding logic for complex nested types is
            repetitive. Deriving automates this entirely.
          </li>
          <li>
            <strong>Maintainability:</strong> As your OCaml types evolve, the JSON serialization logic stays in sync
            automatically.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 text-orange-600" size={24} />
          Things to Consider
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Build System Integration:</strong> You need to configure your build tool (like Dune) to use
            `ppx_yojson_conv`. This is standard for OCaml projects using ppxs but adds a step compared to languages with
            built-in reflection.
          </li>
          <li>
            <strong>Error Handling:</strong> The generated `of_yojson` function raises an exception on failure. You must
            explicitly wrap calls to `of_yojson` in `try...with` blocks or use a result-based helper to handle potential
            decoding errors gracefully.
          </li>
          <li>
            <strong>Complex Cases:</strong> While derivation works for most common types (records, variants, lists,
            options, tuples, base types), you might need manual or custom converters for very complex structures,
            recursive types, or when dealing with JSON formats that don&apos;t map cleanly to OCaml types (e.g., JSON
            objects used as maps with arbitrary string keys). `ppx_yojson_conv` supports custom converters for specific
            fields.
          </li>
          <li>
            <strong>Performance:</strong> The derived functions are generally efficient, but for extreme performance
            needs with very large JSON data, handcrafted parsers or specialized streaming libraries might be considered,
            though this is rarely necessary.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          For OCaml developers, handling JSON data with type safety is not only possible but highly recommended. By
          leveraging libraries like Yojson and the powerful `ppx_yojson_conv` deriver, you can eliminate a large class
          of potential runtime errors related to JSON serialization and deserialization. This leads to more robust,
          maintainable, and trustworthy code, allowing you to focus on your application&apos;s logic rather than tedious
          data conversion details. Embracing the `[@@deriving yojson]` pattern is a standard practice that significantly
          enhances the OCaml development experience when working with JSON.
        </p>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { Box, List, Check, X, Code, Lightbulb, Zap, Feather } from "lucide-react"; // Using lucide-react

export const metadata: Metadata = {
  title: "Erlang's Pattern Matching for JSON Processing",
  description:
    "Explore how Erlang's powerful pattern matching can be effectively used to process and destructure JSON data.",
};

export default function ErlangJsonPatternMatchingArticle() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Erlang&apos;s Pattern Matching for JSON Processing</h1>

      <div className="space-y-10 text-lg leading-relaxed">
        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <Lightbulb className="mr-3 text-yellow-500" size={28} /> Introduction
          </h2>
          <p>
            Erlang is a powerful functional programming language known for its capabilities in building highly
            available, fault-tolerant, and scalable systems. One of its most distinctive and useful features is{" "}
            <strong>Pattern Matching</strong>. While often discussed in the context of function heads or case
            statements, pattern matching is an incredibly versatile tool that can simplify many data processing tasks,
            including working with structured data like JSON.
          </p>
          <p>
            JSON (JavaScript Object Notation) is a ubiquitous data interchange format. It&apos;s human-readable,
            hierarchical, and widely used in web APIs, configuration files, and data storage. Processing JSON in many
            languages involves explicit steps: checking if a key exists, accessing properties using dot notation or
            square brackets, handling potential nulls or missing fields, and iterating through arrays. Erlang&apos;s
            pattern matching offers an alternative, often more declarative, way to approach these tasks.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <Code className="mr-3 text-blue-500" size={28} /> Representing JSON in Erlang
          </h2>
          <p>
            Before we can pattern match on JSON, we need to represent it using Erlang&apos;s native data types. When
            JSON is parsed in Erlang (typically using a library like <code>jsx</code>, <code>jsone</code>, or
            Erlang&apos;s built-in <code>json</code> module in recent versions), it gets transformed into Erlang terms:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong className="font-mono">
                JSON Object <Box size={18} className="inline mb-1 text-purple-500" />
              </strong>
              : Represented as an Erlang{" "}
              <a
                href="https://www.erlang.org/doc/programming_examples/maps.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Map
              </a>{" "}
              (<code>#&#x7b;&#x7d;</code>). Keys are usually atoms or binaries (Erlang&apos;s byte strings,{" "}
              <code>&lt;&lt;&gt;&gt;</code>). Values are other Erlang terms.
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-2 overflow-x-auto text-sm">
                {`JSON: &#x7b;"name": "Alice", "age": 30, "isStudent": false&#x7d;`}
                <br />
                {`Erlang: #&#x7b;"name" => &lt;&lt;"Alice"&gt;&gt;, "age" => 30, "isStudent" => false&#x7d;`}
              </pre>
              (Note: Erlang maps use <code>=&gt;</code> for key-value association).
            </li>
            <li>
              <strong className="font-mono">
                JSON Array <List size={18} className="inline mb-1 text-green-500" />
              </strong>
              : Represented as an Erlang{" "}
              <a
                href="https://www.erlang.org/doc/getting_started/list_comprehensions.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                List
              </a>{" "}
              (<code>[]</code>).
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-2 overflow-x-auto text-sm">
                {`JSON: [1, "apple", true, &#x7b;"id": 101&#x7d;]`}
                <br />
                {`Erlang: [1, &lt;&lt;"apple"&gt;&gt;, true, #&#x7b;"id" => 101&#x7d;]`}
              </pre>
            </li>
            <li>
              <strong className="font-mono">JSON String</strong>: Erlang{" "}
              <a
                href="https://www.erlang.org/doc/getting_started/binaries.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Binary
              </a>{" "}
              (<code>&lt;&lt;&gt;&gt;</code>) is the most common representation for efficiency.
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-2 overflow-x-auto text-sm">
                {`JSON: "hello"`}
                <br />
                {`Erlang: &lt;&lt;"hello"&gt;&gt;`}
              </pre>
            </li>
            <li>
              <strong className="font-mono">JSON Number</strong>: Erlang{" "}
              <a
                href="https://www.erlang.org/doc/reference_manual/data_types.html#id85843"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Integer or Float
              </a>
              .
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-2 overflow-x-auto text-sm">
                {`JSON: 42, -3.14`}
                <br />
                {`Erlang: 42, -3.14`}
              </pre>
            </li>
            <li>
              <strong className="font-mono">JSON Boolean</strong>: Erlang{" "}
              <a
                href="https://www.erlang.org/doc/reference_manual/data_types.html#id85843"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Atoms
              </a>{" "}
              <code>true</code> or <code>false</code>.
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-2 overflow-x-auto text-sm">
                {`JSON: true, false`}
                <br />
                {`Erlang: true, false`}
              </pre>
            </li>
            <li>
              <strong className="font-mono">JSON Null</strong>: Erlang{" "}
              <a
                href="https://www.erlang.org/doc/reference_manual/data_types.html#id85843"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Atom
              </a>{" "}
              <code>null</code>.
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-2 overflow-x-auto text-sm">
                {`JSON: null`}
                <br />
                {`Erlang: null`}
              </pre>
            </li>
          </ul>
          <p>
            Once parsed into these Erlang terms, pattern matching becomes a natural fit for inspecting and extracting
            data.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <Zap className="mr-3 text-indigo-500" size={28} /> Pattern Matching Basics with JSON Data
          </h2>
          <p>
            Pattern matching allows you to test if a term has a specific structure and, if it does, bind variables to
            parts of that structure. This replaces explicit checks and accessors in many cases. Let&apos;s look at
            examples using a fictional Erlang function <code>process_json(JsonTerm)</code>.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3 flex items-center">
            Matching a Simple Object <Box size={20} className="inline mb-1 ml-2 text-purple-500" />
          </h3>
          <p>
            Suppose we expect a JSON object like <code>{`&#x7b;"id": 123, "status": "active"&#x7d;`}</code>.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-2 overflow-x-auto text-sm">
            {`-module(json_processor).
-export([process_json/1]).

process_json(#&#x7b;"id" := Id, "status" := &lt;&lt;"active"&gt;&gt;&#x7d;) ->
    io:format("Processing active item with ID: ~w~n", [Id]);
process_json(#&#x7b;"id" := Id, "status" := &lt;&lt;"inactive"&gt;&gt;&#x7d;) ->
    io:format("Processing inactive item with ID: ~w~n", [Id]);
process_json(Other) ->
    io:format("Unrecognized JSON structure or status: ~p~n", [Other]).`}
          </pre>
          <p>
            <Feather size={20} className="inline mb-1 mr-2 text-gray-500" />
            <strong>Explanation:</strong>
            <ul>
              <li>
                The first function head <code>#&#x7b;"id" := Id, "status" := &lt;&lt;"active"&gt;&gt;&#x7d;</code>{" "}
                attempts to match an Erlang map.
              </li>
              <li>
                <code>"id" := Id</code> matches a key <code>"id"</code> and binds its value to the variable{" "}
                <code>Id</code>.
              </li>
              <li>
                <code>"status" := &lt;&lt;"active"&gt;&gt;</code> specifically matches a key <code>"status"</code> *only
                if* its value is the binary <code>&lt;&lt;"active"&gt;&gt;</code>.
              </li>
              <li>
                If the input <code>JsonTerm</code> matches the first pattern, the first function body executes, and{" "}
                <code>Id</code> is available.
              </li>
              <li>
                The second function head similarly matches if the status is <code>&lt;&lt;"inactive"&gt;&gt;</code>.
              </li>
              <li>
                The third function head <code>process_json(Other)</code> uses the wildcard <code>Other</code> (or simply{" "}
                <code>_</code> if we don&apos;t need the value) to catch any input that didn&apos;t match the previous
                patterns. This is crucial for handling unexpected data or providing default behavior.
              </li>
            </ul>
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3 flex items-center">
            Matching a Simple Array <List size={20} className="inline mb-1 ml-2 text-green-500" />
          </h3>
          <p>
            Let&apos;s process a JSON array of coordinates, like <code>[10.5, 20.0]</code>.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-2 overflow-x-auto text-sm">
            {`process_coordinates([X, Y]) when is_number(X), is_number(Y) ->
    io:format("Coordinates are (~.2f, ~.2f)~n", [X, Y]);
process_coordinates(Other) ->
    io:format("Expected a list of two numbers, got: ~p~n", [Other]).`}
          </pre>
          <p>
            <Feather size={20} className="inline mb-1 mr-2 text-gray-500" />
            <strong>Explanation:</strong>
            <ul>
              <li>
                <code>[X, Y]</code> matches a list with exactly two elements, binding the first to <code>X</code> and
                the second to <code>Y</code>.
              </li>
              <li>
                <code>when is_number(X), is_number(Y)</code> is a{" "}
                <a
                  href="https://www.erlang.org/doc/getting_started/pattern_matching.html#id84065"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Guard
                </a>
                . The pattern must match *and* the guard must evaluate to <code>true</code> for this clause to be
                selected. This adds constraints beyond structure.
              </li>
              <li>The second clause catches anything that isn&apos;t a list of exactly two numbers.</li>
            </ul>
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3 flex items-center">Extracting Nested Data</h3>
          <p>
            Consider a more complex structure:{" "}
            <code>{`&#x7b;"user": &#x7b;"id": 456, "name": "Bob"&#x7d;, "role": "admin"&#x7d;`}</code>.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-2 overflow-x-auto text-sm">
            {`process_nested_user(#&#x7b;"user" := #&#x7b;"id" := UserId, "name" := UserName&#x7d;, "role" := &lt;&lt;"admin"&gt;&gt;&#x7d;) ->
    io:format("Admin user ID: ~w, Name: ~s~n", [UserId, UserName]);
process_nested_user(#&#x7b;"user" := #&#x7b;"id" := UserId, "name" := UserName&#x7d;, "role" := &lt;&lt;"user"&gt;&gt;&#x7d;) ->
    io:format("Standard user ID: ~w, Name: ~s~n", [UserId, UserName]);
process_nested_user(Other) ->
    io:format("Unexpected nested structure: ~p~n", [Other]).`}
          </pre>
          <p>
            <Feather size={20} className="inline mb-1 mr-2 text-gray-500" />
            <strong>Explanation:</strong>
            <ul>
              <li>
                Patterns can be nested. Here, we match a map that must have a key <code>"user"</code> whose value is
                *itself* a map, containing keys <code>"id"</code> and <code>"name"</code>.
              </li>
              <li>
                We bind variables (<code>UserId</code>, <code>UserName</code>) directly to the values deep within the
                structure.
              </li>
              <li>Again, multiple clauses handle different cases (admin vs. standard user roles).</li>
            </ul>
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3 flex items-center">Handling Optional/Missing Fields</h3>
          <p>
            JSON doesn&apos;t guarantee the presence of keys. Erlang map patterns require keys to be present unless
            specific techniques are used. A common way to handle optional keys or provide defaults is using{" "}
            <code>maps:get/3</code> or separate clauses.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-2 overflow-x-auto text-sm">
            {`process_item_with_optional_description(#&#x7b;"name" := Name&#x7d; = ItemMap) ->
    Description = maps:get("description", ItemMap, &lt;&lt;"No description"&gt;&gt;),
    io:format("Item: ~s, Description: ~s~n", [Name, Description]);
process_item_with_optional_description(Other) ->
    io:format("Expected map with 'name' key, got: ~p~n", [Other]).`}
          </pre>
          <p>
            <Feather size={20} className="inline mb-1 mr-2 text-gray-500" />
            <strong>Explanation:</strong>
            <ul>
              <li>
                <code>#&#x7b;"name" := Name&#x7d; = ItemMap</code> matches a map that *must* have a <code>"name"</code>{" "}
                key, binding its value to <code>Name</code>. The <code>= ItemMap</code> part binds the *entire* matched
                map to the variable <code>ItemMap</code>.
              </li>
              <li>
                Inside the function body,{" "}
                <code>maps:get("description", ItemMap, &lt;&lt;"No description"&gt;&gt;)</code> safely retrieves the
                value for the <code>"description"</code> key from the <code>ItemMap</code>. If the key is not present,
                it returns the third argument (the default value).
              </li>
              <li>
                This pattern ensures the minimum required field (<code>"name"</code>) is present via pattern matching,
                while optional fields are handled gracefully in the body.
              </li>
            </ul>
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3 flex items-center">Processing Lists of JSON Objects</h3>
          <p>
            Pattern matching is powerful with lists, especially when combined with recursion or list comprehensions.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-2 overflow-x-auto text-sm">
            {`% Function to process a list of user objects
process_user_list([]) ->
    io:format("Finished processing list.~n"); % Base case for empty list
process_user_list([#&#x7b;"id" := Id, "name" := Name&#x7d; | Rest]) ->
    % Match the head of the list as a user object
    io:format("Processing user ID: ~w, Name: ~s~n", [Id, Name]),
    % Recursively call for the rest of the list
    process_user_list(Rest);
process_user_list([InvalidItem | Rest]) ->
    % Match if the head is not a valid user object
    io:format("Skipping invalid list item: ~p~n", [InvalidItem]),
    % Continue processing the rest
    process_user_list(Rest);
process_user_list(Other) ->
    io:format("Expected a list, got: ~p~n", [Other]).`}
          </pre>
          <p>
            <Feather size={20} className="inline mb-1 mr-2 text-gray-500" />
            <strong>Explanation:</strong>
            <ul>
              <li>
                The function <code>process_user_list</code> has multiple clauses to handle different list structures.
              </li>
              <li>
                The first clause <code>process_user_list([])</code> is the base case for recursion when the list is
                empty.
              </li>
              <li>
                The second clause <code>process_user_list([Head | Tail])</code> uses the list pattern{" "}
                <code>[Head | Tail]</code>, where <code>Head</code> is the first element and <code>Tail</code> is the
                rest of the list. The <code>Head</code> is *also* pattern matched to be a map with <code>"id"</code> and{" "}
                <code>"name"</code> keys. If it matches, the body executes, and the function calls itself recursively on
                the <code>Tail</code>.
              </li>
              <li>
                The third clause <code>process_user_list([InvalidItem | Rest])</code> catches list heads that
                *didn&apos;t* match the desired user object pattern. It handles the invalid item and continues
                processing the rest of the list.
              </li>
              <li>The final clause catches anything that isn&apos;t a list at all.</li>
            </ul>
          </p>
          <p>Alternatively, list comprehensions with pattern matching can be used for transformations:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-2 overflow-x-auto text-sm">
            {`% Extract names from a list of user objects using list comprehension
get_user_names(ListOfUsers) ->
    [Name || #&#x7b;"name" := Name&#x7d; &lt;- ListOfUsers].`}
          </pre>
          <p>
            <Feather size={20} className="inline mb-1 mr-2 text-gray-500" />
            <strong>Explanation:</strong>
            <ul>
              <li>
                <code>[Name || ...]</code> is a list comprehension. It builds a new list.
              </li>
              <li>
                <code>#&#x7b;"name" := Name&#x7d; &lt;- ListOfUsers</code> is the generator. It iterates through each
                element in <code>ListOfUsers</code>. For each element, it attempts to match the pattern{" "}
                <code>#&#x7b;"name" := Name&#x7d;</code>.
              </li>
              <li>
                If the element matches, the value bound to <code>Name</code> is included in the new list. Elements that
                *do not* match the pattern are silently skipped by default in list comprehensions.
              </li>
            </ul>
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <Check className="mr-3 text-green-500" size={28} /> Benefits of Pattern Matching for JSON
          </h2>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong className="font-medium">Readability and Clarity:</strong> The code often reads like a direct
              description of the data structure you expect. It&apos;s clear what shape the input must have for a
              particular code path to execute.
            </li>
            <li>
              <strong className="font-medium">Conciseness:</strong> You can extract nested values and bind them to
              variables in a single line within the function head or case clause, avoiding verbose sequences of
              accessors and temporary variables.
            </li>
            <li>
              <strong className="font-medium">Implicit Validation:</strong> If an input term doesn&apos;t match any of
              the provided patterns, it triggers a &quot;function_clause&quot; error (or falls through a case
              statement), providing immediate feedback that the data structure was unexpected. This acts as built-in
              validation.
            </li>
            <li>
              <strong className="font-medium">Exhaustive Handling:</strong> When using pattern matching in{" "}
              <code>case</code> statements or multiple function clauses, the compiler can often warn you if your
              patterns don&apos;t cover all possible cases for a given type (though less strict for dynamic data like
              parsed JSON, it encourages thinking about all possibilities).
            </li>
            <li>
              <strong className="font-medium">Data Transformation:</strong> Easily restructure or extract data based on
              its shape, as shown in the list comprehension example.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <X className="mr-3 text-red-500" size={28} /> Considerations
          </h2>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong className="font-medium">Learning Curve:</strong> Developers new to Erlang may find the pattern
              matching syntax and its application to data processing initially unfamiliar compared to imperative
              approaches.
            </li>
            <li>
              <strong className="font-medium">Data Representation:</strong> You are working with Erlang&apos;s
              representation of JSON (maps, lists, binaries, etc.), not the raw JSON string. This requires parsing the
              JSON first.
            </li>
            <li>
              <strong className="font-medium">Deep Nesting:</strong> For extremely deep or complex, highly variable JSON
              structures, pattern matching alone might become cumbersome. Combining it with other Erlang features (like
              functions in guards, or helper functions for validation) is often necessary.
            </li>
            <li>
              <strong className="font-medium">Key Presence:</strong> Default map patterns strictly require keys to be
              present. Handling optional keys often requires using <code>maps:get/3</code> or structuring clauses
              carefully, which adds slight complexity compared to a simple pattern.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <Feather className="mr-3 text-purple-500" size={28} /> Conclusion
          </h2>
          <p>
            Erlang&apos;s pattern matching provides an elegant and robust mechanism for handling JSON data once it has
            been parsed into native Erlang terms. It encourages a declarative style where you define the expected
            structure of the data, making your code more readable and less prone to errors caused by unexpected data
            shapes. While it requires understanding Erlang&apos;s data types and the pattern matching syntax, the
            benefits in terms of code clarity, conciseness, and implicit validation make it a powerful tool for any
            Erlang developer working with JSON. By leveraging pattern matching, you can transform repetitive data access
            logic into expressive and self-documenting code.
          </p>
        </section>
      </div>
    </div>
  );
}

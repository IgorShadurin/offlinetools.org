import type { Metadata } from "next";
import {
  Database,
  Code,
  Search,
  Edit,
  FileJson,
  CheckCircle,
  SquareAsterisk,
  Package,
  AreaChart,
  Info,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";
import React from "react";

export const metadata: Metadata = {
  title: "PL/SQL JSON Functions in Oracle Databases | SQL/JSON and PL/SQL Guide",
  description:
    "Learn which Oracle JSON functions to use in PL/SQL and SQL, including 19c vs 21c+ storage choices, JSON_OBJECT_T, JSON_TABLE, JSON_TRANSFORM, indexing, and debugging tips.",
};

export default function OracleJsonFunctionsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Database className="mr-3 w-8 h-8 text-blue-600" />
        PL/SQL JSON Functions in Oracle Databases
      </h1>

      <p className="text-lg mb-4">
        If you are searching for PL/SQL JSON functions in Oracle, the first thing to know is that Oracle has two JSON
        toolsets. SQL/JSON functions such as <code>JSON_OBJECT</code>, <code>JSON_VALUE</code>,{" "}
        <code>JSON_TABLE</code>, and <code>JSON_TRANSFORM</code> run inside SQL statements. PL/SQL object types such
        as <code>JSON_OBJECT_T</code> and <code>JSON_ARRAY_T</code> let you parse, inspect, and mutate JSON in PL/SQL
        code.
      </p>

      <p className="text-lg mb-8">
        The version boundary matters. In Oracle 19c and other pre-21c deployments, JSON is typically stored in{" "}
        <code>VARCHAR2</code>, <code>CLOB</code>, or <code>BLOB</code> columns validated with <code>IS JSON</code>.
        In Oracle 21c and later, Oracle adds a native <code>JSON</code> data type backed by binary JSON, which is the
        better default for new designs when your environment supports it.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Info className="mr-2 text-blue-600" /> Quick Answer: Which Oracle JSON Feature Should You Use?
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950 dark:border-blue-800">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Use <code>JSON_OBJECT</code>, <code>JSON_ARRAY</code>, <code>JSON_OBJECTAGG</code>, and{" "}
                <code>JSON_ARRAYAGG</code> to generate JSON from relational data.
              </li>
              <li>
                Use <code>JSON_VALUE</code> for a scalar, <code>JSON_QUERY</code> for an object or array,{" "}
                <code>JSON_EXISTS</code> for predicates, and <code>JSON_TABLE</code> when you need rows and columns.
              </li>
              <li>
                Use <code>JSON_TRANSFORM</code> when your database version supports it and you want a declarative,
                ordered, atomic update to a JSON document.
              </li>
              <li>
                Use <code>JSON_OBJECT_T</code> and <code>JSON_ARRAY_T</code> in PL/SQL when the logic is procedural,
                conditional, or easier to express in code than in one SQL statement.
              </li>
              <li>
                Use a <code>RETURNING</code> clause for large results. Without it, many SQL/JSON functions on textual
                JSON default to <code>VARCHAR2(4000)</code>, which is often too small for real payloads.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Package className="mr-2 text-purple-600" /> Version-Aware Compatibility
          </h2>
          <p>
            A lot of confusion around Oracle JSON comes from mixing guidance for 19c and 21c+. The table below is the
            short version that matters most in practice.
          </p>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="text-left p-3 font-semibold">Oracle Version</th>
                  <th className="text-left p-3 font-semibold">What You Can Rely On</th>
                  <th className="text-left p-3 font-semibold">Practical Default</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3 align-top">19c and older long-lived deployments</td>
                  <td className="p-3 align-top">
                    JSON in <code>VARCHAR2</code>, <code>CLOB</code>, or <code>BLOB</code> with{" "}
                    <code>IS JSON</code>; SQL/JSON query and generation functions; PL/SQL JSON object types
                  </td>
                  <td className="p-3 align-top">
                    Store larger documents in <code>CLOB</code> or <code>BLOB</code>, validate with{" "}
                    <code>IS JSON</code>, and use SQL/JSON for querying
                  </td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3 align-top">21c and later</td>
                  <td className="p-3 align-top">
                    Native <code>JSON</code> data type, binary JSON storage, <code>JSON_TRANSFORM</code>, and bridge
                    methods between PL/SQL object types and SQL <code>JSON</code> values
                  </td>
                  <td className="p-3 align-top">
                    Prefer the native <code>JSON</code> type for new tables if your database compatibility settings
                    allow it
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-start p-3 bg-yellow-100 border border-yellow-200 rounded-md text-sm mt-4 dark:bg-yellow-900 dark:border-yellow-700">
            <Lightbulb className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 dark:text-yellow-300" />
            <p>
              The native <code>JSON</code> type is not a 19c feature. If you are maintaining a 19c system, plan around
              text or binary large object storage plus <code>IS JSON</code> validation.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileJson className="mr-2 text-green-600" /> Storing JSON Data Correctly
          </h2>
          <p>
            Storage choice is the first design decision. If you are on 21c+, the native <code>JSON</code> type is
            usually the right answer. If you are on 19c, use a textual or binary column and enforce validity with{" "}
            <code>IS JSON</code>.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: 19c Storage vs 21c+ Storage</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`-- Oracle 19c-style table design
CREATE TABLE orders_text (
    order_id   NUMBER PRIMARY KEY,
    order_doc  CLOB CHECK (order_doc IS JSON)
);

-- Oracle 21c+ table design
CREATE TABLE orders_native (
    order_id   NUMBER PRIMARY KEY,
    order_doc  JSON
);

-- If you only want JSON objects/arrays in a text column, tighten validation
-- with DISALLOW SCALARS instead of accepting any RFC 8259 scalar document.
-- Example:
-- CHECK (order_doc IS JSON DISALLOW SCALARS)
`}
              </pre>
            </div>
          </div>

          <div className="flex items-start p-3 bg-blue-100 border border-blue-200 rounded-md text-sm mt-4 dark:bg-blue-900 dark:border-blue-700">
            <Info className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 dark:text-blue-300" />
            <p>
              On 21c+, top-level JSON scalars are supported when the database <code>compatible</code> setting is high
              enough. If your application expects only objects or arrays, enforce that rule explicitly instead of
              assuming the default shape.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 text-orange-600" /> Creating JSON with SQL/JSON Functions
          </h2>
          <p>
            For most reporting and API-style queries, generate JSON in SQL instead of manually concatenating strings.
            Oracle&apos;s SQL/JSON generation functions are safer, easier to maintain, and version-stable.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <span className="font-semibold">JSON_OBJECT:</span> Build an object from name/value pairs.
            </li>
            <li>
              <span className="font-semibold">JSON_ARRAY:</span> Build an array from literal or expression values.
            </li>
            <li>
              <span className="font-semibold">JSON_ARRAYAGG:</span> Aggregate rows into a JSON array.
            </li>
            <li>
              <span className="font-semibold">JSON_OBJECTAGG:</span> Aggregate key/value pairs into a JSON object.
            </li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Generate an Order Document</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`SELECT JSON_OBJECT(
           'orderId'    VALUE o.order_id,
           'customerId' VALUE o.customer_id,
           'items'      VALUE JSON_ARRAYAGG(
                            JSON_OBJECT(
                              'sku' VALUE i.sku,
                              'qty' VALUE i.qty
                            )
                            ORDER BY i.line_no
                          )
           ABSENT ON NULL
           RETURNING CLOB
       ) AS order_json
FROM orders o
JOIN order_items i
  ON i.order_id = o.order_id
WHERE o.order_id = 1001
GROUP BY o.order_id, o.customer_id;
`}
              </pre>
            </div>
          </div>

          <div className="flex items-start p-3 bg-yellow-100 border border-yellow-200 rounded-md text-sm mt-4 dark:bg-yellow-900 dark:border-yellow-700">
            <Lightbulb className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 dark:text-yellow-300" />
            <p>
              <code>ABSENT ON NULL</code> is often the better default for API payloads because it removes missing keys
              instead of emitting JSON <code>null</code>. If you need explicit nulls, use <code>NULL ON NULL</code>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Search className="mr-2 text-cyan-600" /> Querying JSON Data
          </h2>
          <p>
            Query functions are where most Oracle JSON work happens. The main rule is simple: use the function that
            matches the shape you expect back.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <span className="font-semibold">JSON_VALUE:</span> Return a scalar such as a string or number.
            </li>
            <li>
              <span className="font-semibold">JSON_QUERY:</span> Return a JSON object or array.
            </li>
            <li>
              <span className="font-semibold">JSON_EXISTS:</span> Test whether a path exists or a predicate matches.
            </li>
            <li>
              <span className="font-semibold">JSON_TABLE:</span> Project JSON into rows and columns and then query it
              relationally.
            </li>
            <li>
              <span className="font-semibold">JSON_SERIALIZE:</span> Convert JSON to display text, including pretty
              printed output.
            </li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Extract Scalars, Arrays, and Rows</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`-- Scalar extraction
SELECT order_id,
       JSON_VALUE(order_doc, '$.customerId' RETURNING NUMBER) AS customer_id
FROM orders_text;

-- Return a nested array as JSON text
SELECT order_id,
       JSON_QUERY(order_doc, '$.items' RETURNING CLOB PRETTY) AS items_json
FROM orders_text;

-- Relational projection of an array
SELECT o.order_id, jt.sku, jt.qty
FROM orders_text o
CROSS APPLY JSON_TABLE(
  o.order_doc,
  '$.items[*]'
  COLUMNS (
    sku VARCHAR2(30) PATH '$.sku',
    qty NUMBER       PATH '$.qty'
  )
) jt;

-- Pretty-print a full JSON document for inspection
SELECT JSON_SERIALIZE(order_doc PRETTY RETURNING CLOB)
FROM orders_native
WHERE order_id = 1001;
`}
              </pre>
            </div>
          </div>

          <div className="flex items-start p-3 bg-red-100 border border-red-200 rounded-md text-sm mt-4 dark:bg-red-900 dark:border-red-700">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 dark:text-red-300" />
            <p>
              <code>JSON_VALUE</code> is only for scalars. If the path points to an object or array, switch to{" "}
              <code>JSON_QUERY</code> or <code>JSON_TABLE</code>. This is one of the most common Oracle JSON mistakes.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Edit className="mr-2 text-teal-600" /> Updating Documents with JSON_TRANSFORM
          </h2>
          <p>
            When your database version includes <code>JSON_TRANSFORM</code>, use it for document updates instead of
            rebuilding the whole payload manually. Oracle documents the operations as ordered and atomic, which makes it
            a safer fit for multi-step edits.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Change Status and Remove a Temporary Field</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`UPDATE orders_native
SET order_doc = JSON_TRANSFORM(
                  order_doc,
                  SET '$.status' = 'shipped',
                  REMOVE '$.draftNote'
                )
WHERE order_id = 1001;

-- Preview the result without writing it back
SELECT JSON_TRANSFORM(
         order_doc,
         SET '$.status' = 'shipped',
         REMOVE '$.draftNote'
       ) AS updated_doc
FROM orders_native
WHERE order_id = 1001;
`}
              </pre>
            </div>
          </div>

          <div className="flex items-start p-3 bg-blue-100 border border-blue-200 rounded-md text-sm mt-4 dark:bg-blue-900 dark:border-blue-700">
            <Info className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 dark:text-blue-300" />
            <p>
              If you are on a 19c estate and do not have <code>JSON_TRANSFORM</code> available in your deployed
              environment, fall back to SQL generation functions or PL/SQL object types for the rewrite.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Database className="mr-2 text-sky-600" /> Working with JSON in PL/SQL
          </h2>
          <p>
            This is the part many articles skip. When the requirement is truly PL/SQL, Oracle&apos;s JSON object types
            are often more ergonomic than packing everything into one SQL statement.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <code>JSON_ELEMENT_T</code> is the supertype for parsed JSON values.
            </li>
            <li>
              <code>JSON_OBJECT_T</code> represents a JSON object.
            </li>
            <li>
              <code>JSON_ARRAY_T</code> represents a JSON array.
            </li>
            <li>
              Getter methods such as <code>get_string</code> and <code>get_number</code> return typed values, while{" "}
              <code>get()</code> returns a JSON element you can inspect or cast.
            </li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Parse, Mutate, and Serialize in PL/SQL</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`DECLARE
  l_doc   JSON_OBJECT_T;
  l_items JSON_ARRAY_T;
BEGIN
  l_doc := JSON_OBJECT_T.parse(
    '{"orderId":1001,"status":"new","items":[{"sku":"A-1","qty":2}]}'
  );

  l_doc.put('status', 'validated');

  l_items := TREAT(l_doc.get('items') AS JSON_ARRAY_T);
  l_items.append(JSON_OBJECT_T.parse('{"sku":"B-9","qty":1}'));

  DBMS_OUTPUT.put_line(l_doc.to_string);
END;
/
`}
              </pre>
            </div>
          </div>

          <div className="flex items-start p-3 bg-yellow-100 border border-yellow-200 rounded-md text-sm mt-4 dark:bg-yellow-900 dark:border-yellow-700">
            <Lightbulb className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 dark:text-yellow-300" />
            <p>
              Use <code>to_clob()</code> instead of <code>to_string()</code> for larger payloads. On 21c+, Oracle also
              documents bridge methods such as <code>load()</code> and <code>to_json</code> for moving between PL/SQL
              object types and the native SQL <code>JSON</code> data type.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <SquareAsterisk className="mr-2 text-red-600" /> Indexing and Performance Tips
          </h2>
          <p>
            Oracle JSON performance usually comes down to two things: not reparsing more than necessary and indexing the
            paths you actually filter on.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Index a Frequently Filtered Scalar Path</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`CREATE INDEX orders_customer_id_idx
    ON orders_text (
      JSON_VALUE(order_doc, '$.customerId' RETURNING NUMBER)
    );

-- Write the query with the same path and return type so Oracle can use the index.
SELECT order_id
FROM orders_text
WHERE JSON_VALUE(order_doc, '$.customerId' RETURNING NUMBER) = 42;
`}
              </pre>
            </div>
          </div>

          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              If you filter on one or two stable scalar paths, a function-based index or virtual column is often the
              cleanest choice.
            </li>
            <li>
              If you need broader search across many paths, evaluate Oracle&apos;s JSON search index instead of stacking
              many narrow indexes.
            </li>
            <li>
              If you extract multiple fields from the same document in one query, <code>JSON_TABLE</code> is usually a
              better design than repeating several unrelated <code>JSON_VALUE</code> calls.
            </li>
            <li>
              On newer versions, native <code>JSON</code> storage reduces parsing overhead compared with repeatedly
              reading large textual JSON documents.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <AreaChart className="mr-2 text-indigo-600" /> Common Pitfalls and Debugging Notes
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Silent nulls are dangerous. During development, prefer <code>ERROR ON ERROR</code> or explicit defaults
              instead of relying on forgiving behavior.
            </li>
            <li>
              Large JSON generation queries should usually specify <code>RETURNING CLOB</code> or, on native JSON
              systems, <code>RETURNING JSON</code>.
            </li>
            <li>
              If a query plan ignores your JSON index, check that the indexed expression and the predicate use the same
              path and compatible return type.
            </li>
            <li>
              If you are debugging payload shape, use <code>JSON_SERIALIZE(... PRETTY)</code> in SQL or your formatter
              tool outside the database to inspect the exact output.
            </li>
            <li>
              If the application only stores objects and arrays, do not leave that rule implicit. Enforce it with
              validation instead of letting scalar documents slip in by accident.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <CheckCircle className="mr-2 text-green-600" /> Conclusion
          </h2>
          <p>
            The best answer to "PL/SQL JSON functions in Oracle" is not one function name. It is a working split:
            generate and query JSON with SQL/JSON functions, use PL/SQL object types for procedural manipulation, and
            choose storage based on whether you are on 19c-style text JSON or 21c+ native <code>JSON</code>. Once you
            anchor the design to the right Oracle version, the rest of the function choices become much clearer.
          </p>
        </section>
      </div>
    </>
  );
}

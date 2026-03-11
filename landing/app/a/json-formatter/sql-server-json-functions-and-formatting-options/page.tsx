import type { Metadata } from "next";
import { Box, CheckCircle, Code, CornerDownRight, Database, Edit, Info, Search, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "SQL Server JSON Functions and Formatting Options",
  description:
    "Learn how to generate and shape JSON in SQL Server with FOR JSON PATH and AUTO, query JSON with OPENJSON and JSON_VALUE, and understand current JSON version notes.",
};

export default function SqlServerJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Database size={32} /> SQL Server JSON Functions and Formatting Options
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Info size={24} /> Quick Answer: Can SQL Server Format a JSON String?
          </h2>
          <p>
            Yes, but only up to a point. SQL Server can <strong>generate</strong> JSON from query results with{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">FOR JSON</code>, validate JSON
            with <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">ISJSON</code>, read it
            with <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">OPENJSON</code>, and
            update it with{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_MODIFY</code>.
          </p>
          <p className="mt-3">
            What it does <strong>not</strong> provide is a general-purpose pretty-printer for arbitrary JSON text.
            Current Microsoft documentation describes{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">FOR JSON</code> as returning
            compact JSON text. If your goal is to make an existing JSON string readable, the usual workflow is:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Use SQL Server to produce or validate the JSON.</li>
            <li>Use client tooling or a JSON formatter to indent and inspect it.</li>
            <li>Use JSON functions inside SQL Server only when you need to query, filter, or reshape the data.</li>
          </ul>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900 my-4">
            <p className="font-semibold">Practical rule:</p>
            <p className="mt-2">
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">FOR JSON</code> is for
              serializing rows as JSON. A formatter is for whitespace, indentation, and readable output.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code size={24} /> Generating JSON with FOR JSON
          </h2>
          <p>
            SQL Server supports two{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">FOR JSON</code> modes:
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800 ml-1">PATH</code> and{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">AUTO</code>.
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800 ml-1">PATH</code> is usually
            the better default because it gives you explicit control over property names and nesting.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <CornerDownRight size={20} /> FOR JSON PATH
          </h3>
          <p>
            In <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">PATH</code> mode, use
            column aliases to shape the JSON. Nested objects are created with dot-separated aliases like{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">[customer.email]</code>.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT
    CustomerID AS id,
    Name AS [customer.name],
    Email AS [customer.email]
FROM Customers
FOR JSON PATH;`}
              </code>
            </pre>
          </div>
          <p className="mt-2">Example output:</p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`[
  {
    "id": 1,
    "customer": {
      "name": "Alice",
      "email": "alice@example.com"
    }
  },
  {
    "id": 2,
    "customer": {
      "name": "Bob",
      "email": "bob@example.com"
    }
  }
]`}
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <CornerDownRight size={20} /> FOR JSON AUTO
          </h3>
          <p>
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">AUTO</code> is faster to type
            when you just want JSON output that mirrors the tables and joins in your{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">SELECT</code>. The tradeoff is
            less control over property names and nesting.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT
    CustomerID,
    Name,
    Email
FROM Customers
FOR JSON AUTO;`}
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <CornerDownRight size={20} /> Formatting Options That Matter
          </h3>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">WITHOUT_ARRAY_WRAPPER</code>{" "}
              returns a single object instead of wrapping one row in{" "}
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">[]</code>.
            </li>
            <li>
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">INCLUDE_NULL_VALUES</code>{" "}
              keeps properties whose SQL value is{" "}
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">NULL</code>. By default,
              SQL Server omits them.
            </li>
            <li>
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">ROOT('name')</code> adds a
              wrapper object at the top level.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT
    CustomerID AS id,
    Name AS name,
    Email AS email
FROM Customers
WHERE CustomerID = 1
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES;`}
              </code>
            </pre>
          </div>
          <p className="mt-2">Example output:</p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`{
  "id": 1,
  "name": "Alice",
  "email": null
}`}
              </code>
            </pre>
          </div>
          <p className="mt-3">
            Notice that the JSON SQL Server returns is still compact text under the hood. If you want human-friendly
            indentation, format the result in your editor or a JSON formatting tool after the query runs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Box size={24} /> Reading JSON with OPENJSON, JSON_VALUE, and JSON_QUERY
          </h2>
          <p>
            Once JSON is stored in a column or variable, SQL Server gives you three main patterns:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">OPENJSON</code> for turning
              JSON into rows and columns.
            </li>
            <li>
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_VALUE</code> for
              extracting one scalar value.
            </li>
            <li>
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_QUERY</code> for
              extracting an object or array.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <CornerDownRight size={20} /> OPENJSON with an Explicit Schema
          </h3>
          <p>
            Use a <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">WITH</code> clause when
            you know the expected shape. This is also where{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">AS JSON</code> belongs: it
            tells SQL Server to return a nested object or array as JSON text instead of coercing it to a scalar.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`DECLARE @payload NVARCHAR(MAX) = N'{
  "orderId": 42,
  "status": "paid",
  "items": [
    { "sku": "A-1", "qty": 2 },
    { "sku": "B-9", "qty": 1 }
  ]
}';

SELECT
    orderId,
    status,
    items
FROM OPENJSON(@payload)
WITH (
    orderId INT '$.orderId',
    status NVARCHAR(20) '$.status',
    items NVARCHAR(MAX) '$.items' AS JSON
);`}
              </code>
            </pre>
          </div>
          <p className="mt-3">
            If you need to shred an array into rows, point{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">OPENJSON</code> at the array
            path directly:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT sku, qty
FROM OPENJSON(@payload, '$.items')
WITH (
    sku NVARCHAR(50) '$.sku',
    qty INT '$.qty'
);`}
              </code>
            </pre>
          </div>
          <p className="mt-3">
            Important compatibility note: Microsoft documents{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">OPENJSON</code> as requiring
            database compatibility level 130 or higher.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Search size={20} /> JSON_VALUE vs JSON_QUERY
          </h3>
          <p>
            The difference is simple and important:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_VALUE</code> returns a
              scalar, such as text, number, or boolean.
            </li>
            <li>
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_QUERY</code> returns a
              JSON object or JSON array.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT
    JSON_VALUE(@payload, '$.status') AS OrderStatus,
    JSON_QUERY(@payload, '$.items') AS ItemsJson;`}
              </code>
            </pre>
          </div>
          <p className="mt-3">
            JSON paths use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">lax</code> mode
            by default, which returns{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">NULL</code> for a missing path.
            Use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">strict</code> when a
            missing property should raise an error instead of failing quietly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Edit size={24} /> Updating and Validating JSON
          </h2>
          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <CornerDownRight size={20} /> JSON_MODIFY
          </h3>
          <p>
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_MODIFY</code> updates one
            path at a time and returns the modified JSON string. It is useful for targeted changes without rebuilding the
            whole document by hand.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`DECLARE @doc NVARCHAR(MAX) = N'{
  "status": "draft",
  "tags": ["internal"]
}';

SET @doc = JSON_MODIFY(@doc, '$.status', 'published');
SET @doc = JSON_MODIFY(@doc, 'append $.tags', 'public');

SELECT @doc AS ModifiedJson;`}
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <CheckCircle size={20} /> ISJSON
          </h3>
          <p>
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">ISJSON</code> is the fast
            first check before you trust a payload. On newer SQL Server releases, Microsoft also documents optional JSON
            type constraints such as{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">OBJECT</code>,{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">ARRAY</code>, and{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">SCALAR</code>.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT
    ISJSON('{"name":"valid"}') AS IsValidJson,
    ISJSON('{"name":"valid"}', OBJECT) AS IsObject,
    ISJSON('["a","b"]', ARRAY) AS IsArray,
    ISJSON('"hello"', SCALAR) AS IsScalar;`}
              </code>
            </pre>
          </div>
          <p className="mt-3">
            Validation is especially useful before you pass JSON into{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">OPENJSON</code> or before you
            send a JSON string to a formatter for inspection.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code size={24} /> Newer JSON Constructors and 2025 Version Notes
          </h2>
          <p>
            SQL Server JSON support is broader now than it was when JSON first arrived in SQL Server 2016. Depending on
            your version, you may also have SQL/JSON constructor functions such as{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_OBJECT</code> and{" "}
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_ARRAY</code>, which are a
            better choice than manual string concatenation.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT JSON_OBJECT(
    'id': CustomerID,
    'name': Name
) AS CustomerJson
FROM Customers;`}
              </code>
            </pre>
          </div>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              Microsoft&apos;s current documentation lists{" "}
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_ARRAYAGG</code> and{" "}
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_OBJECTAGG</code> as GA
              in Azure SQL Database and Azure SQL Managed Instance when using SQL Server 2025 or the Always-up-to-date
              policy, and as preview features in SQL Server 2025.
            </li>
            <li>
              The native <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">json</code> data
              type is documented as GA in Azure SQL Database and Azure SQL Managed Instance in those 2025 environments,
              and preview in SQL Server 2025.
            </li>
            <li>
              Microsoft also documents{" "}
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">CREATE JSON INDEX</code> as a
              preview feature in SQL Server 2025. Before that, the standard pattern is still computed columns plus normal
              indexes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap size={24} /> Performance and Troubleshooting
          </h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              For frequent filters on one JSON property, expose that property as a computed column and index it.
            </li>
            <li>
              Cast indexed JSON values to an appropriate SQL type or length where possible. Microsoft warns that wide
              values can exceed the nonclustered index key length limit.
            </li>
            <li>
              Avoid repeatedly shredding large JSON documents in hot query paths if the same properties are needed all
              the time. Materialize the fields you filter or join on.
            </li>
            <li>
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">FOR JSON</code> returns{" "}
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">NVARCHAR(MAX)</code> text.
              Large results may be split across multiple rows in some clients, even though the payload is logically one
              JSON document.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`ALTER TABLE Products
ADD ProductName AS CAST(JSON_VALUE(ProductJson, '$.name') AS NVARCHAR(200));

CREATE INDEX IX_Products_ProductName
ON Products(ProductName);`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Info size={24} /> Which Function Should You Use?
          </h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              Use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">FOR JSON PATH</code> when
              you need clean, predictable JSON output from relational data.
            </li>
            <li>
              Use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">FOR JSON AUTO</code> when
              you want a quick JSON export that follows your existing{" "}
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">SELECT</code> shape.
            </li>
            <li>
              Use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">OPENJSON</code> when you
              need rows and columns from a JSON document.
            </li>
            <li>
              Use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_VALUE</code> for a
              single scalar value and{" "}
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_QUERY</code> for an
              object or array.
            </li>
            <li>
              Use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_MODIFY</code> for a
              targeted update, and <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">ISJSON</code>{" "}
              before processing untrusted input.
            </li>
          </ul>
          <p className="mt-3">
            For searchers asking how to &quot;format a JSON string in SQL Server,&quot; the key distinction is this:
            SQL Server is excellent at <strong>creating</strong> and <strong>querying</strong> JSON, but readable
            whitespace formatting is still usually a job for your client or a dedicated formatter.
          </p>
        </section>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import {
  Database,
  Code,
  Zap,
  Search,
  Edit,
  CheckCircle,
  Box,
  CornerDownRight,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SQL Server JSON Functions and Formatting Options",
  description:
    "A comprehensive guide to using SQL Server's built-in JSON functions for generating, parsing, querying, and modifying JSON data.",
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
            <Info size={24} /> Introduction: Why JSON in SQL Server?
          </h2>
          <p>
            Modern applications frequently exchange data using the JSON format. SQL Server,
            starting with SQL Server 2016, provides native functions to handle JSON data
            directly within the database engine. This allows you to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Format query results as JSON.</li>
            <li>Parse JSON strings stored in database columns.</li>
            <li>Query values and objects within JSON text.</li>
            <li>Modify values in JSON strings.</li>
          </ul>
          <p className="mt-3">
            Leveraging these functions can simplify your application code, move data
            transformation logic closer to the data source, and improve performance
            in certain scenarios.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code size={24} /> Generating JSON from SQL Queries (FOR JSON)
          </h2>
          <p>
            The <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">FOR JSON</code> clause is appended to a
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">SELECT</code> statement
            to format the results as JSON text. It comes with several modes: <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">AUTO</code>,
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">PATH</code>, and <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">RAW</code>.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <CornerDownRight size={20} /> FOR JSON AUTO
          </h3>
          <p>
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">AUTO</code> mode automatically structures the JSON output based on the tables
            and columns in the <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">SELECT</code> statement. It's the simplest to use but offers
            less control over the structure compared to <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">PATH</code>.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT
    CustomerID,
    Name,
    Email
FROM
    Customers
FOR JSON AUTO;`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            Example Output (might vary slightly based on data):
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`[
  {
    "CustomerID": 1,
    "Name": "Alice",
    "Email": "alice@example.com"
  },
  {
    "CustomerID": 2,
    "Name": "Bob",
    "Email": "bob@example.com"
  }
]`}
              </code>
            </pre>
          </div>
          <p className="mt-3">
            With Joins, <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">AUTO</code> mode will nest based on table joins:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT
    c.CustomerID,
    c.Name,
    o.OrderID,
    o.OrderDate
FROM
    Customers c
JOIN
    Orders o ON c.CustomerID = o.CustomerID
ORDER BY
    c.CustomerID
FOR JSON AUTO;`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            Example Output:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`[
  {
    "CustomerID": 1,
    "Name": "Alice",
    "Orders": [
      {
        "OrderID": 101,
        "OrderDate": "2023-01-15T00:00:00"
      },
      {
        "OrderID": 105,
        "OrderDate": "2023-02-20T00:00:00"
      }
    ]
  },
  {
    "CustomerID": 2,
    "Name": "Bob",
    "Orders": [
      {
        "OrderID": 102,
        "OrderDate": "2023-01-16T00:00:00"
      }
    ]
  }
]`}
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <CornerDownRight size={20} /> FOR JSON PATH
          </h3>
          <p>
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">PATH</code> mode gives you full control over the JSON structure using column aliases
            formatted as paths (e.g., <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">'$.path.to.property'</code>). This is more flexible
            for complex or specific JSON outputs.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT
    CustomerID AS "$.id",
    Name AS "$.details.fullName",
    Email AS "$.contact.email"
FROM
    Customers
FOR JSON PATH;`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            Example Output:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`[
  {
    "id": 1,
    "details": {
      "fullName": "Alice"
    },
    "contact": {
      "email": "alice@example.com"
    }
  },
  {
    "id": 2,
    "details": {
      "fullName": "Bob"
    },
    "contact": {
      "email": "bob@example.com"
    }
  }
]`}
              </code>
            </pre>
          </div>
          <p className="mt-3">
            Nesting with <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">PATH</code> mode using subqueries or joins:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT
    c.CustomerID AS "id",
    c.Name AS "name",
    (
        SELECT
            o.OrderID AS "$.orderId",
            o.OrderDate AS "$.orderDate"
        FROM
            Orders o
        WHERE
            o.CustomerID = c.CustomerID
        FOR JSON PATH
    ) AS "orders" -- Alias names the JSON array property
FROM
    Customers c
FOR JSON PATH;`}
              </code>
            </pre>
          </div>
           <p className="mt-2">
            Example Output:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`[
  {
    "id": 1,
    "name": "Alice",
    "orders": [
      {
        "orderId": 101,
        "orderDate": "2023-01-15T00:00:00"
      },
      {
        "orderId": 105,
        "orderDate": "2023-02-20T00:00:00"
      }
    ]
  },
  {
    "id": 2,
    "name": "Bob",
    "orders": [
      {
        "orderId": 102,
        "orderDate": "2023-01-16T00:00:00"
      }
    ]
  }
]`}
              </code>
            </pre>
          </div>


          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <CornerDownRight size={20} /> FOR JSON RAW
          </h3>
          <p>
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">RAW</code> mode generates a JSON array where each element is the value of
            a single column. It's typically used when you only select one column and want a simple array of values.
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT
    Name
FROM
    Customers
FOR JSON RAW;`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            Example Output:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`[
  "Alice",
  "Bob"
]`}
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <CornerDownRight size={20} /> FOR JSON Formatting Options
          </h3>
          <p>
            Various options can be combined with <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">FOR JSON</code> to control the output format:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">WITHOUT_ARRAY_WRAPPER</code>: Removes the default outer JSON array brackets <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">[]</code>. Useful when you expect a single JSON object.</li>
            <li><code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">INCLUDE_NULL_VALUES</code>: Includes properties with <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">NULL</code> values. By default, they are omitted.</li>
            <li><code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">ROOT('ElementName')</code>: Adds a single root key (or element name) to the JSON output, wrapping the result.</li>
            <li><code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">AS JSON</code>: Casts the output to a JSON type, useful for chaining functions or storing JSON.</li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT
    CustomerID,
    Name,
    -- Assuming some customers might have NULL email
    Email
FROM
    Customers
WHERE CustomerID = 1 -- Select a single customer
FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES, ROOT('CustomerData');`}
              </code>
            </pre>
          </div>
           <p className="mt-2">
            Example Output (if Email is NULL for CustomerID 1):
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`{
  "CustomerData": {
    "CustomerID": 1,
    "Name": "Alice",
    "Email": null
  }
}`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Box size={24} /> Parsing and Querying JSON (OPENJSON, JSON_VALUE, JSON_QUERY)
          </h2>
          <p>
            SQL Server provides functions to read and extract data from JSON strings.
          </p>

           <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <CornerDownRight size={20} /> OPENJSON
          </h3>
          <p>
            <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">OPENJSON</code> is a table-valued function that parses JSON text and
            returns data in rows and columns. It&apos;s particularly useful for shredding
            JSON arrays or objects into a relational format.
          </p>

          <h4 className="text-lg font-semibold mt-4 mb-2">Basic OPENJSON usage (default schema):</h4>
          <p>
            Without a <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">WITH</code> clause, it returns key, value, and type for each
            element at the first level of the JSON structure.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`DECLARE @jsonInfo NVARCHAR(MAX);
SET @jsonInfo = N'{
  "name": "Product A",
  "price": 19.99,
  "tags": ["electronics", "gadget"],
  "details": {
    "weight": "1kg",
    "color": "black"
  }
}';

SELECT *
FROM OPENJSON(@jsonInfo);`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            Example Output:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-text text-sm">
                {`key       value                           type
--------- ------------------------------- ------
name      Product A                       1
price     19.99                           2
tags      ["electronics","gadget"]        4  -- Type 4 is array
details   {"weight":"1kg","color":"black"} 5  -- Type 5 is object`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            (Types: 0=null, 1=string, 2=number, 3=boolean, 4=array, 5=object)
          </p>


          <h4 className="text-lg font-semibold mt-4 mb-2">OPENJSON with explicit schema (WITH clause):</h4>
          <p>
            This is more common, defining the expected columns, their SQL data types,
            and the JSON path to the corresponding value.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`DECLARE @jsonInfo NVARCHAR(MAX);
SET @jsonInfo = N'{
  "name": "Product A",
  "price": 19.99,
  "inStock": true,
  "releaseDate": "2023-01-01T00:00:00Z",
  "details": { "weight": "1kg" }
}';

SELECT name, price, inStock, releaseDate, weight
FROM OPENJSON(@jsonInfo)
WITH (
    name VARCHAR(100) '$.name',
    price DECIMAL(10, 2) '$.price',
    inStock BIT '$.inStock',
    releaseDate DATETIME2 '$.releaseDate',
    -- Extract from nested object
    weight VARCHAR(50) '$.details.weight'
);`}
              </code>
            </pre>
          </div>
           <p className="mt-2">
            Example Output:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-text text-sm">
                {`name        price   inStock releaseDate               weight
----------- ------- ------- ------------------------- ------
Product A   19.99   1       2023-01-01 00:00:00.0000000 1kg`}
              </code>
            </pre>
          </div>

          <h4 className="text-lg font-semibold mt-4 mb-2">Extracting arrays with OPENJSON:</h4>
          <p>
            You can use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">OPENJSON</code> with <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">CROSS APPLY</code> to shred an array property
            within a JSON column.
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`-- Assume a table 'Products' with a NVARCHAR(MAX) column 'TagsJson'
-- Example data: INSERT INTO Products (TagsJson) VALUES ('["electronics", "gadget", "popular"]');

-- Select Product ID and individual tags
SELECT
    ProductID,
    TagValue
FROM
    Products
CROSS APPLY OPENJSON(TagsJson) WITH (TagValue VARCHAR(50) '$'); -- '$' means extract each element`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            Example Output:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-text text-sm">
                {`ProductID   TagValue
----------- ---------
1           electronics
1           gadget
1           popular`}
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Search size={20} /> JSON_VALUE vs JSON_QUERY
          </h3>
          <p>
            These functions extract values from a JSON string without necessarily
            shredding the whole document into rows.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_VALUE(jsonString, path)</code>: Extracts a <span className="font-semibold">scalar</span> value (string, number, boolean) from the JSON string at the specified path. Returns <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">NULL</code> if the path doesn't exist or points to an object/array.
            </li>
            <li>
              <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_QUERY(jsonString, path)</code>: Extracts a <span className="font-semibold">JSON object or array</span> from the JSON string at the specified path. Returns <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">NULL</code> if the path doesn't exist or points to a scalar value.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`DECLARE @jsonDoc NVARCHAR(MAX);
SET @jsonDoc = N'{
  "id": 123,
  "customer": {
    "name": "Alice",
    "city": "London"
  },
  "items": [
    {"itemId": 1, "qty": 2},
    {"itemId": 2, "qty": 1}
  ]
}';

SELECT
    JSON_VALUE(@jsonDoc, '$.id') AS OrderId, -- Scalar
    JSON_VALUE(@jsonDoc, '$.customer.name') AS CustomerName, -- Scalar
    JSON_VALUE(@jsonDoc, '$.customer.city') AS CustomerCity, -- Scalar
    JSON_VALUE(@jsonDoc, '$.items[0].itemId') AS FirstItemId, -- Scalar from array element
    JSON_VALUE(@jsonDoc, '$.items') AS Items_JSON_VALUE_Result, -- Returns NULL (items is an array)
    JSON_QUERY(@jsonDoc, '$.customer') AS CustomerObject, -- Object
    JSON_QUERY(@jsonDoc, '$.items') AS ItemsArray, -- Array
    JSON_QUERY(@jsonDoc, '$.customer.name') AS CustomerName_JSON_QUERY_Result; -- Returns NULL (name is scalar)`}
              </code>
            </pre>
          </div>
           <p className="mt-2">
            Example Output:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-text text-sm">
                {`OrderId CustomerName CustomerCity FirstItemId Items_JSON_VALUE_Result CustomerObject                      ItemsArray                                   CustomerName_JSON_QUERY_Result
--------- ------------ ------------ ----------- ------------------------- --------------------------------- -------------------------------------------- ------------------------------
123       Alice        London       1           NULL                      {"name":"Alice","city":"London"}  [{"itemId":1,"qty":2},{"itemId":2,"qty":1}] NULL`}
              </code>
            </pre>
          </div>
           <p className="mt-2">
            Use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_VALUE</code> for simple properties, <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_QUERY</code> for objects or arrays.
          </p>

          <h4 className="text-lg font-semibold mt-4 mb-2">Path Mode (Lax vs Strict):</h4>
          <p>
            JSON paths support <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">lax</code> (default) and <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">strict</code> modes.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">lax</code>: Returns <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">NULL</code> if a path step doesn't exist or is invalid.</li>
            <li><code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">strict</code>: Raises an error if a path step doesn't exist or is invalid.</li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`DECLARE @jsonDoc NVARCHAR(MAX) = N'{"name": "Test"}';

-- Lax mode (default) - returns NULL for non-existent path
SELECT JSON_VALUE(@jsonDoc, '$.address.city') AS LaxResult;

-- Strict mode - raises an error for non-existent path
-- SELECT JSON_VALUE(@jsonDoc, 'strict $.address.city') AS StrictResult;`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            Lax result:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-text text-sm">
                {`LaxResult
---------
NULL`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            Strict mode is useful when you want to ensure the JSON conforms to an expected structure.
          </p>
        </section>

         <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Edit size={24} /> Modifying JSON Data (JSON_MODIFY)
          </h2>
          <p>
            The <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_MODIFY(jsonString, path, newValue)</code> function updates a value
            at a specific path within a JSON string and returns the modified JSON string.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`DECLARE @jsonDoc NVARCHAR(MAX);
SET @jsonDoc = N'{
  "name": "Product A",
  "price": 19.99,
  "details": { "color": "black" }
}';

-- Update existing value
SET @jsonDoc = JSON_MODIFY(@jsonDoc, '$.price', 24.99);
-- Add new value (if path doesn't exist)
SET @jsonDoc = JSON_MODIFY(@jsonDoc, '$.inStock', 1);
-- Add value in nested object (creates object if it doesn't exist in lax mode)
SET @jsonDoc = JSON_MODIFY(@jsonDoc, '$.details.weight', '1.2kg');
-- Delete value (set newValue to NULL)
SET @jsonDoc = JSON_MODIFY(@jsonDoc, '$.details.color', NULL);

SELECT @jsonDoc AS ModifiedJson;`}
              </code>
            </pre>
          </div>
           <p className="mt-2">
            Example Output:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`{
  "name": "Product A",
  "price": 24.99,
  "details": {
    "weight": "1.2kg"
  },
  "inStock": 1
}`}
              </code>
            </pre>
          </div>

           <h4 className="text-lg font-semibold mt-4 mb-2">JSON_MODIFY with Arrays:</h4>
          <p>
            You can modify array elements or append to arrays using <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_MODIFY</code>.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`DECLARE @jsonDoc NVARCHAR(MAX);
SET @jsonDoc = N'{
  "tags": ["electronics", "gadget"]
}';

-- Append a value to the array
SET @jsonDoc = JSON_MODIFY(@jsonDoc, 'append $.tags', 'popular');
-- Update an element by index (0-based)
SET @jsonDoc = JSON_MODIFY(@jsonDoc, '$.tags[0]', 'hardware');

SELECT @jsonDoc AS ModifiedArrayJson;`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            Example Output:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-json text-sm">
                {`{
  "tags": [
    "hardware",
    "gadget",
    "popular"
  ]
}`}
              </code>
            </pre>
          </div>
           <p className="mt-2">
             Note the use of <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">'append $.tags'</code> to add to the end of the array.
           </p>
        </section>

         <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle size={24} /> Validating JSON Data (ISJSON)
          </h2>
          <p>
            The <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">ISJSON(jsonString)</code> function checks if a string contains valid JSON.
            It returns <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">1</code> if the string is valid JSON, <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">0</code> if it's invalid, and <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">NULL</code> if the input string is <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">NULL</code>.
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`SELECT
    ISJSON('{"name": "valid"}') AS IsValid1,
    ISJSON('[1, 2, 3]') AS IsValid2,
    ISJSON('invalid json') AS IsValid3,
    ISJSON(NULL) AS IsValidNull;`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            Example Output:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-text text-sm">
                {`IsValid1    IsValid2    IsValid3    IsValidNull
----------- ----------- ----------- -----------
1           1           0           NULL`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            This is useful for validation constraints or before attempting to parse JSON columns.
          </p>
        </section>

         <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap size={24} /> Performance Considerations
          </h2>
          <p>
            Working with JSON data in SQL Server can sometimes have performance implications,
            especially with large JSON documents or frequent querying/modification.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              **Indexing JSON properties:** You can create indexes on specific properties within JSON columns to speed up queries using <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_VALUE</code> or <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_QUERY</code>. This is typically done by creating computed columns based on the JSON properties and then indexing the computed columns.
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
                <pre>
                  <code className="language-sql text-sm">
                    {`-- Add a computed column for a JSON property
ALTER TABLE Products
ADD ProductName AS JSON_VALUE(ProductDetailsJson, '$.name')

-- Create an index on the computed column
CREATE INDEX IX_Products_ProductName
ON Products(ProductName);`}
                  </code>
                </pre>
              </div>
            </li>
            <li>
              **Data Types:** Storing JSON in <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">NVARCHAR(MAX)</code> is standard. Ensure you use appropriate SQL types when extracting data with <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">OPENJSON WITH</code>.
            </li>
             <li>
              **Avoid Shredding Large JSON Repeatedly:** If you frequently need to access data within a JSON document, consider extracting commonly accessed properties into standard columns and indexing them, rather than repeatedly using <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">OPENJSON</code> or <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_VALUE</code> on the raw JSON string.
            </li>
             <li>
              **Hardware:** As with any database operation, sufficient CPU, memory, and fast storage are crucial for performance, especially when processing large amounts of JSON data.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Info size={24} /> Summary and Best Practices
          </h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              **Use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">FOR JSON</code>** to easily format query results for web services or applications expecting JSON. Use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">AUTO</code> for simplicity, <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">PATH</code> for precise structure control.
            </li>
             <li>
              **Use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">OPENJSON</code>** when you need to "shred" JSON data into a relational table format, often for querying, filtering, or joining with other relational data.
            </li>
             <li>
              **Use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_VALUE</code> and <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_QUERY</code>** for extracting specific scalar values or JSON fragments without converting the whole document to rows. Remember the difference between scalar and object/array extraction.
            </li>
             <li>
              **Use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_MODIFY</code>** for targeted updates within a JSON string without needing to read and rewrite the entire content.
            </li>
             <li>
              **Use <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">ISJSON</code>** to validate JSON data, especially before attempting parsing or modification.
            </li>
             <li>
              Consider computed columns and indexing for performance-critical queries on JSON properties.
            </li>
             <li>
              Store JSON data in <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">NVARCHAR(MAX)</code> columns.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code size={24} /> Putting It Together: An Example
          </h2>
          <p>
            Let's imagine a scenario where we have customer data with a JSON column storing preferences, and we want to list customers who prefer email notifications and format the output with their orders included as a nested array.
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-sql text-sm">
                {`-- Assume table Customers with columns CustomerID INT, Name NVARCHAR(100), PreferencesJson NVARCHAR(MAX)
-- Assume table Orders with columns OrderID INT, CustomerID INT, OrderDate DATETIME2

-- Filter customers based on a JSON property and format output with nested orders
SELECT
    c.CustomerID AS "id",
    c.Name AS "name",
    JSON_VALUE(c.PreferencesJson, '$.newsletter.email') AS "preferences.emailNewsletter", -- Extract scalar from JSON
    (
        SELECT
            o.OrderID AS "$.orderId",
            o.OrderDate AS "$.orderDate"
        FROM
            Orders o
        WHERE
            o.CustomerID = c.CustomerID
        FOR JSON PATH
    ) AS "orders" -- Nest orders as an array
FROM
    Customers c
WHERE
    ISJSON(c.PreferencesJson) = 1 -- Ensure JSON is valid
    AND JSON_VALUE(c.PreferencesJson, '$.newsletter.email') = 'true' -- Filter based on JSON property
FOR JSON PATH, ROOT('CustomersWithEmailPrefs'); -- Format as root object containing an array`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            This example combines <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">ISJSON</code> for validation, <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">JSON_VALUE</code> for filtering, and <code className="font-mono bg-gray-100 p-1 rounded text-sm dark:bg-gray-800">FOR JSON PATH</code> with a subquery for nested output, demonstrating how these functions can work together.
          </p>
        </section>

         <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Info size={24} /> Conclusion
          </h2>
          <p>
            SQL Server's native JSON functions provide powerful capabilities for integrating
            JSON data into your relational database workflows. Whether you're generating
            JSON for APIs, parsing data from external sources, or querying/modifying
            JSON stored within your tables, these functions offer flexible and
            efficient ways to handle this popular data format directly within SQL Server.
            Understanding the different functions and formatting options allows developers
            to choose the most appropriate tools for their specific JSON-related tasks.
          </p>
        </section>
      </div>
    </>
  );
}
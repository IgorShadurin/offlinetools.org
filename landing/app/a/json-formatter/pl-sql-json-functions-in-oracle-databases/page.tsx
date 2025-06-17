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
  title: "PL/SQL JSON Functions in Oracle Databases | Oracle Database Guide",
  description:
    "Explore the powerful built-SQL functions in Oracle Database for working with JSON data, including creating, querying, modifying, and indexing JSON.",
};

export default function OracleJsonFunctionsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Database className="mr-3 w-8 h-8 text-blue-600" />
        PL/SQL JSON Functions in Oracle Databases
      </h1>

      <p className="text-lg mb-8">
        Oracle Database has robust support for handling JSON data directly within SQL and PL/SQL. This guide explores
        the key built-in functions that empower developers to seamlessly integrate JSON processing into their database
        applications, from storing and creating JSON to querying, modifying, and indexing it efficiently.
      </p>

      <div className="space-y-10">
        {/* Section 1: Why JSON in Oracle? */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileJson className="mr-2 text-green-600" /> Why Use JSON in Oracle Database?
          </h2>
          <p>
            JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read
            and write and easy for machines to parse and generate. Its flexible, schema-less nature makes it ideal for
            many modern applications, especially those dealing with diverse or evolving data structures.
          </p>
          <p className="mt-2">Integrating JSON support directly into the database engine allows you to:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Store schema-flexible data alongside traditional relational data.</li>
            <li>Process JSON data without extracting it into application code.</li>
            <li>Leverage Oracle&apos;s strengths like ACID transactions, security, and scalability for JSON data.</li>
            <li>Use familiar SQL syntax to interact with JSON.</li>
          </ul>
        </section>

        {/* Section 2: Storing JSON */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Package className="mr-2 text-purple-600" /> Storing JSON Data
          </h2>
          <p>Oracle offers several ways to store JSON data in columns:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>
              <span className="font-semibold">VARCHAR2, CLOB, BLOB:</span> You can store JSON text as strings in these
              traditional datatypes. However, Oracle recommends using the native <code>JSON</code> datatype for better
              performance and validation.
            </li>
            <li>
              <span className="font-semibold">JSON Datatype (Oracle 12c Release 2 and later):</span> This native
              datatype stores JSON in a binary format optimized for queries and updates. It also ensures that the data
              stored is valid JSON. Oracle internally manages the storage format (often OSON - Oracle Spatial and Graph
              JSON binary format).
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Using the JSON Datatype</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`CREATE TABLE products (
    product_id NUMBER PRIMARY KEY,
    product_info JSON
);

INSERT INTO products (product_id, product_info)
VALUES (101, '{"name": "Laptop", "brand": "TechCo", "specs": {"cpu": "i7", "ram": 16}}');

INSERT INTO products (product_id, product_info)
VALUES (102, '{"name": "Keyboard", "brand": "Accessory inc", "color": "Black"}');

-- Inserting invalid JSON will raise an error with the JSON datatype
-- INSERT INTO products (product_id, product_info)
-- VALUES (103, '{"name": "Mouse", "brand": "Logi"');
`}
              </pre>
            </div>
          </div>
          <div className="flex items-start p-3 bg-blue-100 border border-blue-200 rounded-md text-sm mt-4 dark:bg-blue-900 dark:border-blue-700">
            <Info className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 dark:text-blue-300" />
            <p>
              When using <code>VARCHAR2</code> or <code>CLOB</code>, you can add an <code>IS JSON</code> check
              constraint to ensure data validity, although the native <code>JSON</code> type is generally preferred.
            </p>
          </div>
        </section>

        {/* Section 3: Creating JSON */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 text-orange-600" /> Creating JSON with SQL/PL/SQL
          </h2>
          <p>
            Oracle provides functions to construct JSON objects and arrays from SQL query results or PL/SQL variables.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <span className="font-semibold">JSON_OBJECT:</span> Creates a JSON object from name-value pairs.
            </li>
            <li>
              <span className="font-semibold">JSON_ARRAY:</span> Creates a JSON array from a list of values.
            </li>
            <li>
              <span className="font-semibold">JSON_ARRAYAGG:</span> Aggregates values from multiple rows into a single
              JSON array.
            </li>
            <li>
              <span className="font-semibold">JSON_OBJECTAGG:</span> Aggregates key-value pairs from multiple rows into
              a single JSON object.
            </li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Creating JSON with Functions</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`-- Creating a simple JSON object
SELECT JSON_OBJECT('name' VALUE 'Alice', 'age' VALUE 30) AS simple_json_object FROM dual;
-- Output: {"name":"Alice","age":30}

-- Creating a JSON object with a nested object
SELECT JSON_OBJECT('person' VALUE JSON_OBJECT('name' VALUE 'Bob', 'city' VALUE 'London')) AS nested_json_object FROM dual;
-- Output: {"person":{"name":"Bob","city":"London"}}

-- Creating a simple JSON array
SELECT JSON_ARRAY(1, 2, 3, 'apple', TRUE) AS simple_json_array FROM dual;
-- Output: [1,2,3,"apple",true]

-- Creating a JSON array of objects from table data (example table: employees)
-- Assume employees table has columns employee_id, name, job
/*
CREATE TABLE employees (
    employee_id NUMBER PRIMARY KEY,
    name VARCHAR2(100),
    job VARCHAR2(100)
);
INSERT INTO employees VALUES (1, 'Alice', 'Engineer');
INSERT INTO employees VALUES (2, 'Bob', 'Manager');
INSERT INTO employees VALUES (3, 'Charlie', 'Analyst');
*/
SELECT JSON_ARRAYAGG(
           JSON_OBJECT(
               'id'   VALUE employee_id,
               'name' VALUE name,
               'role' VALUE job
           ) ORDER BY employee_id
       ) AS employees_json_array FROM employees;
/*
Output (example):
[
  {"id":1,"name":"Alice","role":"Engineer"},
  {"id":2,"name":"Bob","role":"Manager"},
  {"id":3,"name":"Charlie","role":"Analyst"}
]
*/

-- Creating a JSON object where keys are employee IDs and values are employee names
SELECT JSON_OBJECTAGG(employee_id VALUE name) AS employees_json_object FROM employees;
/*
Output (example):
{"1":"Alice","2":"Bob","3":"Charlie"}
*/
`}
              </pre>
            </div>
          </div>
          <div className="flex items-start p-3 bg-yellow-100 border border-yellow-200 rounded-md text-sm mt-4 dark:bg-yellow-900 dark:border-yellow-700">
            <Lightbulb className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 dark:text-yellow-300" />
            <p>
              The <code>ABSENT ON NULL</code> and <code>NULL ON NULL</code> clauses can be used with{" "}
              <code>JSON_OBJECT</code> and
              <code>JSON_ARRAY</code> to control whether null values result in the key/value being absent or present
              with a JSON null. By default, it&apos;s usually <code>NULL ON NULL</code>.
            </p>
          </div>
        </section>

        {/* Section 4: Querying JSON */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Search className="mr-2 text-cyan-600" /> Querying JSON Data
          </h2>
          <p>
            Extracting data from JSON stored in Oracle is done using powerful functions that leverage SQL/JSON path
            expressions, similar to XPath for XML.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <span className="font-semibold">JSON_VALUE:</span> Extracts a scalar value (string, number, boolean, null)
              from JSON. Returns NULL by default if the path is not found or the result is not scalar.
            </li>
            <li>
              <span className="font-semibold">JSON_QUERY:</span> Extracts a JSON object or array from JSON. Returns NULL
              by default if the path is not found or the result is scalar.
            </li>
            <li>
              <span className="font-semibold">JSON_EXISTS:</span> Checks if a specific path exists within the JSON data.
              Returns TRUE or FALSE.
            </li>
            <li>
              <span className="font-semibold">JSON_TABLE:</span> Transforms JSON data into relational rows and columns,
              allowing you to query JSON structures as if they were tables. This is arguably the most powerful function
              for complex queries.
            </li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Querying JSON with Functions</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`-- Using the products table created earlier
-- Select product name using JSON_VALUE
SELECT product_id, JSON_VALUE(product_info, '$.name') AS product_name FROM products WHERE product_id = 101;
-- Output: 101, Laptop

-- Select the 'specs' object using JSON_QUERY
SELECT product_id, JSON_QUERY(product_info, '$.specs') AS product_specs FROM products WHERE product_id = 101;
-- Output: 101, {"cpu":"i7","ram":16}

-- Check if a product has a 'color' property using JSON_EXISTS
SELECT product_id, JSON_EXISTS(product_info, '$.color') AS has_color FROM products;
/*
Output:
101, FALSE
102, TRUE
*/

-- Extract a nested scalar value using JSON_VALUE
SELECT product_id, JSON_VALUE(product_info, '$.specs.cpu') AS cpu FROM products WHERE product_id = 101;
-- Output: 101, i7

-- Handle missing paths or invalid types with ON ERROR and ON EMPTY clauses (JSON_VALUE defaults: NULL ON ERROR, NULL ON EMPTY)
SELECT product_id,
       JSON_VALUE(product_info, '$.price' DEFAULT 'N/A' ON EMPTY) AS product_price, -- Path does not exist
       JSON_VALUE(product_info, '$.specs' ERROR ON ERROR) AS product_specs_value -- specs is an object, not scalar
FROM products WHERE product_id = 101;
-- Output: 101, N/A (for price), Error (for specs)

-- Using JSON_TABLE to extract multiple columns from JSON
SELECT p.product_id, jt.name, jt.brand, jt.cpu, jt.ram
FROM products p,
     JSON_TABLE(p.product_info, '$' -- Path to the root object
         COLUMNS (
             name  VARCHAR2(100) PATH '$.name',
             brand VARCHAR2(100) PATH '$.brand',
             -- Nested path for specs
             NESTED PATH '$.specs' -- Path to the nested object/array
                 COLUMNS (
                     cpu VARCHAR2(50) PATH '$.cpu',
                     ram NUMBER       PATH '$.ram'
                 )
         )
     ) jt;
/*
Output:
PRODUCT_ID, NAME    , BRAND          , CPU, RAM
----------------------------------------------------
101       , Laptop  , TechCo         , i7 , 16
102       , Keyboard, Accessory inc  ,    ,
*/

-- Using JSON_TABLE to flatten an array within JSON (example structure: {"order_id": 1, "items": [{"item_id": 10, "qty": 2}, {"item_id": 20, "qty": 1}]})
/*
CREATE TABLE orders (
    order_id NUMBER PRIMARY KEY,
    order_details JSON
);
INSERT INTO orders VALUES (1, '{"order_id": 1, "items": [{"item_id": 10, "qty": 2}, {"item_id": 20, "qty": 1}]}');
INSERT INTO orders VALUES (2, '{"order_id": 2, "items": [{"item_id": 30, "qty": 5}]}');
*/
SELECT o.order_id, item.item_id, item.qty
FROM orders o,
     JSON_TABLE(o.order_details, '$.items[*]' -- Path to the array and '*' iterates elements
         COLUMNS (
             item_id NUMBER PATH '$.item_id',
             qty     NUMBER PATH '$.qty'
         )
     ) item;
/*
Output:
ORDER_ID, ITEM_ID, QTY
-----------------------
1       , 10     , 2
1       , 20     , 1
2       , 30     , 5
*/
`}
              </pre>
            </div>
          </div>
          <div className="flex items-start p-3 bg-blue-100 border border-blue-200 rounded-md text-sm mt-4 dark:bg-blue-900 dark:border-blue-700">
            <Info className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 dark:text-blue-300" />
            <p>
              SQL/JSON path expressions start with <code>$</code>, representing the context item (usually the JSON
              document itself). Use <code>.key</code> for object members and <code>[index]</code> for array elements
              (0-based). <code>[*]</code> iterates over all elements in an array.
            </p>
          </div>
        </section>

        {/* Section 5: Modifying JSON */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Edit className="mr-2 text-teal-600" /> Modifying JSON Data
          </h2>
          <p>
            Oracle provides the <code>JSON_TRANSFORM</code> function (Oracle 18c and later) to perform various mutation
            operations on JSON data efficiently.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Modifying JSON with JSON_TRANSFORM</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`-- Using the products table
-- Add a new field 'price'
SELECT JSON_TRANSFORM(product_info, SET '$.price' = 599.99) AS updated_json FROM products WHERE product_id = 101;
-- Output: {"name":"Laptop","brand":"TechCo","specs":{"cpu":"i7","ram":16},"price":599.99}

-- Update an existing field 'brand'
SELECT JSON_TRANSFORM(product_info, SET '$.brand' = 'Acme Corp') AS updated_json FROM products WHERE product_id = 102;
-- Output: {"name":"Keyboard","brand":"Acme Corp","color":"Black"}

-- Remove a field 'color'
SELECT JSON_TRANSFORM(product_info, REMOVE '$.color') AS updated_json FROM products WHERE product_id = 102;
-- Output: {"name":"Keyboard","brand":"Accessory inc"} -- Note: The example is SELECT, UPDATE would modify the table

-- Insert an element into an array (if specs.accessories is an array)
-- Let's assume product_info for 101 is '{"name":"Laptop","brand":"TechCo","specs":{"cpu":"i7","ram":16,"accessories":[]}}'
-- SELECT JSON_TRANSFORM(product_info, INSERT '$.specs.accessories[0]' = 'Mouse') AS updated_json FROM products WHERE product_id = 101;
-- Output: {"name":"Laptop","brand":"TechCo","specs":{"cpu":"i7","ram":16,"accessories":["Mouse"]}}

-- Multiple operations in one call
SELECT JSON_TRANSFORM(product_info,
                      SET    '$.price' = 649.50,
                      REMOVE '$.color'
       ) AS updated_json FROM products WHERE product_id = 102;
-- Output: {"name":"Keyboard","brand":"Accessory inc","price":649.5} -- Price added, color removed

-- Example UPDATE statement using JSON_TRANSFORM
-- UPDATE products
-- SET product_info = JSON_TRANSFORM(product_info, SET '$.price' = 649.50)
-- WHERE product_id = 101;
`}
              </pre>
            </div>
          </div>
          <div className="flex items-start p-3 bg-blue-100 border border-blue-200 rounded-md text-sm mt-4 dark:bg-blue-900 dark:border-blue-700">
            <Info className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 dark:text-blue-300" />
            <p>
              <code>JSON_TRANSFORM</code> supports operations like <code>SET</code>, <code>INSERT</code>,{" "}
              <code>REPLACE</code>, <code>ADD</code>, and <code>REMOVE</code>.<code>ADD</code> is used for adding
              elements to arrays, while <code>INSERT</code> can be used to insert at a specific index.
            </p>
          </div>
        </section>

        {/* Section 6: Indexing JSON */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <SquareAsterisk className="mr-2 text-red-600" /> Indexing JSON Data
          </h2>
          <p>
            Effective indexing is crucial for query performance, especially with large JSON datasets. Oracle offers
            several options:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <span className="font-semibold">JSON Search Index (Oracle 12c Release 2 and later):</span> A special type
              of index optimized for searching within JSON documents. It can index scalar values, arrays, or even index
              everything. It&apos;s a domain index (like TEXT indexes). Oracle 21c introduced a faster type of JSON
              search index.
            </li>
            <li>
              <span className="font-semibold">Function-Based Index:</span> Create a standard B-tree index on the result
              of a JSON function (like <code>JSON_VALUE</code>) for a specific, frequently queried scalar path.
            </li>
            <li>
              <span className="font-semibold">B-tree Index on Virtual Columns:</span> Create a virtual column that
              extracts a scalar value using <code>JSON_VALUE</code>, then index the virtual column. Similar to a
              function-based index but the extracted value is represented as a column.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Creating Indexes on JSON</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`-- Using the products table

-- Create a JSON Search Index (indexes scalar values by default)
CREATE SEARCH INDEX products_json_search_idx ON products (product_info) FOR JSON;

-- Create a Function-Based Index on a specific path (e.g., product name)
CREATE INDEX products_name_fbi ON products (JSON_VALUE(product_info, '$.name'));

-- Create a Virtual Column and index it (alternative to FBI)
ALTER TABLE products ADD (product_name_vc VARCHAR2(100) GENERATED ALWAYS AS (JSON_VALUE(product_info, '$.name')));
CREATE INDEX products_name_vc_idx ON products (product_name_vc);

-- JSON Search Index for indexing specific paths or types (More advanced)
-- CREATE SEARCH INDEX products_json_complex_idx ON products (product_info) FOR JSON
-- PARAMETERS ('INCLUDE PATHS ($.name, $.brand, $.specs.cpu) DATAGUIDE ON');
`}
              </pre>
            </div>
          </div>
          <div className="flex items-start p-3 bg-yellow-100 border border-yellow-200 rounded-md text-sm mt-4 dark:bg-yellow-900 dark:border-yellow-700">
            <Lightbulb className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 dark:text-yellow-300" />
            <p>
              Choose the indexing strategy based on your query patterns. Function-based indexes/virtual columns are
              great for queries filtering on specific scalar values. JSON Search indexes are more versatile for searches
              involving multiple paths or predicates within the JSON.
            </p>
          </div>
          <div className="flex items-start p-3 bg-red-100 border border-red-200 rounded-md text-sm mt-4 dark:bg-red-900 dark:border-red-700">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 dark:text-red-300" />
            <p>
              Querying JSON without appropriate indexes can lead to full table scans and poor performance, especially on
              large tables. Always analyze your query execution plans.
            </p>
          </div>
        </section>

        {/* Section 7: Performance Considerations */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <AreaChart className="mr-2 text-indigo-600" /> Performance and Best Practices
          </h2>
          <p>To ensure optimal performance when working with JSON in Oracle:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              Use the native <code>JSON</code> datatype if possible (12c R2+).
            </li>
            <li>Design appropriate indexes based on your most frequent query patterns.</li>
            <li>
              Use <code>JSON_VALUE</code> for extracting single scalar values and <code>JSON_QUERY</code> for
              objects/arrays.
            </li>
            <li>
              Leverage <code>JSON_TABLE</code> for complex queries that need to join or filter on multiple JSON fields
              or flatten arrays.
            </li>
            <li>
              Be mindful of the <code>ON ERROR</code> and <code>ON EMPTY</code> clauses in query functions, as their
              default behavior might impact performance or results.
            </li>
            <li>
              Avoid storing massive JSON documents in a single column if you frequently need to query small parts of
              them; consider normalizing structures or using appropriate indexing.
            </li>
            <li>
              Keep your Oracle Database version updated to benefit from performance enhancements in JSON processing.
            </li>
          </ul>
        </section>

        {/* Section 8: Conclusion */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <CheckCircle className="mr-2 text-green-600" /> Conclusion
          </h2>
          <p>
            Oracle Database provides a comprehensive set of functions for handling JSON data, enabling developers to
            build applications that leverage the flexibility of JSON while benefiting from the robustness and
            performance of the Oracle platform. By understanding and utilizing functions like <code>JSON_OBJECT</code>,{" "}
            <code>JSON_ARRAYAGG</code>, <code>JSON_VALUE</code>, <code>JSON_QUERY</code>, <code>JSON_TABLE</code>,{" "}
            <code>JSON_TRANSFORM</code>, and the various indexing options, you can effectively work with JSON data
            directly within your SQL and PL/SQL code.
          </p>
        </section>
      </div>
    </>
  );
}

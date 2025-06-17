import type { Metadata } from "next";
import {
  FileText,
  Code,
  Settings, // Replaced Tool with Settings
  GitCompare,
  FileJson,
  ListTree,
} from "lucide-react";

export const metadata: Metadata = {
  title: "R Language Tools for JSON Formatting and Analysis",
  description:
    "Explore the essential R packages and techniques for working with JSON data, including reading, writing, formatting, and analyzing complex JSON structures.",
};

export default function RJsonToolsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">R Language Tools for JSON Formatting and Analysis</h1>

      <div className="space-y-6">
        <p>
          The R language is a powerful environment for statistical computing and graphics, widely used in data analysis,
          visualization, and machine learning. In today&apos;s data landscape, JSON (JavaScript Object Notation) has
          become a ubiquitous format for data exchange, especially in web APIs and NoSQL databases. Bridging the gap
          between R&apos;s analytical capabilities and JSON data sources is a common and essential task for many data
          scientists and developers.
        </p>
        <p>
          This page explores the key R packages and techniques available for efficiently handling JSON data, from simple
          reading and writing to analyzing complex, nested structures.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <span className="mr-2">
            <Settings size={24} />
          </span>
          Why Process JSON in R?
        </h2>
        <p>Integrating JSON data into an R workflow is crucial for several reasons:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Data Acquisition:</strong> Many modern data sources (web APIs, databases) provide data in JSON
            format. R needs to read and parse this data.
          </li>
          <li>
            <strong>Data Preparation:</strong> Transforming raw JSON into R data structures (data frames, lists) is
            necessary for analysis.
          </li>
          <li>
            <strong>Data Export:</strong> R results or data need to be exported in JSON format for use in web
            applications, other services, or for storage.
          </li>
          <li>
            <strong>Analysis of Semi-structured Data:</strong> JSON&apos;s flexible nature allows for semi-structured
            data, which R can process and analyze statistically.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <span className="mr-2">
            <FileJson size={24} />
          </span>
          Key R Packages for JSON
        </h2>
        <p>
          Several packages in R facilitate working with JSON. The most popular and generally recommended is `jsonlite`,
          but others like `rjson` and `ndjson` have their uses.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <code>jsonlite</code>: The Modern Standard
        </h3>
        <p>
          The `jsonlite` package is designed to be a robust and convenient interface for converting between JSON data
          and R objects, particularly excelling at handling complex and nested structures. It provides a simple and
          consistent API.
        </p>
        <p>Key functions include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>fromJSON()</code>: Parses JSON into R objects.
          </li>
          <li>
            <code>toJSON()</code>: Converts R objects into JSON.
          </li>
          <li>
            <code>prettify()</code>: Formats JSON strings for readability.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2 flex items-center">
            <span className="mr-2">
              <Code size={20} />
            </span>
            Installing <code>jsonlite</code>:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`install.packages("jsonlite")
library(jsonlite)`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <code>rjson</code>: An Older Alternative
        </h3>
        <p>
          The `rjson` package is another option, often faster for very simple JSON structures but less intuitive and
          sometimes less robust for complex or non-standard JSON compared to `jsonlite`. `jsonlite` is generally
          preferred for new projects due to its features and ease of use.
        </p>
        <p>Key functions:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>fromJSON()</code>
          </li>
          <li>
            <code>toJSON()</code>
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2 flex items-center">
            <span className="mr-2">
              <Code size={20} />
            </span>
            Installing <code>rjson</code>:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`install.packages("rjson")
library(rjson)`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Note: While it has the same function names, the behavior and options differ significantly from `jsonlite`.
            Using both in the same script without careful management can lead to confusion.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <code>ndjson</code>: For JSON Lines
        </h3>
        <p>
          JSON Lines (or newline-delimited JSON, ndjson) is a format where each line is a separate, valid JSON object.
          This is common in log files and streaming data. The `ndjson` package is specifically designed to efficiently
          read and write data in this format, handling large files line by line.
        </p>
        <p>Key functions:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>stream_in()</code>: Reads ndjson from a file or connection.
          </li>
          <li>
            <code>stream_out()</code>: Writes ndjson to a file or connection.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2 flex items-center">
            <span className="mr-2">
              <Code size={20} />
            </span>
            Installing <code>ndjson</code>:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`install.packages("ndjson")
library(ndjson)`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <span className="mr-2">
            <FileText size={24} />
          </span>
          Common Tasks with <code>jsonlite</code> Examples
        </h2>
        <p>Let&apos;s focus on `jsonlite`, as it&apos;s the most versatile for general JSON handling.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <span className="mr-2">
            <FileText size={20} />
          </span>
          Reading JSON
        </h3>
        <p>
          You can read JSON directly from a string, a local file, or a URL. `jsonlite` attempts to convert the JSON
          structure into the most appropriate R object, typically a list or a data frame.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Reading from a String:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`library(jsonlite)

json_string <- '{ "name": "Alice", "age": 30, "isStudent": false, "courses": ["Math", "Science"], "address": { "city": "Wonderland", "zip": "12345" } }'

r_data <- fromJSON(json_string)

# Check the structure
str(r_data)

# Access elements
print(r_data$name)
print(r_data$courses[1])
print(r_data$address$city)`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Reading from a File:</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Assume you have a file named `data.json` in your working directory.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`# First, create a dummy data.json file for this example
# cat('{ "id": 101, "status": "active", "tags": ["A", "B"] }') > data.json

library(jsonlite)

r_data_from_file <- fromJSON("data.json")

str(r_data_from_file)`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Reading from a URL:</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Reading from a public API endpoint.</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`# Example using the JSONPlaceholder API
library(jsonlite)

url <- "https://jsonplaceholder.typicode.com/posts/1"

post_data <- fromJSON(url)

str(post_data)`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <span className="mr-2">
            <FileText size={20} />
          </span>
          Writing JSON
        </h3>
        <p>
          Converting R objects (like data frames, lists, vectors) into JSON strings or files is straightforward using
          `toJSON()`.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Writing an R List/Data Frame to JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`library(jsonlite)

# Create an R list
r_list <- list(
  name = "Bob",
  age = 25,
  active = TRUE,
  scores = c(85, 92, 78)
)

json_output_string <- toJSON(r_list, pretty = TRUE) # pretty = TRUE for readability

cat(json_output_string)

# Create an R data frame
r_df <- data.frame(
  ID = 1:3,
  Name = c("Alice", "Bob", "Charlie"),
  Value = c(10.5, 20.1, 15.9)
)

json_output_df <- toJSON(r_df, pretty = TRUE)

cat(json_output_df)`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            By default, `toJSON` serializes data frames as arrays of objects (each row becomes a JSON object). You can
            change this behavior using the `dataframe` argument.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Writing JSON to a File:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`library(jsonlite)

r_data_to_save <- list(
  project = "Analysis",
  date = "2023-10-27",
  results = list(mean = 15.3, sd = 2.1)
)

# Write to a file
write(toJSON(r_data_to_save, pretty = TRUE), "output_data.json")

# Verify by reading it back
readLines("output_data.json")`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <span className="mr-2">
            <GitCompare size={20} />
          </span>
          Handling Complex and Nested JSON
        </h3>
        <p>
          One of `jsonlite`&apos;s strengths is handling nested JSON. By default, it often represents nested objects as
          nested lists in R and arrays as vectors or data frames.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Parsing Nested Structures:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`library(jsonlite)

nested_json <- '{
  "id": "user123",
  "profile": {
    "name": "Charlie",
    "settings": {
      "theme": "dark",
      "notifications": true
    }
  },
  "orders": [
    { "order_id": "A001", "amount": 100 },
    { "order_id": "A002", "amount": 150 }
  ]
}'

r_nested_data <- fromJSON(nested_json)

# Accessing nested elements
print(r_nested_data$profile$name)
print(r_nested_data$profile$settings$theme)
print(r_nested_data$orders) # This will likely be a data frame
print(r_nested_data$orders$amount[2])`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <span className="mr-2">
            <ListTree size={20} />
          </span>
          Flattening JSON
        </h3>
        <p>
          Sometimes, complex nested JSON isn&apos;t ideal for direct analysis in R data frames. `jsonlite` provides the
          `flatten()` option in `fromJSON` to help convert nested structures into a &quot;wider&quot; data frame by
          concatenating column names.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Using <code>flatten = TRUE</code>:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`library(jsonlite)

# Re-using the nested_json from the previous example
r_flattened_data <- fromJSON(nested_json, flatten = TRUE)

str(r_flattened_data)

# Notice how names are concatenated:
# id
# profile.name
# profile.settings.theme
# profile.settings.notifications
# orders (this might still be a list column or array depending on structure)

# Flattening works best when the structure is somewhat consistent.`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Be cautious with `flatten = TRUE` on very complex or deeply nested JSON with inconsistent structures; it
            might not produce the desired flat data frame. You might need manual processing for complex lists-of-lists
            or lists-of-data-frames that don&apos;t auto-convert nicely.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <span className="mr-2">
            <Code size={20} />
          </span>
          Formatting JSON (Pretty Printing)
        </h3>
        <p>
          JSON data retrieved from sources might be minified (without whitespace or indentation) to save space.
          `jsonlite` can format it for human readability.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Using <code>prettify()</code>:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`library(jsonlite)

minified_json <- '{"a":1,"b":[2,3],"c":{"d":4}}'

pretty_json <- prettify(minified_json)

cat(pretty_json)

# toJSON() also has a pretty=TRUE argument as shown before`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <span className="mr-2">
            <FileJson size={20} />
          </span>
          Working with JSON Lines (`ndjson`)
        </h3>
        <p>
          For large files where each line is a separate JSON object, the `ndjson` package is highly efficient as it
          processes data line by line.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Reading ndjson:</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Assume you have a file named `log.ndjson`.</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`# First, create a dummy log.ndjson file
# cat('{"event": "login", "user": "alice"}\n{"event": "logout", "user": "bob"}') > log.ndjson

library(ndjson)

ndjson_data <- stream_in("log.ndjson")

str(ndjson_data)`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            `stream_in` can take a file path or a connection object. For very large files, consider processing in chunks
            or piping directly from a source.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Writing ndjson:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`library(ndjson)

# Create a list of R objects (each object will be a line)
data_list <- list(
  list(id = 1, value = 100),
  list(id = 2, value = 200),
  list(id = 3, value = 300)
)

# Write to an ndjson file
stream_out(data_list, file = "output.ndjson")

# Verify the output file contents
readLines("output.ndjson")`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <span className="mr-2">
            <Settings size={24} />
          </span>
          Analysis Considerations
        </h2>
        <p>
          Once JSON is parsed into R data structures (often lists or data frames), you can use standard R functions and
          packages for analysis.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Data Frames:</strong> If `fromJSON` successfully parses into a data frame (common for JSON arrays of
            objects with consistent keys), you can use packages like `dplyr`, `tidyr`, and base R functions for
            manipulation and analysis.
          </li>
          <li>
            <strong>Lists:</strong> For deeply nested or irregular JSON, `fromJSON` might return a complex list
            structure. You might need to use list manipulation functions (`lapply`, `sapply`, `purrr` package functions
            like `map`, `map_dfr`) to extract, transform, or flatten the data into a usable format like a data frame.
          </li>
          <li>
            <strong>JSON Schema:</strong> While R packages can parse JSON, they typically don&apos;t validate against a
            JSON schema. For schema validation, you might need external tools or libraries used via system calls or
            APIs.
          </li>
          <li>
            <strong>Performance:</strong> For extremely large JSON files, memory can become an issue. `ndjson` is better
            for line-delimited data. For single, large JSON objects, streaming parsers (less common in standard R
            packages) or processing on a platform better suited for large file I/O might be necessary.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          R offers excellent tools, primarily through the `jsonlite` package, for interacting with JSON data. Whether
          you need to ingest data from web APIs, work with configuration files, or process log streams, these packages
          provide flexible and powerful capabilities. Understanding how `jsonlite` converts JSON types to R types and
          how to handle nested structures is key to effectively integrating JSON data into your R-based data analysis
          workflows. For the specific format of JSON Lines, the `ndjson` package offers an optimized solution. By
          mastering these tools, you can unlock access to a vast amount of data available in JSON format and bring it
          into the powerful analytical environment of R.
        </p>
      </div>
    </>
  );
}

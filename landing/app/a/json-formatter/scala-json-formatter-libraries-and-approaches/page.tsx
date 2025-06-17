import type { Metadata } from "next";
import { Code, Feather, BookOpen, CheckCircle, Zap, Package, Wrench } from "lucide-react"; // Added Wrench here

export const metadata: Metadata = {
  title: "Scala JSON Formatter Libraries and Approaches | Offline Tools",
  description:
    "Explore popular libraries and techniques for formatting JSON data in Scala, including pretty-printing and customization.",
};

export default function ScalaJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Scala JSON Formatter Libraries and Approaches</h1>

      <div className="space-y-6">
        <p>
          Working with JSON is ubiquitous in modern software development, especially in backend services and APIs. While
          parsing JSON strings into Scala data structures and serializing Scala data structures back into JSON strings
          are common tasks, controlling the <strong>formatting</strong> of the output JSON is equally important.
          Formatting affects readability, debugging, and the ability to easily compare different JSON payloads
          (diffing).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <BookOpen className="mr-2" size={24} /> Why Format JSON?
        </h2>
        <p>
          Formatted JSON, often referred to as "pretty-printed" JSON, includes whitespace (spaces, tabs, newlines) to
          make the structure clear and easy for humans to read. Compact JSON, on the other hand, removes all unnecessary
          whitespace to minimize size, which is ideal for transmission over a network.
        </p>
        <p>Key reasons for formatting:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Feather className="inline-block mr-2 text-blue-500" size={20} /> <strong>Readability:</strong> Makes
            complex JSON structures understandable at a glance.
          </li>
          <li>
            <Code className="inline-block mr-2 text-green-500" size={20} /> <strong>Debugging:</strong> Easier to
            pinpoint issues in JSON payloads when the structure is clear.
          </li>
          <li>
            <Zap className="inline-block mr-2 text-yellow-500" size={20} /> <strong>Diffing:</strong> Comparing two
            versions of a JSON object is significantly easier with consistent indentation and line breaks.
          </li>
          <li>
            <Package className="inline-block mr-2 text-purple-500" size={20} /> <strong>Interoperability:</strong> While
            whitespace is ignored by parsers, some tools or manual processes might benefit from consistent formatting.
          </li>
        </ul>
        <p>
          Scala offers several powerful libraries for handling JSON, and most of them provide robust capabilities for
          controlling the output format. Let's look at some of the most popular ones and how they approach formatting.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Package className="mr-2" size={24} /> Popular Scala JSON Libraries and Formatting
        </h2>

        <h3 className="text-xl font-semibold mt-6">Circe</h3>
        <p>
          Circe is a popular, purely functional JSON library for Scala, built on top of Cats and Cats-Effect. It
          provides excellent encoding, decoding, and manipulation capabilities. Formatting is straightforward.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Circe Formatting Example (pretty printing with 2 spaces):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import io.circe._
import io.circe.syntax._ // Provides .asJson

// Sample data structure
case class User(name: String, age: Int, tags: List[String])

val user = User("Alice", 30, List("scala", "json", "circe"))

// Encode to Json value
val userJson: Json = user.asJson

// Pretty print with 2-space indentation
val prettyJsonString: String = userJson.spaces2

// Pretty print with 4-space indentation
// val prettyJsonString: String = userJson.spaces4

// Compact printing (no extra whitespace)
val compactJsonString: String = userJson.noSpaces

println("Pretty (2 spaces):")
println(prettyJsonString)

println("\\nCompact:")
println(compactJsonString)`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Output Example:</h4>
          <div className="bg-white p-3 rounded font-mono text-sm dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`Pretty (2 spaces):
{
  "name" : "Alice",
  "age" : 30,
  "tags" : [
    "scala",
    "json",
    "circe"
  ]
}

Compact:
{"name":"Alice","age":30,"tags":["scala","json","circe"]}`}
            </pre>
          </div>
        </div>
        <p>
          Circe provides simple methods like <code>.spaces2</code>, <code>.spaces4</code>, and <code>.noSpaces</code>{" "}
          directly on the <code>Json</code> value. You can also create a custom printer using <code>Printer</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6">Play JSON</h3>
        <p>
          Part of the Play Framework ecosystem, Play JSON is another widely used library. It provides an immutable tree
          representation of JSON and convenient macros for mapping between JSON and Scala case classes. It also offers
          built-in formatting options.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Play JSON Formatting Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import play.api.libs.json._

// Sample data structure (needs implicit Writes/Reads)
case class Product(id: Long, name: String, price: BigDecimal)

// Define implicit Writes to convert Product to Json
implicit val productWrites: Writes[Product] = Json.writes[Product]

val product = Product(101, "Laptop", BigDecimal(1200.50))

// Convert to Json value
val productJson: JsValue = Json.toJson(product)

// Pretty print
val prettyJsonString: String = Json.prettyPrint(productJson)

// Compact print
val compactJsonString: String = Json.stringify(productJson)

println("Pretty:")
println(prettyJsonString)

println("\\nCompact:")
println(compactJsonString)`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Output Example:</h4>
          <div className="bg-white p-3 rounded font-mono text-sm dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`Pretty:
{
  "id" : 101,
  "name" : "Laptop",
  "price" : 1200.50
}

Compact:
{"id":101,"name":"Laptop","price":1200.50}`}
            </pre>
          </div>
        </div>
        <p>
          Play JSON uses <code>Json.prettyPrint(jsValue)</code> for formatted output and{" "}
          <code>Json.stringify(jsValue)</code> for compact output.
        </p>

        <h3 className="text-xl font-semibold mt-6">uPickle</h3>
        <p>
          uPickle is a lightweight, fast, and popular pickling library for Scala, primarily focused on
          serialization/deserialization between Scala objects and common data formats like JSON. Its formatting
          capabilities are controlled during the writing process.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">uPickle Formatting Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import upickle.default._

// Sample data structure (uPickle can often derive ReadWriter implicitly)
case class Config(theme: String, retries: Int, enabled: Boolean)
implicit val configRW: ReadWriter[Config] = macroRW // Derive ReadWriter

val config = Config("dark", 3, true)

// Pretty print with 2-space indentation
val prettyJsonString: String = write(config, indent = 2)

// Pretty print with 4-space indentation
// val prettyJsonString: String = write(config, indent = 4)

// Compact print (default)
val compactJsonString: String = write(config)

println("Pretty (indent=2):")
println(prettyJsonString)

println("\\nCompact:")
println(compactJsonString)`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Output Example:</h4>
          <div className="bg-white p-3 rounded font-mono text-sm dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`Pretty (indent=2):
{
  "theme": "dark",
  "retries": 3,
  "enabled": true
}

Compact:
{"theme":"dark","retries":3,"enabled":true}`}
            </pre>
          </div>
        </div>
        <p>
          With uPickle, you control formatting using the <code>indent</code> parameter in the <code>write</code>{" "}
          function. An indentation level of 0 or negative results in compact output (which is also the default).
        </p>

        <h3 className="text-xl font-semibold mt-6">Jackson Scala Module</h3>
        <p>
          For projects integrating with Java ecosystems or relying on the vast features of the Jackson library, the
          Jackson Scala Module provides Scala-friendly serialization/deserialization. Formatting is typically handled
          via Jackson's <code>ObjectMapper</code> configuration.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Jackson Scala Module Formatting Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import com.fasterxml.jackson.databind.{ObjectMapper, SerializationFeature}
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter

// Sample data structure
case class Item(name: String, quantity: Int)

val mapper = new ObjectMapper()
mapper.registerModule(DefaultScalaModule)

val item = Item("Widget", 5)

// Convert to JSON Node (optional intermediate step)
// val itemNode = mapper.valueToTree[JsonNode](item)

// Pretty print using enable(SerializationFeature.INDENT_OUTPUT)
mapper.enable(SerializationFeature.INDENT_OUTPUT)
val prettyJsonString: String = mapper.writeValueAsString(item)

// You can also configure the printer directly
// mapper.setDefaultPrettyPrinter(new DefaultPrettyPrinter()) // Use default
// val prettyJsonString: String = mapper.writer(new DefaultPrettyPrinter()).writeValueAsString(item)

// Compact print (default)
mapper.disable(SerializationFeature.INDENT_OUTPUT) // Ensure indentation is off
val compactJsonString: String = mapper.writeValueAsString(item)


println("Pretty:")
println(prettyJsonString)

println("\\nCompact:")
println(compactJsonString)`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Output Example:</h4>
          <div className="bg-white p-3 rounded font-mono text-sm dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`Pretty:
{
  "name" : "Widget",
  "quantity" : 5
}

Compact:
{"name":"Widget","quantity":5}`}
            </pre>
          </div>
        </div>
        <p>
          Jackson's approach is more configuration-driven via the <code>ObjectMapper</code>. Enabling{" "}
          <code>SerializationFeature.INDENT_OUTPUT</code> provides default pretty-printing, and you can configure or
          provide a custom <code>PrettyPrinter</code> for more control.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="mr-2" size={24} /> Custom Formatting and Advanced Options
        </h2>
        <p>
          While the standard pretty-printers provided by libraries are sufficient for most cases, you might encounter
          scenarios requiring more control, such as:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Sorting keys alphabetically for deterministic output (great for diffing).</li>
          <li>Customizing indentation characters (spaces vs. tabs) or count.</li>
          <li>Controlling spacing around colons and commas.</li>
          <li>Excluding null fields.</li>
        </ul>
        <p>Most libraries offer ways to customize the printer behavior.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <CheckCircle className="inline-block mr-2 text-green-500" size={20} /> <strong>Circe:</strong> The{" "}
            <code>io.circe.Printer</code> class allows fine-grained control over whitespace, key sorting, and more. You
            create a <code>Printer</code> instance and call its <code>print(jsonValue)</code> method.
          </li>
          <li>
            <CheckCircle className="inline-block mr-2 text-green-500" size={20} /> <strong>Play JSON:</strong> While{" "}
            <code>prettyPrint</code> is fixed, you could potentially traverse the <code>JsValue</code> tree and build a
            string manually or use a helper library if extensive customization is needed, though its built-in options
            are less flexible than Circe's Printer.
          </li>
          <li>
            <CheckCircle className="inline-block mr-2 text-green-500" size={20} /> <strong>uPickle:</strong> The{" "}
            <code>write</code> method offers the <code>indent</code> parameter, but more advanced customization like key
            sorting might require manual processing or different serialization logic before writing.
          </li>
          <li>
            <CheckCircle className="inline-block mr-2 text-green-500" size={20} /> <strong>Jackson:</strong> Jackson's{" "}
            <code>PrettyPrinter</code> interface (like <code>DefaultPrettyPrinter</code>) is highly configurable. You
            can extend it or configure aspects like indentation, separators, and object/array formatting. Key sorting
            can be enabled via <code>SerializationFeature.ORDER_MAP_ENTRIES_BY_KEYS</code>.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <BookOpen className="mr-2" size={24} /> Choosing the Right Approach
        </h2>
        <p>
          The best library or approach depends largely on your project's existing dependencies, performance
          requirements, and whether you prefer a more functional or imperative style.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <CheckCircle className="inline-block mr-2 text-green-500" size={20} /> If you're already using Play
            Framework or prefer its ecosystem, <strong>Play JSON</strong> is a natural fit.
          </li>
          <li>
            <CheckCircle className="inline-block mr-2 text-green-500" size={20} /> For purely functional programming,
            excellent type safety, and fine-grained control over encoding/decoding/formatting, <strong>Circe</strong> is
            a top choice. Its <code>Printer</code> is very powerful for custom formatting.
          </li>
          <li>
            <CheckCircle className="inline-block mr-2 text-green-500" size={20} /> If speed and simplicity are
            paramount, and you don't need extensive custom formatting beyond indentation, <strong>uPickle</strong> is a
            strong contender.
          </li>
          <li>
            <CheckCircle className="inline-block mr-2 text-green-500" size={20} /> In a Java-heavy environment or if you
            need advanced features and control offered by Jackson, the <strong>Jackson Scala Module</strong> is a solid
            option, bringing Jackson's powerful features (including highly customizable pretty-printing) to Scala.
          </li>
        </ul>
        <p>
          For most pretty-printing needs, the built-in methods (<code>.spaces2</code>, <code>Json.prettyPrint</code>,{" "}
          <code>write(..., indent=...)</code>, <code>SerializationFeature.INDENT_OUTPUT</code>) are more than adequate.
          Dive into custom <code>Printer</code> configurations only when specific formatting rules are required (like
          key sorting or unique indentation styles).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <BookOpen className="mr-2" size={24} /> Conclusion
        </h2>
        <p>
          Scala offers excellent choices for working with and formatting JSON data. Libraries like Circe, Play JSON,
          uPickle, and the Jackson Scala Module each provide straightforward ways to generate both compact and
          human-readable "pretty-printed" JSON output. Understanding the formatting options available in your chosen
          library allows you to produce JSON that is not only valid but also easy to read, debug, and manage, greatly
          improving the developer experience when dealing with JSON payloads in your Scala applications.
        </p>
      </div>
    </>
  );
}

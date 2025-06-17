import type { Metadata } from "next";
import {
  Box,
  FileJson,
  Code,
  Settings,
  List,
  Sparkles,
  // Tool, // Removed Tool import as it caused an error
} from "lucide-react"; // Assuming lucide-react is installed and available

export const metadata: Metadata = {
  title: "Kotlin JSON Serialization and Formatting Libraries | Tech Articles",
  description:
    "Explore the best libraries for handling JSON in Kotlin, focusing on kotlinx.serialization, Moshi, and Gson, with examples and guidance.",
};

export default function KotlinJsonLibrariesArticle() {
  return (
    <>
      {/* Article Title */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FileJson size={32} /> Kotlin JSON Serialization and Formatting Libraries
      </h1>

      {/* Introduction */}
      <div className="space-y-6">
        <p>
          In modern software development, JSON (JavaScript Object Notation) is the de facto standard for data
          interchange, especially in web APIs and data storage. Kotlin, with its focus on conciseness and safety, offers
          excellent libraries to handle the process of converting Kotlin objects into JSON strings (serialization) and
          JSON strings back into Kotlin objects (deserialization). This process is often called marshalling or
          unmarshalling.
        </p>
        <p>
          While you could manually parse JSON strings or build them piece by piece, using a robust library provides
          numerous benefits, including type safety, reduced boilerplate code, better performance, and handling of
          complex data structures, formatting, and edge cases.
        </p>

        {/* Why Use Libraries? */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Box size={24} /> Why Use JSON Libraries in Kotlin?
        </h2>
        <p>Libraries automate the tedious and error-prone tasks:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Type Safety:</strong> Directly map JSON fields to Kotlin data class properties, leveraging Kotlin's
            type system.
          </li>
          <li>
            <strong>Less Boilerplate:</strong> Automatically generate serialization and deserialization logic, saving
            you from writing repetitive code.
          </li>
          <li>
            <strong>Handling Complex Structures:</strong> Seamlessly manage nested objects, arrays, collections, and
            polymorphic types.
          </li>
          <li>
            <strong>Performance:</strong> Optimized parsing and generation for efficiency.
          </li>
          <li>
            <strong>Formatting:</strong> Easily control output format, like pretty-printing for readability.
          </li>
        </ul>

        {/* Major Kotlin JSON Libraries */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} /> Key Libraries for Kotlin
        </h2>
        <p>Several libraries exist for handling JSON in Kotlin. The most popular and recommended ones are:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>
              <code>kotlinx.serialization</code>
            </strong>
            : The official, multiplatform serialization library developed by JetBrains. This is often the go-to choice
            for new Kotlin projects, especially those targeting multiple platforms (JVM, JS, Native, Android, iOS,
            etc.).
          </li>
          <li>
            <strong>Moshi:</strong> Developed by Square, known for its Kotlin-friendly API and use of Kotlin's
            reflection capabilities (or code generation). A solid choice, particularly popular in the Android community
            before <code>kotlinx.serialization</code> matured.
          </li>
          <li>
            <strong>GSON:</strong> Google's library. A very mature and widely used Java library that works well with
            Kotlin, though it might require more setup or boilerplate compared to Kotlin-native libraries.
          </li>
        </ul>
        <p>
          For most new Kotlin development, especially if multiplatform is a consideration,{" "}
          <code>kotlinx.serialization</code> is the recommended library due to its tight integration with the language
          and its multiplatform nature. We will focus primarily on this library.
        </p>

        {/* kotlinx.serialization Deep Dive */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Sparkles size={24} /> Deep Dive into <code>kotlinx.serialization</code>
        </h2>
        <p>
          <code>kotlinx.serialization</code> is a plugin-based library. You apply a compiler plugin to your project, and
          it automatically generates the serialization code for classes you annotate.
        </p>

        <h3 className="text-xl font-semibold mt-6">Adding Dependency</h3>
        <p>
          You need to add the serialization plugin and runtime library to your project's build file (e.g.,{" "}
          <code>build.gradle.kts</code> or <code>build.gradle</code>).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <code>build.gradle.kts</code> (Kotlin DSL)
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`plugins {
    kotlin("jvm") // or multiplatform, android, etc.
    kotlin("plugin.serialization") version "1.9.22" // Use your Kotlin version
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0") // Use the latest version
    // Add other dependencies here
}`}
            </code>
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            <code>build.gradle</code> (Groovy DSL)
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`plugins {
    id 'org.jetbrains.kotlin.jvm' // or multiplatform, android, etc.
    id 'org.jetbrains.kotlin.plugin.serialization' version '1.9.22' // Use your Kotlin version
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0' // Use the latest version
    // Add other dependencies here
}`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Basic Serialization & Deserialization</h3>
        <p>
          To make a class serializable, annotate it with <code>@Serializable</code>. Then, use the <code>Json</code>{" "}
          object to encode or decode instances.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class User(val name: String, val age: Int, val isStudent: Boolean)

fun main() {
    // Serialization
    val user = User(name = "Alice", age = 30, isStudent = false)
    val jsonString = Json.encodeToString(user)
    println("Serialized JSON: $jsonString") // Output: {"name":"Alice","age":30,"isStudent":false}

    // Deserialization
    val receivedJson = """{"name":"Bob","age":25,"isStudent":true}"""
    val decodedUser = Json.decodeFromString&lt;User&gt;(receivedJson)
    println("Decoded User: $decodedUser") // Output: User(name=Bob, age=25, isStudent=true)
}`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Settings size={20} /> Customizing Serialization
        </h3>
        <p>
          <code>kotlinx.serialization</code> offers several annotations and configurations to customize how your data is
          serialized.
        </p>

        <h4 className="text-lg font-medium mt-4 flex items-center gap-1">
          <List size={18} /> Changing Key Names (<code>@SerialName</code>)
        </h4>
        <p>
          If your JSON keys don't match your Kotlin property names, use <code>@SerialName</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`@Serializable
data class Product(
    @SerialName("product_id") val id: String,
    val name: String,
    val price: Double
)

fun main() {
    val product = Product(id = "sku123", name = "Example Widget", price = 19.99)
    val jsonString = Json.encodeToString(product)
    println("Serialized JSON: $jsonString") // Output: {"product_id":"sku123","name":"Example Widget","price":19.99}
}`}
            </code>
          </pre>
        </div>

        <h4 className="text-lg font-medium mt-4 flex items-center gap-1">
          <List size={18} /> Ignoring Properties (<code>@Transient</code>)
        </h4>
        <p>
          Use <code>@Transient</code> to exclude properties from serialization. Note that transient properties must have
          a default value.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`@Serializable
data class SensitiveData(
    val secretKey: String,
    @Transient val derivedValue: String = "ignored" // Must have default value
)

fun main() {
    val data = SensitiveData(secretKey = "very secret", derivedValue = "calculated on the fly")
    val jsonString = Json.encodeToString(data)
    println("Serialized JSON: $jsonString") // Output: {"secretKey":"very secret"}
}`}
            </code>
          </pre>
        </div>

        <h4 className="text-lg font-medium mt-4 flex items-center gap-1">
          <List size={18} /> Default Values & Missing Fields
        </h4>
        <p>
          By default, missing fields in JSON will cause deserialization errors. You can use default values in your data
          class properties to make them optional.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`@Serializable
data class Settings(
    val theme: String = "dark", // Default value
    val notificationsEnabled: Boolean // Required
)

fun main() {
    val jsonWithTheme = """{"theme":"light","notificationsEnabled":false}"""
    val settings1 = Json.decodeFromString&lt;Settings&gt;(jsonWithTheme)
    println("Settings 1: $settings1") // Output: Settings(theme=light, notificationsEnabled=false)

    val jsonWithoutTheme = """{"notificationsEnabled":true}"""
    val settings2 = Json.decodeFromString&lt;Settings&gt;(jsonWithoutTheme) // 'theme' will use default "dark"
    println("Settings 2: $settings2") // Output: Settings(theme=dark, notificationsEnabled=true)

    // val jsonMissingRequired = """{"theme":"light"}"""
    // Json.decodeFromString&lt;Settings&gt;(jsonMissingRequired) // Throws SerializationException: Field 'notificationsEnabled' is required...
}`}
            </code>
          </pre>
        </div>

        <h4 className="text-lg font-medium mt-4 flex items-center gap-1">
          <List size={18} /> Nullable Types
        </h4>
        <p>
          Kotlin's nullable types (<code>?</code>) map directly to JSON null. If a field is nullable, it can be missing
          or have a null value in the JSON.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`@Serializable
data class Contact(
    val email: String,
    val phone: String? = null // Optional phone number
)

fun main() {
    val jsonWithPhone = """{"email":"a@example.com","phone":"123-4567"}"""
    val contact1 = Json.decodeFromString&lt;Contact&gt;(jsonWithPhone)
    println("Contact 1: $contact1") // Output: Contact(email=a@example.com, phone=123-4567)

    val jsonWithoutPhone = """{"email":"b@example.com"}"""
    val contact2 = Json.decodeFromString&lt;Contact&gt;(jsonWithoutPhone)
    println("Contact 2: $contact2") // Output: Contact(email=b@example.com, phone=null)

    val jsonWithNullPhone = """{"email":"c@example.com","phone":null}"""
    val contact3 = Json.decodeFromString&lt;Contact&gt;(jsonWithNullPhone)
    println("Contact 3: $contact3") // Output: Contact(email=c@example.com, phone=null)
}`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          {/* Replaced Tool with Settings */}
          <Settings size={20} /> JSON Formatting (Pretty Printing)
        </h3>
        <p>
          By default, <code>Json.encodeToString</code> produces a compact JSON string with no unnecessary whitespace.
          For human readability, you can configure the <code>Json</code> instance to pretty print.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class ComplexData(
    val id: Int,
    val items: List&lt;String&gt;,
    val details: Map&lt;String, Double&gt;,
    val nested: User? = null
)

fun main() {
    @Serializable data class User(val name: String, val age: Int) // Define locally for example

    val data = ComplexData(
        id = 101,
        items = listOf("apple", "banana", "cherry"),
        details = mapOf("width" to 10.5, "height" to 20.0),
        nested = User("Charlie", 42)
    )

    // Compact JSON (default)
    val compactJson = Json.encodeToString(data)
    println("Compact JSON:\\n$compactJson")

    // Pretty Printed JSON
    val prettyJson = Json { prettyPrint = true }
    val prettyJsonString = prettyJson.encodeToString(data)
    println("\\nPretty JSON:\\n$prettyJsonString")
/* Output will look something like:
Compact JSON:
{"id":101,"items":["apple","banana","cherry"],"details":{"width":10.5,"height":20.0},"nested":{"name":"Charlie","age":42}}

Pretty JSON:
{
    "id": 101,
    "items": [
        "apple",
        "banana",
        "cherry"
    ],
    "details": {
        "width": 10.5,
        "height": 20.0
    },
    "nested": {
        "name": "Charlie",
        "age": 42
    }
}
*/
}`}
            </code>
          </pre>
        </div>
        <p>
          You can configure the <code>Json</code> object further using the builder lambda, for example, to ignore
          unknown keys during deserialization, use different naming strategies, etc.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`// Example of a configured Json instance
val lenientJson = Json {
    prettyPrint = true
    ignoreUnknownKeys = true // Don't fail if JSON has fields not in the data class
    isLenient = true // Allow non-standard JSON like comments or unquoted keys
    // Add other configurations as needed
}

@Serializable
data class PartialData(val name: String)

fun main() {
    val jsonWithExtraField = """{"name":"David", "extraField":"should be ignored"}"""
    val data = lenientJson.decodeFromString&lt;PartialData&gt;(jsonWithExtraField)
    println("Decoded with lenient parser: $data") // Output: PartialData(name=David)
}`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Working with Lists and Maps</h3>
        <p>
          Serialization works seamlessly with standard Kotlin collections like <code>List</code>, <code>Set</code>, and{" "}
          <code>Map</code>, provided their contents are also serializable.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            <code>
              {`import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Item(val id: Int, val description: String)

fun main() {
    val itemsList = listOf(Item(1, "First"), Item(2, "Second"))
    val itemsMap = mapOf("item1" to Item(1, "First"), "item2" to Item(2, "Second"))

    // Serialize a list
    val listJson = Json.encodeToString(itemsList)
    println("List JSON: $listJson") // Output: [{"id":1,"description":"First"},{"id":2,"description":"Second"}]

    // Serialize a map
    val mapJson = Json.encodeToString(itemsMap)
    println("Map JSON: $mapJson") // Output: {"item1":{"id":1,"description":"First"},"item2":{"id":2,"description":"Second"}}

    // Deserialize a list
    val decodedList = Json.decodeFromString&lt;List&lt;Item&gt;&gt;(listJson)
    println("Decoded List: $decodedList") // Output: [Item(id=1, description=First), Item(id=2, description=Second)]

    // Deserialize a map
    val decodedMap = Json.decodeFromString&lt;Map&lt;String, Item&gt;&gt;(mapJson)
    println("Decoded Map: $decodedMap") // Output: {item1=Item(id=1, description=First), item2=Item(id=2, description=Second)}
}`}
            </code>
          </pre>
        </div>
        <p>
          Notice the use of explicit type parameters (<code>&lt;List&lt;Item&gt;&gt;</code>,{" "}
          <code>&lt;Map&lt;String, Item&gt;&gt;</code>) for deserializing collections.
        </p>

        {/* Mention other libraries briefly */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Box size={24} /> Other Notable Libraries
        </h2>
        <h3 className="text-xl font-semibold mt-6">Moshi</h3>
        <p>
          Moshi is a mature JSON library for Java and Kotlin. It has excellent Kotlin support, including handling
          nullability and default values without requiring reflection at runtime (using a codegen processor like KSP or
          KAPT). It's known for its adapter system which makes custom serialization logic relatively straightforward.
        </p>
        <p>
          Choose Moshi if you prefer its API or adapter system, or if you're in an Android environment where it has
          historically been very popular.
        </p>
        <h3 className="text-xl font-semibold mt-6">GSON</h3>
        <p>
          GSON is a widely adopted library from Google, originally for Java. It works with Kotlin, but often requires
          more manual configuration or custom type adapters for optimal use with Kotlin's specific features like null
          safety.
        </p>
        <p>
          Use GSON if you are integrating with an existing Java project that already uses it heavily, or if you require
          some of its specific advanced features or extensive ecosystem of adapters. For new Kotlin projects,{" "}
          <code>kotlinx.serialization</code> or Moshi are generally more idiomatic choices.
        </p>

        {/* Conclusion */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} /> Conclusion
        </h2>
        <p>
          Handling JSON is a fundamental task in many Kotlin applications. While multiple libraries exist, the official{" "}
          <code>kotlinx.serialization</code> library is a powerful, modern, and multiplatform-ready solution that
          leverages Kotlin's language features effectively. By annotating your data classes and using the{" "}
          <code>Json</code> object, you can easily serialize Kotlin objects to JSON and deserialize JSON back into
          objects, handling complex structures and custom requirements with minimal boilerplate. Understanding how to
          configure the <code>Json</code> instance, especially for tasks like pretty-printing, is essential for
          debugging and human-readable output.
        </p>
      </div>
    </>
  );
}

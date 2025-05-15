import { ArrowRightLeft, LayoutList, Settings, Bug, Zap, Code, Package } from 'lucide-react';

// No metadata export as this is not a page file

export default function RustJsonSerializationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <LayoutList className="w-8 h-8 mr-3 text-blue-500" />
        Rust's Powerful Approach to JSON with Serde
      </h1>

      <div className="space-y-6">
        <p>
          In modern software development, exchanging data via JSON is ubiquitous. Whether you're building a web API, interacting with a database, or configuring applications, dealing with JSON is a daily task. Rust, known for its safety, performance, and strong type system, handles JSON through its powerful serialization/deserialization framework, <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde</code>. This guide explores how Rust, primarily using the <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde</code> and <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde_json</code> crates, provides a robust and efficient way to work with JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-green-500" />
          The Serde Ecosystem
        </h2>
        <p>
          At the heart of Rust's data serialization capabilities lies the <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde</code> crate (pronounced "ser-dee"). Serde is not a JSON library itself, but rather a framework that defines how data structures can be serialized into or deserialized from various formats. <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde_json</code> is the specific crate that implements the <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde</code> traits for the JSON format.
        </p>
        <p>
          The two core concepts in Serde are the <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Serialize</code> and <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Deserialize</code> traits.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Serialize</code>: A type that implements this trait can be converted *into* a data format (like JSON).
          </li>
          <li>
            <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Deserialize</code>: A type that implements this trait can be created *from* data in a specific format.
          </li>
        </ul>
        <p>
          Serde provides powerful derive macros (<code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">#[derive(Serialize, Deserialize)]</code>) that automatically implement these traits for most common Rust data structures (structs, enums, vectors, maps, etc.), significantly reducing boilerplate.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ArrowRightLeft className="w-6 h-6 mr-2 text-purple-500" />
          Serialization: Rust to JSON
        </h2>
        <p>
          Converting a Rust data structure into a JSON string is called serialization. With a type that implements <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Serialize</code>, this is straightforward using <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde_json::to_string</code> or <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde_json::to_string_pretty</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example: Simple Struct Serialization</h3>
        <p>
          First, add `serde` and `serde_json` to your `Cargo.toml`:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code className="language-toml">
{`[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
`}
            </code>
          </pre>
        </div>

        <p>
          Then, define your struct and derive the <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Serialize</code> trait:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code className="language-rust">
{`use serde::Serialize;

#[derive(Serialize)]
struct User {{
    name: String,
    age: u32,
    is_active: bool,
}}

fn main() {{
    let user = User {{
        name: "Alice".to_string(),
        age: 30,
        is_active: true,
    }};

    // Serialize the struct into a JSON string
    match serde_json::to_string(&user) {{
        Ok(json_string) => {{
            println!("Serialized JSON: {{}}", json_string);
            // Output: Serialized JSON: {{"name":"Alice","age":30,"is_active":true}}
        }}
        Err(err) => {{
            eprintln!("Error serializing: {{}}", err);
        }}
    }}

    // Or pretty-print it
    match serde_json::to_string_pretty(&user) {{
        Ok(json_string_pretty) => {{
            println!("Pretty JSON:{{}}\\n{{}}", "\\n", json_string_pretty);
            // Output:
            // Pretty JSON:
            // {{
            //   "name": "Alice",
            //   "age": 30,
            //   "is_active": true
            // }}
        }}
        Err(err) => {{
            eprintln!("Error serializing (pretty): {{}}", err);
        }}
    }}
}}`}
            </code>
          </pre>
        </div>
        <p>
          The derive macro automatically maps the struct fields to JSON keys. By default, Rust's <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">snake_case</code> field names are preserved in the JSON output.
        </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ArrowRightLeft className="w-6 h-6 mr-2 text-purple-500" />
          Deserialization: JSON to Rust
        </h2>
        <p>
          Deserialization is the process of parsing a JSON string and converting it into a Rust data structure. This requires the Rust type to implement the <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Deserialize</code> trait, again easily done with the derive macro.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example: Simple Struct Deserialization</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code className="language-rust">
{`use serde::Deserialize;
use serde_json::Result; // Using serde_json's Result type

#[derive(Deserialize, Debug)] // Add Debug trait to print the result
struct User {{
    name: String,
    age: u32,
    is_active: bool,
}}

fn main() {{
    let json_input = r#"{
        "name": "Bob",
        "age": 25,
        "is_active": false
    }"#; // Using a raw string literal for the JSON

    // Deserialize the JSON string into a User struct
    let user: Result<User> = serde_json::from_str(json_input);

    match user {{
        Ok(parsed_user) => {{
            println!("Deserialized User: {{:#?}}", parsed_user);
            // Output: Deserialized User: User {{ name: "Bob", age: 25, is_active: false }}
        }}
        Err(err) => {{
            eprintln!("Error deserializing: {{}}", err);
        }}
    }}

    // Example with invalid JSON
    let invalid_json = r#"{
        "name": "Charlie",
        "age": "twenty", // Invalid type for age
        "is_active": true
    }"#;

    let invalid_user: Result<User> = serde_json::from_str(invalid_json);

    match invalid_user {{
        Ok(parsed_user) => {{
            println!("Deserialized User: {{:#?}}", parsed_user);
        }}
        Err(err) => {{
            eprintln!("Error deserializing invalid JSON: {{}}", err);
            // Output includes details about the type mismatch
        }}
    }}
}}`}
            </code>
          </pre>
        </div>
        <p>
          Serde automatically handles mapping JSON keys to struct fields. If the JSON structure doesn't match the Rust struct (e.g., missing fields, wrong types), <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">from_str</code> will return an error, providing details about the mismatch.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Package className="w-6 h-6 mr-2 text-blue-500" />
          Handling Complex Data Structures
        </h2>
        <p>
          Serde works seamlessly with most standard library types like <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Vec&lt;T&gt;</code>, <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">HashMap&lt;K, V&gt;</code>, <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Option&lt;T&gt;</code>, and <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Result&lt;T, E&gt;</code>, as long as the generic parameters (<code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">T</code>, <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">K</code>, <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">V</code>, <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">E</code>) also implement <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Serialize</code>/ <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Deserialize</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example: Struct with Nested Data and Option</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code className="language-rust">
{`use serde::{{Serialize, Deserialize}};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Debug)]
struct Address {{
    street: String,
    city: String,
}}

#[derive(Serialize, Deserialize, Debug)]
struct Customer {{
    id: u32,
    name: String,
    address: Address, // Nested struct
    orders: Vec<u32>, // Vector of numbers
    metadata: HashMap<String, String>, // Map
    email: Option<String>, // Optional field
}}

fn main() {{
    let customer = Customer {{
        id: 101,
        name: "David".to_string(),
        address: Address {{
            street: "123 Main St".to_string(),
            city: "Anytown".to_string(),
        }},
        orders: vec![1001, 1005, 1010],
        metadata: {{
            let mut map = HashMap::new();
            map.insert("source".to_string(), "website".to_string());
            map
        }},
        email: Some("david@example.com".to_string()), // Present
    }};

    let json_string = serde_json::to_string_pretty(&customer).unwrap();
    println!("Customer JSON:\\n{{}}", json_string);

    let customer_no_email = Customer {{
        id: 102,
        name: "Eve".to_string(),
        address: Address {{
            street: "456 Oak Ave".to_string(),
            city: "Otherville".to_string(),
        }},
        orders: vec![],
        metadata: HashMap::new(),
        email: None, // Absent
    }};

    let json_string_no_email = serde_json::to_string_pretty(&customer_no_email).unwrap();
    println!("Customer (No Email) JSON:\\n{{}}", json_string_no_email);

    let json_input = r#"{
        "id": 103,
        "name": "Frank",
        "address": {{
            "street": "789 Pine Ln",
            "city": "Somecity"
        }},
        "orders": [2001],
        "metadata": {{
            "status": "VIP"
        }}
        // email field is missing here
    }"#;

    let parsed_customer: Result<Customer> = serde_json::from_str(json_input);

    match parsed_customer {{
        Ok(cust) => println!("Parsed Customer: {{:#?}}", cust),
        Err(err) => eprintln!("Error parsing customer: {{}}", err),
    }}
}}`}
            </code>
          </pre>
        </div>
        <p>
          Notice how <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Option&lt;String&gt;</code> serializes to a JSON string if <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Some</code> and is omitted if <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">None</code>. During deserialization, a missing key for an <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Option</code> field is correctly interpreted as <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">None</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6">Enums</h3>
        <p>
          Serde has different default ways to serialize enums depending on their structure (unit, newtype, tuple, struct). A common and often useful format is the "tagged" enum representation in JSON.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code className="language-rust">
{`use serde::{{Serialize, Deserialize}};

#[derive(Serialize, Deserialize, Debug)]
enum Event {{
    UserCreated {{ id: u32, name: String }},
    OrderPlaced {{ order_id: u32, user_id: u32, total: f64 }},
    ProductViewed(u32), // Newtype variant
    AppShutdown, // Unit variant
}}

fn main() {{
    let event1 = Event::UserCreated {{ id: 1, name: "Alice".to_string() }};
    let event2 = Event::OrderPlaced {{ order_id: 100, user_id: 1, total: 99.99 }};
    let event3 = Event::ProductViewed(50);
    let event4 = Event::AppShutdown;

    println!("Event1 JSON: {{}}", serde_json::to_string(&event1).unwrap());
    // Output: Event1 JSON: {{"UserCreated":{{"id":1,"name":"Alice"}}}}

    println!("Event2 JSON: {{}}", serde_json::to_string(&event2).unwrap());
    // Output: Event2 JSON: {{"OrderPlaced":{{"order_id":100,"user_id":1,"total":99.99}}}}

    println!("Event3 JSON: {{}}", serde_json::to_string(&event3).unwrap());
    // Output: Event3 JSON: {{"ProductViewed":50}}

    println!("Event4 JSON: {{}}", serde_json::to_string(&event4).unwrap());
    // Output: Event4 JSON: "AppShutdown"

    let json_input_event2 = r#"{
        "OrderPlaced": {{
            "order_id": 200,
            "user_id": 5,
            "total": 150.50
        }}
    }"#;

    let parsed_event: Result<Event> = serde_json::from_str(json_input_event2);
     match parsed_event {{
        Ok(evt) => println!("Parsed Event: {{:#?}}", evt),
        Err(err) => eprintln!("Error parsing event: {{}}", err),
    }}
}}`}
            </code>
          </pre>
        </div>
        <p>
          This tagged representation makes it easy to determine the variant and access its data in other languages. Serde provides attributes to customize enum serialization if the default isn't suitable.
        </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-orange-500" />
          Customizing Serialization with Attributes
        </h2>
        <p>
          Serde's power is greatly enhanced by its attributes (<code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">#[serde(...)]</code>) which allow fine-grained control over how structs and enums are serialized and deserialized. These attributes are placed on the struct/enum itself or its fields/variants.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example: Renaming and Skipping Fields</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code className="language-rust">
{`use serde::{{Serialize, Deserialize}};

#[derive(Serialize, Deserialize, Debug)]
struct Product {{
    // Use 'product_id' in Rust, but 'id' in JSON
    #[serde(rename = "id")]
    product_id: String,

    name: String,

    // Skip this field during both serialization and deserialization
    #[serde(skip)]
    internal_notes: Option<String>,

    // Optional price, defaults to 0.0 if missing during deserialization
    #[serde(default)]
    price: f64,

    // If this field is None, omit it from JSON (default behavior for Option, explicit here)
    #[serde(skip_serializing_if = "Option::is_none")]
    description: Option<String>,
}}

// A custom default function for 'price' if not using #[serde(default)]
// fn default_price() -> f64 {{ 0.0 }}
// #[serde(default = "default_price")]

fn main() {{
    let product1 = Product {{
        product_id: "p-123".to_string(),
        name: "Laptop".to_string(),
        internal_notes: Some("High-margin item".to_string()),
        price: 1200.50,
        description: Some("Powerful and lightweight laptop".to_string()),
    }};

    println!("Product1 JSON: {{}}", serde_json::to_string_pretty(&product1).unwrap());
    // Output shows "id", skips "internal_notes", includes "price" and "description"

    let product2_json = r#"{
        "id": "p-456",
        "name": "Mouse"
        // price defaults to 0.0, description defaults to None because it's Option
        // internal_notes is ignored
    }"#;

    let product2: Result<Product> = serde_json::from_str(product2_json);

    match product2 {{
        Ok(prod) => println!("Parsed Product2: {{:#?}}", prod),
        Err(err) => eprintln!("Error parsing product2: {{}}", err),
    }}
}}`}
            </code>
          </pre>
        </div>
        <p>
          Key attributes shown:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
            <li><code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">#[serde(rename = "name")]</code>: Changes the key name in the serialized output and expects this key during deserialization. Useful for matching JSON conventions (like camelCase) or external APIs.</li>
            <li><code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">#[serde(skip)]</code>: Ignores the field entirely for both serialization and deserialization. The field must have a default value (like <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Option::None</code>, or implement <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Default</code> or provide a <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">default</code> attribute).</li>
            <li><code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">#[serde(default)]</code>: Provides a default value for a field if it's missing during deserialization. Requires the field's type to implement the <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Default</code> trait, or you can provide a function path.</li>
            <li><code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">#[serde(skip_serializing_if = "path_to_function")]</code>: Omits the field from the JSON output if the specified function returns true for the field's value. Commonly used with <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Option::is_none</code>.</li>
        </ul>
        <p>
           There are many other attributes for advanced customization, including handling unknown fields, flattening structures, custom serialization logic, and more.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
            <Bug className="w-6 h-6 mr-2 text-red-500" />
            Error Handling
        </h2>
        <p>
            Both <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde_json::to_string</code> and <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde_json::from_str</code> return a <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Result&lt;T, E&gt;</code> type, where <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">E</code> is <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde_json::Error</code>. This error type is comprehensive, providing details about what went wrong (e.g., unexpected token, missing field, type mismatch) and often the byte offset in the input string where the error occurred.
        </p>
        <p>
            Proper error handling involves pattern matching on the <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">Result</code>, as shown in the examples above. This aligns with Rust's philosophy of forcing explicit error handling, leading to more robust code.
        </p>

         <h2 className="text-2xl font-semibold mt-8 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-yellow-500" />
            Performance Considerations
        </h2>
        <p>
           Serde is renowned for its high performance. It achieves this through:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Static Dispatch:</strong> Most of Serde's work is done at compile time using Rust's powerful type system and generics.</li>
            <li><strong>Zero-Copy Deserialization (Optional):</strong> For some formats and data structures, Serde can deserialize data without copying it, directly referencing the input buffer. While <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde_json</code> doesn't fully support zero-copy for arbitrary JSON (due to JSON's structure requiring parsing and validation), it is still highly optimized.</li>
            <li><strong>Minimal Overhead:</strong> Compared to reflection-based serialization frameworks in other languages, Serde generates highly efficient code tailored to your specific data structures.</li>
        </ul>
        <p>
            While <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde_json</code> is excellent, Serde's flexibility means you can easily swap out the format crate for binary formats like <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">bincode</code> or <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">prost</code> (for Protobuf) if serialization performance or payload size becomes critical, without changing your data structure definitions.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          Conclusion
        </h2>
        <p>
          Rust's approach to JSON serialization and deserialization using the <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde</code> ecosystem is powerful, flexible, and performant. By leveraging derive macros, traits, and attributes, developers can easily convert complex Rust data structures to and from JSON with minimal boilerplate while maintaining Rust's core benefits of type safety and speed. Whether you're building APIs, working with configuration files, or handling data interchange, Serde with <code className="font-mono text-sm bg-gray-100 p-1 rounded dark:bg-gray-800">serde_json</code> is the idiomatic and highly recommended solution in Rust.
        </p>
      </div>
    </>
  );
}

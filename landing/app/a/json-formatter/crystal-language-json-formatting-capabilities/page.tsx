import type { Metadata } from "next";
import {
  FileJson,
  ArrowRightFromLine,
  ArrowLeftFromLine,
  Box,
  Boxes,
  Settings,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Crystal Language JSON Formatting Capabilities | Offline Tools",
  description:
    "Explore the powerful built-in JSON formatting and parsing capabilities of the Crystal programming language, including serialization, deserialization, and using JSON.mapping.",
};

export default function CrystalJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="w-8 h-8 mr-3" />
        Crystal Language JSON Formatting Capabilities
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is a lightweight data interchange
          format that is easy for humans to read and write and easy for machines
          to parse and generate. It has become a ubiquitous standard for data
          transmission across networks, configuration files, and more.
        </p>
        <p>
          The Crystal programming language, known for its Ruby-like syntax and
          C-like performance, provides robust built-in support for working with
          JSON through its standard library. This page explores how to effectively
          serialize (encode) Crystal data structures into JSON strings and
          deserialize (decode) JSON strings back into Crystal objects.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="w-6 h-6 mr-2" /> The Built-in `JSON` Module
        </h2>
        <p>
          Crystal's standard library includes the `JSON` module, which provides
          all the necessary tools for encoding and decoding JSON data. You don't
          need any external shards (libraries) for basic JSON operations.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Importing the module:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900">
            <code>require "json"</code>
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ArrowRightFromLine className="w-6 h-6 mr-2" /> Serialization: Crystal Objects to JSON
        </h2>
        <p>
          Converting a Crystal object or basic data structure into a JSON string
          is called serialization or encoding. Crystal makes this straightforward,
          especially for built-in types like `String`, `Int`, `Float`, `Bool`,
          `Array`, `Hash`, and `Nil`.
        </p>

        <h3 className="text-xl font-semibold mt-6">Basic Types:</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`require "json"

# String
puts "hello".to_json    # => "\"hello\""

# Number
puts 123.to_json      # => "123"
puts 4.5.to_json      # => "4.5"

# Boolean
puts true.to_json     # => "true"
puts false.to_json    # => "false"

# Nil
puts nil.to_json      # => "null"

# Array
puts [1, "two", true].to_json # => "[1,\"two\",true]"

# Hash
puts {"a" => 1, "b" => false}.to_json # => "{\"a\":1,\"b\":false}"`}
            </code>
          </pre>
        </div>
        <p>
          By default, calling `.to_json` on supported objects performs the
          serialization. For complex, custom types (structs or classes), you
          typically need to define how they should be serialized. The easiest way
          to do this is using the `JSON.mapping` macro.
        </p>

        <h3 className="text-xl font-semibold mt-6">Pretty Printing:</h3>
        <p>
          For readability, especially in configuration files or debugging output,
          you can generate "pretty" JSON with indentation.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`require "json"

data = {"name" => "Alice", "age" => 30, "isStudent" => false}

# Default compact output
puts data.to_json
# => "{\"name\":\"Alice\",\"age\":30,\"isStudent\":false}"

# Pretty printed output
puts data.to_json(pretty: true)
# => {
#      "name": "Alice",
#      "age": 30,
#      "isStudent": false
#    }`}
            </code>
          </pre>
        </div>
        <p>
          You can also control the indentation string (defaults to two spaces)
          using the `indent` option with `pretty: true`.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ArrowLeftFromLine className="w-6 h-6 mr-2" /> Deserialization: JSON to Crystal Data
        </h2>
        <p>
          Converting a JSON string into a Crystal object or data structure is
          called deserialization or decoding. Crystal provides the `JSON.parse`
          method for this.
        </p>

        <h3 className="text-xl font-semibold mt-6">Using `JSON.parse`:</h3>
        <p>
          `JSON.parse` takes a JSON string (or an `IO` object) and returns a
          tree of `JSON::Any` objects. `JSON::Any` is a union type that can hold
          any valid JSON value (string, number, boolean, null, array, or object).
          You typically need to perform type checks or cast to access the actual
          values.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`require "json"

json_string = %q({"name": "Bob", "age": 25, "city": null, "scores": [80, 95]})

# Parse the JSON string
parsed_data = JSON.parse(json_string)

# parsed_data is a JSON::Any object representing a Hash
puts parsed_data.class # => JSON::Any

# Accessing values (requires casting or type checks)
name = parsed_data["name"].as_s # Cast to String
age = parsed_data["age"].as_i   # Cast to Int
city = parsed_data["city"]      # This is JSON::Any representing null

puts "Name: #{name}"  # => "Name: Bob"
puts "Age: #{age}"    # => "Age: 25"

# Accessing array elements
scores = parsed_data["scores"].as_a # Cast to JSON::Any Array
puts scores.class # => Array(JSON::Any)
puts scores[0].as_i # => 80
puts scores[1].as_i # => 95

# Checking for null
if city.nil?
  puts "City is null" # => "City is null"
end`}
            </code>
          </pre>
        </div>
        <p>
          While `JSON.parse` is flexible, working with `JSON::Any` can be verbose
          due to the need for casting (`.as_s`, `.as_i`, `.as_a`, `.as_h`) and
          type checks. For mapping JSON directly into predefined Crystal structs or
          classes, using `JSON.mapping` is often a cleaner and safer approach.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Box className="w-6 h-6 mr-2" /> Working with Custom Types and `JSON.mapping`
        </h2>
        <p>
          The `JSON.mapping` macro is the idiomatic way in Crystal to define how
          a custom struct or class should be serialized to and deserialized from
          JSON. It automatically defines `to_json` and `from_json` methods for
          the type.
        </p>

        <h3 className="text-xl font-semibold mt-6">Basic `JSON.mapping`:</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`require "json"

struct Person
  JSON.mapping({
    name: String,
    age: Int32,
    is_student: Bool
  })
end

# Serialization
person = Person.new("Alice", 30, false)
puts person.to_json
# => "{\"name\":\"Alice\",\"age\":30,\"is_student\":false}"

# Deserialization
json_string = %q({"name": "Bob", "age": 25, "is_student": true})
bob = Person.from_json(json_string)

puts bob.name      # => "Bob"
puts bob.age       # => 25
puts bob.is_student # => true`}
            </code>
          </pre>
        </div>
        <p>
          In this example, `JSON.mapping` takes a hash where keys are the field
          names in the Crystal struct/class and values are their types. The
          macro generates the necessary code to map JSON fields with matching keys
          to these fields.
        </p>

        <h3 className="text-xl font-semibold mt-6">Mapping Different Names:</h3>
        <p>
          If the JSON field name is different from the Crystal field name, you can
          specify the JSON name using the `key:` option.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`require "json"

struct User
  JSON.mapping({
    user_name: {type: String, key: "userName"}, # Crystal field user_name, JSON key userName
    id: Int32
  })
end

json_string = %q({"userName": "charlie", "id": 42})

user = User.from_json(json_string)
puts user.user_name # => "charlie"
puts user.id        # => 42

# Serialization uses the specified key
puts user.to_json # => "{\"userName\":\"charlie\",\"id\":42}"`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Optional Fields:</h3>
        <p>
          You can mark fields as optional using union types with `Nil` or the
          `?` syntax. If a key is missing in the JSON input, the corresponding
          field in the Crystal object will be `nil`.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`require "json"

struct Product
  JSON.mapping({
    name: String,
    price: Float64,
    description: String? # This field is optional in JSON
  })
end

json_with_desc = %q({"name": "Gadget", "price": 99.99, "description": "Cool gadget!"})
json_without_desc = %q({"name": "Widget", "price": 10.00})

gadget = Product.from_json(json_with_desc)
widget = Product.from_json(json_without_desc)

puts gadget.description # => "Cool gadget!"
puts widget.description # => nil`}
            </code>
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Boxes className="w-6 h-6 mr-2" /> Handling Nested Structures
        </h2>
        <p>
          `JSON.mapping` automatically handles nested structures (objects and
          arrays) as long as the types within them also have `JSON.mapping`
          defined (or are basic types).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`require "json"

struct Address
  JSON.mapping({
    street: String,
    city: String,
    zip_code: String
  })
end

struct Customer
  JSON.mapping({
    id: Int32,
    name: String,
    address: Address # Nested struct
  })
end

json_string = %q({
  "id": 101,
  "name": "Charlie",
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "zip_code": "12345"
  }
})

customer = Customer.from_json(json_string)

puts customer.id            # => 101
puts customer.name          # => "Charlie"
puts customer.address.city  # => "Anytown"

# Serialization also works with nested structures
puts customer.to_json(pretty: true)
# => {
#      "id": 101,
#      "name": "Charlie",
#      "address": {
#        "street": "123 Main St",
#        "city": "Anytown",
#        "zip_code": "12345"
#      }
#    }`}
            </code>
          </pre>
        </div>
        <p>
          This demonstrates how `JSON.mapping` simplifies handling complex JSON
          structures by mapping them directly to your Crystal type hierarchy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="w-6 h-6 mr-2" /> Configuration and Output Options
        </h2>
        <p>
          As seen with pretty printing, the `to_json` method accepts options. The
          most common is `pretty: true`. Other options relate to how specific
          types are handled during serialization, although the defaults are often
          suitable.
        </p>
        <p>
          When deserializing, `JSON.parse` also has options, such as `strict: true`
          which enforces strict adherence to the JSON specification (e.g., disallowing
          trailing commas). By default, it's slightly more lenient. `from_json`
          inherits these options.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2" /> Error Handling
        </h2>
        <p>
          Parsing JSON can fail if the input string is not valid JSON. The `JSON`
          module raises a `JSON::ParseError` in such cases. It's important to
          handle this potential error in your code.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="bg-white p-3 rounded dark:bg-gray-900">
            <code>
              {`require "json"

invalid_json = %q({"name": "invalid", "age": 30,}) # Trailing comma

begin
  JSON.parse(invalid_json)
rescue JSON::ParseError => e
  puts "Error parsing JSON: #{e.message}"
  # => Error parsing JSON: unexpected token at ',' in {"name": "invalid", "age": 30,}
end

# When using from_json, the parse error is also raised
struct ErrorProne
  JSON.mapping({ value: Int32 })
end

invalid_json_for_type = %q({"value": "not a number"}) # Wrong type

begin
  ErrorProne.from_json(invalid_json_for_type)
rescue JSON::ParseError => e
  puts "Error mapping JSON: #{e.message}"
  # This might show a type-specific error message from the mapping process
end`}
            </code>
          </pre>
        </div>
        <p>
          When using `JSON.mapping` and the JSON contains missing non-optional
          keys or values of the wrong type, `JSON::ParseError` (or a related
          error) will also be raised during the `from_json` call, indicating
          a mismatch between the JSON structure/types and your defined mapping.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Crystal provides excellent built-in capabilities for working with JSON.
          The standard `JSON` module handles basic types seamlessly, while the
          powerful `JSON.mapping` macro significantly simplifies the process of
          serializing and deserializing custom structs and classes, including
          nested structures and optional fields. By understanding these features
          and incorporating proper error handling, developers can efficiently work
          with JSON data in their Crystal applications.
        </p>
      </div>
    </>
  );
}

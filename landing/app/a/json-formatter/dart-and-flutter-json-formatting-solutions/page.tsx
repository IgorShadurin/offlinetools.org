import type { Metadata } from "next";
import { Code, Settings, Zap, BookOpen, Info, CheckCircle, MinusCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Dart and Flutter JSON Formatting Solutions | Offline Tools",
  description:
    "Explore different approaches to handling JSON data in Dart and Flutter, from manual parsing to automated code generation.",
};

export default function DartFlutterJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Code className="w-8 h-8" /> Dart and Flutter JSON Formatting Solutions
      </h1>

      <div className="space-y-6">
        <p>
          Handling JSON (JavaScript Object Notation) data is a fundamental task in modern application
          development, especially when working with APIs, configuration files, or local storage. In Dart
          and Flutter, you'll frequently encounter JSON. Efficiently and correctly converting JSON strings
          into Dart objects (deserialization) and Dart objects back into JSON strings (serialization) is crucial
          for performance, maintainability, and type safety.
        </p>
        <p>
          This page explores the common strategies available in the Dart ecosystem for tackling JSON, suitable
          for developers of varying experience levels.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Zap className="w-6 h-6" /> Why Handle JSON in Flutter?
        </h2>
        <p>
          Flutter apps often need to interact with external data sources or persist data locally. JSON's
          lightweight format and widespread adoption make it the standard choice for:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Consuming REST APIs.</li>
          <li>Working with GraphQL APIs.</li>
          <li>Reading and writing data to local storage solutions like SharedPreferences or databases.</li>
          <li>Handling configuration files.</li>
          <li>Interacting with platform-specific code via platform channels.</li>
        </ul>
        <p>
          While Dart provides built-in tools for basic JSON handling, managing complex or deeply nested
          JSON structures requires more robust solutions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BookOpen className="w-6 h-6" /> Approach 1: Manual Parsing with <code>dart:convert</code>
        </h2>
        <p>
          Dart's core library <code>dart:convert</code> provides basic functions for encoding and decoding JSON.
          The primary functions are <code>jsonDecode</code> (for parsing JSON strings) and <code>jsonEncode</code>
          (for converting Dart objects to JSON strings).
        </p>
        <p>
          When you use <code>jsonDecode</code>, it returns a standard Dart type: a <code>Map&lt;String, dynamic&gt;</code>
          for JSON objects, a <code>List&lt;dynamic&gt;</code> for JSON arrays, or primitive types (<code>String</code>,
          <code>int</code>, <code>double</code>, <code>bool</code>, <code>null</code>).
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Dart Model:</h3>
        <p>
          Let's define a simple <code>User</code> class that we want to serialize and deserialize.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`class User &#x7b;
  final String name;
  final int age;
  final List<String> skills;

  User(&#x7b;required this.name, required this.age, required this.skills&#x7d;);
&#x7d;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Manual Parsing and Serialization:</h3>
        <p>
          To handle JSON manually, you add factory constructors for deserialization and methods for serialization
          to your model classes.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import 'dart:convert';

class User &#x7b;
  final String name;
  final int age;
  final List<String> skills;

  User(&#x7b;required this.name, required this.age, required this.skills&#x7d;);

  // Deserialization (JSON string -> Dart object)
  factory User.fromJson(Map<String, dynamic> json) &#x7b;
    return User(
      name: json['name'] as String,
      age: json['age'] as int,
      // Need to cast list elements if necessary
      skills: List<String>.from(json['skills'] as List),
    );
  &#x7d;

  // Serialization (Dart object -> JSON Map)
  Map<String, dynamic> toJson() &#x7b;
    return &#x7b;
      'name': name,
      'age': age,
      'skills': skills,
    &#x7d;;
  &#x7d;
&#x7d;

// --- Usage Example ---

void main() &#x7b;
  final jsonString = '&#x7b;"name": "Alice", "age": 30, "skills": ["Dart", "Flutter", "JSON"]&#x7d;';

  // Deserialization
  try &#x7b;
    final jsonMap = jsonDecode(jsonString) as Map<String, dynamic>;
    final user = User.fromJson(jsonMap);
    print('Deserialized User: &#x24;&#x7b;user.name&#x7d;, &#x24;&#x7b;user.age&#x7d;, &#x24;&#x7b;user.skills&#x7d;');
  &#x7d; catch (e) &#x7b;
    print('Error deserializing JSON: &#x24;e');
  &#x7d;


  // Serialization
  final newUser = User(name: "Bob", age: 25, skills: ["Python", "Django"]);
  final newUserJsonMap = newUser.toJson();
  final newUserJsonString = jsonEncode(newUserJsonMap);
  print('Serialized User: &#x24;newUserJsonString');

  // Handling lists of objects
  final jsonListString = '''
  [
    &#x7b;"name": "Alice", "age": 30, "skills": ["Dart"]&#x7d;,
    &#x7b;"name": "Bob", "age": 25, "skills": ["Python"]&#x7d;
  ]
  ''';

  try &#x7b;
    final jsonList = jsonDecode(jsonListString) as List<dynamic>;
    final userList = jsonList.map((item) => User.fromJson(item as Map<String, dynamic>)).toList();
    print('Deserialized List:');
    userList.forEach((user) => print('- &#x24;&#x7b;user.name&#x7d;'));
  &#x7d; catch (e) &#x7b;
     print('Error deserializing JSON list: &#x24;e');
  &#x7d;
&#x7d;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Pros and Cons of Manual Parsing:</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <span className="font-semibold">Pros:</span>
              <ul className="list-disc pl-6 mt-1">
                <li>No external dependencies needed beyond <code>dart:convert</code>.</li>
                <li>Full control over the mapping process.</li>
                <li>Suitable for simple JSON structures or when you only need to access a few fields.</li>
                <li>Easy to implement for small projects or quick tasks.</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MinusCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <span className="font-semibold">Cons:</span>
              <ul className="list-disc pl-6 mt-1">
                <li><span className="font-medium">Verbose and repetitive:</span> Writing boilerplate code for each model class.</li>
                <li><span className="font-medium">Error-prone:</span> Easy to make typos with string keys (<code>json['name']</code>), leading to runtime errors.</li>
                <li><span className="font-medium">Hard to maintain:</span> Changes in the JSON structure require manual updates across all related models.</li>
                <li>Requires careful type casting (e.g., <code>json['age'] as int</code>, <code>List&lt;String&gt;.from(...)</code>).</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6" /> Approach 2: Automated Code Generation with <code>json_serializable</code>
        </h2>
        <p>
          For applications dealing with many JSON models or complex structures, writing manual parsing code
          becomes impractical. The <code>json_serializable</code> package, combined with <code>build_runner</code>,
          provides a powerful code generation solution.
        </p>
        <p>
          You define your Dart model classes using standard syntax and add annotations from <code>json_annotation</code>.
          Then, you run a build command, and <code>build_runner</code> executes <code>json_serializable</code> to
          generate the necessary <code>fromJson</code> factory and <code>toJson</code> method automatically in a
          separate <code>.g.dart</code> file.
        </p>

        <h3 className="text-xl font-semibold mt-6">Setup:</h3>
        <p>
          Add the required dependencies to your <code>pubspec.yaml</code>:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`dependencies:
  flutter:
    sdk: flutter
  json_annotation: ^4.0.0 # Use the latest version

dev_dependencies:
  flutter_test:
    sdk: flutter
  build_runner: ^2.0.0    # Use the latest version
  json_serializable: ^4.0.0 # Use the latest version`}
            </pre>
          </div>
        </div>
        <p>
          Run <code>flutter pub get</code> or <code>dart pub get</code> to fetch the packages.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Dart Model with Annotations:</h3>
        <p>
          Here's the same <code>User</code> class, but prepared for code generation.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import 'package:json_annotation/json_annotation.dart';

// This allows the generated code to access the private members.
// The naming convention is YOUR_FILE_NAME.g.dart
part 'user.g.dart'; // Replace 'user' with your file name

@JsonSerializable() // This is the annotation that triggers code generation
class User &#x7b;
  final String name;
  final int age;
  final List<String> skills;

  User(&#x7b;required this.name, required this.age, required this.skills&#x7d;);

  // Add the factory constructor that will delegate to the generated code
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

  // Add the method that will delegate to the generated code
  Map<String, dynamic> toJson() => _$UserToJson(this);
&#x7d;`}
            </pre>
          </div>
        </div>
        <p>
          <Info className="inline w-5 h-5 mr-1 text-blue-500" />
          Notice the <code>part 'user.g.dart';</code> directive and the <code>@JsonSerializable()</code> annotation.
          The factory constructor <code>User.fromJson</code> and method <code>toJson</code> are now
          delegating to functions (<code>_$UserFromJson</code>, <code>_$UserToJson</code>) that will be
          generated in the <code>user.g.dart</code> file.
        </p>

        <h3 className="text-xl font-semibold mt-6">Running the Code Generator:</h3>
        <p>
          In your project's root directory, run the build command:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`# For a single run:
flutter pub run build_runner build

# For continuous generation during development:
flutter pub run build_runner watch`}
            </pre>
          </div>
        </div>
        <p>
          This command will analyze your project, find the <code>@JsonSerializable()</code> annotations,
          and generate the <code>.g.dart</code> files (e.g., <code>lib/user.g.dart</code>). You should
          never manually edit these generated files.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Usage with Generated Code:</h3>
        <p>
          Once the <code>.g.dart</code> file is generated and you've imported your model, the usage is
          similar to the manual approach, but you call the generated functions via your model's
          factory constructor and method.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assuming 'user.dart' contains the User class and 'user.g.dart' was generated
import 'dart:convert';
import 'user.dart'; // Import your model file

void main() &#x7b;
  final jsonString = '&#x7b;"name": "Alice", "age": 30, "skills": ["Dart", "Flutter", "JSON"]&#x7d;';

  // Deserialization uses the generated fromJson factory
  try &#x7b;
    final jsonMap = jsonDecode(jsonString) as Map<String, dynamic>;
    final user = User.fromJson(jsonMap); // Calls the generated _$UserFromJson
    print('Deserialized User: &#x24;&#x7b;user.name&#x7d;, &#x24;&#x7b;user.age&#x7d;, &#x24;&#x7b;user.skills&#x7d;');
  &#x7d; catch (e) &#x7b;
     print('Error deserializing JSON: &#x24;e');
  &#x7d;


  // Serialization uses the generated toJson method
  final newUser = User(name: "Bob", age: 25, skills: ["Python", "Django"]);
  final newUserJsonMap = newUser.toJson(); // Calls the generated _$UserToJson
  final newUserJsonString = jsonEncode(newUserJsonMap);
  print('Serialized User: &#x24;newUserJsonString');

  // Handling lists of objects with code generation
  final jsonListString = '''
  [
    &#x7b;"name": "Alice", "age": 30, "skills": ["Dart"]&#x7d;,
    &#x7b;"name": "Bob", "age": 25, "skills": ["Python"]&#x7d;
  ]
  ''';

  try &#x7b;
    final jsonList = jsonDecode(jsonListString) as List<dynamic>;
    // Map each item using the generated fromJson factory
    final userList = jsonList.map((item) => User.fromJson(item as Map<String, dynamic>)).toList();
    print('Deserialized List:');
    userList.forEach((user) => print('- &#x24;&#x7b;user.name&#x7d;'));
  &#x7d; catch (e) &#x7b;
    print('Error deserializing JSON list: &#x24;e');
  &#x7d;
&#x7d;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Customizations with <code>json_serializable</code>:</h3>
        <p>
          <code>json_serializable</code> offers various annotations to handle complex cases, such as:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><code>@JsonKey(name: 'api_key')</code>: Map a JSON key with a different name to a Dart field.</li>
          <li><code>@JsonKey(defaultValue: 'N/A')</code>: Provide a default value if a JSON key is missing.</li>
          <li><code>@JsonKey(required: true)</code>: Mark a field as required during deserialization.</li>
          <li><code>@JsonKey(ignore: true)</code>: Ignore a field during serialization/deserialization.</li>
          <li><code>@JsonSerializable(explicitToJson: true)</code>: Ensure nested objects also call their <code>toJson()</code> methods (useful for complex nested structures).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Pros and Cons of Code Generation:</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <span className="font-semibold">Pros:</span>
              <ul className="list-disc pl-6 mt-1">
                <li><span className="font-medium">Reduces Boilerplate:</span> Significantly less manual code for serialization/deserialization.</li>
                <li><span className="font-medium">Less Error-Prone:</span> Eliminates typos in JSON keys, as the mapping is generated based on your Dart field names (or explicit <code>@JsonKey</code> names).</li>
                <li><span className="font-medium">Maintainability:</span> Easier to update when JSON structures change; often just requires running the build command again after updating the model.</li>
                <li><span className="font-medium">Type Safety:</span> Generates code that handles type conversions safely.</li>
                <li>Handles nested objects and lists automatically.</li>
                <li>Good performance as the code is generated once.</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MinusCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <span className="font-semibold">Cons:</span>
              <ul className="list-disc pl-6 mt-1">
                <li><span className="font-medium">Setup Overhead:</span> Requires adding dependencies and understanding the build runner concept.</li>
                <li><span className="font-medium">Build Time:</span> Running the build command adds a step to your workflow, although <code>watch</code> mode mitigates this during development.</li>
                <li>Can feel like "magic" to beginners until they understand the code generation process.</li>
                <li>May not be necessary for extremely simple, few-field JSON objects used infrequently.</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6" /> Choosing the Right Approach
        </h2>
        <p>
          The best approach depends on the scale and complexity of your project:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Manual Parsing:</strong> Use for very small projects, simple single-use scripts, or when
            dealing with extremely simple JSON structures where creating a full model class feels
            like overkill. It's also useful for understanding the underlying mechanics.
          </li>
          <li>
            <strong>Code Generation (<code>json_serializable</code>):</strong> This is the recommended approach
            for most Flutter applications, especially those interacting with APIs or handling
            multiple data models. It significantly reduces boilerplate, improves maintainability,
            and is less prone to runtime errors from mistyped keys. The initial setup pays off
            quickly in larger projects.
          </li>
        </ul>
        <p>
          For team environments or projects expected to grow, adopting code generation early is generally
          a wise decision.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BookOpen className="w-6 h-6" /> Best Practices
        </h2>

        <h3 className="text-xl font-semibold mt-6">Error Handling:</h3>
        <p>
          JSON parsing can fail if the input string is malformed or if expected keys are missing.
          Always wrap your <code>jsonDecode</code> calls and model deserialization (<code>.fromJson</code>)
          in <code>try-catch</code> blocks to gracefully handle potential parsing errors.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`try &#x7b;
  final jsonMap = jsonDecode(jsonString) as Map<String, dynamic>;
  final user = User.fromJson(jsonMap);
  // Use the 'user' object
&#x7d; catch (e) &#x7b;
  // Log the error, show a user-friendly message, etc.
  print('Failed to parse JSON: &#x24;e');
&#x7d;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Immutability:</h3>
        <p>
          Using <code>final</code> fields for your model properties (as shown in the examples) is
          a common practice in Dart. This promotes immutability, making your objects easier to reason about
          and preventing unintended side effects.
        </p>

        <h3 className="text-xl font-semibold mt-6">Testing:</h3>
        <p>
          Write unit tests for your JSON serialization and deserialization logic. This is especially important
          for manual parsing but also valuable for verifying that your <code>@JsonKey</code> customizations
          in code generation are working correctly. Test both successful cases and edge cases (missing fields,
          null values, incorrect types).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> Other Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>JSON naming conventions:</strong> JSON keys often use <code>snake_case</code> (e.g., <code>user_name</code>), while Dart properties use <code>camelCase</code> (e.g., <code>userName</code>). <code>json_serializable</code> handles this automatically by default or can be customized with <code>@JsonKey(name: '...')</code>.
          </li>
          <li>
            <strong>Nested Structures:</strong> Both manual parsing and code generation can handle nested objects and arrays. With manual parsing, you recursively call the <code>.fromJson</code> factory for nested types. With <code>json_serializable</code>, you simply annotate the nested class with <code>@JsonSerializable()</code> as well, and the generator handles the rest (ensure <code>explicitToJson: true</code> if you need to serialize nested objects).
          </li>
          <li>
            <strong>JSON-like data:</strong> Sometimes you receive data that isn't strictly JSON but is Map/List based. <code>dart:convert</code> works directly with these Map/List structures too, allowing you to bypass <code>jsonDecode</code> if the data is already in that format.
          </li>
        </ul>


        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BookOpen className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          Dart and Flutter provide flexible options for handling JSON. While manual parsing with <code>dart:convert</code>
          is suitable for simple cases and educational purposes, the automated code generation approach
          using <code>json_serializable</code> and <code>build_runner</code> is the industry standard for
          most real-world Flutter applications. It dramatically improves developer productivity, reduces
          errors, and enhances maintainability when dealing with numerous or complex data models.
          Understanding both methods equips you to choose the most appropriate solution for your specific needs.
        </p>
      </div>
    </>
  );
}
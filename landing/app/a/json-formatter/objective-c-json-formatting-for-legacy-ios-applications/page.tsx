import type { Metadata } from "next";
import { FileJson, Code, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Objective-C JSON Formatting for Legacy iOS Applications",
  description:
    "A guide to handling JSON serialization and deserialization using NSJSONSerialization in legacy Objective-C iOS projects.",
};

export default function ObjectiveCJsonFormattingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <FileJson size={36} />
        <span>Objective-C JSON Formatting for Legacy iOS Applications</span>
      </h1>

      <div className="space-y-6">
        <p>
          Maintaining legacy iOS applications written in Objective-C often requires working with JSON data. While modern
          Swift applications leverage powerful, Swifty APIs like <code>Codable</code>, older codebases typically rely on
          the foundational{" "}
          <a
            href="https://developer.apple.com/documentation/foundation/nsjsonserialization"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            <code>NSJSONSerialization</code>
          </a>{" "}
          class from the Foundation framework. Understanding how to effectively use <code>NSJSONSerialization</code> for
          both formatting (serializing) and parsing (deserializing) JSON is crucial for adding features, fixing bugs, or
          integrating with new APIs in these projects.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code size={28} />
          <span>
            Why <code>NSJSONSerialization</code>?
          </span>
        </h2>
        <p>
          <code>NSJSONSerialization</code> is the built-in, native Objective-C class provided by Apple for handling
          JSON. It's available in iOS, macOS, tvOS, and watchOS, and is the standard way to interact with JSON using
          Foundation objects (<code>NSDictionary</code>, <code>NSArray</code>, <code>NSString</code>,{" "}
          <code>NSNumber</code>, <code>NSNull</code>) in Objective-C. For legacy projects, it's already there, stable,
          and doesn't require adding external dependencies.
        </p>
        <p>It acts as a bridge between standard Objective-C collection types and JSON data.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ArrowRight size={28} />
          <span>JSON Serialization (Objective-C Object to JSON Data)</span>
        </h2>
        <p>
          When you need to send data from your Objective-C application to a server or save it as a JSON file, you'll
          serialize an Objective-C object (typically an <code>NSDictionary</code> or <code>NSArray</code>) into an{" "}
          <code>NSData</code> object containing the JSON bytes.
        </p>
        <p>
          The primary method for this is <code>+dataWithJSONObject:options:error:</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-3">Basic Serialization Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Assume 'userData' is an NSDictionary or NSArray you want to serialize
NSDictionary *userData = @{
    @"name": @"Alice",
    @"age": @(30), // Use NSNumber for numbers
    @"isStudent": @(NO), // Use NSNumber for booleans
    @"courses": @[@"Math", @"Science", @"History"],
    @"address": @{
        @"street": @"123 Main St",
        @"city": @"Anytown"
    },
    @"metadata": [NSNull null] // Use [NSNull null] for JSON null
};

NSError *error = nil;
NSData *jsonData = [NSJSONSerialization dataWithJSONObject:userData
                                             options:NSJSONWritingPrettyPrinted // Options for formatting (optional)
                                               error:&error];

if (!jsonData) {
    NSLog(@"Error serializing JSON: %@", error);
} else {
    // jsonData now contains the JSON data bytes
    // You can convert it to a NSString for logging or display if needed
    NSString *jsonString = [[NSString alloc] initWithData:jsonData
                                                encoding:NSUTF8StringEncoding];
    NSLog(@"Serialized JSON:\n%@", jsonString);
}`}
            </pre>
          </div>
        </div>

        <h4 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <CheckCircle size={20} />
          <span>Key Points for Serialization:</span>
        </h4>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            The root object passed to <code>dataWithJSONObject:</code> must be an <code>NSDictionary</code> or{" "}
            <code>NSArray</code>.
          </li>
          <li>
            All objects within the dictionary/array must be instances of <code>NSString</code>, <code>NSNumber</code>,{" "}
            <code>NSArray</code>, <code>NSDictionary</code>, or <code>[NSNull null]</code>. Custom objects must be
            converted to these types first.
          </li>
          <li>
            <code>NSNumber</code> should be used for all numbers (integers, floats, booleans).
          </li>
          <li>
            <code>[NSNull null]</code> is the Objective-C representation of the JSON <code>null</code> value. Do not use
            standard C <code>NULL</code> or Swift <code>nil</code>.
          </li>
          <li>
            The <code>options</code> parameter allows control over the output format.{" "}
            <code>NSJSONWritingPrettyPrinted</code> makes the output human-readable with indentation and line breaks.
            For sending over a network, you typically use <code>0</code> for the most compact format.
          </li>
          <li>
            The <code>error</code> parameter will be populated if serialization fails (e.g., due to unsupported object
            types). Always check the error!
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ArrowRight size={28} />
          <span>JSON Deserialization (JSON Data to Objective-C Object)</span>
        </h2>
        <p>
          When you receive JSON data (e.g., from an API response) and need to access its content in your Objective-C
          code, you'll deserialize the <code>NSData</code> into an Objective-C object (an <code>NSDictionary</code> or{" "}
          <code>NSArray</code>).
        </p>
        <p>
          The primary method for this is <code>+JSONObjectWithData:options:error:</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-3">Basic Deserialization Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Assume 'jsonData' is an NSData object containing JSON bytes
NSString *jsonString = @"{\"name\":\"Bob\",\"age\":25,\"isStudent\":true,\"grades\":[95,88,92]}";
NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];

NSError *error = nil;
id jsonObject = [NSJSONSerialization JSONObjectWithData:jsonData
                                                options:NSJSONReadingAllowFragments // Options (optional)
                                                  error:&error];

if (!jsonObject) {
    NSLog(@"Error deserializing JSON: %@", error);
} else {
    // jsonObject is either an NSDictionary or NSArray
    if ([jsonObject isKindOfClass:[NSDictionary class]]) {
        NSDictionary *userDict = (NSDictionary *)jsonObject;
        NSLog(@"Deserialized Dictionary: %@", userDict);

        // Accessing values
        NSString *name = userDict[@"name"];
        NSNumber *age = userDict[@"age"];
        NSArray *grades = userDict[@"grades"];

        NSLog(@"Name: %@, Age: %@, Grades: %@", name, age, grades);

    } else if ([jsonObject isKindOfClass:[NSArray class]]) {
        NSArray *userArray = (NSArray *)jsonObject;
        NSLog(@"Deserialized Array: %@", userArray);
    } else {
         // Should not happen for valid JSON, but good practice
         NSLog(@"Deserialized object is not a dictionary or array.");
    }
}`}
            </pre>
          </div>
        </div>

        <h4 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <CheckCircle size={20} />
          <span>Key Points for Deserialization:</span>
        </h4>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            The method returns an <code>id</code>, which will be either an <code>NSDictionary</code> or{" "}
            <code>NSArray</code> depending on the top-level JSON structure. You must check its type using{" "}
            <code>isKindOfClass:</code> before casting and accessing its contents.
          </li>
          <li>
            JSON strings become <code>NSString</code>.
          </li>
          <li>
            JSON numbers (integers, floats, booleans) become <code>NSNumber</code>.
          </li>
          <li>
            JSON arrays become <code>NSArray</code>.
          </li>
          <li>
            JSON objects become <code>NSDictionary</code>.
          </li>
          <li>
            JSON <code>null</code> becomes <code>[NSNull null]</code>.
          </li>
          <li>
            The <code>options</code> parameter influences how the data is read. <code>NSJSONReadingAllowFragments</code>{" "}
            is useful if the top-level JSON structure is not a dictionary or array (though technically not standard
            JSON). <code>NSJSONReadingMutableContainers</code> or <code>NSJSONReadingMutableLeaves</code> can be used if
            you need mutable dictionaries/arrays/strings directly from the parsing step, but it's often simpler to parse
            into immutable objects and create mutable copies if needed.
          </li>
          <li>
            Again, always check the <code>error</code> parameter for parsing issues.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle size={28} />
          <span>Common Issues and Considerations</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Unsupported Types:</span> Trying to serialize custom objects, dates (
            <code>NSDate</code>), sets (<code>NSSet</code>), or other non-standard Foundation types directly will cause
            an error. These must be converted to JSON-compatible types (like <code>NSString</code>,{" "}
            <code>NSNumber</code>, <code>NSArray</code>, <code>NSDictionary</code>) before serialization.
          </li>
          <li>
            <span className="font-medium">
              <code>NSNull</code> vs. <code>nil</code>:
            </span>{" "}
            This is a frequent source of bugs. JSON <code>null</code> is represented by the singleton instance{" "}
            <code>[NSNull null]</code> in Objective-C. It is NOT <code>nil</code>. When deserializing, check for{" "}
            <code>[NSNull null]</code> if a key might be null; checking for <code>nil</code> will not work for keys that
            exist but have a null value.
          </li>
          <li>
            <span className="font-medium">Error Handling:</span> Always pass an <code>NSError**</code> pointer and check
            its value after calling the serialization or deserialization method. Don't assume the operation will
            succeed.
          </li>
          <li>
            <span className="font-medium">Mutable vs. Immutable:</span> By default, <code>NSJSONSerialization</code>{" "}
            produces immutable objects (<code>NSDictionary</code>, <code>NSArray</code>, <code>NSString</code>,{" "}
            <code>NSNumber</code>). If you need to modify the results directly after parsing, use the{" "}
            <code>NSJSONReadingMutableContainers</code> or <code>NSJSONReadingMutableLeaves</code> options, or create
            mutable copies explicitly (e.g., <code>[mutableDict mutableCopy]</code>).
          </li>
          <li>
            <span className="font-medium">Memory Management:</span> Although most modern legacy projects use ARC
            (Automatic Reference Counting), be mindful of memory if working with very old code or manual memory
            management. Ensure objects are properly retained and released if ARC is not enabled.
          </li>
          <li>
            <span className="font-medium">Root Object Requirement:</span> Standard JSON requires the top level to be
            either an object (<code>{}</code>) or an array (<code>[]</code>). Using{" "}
            <code>NSJSONReadingAllowFragments</code> allows parsing JSON that might just be a string, number, boolean,
            or null at the root, but this is non-standard JSON.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CheckCircle size={28} />
          <span>Tips for Working in Legacy Codebases</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Use Categories:</span> If you find yourself repeatedly writing
            serialization/deserialization logic for specific custom data models, consider creating Objective-C
            Categories on <code>NSDictionary</code> or your model classes to encapsulate this logic. This keeps your
            code cleaner and more organized.
          </li>
          <li>
            <span className="font-medium">Clear Naming:</span> Use descriptive variable names (e.g.,{" "}
            <code>jsonData</code>, <code>jsonDictionary</code>, <code>serializationError</code>) to make the code's
            intent clear.
          </li>
          <li>
            <span className="font-medium">Centralize JSON Handling:</span> For network communication, create helper
            methods or a dedicated class to handle the common pattern of receiving <code>NSData</code>, deserializing
            it, checking for errors, and processing the resulting Objective-C object. This reduces code duplication.
          </li>
          <li>
            <span className="font-medium">Stick to Native Types:</span> Avoid introducing external JSON libraries into
            an old Objective-C project unless absolutely necessary and the benefits (e.g., performance, advanced
            features) significantly outweigh the cost and potential conflicts. <code>NSJSONSerialization</code> is
            usually sufficient.
          </li>
          <li>
            <span className="font-medium">Migration Strategy:</span> If the project is undergoing modernization, plan a
            gradual migration. You might introduce Swift files alongside Objective-C and use bridging headers,
            eventually migrating data models and JSON handling to <code>Codable</code> in Swift for new features.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileJson size={28} />
          <span>Conclusion</span>
        </h2>
        <p>
          Working with JSON in legacy Objective-C applications primarily revolves around{" "}
          <code>NSJSONSerialization</code>. While it requires more manual handling compared to modern Swift{" "}
          <code>Codable</code>, its straightforward API for converting between standard Foundation objects and JSON data
          makes it a reliable tool. By understanding its core methods, options, and common pitfalls like handling{" "}
          <code>NSNull</code> and errors, developers can effectively manage JSON communication and data persistence in
          Objective-C codebases, ensuring continued maintenance and functionality for these valuable legacy systems.
        </p>
      </div>
    </>
  );
}

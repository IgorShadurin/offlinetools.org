import type { Metadata } from "next";
import { Library, Code, Settings, AlertCircle, BookOpen, ArrowLeftRight, Component, Package, GitBranch } from 'lucide-react';

export const metadata: Metadata = {
  title: "Ada Language JSON Libraries and Format Converters | Offline Tools",
  description:
    "Explore the options for working with JSON data in the Ada programming language, including popular libraries and techniques for format conversion.",
};

export default function AdaJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Ada Language JSON Libraries and Format Converters
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) has become a ubiquitous data interchange format across various programming ecosystems. For Ada developers, interacting with web services, configuration files, or external systems often necessitates reading and writing JSON data. While Ada is known for its strong typing and safety features, it also has libraries available to handle the dynamic nature of JSON effectively.
        </p>
        <p>
          This page explores the landscape of JSON processing in Ada, focusing on available libraries and common patterns for parsing JSON into Ada data structures and generating JSON from Ada data.
        </p>

        <h2 className="text-2xl font-semibold mt-8"><Library className="inline-block w-6 h-6 mr-2 text-blue-500" /> Key Ada JSON Libraries</h2>
        <p>
          Several libraries cater to JSON handling in Ada, each with its strengths and target environments. The most prominent ones include:
        </p>

        <h3 className="text-xl font-semibold mt-6"><Package className="inline-block w-5 h-5 mr-2 text-green-600" /> AWA.JSON</h3>
        <p>
          Part of the Ada Web Applications (AWA) framework, <a href="https://docs.getawa.dev/json.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">AWA.JSON</a> is a mature and widely used library. It provides comprehensive capabilities for parsing, generating, and manipulating JSON documents.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Representation:</strong> Uses a tagged type hierarchy (<code>JSON_Value</code>, <code>JSON_Object</code>, <code>JSON_Array</code>, etc.) to represent JSON structures in memory.</li>
          <li><strong>Parsing:</strong> Offers SAX-like (event-based) and DOM-like (in-memory tree) parsing approaches.</li>
          <li><strong>Generating:</strong> Provides procedures to build JSON structures programmatically and render them as strings.</li>
          <li><strong>Integration:</strong> Designed to integrate well within the AWA framework but can be used independently.</li>
          <li><strong>Typing:</strong> Strong emphasis on type safety when extracting values (e.g., `Get_Field_String`, `Get_Field_Integer`).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6"><Package className="inline-block w-5 h-5 mr-2 text-green-600" /> JSON-Ada</h3>
        <p>
          <a href="https://github.com/AdaCore/json-ada" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">JSON-Ada</a> is another popular choice, developed by AdaCore. It offers a simpler API compared to AWA.JSON, focusing on core parsing and generation.
        </p>
        <ul className="list-disc pl-6 space-6 my-4">
          <li><strong>Representation:</strong> Also uses a tagged type (<code>Json_Value</code>) to represent JSON values.</li>
          <li><strong>Parsing:</strong> Primarily provides a DOM-like parsing interface.</li>
          <li><strong>Generating:</strong> Supports building JSON structures and serializing them.</li>
          <li><strong>Simplicity:</strong> Often perceived as having a more straightforward API for basic tasks.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6"><Package className="inline-block w-5 h-5 mr-2 text-green-600" /> Other Options / Standard Ada</h3>
        <p>
          While not standard library features, other community projects might exist. It's worth checking community forums and repositories. Generally, for robust JSON support, relying on established libraries like AWA.JSON or JSON-Ada is recommended.
        </p>

        <h2 className="text-2xl font-semibold mt-8"><Code className="inline-block w-6 h-6 mr-2 text-blue-500" /> Working with JSON: Examples</h2>
        <p>Let's look at simplified examples using a hypothetical library (drawing concepts from AWA.JSON and JSON-Ada) to illustrate common tasks: parsing and generation.</p>

        <h3 className="text-xl font-semibold mt-6">Parsing JSON</h3>
        <p>Converting a JSON string into an in-memory Ada representation.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Ada Example: Parsing a JSON Object</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`with Ada.Text_IO; use Ada.Text_IO;
with Ada.Strings.Unbounded; use Ada.Strings.Unbounded;
with Json_Library.Parser;   -- Hypothetical parser package
with Json_Library.Values;   -- Hypothetical values package
with Json_Library.Elements; -- Hypothetical element access

procedure Parse_Example is
   JSON_Input : Unbounded_String := To_Unbounded_String (
      "{" & ASCII.LF &
      "  ""name"": ""Ada Lovelace""," & ASCII.LF &
      "  ""age"": 201," & ASCII.LF &
      "  ""isStudent"": false," & ASCII.LF &
      "  ""courses"": [""Mathematics"", ""Computer Science""]" & ASCII.LF &
      "}"
   );

   Root_Value : aliased Json_Library.Values.Json_Value_Access; -- Pointer to the parsed value
   Name       : Unbounded_String;
   Age        : Integer;
   Is_Student : Boolean;
   Courses    : aliased Json_Library.Values.Json_Value_Access; -- Pointer to the courses array
begin
   -- Parse the JSON string
   Root_Value := Json_Library.Parser.Parse (JSON_Input);

   -- Assuming the root is an object, access fields
   if Root_Value.Is_Object then
      declare
         Root_Object : constant Json_Library.Values.Json_Object_Access :=
            Root_Value.Get_Object; -- Type-safe access

         Name_Value : aliased Json_Library.Values.Json_Value_Access;
         Age_Value  : aliased Json_Library.Values.Json_Value_Access;
         Is_Student_Value : aliased Json_Library.Values.Json_Value_Access;

      begin
         -- Access individual fields by name
         Name_Value       := Root_Object.Get_Field ("name");
         Age_Value        := Root_Object.Get_Field ("age");
         Is_Student_Value := Root_Object.Get_Field ("isStudent");
         Courses          := Root_Object.Get_Field ("courses");

         -- Extract values with type checking
         if Name_Value.Is_String then
            Name := Name_Value.Get_String;
            Put_Line ("Name: " & To_String (Name));
         end if;

         if Age_Value.Is_Integer then
            Age := Age_Value.Get_Integer;
            Put_Line ("Age: " & Integer'Image (Age));
         end if;

         if Is_Student_Value.Is_Boolean then
            Is_Student := Is_Student_Value.Get_Boolean;
            Put_Line ("Is Student: " & Boolean'Image (Is_Student));
         end if;

         if Courses.Is_Array then
            Put_Line ("Courses:");
            declare
               Course_Array : constant Json_Library.Values.Json_Array_Access :=
                  Courses.Get_Array;
            begin
               for I in 1 .. Course_Array.Length loop
                  declare
                     Course_Value : aliased Json_Library.Values.Json_Value_Access :=
                        Course_Array.Get_Element (I);
                  begin
                     if Course_Value.Is_String then
                        Put_Line ("- " & To_String (Course_Value.Get_String));
                     end if;
                  end;
               end loop;
            end;
         end if;

      exception
         when Json_Library.Elements.Name_Error =>
            Put_Line ("Error: Field not found or wrong type.");
         when others =>
            Put_Line ("An error occurred during access.");
      end;
   else
      Put_Line ("Error: JSON root is not an object.");
   end if;

exception
   when Json_Library.Parser.Parse_Error =>
      Put_Line ("Error: Invalid JSON format.");
   when others =>
      Put_Line ("An unexpected error occurred.");
end Parse_Example;
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <em>Note:</em> The package names (<code>Json_Library</code>, etc.) are illustrative and depend on the specific library used (e.g., <code>AWA.JSON.Parsers</code>, <code>AWA.JSON.Values</code>, or packages from JSON-Ada). Actual libraries provide similar functionalities but with specific package structures and type names. Error handling is crucial; Ada libraries typically use exceptions.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Generating JSON</h3>
        <p>Creating a JSON string from Ada data structures or by building the JSON tree programmatically.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Ada Example: Generating a JSON Object</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`with Ada.Text_IO; use Ada.Text_IO;
with Ada.Strings.Unbounded; use Ada.Strings.Unbounded;
with Json_Library.Builder; -- Hypothetical builder package
with Json_Library.Values;  -- Hypothetical values package

procedure Generate_Example is
   -- Data to be serialized
   Name       : constant Unbounded_String := To_Unbounded_String ("Grace Hopper");
   Age        : constant Integer := 85;
   Is_Active  : constant Boolean := True;
   Skills     : constant array (1 .. 2) of Unbounded_String :=
      (To_Unbounded_String ("COBOL"), To_Unbounded_String ("Debugging"));

   -- JSON structure built programmatically
   Root_Object : aliased Json_Library.Values.Json_Value_Access; -- Pointer to the root object
   Skills_Array : aliased Json_Library.Values.Json_Value_Access; -- Pointer to the skills array
   JSON_Output : Unbounded_String;

begin
   -- Create a new JSON object
   Root_Object := Json_Library.Builder.New_Object;

   -- Add fields to the object
   Root_Object.Put ("name", Json_Library.Builder.New_String (Name));
   Root_Object.Put ("age",  Json_Library.Builder.New_Integer (Age));
   Root_Object.Put ("isActive", Json_Library.Builder.New_Boolean (Is_Active));

   -- Create a JSON array for skills
   Skills_Array := Json_Library.Builder.New_Array;
   for Skill of Skills loop
      Skills_Array.Append (Json_Library.Builder.New_String (Skill));
   end loop;

   -- Add the skills array to the root object
   Root_Object.Put ("skills", Skills_Array);

   -- Serialize the JSON structure to a string
   JSON_Output := Json_Library.Builder.To_String (Root_Object);

   -- Output the generated JSON
   Put_Line ("Generated JSON:");
   Put_Line (To_String (JSON_Output));

   -- Don't forget to free memory managed by the JSON library if needed (depends on library)

exception
   when others =>
      Put_Line ("An error occurred during generation.");
end Generate_Example;
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <em>Note:</em> Again, package names are illustrative. Libraries provide functions like <code>New_Object</code>, <code>New_String</code>, <code>Put</code>, <code>New_Array</code>, <code>Append</code>, and <code>To_String</code> to build and serialize the JSON structure. Memory management (using access types/pointers) is important in Ada; modern libraries often handle this internally or provide explicit cleanup procedures.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8"><ArrowLeftRight className="inline-block w-6 h-6 mr-2 text-blue-500" /> JSON and Format Converters</h2>
        <p>
          Direct, general-purpose format conversion libraries (e.g., XML to JSON, YAML to JSON) might not be as common or standardized in the Ada ecosystem compared to languages like Python or Java. However, you can achieve format conversion using Ada JSON libraries in several ways:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>JSON as an Intermediate:</strong> Parse the source format (e.g., XML) into a generic, in-memory tree representation, then traverse that tree and build an AWA.JSON or JSON-Ada structure, and finally serialize the JSON structure.</li>
          <li><strong>Leveraging Existing Parsers:</strong> Use an Ada library for the source format (e.g., an XML parser if available), extract data, and then use a JSON library to construct the JSON output.</li>
          <li><strong>Calling External Tools:</strong> For complex or less common formats, it might be pragmatic to call an external command-line tool (written in another language) from your Ada program to perform the conversion.</li>
          <li><strong>Schema-Based Conversion:</strong> If you have schemas for both formats, you might write Ada code that directly maps elements/fields from one structure to the other based on the schema definitions.</li>
        </ul>
        <p>
          Building a robust, general-purpose converter in Ada often means using the existing parsers/generators for each format involved and writing the mapping logic yourself.
        </p>

        <h2 className="text-2xl font-semibold mt-8"><Settings className="inline-block w-6 h-6 mr-2 text-blue-500" /> Practical Considerations</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><BookOpen className="inline-block w-5 h-5 mr-1 text-gray-600 dark:text-gray-400" /> <strong>Schema Validation:</strong> Ada JSON libraries typically don't include built-in JSON schema validation. You may need to implement checks manually after parsing or use external tools.</li>
          <li><GitBranch className="inline-block w-5 h-5 mr-1 text-gray-600 dark:text-gray-400" /> <strong>Performance and Memory:</strong> DOM-like parsing (building the whole tree in memory) can be memory-intensive for very large JSON documents. Consider SAX-like parsing if available (like in AWA.JSON) for streaming data.</li>
          <li><AlertCircle className="inline-block w-5 h-5 mr-1 text-gray-600 dark:text-gray-400" /> <strong>Error Handling:</strong> JSON parsing and access can fail due to invalid format, missing fields, or type mismatches. Use Ada's exception handling mechanisms (<code>begin...exception...end</code> blocks) to catch errors gracefully, as shown in the parsing example.</li>
          <li><Component className="inline-block w-5 h-5 mr-1 text-gray-600 dark:text-gray-400" /> <strong>Integration with Ada Types:</strong> Mapping between generic JSON values and specific Ada record types often requires manual coding. Libraries might offer helper utilities, but it's a common task developers handle.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8"><Library className="inline-block w-6 h-6 mr-2 text-blue-500" /> Choosing a Library</h2>
        <p>When deciding between libraries like AWA.JSON and JSON-Ada, consider:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Project Ecosystem:</strong> If you are already using the AWA framework, AWA.JSON is a natural fit.</li>
          <li><strong>Complexity Needs:</strong> For very complex JSON structures or large-scale web applications, AWA.JSON might offer more features (like SAX parsing). For simpler tasks, JSON-Ada might feel more lightweight.</li>
          <li><strong>API Preference:</strong> Review the documentation and choose the API style that best suits your team and project.</li>
          <li><strong>Community and Support:</strong> Both libraries have support from their respective communities (AdaCore for JSON-Ada, the AWA community for AWA.JSON).</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Ada provides capable libraries for working with JSON data, primarily through established projects like AWA.JSON and JSON-Ada. While Ada's strong typing means you often need to explicitly handle the mapping between dynamic JSON values and static Ada types, these libraries offer the necessary tools for parsing, generation, and manipulation. Understanding their API and managing potential errors through Ada's robust exception system are key to successfully integrating JSON processing into your Ada applications. For format conversion tasks, using JSON as an intermediate step or leveraging format-specific parsers/generators within Ada are common approaches.
        </p>
      </div>
    </>
  );
}

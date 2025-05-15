import type { Metadata } from "next";
import { ArrowRightLeft, Code, Package, Table, Sparkles, AlertTriangle, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: "ABAP JSON Handling in SAP Systems | SAP Development",
  description:
    "A comprehensive guide for developers on handling JSON data within ABAP, covering serialization, deserialization, best practices, and using standard SAP classes.",
};

export default function AbapJsonHandlingPage() {
  return (
    <article className="container mx-auto px-4 py-8 space-y-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          ABAP JSON Handling in SAP Systems
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Bridging the gap between SAP and the JSON world
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <Lightbulb className="text-blue-500" size={28} /> Why JSON in ABAP?
        </h2>
        <p className="text-lg leading-relaxed">
          In today's connected world, integrating SAP systems with external applications, APIs, and services is commonplace. JSON (JavaScript Object Notation) has become the de facto standard for lightweight data interchange. As an ABAP developer, understanding how to consume and expose data in JSON format is crucial for modern SAP integration scenarios.
        </p>
        <p className="text-lg leading-relaxed">
          SAP provides standard ABAP classes to easily handle JSON serialization (converting ABAP data into JSON strings) and deserialization (parsing JSON strings into ABAP data). This page explores these tools and techniques.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <ArrowRightLeft className="text-green-500" size={28} /> Core ABAP Classes for JSON
        </h2>
        <p className="text-lg leading-relaxed">
          Over the years, SAP has introduced and refined classes for JSON processing. While older systems might still use classes like <code>CL_SWF_JSON_SERIALIZER</code> and <code>CL_SWF_JSON_DESERIALIZER</code>, the recommended and more powerful classes available in modern SAP releases (NetWeaver 7.40+ and S/4HANA) are:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
          <li>
            <strong><code>CL_JSON_SERIALIZER</code>:</strong> Used to convert ABAP data (variables, structures, internal tables) into a JSON string.
          </li>
          <li>
            <strong><code>CL_JSON_PARSER</code>:</strong> Used to parse a JSON string and populate ABAP data variables, structures, or internal tables.
          </li>
        </ul>
        <p className="text-lg leading-relaxed">
          These newer classes offer better performance, more features, and improved handling of complex data structures compared to their predecessors.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <Code className="text-purple-500" size={28} /> 1. Serialization (ABAP to JSON)
        </h2>
        <p className="text-lg leading-relaxed">
          Converting your ABAP data into a JSON string is straightforward using <code>CL_JSON_SERIALIZER</code>. The core method is <code>SERIALIZE</code>.
        </p>

        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <Package size={24} /> Serializing Simple Data Types & Structures
        </h3>
        <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <pre className="text-sm">
{`DATA: lv_string TYPE string VALUE 'Hello, JSON!',
      lv_number TYPE i     VALUE 123,
      lv_boolean TYPE abap_bool VALUE abap_true.

TYPES: BEGIN OF ty_address,
         street TYPE string,
         city   TYPE string,
       END OF ty_address.

DATA: ls_person TYPE ty_person,
      ls_address TYPE ty_address,
      lv_json_string TYPE string.

ls_address = VALUE #( street = '123 Main St' city = 'Anytown' ).
ls_person = VALUE #( name = 'Alice' age = 30 address = ls_address ). " Assuming ty_person has fields for name, age, address

TRY.
    " Serialize a simple string
    cl_json_serializer=>serialize(
      EXPORTING
        data = lv_string
      CHANGING
        json = lv_json_string
    ).
    " lv_json_string will be: "Hello, JSON!"
    " Note: Simple types are serialized as their JSON primitive equivalent

    " Serialize a structure
    cl_json_serializer=>serialize(
      EXPORTING
        data = ls_person
      CHANGING
        json = lv_json_string
    ).
    " lv_json_string will be something like:
    " {"NAME":"Alice","AGE":30,"ADDRESS":{"STREET":"123 Main St","CITY":"Anytown"}}

  CATCH cx_sy_conversion_json INTO DATA(lx_json_error).
    " Handle errors
    MESSAGE lx_json_error-&gt;get_text( ) TYPE 'E'.
ENDTRY.`}
          </pre>
        </div>
        <p className="text-lg leading-relaxed">
          Notice how ABAP structure field names are converted to uppercase JSON keys by default.
        </p>

        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <Table size={24} /> Serializing Internal Tables
        </h3>
        <p className="text-lg leading-relaxed">
          Internal tables are serialized as JSON arrays of objects (one object per table row).
        </p>
        <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <pre className="text-sm">
{`TYPES: BEGIN OF ty_product,
         id   TYPE string,
         name TYPE string,
         price TYPE p DECIMALS 2,
       END OF ty_product.

DATA: lt_products TYPE STANDARD TABLE OF ty_product,
      lv_json_string TYPE string.

APPEND VALUE #( id = 'P001' name = 'Laptop' price = '1200.50' ) TO lt_products.
APPEND VALUE #( id = 'P002' name = 'Keyboard' price = '75.00' ) TO lt_products.

TRY.
    cl_json_serializer=>serialize(
      EXPORTING
        data = lt_products
      CHANGING
        json = lv_json_string
    ).
    " lv_json_string will be something like:
    " [{"ID":"P001","NAME":"Laptop","PRICE":"1200.50"},{"ID":"P002","NAME":"Keyboard","PRICE":"75.00"}]
    " Note: Numeric types like P (Packed Number) might be serialized as strings by default,
    " depending on their exact definition or ABAP release.

  CATCH cx_sy_conversion_json INTO DATA(lx_json_error).
    MESSAGE lx_json_error-&gt;get_text( ) TYPE 'E'.
ENDTRY.`}
          </pre>
        </div>

        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <Sparkles size={24} /> Serialization Options
        </h3>
        <p className="text-lg leading-relaxed">
          The <code>SERIALIZE</code> method offers useful options via optional parameters:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
          <li>
            <strong><code>PRETTY_PRINT</code>:</strong> Set to <code>abap_true</code> to generate a human-readable, indented JSON string.
            <div className="bg-gray-200 p-4 rounded-md mt-2 dark:bg-gray-700 overflow-x-auto">
              <pre className="text-sm">{`cl_json_serializer=>serialize( EXPORTING data = ls_person pretty_print = abap_true CHANGING json = lv_json_string ).`}</pre>
            </div>
          </li>
          <li>
            <strong><code>CONVERT_NUMBERS_TO_STRING</code>:</strong> Set to <code>abap_true</code> (default is usually false in newer releases) if you want numbers (like <code>i</code>, <code>f</code>, <code>p</code>) to be serialized as JSON strings instead of native JSON numbers. Useful for large numbers or precise decimal values where floating-point inaccuracies might occur.
          </li>
          <li>
            <strong><code>INITIAL_VALUES</code>:</strong> Controls whether fields with initial values are included in the JSON output. Default is usually <code>cl_json_serializer=&gt;omit_initial_values</code>. Use <code>cl_json_serializer=&gt;include_initial_values</code> to include them.
          </li>
          <li>
            <strong><code>FIELD_NAME_TO_UPPER</code>/<code>TO_LOWER</code>/<code>AS_IS</code>:</strong> Controls the casing of field names in the JSON output. Default is <code>cl_json_serializer=&gt;field_name_to_upper</code>. Use <code>cl_json_serializer=&gt;field_name_as_is</code> to retain the ABAP field name casing (requires careful naming in ABAP, e.g., using `!field_name` syntax).
          </li>
        </ul>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <Code className="text-orange-500" size={28} /> 2. Deserialization (JSON to ABAP)
        </h2>
        <p className="text-lg leading-relaxed">
          Parsing a JSON string and filling ABAP data variables or structures is done using <code>CL_JSON_PARSER</code>. The main method is <code>PARSE</code>.
        </p>

        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <Package size={24} /> Deserializing into Simple Types & Structures
        </h3>
        <p className="text-lg leading-relaxed">
          The target ABAP data structure (variable, structure, or internal table) must match the structure of the JSON data you are parsing. Field names and data types should align.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <pre className="text-sm">
{`TYPES: BEGIN OF ty_address,
         street TYPE string,
         city   TYPE string,
       END OF ty_address.

TYPES: BEGIN OF ty_person,
         name    TYPE string,
         age     TYPE i,
         address TYPE ty_address,
       END OF ty_person.

DATA: lv_json_input TYPE string,
      ls_person_out TYPE ty_person.

lv_json_input = '{"name":"Bob","age":45,"address":{"street":"456 Oak Ave","city":"Newville"}}'.

TRY.
    cl_json_parser=>parse(
      EXPORTING
        json = lv_json_input
      CHANGING
        data = ls_person_out
    ).
    " ls_person_out will now contain the data from the JSON string.
    " ls_person_out-name = 'Bob'
    " ls_person_out-age = 45
    " ls_person_out-address-street = '456 Oak Ave'
    " ls_person_out-address-city = 'Newville'

  CATCH cx_sy_json_parse_error INTO DATA(lx_parse_error).
    " Handle JSON parsing syntax errors
    MESSAGE lx_parse_error-&gt;get_text( ) TYPE 'E'.
  CATCH cx_sy_assign_cast_error INTO DATA(lx_assign_error).
    " Handle mapping errors (e.g., JSON type doesn't match ABAP type)
    MESSAGE lx_assign_error-&gt;get_text( ) TYPE 'E'.
ENDTRY.`}
          </pre>
        </div>

        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <Table size={24} /> Deserializing into Internal Tables
        </h3>
        <p className="text-lg leading-relaxed">
          To parse a JSON array of objects, you should deserialize it into an ABAP internal table of a structure type that matches the object structure in the JSON array.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <pre className="text-sm">
{`TYPES: BEGIN OF ty_product,
         id   TYPE string,
         name TYPE string,
         price TYPE p DECIMALS 2,
       END OF ty_product.

DATA: lv_json_input TYPE string,
      lt_products_out TYPE STANDARD TABLE OF ty_product.

lv_json_input = '[{"id":"P001","name":"Laptop","price":1200.50},{"id":"P002","name":"Keyboard","price":75.00}]'.
" Note: Price is a JSON number here. ABAP P DECIMALS 2 can handle this if defined correctly.

TRY.
    cl_json_parser=>parse(
      EXPORTING
        json = lv_json_input
      CHANGING
        data = lt_products_out
    ).
    " lt_products_out will now contain two rows.

  CATCH cx_sy_json_parse_error INTO DATA(lx_parse_error).
    MESSAGE lx_parse_error-&gt;get_text( ) TYPE 'E'.
  CATCH cx_sy_assign_cast_error INTO DATA(lx_assign_error).
    MESSAGE lx_assign_error-&gt;get_text( ) TYPE 'E'.
ENDTRY.`}
          </pre>
        </div>

        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <Sparkles size={24} /> Deserialization Options
        </h3>
        <p className="text-lg leading-relaxed">
          <code>CL_JSON_PARSER=&gt;PARSE</code> also has helpful options:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
          <li>
            <strong><code>INITIAL_VALUES</code>:</strong> Controls how to handle missing fields in the JSON input. Default is usually <code>cl_json_parser=&gt;omit_initial_values</code> (missing JSON fields correspond to initial values in ABAP). Use <code>cl_json_parser=&gt;raise_if_missing_field</code> to raise an exception if a JSON field expected by the ABAP structure is not found in the input.
          </li>
          <li>
            <strong><code>FIELD_NAME_CASE</code>:</strong> Specifies how JSON field names should be matched against ABAP field names. Options include <code>cl_json_parser=&gt;field_name_case_sensitive</code>, <code>cl_json_parser=&gt;field_name_case_insensitive</code> (common), <code>cl_json_parser=&gt;field_name_to_upper</code>, <code>cl_json_parser=&gt;field_name_to_lower</code>. Use <code>case_insensitive</code> or define the ABAP structure fields with the exact expected case using `!`.
          </li>
          <li>
            <strong><code>ACCEPT_PRIMITIVE_VALUE</code>:</strong> Useful if the JSON root element is a simple value (string, number, boolean, null) and you are parsing it into a simple ABAP variable. You need to set this to <code>abap_true</code>.
          </li>
        </ul>
        <div className="bg-gray-200 p-4 rounded-md mt-2 dark:bg-gray-700 overflow-x-auto">
          <pre className="text-sm">{`DATA lv_result TYPE i.
DATA lv_json_number TYPE string VALUE '123'.
TRY.
  cl_json_parser=>parse(
    EXPORTING
      json = lv_json_number
      accept_primitive_value = abap_true " Required for simple root values
    CHANGING
      data = lv_result
  ).
CATCH cx_sy_json_parse_error INTO DATA(lx).
  MESSAGE lx-&gt;get_text( ) TYPE 'E'.
ENDTRY.`}</pre>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={28} /> Error Handling
        </h2>
        <p className="text-lg leading-relaxed">
          Both <code>SERIALIZE</code> and <code>PARSE</code> methods raise exceptions of class <code>CX_SY_CONVERSION_JSON</code> (or its subclasses like <code>CX_SY_JSON_PARSE_ERROR</code>) if an error occurs. Common errors include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
          <li>Syntax errors in the JSON string during parsing.</li>
          <li>Type mismatches between JSON values and target ABAP fields (e.g., trying to parse a JSON string into an ABAP numeric type).</li>
          <li>Trying to parse a JSON array into an ABAP structure or vice versa.</li>
          <li>JSON field names not matching ABAP field names (depending on case sensitivity settings).</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Always wrap your calls to <code>SERIALIZE</code> and <code>PARSE</code> within <code>TRY...CATCH</code> blocks to gracefully handle these errors and log or inform the user.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <Lightbulb className="text-yellow-500" size={28} /> Tips and Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-lg leading-relaxed">
          <li>
            <strong>Define ABAP Structures Clearly:</strong> Create clear and type-safe ABAP structures and table types that precisely match the expected JSON structure. Use modern ABAP syntax with inline declarations where appropriate.
          </li>
          <li>
            <strong>Handle Case Sensitivity:</strong> Be mindful of case sensitivity for field names, especially during deserialization. Use the <code>FIELD_NAME_CASE</code> option or define ABAP fields using the <code>!</code> escape character (e.g., <code>data: begin of ls_data, "myField" type string, end of ls_data.</code>).
          </li>
          <li>
            <strong>Manage Data Types:</strong> Pay attention to how ABAP data types map to JSON types. `string` maps to string, `i`/`f` to number, `abap_bool` to boolean, initial reference/data objects to null. Packed numbers (`p`) can be tricky; consider serializing them as strings if precision is critical.
          </li>
          <li>
            <strong>Use Pretty Print for Debugging:</strong> The <code>PRETTY_PRINT</code> option during serialization is invaluable for debugging and understanding the generated JSON output.
          </li>
          <li>
            <strong>Error Reporting:</strong> In case of parsing or serialization errors, use the exception object's methods (like <code>GET_TEXT()</code>) to get detailed error messages.
          </li>
          <li>
            <strong>Performance for Large Data:</strong> For extremely large JSON payloads, direct parsing into complex nested ABAP structures might consume significant memory. Consider alternative approaches like streaming parsers (if available or custom-built) or processing data in chunks if performance becomes an issue. However, for most typical API interactions, <code>CL_JSON_SERIALIZER</code> and <code>CL_JSON_PARSER</code> are efficient.
          </li>
          <li>
            <strong>Generated Proxies:</strong> For consuming external RESTful APIs, SAP Gateway and CPI can generate ABAP proxy structures based on API specifications (like OpenAPI/Swagger), which automatically handle some of the complexity of JSON mapping.
          </li>
        </ul>
      </section>

      <footer className="text-center mt-12 text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Your Website/Organization. All rights reserved.</p>
      </footer>
    </article>
  );
}

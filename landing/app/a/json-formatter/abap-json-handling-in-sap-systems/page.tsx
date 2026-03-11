import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle2,
  Code,
  Lightbulb,
  Sparkles,
  Table,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ABAP JSON Handling in SAP Systems: Read Arrays and Map Data",
  description:
    "How to read JSON arrays in SAP ABAP, when to use /UI2/CL_JSON vs XCO JSON, and how to fix common mapping issues with camelCase, nested objects, and numbers.",
};

export default function AbapJsonHandlingPage() {
  return (
    <article className="container mx-auto max-w-4xl px-4 py-8 space-y-10">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">ABAP JSON Handling in SAP Systems</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Practical guidance for reading JSON arrays, mapping nested payloads, and choosing the right SAP API.
        </p>
      </header>

      <section className="space-y-6">
        <p className="text-lg leading-relaxed">
          If you landed here because you need to read an array from JSON in SAP ABAP, the main rule is simple: match
          the JSON root element to the ABAP target type. A top-level JSON array should deserialize into an internal
          table. A JSON object that contains an array should deserialize into a structure with an internal table
          component for that property.
        </p>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900/50 dark:bg-green-950/20">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <CheckCircle2 className="text-green-600" size={28} /> Quick Answer
          </h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-lg leading-relaxed">
            <li>
              JSON root is <code>[...]</code>: deserialize into an ABAP internal table.
            </li>
            <li>
              JSON root is <code>{`{...}`}</code> with an <code>items</code> array: deserialize into a structure whose{" "}
              <code>items</code> field is an internal table.
            </li>
            <li>
              If the JSON uses camelCase names such as <code>orderId</code>, enable name conversion or explicit name
              mappings instead of changing the payload manually.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <ArrowRightLeft className="text-green-500" size={28} /> What to Use on Current SAP Stacks
        </h2>
        <p className="text-lg leading-relaxed">
          Current SAP ABAP Platform documentation highlights the XCO JSON API for modern development, especially when
          you want built-in transformations for member names and boolean handling. In day-to-day on-premise ABAP work,
          <code>/UI2/CL_JSON</code> is still the most common practical choice because it maps structures and internal
          tables directly with minimal code.
        </p>
        <ul className="list-disc pl-6 space-y-3 text-lg leading-relaxed">
          <li>
            <strong>XCO JSON</strong>: best fit for ABAP Cloud and current platform code where you want a SAP-documented
            modern API.
          </li>
          <li>
            <strong>
              <code>/UI2/CL_JSON</code>
            </strong>
            : usually the fastest way to deserialize API payloads into classic ABAP types in ECC and S/4HANA systems.
          </li>
          <li>
            <strong>Transformations or sXML readers</strong>: useful when you need strict control, streaming, or custom
            transformation logic for very large payloads.
          </li>
        </ul>
        <p className="text-lg leading-relaxed">
          For the search intent behind this page, <code>/UI2/CL_JSON</code> is the clearest example because the problem
          is usually not JSON generation. It is getting an array into the correct ABAP table type without fighting root
          shape or field naming.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <Table className="text-blue-500" size={28} /> Read a Top-Level JSON Array into an Internal Table
        </h2>
        <p className="text-lg leading-relaxed">
          When the payload starts with <code>[</code>, your target must be an internal table. This is the most direct
          answer to “how do I read a JSON array in SAP ABAP?”
        </p>
        <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <pre className="text-sm">
            {`TYPES: BEGIN OF ty_item,
         id   TYPE string,
         name TYPE string,
         qty  TYPE i,
       END OF ty_item.
TYPES ty_items TYPE STANDARD TABLE OF ty_item WITH EMPTY KEY.

DATA lv_json  TYPE string.
DATA lt_items TYPE ty_items.

lv_json = '[{"id":"10","name":"Cable","qty":2},{"id":"20","name":"Adapter","qty":1}]'.

TRY.
    /ui2/cl_json=>deserialize(
      EXPORTING
        json = lv_json
      CHANGING
        data = lt_items
    ).

    LOOP AT lt_items INTO DATA(ls_item).
      WRITE: / ls_item-id, ls_item-name, ls_item-qty.
    ENDLOOP.

  CATCH cx_root INTO DATA(lx_json).
    MESSAGE lx_json->get_text( ) TYPE 'E'.
ENDTRY.`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
          <li>The JSON root is an array, so the ABAP target is a table type.</li>
          <li>Each object inside the array maps to one row of the internal table.</li>
          <li>If the payload is valid JSON but your target is a structure instead of a table, deserialization fails.</li>
        </ul>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <Code className="text-purple-500" size={28} /> Read an Array Nested Inside a JSON Object
        </h2>
        <p className="text-lg leading-relaxed">
          Many APIs return a root object with metadata plus an array, for example <code>{`{ "orderId": "...", "items": [...] }`}</code>.
          In that case, your ABAP target must be a structure that contains an internal table field for the array.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-800 overflow-x-auto">
          <pre className="text-sm">
            {`TYPES: BEGIN OF ty_item,
         id   TYPE string,
         name TYPE string,
         qty  TYPE i,
       END OF ty_item.
TYPES ty_items TYPE STANDARD TABLE OF ty_item WITH EMPTY KEY.

TYPES: BEGIN OF ty_order,
         order_id TYPE string,
         items    TYPE ty_items,
       END OF ty_order.

DATA lv_json  TYPE string.
DATA ls_order TYPE ty_order.

lv_json = '{"orderId":"4711","items":[{"id":"10","name":"Cable","qty":2}]}'.

TRY.
    /ui2/cl_json=>deserialize(
      EXPORTING
        json        = lv_json
        pretty_name = /ui2/cl_json=>pretty_mode-camel_case
      CHANGING
        data        = ls_order
    ).

    LOOP AT ls_order-items INTO DATA(ls_item).
      WRITE: / ls_order-order_id, ls_item-id, ls_item-name, ls_item-qty.
    ENDLOOP.

  CATCH cx_root INTO DATA(lx_json).
    MESSAGE lx_json->get_text( ) TYPE 'E'.
ENDTRY.`}
          </pre>
        </div>
        <p className="text-lg leading-relaxed">
          The important detail is the field shape, not just the field names. If the payload wraps the array inside a
          property, ABAP must mirror that wrapper structure.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <Sparkles className="text-orange-500" size={28} /> Field Names, camelCase, and Compatibility
        </h2>
        <p className="text-lg leading-relaxed">
          JSON from REST APIs often uses camelCase, while ABAP fields typically use underscores or upper-case names.
          This mismatch is a common reason developers think array parsing is broken when the real issue is name mapping.
        </p>
        <ul className="list-disc pl-6 space-y-3 text-lg leading-relaxed">
          <li>
            Use <code>pretty_name = /ui2/cl_json=&gt;pretty_mode-camel_case</code> when JSON keys such as{" "}
            <code>orderId</code> need to map to ABAP fields such as <code>order_id</code>.
          </li>
          <li>
            If names differ beyond case style, use explicit <code>name_mappings</code> instead of renaming ABAP fields
            to match the payload.
          </li>
          <li>
            If <code>/UI2/CL_JSON</code> is not available in an older system, check your stack level first. SAP also
            provides a transportable version for older releases, while newer ABAP Platform stacks document XCO JSON as
            the modern API.
          </li>
        </ul>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={28} /> Common Problems When Reading JSON Arrays
        </h2>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/20">
          <ul className="list-disc pl-6 space-y-3 text-lg leading-relaxed">
            <li>
              <strong>Wrong root type:</strong> a JSON array cannot deserialize into a structure, and a JSON object
              cannot deserialize into a plain internal table.
            </li>
            <li>
              <strong>Case or name mismatch:</strong> <code>materialNumber</code> will not reliably map to{" "}
              <code>material_number</code> unless you enable name conversion or explicit mappings.
            </li>
            <li>
              <strong>Number handling:</strong> packed decimals and currency values need extra attention. If precision
              matters, test how the provider sends them and whether your ABAP type should stay numeric or be staged as a
              string first.
            </li>
            <li>
              <strong>Optional or missing fields:</strong> JSON that omits properties leaves the ABAP fields initial.
              That is normal, but it can look like parsing failed if you expected every key to be present.
            </li>
            <li>
              <strong>Debugging malformed payloads:</strong> format the JSON before writing ABAP code so you can see the
              actual root shape, nested arrays, and repeated objects clearly.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <Lightbulb className="text-yellow-500" size={28} /> Practical Takeaway
        </h2>
        <p className="text-lg leading-relaxed">
          If your goal is simply to read an array in JSON format in SAP ABAP, define a table type for the array rows,
          make sure the target matches the JSON root shape, and then deserialize with <code>/UI2/CL_JSON</code> or the
          modern API available on your stack. Most failures come from mismatched structure definitions, not from JSON
          itself.
        </p>
        <p className="text-lg leading-relaxed">
          Before changing ABAP code, validate the payload with a formatter so you can confirm whether you are dealing
          with <code>[...]</code>, <code>{`{...}`}</code>, or a nested mix of both. That one check usually tells you
          what your ABAP target type should look like.
        </p>
      </section>
    </article>
  );
}

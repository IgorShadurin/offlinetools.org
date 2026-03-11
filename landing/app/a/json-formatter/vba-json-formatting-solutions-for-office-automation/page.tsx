import type { Metadata } from "next";
import { Code, FileText, SquareStack, HardDrive } from "lucide-react";

export const metadata: Metadata = {
  title: "VBA JSON Formatting Solutions | Office Automation Guide",
  description:
    "Practical VBA JSON formatting solutions for Excel, Access, and Office automation, including current parser setup, pretty-print examples, API usage, and troubleshooting.",
};

export default function VbaJsonFormattingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">VBA JSON Formatting Solutions</h1>

      <div className="space-y-6">
        <p>
          If you need to pretty-print, parse, or generate JSON in Excel, Access, or another Office app, the practical
          answer is still the same: VBA has no built-in JSON parser, so most projects import a JSON module and work
          with <code>Dictionary</code> and <code>Collection</code> objects. For most teams, that means using{" "}
          <code>JsonConverter.bas</code> from the open-source VBA-JSON project, then calling <code>ParseJson</code> to
          read JSON and <code>ConvertToJson</code> to emit compact or indented output.
        </p>
        <p>
          That matters because most Office automation now touches REST APIs, webhooks, or configuration files. A search
          visitor landing on this page usually does not need theory first. They need the shortest reliable path to
          working code, compatibility notes, and the common mistakes that waste time in the VBA editor.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileText className="mr-2 text-blue-500" /> Quick Answer
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use a JSON library instead of trying to hand-parse strings. In practice, VBA-JSON remains the standard
            choice for Office VBA projects.
          </li>
          <li>
            On Windows, many projects use <code>Microsoft Scripting Runtime</code> for <code>Dictionary</code>{" "}
            support. If the workbook must also run on Mac, use the cross-platform dictionary compatibility approach
            recommended by the library instead of assuming that Windows reference is available.
          </li>
          <li>
            Parse first, then pretty-print. Formatting invalid JSON does not fix syntax errors; a successful parse is
            your validation step.
          </li>
          <li>
            Arrays typically come back as <code>Collection</code> objects, so indexing is 1-based in VBA.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <SquareStack className="mr-2 text-green-500" /> Recommended Setup for Real Office Automation
        </h2>
        <p>
          The most useful mental model is simple: JSON objects map to key/value containers, JSON arrays map to ordered
          lists, and JSON primitives map to normal VBA scalar values.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>JSON object</strong>: usually a <code>Dictionary</code>-like object.
          </li>
          <li>
            <strong>JSON array</strong>: usually a <code>Collection</code>.
          </li>
          <li>
            <strong>String, number, boolean, null</strong>: normal VBA values such as <code>String</code>,
            <code>Double</code>, <code>Boolean</code>, and <code>Null</code>.
          </li>
        </ul>
        <p>
          One correction that trips people up: <code>ArrayList</code> is not part of{" "}
          <code>Microsoft Scripting Runtime</code>. If you are following common VBA-JSON patterns, expect arrays to be
          exposed as <code>Collection</code> items unless you intentionally build something else.
        </p>
        <p>
          A practical setup looks like this:
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Import the JSON module into your VBA project.</li>
          <li>
            For Windows-only workbooks, add the <code>Microsoft Scripting Runtime</code> reference if you want early
            binding.
          </li>
          <li>
            For Mac and Windows compatibility, avoid hard-coding a Windows-only reference and use the compatible
            dictionary option your JSON library documents.
          </li>
          <li>
            Keep your JSON handling separate from your HTTP code so you can test parsing and formatting with saved
            samples first.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-500" /> Parse and Pretty-Print JSON in VBA
        </h2>
        <p>
          If your goal is readable output for debugging, logging, or inspecting API responses, the clean workflow is:
          parse the raw string, then convert the parsed object back to JSON with indentation enabled.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Validate and format a JSON response</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`' Requires JsonConverter.bas in the project
Dim rawJson As String
Dim parsed As Object
Dim prettyJson As String

rawJson = "{""customer"":{""name"":""Alice"",""tier"":""pro""},""tags"":[""excel"",""api""],""active"":true}"

Set parsed = JsonConverter.ParseJson(rawJson)

' Whitespace:=2 produces readable indentation
prettyJson = JsonConverter.ConvertToJson(parsed, Whitespace:=2)

Debug.Print prettyJson
' {
'   "customer": {
'     "name": "Alice",
'     "tier": "pro"
'   },
'   "tags": [
'     "excel",
'     "api"
'   ],
'   "active": true
' }
`}
            </pre>
          </div>
        </div>
        <p>
          Two details are worth remembering here. First, <code>ConvertToJson</code> returns a string, so assign it with
          normal string assignment, not <code>Set</code>. Second, if <code>ParseJson</code> fails, the input is not
          valid JSON yet, which is exactly the signal you want before sending a payload to an API.
        </p>

        <h3 className="text-xl font-semibold mt-6">Accessing Parsed Values Safely</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Reading nested object and array values</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`Dim data As Object
Dim customerName As String
Dim firstTag As String

Set data = JsonConverter.ParseJson(rawJson)

customerName = data("customer")("name")
firstTag = data("tags")(1)   ' Collections are 1-based

Debug.Print customerName
Debug.Print firstTag
`}
            </pre>
          </div>
        </div>
        <p>
          This pattern is usually easier than building your own tokenizer or writing a custom pretty-printer. If you
          only need to inspect a sample payload before wiring it into your macro, using a JSON formatter first and then
          testing the cleaned string in VBA is often faster than debugging malformed text in the Immediate window.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-orange-500" /> Generate JSON for POST and PUT Requests
        </h2>
        <p>
          Many Office automation tasks need to send JSON, not just read it. The safest approach is to build a VBA
          object graph first, then serialize it. That avoids quoting mistakes, missing commas, and broken escaping.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Build a JSON request body</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`Dim payload As Object
Dim tags As New Collection
Dim jsonBody As String

' Windows-friendly late binding example
Set payload = CreateObject("Scripting.Dictionary")

payload("reportName") = "Weekly Ops"
payload("active") = True
payload("owner") = "finance@example.com"

tags.Add "excel"
tags.Add "automation"
payload("tags") = tags

jsonBody = JsonConverter.ConvertToJson(payload, Whitespace:=2)

Debug.Print jsonBody
`}
            </pre>
          </div>
        </div>
        <p>
          If the workbook must run on both Windows and Mac, swap the dictionary instantiation to the compatible
          dictionary class used by your project. The JSON pattern stays the same even if the concrete dictionary type
          changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <HardDrive className="mr-2 text-red-500" /> Fetch JSON from an API and Format It
        </h2>
        <p>
          A common workflow is: request JSON from an API, parse it, then print or log the formatted version while you
          build the rest of the macro. On Windows, many VBA projects use <code>MSXML2.XMLHTTP60</code> or a similar
          client object for this step.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: GET JSON, parse it, and pretty-print it</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`Dim http As Object
Dim parsedResponse As Object
Dim apiUrl As String

apiUrl = "https://jsonplaceholder.typicode.com/posts/1"

Set http = CreateObject("MSXML2.XMLHTTP.6.0")

http.Open "GET", apiUrl, False
http.setRequestHeader "Accept", "application/json"
http.send

If http.Status = 200 Then
    Set parsedResponse = JsonConverter.ParseJson(http.responseText)
    Debug.Print JsonConverter.ConvertToJson(parsedResponse, Whitespace:=2)
Else
    Debug.Print "HTTP error: " & http.Status & " - " & http.statusText
End If

Set parsedResponse = Nothing
Set http = Nothing
`}
            </pre>
          </div>
        </div>
        <p>
          If your code already makes the web request successfully, do not overcomplicate the transport layer. Treat
          HTTP and JSON as separate concerns: first get the response text, then parse and format it with the JSON
          library.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <SquareStack className="mr-2 text-teal-500" /> Common VBA JSON Problems and Fixes
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>"User-defined type not defined"</strong>: You probably added early-bound types without the required
            reference. Either add the reference or switch the variable to <code>Object</code>.
          </li>
          <li>
            <strong>Arrays behave strangely</strong>: Parsed arrays are commonly <code>Collection</code> objects, so
            use 1-based indexing.
          </li>
          <li>
            <strong>Long numeric IDs lose precision</strong>: Keep values such as order IDs or external record IDs as
            strings. In VBA-JSON, preserving very long numeric-looking values as text is the safer default because Excel
            and VBA cannot represent every large integer exactly.
          </li>
          <li>
            <strong>Pretty-printing still fails</strong>: The input is probably not valid JSON yet. Parse it first and
            fix the syntax error before trying to format it.
          </li>
          <li>
            <strong>You only need visual formatting, not VBA code</strong>: Use a formatter to validate and indent the
            payload outside the editor first, then paste the known-good JSON into your test macro.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileText className="mr-2 text-yellow-500" /> When Manual Formatting Is Enough
        </h2>
        <p>
          A tiny custom pretty-printer can be acceptable if you are only reindenting already-valid JSON for display.
          But the moment you need to read fields, build nested payloads, or handle escaping correctly, manual string
          logic stops being a shortcut. In Office automation, it is usually cheaper to standardize on a parser than to
          debug home-grown JSON code later.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The durable VBA JSON solution is to use a library, keep your data in dictionary and collection objects, and
          let the serializer handle formatting. That gives you reliable pretty-printing, safer API payload generation,
          and less fragile Office automation code than manual string manipulation.
        </p>
      </div>
    </>
  );
}

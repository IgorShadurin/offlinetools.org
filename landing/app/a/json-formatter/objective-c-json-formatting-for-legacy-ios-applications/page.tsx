import type { Metadata } from "next";
import { FileJson, Code, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Objective-C JSON Formatting for Legacy iOS Applications",
  description:
    "Format, validate, and parse JSON safely in legacy Objective-C iOS apps with NSJSONSerialization, version-aware options, and practical debugging tips.",
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
          If you maintain an older iOS app that still ships Objective-C, JSON work usually comes down to one Foundation
          class:{" "}
          <a
            href="https://developer.apple.com/documentation/foundation/jsonserialization"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            <code>NSJSONSerialization</code>
          </a>
          . It is still Apple&apos;s built-in way to turn Foundation objects into JSON and parse JSON back into{" "}
          <code>NSDictionary</code>, <code>NSArray</code>, <code>NSString</code>, <code>NSNumber</code>, and{" "}
          <code>NSNull</code>.
        </p>

        <p>
          For a real legacy codebase, the hard part is rarely &quot;how do I call the API?&quot; It is avoiding invalid
          payloads, handling <code>null</code> safely, understanding which formatting options exist on the OS versions
          you still support, and quickly checking whether a broken response is malformed JSON or just unexpected data.
          That is where a JSON formatter is useful before you even touch application code.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code size={28} />
          <span>What Still Matters in Legacy Objective-C</span>
        </h2>
        <p>
          <code>NSJSONSerialization</code> is still the right default for formatting and parsing JSON in Objective-C.
          Apple&apos;s current documentation also notes that the class is thread-safe on iOS 7 and later, so modernized
          legacy apps do not need a third-party formatter just to serialize normal API payloads.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use <code>+isValidJSONObject:</code> before serializing anything that may contain custom model objects,
            dates, sets, or computed numeric values.
          </li>
          <li>
            Remember that JSON <code>null</code> becomes <code>[NSNull null]</code>, not <code>nil</code>.
          </li>
          <li>
            JSON numbers map to <code>NSNumber</code>, including booleans.
          </li>
          <li>
            By default, Apple expects a top-level array or dictionary when writing JSON. Scalar values are a special
            case and should be handled deliberately with fragment options.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ArrowRight size={28} />
          <span>Serialize Objective-C Objects Into Readable JSON</span>
        </h2>
        <p>
          When you are logging a request body, creating a fixture, or saving local state, a good serializer path does
          three things: validates the object first, enables readable formatting only when it helps, and keeps newer
          options behind availability checks.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-3">Safer Serialization Example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`NSDictionary *payload = @{
    @"name": @"Alice",
    @"age": @(30),
    @"active": @(YES),
    @"roles": @[@"admin", @"editor"],
    @"manager": [NSNull null]
};

if (![NSJSONSerialization isValidJSONObject:payload]) {
    NSLog(@"Payload contains a non-JSON type.");
    return;
}

NSJSONWritingOptions options = 0;
options |= NSJSONWritingPrettyPrinted;

if (@available(iOS 11.0, *)) {
    options |= NSJSONWritingSortedKeys;
}

if (@available(iOS 13.0, *)) {
    options |= NSJSONWritingWithoutEscapingSlashes;
}

NSError *error = nil;
NSData *jsonData = [NSJSONSerialization dataWithJSONObject:payload
                                                   options:options
                                                     error:&error];

if (jsonData == nil) {
    NSLog(@"Serialization failed: %@", error.localizedDescription);
    return;
}

NSString *jsonString = [[NSString alloc] initWithData:jsonData
                                             encoding:NSUTF8StringEncoding];
NSLog(@"%@", jsonString);`}
            </pre>
          </div>
        </div>

        <h4 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <CheckCircle size={20} />
          <span>Why This Pattern Holds Up</span>
        </h4>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>isValidJSONObject:</code> catches unsupported types before you get a runtime failure.
          </li>
          <li>
            <code>NSJSONWritingPrettyPrinted</code> is best for logs, fixtures, and local debugging. For network
            traffic, use <code>0</code> unless humans need to read the payload.
          </li>
          <li>
            <code>NSJSONWritingSortedKeys</code> is available on iOS 11 and later and is useful when you want stable,
            diff-friendly output in tests or support logs.
          </li>
          <li>
            <code>NSJSONWritingWithoutEscapingSlashes</code> is available on iOS 13 and later. It improves readability
            for URLs, but it is cosmetic rather than semantic.
          </li>
          <li>
            JSON does not allow <code>NaN</code> or infinity values. If floating-point calculations can produce them,
            sanitize those numbers before serializing.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ArrowRight size={28} />
          <span>Parse API Responses Without Common Legacy Bugs</span>
        </h2>
        <p>
          Deserialization looks simple until you hit responses with nullable fields, unexpected top-level values, or
          code that assumes every response is a dictionary. The safe approach is to parse into <code>id</code>, confirm
          the root type, then unwrap any <code>NSNull</code> values before using them.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-3">Defensive Parsing Example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`NSData *responseData = /* data from NSURLSession */;

NSJSONReadingOptions options = 0;
BOOL expectsScalarJSON = NO;

if (expectsScalarJSON) {
    options |= NSJSONReadingFragmentsAllowed;
}

NSError *error = nil;
id jsonObject = [NSJSONSerialization JSONObjectWithData:responseData
                                                options:options
                                                  error:&error];

if (jsonObject == nil) {
    NSLog(@"Parse failed: %@", error.localizedDescription);
    return;
}

if (![jsonObject isKindOfClass:[NSDictionary class]]) {
    NSLog(@"Expected a dictionary but got: %@", [jsonObject class]);
    return;
}

NSDictionary *response = (NSDictionary *)jsonObject;
id emailValue = response[@"email"];
NSString *email = (emailValue == [NSNull null]) ? nil : emailValue;

NSLog(@"Parsed email: %@", email);`}
            </pre>
          </div>
        </div>

        <h4 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <CheckCircle size={20} />
          <span>Current Parsing Notes Worth Knowing</span>
        </h4>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Prefer <code>NSJSONReadingFragmentsAllowed</code> for top-level scalar JSON. Older code often uses{" "}
            <code>NSJSONReadingAllowFragments</code>, which Apple now marks as deprecated.
          </li>
          <li>
            <code>NSJSONReadingMutableContainers</code> is only useful if you truly need mutable arrays or dictionaries
            immediately after parsing. In most maintenance work, immutable results plus targeted copies are cleaner.
          </li>
          <li>
            <code>NSJSONReadingMutableLeaves</code> is rarely worth using in practice.
          </li>
          <li>
            <code>NSJSONReadingJSON5Allowed</code> exists on iOS 15 and later, but it is a niche tool for human-edited
            local content. Do not quietly enable it for normal API traffic if you expect strict JSON from a backend.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle size={28} />
          <span>Compatibility and Interoperability Caveats</span>
        </h2>
        <p>
          Apple&apos;s API behavior and the JSON standard are close, but not identical in defaults.{" "}
          <a
            href="https://www.rfc-editor.org/rfc/rfc8259"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            RFC 8259
          </a>{" "}
          says a JSON text can be any serialized value, while <code>NSJSONSerialization</code> still treats top-level
          fragments as opt-in behavior. That difference matters when an API returns a bare string, number, or boolean.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            If your app still supports iOS 10 or earlier, guard <code>NSJSONWritingSortedKeys</code> with{" "}
            <code>@available</code>.
          </li>
          <li>
            If your app still supports iOS 12 or earlier, do the same for{" "}
            <code>NSJSONWritingWithoutEscapingSlashes</code>.
          </li>
          <li>
            If you maintain a mixed fleet of old app versions, keep your JSON generator conservative so responses remain
            easy to compare across builds and devices.
          </li>
          <li>
            Output key sorting helps humans and test diffs, but JSON object key order should not be treated as business
            logic.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle size={28} />
          <span>Common Breakages in Legacy Apps</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Custom model objects in payloads:</span> Convert them to dictionaries before
            calling <code>dataWithJSONObject:options:error:</code>.
          </li>
          <li>
            <span className="font-medium">Dates and URLs:</span> Serialize them explicitly as ISO 8601 strings or other
            agreed wire formats instead of passing <code>NSDate</code> or <code>NSURL</code> directly.
          </li>
          <li>
            <span className="font-medium">Blind dictionary casts:</span> Some APIs return arrays at the root. Check the
            type before subscripting.
          </li>
          <li>
            <span className="font-medium">UI freezes on large payloads:</span> Pretty-printing or parsing big JSON on
            the main thread is still expensive. Move heavy JSON work off the UI path.
          </li>
          <li>
            <span className="font-medium">Assuming malformed data is valid JSON:</span> Before changing parsing code,
            drop the payload into an offline formatter to verify whether the issue is syntax, structure, or unexpected
            nulls.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileJson size={28} />
          <span>When a JSON Formatter Helps More Than More Code</span>
        </h2>
        <p>
          For legacy iOS maintenance, a formatter is often the fastest first step. Paste the raw response from
          <code>NSURLSession</code>, a proxy capture, or an app log and confirm three things before editing Objective-C:
          whether the payload is valid JSON, what the real root type is, and which fields are actually{" "}
          <code>null</code>.
        </p>
        <p>
          That workflow is especially useful when you are debugging production-like data, building test fixtures, or
          comparing server responses without sending potentially sensitive payloads through another web service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CheckCircle size={28} />
          <span>Bottom Line</span>
        </h2>
        <p>
          Objective-C JSON formatting in 2026 is still mostly about using <code>NSJSONSerialization</code> carefully,
          not replacing it. Validate objects before writing, guard newer formatting options by OS version, treat{" "}
          <code>NSNull</code> as a first-class case, and use an offline formatter to inspect real payloads before you
          change legacy parsing code.
        </p>
      </div>
    </>
  );
}

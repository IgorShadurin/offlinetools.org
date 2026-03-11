import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about malformed JSON in API responses
 */
export const metadata: Metadata = {
  title: "Malformed JSON in API Responses: Detect, Retry, and Sanitize Safely | Offline Tools",
  description:
    "Practical ways to handle malformed JSON from APIs, including HTML error pages, truncated bodies, and invalid numbers like NaN or Infinity.",
};

/**
 * Article page component for handling malformed JSON in API responses
 */
export default function MalformedJsonInApiResponsesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Malformed JSON in API Responses: Handling Strategies</h1>

      <div className="space-y-6">
        <p>
          Malformed JSON is rarely just a parsing problem. In production it usually means one of four things:
          the upstream API returned HTML instead of JSON, the response body was truncated, the payload contains
          JavaScript-style values that are not valid JSON, or the data shape drifted from what your client expects.
          If you call <code>response.json()</code> blindly, any of those cases can turn into a runtime failure.
        </p>

        <p>
          A robust strategy is to separate transport checks, parsing, repair decisions, and schema validation.
          That makes it easier to decide when to retry, when to fail fast, and when a small quarantine-style
          sanitization step is acceptable for a known bad partner API.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/30 my-6 border-l-4 border-blue-400">
          <h2 className="text-lg font-medium text-blue-900 dark:text-blue-200">What strict JSON still requires</h2>
          <p className="mt-2 text-blue-800 dark:text-blue-100">
            Interoperable JSON is still defined by RFC 8259: strings use double quotes, trailing commas are not
            allowed, comments are not part of JSON, and non-finite numbers such as <code>NaN</code>,
            <code>Infinity</code>, and <code>-Infinity</code> are invalid. Current MDN docs also note that
            <code>JSON.parse()</code> throws <code>SyntaxError</code> for illegal JSON, and
            <code>Response.json()</code> rejects if the body cannot be parsed.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What Malformed API JSON Usually Looks Like</h2>
        <p>
          Search traffic for this topic usually comes from a few repeat offenders. These are the cases worth handling
          explicitly:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>HTML or plaintext error pages:</strong> A proxy, CDN, or app server returns markup or text while
              your client still expects JSON.
            </li>
            <li>
              <strong>Truncated bodies:</strong> The response cuts off mid-object or mid-array because of upstream
              crashes, timeouts, or connection resets.
            </li>
            <li>
              <strong>Almost-JSON:</strong> The payload contains trailing commas, comments, single quotes, or other
              syntax copied from JavaScript instead of strict JSON.
            </li>
            <li>
              <strong>Invalid numeric values:</strong> Bare <code>NaN</code>, <code>Infinity</code>, or
              <code>-Infinity</code> show up in the response even though they are not legal JSON numbers.
            </li>
            <li>
              <strong>Interoperability bugs:</strong> Duplicate object keys or encoding issues make the payload
              technically parseable in one environment but unreliable across others.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">A Fast Triage Checklist Before Parsing</h2>
        <p>
          Do these checks before blaming <code>JSON.parse()</code>. They quickly tell you whether this is a parser
          problem or an upstream contract problem.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ol className="list-decimal ml-6 space-y-2">
            <li>Check the HTTP status first. A 502, 503, or 504 with a body is usually not a JSON parser bug.</li>
            <li>
              Inspect the <code>Content-Type</code> header, but do not trust it completely. JSON APIs commonly use
              <code>application/json</code>, <code>application/problem+json</code>, or another
              <code>application/*+json</code> media type.
            </li>
            <li>Read the raw text when the endpoint is flaky so you can log a safe preview of what actually arrived.</li>
            <li>
              Distinguish parse failures from validation failures. Invalid syntax and wrong data shape need different
              fixes.
            </li>
            <li>Log request IDs and response previews, but avoid storing full sensitive payloads in production logs.</li>
          </ol>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Use a Safer Parse Path for Unreliable Endpoints</h2>
        <p>
          If an endpoint is known to be inconsistent, prefer <code>response.text()</code> plus an explicit parse step.
          That gives you better error reporting than jumping straight to <code>response.json()</code>, and it lets you
          check status codes and media types before parsing.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">JavaScript example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function isJsonMediaType(contentType = "") {
  return /\\bapplication\\/([a-z.+-]*\\+)?json\\b/i.test(contentType);
}

async function fetchJsonSafely(url, init) {
  const response = await fetch(url, init);
  const contentType = response.headers.get("content-type") ?? "";
  const text = await response.text();

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${text.slice(0, 200)}\`);
  }

  if (!isJsonMediaType(contentType)) {
    throw new Error(
      \`Expected a JSON media type, got \${contentType || "unknown"}: \${text.slice(0, 200)}\`
    );
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Malformed JSON response", {
      url,
      contentType,
      preview: text.slice(0, 500),
      length: text.length,
      error: error instanceof Error ? error.message : String(error),
    });

    throw new Error("API returned malformed JSON", { cause: error });
  }
}`}
            </pre>
          </div>
        </div>

        <p>
          This pattern also avoids a common misconception: <code>response.json()</code> parses the body as JSON, but it
          does not act as a full contract check for you. If the server sends HTML with a misleading header, you still
          need your own guardrails.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Handling Invalid Numbers Like NaN or Infinity</h2>
        <p>
          This is one of the highest-intent failure modes for this page. Strict JSON does not allow <code>NaN</code>,
          <code>Infinity</code>, or <code>-Infinity</code>. If an upstream API sends those tokens,
          a strict parser will reject the payload even if the rest of the document looks fine.
        </p>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Recommended order of operations</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            Fix the producer first. If you do not control the upstream API and the bad numeric tokens are a known,
            documented defect, isolate the cleanup step and make the transformation explicit. Do not silently repair
            arbitrary untrusted payloads.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Sanitizing non-finite numbers in a trusted partner payload:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function replaceNonFiniteNumbers(jsonText) {
  let result = "";
  let inString = false;
  let escaping = false;

  for (let i = 0; i < jsonText.length; ) {
    const char = jsonText[i];

    if (inString) {
      result += char;

      if (char === '"' && !escaping) {
        inString = false;
      }

      const isBackslash = char.charCodeAt(0) === 92;
      escaping = isBackslash && !escaping;

      if (!isBackslash) {
        escaping = false;
      }

      i += 1;
      continue;
    }

    if (char === '"') {
      inString = true;
      result += char;
      i += 1;
      continue;
    }

    if (jsonText.startsWith("-Infinity", i)) {
      result += "null";
      i += 9;
      continue;
    }

    if (jsonText.startsWith("Infinity", i)) {
      result += "null";
      i += 8;
      continue;
    }

    if (jsonText.startsWith("NaN", i)) {
      result += "null";
      i += 3;
      continue;
    }

    result += char;
    i += 1;
  }

  return result;
}

function parseKnownBadPartnerJson(jsonText) {
  const normalized = replaceNonFiniteNumbers(jsonText);
  return JSON.parse(normalized);
}`}
            </pre>
          </div>
        </div>

        <p>
          Replacing invalid numeric tokens with <code>null</code> is only one possible policy. In some systems you may
          want to reject the payload instead, map those values to strings, or drop the affected records entirely. The
          important part is to make that policy visible and test it.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Retry, Repair, or Fail Fast?</h2>
        <p>
          Different malformed responses deserve different handling. A single catch block is not enough if you want a
          predictable client.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Retry:</strong> Good for truncated responses, upstream 502/503/504 errors, or empty bodies from
              flaky infrastructure. Use exponential backoff and stick to idempotent requests unless you have stronger
              guarantees.
            </li>
            <li>
              <strong>Fail fast:</strong> Best when you got an HTML login page, an authorization error, or the wrong
              endpoint entirely. Repairing those responses hides the real problem.
            </li>
            <li>
              <strong>Repair in quarantine:</strong> Acceptable for a known partner bug such as bare
              <code>NaN</code> values, but keep the fix narrow and heavily logged.
            </li>
            <li>
              <strong>Graceful fallback:</strong> Useful for UI screens that can render cached data or a partial state
              while the bad response is investigated.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Validate the Shape After Parsing</h2>
        <p>
          Parsing success only means the text was valid JSON. It does not mean the payload matches your contract. Add
          schema validation immediately after parsing so that syntax problems and contract drift stay separate.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Shape validation example with Zod:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { z } from "zod";

const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().nullable(),
  currency: z.string().length(3),
});

async function fetchProduct(productId) {
  const json = await fetchJsonSafely(\`/api/products/\${productId}\`);
  const result = ProductSchema.safeParse(json);

  if (!result.success) {
    console.error("JSON shape mismatch", result.error.flatten());
    throw new Error("API response shape is invalid");
  }

  return result.data;
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Log Enough to Debug the Upstream Problem</h2>
        <p>
          The best malformed-JSON logging gives you enough context to fix the producer without dumping sensitive data
          into logs.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>Request URL and HTTP method</li>
            <li>Status code and <code>Content-Type</code></li>
            <li>Correlation or request ID headers</li>
            <li>A short response preview, capped to a safe length</li>
            <li>Body length and parse error message</li>
            <li>A redaction strategy for tokens, email addresses, or payment data</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The practical fix for malformed API JSON is not "just add try/catch." Start by separating transport checks
          from parsing, then decide explicitly whether a bad response should be retried, rejected, or narrowly
          sanitized. That keeps temporary outages from looking like data bugs and keeps data bugs from turning into
          silent corruption.
        </p>

        <p>
          If you only change one thing, make it this: capture the raw body text for bad responses before parsing, then
          validate the parsed result against a schema. That one shift makes malformed JSON far easier to diagnose and
          much safer to handle.
        </p>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

/**
 * Metadata for JSON formatter article about malformed JSON in API responses
 */
export const metadata: Metadata = {
  title: "Malformed JSON in API Responses: Handling Strategies | Offline Tools",
  description: "Develop robust strategies for handling malformed JSON in API responses to prevent errors and improve application reliability.",
};

/**
 * Article page component for handling malformed JSON in API responses
 */
export default function MalformedJsonInApiResponsesArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <div className="max-w-3xl mx-auto">
        <ArticlePromo />
        
        <h1 className="text-3xl font-bold mb-6">Malformed JSON in API Responses: Handling Strategies</h1>
        
        <div className="space-y-6">
          <p>
            When working with APIs, you&apos;ll inevitably encounter malformed JSON responses.
            Whether due to server-side bugs, network issues, or third-party integration problems,
            these invalid responses can crash your application if not handled properly.
            This article explores robust strategies for detecting, handling, and recovering
            from malformed JSON in API responses.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Why API Responses Return Malformed JSON</h2>
          <p>
            Understanding the root causes of malformed JSON can help you implement more effective
            handling strategies. Here are some common reasons why APIs might return invalid JSON:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Server-side errors:</strong> Bugs in API code that generate syntactically invalid JSON</li>
              <li><strong>Partial responses:</strong> Network interruptions causing incomplete JSON fragments</li>
              <li><strong>Character encoding issues:</strong> Mismatched encoding between server and client</li>
              <li><strong>Serialization problems:</strong> Custom serializers that produce invalid JSON</li>
              <li><strong>Mixing content types:</strong> Servers returning HTML or text error pages with HTTP 200 status</li>
              <li><strong>Unescaped characters:</strong> Special characters not properly escaped in strings</li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Common Types of Malformed JSON in APIs</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Syntax Errors</h3>
          <p>
            Basic syntax errors are the most common form of malformed JSON in API responses.
            These include missing commas, unbalanced brackets, and invalid escape sequences.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Example of Syntax Error:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "user": {
    "id": 123,
    "name": "John Doe"
    "email": "john@example.com"
  }
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Missing comma after the name field</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Truncated Responses</h3>
          <p>
            Network issues or server timeouts can lead to incomplete JSON responses, where the
            content is cut off before the full structure is delivered.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Example of Truncated Response:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "results": [
    {"id": 1, "name": "Product A"},
    {"id": 2, "name": "Product B"},
    {"id": 3, "na`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Response was truncated in the middle of the third item</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">3. Mixed Content Types</h3>
          <p>
            Sometimes APIs return non-JSON content with a JSON content type, especially during error
            conditions when HTML error pages might be returned instead of proper JSON error responses.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Example of Mixed Content:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`<!DOCTYPE html>
<html>
<head>
  <title>Internal Server Error</title>
</head>
<body>
  <h1>500 - Internal Server Error</h1>
  <p>The server encountered an unexpected condition that prevented it from fulfilling the request.</p>
</body>
</html>`}
              </pre>
            </div>
            <p className="mt-2 text-sm">HTML error page returned instead of JSON</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">4. Character Encoding Issues</h3>
          <p>
            Problems with character encoding can lead to invalid characters appearing in JSON strings,
            breaking the JSON syntax. This is particularly common with multi-byte character sets.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Example with Encoding Issue:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "message": "Hello, this text contains a  character that isn't properly encoded"
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Robust Handling Strategies</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Basic Try-Catch Approach</h3>
          <p>
            The simplest approach is to wrap your JSON parsing in a try-catch block to prevent
            unhandled exceptions from crashing your application.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">JavaScript Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`async function fetchData(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    
    try {
      // Attempt to parse the response as JSON
      const data = JSON.parse(text);
      return data;
    } catch (error) {
      // Handle JSON parsing error
      console.error("Failed to parse JSON response:", error);
      // Return a default value or throw a custom error
      return { error: "Invalid response format", details: text.substring(0, 100) };
    }
  } catch (error) {
    // Handle network or other fetch errors
    console.error("API request failed:", error);
    throw error;
  }
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Content Type Validation</h3>
          <p>
            Before attempting to parse a response as JSON, check the Content-Type header to ensure
            you&apos;re receiving the expected format. This can help identify mixed content issues early.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Content Type Checking Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`async function fetchJson(url) {
  const response = await fetch(url);
  
  // Check content type before parsing
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(
      \`Expected JSON but received \${contentType || "unknown"} content type\`
    );
  }
  
  try {
    return await response.json();
  } catch (error) {
    console.error("Invalid JSON response:", error);
    throw new Error("Failed to parse JSON response");
  }
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">3. Implementing JSON Repair</h3>
          <p>
            For non-critical applications, you might consider using JSON repair libraries
            that attempt to fix common syntax errors in malformed JSON.
          </p>
          
          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Caution:</h3>
            <p className="mt-2 text-yellow-700 dark:text-yellow-200">
              JSON repair should be used cautiously, as it can potentially alter the meaning of the data.
              It&apos;s generally safer for development/debugging than for production systems handling sensitive data.
            </p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">JSON Repair Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`// Using a hypothetical JSON repair library
import jsonRepair from 'json-repair-library';

async function fetchWithRepair(url) {
  const response = await fetch(url);
  const text = await response.text();
  
  try {
    // Try standard parsing first
    return JSON.parse(text);
  } catch (error) {
    console.warn("Attempting to repair malformed JSON");
    
    // Attempt to repair the JSON
    const repaired = jsonRepair(text);
    
    try {
      // Try parsing the repaired JSON
      return JSON.parse(repaired);
    } catch (repairError) {
      // If repair also fails, throw a comprehensive error
      console.error("JSON repair failed:", repairError);
      throw new Error("Could not parse or repair JSON response");
    }
  }
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">4. Schema Validation</h3>
          <p>
            Even if the JSON is syntactically valid, it might not match the expected structure.
            Implementing schema validation ensures that the parsed data conforms to your application&apos;s requirements.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Schema Validation Example (using Zod):</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`import { z } from 'zod';

// Define the expected schema
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
  lastLogin: z.string().datetime().optional()
});

async function fetchUser(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);
  
  try {
    const data = await response.json();
    
    // Validate the response against the schema
    const validatedUser = UserSchema.parse(data);
    return validatedUser;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("API response doesn't match expected schema:", error.issues);
      throw new Error("Invalid user data structure");
    }
    
    console.error("Failed to parse JSON:", error);
    throw new Error("Invalid JSON response");
  }
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">5. Fallback Values and Graceful Degradation</h3>
          <p>
            Implement a system of fallbacks that allows your application to continue functioning
            even when API responses are malformed, providing a degraded but still usable experience.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Fallback Strategy Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`async function fetchProductDetails(productId) {
  try {
    const response = await fetch(\`/api/products/\${productId}\`);
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    
    // Return cached data if available
    const cachedProduct = getFromCache(\`product_\${productId}\`);
    if (cachedProduct) {
      console.log("Using cached product data as fallback");
      return { ...cachedProduct, _fromCache: true };
    }
    
    // Or return minimum viable data to prevent UI breaks
    return {
      id: productId,
      name: "Product information unavailable",
      price: null,
      _error: true,
      _errorMessage: "Could not load product details"
    };
  }
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">6. Retry Mechanisms</h3>
          <p>
            Implement exponential backoff retry strategies for handling transient errors in API responses,
            particularly for truncated responses that might be caused by network issues.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Retry Implementation Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`async function fetchWithRetry(url, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.warn(\`Attempt \${attempt + 1} failed: \${error.message}\`);
      lastError = error;
      
      if (attempt < maxRetries - 1) {
        // Exponential backoff with jitter
        const delay = Math.min(1000 * 2 ** attempt, 10000) + Math.random() * 1000;
        console.log(\`Retrying in \${delay}ms...\`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new Error(\`All \${maxRetries} attempts failed: \${lastError.message}\`);
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Advanced Error Handling Patterns</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Error Boundaries (React Example)</h3>
          <p>
            In React applications, implement error boundaries to prevent the entire UI from crashing
            when a component encounters a JSON parsing error.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">React Error Boundary Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`// ErrorBoundary component
class ApiErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("API data rendering failed:", error, errorInfo);
    // Optionally report to error monitoring service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong with this section.</h2>
          <p>The data could not be displayed properly.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function ProductPage({ productId }) {
  return (
    <div>
      <Header />
      <ApiErrorBoundary>
        <ProductDetails id={productId} />
      </ApiErrorBoundary>
      <RelatedProducts id={productId} />
      <Footer />
    </div>
  );
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Circuit Breaker Pattern</h3>
          <p>
            Implement the circuit breaker pattern to temporarily disable API calls that consistently
            return malformed responses, preventing cascading failures and allowing systems to recover.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Circuit Breaker Implementation:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`class ApiCircuitBreaker {
  constructor(failureThreshold = 5, resetTimeout = 30000) {
    this.failureThreshold = failureThreshold;
    this.resetTimeout = resetTimeout;
    this.failureCount = 0;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }

  async executeRequest(requestFn) {
    if (this.state === 'OPEN') {
      if (Date.now() > this.nextAttempt) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is open - request rejected');
      }
    }

    try {
      const result = await requestFn();
      
      // Reset on success if in HALF_OPEN state
      if (this.state === 'HALF_OPEN') {
        this.reset();
      }
      
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }

  recordFailure() {
    this.failureCount++;
    
    if (this.failureCount >= this.failureThreshold || this.state === 'HALF_OPEN') {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.resetTimeout;
    }
  }

  reset() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
}

// Usage example
const userApiBreaker = new ApiCircuitBreaker();

async function fetchUserSafely(userId) {
  return userApiBreaker.executeRequest(async () => {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error(\`HTTP error: \${response.status}\`);
    
    const data = await response.json();
    return data;
  });
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Monitoring and Prevention</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Client-Side Logging</h3>
          <p>
            Implement comprehensive logging for JSON parsing errors to help identify patterns
            and root causes of malformed responses.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Enhanced Error Logging:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`function logJsonError(url, responseText, error) {
  console.error("JSON parsing error:", {
    url,
    error: error.message,
    stackTrace: error.stack,
    responsePreview: responseText.substring(0, 500),
    responseLength: responseText.length,
    timestamp: new Date().toISOString()
  });
  
  // Send to your error tracking service
  errorTrackingService.captureException(error, {
    extra: {
      url,
      responsePreview: responseText.substring(0, 500)
    },
    tags: {
      errorType: 'json_parse_error'
    }
  });
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Server-Side Solutions</h3>
          <p>
            If you control the API, implement server-side preventive measures to ensure valid JSON is always returned.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <ul className="list-disc ml-6 space-y-2">
              <li>Use dedicated serialization libraries with robust error handling</li>
              <li>Implement JSON schema validation before sending responses</li>
              <li>Add middleware to catch exceptions and return proper JSON error responses</li>
              <li>Ensure consistent character encoding (UTF-8) in all responses</li>
              <li>Set appropriate Content-Type headers (application/json)</li>
              <li>Test API responses with malformed input data</li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Real-world Case Studies</h2>
          
          <h3 className="text-xl font-medium mt-6">Case Study 1: E-commerce Product Catalog</h3>
          <p>
            An e-commerce application was experiencing intermittent crashes when displaying product details.
            Investigation revealed that certain product descriptions contained unescaped special characters
            that broke JSON syntax. The team implemented the following solution:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <ol className="list-decimal ml-6 space-y-2">
              <li>Added try-catch blocks around JSON parsing in the product details component</li>
              <li>Implemented schema validation to ensure product data met expected format</li>
              <li>Created fallback UI components that displayed minimal product information when full data couldn&apos;t be parsed</li>
              <li>Added server-side validation to catch and escape problematic characters before sending responses</li>
              <li>Set up monitoring to track and alert on JSON parsing failures</li>
            </ol>
            <p className="mt-2">Result: Application crashes were eliminated, and the team could proactively address data quality issues.</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">Case Study 2: Third-party API Integration</h3>
          <p>
            A financial application integrating with a third-party payment gateway occasionally received malformed
            JSON responses during high-traffic periods. Since they couldn&apos;t modify the third-party API, they implemented:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <ol className="list-decimal ml-6 space-y-2">
              <li>Exponential backoff retry mechanism specifically for JSON parsing errors</li>
              <li>Circuit breaker pattern to temporarily disable the problematic API endpoint during outages</li>
              <li>Local caching of payment status information to reduce API calls</li>
              <li>Dual validation approach: both HTTP status code and response body structure validation</li>
              <li>Graceful degradation to a secondary payment provider when the primary API consistently failed</li>
            </ol>
            <p className="mt-2">Result: The application maintained 99.9% availability despite the occasional API issues.</p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p>
            Handling malformed JSON in API responses is an essential aspect of building robust applications.
            By implementing the strategies outlined in this article—from basic try-catch blocks to advanced
            patterns like circuit breakers—you can significantly improve your application&apos;s resilience
            against API failures.
          </p>
          
          <p>
            Remember that the best approach often combines multiple strategies tailored to your specific
            application needs and risk tolerance. Proper error handling not only prevents crashes but
            also enhances user experience by providing graceful degradation when things go wrong.
          </p>
          
          <p>
            Finally, don&apos;t neglect monitoring and logging—they provide invaluable insights for
            addressing the root causes of malformed JSON issues, helping you move from reactive
            handling to proactive prevention.
          </p>
        </div>
        
        <div className="mt-10">
          <ArticlePromo />
        </div>
      </div>
    </ArticlePromoProvider>
  );
} 
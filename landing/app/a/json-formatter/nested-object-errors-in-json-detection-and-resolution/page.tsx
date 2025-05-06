import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

/**
 * Metadata for JSON formatter article about nested object errors
 */
export const metadata: Metadata = {
  title: "Nested Object Errors in JSON: Detection and Resolution | Offline Tools",
  description: "Learn how to identify, troubleshoot and fix errors in deeply nested JSON objects for smoother data processing and validation.",
};

/**
 * Article page component for nested object errors in JSON
 */
export default function NestedObjectErrorsArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <div className="max-w-3xl mx-auto">
        <ArticlePromo />
        
        <h1 className="text-3xl font-bold mb-6">Nested Object Errors in JSON: Detection and Resolution</h1>
        
        <div className="space-y-6">
          <p>
            Complex JSON structures often contain deeply nested objects, which can be breeding grounds for subtle syntax errors.
            These errors can be particularly challenging to identify and fix due to the hierarchical nature of the data.
            In this article, we&apos;ll explore common nested object errors in JSON and provide effective strategies for detecting and resolving them.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Understanding Nested Objects in JSON</h2>
          <p>
            Nested objects in JSON are objects contained within other objects, creating a hierarchical structure.
            They&apos;re represented using curly braces and can be nested to arbitrary depths, though extremely deep nesting
            can lead to readability and maintenance issues.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Example of Valid Nested JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "user": {
    "personal": {
      "name": "John Doe",
      "age": 30,
      "contact": {
        "email": "john@example.com",
        "phone": {
          "home": "555-1234",
          "mobile": "555-5678"
        }
      }
    },
    "preferences": {
      "theme": "dark",
      "notifications": {
        "email": true,
        "push": false
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Common Nested Object Errors</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Mismatched Braces</h3>
          <p>
            The most frequent error in nested objects is mismatched braces. As nesting gets deeper, it becomes
            increasingly difficult to ensure that each opening brace has a corresponding closing brace.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "settings": {
    "display": {
      "resolution": "1080p",
      "brightness": 80
    },
    "audio": {
      "volume": 70,
      "bass": 50
    }
  }
`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Missing closing brace for the root object</p>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "settings": {
    "display": {
      "resolution": "1080p",
      "brightness": 80
    },
    "audio": {
      "volume": 70,
      "bass": 50
    }
  }
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Missing or Extra Commas in Nested Structures</h3>
          <p>
            Comma errors are particularly common in nested objects. Each key-value pair should be followed by a comma,
            except for the last one in each object. Deeply nested structures make it easy to overlook these errors.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "product": {
    "details": {
      "name": "Smartphone",
      "brand": "TechCo"
      "price": 599.99,
      "specs": {
        "cpu": "Octa-core",
        "ram": "8GB",
        "storage": "128GB",
      }
    }
  }
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Missing comma after &quot;brand&quot;: &quot;TechCo&quot; and extra comma after &quot;storage&quot;: &quot;128GB&quot;</p>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "product": {
    "details": {
      "name": "Smartphone",
      "brand": "TechCo",
      "price": 599.99,
      "specs": {
        "cpu": "Octa-core",
        "ram": "8GB",
        "storage": "128GB"
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">3. Incorrect Value Types in Nested Objects</h3>
          <p>
            When dealing with complex data structures, it&apos;s easy to inadvertently use inconsistent value types
            across similar fields. This can cause validation errors and data processing issues.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "metrics": {
    "views": 1024,
    "likes": "512",
    "shares": 256,
    "comments": {
      "count": "128",
      "average_length": 42
    }
  }
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Inconsistent value types: numbers as strings</p>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "metrics": {
    "views": 1024,
    "likes": 512,
    "shares": 256,
    "comments": {
      "count": 128,
      "average_length": 42
    }
  }
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Effective Detection Strategies</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Using Line Numbers and Indentation</h3>
          <p>
            Well-formatted JSON with consistent indentation makes it easier to spot nesting issues.
            Most JSON formatters provide line numbers, which are invaluable for locating errors in complex structures.
          </p>
          
          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Pro Tip:</h3>
            <p className="mt-2 text-yellow-700 dark:text-yellow-200">
              When you encounter a JSON parsing error, pay attention to the line number in the error message.
              The actual error often occurs earlier in the document, especially with nested structures.
            </p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Bracket Pair Highlighting</h3>
          <p>
            Many modern text editors and JSON tools offer bracket pair highlighting, which helps visualize 
            the matching pairs of braces. This feature is particularly useful for deeply nested objects.
          </p>
          
          <h3 className="text-xl font-medium mt-6">3. Incremental Validation</h3>
          <p>
            For complex JSON structures, validate incrementally by building up the JSON object level by level.
            This approach makes it easier to isolate and fix errors in specific nested objects.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Incremental Validation Example:</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Validate the innermost object first</li>
              <li>Add the parent object and validate again</li>
              <li>Continue working outward until the entire structure is validated</li>
            </ol>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Resolution Techniques</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Brace Counting</h3>
          <p>
            A simple yet effective technique for finding mismatched braces is to count the opening and closing braces.
            They should be equal for valid JSON. While manual counting works for small documents, use automated tools for larger ones.
          </p>
          
          <h3 className="text-xl font-medium mt-6">2. JSON Path Analysis</h3>
          <p>
            When dealing with deeply nested structures, use JSON path to navigate to the problematic section.
            This approach allows you to focus on one part of the structure at a time.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">JSON Path Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`$.user.personal.contact.phone  // Points to the phone object`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">3. Schema Validation</h3>
          <p>
            For complex JSON structures, consider using JSON Schema to define and validate the expected structure.
            This approach can catch not only syntax errors but also structural and type errors in nested objects.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Simple JSON Schema Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "type": "object",
  "properties": {
    "user": {
      "type": "object",
      "properties": {
        "personal": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "age": { "type": "number" }
          },
          "required": ["name"]
        }
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Real-World Example: API Configuration</h2>
          <p>
            Consider this complex API configuration with multiple nested objects. Several common errors
            have been introduced. Can you spot them?
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic Configuration:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "api_config": {
    "endpoints": {
      "users": {
        "url": "/api/users",
        "methods": ["GET", "POST", "PUT"],
        "rate_limits": {
          "per_second": 10
          "per_minute": 100
        }
      },
      "products": {
        "url": "/api/products",
        "methods": ["GET",
        "rate_limits": {
          "per_second": 20,
          "per_minute": 200,
        }
      }
    },
    "auth": {
      "type": "oauth2",
      "credentials": {
        "client_id": "abc123",
        "client_secret": "xyz789"
      },
      "scopes": ["read", "write"]
    }
  }
}`}
              </pre>
            </div>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected Configuration:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "api_config": {
    "endpoints": {
      "users": {
        "url": "/api/users",
        "methods": ["GET", "POST", "PUT"],
        "rate_limits": {
          "per_second": 10,
          "per_minute": 100
        }
      },
      "products": {
        "url": "/api/products",
        "methods": ["GET"],
        "rate_limits": {
          "per_second": 20,
          "per_minute": 200
        }
      }
    },
    "auth": {
      "type": "oauth2",
      "credentials": {
        "client_id": "abc123",
        "client_secret": "xyz789"
      },
      "scopes": ["read", "write"]
    }
  }
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Errors fixed: Missing comma after &quot;per_second&quot;: 10, unclosed array for &quot;methods&quot; in products, and trailing comma after &quot;per_minute&quot;: 200</p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p>
            Nested object errors in JSON can be challenging to detect and resolve, but with the right tools and techniques, 
            you can efficiently identify and fix these issues. Using proper indentation, bracket pair highlighting, 
            incremental validation, and JSON schema validation will help ensure that your complex JSON structures are valid 
            and error-free.
          </p>
          
          <p>
            Remember that prevention is always better than cure. Adopting good practices like consistent formatting and 
            regular validation during development will save you time and effort in debugging complex JSON structures.
          </p>
        </div>
        
        <div className="mt-10">
          <ArticlePromo />
        </div>
      </div>
    </ArticlePromoProvider>
  );
} 
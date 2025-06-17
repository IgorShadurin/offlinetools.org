import type { Metadata } from "next";
import { CreditCard, CheckCircle, XCircle, Lock, Code, Info, ArrowRight, Layers, FileJson } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Gateway Integration Using JSON Formatters | Developer Guide",
  description:
    "A comprehensive guide for developers integrating payment gateways using JSON for data formatting and exchange.",
};

export default function PaymentGatewayJsonPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <CreditCard className="mr-3 h-8 w-8 text-blue-600" /> Payment Gateway Integration with JSON Formatters
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Info className="mr-2 h-6 w-6 text-blue-500" /> Introduction
          </h2>
          <p className="text-lg leading-relaxed">
            Integrating a payment gateway is a crucial step for any e-commerce or online service platform. It enables
            businesses to securely accept payments from customers. While various communication protocols and data
            formats exist, JSON (JavaScript Object Notation) has become the de facto standard for modern web APIs,
            including those offered by payment gateways. Its lightweight nature, human-readability, and ease of parsing
            across different programming languages make it an ideal choice for structuring the data exchanged between
            your application and the gateway.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Layers className="mr-2 h-6 w-6 text-blue-500" /> Why JSON for Gateway Communication?
          </h2>
          <p className="text-lg leading-relaxed">
            JSON offers several advantages that align well with the requirements of payment gateway integrations:
          </p>
          <ul className="list-disc pl-6 space-y-3 mt-4 text-lg leading-relaxed">
            <li>
              <strong>Simplicity and Readability:</strong> JSON&apos;s key-value pair structure is intuitive and easy
              for developers to understand and debug.
            </li>
            <li>
              <strong>Language Agnostic:</strong> Most programming languages have built-in support or readily available
              libraries for parsing and generating JSON.
            </li>
            <li>
              <strong>Lightweight:</strong> Compared to XML, JSON has less overhead, resulting in smaller data payloads
              and faster communication.
            </li>
            <li>
              <strong>Flexibility:</strong> It easily represents complex data structures, including nested objects and
              arrays, necessary for various payment details and responses.
            </li>
            <li>
              <strong>Widespread Adoption:</strong> It&apos;s the standard for RESTful APIs, which most modern payment
              gateways provide.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 h-6 w-6 text-blue-500" /> JSON Formatters in Action
          </h2>
          <p className="text-lg leading-relaxed">
            In JavaScript/TypeScript environments like Next.js, the primary tools for working with JSON are the built-in
            `JSON` object&apos;s methods:
          </p>
          <ul className="list-disc pl-6 space-y-3 mt-4 text-lg leading-relaxed">
            <li>
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
                JSON.stringify()
              </code>
              : Converts a JavaScript object or value into a JSON string. This is essential when preparing data to send
              to the payment gateway API.
            </li>
            <li>
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">JSON.parse()</code>:
              Parses a JSON string, converting it back into a JavaScript object or value. This is used when processing
              the response received from the payment gateway.
            </li>
          </ul>
          <p className="text-lg leading-relaxed mt-4">
            As this page is focused on the Next.js backend (no{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
              &quot;use client&quot;
            </code>
            ), these operations will typically occur within API routes or server-side functions where you handle the
            communication with the external gateway API.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileJson className="mr-2 h-6 w-6 text-blue-500" /> Common JSON Structures (Examples)
          </h2>
          <p className="text-lg leading-relaxed">
            While specific fields vary between gateways, the overall structure for requests and responses is often
            similar.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
            <ArrowRight className="mr-2 h-5 w-5 text-blue-400" /> Request Payload (Example: Creating a Charge)
          </h3>
          <p className="text-lg leading-relaxed">
            You assemble a JavaScript object with the required payment details and use{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">JSON.stringify()</code>{" "}
            to send it in the request body (usually with the{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
              Content-Type: application/json
            </code>{" "}
            header).
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm mt-4 overflow-x-auto">
            <pre>
              {`// Example JavaScript object representing the request payload
const paymentRequestData = {
  amount: 1999, // Amount in cents (e.g., $19.99)
  currency: "USD",
  payment_method_id: "pm_card_visa", // Tokenized payment method ID
  description: "Order #12345",
  capture_method: "automatic", // or "manual"
  customer: {
    id: "cust_abc123",
    name: "Jane Doe",
    email: "jane.doe@example.com"
  },
  metadata: { // Optional data for your records
    order_id: "ORD_XYZ789",
    product_sku: "A45B6"
  }
};

// Convert object to JSON string for sending
const jsonPayload = JSON.stringify(paymentRequestData);

// Example (Conceptual Fetch on server-side):
// try {
//   const response = await fetch("https://api.payment-gateway.com/v1/charges", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": \`Bearer \${process.env.GATEWAY_SECRET_KEY}\`
//     },
//     body: jsonPayload
//   });
//   // Process response below
// } catch (error) {
//   console.error("Payment request failed:", error);
//   // Handle network or request error
// }
`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
            <ArrowRight className="mr-2 h-5 w-5 text-blue-400" /> Response Payload (Example: Successful Charge)
          </h3>
          <p className="text-lg leading-relaxed">
            Upon receiving the JSON response from the gateway, you use{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">JSON.parse()</code> to
            convert the string back into a usable JavaScript object.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm mt-4 overflow-x-auto">
            <pre>
              {`// Example JSON string received from gateway
const jsonResponseString = \`{
  "id": "ch_abc987",
  "amount": 1999,
  "currency": "USD",
  "status": "succeeded", // Key indicator
  "created": 1678886400, // Timestamp
  "description": "Order #12345",
  "livemode": false,
  "paid": true,
  "metadata": {
    "order_id": "ORD_XYZ789",
    "product_sku": "A45B6"
  },
  // ... other relevant fields
}\`;

// Convert JSON string to JavaScript object
try {
  const responseData = JSON.parse(jsonResponseString);

  // Access data as a standard object
  if (responseData.status === "succeeded") {
    console.log("Payment successful! Transaction ID:", responseData.id);
    // Update your database, fulfill the order, etc.
  } else {
    console.log("Payment status:", responseData.status);
    // Handle other statuses like "pending", "failed"
    // For "failed", look for an "error" object
  }
} catch (error) {
  console.error("Failed to parse gateway response:", error);
  // Handle invalid JSON response
}
`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <XCircle className="mr-2 h-6 w-6 text-red-500" /> Handling Errors with JSON
          </h2>
          <p className="text-lg leading-relaxed">
            Payment gateways typically communicate errors using specific HTTP status codes (e.g., 400 Bad Request, 401
            Unauthorized, 402 Payment Required, 404 Not Found, 500 Internal Server Error) and provide detailed error
            information in the JSON response body.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
            <ArrowRight className="mr-2 h-5 w-5 text-blue-400" /> Error Response Example
          </h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm mt-4 overflow-x-auto">
            <pre>
              {`// Example JSON string for a failed payment response
const jsonErrorResponseString = \`{
  "error": {
    "type": "card_error",
    "code": "incorrect_cvc",
    "message": "The card's security code is incorrect.",
    "param": "cvc", // The field causing the error
    "charge": "ch_failed_xyz" // Optional: ID of the failed attempt
  }
}\`;

try {
  const errorResponseData = JSON.parse(jsonErrorResponseString);

  if (errorResponseData.error) {
    console.error("Payment failed:", errorResponseData.error.message);
    console.error("Error code:", errorResponseData.error.code);
    // Display user-friendly error message based on code/type
  } else {
    // This might be an unexpected response format, handle as generic error
    console.error("Received non-error JSON response with HTTP error status:", errorResponseData);
  }
} catch (error) {
  console.error("Failed to parse error response:", error);
}
`}
            </pre>
          </div>
          <p className="text-lg leading-relaxed mt-4">
            Always check the HTTP status code first. If it&apos;s not a 2xx success code, parse the body (which is often
            still JSON) to get specific error details using{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">JSON.parse()</code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Lock className="mr-2 h-6 w-6 text-blue-500" /> Security Considerations
          </h2>
          <p className="text-lg leading-relaxed">
            While JSON is excellent for data structure, it doesn&apos;t inherently provide security. Security in payment
            gateway integration relies on several layers:
          </p>
          <ul className="list-disc pl-6 space-y-3 mt-4 text-lg leading-relaxed">
            <li>
              <strong>HTTPS:</strong> Always communicate with the payment gateway API over HTTPS to ensure the data
              (including your JSON payload) is encrypted in transit.
            </li>
            <li>
              <strong>Tokenization:</strong> Never handle raw sensitive payment details (like full credit card numbers)
              on your server if possible. Use client-side libraries provided by the gateway to tokenize the card
              details, receiving a token that you then send in your JSON request instead of the raw data.
            </li>
            <li>
              <strong>API Keys/Authentication:</strong> Authenticate your requests using secret keys or tokens provided
              by the gateway, sent securely (e.g., in the{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">Authorization</code>{" "}
              header).
            </li>
            <li>
              <strong>Input Validation:</strong> Before formatting your data into JSON, validate all input received from
              the client-side on your server.
            </li>
          </ul>
          <p className="text-lg leading-relaxed mt-4">
            Using{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">JSON.stringify()</code>{" "}
            and <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">JSON.parse()</code>{" "}
            are standard practices, but they operate on data *after* it has been prepared for transmission (e.g.,
            tokenized) and *before* it is used within your application logic.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <CheckCircle className="mr-2 h-6 w-6 text-green-500" /> Conclusion
          </h2>
          <p className="text-lg leading-relaxed">
            Integrating payment gateways using JSON formatters is a standard and efficient approach in modern web
            development, particularly in backend environments like Next.js API routes. By understanding the common JSON
            structures for requests and responses, leveraging built-in functions like{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">JSON.stringify()</code>{" "}
            and <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">JSON.parse()</code>
            , and always prioritizing security best practices, developers can build robust and reliable payment
            processing flows. The flexibility and widespread support of JSON make it an excellent choice for handling
            the diverse data requirements of various payment methods and gateway APIs.
          </p>
        </section>
      </div>
    </div>
  );
}

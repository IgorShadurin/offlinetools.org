import type { Metadata } from "next";
import { Zap, Cloud, MessageCircle, Scale, FileJson, Database, History, CheckCheck, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Event-Driven Architecture Evolution with JSON",
  description:
    "Explore the evolution of Event-Driven Architectures and the pivotal role JSON plays in defining, exchanging, and managing events.",
};

export default function EventDrivenArchitectureEvolutionWithJson() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Zap className="size-8 text-blue-500" />
        <span>Event-Driven Architecture Evolution with JSON</span>
      </h1>

      <div className="space-y-6">
        <p>
          In the world of modern software systems, achieving scalability, resilience, and flexibility is paramount.
          Event-Driven Architecture (EDA) has emerged as a powerful paradigm to meet these demands. At its core, EDA
          revolves around the concept of events &mdash; discrete, significant occurrences within a system. Components
          communicate not by making direct calls, but by producing and consuming these events.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Cloud className="size-6 text-green-500" />
          <span>What is Event-Driven Architecture?</span>
        </h2>
        <p>
          In an EDA, system components (often called services or microservices) operate independently. When something
          happens in one part of the system (e.g., a user registers, an order is placed), it emits an event. Other
          components that are interested in this specific type of event can subscribe to it and react accordingly.
        </p>
        <p>Key concepts include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Events:</strong> Immutable, factual records of something that happened. They typically describe the
            state change that occurred.
          </li>
          <li>
            <strong>Producers (Publishers):</strong> Components that generate and send events. They don't know or care
            which consumers will receive the event.
          </li>
          <li>
            <strong>Consumers (Subscribers):</strong> Components that listen for specific events and perform actions in
            response.
          </li>
          <li>
            <strong>Event Broker / Bus:</strong> An intermediary layer (like Kafka, RabbitMQ, AWS SQS/SNS) that receives
            events from producers and routes them to relevant consumers.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Conceptual Flow:</h3>
          <p className="font-mono text-sm">
            Producer <span className="text-yellow-500">&rarr;</span> Event Broker{" "}
            <span className="text-yellow-500">&rarr;</span> Consumer(s)
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileJson className="size-6 text-orange-500" />
          <span>JSON: The Universal Event Language</span>
        </h2>
        <p>
          While early distributed systems might have used custom binary formats or XML, JSON (JavaScript Object
          Notation) has become the de facto standard for event payloads in modern EDA. Its simplicity,
          human-readability, and native support in web technologies made it an ideal candidate for representing
          structured event data.
        </p>
        <p>A typical JSON event payload is a simple object describing the event:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: "User Registered" Event</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "eventType": "user.registered",
  "eventId": "a1b2c3d4-e5f6-7890-1234-abcdef123456",
  "timestamp": "2023-10-27T10:00:00Z",
  "data": {
    "userId": "user-789",
    "email": "user@example.com",
    "username": "new_user_123"
  },
  "metadata": {
    "sourceService": "auth-service",
    "version": "1.0"
  }
}`}
          </pre>
        </div>
        <p>
          This structure is flexible. The <code>data</code> field contains event-specific information, and
          <code>metadata</code> holds contextual details about the event itself.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <History className="size-6 text-purple-500" />
          <span>Evolution of JSON Usage in EDA</span>
        </h2>

        <h3 className="text-xl font-semibold mt-6">Phase 1: Simple Payloads (Early Days)</h3>
        <p>
          Initially, events might have carried minimal data, perhaps just an ID and event type, requiring consumers to
          call back to the source system to get the full state. JSON's initial role was just a convenient format for
          these simple messages.
        </p>

        <h3 className="text-xl font-semibold mt-6">Phase 2: Richer Payloads (JSON's Rise)</h3>
        <p>
          As JSON gained popularity, event payloads became richer, often including most or all relevant data related to
          the event occurrence. This reduced the need for consumers to call back, improving decoupling and reducing load
          on source systems. JSON's ability to easily represent nested objects and arrays was a key advantage here.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: "Order Placed" Event with Full Data</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "eventType": "order.placed",
  "eventId": "order-abc-123",
  "timestamp": "2023-10-27T10:05:00Z",
  "data": {
    "orderId": "order-abc-123",
    "userId": "user-789",
    "items": [
      { "itemId": "prod-A", "quantity": 2, "price": 10.50 },
      { "itemId": "prod-B", "quantity": 1, "price": 25.00 }
    ],
    "totalAmount": 46.00,
    "shippingAddress": {
      "street": "123 Event Lane",
      "city": "Asyncville"
      // ... other address details
    }
  },
  "metadata": {
    "sourceService": "order-service",
    "version": "1.1"
  }
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Scale className="size-6 text-yellow-500" />
          <span>Phase 3: Schema Management and Evolution</span>
        </h3>
        <p>
          As systems grow, event structures inevitably change. Adding new fields is common, but removing or changing
          field types can break existing consumers. This leads to the challenge of "Schema Evolution". JSON's flexible
          nature (it doesn't strictly enforce a schema at the message level) is both a blessing and a curse.
        </p>
        <p>Solutions emerged to manage JSON schema evolution:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Versioning:</strong> Including a version number in the event metadata allows consumers to know which
            version of the payload they are processing and adapt accordingly.
          </li>
          <li>
            <strong>Schema Registries:</strong> Centralized repositories for event schemas (defined using JSON Schema or
            similar specifications). Producers register schemas, and consumers retrieve them to validate and understand
            messages. This helps ensure backward and forward compatibility.
          </li>
          <li>
            <strong>Backward Compatibility:</strong> New versions must be readable by old consumers (e.g., only add
            optional fields).
          </li>
          <li>
            <strong>Forward Compatibility:</strong> Old versions must be readable by new consumers (new consumers must
            gracefully handle missing fields).
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Versioning for "User Updated" Event</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Version 1.0
{
  "eventType": "user.updated",
  "userId": "user-789",
  "data": {
    "email": "user.new@example.com"
  },
  "metadata": { "version": "1.0" }
}

// Version 1.1 (Added username field)
{
  "eventType": "user.updated",
  "userId": "user-789",
  "data": {
    "email": "user.new@example.com",
    "username": "updated_user_123"
  },
  "metadata": { "version": "1.1" }
}

// Consumer logic must handle different versions:
// if event.metadata.version == "1.0": process v1.0 data
// if event.metadata.version == "1.1": process v1.1 data (username might be undefined in v1.0)
`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Database className="size-6 text-blue-500" />
          <span>Phase 4: JSON in Event Sourcing &amp; CQRS</span>
        </h3>
        <p>
          JSON plays a crucial role in more advanced EDA patterns like Event Sourcing and Command Query Responsibility
          Segregation (CQRS).
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Event Sourcing:</strong> The application state is derived by replaying a sequence of immutable
            events. JSON is an excellent format for storing these individual events in an event store.
          </li>
          <li>
            <strong>CQRS:</strong> Separates read and write operations into different models. Events often serve as the
            mechanism to update the read model(s) based on changes in the write model. JSON is used for these update
            events.
          </li>
        </ul>
        <p>
          In these patterns, the evolution of JSON schemas for events becomes even more critical, as the event stream
          itself represents the primary source of truth. Compatibility across different versions of events is
          non-negotiable for rebuilding state.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CheckCheck className="size-6 text-green-600" />
          <span>Advantages of JSON in EDA</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Interoperability:</strong> Virtually every programming language has libraries to parse and generate
            JSON.
          </li>
          <li>
            <strong>Human-Readability:</strong> Easy for developers to understand and debug event payloads.
          </li>
          <li>
            <strong>Flexibility:</strong> Schemas can evolve more easily compared to rigid binary formats (though this
            requires careful management).
          </li>
          <li>
            <strong>Rich Data Types:</strong> Supports strings, numbers, booleans, arrays, and nested objects, suitable
            for most event data.
          </li>
          <li>
            <strong>Tooling:</strong> Extensive tooling exists for validating, transforming, and querying JSON.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <X className="size-6 text-red-500" />
          <span>Challenges of JSON in EDA</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Schema Evolution:</strong> As discussed, requires discipline (versioning, schema registries) to
            avoid breaking consumers.
          </li>
          <li>
            <strong>Verbosity:</strong> Can be larger than binary formats, which might impact performance/cost for
            high-throughput systems or limited bandwidth.
          </li>
          <li>
            <strong>Performance:</strong> Parsing/serialization might be slower than some binary formats, though often
            negligible compared to network latency or processing time.
          </li>
          <li>
            <strong>Lack of Strict Schema Enforcement (by default):</strong> Unlike formats like Protocol Buffers or
            Avro, JSON itself doesn't enforce a contract, pushing schema management to the application or tooling layer.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <MessageCircle className="size-6 text-cyan-500" />
          <span>Conclusion</span>
        </h2>
        <p>
          JSON has been instrumental in the widespread adoption and evolution of Event-Driven Architectures. Its
          simplicity and flexibility made it the ideal format for loosely coupled services to exchange information via
          events. While the initial ease of use can present challenges with schema evolution as systems mature,
          established patterns like versioning and schema registries provide effective ways to manage complexity. For
          most modern EDAs, JSON remains the preferred choice, balancing developer usability with the needs of
          distributed system communication. Understanding its strengths and weaknesses, particularly concerning schema
          management, is key to building robust and evolving event-driven systems.
        </p>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { Zap, Cloud, MessageCircle, Scale, FileJson, Database, History, CheckCheck, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Event-Driven Architecture Evolution with JSON and JSON Schema",
  description:
    "Learn how modern event-driven architecture uses JSON, JSON Schema, CloudEvents, and AsyncAPI to define stable event contracts and evolve them safely.",
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
          JSON is still the most common payload format in event-driven systems, but modern Event-Driven Architecture
          (EDA) is no longer just &quot;send some JSON to a broker.&quot; Teams now need explicit event contracts,
          compatibility rules, and documentation that survives service-by-service evolution. That is where JSON Schema
          becomes valuable: JSON remains the wire format, while JSON Schema defines what a valid event looks like.
        </p>
        <p>
          For a searcher looking for &quot;JSON Schema event driven architecture,&quot; the practical answer is this:
          use JSON for readable event payloads, JSON Schema for validation and compatibility, an envelope such as
          CloudEvents when events move across platforms, and AsyncAPI when you need machine-readable documentation of
          channels, operations, and message shapes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Cloud className="size-6 text-green-500" />
          <span>How JSON Fits Modern Event-Driven Systems</span>
        </h2>
        <p>
          In an EDA, services communicate by emitting facts about things that already happened, such as{" "}
          <code>order.created</code>, <code>invoice.paid</code>, or <code>user.email_changed</code>. JSON works well
          here because it is language-neutral, easy to inspect, and simple to move through brokers, queues, HTTP
          callbacks, and logs.
        </p>
        <p>In mature systems, JSON usually sits in a small stack of complementary standards:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>JSON:</strong> The serialized event body or payload.
          </li>
          <li>
            <strong>JSON Schema:</strong> The contract that validates structure, types, required fields, enums, and
            compatibility expectations.
          </li>
          <li>
            <strong>CloudEvents:</strong> A standardized envelope for attributes like event id, source, type, and time.
          </li>
          <li>
            <strong>AsyncAPI:</strong> A specification for documenting asynchronous APIs, channels, and message schemas.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Current Ecosystem Snapshot (March 11, 2026)</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>JSON Schema:</strong> the current published specification is Draft 2020-12.
            </li>
            <li>
              <strong>AsyncAPI:</strong> the current specification docs include version 3.1.0.
            </li>
            <li>
              <strong>CloudEvents:</strong> the latest stable spec tag is v1.0.2.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <History className="size-6 text-purple-500" />
          <span>How JSON Usage Evolved</span>
        </h2>
        <p>
          JSON adoption in EDA has gone through a few recognizable stages:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Stage 1: Thin events.</strong> Early systems often published only an id and type, forcing consumers
            to call the source service for the rest of the data.
          </li>
          <li>
            <strong>Stage 2: Rich domain events.</strong> Producers started including enough data for consumers to act
            without a callback, which improved decoupling and resilience.
          </li>
          <li>
            <strong>Stage 3: Contract-aware events.</strong> JSON Schema, schema registries, and CI checks became
            necessary once dozens of consumers depended on the same event stream.
          </li>
          <li>
            <strong>Stage 4: Standardized envelopes and docs.</strong> Today, teams often keep JSON for the payload,
            use CloudEvents for common metadata, and publish AsyncAPI documents for discovery and tooling.
          </li>
        </ul>
        <p>
          The important shift is that JSON is no longer treated as self-describing just because it is readable. In
          production EDA, readability is helpful, but contracts are what prevent accidental breakage.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileJson className="size-6 text-orange-500" />
          <span>Example: JSON Event Plus JSON Schema Contract</span>
        </h2>
        <p>
          A practical setup is to keep transport metadata in an envelope and validate the business payload with JSON
          Schema. The example below uses a CloudEvents-style envelope with JSON data.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example Event</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "specversion": "1.0",
  "id": "evt_20260311_001",
  "source": "urn:service:billing",
  "type": "invoice.paid",
  "time": "2026-03-11T10:15:00Z",
  "datacontenttype": "application/json",
  "subject": "invoice/inv_123",
  "data": {
    "invoiceId": "inv_123",
    "customerId": "cust_456",
    "amount": 129.99,
    "currency": "USD",
    "paidAt": "2026-03-11T10:14:57Z"
  }
}`}
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">JSON Schema for the Event Data</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://offlinetools.org/schemas/invoice-paid-data.schema.json",
  "title": "InvoicePaidData",
  "type": "object",
  "required": ["invoiceId", "customerId", "amount", "currency", "paidAt"],
  "properties": {
    "invoiceId": { "type": "string" },
    "customerId": { "type": "string" },
    "amount": { "type": "number", "minimum": 0 },
    "currency": { "type": "string", "minLength": 3, "maxLength": 3 },
    "paidAt": { "type": "string", "format": "date-time" }
  },
  "additionalProperties": false
}`}
          </pre>
        </div>
        <p>
          This separation is useful because the same payload schema can be reused across Kafka, RabbitMQ, SQS, SNS,
          webhooks, or HTTP ingestion endpoints while the envelope or transport binding changes around it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Scale className="size-6 text-yellow-500" />
          <span>Schema Evolution Rules That Actually Work</span>
        </h2>
        <p>
          Event schemas change. The safe question is not &quot;can I change this JSON?&quot; but &quot;will existing
          consumers still behave correctly after I deploy?&quot;
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Prefer additive changes:</strong> Add new optional fields before adding new required ones.
          </li>
          <li>
            <strong>Do not silently repurpose fields:</strong> Keeping the same field name but changing business meaning
            is often worse than a visible breaking change.
          </li>
          <li>
            <strong>Treat unknown fields as ignorable when possible:</strong> Consumers should usually be tolerant of
            additive producer changes.
          </li>
          <li>
            <strong>Version only when semantics break:</strong> If you must remove a field, change a type, or redefine
            an event meaning, create a new event type or a clearly versioned contract.
          </li>
          <li>
            <strong>Validate on the producer side too:</strong> Catching invalid events before they hit the broker is
            cheaper than discovering them in downstream consumers.
          </li>
          <li>
            <strong>Be careful with <code>format</code>:</strong> In JSON Schema Draft 2020-12, format vocabularies are
            split between annotation and assertion, so not every validator treats <code>date-time</code> or
            <code>email</code> as a hard failure unless that behavior is enabled.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Database className="size-6 text-blue-500" />
          <span>Where AsyncAPI and CloudEvents Help</span>
        </h2>
        <p>
          JSON Schema solves only one part of the problem: payload validation. Modern event platforms usually need
          another layer for shared metadata and another for system-wide documentation.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>CloudEvents:</strong> Gives you a portable envelope with standard attributes such as{" "}
            <code>id</code>, <code>source</code>, <code>type</code>, and <code>time</code>. That is especially
            helpful when the same event may appear in HTTP, serverless triggers, or broker integrations.
          </li>
          <li>
            <strong>AsyncAPI:</strong> Describes channels, operations, message bindings, and schemas, giving event-driven
            systems an equivalent to what OpenAPI does for REST.
          </li>
          <li>
            <strong>Schema registries or contract repositories:</strong> Store schemas in one place, enforce review, and
            let CI compare old and new contracts before deployment.
          </li>
        </ul>
        <p>
          A good mental model is: CloudEvents defines the outer event shape, JSON Schema validates the payload, and
          AsyncAPI documents how events move through the system.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CheckCheck className="size-6 text-green-600" />
          <span>When JSON Is the Right Choice</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Cross-language integration matters:</strong> JSON is the easiest format to inspect and produce in
            almost every stack.
          </li>
          <li>
            <strong>Developers need fast debugging:</strong> Pretty-printed JSON is much easier to inspect than binary
            payloads during incidents.
          </li>
          <li>
            <strong>Payloads are moderate in size:</strong> For many business events, readability and tooling outweigh
            the overhead of a text format.
          </li>
          <li>
            <strong>You want contract validation without switching formats:</strong> JSON Schema lets teams keep JSON
            while still enforcing structure.
          </li>
        </ul>
        <p>
          If you are running extremely high-volume pipelines, need compact payloads, or require broker-native schema
          evolution guarantees, binary formats such as Avro or Protocol Buffers may be a better fit. JSON is popular
          because it is practical, not because it is automatically the best option for every stream.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <X className="size-6 text-red-500" />
          <span>Common Mistakes</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Using JSON without a schema:</strong> Human-readable payloads are not a substitute for a contract.
          </li>
          <li>
            <strong>Publishing breaking changes under the same event type:</strong> This creates invisible production
            breakage for downstream consumers.
          </li>
          <li>
            <strong>Embedding transport concerns into the business payload:</strong> Keep routing metadata and business
            data clearly separated.
          </li>
          <li>
            <strong>Assuming validators enforce every keyword the same way:</strong> Implementation details, especially
            around <code>format</code>, differ unless configured deliberately.
          </li>
          <li>
            <strong>Documenting events only in prose:</strong> Teams need machine-readable contracts, not just wiki
            pages and screenshots.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <MessageCircle className="size-6 text-cyan-500" />
          <span>Conclusion</span>
        </h2>
        <p>
          JSON remains a strong default for event-driven architecture because it is easy to produce, inspect, and move
          between systems. The difference in 2026 is that successful teams rarely stop at plain JSON. They pair it with
          JSON Schema for validation, use CloudEvents when a standard envelope helps, and publish AsyncAPI documents so
          event contracts are discoverable and testable. That combination turns readable messages into dependable
          architecture.
        </p>
      </div>
    </>
  );
}

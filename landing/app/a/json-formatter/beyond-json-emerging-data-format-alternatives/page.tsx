import type { Metadata } from "next";
import {
  Binary,
  BookText,
  ClipboardList,
  Cpu,
  FileCode,
  FileJson,
  FileText,
  Globe,
  Layers,
  Minus,
  Network,
  Package,
  Scale,
  Settings,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Beyond JSON: Emerging Data Format Alternatives | JSON Alternatives Guide",
  description:
    "Compare practical JSON alternatives including Protobuf, Avro, MessagePack, CBOR, Amazon Ion, YAML, and TOML, with guidance on when each format is a better fit.",
};

const alternatives = [
  {
    name: "Protocol Buffers",
    bestFor: "Internal APIs, gRPC services, mobile or backend systems with shared contracts",
    why: "Compact binary payloads, generated clients, and well-defined compatibility rules",
    tradeoff: "You need .proto schemas and generated code, and the wire format is not human-readable",
  },
  {
    name: "Apache Avro",
    bestFor: "Kafka topics, data pipelines, batch processing, and schema-registry workflows",
    why: "Strong reader/writer schema evolution and deep adoption in streaming ecosystems",
    tradeoff: "Less convenient than JSON for ad hoc web APIs and manual debugging",
  },
  {
    name: "MessagePack",
    bestFor: "A mostly drop-in binary replacement for JSON in caches, queues, and realtime systems",
    why: "Keeps a familiar document model while shrinking payloads and parse overhead",
    tradeoff: "No built-in contract layer, and binary payloads are harder to inspect by hand",
  },
  {
    name: "CBOR",
    bestFor: "IoT, embedded systems, security protocols, and standards-driven binary interchange",
    why: "IETF-standard compact binary format with typed values and good extensibility",
    tradeoff: "Tooling is narrower than JSON in everyday web development",
  },
  {
    name: "Amazon Ion",
    bestFor: "Data with decimals, timestamps, annotations, or long-lived archival requirements",
    why: "Supports both text and binary encodings with a richer type system than JSON",
    tradeoff: "Smaller ecosystem and less universal tooling than JSON or Protobuf",
  },
  {
    name: "YAML / TOML",
    bestFor: "Human-edited configuration files",
    why: "Comments and cleaner config syntax make them easier to maintain by hand",
    tradeoff: "They are usually worse choices than JSON for hot-path API payloads",
  },
] as const;

const decisionGuide = [
  {
    label: "Stay with JSON",
    text: "Choose JSON when browser compatibility, easy debugging, and broad interoperability matter more than raw efficiency.",
  },
  {
    label: "Choose MessagePack",
    text: "Use it when your data already looks like JSON objects and arrays, but you want a smaller binary wire format.",
  },
  {
    label: "Choose CBOR",
    text: "Prefer CBOR when you want a standards-based binary format for constrained or security-sensitive systems.",
  },
  {
    label: "Choose Protobuf",
    text: "Pick Protobuf when you control both ends of the connection and want strict contracts, code generation, and compact messages.",
  },
  {
    label: "Choose Avro",
    text: "Use Avro for evolving event streams and analytics pipelines where schema resolution is part of daily operations.",
  },
  {
    label: "Choose Ion",
    text: "Reach for Ion when JSON's type system is too thin and you need decimals, timestamps, or both text and binary forms.",
  },
  {
    label: "Choose YAML or TOML",
    text: "Use them for config that humans edit directly, not as a default replacement for API or RPC payloads.",
  },
] as const;

const migrationTips = [
  "Benchmark end-to-end latency and CPU before switching. Smaller payloads do not always produce a meaningful product win by themselves.",
  "Decide how compatibility will work before launch: reserved Protobuf field numbers, Avro schema evolution rules, or CBOR tag conventions.",
  "Keep a debugging path. Teams often retain JSON logs, JSON mirrors, or CLI converters even when production traffic moves to a binary format.",
  "If browsers are first-class clients, account for translation layers such as REST or gRPC-Web instead of assuming a binary protocol can be exposed directly.",
] as const;

export default function BeyondJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson className="w-8 h-8 text-blue-500" /> Beyond JSON: Emerging Data Format Alternatives
      </h1>

      <div className="space-y-6">
        <p>
          If you are searching for JSON alternatives, the practical answer is that there is no single replacement.
          Teams usually move beyond JSON for one of four reasons: smaller payloads, faster parsing, stronger schemas, or
          richer data types than plain strings, numbers, booleans, arrays, objects, and null.
        </p>

        <p>
          Today, the most useful alternatives are Protocol Buffers, Apache Avro, MessagePack, CBOR, and Amazon Ion.
          YAML and TOML also matter, but mostly for configuration. gRPC and GraphQL are related choices for API design,
          not direct wire-format replacements for JSON.
        </p>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
          <p className="font-semibold mb-2">Short answer</p>
          <p>
            Use <strong>Protobuf</strong> for strict internal contracts, <strong>Avro</strong> for streaming data,
            <strong>MessagePack</strong> when you want a binary format close to JSON&apos;s document model,
            <strong>CBOR</strong> for standards-based compact binary interchange, <strong>Ion</strong> for richer
            types, and <strong>YAML or TOML</strong> for human-edited config files.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-green-500" /> Why Teams Look Beyond JSON
        </h2>

        <p>JSON stays popular because it is simple and universal, but its limits show up quickly in larger systems:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start gap-2">
            <Minus className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <strong>Payload size:</strong> Repeated field names and text encoding create avoidable overhead.
          </li>
          <li className="flex items-start gap-2">
            <Minus className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <strong>CPU cost:</strong> Parsing text is usually slower than decoding a compact binary structure.
          </li>
          <li className="flex items-start gap-2">
            <Minus className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <strong>Weak native typing:</strong> JSON has no built-in date, decimal, comment, or binary story.
          </li>
          <li className="flex items-start gap-2">
            <Minus className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <strong>External contracts:</strong> Validation and compatibility rules live outside the format unless you
            add schema tooling on top.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Layers className="w-6 h-6 text-blue-500" /> JSON Alternatives at a Glance
        </h2>

        <div className="overflow-x-auto my-4">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="text-left p-3 font-semibold">Format</th>
                <th className="text-left p-3 font-semibold">Best fit</th>
                <th className="text-left p-3 font-semibold">Why people choose it</th>
                <th className="text-left p-3 font-semibold">Main trade-off</th>
              </tr>
            </thead>
            <tbody>
              {alternatives.map((item) => (
                <tr key={item.name} className="border-t border-gray-200 dark:border-gray-700 align-top">
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3">{item.bestFor}</td>
                  <td className="p-3">{item.why}</td>
                  <td className="p-3">{item.tradeoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Binary className="w-6 h-6 text-purple-500" /> The Main Options
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <FileCode className="w-5 h-5 text-blue-500" /> Protocol Buffers
        </h3>
        <p>
          Protocol Buffers remain one of the strongest alternatives to JSON when you control both producer and consumer.
          Google&apos;s current documentation now centers on <em>Editions</em>, with Edition 2024 as the latest released
          baseline, which is a sign that Protobuf is still evolving as an actively maintained contract format rather
          than a frozen legacy choice.
        </p>
        <p>
          Protobuf is a good fit for internal service APIs, gRPC, mobile-backend communication, and any system where
          generated code and strict schemas are more valuable than manual readability.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`edition = "2024";

message Person {
  string name = 1;
  int32 id = 2;
  repeated string tags = 3;
}`}
          </pre>
        </div>
        <p>
          The main caveat is operational, not conceptual: field numbers become part of your compatibility contract, so
          deleting or reusing them carelessly creates long-term breakage.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Package className="w-5 h-5 text-orange-500" /> Apache Avro
        </h3>
        <p>
          Avro is often the best answer when &quot;JSON alternatives&quot; really means &quot;we need better schema
          evolution for events.&quot; It is common in Kafka-heavy systems because readers and writers can evolve
          independently, as long as you manage compatibility rules intentionally.
        </p>
        <p>
          Compared with Protobuf, Avro is less centered on generated request/response clients and more centered on
          versioned records moving through streams, files, and analytics pipelines.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`{
  "type": "record",
  "name": "OrderPlaced",
  "fields": [
    { "name": "id", "type": "string" },
    { "name": "total", "type": "double" },
    { "name": "coupon", "type": ["null", "string"], "default": null }
  ]
}`}
          </pre>
        </div>
        <p>
          If your architecture depends on schema registries, batch reprocessing, or append-only event logs, Avro often
          fits better than JSON and sometimes better than Protobuf.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-500" /> MessagePack
        </h3>
        <p>
          MessagePack is often the closest thing to a binary JSON replacement. It keeps the familiar map, array, and
          scalar style of JSON while encoding the same kind of data more compactly.
        </p>
        <p>
          It works well for caches, message queues, and realtime systems where you want lower overhead without adopting
          a full schema-first workflow. The trade-off is that the format itself does not solve contract management for
          you.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-green-500" /> CBOR
        </h3>
        <p>
          CBOR is the standards-focused option. RFC 8949 describes it as a compact binary object representation aimed
          at small code size, small messages, and extensibility, which is why it shows up in constrained devices,
          WebAuthn-adjacent security work, and other protocol-heavy environments.
        </p>
        <p>
          If you want a binary alternative to JSON with formal IETF standardization instead of a vendor-specific
          ecosystem, CBOR deserves a serious look.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Network className="w-5 h-5 text-purple-500" /> Amazon Ion
        </h3>
        <p>
          Amazon Ion is useful when JSON&apos;s type system is the real problem. Ion&apos;s text format is a superset of
          JSON, and its data model adds richer types such as decimals, timestamps, blobs, and annotations while also
          offering a binary encoding for efficient storage and transport.
        </p>
        <p>
          That combination makes Ion attractive for financial data, archival records, and systems where type fidelity
          matters more than maximum ecosystem reach.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-500" /> YAML and TOML
        </h3>
        <p>
          YAML and TOML are often mentioned as JSON alternatives, but they solve a narrower problem: files that humans
          edit directly. YAML is flexible and expressive, while TOML is stricter and usually easier to reason about.
        </p>
        <p>
          For config, both can beat JSON because comments and cleaner syntax matter. For API payloads or hot data paths,
          they usually do not.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-500" /> gRPC and GraphQL Are Related, Not Replacements
        </h2>
        <p>
          Older discussions about JSON alternatives often lump gRPC and GraphQL into the same list, but that blurs an
          important distinction. They change how clients and servers communicate; they are not standalone document
          formats in the same sense as Protobuf, Avro, MessagePack, CBOR, or Ion.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>gRPC:</strong> An RPC framework that commonly uses Protocol Buffers by default. Choose it when you
            want strongly typed service-to-service calls, not because it magically replaces JSON on its own.
          </li>
          <li>
            <strong>GraphQL:</strong> A query language and runtime for APIs. GraphQL responses are usually serialized as
            JSON, so it addresses over-fetching and schema design more than payload encoding.
          </li>
        </ul>
        <p>
          If your real problem is request shape, client flexibility, or service contracts, changing the API layer may
          matter more than changing the wire format.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Scale className="w-6 h-6 text-yellow-500" /> How to Choose the Right Alternative
        </h2>
        <div className="space-y-3 my-4">
          {decisionGuide.map((item) => (
            <p key={item.label}>
              <strong>{item.label}:</strong> {item.text}
            </p>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-emerald-500" /> Migration Tips
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          {migrationTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BookText className="w-6 h-6 text-gray-500" /> Bottom Line
        </h2>
        <p>
          JSON is still the default for public web APIs because it is easy to inspect and universally supported. The
          reason to move beyond it is not novelty. It is usually because you need one of three things JSON does poorly:
          better efficiency, better contracts, or better types.
        </p>
        <p>
          For most teams, the short list is simple: <strong>Protobuf</strong> for schema-first services,
          <strong> Avro</strong> for event pipelines, <strong>MessagePack</strong> or <strong>CBOR</strong> for compact
          binary interchange, <strong>Ion</strong> for richer semantics, and <strong>YAML or TOML</strong> for config.
        </p>
      </div>
    </>
  );
}

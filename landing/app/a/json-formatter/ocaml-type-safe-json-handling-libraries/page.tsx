import type { Metadata } from "next";
import { Lock, Code, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "OCaml Type-Safe JSON Libraries: Yojson, ppx_deriving_yojson, ppx_yojson_conv | Offline Tools",
  description:
    "Compare current OCaml JSON libraries, see Dune setup and examples, and choose between Yojson, ppx_deriving_yojson, ppx_yojson_conv, and atdgen.",
};

export default function OCamlTypeSafeJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Lock className="mr-3 text-blue-600" size={36} />
        OCaml Type-Safe JSON Handling Libraries
      </h1>

      <div className="space-y-6">
        <p>
          If you want type-safe JSON in OCaml, the practical answer in 2026 is still to build on{" "}
          <a
            href="https://opam.ocaml.org/packages/yojson/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yojson
          </a>{" "}
          and add code generation on top. Raw JSON AST handling is useful for generic tools, but for application code
          you usually want generated encoders and decoders that stay aligned with your OCaml types.
        </p>
        <p>
          The main decision is not whether to use JSON derivation, but which derivation style fits your project:
          ecosystem-friendly and result-based, Jane Street-oriented with richer PPX options, or schema-first for large
          external APIs. That is what search users usually need answered first.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-green-600" size={24} />
          Quick Pick
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Choose `yojson` + `ppx_deriving_yojson`</strong> if you want the safest general recommendation for
            most OCaml projects. It works in plain Dune setups, has broad compiler compatibility, and generated
            decoders return `('a, string) result`.
          </li>
          <li>
            <strong>Choose `yojson` + `ppx_yojson_conv`</strong> if you already use Base/Core or other Jane Street
            PPXs. It gives you excellent naming, defaulting, and field-control attributes, but the current opam release
            targets OCaml `&gt;= 5.3.0`.
          </li>
          <li>
            <strong>Choose `atdgen`</strong> if JSON is a long-lived contract between services and you want a schema
            file that generates serializers, deserializers, and validators.
          </li>
          <li>
            <strong>Use bare `yojson` alone</strong> only when the JSON shape is intentionally dynamic or user-defined,
            such as config editors, formatters, or generic transformation tools.
          </li>
        </ul>

        <div className="grid gap-4 md:grid-cols-2 my-6">
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h3 className="text-lg font-semibold">Yojson 3.0.0</h3>
            <p className="mt-2 text-sm">
              Parser, printer, and `Yojson.Safe.t` AST. Essential building block, but not type safety by itself.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h3 className="text-lg font-semibold">ppx_deriving_yojson 3.10.0</h3>
            <p className="mt-2 text-sm">
              The most portable “derive JSON from types” option today. Good default for libraries and mixed
              ecosystems.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h3 className="text-lg font-semibold">ppx_yojson_conv v0.17.1</h3>
            <p className="mt-2 text-sm">
              Jane Street&apos;s current PPX deriver. Strong fit inside Base/Core stacks, with useful field-control
              attributes and naming helpers.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h3 className="text-lg font-semibold">atdgen 3.0.1</h3>
            <p className="mt-2 text-sm">
              Schema-first code generation for durable external APIs, larger contracts, and multi-service systems.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Version notes above reflect current opam package listings as of March 2026.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-600" size={24} />
          Best Starting Point for Most Projects
        </h2>
        <p>
          For a typical Dune project that just wants safe encode/decode logic with clear boundary errors,{" "}
          <a
            href="https://opam.ocaml.org/packages/ppx_deriving_yojson/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ppx_deriving_yojson
          </a>{" "}
          is the cleanest recommendation. It generates `type_to_yojson` and `type_of_yojson`, and the decoder returns a
          `result` instead of forcing exception-based control flow.
        </p>

        <h3 className="text-xl font-semibold mt-6">Minimal Dune Setup</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">`dune`</h4>
          <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900">
            {`(library
  (name api_types)
  (libraries yojson ppx_deriving_yojson.runtime)
  (preprocess (pps ppx_deriving_yojson)))
`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example: Result-Based Decoding</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">`types.ml`</h4>
          <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900">
            {`type status =
  | Draft
  | Published
[@@deriving yojson]

type article = {
  id : int;
  title : string;
  tags : string list [@default []];
  status : status;
  published_at : string option;
} [@@deriving yojson]

let decode_article raw =
  raw
  |> Yojson.Safe.from_string
  |> article_of_yojson

let () =
  let raw =
    {|{"id":1,"title":"Intro","tags":["ocaml","json"],"status":["Published"],"published_at":null}|}
  in
  match decode_article raw with
  | Ok article ->
      article_to_yojson article
      |> Yojson.Safe.pretty_to_string
      |> print_endline
  | Error path ->
      prerr_endline ("Invalid JSON at " ^ path)
`}
          </pre>
        </div>
        <p>
          Two practical details matter here. First, the decoder returns a `result`, which makes boundary validation easy
          to compose. Second, regular variants are encoded as JSON arrays such as `["Published"]`, not as JSON objects.
          That trips people up when they switch from examples written for other languages.
        </p>

        <h3 className="text-xl font-semibold mt-6">When `ppx_yojson_conv` Is the Better Fit</h3>
        <p>
          <a
            href="https://opam.ocaml.org/packages/ppx_yojson_conv/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ppx_yojson_conv
          </a>{" "}
          is still an excellent choice, but it is no longer accurate to present it as a universal default. It is part
          of Jane Street&apos;s PPX stack, and the latest package line is aimed at current Base/Core environments.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            It generates functions named `yojson_of_type` and `type_of_yojson`, which differ from
            `ppx_deriving_yojson`&apos;s `type_to_yojson` naming.
          </li>
          <li>
            Primitive converters need to be in scope, commonly via
            `open Ppx_yojson_conv_lib.Yojson_conv.Primitives`.
          </li>
          <li>
            It has strong ergonomics for field naming and omission rules, including `[@key]`, `[@name]`, `[@default]`,
            `[@yojson.option]`, `[@yojson_drop_default]`, and `[@@yojson.allow_extra_fields]`.
          </li>
          <li>
            If you are on an older compiler line, verify package compatibility first instead of assuming the newest
            release will install unchanged.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">`ppx_yojson_conv` Example</h4>
          <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900">
            {`open Ppx_yojson_conv_lib.Yojson_conv.Primitives

type payload = {
  user_id : int [@key "userId"];
  nickname : string option [@yojson.option];
  retries : int [@default 3] [@yojson_drop_default (=)];
} [@@deriving yojson]

let outgoing =
  yojson_of_payload { user_id = 7; nickname = None; retries = 3 }
`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="mr-2 text-teal-600" size={24} />
          When `atdgen` Is Worth the Extra Step
        </h2>
        <p>
          <a
            href="https://opam.ocaml.org/packages/atdgen/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            atdgen
          </a>{" "}
          is not the lightest tool for a single internal record, but it is a strong choice when you want the JSON
          contract reviewed independently from OCaml code.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use it when several services or repositories need to agree on the same payload shapes.
          </li>
          <li>
            Use it when generated validators and durable schema files matter more than the shortest local setup.
          </li>
          <li>
            Skip it for tiny internal-only payloads where `[@@deriving yojson]` on the type is already enough.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 text-orange-600" size={24} />
          Common Mistakes and Caveats
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Bare `yojson` is not type-safe by itself.</strong> It gives you a JSON tree and parsing functions,
            not schema validation.
          </li>
          <li>
            <strong>Unknown field handling is a product decision.</strong> `ppx_deriving_yojson` is strict by default
            but can be configured with <code>{`{ strict = false }`}</code>. `ppx_yojson_conv` uses `[@@yojson.allow_extra_fields]`
            when you want to ignore extras.
          </li>
          <li>
            <strong>Variant JSON shapes are easy to misremember.</strong> Both major derivers encode normal variants as
            arrays, so a constructor with no payload becomes something like `["Draft"]`.
          </li>
          <li>
            <strong>Very large integers need care in cross-runtime systems.</strong> If JSON might be consumed in
            JavaScript or another double-based runtime, prefer explicit string encoding for large `int64` or
            `nativeint` values.
          </li>
          <li>
            <strong>Missing fields and `None` are not always the same thing.</strong> Decide whether you want a field to
            be nullable, to have a default, or to be omitted entirely, and model that behavior explicitly.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          For most new OCaml code, start with `yojson` plus `ppx_deriving_yojson`. Move to `ppx_yojson_conv` if your
          project already lives in the Jane Street ecosystem or you want its richer PPX feature set. Reach for
          `atdgen` when the JSON contract itself needs to be treated as a first-class artifact. Whichever route you
          choose, keeping the JSON boundary derived from types is the main step that makes OCaml JSON handling reliable.
        </p>
      </div>
    </>
  );
}

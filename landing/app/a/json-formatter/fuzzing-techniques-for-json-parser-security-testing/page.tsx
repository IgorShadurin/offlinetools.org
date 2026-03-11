import type { Metadata } from "next";
import {
  Bug,
  Cloud,
  Code,
  FileText,
  ListTree,
  MemoryStick,
  Repeat,
  ShieldAlert,
  TestTube,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fuzzing Techniques for JSON Parser Security Testing",
  description:
    "Practical guide to fuzzing JSON parsers with coverage-guided, grammar-aware, and differential techniques, including harness design, sanitizer use, edge-case corpora, and CI regression tips.",
};

export default function FuzzingJsonArticle() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 flex items-center gap-4 text-4xl font-bold">
        <Bug size={36} /> Fuzzing Techniques for JSON Parser Security Testing
      </h1>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
          <FileText size={24} /> Start with the Highest-Yield Approach
        </h2>
        <p className="mb-4">
          If you are fuzzing a JSON parser today, the strongest default is <strong>coverage-guided, in-process
          fuzzing</strong> with a deterministic harness, memory/undefined-behavior sanitizers for native code, and a
          small but intentional seed corpus. That combination usually finds crash bugs, depth-limit failures, and
          parser inconsistencies much faster than pure random input generation.
        </p>
        <p className="mb-4">
          The reason JSON is worth targeted security testing is that parsers often sit directly on trust boundaries:
          API gateways, mobile apps, browser code, SDKs, log ingesters, and config loaders. A bug does not need to be
          remote code execution to matter. Timeouts, stack exhaustion, memory blowups, or inconsistent handling of
          duplicate keys can all become real security issues once untrusted input reaches production.
        </p>
        <p>
          For most teams, the practical goal is simple: make sure malformed or extreme JSON is rejected safely,
          deterministically, and within explicit resource limits.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
          <TestTube size={24} /> JSON Behaviors That Deserve Focused Fuzzing
        </h2>
        <p className="mb-4">
          JSON looks small, but the edge cases that matter in parser security are concentrated in a few places.
          RFC 8259 says object member names <strong>should be unique</strong>, and it also warns that receiver behavior
          becomes unpredictable when they are not. That alone makes duplicate-key handling worth testing explicitly.
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Duplicate keys:</strong> Does the parser reject them, keep the first value, keep the last value, or
            behave differently across APIs?
          </li>
          <li>
            <strong>Unicode and escaping:</strong> Invalid UTF-8, unpaired surrogates, embedded nulls, and tricky
            escape sequences often expose boundary bugs.
          </li>
          <li>
            <strong>Number parsing:</strong> Leading zeros, very large integers, huge exponents, negative zero, and
            precision loss can all trigger divergent behavior.
          </li>
          <li>
            <strong>Trailing bytes and partial parses:</strong> Some parsers accept a valid root value and ignore junk
            that follows unless you test for it.
          </li>
          <li>
            <strong>Depth and size limits:</strong> Deep nesting, giant strings, and enormous arrays are common denial
            of service probes.
          </li>
          <li>
            <strong>Extension modes:</strong> If the library optionally accepts comments, trailing commas, `NaN`, or
            `Infinity`, fuzz strict and permissive modes separately.
          </li>
          <li>
            <strong>Streaming boundaries:</strong> Incremental parsers should also be tested with tokens split across
            awkward chunk boundaries.
          </li>
        </ul>
        <p>These are the inputs most likely to reveal both correctness bugs and exploitable resource handling issues.</p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
          <Bug size={24} /> Fuzzing Techniques That Find Real Parser Bugs
        </h2>
        <p className="mb-4">
          The best campaigns usually combine several techniques instead of relying on one generator.
        </p>

        <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
          <Repeat size={20} /> 1. Mutation Fuzzing
        </h3>
        <p className="mb-4">
          Start with valid JSON samples and mutate them. Coverage guidance helps the fuzzer keep inputs that reach new
          states, while a JSON token dictionary helps it stay near interesting syntax. Mutation fuzzing is fast to set
          up and usually the best baseline.
        </p>

        <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
          <ListTree size={20} /> 2. Grammar-Aware or Structure-Aware Fuzzing
        </h3>
        <p className="mb-4">
          When random mutations die in the lexer too early, move up a level. Grammar-aware fuzzers generate valid or
          almost-valid JSON trees on purpose, so they spend more time in semantic code paths such as numeric
          conversion, UTF-8 validation, duplicate-name handling, and recursion limits.
        </p>

        <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
          <Code size={20} /> 3. Differential Fuzzing
        </h3>
        <p className="mb-4">
          Feed the same input to two parsers, or to the same parser in strict and permissive modes, then compare the
          outcomes. Differential fuzzing is especially good at finding non-crashing bugs such as silent truncation,
          number mismatches, or inconsistent handling of invalid Unicode and duplicate keys.
        </p>

        <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
          <MemoryStick size={20} /> 4. Resource-Focused Fuzzing
        </h3>
        <p>
          Some of the most valuable findings are not memory corruption at all. Run campaigns that deliberately stress
          recursion depth, total tokens, input size, and chunk fragmentation so you can catch stack overflow risks,
          allocator abuse, and algorithmic complexity problems before attackers do.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
          <Wrench size={24} /> A Practical JSON Fuzzing Workflow
        </h2>
        <ol className="mb-4 list-decimal space-y-4 pl-6">
          <li>
            <strong>Choose the exact parser surface.</strong> Test every meaningful entry point: whole-buffer parse,
            DOM build, streaming/SAX parse, parse-from-bytes, and any permissive compatibility mode.
          </li>
          <li>
            <strong>Build a deterministic harness.</strong> Every input should run fast, avoid network and filesystem
            dependencies, and reset global state between iterations. A flaky harness wastes fuzzing time.
          </li>
          <li>
            <strong>Turn on sanitizers for native code.</strong> AddressSanitizer and UndefinedBehaviorSanitizer are a
            strong default because they convert silent memory corruption and undefined behavior into actionable crashes.
          </li>
          <li>
            <strong>Seed with a small, high-quality corpus.</strong> Include empty structures, nested objects, escaped
            strings, large numbers, invalid Unicode samples, and known-bad cases such as trailing garbage or duplicate
            keys.
          </li>
          <li>
            <strong>Add a JSON dictionary.</strong> Tokens such as{" "}
            <code className="font-mono">&#123;</code>, <code className="font-mono">&#125;</code>,{" "}
            <code className="font-mono">[</code>, <code className="font-mono">]</code>,{" "}
            <code className="font-mono">:</code>, <code className="font-mono">,</code>,{" "}
            <code className="font-mono">&quot;true&quot;</code>,{" "}
            <code className="font-mono">&quot;false&quot;</code>,{" "}
            <code className="font-mono">&quot;null&quot;</code>, and{" "}
            <code className="font-mono">&quot;\\u&quot;</code> help many fuzzers stay syntactically productive.
          </li>
          <li>
            <strong>Set explicit limits.</strong> Cap bytes, nesting depth, token count, and per-input time. Security
            bugs often appear as missing or inconsistent limits rather than parser crashes.
          </li>
          <li>
            <strong>Keep minimized reproducers.</strong> Every crash, timeout, or semantic mismatch should become a
            permanent regression test after triage.
          </li>
          <li>
            <strong>Run short fuzz jobs in CI and longer jobs continuously.</strong> For open-source parsers, services
            such as OSS-Fuzz or lightweight PR checks are worth using because they keep exercising the corpus after the
            initial bug-finding burst.
          </li>
        </ol>

        <div className="my-4 overflow-x-auto rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Conceptual In-Process Harness</h3>
          <pre className="text-sm font-mono">{`extern "C" int LLVMFuzzerTestOneInput(const uint8_t* data, size_t size) {
  ParserOptions opts;
  opts.max_depth = 256;
  opts.max_input_bytes = 1 << 20;

  try {
    parse_json_bytes(data, size, opts);
  } catch (const ParseError&) {
    // Parse failures are expected. Crashes, sanitizer hits, and hangs are not.
  }

  return 0;
}`}</pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Treat streaming parsers as a separate target. The same bytes should also be fuzzed with randomized chunk
            boundaries so token splits are exercised.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
          <ListTree size={24} /> High-Value Corpus Ideas
        </h2>
        <p className="mb-4">A useful seed corpus is small, varied, and deliberately hostile.</p>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Duplicate keys:</strong>{" "}
            <code className="font-mono">&#123;&quot;role&quot;:&quot;user&quot;,&quot;role&quot;:&quot;admin&quot;&#125;</code>
          </li>
          <li>
            <strong>Trailing data:</strong>{" "}
            <code className="font-mono">&#123;&quot;a&quot;:1&#125;garbage</code>
          </li>
          <li>
            <strong>Huge exponents and integer boundaries:</strong>{" "}
            <code className="font-mono">1e1000000</code>,{" "}
            <code className="font-mono">18446744073709551616</code>,{" "}
            <code className="font-mono">-0</code>, <code className="font-mono">00</code>
          </li>
          <li>
            <strong>Unicode edge cases:</strong>{" "}
            <code className="font-mono">&quot;\\uD834\\uDD1E&quot;</code> versus{" "}
            <code className="font-mono">&quot;\\uD800&quot;</code>
          </li>
          <li>
            <strong>Deep nesting:</strong> thousands of repeated arrays or objects until the parser hits its configured
            maximum depth
          </li>
          <li>
            <strong>Large repeated strings:</strong> long escaped strings, long runs of backslashes, and embedded null
            bytes
          </li>
          <li>
            <strong>Permissive-mode probes:</strong> comments, trailing commas,{" "}
            <code className="font-mono">NaN</code>, and <code className="font-mono">Infinity</code> if the library has
            options for them
          </li>
          <li>
            <strong>Streaming cases:</strong> split a multibyte UTF-8 sequence, escape sequence, or number token across
            chunk boundaries
          </li>
        </ul>
        <p>
          Keep the corpus understandable. When a sample no longer covers unique behavior, minimize or delete it so the
          fuzzer spends its time on inputs that still expand coverage.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
          <ShieldAlert size={24} /> Interpreting Findings Without Wasting Time
        </h2>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Crash or sanitizer hit:</strong> Treat this as a high-priority parser bug until proven otherwise,
            especially in native code.
          </li>
          <li>
            <strong>Timeout or hang:</strong> Usually points to algorithmic complexity, recursion problems, or missing
            bounds checks.
          </li>
          <li>
            <strong>Out-of-memory event:</strong> Often means size or nesting controls are missing, inconsistently
            applied, or bypassed on one code path.
          </li>
          <li>
            <strong>Differential mismatch:</strong> Verify whether the divergence is an intentional policy choice or a
            silent correctness bug that could affect authorization, logging, or downstream validation.
          </li>
        </ul>
        <p>
          A local formatter/validator is useful during triage. Pretty-printing minimized reproducers helps you separate
          valid-but-dangerous inputs from simply invalid JSON, and it makes parser-to-parser output comparison much
          easier.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
          <Cloud size={24} /> Hardening Decisions After Fuzzing
        </h2>
        <p className="mb-4">Fuzzing is most valuable when it drives explicit parser policy, not just bug fixes.</p>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>
            Decide how duplicate keys should behave and document that choice. Silent ambiguity is worse than strict
            rejection.
          </li>
          <li>
            Enforce limits on bytes, depth, token count, string length, and numeric range as close to the parser entry
            point as possible.
          </li>
          <li>
            Keep strict JSON parsing separate from convenience extensions so security-sensitive code paths do not
            accidentally inherit permissive behavior.
          </li>
          <li>
            Preserve the minimized corpus in version control and rerun it in CI before release.
          </li>
          <li>
            If untrusted JSON is business-critical, isolate parsing in a lower-privilege process or sandbox to reduce
            blast radius.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
          <Bug size={24} /> Conclusion
        </h2>
        <p className="mb-4">
          Effective JSON parser fuzzing is less about generating endless random strings and more about combining the
          right feedback loop with the right edge cases. Start with coverage guidance, sanitizers, a clean corpus, and
          explicit resource limits. Then add grammar-aware, differential, and streaming-focused tests until the parser
          behaves predictably under stress. That is what turns fuzzing into a real security control instead of a
          one-time experiment.
        </p>
      </section>
    </div>
  );
}

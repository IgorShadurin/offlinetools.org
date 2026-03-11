import type { Metadata } from "next";
import {
  AlertTriangle,
  CheckCircle2,
  Gauge,
  Package,
  Settings,
  SquareArrowLeft,
  SquareArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Perl's JSON Handling Capabilities: JSON, JSON::PP, JSON::XS",
  description:
    "Current guide to JSON handling in Perl, including when to use JSON, JSON::PP, JSON::XS, backend selection, booleans, encoding, decoding, and common pitfalls.",
};

export default function PerlJsonHandlingArticle() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Perl&apos;s JSON Handling Capabilities</h1>

      <div className="space-y-8">
        <p className="text-lg">
          Perl handles JSON well today, but the practical question is not whether it can parse JSON. It is which module
          you should use, how booleans behave, and how to keep production and test output consistent. For most scripts
          and web apps, the right starting point is the{" "}
          <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON</code> interface, then a
          more explicit backend choice only when performance, deployment portability, or boolean semantics matter.
        </p>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
          <p className="font-semibold text-blue-900 dark:text-blue-100">Short answer</p>
          <p className="mt-2 text-blue-950 dark:text-blue-50">
            Use <code className="rounded bg-white/70 px-1 py-0.5 font-mono dark:bg-gray-900/60">JSON</code> for the
            common API, <code className="rounded bg-white/70 px-1 py-0.5 font-mono dark:bg-gray-900/60">JSON::PP</code>{" "}
            when you want a core pure-Perl dependency, and an XS backend such as{" "}
            <code className="rounded bg-white/70 px-1 py-0.5 font-mono dark:bg-gray-900/60">JSON::XS</code> when raw
            throughput matters.
          </p>
        </div>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <CheckCircle2 className="mr-3 text-emerald-500" size={28} />
            Which Module Should You Use?
          </h2>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON</code>: Best default
              when you want a stable interface for{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">encode_json</code>,{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">decode_json</code>, and the
              object API without committing your code to one backend.
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON::PP</code>: Good when
              you need pure Perl, a dependency that ships with modern Perl, or explicit control over features like{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">core_bools</code>.
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON::XS</code>: A direct XS
              choice for hot paths that encode or decode large payloads frequently.
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON::MaybeXS</code>: Useful
              in app code that wants an XS backend when available and a pure-Perl fallback otherwise.
            </li>
          </ul>
          <p className="mt-4">
            The current <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON</code>{" "}
            module checks <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">PERL_JSON_BACKEND</code>{" "}
            first. If you do not set it, the documented fallback order is{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON::XS</code>, then{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON::PP</code>, then{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON::backportPP</code>. That
            makes backend selection predictable if you configure it deliberately, and surprising if you never do.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <SquareArrowRight className="mr-3 text-green-500" size={28} />
            Encoding Perl Data to JSON
          </h2>
          <p>
            Encoding is straightforward when you pass hashrefs or arrayrefs and use explicit JSON booleans rather than
            Perl strings like <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">"false"</code>
            .
          </p>

          <h3 className="mb-3 mt-6 text-xl font-medium">Practical Example</h3>
          <div className="overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="text-sm">{`#!/usr/bin/perl
use strict;
use warnings;
use JSON qw(encode_json);

my $payload = {
    user_id   => 101,
    name      => "Alice",
    active    => JSON::true,
    deleted   => JSON::false,
    tags      => ["perl", "json"],
    last_login => undef,
};

my $json = encode_json($payload);

print $json, "\\n";
`}</pre>
          </div>
          <p className="mt-3">
            In encoded output, <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">undef</code>{" "}
            becomes <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">null</code>. If you
            need stable key ordering for snapshot tests or diffs, use the object interface and enable{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">canonical</code>. Pretty
            printing improves readability, but it does not sort keys by itself.
          </p>

          <div className="overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="text-sm">{`my $json = JSON->new
    ->canonical(1)
    ->pretty(1)
    ->encode($payload);
`}</pre>
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <SquareArrowLeft className="mr-3 text-red-500" size={28} />
            Decoding JSON Back Into Perl
          </h2>
          <p>
            Decoding turns JSON objects into hashrefs and arrays into arrayrefs. The main footgun is booleans: decoded
            JSON booleans are not the same thing as the literal Perl strings{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">"true"</code> and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">"false"</code>.
          </p>

          <h3 className="mb-3 mt-6 text-xl font-medium">Safer Decode Example</h3>
          <div className="overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="text-sm">{`#!/usr/bin/perl
use strict;
use warnings;
use JSON::PP qw(is_bool);

my $decoder = JSON::PP->new->core_bools;
my $data;

eval {
    $data = $decoder->decode('{"ok":true,"roles":["admin","editor"]}');
};

if ($@) {
    die "Invalid JSON: $@";
}

print $data->{roles}[0], "\\n";
print $data->{ok} ? "enabled\\n" : "disabled\\n";
print is_bool($data->{ok}) ? "boolean\\n" : "not boolean\\n";
`}</pre>
          </div>
          <p className="mt-3">
            With <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON::PP</code>, the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">core_bools</code> option can
            return Perl core booleans on modern Perl instead of backend-specific boolean objects. That is useful when
            you want fewer surprises moving values through the rest of your application.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Settings className="mr-3 text-violet-500" size={28} />
            Options That Matter in Real Code
          </h2>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">canonical</code>: Produces
              stable key ordering, which is valuable for tests, caching keys, and deterministic output.
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">pretty</code>: Makes output
              readable for logs, examples, and config files.
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">allow_nonref</code>: Lets
              you encode or decode top-level scalar JSON values. Set it explicitly if your code depends on this behavior
              across environments.
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">convert_blessed</code>:
              Calls an object&apos;s{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">TO_JSON</code> method during
              encoding.
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">allow_blessed</code>: Keeps
              encoding from dying on blessed values that you are willing to collapse to{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">null</code>.
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">relaxed</code>: Helpful for
              internal config formats, but avoid it for public API input because it accepts non-standard JSON.
            </li>
          </ul>

          <h3 className="mb-3 mt-6 text-xl font-medium">Blessed Object Example</h3>
          <div className="overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="text-sm">{`package User;

sub new {
    my ($class, $id, $name) = @_;
    bless { id => $id, name => $name }, $class;
}

sub TO_JSON {
    my ($self) = @_;
    return { id => $self->{id}, name => $self->{name} };
}

package main;
use JSON;

my $user = User->new(7, "Mina");
my $json = JSON->new->convert_blessed->encode($user);
`}</pre>
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Gauge className="mr-3 text-teal-500" size={28} />
            Performance and Deployment Consistency
          </h2>
          <p>
            XS backends remain materially faster for heavy JSON workloads, but performance is only half the story.
            Consistency matters too. If one environment uses{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON::XS</code> and another
            silently falls back to <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON::PP</code>
            , edge behavior around booleans, blessed values, or defaults can show up in tests and logs.
          </p>
          <p className="mt-4">
            When that matters, pin the backend explicitly with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">PERL_JSON_BACKEND</code> or
            depend on the backend you want directly. A common pattern is to keep general application code on the JSON
            API while forcing backend choice in CI and production so output is repeatable.
          </p>
          <div className="overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="text-sm">{`PERL_JSON_BACKEND=JSON::XS

# or, if you want an ordered fallback chain:
PERL_JSON_BACKEND=Cpanel::JSON::XS,JSON::XS,JSON::PP
`}</pre>
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <AlertTriangle className="mr-3 text-orange-500" size={28} />
            Common Mistakes and Troubleshooting
          </h2>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              Encoding <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">"false"</code> or{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">"true"</code> as strings
              when your API actually expects JSON booleans.
            </li>
            <li>
              Assuming hash order is stable without enabling{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">canonical</code>.
            </li>
            <li>
              Passing non-standard JSON from logs or hand-edited config files into strict decoders and then treating the
              parser error as a Perl bug.
            </li>
            <li>
              Forgetting that unknown blessed objects throw during encoding unless you opt into{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">convert_blessed</code> or{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">allow_blessed</code>.
            </li>
          </ul>
          <p className="mt-4">
            When a payload is failing to decode, formatting and validating the JSON first is often faster than stepping
            through Perl line by line. Clean structure makes backend-specific errors much easier to interpret.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Package className="mr-3 text-blue-500" size={28} />
            Bottom Line
          </h2>
          <p>
            Perl&apos;s JSON support is mature and flexible. The main choice is not whether Perl can handle JSON, but how
            explicit you want to be about backend selection, boolean behavior, and object serialization. Start with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON</code> for the common API,
            move to <code className="rounded bg-gray-100 px-1 py-0.5 font-mono dark:bg-gray-700">JSON::PP</code> when
            you want core-only portability, and use XS when throughput is part of the requirement rather than a guess.
          </p>
        </section>
      </div>
    </div>
  );
}

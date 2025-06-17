import type { Metadata } from "next";
import { SquareArrowRight, SquareArrowLeft, Settings, Gauge, AlertTriangle, Package } from "lucide-react"; // Using lucide-react as allowed

export const metadata: Metadata = {
  title: "Perl's JSON Handling Capabilities | Developer Guide",
  description:
    "Explore how Perl handles JSON data using core and CPAN modules like JSON, JSON::PP, and JSON::XS, with examples for encoding and decoding.",
};

export default function PerlJsonHandlingArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Perl's JSON Handling Capabilities</h1>

      <div className="space-y-8">
        <p className="text-lg">
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web and in many
          applications. Perl, with its rich history and extensive module ecosystem, provides robust and efficient ways
          to handle JSON data, allowing developers to seamlessly integrate Perl programs with APIs and services that
          communicate using JSON.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Package className="mr-3 text-blue-500" size={28} />
            Key JSON Modules in Perl
          </h2>
          <p>
            Perl's primary interface for JSON handling comes through a family of modules available on CPAN
            (Comprehensive Perl Archive Network). The most common and recommended way to interact with JSON is via the
            umbrella module, <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON</code>.
          </p>
          <p className="mt-4">
            The <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON</code> module acts as
            a compatibility layer and often prefers to use the fastest available backend module installed on the system.
            The two primary backend modules are:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::XS</code>: The eXtreme
              Speed JSON serializer/deserializer. This is implemented in C and offers the best performance. If
              available, the <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON</code>{" "}
              module will typically favor this.
            </li>
            <li>
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::PP</code>: The Pure
              Perl JSON serializer/deserializer. This is a fallback implementation written entirely in Perl. It's slower
              than <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::XS</code> but
              serves as a reliable option when C compilers or specific dependencies are an issue. It is included in the
              Perl core distribution since version 5.14.
            </li>
          </ul>
          <p className="mt-4">
            For most applications, simply using{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">use JSON;</code> is sufficient.
            Perl will automatically select the best available backend.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <SquareArrowRight className="mr-3 text-green-500" size={28} />
            Encoding Perl Data to JSON
          </h2>
          <p>
            Encoding (or serializing) involves converting Perl data structures (scalars, arrays, hashes) into a JSON
            formatted string. The{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">encode_json</code> function is
            used for this purpose. It takes a Perl scalar, array reference, or hash reference as input and returns a
            JSON string.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">Encoding a Hash</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <pre className="text-sm">
              {`#!/usr/bin/perl
use strict;
use warnings;
use JSON;

my %data = (
    name    => "Alice",
    age     => 30,
    city    => "Wonderland",
    isStudent => \`\`false\`\`, # Representing boolean as string initially, will handle later
);

# encode_json expects a reference
my $json_string = encode_json(\\%data);

print "Encoded JSON String (Hash):\\n";
print $json_string;
print "\\n";
`}
            </pre>
          </div>
          <p className="mt-2">
            Output for the above might look like:{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">{`{"name":"Alice","city":"Wonderland","age":30,"isStudent":"false"}`}</code>{" "}
            (order of keys in hashes is not guaranteed in JSON unless pretty-printed).
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">Encoding an Array</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <pre className="text-sm">
              {`#!/usr/bin/perl
use strict;
use warnings;
use JSON;

my @list = (
    "apple",
    "banana",
    { type => "fruit", color => "yellow" },
    123,
    undef, # Perl undef becomes JSON null
);

# encode_json expects a reference
my $json_string = encode_json(\\@list);

print "Encoded JSON String (Array):\\n";
print $json_string;
print "\\n";
`}
            </pre>
          </div>
          <p className="mt-2">
            Output might look like:{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">{`["apple","banana",{"type":"fruit","color":"yellow"},123,null]`}</code>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <SquareArrowLeft className="mr-3 text-red-500" size={28} />
            Decoding JSON to Perl Data
          </h2>
          <p>
            Decoding (or deserializing) involves parsing a JSON formatted string and converting it back into native Perl
            data structures (typically arrays and hashes). The{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">decode_json</code> function
            takes a JSON string as input and returns a Perl scalar, array reference, or hash reference corresponding to
            the top-level JSON structure.
          </p>
          <p>
            JSON objects{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">&#x7b;...&#x7d;</code> decode
            to Perl hash references{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">&#x7b;...&#x7d;</code>, and
            JSON arrays <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">[...]</code> decode
            to Perl array references{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">[...]</code>. JSON primitives
            (strings, numbers, booleans, null) decode to Perl scalars (strings, numbers, 1 for true, undef for false and
            null).
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">Decoding a JSON Object String</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <pre className="text-sm">
              {`#!/usr/bin/perl
use strict;
use warnings;
use JSON;
use Data::Dumper; # Useful for inspecting complex data structures

my $json_string = '{"name":"Bob","age":25,"isEmployed":true,"skills":["Perl","JSON"]}';

my $data_ref = decode_json($json_string);

print "Decoded Perl Data (Hash Reference):\\n";
# Data::Dumper prints the structure nicely
print Dumper($data_ref);

# Accessing elements:
print "Name: " . $data_ref->{'name'} . "\\n";
print "Age: " . $data_ref->{'age'} . "\\n";
# Booleans decode to 1 for true, undef for false/null by default
print "Is Employed: " . ($data_ref->{'isEmployed'} ? "Yes" : "No") . "\\n";
print "First Skill: " . $data_ref->{'skills'}->[0] . "\\n";
`}
            </pre>
          </div>

          <h3 className="text-xl font-medium mt-6 mb-3">Decoding a JSON Array String</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <pre className="text-sm">
              {`#!/usr/bin/perl
use strict;
use warnings;
use JSON;
use Data::Dumper;

my $json_string = '[{"id":1,"item":"milk"},{"id":2,"item":"bread"}, null]';

my $data_ref = decode_json($json_string);

print "Decoded Perl Data (Array Reference):\\n";
print Dumper($data_ref);

# Accessing elements:
print "Second Item: " . $data_ref->[1]->{'item'} . "\\n";
print "Third element is null: " . (defined $data_ref->[2] ? "No" : "Yes") . "\\n";
`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Settings className="mr-3 text-purple-500" size={28} />
            Configuration Options
          </h2>
          <p>
            The <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON</code> module (and its
            backends) provides several options to control the encoding and decoding process. These can be set globally
            or via object-oriented syntax.
          </p>
          <p className="mt-4">Common options include:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">pretty</code> /{" "}
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">indent</code>: Used during
              encoding to output human-readable, indented JSON.
            </li>
            <li>
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">allow_nonref</code>: Allows
              encoding simple scalars (numbers, strings, booleans, null) which is technically valid JSON according to
              RFC 7159.
            </li>
            <li>
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">allow_blessed</code> /{" "}
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">convert_blessed</code>:
              Controls how blessed references (objects) are handled.
            </li>
            <li>
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">allow_nonref</code>: Allows
              encoding non-reference values.
            </li>
            <li>
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">true_to_json</code> /{" "}
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">false_to_json</code> /{" "}
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">null_to_json</code>: Allows
              specifying how Perl's truth values and undef are represented during encoding. By default, Perl's "truth"
              (any non-empty string, non-zero number) often becomes a JSON string, Perl's "false" (empty string, zero)
              might become a JSON string or number, and{" "}
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">undef</code> becomes JSON{" "}
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">null</code>. Using these
              options (especially{" "}
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">allow_nonref</code> and
              ensuring you pass explicit 1 or 0 or the boolean objects if using them) can map Perl scalars to JSON
              booleans correctly. The{" "}
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::true</code> and{" "}
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::false</code> constants
              can be helpful.
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">Example with Options (Pretty Print, Booleans)</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <pre className="text-sm">
              {`#!/usr/bin/perl
use strict;
use warnings;
use JSON;

# Using object-oriented interface to set options
my $json_encoder = JSON->new->pretty(1)->allow_nonref(1);

my %user = (
    id => 101,
    name => "Charlie",
    isActive => JSON::true, # Use JSON::true for JSON boolean true
    isDeleted => JSON::false, # Use JSON::false for JSON boolean false
    balance => 123.45,
    lastLogin => undef, # Will be encoded as JSON null
);

my $json_string_pretty = $json_encoder->encode(\\%user);

print "Encoded JSON String (Pretty & Booleans):\\n";
print $json_string_pretty;
print "\\n";

# Decoding with options (less common for simple cases, but possible)
my $json_decoder = JSON->new;
my $data_back = $json_decoder->decode($json_string_pretty);
# Note: JSON true/false decode back to Perl's 1 and undef by default
print "\\nDecoded isActive: " . $data_back->{'isActive'} . " (Expected 1)\\n";
print "Decoded isDeleted: " . (defined $data_back->{'isDeleted'} ? $data_back->{'isDeleted'} : "undef") . " (Expected undef)\\n";
`}
            </pre>
          </div>
          <p className="mt-2">Output for the pretty print example:</p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <pre className="text-sm">
              {`{
   "name" : "Charlie",
   "lastLogin" : null,
   "isDeleted" : false,
   "balance" : 123.45,
   "isActive" : true,
   "id" : 101
}`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Gauge className="mr-3 text-teal-500" size={28} />
            Performance Considerations
          </h2>
          <p>
            For high-performance applications that process large amounts of JSON, the choice between{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::XS</code> and{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::PP</code> is significant.
          </p>
          <p className="mt-4">
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::XS</code> is implemented
            in C, which makes it considerably faster for both encoding and decoding compared to the pure-Perl{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::PP</code>. If performance
            is critical and you can compile C extensions on your target environment, always prefer having{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::XS</code> installed.
          </p>
          <p className="mt-4">
            The standard <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON</code> module
            handles this selection automatically, trying{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::XS</code> first, then
            falling back to <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::PP</code>
            . For typical scripting tasks or less performance-sensitive web application backends, the difference might
            not be noticeable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="mr-3 text-orange-500" size={28} />
            Handling Errors
          </h2>
          <p>
            JSON decoding can fail if the input string is not valid JSON. Both{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">encode_json</code> and{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">decode_json</code> will throw
            an exception (die) on error by default. In Perl, the standard way to catch such exceptions is using an{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">eval</code> block.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">Example Error Handling</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <pre className="text-sm">
              {`#!/usr/bin/perl
use strict;
use warnings;
use JSON;

my $invalid_json = '{"name":"David","age":}'; # Invalid JSON

my $data_ref;
eval {
    $data_ref = decode_json($invalid_json);
};

if ($@) {
    # $@ contains the error message if eval failed
    print "Error decoding JSON: $@";
} else {
    print "Successfully decoded JSON.\\n";
    # Process $data_ref
}
`}
            </pre>
          </div>
          <p className="mt-2">
            The error message from{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::XS</code> or{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::PP</code> usually
            provides details about the parsing error, including the position in the string where it occurred.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
          <p>
            Perl offers excellent capabilities for handling JSON data through the powerful and flexible{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON</code> module and its
            highly optimized backends like{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">JSON::XS</code>. Whether you
            are building web APIs, processing configuration files, or interacting with external services, Perl's JSON
            modules provide the necessary tools to convert between native Perl data structures and JSON strings
            efficiently and reliably. By understanding the core functions (
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">encode_json</code>,{" "}
            <code className="font-mono bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-700">decode_json</code>), available
            options, and performance considerations, you can effectively integrate JSON handling into your Perl
            applications.
          </p>
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { AlertTriangle, CheckCircle, Code, FolderTree, List, Shuffle } from "lucide-react";
import React from "react";

export const metadata: Metadata = {
  title: "Ruby on Rails JSON Formatting Best Practices | Rails 7/8 API Guide",
  description:
    "Practical Ruby on Rails JSON formatting best practices for Rails APIs: render json vs to_json, serializer choices, key naming, ISO 8601 timestamps, pagination, and error payloads.",
};

export default function RailsJsonFormattingPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Ruby on Rails JSON Formatting Best Practices</h1>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <CheckCircle className="mr-2 text-green-500" size={24} /> Recommended Rails Baseline
          </h2>
          <p>
            For modern Rails APIs, the hardest part is usually not generating JSON. It is keeping the contract stable
            as controllers, models, and clients evolve. A good default in Rails 7 and Rails 8 is to shape responses
            with an explicit hash or serializer, render through <code>render json:</code>, standardize keys and
            timestamps, and keep nested data shallow unless the client explicitly needs more.
          </p>
          <ul className="my-4 list-disc space-y-2 pl-6">
            <li>Use one response shape consistently across the whole API.</li>
            <li>Let controllers render JSON, but keep formatting rules out of model classes where possible.</li>
            <li>Prefer compact production payloads; pretty-print JSON for debugging, docs, or tests only.</li>
            <li>Serialize only fields you intend to expose instead of dumping full Active Record objects.</li>
          </ul>
          <p className="mt-4 flex items-start text-blue-600 dark:text-blue-400">
            <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={20} />
            <strong>
              Best Practice: Decide your JSON contract first, then make Rails implement that contract consistently.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Code className="mr-2 text-purple-500" size={24} /> Use Rails Rendering the Right Way
          </h2>
          <p>
            In current Rails, <code>render json:</code> handles JSON encoding for you. That means you usually should
            not call <code>to_json</code> manually in the controller. The useful distinction is this:
          </p>
          <ul className="my-4 list-disc space-y-2 pl-6">
            <li>
              <code>as_json</code> returns a Ruby hash/array structure that Rails can still compose, transform, or wrap.
            </li>
            <li>
              <code>to_json</code> returns an encoded JSON string, which is usually too late in the pipeline for clean
              controller logic.
            </li>
          </ul>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="mb-2 font-mono text-sm text-gray-700 dark:text-gray-300">Controller example:</h3>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`class Api::V1::UsersController < ApplicationController
  def show
    user = User.find(params[:id])

    render json: {
      data: {
        id: user.id.to_s,
        type: "user",
        attributes: {
          email: user.email,
          created_at: user.created_at.iso8601(3)
        }
      }
    }
  end
end`}
            </pre>
          </div>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="mb-2 font-mono text-sm text-gray-700 dark:text-gray-300">
              <code>as_json</code> vs <code>to_json</code>:
            </h3>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`user.as_json(only: %i[id email])
# => { "id" => 1, "email" => "a@example.com" }

user.to_json
# => "{\\"id\\":1,\\"email\\":\\"a@example.com\\"}"`}
            </pre>
          </div>
          <p className="mt-4 flex items-start text-blue-600 dark:text-blue-400">
            <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={20} />
            <strong>
              Best Practice: In controllers, prefer <code>render json: some_hash_or_serializer_output</code> instead of{" "}
              <code>render json: model.to_json</code>.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Shuffle className="mr-2 text-blue-500" size={24} /> Pick One Key Convention and Enforce It
          </h2>
          <p>
            Rails applications naturally use <code>snake_case</code> for Ruby methods, params, and database columns.
            Many JavaScript clients prefer <code>camelCase</code>. Either choice is defensible. The mistake is mixing
            both across endpoints.
          </p>
          <h3 className="mb-3 mt-6 text-xl font-semibold">When snake_case is the better default</h3>
          <p>
            Keep <code>snake_case</code> if your API is mostly consumed by Rails or backend services, or if you want the
            simplest mapping from serializers to model attributes.
          </p>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h4 className="mb-2 font-mono text-sm text-gray-700 dark:text-gray-300">Snake case response:</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`{
  "user_id": "42",
  "first_name": "Alice",
  "last_name": "Smith",
  "email_verified": true
}`}
            </pre>
          </div>
          <h3 className="mb-3 mt-6 text-xl font-semibold">When camelCase is worth it</h3>
          <p>
            Use <code>camelCase</code> when your contract is primarily for web or mobile frontend consumers and you want
            the client to receive keys in its native style. Do the transform in your serializer or JSON builder, not by
            renaming database columns or Ruby methods.
          </p>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h4 className="mb-2 font-mono text-sm text-gray-700 dark:text-gray-300">Jbuilder and serializer options:</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`# Jbuilder
json.key_format! camelize: :lower
json.deep_format_keys!

# JSONAPI::Serializer
class UserSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
end`}
            </pre>
          </div>
          <p className="mt-4 flex items-start text-blue-600 dark:text-blue-400">
            <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={20} />
            <strong>Best Practice: Choose one key style for the API surface and convert at the presentation layer.</strong>
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Code className="mr-2 text-teal-500" size={24} /> Format Types Deliberately
          </h2>
          <p>
            JSON bugs often come from type drift, not indentation. Rails already helps here, but your contract still
            needs explicit rules for timestamps, nulls, booleans, money, and identifiers.
          </p>
          <ul className="my-4 list-disc space-y-2 pl-6">
            <li>
              Timestamps: Keep them as ISO 8601 strings. Rails uses standard JSON time formatting by default, and it is
              worth preserving that consistency across the API.
            </li>
            <li>
              Nulls: Use <code>null</code> when a field exists but currently has no value. Omit a field only when it is
              intentionally unavailable, permission-gated, or not requested.
            </li>
            <li>
              Booleans: Return real <code>true</code> and <code>false</code>, never <code>0</code>, <code>1</code>, or
              string equivalents.
            </li>
            <li>
              IDs: If JavaScript clients may consume the API and identifiers can exceed the safe integer range, send IDs
              as strings.
            </li>
            <li>
              Money and exact decimals: Prefer an integer minor unit such as cents, or a decimal string, rather than
              relying on floating-point assumptions in the client.
            </li>
          </ul>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h4 className="mb-2 font-mono text-sm text-gray-700 dark:text-gray-300">Example payload:</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`{
  "id": "9007199254740993",
  "starts_at": "2026-03-11T09:30:00.123Z",
  "cancelled_at": null,
  "price_cents": 1999,
  "paid": true
}`}
            </pre>
          </div>
          <p className="mt-4 flex items-start text-blue-600 dark:text-blue-400">
            <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={20} />
            <strong>
              Best Practice: Make every field&apos;s type stable enough that clients never have to guess or branch on it.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <FolderTree className="mr-2 text-green-600" size={24} /> Keep Associations Predictable and Cheap
          </h2>
          <p>
            Deeply nested Rails JSON is attractive at first because it reduces client requests. It also creates larger
            payloads, hides N+1 queries, and makes response contracts harder to evolve. Most APIs age better when the
            default response is shallow and expanded relationships are opt-in.
          </p>
          <h3 className="mb-3 mt-6 text-xl font-semibold">A practical rule</h3>
          <ul className="my-4 list-disc space-y-2 pl-6">
            <li>Embed small, always-needed child data only when it is truly part of the primary resource.</li>
            <li>Use IDs or relationship objects for larger associations.</li>
            <li>
              If you support <code>include</code> or similar expansion params, eager load the same relationships in the
              query layer.
            </li>
          </ul>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h4 className="mb-2 font-mono text-sm text-gray-700 dark:text-gray-300">Safer pattern:</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`posts = Post.includes(:author).order(created_at: :desc)

render json: {
  data: posts.map { |post|
    {
      id: post.id.to_s,
      title: post.title,
      author: {
        id: post.author.id.to_s,
        name: post.author.name
      }
    }
  }
}`}
            </pre>
          </div>
          <p className="mt-4 flex items-start text-blue-600 dark:text-blue-400">
            <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={20} />
            <strong>
              Best Practice: Never serialize associations you did not preload, and do not let convenience turn into N+1
              queries.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <List className="mr-2 text-orange-500" size={24} /> Wrap Lists with Metadata and Links
          </h2>
          <p>
            Collection endpoints should tell clients more than just the current page of records. A stable list envelope
            makes pagination, caching, and debugging easier.
          </p>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h4 className="mb-2 font-mono text-sm text-gray-700 dark:text-gray-300">Collection response:</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`{
  "data": [
    { "id": "1", "name": "Item 1" },
    { "id": "2", "name": "Item 2" }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 25,
    "total_pages": 10,
    "total_count": 250
  },
  "links": {
    "self": "/api/v1/items?page=1",
    "next": "/api/v1/items?page=2",
    "prev": null
  }
}`}
            </pre>
          </div>
          <p>
            If you already follow JSON:API or another external spec, keep that envelope everywhere instead of creating
            one style for list endpoints and another for detail endpoints.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <AlertTriangle className="mr-2 text-red-500" size={24} /> Return Machine-Friendly Errors
          </h2>
          <p>
            Clients should not need to parse free-form English to know what went wrong. Good Rails JSON errors include a
            stable code, a human-readable message, the HTTP status, and enough context to highlight the failing field or
            support the request.
          </p>
          <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h4 className="mb-2 font-mono text-sm text-gray-700 dark:text-gray-300">Error response:</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`{
  "errors": [
    {
      "status": "422",
      "code": "invalid_email",
      "detail": "Email is not a valid address",
      "source": { "pointer": "/data/attributes/email" },
      "request_id": "f5c4ce20-65f1-4e8a-8b6d-8d2bc62b3df8"
    }
  ]
}`}
            </pre>
          </div>
          <p className="mt-4 flex items-start text-blue-600 dark:text-blue-400">
            <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={20} />
            <strong>
              Best Practice: Keep the top-level <code>errors</code> shape identical for validation failures, auth
              failures, and business-rule failures.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Code className="mr-2 text-indigo-500" size={24} /> Choose the Smallest Tool That Keeps You Honest
          </h2>
          <p>
            Rails does not force one JSON formatting approach. Pick the smallest one that still keeps response shaping
            explicit and testable.
          </p>
          <ul className="my-4 list-disc space-y-2 pl-6">
            <li>
              <strong>Plain hashes with <code>render json:</code>:</strong> best for tiny internal endpoints or one-off
              actions.
            </li>
            <li>
              <strong>Jbuilder:</strong> good when you want a view-like DSL and built-in key formatting controls.
            </li>
            <li>
              <strong>JSONAPI::Serializer:</strong> a strong fit when you want JSON:API documents, relationship
              handling, sparse fieldsets, and key transforms in serializer classes.
            </li>
          </ul>
          <p>
            What matters more than the gem choice is the boundary: controllers should coordinate, serializers or builders
            should format, and models should focus on domain logic instead of presentation.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <AlertTriangle className="mr-2 text-amber-500" size={24} /> Common Rails JSON Mistakes
          </h2>
          <ul className="my-4 list-disc space-y-2 pl-6">
            <li>Calling <code>render json: record.to_json</code> when <code>render json: record</code> or a hash is cleaner.</li>
            <li>Exposing full model attributes and associations by default.</li>
            <li>Returning one endpoint in <code>snake_case</code> and the next in <code>camelCase</code>.</li>
            <li>Pretty-printing production responses and paying the bandwidth cost for no client benefit.</li>
            <li>Letting JSON routes fall back to HTML error pages or framework-default exception pages.</li>
            <li>Serializing nested records without matching <code>includes</code> or <code>preload</code> calls.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <CheckCircle className="mr-2 text-green-500" size={24} /> Bottom Line
          </h2>
          <p>
            The best Ruby on Rails JSON formatting strategy is boring in the right way: explicit, documented, and
            consistent. Use <code>render json:</code> as the boundary, keep key and type rules stable, preload what you
            serialize, and make error payloads as predictable as success payloads. That gives frontend and API consumers
            a contract they can trust as your Rails app grows.
          </p>
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Code, FileText, Package, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Elixir/Phoenix JSON Formatter Implementations | Offline Tools",
  description:
    "Current Elixir and Phoenix JSON formatting patterns with Jason, Phoenix 1.7/1.8 JSON modules, @derive examples, pretty printing, and common API pitfalls.",
};

export default function ElixirPhoenixJsonFormattingArticle() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Elixir/Phoenix JSON Formatter Implementations</h1>

      <div className="space-y-6">
        <p>
          If you need to format JSON in a modern Phoenix app, start with the response shape you want and then choose
          the right layer. In Phoenix 1.7 and 1.8, the usual pattern is to keep endpoint-specific formatting in a{" "}
          <code>*JSON</code> module such as <code>MyAppWeb.UserJSON</code>, use <code>Jason.Encoder</code> only when a
          struct truly needs a reusable default JSON representation, and reserve pretty-printed JSON for debugging,
          logs, or exported files.
        </p>
        <p>
          That split keeps controllers thin, avoids leaking internal schema fields, and makes it easier to return
          different shapes for list, detail, admin, and public API responses.
        </p>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Package className="h-6 w-6" />
          <span>What Phoenix Uses Today</span>
        </h2>
        <p>
          Phoenix uses the configured JSON library to serialize maps, lists, and other encodable values. In most
          projects that library is <code>Jason</code>. For JSON endpoints, current Phoenix apps typically render
          through modules like <code>MyAppWeb.UserJSON</code> and call <code>render(conn, :show, user: user)</code> or{" "}
          <code>render(conn, :index, users: users)</code> from the controller.
        </p>
        <p>
          This is more maintainable than pushing all formatting into structs, because the response shape belongs to the
          endpoint rather than to the database schema.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Recommended Phoenix Pattern</h3>
          <div className="overflow-x-auto rounded bg-white p-3 text-sm leading-relaxed dark:bg-gray-900">
            <pre>
              {`defmodule MyAppWeb.UserController do
  use MyAppWeb, :controller
  alias MyApp.Accounts

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, :show, user: user)
  end

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, :index, users: users)
  end
end

defmodule MyAppWeb.UserJSON do
  alias MyApp.Accounts.User

  def show(%{user: user}) do
    %{data: data(user)}
  end

  def index(%{users: users}) do
    %{data: Enum.map(users, &data/1)}
  end

  defp data(%User{} = user) do
    %{
      id: user.id,
      email: user.email,
      isActive: user.is_active,
      insertedAt: DateTime.to_iso8601(user.inserted_at)
    }
  end
end`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            If you are still using older examples with <code>render("user.json", ...)</code>, treat them as legacy
            Phoenix style. The current JSON module approach is the clearer default for new code.
          </p>
        </div>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Code className="h-6 w-6" />
          <span>
            When To Use <code>Jason.Encoder</code>
          </span>
        </h2>
        <p>
          Implement or derive <code>Jason.Encoder</code> when a struct needs one stable JSON representation across many
          places, for example for internal messages, cached payloads, or a very small API. Do not reach for it first if
          the same struct appears in multiple endpoint shapes.
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          Safe Default With <code>@derive</code>
        </h3>
        <p>
          For a schema or struct that only needs field selection, put <code>@derive</code> directly above the{" "}
          <code>schema</code> or <code>defstruct</code>. That is the valid concise pattern. It should not be wrapped in
          a custom <code>defimpl</code> block.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">
            Example: Ecto Schema With <code>@derive</code>
          </h3>
          <div className="overflow-x-auto rounded bg-white p-3 text-sm leading-relaxed dark:bg-gray-900">
            <pre>
              {`defmodule MyApp.Accounts.User do
  use Ecto.Schema

  @derive {Jason.Encoder, only: [:id, :email, :is_active, :inserted_at]}
  schema "users" do
    field :email, :string
    field :is_active, :boolean, default: false
    field :hashed_password, :string
    timestamps(type: :utc_datetime)
  end
end`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            This keeps sensitive fields such as <code>hashed_password</code> out of the JSON output by default.
          </p>
        </div>

        <h3 className="mt-6 text-xl font-semibold">Explicit Encoder For Real Transformations</h3>
        <p>
          If you need renamed keys, computed values, or nested custom output, write a real protocol implementation
          instead of stretching <code>@derive</code> too far.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">
            Example: Custom <code>Jason.Encoder</code> Implementation
          </h3>
          <div className="overflow-x-auto rounded bg-white p-3 text-sm leading-relaxed dark:bg-gray-900">
            <pre>
              {`defmodule MyApp.Billing.InvoiceTotal do
  defstruct [:amount_cents, :currency]
end

defimpl Jason.Encoder, for: MyApp.Billing.InvoiceTotal do
  def encode(%{amount_cents: cents, currency: currency}, opts) do
    Jason.Encode.map(
      %{
        amount: cents / 100,
        currency: currency
      },
      opts
    )
  end
end`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Keep protocol implementations focused on reusable defaults. If one controller needs a different shape, that
            controller should usually render through a JSON module instead.
          </p>
        </div>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <FileText className="h-6 w-6" />
          <span>Formatting Directly With <code>json(conn, data)</code></span>
        </h2>
        <p>
          For small endpoints like health checks, feature flags, or webhook acknowledgements, you do not need a
          dedicated JSON module. Returning a map straight from the controller is fine.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Example: Small Controller Response</h3>
          <div className="overflow-x-auto rounded bg-white p-3 text-sm leading-relaxed dark:bg-gray-900">
            <pre>
              {`def health(conn, _params) do
  json(conn, %{
    status: "ok",
    checkedAt: DateTime.utc_now() |> DateTime.to_iso8601()
  })
end`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Once the payload grows past a couple of fields or you need multiple shapes for the same resource, move that
            formatting into a dedicated JSON module.
          </p>
        </div>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Settings className="h-6 w-6" />
          <span>Pretty Printing: Useful For Debugging, Rarely For APIs</span>
        </h2>
        <p>
          If you need human-readable JSON, use <code>Jason.encode!/2</code> with <code>pretty: true</code>. That is
          ideal for logs, local debugging, fixtures, copied examples, or downloaded files. It is usually not worth
          sending pretty-printed JSON from production API endpoints because it adds bytes without helping most clients.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Example: Generate Readable JSON</h3>
          <div className="overflow-x-auto rounded bg-white p-3 text-sm leading-relaxed dark:bg-gray-900">
            <pre>
              {`payload = MyAppWeb.UserJSON.show(%{user: user})

pretty_json =
  Jason.encode!(payload, pretty: true)

IO.puts(pretty_json)`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            If a client truly requires pretty output, encode the response yourself and send it explicitly. Do that on
            purpose, not as a global default.
          </p>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Common Pitfalls</h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Put <code>@derive</code> before <code>schema</code> or <code>defstruct</code>. Do not create a fake{" "}
            <code>defimpl</code> block just to configure derivation.
          </li>
          <li>
            Be deliberate about key style. Atom keys are fine when the JSON shape matches Elixir names, but explicit
            string keys are clearer when you need exact camelCase output.
          </li>
          <li>
            Do not serialize sensitive fields by accident. Password hashes, tokens, internal flags, and admin-only
            attributes should be excluded on purpose.
          </li>
          <li>
            Preload associations before rendering them. JSON modules are a good place to make missing preload problems
            obvious.
          </li>
          <li>
            Normalize timestamps, decimals, and other non-trivial values intentionally so API consumers get a stable
            format.
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Practical Rule Of Thumb</h2>
        <p>
          Use <code>MyAppWeb.*JSON</code> modules for most Phoenix API responses, use <code>json(conn, data)</code> for
          tiny one-off payloads, and use <code>Jason.Encoder</code> only when a struct genuinely deserves one shared
          JSON representation. That combination stays close to current Phoenix conventions and scales better than trying
          to solve every formatting problem at the protocol layer.
        </p>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { Code, FileText, Package, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Elixir/Phoenix JSON Formatter Implementations | Offline Tools",
  description:
    "Explore various ways to format JSON responses in Elixir and the Phoenix Framework, from implementing Jason.Encoder to using custom view logic.",
};

export default function ElixirPhoenixJsonFormattingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Elixir/Phoenix JSON Formatter Implementations</h1>

      <div className="space-y-6">
        <p>
          In web development, APIs often communicate using JSON. When building APIs with Elixir and the Phoenix
          Framework, you'll frequently need to control exactly how your data structures (like Ecto schemas or simple
          maps) are serialized into JSON. While Phoenix handles the basic encoding automatically, there are many
          scenarios where custom formatting is required. This page explores the common techniques for achieving precise
          JSON output in your Phoenix applications.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Package className="w-6 h-6" />
          <span>Default Phoenix Behavior (with Jason)</span>
        </h2>
        <p>
          By default, Phoenix uses the <code>Jason</code> library (or historically, <code>Poison</code>) for JSON
          encoding and decoding.
          <code>Jason</code> works by implementing the <code>Jason.Encoder</code> protocol for various Elixir data
          types. When you call <code>json(conn, data)</code> in a controller or render a view that produces JSON,
          Phoenix serializes the provided <code>data</code> structure using this protocol.
        </p>
        <p>
          Built-in types like lists, maps, strings, numbers, booleans, and <code>nil</code> have default
          <code>Jason.Encoder</code> implementations. For custom structs, you typically need to tell <code>Jason</code>{" "}
          how to encode them.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6" />
          <span>
            Implementing the <code>Jason.Encoder</code> Protocol
          </span>
        </h2>
        <p>
          The most fundamental way to control how a specific struct is encoded is by implementing the
          <code>Jason.Encoder</code> protocol for it. This is particularly useful when you want a consistent default
          JSON representation for a struct across your application.
        </p>
        <p>
          You need to define an <code>encode/2</code> function for your struct. The first argument is the struct
          instance, and the second is options (which you can often ignore or pass through). The function should return a{" "}
          <code>Jason.Encode.t()</code> which is typically a map or a list of other encodable values.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Encoding a Custom Struct</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm leading-relaxed">
            <pre>
              {`defmodule MyApp.User do
  defstruct [:id, :name, :email, :is_active]
end

defimpl Jason.Encoder, for: MyApp.User do
  def encode(user, options) do
    # Return a map representing the desired JSON structure
    %{
      id: user.id,
      full_name: user.name, # Renaming a field
      email_address: user.email,
      status: if user.is_active, do: "active", else: "inactive" # Transforming a value
    }
    |&gt; Jason.Encode.encode(options) # Ensure nested structures are also encoded
  end
end`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            In this example, the <code>MyApp.User</code> struct is encoded into a JSON object with different field names
            and a transformed boolean value. The <code>|&gt; Jason.Encode.encode(options)</code> call is crucial to
            ensure that any nested data structures within the returned map are also correctly encoded by{" "}
            <code>Jason</code>.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          Using <code>derive</code> for Ecto Schemas
        </h3>
        <p>
          For Ecto schemas, <code>Jason</code> provides a convenient <code>derive</code> option in <code>defimpl</code>{" "}
          that automatically generates the <code>encode/2</code> function based on the schema's fields. You can specify
          which fields to include or exclude, and even add virtual fields.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">
            Example: <code>Jason.Encoder</code> for Ecto Schema using <code>derive</code>
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm leading-relaxed">
            <pre>
              {`defmodule MyApp.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :email, :string
    field :hashed_password, :string
    field :is_active, :boolean, default: false
    timestamps()
  end

  # ... changeset definitions ...

  defimpl Jason.Encoder, for: __MODULE__ do
    @derive {
      # The default options usually include all fields
      # You can customize here:
      :inspect, # Optional: Keeps default Elixir inspect output for debugging
      only: [:id, :name, :email, :inserted_at], # Only include these fields
      # except: [:hashed_password], # Or exclude specific fields
      # add: [:virtual_field], # Add virtual fields defined elsewhere
      # remove: [:timestamp_field] # Remove timestamp fields specifically
    }
  end

  # Example of a virtual field you might add
  # def virtual_field(_user), do: "some_computed_value"
end`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            The <code>@derive</code> attribute makes it easy to define a default encoding for your Ecto schema. You
            should typically exclude sensitive fields like passwords.
          </p>
        </div>
        <p>
          If you need more complex logic than <code>only</code>/<code>except</code>/<code>add</code>/<code>remove</code>
          , you can always manually implement <code>encode/2</code> for the Ecto schema as shown in the first example.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileText className="w-6 h-6" />
          <span>Formatting in Phoenix Views</span>
        </h2>
        <p>
          Implementing <code>Jason.Encoder</code> provides a default JSON representation. However, API responses often
          need different formats depending on the context (e.g., a list of users versus a single user's detail). Phoenix
          Views are excellent for handling these context-specific transformations.
        </p>
        <p>
          In a Phoenix JSON view, you define functions (typically named after your templates, like
          <code>render("user.json", %&#x7b;user: user&#x7d;)</code> or{" "}
          <code>render("users.json", %&#x7b;users: users&#x7d;)</code>) that transform the assigns (data passed to the
          view) into the desired structure before it's passed to
          <code>json(conn, data)</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Formatting in a Phoenix View</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm leading-relaxed">
            <pre>
              {`defmodule MyAppWeb.UserJSON do
  # This view is responsible for rendering MyApp.Accounts.User data as JSON

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      full_name: user.name, # Same as protocol, but defined in view
      email: user.email,
      status: if user.is_active, do: "active", else: "inactive",
      # Include nested data if needed, potentially rendering other views/data here
      # profile: render("profile.json", %{profile: user.profile}) # Example
    }
  end

  def render("users.json", %{users: users}) do
    # Render a list of users, potentially using the single user render function
    %{
      data: Enum.map(users, &render("user.json", %{user: &1})),
      count: Enum.count(users) # Adding metadata
    }
  end
end`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Views provide flexibility. The data structure returned by the <code>render</code> function is what Phoenix
            will pass to <code>Jason.encode!</code>. This allows you to easily include/exclude fields, rename keys
            (snake_case to camelCase), embed related data, or add metadata to list responses. You can call{" "}
            <code>render</code> recursively to format nested associations.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Snake Case vs Camel Case</h3>
        <p>
          A common formatting requirement is converting snake_case keys (common in Elixir/Ecto) to camelCase (common in
          JavaScript/JSON APIs). You can handle this conversion within your View <code>render</code> functions.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Snake Case to Camel Case in View</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm leading-relaxed">
            <pre>
              {`# Inside MyAppWeb.UserJSON view module

def render("user.json", %{user: user}) do
  %{
    "id" =&gt; user.id, # Use string keys for exact control
    "fullName" =&gt; user.name,
    "emailAddress" =&gt; user.email,
    "isActive" =&gt; user.is_active
  }
end`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Using string keys (<code>"id" =&amp;gt; ...</code>) instead of atom keys (<code>id: ...</code>) in the map
            returned by the view function gives you explicit control over the exact key names in the final JSON output.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Settings className="w-6 h-6" />
          <span>Formatting in Controllers/Contexts (Pre-Encoding)</span>
        </h2>
        <p>
          Sometimes, you might want to format data before passing it to a view or even bypassing views entirely and
          using <code>json(conn, data)</code> directly in the controller. This is common in simple APIs or when the
          formatting logic is tightly coupled with the data fetching logic in your contexts.
        </p>
        <p>
          You can create dedicated functions in your context modules (or even helper modules) that take data structures
          and return maps or lists formatted for JSON output.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Formatting in a Context Function</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm leading-relaxed">
            <pre>
              {`defmodule MyApp.Accounts do
  alias MyApp.Accounts.User

  # ... other context functions ...

  @doc """
  Gets a user and formats it for a public API response.
  """
  def get_user_for_api!(id) do
    User
    |&gt; Ecto.Repo.get!(id)
    |&gt; format_user_for_api() # Call the formatting helper
  end

  @doc """
  Formats a User struct into a JSON-friendly map.
  """
  def format_user_for_api(%User{} = user) do
    %{
      "id" =&gt; user.id,
      "fullName" =&gt; user.name,
      "email" =&gt; user.email, # Maybe only include email for certain users/roles
      "isActive" =&gt; user.is_active,
      "createdAt" =&gt; DateTime.to_unix(user.inserted_at) # Example: format timestamp
    }
  end

  # For lists
  def format_users_for_api(users) do
    Enum.map(users, &amp;format_user_for_api(&amp;1))
  end
end`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            This approach keeps the formatting logic close to the data source (the context) or within the controller
            itself. It's less declarative than using views but can be simpler for smaller APIs or specific endpoints.
            You would then call <code>json(conn, MyApp.Accounts.get_user_for_api!(id))</code> in your controller.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6" />
          <span>Combining Techniques</span>
        </h2>
        <p>It's common to use a combination of these techniques:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Implement <code>Jason.Encoder</code> with <code>derive</code> for Ecto schemas for a sensible *default*
            representation, especially for internal APIs or debugging.
          </li>
          <li>
            Use Phoenix Views for *public API* responses, handling specific field selection, renaming (snake_case to
            camelCase), embedding, and conditional logic.
          </li>
          <li>
            Use helper functions in Contexts or dedicated formatting modules for complex transformations or when
            skipping the view layer.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Elixir and Phoenix provide powerful and flexible ways to control your JSON output. By understanding the{" "}
          <code>Jason.Encoder</code> protocol and leveraging Phoenix Views effectively, you can ensure your API
          responses are precisely formatted, easy to consume by clients, and maintainable as your application grows.
          Whether you need a simple default encoding, context-specific transformations, or complex custom structures,
          the Elixir ecosystem offers the tools to achieve it.
        </p>
      </div>
    </>
  );
}

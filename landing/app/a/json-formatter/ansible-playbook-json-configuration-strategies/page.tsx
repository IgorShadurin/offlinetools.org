import type { Metadata } from "next";
import { Code, FileJson, Variable, Search, CheckCheck, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Ansible Playbook JSON Configuration Strategies | Your Site Name",
  description: "Explore effective strategies for incorporating and managing JSON data within Ansible Playbooks for configuration and automation.",
};

export default function AnsibleJsonConfigPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="w-8 h-8 mr-3 text-blue-600" />
        Ansible Playbook JSON Configuration Strategies
      </h1>

      <div className="space-y-6 text-gray-800 dark:text-gray-200">
        <p>
          Ansible playbooks are primarily written in YAML, a human-readable data serialization format. However, in modern automation workflows, you often need to interact with data in JSON format. This could be fetching data from APIs, processing output from commands, defining complex nested variables, or configuring applications that expect JSON input.
        </p>
        <p>
          Integrating JSON effectively into your Ansible playbooks requires understanding how Ansible handles data transformation and manipulation. This article explores common strategies for working with JSON within your playbooks.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-green-600" />
          Handling JSON Data with Filters
        </h2>
        <p>
          Ansible provides built-in filters powered by Jinja2 to easily convert between YAML/Python objects and JSON strings. The two primary filters for this are <code>to_json</code> and <code>from_json</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Info className="w-5 h-5 mr-2 text-yellow-600" />
          The <code>to_json</code> Filter
        </h3>
        <p>
          The <code>to_json</code> filter converts an Ansible variable (which is essentially a Python data structure like a dictionary or list) into a JSON formatted string. This is useful when you need to pass data to a command-line tool, an API call, or write it to a file in JSON format.
        </p>
        <p>
          You can optionally pass arguments like <code>indent</code> to make the output human-readable.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Using <code>to_json</code></h4>
          <pre>
            {`---
- name: Demonstrate to_json filter
  hosts: localhost
  gather_facts: false

  vars:
    my_data:
      name: "Ansible User"
      roles: ["developer", "sysadmin"]
      settings:
        verbose: true
        level: 5

  tasks:
    - name: Output data as a JSON string
      debug:
        msg: "{{ my_data | to_json }}"

    - name: Output data as a pretty-printed JSON string
      debug:
        msg: "{{ my_data | to_json(indent=2) }}"

    - name: Create a JSON file from the variable
      copy:
        content: "{{ my_data | to_json(indent=2) }}"
        dest: /tmp/my_config.json
`}
          </pre>
        </div>
        <p>
          The first <code>debug</code> task will output a compact JSON string. The second will output a formatted, indented string, which is often easier to read. The <code>copy</code> task demonstrates how to write this JSON string to a file.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Info className="w-5 h-5 mr-2 text-yellow-600" />
          The <code>from_json</code> Filter
        </h3>
        <p>
          The <code>from_json</code> filter (or its alias <code>from_yaml</code>, as YAML is a superset of JSON) takes a JSON formatted string and converts it into an Ansible variable (a Python dictionary or list). This is essential when you read JSON from a file, receive it from an API response, or capture it from command output.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Using <code>from_json</code></h4>
          <pre>
            {`---
- name: Demonstrate from_json filter
  hosts: localhost
  gather_facts: false

  tasks:
    - name: Simulate receiving JSON data from a command/API
      set_fact:
        json_output_string: '{"status": "success", "data": {"id": 123, "items": ["apple", "banana"]}}'

    - name: Convert JSON string to Ansible variable
      set_fact:
        parsed_data: "{{ json_output_string | from_json }}"

    - name: Access elements from the parsed JSON data
      debug:
        msg: "Status: {{ parsed_data.status }}, First item: {{ parsed_data.data.items[0] }}"
`}
          </pre>
        </div>
        <p>
          After applying <code>from_json</code>, you can navigate the resulting Ansible variable using standard dot or bracket notation, just like any other variable in your playbook.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Variable className="w-6 h-6 mr-2 text-purple-600" />
          Storing JSON Data in Variables
        </h2>
        <p>
          While you can store JSON as a string and use <code>from_json</code>, Ansible (being YAML-based) is perfectly capable of representing nested data structures directly.
        </p>
        <p>
          Often, a JSON structure can be directly translated into equivalent YAML structure within a playbook's <code>vars</code> section or a separate variable file. Ansible will handle this nested YAML as the corresponding Python dictionary or list, which is compatible with JSON structure.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: JSON-like structure in Ansible Vars</h4>
          <pre>
            {`---
- name: JSON structure stored directly in vars
  hosts: localhost
  gather_facts: false

  vars:
    user_config:
      user:
        name: "Charlie"
        id: 456
        preferences:
          theme: "dark"
          notifications:
            email: true
            sms: false
      permissions:
        - role: "editor"
          level: "high"
        - role: "viewer"
          level: "low"

  tasks:
    - name: Access nested data
      debug:
        msg: "User name: {{ user_config.user.name }}, Email notifications: {{ user_config.user.preferences.notifications.email }}"

    - name: Convert this structure to JSON string
      debug:
        msg: "{{ user_config | to_json(indent=2) }}"
`}
          </pre>
        </div>
        <p>
          This approach is generally cleaner and more readable for complex static configuration data than embedding large JSON strings.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="w-6 h-6 mr-2 text-orange-600" />
          Reading JSON from Files
        </h2>
        <p>
          You can store complex JSON configuration data in separate <code>.json</code> files and read them into your playbook using the <code>include_vars</code> or <code>vars_files</code> keywords. Ansible will automatically parse the JSON content into a variable.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Reading JSON from a file (<code>config.json</code>)</h4>
          <p className="mb-2">Contents of <code>config.json</code>:</p>
          <pre className="mb-4">{`{
  "app": {
    "name": "WebApp",
    "version": "1.0.0",
    "enabled_features": ["auth", "logging"]
  },
  "database": {
    "host": "db.example.com",
    "port": 5432
  }
}`}
          </pre>
          <p className="mb-2">Playbook snippet:</p>
          <pre>
            {`---
- name: Read config from JSON file
  hosts: localhost
  gather_facts: false

  vars_files:
    - config.json # Ansible automatically parses this as JSON/YAML

  tasks:
    - name: Access data read from the JSON file
      debug:
        msg: "App name: {{ app.name }}, DB Host: {{ database.host }}"

    - name: Convert the loaded data back to JSON (optional, for verification)
      debug:
        msg: "{{ vars | to_json(indent=2) }}" # 'vars' includes variables from vars_files
`}
          </pre>
        </div>
        <p>
          When using <code>vars_files</code> or <code>include_vars</code>, Ansible is smart enough to detect the file format (YAML or JSON) and load it accordingly, making this a straightforward way to manage external JSON configuration.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Search className="w-6 h-6 mr-2 text-blue-600" />
          Querying JSON Data with <code>json_query</code>
        </h2>
        <p>
          For complex JSON data structures, navigating manually with dot/bracket notation can become cumbersome, especially when dealing with lists or needing to filter data. The <code>json_query</code> filter, based on JMESPath, provides a powerful way to query JSON structures.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Using <code>json_query</code></h4>
          <pre>
            {`---
- name: Demonstrate json_query filter
  hosts: localhost
  gather_facts: false

  vars:
    complex_data:
      users:
        - id: 1
          name: "Alice"
          active: true
          roles: ["admin", "user"]
        - id: 2
          name: "Bob"
          active: false
          roles: ["user"]
        - id: 3
          name: "Charlie"
          active: true
          roles: ["editor", "user"]
      settings:
        default_role: "user"

  tasks:
    - name: Get names of all users
      debug:
        msg: "{{ complex_data | json_query('users[*].name') }}" # [ "Alice", "Bob", "Charlie" ]

    - name: Get users who are active
      debug:
        msg: "{{ complex_data | json_query('users[?active == \`true\`]') | to_json(indent=2) }}"
      # Outputs list of user objects where active is true

    - name: Get names of users who have the 'admin' role
      debug:
        msg: "{{ complex_data | json_query('users[?contains(roles, \`\'admin\'\`)].name') }}" # [ "Alice" ]

    - name: Get default setting
      debug:
        msg: "{{ complex_data | json_query('settings.default_role') }}" # "user"
`}
          </pre>
        </div>
        <p>
          JMESPath syntax takes some learning, but it's incredibly powerful for extracting exactly the data you need from complex JSON structures, making your playbooks cleaner and more robust.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCheck className="w-6 h-6 mr-2 text-green-600" />
          Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>Use <code>from_json</code>/<code>from_yaml</code> for parsing:</strong> Always convert incoming JSON strings to Ansible variables using these filters before attempting to access their elements.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>Prefer YAML structure for static data:</strong> If your JSON data is part of your playbook's static configuration, define it directly using YAML's native nested structure instead of embedding JSON strings.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>Store large/complex JSON in separate files:</strong> Use <code>vars_files</code> or <code>include_vars</code> to keep your playbooks clean when dealing with substantial JSON configurations.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>Leverage <code>json_query</code> for complex data extraction:</strong> Invest time in learning JMESPath if you frequently work with nested or list-heavy JSON outputs.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>Handle potential errors:</strong> JSON operations can fail if the input string is invalid or the query path doesn't exist. Use conditional checks or error handling (e.g., <code>failed_when</code>, <code>ignore_errors</code>, using <code>default(omit)</code> or <code>| d({})</code>/<code>| d([])</code>) where appropriate.
            </span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="w-6 h-6 mr-2 text-red-600" />
          Common Pitfalls
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="mr-2 text-red-500">&bull;</span>
            <span>
              <strong>Not parsing JSON strings:</strong> Trying to access elements of a JSON string directly (e.g., <code>"&#x7b;...&#x7d;".status</code>) will fail. Always use <code>| from_json</code> first.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-red-500">&bull;</span>
            <span>
              <strong>YAML vs. JSON syntax:</strong> While YAML can represent JSON, be mindful of indentation and special characters in YAML strings if manually embedding JSON strings. Using the <code>| to_json</code> filter is safer for generating JSON strings.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-red-500">&bull;</span>
            <span>
              <strong>Complex queries without <code>json_query</code>:</strong> Deeply nested access like <code>variable['key1']['key2'][0]['subkey']</code> becomes hard to read and maintain quickly. Use <code>json_query</code> for anything beyond basic access.
            </span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Effectively managing JSON data is a crucial skill for modern Ansible automation. By utilizing Ansible's built-in filters like <code>to_json</code>, <code>from_json</code>, and <code>json_query</code>, and by structuring your variable data appropriately, you can seamlessly integrate JSON into your playbooks, making them capable of interacting with a wider range of systems and data sources.
        </p>
        <p>
          Understanding these strategies allows you to build more flexible, powerful, and maintainable automation workflows that can handle complex configuration scenarios.
        </p>
      </div>
    </>
  );
}

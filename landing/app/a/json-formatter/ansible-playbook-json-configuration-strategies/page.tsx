import type { Metadata } from "next";
import { Code, FileJson, Variable, Search, CheckCheck, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Ansible Playbook JSON Configuration Strategies | Offline Tools",
  description:
    "Use JSON in Ansible playbooks without fighting YAML. Learn when to keep native vars, when to parse or serialize, how to load .json files, call APIs with uri, and query nested data safely.",
};

export default function AnsibleJsonConfigPage() {
  return (
    <>
      <h1 className="mb-6 flex items-center text-3xl font-bold">
        <FileJson className="mr-3 h-8 w-8 text-blue-600" />
        Ansible Playbook JSON Configuration Strategies
      </h1>

      <div className="space-y-6 text-gray-800 dark:text-gray-200">
        <p>
          The short version: keep your playbook data as normal YAML for as long as possible, and only convert to JSON
          at the boundary where another system actually needs a JSON string or file. In modern Ansible, most JSON work
          falls into four buckets: sending API payloads, loading external configuration files, parsing command output,
          and querying nested results.
        </p>
        <p>
          That distinction matters because Ansible already handles some JSON cases for you. Current Ansible docs note
          that <code>ansible.builtin.from_json</code> is mainly for contexts where automatic conversion did not happen,
          while <code>ansible.builtin.uri</code> can send JSON bodies directly and places JSON API responses in a{" "}
          <code>json</code> key when the server returns <code>application/json</code>. A practical playbook is usually
          simpler when you lean on those behaviors instead of serializing and parsing everything manually.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <CheckCheck className="mr-2 h-6 w-6 text-green-600" />
          Choose the Right Strategy
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>Static configuration in the repo:</strong> write it as native YAML variables, then render JSON at
              the last moment with <code>to_json</code>.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>REST APIs and webhooks:</strong> prefer <code>ansible.builtin.uri</code> with{" "}
              <code>body_format: json</code> instead of building raw JSON strings by hand.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>Large external config files:</strong> use <code>ansible.builtin.include_vars</code> to load
              <code>.json</code> files, especially when you want namespacing or conditional loading.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>CLI output that is a JSON string:</strong> parse it with <code>ansible.builtin.from_json</code>.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>Deep filtering across nested arrays:</strong> use <code>community.general.json_query</code> when
              plain Jinja filters stop being readable.
            </span>
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Variable className="mr-2 h-6 w-6 text-purple-600" />
          Keep Data Native Until the JSON Boundary
        </h2>
        <p>
          Ansible playbooks are YAML-first. That is a strength, not a limitation. YAML is easier to review in Git,
          safer to edit, and already maps cleanly to the dictionaries and lists that JSON expects. For repo-managed
          configuration, define structured variables in YAML and serialize only when a file, API, or command needs
          actual JSON text.
        </p>

        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Example: author in YAML, emit deterministic JSON</h3>
          <pre>
            {`---
- name: Render an application config as JSON
  hosts: app
  gather_facts: false

  vars:
    app_config:
      service:
        name: catalog
        enabled: true
        listen_port: 8443
      features:
        audit: true
        cache: true
      allowed_origins:
        - https://app.example.com
        - https://admin.example.com
      owner_name: "Zoë"

  tasks:
    - name: Write config.json
      ansible.builtin.copy:
        dest: /etc/catalog/config.json
        mode: "0644"
        content: "{{ app_config | to_json(indent=2, sort_keys=True, ensure_ascii=False) }}"
`}
          </pre>
        </div>
        <p>
          This pattern avoids hand-maintaining a long JSON blob inside YAML. It also gives you stable output for diffs
          with <code>sort_keys=True</code> and keeps non-ASCII text readable with <code>ensure_ascii=False</code>.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Code className="mr-2 h-6 w-6 text-green-600" />
          Send JSON to APIs with <code>uri</code>, Not Manual String Building
        </h2>
        <p>
          A common mistake is turning a dictionary into a JSON string too early and then passing that string around the
          playbook. For HTTP APIs, current Ansible guidance is simpler: hand a normal data structure to{" "}
          <code>ansible.builtin.uri</code> and set <code>body_format: json</code>. The module handles the JSON
          encoding, and if the response is JSON it exposes parsed content in <code>result.json</code>.
        </p>

        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Example: post a JSON payload and use the parsed response</h3>
          <pre>
            {`---
- name: Create a remote resource
  hosts: localhost
  gather_facts: false

  vars:
    payload:
      name: "edge-cache"
      enabled: true
      limits:
        requests_per_minute: 1000

  tasks:
    - name: POST JSON to the API
      ansible.builtin.uri:
        url: https://api.example.com/v1/services
        method: POST
        body_format: json
        body: "{{ payload }}"
        headers:
          Authorization: "Bearer {{ api_token }}"
        status_code: [200, 201]
      register: api_result

    - name: Show the returned id
      ansible.builtin.debug:
        msg: "Created service id {{ api_result.json.id }}"
`}
          </pre>
        </div>
        <p>
          Only serialize manually when an API explicitly requires a raw JSON string or when you must sign the exact
          bytes being sent. Otherwise, using <code>body_format: json</code> is clearer and less error-prone.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <FileJson className="mr-2 h-6 w-6 text-orange-600" />
          Load External JSON Files with <code>include_vars</code>
        </h2>
        <p>
          Both <code>vars_files</code> and <code>include_vars</code> can load JSON, but they are not equally useful for
          real projects. <code>vars_files</code> dumps keys straight into the play scope and is best for simple, static
          files. <code>ansible.builtin.include_vars</code> is usually the better JSON configuration strategy because you
          can load conditionally, namespace the result with <code>name</code>, or load a directory of files.
        </p>

        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Example: keep imported JSON under one variable</h3>
          <pre>
            {`---
- name: Load a JSON settings file
  hosts: localhost
  gather_facts: false

  tasks:
    - name: Load vars/app.json into app_settings
      ansible.builtin.include_vars:
        file: vars/app.json
        name: app_settings

    - name: Read one field from the imported document
      ansible.builtin.debug:
        msg: "Log level is {{ app_settings.logging.level }}"
`}
          </pre>
        </div>
        <p>
          The current module docs also note that directory loads happen in alphabetical order, which is useful if you
          split JSON fragments into numbered files such as <code>10-base.json</code> and <code>20-prod.json</code>.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Info className="mr-2 h-6 w-6 text-yellow-600" />
          Use <code>from_json</code> Only When the Input Is Still a String
        </h2>
        <p>
          <code>ansible.builtin.from_json</code> is still important, but mostly for output coming from shell commands,
          external tools, templated files, or odd modules that return JSON text in a string field. If you already have
          a normal Ansible dictionary or list, parsing it again is unnecessary and sometimes harmful.
        </p>

        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Example: parse command stdout once, then work with structured data</h3>
          <pre>
            {`---
- name: Parse JSON emitted by a CLI tool
  hosts: localhost
  gather_facts: false

  tasks:
    - name: Export current state as JSON
      ansible.builtin.command: mytool export --format json
      register: raw_export
      changed_when: false

    - name: Convert stdout into a normal Ansible variable
      ansible.builtin.set_fact:
        export_doc: "{{ raw_export.stdout | from_json }}"

    - name: Use the parsed object
      ansible.builtin.debug:
        msg: "First project is {{ export_doc.projects[0].name }}"
`}
          </pre>
        </div>
        <p>
          Good rule: if the value came from <code>stdout</code>, a template, or a text file, you probably need{" "}
          <code>from_json</code>. If it came from <code>include_vars</code>, <code>uri.json</code>, or normal playbook
          variables, you probably do not.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Search className="mr-2 h-6 w-6 text-blue-600" />
          Query Nested JSON Without Making the Playbook Opaque
        </h2>
        <p>
          For straightforward selections, standard Jinja filters are often easier to read than a JMESPath expression.
          Reach for <code>selectattr</code>, <code>map</code>, <code>items2dict</code>, and <code>dict2items</code>{" "}
          first. Use <code>community.general.json_query</code> when the data is deeply nested or the selection logic is
          naturally expressed as a JMESPath query.
        </p>

        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Example: simple Jinja filtering vs. JMESPath</h3>
          <pre>
            {`---
- name: Extract data from nested results
  hosts: localhost
  gather_facts: false

  vars:
    services:
      - name: api
        state: enabled
        port: 8443
      - name: worker
        state: disabled
        port: 9000
      - name: ui
        state: enabled
        port: 8080

  tasks:
    - name: Prefer plain Jinja when the intent is obvious
      ansible.builtin.debug:
        msg: "{{ services | selectattr('state', 'equalto', 'enabled') | map(attribute='port') | list }}"

    - name: Use JMESPath when the query gets more complex
      ansible.builtin.debug:
        msg: "{{ services | community.general.json_query('[?state==\`enabled\`].name') }}"
`}
          </pre>
        </div>
        <p>
          One current caveat matters here: <code>json_query</code> lives in <code>community.general</code>, not in{" "}
          <code>ansible-core</code>, and the controller needs the <code>jmespath</code> Python dependency installed.
          If that dependency is missing, the filter fails before your playbook logic runs.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <CheckCheck className="mr-2 h-6 w-6 text-green-600" />
          Common Mistakes and Safer Defaults
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>Do not double-encode API payloads:</strong> avoid combining <code>body_format: json</code> with a
              pre-serialized <code>{'body: "{{ payload | to_json }}"'}</code>. That often sends a JSON string instead
              of the object the API expects.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>Prefer namespaced imports:</strong> loading raw JSON keys into top-level play scope makes
              collisions more likely. <code>include_vars</code> with <code>name</code> keeps the source obvious.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>Keep booleans and nulls as data, not strings:</strong> write YAML values like <code>true</code>,{" "}
              <code>false</code>, and <code>null</code> unless the target system literally expects the quoted text.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>Inspect return shapes before parsing:</strong> a quick <code>debug: var=result</code> tells you
              whether a module returned a string, a dictionary, or a nested <code>json</code> field.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">&bull;</span>
            <span>
              <strong>Fail early for missing keys:</strong> when a JSON document is required, assert the fields you need
              before writing config files or calling later tasks.
            </span>
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Conclusion</h2>
        <p>
          The best Ansible JSON configuration strategy is usually the least magical one: keep your data as structured
          YAML, let Ansible modules do automatic JSON handling where they can, and reserve explicit parsing or
          serialization for the edges of the workflow. That keeps playbooks easier to read and avoids the two biggest
          sources of bugs here: stringly-typed payloads and double conversion.
        </p>
        <p>
          If you remember only one rule, make it this one: JSON is usually an output or integration format in Ansible,
          not the format you should optimize your whole playbook around.
        </p>
      </div>
    </>
  );
}

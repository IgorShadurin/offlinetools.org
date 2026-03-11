import type { Metadata } from "next";
import {
  CheckCircle2,
  Database,
  Eye,
  GitBranch,
  Key,
  Lock,
  Pencil,
  Shield,
  Users,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Role-Based Access Control (RBAC) in Collaborative JSON Editors: Practical Guide",
  description:
    "Practical RBAC guidance for collaborative JSON editors, including document roles, path-level permissions, JSON Patch checks, real-time enforcement, and when to extend RBAC with document-level sharing rules.",
};

const roleMatrix = [
  {
    icon: Lock,
    name: "Admin",
    summary: "Full system access, including user management and policy changes.",
    read: "Any document and any path",
    write: "Any path, including schema and settings",
    destructive: "Can delete documents, restore versions, and manage roles",
  },
  {
    icon: Pencil,
    name: "Schema Editor",
    summary: "Maintains structure, validation rules, and release-critical fields.",
    read: "Any document assigned to the workspace",
    write: "/schema, /settings, and approved config paths",
    destructive: "Can change structure, but not manage users or global policy",
  },
  {
    icon: Pencil,
    name: "Content Editor",
    summary: "Updates business data without touching protected configuration.",
    read: "Assigned documents and most content paths",
    write: "/content, /items, /translations, selected arrays",
    destructive: "Cannot delete protected nodes such as /settings or /schema",
  },
  {
    icon: Eye,
    name: "Reviewer",
    summary: "Read-only access plus optional comment or approval workflow.",
    read: "Assigned documents and approved snapshots",
    write: "None, or comment-only metadata paths",
    destructive: "No deletes, no structure changes, no permission changes",
  },
];

export default function CollaborativeJsonEditorRbacPage() {
  return (
    <>
      <h1 className="mb-6 flex items-center space-x-3 text-3xl font-bold">
        <Shield size={36} />
        <span>Role-Based Access Control (RBAC) in Collaborative JSON Editors</span>
      </h1>

      <div className="space-y-8">
        <section>
          <p className="text-lg">
            In a collaborative JSON editor, access control has to answer more than &quot;can this user edit the
            document?&quot; For every change, you need to know <strong>who</strong> is acting, <strong>which JSON
            path</strong> they are touching, and <strong>which operation</strong> they are trying to perform.
          </p>
          <p className="mt-3">
            A practical RBAC design uses roles for the coarse rules, then evaluates each incoming edit against the
            target document, JSON path, and operation on the server before the shared state changes.
          </p>

          <div className="mt-5 border-l-4 border-blue-500 bg-blue-50 p-4 text-blue-900 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-100">
            <p className="flex items-center space-x-2 font-medium">
              <Key size={20} />
              <span>Quick answer</span>
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Model permissions at the document, path, and operation levels.</li>
              <li>Evaluate every JSON Patch or edit operation on the backend, not just in the UI.</li>
              <li>Default to deny and grant the smallest write surface that still lets people work.</li>
              <li>Use plain RBAC for stable team roles, then add document-level sharing rules when collaboration gets granular.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center space-x-2 text-2xl font-semibold">
            <Users size={24} />
            <span>What RBAC Means for a JSON Editor</span>
          </h2>
          <p>
            Standard RBAC groups permissions into roles such as <strong>admin</strong>, <strong>editor</strong>, and{" "}
            <strong>viewer</strong>. In a collaborative JSON product, those permissions usually need extra precision:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Document scope:</strong> Which documents can this role open or update?
            </li>
            <li>
              <strong>Path scope:</strong> Which JSON Pointer paths can this role read, replace, add to, or remove?
            </li>
            <li>
              <strong>Operation scope:</strong> Are they allowed to use destructive operations such as delete, move, or
              schema changes?
            </li>
            <li>
              <strong>Context:</strong> Does the answer change for production documents, drafts, archived records, or
              externally shared files?
            </li>
          </ul>
          <p className="mt-4">
            That is why collaborative editors rarely stop at &quot;Editor can write&quot;. They usually map roles to a
            set of document classes, protected paths, and allowed edit verbs.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center space-x-2 text-2xl font-semibold">
            <Shield size={24} />
            <span>Where Pure RBAC Fits, and Where It Stops Fitting</span>
          </h2>
          <p>
            Pure RBAC works well when access is stable and organization-wide: for example, every support editor can
            update <code>/content</code>, but only platform admins can change <code>/schema</code> or{" "}
            <code>/settings</code>.
          </p>
          <p className="mt-3">
            It starts to break down when access depends on relationships or document-specific sharing, such as:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>A user can edit only documents they created.</li>
            <li>A contractor can edit one shared file but nothing else in the workspace.</li>
            <li>A reviewer can comment on documents in one project, but not another.</li>
            <li>Write access depends on state like draft vs published, region, or environment.</li>
          </ul>
          <p className="mt-4">
            The practical answer is usually a hybrid model: <strong>RBAC for baseline job roles</strong>, plus
            document-level attributes or relationships for exceptions and sharing. Current OWASP guidance explicitly
            recommends deny-by-default and least privilege, and notes that ABAC or ReBAC can be a better fit than RBAC
            alone when access depends on rich context. Modern authorization systems such as{" "}
            <a
              href="https://openfga.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              OpenFGA
            </a>{" "}
            reflect that shift toward relationship-aware access for shared resources.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center space-x-2 text-2xl font-semibold">
            <Database size={24} />
            <span>Recommended Permission Model</span>
          </h2>
          <p>
            For a collaborative JSON editor, a permission check is easiest to reason about when each request resolves
            to five fields:
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              <strong>Subject:</strong> user ID, team membership, assigned roles
            </li>
            <li>
              <strong>Document:</strong> workspace, project, owner, state, environment
            </li>
            <li>
              <strong>Path:</strong> a normalized JSON Pointer such as <code>/content/hero/title</code>
            </li>
            <li>
              <strong>Operation:</strong> read, add, replace, remove, move, or schema update
            </li>
            <li>
              <strong>Effect:</strong> allow or deny, with a clear precedence rule
            </li>
          </ol>
          <p className="mt-4">
            Use{" "}
            <a
              href="https://datatracker.ietf.org/doc/html/rfc6901"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              JSON Pointer (RFC 6901)
            </a>{" "}
            to normalize paths, and if your editor sends patches, validate each op against{" "}
            <a
              href="https://datatracker.ietf.org/doc/html/rfc6902"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              JSON Patch (RFC 6902)
            </a>{" "}
            semantics before the mutation is accepted.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center space-x-2 text-2xl font-semibold">
            <Users size={24} />
            <span>Example Role Matrix</span>
          </h2>
          <p>
            A useful RBAC design describes each role in terms of protected paths and destructive actions, not just
            &quot;edit&quot; vs &quot;view&quot;.
          </p>

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {roleMatrix.map(({ icon: Icon, name, summary, read, write, destructive }) => (
              <div key={name} className="rounded-lg border bg-gray-50 p-4 dark:bg-gray-800">
                <h3 className="mb-3 flex items-center space-x-2 text-xl font-semibold">
                  <Icon size={20} />
                  <span>{name}</span>
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{summary}</p>
                <ul className="space-y-2">
                  <li>
                    <strong>Read:</strong> {read}
                  </li>
                  <li>
                    <strong>Write:</strong> {write}
                  </li>
                  <li>
                    <strong>Destructive actions:</strong> {destructive}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center space-x-2 text-2xl font-semibold">
            <Key size={24} />
            <span>Path-Level Rules for JSON Patch Operations</span>
          </h2>
          <p>
            Collaborative editors often send fine-grained patches instead of whole-document saves. That means your
            policy should authorize the exact path and operation pair, not just the overall document.
          </p>

          <div className="mt-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre>{`// Example document
{
  "schema": { "version": 3 },
  "settings": { "status": "published", "locale": "en-US" },
  "content": {
    "hero": { "title": "Spring Launch", "subtitle": "Updated copy" }
  },
  "items": [
    { "id": "a1", "name": "Chair", "price": 49.99 }
  ]
}

// Example policy fragments
[
  {
    role: "content-editor",
    pointer: "/content",
    ops: ["read", "replace"],
    effect: "allow"
  },
  {
    role: "content-editor",
    pointer: "/items/-",
    ops: ["add"],
    effect: "allow"
  },
  {
    role: "content-editor",
    pointer: "/items/*/price",
    ops: ["replace"],
    effect: "allow"
  },
  {
    role: "content-editor",
    pointer: "/settings",
    ops: ["replace", "remove"],
    effect: "deny"
  },
  {
    role: "reviewer",
    pointer: "/",
    ops: ["read"],
    effect: "allow"
  }
]

// Incoming JSON Patch
[
  { "op": "replace", "path": "/content/hero/title", "value": "Summer Launch" },
  { "op": "replace", "path": "/settings/status", "value": "draft" }
]

// Result:
// - First operation can pass for content-editor
// - Second operation must be rejected because /settings is protected
`}</pre>
          </div>

          <p className="mt-3">
            Two details matter in practice: normalize all incoming paths before matching, and define how wildcard or
            parent/child rules interact. Most teams use an explicit precedence rule such as <strong>deny overrides
            allow</strong>.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center space-x-2 text-2xl font-semibold">
            <Lock size={24} />
            <span>Server-Side Enforcement in Real-Time Editing</span>
          </h2>
          <p>
            The UI should absolutely hide or disable forbidden actions, but that is only a usability layer. The real
            authorization check belongs on the server before a patch is merged into the shared document state.
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>Authenticate the user and load their roles plus any document-specific relationships.</li>
            <li>Parse the incoming edit into normalized path and operation units.</li>
            <li>Evaluate each unit against policy before applying OT, CRDT, or merge logic.</li>
            <li>Reject unauthorized operations atomically and return a clear error to the client.</li>
            <li>Only broadcast accepted changes to other collaborators.</li>
          </ol>
          <p className="mt-4">
            If you allow optimistic UI updates, the client should be ready to roll back rejected edits. The important
            rule is that concurrency handling never bypasses authorization.
          </p>
        </section>

        <section>
          <h2 className="mb-4 flex items-center space-x-2 text-2xl font-semibold">
            <GitBranch size={24} />
            <span>Implementation Checklist</span>
          </h2>
          <p>
            Current{" "}
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              OWASP authorization guidance
            </a>{" "}
            maps cleanly to collaborative editors:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Deny by default:</strong> if no rule matches, the patch fails.
            </li>
            <li>
              <strong>Least privilege:</strong> grant write access to the smallest set of paths and operations.
            </li>
            <li>
              <strong>Validate on every request:</strong> never trust cached UI state as the final decision.
            </li>
            <li>
              <strong>Log decisions:</strong> record who attempted which path and why the request was denied.
            </li>
            <li>
              <strong>Test policy edges:</strong> include mixed-role users, wildcard paths, and batched patches.
            </li>
          </ul>

          <div className="mt-5 overflow-x-auto rounded-lg border">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Decision point</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Good default</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm">Rule precedence</td>
                  <td className="px-4 py-3 text-sm">Explicit deny beats inherited allow</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">Protected system nodes</td>
                  <td className="px-4 py-3 text-sm">Block writes to /schema, /settings, /permissions unless elevated</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">Batched patches</td>
                  <td className="px-4 py-3 text-sm">Fail the whole batch if any operation is unauthorized</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">Sharing model</td>
                  <td className="px-4 py-3 text-sm">RBAC for role baseline, ReBAC or ABAC for file-specific sharing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center space-x-2 text-2xl font-semibold">
            <XCircle size={24} />
            <span>Common Failure Modes</span>
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Authorizing the document but not the path:</strong> a user can open the file, but should not be
              able to edit every node inside it.
            </li>
            <li>
              <strong>Checking only before transform:</strong> rebased or transformed operations can end up targeting a
              different node than the original optimistic edit.
            </li>
            <li>
              <strong>Role explosion:</strong> adding a new role for every exception instead of using document-specific
              sharing rules.
            </li>
            <li>
              <strong>Leaking writes through helper actions:</strong> import, duplicate, bulk replace, and restore
              features often bypass the normal patch path unless you secure them explicitly.
            </li>
            <li>
              <strong>Stale permission snapshots:</strong> collaborators keep editing after roles changed because the
              server never re-evaluates access on the next request.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center space-x-2 text-2xl font-semibold">
            <CheckCircle2 size={24} />
            <span>Conclusion</span>
          </h2>
          <p>
            The best RBAC design for a collaborative JSON editor is not just a list of roles. It is a server-enforced
            decision model that checks <strong>role + document + path + operation</strong> every time a change is
            proposed. Use RBAC to define your baseline responsibilities, keep protected paths explicit, and add
            document-level relationships or attributes once sharing rules become more granular than a simple team role
            can express.
          </p>
        </section>
      </div>
    </>
  );
}

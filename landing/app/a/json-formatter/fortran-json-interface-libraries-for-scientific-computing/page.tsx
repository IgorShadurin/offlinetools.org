import type { Metadata } from "next";
import {
  AlertTriangle,
  Book,
  CheckCircle2,
  Code,
  Database,
  FileText,
  Github,
  Link,
  Rocket,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fortran JSON Interface Libraries for Scientific Computing | json-fortran vs FSON | Offline Tools",
  description:
    "Compare json-fortran and FSON for scientific Fortran projects, with current build notes, compatibility guidance, real API examples, and advice on when JSON fits HPC workflows.",
};

const externalLinkClassName =
  "text-blue-600 underline underline-offset-4 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300";

export default function FortranJsonLibrariesPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Code className="mr-3 w-8 h-8 text-blue-500" />
        Fortran JSON Interface Libraries for Scientific Computing
      </h1>

      <div className="space-y-6">
        <p>
          If you are choosing a Fortran JSON library today, <strong>`json-fortran` is usually the default pick for new
          work</strong>: it has current releases, modern Fortran APIs, packaging options, and strong documentation.
          <strong> `FSON` still matters</strong> when you are maintaining older Fortran 95 style code or want a smaller,
          pointer-based parser for lightweight configuration files.
        </p>
        <p>
          That distinction matters in scientific computing. Most teams do not need JSON for bulk numeric arrays, but
          they often do need a reliable way to load run configuration, emit metadata, exchange settings with Python or
          web tools, and validate small structured payloads without adding fragile ad hoc parsers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileText className="mr-2 w-6 h-6 text-green-500" /> Quick Recommendation
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <CheckCircle2 className="mr-2 w-5 h-5 text-green-500" />
              Choose `json-fortran` when
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are starting a new scientific application or modernizing an older one.</li>
              <li>You want read and write support, not just a parser.</li>
              <li>You need a documented API around `json_file` and `json_core` objects.</li>
              <li>You care about current packaging options such as CMake, fpm, Conda, or Homebrew.</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <CheckCircle2 className="mr-2 w-5 h-5 text-blue-500" />
              Choose `FSON` when
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are working inside a legacy codebase that is closer to Fortran 95.</li>
              <li>You want a small DOM-style parser with path-based lookups.</li>
              <li>You mostly read configuration or metadata rather than generate complex JSON output.</li>
              <li>You prefer a lighter dependency surface and are comfortable with pointer-based cleanup.</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Link className="mr-2 w-6 h-6 text-purple-500" /> What Scientific Users Usually Need
        </h2>
        <p>
          Search visitors landing on this topic are usually not looking for a generic definition of JSON. They need to
          answer a practical question: <em>which library will fit the build system, compiler level, and data flow of my
          scientific code?</em>
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Predictable configuration loading:</strong> simulation inputs, solver settings, and experiment
            metadata should be easy to validate and easy to diff in version control.
          </li>
          <li>
            <strong>Interop with other tools:</strong> JSON is useful when Python, web dashboards, CLI wrappers, or job
            schedulers need to exchange small structured payloads with Fortran.
          </li>
          <li>
            <strong>Build compatibility:</strong> compiler support for Fortran 2003/2008 features can determine whether a
            modern library is painless or frustrating to adopt.
          </li>
          <li>
            <strong>Reasonable failure modes:</strong> clear parse errors and explicit missing-key checks save time when
            debugging production runs.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Database className="mr-2 w-6 h-6 text-teal-500" /> Current Fortran JSON Library Landscape
        </h2>
        <p>
          In practice, most Fortran users comparing general-purpose JSON libraries still end up choosing between
          `json-fortran` and `FSON`. They overlap, but they are not aimed at exactly the same codebases.
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="text-left p-3 font-semibold">Library</th>
                <th className="text-left p-3 font-semibold">What it gives you</th>
                <th className="text-left p-3 font-semibold">Build and compatibility notes</th>
                <th className="text-left p-3 font-semibold">Best fit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200 dark:border-gray-700 align-top">
                <td className="p-3 font-semibold">json-fortran</td>
                <td className="p-3">
                  Modern object-oriented API for parsing, querying, modifying, and serializing JSON. Official docs also
                  call out thread safety and richer control over parser behavior.
                </td>
                <td className="p-3">
                  Current official GitHub release is <strong>9.2.1</strong> from <strong>February 22, 2026</strong>.
                  The project documents CMake and fpm builds plus Conda and Homebrew packages. It expects a compiler
                  with key Fortran 2003/2008 support.
                </td>
                <td className="p-3">New scientific code, reusable libraries, and projects that need both read and write support.</td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-700 align-top">
                <td className="p-3 font-semibold">FSON</td>
                <td className="p-3">
                  A Fortran 95 JSON parser built around `type(fson_value), pointer` trees and `fson_get` path lookups
                  such as `mesh.cells` or `materials[1].name`.
                </td>
                <td className="p-3">
                  The current README documents Makefile, Meson, and CMake installation flows. Its design is simpler and
                  closer to older Fortran styles, but that also means less modern ergonomics than `json-fortran`.
                </td>
                <td className="p-3">Legacy HPC codebases, smaller config readers, and gradual modernization work.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2">
              <Github className="inline-block mr-2" /> `json-fortran`
            </h3>
            <p>
              This is the safest recommendation for most new work. The project exposes a higher-level `json_file` API,
              supports both parsing and generation, and is actively documented. If your team already uses fpm or CMake,
              adoption is straightforward.
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Practical takeaway: if you need a library that feels maintained and ready for current tooling, start here.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2">
              <Github className="inline-block mr-2" /> `FSON`
            </h3>
            <p>
              `FSON` is still useful when you want a compact parser with direct path-based extraction and minimal
              abstraction. It is a better match for older code that is not ready to lean on more modern Fortran
              features.
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Practical takeaway: strong option for legacy integration, but usually not the first choice for a new codebase.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 w-6 h-6 text-blue-500" /> Example: Reading Simulation Config with `json-fortran`
        </h2>
        <p>
          The modern `json-fortran` workflow is usually: initialize the object, load a file or string, retrieve values
          by path, then clean up. This is much closer to what most production scientific applications need than a purely
          conceptual parser example.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm leading-relaxed">
            {`program read_config
  use json_module, only: json_file, json_RK
  implicit none

  type(json_file) :: json
  character(len=:), allocatable :: solver
  integer :: steps
  real(json_RK) :: dt
  logical :: found

  call json%initialize(compact_reals=.true.)
  call json%load(filename="config.json")

  call json%get("simulation.solver", solver, found)
  if (.not. found) error stop "Missing simulation.solver"

  call json%get("simulation.steps", steps, found)
  if (.not. found) error stop "Missing simulation.steps"

  call json%get("simulation.dt", dt, found)
  if (.not. found) error stop "Missing simulation.dt"

  print "(A,1X,A)", "solver:", solver
  print "(A,1X,I0)", "steps:", steps
  print "(A,1X,ES12.5)", "dt:", dt

  call json%destroy()
end program read_config
`}
          </pre>
        </div>
        <p>
          Two details matter here for real projects: the <strong>`found` flag</strong> lets you fail fast on missing
          keys, and the <strong>allocatable string</strong> avoids the silent truncation problems that fixed-length
          strings can introduce in legacy Fortran code.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 w-6 h-6 text-indigo-500" /> Example: Lightweight Config Reads with `FSON`
        </h2>
        <p>
          `FSON` is attractive when you want direct path-based extraction and a smaller mental model. The path syntax is
          one of its most useful features for simple configuration files.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm leading-relaxed">
            {`program read_input
  use fson
  implicit none

  type(fson_value), pointer :: cfg
  integer :: cells
  character(len=16) :: scheme

  cfg => fson_parse("input.json")

  call fson_get(cfg, "mesh.cells", cells)
  call fson_get(cfg, "solver.scheme", scheme)

  print *, "cells =", cells
  print *, "scheme =", trim(scheme)

  call fson_destroy(cfg)
end program read_input
`}
          </pre>
        </div>
        <p>
          That simplicity is useful, but remember that `FSON` is built around pointer-managed values. In long-running
          scientific applications, cleanup discipline still matters.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="mr-2 w-6 h-6 text-orange-500" /> Build and Integration Notes
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>`json-fortran`:</strong> current docs and README cover CMake and fpm, and the project also publishes
            Conda and Homebrew installation routes. That makes it easier to standardize across developer machines and CI.
          </li>
          <li>
            <strong>Compiler expectations:</strong> `json-fortran` depends on major Fortran 2003/2008 language features,
            so very old compiler stacks can be the deciding factor against it.
          </li>
          <li>
            <strong>`FSON`:</strong> the README documents Makefile, Meson, and CMake flows. It can be a cleaner fit when
            you want to drop a parser into an older build without adopting a more feature-rich framework.
          </li>
          <li>
            <strong>Interface shape:</strong> prefer `json-fortran` if you need to create and emit JSON, not just read it.
            Prefer `FSON` if simple extraction is the whole job.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Rocket className="mr-2 w-6 h-6 text-red-500" /> Scientific Computing Caveats
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Use JSON for metadata, not heavy numerics:</strong> configuration, provenance, model settings, and
            service payloads are good fits. Huge dense arrays and checkpoints usually belong in HDF5 or NetCDF instead.
          </li>
          <li>
            <strong>Be explicit about missing keys:</strong> scientific runs should fail early when required parameters
            are absent or typed incorrectly.
          </li>
          <li>
            <strong>Watch string handling:</strong> allocatable strings are safer than fixed-length buffers when file
            contents are controlled by external tooling.
          </li>
          <li>
            <strong>Validate input before you debug Fortran:</strong> formatting and checking JSON first often exposes
            trailing commas, broken quoting, or malformed nesting faster than recompiling parser code.
          </li>
        </ul>

        <div className="p-4 border border-amber-200 rounded-lg dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30">
          <p className="flex items-start">
            <AlertTriangle className="mr-2 mt-1 w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>
              If your real problem is broken input rather than library choice, run the payload through a JSON formatter
              first. Normalizing indentation and structure makes it much easier to see whether the bug is in the file or
              in your Fortran-side extraction logic.
            </span>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Book className="mr-2 w-6 h-6 text-yellow-500" /> Official References
        </h2>
        <p>These primary sources are the most useful starting points when you need current details beyond this guide:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <a
              className={externalLinkClassName}
              href="https://github.com/jacobwilliams/json-fortran"
              rel="noreferrer"
              target="_blank"
            >
              json-fortran on GitHub
            </a>
          </li>
          <li>
            <a
              className={externalLinkClassName}
              href="https://jacobwilliams.github.io/json-fortran/"
              rel="noreferrer"
              target="_blank"
            >
              json-fortran documentation
            </a>
          </li>
          <li>
            <a
              className={externalLinkClassName}
              href="https://github.com/josephalevin/fson"
              rel="noreferrer"
              target="_blank"
            >
              FSON on GitHub
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

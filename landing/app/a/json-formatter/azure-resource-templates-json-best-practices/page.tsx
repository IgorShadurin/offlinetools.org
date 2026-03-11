import type { Metadata } from "next";
import {
  Check,
  Code,
  FileCode,
  GitFork,
  Info,
  LayoutList,
  Lightbulb,
  SearchCheck,
  Settings,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Azure Resource Templates: JSON Best Practices | Offline Tools",
  description:
    "Current ARM JSON best practices for Azure Resource Manager templates: Bicep vs JSON, languageVersion 2.0, parameters, API versions, comments, what-if, and safer deployment workflows.",
};

export default function ArmTemplatesJsonBestPracticesArticle() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Azure Resource Templates: JSON Best Practices</h1>

      <div className="space-y-6 text-lg text-gray-800 dark:text-gray-200">
        <p>
          If you maintain Azure Resource Manager templates in raw JSON, the most important current context is simple:
          Azure still deploys ARM JSON, but Microsoft recommends{" "}
          <a
            href="https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Bicep
          </a>{" "}
          for authoring new infrastructure as code because it compiles to the same deployment engine. That makes JSON
          best practices less about clever syntax and more about keeping existing templates predictable, reviewable, and
          safe to deploy.
        </p>
        <p>
          This guide focuses on the real cases where teams still touch ARM JSON directly: legacy repos, exported
          templates, quick production patches, published template specs, and CI/CD pipelines that already expect JSON.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <LayoutList className="inline-block" /> Start With A Current Template Shape
        </h2>
        <p>
          Keep the template structure boring and explicit. Use the current deployment template schema, and consider{" "}
          <code>languageVersion: &quot;2.0&quot;</code> when you want symbolic resource names and stricter validation.
          Microsoft documents both the classic array-based format and the newer 2.0 object-based resource format in the{" "}
          <a
            href="https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/syntax"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ARM template syntax reference
          </a>
          .
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-xl font-semibold">Example: clear top-level structure</h3>
          <pre className="overflow-x-auto text-sm">
            {`{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "languageVersion": "2.0",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "storageAccountName": {
      "type": "string"
    },
    "location": {
      "type": "string",
      "defaultValue": "[resourceGroup().location]"
    }
  },
  "variables": {},
  "resources": {
    "storageAccount": {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2025-06-01",
      "name": "[parameters('storageAccountName')]",
      "location": "[parameters('location')]",
      "sku": {
        "name": "Standard_LRS"
      },
      "kind": "StorageV2"
    }
  },
  "outputs": {
    "storageAccountName": {
      "type": "string",
      "value": "[parameters('storageAccountName')]"
    }
  }
}`}
          </pre>
        </div>
        <p>
          If your team already uses the classic <code>resources: []</code> format, do not rewrite stable templates just
          for style. Adopt <code>languageVersion: &quot;2.0&quot;</code> deliberately when it makes the dependency graph
          easier to read or new work benefits from symbolic names.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Settings className="inline-block" /> Treat Parameters As Contracts
        </h2>
        <p>
          Parameters are the public interface of the template. They should tell a reviewer exactly what can change, what
          must stay constrained, and what must never be logged.
        </p>
        <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold">
          <Check className="inline-block text-green-500" /> Use strong types and validation
        </h3>
        <p>
          Use the correct parameter type, add <code>allowedValues</code> when the choice set is small, and define
          length or numeric limits where Azure naming or SKU rules require them.
        </p>
        <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold">
          <Check className="inline-block text-green-500" /> Document inputs in metadata
        </h3>
        <p>
          Put human-readable descriptions in <code>metadata.description</code>. That keeps JSON valid while still making
          the template understandable in editors and reviews.
        </p>
        <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold">
          <Info className="inline-block text-orange-500" /> Keep secrets out of defaults and outputs
        </h3>
        <p>
          Use <code>securestring</code> and <code>secureObject</code> for sensitive data, pass them through secure
          parameter files or pipeline secrets, and avoid default values for credentials or keys.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-xl font-semibold">Parameter example</h3>
          <pre className="overflow-x-auto text-sm">
            {`"parameters": {
  "storageAccountName": {
    "type": "string",
    "minLength": 3,
    "maxLength": 24,
    "metadata": {
      "description": "Globally unique storage account name."
    }
  },
  "environment": {
    "type": "string",
    "allowedValues": ["dev", "test", "prod"],
    "metadata": {
      "description": "Environment name used in tags and naming."
    }
  },
  "location": {
    "type": "string",
    "defaultValue": "[resourceGroup().location]",
    "metadata": {
      "description": "Deployment region. Defaults to the resource group's location."
    }
  },
  "adminPassword": {
    "type": "securestring",
    "metadata": {
      "description": "Only provide this at deployment time or through a secure parameter file."
    }
  }
}`}
          </pre>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <FileCode className="inline-block" /> Keep API Versions Predictable
        </h2>
        <p>
          Every resource needs an <code>apiVersion</code>, and this is one of the most common sources of subtle drift.
          Use a recent stable version that you have actually tested, pin it in the template, and update it intentionally
          instead of parameterizing it.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Prefer stable API versions over preview versions for production templates.</li>
          <li>Do not make <code>apiVersion</code> a parameter or variable just to look flexible.</li>
          <li>Keep the same resource type on the same version unless you have a clear reason to split versions.</li>
        </ul>
        <p>
          Microsoft calls this out in its{" "}
          <a
            href="https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/best-practices"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ARM template best practices
          </a>
          : stable, explicit versions are easier to review and safer to keep in CI.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Code className="inline-block" /> Prefer Clear Dependency Graphs
        </h2>
        <p>
          ARM deploys resources in parallel whenever it can. That is good for speed, but it means your template should
          describe dependencies clearly enough that the deployment engine and the next human reviewer reach the same
          conclusion.
        </p>
        <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold">
          <Check className="inline-block text-green-500" /> Use implicit dependencies when they are obvious
        </h3>
        <p>
          References created through symbolic names, <code>reference()</code>, and <code>resourceId()</code> often give
          ARM enough information to order resources correctly.
        </p>
        <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold">
          <Lightbulb className="inline-block text-yellow-500" /> Add <code>dependsOn</code> when it improves reviewability
        </h3>
        <p>
          Use explicit <code>dependsOn</code> when nested resources, loops, or cross-resource interactions make the
          order hard to infer at a glance. Do not add unnecessary dependencies everywhere, because that slows
          deployments and hides the real graph.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <GitFork className="inline-block" /> Reuse Without Copy-Paste
        </h2>
        <p>
          If you repeat whole JSON blocks, you are making the template harder to test and easier to break. Use
          iteration, modularization, or published specs instead.
        </p>
        <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold">
          <Check className="inline-block text-green-500" /> Use copy loops for repeated resources
        </h3>
        <p>
          When you need several resources or child items with the same shape, use <code>copy</code> rather than manual
          duplication.
        </p>
        <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold">
          <Check className="inline-block text-green-500" /> Split large deployments into modules
        </h3>
        <p>
          Use linked or nested templates when the deployment has clear boundaries such as network, compute, and data
          layers.
        </p>
        <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold">
          <Info className="inline-block text-blue-500" /> Use Template Specs for approved shared building blocks
        </h3>
        <p>
          <a
            href="https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/template-specs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Template Specs
          </a>{" "}
          are useful when you want versioned, centrally managed templates inside Azure without copying files between
          repos or pipelines.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Wrench className="inline-block" /> Use Comments And Metadata Correctly
        </h2>
        <p>
          A lot of ARM JSON advice on the web is stale here. Current Azure guidance is not just &quot;JSON has no
          comments, good luck.&quot;
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            ARM templates support a <code>comments</code> element when you want inline explanation attached to a
            template item.
          </li>
          <li>
            During authoring, you can keep files as <code>.jsonc</code> and use <code>//</code> comments for working
            notes.
          </li>
          <li>
            Use <code>metadata.description</code> for parameter and output documentation that should stay with the
            contract.
          </li>
          <li>
            Avoid inventing fake properties such as <code>_comments</code> just to annotate the file.
          </li>
        </ul>
        <p>
          That combination is cleaner than polluting the deployment model with custom fields that other tooling does not
          expect.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <SearchCheck className="inline-block" /> Validate Before You Deploy
        </h2>
        <p>
          Syntax validation is not enough. Good ARM JSON workflows check what the deployment engine plans to change
          before resources are touched.
        </p>
        <p>
          At minimum, use editor support such as ARM Tools and add automated checks with the ARM Template Test Toolkit
          or equivalent CI validation.
        </p>
        <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold">
          <Check className="inline-block text-green-500" /> Run What-If in CI or before manual changes
        </h3>
        <p>
          The{" "}
          <a
            href="https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-what-if"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            What-If operation
          </a>{" "}
          is the fastest way to catch unintended updates, renames, or deletes.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="overflow-x-auto text-sm">
            {`az deployment group what-if \\
  --resource-group my-resource-group \\
  --template-file mainTemplate.json \\
  --parameters @main.parameters.json`}
          </pre>
        </div>
        <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold">
          <Check className="inline-block text-green-500" /> Lint and test exported templates before trusting them
        </h3>
        <p>
          Exported templates from the portal are starting points, not finished infrastructure design. Clean them up,
          remove noise, and validate them with ARM tooling before they become your source of truth.
        </p>
        <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold">
          <Info className="inline-block text-blue-500" /> Keep a non-production deployment target
        </h3>
        <p>
          Use a dedicated test resource group or subscription so refactors can be proven outside production, especially
          when you are changing API versions, conditions, or copy loops.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Lightbulb className="inline-block text-yellow-500" /> Choose Safer Deployment Behavior
        </h2>
        <p>
          Microsoft&apos;s current guidance is to use incremental deployments for normal ARM workflows. Complete mode is{" "}
          <a
            href="https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deployment-modes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            not recommended
          </a>{" "}
          and is being gradually deprecated in favor of deployment stacks when you need managed deletions.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Use incremental mode by default.</li>
          <li>When a resource property is authoritative, redeploy the full intended state for that property.</li>
          <li>Do not rely on complete mode as your cleanup strategy for long-lived environments.</li>
        </ul>
        <p>
          This matters for resources whose child configuration is declared on the parent resource. If you only submit a
          partial property set, ARM can reset unspecified values back to defaults.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Info className="inline-block text-orange-500" /> Know When To Stay In JSON
        </h2>
        <p>Raw ARM JSON still makes sense when:</p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>You are maintaining an existing production template that already works.</li>
          <li>You consume generated or exported templates and only need small controlled edits.</li>
          <li>You publish or consume JSON-based artifacts through a workflow that is already standardized.</li>
        </ul>
        <p>
          For new authoring, frequent refactoring, or reusable modules, Bicep is usually the better authoring layer. If
          you inherit a large JSON template, Microsoft also documents how to{" "}
          <a
            href="https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/decompile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            decompile ARM JSON to Bicep
          </a>{" "}
          as a migration starting point.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Conclusion</h2>
        <p>
          The best ARM JSON practice in 2026 is not to write more complicated JSON. It is to keep templates explicit,
          validate them with What-If, pin tested API versions, document parameters properly, avoid unsafe deployment
          modes, and move to Bicep for new authoring when you control the workflow.
        </p>
      </div>
    </div>
  );
}

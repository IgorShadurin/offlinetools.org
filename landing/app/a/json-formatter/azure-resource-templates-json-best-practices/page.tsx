import type { Metadata } from "next";
import {
  Check,
  Code,
  Settings,
  Lightbulb,
  FileCode,
  Wrench,
  SearchCheck,
  Info,
  LayoutList,
  GitFork,
  Edit,
  Repeat,
  Sigma, // Replaced Function with Sigma
} from "lucide-react";

export const metadata: Metadata = {
  title: "Azure Resource Templates: JSON Best Practices | Your Site Name",
  description:
    "Learn best practices for writing robust and maintainable Azure Resource Manager (ARM) templates using JSON.",
};

export default function ArmTemplatesJsonBestPracticesArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Azure Resource Templates: JSON Best Practices</h1>

      <div className="space-y-6 text-lg text-gray-800 dark:text-gray-200">
        <p>
          Azure Resource Manager (ARM) templates are a powerful way to define and deploy your infrastructure as code
          (IaC) on Azure. Written in JSON, they provide a declarative syntax to describe the resources you want to
          deploy. While it&apos;s easy to start writing templates, adopting best practices ensures your templates are
          readable, maintainable, reusable, and less prone to errors.
        </p>
        <p>
          This article explores key best practices for writing JSON ARM templates, suitable for developers of all levels
          looking to improve their IaC skills on Azure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <LayoutList className="inline-block" /> Structure Your Template
        </h2>
        <p>
          A well-structured template is the foundation of good IaC. An ARM template JSON file has a specific top-level
          structure:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="text-sm overflow-x-auto">
            {`&lbrace;
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": &lbrace;
    // ... parameter definitions ...
  &rbrace;,
  "variables": &lbrace;
    // ... variable definitions ...
  &rbrace;,
  "functions": [
    // ... user-defined function definitions (less common) ...
  ],
  "resources": [
    // ... resource definitions ...
  ],
  "outputs": &lbrace;
    // ... output definitions ...
  &rbrace;
&rbrace;`}
          </pre>
        </div>
        <p>
          Organizing your template into these logical sections makes it easy to understand the template&apos;s purpose,
          its inputs, calculated values, deployed resources, and resulting information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="inline-block" /> Leverage Parameters Effectively
        </h2>
        <p>
          Parameters allow you to provide inputs at deployment time, making your templates reusable across different
          environments (e.g., dev, test, prod) or configurations.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Use Appropriate Data Types
        </h3>
        <p>
          Define explicit data types for your parameters (`string`, `int`, `bool`, `array`, `object`, `securestring`,
          `secureObject`). This ensures data integrity and provides better validation.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Provide Meaningful Descriptions
        </h3>
        <p>
          Use the <code>description</code> property to explain the purpose and expected value of each parameter. This is
          crucial documentation for anyone using your template.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Set Default Values Where Possible
        </h3>
        <p>
          Defaults simplify deployments when common values are acceptable. However, avoid defaults for sensitive
          parameters like passwords.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Use Allowed Values
        </h3>
        <p>
          For parameters with a limited set of valid inputs (e.g., SKUs, locations), use the <code>allowedValues</code>{" "}
          property to prevent errors during deployment.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Info className="inline-block text-orange-500" /> Secure Sensitive Information
        </h3>
        <p>
          Always use `securestring` and `secureObject` types for passwords, keys, or other secrets. These values are not
          logged during deployment.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="font-medium mb-2">Parameter Example:</h4>
          <pre className="text-sm overflow-x-auto">
            {`"parameters": &lbrace;
  "storageAccountName": &lbrace;
    "type": "string",
    "minLength": 3,
    "maxLength": 24,
    "metadata": &lbrace;
      "description": "The name of the Azure Storage account."
    &rbrace;
  &rbrace;,
  "location": &lbrace;
    "type": "string",
    "defaultValue": "[resourceGroup().location]",
    "allowedValues": [
      "eastus",
      "westus",
      "centralus"
    ],
    "metadata": &lbrace;
      "description": "The location for the resources."
    &rbrace;
  &rbrace;,
  "adminPassword": &lbrace;
    "type": "securestring",
    "metadata": &lbrace;
      "description": "Administrator password for the VM."
    &rbrace;
  &rbrace;
&rbrace;`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="inline-block" /> Define Variables for Readability and Reusability
        </h2>
        <p>
          Variables hold values that are used multiple times in your template or values that are constructed from
          parameter inputs or function calls. They improve readability and consistency.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Simplify Complex Expressions
        </h3>
        <p>
          If you have a complex expression (e.g., concatenating multiple strings, performing calculations), define it as
          a variable to keep your resource definitions clean.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Centralize Values Used Multiple Times
        </h3>
        <p>
          Define resource names (often constructed from a base name and environment), tags, or common configuration
          settings as variables.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="font-medium mb-2">Variable Example:</h4>
          <pre className="text-sm overflow-x-auto">
            {`"variables": &lbrace;
  "baseName": "[parameters('resourceBaseName')]",
  "storageAccountName": "[concat(variables('baseName'), 'storage')]",
  "appServiceName": "[concat(variables('baseName'), 'app')]",
  "commonTags": &lbrace;
    "environment": "[parameters('environment')]",
    "managedBy": "ARM Template"
  &rbrace;
&rbrace;`}
          </pre>
        </div>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Info className="inline-block text-orange-500" /> Be Mindful of Variable Scope
        </h3>
        <p>
          Variables are evaluated once at the beginning of the deployment. They cannot dynamically change based on
          resource properties created during the deployment (like resource IDs). For dynamic values, use resource
          properties or outputs.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Repeat className="inline-block" /> Use Copy for Resource Iteration
        </h2>
        <p>
          When you need to deploy multiple instances of the same resource type (e.g., several VMs, multiple subnets in a
          VNet), use the <code>copy</code> property on the resource definition. This is far better than copying and
          pasting resource blocks.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Deploy Multiple Resources
        </h3>
        <p>
          Use <code>copy</code> on the resource itself to create an array of resources of the same type.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Deploy Multiple Properties
        </h3>
        <p>
          Use <code>copy</code> within a resource definition (e.g., on the <code>properties</code> of a VNet subnet
          array) to create multiple child items within a single resource.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="font-medium mb-2">Copy Example (Multiple Storage Accounts):</h4>
          <pre className="text-sm overflow-x-auto">
            {`&lbrace;
  "type": "Microsoft.Storage/storageAccounts",
  "apiVersion": "2021-09-01",
  "name": "[concat(parameters('storagePrefix'), copyIndex())]",
  "location": "[parameters('location')]",
  "sku": &lbrace; "name": "Standard_LRS" &rbrace;,
  "kind": "StorageV2",
  "copy": &lbrace;
    "name": "storageLoop",
    "count": "[parameters('numberOfStorageAccounts')]"
  &rbrace;
&rbrace;`}
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="font-medium mb-2">Copy Example (Multiple Subnets in VNet):</h4>
          <pre className="text-sm overflow-x-auto">
            {`&lbrace;
  // ... VNet resource definition ...
  "properties": &lbrace;
    // ... VNet properties ...
    "subnets": [
      &lbrace;
        "name": "[concat('subnet-', copyIndex())]",
        "properties": &lbrace;
          "addressPrefix": "[variables('subnetAddressPrefixes')[copyIndex()]]"
          // ... other subnet properties ...
        &rbrace;,
        "copy": &lbrace;
          "name": "subnetLoop",
          "count": "[length(variables('subnetAddressPrefixes'))]"
        &rbrace;
      &rbrace;
    ]
  &rbrace;
&rbrace;`}
          </pre>
        </div>
        <p>
          The <code>copyIndex()</code> function is essential here, providing a zero-based index within the loop.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileCode className="inline-block" /> Specify API Versions
        </h2>
        <p>
          Every resource definition must specify an <code>apiVersion</code>. This version corresponds to a REST API
          version for that resource type.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Use Recent, Stable API Versions
        </h3>
        <p>
          Use a recent, non-preview API version to ensure access to the latest features while maintaining stability.
          Avoid using the absolute latest preview version in production templates unless necessary.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Info className="inline-block text-blue-500" /> Consistency is Key
        </h3>
        <p>
          While not strictly required across *all* resource types, using consistent API versions for related resources
          (e.g., networking components within a VNet deployment) can sometimes help avoid unexpected behavior due to
          differing feature sets.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Implement Resource Dependencies
        </h2>
        <p>
          ARM deploys resources in parallel by default. Use the <code>dependsOn</code> property to specify that a
          resource must be deployed only after other resources are successfully created. This is critical for resources
          that rely on others, like a Virtual Machine needing a Network Interface, or a Web App needing an App Service
          Plan.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Use Resource Names or Resource IDs
        </h3>
        <p>
          The <code>dependsOn</code> value is an array of resource names or resource IDs. Using resource IDs generated
          by functions like <code>resourceId()</code> is generally recommended for robustness, especially when dealing
          with resource types in different namespaces or nesting.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Lightbulb className="inline-block text-yellow-500" /> Implicit Dependencies
        </h3>
        <p>
          Many ARM functions (like <code>reference()</code> or <code>resourceId()</code>) create implicit dependencies.
          If Resource B uses <code>reference(resourceA)</code>, ARM understands that Resource A must be deployed before
          Resource B. While implicit dependencies are often sufficient, explicit <code>dependsOn</code> adds clarity and
          can sometimes resolve complex ordering issues.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="font-medium mb-2">DependsOn Example:</h4>
          <pre className="text-sm overflow-x-auto">
            {`&lbrace;
  "type": "Microsoft.Compute/virtualMachines",
  // ... other properties ...
  "dependsOn": [
    "[resourceId('Microsoft.Network/networkInterfaces', variables('networkInterfaceName'))]",
    "[resourceId('Microsoft.Storage/storageAccounts', variables('storageAccountName'))]"
  ]
&rbrace;`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Sigma className="inline-block" /> Utilize Built-in Template Functions
        </h2>
        <p>
          ARM templates provide a rich set of built-in functions (like <code>concat</code>, <code>resourceId</code>,{" "}
          <code>reference</code>, <code>parameters</code>, <code>variables</code>, <code>union</code>,{" "}
          <code>length</code>, etc.) to construct values dynamically.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Understand Their Purpose
        </h3>
        <p>
          Familiarize yourself with commonly used functions. For example, <code>resourceId()</code> is used to get the
          full ID of a resource, and <code>reference()</code> is used to get the runtime state (properties) of a
          deployed resource.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Info className="inline-block text-blue-500" /> Case-Insensitivity
        </h3>
        <p>
          Template functions and their arguments are case-insensitive. <code>[parameters('name')]</code> is the same as{" "}
          <code>[PARAMETERS('NAME')]</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="font-medium mb-2">Function Examples:</h4>
          <pre className="text-sm overflow-x-auto">
            {`"storageAccountName": "[concat(parameters('storagePrefix'), uniqueString(resourceGroup().id))]",
"tags": "[union(variables('commonTags'), parameters('resourceTags'))]",
"ipAddress": "[reference(variables('publicIpAddressName')).ipAddress]",
"subnetId": "[resourceId('Microsoft.Network/virtualNetworks/subnets', variables('vNetName'), variables('subnetName'))]"
`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Implement Conditional Deployments
        </h2>
        <p>
          Use the <code>condition</code> property on a resource definition to specify whether that resource should be
          deployed or not based on a boolean expression. This is useful for deploying certain resources only in specific
          environments or based on parameter inputs.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="font-medium mb-2">Condition Example:</h4>
          <pre className="text-sm overflow-x-auto">
            {`&lbrace;
  "type": "Microsoft.Network/publicIPAddresses",
  // ... other properties ...
  "condition": "[equals(parameters('deployPublicIp'), true)]"
&rbrace;`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <GitFork className="inline-block" /> Use Linked/Nested Templates
        </h2>
        <p>
          For large or complex deployments, break down your main template into smaller, reusable linked or nested
          templates. This improves modularity and manageability.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Modularity and Reusability
        </h3>
        <p>
          Create separate templates for logical groups of resources (e.g., networking, compute, database) and link them
          from a main deployment template.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Lightbulb className="inline-block text-yellow-500" /> Template Specs
        </h3>
        <p>
          Consider using{" "}
          <a
            href="https://docs.microsoft.com/azure/azure-resource-manager/templates/template-specs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Template Specs
          </a>{" "}
          to store and share your templates securely within Azure, making linked templates easier to reference.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Edit className="inline-block" /> Follow Naming Conventions
        </h2>
        <p>
          Establish and follow consistent naming conventions for your Azure resources. This makes it easier to identify
          and manage resources within the Azure portal and CLI.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Incorporate Parameters/Variables
        </h3>
        <p>
          Often, names are constructed using parameters (like environment or project code) and variables (for base names
          and suffixes) using the <code>concat</code> function.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Info className="inline-block text-orange-500" /> Be Aware of Resource Naming Rules
        </h3>
        <p>
          Each Azure resource type has specific naming restrictions (length, allowed characters). Check the
          documentation for the resources you are deploying.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <LayoutList className="inline-block" /> Define Template Outputs
        </h2>
        <p>
          Outputs allow you to return values from your deployment, such as connection strings, resource IDs, IP
          addresses, or generated keys. These are invaluable for scripting subsequent steps after the ARM deployment
          completes.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Retrieve Key Information
        </h3>
        <p>
          Use functions like <code>reference()</code> or <code>resourceId()</code> to get the properties of deployed
          resources and expose them as outputs.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Info className="inline-block text-orange-500" /> Secure Sensitive Outputs
        </h3>
        <p>
          Mark sensitive outputs with the <code>&quot;type&quot;: &quot;securestring&quot;</code> property. Their values
          will be masked in deployment logs.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="font-medium mb-2">Outputs Example:</h4>
          <pre className="text-sm overflow-x-auto">
            {`"outputs": &lbrace;
  "storageAccountEndpoint": &lbrace;
    "type": "string",
    "value": "[reference(variables('storageAccountName')).primaryEndpoints.blob]"
  &rbrace;,
  "vmPrivateIp": &lbrace;
    "type": "string",
    "value": "[reference(variables('networkInterfaceName')).ipConfigurations[0].properties.privateIPAddress]"
  &rbrace;,
  "sqlAdminPassword": &lbrace;
    "type": "securestring",
    "value": "[parameters('adminPassword')]" // Outputting a parameter value
  &rbrace;
&rbrace;`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb className="inline-block text-yellow-500" /> Add Comments (JSON Limitations)
        </h2>
        <p>
          Standard JSON does not support comments. While the Azure portal editor and some tools might allow them
          temporarily, they are technically invalid JSON and can cause issues with parsers or automation.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Wrench className="inline-block" /> Workarounds
        </h3>
        <p>Common workarounds include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Using the <code>metadata</code> property within parameters, variables, resources, or outputs.
          </li>
          <li>
            Adding a top-level object property like <code>_comments</code> or <code>explanation</code> (though this adds
            non-standard properties).
          </li>
          <li>Maintaining separate documentation.</li>
        </ul>
        <p>
          Using the <code>metadata</code> property is the recommended approach within the template JSON itself.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <SearchCheck className="inline-block" /> Validate and Test Your Templates
        </h2>
        <p>Before deploying, always validate and test your templates.</p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Use the What-If Operation
        </h3>
        <p>
          The{" "}
          <a
            href="https://docs.microsoft.com/azure/azure-resource-manager/templates/deploy-what-if"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            What-If operation
          </a>{" "}
          shows you what changes ARM will make to your environment without actually deploying. This is invaluable for
          catching unintended consequences.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:dark:bg-gray-800 my-4">
          <pre className="text-sm overflow-x-auto">
            {`az deployment group create --resource-group myResourceGroup --template-file mainTemplate.json --parameters @params.json --mode WhatIf`}
          </pre>
        </div>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Wrench className="inline-block" /> ARM Template Linter (VS Code Extension / CLI)
        </h3>
        <p>
          Use the ARM template linter (available as a VS Code extension or a separate tool) to check your template
          against recommended practices and syntax errors automatically.
        </p>
        <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
          <Check className="inline-block text-green-500" /> Deploy to a Test Resource Group
        </h3>
        <p>
          Always test complex templates in a dedicated test resource group before deploying to production environments.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Writing effective ARM templates goes beyond simply defining resources. By following these JSON best practices
          – structuring your template, using parameters and variables correctly, leveraging functions, implementing
          dependencies and conditions, using copy loops, and validating your work – you can create infrastructure code
          that is reliable, maintainable, and scalable. Investing time in learning and applying these practices will
          significantly improve your Azure IaC development workflow.
        </p>
      </div>
    </div>
  );
}

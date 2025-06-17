import type { Metadata } from "next";
import React from "react";
import {
  LockKeyhole,
  ShieldAlert,
  Archive,
  Code,
  AlertTriangle,
  FolderLock,
  ServerCog,
  GitPullRequestClosed,
  FileWarning,
  PackageOpen,
  DatabaseZap,
  KeyRound,
  ShieldCheck,
} from "lucide-react"; // Using allowed icons, added ShieldCheck

export const metadata: Metadata = {
  title: "Storing Secrets in JSON: Secure Practices | Your Website Name", // Replace with actual website name
  description:
    "Understand the risks of storing sensitive information like API keys and passwords in JSON files and learn secure alternatives.",
};

export default function StoringSecretsInJsonArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        <ShieldAlert className="inline-block mr-2 text-red-500" size={36} />
        Storing Secrets in JSON: Secure Practices
      </h1>

      <div className="space-y-8 text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-yellow-600" /> Why Storing Secrets in JSON is Risky
          </h2>
          <p>
            JSON (JavaScript Object Notation) is a widely used format for data interchange. It's lightweight, easy to
            read and write, and maps directly to native data structures in many programming languages. This makes it
            very popular for configuration files. However, storing sensitive information like API keys, database
            credentials, private keys, or passwords directly within JSON files is a significant security risk.
          </p>
          <p>
            These JSON files are often bundled with your application code, committed to version control, deployed to
            servers, or even exposed accidentally via misconfigurations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <LockKeyhole className="mr-2 text-blue-600" /> Common Pitfalls and Risks
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Version Control Leaks:</strong> Committing secrets directly into Git, SVN, or any version control
              system is a major security flaw. Even if removed later, the secrets remain in the commit history,
              accessible to anyone with repository access.
              <Archive className="inline-block ml-2 text-gray-500" size={18} />
            </li>
            <li>
              <strong>Accidental Exposure in Bundles/Builds:</strong> Frontend applications often bundle configuration
              JSONs directly into client-side JavaScript. Secrets in these files become publicly accessible in the
              user's browser.
              <PackageOpen className="inline-block ml-2 text-gray-500" size={18} />
            </li>
            <li>
              <strong>Misconfiguration:</strong> Server deployments, container images, or CI/CD pipelines might
              inadvertently expose files or environment variables derived from these JSONs.
              <ServerCog className="inline-block ml-2 text-gray-500" size={18} />
            </li>
            <li>
              <strong>Server-Side Rendering (SSR) Concerns:</strong> While server-side, these files still reside on the
              server and are susceptible to various server-side vulnerabilities if not handled with care. Plus, SSR apps
              might accidentally pass secrets to the client-side if data isn't filtered correctly.
              <GitPullRequestClosed className="inline-block ml-2 text-gray-500" size={18} />
            </li>
            <li>
              <strong>Developer Machine Risk:</strong> Keeping live production secrets in local development files
              increases the attack surface on developer machines.
              <FileWarning className="inline-block ml-2 text-gray-500" size={18} />
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <ShieldCheck className="mr-2 text-green-600" /> Secure Alternatives
          </h2>
          <p>
            Instead of hardcoding secrets in JSON (or any code/config file committed to source control), use mechanisms
            designed for secret management:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Environment Variables:</strong> A standard and widely supported method. Secrets are injected into
              the application's runtime environment. They are not part of the code base and are typically managed
              outside version control.
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm mt-2 overflow-x-auto">
                {`# Instead of config.json: {"API_KEY": "my_secret_key"}
# Use environment variables:
export API_KEY="my_secret_key"
# In Node.js: process.env.API_KEY`}
              </pre>
            </li>
            <li>
              <strong>Secret Management Systems:</strong> Dedicated tools or services like AWS Secrets Manager, Google
              Cloud Secret Manager, Azure Key Vault, HashiCorp Vault, or Doppler. These provide centralized, audited,
              and versioned storage for secrets, often with features like rotation, access control, and injection into
              various environments.
              <DatabaseZap className="inline-block ml-2 text-gray-500" size={18} />
            </li>
            <li>
              <strong>Encrypted Configuration Files:</strong> For specific scenarios, configuration files can be
              encrypted and decrypted at runtime using a master key or environment variable that is itself securely
              managed. Tools like Mozilla SOPS can help.
              <FolderLock className="inline-block ml-2 text-gray-500" size={18} />
            </li>
            <li>
              <strong>Configuration Files Outside Repository:</strong> Keep a configuration file (e.g.,
              <code>.env</code>, <code>config.yaml</code>, or even JSON) outside your version-controlled repository. Use
              template files (e.g., <code>.env.example</code>) to show required variables without providing the actual
              secrets.
              <FileWarning className="inline-block ml-2 text-gray-500" size={18} />
            </li>
          </ul>
          <p className="mt-4">
            When using environment variables in a Node.js/Next.js backend context (like an API route or
            <code>getServerSideProps</code>), you access them via <code>process.env.YOUR_SECRET_NAME</code>. For local
            development, you might use a <code>.env</code> file and a library like <code>dotenv</code>
            (which Next.js supports out-of-the-box) - just ensure <code>.env</code> is in your <code>.gitignore</code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 text-purple-600" /> What About Non-Sensitive JSON Configuration?
          </h2>
          <p>
            Storing non-sensitive configuration data in JSON files is perfectly fine and common practice. This includes
            settings that configure application behavior but do not grant access to protected resources or sensitive
            data. Examples include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Feature flags</li>
            <li>UI text or labels</li>
            <li>Non-sensitive API endpoints (if publicly known anyway)</li>
            <li>Default settings</li>
          </ul>
          <p className="mt-4">
            You can safely include such JSON files in your repository and application bundle. The key is to be certain
            the data is not confidential or sensitive.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
            <h3 className="text-xl font-medium mb-2 flex items-center">Example: Safe JSON Configuration</h3>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
              {`// config.json (Safe for repository)
{
  "appName": "My Secure App",
  "featureFlags": {
    "newUserOnboarding": true,
    "darkModeEnabled": false
  },
  "apiEndpoints": {
    "publicData": "/api/data"
  }
  // NO "databaseUrl": "...",
  // NO "stripeSecretKey": "..."
}`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <KeyRound className="mr-2 text-orange-600" /> What If I *Must* Use JSON for Secrets (With Extreme Caution)?
          </h2>
          <p>
            In rare legacy scenarios where migrating off JSON configuration for secrets is genuinely impossible in the
            short term, and you fully understand and accept the risks, consider these absolute minimum precautions.{" "}
            <strong>This is strongly discouraged for new development and should be a temporary measure.</strong>
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Keep JSON Files Out of Version Control:</strong> Use <code>.gitignore</code>
              (or equivalent) to ensure these files are never committed. Provide example files with placeholder values.
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm mt-2 overflow-x-auto">
                {`# In .gitignore
config.json
secrets.json`}
              </pre>
            </li>
            <li>
              <strong>Load JSON Only on the Server:</strong> If in a web application, ensure the JSON file is only read
              server-side and its contents are never sent to the client.
            </li>
            <li>
              <strong>Restrict File Permissions:</strong> Ensure the file has strict read permissions only for the
              user/service running the application.
            </li>
            <li>
              <strong>Consider Runtime Loading from Secure Location:</strong> Load the JSON from a location on the
              server filesystem that is highly restricted and not directly web-accessible.
            </li>
          </ul>
          <p className="mt-4 font-bold text-red-600 flex items-center">
            <AlertTriangle className="mr-2 text-red-600" /> Even with these precautions, accidental leakage remains a
            significant threat. Environment variables or a secrets manager are vastly superior.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 text-cyan-600" /> Loading Secrets Securely (Conceptual Backend Code)
          </h2>
          <p>
            Here's a simplified example showing how a backend (like a Next.js API route or
            <code>getServerSideProps</code>) might access a secret using environment variables.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
            <h3 className="text-xl font-medium mb-2 flex items-center">
              Example: Loading Secret from Environment Variable in Node.js/Next.js Backend
            </h3>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
              {`// In your API Route or getServerSideProps function (backend code)

// Access the environment variable directly
// Next.js automatically loads .env files in development
const mySecretKey = process.env.MY_API_SECRET;

if (!mySecretKey) {
  // Important: Handle missing secret gracefully (e.g., throw error, log)
  console.error("MY_API_SECRET is not set!");
  // In an API route: res.status(500).json({ error: 'Server configuration error' });
  // In getServerSideProps: redirect or return error props
} else {
  // Use the secret key for sensitive operations
  console.log("Successfully loaded secret.");
  // Example: Call an external API
  // await fetch('https://external-service.com/api/data', {
  //   headers: { 'Authorization': \`Bearer \${mySecretKey}\` }
  // });
}

// Do NOT log the actual secret value in production!
`}
            </pre>
          </div>
          <p className="mt-4">
            In this example, the secret <code>MY_API_SECRET</code> is not hardcoded anywhere in the application's source
            files. It is provided to the process at runtime via its environment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <ShieldCheck className="mr-2 text-green-600" /> Conclusion
          </h2>
          <p>
            While JSON is excellent for configuration that doesn't require confidentiality, it is a poor and insecure
            choice for storing secrets. The risk of accidental exposure through version control, build processes, or
            misconfigurations is simply too high.
          </p>
          <p>
            Always leverage platform-specific or dedicated secret management solutions like environment variables or
            cloud-based secret stores. These provide robust, audited, and secure ways to handle sensitive information,
            significantly reducing your application's security attack surface. Prioritize security from the start by
            adopting these better practices.
          </p>
        </section>
      </div>
    </div>
  );
}

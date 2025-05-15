import type { Metadata } from "next";
import {
  Layers,
  Settings,
  Check,
  ArrowRightLeft,
  Database,
  FileJson,
  HelpCircle,
  AlertCircle,
} from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Blue-Green Deployment with JSON Configuration Switching | Deployment Strategies",
  description:
    "Learn how to implement Blue-Green Deployment using a simple JSON configuration switching mechanism for seamless updates and easy rollbacks.",
};

export default function BlueGreenDeploymentArticle() {
  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">
        Blue-Green Deployment with JSON Configuration Switching
      </h1>

      <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
        Achieving zero-downtime deployments is a critical goal for modern web applications. Blue-Green deployment is a powerful strategy that helps achieve this by maintaining two identical production environments. This article explores how to integrate a simple JSON configuration switching mechanism into this strategy for managing application settings during deployments.
      </p>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Layers className="w-6 h-6 mr-2 text-blue-500" /> What is Blue-Green Deployment?
        </h2>
        <p>
          Blue-Green deployment is a release strategy where you run two identical production environments, let's call them "Blue" and "Green". At any given time, only one of the environments is live, serving all production traffic (e.g., the "Blue" environment).
        </p>
        <p>
          When you deploy a new version of your application, you deploy it to the inactive environment (the "Green" environment). This new version includes your latest code changes, dependency updates, and potentially database schema changes. Crucially, the old version (on Blue) remains running and serving traffic while the new version (on Green) is deployed and tested.
        </p>
        <p>
          Once you are confident that the new version on the Green environment is stable and ready, you switch the traffic router (often a load balancer, DNS, or API gateway) to direct all incoming requests to the Green environment instead of the Blue environment. The Green environment is now live.
        </p>
        <p>
          The old Blue environment is kept running for a period. This allows for a fast rollback if any issues are discovered in the Green environment &mdash; you simply switch traffic back to Blue. If Green remains stable, the Blue environment can eventually be shut down or repurposed for the next deployment cycle.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-xl font-medium mb-4">Key Concepts:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">Two Identical Environments:</span> Blue and Green, mirroring production infrastructure.
            </li>
            <li>
              <span className="font-semibold">One Active, One Inactive:</span> Traffic is directed to only one environment at a time.
            </li>
            <li>
              <span className="font-semibold">Atomic Switch:</span> The transition of traffic is usually a single, quick change.
            </li>
            <li>
              <span className="font-semibold">Easy Rollback:</span> Simply switch traffic back to the previous environment.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-yellow-500" /> The Role of Configuration
        </h2>
        <p>
          Applications often rely heavily on configuration settings &mdash; database connection strings, API keys, feature flags, service endpoints, logging levels, and more. These settings frequently differ between development, staging, and production environments. More importantly for Blue-Green, they might need to differ slightly *between the Blue and Green production environments themselves* during the transition period, or the *new version* might expect a slightly different configuration structure or values than the old one.
        </p>
        <p>
          Simply deploying the new code isn't enough; you also need to ensure the application running in the newly active environment picks up the correct configuration for *its* version and the *current* state of the world (e.g., pointing to the correct database replica, using the correct API endpoint for the new feature).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="w-6 h-6 mr-2 text-green-500" /> JSON Configuration Switching Explained
        </h2>
        <p>
          Using JSON files for configuration and switching between them provides a simple, readable, and version-controllable method within a Blue-Green strategy. The core idea is:
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            Maintain separate JSON configuration files for each environment, and potentially for each *version* or *state* within an environment.
          </li>
          <li>
            Have a simple mechanism that tells the running application *which* JSON configuration file to load and use.
          </li>
          <li>
            During a Blue-Green switch, update this mechanism to point to the configuration file intended for the newly active environment and application version.
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Example File Structure:</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`/app
├── src
│   └── ... application code ...
├── config
│   ├── config.blue.v1.json      // Config for Blue environment, version 1
│   ├── config.green.v1.json     // Config for Green environment, version 1
│   ├── config.blue.v2.json      // Config for Blue environment, version 2
│   ├── config.green.v2.json     // Config for Green environment, version 2
│   └── active-config.json       // A symbolic link or pointer file
└── package.json
└── ...`}
          </pre>
        </div>
        <p>
          In this setup, <code>active-config.json</code> isn't a real file, but rather a symbolic link (symlink) that points to the currently active configuration file (e.g., pointing to <code>config.blue.v1.json</code> when Blue v1 is live). Alternatively, <code>active-config.json</code> could be a tiny JSON file containing just the *name* of the current active config file (e.g., <code>&#x7b; "active": "config.blue.v1.json" &#x7d;</code>), or this "active" pointer could live in an environment variable or a simple text file.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example JSON Configuration Files:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h4 className="font-semibold text-base mb-2"><code>config.blue.v1.json</code></h4>
            <pre className="text-sm">
              {`&#x7b;
  "environment": "blue",
  "version": "1.0",
  "databaseUrl": "jdbc://blue-db-v1/prod",
  "featureFlags": &#x7b;
    "newFeatureEnabled": false
  &#x7d;,
  "apiEndpoint": "https://api.example.com/v1"
&#x7d;`}
            </pre>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto">
            <h4 className="font-semibold text-base mb-2"><code>config.green.v2.json</code></h4>
            <pre className="text-sm">
              {`&#x7b;
  "environment": "green",
  "version": "2.0",
  "databaseUrl": "jdbc://green-db-v2/prod", // Might point to a potentially different DB or schema version
  "featureFlags": &#x7b;
    "newFeatureEnabled": true // New feature enabled in v2
  &#x7d;,
  "apiEndpoint": "https://api.example.com/v2" // New API version
&#x7d;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Application Code Reads Active Config:</h3>
        <p>
          The application code is written to load configuration from the *active* source, not from a hardcoded file name.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="font-semibold text-base mb-2">Conceptual App Startup Logic:</h4>
          <pre className="text-sm">
            {`
import fs from 'fs';
import path from 'path';

let activeConfig = null;

function loadActiveConfig() &#x7b;
  const configDir = path.join(__dirname, 'config');
  // Example using symlink: Read the target of the symlink
  const activeConfigFile = fs.readlinkSync(path.join(configDir, 'active-config.json'));
  const configPath = path.join(configDir, activeConfigFile);

  const configData = fs.readFileSync(configPath, 'utf8');
  activeConfig = JSON.parse(configData);
  console.log(\`Loaded configuration for \${activeConfig.environment} v\${activeConfig.version}\`);
&#x7d;

// Load config when the application starts
loadActiveConfig();

// Example of using config
function processRequest(req) &#x7b;
  if (activeConfig.featureFlags.newFeatureEnabled) &#x7b;
    // Logic using the new feature
  &#x7d; else &#x7b;
    // Old logic
  &#x7d;
  // Use activeConfig.databaseUrl, activeConfig.apiEndpoint, etc.
&#x7d;

// ... rest of the application logic ...`}
          </pre>
        </div>
        <p>
          The application only cares about the configuration available via the <code>active-config</code> pointer.
        </p>

        <h3 className="text-xl font-semibold mt-6">The Switching Mechanism:</h3>
        <p>
          The "switch" in this configuration strategy is simple: update the <code>active-config</code> pointer to reference the JSON file for the new environment/version.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="font-semibold text-base mb-2">Conceptual Switch Script (using symlink):</h4>
          <pre className="text-sm">
            {`
#!/bin/bash

NEW_CONFIG_FILE="config.green.v2.json"
CONFIG_DIR="/path/to/your/app/config"
ACTIVE_LINK="active-config.json"
BACKUP_LINK="active-config.json.bak"

# Backup the current active link
if [ -L "\${CONFIG_DIR}/\${ACTIVE_LINK}" ]; then
    echo "Backing up existing active link..."
    mv "\${CONFIG_DIR}/\${ACTIVE_LINK}" "\${CONFIG_DIR}/\${BACKUP_LINK}"
fi

# Create the new active link pointing to the new config
echo "Switching active config to \${NEW_CONFIG_FILE}..."
ln -s "\${NEW_CONFIG_FILE}" "\${CONFIG_DIR}/\${ACTIVE_LINK}"

echo "Config switch complete. Application instances should pick up the new config on restart or reload."

# Note: Applications might need a restart or a configuration reload signal
# depending on how they are implemented to pick up the change.`}
          </pre>
        </div>
        <p>
          This script, executed as part of your deployment process *after* the new application version is deployed to the Green environment, makes the configuration intended for the new version available. When traffic is then switched, the instances receiving traffic (the Green ones) will be using the correct configuration. If using a reload mechanism instead of restart, the application could theoretically pick up the new config dynamically without a full restart.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ArrowRightLeft className="w-6 h-6 mr-2 text-purple-500" /> Blue-Green Deployment Steps with JSON Config
        </h2>
        <ol className="list-decimal pl-6 space-y-4 my-4">
          <li>
            <span className="font-semibold">Prepare Green Environment:</span> Ensure the Green environment infrastructure is ready and identical to Blue.
          </li>
          <li>
            <span className="font-semibold">Deploy New Version to Green:</span> Deploy the new application code and the corresponding new JSON configuration file(s) (e.g., <code>config.green.v2.json</code>) to the Green environment. The Green environment instances are not yet serving production traffic.
          </li>
          <li>
            <span className="font-semibold">Run Tests on Green:</span> Execute automated (and potentially manual) tests against the Green environment directly (e.g., via its internal IP or a separate test domain) to verify the new code and its configuration are working correctly.
          </li>
          <li>
            <span className="font-semibold">Update Active Configuration Pointer:</span> Execute the configuration switching step (like the symlink update script). This makes <code>config.green.v2.json</code> the "active" configuration source that Green instances will load. If Green instances are running, they might need a restart or explicit reload signal to pick up this change.
          </li>
          <li>
            <span className="font-semibold">Perform Final Checks on Green:</span> After Green instances reload with the new configuration, run smoke tests or basic health checks against the Green environment via its production-facing access point (if available without switching production traffic) to ensure it loaded the config correctly and is healthy.
          </li>
          <li>
            <span className="font-semibold">Switch Traffic:</span> Update the load balancer or DNS to direct 100% of production traffic to the Green environment.
          </li>
          <li>
            <span className="font-semibold">Monitor Green:</span> Closely monitor the Green environment's performance, error rates, and application logs. The Blue environment remains running and idle.
          </li>
          <li>
            <span className="font-semibold">Rollback (If Needed):</span> If significant issues arise in Green, immediately switch traffic back to the Blue environment. Then, diagnose and fix the issues in a non-production environment before attempting another Green deployment.
          </li>
          <li>
            <span className="font-semibold">Decommission/Update Blue:</span> If the Green environment is stable for a predetermined period, the old Blue environment can be decommissioned, shut down, or prepared to become the "Green" environment for the *next* deployment cycle (deploying version 3).
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Check className="w-6 h-6 mr-2 text-green-500" /> Benefits of this Approach
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-semibold">Zero Downtime for Config Changes:</span> Configuration changes, even those requiring reloads, are applied to the inactive environment before the traffic switch, minimizing impact on users.
          </li>
          <li>
            <span className="font-semibold">Simple and Transparent:</span> JSON files are human-readable and easily managed in version control. The switching mechanism (like a symlink) is straightforward.
          </li>
          <li>
            <span className="font-semibold">Atomic Switching:</span> The configuration switch itself is typically a very fast operation.
          </li>
          <li>
            <span className="font-semibold">Easy Rollback:</span> Rolling back the code (switch traffic back to Blue) is often automatically accompanied by rolling back the configuration, especially if the Blue environment was left untouched. If configuration requires its own rollback step, having the old config file readily available makes this simple.
          </li>
          <li>
            <span className="font-semibold">Decoupled from Code Build:</span> Configuration files can potentially be updated and managed slightly independently of the main code build process, allowing for quick config-only updates (though care is needed to ensure config compatibility with the deployed code version).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertCircle className="w-6 h-6 mr-2 text-red-500" /> Challenges and Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-semibold">Cost:</span> Maintaining two production-sized environments can be expensive.
          </li>
          <li>
            <span className="font-semibold">Database Changes:</span> Database schema migrations or data migrations are often the trickiest part. They must be handled carefully to be compatible with *both* the old version (Blue) and the new version (Green) during the transition. This might involve forward/backward compatible schema changes.
          </li>
          <li>
            <span className="font-semibold">State Management:</span> Sessions, caches, queues, and long-running jobs need careful consideration to ensure a smooth transition and prevent data loss or corruption when switching environments.
          </li>
          <li>
            <span className="font-semibold">Configuration Reload:</span> Applications need to be built to reload their configuration without a full restart, or the deployment process must include a graceful restart of the Green instances after the config switch but before the traffic switch.
          </li>
          <li>
            <span className="font-semibold">Complexity with Many Services:</span> Coordinating Blue-Green switches and config updates across multiple microservices requires orchestration.
          </li>
          <li>
            <span className="font-semibold">Secrets Management:</span> Storing sensitive secrets directly in JSON files is not recommended. Integrate with a secure secrets manager, and have your application load secrets based on the active configuration's pointers or identifiers.
          </li>
        </ul>

         <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Database className="w-6 h-6 mr-2 text-blue-600" /> Alternative Config Storage
        </h2>
        <p>
            While JSON files are simple for this pattern, the "active config pointer" idea can be applied to other configuration storage methods:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
                <span className="font-semibold">Environment Variables:</span> Set environment variables differently for the Blue and Green instances. The traffic switch implies that new requests go to instances with the 'Green' variables.
            </li>
             <li>
                <span className="font-semibold">Configuration Service:</span> Use a dedicated configuration service (like HashiCorp Consul, etcd, or a cloud provider's config store). The application reads keys based on its environment (Blue/Green). The "switch" involves updating the values in the configuration service for the 'Green' keys.
            </li>
             <li>
                <span className="font-semibold">Database:</span> Configuration could live in a database table. The application queries the table. A switch might involve updating a row, or updating an environment variable that tells the app which set of config rows to use.
            </li>
        </ul>
        <p>
            The JSON file approach is often favored for its simplicity and ease of integration into existing file-based deployment workflows.
        </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <HelpCircle className="w-6 h-6 mr-2 text-yellow-600" /> Blue-Green vs. Feature Flags vs. Canary
        </h2>
         <p>
            It's useful to understand how Blue-Green relates to other techniques:
         </p>
         <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
                <span className="font-semibold">Feature Flags:</span> Control specific features for subsets of users *within* a single deployed application version. JSON configuration can easily store feature flag states, and Blue-Green deployment helps get the new version (which understands the new flags) into production safely. They complement each other &mdash; Blue-Green for the infrastructure/code switch, Feature Flags for gradual rollout of features *post*-deployment.
            </li>
             <li>
                <span className="font-semibold">Canary Releases:</span> Gradually roll out a new version to a *small percentage* of users first, while the majority still use the old version. This requires routing traffic based on user/request attributes, not just switching 100% of traffic at once. Canary is often considered more complex but allows for testing with real users before a full rollout. Blue-Green config switching could potentially be adapted for Canary by having config files that expose features only to 'canary' traffic, but it's less common than using a dedicated feature flag system for Canary.
            </li>
         </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Blue-Green deployment is a robust strategy for minimizing downtime and risk during application updates. Integrating a simple JSON configuration switching mechanism aligns well with this pattern, providing a clear, version-controlled way to manage application settings specific to each environment and application version during the deployment lifecycle. While it requires careful planning, especially regarding database changes and state, its benefits in enabling fast, reliable deployments and easy rollbacks make it a popular choice for many production systems.
        </p>
      </section>
    </article>
  );
}
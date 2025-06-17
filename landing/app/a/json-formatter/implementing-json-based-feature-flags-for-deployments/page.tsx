import type { Metadata } from "next";
import { Settings, FileJson2, ToggleLeft, CheckCheck, X, Info, Lightbulb, Code } from "lucide-react"; // Import necessary Lucide icons

export const metadata: Metadata = {
  title: "Implementing JSON-based Feature Flags for Deployments | Article",
  description:
    "Learn how to implement a simple, JSON-based feature flagging system for controlling deployments and features.",
};

export default function JsonFeatureFlagArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Settings className="w-8 h-8 text-gray-600 dark:text-gray-400" /> Implementing JSON-based Feature Flags for
        Deployments
      </h1>

      <div className="space-y-6">
        <p>
          Feature flags (also known as feature toggles) are a powerful technique in modern software development that
          allows you to modify system behavior without changing code. Instead, you change configuration. This is
          incredibly useful for managing deployments, rolling out features gradually, performing A/B testing, or quickly
          disabling features if something goes wrong (kill switch).
        </p>
        <p>
          While there are many sophisticated feature flagging platforms available, a simple and effective way to get
          started, especially for smaller projects or server-side applications like those built with Next.js API routes
          or during server-side rendering, is to use a JSON configuration file.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ToggleLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" /> What are Feature Flags?
        </h2>
        <p>
          At its core, a feature flag is a conditional statement in your codebase that determines whether a specific
          piece of functionality is enabled or disabled. This condition is not hardcoded but controlled by an external
          configuration value.
        </p>
        <p>Think of them as switches that you can flip on or off remotely.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Toggle Features:</strong> Turn features on/off without redeploying.
          </li>
          <li>
            <strong>Gradual Rollouts:</strong> Release features to a small percentage of users first.
          </li>
          <li>
            <strong>A/B Testing:</strong> Show different versions of a feature to different user segments.
          </li>
          <li>
            <strong>Kill Switches:</strong> Quickly disable a problematic feature in production.
          </li>
          <li>
            <strong>Dark Launches:</strong> Deploy a feature disabled and enable it later.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson2 className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Why JSON for Feature Flags?
        </h2>
        <p>
          JSON (JavaScript Object Notation) is a lightweight and easy-to-read data interchange format. Its hierarchical
          structure makes it well-suited for representing configuration data.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Simplicity:</strong> Easy to understand and edit manually.
          </li>
          <li>
            <strong>Ubiquity:</strong> Supported natively or with minimal libraries in almost all programming languages.
          </li>
          <li>
            <strong>Fits File-Based Approach:</strong> Can be stored as a simple file within your project or on a
            server.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Structure of a JSON Feature Flag File
        </h2>
        <p>
          A basic JSON file for feature flags could be a simple key-value store where the key is the flag name and the
          value is a boolean indicating its state.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Simple JSON Structure:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  "isNewFeatureEnabled": true,
  "isBetaUserFlowActive": false,
  "canShowPromoBanner": true
}`}
            </pre>
          </div>
        </div>

        <p>
          For more complex scenarios, flags might need conditions. Instead of just a boolean, the value could be an
          object containing configuration for the flag, including its enabled status and rules for specific users or
          conditions.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Conditional JSON Structure:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  "isNewFeatureEnabled": {
    "enabled": true,
    "rules": [
      { "type": "userId", "values": ["user123", "user456"] },
      { "type": "percentage", "value": 10 } // 10% of users
    ]
  },
  "canShowPromoBanner": {
     "enabled": true,
     "rules": [
        { "type": "country", "values": ["US", "CA"] }
     ]
  }
}`}
            </pre>
          </div>
        </div>
        <p>
          In the conditional structure, the application logic would need to evaluate the rules to determine if the
          feature is enabled for the current context (e.g., current user, session properties).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Implementation Steps (Server-Side)
        </h2>
        <p>
          Implementing this on the server-side (like in a Next.js API route or `getServerSideProps`) involves reading
          the JSON file, parsing it, and then checking the flag status.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Store the JSON File</h3>
        <p>
          Place your <code>features.json</code> file somewhere accessible to your server code, for example, in a{" "}
          <code>config</code> directory.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`your-project/
├── ...
├── config/
│   └── features.json
└── pages/
    ├── api/
    │   └── some-endpoint.ts
    └── index.tsx`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Read and Parse the JSON</h3>
        <p>
          Use Node.js built-in modules like <code>fs</code> and <code>path</code> to read the file and{" "}
          <code>JSON.parse</code> to convert the string content into a JavaScript object.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example Server-Side Code (conceptual):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// In a server-side context (e.g., API route, getServerSideProps)
import * as fs from 'fs';
import * as path from 'path';

interface FeatureFlags {
  [key: string]: boolean | { enabled: boolean; rules?: any[] };
}

let featureFlags: FeatureFlags | null = null; // Cache the flags

function loadFeatureFlags(): FeatureFlags {
  if (featureFlags) {
    return featureFlags; // Return cached flags
  }

  const flagsFilePath = path.join(process.cwd(), 'config', 'features.json');
  try {
    const fileContent = fs.readFileSync(flagsFilePath, 'utf-8');
    featureFlags = JSON.parse(fileContent) as FeatureFlags;
    console.log('Feature flags loaded successfully.');
    return featureFlags;
  } catch (error) {
    console.error('Error loading feature flags:', error);
    // Handle error: maybe return default flags or throw
    return {}; // Return empty flags on error
  }
}

// Call this function when your application/server starts or when needed
// loadFeatureFlags(); // Or call within your API route/getServerSideProps

// Function to check a simple boolean flag
function isFeatureEnabled(flagName: string): boolean {
  const flags = loadFeatureFlags(); // Load (or get cached) flags
  const flag = flags[flagName];

  if (typeof flag === 'boolean') {
    return flag;
  }
   if (typeof flag === 'object' && flag !== null && 'enabled' in flag) {
     // For conditional flags, just check the 'enabled' status for simplicity here
     // A real implementation would need rule evaluation
     return flag.enabled;
   }
  return false; // Default to off if flag not found
}

// Example usage in a Next.js API route:
/*
import { NextApiRequest, NextApiResponse } from 'next';
// ... import loadFeatureFlags and isFeatureEnabled ...

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const showBeta = isFeatureEnabled('isBetaUserFlowActive');

  if (showBeta) {
    // ... serve beta content ...
    res.status(200).json({ message: 'Beta content shown' });
  } else {
    // ... serve standard content ...
    res.status(200).json({ message: 'Standard content shown' });
  }
}
*/
`}
            </pre>
          </div>
        </div>

        <p>
          Note the use of a simple caching mechanism (`featureFlags` variable) to avoid reading and parsing the file on
          every request, which is important for performance in server environments. The cache would need to be
          invalidated if the file changes, which typically requires a server restart in this simple setup.
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Using Flags in Code</h3>
        <p>Conditional logic is implemented using standard control flow based on the flag's value.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Example in your server-side rendering logic (getServerSideProps) or API route
// import { isFeatureEnabled } from '../config/featureFlags'; // Assuming you put the logic in a separate file

export async function getServerSideProps(context) {
  const showNewDesign = isFeatureEnabled('isNewDesignEnabled');

  // Pass flag status to the page component or use in API logic
  return {
    props: {
      showNewDesign,
      // ... other props
    },
  };
}

// In your page component (index.tsx), if using getServerSideProps:
/*
interface HomePageProps {
  showNewDesign: boolean;
  // ... other props
}

export default function HomePage({ showNewDesign }: HomePageProps) {
  return (
    <div>
      <h1>Welcome</h1>
      {showNewDesign ? (
        <p>Experience our exciting new design!</p>
      ) : (
        <p>Using the classic layout.</p>
      )}
      // ... rest of your page
    </div>
  );
}
*/
`}
            </pre>
          </div>
        </div>
        <p>
          For conditional flags with rules, you would need a more sophisticated `isFeatureEnabled` function that takes
          context (like user ID, request headers, etc.) and evaluates the rules defined in the JSON.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Conceptual Conditional Flag Evaluation:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function isFeatureEnabledConditional(flagName: string, context: any): boolean {
  const flags = loadFeatureFlags();
  const flagConfig = flags[flagName];

  if (typeof flagConfig !== 'object' || flagConfig === null || !('enabled' in flagConfig)) {
    return false; // Not a valid conditional flag config
  }

  if (!flagConfig.enabled) {
    return false; // Flag is globally disabled
  }

  if (!flagConfig.rules || flagConfig.rules.length === 0) {
    return true; // Enabled and no specific rules, so enabled for all
  }

  // Evaluate rules - feature is enabled if *any* rule matches
  for (const rule of flagConfig.rules) {
    if (rule.type === 'userId' && context.userId && rule.values.includes(context.userId)) {
      return true; // User ID matches a rule
    }
    if (rule.type === 'percentage' && typeof rule.value === 'number') {
      // Simple percentage check (e.g., consistent hashing or random)
      // This example uses a simple hash for consistency across requests for the same user
      if (context.userId) {
         const hash = context.userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
         if (hash % 100 < rule.value) {
            return true; // User falls into the percentage
         }
      } else {
         // Fallback for non-user context, e.g., random for non-logged-in users
         if (Math.random() * 100 < rule.value) {
            return true;
         }
      }
    }
    // Add more rule types as needed (e.g., region, role, etc.)
  }

  return false; // No rules matched the context
}`}
            </pre>
          </div>
        </div>
        <p>The complexity of the rule evaluation logic depends entirely on your requirements.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCheck className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Advantages
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Simple Setup:</strong> Very quick to implement compared to integrating with a feature flag service.
          </li>
          <li>
            <strong>Full Control:</strong> You control the file and its structure.
          </li>
          <li>
            <strong>Offline Friendly:</strong> Works without an external service dependency (once the file is loaded).
          </li>
          <li>
            <strong>Fits Server Context:</strong> Reading a local file is straightforward on the backend.
          </li>
          <li>
            <strong>Transparent:</strong> The state of all flags is visible in a single file.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <X className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Disadvantages
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Requires Redeployment/Reload:</strong> Changing the flag values typically requires a server restart
            or a specific mechanism to signal the server to reload the config file. This isn't truly "remote" control
            without extra work.
          </li>
          <li>
            <strong>No UI:</strong> Managing flags means manually editing a JSON file.
          </li>
          <li>
            <strong>Limited Rule Complexity:</strong> Implementing sophisticated rules (like user segments, gradual
            rollouts with percentages) adds complexity to your application code rather than leveraging a platform's
            features.
          </li>
          <li>
            <strong>No Audit Trail:</strong> Difficult to track who changed a flag and when.
          </li>
          <li>
            <strong>Security:</strong> If the JSON file is publicly accessible or stored insecurely, flag states (and
            potentially rule logic) could be exposed. This approach is best suited for server-side flags where the file
            is read from the server's local file system.
          </li>
          <li>
            <strong>Scaling Issues:</strong> For many microservices or applications, managing individual JSON files
            becomes cumbersome.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6 text-gray-600 dark:text-gray-400" /> Considerations and Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Caching:</strong> Always cache the parsed JSON in memory on the server to avoid file I/O on every
            request.
          </li>
          <li>
            <strong>Reloading:</strong> If you need to change flags without redeploying, implement a mechanism to
            trigger a config reload (e.g., an internal API endpoint that clears the cache). Be cautious about who can
            access this endpoint.
          </li>
          <li>
            <strong>Validation:</strong> Add validation when parsing the JSON to ensure it has the expected structure
            and types.
          </li>
          <li>
            <strong>Error Handling:</strong> Gracefully handle errors if the file is missing or invalid. Defaulting
            flags to 'off' (`false`) is a common safe practice.
          </li>
          <li>
            <strong>Type Safety:</strong> Use TypeScript interfaces for your flag structure to get type checking
            benefits.
          </li>
          <li>
            <strong>Conditional Logic:</strong> Encapsulate complex conditional logic in a dedicated function or class
            to keep your application code clean.
          </li>
          <li>
            <strong>Versioning:</strong> Treat your JSON file like code; version control it (Git) and include it in your
            CI/CD pipeline.
          </li>
          <li>
            <strong>Documentation:</strong> Document what each flag does.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">Conclusion</h2>
        <p>
          Implementing JSON-based feature flags is a straightforward and accessible way to introduce the concept of
          configuration-driven behavior into your server-side applications. While it lacks the advanced features and
          management UIs of dedicated platforms, its simplicity makes it an excellent starting point for controlling
          feature rollouts and managing application behavior without code changes, particularly when combined with a
          basic config reloading mechanism and careful deployment practices.
        </p>
        <p>
          For many development teams, starting with a simple file-based approach provides immediate value and helps
          build familiarity with feature flagging principles before potentially migrating to more robust systems as
          needs grow.
        </p>
      </div>
    </>
  );
}

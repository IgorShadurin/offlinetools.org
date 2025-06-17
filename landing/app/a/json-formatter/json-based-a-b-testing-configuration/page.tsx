import type { Metadata } from "next";
import { Settings, Code } from "lucide-react"; // Importing allowed icons

export const metadata: Metadata = {
  title: "JSON-based A/B Testing Configuration | Article",
  description: "Learn how to use JSON files to configure A/B tests, providing flexibility and decoupling deployments.",
};

export default function JsonBasedAbTestingConfigArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Settings className="inline-block" />
        JSON-based A/B Testing Configuration
      </h1>

      <div className="space-y-6 text-gray-800 dark:text-gray-200">
        <p>
          A/B testing is a crucial technique for optimizing user experiences and business metrics by comparing two or
          more versions of a feature or design. Traditionally, configuring A/B tests might involve database entries,
          feature flag services, or even code changes requiring full application deployments. However, a flexible and
          increasingly popular approach is to manage A/B test configurations using simple JSON files.
        </p>

        <p>
          This method decouples the definition and parameters of an A/B test from the core application code deployment,
          allowing for faster iterations and potentially enabling non-developers (like product managers or marketers) to
          manage test parameters via a configuration management system.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <Code className="inline-block" />
          Why JSON for A/B Testing Configuration?
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Decoupling:</strong> Separate test logic (how to apply the test) from test configuration (what the
            test is, who gets what variant, parameters for variants). Changing allocation or variant parameters
            doesn&apos;t require a code deploy.
          </li>
          <li>
            <strong>Simplicity:</strong> JSON is a human-readable and widely supported data format. It&apos;s easy to
            understand and parse.
          </li>
          <li>
            <strong>Version Control:</strong> JSON files can be stored in version control systems (like Git), providing
            a history of changes, easy rollbacks, and clear visibility into current test configurations.
          </li>
          <li>
            <strong>Portability:</strong> JSON is platform-agnostic. The same configuration can potentially be used
            across different services or application types (frontend, backend, mobile) if they share a common
            interpretation layer.
          </li>
          <li>
            <strong>Centralization:</strong> A single JSON file or a set of files can serve as the source of truth for
            all active experiments.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Structure of a JSON A/B Config File</h2>
        <p>
          While the exact structure can vary based on application needs, a common pattern involves defining experiments
          as objects within a root JSON structure. Each experiment object would typically contain details like:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>experimentId</code>: A unique identifier for the experiment.
          </li>
          <li>
            <code>name</code>: A human-readable name.
          </li>
          <li>
            <code>enabled</code>: Boolean flag to easily turn the experiment on or off.
          </li>
          <li>
            <code>trafficAllocation</code>: The percentage of eligible traffic for the entire experiment (e.g., 50%
            means only half the users who could be in this test will be assigned a variant).
          </li>
          <li>
            <code>variants</code>: An object or array defining the different variants (e.g., &quot;control&quot;,
            &quot;variantA&quot;). Each variant can have its own specific parameters or feature flags.
          </li>
          <li>
            <code>variantAllocation</code>: The percentage distribution *among* the allocated traffic (e.g., for the 50%
            allocated traffic, split it 50/50 between control and variantA). This would sum to 100%.
          </li>
          <li>
            <code>defaultVariant</code>: Which variant to serve if the user isn&apos;t allocated or the experiment is
            disabled.
          </li>
          <li>
            <code>targetingRules</code>: (Optional) Criteria for which users are eligible for the experiment (e.g., user
            IDs, country, signup date - though complex targeting might live outside the basic JSON).
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto text-sm">
          <h3 className="text-lg font-medium mb-2">Example JSON Configuration:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {`[
  {
    "experimentId": "new-homepage-layout",
    "name": "Homepage Redesign Test",
    "enabled": true,
    "trafficAllocation": 75, // 75% of eligible users see this experiment
    "variants": {
      "control": {
        "description": "Original homepage layout",
        "layoutVersion": "v1",
        "showPromoBanner": true
      },
      "variantA": {
        "description": "New homepage layout with hero section",
        "layoutVersion": "v2",
        "showPromoBanner": false, // Variant A hides the banner
        "heroEnabled": true
      }
    },
    "variantAllocation": { // Allocation *within* the 75% traffic
      "control": 50,
      "variantA": 50
    },
    "defaultVariant": "control", // If not allocated or disabled
    "targetingRules": [ // Simple example; could be more complex
       { "type": "country", "value": "US" }
    ]
  },
  {
    "experimentId": "checkout-button-color",
    "name": "Checkout Button Color Test",
    "enabled": false, // This experiment is currently off
    "trafficAllocation": 100,
    "variants": {
      "control": { "buttonColor": "blue" },
      "variantB": { "buttonColor": "green" }
    },
    "variantAllocation": {
      "control": 70,
      "variantB": 30
    },
    "defaultVariant": "control"
  }
]`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Workflow and Implementation</h2>

        <p>The typical workflow for using JSON-based A/B testing configuration involves several steps:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Define Configuration:</strong> Create or update the JSON file with details of the A/B tests,
            variants, and parameters.
          </li>
          <li>
            <strong>Deploy Configuration:</strong> The JSON file is deployed to a location accessible by the
            application. This could be a static file server, a CDN, a configuration service, or even embedded in the
            application bundle (though the latter reduces the &quot;no code deploy&quot; advantage).
          </li>
          <li>
            <strong>Load Configuration:</strong> The application loads the JSON configuration at startup or when needed.
          </li>
          <li>
            <strong>User Allocation:</strong> For each user, determine which experiments they are eligible for (based on
            targeting rules) and, if eligible and the experiment is enabled and within traffic allocation, assign them
            to a specific variant based on the <code>variantAllocation</code>. This usually involves a consistent
            hashing mechanism based on a user identifier (like user ID or session ID) and the experiment ID.
          </li>
          <li>
            <strong>Apply Configuration:</strong> The application logic checks the assigned variant for an experiment
            and uses the corresponding parameters from the JSON to alter behavior, appearance, or data flow.
          </li>
          <li>
            <strong>Track Results:</strong> Log which variant the user was assigned to, alongside user actions and
            metrics, to analyze experiment results.
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto text-sm">
          <h3 className="text-lg font-medium mb-2">Conceptual Application Logic (TypeScript):</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {`// Assume this function loads and parses the JSON config
async function loadAbConfig(): Promise<any[]> {
  // In a real app, this would fetch from a URL or load from disk
  const config = [
    {
      "experimentId": "new-homepage-layout",
      "name": "Homepage Redesign Test",
      "enabled": true,
      "trafficAllocation": 75,
      "variants": {
        "control": { "layoutVersion": "v1", "showPromoBanner": true },
        "variantA": { "layoutVersion": "v2", "showPromoBanner": false, "heroEnabled": true }
      },
      "variantAllocation": { "control": 50, "variantA": 50 },
      "defaultVariant": "control",
      "targetingRules": [ { "type": "country", "value": "US" } ]
    }
    // ... other experiments
  ];
  return config;
}

// Assume this function allocates a user to a variant
function getUserVariant(userId: string, experimentConfig: any): string {
  if (!experimentConfig.enabled) {
    return experimentConfig.defaultVariant;
  }

  // Basic targeting rule check (needs expansion for real logic)
  const isEligible = experimentConfig.targetingRules.every((rule: any) => {
      if (rule.type === 'country') {
          // In a real app, you'd get user's country
          const userCountry = "US"; // Example
          return userCountry === rule.value;
      }
      return true; // No targeting rules or unknown type
  });

  if (!isEligible) {
      return experimentConfig.defaultVariant;
  }

  // Simple traffic allocation check (needs proper hashing/bucketing)
  // This is a simplified conceptual example, NOT for production use
  const hash = simpleHash(userId + experimentConfig.experimentId); // Needs robust hashing
  const allocationBucket = hash % 100; // Get a number between 0-99

  if (allocationBucket >= experimentConfig.trafficAllocation) {
      return experimentConfig.defaultVariant; // User not in allocated traffic
  }

  // Simple variant allocation within traffic (needs proper bucketing)
  let cumulative Allocation = 0;
  for (const variant in experimentConfig.variantAllocation) {
    cumulativeAllocation += experimentConfig.variantAllocation[variant];
    if (allocationBucket < cumulativeAllocation) {
      return variant; // User falls into this variant's bucket
    }
  }

  // Should not happen with correct allocation config
  return experimentConfig.defaultVariant;
}

// Dummy hash function - REPLACE with a proper consistent hashing algorithm
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash); // Ensure positive
}


// Example usage (in a server-side context, e.g., Next.js API route or getServerSideProps)
async function processRequest(userId: string): Promise<any> {
  const abConfig = await loadAbConfig();
  const userExperimentSettings: { [key: string]: any } = {};

  for (const experiment of abConfig) {
    const assignedVariantName = getUserVariant(userId, experiment);
    const variantSettings = experiment.variants[assignedVariantName];
    if (variantSettings) {
        // Store the actual parameters the user should receive
        userExperimentSettings[experiment.experimentId] = {
            variant: assignedVariantName,
            settings: variantSettings
        };
    }
  }

  // Now userExperimentSettings contains all active variant parameters for this user
  console.log(\`Settings for user \${userId}: \`, userExperimentSettings);
  return userExperimentSettings;
}

// Example of how to use the settings
async function renderHomepage(userId: string) {
    const userSettings = await processRequest(userId);
    const homepageExperiment = userSettings["new-homepage-layout"];

    if (homepageExperiment) {
        const layoutVersion = homepageExperiment.settings.layoutVersion;
        const showPromoBanner = homepageExperiment.settings.showPromoBanner;
        const heroEnabled = homepageExperiment.settings.heroEnabled; // might be undefined if not in variant

        console.log(\`Rendering homepage version: \${layoutVersion}\`);
        console.log(\`Show promo banner: \${showPromoBanner}\`);
        if (heroEnabled) {
            console.log("Hero section is enabled.");
        }
        // ... rendering logic based on parameters
    } else {
        // Handle case where user is not in the experiment or experiment is off
        console.log("Rendering default homepage.");
        // ... rendering logic for default
    }
}

// Call example function (in a server context)
// renderHomepage("user123");
// renderHomepage("user456");
`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Considerations and Challenges</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Caching:</strong> The application needs an effective caching strategy for the JSON configuration to
            avoid fetching/parsing it on every request.
          </li>
          <li>
            <strong>Validation:</strong> Implement robust validation for the JSON structure and data types to prevent
            application errors caused by malformed configuration.
          </li>
          <li>
            <strong>Deployment of Config:</strong> While it avoids a code deploy, you still need a reliable way to
            update the JSON file in its serving location and ensure applications pick up the new version (e.g., cache
            invalidation, polling).
          </li>
          <li>
            <strong>Complexity:</strong> For very complex experiments, intricate targeting rules, or dependencies
            between experiments, a simple static JSON might become unwieldy. A dedicated feature flagging or A/B testing
            platform might be better.
          </li>
          <li>
            <strong>Security:</strong> Ensure the JSON file itself doesn&apos;t contain sensitive information and is
            served securely if exposed publicly.
          </li>
          <li>
            <strong>Atomic Updates:</strong> Ensure that when updating the JSON, all applications switch to the new
            configuration atomically to avoid inconsistencies. Serving via a CDN with versioning or a dedicated config
            service helps here.
          </li>
          <li>
            <strong>Monitoring:</strong> Monitor for errors during JSON loading or parsing, and ensure that
            configuration changes propagate as expected.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Integrating with Feature Flags</h2>
        <p>
          JSON-based A/B config can work hand-in-hand with feature flags. An A/B test can be seen as a specific use case
          of feature flags where the flag&apos;s state is determined by a random allocation to a variant, rather than
          just being on or off for everyone or for specific user segments. The parameters within a variant in the JSON
          can effectively act as dynamic feature flag values for users in that variant.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
        <p>
          Using JSON files for A/B testing configuration offers a powerful way to manage experiments with greater
          flexibility and speed compared to baked-in code logic. It promotes separation of concerns, simplifies
          versioning via standard tools like Git, and can empower teams to iterate faster on experiments. While it
          introduces new considerations around configuration deployment and validation, for many use cases, it provides
          a pragmatic and effective approach to A/B testing.
        </p>
      </div>
    </>
  );
}

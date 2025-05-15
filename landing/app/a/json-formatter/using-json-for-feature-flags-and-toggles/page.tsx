import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Using JSON for Feature Flags and Toggles | Offline Tools",
  description:
    "Learn how to implement and manage feature flags with JSON configurations for controlled rollouts, A/B testing, and dynamic feature management.",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Using JSON for Feature Flags and Toggles</h1>

      <div className="space-y-6">
        <p>
          Feature flags (or feature toggles) are a powerful technique that enables developers to modify system behavior
          without changing code. By using JSON for feature flags, you gain flexible configuration that can be updated
          independently of code deployments. This article explains how to implement feature flags with JSON and best
          practices for managing them effectively.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What Are Feature Flags?</h2>
        <p>
          Feature flags are boolean values or parameters that determine whether a particular feature is enabled or
          disabled for specific users or environments. They act as conditional switches that control program flow without
          requiring code changes or redeployments.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Common Use Cases for Feature Flags:</h3>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Use Case</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Benefit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Progressive Rollouts</td>
                <td className="px-4 py-2">Release features to a small percentage of users first</td>
                <td className="px-4 py-2">Reduces risk of widespread issues</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">A/B Testing</td>
                <td className="px-4 py-2">Show different versions to different user groups</td>
                <td className="px-4 py-2">Data-driven decision making</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Canary Releases</td>
                <td className="px-4 py-2">Enable features for specific test environments</td>
                <td className="px-4 py-2">Early detection of problems</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Instant Rollbacks</td>
                <td className="px-4 py-2">Disable problematic features without deployment</td>
                <td className="px-4 py-2">Faster incident response</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">User Entitlements</td>
                <td className="px-4 py-2">Enable features based on subscription level</td>
                <td className="px-4 py-2">Simplified product tier management</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">JSON Feature Flag Structures</h2>

        <h3 className="text-xl font-medium mt-6">1. Simple Boolean Flags</h3>
        <p>
          The most basic approach is a simple key-value pair where the key is the feature name and the value is a
          boolean.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "newHomepage": true,
  "darkMode": false,
  "premiumFeatures": true,
  "betaAnalytics": false
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Implementation Code:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JavaScript example
if (featureFlags.newHomepage) {
  // Show the new homepage
} else {
  // Show the old homepage
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">When to Use:</h4>
          <p>
            This simple approach works well for smaller applications or when features are either completely on or off
            across your entire user base.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Environment-Specific Flags</h3>
        <p>
          For applications that run in multiple environments, you might want different flag values for each environment.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "environments": {
    "development": {
      "newHomepage": true,
      "darkMode": true,
      "premiumFeatures": true
    },
    "staging": {
      "newHomepage": true,
      "darkMode": false,
      "premiumFeatures": true
    },
    "production": {
      "newHomepage": false,
      "darkMode": false,
      "premiumFeatures": true
    }
  }
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Implementation Code:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JavaScript example
const currentEnv = process.env.NODE_ENV || 'development';
const envFlags = featureFlags.environments[currentEnv] || {};

if (envFlags.newHomepage) {
  // Show the new homepage
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. User-Targeted Flags</h3>
        <p>
          For more sophisticated feature targeting, you can define rules for specific user segments or IDs.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "features": {
    "newCheckout": {
      "enabled": true,
      "enabledFor": {
        "userIds": ["123", "456", "789"],
        "userGroups": ["beta-testers", "employees"],
        "percentageRollout": 25
      }
    },
    "recommendationEngine": {
      "enabled": false,
      "enabledFor": {
        "userIds": [],
        "userGroups": ["premium-subscribers"],
        "percentageRollout": 0
      }
    }
  }
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Implementation Code:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JavaScript example
function isFeatureEnabledForUser(featureName, user) {
  const feature = featureFlags.features[featureName];
  
  // Feature is globally disabled
  if (!feature || !feature.enabled) {
    return false;
  }
  
  const { enabledFor } = feature;
  
  // Check user ID
  if (enabledFor.userIds.includes(user.id)) {
    return true;
  }
  
  // Check user groups
  if (user.groups && user.groups.some(group => enabledFor.userGroups.includes(group))) {
    return true;
  }
  
  // Check percentage rollout
  if (enabledFor.percentageRollout > 0) {
    // Generate a consistent hash based on user ID
    const hash = hashFunction(user.id);
    const normalizedHash = hash % 100;
    
    return normalizedHash < enabledFor.percentageRollout;
  }
  
  return false;
}`}
            </pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Pro Tip:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            For percentage-based rollouts, ensure you use a consistent hashing mechanism based on a user identifier. This
            guarantees the same users always get the same experience, rather than randomly changing on each page load.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Feature Flags with Configuration Values</h3>
        <p>
          Sometimes you need more than just an on/off switch - you might need configurable values for features.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "features": {
    "searchResults": {
      "enabled": true,
      "config": {
        "maxResults": 50,
        "cacheTimeInMinutes": 15,
        "sortOrder": "relevance"
      }
    },
    "recommendations": {
      "enabled": true,
      "config": {
        "algorithm": "collaborative-filtering",
        "maxItems": 5,
        "minConfidenceScore": 0.8
      }
    }
  }
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Implementation Code:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JavaScript example
function getSearchResults(query) {
  const searchFeature = featureFlags.features.searchResults;
  if (!searchFeature.enabled) {
    return getDefaultSearchResults(query);
  }
  
  const { maxResults, sortOrder } = searchFeature.config;
  return performSearch(query, maxResults, sortOrder);
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Loading JSON Feature Flags</h2>

        <h3 className="text-xl font-medium mt-6">1. Server-Side Loading</h3>
        <p>
          Loading feature flags on the server is typically more secure and prevents exposing sensitive flag configurations to clients.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example with Node.js:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Node.js example
import fs from 'fs';
import path from 'path';

function loadFeatureFlags() {
  try {
    const filePath = path.join(process.cwd(), 'config', 'feature-flags.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading feature flags:', error);
    return { features: {} }; // Default fallback
  }
}

const featureFlags = loadFeatureFlags();

// In Express.js application
app.get('/api/feature-flags', (req, res) => {
  // Only return client-safe flags, filtering out internal ones
  const clientFlags = filterFlagsForClient(featureFlags, req.user);
  res.json(clientFlags);
});`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Client-Side Loading</h3>
        <p>
          For client-side applications, you can fetch flags via an API or bundle them with your application.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example with React:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// React example with hooks
import { useState, useEffect, createContext, useContext } from 'react';

const FeatureFlagContext = createContext({});

export function FeatureFlagProvider({ children }) {
  const [flags, setFlags] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlags() {
      try {
        const response = await fetch('/api/feature-flags');
        const data = await response.json();
        setFlags(data);
      } catch (error) {
        console.error('Failed to fetch feature flags:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFlags();
  }, []);

  return (
    <FeatureFlagContext.Provider value={{ flags, loading }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlag(flagName) {
  const { flags, loading } = useContext(FeatureFlagContext);
  return {
    enabled: flags[flagName] === true,
    loading
  };
}

// Usage in a component
function NewFeature() {
  const { enabled, loading } = useFeatureFlag('newCheckout');
  
  if (loading) return <div>Loading...</div>;
  if (!enabled) return null;
  
  return <div>New checkout experience!</div>;
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Managing JSON Flag Updates</h2>

        <h3 className="text-xl font-medium mt-6">1. Static File Approach</h3>
        <p>
          The simplest approach is to store flags in a static JSON file that gets updated with deployments.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Pros and Cons:</h4>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Pros</th>
                <th className="px-4 py-2 text-left">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Simple to implement</td>
                <td className="px-4 py-2">Requires code deployment to update flags</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">No external dependencies</td>
                <td className="px-4 py-2">Not suitable for frequent flag changes</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Version controlled with code</td>
                <td className="px-4 py-2">Difficult to coordinate across team members</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Database-Driven Approach</h3>
        <p>
          For more dynamic control, store flags in a database and provide an admin interface to update them.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Implementation Approach:</h4>
          <ol className="list-decimal pl-6 mt-2 space-y-1">
            <li>Store feature flags in a database table</li>
            <li>Create an admin UI for updating flags</li>
            <li>Implement caching to avoid frequent database queries</li>
            <li>Add an API endpoint to fetch current flag states</li>
            <li>Consider adding audit logging for flag changes</li>
          </ol>
        </div>

        <h3 className="text-xl font-medium mt-6">3. External Configuration Service</h3>
        <p>
          Dedicated configuration services offer more sophisticated flag management capabilities.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Implementation Options:</h4>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Use cloud configuration services like AWS AppConfig or Azure App Configuration</li>
            <li>Implement a Redis or etcd-based configuration service</li>
            <li>Develop a centralized configuration microservice in your architecture</li>
            <li>Consider commercial feature flag platforms for larger applications</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Practices for JSON Feature Flags</h2>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Include default values and fallbacks</strong> to ensure your application works even if flag loading fails
          </li>
          <li>
            <strong>Keep feature flag logic separate</strong> from your business logic to maintain clean code
          </li>
          <li>
            <strong>Document your feature flags</strong> with descriptions and intended behavior
          </li>
          <li>
            <strong>Clean up old feature flags</strong> once they're permanently enabled or removed
          </li>
          <li>
            <strong>Implement a caching strategy</strong> to avoid loading flags too frequently
          </li>
          <li>
            <strong>Consider security implications</strong> when exposing flags to client-side code
          </li>
          <li>
            <strong>Add monitoring and analytics</strong> to track feature flag usage and impact
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Example Feature Flag Documentation:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "features": {
    "newCheckout": {
      "description": "New streamlined checkout flow with fewer steps",
      "owner": "Checkout Team",
      "addedOn": "2023-04-15",
      "status": "beta", // (active, beta, deprecated)
      "enabled": true,
      "enabledFor": {
        "userIds": ["123", "456", "789"],
        "userGroups": ["beta-testers", "employees"],
        "percentageRollout": 25
      }
    }
  }
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Challenges and Solutions</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium mb-2">Quick Reference: Challenges and Solutions</h3>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Challenge</th>
                <th className="px-4 py-2 text-left">Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">JSON parsing errors</td>
                <td className="px-4 py-2">Implement try/catch blocks and provide fallback values</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Flag configuration gets too complex</td>
                <td className="px-4 py-2">Break down into smaller, more manageable flags</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Flag dependencies (one flag depends on another)</td>
                <td className="px-4 py-2">Create explicit dependency documentation or combine related flags</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Too many conditional statements in code</td>
                <td className="px-4 py-2">Use strategy pattern or factory methods to encapsulate variations</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Feature flags becoming permanent</td>
                <td className="px-4 py-2">Implement scheduled reviews to clean up old flags</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Inconsistent user experience with percentage rollouts</td>
                <td className="px-4 py-2">Use sticky sessions or consistent hashing based on user ID</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Testing with different flag combinations</td>
                <td className="px-4 py-2">Create testing flag presets and add flag override capabilities in test environments</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Using JSON for feature flags provides a flexible, readable way to implement runtime configuration in your applications. 
          Whether you choose a simple file-based approach or integrate with sophisticated configuration management systems, 
          feature flags enable controlled rollouts, experimentation, and risk reduction.
        </p>
        <p className="mt-4">
          As your application grows, consider evolving your feature flag implementation to match your team's needs. 
          Start simple with basic boolean flags and add complexity only when necessary. Remember that the ultimate goal 
          is to increase deployment confidence and flexibility while maintaining a great user experience.
        </p>
        <p className="mt-4">
          With proper design and management, JSON feature flags can become a powerful tool in your development workflow, 
          enabling you to ship faster while maintaining control over how and when your features are released to users.
        </p>
      </div>
    </>
  );
}
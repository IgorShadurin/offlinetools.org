import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GitBranch, Workflow, Server, Cog, GitPullRequest } from "lucide-react";

/**
 * Metadata for the JSON for DevOps and CI/CD page
 */
export const metadata: Metadata = {
  title: "JSON for DevOps and CI/CD | Offline Tools",
  description: "Implementing JSON in deployment pipelines, infrastructure as code, and continuous integration",
};

/**
 * Articles related to JSON for DevOps and CI/CD
 */
const jsonFormatterArticles: ToolArticle[] = [
  {
    title: "JSON Configuration Management in DevOps Pipelines",
    description: "Best practices for managing JSON configuration files throughout your DevOps pipeline lifecycle.",
    slug: "json-configuration-management-in-devops-pipelines",
  },
  {
    title: "Validating JSON Files in CI/CD Workflows",
    description: "Implementing robust JSON validation as part of your continuous integration and deployment processes.",
    slug: "validating-json-files-in-ci-cd-workflows",
  },
  {
    title: "JSON Schema as Infrastructure-as-Code",
    description: "Using JSON Schema to define, validate, and document your infrastructure specifications.",
    slug: "json-schema-as-infrastructure-as-code",
  },
  {
    title: "Automated JSON Formatting in Git Hooks",
    description:
      "Setting up pre-commit hooks to automatically format JSON files before they're committed to your repository.",
    slug: "automated-json-formatting-in-git-hooks",
  },
  {
    title: "JSON-based Configuration for Kubernetes Deployments",
    description: "Effective strategies for managing Kubernetes configuration files in JSON format.",
    slug: "json-based-configuration-for-kubernetes-deployments",
  },
  {
    title: "Managing Environment Variables as JSON in CI/CD",
    description:
      "Techniques for organizing and using environment variables in JSON format across different deployment environments.",
    slug: "managing-environment-variables-as-json-in-ci-cd",
  },
  {
    title: "JSON Linting in Continuous Integration Pipelines",
    description: "Implementing automated JSON linting to catch formatting errors early in your development cycle.",
    slug: "json-linting-in-continuous-integration-pipelines",
  },
  {
    title: "Using JSON for Feature Flags and Toggles",
    description: "How to implement feature flag systems using JSON configuration for gradual feature rollouts.",
    slug: "using-json-for-feature-flags-and-toggles",
  },
  {
    title: "Version Control Best Practices for JSON Configuration Files",
    description: "Strategies for effectively managing JSON configuration files in version control systems.",
    slug: "version-control-best-practices-for-json-configuration-files",
  },
  {
    title: "JSON Templates for Infrastructure Provisioning",
    description: "Creating reusable JSON templates for consistent infrastructure provisioning across environments.",
    slug: "json-templates-for-infrastructure-provisioning",
  },
  {
    title: "Dynamic JSON Configuration Generation in Build Pipelines",
    description: "Techniques for generating environment-specific JSON configurations during your build process.",
    slug: "dynamic-json-configuration-generation-in-build-pipelines",
  },
  {
    title: "Docker Container Configuration with JSON",
    description: "Managing Docker container settings effectively using JSON configuration files.",
    slug: "docker-container-configuration-with-json",
  },
  {
    title: "Multi-Environment JSON Configuration Management",
    description:
      "Strategies for managing JSON configurations across development, staging, and production environments.",
    slug: "multi-environment-json-configuration-management",
  },
  {
    title: "JSON Validation Gates in Deployment Pipelines",
    description: "Implementing validation checkpoints for JSON files at critical stages in your deployment pipeline.",
    slug: "json-validation-gates-in-deployment-pipelines",
  },
  {
    title: "Storing Secrets in JSON: Secure Practices",
    description: "Best practices for securely handling sensitive information in JSON configuration files.",
    slug: "storing-secrets-in-json-secure-practices",
  },
  {
    title: "Automating JSON Schema Updates in CI/CD",
    description: "Strategies for keeping JSON schemas up-to-date automatically through your CI/CD pipeline.",
    slug: "automating-json-schema-updates-in-ci-cd",
  },
  {
    title: "JSON Patch Operations for Configuration Updates",
    description: "Using JSON Patch to apply incremental updates to configuration files in production systems.",
    slug: "json-patch-operations-for-configuration-updates",
  },
  {
    title: "Merging JSON Configurations Across Environments",
    description:
      "Techniques for effectively merging JSON configurations when promoting from one environment to another.",
    slug: "merging-json-configurations-across-environments",
  },
  {
    title: "JSON-based Monitoring and Alerting Configurations",
    description:
      "Setting up monitoring systems using JSON to define alert thresholds, notification channels, and escalation paths.",
    slug: "json-based-monitoring-and-alerting-configurations",
  },
  {
    title: "AWS CloudFormation and JSON Template Management",
    description: "Best practices for creating and managing AWS CloudFormation templates in JSON format.",
    slug: "aws-cloudformation-and-json-template-management",
  },
  {
    title: "Terraform JSON Configuration File Best Practices",
    description: "Guidelines for working with Terraform configurations in JSON rather than HCL format.",
    slug: "terraform-json-configuration-file-best-practices",
  },
  {
    title: "Ansible Playbook JSON Configuration Strategies",
    description: "Techniques for using JSON effectively with Ansible for configuration management.",
    slug: "ansible-playbook-json-configuration-strategies",
  },
  {
    title: "JSON Configuration Drift Detection in Infrastructure",
    description:
      "Implementing systems to detect and alert on unexpected changes to JSON configuration files in production.",
    slug: "json-configuration-drift-detection-in-infrastructure",
  },
  {
    title: "Implementing JSON-based Service Discovery",
    description: "Using JSON for service discovery in microservices architectures.",
    slug: "implementing-json-based-service-discovery",
  },
  {
    title: "Testing JSON APIs in Deployment Pipelines",
    description: "Strategies for automated testing of JSON APIs as part of your CI/CD workflow.",
    slug: "testing-json-apis-in-deployment-pipelines",
  },
  {
    title: "Schema Versioning for JSON Configuration Files",
    description: "Managing changes to JSON schemas over time with proper versioning strategies.",
    slug: "schema-versioning-for-json-configuration-files",
  },
  {
    title: "Change Auditing for JSON Configuration in DevOps",
    description: "Implementing audit trails for changes to JSON configuration files in your DevOps workflow.",
    slug: "change-auditing-for-json-configuration-in-devops",
  },
  {
    title: "JSON-based Rollback Strategies for Failed Deployments",
    description: "Using versioned JSON configurations to enable rapid rollbacks when deployments fail.",
    slug: "json-based-rollback-strategies-for-failed-deployments",
  },
  {
    title: "Azure Resource Templates: JSON Best Practices",
    description: "Optimizing Azure Resource Manager templates in JSON format for maintainability and reliability.",
    slug: "azure-resource-templates-json-best-practices",
  },
  {
    title: "Continuous Validation of JSON Configuration Files",
    description: "Setting up systems to continuously validate JSON configuration files against their schemas.",
    slug: "continuous-validation-of-json-configuration-files",
  },
  {
    title: "JSON Property Inheritance in Multi-Stage Deployments",
    description: "Managing JSON property inheritance patterns across different deployment stages.",
    slug: "json-property-inheritance-in-multi-stage-deployments",
  },
  {
    title: "Immutable JSON Configuration in Container Environments",
    description: "Implementing immutable JSON configurations for containerized applications.",
    slug: "immutable-json-configuration-in-container-environments",
  },
  {
    title: "Blue-Green Deployment with JSON Configuration Switching",
    description: "Using JSON configuration files to facilitate blue-green deployment strategies.",
    slug: "blue-green-deployment-with-json-configuration-switching",
  },
  {
    title: "Jenkins Pipeline JSON Configuration Techniques",
    description: "Best practices for configuring Jenkins pipelines using JSON format.",
    slug: "jenkins-pipeline-json-configuration-techniques",
  },
  {
    title: "Managing Microservice Configuration with JSON",
    description: "Strategies for handling configuration in microservices architectures using JSON.",
    slug: "managing-microservice-configuration-with-json",
  },
  {
    title: "GitOps Workflows for JSON Configuration Files",
    description: "Implementing GitOps principles for managing JSON configuration files.",
    slug: "gitops-workflows-for-json-configuration-files",
  },
  {
    title: "Canary Deployments with Progressive JSON Updates",
    description: "Using gradual JSON configuration updates to implement canary deployment strategies.",
    slug: "canary-deployments-with-progressive-json-updates",
  },
  {
    title: "JSON Configuration in Serverless Architectures",
    description: "Best practices for managing configuration in serverless applications using JSON.",
    slug: "json-configuration-in-serverless-architectures",
  },
  {
    title: "Configuration-as-Code with JSON: Best Practices",
    description: "Guidelines for implementing Configuration-as-Code principles using JSON formats.",
    slug: "configuration-as-code-with-json-best-practices",
  },
  {
    title: "JSON-based A/B Testing Configuration",
    description: "Setting up A/B testing frameworks using JSON configuration files.",
    slug: "json-based-a-b-testing-configuration",
  },
  {
    title: "Disaster Recovery Planning for JSON Configuration Stores",
    description: "Strategies for backing up and recovering JSON configuration datastores in disaster scenarios.",
    slug: "disaster-recovery-planning-for-json-configuration-stores",
  },
  {
    title: "JSON Schema Evolution in Long-Running Systems",
    description: "Managing the evolution of JSON schemas in systems that must maintain backward compatibility.",
    slug: "json-schema-evolution-in-long-running-systems",
  },
  {
    title: "Implementing JSON-based Feature Flags for Deployments",
    description: "Using JSON to configure feature flags that control which features are active in deployments.",
    slug: "implementing-json-based-feature-flags-for-deployments",
  },
  {
    title: "Monitoring JSON Configuration Changes in Production",
    description:
      "Setting up monitoring systems to track changes to JSON configuration files in production environments.",
    slug: "monitoring-json-configuration-changes-in-production",
  },
  {
    title: "Implementing JSON Diff Tools in Deployment Workflows",
    description: "Using JSON differencing tools to identify configuration changes between deployment versions.",
    slug: "implementing-json-diff-tools-in-deployment-workflows",
  },
  {
    title: "Self-Documenting JSON Configuration Best Practices",
    description: "Creating JSON configuration files that are inherently readable and self-documenting.",
    slug: "self-documenting-json-configuration-best-practices",
  },
  {
    title: "JSON Configuration Migration Strategies",
    description: "Planning and executing migrations from one JSON configuration structure to another.",
    slug: "json-configuration-migration-strategies",
  },
  {
    title: "Zero-Downtime Updates with JSON Configuration Management",
    description: "Implementing configuration updates that don't require service downtime using JSON approaches.",
    slug: "zero-downtime-updates-with-json-configuration-management",
  },
  {
    title: "JSON-based Service Mesh Configuration",
    description: "Best practices for configuring service mesh technologies using JSON format.",
    slug: "json-based-service-mesh-configuration",
  },
  {
    title: "Security Scanning of JSON Configuration in CI/CD Pipelines",
    description: "Implementing security scans for JSON configuration files to detect vulnerabilities early.",
    slug: "security-scanning-of-json-configuration-in-ci-cd-pipelines",
  },
];

/**
 * JSON for DevOps and CI/CD page component
 */
export default function JsonFormatterDevOpsPage() {
  return (
    <Container className="py-10">
      <div className="mb-10">
        <div className="mb-4 flex items-center">
          <div className="flex-1">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li>
                  <Link href="/tools" className="hover:text-foreground">
                    Tools
                  </Link>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li>
                  <Link href="/tools/json-formatter" className="hover:text-foreground">
                    JSON Formatter
                  </Link>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li aria-current="page">JSON for DevOps and CI/CD</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">JSON for DevOps and CI/CD</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <GitBranch className="text-slate-500" size={24} />
              JSON in Automation Pipelines
            </CardTitle>
            <CardDescription>Leveraging JSON for modern DevOps workflows and CI/CD systems</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-slate-600 dark:text-slate-400 shrink-0">
                    <Workflow size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Pipeline Configuration</h3>
                    <p className="text-sm text-muted-foreground">
                      Using JSON to define and configure CI/CD pipelines in systems like GitHub Actions, GitLab CI,
                      Jenkins, and other automation platforms.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-slate-600 dark:text-slate-400 shrink-0">
                    <Server size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Infrastructure as Code</h3>
                    <p className="text-sm text-muted-foreground">
                      JSON's role in infrastructure definition with tools like Terraform, CloudFormation, and
                      Kubernetes, including validation and formatting challenges.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-gray-600 dark:text-gray-500 shrink-0">
                    <Cog size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Automation Scripts</h3>
                    <p className="text-sm text-muted-foreground">
                      Creating and maintaining JSON-processing scripts for build, test, and deployment automation
                      pipelines with appropriate error handling.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-gray-600 dark:text-gray-500 shrink-0">
                    <GitPullRequest size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Pull Request Validation</h3>
                    <p className="text-sm text-muted-foreground">
                      Implementing JSON linting and validation as part of CI/CD checks to ensure configuration files and
                      data assets maintain proper format and structure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <GitBranch size={16} className="text-slate-500" />
                <span>DevOps Best Practice:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                In CI/CD environments, use JSON Schema validation as a pre-commit or pre-build step to catch
                configuration errors early, preventing failed deployments and reducing troubleshooting time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
}

import { Container } from "@/components/ui/container";
import { ToolArticle, ToolArticlesList } from "@/components/tool-articles-list";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GitBranch, Workflow, Container as ContainerIcon, TerminalSquare, Rocket, HardDrive } from "lucide-react";

/**
 * Metadata for the Base64 Codec DevOps and CI/CD page
 */
export const metadata: Metadata = {
  title: "Base64 Codec DevOps and CI/CD | Offline Tools",
  description: "Implementing Base64 encoding in deployment pipelines, infrastructure, and automation",
};

/**
 * Articles related to Base64 Codec DevOps and CI/CD
 */
const base64CodecArticles: ToolArticle[] = [
  {
    title: "Base64 Encoding in CI/CD Pipeline Variables",
    description:
      "Strategies for safely managing binary data and sensitive information in CI/CD pipelines using Base64.",
    slug: "base64-encoding-in-cicd-pipeline-variables",
  },
  {
    title: "Automated Base64 Encoding in Build Processes",
    description: "Implementing automated Base64 encoding steps in software build and packaging workflows.",
    slug: "automated-base64-encoding-in-build-processes",
  },
  {
    title: "Base64 and Infrastructure as Code: Best Practices",
    description:
      "Effective approaches for handling Base64 encoded data in Terraform, CloudFormation, and other IaC tools.",
    slug: "base64-and-infrastructure-as-code-best-practices",
  },
  {
    title: "Base64 in Kubernetes Secret Management",
    description: "Working with Base64 encoded secrets in Kubernetes environments and automation workflows.",
    slug: "base64-in-kubernetes-secret-management",
  },
  {
    title: "Continuous Testing of Base64 Data Integrity",
    description: "Implementing automated checks to validate Base64 encoded data throughout the deployment lifecycle.",
    slug: "continuous-testing-of-base64-data-integrity",
  },
  {
    title: "Docker Environment Variables and Base64 Encoding",
    description: "Managing Docker container configuration with Base64 encoded values in environment variables.",
    slug: "docker-environment-variables-and-base64-encoding",
  },
  {
    title: "Base64 Encoding in Pipeline Automation Scripts",
    description:
      "Techniques for handling Base64 encoding and decoding in Bash, PowerShell, and other automation scripts.",
    slug: "base64-encoding-in-pipeline-automation-scripts",
  },
  {
    title: "Embedding Binary Assets in CI/CD Artifacts with Base64",
    description: "Using Base64 encoding to include binary files in build artifacts and deployment packages.",
    slug: "embedding-binary-assets-in-cicd-artifacts-with-base64",
  },
  {
    title: "Base64 File Transformations in Build Pipelines",
    description: "Automating the conversion between binary files and Base64 representations during CI/CD processes.",
    slug: "base64-file-transformations-in-build-pipelines",
  },
  {
    title: "Base64 Encoding in GitOps Workflows",
    description: "Incorporating Base64 encoding into Git-centric operational and deployment workflows.",
    slug: "base64-encoding-in-gitops-workflows",
  },
  {
    title: "Base64 Processing in Serverless Deployment Frameworks",
    description: "Working with Base64 encoded data in serverless application deployment and configuration.",
    slug: "base64-processing-in-serverless-deployment-frameworks",
  },
  {
    title: "Automating Base64 Certificate Management in DevOps",
    description: "Handling SSL/TLS certificates as Base64 encoded entities in automated deployment processes.",
    slug: "automating-base64-certificate-management-in-devops",
  },
  {
    title: "Base64 in Cross-Environment Configuration Management",
    description:
      "Using Base64 encoding to maintain consistent configuration data across development, staging, and production.",
    slug: "base64-in-cross-environment-configuration-management",
  },
  {
    title: "Base64 JSON Configuration in Deployment Pipelines",
    description: "Strategies for handling Base64 encoded JSON data structures in automated deployment processes.",
    slug: "base64-json-configuration-in-deployment-pipelines",
  },
  {
    title: "Handling Base64 Encoded Files in Version Control",
    description: "Best practices for managing and versioning Base64 encoded assets in source code repositories.",
    slug: "handling-base64-encoded-files-in-version-control",
  },
  {
    title: "Base64 Encoding in Continuous Integration Test Data",
    description: "Managing test fixtures and sample data as Base64 encoded resources in CI testing processes.",
    slug: "base64-encoding-in-continuous-integration-test-data",
  },
  {
    title: "Base64 in Cloud Platform Deployment Templates",
    description: "Working with Base64 encoded content in AWS, Azure, and Google Cloud deployment configurations.",
    slug: "base64-in-cloud-platform-deployment-templates",
  },
  {
    title: "Base64 Encoding for Artifact Repository Storage",
    description:
      "Techniques for storing and retrieving Base64 encoded assets in artifact repositories like Nexus and Artifactory.",
    slug: "base64-encoding-for-artifact-repository-storage",
  },
  {
    title: "Base64 in Microservice Configuration Management",
    description: "Strategies for handling Base64 encoded configuration data in distributed microservice architectures.",
    slug: "base64-in-microservice-configuration-management",
  },
  {
    title: "Automated Base64 Validation in CI/CD Pipelines",
    description: "Implementing quality checks for Base64 encoded data as part of continuous integration processes.",
    slug: "automated-base64-validation-in-cicd-pipelines",
  },
];

/**
 * Base64 Codec DevOps and CI/CD page component
 */
export default function Base64CodecDevOpsPage() {
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
                  <Link href="/tools/base64-codec" className="hover:text-foreground">
                    Base64 Codec
                  </Link>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li aria-current="page">DevOps and CI/CD</li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Base64 Codec DevOps and CI/CD</h1>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-2">
          <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <GitBranch className="text-violet-600" size={24} />
              Base64 in Automation Workflows
            </CardTitle>
            <CardDescription>
              Integrating Base64 encoding into deployment pipelines and infrastructure automation
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-violet-600 dark:text-violet-400 shrink-0">
                    <Workflow size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Pipeline Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      Techniques for incorporating Base64 encoding and decoding steps within CI/CD workflows and build
                      processes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-violet-600 dark:text-violet-400 shrink-0">
                    <ContainerIcon size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Container Orchestration</h3>
                    <p className="text-sm text-muted-foreground">
                      Managing Base64 encoded secrets, configurations, and resources in containerized environments and
                      Kubernetes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-purple-600 dark:text-purple-400 shrink-0">
                    <TerminalSquare size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Automation Scripts</h3>
                    <p className="text-sm text-muted-foreground">
                      Implementing Base64 encoding operations in shell scripts, DevOps tools, and infrastructure as
                      code.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-purple-600 dark:text-purple-400 shrink-0">
                    <Rocket size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Deployment Strategies</h3>
                    <p className="text-sm text-muted-foreground">
                      Leveraging Base64 for binary data handling in deployment artifacts, templates, and
                      cross-environment configurations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <HardDrive size={16} className="text-violet-600" />
                <span>DevOps Insight:</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                In modern CI/CD pipelines, Base64 encoding serves as a critical bridge between text-based configuration
                systems and binary assets. While Kubernetes secrets are automatically Base64 encoded, many DevOps
                engineers overlook that this encoding provides zero security benefits without additional encryption.
                Best practice involves combining Base64 with dedicated secret management systems like HashiCorp Vault or
                cloud provider key management services, which handle encryption/decryption while maintaining the Base64
                format's pipeline compatibility.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="Base64 Codec" toolSlug="base64-codec" articles={base64CodecArticles} />
    </Container>
  );
}

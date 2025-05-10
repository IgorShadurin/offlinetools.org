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
  description:
    "Implementing JSON in deployment pipelines, infrastructure as code, and continuous integration"
};

/**
 * Articles related to JSON for DevOps and CI/CD
 */
const jsonFormatterArticles: ToolArticle[] = [];

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
                      Using JSON to define and configure CI/CD pipelines in systems like GitHub Actions, GitLab CI, Jenkins, and other automation platforms.
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
                      JSON's role in infrastructure definition with tools like Terraform, CloudFormation, and Kubernetes, including validation and formatting challenges.
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
                      Creating and maintaining JSON-processing scripts for build, test, and deployment automation pipelines with appropriate error handling.
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
                      Implementing JSON linting and validation as part of CI/CD checks to ensure configuration files and data assets maintain proper format and structure.
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
                In CI/CD environments, use JSON Schema validation as a pre-commit or pre-build step to catch configuration errors early, preventing failed deployments and reducing troubleshooting time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolArticlesList toolName="JSON Formatter" toolSlug="json-formatter" articles={jsonFormatterArticles} />
    </Container>
  );
} 
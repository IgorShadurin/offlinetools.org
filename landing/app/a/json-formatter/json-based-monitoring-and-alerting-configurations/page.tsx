import type { Metadata } from "next";
import { AlertTriangle, Bell, Check, Code, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON-based Monitoring and Alerting Configurations Guide",
  description:
    "Practical guide to JSON monitoring and alerting configs, including thresholds, missing-data behavior, routing, validation, and current CloudWatch and Google Cloud notes.",
};

const productionReadyAlert = String.raw`{
  "version": 1,
  "service": "checkout-api",
  "environment": "production",
  "alerts": [
    {
      "id": "checkout-high-error-rate",
      "enabled": true,
      "summary": "Checkout API error rate is above 2% for 10 minutes",
      "signal": {
        "kind": "metric-ratio",
        "numerator": "http_requests_total{service=\"checkout-api\",status=~\"5..\"}",
        "denominator": "http_requests_total{service=\"checkout-api\"}",
        "rollup": "rate_5m"
      },
      "condition": {
        "operator": ">",
        "threshold": 0.02
      },
      "evaluation": {
        "for": "10m",
        "every": "1m",
        "datapointsToAlarm": 8,
        "evaluationPeriods": 10,
        "missingData": "notBreaching"
      },
      "labels": {
        "severity": "critical",
        "team": "payments",
        "service": "checkout-api"
      },
      "documentation": {
        "runbook": "https://example.internal/runbooks/checkout-errors",
        "dashboard": "https://grafana.example.internal/d/checkout"
      },
      "notifications": {
        "channels": ["pagerduty-primary", "slack-payments-alerts"],
        "sendResolved": true,
        "dedupeKey": "checkout-api:error-rate"
      }
    }
  ]
}`;

const cloudWatchAlarmExample = String.raw`{
  "AlarmName": "checkout-api-high-cpu",
  "AlarmDescription": "CPU > 75% for 3 of the last 5 minutes",
  "Namespace": "AWS/EC2",
  "MetricName": "CPUUtilization",
  "Dimensions": [
    {
      "Name": "InstanceId",
      "Value": "i-1234567890abcdef0"
    }
  ],
  "ComparisonOperator": "GreaterThanThreshold",
  "Statistic": "Average",
  "Threshold": 75,
  "Period": 60,
  "EvaluationPeriods": 5,
  "DatapointsToAlarm": 3,
  "TreatMissingData": "notBreaching",
  "AlarmActions": [
    "arn:aws:sns:us-east-1:123456789012:ops-critical"
  ]
}`;

export default function JsonMonitoringAlertingArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center gap-3 text-3xl font-bold">
        <Settings className="h-8 w-8 text-blue-500" /> JSON-based Monitoring and Alerting Configurations
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          JSON-based monitoring and alerting configurations are most useful when alerts are created by code, pushed
          through APIs, or exported from a platform into Git. That is the real-world use case searchers usually care
          about: a configuration format that is easy to validate, diff, generate, and deploy safely.
        </p>
        <p>
          The weak version of an alert config is just a metric plus a threshold. The useful version includes evaluation
          windows, missing-data behavior, labels, ownership, routing, and operator-facing context such as runbooks and
          dashboards. If those fields are missing, the JSON may be valid while the alert is still noisy or hard to act
          on.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Check className="h-6 w-6 text-green-500" /> When JSON Is the Right Tool
        </h2>
        <p>
          JSON is a strong choice for monitoring and alerting when your workflow is automation-first rather than
          hand-edited forever files.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>API-native workflows:</strong> Cloud monitoring systems commonly expose alert creation and updates
            through JSON-based APIs and exported policy objects.
          </li>
          <li>
            <strong>CI/CD safety:</strong> JSON is straightforward to lint, format, schema-check, and review in pull
            requests.
          </li>
          <li>
            <strong>Generated configuration:</strong> It works well when alerts are assembled from templates, service
            catalogs, or deployment metadata.
          </li>
          <li>
            <strong>Round-tripping:</strong> Exporting a working alert, formatting it, and reusing it as a template is
            often faster than writing a vendor payload from scratch.
          </li>
          <li>
            <strong>Clear limits:</strong> JSON has no comments and becomes unpleasant when humans manually maintain
            very large rule sets, so keep it as the validated source or generated output, not always the authoring
            format.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Code className="h-6 w-6 text-purple-500" /> What a Production-Ready Alert Object Needs
        </h2>
        <p>
          Exact field names vary by product, but mature JSON alert definitions almost always need the same decisions to
          be encoded explicitly.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Signal definition:</strong> The metric, log query, ratio, expression, or health check being
            evaluated.
          </li>
          <li>
            <strong>Condition:</strong> The operator and threshold, plus whether the signal is static, dynamic, or
            anomaly-based.
          </li>
          <li>
            <strong>Evaluation window:</strong> How long the condition must hold and how many datapoints must breach
            before a notification fires.
          </li>
          <li>
            <strong>Missing-data policy:</strong> Whether gaps should be treated as breaching, non-breaching, ignored,
            or unknown.
          </li>
          <li>
            <strong>Context:</strong> Severity, owning team, service name, environment, runbook URL, and dashboard
            links.
          </li>
          <li>
            <strong>Routing:</strong> Notification channels, deduplication keys, resolved notifications, and escalation
            targets.
          </li>
          <li>
            <strong>Lifecycle:</strong> Enabled state, versioning, and a place to represent maintenance windows or
            generated provenance if your workflow needs it.
          </li>
        </ul>

        <p>
          A good schema leaves room for more than one metric name. Modern alerting platforms increasingly support
          ratios, query expressions, metric math, anomaly models, and query-language-based conditions.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Example: a vendor-neutral JSON alert definition</h3>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            <code>{productionReadyAlert}</code>
          </pre>
        </div>

        <p>
          This structure is intentionally generic. If you later need to translate it into CloudWatch, Google Cloud
          Monitoring, Grafana, or an internal rules engine, you already have the fields that drive alert quality
          instead of only alert syntax.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Bell className="h-6 w-6 text-orange-500" /> Current Platform Notes That Matter
        </h2>
        <p>
          Current vendor docs reinforce the same practical pattern: JSON is often the API and export layer, even when a
          product also supports YAML or a UI editor.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Google Cloud Monitoring:</strong> current documentation shows that alerting policies can be
            represented in JSON or YAML, the REST API consumes JSON, and the console can expose an alert policy as JSON
            for reuse. That makes exported JSON a reliable starting template for repeatable policies.
          </li>
          <li>
            <strong>Amazon CloudWatch:</strong> current <code>PutMetricAlarm</code> documentation supports alarms based
            on a direct metric, metric math, anomaly detection, or a Metrics Insights query. Your JSON model should
            therefore support expressions, not only a single metric field.
          </li>
          <li>
            <strong>M-of-N evaluation is not optional detail:</strong> in CloudWatch-style payloads, fields such as{" "}
            <code>EvaluationPeriods</code>, <code>DatapointsToAlarm</code>, and <code>TreatMissingData</code> have a
            major effect on alert noise and recovery behavior.
          </li>
          <li>
            <strong>Treat updates as full-state deployments:</strong> current CloudWatch docs note that updating an
            alarm through <code>PutMetricAlarm</code> completely overwrites the previous configuration, so partial JSON
            patches are risky unless your deployment layer reconstructs the full desired object.
          </li>
        </ul>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Example: CloudWatch alarm JSON with evaluation controls</h3>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            <code>{cloudWatchAlarmExample}</code>
          </pre>
        </div>

        <p>
          Even if you do not deploy to CloudWatch, this example shows the kind of fields worth preserving in your own
          schema: threshold semantics, M-of-N evaluation, explicit missing-data behavior, and notification actions.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <AlertTriangle className="h-6 w-6 text-yellow-500" /> Validation and Failure Modes
        </h2>
        <p>
          The fastest way to make JSON alert configurations trustworthy is to validate both the syntax and the
          operational meaning before deployment.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Validate shape:</strong> require stable IDs, allowed severities, known notification types, valid
            URLs, and duration fields in a consistent format.
          </li>
          <li>
            <strong>Reject silent mistakes:</strong> fail CI on unknown keys, duplicate IDs, empty channel lists, or
            alerts with no owner and no runbook.
          </li>
          <li>
            <strong>Keep secrets out of JSON:</strong> reference webhook names or secret IDs rather than embedding
            tokens and keys directly in versioned files.
          </li>
          <li>
            <strong>Test alert behavior, not only parsing:</strong> replay historical incidents or sample payloads so
            you can verify that thresholds, windows, and missing-data settings behave as expected.
          </li>
          <li>
            <strong>Format before deploy:</strong> consistent formatting is not cosmetic here; it makes drift, review,
            and broken commas obvious before the alert reaches production.
          </li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">Common mistakes</h3>
        <ul className="list-disc space-y-2 pl-6">
          <li>Alerting on a raw spike with no duration, which creates flapping and pages on noise.</li>
          <li>Leaving missing-data behavior implicit, which makes gaps look like incidents or hides real failures.</li>
          <li>Skipping ownership metadata, so responders receive an alert with no team, dashboard, or runbook.</li>
          <li>Designing one flat schema that cannot represent queries, ratios, or composite conditions later.</li>
          <li>Assuming updates are partial merges when the target API actually replaces the full alarm definition.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Conclusion</h2>
        <p>
          JSON is most effective for monitoring and alerting when you treat it as a deployable contract: explicit
          signal logic, explicit evaluation behavior, explicit routing, and explicit validation. If you structure the
          data that way, the same JSON can survive formatting, code review, API translation, and repeated deployments
          without losing the information operators need during an incident.
        </p>
      </div>
    </>
  );
}

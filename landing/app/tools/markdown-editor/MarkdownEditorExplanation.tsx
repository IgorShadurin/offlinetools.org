import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Ensure this path is correct

export function MarkdownEditorExplanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About the Markdown Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <section>
          <h3 className="text-lg font-semibold mb-2 text-foreground">Tool Capabilities</h3>
          <p className="text-muted-foreground mb-2">
            A versatile online Markdown editor that allows you to write, preview, and manage Markdown content seamlessly. Supports real-time HTML preview, file loading, and saving.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4">
            <li>Instant real-time preview of Markdown as HTML.</li>
            <li>Load <code className="font-mono text-xs bg-muted p-0.5 rounded-sm">.md</code> or <code className="font-mono text-xs bg-muted p-0.5 rounded-sm">.markdown</code> files from your local system.</li>
            <li>Save your work as a <code className="font-mono text-xs bg-muted p-0.5 rounded-sm">.md</code> file directly to your computer.</li>
            <li>Syntax highlighting in the editor for improved readability (browser dependent).</li>
            <li>Supports standard Markdown syntax (CommonMark compatible via <code className="font-mono text-xs bg-muted p-0.5 rounded-sm">marked</code> library).</li>
            <li>Clean and intuitive interface for focused writing.</li>
            <li>Copy generated HTML to clipboard.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2 text-foreground">Common Use Cases</h3>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 pl-4">
            <li>
              <strong>Quick Note-Taking:</strong>
              <p className="pl-2 inline">Rapidly jot down notes, ideas, or to-do lists using simple Markdown formatting.</p>
            </li>
            <li>
              <strong>README File Drafting:</strong>
              <p className="pl-2 inline">Draft and preview <code className="font-mono text-xs bg-muted p-0.5 rounded-sm">README.md</code> files for your software projects.</p>
            </li>
            <li>
              <strong>Content Creation:</strong>
              <p className="pl-2 inline">Write articles, blog posts, or website content that can be easily converted to HTML.</p>
            </li>
            <li>
              <strong>Documentation:</strong>
              <p className="pl-2 inline">Prepare simple documentation pages or snippets.</p>
            </li>
            <li>
              <strong>Learning Markdown:</strong>
              <p className="pl-2 inline">An interactive way to learn and experiment with Markdown syntax.</p>
            </li>
            <li>
              <strong>Preparing Comments:</strong>
              <p className="pl-2 inline">Compose formatted comments for platforms like GitHub, Reddit, or Stack Overflow.</p>
            </li>
          </ol>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2 text-foreground">Technical Details</h3>
          <div className="text-muted-foreground space-y-2">
            <p>
              This Markdown Editor utilizes the powerful <code className="font-mono text-xs bg-muted p-0.5 rounded-sm">marked</code> library (version used in the <code className="font-mono text-xs bg-muted p-0.5 rounded-sm">shared</code> package) for fast and accurate Markdown-to-HTML conversion. The <code className="font-mono text-xs bg-muted p-0.5 rounded-sm">marked</code> library is compliant with the CommonMark specification.
            </p>
            <p>
              File operations (loading and saving) are handled entirely client-side using modern browser APIs like <code className="font-mono text-xs bg-muted p-0.5 rounded-sm">FileReader</code> and Blob construction, ensuring your data stays private and no server interaction is needed for these core features.
            </p>
            <p>
              The real-time preview is achieved by re-rendering the HTML output whenever the Markdown input changes.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2 text-foreground">Tips for Use</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4">
            <li>Use standard Markdown syntax. If you&apos;re new to Markdown, search for a &quot;Markdown cheat sheet&quot;.</li>
            <li>For loading files, ensure they are plain text files with <code className="font-mono text-xs bg-muted p-0.5 rounded-sm">.md</code> or <code className="font-mono text-xs bg-muted p-0.5 rounded-sm">.markdown</code> extensions.</li>
            <li>When saving, your browser will typically download the file to your default &quot;Downloads&quot; folder.</li>
            <li>The preview pane will scroll independently, allowing you to keep an eye on different parts of your input and output.</li>
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}

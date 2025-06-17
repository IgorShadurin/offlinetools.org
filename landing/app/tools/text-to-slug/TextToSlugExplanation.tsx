import React from "react";

export default function TextToSlugExplanation() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">About Text to Slug Converter</h2>
        <p className="text-lg text-muted-foreground">
          Transform any text into clean, URL-friendly slugs perfect for web development, SEO, and content management.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">What is a Slug?</h3>
          <p className="text-muted-foreground">
            A slug is a URL-friendly version of text that contains only lowercase letters, numbers, and separators
            (dashes or underscores). Slugs are commonly used in web development for creating clean, readable URLs and
            file names.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-mono">
              <span className="text-muted-foreground">Input:</span> "How to Build a Modern Web App"
              <br />
              <span className="text-muted-foreground">Output:</span> "how-to-build-a-modern-web-app"
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Common Use Cases</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>
                <strong>SEO-friendly URLs:</strong> Create clean URLs for blog posts and pages
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>
                <strong>File naming:</strong> Generate safe file names from titles
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>
                <strong>Database keys:</strong> Create unique identifiers from text
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>
                <strong>API endpoints:</strong> Generate consistent endpoint names
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Customization Options</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium">Separator Types</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Dash (-):</strong> Most common for URLs and SEO (recommended)
              </p>
              <p>
                <strong>Underscore (_):</strong> Often used for file names and programming
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Text Processing</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Lowercase:</strong> Converts all text to lowercase
              </p>
              <p>
                <strong>Remove Numbers:</strong> Strips all numeric characters
              </p>
              <p>
                <strong>Remove Stop Words:</strong> Removes common words like "the", "and", "of"
              </p>
              <p>
                <strong>Strict Mode:</strong> Only allows alphanumeric characters and separators
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Character Handling</h3>
        <p className="text-muted-foreground">
          Our slug converter automatically handles Unicode characters and special symbols by transliterating them to
          ASCII equivalents:
        </p>
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <p className="text-sm font-mono">
            <span className="text-muted-foreground">Accented characters:</span> "Café" → "cafe"
          </p>
          <p className="text-sm font-mono">
            <span className="text-muted-foreground">Special symbols:</span> "User's Guide & Tips" → "users-guide-tips"
          </p>
          <p className="text-sm font-mono">
            <span className="text-muted-foreground">Currency symbols:</span> "Price: $100 €50" → "price-usd100-eur50"
          </p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg">
        <h4 className="font-semibold mb-2">💡 Pro Tip</h4>
        <p className="text-sm text-muted-foreground">
          For SEO purposes, use dashes as separators and enable lowercase conversion. Consider removing stop words for
          shorter, more focused slugs, but keep them if they're important for readability.
        </p>
      </div>
    </div>
  );
}

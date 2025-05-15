import type { Metadata } from "next";
import {
  Accessibility,
  Palette,
  EyeOff,
  Contrast,
  Lightbulb,
  CheckCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Accessible Themes for JSON Syntax Highlighting | Your Site Name",
  description:
    "Learn how to choose or create accessible themes for JSON syntax highlighting, focusing on contrast, color blindness, and readability.",
};

export default function AccessibleJsonThemesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Accessibility className="w-8 h-8" /> Accessible Themes for JSON Syntax Highlighting
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is ubiquitous in web development and data exchange. Reading complex or large JSON structures can be challenging. Syntax highlighting, which assigns different colors and styles to elements like keys, strings, numbers, booleans, and punctuation, significantly improves readability. However, for syntax highlighting to be truly effective and inclusive, it must also be accessible. This means considering users with various visual impairments, including color blindness, low vision, and cognitive differences.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <EyeOff className="w-6 h-6" /> Common Accessibility Issues
        </h2>
        <p>
          Poorly designed themes can introduce accessibility barriers. Some common problems include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Low Contrast:</strong> Insufficient contrast between highlighted elements and the background, or between different highlighted elements themselves, makes the code hard to read, especially for users with low vision or in varying lighting conditions.
          </li>
          <li>
            <strong>Color Blindness:</strong> Using color alone to distinguish different token types (like keys and strings) can make the highlighting meaningless or confusing for users with color vision deficiencies. Certain color combinations (like red/green or blue/yellow) are particularly problematic.
          </li>
          <li>
            <strong>Lack of Focus Indicators:</strong> While not strictly syntax highlighting, the surrounding UI for code editors/viewers must also have clear focus indicators for keyboard navigation, important for users who cannot use a mouse.
          </li>
          <li>
            <strong>Excessive Visual Noise:</strong> Overly bright, saturated colors or too many different colors can be distracting and overwhelming for some users, potentially impacting readability and focus.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Contrast className="w-6 h-6" /> Principles of Accessible Highlighting
        </h2>
        <p>
          Accessible themes prioritize clarity and usability for a wider range of users. Key principles include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>High Contrast:</strong> Adhering to WCAG (Web Content Accessibility Guidelines) contrast ratios is crucial. WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. While code highlighting isn't strictly "text" in the WCAG sense, applying similar principles ensures readability. Contrast between background and foreground, and between adjacent tokens, should be high.
          </li>
          <li>
            <strong>Color-Blind Friendly Palettes:</strong> Select color palettes that remain distinguishable for common types of color blindness (Protanopia, Deuteranopia, Tritanopia). Avoid relying solely on hue; use variations in brightness and saturation, and potentially underline or bold specific token types if necessary.
          </li>
          <li>
            <strong>Meaningful Color Choices:</strong> While aiming for accessibility, colors can still convey meaning. For instance, consistent coloring of strings, numbers, and booleans helps users quickly identify data types.
          </li>
          <li>
            <strong>Readability over Aesthetics:</strong> Sometimes, theme designs prioritize visual flair over practical readability. Accessible themes flip this, making sure the code is easy to scan and understand first.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Palette className="w-6 h-6" /> Applying Principles to JSON
        </h2>
        <p>
          Let&apos;s look at how these principles apply specifically to JSON syntax elements:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-xl font-medium mb-3">Example JSON Structure:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": ["Math", "Science", "History"],
  "address": null
}`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            <em>Consider how a theme styles: object keys (`"name"`), string values (`"Alice"`, `"Math"`), number values (`30`), boolean values (`false`), null values (`null`), brackets (`[`, `]`, `&#x7b;`, `&#x7d;`), colon (`:`), and comma (`,`).</em>
          </p>
        </div>

        <p>
          In an accessible theme for this JSON:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Keys (`"name"`):</strong> Should have a distinct color from string values and good contrast with the background. Bolding might be an option in some themes.
          </li>
          <li>
            <strong>String Values (`"Alice"`):</strong> Another distinct color. Ensure sufficient contrast with both the background and key colors.
          </li>
          <li>
            <strong>Numbers (`30`):</strong> Often styled differently from strings to quickly identify data types.
          </li>
          <li>
            <strong>Booleans (`false`):</strong> Should be clearly distinguishable from numbers and strings. Using a keyword color that contrasts well is common.
          </li>
          <li>
            <strong>Null (`null`):</strong> Also treated as a distinct keyword, needing good contrast.
          </li>
          <li>
            <strong>Punctuation (`:`, `,`, `[`, `]`, `&#x7b;`, `&#x7d;`):</strong> These structural elements are vital. They should be visible and contrast well with the background. Making them slightly less prominent than values and keys can help focus, but not so subtle that they are hard to find.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb className="w-6 h-6" /> Tips for Developers and Theme Authors
        </h2>

        <h3 className="text-xl font-semibold mt-6">For Users (Choosing a Theme):</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Look for themes explicitly marketed as "accessible," "high-contrast," or "color-blind friendly."</li>
          <li>Preview themes with actual JSON code snippets. Check if you can easily distinguish all token types and if the contrast feels comfortable.</li>
          <li>If available, use developer tools or online contrast checkers to verify contrast ratios between different elements and the background.</li>
          <li>Don't be afraid to switch themes if one isn't working for you, even if it's popular.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">For Authors (Creating a Theme):</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <CheckCheck className="inline w-5 h-5 mr-1 text-green-500 dark:text-green-400" /> Start with a high-contrast background/foreground color pair.
          </li>
          <li>
            <CheckCheck className="inline w-5 h-5 mr-1 text-green-500 dark:text-green-400" /> Select a limited, complementary palette of colors that have sufficient contrast with the background and each other.
          </li>
          <li>
            <CheckCheck className="inline w-5 h-5 mr-1 text-green-500 dark:text-green-400" /> Use online tools to check color combinations for different types of color blindness. Simulate how your theme looks to users with Protanopia, Deuteranopia, etc.
          </li>
          <li>
            <CheckCheck className="inline w-5 h-5 mr-1 text-green-500 dark:text-green-400" /> Consider adding subtle visual cues beyond color, like variations in font weight (bold) or minimal underlines for specific token types, especially if relying solely on color is problematic for accessibility.
          </li>
          <li>
            <CheckCheck className="inline w-5 h-5 mr-1 text-green-500 dark:text-green-400" /> Test your theme with real-world JSON data of varying complexity.
          </li>
          <li>
            <CheckCheck className="inline w-5 h-5 mr-1 text-green-500 dark:text-green-400" /> Get feedback from users with different visual needs if possible.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Accessible syntax highlighting is not just a niche concern; it's a fundamental aspect of creating usable development tools and documentation. By understanding the principles of contrast and color-blind friendly design, both users selecting themes and authors creating them can contribute to a more inclusive environment where JSON, and all code, is easier for everyone to read and understand. Prioritizing accessibility leads to themes that are often clearer and more comfortable for <em>all</em> developers, regardless of visual ability.
        </p>
      </div>
    </>
  );
}
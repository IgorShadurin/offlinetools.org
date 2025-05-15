import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Color Contrast Considerations in JSON Syntax Highlighting | Offline Tools",
  description:
    "Learn about color contrast guidelines for JSON syntax highlighting and how to ensure accessibility for all users."
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Color Contrast Considerations in JSON Syntax Highlighting</h1>

      <div className="space-y-6">
        <p>
          Syntax highlighting is a crucial feature in code editors, IDEs, and documentation pages. It uses different colors 
          to visually distinguish elements of code, making it easier to read and understand JSON data. However, poor color 
          contrast can make highlighted JSON difficult or impossible to read for many users, particularly those with visual 
          impairments.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Color Contrast Matters</h2>
        <p>
          Color contrast refers to the difference in luminance or color that makes text distinguishable from its background. 
          In the context of syntax highlighting, contrast affects how easily users can read and differentiate various JSON elements.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Key Benefits of Proper Contrast:</h3>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Benefit</th>
                <th className="px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Accessibility</td>
                <td className="px-4 py-2">Users with visual impairments, color blindness, or low vision can read and understand code</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Readability</td>
                <td className="px-4 py-2">Reduces eye strain and increases comprehension for all users</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Productivity</td>
                <td className="px-4 py-2">Makes it easier to scan and understand code structure quickly</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Error Prevention</td>
                <td className="px-4 py-2">Helps developers identify syntax elements accurately, reducing mistakes</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Inclusivity</td>
                <td className="px-4 py-2">Creates a more accessible development environment for diverse teams</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">WCAG Guidelines for Contrast</h2>
        <p>
          The Web Content Accessibility Guidelines (WCAG) provide specific standards for color contrast ratios. 
          While these guidelines were designed for web content, they apply equally well to code editors and syntax highlighting.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Minimum Contrast Requirements:</h3>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">WCAG Level</th>
                <th className="px-4 py-2 text-left">Normal Text</th>
                <th className="px-4 py-2 text-left">Large Text</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">AA (Minimum)</td>
                <td className="px-4 py-2">4.5:1</td>
                <td className="px-4 py-2">3:1</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">AAA (Enhanced)</td>
                <td className="px-4 py-2">7:1</td>
                <td className="px-4 py-2">4.5:1</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">JSON Syntax Elements and Highlighting</h2>

        <p>
          Understanding how different JSON elements are typically highlighted can help designers and developers create more
          accessible syntax highlighting schemes.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Common JSON Elements and Highlighting Colors:</h3>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Element</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Typical Colors</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Keys</td>
                <td className="px-4 py-2">Property names in objects</td>
                <td className="px-4 py-2">Red, brown, or purple</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Strings</td>
                <td className="px-4 py-2">Text values in double quotes</td>
                <td className="px-4 py-2">Green or cyan</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Numbers</td>
                <td className="px-4 py-2">Numeric values (without quotes)</td>
                <td className="px-4 py-2">Blue or teal</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Booleans</td>
                <td className="px-4 py-2">true and false values</td>
                <td className="px-4 py-2">Blue, cyan, or orange</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Null</td>
                <td className="px-4 py-2">null value</td>
                <td className="px-4 py-2">Similar to booleans</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Brackets/Braces</td>
                <td className="px-4 py-2">{}, []</td>
                <td className="px-4 py-2">Gray or yellow</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Punctuation</td>
                <td className="px-4 py-2">Colons, commas</td>
                <td className="px-4 py-2">Gray or white</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Examples of Good and Poor Contrast</h2>

        <p>
          The following examples demonstrate the difference between good and poor color contrast in syntax highlighting.
        </p>

        <h3 className="text-xl font-medium mt-6">Good Contrast - Light Theme</h3>
        <p>
          This example shows JSON with colors that provide good contrast against a light background:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-4 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              <code>
                <span className="text-gray-800">&#123;</span>
                <br />  <span className="text-red-700">&quot;name&quot;</span><span className="text-gray-800">:</span> <span className="text-green-700">&quot;Alice&quot;</span><span className="text-gray-800">,</span>
                <br />  <span className="text-red-700">&quot;age&quot;</span><span className="text-gray-800">:</span> <span className="text-blue-700">30</span><span className="text-gray-800">,</span>
                <br />  <span className="text-red-700">&quot;isStudent&quot;</span><span className="text-gray-800">:</span> <span className="text-cyan-700">false</span><span className="text-gray-800">,</span>
                <br />  <span className="text-red-700">&quot;courses&quot;</span><span className="text-gray-800">:</span> <span className="text-gray-800">[</span>
                <br />    <span className="text-green-700">&quot;Math&quot;</span><span className="text-gray-800">,</span>
                <br />    <span className="text-green-700">&quot;Science&quot;</span><span className="text-gray-800">,</span>
                <br />    <span className="text-green-700">&quot;History&quot;</span>
                <br />  <span className="text-gray-800">]</span>
                <br /><span className="text-gray-800">&#125;</span>
              </code>
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The colors above have strong contrast with the white background, making all elements easily readable.
            Dark red for keys, dark green for strings, blue for numbers, and dark gray for structural elements
            all provide contrast ratios above the WCAG AA minimum of 4.5:1.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">Poor Contrast - Light Theme</h3>
        <p>
          This example shows JSON with colors that provide poor contrast against a light background:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-4 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              <code>
                <span className="text-gray-300">&#123;</span>
                <br />  <span className="text-red-300">&quot;name&quot;</span><span className="text-gray-300">:</span> <span className="text-green-300">&quot;Alice&quot;</span><span className="text-gray-300">,</span>
                <br />  <span className="text-red-300">&quot;age&quot;</span><span className="text-gray-300">:</span> <span className="text-blue-300">30</span><span className="text-gray-300">,</span>
                <br />  <span className="text-red-300">&quot;isStudent&quot;</span><span className="text-gray-300">:</span> <span className="text-cyan-300">false</span><span className="text-gray-300">,</span>
                <br />  <span className="text-red-300">&quot;courses&quot;</span><span className="text-gray-300">:</span> <span className="text-gray-300">[</span>
                <br />    <span className="text-green-300">&quot;Math&quot;</span><span className="text-gray-300">,</span>
                <br />    <span className="text-green-300">&quot;Science&quot;</span><span className="text-gray-300">,</span>
                <br />    <span className="text-green-300">&quot;History&quot;</span>
                <br />  <span className="text-gray-300">]</span>
                <br /><span className="text-gray-300">&#125;</span>
              </code>
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The light colors above have very poor contrast with the white background, making the JSON
            difficult to read. The light colors used (light red, light green, light blue, light gray)
            likely have contrast ratios well below the minimum 4.5:1 ratio required by WCAG guidelines.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">Good Contrast - Dark Theme</h3>
        <p>
          This example shows JSON with colors that provide good contrast against a dark background:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-gray-900 p-4 rounded overflow-x-auto">
            <pre className="text-sm">
              <code>
                <span className="text-gray-300">&#123;</span>
                <br />  <span className="text-pink-400">&quot;name&quot;</span><span className="text-gray-300">:</span> <span className="text-green-400">&quot;Alice&quot;</span><span className="text-gray-300">,</span>
                <br />  <span className="text-pink-400">&quot;age&quot;</span><span className="text-gray-300">:</span> <span className="text-blue-400">30</span><span className="text-gray-300">,</span>
                <br />  <span className="text-pink-400">&quot;isStudent&quot;</span><span className="text-gray-300">:</span> <span className="text-cyan-400">false</span><span className="text-gray-300">,</span>
                <br />  <span className="text-pink-400">&quot;courses&quot;</span><span className="text-gray-300">:</span> <span className="text-gray-300">[</span>
                <br />    <span className="text-green-400">&quot;Math&quot;</span><span className="text-gray-300">,</span>
                <br />    <span className="text-green-400">&quot;Science&quot;</span><span className="text-gray-300">,</span>
                <br />    <span className="text-green-400">&quot;History&quot;</span>
                <br />  <span className="text-gray-300">]</span>
                <br /><span className="text-gray-300">&#125;</span>
              </code>
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The colors above have strong contrast with the dark background, making all elements easily readable.
            Bright pink for keys, bright green for strings, light blue for numbers, and light gray for structural
            elements all provide contrast ratios above the WCAG AA minimum.
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Pro Tip:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            Always check your color contrast ratios with a dedicated tool like WebAIM's Contrast Checker or the Chrome 
            DevTools Accessibility panel. Don't rely on visual judgment alone, as what looks readable to you might not 
            meet accessibility standards or work for users with visual impairments.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Tools for Checking Contrast</h2>
        <p>
          Several tools exist to help ensure your syntax highlighting meets accessibility standards:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium mb-2">Recommended Contrast Checking Tools</h3>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Tool</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">WebAIM Contrast Checker</td>
                <td className="px-4 py-2">Online tool to check contrast between two colors</td>
                <td className="px-4 py-2">Quick checks of specific color pairs</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Color Contrast Analyzer</td>
                <td className="px-4 py-2">Desktop application for Windows and macOS</td>
                <td className="px-4 py-2">Checking colors on your screen with a color picker</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Chrome DevTools</td>
                <td className="px-4 py-2">Built-in contrast checking in the Accessibility panel</td>
                <td className="px-4 py-2">Auditing existing web-based JSON formatters</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Axe DevTools</td>
                <td className="px-4 py-2">Browser extension for accessibility testing</td>
                <td className="px-4 py-2">Comprehensive accessibility audits</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Colorable</td>
                <td className="px-4 py-2">Web tool to test entire color palettes for contrast</td>
                <td className="px-4 py-2">Designing full syntax highlighting themes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Practices</h2>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Ensure minimum contrast ratios</strong> of 4.5:1 for all syntax elements against their background
          </li>
          <li>
            <strong>Design separate color schemes</strong> for light and dark themes rather than using the same colors
          </li>
          <li>
            <strong>Test with color blindness simulators</strong> to ensure your highlighting works for users with different types of color vision
          </li>
          <li>
            <strong>Use more than just color</strong> to differentiate elements where possible (e.g., adding subtle font weight or style differences)
          </li>
          <li>
            <strong>Provide custom theme options</strong> so users can adjust colors to meet their specific needs
          </li>
          <li>
            <strong>Include at least one high-contrast theme</strong> with very strong contrast ratios well above the minimum
          </li>
          <li>
            <strong>Test on multiple displays</strong> as colors can appear differently across devices
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Good color contrast in JSON syntax highlighting is essential for accessibility and usability. By following WCAG 
          guidelines and designing with contrast in mind, developers can create JSON formatters and editors that work well 
          for all users, including those with visual impairments or color blindness.
        </p>
        <p className="mt-4">
          Beyond mere compliance with standards, proper contrast creates a better experience for everyone, reducing eye strain 
          and making it easier to read and understand JSON data. Whether you're designing a new JSON formatter or evaluating 
          existing tools, prioritizing color contrast will significantly improve the user experience.
        </p>
        <p className="mt-4">
          Remember that accessibility is not an afterthought or a nice-to-have feature—it's a fundamental aspect of good 
          design that benefits all users and ensures no one is excluded from using your tools effectively.
        </p>
      </div>
    </>
  );
}

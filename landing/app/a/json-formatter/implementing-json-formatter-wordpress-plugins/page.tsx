import type { Metadata } from "next";
import { Code, ClipboardList, ShieldCheck, Cpu, LayoutPanelTop } from "lucide-react";

export const metadata: Metadata = {
  title: "Implementing JSON Formatter WordPress Plugins",
  description:
    "A comprehensive guide for developers on how to create WordPress plugins that format JSON data, covering different approaches and considerations.",
};

export default function JsonFormatterWordPressPluginArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing JSON Formatter WordPress Plugins</h1>

      <div className="space-y-6">
        <p>
          In web development, working with JSON (JavaScript Object Notation) is incredibly common, especially when
          dealing with APIs, configuration files, or storing structured data. However, raw JSON, particularly when
          minified or deeply nested, can be challenging to read and debug. A <strong>JSON Formatter</strong> is a tool
          that takes raw JSON text and presents it in a human-readable format, typically with indentation and syntax
          highlighting.
        </p>
        <p>
          For WordPress developers, integrating JSON formatting capabilities into a plugin can be immensely useful.
          Whether you need to display data from an external API, provide a tool for users to format their own JSON
          inputs, or visualize JSON stored in post metadata or plugin settings, a custom JSON formatter plugin can
          enhance the WordPress experience for both administrators and potentially site visitors.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Cpu className="w-6 h-6 text-blue-500" />
          <span>Why Implement a JSON Formatter Plugin?</span>
        </h2>
        <p>
          Beyond basic readability, here are several reasons why you might build or use a JSON formatter within
          WordPress:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Debugging:</strong> Easily inspect JSON responses from APIs or data stored in the database.
          </li>
          <li>
            <strong>User Input:</strong> Provide a formatted input area for users who need to enter JSON data into
            plugin settings or custom fields.
          </li>
          <li>
            <strong>Data Visualization:</strong> Display structured data from APIs or custom sources on the frontend in
            a clear, formatted way.
          </li>
          <li>
            <strong>Developer Tools:</strong> Offer a utility within the WordPress admin area for developers to format
            arbitrary JSON strings.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <LayoutPanelTop className="w-6 h-6 text-green-500" />
          <span>Where to Integrate in WordPress</span>
        </h2>
        <p>
          A JSON formatter plugin can live in various parts of the WordPress ecosystem, depending on its primary use
          case:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Shortcode:</strong> Allows users to insert a JSON string directly into a post or page, which is then
            formatted on the frontend. Useful for displaying specific data pulled from an API.
          </li>
          <li>
            <strong>Gutenberg Block:</strong> Provides a dedicated block in the Block Editor for users to paste JSON or
            fetch it from a source (like a custom field), and display it formatted.
          </li>
          <li>
            <strong>Admin Page/Submenu:</strong> A dedicated page within the WordPress admin menu serving as a
            standalone JSON formatting utility.
          </li>
          <li>
            <strong>Metabox:</strong> Attach a formatter to a post type's edit screen to format and display JSON stored
            in post metadata.
          </li>
          <li>
            <strong>Settings Page Field:</strong> If a plugin stores settings as JSON, a formatter can display the
            current settings in a readable way.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6 text-purple-500" />
          <span>Implementation Approaches</span>
        </h2>
        <p>
          There are two primary approaches to formatting JSON: server-side (PHP) and client-side (JavaScript). Often, a
          combination of both is used.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Server-Side Formatting (PHP)</h3>
        <p>
          PHP has built-in functions like <code>json_encode()</code> which can be used to format JSON. While primarily
          for encoding PHP data to JSON, it also has options for pretty-printing.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Basic PHP Formatting Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`<?php
function format_json_php($json_string) {
    // Sanitize input (basic example, more robust needed for untrusted input)
    $json_string = stripslashes($json_string);

    // Decode and then encode with formatting
    $data = json_decode($json_string);

    if (json_last_error() !== JSON_ERROR_NONE) {
        return 'Invalid JSON: ' . json_last_error_msg();
    }

    // JSON_PRETTY_PRINT requires PHP 5.4+
    // JSON_UNESCAPED_SLASHES is often useful
    // JSON_UNESCAPED_UNICODE might also be needed depending on data
    $formatted_json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

    if ($formatted_json === false) {
         return 'Error encoding JSON: ' . json_last_error_msg();
    }

    // Wrap in pre and code tags for display
    return '<pre><code>' . htmlspecialchars($formatted_json) . '</code></pre>';
}

// Example usage within a shortcode handler:
// add_shortcode('format_my_json', 'handle_format_my_json_shortcode');
// function handle_format_my_json_shortcode($atts, $content = '') {
//    // $content would be the JSON string between the shortcode tags
//    return format_json_php($content);
// }
?>`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            This approach is simple but lacks syntax highlighting and interactive features like collapsing sections.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Client-Side Formatting (JavaScript)</h3>
        <p>
          Formatting JSON in the browser allows for dynamic features like syntax highlighting, collapsible nodes, and
          faster processing for large JSON strings (as it offloads the work from the server).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Basic JavaScript Formatting Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assume 'jsonInputString' is the raw JSON string
// Assume 'outputElement' is the HTML element where formatted JSON will be displayed

try {
    const data = JSON.parse(jsonInputString);

    // JSON.stringify with arguments formats the output
    // null for replacer, 2 for number of spaces for indentation
    const formattedJson = JSON.stringify(data, null, 2);

    // Display the formatted text
    outputElement.textContent = formattedJson;

    // For syntax highlighting, you would typically add classes
    // based on token types (keys, strings, numbers, etc.)
    // and use CSS to style them. Libraries like Prism.js or
    // custom implementations are common.

    // Example of a simple (non-highlighting) display:
    // outputElement.innerHTML = \`<pre><code>\${escapeHTML(formattedJson)}</code></pre>\`;

} catch (error) {
    console.error("Invalid JSON:", error);
    outputElement.textContent = "Invalid JSON: " + error.message;
    outputElement.style.color = 'red';
}

// Helper function to escape HTML entities for safe display within <pre><code>
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function(match) {
        const escape = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return escape[match];
    });
}
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            This provides formatting. For syntax highlighting and interactive features, you'll likely need to manually
            parse the JSON string and wrap different parts in
            <code>&lt;span&gt;</code> tags with CSS classes, or use a dedicated JavaScript library.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Combining PHP and JavaScript</h3>
        <p>
          A common pattern in WordPress is to use PHP to retrieve or handle the JSON data and then pass it to JavaScript
          for client-side formatting and display.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual PHP (to pass data) and JS (to format):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`<?php
// PHP (e.g., in a shortcode handler or metabox)
function display_json_for_js_formatting($atts, $content = '') {
    // Assume $content holds the JSON string
    // Basic sanitization - more robust needed for untrusted sources
    $json_string = wp_kses_post($content); // Or a more specific sanitizer if possible

    // Output a container for the JS to render into,
    // and store the JSON string safely using data attributes or script tag.
    // IMPORTANT: json_encode is safe for data attributes if used correctly.
    // For large JSON, a separate script tag might be better.
    $escaped_json = htmlspecialchars(json_encode($json_string), ENT_QUOTES, 'UTF-8');

    // Using a data attribute (suitable for smaller JSON)
    $output = sprintf(
        '<div class="json-formatter-container" data-json="%s">Loading JSON...</div>',
        $escaped_json
    );

    // Or using a script tag (better for larger JSON or complex data)
    // $unique_id = uniqid('json_data_');
    // $output = sprintf('<div class="json-formatter-container" id="%s">Loading JSON...</div>', esc_attr($unique_id));
    // $output .= sprintf('<script type="application/json" id="data-%s">%s</script>',
    //     esc_attr($unique_id),
    //     $json_string // No need to double encode/escape here if type="application/json"
    // );


    // Enqueue the JS script that will find these containers and format the JSON
    // wp_enqueue_script('my-json-formatter-script', plugins_url('js/formatter.js', __FILE__), array(), '1.0', true);

    return $output;
}
// add_shortcode('format_json_js', 'display_json_for_js_formatting');

// JavaScript (in formatter.js)
/*
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.json-formatter-container').forEach(container => {
        let jsonString = container.dataset.json; // For data attribute approach

        // Or for script tag approach:
        // const scriptTag = document.getElementById('data-' + container.id);
        // if (scriptTag) {
        //     jsonString = scriptTag.textContent;
        //     scriptTag.remove(); // Clean up the script tag
        // } else {
        //     container.textContent = "Error: JSON data not found.";
        //     container.style.color = 'red';
        //     return;
        // }

        if (!jsonString) {
            container.textContent = "No JSON data provided.";
            return;
        }

        try {
            const data = JSON.parse(jsonString);
            const formattedJson = JSON.stringify(data, null, 2);

            // Basic display - replace with library or custom rendering for highlighting
            container.innerHTML = \`<pre><code>\${escapeHTML(formattedJson)}</code></pre>\`;

        } catch (error) {
            container.textContent = "Invalid JSON: " + error.message;
            container.style.color = 'red';
            console.error("Formatting error:", error);
        }
    });
});

// Remember the escapeHTML function from the previous example!
*/
?>`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            This pattern is versatile. PHP handles data retrieval/storage, and JavaScript provides the interactive
            formatting UI on the frontend.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ClipboardList className="w-6 h-6 text-teal-500" />
          <span>Key Considerations for Implementation</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>JSON Parsing & Stringifying:</strong> Use built-in functions (`json_decode`/`json_encode` in PHP,
            `JSON.parse`/`JSON.stringify` in JS). Handle potential errors during parsing (invalid JSON input).
          </li>
          <li>
            <strong>Error Handling:</strong> Clearly indicate to the user if the input is not valid JSON. Display the
            error message from the parser.
          </li>
          <li>
            <strong>Input Source:</strong> How does the JSON get into the formatter? Is it copy-pasted into a textarea,
            pulled from a URL (requires server-side fetch), read from a custom field, etc.? This affects where you put
            the formatting logic.
          </li>
          <li>
            <strong>Output Display:</strong> Simple `&lt;pre&gt;` and `&lt;code&gt;` tags work for basic pre-formatted
            text. For syntax highlighting, you'll need CSS and potentially JavaScript to add classes to different JSON
            elements (keys, values, types).
          </li>
          <li>
            <strong>Syntax Highlighting:</strong> You can implement this manually by iterating through the parsed JSON
            and generating HTML with classed spans, or use a dedicated library (like a client-side JSON
            formatter/highlighter library).
          </li>
          <li>
            <strong>Performance:</strong> For very large JSON strings, client-side formatting is generally better as it
            doesn't block the server. Be mindful of browser performance with extremely large inputs.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ShieldCheck className="w-6 h-6 text-yellow-500" />
          <span>Security</span>
        </h2>
        <p>When building any WordPress plugin, security is paramount. Pay close attention to:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Input Sanitization:</strong> If accepting JSON input from users (frontend or admin), sanitize it
            appropriately before processing or saving. However, raw JSON needs to be parsed as is, so sanitization often
            applies to *where* the JSON comes from or how it's handled *after* parsing, not the JSON structure itself.
            Using functions like `wp_kses_post` or ensuring data passed to `json_decode` is the literal JSON string is
            important.
          </li>
          <li>
            <strong>Output Escaping:</strong> Always escape output that contains potentially unsafe characters before
            displaying it in HTML. For the formatted JSON string, use `htmlspecialchars()` in PHP or a similar
            function/method in JavaScript (like the `escapeHTML` example) before putting it inside `&lt;code&gt;` or
            rendering with a JS framework, unless the library handles escaping internally.
          </li>
          <li>
            <strong>AJAX Endpoints:</strong> If your formatter uses AJAX to fetch or process JSON, ensure endpoints are
            properly secured with nonces and capability checks.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing a JSON formatter plugin in WordPress involves deciding where the functionality best fits within
          the WordPress admin or frontend, choosing between server-side PHP, client-side JavaScript, or a combination,
          and paying close attention to error handling, user experience, and security. While PHP offers basic
          formatting, JavaScript provides the flexibility for rich, interactive displays with syntax highlighting. By
          leveraging WordPress's plugin architecture (shortcodes, blocks, admin pages), you can create a valuable tool
          for working with JSON data more effectively within the platform.
        </p>
      </div>
    </>
  );
}

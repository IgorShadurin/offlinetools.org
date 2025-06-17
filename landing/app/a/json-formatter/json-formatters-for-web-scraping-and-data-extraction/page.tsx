import type { Metadata } from "next";
import { Code, Table, Sparkles, Workflow, ListTree, Wand, Search, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatters for Web Scraping & Data Extraction",
  description: "Learn how to format and structure data extracted from web pages into clean, usable JSON.",
};

export default function JsonFormattingForScrapingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Code className="mr-3" size={32} /> JSON Formatters for Web Scraping and Data Extraction
      </h1>

      <div className="space-y-6">
        <p>
          Web scraping involves extracting data from websites. Often, this data is unstructured or semi-structured HTML.
          To make the extracted data useful for storage, analysis, or integration, it needs to be organized into a
          consistent format. JSON (JavaScript Object Notation) is a popular choice due to its readability, flexibility,
          and wide support across programming languages and systems.
        </p>
        <p>
          A &quot;JSON formatter&quot; in the context of web scraping isn&apos;t just a tool that pretty-prints JSON.
          It&apos;s the process and logic you implement to take raw, scraped data and transform it into a valid,
          well-structured JSON object or array.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Sparkles className="mr-2" size={24} /> Why Format Scraped Data as JSON?
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Consistency:</strong> Ensures every data record follows the same structure, making it easy to
            process in bulk.
          </li>
          <li>
            <strong>Usability:</strong> JSON maps directly to data structures like objects and arrays in most
            programming languages.
          </li>
          <li>
            <strong>Interoperability:</strong> JSON is the de facto standard for data exchange on the web, compatible
            with databases, APIs, and data analysis tools.
          </li>
          <li>
            <strong>Readability:</strong> JSON is human-readable, simplifying debugging and validation.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Search className="mr-2" size={24} /> Sources of Data for JSON Formatting
        </h2>
        <p>Scraped data can come from various parts of a web page:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>HTML Elements:</strong> Text content, attribute values (e.g.,
            <code>href</code>, <code>src</code>, <code>data-*</code>). This is the most common source and requires
            significant &quot;formatting&quot; to build a JSON structure.
          </li>
          <li>
            <strong>Embedded JSON/JSON-LD:</strong> Structured data often found within <code>&lt;script&gt;</code> tags,
            particularly with <code>type=&quot;application/ld+json&quot;</code> for SEO and semantic web purposes. This
            is often already in JSON format but might need extraction and validation.
          </li>
          <li>
            <strong>API Responses:</strong> Data fetched by the browser via AJAX calls, which are often directly in JSON
            format. These are typically the easiest to handle but might require inspecting network requests.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Workflow className="mr-2" size={24} /> Techniques for Building JSON from Scraped Data
        </h2>
        <p>
          When extracting data from HTML elements, you&apos;re essentially mapping pieces of information from the HTML
          tree into keys and values of a JSON object.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Table className="mr-2" size={20} /> 1. Mapping HTML Selectors to JSON Keys
        </h3>
        <p>
          The most fundamental technique is to select specific elements using CSS selectors (or XPath) and assign their
          extracted content (text or attributes) to fields in a JSON object.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center">
            <Code className="mr-2" size={18} /> Example: Extracting Product Details
          </h4>
          <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
            (Conceptual using a Node.js/browser-like scraping context)
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assume 'document' is the parsed HTML document root
function extractProductDetails(document: Document) {
  const product: { [key: string]: any } = {}; // Use any or a specific type interface

  // Extract title
  const titleElement = document.querySelector("h1.product-title");
  if (titleElement) {
    product.title = titleElement.textContent?.trim();
  }

  // Extract price, convert to number
  const priceElement = document.querySelector(".product-price");
  if (priceElement) {
    const priceText = priceElement.textContent?.replace(/[^0-9.-]+/g, "") || "";
    product.price = parseFloat(priceText);
  }

  // Extract description
  const descriptionElement = document.querySelector(".product-description");
  if (descriptionElement) {
    product.description = descriptionElement.innerHTML.trim(); // Sometimes HTML is desired
  }

  // Extract features into an array
  const features: string[] = [];
  document.querySelectorAll(".product-features li").forEach(li => {
    if (li.textContent) {
      features.push(li.textContent.trim());
    }
  });
  if (features.length > 0) {
      product.features = features;
  }


  // Extract image URL from an attribute
  const imageElement = document.querySelector(".product-image img");
  if (imageElement) {
    product.imageUrl = imageElement.getAttribute("src");
  }

  // Handle nested data, e.g., seller info
  const sellerElement = document.querySelector(".seller-info");
  if (sellerElement) {
      product.seller = {
          name: sellerElement.querySelector(".seller-name")?.textContent?.trim(),
          rating: parseFloat(sellerElement.querySelector(".seller-rating")?.textContent || '0'),
      };
  }


  return product;
}

// Example Usage (requires a way to load and parse HTML, like 'cheerio' in Node.js or browser's DOMParser)
/*
async function scrapeAndFormat(url: string) {
    // In a backend, you'd fetch the URL content first
    // const htmlContent = await fetch(url).then(res => res.text());
    // In Node.js, use cheerio: const $ = cheerio.load(htmlContent);
    // In browser: const parser = new DOMParser(); const doc = parser.parseFromString(htmlContent, 'text/html');

    // Assuming 'document' is available and parsed
    // const productJson = extractProductDetails(document);
    // console.log(JSON.stringify(productJson, null, 2)); // Format with indentation
}
*/
`}
            </pre>
          </div>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            This example shows selecting elements, extracting text or attributes, and structuring them into a JavaScript
            object which can then be converted to a JSON string using <code>JSON.stringify()</code>. It also includes
            basic handling for missing elements and type conversion (price, rating).
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <ListTree className="mr-2" size={20} /> 2. Handling Nested Structures
        </h3>
        <p>
          Web pages often have nested information (e.g., comments under an article, items in a list). Your formatting
          logic needs to reflect this in the JSON structure, typically using nested objects or arrays.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center">
            <Code className="mr-2" size={18} /> Example: Extracting Article with Comments
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function extractArticleWithComments(document: Document) {
  const article: { [key: string]: any } = {};

  article.title = document.querySelector("h1.article-title")?.textContent?.trim();
  article.author = document.querySelector(".article-author")?.textContent?.trim();
  article.content = document.querySelector(".article-content")?.innerHTML.trim(); // Full HTML content

  const comments: { author?: string; text?: string }[] = [];
  document.querySelectorAll(".comment-list .comment-item").forEach(commentElement => {
    const comment = {
      author: commentElement.querySelector(".comment-author")?.textContent?.trim(),
      text: commentElement.querySelector(".comment-text")?.textContent?.trim(),
      // Could recursively extract replies if nested
    };
    comments.push(comment);
  });

  if (comments.length > 0) {
      article.comments = comments;
  }


  return article;
}
`}
            </pre>
          </div>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            Here, we select multiple comment elements and create an array of comment objects within the main article
            object.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Wand className="mr-2" size={20} /> 3. Data Cleaning and Transformation
        </h3>
        <p>
          Raw text from web pages often contains whitespace, unwanted characters, or needs type conversion. Formatting
          involves cleaning this data and transforming it into appropriate JSON data types (strings, numbers, booleans,
          null, arrays, objects).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center">
            <Code className="mr-2" size={18} /> Example: Cleaning and Typing
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function cleanAndTypeData(rawData: { [key: string]: string | null | undefined }) {
  const formattedData: { [key: string]: any } = {};

  // Clean and assign string
  if (rawData.name) {
    formattedData.name = rawData.name.trim();
  }

  // Clean, remove symbols, and convert to number
  if (rawData.priceText) {
    const cleanPrice = rawData.priceText.replace(/[€$£,]/g, "").trim();
    formattedData.price = parseFloat(cleanPrice);
    // Handle potential NaN if conversion fails
    if (isNaN(formattedData.price)) {
        delete formattedData.price; // Or set to null, or throw error
    }
  }

  // Convert text 'Yes'/'No' or 'true'/'false' to boolean
  if (rawData.inStockText) {
    const lowerText = rawData.inStockText.toLowerCase().trim();
    if (lowerText === 'yes' || lowerText === 'true') {
      formattedData.isInStock = true;
    } else if (lowerText === 'no' || lowerText === 'false') {
      formattedData.isInStock = false;
    } else {
        // Handle ambiguous cases
        formattedData.isInStock = null;
    }
  }

  // Handle missing data - often you just don't add the key if data is missing
  // The initial extraction logic should handle this (e.g., the 'if' checks above)

  return formattedData;
}
`}
            </pre>
          </div>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            This function demonstrates removing currency symbols, trimming whitespace, and converting strings to numbers
            and booleans. Robust error handling (like checking for <code>isNaN</code>) is crucial.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Package className="mr-2" size={20} /> 4. Extracting & Parsing Embedded JSON
        </h3>
        <p>
          If the website includes JSON data directly in a <code>&lt;script&gt;</code> tag, you can extract the script
          content and parse it using <code>JSON.parse()</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center">
            <Code className="mr-2" size={18} /> Example: Parsing JSON-LD
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function extractAndParseJsonLd(document: Document) {
  const scriptElement = document.querySelector('script[type="application/ld+json"]');

  if (scriptElement && scriptElement.textContent) {
    try {
      // Parse the JSON content
      const jsonData = JSON.parse(scriptElement.textContent);
      return jsonData;
    } catch (error) {
      console.error("Error parsing JSON-LD:", error);
      return null; // Or handle error appropriately
    }
  }

  return null; // No JSON-LD script found
}

// The extracted jsonData might be an object or an array,
// depending on the JSON-LD structure (e.g., @graph).
// You would then process this parsed object/array further
// to extract the specific data you need.
`}
            </pre>
          </div>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            This is often the simplest case if the data you need is available in a valid JSON-LD block. You still need
            to handle potential parsing errors and navigate the structure of the extracted JSON object.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Sparkles className="mr-2" size={24} /> Best Practices for JSON Formatting
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Define Your Schema:</strong> Before writing code, decide exactly what keys your JSON output should
            have and what data types they should be. This helps structure your extraction logic.
          </li>
          <li>
            <strong>Handle Missing Data Gracefully:</strong> Decide whether to include keys with <code>null</code>{" "}
            values, empty strings/arrays, or simply omit keys for data that wasn&apos;t found on a page.
          </li>
          <li>
            <strong>Validate Data Types:</strong> Always attempt to convert extracted text to the correct type (number,
            boolean) and validate the conversion.
          </li>
          <li>
            <strong>Clean Text:</strong> Remove leading/trailing whitespace (<code>.trim()</code>), unnecessary
            characters, or HTML entities.
          </li>
          <li>
            <strong>Error Handling:</strong> Implement robust <code>try...catch</code> blocks around JSON parsing and
            logic that might fail if HTML structure is unexpected. Log or report pages that fail formatting.
          </li>
          <li>
            <strong>Incremental Development:</strong> Build your formatter piece by piece, extracting and formatting one
            data point at a time before moving to the next.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Workflow className="mr-2" size={24} /> The Formatting Workflow
        </h2>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Fetch:</strong> Retrieve the web page content (HTML, API response).
          </li>
          <li>
            <strong>Parse:</strong> Parse the HTML string into a traversable structure (DOM in browser/puppeteer,
            Cheerio in Node.js). If it&apos;s already JSON, parse the JSON string.
          </li>
          <li>
            <strong>Extract:</strong> Locate the specific pieces of data within the parsed structure using selectors
            (CSS, XPath) or by finding embedded JSON blocks.
          </li>
          <li>
            <strong>Clean &amp; Transform:</strong> Process the extracted raw text – trim whitespace, remove unwanted
            characters, perform type conversions.
          </li>
          <li>
            <strong>Structure:</strong> Organize the cleaned data into a JavaScript object or array according to your
            predefined JSON schema.
          </li>
          <li>
            <strong>Validate:</strong> Optionally, check if the resulting object conforms to the expected structure and
            data types.
          </li>
          <li>
            <strong>Output:</strong> Convert the JavaScript object/array into a JSON string using{" "}
            <code>JSON.stringify()</code>, optionally with indentation for readability (
            <code>JSON.stringify(obj, null, 2)</code>).
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2" size={24} /> Conclusion
        </h2>
        <p>
          Formatting scraped data into JSON is a crucial step that transforms raw web content into usable structured
          data. While scraping libraries help with fetching and parsing HTML, the core logic of mapping, cleaning, and
          structuring the data into JSON lies with the developer. By carefully defining your desired JSON schema and
          implementing robust extraction, cleaning, and type-casting logic, you can build reliable formatters that yield
          clean, consistent, and easily processable data for your applications.
        </p>
      </div>
    </>
  );
}

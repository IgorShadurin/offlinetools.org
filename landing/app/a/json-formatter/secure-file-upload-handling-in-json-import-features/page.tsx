import type { Metadata } from "next";
import {
  Lock,
  CheckCircle,
  AlertCircle,
  Database,
  Shield,
  FileWarning,
  FileType,
  Maximize2,
  Scale,
  Slash,
  Server,
  Activity,
  List, // Using List as a replacement for Schema icon
} from "lucide-react";

export const metadata: Metadata = {
  title: "Secure File Upload Handling in JSON Import Features | Offline Tools",
  description:
    "Learn best practices and techniques for securely handling file uploads, specifically for JSON import features in web applications.",
};

export default function SecureFileUploadJsonImportArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Lock className="w-8 h-8 text-indigo-500" /> Secure File Upload Handling in JSON Import Features
      </h1>

      <div className="space-y-6">
        <p>
          Implementing file upload functionality is a common requirement, enabling users to import data, documents,
          or media. When dealing with structured data like JSON, this often involves a feature to &quot;Import from JSON File&quot;.
          While seemingly straightforward, file uploads are a significant attack vector. Ensuring the security of your application
          when handling uploaded JSON files is paramount to protect against various threats, from malicious code execution
          to data breaches and denial-of-service attacks.
        </p>

        <p>
          This guide focuses on the critical security considerations and best practices specifically for handling JSON file uploads.
          While many principles apply to any file upload, JSON has its own unique vulnerabilities and validation needs.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-500" /> Common Threats & Vulnerabilities
        </h2>

        <p>
          Before diving into solutions, let&apos;s understand the risks associated with unsecured file uploads:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong className="font-medium">Malicious File Upload:</strong> Attackers might try to upload files that aren&apos;t JSON,
            but contain malicious scripts (e.g., PHP, ASP, executable files) and trick the server into executing them.
          </li>
          <li>
            <strong className="font-medium">JSON Parsing Vulnerabilities:</strong> Specially crafted JSON files can exploit weaknesses in the
            parser itself (e.g., &quot;Billion Laughs&quot; / XML Bomb style attacks but for JSON parsers, deep nesting leading to stack overflow,
            excessive key/value pairs leading to memory exhaustion).
          </li>
          <li>
            <strong className="font-medium">Directory Traversal:</strong> Attempting to upload a file to a different directory on the server
            by manipulating the filename (e.g., <code>../../path/to/sensitive/file</code>).
          </li>
          <li>
            <strong className="font-medium">File Inclusion:</strong> If the application processes the uploaded file path insecurely,
            it might be tricked into including or executing files already on the server.
          </li>
          <li>
            <strong className="font-medium">Mass Assignment/Data Injection:</strong> If the JSON structure directly maps to database or object
            properties without proper filtering, malicious users could potentially inject unexpected or forbidden data.
          </li>
          <li>
            <strong className="font-medium">Denial of Service (DoS):</strong> Uploading extremely large files or a large number of files
            to consume server resources (disk space, memory, CPU).
          </li>
          <li>
            <strong className="font-medium">Client-Side Trust:</strong> Relying solely on client-side validation (JavaScript) is insecure
            as it can be easily bypassed.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-500" /> Key Security Measures for JSON Uploads (Backend Focus)
        </h2>

        <p>
          Security measures must be implemented diligently on the server-side, as this is where you have control and can trust the execution environment.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" /> 1. Rigorous Server-Side Validation
        </h3>
        <p>
          This is the most critical step. Never trust the client-side. Validate everything on the server.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong className="font-medium flex items-center gap-2"><FileWarning className="w-4 h-4" /> File Type Validation:</strong>
            Check both the file extension (e.g., <code>.json</code>) and the MIME type (e.g., <code>application/json</code>).
            While MIME types from the browser can be spoofed, checking both provides a stronger defense. Avoid relying solely on extensions.
          </li>
          <li>
            <strong className="font-medium flex items-center gap-2"><Maximize2 className="w-4 h-4" /> File Size Limits:</strong>
            Set a maximum allowed size for uploaded files to prevent DoS attacks and resource exhaustion. Reject files exceeding this limit early.
          </li>
          <li>
            <strong className="font-medium flex items-center gap-2"><List className="w-4 h-4" /> Content Validation (Parsing & Schema Check):</strong>
            After basic file checks, read the file content and parse it as JSON.
            <ul className="list-circle pl-4 mt-2 space-y-1">
              <li><strong className="font-normal">Attempt Parsing:</strong> Use a robust, secure JSON parser. If parsing fails, reject the file.</li>
              <li><strong className="font-normal">Schema Validation:</strong> Validate the parsed JSON structure and data types against an expected schema. Libraries like Zod, Yup, or JSON Schema validators can be helpful here. This prevents injection of unexpected fields.</li>
              <li><strong className="font-normal">Structure Limits:</strong> Consider limits on nested depth, maximum keys in objects, or maximum elements in arrays if dealing with potentially hostile or complex JSON.</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Database className="w-5 h-5 text-green-600" /> 2. Secure Storage & Naming
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong className="font-medium flex items-center gap-2"><Slash className="w-4 h-4" /> Store Outside Web Root:</strong> Never store uploaded files directly in a directory accessible via the web server (e.g., inside your public `.` or `public_html` folder). Store them in a separate, non-web-accessible directory or a dedicated storage service.
          </li>
          <li>
            <strong className="font-medium flex items-center gap-2"><FileType className="w-4 h-4" /> Generate Secure, Unique Filenames:</strong> Do not use the original filename provided by the user directly. Generate a unique, random filename (e.g., using UUIDs) and append a safe, verified extension (like `.json`). This prevents directory traversal and conflicts.
          </li>
          <li>
            <strong className="font-medium flex items-center gap-2"><Lock className="w-4 h-4" /> Permissions:</strong> Ensure strict file system permissions on the storage directory, allowing only the necessary process (your server-side code) to write and read files.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Server className="w-5 h-5 text-green-600" /> 3. Backend Implementation Practices (Next.js API Routes Context)
        </h3>
        <p>
          When implementing this in a Next.js API route:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use a library to handle multipart form data parsing securely (e.g., <code>formidable</code> or <code>multer</code> if using Express within a custom server, although Next.js built-in API routes can handle standard file uploads via <code>request.body</code> with proper configuration and streaming).
          </li>
          <li>
            Access the file data from the request body. It will typically be a <code>File</code> object or similar representation.
          </li>
          <li>
            Perform all validation steps (type, size, content parsing, schema validation) *before* saving the file permanently or processing its contents extensively.
          </li>
          <li>
            Example structure for an API route handler:
          </li>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium">Conceptual API Route Handler Sketch:</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable'; // Example parsing library
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
// Assume a JSON schema validator library is used, e.g., 'zod'
// import { z } from 'zod';

// Define your expected JSON schema (example)
// const YourJsonSchema = z.object({
//   users: z.array(z.object({
//     id: z.number(),
//     name: z.string(),
//     email: z.string().email(),
//   })),
//   settings: z.record(z.any()).optional(),
// });

// Configure the form parsing
export const config = {
  api: {
    bodyParser: false, // Disable built-in bodyParser to handle file uploads
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(\`Method \${req.method} Not Allowed\`);
  }

  const form = new IncomingForm({
    multiples: false, // Assuming only one file upload
    maxFileSize: 5 * 1024 * 1024, // 5MB limit (example)
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      if (err.message.includes('maxFileSize exceeded')) {
         return res.status(413).json({ message: 'File size exceeded limit.' });
      }
      return res.status(500).json({ message: 'Error processing file upload.' });
    }

    const uploadedFile = Array.isArray(files.jsonFile) ? files.jsonFile[0] : files.jsonFile;

    if (!uploadedFile) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // --- Security Validation Steps ---

    // 1. Check MIME Type (can be spoofed, but good initial check)
    if (uploadedFile.mimetype !== 'application/json') {
      // Also check for common variations like text/json if expected
      return res.status(400).json({ message: \`Invalid file type: \${uploadedFile.mimetype}. Expected application/json.\` });
    }

    // 2. Check File Extension (also can be spoofed)
    const fileExtension = path.extname(uploadedFile.originalFilename || '').toLowerCase();
    if (fileExtension !== '.json') {
       return res.status(400).json({ message: \`Invalid file extension: \${fileExtension}. Expected .json.\` });
    }

    // 3. Read File Content and Parse JSON
    let fileContent: string;
    try {
      fileContent = await fs.readFile(uploadedFile.filepath, 'utf-8');
    } catch (readErr) {
      console.error('Error reading uploaded file:', readErr);
      return res.status(500).json({ message: 'Error reading file content.' });
    }

    let jsonData: any;
    try {
      // Use a secure parser if needed, though JSON.parse is generally robust for standard JSON
      jsonData = JSON.parse(fileContent);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return res.status(400).json({ message: 'Invalid JSON format.' });
    }

    // 4. Validate JSON Structure/Schema
    try {
      // Example using Zod (requires YourJsonSchema definition)
      // YourJsonSchema.parse(jsonData);
      console.log("JSON structure is valid according to schema (conceptual).");

      // --- Additional JSON-specific checks ---
      // Example: Check for excessive nesting (simple, not perfect)
      // function checkDepth(obj: any, depth: number): boolean {
      //   if (depth > 100) return false; // Example max depth
      //   if (typeof obj === 'object' && obj !== null) {
      //     for (const key in obj) {
      //       if (!checkDepth(obj[key], depth + 1)) return false;
      //     }
      //   } else if (Array.isArray(obj)) {
      //     for (const item of obj) {
      //        if (!checkDepth(item, depth + 1)) return false;
      //     }
      //   }
      //   return true;
      // }
      // if (!checkDepth(jsonData, 0)) {
      //    return res.status(400).json({ message: 'JSON structure is too deeply nested.' });
      // }

      // Example: Limit array size
      // if (Array.isArray(jsonData) && jsonData.length > 10000) {
      //    return res.status(400).json({ message: 'JSON array is too large.' });
      // }

      // Add other checks based on your schema/requirements (e.g., check specific value ranges)

    } catch (validationErr) {
      console.error('JSON schema validation failed:', validationErr);
      // Example using Zod error formatting:
      // if (validationErr instanceof z.ZodError) {
      //   return res.status(400).json({ message: 'JSON data does not match expected schema.', errors: validationErr.errors });
      // }
      return res.status(400).json({ message: 'JSON data does not match expected schema.' });
    }

    // --- End Security Validation Steps ---

    // 5. Process the validated JSON data
    // You can now safely use the 'jsonData' variable,
    // e.g., insert it into a database, process it in memory, etc.
    console.log('Validated JSON data ready for processing:', jsonData);

    // Optional: Clean up the temporary uploaded file
    try {
      await fs.unlink(uploadedFile.filepath);
    } catch (cleanupErr) {
      console.warn('Could not delete temporary file:', cleanupErr);
      // Continue, as the main task (processing) was successful
    }

    // Respond to the client
    res.status(200).json({ message: 'JSON file processed successfully.', data: jsonData });
  });
}
`}
              </pre>
            </div>
          </div>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" /> 4. Additional Security Layers
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong className="font-medium flex items-center gap-2"><Lock className="w-4 h-4" /> Authentication and Authorization:</strong> Ensure only authenticated and authorized users can access the upload feature.
          </li>
          <li>
            <strong className="font-medium flex items-center gap-2"><Scale className="w-4 h-4" /> Rate Limiting:</strong> Implement rate limiting on the upload endpoint to prevent DoS attacks via mass file uploads.
          </li>
          <li>
            <strong className="font-medium flex items-center gap-2"><Shield className="w-4 h-4" /> CSRF Protection:</strong> Protect your upload endpoint against Cross-Site Request Forgery attacks.
          </li>
          <li>
            <strong className="font-medium flex items-center gap-2"><Activity className="w-4 h-4" /> Logging and Monitoring:</strong> Log file upload attempts, including metadata like source IP, filename, size, and status (success/failure/validation error). Monitor these logs for suspicious activity.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-blue-500" /> Summary of Secure JSON Upload Handling
        </h2>
        <p>
          Securing JSON file uploads involves a multi-layered approach, focusing heavily on server-side validation and secure handling of the file throughout its lifecycle.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong className="font-medium">Never trust the client.</strong> All validation must happen on the server.</li>
          <li>Validate <strong className="font-medium">file type</strong> (MIME and extension).</li>
          <li>Enforce <strong className="font-medium">file size</strong> limits.</li>
          <li>Parse the file content as JSON and perform <strong className="font-medium">schema/structure validation</strong>.</li>
          <li><strong className="font-medium">Sanitize or generate secure filenames</strong>; never use the user-provided name directly.</li>
          <li>Store uploaded files <strong className="font-medium">outside the web-accessible root</strong>.</li>
          <li>Implement <strong className="font-medium">authentication, authorization, and rate limiting</strong>.</li>
          <li><strong className="font-medium">Log</strong> all upload attempts and outcomes.</li>
        </ul>

        <p>
          By following these practices, you can significantly mitigate the risks associated with JSON file upload features, ensuring the integrity and security of your application and its data.
        </p>
      </div>
    </>
  );
}
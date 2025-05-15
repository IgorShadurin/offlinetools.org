import type { Metadata } from "next";
import { File, Lock, Trash2, AlertTriangle, Folder, Code, Key } from "lucide-react";

export const metadata: Metadata = {
  title: "Secure Temporary File Handling in JSON Processing",
  description:
    "Learn how to securely handle temporary files when processing JSON data on the server side, focusing on Node.js environments.",
};

export default function SecureTempJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Lock className="mr-3 w-8 h-8 text-blue-600" />
        Secure Temporary File Handling in JSON Processing
      </h1>

      <div className="space-y-6">
        <p>
          Processing large or sensitive JSON data often requires writing it to temporary storage before it can be fully processed or transferred. While convenient, mishandling temporary files can introduce significant security vulnerabilities, including data leakage, denial-of-service attacks, and unauthorized code execution. This page explores secure practices for managing temporary files specifically in the context of server-side JSON processing, focusing on Node.js environments like those used in Next.js API routes or backend services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <File className="mr-2 w-6 h-6 text-green-600" />
          Why Temporary Files for JSON?
        </h2>
        <p>
          Several scenarios necessitate the use of temporary files when dealing with JSON:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Large Data Volumes:</strong> Reading extremely large JSON files directly into memory can consume excessive resources and lead to crashes. Streaming the data to a temporary file allows processing chunks or using file-based parsers.
          </li>
          <li>
            <strong>Streaming Inputs:</strong> Handling incoming JSON data as a stream (e.g., from an HTTP request body) often requires accumulating it before parsing. Writing the stream to a temp file is a robust approach, especially for large inputs.
          </li>
          <li>
            <strong>Sensitive Data:</strong> While counter-intuitive, writing sensitive data to a *properly secured* temporary file can sometimes be safer than keeping it in memory for extended periods, particularly if the memory is subject to introspection (though this depends heavily on the threat model and environment). More commonly, temporary files are used to pass sensitive data between isolated processes securely.
          </li>
          <li>
            <strong>Intermediate Processing:</strong> When transforming or manipulating JSON in stages, saving intermediate results to a file can manage memory usage and allow for retry mechanisms.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 w-6 h-6 text-red-600" />
          Security Risks of Mishandling
        </h2>
        <p>
          Poor temporary file handling can lead to serious security flaws:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Data Leakage:</strong> If temp files are created in world-readable directories, use predictable names, or are not properly deleted, other users or processes on the system might access sensitive information.
          </li>
          <li>
            <strong>Race Conditions (TOCTOU - Time-of-Check to Time-of-Use):</strong> An attacker might predict a temporary filename, create a symbolic link (`symlink`) pointing to a critical system file (like `/etc/passwd` or configuration files), and if the application then writes sensitive data *through* that symlink, the critical file gets overwritten. Or, if the application tries to delete a file by a predictable name, an attacker might quickly replace the intended file with a symlink to a critical file just before the `unlink` call, causing the application to delete the wrong file.
          </li>
          <li>
            <strong>Denial of Service (DoS):</strong> An attacker could fill up the temporary directory with large files, consuming disk space and preventing legitimate operations. Predictable filenames or directories can exacerbate this.
          </li>
          <li>
            <strong>Code Injection:</strong> While less direct, if a temp file name or its content is influenced by user input and then used in a command executed by the system (e.g., shell execution), it could lead to injection attacks.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Key className="mr-2 w-6 h-6 text-yellow-600" />
          Principles of Secure Handling
        </h2>
        <p>
          Follow these principles to minimize risks:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Use Secure APIs:</strong> Avoid building temporary file paths manually using predictable information like process IDs or timestamps. Use built-in functions designed for secure temporary file creation.
          </li>
          <li>
            <strong>Unique and Unpredictable Names:</strong> Temporary file and directory names should be unique per usage and difficult for an attacker to guess or predict.
          </li>
          <li>
            <strong>Appropriate Permissions:</strong> Restrict file permissions so that only the owning process/user can read or write the temporary file.
          </li>
          <li>
            <strong>Dedicated Temporary Directories:</strong> Create temporary files within a directory exclusively created for the current operation or process, rather than directly in a shared system-wide `/tmp`. This helps mitigate symlink attacks.
          </li>
          <li>
            <strong>Guaranteed Cleanup:</strong> Always delete temporary files and directories when you are finished with them, even if errors occur during processing.
          </li>
          <li>
            <strong>Avoid User Input in Paths:</strong> Never construct temporary file paths or names directly using user-provided input.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 w-6 h-6 text-purple-600" />
          Secure Practices in Node.js
        </h2>
        <p>
          Node.js provides built-in modules that offer secure ways to handle temporary files. The key is using functions like <code className="font-mono text-sm">fs.mkdtemp()</code> or <code className="font-mono text-sm">fs.mkdtempSync()</code> and managing cleanup carefully.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Folder className="mr-2 w-5 h-5 text-blue-500" />
          Creating a Secure Temporary Directory
        </h3>
        <p>
          Creating a temporary directory first is the most secure approach. You then create files *inside* this unique, permission-controlled directory. This prevents symlink attacks that target the creation step of the file itself.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Creating a temp directory (Async)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

async function processJsonSecurely(jsonData: any) {
  let tempDirPath: string | undefined;
  try {
    // 1. Create a unique temporary directory
    //    The 'prefix' helps identify the directory's purpose.
    //    Node.js ensures the random string makes it unique and unpredictable.
    tempDirPath = await fs.mkdtemp(path.join(os.tmpdir(), 'json-process-'));
    console.log(\`Created temp directory: \${tempDirPath}\`);

    const tempFilePath = path.join(tempDirPath, 'data.json');

    // 2. Write data to a file inside the secure temp directory
    //    Use appropriate encoding.
    await fs.writeFile(tempFilePath, JSON.stringify(jsonData), 'utf8');
    console.log(\`Wrote data to temp file: \${tempFilePath}\`);

    // --- Processing logic goes here ---
    // Read data from the temp file if needed
    const fileContent = await fs.readFile(tempFilePath, 'utf8');
    const processedData = JSON.parse(fileContent);
    console.log('Processed data:', processedData);
    // ---------------------------------

  } catch (error) {
    console.error('Error during secure JSON processing:', error);
    // Rethrow the error after cleanup
    throw error;
  } finally {
    // 3. **Crucially:** Clean up the temporary directory and its contents
    if (tempDirPath) {
      try {
        // Use recursive option to delete directory and all files inside
        await fs.rm(tempDirPath, { recursive: true, force: true });
        console.log(\`Cleaned up temp directory: \${tempDirPath}\`);
      } catch (cleanupError) {
        console.error('Error during temp directory cleanup:', cleanupError);
        // Log the cleanup error but don't hide the original error if there was one
      }
    }
  }
}

// Example Usage (in an async function or top-level await):
// const myJsonData = { user: 'test', id: 123, sensitive: 'hidden info' };
// processJsonSecurely(myJsonData)
//   .then(() => console.log('Processing complete.'))
//   .catch(err => console.error('Processing failed.'));
`}
            </pre>
          </div>
        </div>
        <p>
          The <code className="font-mono text-sm">os.tmpdir()</code> function provides the default directory for temporary files on the operating system, which is a standard and expected location. <code className="font-mono text-sm">fs.mkdtemp()</code> takes this base path and a prefix, then appends a series of random characters to create a unique directory name. It also sets appropriate permissions so only the current user can access it.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Trash2 className="mr-2 w-5 h-5 text-red-500" />
          Guaranteed Cleanup with <code className="font-mono text-sm">try...finally</code>
        </h3>
        <p>
          The <code className="font-mono text-sm">finally</code> block is essential for cleanup. Code within <code className="font-mono text-sm">finally</code> is guaranteed to run whether the <code className="font-mono text-sm">try</code> block completes successfully or an error is thrown. This ensures temporary files are removed even if your processing logic fails.
        </p>
        <p>
          Using <code className="font-mono text-sm">fs.rm(tempDirPath, &#x7b; recursive: true, force: true &#x7d;)</code> is a robust way to delete the temporary directory and all its contents. The <code className="font-mono text-sm">recursive: true</code> option handles non-empty directories, and <code className="font-mono text-sm">force: true</code> ignores errors like non-existent files if cleanup is attempted multiple times (though less likely with <code className="font-mono text-sm">finally</code>, it adds resilience).
        </p>

        <h3 className="text-xl font-semibold mt-6">Synchronous Alternative</h3>
        <p>
          For simpler scripts or cases where asynchronous operations are not suitable, synchronous versions exist: <code className="font-mono text-sm">fs.mkdtempSync()</code>, <code className="font-mono text-sm">fs.writeFileSync()</code>, <code className="font-mono text-sm">fs.readFileSync()</code>, and <code className="font-mono text-sm">fs.rmSync()</code>. Remember that synchronous operations block the Node.js event loop and should be used with caution in servers handling multiple requests.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Creating a temp directory (Sync)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import * as fs from 'fs'; // Note: synchronous API from 'fs'
import * as path from 'path';
import * as os from 'os';

function processJsonSecurelySync(jsonData: any) {
  let tempDirPath: string | undefined;
  try {
    tempDirPath = fs.mkdtempSync(path.join(os.tmpdir(), 'json-process-sync-'));
    console.log(\`Created temp directory (sync): \${tempDirPath}\`);

    const tempFilePath = path.join(tempDirPath, 'data.json');
    fs.writeFileSync(tempFilePath, JSON.stringify(jsonData), 'utf8');
    console.log(\`Wrote data to temp file (sync): \${tempFilePath}\`);

    // --- Processing logic ---
    const fileContent = fs.readFileSync(tempFilePath, 'utf8');
    const processedData = JSON.parse(fileContent);
    console.log('Processed data (sync):', processedData);
    // ------------------------

  } catch (error) {
    console.error('Error during secure JSON processing (sync):', error);
    throw error;
  } finally {
    if (tempDirPath) {
      try {
        fs.rmSync(tempDirPath, { recursive: true, force: true });
        console.log(\`Cleaned up temp directory (sync): \${tempDirPath}\`);
      } catch (cleanupError) {
        console.error('Error during temp directory cleanup (sync):', cleanupError);
      }
    }
  }
}

// Example Usage:
// const myJsonData = { user: 'sync_test', value: 456 };
// try {
//   processJsonSecurelySync(myJsonData);
//   console.log('Processing complete (sync).');
// } catch (err) {
//   console.error('Processing failed (sync).');
// }
`}
            </pre>
          </div>
        </div>


        <h3 className="text-xl font-semibold mt-6">Single Temporary File (Less Recommended)</h3>
        <p>
          While possible to create just a single temporary file directly using libraries like <code className="font-mono text-sm">tmp</code> (which provides secure unique names and cleanup utilities), the approach of creating a temporary directory first and then placing files inside it is generally more robust against specific types of symlink attacks that might target the initial file creation. If you *must* create a single file directly, use a dedicated, security-focused library. Avoid `fs.open()` or `fs.writeFile()` with manually constructed paths in `/tmp`.
        </p>
        <p>
          Node.js v14 introduced <code className="font-mono text-sm">fs.open()</code> with flags like <code className="font-mono text-sm">'wx+'</code> and modes which, when combined with a securely generated unique path (like from a library or by mimicking <code className="font-mono text-sm">mkdtemp</code>'s naming), can be used securely. However, relying on <code className="font-mono text-sm">mkdtemp</code> is simpler and less error-prone for most cases.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          <AlertTriangle className="mr-2 w-6 h-6 text-red-600" />
          Important Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Error Handling During Write:</strong> Ensure that errors during the file writing process (e.g., disk full) are caught and handled, and that cleanup still occurs.
          </li>
          <li>
            <strong>Insufficient Disk Space:</strong> Processing large JSON can fill up the temporary directory's partition. Implement checks for available space if this is a potential issue.
          </li>
          <li>
            <strong>Permissions:</strong> While `mkdtemp` sets secure default permissions (typically 0o700, meaning read/write/execute only for the owner), be mindful of the process's user ID and ensure it has write access to the base temporary directory (<code className="font-mono text-sm">os.tmpdir()</code>).
          </li>
          <li>
            <strong>Sensitive Data & Encryption:</strong> For highly sensitive data, consider encrypting the contents of the temporary file. This adds complexity but provides an extra layer of protection if the file system itself is compromised. The encryption key management then becomes critical.
          </li>
          <li>
            <strong>Alternatives:</strong> For smaller amounts of JSON or non-streaming inputs, consider processing data purely in memory to avoid temporary files altogether. This removes file-based risks but increases memory usage.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Handling temporary files is often unavoidable when processing JSON, especially large datasets or streams in a backend environment. The key to doing so securely in Node.js lies in leveraging built-in functions like <code className="font-mono text-sm">fs.mkdtemp()</code> to create unique, permission-controlled directories and absolutely guaranteeing cleanup using <code className="font-mono text-sm">try...finally</code> blocks. By following these principles, developers can significantly reduce the attack surface associated with temporary storage and protect the integrity and confidentiality of their data processing pipelines. Always remember: cleanup is not optional.
        </p>
      </div>
    </>
  );
}

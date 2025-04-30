"use client"

import React from "react"

export default function FileGeneratorExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <h2 className="text-2xl font-bold mb-4">About File Generator</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Tool Capabilities</h3>
          <p className="mb-2">
            The File Generator tool allows you to create files of any size from 1KB to 10GB with precise control over the file&apos;s content and format. It writes data directly to disk with minimal memory usage, making it possible to generate large files even on devices with limited resources.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Generate files from 1KB to 10GB in size</li>
            <li>Choose between random data, zeros, or custom hex patterns</li>
            <li>Set custom filename and extension</li>
            <li>Files are generated using streaming technology that writes directly to disk</li>
            <li>Real-time progress tracking during generation</li>
            <li>Create and share links that pre-fill the generator with specific settings</li>
            <li>Works completely offline after initial page load</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Common Use Cases</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Testing File Uploads</strong>
              <p>Generate files of specific sizes to test file upload limits on websites, services, or APIs.</p>
            </li>
            
            <li>
              <strong>Database Testing</strong>
              <p>Create test files to validate database storage and retrieval mechanisms for files of various sizes.</p>
            </li>
            
            <li>
              <strong>Network Testing</strong>
              <p>Generate files to measure network throughput, test download/upload speeds, or benchmark file transfer capabilities.</p>
            </li>
            
            <li>
              <strong>Storage Testing</strong>
              <p>Create files to test storage capacity, file system limitations, or benchmark disk performance.</p>
            </li>
            
            <li>
              <strong>Security Testing</strong>
              <p>Generate files with specific patterns to test file validation mechanisms or perform fuzz testing on applications.</p>
            </li>
            
            <li>
              <strong>Compression Testing</strong>
              <p>Create files with different data patterns (random vs. zeros) to test compression algorithms and ratios.</p>
            </li>
            
            <li>
              <strong>Memory Testing</strong>
              <p>Generate large files to test how applications handle memory constraints when processing large data sets.</p>
            </li>
            
            <li>
              <strong>Application Stress Testing</strong>
              <p>Create files of increasing sizes to identify at what point applications or services begin to degrade in performance.</p>
            </li>
            
            <li>
              <strong>Template Generation</strong>
              <p>Create binary files with specific hex patterns as templates for custom file formats or as starting points for data recovery.</p>
            </li>
            
            <li>
              <strong>Teaching and Demonstrations</strong>
              <p>Generate files to demonstrate concepts like file sizes, data representation, or to use in educational contexts about storage and computing.</p>
            </li>
          </ol>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Technical Details</h3>
          <p>
            Files are generated using a streaming approach that writes data directly to disk in small chunks. This allows the generation of very large files without consuming equivalent amounts of memory. The tool uses the File System Access API when available for a better user experience, and falls back to traditional download methods in unsupported browsers.
          </p>
        </div>
      </div>
    </div>
  )
} 
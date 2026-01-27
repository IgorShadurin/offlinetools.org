"use client";

import React from "react";
import {
  FileArchive,
  FileAudio,
  FileCode,
  FileImage,
  FileJson,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Presentation,
  Upload,
  Database,
  Network,
  HardDrive,
  ShieldCheck,
  MemoryStick,
  Activity,
  GraduationCap,
} from "lucide-react";

export default function FileGeneratorExplanation() {
  return (
    <div className="space-y-8">
      <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
        <h2 className="text-2xl font-bold mb-4">About File Generator</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Tool Capabilities</h3>
            <p className="mb-2">
              The File Generator tool allows you to create files of any size from 1KB to 10GB with precise control over
              the file&apos;s content and format. It writes data directly to disk with minimal memory usage, making it
              possible to generate large files even on devices with limited resources.
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
            <ul className="space-y-3">
              <li>
                <div className="flex items-start gap-2">
                  <Upload className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <strong>Testing File Uploads</strong>
                    <p>Generate files of specific sizes to test file upload limits on websites, services, or APIs.</p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-2">
                  <Database className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <strong>Database Testing</strong>
                    <p>Create test files to validate database storage and retrieval mechanisms for files of various sizes.</p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-2">
                  <Network className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <strong>Network Testing</strong>
                    <p>
                      Generate files to measure network throughput, test download/upload speeds, or benchmark file transfer
                      capabilities.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-2">
                  <HardDrive className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <strong>Storage Testing</strong>
                    <p>Create files to test storage capacity, file system limitations, or benchmark disk performance.</p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <strong>Security Testing</strong>
                    <p>
                      Generate files with specific patterns to test file validation mechanisms or perform fuzz testing on
                      applications.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-2">
                  <FileArchive className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <strong>Compression Testing</strong>
                    <p>
                      Create files with different data patterns (random vs. zeros) to test compression algorithms and ratios.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-2">
                  <MemoryStick className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <strong>Memory Testing</strong>
                    <p>
                      Generate large files to test how applications handle memory constraints when processing large data sets.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-2">
                  <Activity className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <strong>Application Stress Testing</strong>
                    <p>
                      Create files of increasing sizes to identify at what point applications or services begin to degrade in
                      performance.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-2">
                  <FileCode className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <strong>Template Generation</strong>
                    <p>
                      Create binary files with specific hex patterns as templates for custom file formats or as starting
                      points for data recovery.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-2">
                  <GraduationCap className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <strong>Teaching and Demonstrations</strong>
                    <p>
                      Generate files to demonstrate concepts like file sizes, data representation, or to use in educational
                      contexts about storage and computing.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Technical Details</h3>
            <p>
              Files are generated using a streaming approach that writes data directly to disk in small chunks. This
              allows the generation of very large files without consuming equivalent amounts of memory. The tool uses the
              File System Access API when available for a better user experience, and falls back to traditional download
              methods in unsupported browsers.
            </p>
          </div>
        </div>
      </div>

      <section className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Popular Formats and Example Usage</h2>
        <p className="mb-4">
          These examples cover 20 of the most common file types you might need to test. The generator only creates a
          file with the correct extension and dummy data inside, so the file will not be a valid, playable, or
          parseable format. This is ideal for testing upload rules, size limits, file naming, and workflow handling.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.PDF</span>
            </p>
            <p>Portable document format for sharing fixed-layout documents. Use it to test document uploads or PDF-only rules.</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.DOCX</span>
            </p>
            <p>Microsoft Word document format. Use it to test office document validation or conversion workflows.</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileSpreadsheet className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.XLSX</span>
            </p>
            <p>Microsoft Excel spreadsheet format. Use it to test spreadsheet imports and size limits.</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <Presentation className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.PPTX</span>
            </p>
            <p>Microsoft PowerPoint presentation format. Use it to test slide deck uploads and previews.</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.TXT</span>
            </p>
            <p>Plain text file. Use it to test basic file handling, logs, or simple text attachments.</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileSpreadsheet className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.CSV</span>
            </p>
            <p>Comma-separated values for tabular data. Use it to test data import flows and CSV validation.</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileJson className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.JSON</span>
            </p>
            <p>Structured data format for configs and APIs. Use it to test JSON upload rules or file-based configs.</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileCode className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.XML</span>
            </p>
            <p>Markup format for structured data exchange. Use it to test integrations that expect XML files.</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileCode className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.HTML</span>
            </p>
            <p>Web page markup format. Use it to test HTML file uploads or sanitization workflows.</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileVideo className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.MP4</span>
            </p>
            <p>
              Common video container format. Use it to test media uploads, size limits, or video workflow triggers. For
              real AI-generated video content, create an actual MP4 on{" "}
              <a
                href="https://yumcut.com/?utm_source=offlinetools.org-file-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                YumCut
              </a>
              .
            </p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileVideo className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.MOV</span>
            </p>
            <p>
              QuickTime video container format. Use it to test Apple-centric video acceptance rules. For real AI-generated
              video content, create an actual MOV on{" "}
              <a
                href="https://yumcut.com/?utm_source=offlinetools.org-file-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                YumCut
              </a>
              .
            </p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileAudio className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.MP3</span>
            </p>
            <p>
              Compressed audio format. Use it to test audio uploads, metadata checks, or playback pipelines. If you need
              to mix real audio into videos in your browser, use YumCut&apos;s Add Audio to Video tool{" "}
              <a
                href="https://yumcut.com/tools-add-audio-to-video?utm_source=offlinetools.org-file-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                here
              </a>
              .
            </p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileAudio className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.WAV</span>
            </p>
            <p>
              Uncompressed audio format. Use it to test large audio files and high-bitrate handling. If you need to mix
              real audio into videos in your browser, use YumCut&apos;s Add Audio to Video tool{" "}
              <a
                href="https://yumcut.com/tools-add-audio-to-video?utm_source=offlinetools.org-file-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                here
              </a>
              .
            </p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileImage className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.JPG</span>
            </p>
            <p>
              Compressed photo format. Use it to test image uploads, resizing, and thumbnail creation. Need a real image
              sample? Generate a realistic fake text message screenshot on{" "}
              <a
                href="https://textfaker.com/?utm_source=offlinetools.org-file-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                TextFaker
              </a>
              , then download the image.
            </p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileImage className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.PNG</span>
            </p>
            <p>
              Lossless image format with transparency. Use it to test transparency handling or asset pipelines. Need a real
              image sample? Generate a realistic fake text message screenshot on{" "}
              <a
                href="https://textfaker.com/?utm_source=offlinetools.org-file-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                TextFaker
              </a>
              , then download the image.
            </p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileImage className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.GIF</span>
            </p>
            <p>
              Image format that supports animation. Use it to test animated image uploads or previews. Need a real image
              sample? Generate a realistic fake text message screenshot on{" "}
              <a
                href="https://textfaker.com/?utm_source=offlinetools.org-file-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                TextFaker
              </a>
              , then download the image.
            </p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileImage className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.SVG</span>
            </p>
            <p>
              Vector image format. Use it to test vector rendering or SVG sanitization rules. Need a real image sample?
              Generate a realistic fake text message screenshot on{" "}
              <a
                href="https://textfaker.com/?utm_source=offlinetools.org-file-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                TextFaker
              </a>
              , then download the image.
            </p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileArchive className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.ZIP</span>
            </p>
            <p>Compressed archive format. Use it to test archive uploads and file-type detection.</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileArchive className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.7Z</span>
            </p>
            <p>High-compression archive format. Use it to test alternative archive handling.</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="flex items-center gap-2 font-semibold">
              <FileArchive className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>.RAR</span>
            </p>
            <p>Archive format used for bundled files. Use it to test rar acceptance and scanning workflows.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

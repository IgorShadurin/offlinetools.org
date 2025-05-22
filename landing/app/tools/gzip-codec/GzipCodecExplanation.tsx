export function GzipCodecExplanation() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold mb-3">About the Gzip Codec Tool</h2>
        <p className="text-muted-foreground">
          This Gzip Codec tool allows you to compress data into the Gzip format (a process called "packing") 
          and decompress Gzip files back to their original form ("extracting"). It's designed to work 
          efficiently with both text input and files directly in your browser, ensuring your data remains local.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Key Features</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Compress (pack) text or entire files into Gzip format (.gz).</li>
          <li>Decompress (extract) <code>.gz</code> files to retrieve their original content.</li>
          <li>All processing is done client-side in your browser, ensuring speed and data privacy.</li>
          <li>Easily download the compressed Gzip file or the extracted text content.</li>
          <li>Supports direct text input for quick compression tasks.</li>
          <li>Handles binary file data for both compression and decompression.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Common Use Cases</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>
            <strong>Reducing File Size:</strong> Compress log files, text data, JSON, XML, or other non-binary 
            assets before storage or network transfer to save space and bandwidth.
          </li>
          <li>
            <strong>Web Performance:</strong> While web servers typically handle Gzip compression for websites automatically, 
            this tool can help developers manually compress assets or understand the Gzip process.
          </li>
          <li>
            <strong>Preparing Email Attachments:</strong> Make files smaller before attaching them to emails, 
            respecting recipient inbox size limits and reducing transfer times.
          </li>
          <li>
            <strong>Data Archiving:</strong> Compress data to save storage space when archiving large amounts of information.
          </li>
          <li>
            <strong>Transferring Files:</strong> Reduce bandwidth consumption and speed up file transfers over networks 
            by compressing data before sending.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Technical Details</h3>
        <p className="text-muted-foreground mb-2">
          Gzip is a file format and a software application used for file compression and decompression. 
          It is based on the DEFLATE algorithm, which is a combination of LZ77 and Huffman coding. 
          Gzip is widely used on Unix-like operating systems and is also a standard for HTTP compression, 
          allowing web servers to send smaller files to browsers, speeding up web page loading times.
        </p>
        <p className="text-muted-foreground">
          This tool leverages the <code className="font-mono text-sm bg-muted p-1 rounded">fflate</code> JavaScript library, 
          a highly performant library for various compression and decompression tasks in the browser. 
          All operations are performed locally on your computer; your data is not uploaded to any server, 
          ensuring your privacy and the security of your information.
        </p>
      </section>
    </div>
  );
}

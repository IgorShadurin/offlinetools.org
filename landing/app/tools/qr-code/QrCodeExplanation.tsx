import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function QrCodeExplanation() {
  return (
    <Card className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">About QR Code Generator & Scanner</CardTitle>
        <CardDescription>
          A comprehensive tool for creating and reading QR codes with advanced options
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Tool Capabilities</h3>
          <p className="mb-2">
            This tool provides a complete solution for working with QR codes, allowing you to both generate QR codes from text input and scan QR codes from images.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Generate QR codes from text, URLs, or any data</li>
            <li>Customize QR code appearance with different colors and sizes</li>
            <li>Choose from multiple error correction levels for reliability</li>
            <li>Export QR codes in SVG, PNG, or ASCII art formats</li>
            <li>Scan and decode QR codes from uploaded images</li>
            <li>Automatically detect and handle URLs in scanned QR codes</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Common Use Cases</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Website URLs</strong>
              <p>Create QR codes that link to your website or specific web pages, making it easy for users to access your online content without typing URLs.</p>
            </li>
            <li>
              <strong>Contact Information</strong>
              <p>Generate QR codes containing contact details (vCard format) that can be scanned to instantly add a new contact to a phone.</p>
            </li>
            <li>
              <strong>Wi-Fi Network Access</strong>
              <p>Create QR codes with Wi-Fi network credentials that allow users to connect to your network by simply scanning the code.</p>
            </li>
            <li>
              <strong>Product Information</strong>
              <p>Embed product details, specifications, or instructions in QR codes that can be placed on packaging or documentation.</p>
            </li>
            <li>
              <strong>Event Tickets</strong>
              <p>Generate QR codes for event tickets or registrations that can be scanned for verification at entry points.</p>
            </li>
            <li>
              <strong>Digital Payments</strong>
              <p>Create QR codes for payment information to facilitate contactless transactions and digital payments.</p>
            </li>
            <li>
              <strong>Inventory Management</strong>
              <p>Use QR codes to track inventory items, assets, or equipment by encoding unique identifiers that can be quickly scanned.</p>
            </li>
            <li>
              <strong>Document Verification</strong>
              <p>Add QR codes to documents for authentication or to provide access to digital versions of physical documents.</p>
            </li>
          </ol>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Technical Details</h3>
          <p className="mb-2">
            QR codes (Quick Response codes) are two-dimensional barcodes that can store various types of data. Here are some technical aspects of our implementation:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Error Correction Levels:</strong> QR codes include error correction capabilities that allow them to be read even when partially damaged or obscured. We offer four levels:
              <ul className="list-disc pl-6 mt-1">
                <li>Low (L): ~7% of codewords can be restored</li>
                <li>Medium (M): ~15% of codewords can be restored</li>
                <li>Quartile (Q): ~25% of codewords can be restored</li>
                <li>High (H): ~30% of codewords can be restored</li>
              </ul>
            </li>
            <li>
              <strong>QR Code Versions:</strong> Our implementation automatically selects the appropriate QR code version (1-40) based on the amount of data being encoded.
            </li>
            <li>
              <strong>Data Capacity:</strong> Depending on the character type and error correction level, QR codes can store:
              <ul className="list-disc pl-6 mt-1">
                <li>Numeric data: up to 7,089 characters</li>
                <li>Alphanumeric data: up to 4,296 characters</li>
                <li>Binary data: up to 2,953 bytes</li>
              </ul>
            </li>
            <li>
              <strong>Output Formats:</strong> We support multiple output formats to suit different needs:
              <ul className="list-disc pl-6 mt-1">
                <li>SVG: Scalable Vector Graphics for high-quality, resolution-independent QR codes</li>
                <li>PNG (Data URL): Raster image format suitable for web use</li>
                <li>ASCII Art: Text-based representation for terminal or plain text environments</li>
              </ul>
            </li>
            <li>
              <strong>Scanning Implementation:</strong> Our QR code scanner uses advanced image processing techniques to detect and decode QR codes from uploaded images.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

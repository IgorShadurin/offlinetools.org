import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Key, Lock, FileText, AlertTriangle, CheckCircle } from "lucide-react";

export default function DataEncryptorExplanation() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Understanding Data Encryption</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Learn how our Data Encryptor protects your sensitive information using industry-standard encryption methods.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              AES-256-CBC Encryption
            </CardTitle>
            <CardDescription>
              Military-grade encryption standard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Advanced Encryption Standard (AES) with 256-bit keys in Cipher Block Chaining (CBC) mode. 
              This is the same encryption standard used by governments and financial institutions worldwide.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-green-600" />
              PBKDF2 Key Derivation
            </CardTitle>
            <CardDescription>
              Secure password-based encryption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Password-Based Key Derivation Function 2 (PBKDF2) with 100,000 iterations and random salt. 
              This makes brute-force attacks computationally expensive and protects against rainbow table attacks.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-purple-600" />
              Client-Side Processing
            </CardTitle>
            <CardDescription>
              Your data never leaves your browser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All encryption and decryption happens locally in your browser using the Web Crypto API. 
              Your sensitive data and passwords are never transmitted to our servers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              Text &amp; File Support
            </CardTitle>
            <CardDescription>
              Encrypt any type of content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Encrypt plain text messages, documents, images, or any other file type. 
              The encrypted output is Base64 encoded for easy sharing and storage.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-teal-600" />
              Format Compatibility
            </CardTitle>
            <CardDescription>
              Standard encryption format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Output format: salt:iv:encryptedData (all Base64 encoded). 
              This standard format ensures compatibility and includes all necessary components for decryption.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Security Best Practices
            </CardTitle>
            <CardDescription>
              Important security considerations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use strong, unique passwords. Store encrypted data and passwords separately. 
              Remember that if you lose your password, your data cannot be recovered.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Common Use Cases</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Personal Data Protection</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Encrypt sensitive documents before cloud storage</li>
              <li>• Protect personal notes and journals</li>
              <li>• Secure financial records and tax documents</li>
              <li>• Encrypt backup files and archives</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Professional Applications</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Secure client data and confidential information</li>
              <li>• Encrypt source code and intellectual property</li>
              <li>• Protect research data and analysis</li>
              <li>• Secure communication and file sharing</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              Important Security Reminders
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Choose strong passwords with a mix of letters, numbers, and symbols</li>
              <li>• Never share your encryption passwords through insecure channels</li>
              <li>• Keep encrypted data and passwords in separate, secure locations</li>
              <li>• Test decryption immediately after encryption to verify your password</li>
              <li>• Consider using a password manager for complex encryption passwords</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

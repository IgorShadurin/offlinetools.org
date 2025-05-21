export default function PasswordGeneratorExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-6">
      <h2 className="text-2xl font-bold">About Password Generator</h2>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tool Capabilities</h3>
        <p>
          The Password Generator creates strong, randomized passwords that help protect your accounts from unauthorized access.
          Our generator offers full customization of password characteristics while ensuring cryptographically secure random generation.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Customize password length from 4 to 64 characters</li>
          <li>Select character types (lowercase, uppercase, numbers, symbols)</li>
          <li>Exclude similar-looking characters to avoid confusion</li>
          <li>Exclude specific characters you don't want in your passwords</li>
          <li>Generate multiple passwords at once for batch creation</li>
          <li>Strict mode ensures at least one character from each selected type</li>
          <li>One-click copying to clipboard for convenience</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Common Use Cases</h3>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>Online Account Security</strong>
            <p>Generate unique, strong passwords for each of your online accounts to prevent credential stuffing attacks.</p>
          </li>
          <li>
            <strong>Developer Credentials</strong>
            <p>Create secure passwords for development environments, API keys, and service accounts.</p>
          </li>
          <li>
            <strong>Wi-Fi Network Setup</strong>
            <p>Generate robust passwords for wireless networks that are difficult to crack but easy to share.</p>
          </li>
          <li>
            <strong>Password Rotation</strong>
            <p>Quickly generate new passwords when rotating credentials for security compliance.</p>
          </li>
          <li>
            <strong>Default Credential Replacement</strong>
            <p>Replace default or weak passwords on new devices and software with strong alternatives.</p>
          </li>
          <li>
            <strong>Test Data Generation</strong>
            <p>Create realistic password test data for application development and testing.</p>
          </li>
          <li>
            <strong>Batch Password Creation</strong>
            <p>Generate multiple passwords at once for setting up user accounts in bulk.</p>
          </li>
          <li>
            <strong>Passphrase Creation</strong>
            <p>Use longer character sets to create memorable but secure passphrases.</p>
          </li>
        </ol>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Technical Details</h3>
        <p>
          Our password generator uses cryptographically secure random number generation to ensure unpredictability. 
          The implementation balances security with usability by:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Using a well-tested and audited password generation algorithm</li>
          <li>Ensuring uniform distribution of characters to maximize entropy</li>
          <li>Processing all generation locally without sending data to any server</li>
          <li>Providing options to make passwords both secure and usable</li>
          <li>Supporting password lengths up to 64 characters for maximum security</li>
        </ul>
        <p>
          The entropy of generated passwords depends on the character sets used and length. For example, a 12-character
          password using all character types (95 possible characters) has approximately 78 bits of entropy,
          making it resistant to brute force attacks.
        </p>
      </div>
    </div>
  );
}

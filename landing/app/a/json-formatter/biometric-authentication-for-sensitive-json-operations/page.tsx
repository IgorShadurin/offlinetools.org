import type { Metadata } from "next";
import {
  Fingerprint,
  Lock,
  ShieldCheck,
  Server,
  Code,
  Check,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Biometric Authentication for Sensitive JSON Operations | Secure Backend",
  description:
    "Learn how to integrate biometric authentication (WebAuthn) into backend processes handling sensitive JSON data.",
};

export default function BiometricAuthJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Fingerprint size={32} /> Biometric Authentication for Sensitive JSON
        Operations
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            Introduction <Lock size={24} />
          </h2>
          <p>
            In modern web applications, many critical actions involve sending or
            receiving sensitive data, often formatted as JSON. Think about
            confirming a financial transaction, updating critical user settings,
            approving a data access request, or decrypting confidential
            information transferred as JSON. These operations require a high
            level of assurance that the user performing the action is truly who
            they claim to be.
          </p>
          <p>
            Traditional password-based authentication proves identity during
            login but doesn&apos;t inherently verify the user&apos;s intent or
            presence for a specific, sensitive operation performed later in the
            session. This is where
            <strong> biometric authentication</strong> comes into play. By
            requiring a biometric verification (like a fingerprint scan or face
            recognition) right before a sensitive JSON operation is executed on
            the backend, we add a strong layer of real-time user presence and
            consent verification.
          </p>
          <p>
            This article explores how to leverage modern web standards,
            specifically the Web Authentication API (WebAuthn), to secure your
            sensitive JSON operations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            What is Biometric Authentication?
          </h2>
          <p>
            Biometric authentication uses unique biological characteristics to
            verify a person&apos;s identity. Common examples include:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Fingerprint scanning</li>
            <li>Facial recognition</li>
            <li>Iris scanning</li>
            <li>Voice recognition</li>
          </ul>
          <p className="mt-4">
            Unlike passwords, which can be forgotten, guessed, or stolen,
            biometrics are tied directly to the individual. When used correctly,
            they offer a convenient and robust method for user verification.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            The Web Authentication API (WebAuthn) <ShieldCheck size={24} />
          </h2>
          <p>
            WebAuthn is a W3C standard that allows users to authenticate to web
            applications using public-key cryptography, secured by hardware
            authenticators. These authenticators can be built into devices
            (like fingerprint readers on laptops or face scanners on phones) or
            external USB keys (like YubiKey). Crucially, WebAuthn enables
            biometric authentication directly within the browser, without
            requiring plugins or external software (beyond the OS-level
            biometric handling).
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">How WebAuthn Works</h3>
          <p>WebAuthn involves two primary operations:</p>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-800 space-y-3">
              <h4 className="text-lg font-semibold">1. Registration (Creating a Credential)</h4>
              <p>
                When a user first sets up biometric login or adds a new device,
                the browser interacts with the authenticator (e.g., triggers a
                fingerprint scan). The authenticator generates a unique public/private
                key pair for the specific website (relying party).
              </p>
              <p>
                The
                <strong>public key</strong>, along with some metadata (like a
                Credential ID), is sent back to the server and stored, associated
                with the user account. The
                <strong>private key</strong> never leaves the authenticator device.
              </p>
              <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto">
                <pre className="whitespace-pre-wrap">
                  {`// Conceptual Frontend Registration Flow
const publicKeyCredentialCreationOptions = await fetch('/api/webauthn/registration/challenge').then(res => res.json());

// Add user and relying party info (specific to WebAuthn library)
publicKeyCredentialCreationOptions.user = { ... };
publicKeyCredentialCreationOptions.rp = { ... };

try {
  const credential = await navigator.credentials.create({
    publicKey: publicKeyCredentialCreationOptions
  });
  // Send credential object back to server for verification and storage
  await fetch('/api/webauthn/registration/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credential)
  });
  console.log('Registration successful');
} catch (error) {
  console.error('Registration failed:', error);
}`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-800 space-y-3">
              <h4 className="text-lg font-semibold">2. Authentication (Signing a Challenge)</h4>
              <p>
                When a website needs to verify the user&apos;s identity or
                presence, it sends a unique, random
                <strong>challenge</strong> value to the browser.
              </p>
              <p>
                The browser requests the authenticator to sign this challenge
                using the private key associated with the user and website. This
                typically prompts the user for their biometric input. If successful,
                the authenticator returns a signed assertion.
              </p>
              <p>
                The browser sends this <strong>signed assertion</strong> (including the signature,
                challenge, and other data) back to the server. The server then
                uses the stored public key to verify the signature. If the signature is
                valid and the challenge matches the one the server issued, the
                user&apos;s presence and identity (via the device/biometric) are confirmed.
              </p>
              <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto">
                <pre className="whitespace-pre-wrap">
                  {`// Conceptual Frontend Authentication Flow
const publicKeyCredentialRequestOptions = await fetch('/api/webauthn/authentication/challenge').then(res => res.json());

try {
  const assertion = await navigator.credentials.get({
    publicKey: publicKeyCredentialRequestOptions
  });
  // Send assertion object back to server for verification
  await fetch('/api/webauthn/authentication/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assertion)
  });
  console.log('Authentication successful');
} catch (error) {
  console.error('Authentication failed:', error);
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            Why WebAuthn for JSON Operations? <Code size={24} />
          </h2>
          <p>
            Using WebAuthn authentication specifically for sensitive JSON
            operations offers significant security benefits:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>User Presence Verification:</strong> Requires the user to
              be physically present and interact with the authenticator (e.g.,
              touch the fingerprint sensor) at the moment of the sensitive
              action. This prevents actions triggered by stale sessions or
              compromised credentials elsewhere.
            </li>
            <li>
              <strong>Phishing Resistance:</strong> WebAuthn is inherently
              resistant to phishing because the authentication is tied to the
              origin (the website&apos;s domain). The authenticator will only
              work on the legitimate site.
            </li>
            <li>
              <strong>Cryptographic Proof:</strong> Verification relies on
              strong public-key cryptography, not shared secrets like passwords.
            </li>
            <li>
              <strong>Device-Bound Keys:</strong> The private key is protected
              by the hardware authenticator and the user&apos;s biometric, making
              it very difficult to extract or clone.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            Implementing the Flow <Server size={24} />
          </h2>
          <p>
            To secure a specific backend JSON operation (e.g., a
            <code>POST /api/settings/update</code> endpoint) with biometric
            authentication, you need to integrate WebAuthn into the request
            flow.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Frontend (Conceptual)</h3>
          <p>
            When the user initiates the sensitive action (e.g., clicks a
            &quot;Save Critical Settings&quot; button), the frontend performs
            the following steps:
          </p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>
              Inform the user that biometric verification is required.
            </li>
            <li>
              Request a WebAuthn authentication challenge from your backend.
              This challenge should be unique to this specific operation request.
            </li>
            <li>
              Call <code>navigator.credentials.get()</code> with the received
              challenge options. This prompts the user for their biometric.
            </li>
            <li>
              If successful, the browser returns an Authentication Assertion object.
            </li>
            <li>
              Send the original sensitive JSON payload
              <strong>along with</strong> the Authentication Assertion to your
              backend endpoint (e.g., via a single POST request or two separate
              requests).
            </li>
          </ol>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Conceptual Frontend Request with Auth:</h4>
            <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto">
              <pre className="whitespace-pre-wrap">
                {`// Assume 'sensitivePayload' is the JSON data for the operation
// Assume user's credentials (Credential ID) are known or discovered by the browser

async function performSensitiveOperationWithBiometrics(sensitivePayload: any) {
  try {
    // 1. Get challenge from backend
    const authOptions = await fetch('/api/settings/update/auth-challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Optional: Send context about the operation if needed for challenge generation
      body: JSON.stringify({ operation: 'update_settings' })
    }).then(res => res.json());

    // 2. Perform WebAuthn authentication
    const assertion = await navigator.credentials.get({
      publicKey: {
         challenge: new Uint8Array(authOptions.challenge), // Decode challenge
         allowCredentials: authOptions.allowCredentials.map((cred: any) => ({ // Use allowed credentials
           id: new Uint8Array(cred.id),
           type: cred.type,
           transports: cred.transports
         })),
         userVerification: authOptions.userVerification, // 'required', 'preferred', or 'discouraged'
         timeout: authOptions.timeout
         // rpId: authOptions.rpId // Usually required
      }
    });

    // 3. Send sensitive data AND assertion to backend
    const response = await fetch('/api/settings/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payload: sensitivePayload,
        authAssertion: { // Serialize the assertion for sending
          id: assertion.id,
          rawId: Array.from(new Uint8Array(assertion.rawId)), // Convert Uint8Array to array
          response: {
            clientDataJSON: Array.from(new Uint8Array(assertion.response.clientDataJSON)),
            authenticatorData: Array.from(new Uint8Array(assertion.response.authenticatorData)),
            signature: Array.from(new Uint8Array(assertion.response.signature)),
            userHandle: assertion.response.userHandle ? Array.from(new Uint8Array(assertion.response.userHandle)) : null,
          },
          type: assertion.type,
        }
      })
    });

    if (response.ok) {
      console.log('Sensitive operation successful and verified.');
      // Handle successful response (e.g., update UI)
    } else {
      console.error('Sensitive operation failed:', response.statusText);
      // Handle errors (e.g., display error message)
    }

  } catch (error) {
    console.error('Biometric authentication or operation failed:', error);
    // Handle errors (e.g., user cancelled biometric prompt, device error)
  }
}

// Example call (conceptual button click handler)
// const mySensitiveData = { username: 'alice', criticalSetting: true };
// performSensitiveOperationWithBiometrics(mySensitiveData);
`}
              </pre>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Note: Handling <code>Uint8Array</code> serialization/deserialization
              and WebAuthn option structures requires a WebAuthn library on both
              frontend and backend for proper implementation.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Backend Verification (Conceptual)</h3>
          <p>
            When your backend endpoint (e.g., <code>POST /api/settings/update</code>)
            receives the request containing the sensitive JSON payload AND the
            WebAuthn Authentication Assertion, it must perform rigorous
            verification steps <strong>before</strong> executing the sensitive operation:
          </p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>
              Deserialize the received Authentication Assertion.
            </li>
            <li>
              Retrieve the user&apos;s stored public key and credential data
              based on the Assertion&apos;s Credential ID.
            </li>
            <li>
              Verify that the challenge in the received assertion matches the
              challenge the server previously issued for this specific
              operation request. The server must store issued challenges
              temporarily and invalidate them after use or timeout to prevent
              replay attacks.
            </li>
            <li>
              Verify that the origin (website domain) in the assertion matches
              your expected origin.
            </li>
            <li>
              Verify the signature of the assertion using the user&apos;s stored
              public key. This step cryptographically proves that the assertion
              was signed by the legitimate authenticator.
            </li>
            <li>
              Check the authenticator data flags (e.g., ensure the &quot;User Present&quot;
              (UP) flag is set). Depending on your requirements, you might also
              check the &quot;User Verified&quot; (UV) flag if you required
              user verification (like a biometric) during the challenge request.
            </li>
            <li>
              (Optional but Recommended) Verify the signature counter. Authenticators
              increment a counter with each use. The server should store the
              last known counter value and verify that the new one is greater.
              This helps detect cloned authenticators.
            </li>
            <li>
              <strong>ONLY IF ALL VERIFICATION STEPS PASS:</strong> Execute the
              sensitive JSON operation using the provided payload.
            </li>
            <li>
              Update the stored signature counter for the user&apos;s credential.
            </li>
            <li>
              Respond to the frontend indicating success or failure.
            </li>
          </ol>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Conceptual Backend Verification Logic:</h4>
            <div className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto">
              <pre className="whitespace-pre-wrap">
                {`// Example Backend Endpoint handler (e.g., in a Next.js API route)
// POST /api/settings/update

import type { NextApiRequest, NextApiResponse } from 'next';
// import { verifyAuthenticationResponse } from '@simplewebauthn/server'; // Example library

type SensitiveOperationRequest = {
  payload: any; // The sensitive JSON data
  authAssertion: any; // The serialized WebAuthn assertion
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { payload, authAssertion }: SensitiveOperationRequest = req.body;

  if (!payload || !authAssertion) {
    return res.status(400).json({ message: 'Missing payload or authentication assertion' });
  }

  try {
    // 1. Get user & stored credential data (replace with your database lookup)
    const userId = '...'; // Get user ID from session or payload context
    const user = await getUserFromDatabase(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the credential used for this authentication attempt by ID
    const userCredential = user.webauthnCredentials.find((cred: any) => cred.credentialId === authAssertion.id);
    if (!userCredential) {
         return res.status(400).json({ message: 'Credential not registered for user' });
    }

    // 2. Get the challenge that was issued for THIS specific operation request
    // This challenge must have been stored temporarily, linked to the user and request intent
    const expectedChallenge = await getStoredChallenge(userId, 'update_settings');
    if (!expectedChallenge) {
        return res.status(400).json({ message: 'No valid challenge found for this operation' });
    }

    // 3. Define verification options (replace with your relying party settings)
    const rpId = process.env.WEBAUTHN_RP_ID || 'localhost'; // Your website domain
    const origin = \`https://\${rpId}\`; // Or http://localhost:port

    // NOTE: Replace with actual library function call and necessary parameters
    // Example using conceptual verifyAuthenticationResponse:
    /*
    const verification = await verifyAuthenticationResponse({
       assertion: authAssertion,
       expectedChallenge: expectedChallenge,
       expectedOrigin: origin,
       expectedRPID: rpId,
       authenticator: {
           credentialPublicKey: userCredential.publicKey, // Your stored key
           credentialID: userCredential.credentialId,
           counter: userCredential.counter, // Stored signature counter
       },
       requireUserVerification: true // Match what you requested on the frontend
    });

    const { verified, authenticationInfo } = verification; // Assuming structure from a library
    */

    // --- Dummy verification logic for demonstration ---
    // In a real app, replace the block above and below this with library call
    const verified = true; // ASSUME VERIFIED FOR DEMO PURPOSES
    const authenticationInfo = { newCounter: userCredential.counter + 1 }; // Dummy counter update

    if (verified) {
      // Update the stored counter (replace with your database update)
      await updateUserCredentialCounter(userCredential.credentialId, authenticationInfo.newCounter);

      // --- 8. ALL VERIFICATION STEPS PASSED! EXECUTE SENSITIVE OPERATION ---
      console.log('Biometric authentication verified. Executing sensitive operation...');
      await executeSensitiveSettingsUpdate(userId, payload); // Your core business logic

      // 9. Respond success
      res.status(200).json({ message: 'Settings updated successfully' });

    } else {
      // 10. Respond failure
      console.error('Biometric verification failed.');
      res.status(401).json({ message: 'Authentication failed' });
    }

  } catch (error: any) {
    console.error('Backend verification error:', error);
    // Handle specific WebAuthn verification errors
    res.status(500).json({ message: 'Internal server error during verification', error: error.message });
  }
}

// Dummy helper functions (replace with your actual implementation)
async function getUserFromDatabase(userId: string): Promise<any> {
    // Lookup user and their stored webauthn credentials
    // Return { id: userId, webauthnCredentials: [...] }
    console.log(\`Fetching user \${userId}...\`);
    return {
        id: userId,
        webauthnCredentials: [
             {
                 credentialId: 'dummy-credential-id', // Base64 or similar
                 publicKey: 'dummy-public-key',    // Base64 or PEM
                 counter: 0,
                 // ... other credential data
             }
        ]
    };
}

async function getStoredChallenge(userId: string, operation: string): Promise<string | null> {
    // Retrieve the unique challenge generated earlier for this user/operation
    // and clear it or mark it as used immediately after retrieval.
    console.log(\`Getting challenge for user \${userId}, operation \${operation}...\`);
    return 'generated-challenge-for-this-request'; // Base64 or ArrayBuffer represented as string
}

async function updateUserCredentialCounter(credentialId: string, newCounter: number): Promise<void> {
     // Update the counter value for the specific credential in your database
     console.log(\`Updating counter for credential \${credentialId} to \${newCounter}\`);
     // ... save settings to database ...
}

async function executeSensitiveSettingsUpdate(userId: string, payload: any): Promise<void> {
     // Implement the actual logic to update settings based on the payload
     console.log(\`Executing update for user \${userId} with payload:\`, payload);
     // ... save settings to database ...
}

// Note: A real implementation would require a robust WebAuthn library on the backend
// to handle the complex ASN.1 parsing and cryptographic verification details.
// Libraries like @simplewebauthn/server are highly recommended.
`}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            Key Security Considerations <AlertTriangle size={24} />
          </h2>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              <strong>Authenticate the Operation Data:</strong> For maximum
              security, the WebAuthn authentication should ideally
              <strong>bind to the sensitive data itself</strong>. The
              WebAuthn API allows adding &quot;clientDataJSON&quot; which includes
              the challenge and origin. More advanced implementations might
              involve signing a hash of the specific JSON payload being sent,
              though integrating this directly into the standard WebAuthn
              assertion is complex. A common pattern is to ensure the challenge
              is unique per sensitive action request, linking the verified
              assertion to that specific action attempt on the server side.
            </li>
            <li>
              <strong>Server-Side Verification is Crucial:</strong> Never trust
              the frontend assertion as valid on its own.
              <strong>All verification steps must happen on the backend.</strong>
              The frontend merely provides the signed assertion; the backend
              validates it cryptographically.
            </li>
            <li>
              <strong>Replay Protection:</strong> The use of unique, single-use
              challenges generated by the server for each authentication request
              is vital to prevent an attacker from intercepting a valid
              assertion and &quot;replaying&quot; it to trigger the sensitive
              operation again.
            </li>
            <li>
              <strong>Signature Counter:</strong> Implementing and verifying
              the signature counter protects against attackers who might try to
              clone an authenticator and use it multiple times without the server
              detecting the duplicate usage.
            </li>
            <li>
              <strong>Transport Layer Security (TLS):</strong> Ensure all communication
              between the browser and your backend uses HTTPS to prevent
              interception of challenges and assertions.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            Use Cases <Check size={24} />
          </h2>
          <p>Scenarios where biometric authentication is valuable for JSON operations:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Financial Transactions:</strong> Confirming a payment submission JSON payload.
            </li>
            <li>
              <strong>Account Security Settings:</strong> Changing the user&apos;s email, password, or 2FA settings via a JSON update.
            </li>
            <li>
              <strong>Data Access/Decryption:</strong> Requesting access to or decryption of sensitive data bundles returned as JSON.
            </li>
            <li>
              <strong>Authorization Approvals:</strong> Approving a workflow step or granting permissions via a backend JSON API call.
            </li>
            <li>
              <strong>API Key Management:</strong> Generating, revoking, or viewing API keys via a management interface submitting JSON.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            Advantages and Disadvantages
          </h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">Advantages:</h3>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Increased security for critical actions.</li>
            <li>Strong defense against phishing and credential theft.</li>
            <li>Improved user experience (no need to re-enter passwords).</li>
            <li>Leverages hardware-backed security.</li>
            <li>Standardized approach via WebAuthn.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Disadvantages:</h3>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Requires user devices with compatible authenticators.</li>
            <li>Initial setup (registration) is necessary.</li>
            <li>Requires significant backend implementation work to handle WebAuthn ceremonies correctly.</li>
            <li>Need to handle cases where biometrics are not available or fail.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            Conclusion
          </h2>
          <p>
            Securing sensitive JSON operations goes beyond basic session
            authentication. By integrating biometric authentication through the
            Web Authentication API, you can ensure that critical actions are
            explicitly authorized by the user in real-time, leveraging
            device-bound cryptographic keys. While implementing WebAuthn requires
            careful handling of challenges, verification, and security
            considerations on both frontend and backend, the enhanced security
            posture it provides for high-value operations is well worth the
            effort. Implementing this pattern means that even if a user&apos;s
            session is compromised, an attacker cannot perform sensitive actions
            without the user&apos;s biometric presence and consent.
          </p>
        </section>
      </div>
    </>
  );
}
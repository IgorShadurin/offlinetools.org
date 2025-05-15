import type { Metadata } from "next";
import { Blocks, FileJson, ShieldCheck, LockKeyhole, Code, ListCheck, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Blockchain Applications for JSON Document Verification",
  description: "Explore how blockchain technology can be used to ensure the integrity and authenticity of JSON documents.",
};

export default function BlockchainJsonVerificationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Blocks className="mr-3 text-blue-600" size={32} /> Blockchain Applications for JSON Document Verification
      </h1>

      <article className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <FileJson className="mr-2 text-green-600" size={24} /> The Challenge: Verifying JSON Integrity
          </h2>
          <p>
            JSON (JavaScript Object Notation) is a ubiquitous data format for transmitting and storing structured data. From API responses to configuration files and databases, JSON is everywhere. However, ensuring the integrity and authenticity of a JSON document after it has been created or transmitted can be challenging in distributed or untrusted environments. How can you be absolutely sure that a JSON document hasn't been subtly altered after it was originally generated or signed?
          </p>
          <p>
            Traditional methods like simple checksums or hashing provide a way to detect changes, but they often rely on a trusted party to store and provide the original hash. Digital signatures offer authenticity, proving who signed the document, but verifying the signature typically relies on a trusted Certificate Authority (CA) or a Web of Trust model. Neither inherently provides a decentralized, immutable, and universally verifiable record of the document's state at a specific point in time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Blocks className="mr-2 text-blue-600" size={24} /> Introducing Blockchain for Trustless Verification
          </h2>
          <p>
            This is where blockchain technology offers a compelling solution. A blockchain is a decentralized, distributed ledger that records transactions across many computers. Once a transaction is recorded in a block and added to the chain, it is extremely difficult and computationally expensive to alter or remove it. This property, known as immutability, makes blockchain an ideal platform for creating tamper-proof records that don't rely on a single point of control.
          </p>
          <p>
            Instead of storing the entire JSON document on the blockchain (which would be inefficient, costly, and potentially problematic for privacy), we can leverage the blockchain's immutability by storing a unique digital fingerprint of the JSON document: its cryptographic hash.
          </p>
        </section>

        <section>
          <h2 className="2xl font-semibold mt-8 mb-4 flex items-center">
            <ListCheck className="mr-2 text-purple-600" size={24} /> The Core Process: Hashing and Anchoring
          </h2>
          <p>
            The fundamental process for verifying JSON document integrity using blockchain involves two main steps: creating a unique fingerprint (hashing) and anchoring that fingerprint to the blockchain.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
            <Code className="mr-2 text-gray-600" size={20} /> Step 1: Canonicalizing and Hashing the JSON Document
          </h3>
          <p>
            A cryptographic hash function (like SHA-256 or SHA-3) takes an input (our JSON document's content) and produces a fixed-size string of bytes. The key feature is that even a tiny change in the input will result in a drastically different output hash. This makes hashes excellent for detecting tampering.
          </p>
          <p>
            However, a challenge with JSON is that its string representation can vary while representing the same logical data (e.g., different key order in objects, varying whitespace, different handling of numbers or escaped characters). To ensure that the same logical JSON data always produces the same hash, the document must first be "canonicalized" according to a strict set of rules. This involves standardizing the format, typically by:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Sorting object keys alphabetically.</li>
            <li>Removing unnecessary whitespace.</li>
            <li>Using a consistent encoding (e.g., UTF-8).</li>
            <li>Standardizing number and string representations.</li>
          </ul>
          <p>
            Once canonicalized into a consistent string format, the resulting JSON string is fed into a chosen cryptographic hash function.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Conceptual Hashing Process (Node.js Crypto Example):</h4>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              {`// Note: This requires a Node.js environment to run due to 'crypto' module.
// In a browser, you would use Web Crypto API or a library.

import crypto from 'crypto';

// Conceptual canonicalization function - real implementations are more complex
function conceptualCanonicalizeJson(jsonObject: any): string {
  // Sort keys recursively and stringify.
  // This is a simplified example; robust canonicalization
  // requires handling arrays, nested objects, specific data types, etc.,
  // according to a defined standard like JCS (JSON Canonicalization Scheme)
  // or RFC 8785.
  try {
    return JSON.stringify(jsonObject, (key, value) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // Sort object keys
        return Object.keys(value).sort().reduce((sorted: any, k) => {
          sorted[k] = value[k];
          return sorted;
        }, {});
      }
      return value;
    });
  } catch (e) {
    console.error("Canonicalization failed:", e);
    throw new Error("Could not canonicalize JSON.");
  }
}

function hashJson(jsonObject: any): string {
  const canonicalString = conceptualCanonicalizeJson(jsonObject);
  // Use SHA-256 as a common cryptographic hash function
  const hash = crypto.createHash('sha256');
  // Update the hash with the canonicalized string (ensure consistent encoding like 'utf8')
  hash.update(canonicalString, 'utf8');
  // Get the hash digest in hexadecimal format
  return hash.digest('hex');
}

// Example Usage:
const myDocument = {
  "version": 1,
  "data": {
    "value": 123.45,
    "timestamp": "2023-10-27T10:00:00Z" // Note key order difference vs description
  },
  "name": "Document A"
};

const documentHash = hashJson(myDocument);
console.log("Calculated SHA-256 Hash:", documentHash);

// Example showing canonicalization sorts keys:
const myDocumentDifferentOrder = {
  "name": "Document A",
  "version": 1,
  "data": {
    "timestamp": "2023-10-27T10:00:00Z",
    "value": 123.45
  }
};
const documentHashDifferentOrder = hashJson(myDocumentDifferentOrder);
console.log("Hash with different key order (should be same):", documentHashDifferentOrder);
// If the canonicalization function is correct, documentHash and
// documentHashDifferentOrder should be identical.

// If 'value' is changed to 123.46, the hash will be completely different.
const myDocumentAltered = {
  "version": 1,
  "data": {
    "value": 123.46, // Small change here
    "timestamp": "2023-10-27T10:00:00Z"
  },
  "name": "Document A"
};
const documentHashAltered = hashJson(myDocumentAltered);
console.log("Hash of altered document (should be different):", documentHashAltered);
`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
            <LockKeyhole className="mr-2 text-red-600" size={20} /> Step 2: Anchoring the Hash to the Blockchain
          </h3>
          <p>
            The calculated hash is then included in a transaction on the chosen blockchain. This transaction could simply be a small data payload containing the hash, or it could be part of a larger transaction associated with other data relevant to the document (e.g., a document ID, a timestamp, sender/receiver information). The transaction is cryptographically signed by the party anchoring the hash and broadcast to the blockchain network.
          </p>
          <p>
            Miners or validators on the network include this transaction in a new block, which is then validated and added to the distributed ledger. Once the block is sufficiently confirmed by the network's consensus mechanism, the hash is immutably recorded on the blockchain.
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Conceptual Blockchain Anchoring (Pseudo-code):</h4>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              {`// This is highly conceptual pseudo-code, illustrating the steps.
// Actual implementation depends heavily on the chosen blockchain platform
// (e.g., Ethereum, Polygon, Hyperledger Fabric, etc.)
// and specific libraries (web3.js, ethers.js, hyperledger-sdk, etc.)
// and potentially a smart contract deployed on the blockchain.

async function anchorHashOnBlockchain(documentHash: string): Promise<string> {
  console.log(\`Attempting to anchor hash: \${documentHash}\`);

  try {
    // 1. Connect to the blockchain network
    // const provider = new BlockchainProvider('https://...'); // e.g., Ethereum node URL
    // const wallet = new Wallet('YOUR_PRIVATE_KEY', provider); // Load your identity

    // 2. Prepare the data payload (e.g., storing the hash in a transaction's data field
    //    or by calling a smart contract function specifically designed for anchoring hashes).
    const dataToStore = documentHash;
    // let transactionDetails;
    // If using a simple data transaction:
    // transactionDetails = { to: 'RECIPIENT_ADDRESS', value: 0, data: dataToStore };
    // If using a smart contract:
    // const contract = new Contract('CONTRACT_ADDRESS', CONTRACT_ABI, wallet);
    // transactionDetails = await contract.methods.storeDocumentHash(dataToStore).encodeABI();
    // transactionDetails = { to: contract.address, data: transactionDetails };


    // 3. Estimate gas fees (if applicable)
    // const gasLimit = await provider.estimateGas(transactionDetails);
    // const gasPrice = await provider.getGasPrice(); // Or calculate based on network conditions

    // 4. Create and sign the transaction
    // const transaction = { ...transactionDetails, gasLimit, gasPrice, nonce: await provider.getTransactionCount(wallet.address) };
    // const signedTransaction = await wallet.signTransaction(transaction);

    // 5. Send the signed transaction to the blockchain network
    // const txResponse = await provider.sendTransaction(signedTransaction);

    // 6. Wait for the transaction to be mined and confirmed (optional but recommended)
    // const receipt = await txResponse.wait(1); // Wait for 1 confirmation

    console.log(\`Conceptually anchored hash \${documentHash} on blockchain.\`);
    // Simulate returning a transaction identifier
    const simulatedTxId = \`0xSimulatedTx\${documentHash.substring(0, 16)}...\`;
    console.log(\`Simulated Transaction ID: \${simulatedTxId}\`);

    return simulatedTxId; // Return the actual transaction ID upon success

  } catch (error) {
    console.error("Failed to anchor hash:", error);
    // In a real application, you'd handle different types of blockchain errors
    throw new Error(\`Blockchain anchoring failed: \${error.message || error}\`);
  }
}

// Example Usage (requires actual blockchain client setup):
// const myJsonData = { /* ... your JSON data ... */ };
// const hashToAnchor = hashJson(myJsonData); // From Step 1
// anchorHashOnBlockchain(hashToAnchor)
//   .then(txId => console.log(\`Document hash recorded with Tx ID: \${txId}\`))
//   .catch(err => console.error("Anchoring process failed:", err));
`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Search className="mr-2 text-orange-600" size={24} /> Verification Process
          </h2>
          <p>
            To verify the integrity of a JSON document at a later time using the blockchain record:
          </p>
          <ol className="list-decimal pl-6 space-y-2 my-4">
            <li>Obtain the JSON document that needs verification.</li>
            <li>Obtain the transaction ID or block hash that was originally created when the document's original hash was anchored on the blockchain. This identifier acts as a pointer to the immutable record.</li>
            <li>Canonicalize the <em>current</em> JSON document using the <em>exact same</em> canonicalization rules and implementation used originally. Consistency here is paramount.</li>
            <li>Calculate the cryptographic hash of the canonicalized current document using the <em>exact same</em> hash function (e.g., SHA-256) used originally.</li>
            <li>Query the blockchain using the transaction ID or block hash to retrieve the hash that was originally recorded in that specific transaction/block.</li>
            <li>Compare the newly calculated hash of the current document with the hash retrieved from the blockchain.</li>
          </ol>
          <p>
            <ShieldCheck className="inline-block mx-1 text-green-600" size={20} /> If the hashes match, you have cryptographic proof that the JSON document is identical to the one that existed at the time the hash was anchored on the blockchain. Since the blockchain record is immutable, this proves the document's integrity since that point in time. If the hashes differ, the document has been altered.
          </p>
        </section>

         <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Blocks className="mr-2 text-blue-600" size={24} /> Choosing a Blockchain Platform
          </h2>
          <p>
            The choice of blockchain platform depends heavily on the specific use case requirements, particularly regarding transparency, access control, cost, and performance:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Public Blockchains (e.g., Ethereum, Bitcoin via Layer 2 solutions like Omni Layer or counterparty protocols, Polygon, etc.):</strong> Offer maximum transparency and immutability enforced by a large, decentralized network of participants. Anyone can verify the existence and integrity record. However, they can be relatively expensive (due to transaction fees or "gas") and transaction throughput might be lower compared to private solutions. Privacy is also a consideration, as the transaction and hash are typically public.</li>
            <li><strong>Private/Consortium Blockchains (e.g., Hyperledger Fabric, Corda):</strong> Offer controlled access, potentially lower transaction costs, higher throughput, and built-in privacy features (transactions may only be visible to authorized participants). Verification is restricted to members of the network. These are suitable for enterprise use cases where participants are known and trust is needed between them, but not necessarily with the wider public.</li>
          </ul>
          <p>
            Hybrid solutions also exist, where hashes from private chains or other off-chain systems are periodically consolidated and "anchored" onto a public blockchain. This combines the efficiency and privacy of the private system with the strong finality and public verifiability provided by the public chain's consensus mechanism.
          </p>
        </section>


        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <FileJson className="mr-2 text-green-600" size={24} /> Practical Use Cases
          </h2>
          <p>
            This pattern of hashing and anchoring JSON documents onto a blockchain can be a powerful tool across a variety of industries and applications requiring high data integrity:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Supply Chain Management:</strong> Verify the integrity of shipping manifests, quality control reports, certificates of origin, or transfer of custody records represented as JSON data as they pass through different parties.</li>
            <li><strong>Legal and Compliance:</strong> Timestamp and provide verifiable proof of existence and integrity for contracts, agreements, regulatory filings, or audit logs stored as JSON documents.</li>
            <li><strong>Academic and Professional Certificates:</strong> Issue digital transcripts, diplomas, or professional certifications as JSON documents, allowing anyone to verify their authenticity and integrity against a blockchain record without relying solely on the issuing institution's database.</li>
            <li><strong>Healthcare:</strong> Anchor hashes of patient consent forms, selected anonymized clinical trial data, or audit trails of access to medical records (while carefully considering and maintaining patient privacy).</li>
            <li><strong>IoT Data Streams:</strong> Verify the integrity of JSON-formatted data collected from sensors or devices at the point of origin before it is used in critical decision-making processes.</li>
             <li><strong>Digital Signatures Enhancement:</strong> Supplement traditional digital signatures by providing a decentralized timestamp and proof of existence of the signed document's state.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
             <ShieldCheck className="mr-2 text-green-600" size={24} /> Key Benefits
          </h2>
           <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Immutability:</strong> Guarantees that the recorded hash, and therefore the state of the JSON document it represents at that moment, cannot be tampered with retroactively without the alteration being immediately detectable.</li>
            <li><strong>Trustless Verification:</strong> Verification does not rely on trusting a central authority to store the original hash; you only need to trust the blockchain network's consensus mechanism.</li>
            <li><strong>Transparency (on public chains):</strong> The existence of the record is publicly visible and verifiable by anyone, increasing accountability.</li>
            <li><strong>Decentralization:</strong> The record is distributed across the network, removing a single point of failure for the verification mechanism.</li>
            <li><strong>Audit Trail:</strong> Creates a clear, chronological, and verifiable record of when a document's hash was anchored.</li>
             <li><strong>Efficiency:</strong> Only a small hash is stored on-chain, not the potentially large document itself, saving storage and transaction costs.</li>
          </ul>
        </section>

         <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Blocks className="mr-2 text-blue-600" size={24} /> Potential Challenges
          </h2>
           <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Cost:</strong> Transaction fees ("gas") on public blockchains can fluctuate significantly and add up if many documents need to be anchored.</li>
            <li><strong>Privacy:</strong> While the document content isn't stored, the existence of a transaction and the hash itself on a public chain might reveal metadata (like the time of creation or number of documents processed) that could be sensitive. Private or consortium chains can mitigate this.</li>
            <li><strong>Canonicalization Complexity:</strong> Implementing robust and universally agreed-upon JSON canonicalization that handles all data types and edge cases correctly is critical. Inconsistent canonicalization will lead to verification failures even for identical logical documents. Adhering to standards like RFC 8785 is important.</li>
            <li><strong>Key Management:</strong> Securely managing the private keys used to sign anchoring transactions is paramount, as compromise could lead to unauthorized anchoring or spoofing.</li>
             <li><strong>Scalability:</strong> Anchoring a hash for every single, frequently updated JSON document might still pose scalability challenges depending on the chosen blockchain and the volume of data. Batching hashes or using specialized data anchoring protocols can help.</li>
             <li><strong>Data Availability:</strong> The JSON document itself still needs to be available off-chain for the verification process. The blockchain only verifies integrity, not availability.</li>
          </ul>
        </section>


        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            Conclusion
          </h2>
          <p>
            Using blockchain technology to verify the integrity of JSON documents provides a powerful mechanism to build trust and accountability into digital workflows. By creating an immutable, decentralized record of a document's cryptographic hash, organizations and individuals can gain confidence that their digital records, captured in the flexible JSON format, have not been altered since being registered on the distributed ledger. While technical and economic challenges around cost, privacy, and canonicalization need careful consideration, the benefits of a trustless, universally verifiable audit trail for critical JSON data make this a compelling and increasingly adopted application of blockchain technology. It shifts the paradigm from relying on centralized trust authorities to a system where data integrity can be mathematically proven and verified by anyone.
          </p>
        </section>

      </article>
    </>
  );
}
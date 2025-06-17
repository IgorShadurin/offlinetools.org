import type { Metadata } from "next";
import { CircuitBoard, Database, Code, Link, Shield, Lightbulb, Hash, Binary, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Smart Contract Integration with JSON Data Structures | Web3 Development",
  description:
    "Explore the challenges and common patterns for integrating off-chain JSON data with on-chain smart contracts.",
};

export default function SmartContractJsonIntegrationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Link className="w-8 h-8 text-blue-500" />
        <span>Smart Contract Integration with JSON Data Structures</span>
      </h1>

      <div className="space-y-6">
        <p>
          In the world of decentralized applications (dApps), smart contracts are the backbone, executing logic on the
          blockchain. However, smart contracts operate in an isolated environment, limited to the data stored directly
          on the chain. Real-world applications often rely on data stored off-chain, frequently in structured formats
          like JSON. Integrating this off-chain JSON data securely and efficiently with on-chain smart contracts
          presents unique challenges.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CircuitBoard className="w-6 h-6 text-green-500" />
          <span>The Challenge: Bridging On-Chain and Off-Chain</span>
        </h2>
        <p>
          Smart contracts are deterministic and live in a sandboxed environment. They cannot directly make HTTP requests
          to fetch data from a web server hosting a JSON file or database. This is by design, ensuring that contract
          execution is predictable and repeatable across all validating nodes.
        </p>
        <p>
          Furthermore, storing complex JSON structures directly on the blockchain is often prohibitively expensive due
          to gas costs and limitations on data types and storage layout in languages like Solidity.
        </p>

        <h3 className="text-xl font-semibold mt-6">Why JSON?</h3>
        <p>
          JSON (JavaScript Object Notation) is a lightweight, human-readable format widely used for data interchange on
          the internet. It represents data as key-value pairs and ordered lists (arrays), making it flexible and common
          for APIs and databases. The challenge is how to bring this flexible, nested structure into the rigid,
          cost-sensitive environment of a smart contract.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          <span>Common Patterns and Approaches</span>
        </h2>
        <p>
          Several strategies exist to enable smart contracts to interact with or leverage off-chain JSON data. The
          choice depends on the specific use case, security requirements, data sensitivity, and frequency of updates.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Hash className="w-5 h-5 text-purple-500" />
          <span>1. Storing Data Hashes On-Chain</span>
        </h3>
        <p>
          One of the simplest and most gas-efficient methods is to store a hash of the JSON data on the blockchain. The
          actual JSON data remains off-chain (e.g., on a web server, IPFS, or a database).
        </p>
        <p>
          The smart contract stores a cryptographic hash (like Keccak-256, commonly used in Ethereum). When a user or
          dApp needs to verify the integrity of the off-chain JSON data, they retrieve the JSON, compute its hash
          off-chain, and compare it to the hash stored in the smart contract. If the hashes match, it proves the
          off-chain data has not been tampered with since the hash was recorded on-chain.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Solidity (Storing Hash):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataVerifier {
    bytes32 public latestDataHash;
    address public owner; // Only owner can update the hash

    event DataHashUpdated(bytes32 newHash, uint256 timestamp);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function updateDataHash(bytes32 _newDataHash) external onlyOwner {
        latestDataHash = _newDataHash;
        emit DataHashUpdated(latestDataHash, block.timestamp);
    }

    // Function to retrieve the hash for off-chain verification
    function getDataHash() external view returns (bytes32) {
        return latestDataHash;
    }

    // --- Off-chain verification logic happens client-side ---
    // dApp retrieves JSON from off-chain source
    // dApp computes hash of the JSON
    // dApp calls getDataHash() to get the on-chain hash
    // dApp compares computed hash with on-chain hash
}
`}
            </pre>
          </div>
        </div>
        <p>
          This method doesn&apos;t allow the smart contract to *read* the data within the JSON, only to verify its
          integrity. It&apos;s suitable for scenarios where the data is publicly available but needs trustless
          verification of its state at a certain point in time.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-500" />
          <span>2. Storing Relevant Fields On-Chain</span>
        </h3>
        <p>
          If only a few specific pieces of data from a JSON structure are needed by the smart contract logic, those
          fields can be extracted off-chain and stored directly in the smart contract using Solidity&apos;s native data
          types (<code>uint</code>, <code>string</code>, <code>bool</code>, <code>address</code>, structs, arrays of
          primitive types).
        </p>
        <p>
          This requires an off-chain process (a trusted server, a script, or a decentralized oracle network) to parse
          the JSON, extract the necessary values, and then send a transaction to the smart contract to update its state.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Solidity (Storing Fields):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductInfo {
    struct Product {
        uint256 id;
        string name;
        uint256 price; // Stored in smallest unit, e.g., cents
        bool inStock;
    }

    mapping(uint256 => Product) public products;
    address public dataUpdater; // Entity authorized to update product data

    event ProductUpdated(uint256 productId);

    constructor(address _updater) {
        dataUpdater = _updater;
    }

    modifier onlyUpdater() {
        require(msg.sender == dataUpdater, "Not the data updater");
        _;
    }

    // Off-chain process parses JSON, extracts fields, calls this function
    // Example JSON might be: { "id": 101, "name": "Laptop", "priceUSD": 1200.50, "status": "in_stock" }
    // Off-chain script converts 1200.50 to 120050, "in_stock" to true
    function updateProduct(
        uint256 _id,
        string memory _name,
        uint256 _priceInCents,
        bool _inStock
    ) external onlyUpdater {
        products[_id] = Product(_id, _name, _priceInCents, _inStock);
        emit ProductUpdated(_id);
    }

    // Smart contract can now directly access product data
    function getPrice(uint256 _id) public view returns (uint256) {
        return products[_id].price;
    }
}
`}
            </pre>
          </div>
        </div>
        <p>
          This approach is more expensive than storing just a hash, as you pay gas for storing each piece of data. It
          also requires trust in the entity that extracts and provides the data to the smart contract (`dataUpdater` in
          the example).
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Binary className="w-5 h-5 text-teal-500" />
          <span>3. Encoding and Serialization</span>
        </h3>
        <p>
          For more complex JSON structures that need to be passed to the smart contract, the JSON data can be serialized
          (converted into a byte string) off-chain. This byte string can then be passed to a smart contract function.
        </p>
        <p>
          Within the smart contract, you could potentially use libraries or custom logic to *decode* this byte string
          back into a structured format that Solidity can work with, like a struct or mapping. This is complex and
          highly gas-intensive. Alternatively, the contract might just store the raw bytes for later retrieval and
          interpretation off-chain, similar to the hash approach but storing the data itself (less efficient than just
          the hash).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual TypeScript (Encoding JSON to Bytes):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Assuming 'ethers' or similar library
import { ethers } from "ethers";

// Example JSON data
const jsonData = {
    userId: 123,
    score: 95.5,
    isActive: true,
    items: ["sword", "shield"]
};

// Convert JSON object to a string
const jsonString = JSON.stringify(jsonData);
console.log("JSON String:", jsonString);

// Convert string to bytes
// Note: UTF-8 encoding is standard
const jsonBytes = ethers.utils.toUtf8Bytes(jsonString);
console.log("JSON Bytes:", jsonBytes); // Example: Uint8Array [ 123, 34, 117, ... ]

// This jsonBytes can now potentially be passed to a smart contract function
// function processJsonBytes(bytes memory _data) external { ... }

// --- Inside the smart contract ---
// Decoding bytes back to a useful structure in Solidity is NON-TRIVIAL and EXPENSIVE.
// You might need custom parsers or specialized libraries, which are rare for arbitrary JSON.
// Often, the contract just stores the bytes:
// bytes public storedJsonData;
// function storeData(bytes memory _data) public {
//     storedJsonData = _data;
// }
// Then, off-chain clients retrieve storedJsonData and decode it back to JSON string using ethers.utils.toUtf8String()
`}
            </pre>
          </div>
        </div>
        <p>
          Directly parsing JSON bytes within Solidity is extremely difficult and costly due to Solidity&apos;s limited
          string manipulation and byte processing capabilities designed for deterministic execution. This method is
          usually more practical for storing the raw data bytes on-chain for later off-chain retrieval and
          interpretation.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-orange-500" />
          <span>4. Oracles (Decentralized Data Feeds)</span>
        </h3>
        <p>
          Oracles are third-party services that provide smart contracts with external data. A decentralized oracle
          network (like Chainlink) can fetch data from APIs, parse JSON responses, and then send the required data
          fields to a smart contract in a format the contract understands (e.g., <code>uint256</code>,{" "}
          <code>string</code>).
        </p>
        <p>
          This is arguably the most common and robust method for getting dynamic off-chain data onto the chain in a
          decentralized manner. The oracle network handles the complexity and cost of fetching, parsing, and delivering
          the data securely.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Solidity (Using an Oracle):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Example using a simplified Oracle pattern (real implementations use interfaces, etc.)

contract PriceConsumer {
    uint256 public latestPrice;
    uint256 public lastUpdated;

    // This address would be a trusted oracle contract or network entry point
    address public oracleAddress;

    constructor(address _oracle) {
        oracleAddress = _oracle;
    }

    // This function would be called by the oracle contract
    // with the requested data parsed from JSON off-chain
    function fulfillPrice(uint256 _price) external {
        // In a real oracle contract, you'd add checks
        // to ensure this call comes from the authorized oracle
        // require(msg.sender == oracleAddress, "Unauthorized caller");
        latestPrice = _price;
        lastUpdated = block.timestamp;
    }

    // Function to request data from the oracle (conceptual)
    // In a real system, this might involve sending a request ID,
    // specifying the URL and JSON path, and paying fees.
    function requestPriceUpdate() external {
        // Call a function on the oracle contract,
        // passing details about the data needed (e.g., API URL, JSON path "$.price")
        // Oracle contract fetches data, parses JSON, calls fulfillPrice back on this contract
        // (This part is highly simplified)
        // IOracle(oracleAddress).requestData(...);
    }
}
`}
            </pre>
          </div>
        </div>
        <p>
          Using oracles shifts the trust assumption from a single data updater to the oracle network itself. It&apos;s a
          powerful pattern for incorporating real-world data, including data from JSON APIs, into smart contract logic.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Database className="w-5 h-5 text-indigo-500" />
          <span>5. Decentralized Storage & Protocols (e.g., IPFS + Proofs)</span>
        </h3>
        <p>
          For larger datasets, the JSON can be stored on decentralized storage like IPFS. The IPFS content identifier
          (CID), which is a hash of the content, can then be stored on-chain (similar to the hash approach).
        </p>
        <p>
          To use specific data points from the JSON within a smart contract, more advanced protocols might be used. For
          instance, protocols like Merkle proofs can allow a smart contract to verify that a specific piece of data
          exists within a larger dataset (represented by a Merkle root stored on-chain) stored off-chain, without
          needing the entire dataset on-chain. The JSON data structure lends itself well to being represented as a
          Merkle tree (e.g., using keys or array indices).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Flow (IPFS + Merkle Proof):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// 1. Off-chain: Prepare JSON data
const largeJsonData = { ... }; // Your large JSON object/array

// 2. Off-chain: Store on IPFS
// await ipfs.add(JSON.stringify(largeJsonData));
// This returns an IPFS CID (Content Identifier), which is a hash

// 3. Off-chain: Compute Merkle Root of the JSON data
// Using a library that builds a Merkle tree from JSON/object structure
// const merkleTree = buildMerkleTree(largeJsonData);
// const merkleRoot = merkleTree.getRoot();

// 4. On-chain: Store the IPFS CID and Merkle Root in a smart contract
// bytes public ipfsCid; // Or bytes32 if CID fits/is truncated hash
// bytes32 public dataMerkleRoot;
// function updateDataPointer(bytes memory _cid, bytes32 _root) public {
//     ipfsCid = _cid;
//     dataMerkleRoot = _root;
// }

// 5. Off-chain (for verification): To prove a specific value exists
// User retrieves JSON from IPFS using the CID stored on-chain.
// User finds the specific data point they need (e.g., jsonData.items[0]).
// User generates a Merkle proof for that data point using the off-chain Merkle tree.
// const specificValue = jsonData.items[0];
// const proof = merkleTree.getProof(specificValue); // Array of hashes

// 6. On-chain (Verification): Smart contract verifies the proof
// Needs a Merkle proof verification library/function in Solidity
// function verifyData(bytes32 _merkleRoot, bytes32 _leaf, bytes32[] calldata _proof) view returns (bool) {
//     // Implementation checks if computing the proof hashes with the leaf
//     // matches the stored _merkleRoot
//     return MerkleProof.verify(_proof, _merkleRoot, _leaf);
// }
// Smart contract doesn't know the *value* of the data, only *that it was part* of the original data set.
// If the value itself is needed on-chain, this becomes more complex, potentially
// requiring passing the value and verifying the proof of its inclusion.
`}
            </pre>
          </div>
        </div>
        <p>
          This method offers good integrity verification for large datasets but requires significant off-chain
          computation to prepare the proofs and potentially complex on-chain logic for verification. It doesn&apos;t
          easily allow the smart contract to consume arbitrary data from the JSON on demand, only to verify the
          existence/inclusion of specific, pre-defined data points.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Binary className="w-6 h-6 text-purple-500" />
          <span>Data Type Mapping</span>
        </h2>
        <p>
          When bringing structured data onto the chain (even just specific fields), you must consider the mapping
          between JSON data types and Solidity types:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>JSON String:</strong> Maps to Solidity <code>string</code> or <code>bytes</code>. Be mindful of gas
            costs for storing long strings.
          </li>
          <li>
            <strong>JSON Number:</strong> Maps to Solidity integer types (<code>uint</code>/<code>int</code> of various
            sizes) or fixed-point numbers (less common). Floating-point numbers (like 95.5 in the example) are NOT
            natively supported in Solidity; they must be scaled and stored as integers (e.g., 955 as `uint` with an
            implicit decimal point, or store 95 and 5 separately, or use a fixed-point library).
          </li>
          <li>
            <strong>JSON Boolean:</strong> Maps directly to Solidity <code>bool</code>.
          </li>
          <li>
            <strong>JSON Array:</strong> Maps to Solidity arrays (<code>type[]</code>). Arrays of complex types or
            dynamic sizes can be gas-intensive. Arrays of strings are particularly expensive.
          </li>
          <li>
            <strong>JSON Object:</strong> Can be mapped to Solidity <code>structs</code> or <code>mappings</code>.
            Nested objects require nested structs or multiple mappings.
          </li>
          <li>
            <strong>JSON Null:</strong> Solidity doesn&apos;t have a direct &quot;null&quot; type for state variables.
            You might use a default/zero value (e.g., 0 for uint, empty string for string) or a separate boolean flag to
            indicate if a field is &quot;set&quot;.
          </li>
        </ul>
        <p>
          This mapping must be handled carefully by the off-chain process that prepares data for the smart contract.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Shield className="w-6 h-6 text-red-500" />
          <span>Security and Trust Considerations</span>
        </h2>
        <p>Integrating off-chain data introduces points of failure and trust assumptions:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Data Integrity:</strong> How can you ensure the off-chain data hasn&apos;t been tampered with before
            being used or hashed? Storing hashes or using Merkle proofs helps verify integrity against the on-chain
            record, but getting the *initial* correct hash or data onto the chain is critical.
          </li>
          <li>
            <strong>Data Availability:</strong> If you only store a hash or CID on-chain, the off-chain data source must
            remain available for verification or retrieval.
          </li>
          <li>
            <strong>Oracle Reliance:</strong> Using oracles introduces reliance on the oracle network. Ensure the oracle
            is decentralized and reputable for your use case. A malicious or faulty oracle can feed incorrect data to
            your contract.
          </li>
          <li>
            <strong>Centralization Risk:</strong> If a single entity is responsible for fetching, parsing, and updating
            data on-chain (as in pattern 2), your dApp has a point of centralization.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6 text-blue-500" />
          <span>Gas Optimization</span>
        </h2>
        <p>
          Storing data on the blockchain, especially strings and complex structures derived from JSON, is expensive.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Store only the absolute minimum necessary data on-chain.</li>
          <li>
            Prefer fixed-size types over dynamic types (like <code>string</code> or dynamic arrays) if possible.
          </li>
          <li>Use the most gas-efficient pattern for your needs (hashing is cheapest if only integrity is needed).</li>
          <li>Offload heavy computation (like JSON parsing or Merkle proof generation) off-chain.</li>
          <li>
            Be mindful of storage update costs (<code>SLOAD</code> and <code>SSTORE</code> are expensive operations).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Integrating smart contracts with off-chain JSON data is a common requirement for building feature-rich dApps.
          While smart contracts cannot directly consume JSON, developers have established patterns involving storing
          hashes, selectively storing fields, employing oracles, or leveraging decentralized storage with proofs.
        </p>
        <p>
          Each method involves trade-offs between cost, complexity, security, and the type of interaction the smart
          contract needs with the data. Understanding the limitations of the on-chain environment and carefully
          designing the off-chain components responsible for data handling and transmission are key to successful and
          secure integration. The choice of pattern should be driven by the specific use case and the level of
          decentralization and trust required.
        </p>
      </div>
    </>
  );
}

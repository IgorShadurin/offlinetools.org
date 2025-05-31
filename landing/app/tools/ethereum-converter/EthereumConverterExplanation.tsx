import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EthereumConverterExplanation() {
  return (
    <Card className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">About Ethereum Unit Converter</CardTitle>
        <CardDescription>
          A comprehensive tool for converting between different Ethereum units with precision
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Tool Capabilities</h3>
          <p className="mb-3">
            The Ethereum Unit Converter allows you to convert between different denominations of Ether, the native cryptocurrency of the Ethereum blockchain. It handles conversions with high precision using BigInt for accurate calculations without external libraries.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Convert between Wei, Gwei, Szabo, Finney, and Ether units</li>
            <li>Handle large numbers with precision (up to 78 digits)</li>
            <li>Support for decimal values with configurable precision</li>
            <li>Real-time conversion as you type</li>
            <li>Copy results to clipboard with a single click</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Ethereum Units Explained</h3>
          <p className="mb-3">
            Ethereum uses several denominations of its currency, each serving different purposes:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Wei</strong>: The smallest unit of Ether (10^-18 ETH)</li>
            <li><strong>Gwei</strong>: Gigawei, commonly used for gas prices (10^-9 ETH)</li>
            <li><strong>Szabo</strong>: Named after Nick Szabo (10^-12 ETH)</li>
            <li><strong>Finney</strong>: Named after Hal Finney (10^-15 ETH)</li>
            <li><strong>Ether</strong>: The standard unit (1 ETH)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Common Use Cases</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <p><strong>Gas Fee Calculations</strong></p>
              <p>Convert between Gwei and Ether to understand transaction fees on the Ethereum network. Gas prices are typically quoted in Gwei, but wallet balances are shown in Ether.</p>
            </li>
            <li>
              <p><strong>Smart Contract Development</strong></p>
              <p>Developers working with Ethereum smart contracts often need to convert between units when setting function parameters or interpreting contract values.</p>
            </li>
            <li>
              <p><strong>DeFi Protocol Interactions</strong></p>
              <p>When interacting with decentralized finance protocols, users may need to convert between different units to understand minimum deposit requirements or fee structures.</p>
            </li>
            <li>
              <p><strong>Cryptocurrency Trading</strong></p>
              <p>Traders and investors use unit conversion to calculate precise values when setting limit orders or analyzing small price movements.</p>
            </li>
            <li>
              <p><strong>Blockchain Data Analysis</strong></p>
              <p>Researchers and analysts working with Ethereum blockchain data often need to convert between units when aggregating transaction values or calculating network statistics.</p>
            </li>
          </ol>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Technical Details</h3>
          <p className="mb-3">
            This converter uses JavaScript's native BigInt type to handle the large numbers involved in Ethereum unit conversions without precision loss. The implementation follows these steps:
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Convert the input value to a standardized unit (Wei)</li>
            <li>Apply the appropriate conversion factor for the target unit</li>
            <li>Handle decimal precision appropriately for fractional values</li>
            <li>Format the output according to the specified decimal places</li>
          </ol>
          <p className="mt-3">
            The converter can handle values up to 78 digits in length, which exceeds the maximum supply of Ether that will ever exist. This ensures accurate conversions even for extremely large or small values.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

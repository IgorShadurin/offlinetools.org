import EthereumConverter from "./EthereumConverter";

export const metadata = {
  title: "Ethereum Unit Converter",
  description: "Convert between Ethereum units including Wei, Gwei, Ether, Finney, and Szabo with precision.",
};

export default function EthereumConverterPage() {
  return <EthereumConverter />;
}

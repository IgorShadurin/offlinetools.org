import { randomBytes } from "node:crypto";
import { derivePublicKeyHex } from "shared";

async function main() {
  const privateKeyHex = randomBytes(32).toString("hex");
  const publicKeyHex = await derivePublicKeyHex(privateKeyHex);

  console.log(`LICENSE_PRIVATE_KEY_HEX=${privateKeyHex}`);
  console.log(`LICENSE_PUBLIC_KEY_HEX=${publicKeyHex}`);
}

void main();

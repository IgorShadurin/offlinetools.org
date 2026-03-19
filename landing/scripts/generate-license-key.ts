import process from "node:process";
import { emailSchema } from "../lib/validations/license";

function printUsageAndExit(): never {
  console.error("Usage: pnpm run license:generate -- <email>");
  process.exit(1);
}

async function main() {
  const emailArg = process.argv.slice(2).find((value) => value !== "--")?.trim();
  if (!emailArg) {
    printUsageAndExit();
  }

  const parsed = emailSchema.safeParse(emailArg);
  if (!parsed.success) {
    console.error("Invalid email.");
    process.exit(1);
  }

  const { issueLicenseKeyForEmail } = await import("../lib/license-server");
  const issued = await issueLicenseKeyForEmail(parsed.data);
  console.log(`Email: ${issued.email}`);
  console.log(`License key: ${issued.licenseKey}`);
}

void main();

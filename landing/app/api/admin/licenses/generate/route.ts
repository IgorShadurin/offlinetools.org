import { NextRequest, NextResponse } from "next/server";
import { adminGenerateLicenseSchema } from "@/lib/validations/license";
import { issueLicenseKeyForEmail } from "@/lib/license-server";
import { sendLicenseEmail } from "@/lib/email";

const LICENSE_ADMIN_TOKEN = process.env.LICENSE_ADMIN_TOKEN;

function isAuthorized(request: NextRequest): boolean {
  if (!LICENSE_ADMIN_TOKEN) {
    return false;
  }

  const authorizationHeader = request.headers.get("authorization") || "";
  const expected = `Bearer ${LICENSE_ADMIN_TOKEN}`;
  return authorizationHeader === expected;
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = adminGenerateLicenseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request", details: parsed.error.format() }, { status: 400 });
    }

    const { email, sendEmail } = parsed.data;
    const issued = await issueLicenseKeyForEmail(email);

    let emailSent = false;
    if (sendEmail) {
      await sendLicenseEmail({
        toEmail: issued.email,
        licenseKey: issued.licenseKey,
      });
      emailSent = true;
    }

    return NextResponse.json({
      success: true,
      email: issued.email,
      licenseKey: issued.licenseKey,
      emailSent,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate license", details: String(error) }, { status: 500 });
  }
}

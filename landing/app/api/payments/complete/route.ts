import { NextRequest, NextResponse } from "next/server";
import { completeCheckoutSchema } from "@/lib/validations/license";
import { getStripe } from "@/lib/stripe";
import { issueLicenseKeyForEmail } from "@/lib/license-server";
import { sendLicenseEmail } from "@/lib/email";

function extractSessionId(request: NextRequest): string {
  const sessionFromQuery = request.nextUrl.searchParams.get("session_id")?.trim();
  if (sessionFromQuery) {
    return sessionFromQuery;
  }

  return "";
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = extractSessionId(request);
    const parsed = completeCheckoutSchema.safeParse({ sessionId });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid session id", details: parsed.error.format() }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(parsed.data.sessionId);

    if (session.mode !== "payment") {
      return NextResponse.json({ error: "Unsupported checkout session mode" }, { status: 400 });
    }

    if (session.metadata?.product !== "offlinetools_desktop_license") {
      return NextResponse.json({ error: "Unexpected checkout session product" }, { status: 400 });
    }

    if (session.payment_status !== "paid" || session.status !== "complete") {
      return NextResponse.json(
        {
          error: "Payment is not completed",
          paymentStatus: session.payment_status,
          checkoutStatus: session.status,
        },
        { status: 402 },
      );
    }

    const email =
      session.customer_details?.email ||
      session.customer_email ||
      session.client_reference_id ||
      session.metadata?.email;

    if (!email) {
      return NextResponse.json({ error: "Could not determine buyer email from checkout session" }, { status: 400 });
    }

    const { email: normalizedEmail, licenseKey } = await issueLicenseKeyForEmail(email);

    const paymentIntentId = typeof session.payment_intent === "string" ? session.payment_intent : null;
    let emailSent = false;

    if (paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      const alreadySent = paymentIntent.metadata?.license_email_sent === "true";

      if (alreadySent) {
        emailSent = true;
      } else {
        try {
          await sendLicenseEmail({
            toEmail: normalizedEmail,
            licenseKey,
          });

          emailSent = true;

          await stripe.paymentIntents.update(paymentIntentId, {
            metadata: {
              ...paymentIntent.metadata,
              license_email_sent: "true",
              license_email_sent_at: new Date().toISOString(),
            },
          });
        } catch (error) {
          return NextResponse.json(
            {
              success: true,
              email: normalizedEmail,
              licenseKey,
              emailSent: false,
              emailError: String(error),
            },
            { status: 200 },
          );
        }
      }
    } else {
      try {
        await sendLicenseEmail({
          toEmail: normalizedEmail,
          licenseKey,
        });
        emailSent = true;
      } catch (error) {
        return NextResponse.json(
          {
            success: true,
            email: normalizedEmail,
            licenseKey,
            emailSent: false,
            emailError: String(error),
          },
          { status: 200 },
        );
      }
    }

    return NextResponse.json({
      success: true,
      email: normalizedEmail,
      licenseKey,
      emailSent,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to complete payment", details: String(error) }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSessionSchema } from "@/lib/validations/license";
import { getStripe, STRIPE_PRICE_ID } from "@/lib/stripe";

function getSiteUrl(request: NextRequest): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const fromOrigin = request.headers.get("origin")?.trim();
  const base = fromEnv || fromOrigin || "https://offlinetools.org";
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

export async function POST(request: NextRequest) {
  try {
    if (!STRIPE_PRICE_ID) {
      return NextResponse.json({ error: "STRIPE_PRICE_ID is not configured" }, { status: 500 });
    }

    const body = await request.json();
    const parsed = createCheckoutSessionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request", details: parsed.error.format() }, { status: 400 });
    }

    const email = parsed.data.email;
    const stripe = getStripe();
    const siteUrl = getSiteUrl(request);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      customer_email: email,
      client_reference_id: email,
      success_url: `${siteUrl}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing?canceled=1`,
      metadata: {
        product: "offlinetools_desktop_license",
        email,
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Failed to initialize checkout session" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        details: String(error),
      },
      { status: 500 },
    );
  }
}

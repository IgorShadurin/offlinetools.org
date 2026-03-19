import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(STRIPE_SECRET_KEY, {
      appInfo: {
        name: "OfflineTools Landing",
      },
    });
  }

  return stripeClient;
}

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID;

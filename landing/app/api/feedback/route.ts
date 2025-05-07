import { NextResponse } from "next/server";
import { feedbackFormSchema } from "@/lib/validations/feedback";

/**
 * Environment variables for Telegram Bot configuration
 * TELEGRAM_BOT_TOKEN: Telegram bot token
 * TELEGRAM_CHAT_ID: Chat ID to send the feedback message to
 */
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Handles the POST request for sending feedback to Telegram
 * @param request - The incoming request object
 * @returns - Response indicating success or failure
 */
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the form data
    const result = feedbackFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid form data", details: result.error.format() }, { status: 400 });
    }

    // Check if Telegram credentials are configured
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ error: "Telegram bot configuration is missing" }, { status: 500 });
    }

    const { email, message } = result.data;

    // Format the message for Telegram
    const formattedMessage = `📣 New Feedback from OfflineTools.org\n\n${
      email ? `📧 Email: ${email}\n\n` : ""
    }💬 Message:\n${message}`;

    // Send the message to Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: formattedMessage,
        parse_mode: "HTML",
      }),
    });

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok) {
      return NextResponse.json({ error: "Failed to send message to Telegram", details: telegramData }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process feedback", details: String(error) }, { status: 500 });
  }
}

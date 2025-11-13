import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const DOWNLOAD_NOTIFICATIONS_ENABLED = process.env.NEXT_PUBLIC_DOWNLOAD_NOTIFICATIONS_ENABLED !== "false";

const PLATFORM_LABELS = {
  mac_arm64: "macOS (Apple Silicon)",
  mac_x64: "macOS (Intel)",
  linux: "Linux",
  windows: "Windows",
} as const;

type PlatformKey = keyof typeof PLATFORM_LABELS;

const PLATFORM_KEYS = new Set<PlatformKey>(Object.keys(PLATFORM_LABELS) as PlatformKey[]);

const getClientIp = (request: NextRequest): string => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(",");
    if (firstIp) {
      return firstIp.trim();
    }
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
};

export async function POST(request: NextRequest) {
  try {
    if (!DOWNLOAD_NOTIFICATIONS_ENABLED) {
      return NextResponse.json({ success: true, disabled: true });
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ error: "Telegram bot configuration is missing" }, { status: 500 });
    }

    const body = await request.json();
    const platform = body?.platform as PlatformKey | undefined;

    if (!platform || !PLATFORM_KEYS.has(platform)) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }

    const formattedMessage = [
      "📥 New Download Request",
      "",
      `💻 Platform: ${PLATFORM_LABELS[platform]} (${platform})`,
      `🌐 IP Address: ${getClientIp(request)}`,
      `🕒 Timestamp: ${new Date().toISOString()}`,
    ].join("\n");

    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    return NextResponse.json({ error: "Failed to process download notification", details: String(error) }, { status: 500 });
  }
}

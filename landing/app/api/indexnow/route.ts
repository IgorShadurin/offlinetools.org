import { NextRequest, NextResponse } from "next/server";
import { getAllIndexNowUrls, submitIndexNowUrls } from "@/lib/indexnow";

const INDEXNOW_SUBMIT_SECRET = process.env.INDEXNOW_SUBMIT_SECRET;

type IndexNowRequestBody = {
  submitAll?: boolean;
  url?: string;
  path?: string;
  urls?: string[];
  paths?: string[];
  urlList?: string[];
};

function getProvidedSecret(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length).trim();
  }

  return request.headers.get("x-indexnow-secret")?.trim() ?? null;
}

function collectRequestedUrls(body: IndexNowRequestBody) {
  return [
    ...(typeof body.url === "string" ? [body.url] : []),
    ...(typeof body.path === "string" ? [body.path] : []),
    ...(Array.isArray(body.urls) ? body.urls : []),
    ...(Array.isArray(body.paths) ? body.paths : []),
    ...(Array.isArray(body.urlList) ? body.urlList : []),
  ].filter((value): value is string => typeof value === "string" && value.trim().length > 0);
}

export async function POST(request: NextRequest) {
  try {
    if (!INDEXNOW_SUBMIT_SECRET) {
      return NextResponse.json({ error: "INDEXNOW_SUBMIT_SECRET is not configured" }, { status: 500 });
    }

    const providedSecret = getProvidedSecret(request);
    if (!providedSecret || providedSecret !== INDEXNOW_SUBMIT_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: IndexNowRequestBody = {};
    try {
      body = (await request.json()) as IndexNowRequestBody;
    } catch {
      // Empty body means submit all current sitemap URLs.
    }

    const requestedUrls = collectRequestedUrls(body);
    const submitAll = body.submitAll === true || requestedUrls.length === 0;
    const urls = submitAll ? getAllIndexNowUrls() : requestedUrls;

    const result = await submitIndexNowUrls(urls);

    return NextResponse.json({
      success: true,
      mode: submitAll ? "all" : "selected",
      ...result,
    });
  } catch (error) {
    return NextResponse.json({ error: "IndexNow submission failed", details: String(error) }, { status: 500 });
  }
}

import { SITE_URL, getIndexableUrls } from "@/lib/site-map";

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
export const INDEXNOW_KEY = "471042d14b464fcfbecc1ce302e32d70";
export const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

const INDEXNOW_HOST = new URL(SITE_URL).host;
const MAX_URLS_PER_REQUEST = 10_000;

export interface IndexNowBatchResponse {
  batchIndex: number;
  status: number;
  submittedCount: number;
  body: string;
}

function normalizeUrl(input: string) {
  const url = new URL(input, SITE_URL);

  if (url.host !== INDEXNOW_HOST) {
    throw new Error(`IndexNow only accepts ${INDEXNOW_HOST} URLs. Received: ${url.toString()}`);
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`Unsupported URL protocol for IndexNow submission: ${url.protocol}`);
  }

  url.hash = "";
  return url.toString();
}

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

export function normalizeIndexNowUrls(inputs: string[]) {
  return Array.from(new Set(inputs.map((input) => normalizeUrl(input))));
}

export function getAllIndexNowUrls() {
  return normalizeIndexNowUrls(getIndexableUrls());
}

export async function submitIndexNowUrls(inputs: string[]) {
  const urls = normalizeIndexNowUrls(inputs);

  if (urls.length === 0) {
    return {
      submittedCount: 0,
      batchCount: 0,
      responses: [] as IndexNowBatchResponse[],
    };
  }

  const batches = chunk(urls, MAX_URLS_PER_REQUEST);
  const responses: IndexNowBatchResponse[] = [];

  for (let index = 0; index < batches.length; index += 1) {
    const urlList = batches[index];

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList,
      }),
      cache: "no-store",
    });

    const body = await response.text();
    if (!response.ok) {
      throw new Error(`IndexNow submission failed with ${response.status}: ${body || "empty response"}`);
    }

    responses.push({
      batchIndex: index + 1,
      status: response.status,
      submittedCount: urlList.length,
      body,
    });
  }

  return {
    submittedCount: urls.length,
    batchCount: batches.length,
    responses,
  };
}

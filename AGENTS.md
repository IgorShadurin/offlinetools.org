# AGENTS.md

## IndexNow

This repo has IndexNow integration in the `landing` app.

### Files

- Public key file: `landing/public/471042d14b464fcfbecc1ce302e32d70.txt`
- IndexNow helper: `landing/lib/indexnow.ts`
- Protected submit route: `landing/app/api/indexnow/route.ts`
- Shared sitemap URL source: `landing/lib/site-map.ts`

### What Is Public vs Private

- The IndexNow host key `471042d14b464fcfbecc1ce302e32d70` is public by design.
- The protected API secret is private and stored in `landing/.env.local` as `INDEXNOW_SUBMIT_SECRET`.
- Production must also define `INDEXNOW_SUBMIT_SECRET` in deployment environment variables.

### When To Submit

- Submit only after the changed pages are deployed and live on `https://offlinetools.org`.
- Do not submit URLs before the public key file is reachable on the live host.
- Prefer submitting only changed URLs for normal updates.
- Use full-site submission only for big launches or large content imports.

### How To Submit

Send a `POST` request to:

```text
https://offlinetools.org/api/indexnow
```

Authenticate with:

```text
Authorization: Bearer <INDEXNOW_SUBMIT_SECRET>
```

### Request Modes

Submit all current sitemap URLs:

```bash
curl -X POST https://offlinetools.org/api/indexnow \
  -H "Authorization: Bearer <INDEXNOW_SUBMIT_SECRET>" \
  -H "Content-Type: application/json"
```

Submit one URL:

```bash
curl -X POST https://offlinetools.org/api/indexnow \
  -H "Authorization: Bearer <INDEXNOW_SUBMIT_SECRET>" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://offlinetools.org/a/json-formatter/matlab-json-parsing-and-formatting-functions"}'
```

Submit multiple URLs:

```bash
curl -X POST https://offlinetools.org/api/indexnow \
  -H "Authorization: Bearer <INDEXNOW_SUBMIT_SECRET>" \
  -H "Content-Type: application/json" \
  -d '{"urlList":["https://offlinetools.org/a/page-1","https://offlinetools.org/a/page-2"]}'
```

The route also accepts `path`, `paths`, and `urls`.

### Agent Guidance

- If you create or update public pages in `landing`, consider whether they should be submitted to IndexNow.
- After deploy, submit the changed URLs through `/api/indexnow`.
- Do not expose `INDEXNOW_SUBMIT_SECRET` in client-side code, public docs, or browser requests.
- If an IndexNow submission fails, check that:
  - the page is live on `https://offlinetools.org`
  - the public key file is live on the same host
  - the production environment has `INDEXNOW_SUBMIT_SECRET`
  - the submitted URLs belong to `offlinetools.org`

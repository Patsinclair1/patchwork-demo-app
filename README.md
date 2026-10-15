# patchwork-demo-app

**Deliberately insecure demo** for Patchwork fulfilment dry-runs.

This repo is a tiny Next.js-style vibe-coded app stuffed with **obviously fake** credentials and insecure defaults so we can practise:

1. Scanning with [patchworkfix.com](https://patchworkfix.com)
2. Opening a "Fix it for me" style pull request

Do **not** treat any string in this repo as a real key. Values are placeholders like `sk-proj-FAKEFAKE…` and unsigned JWTs with role claims. They cannot authenticate anywhere.

## What's wrong on purpose

- Committed `.env` with fake OpenAI key
- Hard-coded OpenAI key in source
- Supabase `service_role` JWT in client-side code
- `/api/chat` calls OpenAI with no auth and no rate limit
- Open Firebase / Firestore rules (`if true`)

## Licence

Public domain / CC0 — demo only.

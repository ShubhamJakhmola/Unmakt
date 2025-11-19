## Unmakt

Modern marketing & product collective built with Vite + React + Tailwind.

### Getting Started

```bash
npm install
npm run dev
```

### Netlify + Neon Authentication

1. Create a Neon database via Netlify DB.
2. Run the SQL in `supabase/migrations/20251118100000_create_users_table.sql` against Neon to create the `users` table.
3. Add the following environment variables in Netlify:
   - `NETLIFY_DATABASE_URL`: provided by Netlify DB.
   - `AUTH_SECRET`: random string used to sign JWTs.
   - `ADMIN_INVITE_CODE`: optional string admins can use during registration.
4. Deploy to Netlify; the UI will communicate with the functions defined in `netlify/functions`.

### Local Netlify Functions

Use the Netlify CLI to develop functions locally (recommended):

```bash
npm install -g netlify-cli
netlify dev
```

### Mailjet (contact emails)

This project includes a Netlify Function `send-mailjet` which sends contact and subscription emails via Mailjet.

- Do NOT commit your Mailjet keys. Set these environment variables in Netlify (or locally when using `netlify dev`):
   - `MJ_API_KEY` — your Mailjet public API key
   - `MJ_SECRET_KEY` — your Mailjet secret key
   - `TEAM_EMAIL` (optional) — where contact emails will be sent (defaults to `unmakt.info@gmail.com`)
   - `FROM_EMAIL` (optional) — the From address for sent emails (defaults to `no-reply@unmakt.com`)

To test locally with Netlify CLI, run:

```bash
MJ_API_KEY=your_key MJ_SECRET_KEY=your_secret netlify dev
```

The contact form posts to `/.netlify/functions/send-mailjet`.


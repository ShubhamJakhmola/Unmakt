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

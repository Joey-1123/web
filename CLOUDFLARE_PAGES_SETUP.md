# Cloudflare Pages Launch Guide (Free Tier)

## 1) Push Repo To GitHub
1. Create a GitHub repo.
2. Push this project to `main`.
3. Keep branch protection enabled for `main` and require CI checks.

## 2) Create Cloudflare Pages Project
1. Open Cloudflare Dashboard -> `Workers & Pages` -> `Create` -> `Pages`.
2. Connect GitHub repo.
3. Build settings:
   - Framework preset: `None`
   - Build command: *(leave empty)*
   - Build output directory: `.`
4. Deploy.

## 3) Connect Custom Domain
1. In Pages project -> `Custom domains` -> add your domain.
2. Ensure DNS records are proxied (orange cloud).
3. Replace `YOUR_DOMAIN` in:
   - `robots.txt`
   - `sitemap.xml`
4. Re-deploy after replacement.

## 4) Security Hardening (Cloudflare + This Repo)
Already configured in `_headers`:
- HSTS
- CSP
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

Cloudflare dashboard settings to enable:
- SSL/TLS mode: `Full (strict)`
- Always Use HTTPS: `On`
- Minimum TLS Version: `1.2`
- WAF Managed Rules: `On`
- Bot Fight Mode: `On` (free)
- DNSSEC: `On`

## 5) Analytics (Free)
Use Cloudflare Web Analytics:
1. Dashboard -> `Analytics & Logs` -> `Web Analytics`.
2. Add site and enable tracking.
3. If snippet is provided, add it before `</head>` on pages.

## 6) Form Security
Current protections in frontend:
- Honeypot fields
- Client cooldown/rate limiting

Recommended production upgrade:
- Cloudflare Turnstile + server-side token verification (Cloudflare Worker).

## 7) Stability Checklist
- Keep CI green (`.github/workflows/validate.yml`).
- Do not deploy directly from unreviewed branches.
- Keep at least one known-good tag for rollback.
- Monitor uptime with free UptimeRobot.

# RP Bookkeeping self-hosting

This project can be built and served without AppDeploy, Netlify, Vercel or another website deployment platform.

## Local test

Requirements:
- Docker Desktop
- A clone of this repository

Run:

```bash
docker compose up --build
```

Then open:

```text
http://localhost:8080
```

Stop it with:

```bash
docker compose down
```

## Production plan

The container is intentionally only the website layer. Before exposing it to the public internet, put it behind a TLS reverse proxy, configure the domain, firewall, automatic backups and monitoring, and keep the server patched.

Do not put passwords, API keys or other secrets in the repository or inside the static website.

## Independence goal

The website source remains portable. A future self-hosted server can run the same container, and the domain can be moved between servers without rebuilding the website from scratch.

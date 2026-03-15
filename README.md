# Artur Blaya Web

Minimal Angular landing page for `arturblaya.com`, built in Docker and served by `nginx`.

## Stack

- Angular 20
- `nginx`
- Single `docker-compose.yml`
- Designed to run behind the centralized `Proxy-Artur-Blaya` edge proxy

## Networking

This project does not publish `80/443` on the host.
It exposes port `80` only on the shared Docker network:

- `artur-blaya-public-network`

The centralized proxy is responsible for:

- TLS certificates
- domain routing
- HTTP to HTTPS redirects

## Run

```bash
docker compose up -d --build
```

## Commands

```bash
docker compose up -d --build
docker compose logs -f web
docker compose down
```

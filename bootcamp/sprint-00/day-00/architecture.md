# Architecture Decisions

## Pattern

We use Clean Architecture principles:

- Presentation Layer (Controllers)
- Application Layer (Use Cases)
- Domain Layer (Business Logic)
- Infrastructure Layer (DB, external APIs)

---

## Backend Structure (NestJS)

src/
  modules/
    auth/
    users/
    promises/
    proofs/
  shared/
  config/

---

## Database

PostgreSQL

Tables:
- users
- promises
- proofs

---

## Communication

REST API (v1)

Later:
- WebSockets
- Event-driven architecture

---

## Storage

- Local (dev)
- S3 (production later)

---

## Caching

Redis (later phase)
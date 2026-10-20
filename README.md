# Advanced-Express

A RESTful API built with Express 5, TypeScript, and PostgreSQL. It provides user management, user profiles, and JWT-based authentication.

## Features

- User CRUD operations (create, list, get, update, delete)
- Profile management per user
- JWT-based authentication (login endpoint)
- Password hashing with bcrypt
- PostgreSQL via the `pg` connection pool

## Tech Stack

- [Express](https://expressjs.com/) v5 — web framework
- [TypeScript](https://www.typescriptlang.org/) — type-safe JavaScript
- [PostgreSQL](https://www.postgresql.org/) via [`pg`](https://node-postgres.com/) — database
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — JWT auth
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) — password hashing
- [tsx](https://github.com/privatenumber/tsx) — dev server with hot reload

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- A PostgreSQL database (local or hosted, e.g. [Neon](https://neon.tech))

### Installation

```bash
git clone https://github.com/RAYHAN-HEXA/Advanced-Express.git
cd Advanced-Express
npm install
```

### Environment Variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

| Variable             | Description                          |
| -------------------- | ------------------------------------ |
| `CONNECTIONSTRING`   | PostgreSQL connection string         |
| `PORT`               | Port the server listens on           |
| `JWT_SECRET`         | Secret used to sign JWT tokens       |

> **Note:** `.env` is gitignored — never commit real credentials.

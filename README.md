# Charkchalk Temp Backend

This a temp backend for Charkchalk by using Fastify + Prisma.

## Getting started

### 1. Setup environment variables

Copy the .env file and setup its content.

```bash=
cp .env.example .env
```

### 2. Install dependencies

```bash=
pnpm install
```

### 3. Host up database

```bash=
docker-compose up -d && docker-compose logs -f
```

### 4. Setup database

```bash=
pnpm prisma migrate dev
```

### 5. Generate database type definitions of Prisma Client

```bash=
pnpm prisma generate
```

### 6. Start server

```bash=
pnpm dev
```

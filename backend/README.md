# TechFest 2026 Backend

## 1. Install

Open a terminal in this `backend` folder:

```bash
npm install
```

## 2. Configure MongoDB Atlas

Create a MongoDB Atlas free cluster, create a database user, and add your current IP under Network Access.

Copy `.env.example` to `.env` and replace the placeholders. Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@YOUR-CLUSTER.mongodb.net/techfest2026
JWT_SECRET=use-a-long-random-secret
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
```

Do not commit `.env` or share your database password.

## 3. Seed events

Run once:

```bash
npm run seed
```

Expected output:

```text
Seeded 5 events.
```

## 4. Start backend

```bash
npm run dev
```

Expected:

```text
API running on port 5000
```

Health check: `http://localhost:5000/api/health`

Expected JSON:

```json
{"status":"ok"}
```

## API used by the React frontend

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/events`
- `POST /api/registrations`
- `GET /api/registrations/my`
- `DELETE /api/registrations/:id`

Authentication uses a JWT returned by login/signup and sent by the frontend as a Bearer token.

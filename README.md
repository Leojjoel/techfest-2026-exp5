# TechFest 2026 — Experiment 5 Complete Project

This archive contains the original React frontend plus a new Node/Express/MongoDB backend that matches the frontend's API calls.

## Folder structure

```text
TechFest2026-Experiment4/
├── frontend/
└── backend/
```

## Quick start

### Terminal 1 — backend

```bash
cd backend
npm install
```

Create `backend/.env` from `.env.example`, add your MongoDB Atlas connection string and a JWT secret, then:

```bash
npm run seed
npm run dev
```

### Terminal 2 — frontend

```bash
cd frontend
npm install
```

Create `frontend/.env` from `.env.example`:

```env
VITE\_API\_URL=http://localhost:5000
```

Then:

```bash
npm run dev
```

Open the URL shown by Vite, normally `http://localhost:5173`.

## Test order

1. Open `/api/health` and confirm `{"status":"ok"}`.
2. Open the React site.
3. Sign Up with a test account.
4. Login with that account.
5. Open Events and confirm the five events load.
6. Register for an event.
7. Open My Registrations and confirm the registration appears.
8. Cancel it and confirm the seat returns.

The frontend does not need a backend `node\_modules` folder in the ZIP; run `npm install` inside each folder.

Experiment 5 covers security, version control, CI/CD, cloud deployment, and performance optimization.


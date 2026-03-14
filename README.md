# JEEVAN NETRA - Contextual Enquiry Platform

A full-stack web app for collecting structured contextual enquiry data for a Centralized Hospital Management System (CHMS) design thinking initiative.

## Features
- Step-based enquiry flow: landing -> profession -> user details -> questions -> success
- Dynamic profession-specific questions for 14 stakeholder groups
- One-question-at-a-time UX with progress tracking
- Autosave and resume support via localStorage
- Secure backend with Helmet, rate limiting, CORS restrictions, and input sanitization
- Admin dashboard with Basic Auth, filtering, search, and CSV export

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Project Structure
- `client/` React frontend
- `server/` Express backend

## Local Setup
### Backend
```bash
cd server
npm install
cp .env.example .env
npm run dev
```
### Frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## Server Environment (`server/.env`)
```env
MONGO_URI=your_mongo_uri
ADMIN_USER=admin
ADMIN_PASS=strongpassword
CLIENT_URL=http://localhost:5173
PORT=5000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## Client Environment (`client/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## API
- `POST /api/responses`
- `GET /api/responses` (admin)
- `GET /api/responses?profession=doctor` (admin)
- `GET /api/responses/export` (admin CSV)
- `GET /api/health`

## Deployment
### Frontend (Vercel)
- Deploy `client`
- Set `VITE_API_BASE_URL`
- Build: `npm run build`
- Output: `dist`

### Backend (Render/Vercel)
- Deploy `server`
- Configure env vars from `.env.example`
- Use reachable MongoDB URI

## Security
- Secrets from environment variables only
- `.env` ignored by git
- CORS restricted to `CLIENT_URL`
- Helmet, rate limiting, and sanitization enabled

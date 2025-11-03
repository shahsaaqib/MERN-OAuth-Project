# Server - Image Search OAuth

## Setup
1. Copy .env.example to .env and fill keys.
2. Start MongoDB (docker-compose up -d at project root).
3. Install & run:
   cd server
   npm install
   npm run dev

## Endpoints
- GET /auth/google, /auth/github, /auth/facebook => begin OAuth
- GET /auth/me => get user (requires session cookie)
- POST /auth/logout => logout
- POST /api/search => protected, { term }
- GET  /api/top-searches => public
- GET  /api/history => protected


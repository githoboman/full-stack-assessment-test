# Book Management Dashboard

A full-stack application for managing books with authentication and CRUD operations.

## Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **GraphQL** - API query language with Apollo Server
- **TypeORM** - ORM for TypeScript
- **SQLite** - Lightweight database
- **Auth0** - Authentication and authorization

### Frontend
- **React** - UI library with TypeScript
- **Chakra UI** - Component library
- **Apollo Client** - GraphQL client
- **Auth0 React SDK** - Authentication
- **Vite** - Build tool

## Prerequisites

- Node.js 18+ and npm
- Auth0 account (free tier)

## Auth0 Setup

### 1. Create Auth0 Application

1. Go to [Auth0](https://auth0.com/) and create a free account
2. Create a new **Single Page Application** for the frontend
3. Note down:
   - Domain (e.g., `your-tenant.us.auth0.com`)
   - Client ID

### 2. Configure Application Settings

In your Auth0 Application settings:
- **Allowed Callback URLs**: `http://localhost:5173, https://your-frontend-domain.com`
- **Allowed Logout URLs**: `http://localhost:5173, https://your-frontend-domain.com`
- **Allowed Web Origins**: `http://localhost:5173, https://your-frontend-domain.com`

### 3. Create Auth0 API

1. Go to **Applications** → **APIs** in Auth0 dashboard
2. Create a new API
3. Set **Identifier** (e.g., `https://books-api.example.com`)
4. Note down the API Identifier

## Installation

### Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env` file:
```env
AUTH0_DOMAIN=your-tenant.us.auth0.com
AUTH0_AUDIENCE=https://books-api.example.com
PORT=3000
```

Start the backend:
```bash
npm run start:dev
```

GraphQL Playground: http://localhost:3000/graphql

### Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env` file:
```env
VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=https://books-api.example.com
VITE_API_URL=http://localhost:3000/graphql
```

Start the frontend:
```bash
npm run dev
```

Application: http://localhost:5173

## Features

- ✅ **Authentication**: Sign up and sign in using Auth0
- ✅ **View Books**: Table displaying all books
- ✅ **Create Book**: Add new books with name and description
- ✅ **Edit Book**: Update existing book details
- ✅ **Delete Book**: Remove books from the database
- ✅ **Protected API**: GraphQL API restricted to authenticated users only

## Development

### Conventional Commits

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
feat: add book creation functionality
fix: resolve authentication token issue
docs: update README with deployment steps
chore: update dependencies
```

### Database

The SQLite database is stored in `backend/database.sqlite` and is committed to the repository. The schema is automatically created on first run.

## Deployment

### Backend (Render/Fly.io)

1. Create a new Web Service
2. Connect your repository
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npm run start:prod`
5. Add environment variables:
   - `AUTH0_DOMAIN`
   - `AUTH0_AUDIENCE`
   - `NODE_ENV=production`

### Frontend (Netlify/Vercel)

1. Create a new site
2. Connect your repository
3. Set build command: `cd frontend && npm install && npm run build`
4. Set publish directory: `frontend/dist`
5. Add environment variables:
   - `VITE_AUTH0_DOMAIN`
   - `VITE_AUTH0_CLIENT_ID`
   - `VITE_AUTH0_AUDIENCE`
   - `VITE_API_URL` (your backend URL)

6. Update Auth0 settings with production URLs

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── auth/          # Auth0 guards and configuration
│   │   ├── books/         # Books module (entity, resolver, service)
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── database.sqlite    # SQLite database
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── graphql/       # GraphQL queries and mutations
│   │   ├── apollo-client.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── README.md
```

## Troubleshooting

### Common Errors

#### 1. JWT validation error: `getaddrinfo ENOTFOUND undefined`
*   **Cause**: The backend is not loading environment variables correctly, so `AUTH0_DOMAIN` is undefined.
*   **Solution**: Ensure `ConfigModule.forRoot({ isGlobal: true })` is imported in `app.module.ts`. Verify your `backend/.env` file exists and contains `AUTH0_DOMAIN`.

#### 2. `Invalid token` or 401 Unauthorized
*   **Cause**: Mismatch between the token's audience/issuer and the backend's expected configuration.
*   **Solution**:
    *   Ensure `VITE_AUTH0_AUDIENCE` in `frontend/.env` matches `AUTH0_AUDIENCE` in `backend/.env`.
    *   Ensure `VITE_AUTH0_DOMAIN` matches `AUTH0_DOMAIN`.
    *   Restart the backend if you change `.env` files.

#### 3. `EADDRINUSE: address already in use :::3000`
*   **Cause**: The backend port 3000 is occupied by a stuck process (e.g., a previous run that didn't exit cleanly).
*   **Solution**:
    *   **Windows**: Run `netstat -ano | findstr :3000` to find the PID, then `taskkill /PID <PID> /F`.
    *   **Mac/Linux**: Run `lsof -i :3000`, then `kill -9 <PID>`.

## License

MIT

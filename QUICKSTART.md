# Quick Start Guide

This guide will help you get the Book Management Dashboard running locally.

## Prerequisites

- Node.js 18+ installed
- Auth0 account (see [AUTH0_SETUP.md](AUTH0_SETUP.md) for detailed setup)

## Quick Setup (5 minutes)

### 1. Configure Auth0

Follow the [AUTH0_SETUP.md](AUTH0_SETUP.md) guide to:
- Create Auth0 application
- Create Auth0 API
- Get your credentials

### 2. Set Up Backend

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env and add your Auth0 credentials:
# AUTH0_DOMAIN=your-domain.us.auth0.com
# AUTH0_AUDIENCE=https://books-api.example.com

# Install dependencies
npm install

# Start server (will create database.sqlite automatically)
npm run start:dev
```

Backend will run on http://localhost:3000/graphql

### 3. Set Up Frontend

Open a new terminal:

```bash
cd frontend

# Copy environment file
cp .env.example .env

# Edit .env and add your Auth0 credentials:
# VITE_AUTH0_DOMAIN=your-domain.us.auth0.com
# VITE_AUTH0_CLIENT_ID=your-client-id
# VITE_AUTH0_AUDIENCE=https://books-api.example.com

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on http://localhost:5173

### 4. Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Sign In with Auth0"
3. Create a new Auth0 account or sign in
4. You'll be redirected to the dashboard
5. Create, edit, and delete books!

## Project Structure

```
├── backend/                # NestJS GraphQL API
│   ├── src/
│   │   ├── auth/          # Auth0 authentication
│   │   ├── books/         # Books CRUD module
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── database.sqlite    # SQLite database (auto-created)
│
├── frontend/              # React SPA
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── graphql/      # GraphQL queries/mutations
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── README.md             # Full documentation
└── AUTH0_SETUP.md       # Auth0 configuration guide
```

## Common Issues

**"Invalid callback URL"**
- Check Auth0 settings include `http://localhost:5173/dashboard`

**CORS errors**
- Ensure backend is running on port 3000
- Check frontend is using `http://localhost:3000/graphql`

**Dependencies not installing**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Next Steps

- See [README.md](README.md) for deployment instructions
- Customize the UI styling in frontend components
- Add more book fields (author, ISBN, etc.)
- Deploy to production (see README.md)

## Development Commands

**Backend:**
```bash
npm run start:dev  # Development with watch mode
npm run build      # Build for production
npm run start:prod # Run production build
```

**Frontend:**
```bash
npm run dev     # Development server
npm run build   # Build for production
npm run preview # Preview production build
```

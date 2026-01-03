# Auth0 Setup Guide

Follow these steps to configure Auth0 for this application.

## Step 1: Create Auth0 Account

1. Go to [https://auth0.com/](https://auth0.com/)
2. Click "Sign Up" and create a free account
3. Complete the account setup

## Step 2: Create a Single Page Application

1. In the Auth0 Dashboard, go to **Applications** → **Applications**
2. Click **"Create Application"**
3. Name it: `Book Management App`
4. Select **"Single Page Application"**
5. Click **"Create"**

## Step 3: Configure Application Settings

In your application's **Settings** tab:

### Note down these values:
- **Domain** (e.g., `dev-xxxxx.us.auth0.com`)
- **Client ID** (e.g., `abc123...`)

### Configure URLs:

**Allowed Callback URLs:**
```
http://localhost:5173/dashboard, https://your-deployed-frontend.netlify.app/dashboard
```

**Allowed Logout URLs:**
```
http://localhost:5173, https://your-deployed-frontend.netlify.app
```

**Allowed Web Origins:**
```
http://localhost:5173, https://your-deployed-frontend.netlify.app
```

Click **"Save Changes"**

## Step 4: Create Auth0 API

1. In the Auth0 Dashboard, go to **Applications** → **APIs**
2. Click **"Create API"**
3. Fill in:
   - **Name**: `Book Management API`
   - **Identifier**: `https://books-api.example.com` (this can be any URI, doesn't need to be a real URL)
   - **Signing Algorithm**: `RS256`
4. Click **"Create"**
5. Note down the **Identifier** value

## Step 5: Configure Backend Environment

Create `backend/.env` file:

```env
AUTH0_DOMAIN=dev-xxxxx.us.auth0.com
AUTH0_AUDIENCE=https://books-api.example.com
PORT=3000
```

Replace with your actual values from steps above.

## Step 6: Configure Frontend Environment

Create `frontend/.env` file:

```env
VITE_AUTH0_DOMAIN=dev-xxxxx.us.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id-here
VITE_AUTH0_AUDIENCE=https://books-api.example.com
VITE_API_URL=http://localhost:3000/graphql
```

Replace with your actual values from steps above.

## Step 7: Test the Setup

1. Start the backend: `cd backend && npm install && npm run start:dev`
2. Start the frontend: `cd frontend && npm install && npm run dev`
3. Navigate to `http://localhost:5173`
4. Click "Sign In with Auth0"
5. You should be redirected to Auth0's login page

## Production Deployment

After deploying your app, remember to update Auth0 settings:

1. Add production URLs to **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins**
2. Update frontend `.env` with production backend URL:
   ```env
   VITE_API_URL=https://your-backend.render.com/graphql
   ```

## Troubleshooting

### "Invalid Callback URL" Error
- Make sure the callback URL in Auth0 settings matches exactly (including `/dashboard`)

### "Invalid Token" Error
- Verify that `AUTH0_AUDIENCE` matches exactly in both backend and frontend
- Check that `AUTH0_DOMAIN` is correct in both environments

### CORS Errors
- Ensure backend is running and CORS is properly configured in `main.ts`
- Check that frontend is using the correct API URL

# Deployment Guide: Zupiq E-commerce

Get your application live on the web! Follow these steps to deploy your backend to Render and frontend to Vercel.

## Step 0: Push Latest Code
Before deploying, make sure your latest code is on GitHub. Run these commands in your terminal:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Prerequisites
1.  **GitHub Repo**: Ensure your code is pushed to a GitHub repository.
2.  **Neon DB**: Have your Postgres connection string handy.
    - It looks like: `postgres://user:pass@ep-xyz.aws.neon.tech/neondb?sslmode=require`

---

## Part 1: Deploy Backend (Render)
Render is great for Node.js/Express apps.

1.  Go to [dashboard.render.com](https://dashboard.render.com) and click **"New +"** -> **"Web Service"**.
2.  Connect your GitHub repository.
3.  Fill in the details:
    *   **Name**: `zupiq-backend` (or similar)
    *   **Root Directory**: `backend` (Important!)
    *   **Runtime**: Node
    *   **Build Command**: `npm install && npx prisma generate`
    *   **Start Command**: `npx prisma migrate deploy && node src/index.js`
4.  **Environment Variables** (Scroll down to "Advanced" or "Environment"):
    *   Add Key: `DATABASE_URL` -> Value: `Your Neon connection string`
    *   Add Key: `JWT_SECRET` -> Value: `some_super_secret_random_string`
    *   Add Key: `NODE_ENV` -> Value: `production`
5.  Click **"Create Web Service"**.
6.  **Wait** for the deployment to finish. It might take a few minutes.
7.  **Copy your Backend URL**. It will look like `https://zupiq-backend.onrender.com`.

> [!IMPORTANT]
> The first deploy might fail if the database connection string is wrong. Check the "Logs" tab if you see errors.

---

## Part 2: Deploy Frontend (Vercel)
Vercel is the best place for React apps.

1.  Go to [vercel.com](https://vercel.com) and click **"Add New..."** -> **"Project"**.
2.  Import your GitHub repository.
3.  **Configure Project**:
    *   **Framework Preset**: Create React App
    *   **Root Directory**: Click "Edit" and select `frontend`.
4.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Key: `REACT_APP_API_URL`
    *   Value: **Your Backend URL** from Part 1 + `/api`
        *   *Example*: `https://zupiq-backend.onrender.com/api` (Make sure to include `/api` at the end if that's how your routes are set up!)
5.  Click **"Deploy"**.
6.  Wait for the confetti! 🎉

---

## Part 3: Verify Deployment
1.  Click the **domain** Vercel gives you (e.g., `zupiq-ecommerce.vercel.app`).
2.  Open the **Console** (F12) to check for any errors.
3.  Try to **Sign Up** a new user.
4.  If it works, you are live!

### Troubleshooting
- **CORS Errors**: If you see "blocked by CORS policy", it implies the backend isn't accepting requests from your Vercel domain.
    - *Fix*: Your current code allows all origins (`app.use(cors())`), so this likely won't happen. If it does, check the backend logs.
- **404 Errors on Refresh**: If you refresh a page like `/cart` and get a 404.
    - *Fix*: Vercel usually handles this automatically for Create React App, but if not, let me know, and we can add a `vercel.json`.
- **Database Connection**: If the backend crashes, check Render logs. Ensure `DATABASE_URL` is correct.

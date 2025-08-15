# Cloudflare Deployment Guide for Tulo Afrika

## 📋 Prerequisites Checklist
- ✅ Cloudflare account created (rgertze27@gmail.com)
- ✅ Repository connected to Cloudflare Pages (tulo-afrika)
- 🔄 D1 Database needs to be created
- 🔄 KV Namespace needs to be created
- 🔄 Environment variables need to be configured

## 🚀 Step-by-Step Setup Instructions

### Step 1: Create D1 Database

1. **Go to Cloudflare Dashboard** → **Workers & Pages** → **D1** (in the sidebar)
2. Click **"Create database"**
3. Enter database name: `tulo-afrika-db`
4. Choose location closest to your users
5. Click **"Create"**
6. **IMPORTANT**: Copy the **Database ID** that appears (looks like: `xxxx-xxxx-xxxx-xxxx`)

### Step 2: Create KV Namespace for Sessions

1. **Go to Cloudflare Dashboard** → **Workers & Pages** → **KV**
2. Click **"Create a namespace"**
3. Enter namespace name: `tulo-afrika-sessions`
4. Click **"Add"**
5. **IMPORTANT**: Copy the **Namespace ID** that appears

### Step 3: Configure Your Pages Project

1. **Go to your Pages project**: `tulo-afrika`
2. Click **"Settings"** tab
3. Go to **"Functions"** section
4. Click **"Add binding"**

Add these bindings:

#### D1 Database Binding:
- **Variable name**: `DB`
- **D1 database**: Select `tulo-afrika-db`

#### KV Namespace Binding:
- **Variable name**: `SESSIONS`
- **KV namespace**: Select `tulo-afrika-sessions`

### Step 4: Add Environment Variables

Still in **Settings** → **Environment variables**:

1. Click **"Add variable"**
2. Add these variables:

```
OPENROUTER_API_KEY = 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
OPENROUTER_API_URL = https://openrouter.ai/api/v1
```

### Step 5: Update Local Configuration

Now update your `wrangler.toml` file with the actual IDs:

```toml
name = "tulo-afrika"
pages_build_output_dir = "dist"
compatibility_date = "2024-01-01"

# D1 Database configuration
[[d1_databases]]
binding = "DB"
database_name = "tulo-afrika-db"
database_id = "YOUR_D1_DATABASE_ID_HERE"  # <-- Paste your D1 Database ID

# KV Namespace for sessions
[[kv_namespaces]]
binding = "SESSIONS"
id = "YOUR_KV_NAMESPACE_ID_HERE"  # <-- Paste your KV Namespace ID

# Environment variables (already configured in dashboard)
[vars]
OPENROUTER_API_KEY = "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"
OPENROUTER_API_URL = "https://openrouter.ai/api/v1"
```

### Step 6: Initialize Database Schema

After updating `wrangler.toml`, run these commands in your terminal:

```bash
# Login to Cloudflare (if not already)
npx wrangler login

# Execute the schema on your D1 database
npx wrangler d1 execute tulo-afrika-db --file=./schema.sql
```

### Step 7: Deploy Your Application

There are two ways to deploy:

#### Option A: Automatic Deployment (Recommended)
Your Pages project is already connected to your GitHub repository. Any push to the main branch will automatically deploy.

1. Push your changes to GitHub:
```bash
git push origin main
```

2. Go to Cloudflare Dashboard → Your Pages project
3. Watch the deployment progress

#### Option B: Manual Deployment
```bash
# Build and deploy manually
npm run build
npx wrangler pages deploy dist --project-name=tulo-afrika
```

### Step 8: Configure Build Settings in Cloudflare

1. Go to your **Pages project** → **Settings** → **Builds & deployments**
2. Set these configurations:

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`
- **Node.js version**: `18`

### Step 9: Update Pages Functions Compatibility

In your Pages project settings:
1. Go to **Settings** → **Functions**
2. Set **Compatibility date** to: `2024-01-01`
3. Set **Compatibility flags** (if needed): `nodejs_compat`

## 🔍 Verify Your Setup

After deployment, test these endpoints:

1. **Your site URL**: `https://tulo-afrika.pages.dev`
2. **API Health Check**: `https://tulo-afrika.pages.dev/api/health`
3. **Test Login**:
```bash
curl -X POST https://tulo-afrika.pages.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo.student@tutokitulo.africa","password":"student123"}'
```

## 🛠️ Troubleshooting

### If you get "D1 database not found" error:
1. Make sure the database ID in `wrangler.toml` matches exactly
2. Check that the binding name is `DB` (case-sensitive)

### If you get "KV namespace not found" error:
1. Verify the KV namespace ID is correct
2. Check that the binding name is `SESSIONS`

### If API calls fail:
1. Check Functions logs: Dashboard → Your project → **Functions** → **Real-time logs**
2. Verify environment variables are set correctly
3. Check that the OpenRouter API key is valid

### View deployment logs:
```bash
npx wrangler pages deployment tail --project-name=tulo-afrika
```

## 📝 Important Files Structure

Your Cloudflare Pages will use these files:
```
/dist                    # Built frontend files
/functions               # Cloudflare Functions (API)
  /api
    [[path]].ts         # Main API router
  /routes               # API route handlers
  /utils                # Utility functions
wrangler.toml           # Cloudflare configuration
schema.sql              # Database schema
```

## 🎯 Next Steps After Deployment

1. **Test all features**:
   - Login with demo accounts
   - Test AI Search
   - Test AI Chat
   - Test AI Co-Pilot

2. **Monitor usage**:
   - Check D1 database queries
   - Monitor KV operations
   - Track API usage

3. **Custom domain** (optional):
   - Go to Pages project → **Custom domains**
   - Add your domain

## 🔐 Security Notes

- The OpenRouter API key is stored securely in Cloudflare environment variables
- Never commit API keys to your repository
- Use Cloudflare's built-in DDoS protection

## 📊 Monitoring Your Application

1. **Analytics**: Dashboard → Your project → **Analytics**
2. **Logs**: Dashboard → Your project → **Functions** → **Logs**
3. **D1 Metrics**: Dashboard → **D1** → Your database → **Metrics**

## ✅ Deployment Checklist

- [ ] D1 Database created
- [ ] KV Namespace created
- [ ] Database ID added to wrangler.toml
- [ ] KV Namespace ID added to wrangler.toml
- [ ] Environment variables configured in Cloudflare
- [ ] Database schema deployed
- [ ] Functions bindings configured
- [ ] Application deployed
- [ ] All features tested

## 🆘 Need Help?

1. Check Cloudflare Pages documentation: https://developers.cloudflare.com/pages/
2. View your deployment status: https://dash.cloudflare.com/
3. Check Functions logs for errors

Your application will be available at:
**https://tulo-afrika.pages.dev**

After completing these steps, your fullstack application with AI features will be live on Cloudflare's global network!
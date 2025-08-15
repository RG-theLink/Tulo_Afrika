# 🔧 Fix Cloudflare Pages Build Settings

## The Problem
Cloudflare Pages is not building the application - it's looking for the `dist` folder but can't find it because no build command is running.

## ✅ Quick Fix: Configure Build Settings in Cloudflare Dashboard

### Step 1: Go to Build Configuration
1. Go to https://dash.cloudflare.com
2. Click on your `tulo-afrika` Pages project
3. Go to **Settings** → **Builds & deployments**
4. Click **Edit** on "Build configurations"

### Step 2: Set These Build Settings
- **Framework preset**: `None` (or `Create React App` if available)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory (advanced)**: `/` (leave as is)
- **Environment variables (advanced)**: `NODE_VERSION` = `18`

### Step 3: Add Environment Variables
Still in Settings → Environment variables, make sure you have:
- `OPENROUTER_API_KEY` = [Your new API key from https://openrouter.ai/keys]
- `OPENROUTER_API_URL` = `https://openrouter.ai/api/v1`

### Step 4: Trigger New Deployment
After saving the build configuration:
1. Go to the **Deployments** tab
2. Click **Retry deployment** on the latest failed deployment
OR
3. Make a small change and push to trigger a new build

## 📋 Complete Build Settings Checklist

| Setting | Value |
|---------|-------|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node version | `18` |

## 🚀 Alternative: Manual Deployment (If Needed)

If automatic deployment still fails, you can deploy manually:

```bash
# On your local machine
git clone https://github.com/RG-theLink/Tulo_Afrika.git
cd Tulo_Afrika
npm install
npm run build
npx wrangler pages deploy dist --project-name=tulo-afrika
```

## ✅ Expected Result
After configuring build settings:
1. Cloudflare will run `npm install` automatically
2. Then run `npm run build`
3. Deploy the `dist` folder
4. Your app will be live at https://tulo-afrika.pages.dev

## 🔍 Verify Success
- Build logs should show "Success"
- No "dist folder not found" error
- Site accessible at https://tulo-afrika.pages.dev

## 💡 Important Notes
- The `wrangler.toml` file is now correctly configured for Pages
- Build settings must be configured in Cloudflare Dashboard, not in wrangler.toml
- Environment variables (API keys) must be set in Dashboard for security
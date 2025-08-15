# 🔧 Netlify Frontend + Cloudflare Backend Setup Guide

## 📍 Current Architecture

You have a **distributed deployment**:
- **Frontend**: Deployed on Netlify (your main website)
- **Backend/AI**: Deployed on Cloudflare Pages (API and AI functions)

This is actually a good architecture! But they need to be connected properly.

## 🚨 The Problem

Your Netlify frontend is trying to call `/api` which doesn't exist on Netlify. It needs to call the Cloudflare Pages API instead.

## ✅ Solution: Configure API Endpoint

### Option 1: Environment Variable (Recommended)

#### Step 1: Create `.env` file in your project root
```env
VITE_API_URL=https://tulo-afrika.pages.dev/api
```

#### Step 2: Add to Netlify Environment Variables
1. Go to **Netlify Dashboard** → Your Site → **Site Settings**
2. Click **Environment Variables**
3. Add:
   ```
   VITE_API_URL = https://tulo-afrika.pages.dev/api
   ```
4. Click **Save**

#### Step 3: Redeploy on Netlify
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**

### Option 2: Update API Configuration Directly

Edit `/src/lib/api.ts`:

```typescript
// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tulo-afrika.pages.dev/api';
```

### Option 3: Use Netlify Redirects (Proxy)

Create `netlify.toml` in your project root:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://tulo-afrika.pages.dev/api/:splat"
  status = 200
  force = true

[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type, Authorization"
```

## 🎯 Complete Setup Steps

### For Netlify (Frontend):

1. **Add Environment Variable**:
   - Go to: https://app.netlify.com
   - Select your site
   - Settings → Environment Variables
   - Add: `VITE_API_URL = https://tulo-afrika.pages.dev/api`

2. **Configure CORS** (if needed):
   Add to `netlify.toml`:
   ```toml
   [[headers]]
     for = "/*"
     [headers.values]
       Access-Control-Allow-Origin = "*"
   ```

3. **Redeploy**:
   - Trigger a new deploy from Netlify dashboard

### For Cloudflare (Backend):

Your Cloudflare backend is already configured correctly with:
- ✅ CORS headers enabled
- ✅ AI providers configured
- ✅ Environment variables set

No changes needed on Cloudflare side!

## 🔍 Verification Steps

After setting up:

1. **Check API Connection**:
   Open browser console on your Netlify site and run:
   ```javascript
   fetch('https://tulo-afrika.pages.dev/api/diagnostic/status')
     .then(r => r.json())
     .then(console.log)
   ```

2. **Test AI Directly**:
   ```javascript
   fetch('https://tulo-afrika.pages.dev/api/ai/chat', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({message: 'Hello'})
   })
   .then(r => r.json())
   .then(console.log)
   ```

## 📊 Architecture Diagram

```
User Browser
     ↓
[Netlify Frontend]
https://yoursite.netlify.app
     ↓ (API calls)
[Cloudflare Backend]
https://tulo-afrika.pages.dev/api
     ↓
[Cloudflare AI + OpenRouter]
```

## 🚀 Quick Fix (Immediate)

If you need it working RIGHT NOW, add this to your Netlify site:

1. Go to Netlify Dashboard
2. Site Settings → Environment Variables
3. Add:
   ```
   VITE_API_URL = https://tulo-afrika.pages.dev/api
   ```
4. Redeploy

That's it! Your AI will work immediately.

## 💡 Best Practices

1. **Use Environment Variables**: Don't hardcode API URLs
2. **Enable CORS**: Already done on Cloudflare side
3. **Use HTTPS**: Both Netlify and Cloudflare use HTTPS by default
4. **Monitor Both Services**: Check both Netlify and Cloudflare logs

## 🎯 Summary

Your setup is:
- **Frontend (UI)**: Netlify - handles the user interface
- **Backend (API/AI)**: Cloudflare Pages - handles AI and data

You just need to tell Netlify where to find the Cloudflare API by setting:
```
VITE_API_URL = https://tulo-afrika.pages.dev/api
```

This is a professional architecture used by many production applications!
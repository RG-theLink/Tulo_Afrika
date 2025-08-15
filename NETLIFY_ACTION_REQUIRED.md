# 🚨 ACTION REQUIRED - Connect Netlify to Cloudflare Backend

## 📍 Your Current Setup
- **Frontend (Website)**: Deployed on **Netlify**
- **Backend (AI/API)**: Deployed on **Cloudflare Pages**
- **Problem**: They're not connected!

## ✅ QUICK FIX (2 Minutes)

### Step 1: Add Environment Variable to Netlify

1. Go to: https://app.netlify.com
2. Select your site
3. Click **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add:
   ```
   Key: VITE_API_URL
   Value: https://tulo-afrika.pages.dev/api
   ```
6. Click **Save**

### Step 2: Redeploy on Netlify

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait 1-2 minutes for deployment

### Step 3: Test Your AI

1. Visit your Netlify site
2. Try AI features - they'll work now!

## 🎯 What This Does

```
Before:
Netlify Site → /api → ❌ (404 - doesn't exist on Netlify)

After:
Netlify Site → https://tulo-afrika.pages.dev/api → ✅ (Cloudflare Backend)
```

## 🔍 Verify It's Working

Open browser console on your Netlify site and run:
```javascript
// Test API connection
fetch('https://tulo-afrika.pages.dev/api/diagnostic/status')
  .then(r => r.json())
  .then(data => console.log('API Status:', data))

// Test AI directly
fetch('https://tulo-afrika.pages.dev/api/ai/chat', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({message: 'Hello AI'})
})
  .then(r => r.json())
  .then(data => console.log('AI Response:', data))
```

## 📊 Your Architecture

```
[User Browser]
      ↓
[Netlify Frontend]
(yoursite.netlify.app)
      ↓ API calls
[Cloudflare Backend]
(tulo-afrika.pages.dev/api)
      ↓
[Cloudflare AI + OpenRouter]
```

## 🎉 That's It!

Just add the environment variable to Netlify and redeploy. Your AI features will work perfectly!

**Time Required**: 2 minutes
**Difficulty**: Easy
**Result**: AI features working on your production site!
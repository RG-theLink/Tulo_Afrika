# 🔐 API Key Setup Guide

## ⚠️ IMPORTANT: Security Update

Your previous OpenRouter API key was exposed in the public repository and has been disabled for security reasons. Follow these steps to set up a new key securely.

## Step 1: Get a New OpenRouter API Key

1. Go to https://openrouter.ai/keys
2. Create a new API key
3. **IMPORTANT**: Set a spending limit to avoid unexpected charges
4. **Copy the new key** (you'll need it in the next steps)

## Step 2: Add API Key to Cloudflare (Production)

1. Go to your Cloudflare Dashboard: https://dash.cloudflare.com
2. Navigate to your `tulo-afrika` Pages project
3. Go to **Settings** → **Environment variables**
4. **Update** the existing variable:
   - Variable name: `OPENROUTER_API_KEY`
   - Value: `[Your new API key]`
5. Click **Save**

## Step 3: For Local Development

Create a `.env.local` file in your project root (if testing locally):

```bash
OPENROUTER_API_KEY=your_new_api_key_here
OPENROUTER_API_URL=https://openrouter.ai/api/v1
```

**Note**: This file is already in `.gitignore` and will never be committed to GitHub.

## 🆓 Using the Free Model

The application has been updated to use the **free** OpenAI model:
- Model: `openai/gpt-oss-20b`
- Cost: **FREE** (no charges)
- Quality: Good for educational content

## 📝 What Changed:

1. **Removed hardcoded API keys** from all code files
2. **Updated to free model** (`openai/gpt-oss-20b`) to avoid charges
3. **Fixed wrangler.toml** for proper Cloudflare Pages deployment
4. **API keys now use environment variables** for security

## 🔒 Security Best Practices:

1. **Never commit API keys** to GitHub
2. **Always use environment variables** for sensitive data
3. **Set spending limits** on your OpenRouter account
4. **Rotate keys regularly** if exposed
5. **Use the free model** to avoid unexpected charges

## 🚀 After Setting Up New Key:

1. **Redeploy your application**:
   - The deployment should work now with the fixed `wrangler.toml`
   - Cloudflare will automatically rebuild with the new environment variable

2. **Test the AI features**:
   - Login to your app
   - Try the AI Search, Chat, and Co-Pilot
   - Verify they're working with the free model

## 💡 Tips:

- The free `gpt-oss-20b` model is sufficient for educational content
- If you need better quality, you can upgrade to paid models later
- Monitor your OpenRouter dashboard for usage: https://openrouter.ai/activity

## ✅ Checklist:

- [ ] Created new OpenRouter API key
- [ ] Added key to Cloudflare environment variables
- [ ] Set spending limit on OpenRouter
- [ ] Verified wrangler.toml is fixed
- [ ] Redeployed application
- [ ] Tested AI features are working

Your application is now secure and using the free model!
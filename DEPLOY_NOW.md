# 🚀 Deploy Your Application NOW - Simple Steps

## Where to Run the Commands

You need to run these commands on **YOUR LOCAL COMPUTER** where you can:
1. Download/clone this repository
2. Open a terminal (Command Prompt, PowerShell, Terminal, or Git Bash)
3. Navigate to the project folder

## Option 1: If You Have Git Installed

1. **Open a terminal on your computer** (not in the browser)
   - Windows: Open Command Prompt or PowerShell
   - Mac: Open Terminal
   - Linux: Open Terminal

2. **Clone the repository:**
```bash
git clone [YOUR_REPOSITORY_URL]
cd [YOUR_REPOSITORY_NAME]
```

3. **Install dependencies:**
```bash
npm install
```

4. **Run the deployment script:**
```bash
./deploy-to-cloudflare.sh
```

## Option 2: Manual Commands (Step by Step)

Run these commands one by one in your terminal:

```bash
# 1. First, make sure you're in the project directory
cd path/to/your/project

# 2. Install dependencies (if not already installed)
npm install

# 3. Login to Cloudflare
npx wrangler login
# This will open a browser window - login with your rgertze27@gmail.com account

# 4. Deploy the database schema
npx wrangler d1 execute tulo-afrika-db --file=./schema.sql

# 5. Build the application
npm run build

# 6. Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=tulo-afrika
```

## Option 3: Direct from GitHub (Easiest!)

Since your Cloudflare Pages is already connected to your GitHub repository:

1. **Push all changes to GitHub:**
```bash
git add .
git commit -m "Deploy to Cloudflare"
git push origin main
```

2. **Cloudflare will automatically deploy!**
   - Go to https://dash.cloudflare.com/
   - Click on your `tulo-afrika` project
   - Watch the deployment progress
   - It will be live in 2-3 minutes!

## 🔍 After Deployment

Your app will be available at:
**https://tulo-afrika.pages.dev**

### Test the AI Features:
1. Go to https://tulo-afrika.pages.dev
2. Login with:
   - Email: `demo.student@tutokitulo.africa`
   - Password: `student123`
3. Test:
   - AI Search: Search for "photosynthesis" or any topic
   - AI Chat: Click the chat tab and ask questions
   - AI Co-Pilot: Use the widget on the right sidebar

## ⚠️ Important Notes

- Your D1 Database ID: `475e676a-195d-4ab5-9ddc-c83f2cf37ac9` ✅
- Your KV Namespace ID: `0a6c7569067047a9b141acbd7d3ea374` ✅
- These are already configured in `wrangler.toml`

## 🆘 If You Get Errors

1. **"wrangler: command not found"**
   - Run: `npm install -g wrangler`

2. **"Not authenticated"**
   - Run: `npx wrangler login`

3. **"Database not found"**
   - Make sure you're logged into the correct Cloudflare account

4. **Build errors**
   - Run: `npm install` to ensure all dependencies are installed

## 📱 Quick Deploy from Download

If you downloaded the code as a ZIP:

1. Extract the ZIP file
2. Open terminal in that folder
3. Run:
```bash
npm install
npx wrangler login
npx wrangler d1 execute tulo-afrika-db --file=./schema.sql
npm run build
npx wrangler pages deploy dist --project-name=tulo-afrika
```

That's it! Your app will be live at https://tulo-afrika.pages.dev 🎉
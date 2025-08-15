# Tulo Afrika - Fullstack Application Deployment Guide

## 🚀 Overview

This application is now a fully functional fullstack application with:
- **Frontend**: React + TypeScript + Vite
- **Backend**: Cloudflare Workers with D1 Database
- **AI Integration**: OpenRouter API for AI features
- **Database**: Cloudflare D1 (SQLite)

## 🌟 Features Implemented

### ✅ Backend Infrastructure
- Cloudflare Workers API endpoints
- D1 Database with complete schema
- Authentication system with JWT tokens
- Session management with KV storage

### ✅ AI Features (Powered by OpenRouter)
1. **AI Search Engine**: Educational content search with comprehensive explanations
2. **AI Co-Pilot**: Personalized learning assistant for students, educators, and admins
3. **AI Chatbot**: Interactive chat interface for learning support

### ✅ Core Features
- User authentication (students, educators, admins, schools)
- Resource management system
- Messaging platform
- Waitlist management
- User profiles and dashboards

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- Cloudflare account
- Wrangler CLI installed (`npm install -g wrangler`)

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Create D1 Database locally:**
```bash
npx wrangler d1 create tulo-afrika-db
```

3. **Initialize database schema:**
```bash
npx wrangler d1 execute tulo-afrika-db --local --file=./schema.sql
```

4. **Run development server:**
```bash
npm run dev
```

## 🌐 Deployment to Cloudflare Pages

### Step 1: Create Cloudflare Account & Setup
1. Sign up at [Cloudflare](https://dash.cloudflare.com/sign-up)
2. Install and authenticate Wrangler:
```bash
npx wrangler login
```

### Step 2: Create D1 Database
```bash
# Create production database
npx wrangler d1 create tulo-afrika-db

# Note the database_id returned and update wrangler.toml
```

### Step 3: Create KV Namespace
```bash
# Create KV namespace for sessions
npx wrangler kv:namespace create "SESSIONS"

# Note the namespace_id and update wrangler.toml
```

### Step 4: Update wrangler.toml
Replace the placeholder IDs in `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "tulo-afrika-db"
database_id = "YOUR_DATABASE_ID_HERE"  # <-- Update this

[[kv_namespaces]]
binding = "SESSIONS"
id = "YOUR_KV_NAMESPACE_ID"  # <-- Update this
```

### Step 5: Initialize Production Database
```bash
npx wrangler d1 execute tulo-afrika-db --file=./schema.sql
```

### Step 6: Deploy to Cloudflare Pages
```bash
# Build and deploy
npm run deploy

# Or manual deployment
npm run build
npx wrangler pages deploy dist
```

### Step 7: Configure Custom Domain (Optional)
1. Go to Cloudflare Dashboard > Pages
2. Select your project
3. Go to Custom domains
4. Add your domain

## 🔑 API Configuration

### OpenRouter API
The application uses OpenRouter for AI features with the provided API key:
```
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
```

This key is configured in `wrangler.toml` for production use.

## 📱 Using the Application

### Default Demo Users
For testing, you can use these demo accounts:

1. **Student Account:**
   - Email: `demo.student@tutokitulo.africa`
   - Password: `student123`

2. **Educator Account:**
   - Email: `demo.educator@tutokitulo.africa`
   - Password: `educator123`

3. **Admin Account:**
   - Email: `admin@tutokitulo.africa`
   - Password: `admin123`

### Creating Real Users
To create real users, use the registration endpoint or sign up through the UI:

```bash
# Example: Register a new student
curl -X POST https://your-app.pages.dev/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "securepassword",
    "fullName": "John Doe",
    "role": "student"
  }'
```

## 🧪 Testing AI Features

### AI Search Engine
1. Login as any user
2. Navigate to Dashboard > AI Search Engine
3. Try queries like:
   - "Explain photosynthesis"
   - "How to solve quadratic equations"
   - "World War 2 timeline"

### AI Co-Pilot
1. Available in the right sidebar of the dashboard
2. Provides role-specific assistance:
   - Students: Homework help, concept explanations
   - Educators: Lesson planning, quiz generation
   - Admins: Analytics, reports

### AI Chat
1. Available in the AI Search Engine page
2. Switch to the "AI Chat" tab
3. Have interactive conversations about any topic

## 🔧 Troubleshooting

### Common Issues

1. **Database connection errors:**
   - Ensure database_id in wrangler.toml is correct
   - Run `npx wrangler d1 list` to verify database exists

2. **API endpoint 404 errors:**
   - Check that functions are deployed correctly
   - Verify API routes in `/functions/api/[[path]].ts`

3. **AI features not working:**
   - Verify OpenRouter API key is valid
   - Check network requests in browser DevTools

## 📊 Monitoring & Analytics

### View Logs
```bash
# View real-time logs
npx wrangler pages deployment tail

# View function logs
npx wrangler pages functions tail
```

### Database Operations
```bash
# Query database
npx wrangler d1 execute tulo-afrika-db --command="SELECT * FROM users"

# Backup database
npx wrangler d1 backup create tulo-afrika-db
```

## 🔐 Security Notes

1. **API Key Security:**
   - Never commit API keys to public repositories
   - Use environment variables for sensitive data
   - Rotate keys regularly

2. **Database Security:**
   - All user passwords are hashed
   - Sessions expire after 7 days
   - Use HTTPS for all production deployments

## 📝 Additional Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment
npm run deploy       # Deploy to Cloudflare Pages
npm run cf:dev       # Run Cloudflare Pages locally

# Database
npm run db:init      # Initialize local database
npm run db:migrate   # Run production migrations
```

## 🆘 Support

For issues or questions:
1. Check the [Cloudflare Pages docs](https://developers.cloudflare.com/pages/)
2. Review the [OpenRouter documentation](https://openrouter.ai/docs)
3. Check application logs using `npx wrangler pages deployment tail`

## 🎉 Success!

Your Tulo Afrika application is now fully functional with:
- ✅ Complete backend API
- ✅ Cloudflare D1 database
- ✅ AI-powered features
- ✅ User authentication
- ✅ Real-time messaging
- ✅ Resource management

The application is ready for production deployment on Cloudflare Pages!
#!/bin/bash

echo "🚀 Quick Deploy Script for Tulo Afrika"
echo "======================================"
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME
echo ""

# Set up git
echo "📝 Setting up Git..."
git init
git add .
git commit -m "Full deployment with AI features, Cloudflare D1, and OpenRouter integration" || echo "Already committed"

# Add GitHub remote
echo "🔗 Connecting to GitHub..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/$GITHUB_USERNAME/tulo-afrika.git
echo "Remote added: https://github.com/$GITHUB_USERNAME/tulo-afrika.git"

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
echo "You may need to enter your GitHub credentials:"
echo "  - Username: $GITHUB_USERNAME"
echo "  - Password: Use a Personal Access Token (not your regular password)"
echo ""
git branch -M main
git push -u origin main --force

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Code pushed successfully!"
    echo ""
    echo "📊 Now initializing database..."
    echo "Running: npx wrangler d1 execute tulo-afrika-db --file=./schema.sql"
    npx wrangler d1 execute tulo-afrika-db --file=./schema.sql
    
    echo ""
    echo "🎉 DEPLOYMENT COMPLETE!"
    echo ""
    echo "📝 Next Steps:"
    echo "1. Go to https://dash.cloudflare.com"
    echo "2. Check your tulo-afrika Pages project"
    echo "3. Wait for automatic deployment (2-3 minutes)"
    echo "4. Your app will be live at: https://tulo-afrika.pages.dev"
    echo ""
    echo "Test Credentials:"
    echo "  Email: demo.student@tutokitulo.africa"
    echo "  Password: student123"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "1. Your GitHub username is correct"
    echo "2. You have created the repository on GitHub"
    echo "3. You have a Personal Access Token for authentication"
    echo ""
    echo "To create a Personal Access Token:"
    echo "1. Go to GitHub.com → Settings → Developer settings"
    echo "2. Personal access tokens → Tokens (classic)"
    echo "3. Generate new token with 'repo' scope"
fi
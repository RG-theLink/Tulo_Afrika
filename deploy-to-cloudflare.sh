#!/bin/bash

echo "🚀 Deploying Tulo Afrika to Cloudflare Pages"
echo "============================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Your Cloudflare Configuration:${NC}"
echo "  D1 Database ID: 475e676a-195d-4ab5-9ddc-c83f2cf37ac9"
echo "  KV Namespace ID: 0a6c7569067047a9b141acbd7d3ea374"
echo ""

# Step 1: Login to Cloudflare
echo -e "${YELLOW}Step 1: Authenticating with Cloudflare...${NC}"
npx wrangler login

# Step 2: Deploy database schema
echo ""
echo -e "${YELLOW}Step 2: Deploying database schema to D1...${NC}"
npx wrangler d1 execute tulo-afrika-db --file=./schema.sql

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database schema deployed successfully!${NC}"
else
    echo "Error deploying schema. Continuing anyway..."
fi

# Step 3: Build the application
echo ""
echo -e "${YELLOW}Step 3: Building the application...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build completed successfully!${NC}"
else
    echo "Build failed. Please fix errors and try again."
    exit 1
fi

# Step 4: Deploy to Cloudflare Pages
echo ""
echo -e "${YELLOW}Step 4: Deploying to Cloudflare Pages...${NC}"
npx wrangler pages deploy dist --project-name=tulo-afrika

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 Deployment successful!${NC}"
    echo ""
    echo -e "${GREEN}Your application is now live at:${NC}"
    echo -e "${BLUE}https://tulo-afrika.pages.dev${NC}"
    echo ""
    echo "Test credentials:"
    echo "  Email: demo.student@tutokitulo.africa"
    echo "  Password: student123"
    echo ""
    echo "AI Features available:"
    echo "  ✅ AI Search Engine"
    echo "  ✅ AI Chat"
    echo "  ✅ AI Co-Pilot"
else
    echo "Deployment failed. Please check the errors above."
    exit 1
fi
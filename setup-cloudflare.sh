#!/bin/bash

echo "🚀 Cloudflare Setup Script for Tulo Afrika"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if wrangler is logged in
echo "📝 Checking Cloudflare authentication..."
if ! npx wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}Please login to Cloudflare:${NC}"
    npx wrangler login
fi

echo -e "${GREEN}✓ Authenticated with Cloudflare${NC}"
echo ""

# Create D1 Database
echo "📊 Creating D1 Database..."
echo "Running: npx wrangler d1 create tulo-afrika-db"
D1_OUTPUT=$(npx wrangler d1 create tulo-afrika-db 2>&1)

if echo "$D1_OUTPUT" | grep -q "database_id"; then
    DATABASE_ID=$(echo "$D1_OUTPUT" | grep -oP '(?<=database_id = ")[^"]*')
    echo -e "${GREEN}✓ D1 Database created successfully!${NC}"
    echo -e "${YELLOW}Database ID: $DATABASE_ID${NC}"
    echo ""
    
    # Update wrangler.toml with the database ID
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/YOUR_DATABASE_ID_HERE/$DATABASE_ID/g" wrangler.toml
    else
        # Linux
        sed -i "s/YOUR_DATABASE_ID_HERE/$DATABASE_ID/g" wrangler.toml
    fi
    echo -e "${GREEN}✓ Updated wrangler.toml with Database ID${NC}"
elif echo "$D1_OUTPUT" | grep -q "already exists"; then
    echo -e "${YELLOW}Database already exists. Please get the ID from Cloudflare dashboard.${NC}"
    echo "Go to: https://dash.cloudflare.com/ → D1 → tulo-afrika-db"
    echo ""
    read -p "Enter your D1 Database ID: " DATABASE_ID
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/YOUR_DATABASE_ID_HERE/$DATABASE_ID/g" wrangler.toml
    else
        sed -i "s/YOUR_DATABASE_ID_HERE/$DATABASE_ID/g" wrangler.toml
    fi
else
    echo -e "${RED}Error creating database. Output:${NC}"
    echo "$D1_OUTPUT"
fi

# Create KV Namespace
echo ""
echo "🗄️  Creating KV Namespace for sessions..."
echo "Running: npx wrangler kv:namespace create SESSIONS"
KV_OUTPUT=$(npx wrangler kv:namespace create SESSIONS 2>&1)

if echo "$KV_OUTPUT" | grep -q "id ="; then
    KV_ID=$(echo "$KV_OUTPUT" | grep -oP '(?<=id = ")[^"]*')
    echo -e "${GREEN}✓ KV Namespace created successfully!${NC}"
    echo -e "${YELLOW}KV Namespace ID: $KV_ID${NC}"
    echo ""
    
    # Update wrangler.toml with the KV ID
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/YOUR_KV_NAMESPACE_ID_HERE/$KV_ID/g" wrangler.toml
    else
        sed -i "s/YOUR_KV_NAMESPACE_ID_HERE/$KV_ID/g" wrangler.toml
    fi
    echo -e "${GREEN}✓ Updated wrangler.toml with KV Namespace ID${NC}"
elif echo "$KV_OUTPUT" | grep -q "already exists"; then
    echo -e "${YELLOW}KV Namespace already exists. Please get the ID from Cloudflare dashboard.${NC}"
    echo "Go to: https://dash.cloudflare.com/ → Workers & Pages → KV"
    echo ""
    read -p "Enter your KV Namespace ID: " KV_ID
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/YOUR_KV_NAMESPACE_ID_HERE/$KV_ID/g" wrangler.toml
    else
        sed -i "s/YOUR_KV_NAMESPACE_ID_HERE/$KV_ID/g" wrangler.toml
    fi
else
    echo -e "${RED}Error creating KV namespace. Output:${NC}"
    echo "$KV_OUTPUT"
fi

# Initialize Database Schema
echo ""
echo "🔧 Initializing database schema..."
echo "Running: npx wrangler d1 execute tulo-afrika-db --file=./schema.sql"
if npx wrangler d1 execute tulo-afrika-db --file=./schema.sql; then
    echo -e "${GREEN}✓ Database schema deployed successfully!${NC}"
else
    echo -e "${RED}Error deploying schema. Please check the error above.${NC}"
fi

# Build the application
echo ""
echo "🏗️  Building the application..."
if npm run build; then
    echo -e "${GREEN}✓ Application built successfully!${NC}"
else
    echo -e "${RED}Build failed. Please fix any errors above.${NC}"
    exit 1
fi

# Deploy to Cloudflare Pages
echo ""
echo "🚀 Deploying to Cloudflare Pages..."
echo -e "${YELLOW}Note: Make sure you have configured the bindings in Cloudflare Dashboard:${NC}"
echo "1. Go to: https://dash.cloudflare.com/"
echo "2. Select your Pages project: tulo-afrika"
echo "3. Go to Settings → Functions"
echo "4. Add D1 binding: Variable name 'DB', select 'tulo-afrika-db'"
echo "5. Add KV binding: Variable name 'SESSIONS', select your KV namespace"
echo ""
read -p "Have you configured the bindings? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Deploying..."
    if npx wrangler pages deploy dist --project-name=tulo-afrika; then
        echo -e "${GREEN}✓ Deployment successful!${NC}"
        echo ""
        echo "🎉 Your application is now live at:"
        echo -e "${GREEN}https://tulo-afrika.pages.dev${NC}"
        echo ""
        echo "📝 Test credentials:"
        echo "Email: demo.student@tutokitulo.africa"
        echo "Password: student123"
    else
        echo -e "${RED}Deployment failed. Please check the error above.${NC}"
    fi
else
    echo -e "${YELLOW}Please configure the bindings first, then run:${NC}"
    echo "npx wrangler pages deploy dist --project-name=tulo-afrika"
fi

echo ""
echo "✅ Setup script completed!"
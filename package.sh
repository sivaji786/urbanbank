#!/bin/bash

###############################################################################
# Urban Bank - Production Package Script
# This script prepares the application for deployment to shared hosting
###############################################################################

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored messages
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo -e "\n${BLUE}═══════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}\n"
}

###############################################################################
# Main Script
###############################################################################

print_header "🏦 Urban Bank - Production Package Builder"

# Step 1: Run frontend build
print_info "Step 1: Building frontend application..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Running npm install..."
    npm install
fi

# Run the build
print_info "Running npm run build..."
npm run build

if [ ! -d "build" ]; then
    print_error "Build directory not found! Build may have failed."
    exit 1
fi

print_success "Frontend build completed successfully"

# Step 2: Create temporary directory for packaging
print_info "Step 2: Creating deployment package..."

# Remove old app.zip if it exists
if [ -f "app.zip" ]; then
    print_warning "Removing existing app.zip"
    rm app.zip
fi

# Create temporary directory for packaging
TEMP_DIR=$(mktemp -d)
print_info "Using temporary directory: $TEMP_DIR"

# Copy build directory contents
print_info "Copying frontend build files..."
mkdir -p "$TEMP_DIR/build"
cp -r build/* "$TEMP_DIR/"

# Copy API directory
print_info "Copying API files..."
mkdir -p "$TEMP_DIR/api"

# Use rsync to copy all files including hidden ones, or use cp with dotglob
# Method 1: Using rsync (more reliable)
if command -v rsync &> /dev/null; then
    rsync -a api/ "$TEMP_DIR/api/"
else
    # Method 2: Using cp with dotglob enabled
    shopt -s dotglob
    cp -r api/* "$TEMP_DIR/api/"
    shopt -u dotglob
fi

# Step 3: Generate Production API .env in the package
print_info "Step 3: generating production API configuration..."

# Create a template .env file for the API with placeholders DIRECTLY in the package
cat > "$TEMP_DIR/api/.env" << 'EOF'
#--------------------------------------------------------------------
# ENVIRONMENT
#--------------------------------------------------------------------
CI_ENVIRONMENT = production

#--------------------------------------------------------------------
# APP
#--------------------------------------------------------------------
app.baseURL = 'APP_URL=???'

#--------------------------------------------------------------------
# DATABASE
#--------------------------------------------------------------------
database.default.hostname = ???
database.default.database = ???
database.default.username = ???
database.default.password = ???
database.default.DBDriver = MySQLi
database.default.DBPrefix =
database.default.port = 3306

#--------------------------------------------------------------------
# API Configuration
#--------------------------------------------------------------------
API_URL=???
APP_URL=???

#--------------------------------------------------------------------
# JWT Configuration
#--------------------------------------------------------------------
JWT_SECRET = your-secret-key-change-this-in-production
JWT_TIME_TO_LIVE = 3600

#--------------------------------------------------------------------
# CORS Configuration
#--------------------------------------------------------------------
CORS_ALLOWED_ORIGINS = *
EOF

print_success "Created API .env template in package"

# Remove .htaccess from public if it exists (as per requirements)
if [ -f "$TEMP_DIR/api/public/.htaccess" ]; then
    print_info "Removing api/public/.htaccess as requested"
    rm "$TEMP_DIR/api/public/.htaccess"
fi

# Create the zip file
print_info "Creating app.zip archive..."
current_dir=$(pwd)
cd "$TEMP_DIR"
zip -r app.zip ./* -q

# Move zip to project root
mv app.zip "$current_dir/"
cd "$current_dir"

# Clean up temp directory
rm -rf "$TEMP_DIR"

print_success "Package created successfully: app.zip"

# Step 4: Display package information
print_header "📦 Package Information"

ZIP_SIZE=$(du -h app.zip | cut -f1)
print_info "Package size: $ZIP_SIZE"
print_info "Package location: $(pwd)/app.zip"

# Step 7: Display deployment instructions
print_header "🚀 Deployment Instructions"

echo -e "${GREEN}Your application is ready for deployment!${NC}\n"
echo -e "Next steps:"
echo -e "  1. Upload ${YELLOW}app.zip${NC} and ${YELLOW}installer.php${NC} to your shared hosting public_html"
echo -e "  2. Navigate to ${BLUE}https://yourdomain.com/installer.php${NC} in your browser"
echo -e "  3. Fill in the database and URL configuration"
echo -e "  4. Test database connection using the test button"
echo -e "  5. Click 'Install Application' to extract and configure"
echo -e "  6. Import ${YELLOW}urban_bank_db.sql${NC} into your database"
echo -e "  7. Delete ${RED}installer.php${NC} manually for security\n"

print_success "Package build completed successfully!"

# Optional: List contents of the zip
print_info "Package contents preview:"
unzip -l app.zip | head -n 20
echo -e "\n${YELLOW}... (showing first 20 entries)${NC}\n"

print_header "✨ Build Complete"

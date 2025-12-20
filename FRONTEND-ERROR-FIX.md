# Frontend Error Fix

## Error: `Cannot read properties of undefined (reading 'toString')`

This error occurs when the frontend tries to access data that doesn't exist from the API.

## Quick Fix:

### Step 1: Rebuild Frontend
```bash
npm run build
```
✅ Done - Build completed successfully

### Step 2: Upload New Build
Via FTP, upload the entire `build/` folder to replace the old one on your server.

### Step 3: Test API Endpoints First

Before testing the frontend, verify the API is returning data:

**Test these URLs in your browser:**

1. **Stats:** https://gcub.digitalks.in/api/public/index.php/stats
2. **News:** https://gcub.digitalks.in/api/public/index.php/news  
3. **Products:** https://gcub.digitalks.in/api/public/index.php/products

**Expected:** JSON data  
**If you see errors:** The database might not be imported yet

### Step 4: Import Database

If API returns empty or errors, you need to import the database:

1. Export your local database:
   ```bash
   php export-database.php
   ```

2. Login to phpMyAdmin on your server

3. Select database: `digit143_urbanbank`

4. Click "Import" tab

5. Upload the SQL file

6. Click "Go"

### Step 5: Clear Browser Cache

After uploading new build:
1. Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
2. Or clear browser cache completely

## Root Cause:

The frontend error happens when:
- API returns empty response
- API returns error instead of data
- Database tables are empty
- API endpoint doesn't exist

## Files to Upload:

1. **api/app/Config/Routes.php** (updated routing)
2. **api/app/Config/Boot/production.php** (intl polyfill)
3. **build/** folder (new frontend build)
4. **Database SQL file** (via phpMyAdmin)

## Testing Order:

1. ✅ Test API endpoints directly (should return JSON)
2. ✅ Upload new frontend build
3. ✅ Clear browser cache
4. ✅ Test frontend at https://gcub.digitalks.in/

If API endpoints return JSON correctly, the frontend will work!

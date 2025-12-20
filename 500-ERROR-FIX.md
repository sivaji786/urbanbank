# Quick Fix for 500 Error

Based on server-info.php results, your files are uploaded correctly but getting HTTP 500.

## Immediate Action Required:

### Step 1: Enable Error Display

**Option A - Rename files (Recommended):**
Via FTP:
1. Rename `api/public/index.php` to `api/public/index-backup.php`
2. Upload `api/public/index-debug.php`
3. Rename `index-debug.php` to `index.php`

**Option B - Edit existing file:**
Via FTP file manager, edit `api/public/index.php`
Add these lines at the very top (after `<?php`):
```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

### Step 2: Visit API Again

Visit: `https://gcub.digitalks.in/api/public/index.php/news`

You should now see the actual error message instead of just "500".

### Step 3: Common 500 Error Causes:

1. **Database Connection Failed**
   - Check `api/.env` credentials
   - Verify database exists in phpMyAdmin
   - Test connection in phpMyAdmin

2. **Missing Database Tables**
   - Import database SQL file via phpMyAdmin
   - Ensure all tables are created

3. **Writable Directory Permissions**
   - `api/writable` must be 755
   - Contact hosting support if needed

4. **Environment Variable**
   - Ensure `api/.env` has: `CI_ENVIRONMENT = production`

### Step 4: Report Back

Once you enable error display, share:
1. The exact error message shown
2. File and line number from the error

This will tell us exactly what's wrong!

## Most Likely Issue:

Based on 500 errors with no logs, it's probably:
- **Database not imported** (no tables)
- **Database credentials wrong** in `api/.env`

Check phpMyAdmin:
1. Does database `digit143_urbanbank` exist?
2. Does it have tables (users, news, products, etc.)?
3. Can you connect with the credentials in `api/.env`?

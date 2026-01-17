# 📋 Updated Deployment Workflow

## What Changed?

The installer has been **simplified** to work with **manual extraction**:

### ❌ Old Workflow (Automatic Extraction)
1. Upload `app.zip` + `installer.php`
2. Run installer → extracts zip automatically
3. Configure .env
4. Delete app.zip + installer.php

### ✅ New Workflow (Manual Extraction)
1. Upload `app.zip` + `installer.php`
2. **Manually extract `app.zip`** using cPanel/FTP
3. Run installer → **only configures .env**
4. Delete installer.php

---

## Why This Change?

**Benefits:**
- ✅ **More control** - You see exactly what's being extracted
- ✅ **No ZipArchive dependency** - Works on all shared hosting
- ✅ **Avoids permission issues** - Manual extraction uses your hosting's built-in tools
- ✅ **Simpler installer** - Less code, fewer things that can go wrong
- ✅ **Better for large files** - Some hosts have PHP execution time limits

---

## Step-by-Step Deployment

### 1️⃣ Build Package Locally
```bash
./package.sh
```
This creates `app.zip` (~30MB)

### 2️⃣ Upload to Server
Upload these files to `public_html/`:
- `app.zip`
- `installer.php`
- `urban_bank_db.sql`

### 3️⃣ Extract app.zip Manually

**Using cPanel File Manager:**
1. Login to cPanel
2. Go to File Manager
3. Navigate to `public_html/`
4. Right-click `app.zip`
5. Select "Extract"
6. Extract to current directory
7. Delete `app.zip` (optional)

**Using FTP Client (FileZilla):**
1. Download app.zip to local machine
2. Extract locally
3. Upload extracted contents to `public_html/`

**After extraction, you should have:**
```
public_html/
├── index.html          ← Frontend
├── assets/             ← Frontend assets
├── api/                ← Backend
│   ├── .env           ← Template with ???
│   ├── app/
│   ├── public/
│   └── ...
├── installer.php       ← Configuration tool
└── urban_bank_db.sql   ← Database
```

### 4️⃣ Run Installer
1. Visit: `https://yourdomain.com/installer.php`
2. You'll see: **"⚠️ Note: Extract app.zip manually before running this installer"**
3. Fill in the form:
   - **DB Host:** localhost
   - **DB Name:** your_database
   - **DB User:** your_user
   - **DB Password:** your_password
   - **API URL:** https://yourdomain.com/api/public/index.php
   - **APP URL:** https://yourdomain.com
4. Click **"🔍 Test Database Connection"**
5. If green ✅, click **"🚀 Install Application"**

### 5️⃣ What Installer Does
The installer **ONLY** configures the `.env` file:
- Reads `api/.env` (which has `???` placeholders)
- Replaces `???` with your actual values
- Writes updated `api/.env`
- Shows success message

**It does NOT:**
- ❌ Extract any files
- ❌ Delete app.zip
- ❌ Run database migrations
- ❌ Import SQL

### 6️⃣ Import Database
**Using phpMyAdmin:**
1. Login to phpMyAdmin
2. Select your database
3. Click "Import"
4. Choose `urban_bank_db.sql`
5. Click "Go"

**Using MySQL Command Line:**
```bash
mysql -u your_user -p your_database < urban_bank_db.sql
```

### 7️⃣ Security Cleanup
**Manually delete from server:**
- ✅ `installer.php` (IMPORTANT!)
- ✅ `urban_bank_db.sql` (optional, for security)
- ✅ `app.zip` (if you didn't delete it earlier)

### 8️⃣ Access Application
Visit: `https://yourdomain.com`

---

## What Gets Configured?

The installer updates `api/.env` with:

```bash
# Before (template with placeholders)
database.default.hostname = ???
database.default.database = ???
database.default.username = ???
database.default.password = ???
API_URL=???
APP_URL=???

# After (your actual values)
database.default.hostname = localhost
database.default.database = your_db_name
database.default.username = your_db_user
database.default.password = your_password
API_URL=https://yourdomain.com/api/public/index.php
APP_URL=https://yourdomain.com
```

---

## Troubleshooting

### "API directory not found after extraction"
**Solution:** You forgot to extract `app.zip` manually. Extract it first!

### "API .env file not found"
**Solution:** 
1. Verify extraction created `api/` directory
2. Check if `api/.env` exists
3. Rebuild package: `./package.sh`

### Database connection fails
**Solution:**
- Try `127.0.0.1` instead of `localhost`
- Verify database exists
- Check user permissions
- Test connection using phpMyAdmin first

### Installer shows blank page
**Solution:**
- Check PHP error logs
- Ensure PHP 7.4+ is installed
- Verify file permissions (644 for installer.php)

---

## Files Modified

### `installer.php`
- ✅ Removed all ZipArchive extraction code
- ✅ Removed app.zip checking
- ✅ Removed app.zip deletion
- ✅ Added note: "Extract app.zip manually before running"
- ✅ Updated success message to say "Configuration Successful"
- ✅ Shows what was configured

### `package.sh`
- ✅ Fixed to include `.env` file (using rsync or dotglob)
- ✅ Verifies `.env` is copied
- ✅ No other changes needed

### `DEPLOYMENT-TOOLS.md`
- ✅ Updated with new manual extraction workflow
- ✅ Removed ZipArchive requirement
- ✅ Added extraction instructions

---

## Quick Comparison

| Feature | Old Installer | New Installer |
|---------|--------------|---------------|
| Extracts app.zip | ✅ Yes | ❌ No (manual) |
| Configures .env | ✅ Yes | ✅ Yes |
| Deletes app.zip | ✅ Yes | ❌ No |
| Requires ZipArchive | ✅ Yes | ❌ No |
| Works on all hosts | ⚠️ Maybe | ✅ Yes |
| Permission issues | ⚠️ Possible | ✅ Rare |

---

## Summary

The new workflow is **simpler and more reliable**:

1. **Build** → `./package.sh`
2. **Upload** → app.zip + installer.php
3. **Extract** → Manually using cPanel/FTP
4. **Configure** → Run installer.php
5. **Import** → Database SQL
6. **Delete** → installer.php
7. **Done!** → Access your app

No more worrying about:
- ❌ ZipArchive availability
- ❌ PHP execution timeouts
- ❌ File permission issues during extraction
- ❌ Extraction failures

You're in full control! 🎉

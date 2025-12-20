# FTP Deployment - Quick Start Guide

## 📦 What to Upload

### Required Files (in order):
1. **build/** folder → Upload to root directory
2. **api/** folder → Upload to root directory  
3. **test.php** → Upload to root directory (for testing)
4. **database-export.sql** → Import via phpMyAdmin

## 🚀 Deployment Steps

### Step 1: Build Frontend
```bash
npm run build
```
This creates the `build/` folder.

### Step 2: Export Database
Option A - Using script:
```bash
php export-database.php
```

Option B - Manual export:
1. Open phpMyAdmin on your local machine
2. Select `urbanbank` database
3. Click "Export" tab
4. Click "Go" to download SQL file

### Step 3: Upload Files via FTP
1. Connect to FTP: `gcub.digitalks.in`
2. Navigate to `/public_html/` (or your web root)
3. Upload these folders/files:
   - `build/index.html`
   - `build/assets/` (entire folder)
   - `api/` (entire folder)
   - `test.php`

### Step 4: Import Database
1. Login to phpMyAdmin on your server
2. Create database (if not exists): `digit143_urbanbank`
3. Select the database
4. Click "Import" tab
5. Choose `database-export.sql`
6. Click "Go"

### Step 5: Configure Environment
Edit `api/.env` via FTP (or use your hosting file manager):
```env
CI_ENVIRONMENT = production

app.baseURL = 'https://gcub.digitalks.in/api/public/'

database.default.hostname = localhost
database.default.database = digit143_urbanbank
database.default.username = digit143_urbanbank
database.default.password = UrbanBank@123
database.default.DBDriver = MySQLi
```

### Step 6: Test Installation
Visit: `https://gcub.digitalks.in/test.php`

You should see all green checkmarks ✓

### Step 7: Verify Application
- Frontend: `https://gcub.digitalks.in/`
- Admin: `https://gcub.digitalks.in/#admin`
  - Email: `admin@urbanbank.com`
  - Password: `admin123`

### Step 8: Clean Up
Delete `test.php` from server after successful testing.

## 📁 Final Server Structure

```
/public_html/
├── index.html              (from build/)
├── assets/                 (from build/)
│   ├── *.css
│   ├── *.js
│   └── *.png
├── api/
│   ├── app/
│   ├── public/
│   │   └── index.php
│   ├── vendor/
│   ├── writable/
│   └── .env
└── test.php               (delete after testing)
```

## ⚠️ Common Issues

### Issue: test.php shows database connection error
**Solution**: 
1. Verify database credentials in `api/.env`
2. Ensure database exists in phpMyAdmin
3. Check username has permissions

### Issue: Frontend shows blank page
**Solution**:
1. Check browser console (F12)
2. Verify `index.html` is in root
3. Verify `assets/` folder uploaded correctly

### Issue: API returns 500 error
**Solution**:
1. Check database is imported
2. Verify `api/.env` credentials
3. Download `api/writable/logs/` via FTP to see errors

### Issue: Admin login doesn't work
**Solution**:
1. Verify database has `users` table
2. Check default credentials:
   - Email: `admin@urbanbank.com`
   - Password: `admin123`
3. Ensure database was imported correctly

## 📞 Support Checklist

Before contacting support, verify:
- [ ] All files uploaded successfully
- [ ] Database imported via phpMyAdmin
- [ ] `api/.env` has correct credentials
- [ ] `test.php` shows all green checks
- [ ] Browser console shows no errors

## 🔒 Security

After deployment:
1. ✅ Delete `test.php`
2. ✅ Change admin password
3. ✅ Verify `api/writable/` is not publicly accessible
4. ✅ Keep database credentials secure

## 📊 Testing URLs

Test these URLs after deployment:

| Test | URL | Expected Result |
|------|-----|-----------------|
| System Test | `https://gcub.digitalks.in/test.php` | All green checks |
| Frontend | `https://gcub.digitalks.in/` | Homepage loads |
| Deposits | `https://gcub.digitalks.in/#deposits` | Products list |
| Loans | `https://gcub.digitalks.in/#loans` | Products list |
| Admin | `https://gcub.digitalks.in/#admin` | Login page |
| API | `https://gcub.digitalks.in/api/public/index.php/stats` | JSON response |

---

**Need Help?** Check `TROUBLESHOOTING.md` for detailed solutions.

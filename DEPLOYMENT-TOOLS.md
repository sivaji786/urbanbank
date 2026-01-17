# 🚀 Urban Bank - Deployment Guide

This guide explains how to use the deployment tools for shared hosting.

## 📦 Files Overview

### 1. `package.sh` - Local Build Script
Prepares your application for deployment by building the frontend and packaging everything into `app.zip`.

### 2. `installer.php` - Server-Side Installer
A web-based installer that extracts the app and configures the environment on your shared hosting.

---

## 🛠️ Local Build Process

### Prerequisites
- Node.js and npm installed
- `.env.production` file configured with your production API URL

### Steps

1. **Ensure `.env.production` is configured:**
   ```bash
   # .env.production should contain:
   VITE_API_BASE_URL=https://yourdomain.com/api/public/index.php
   ```

2. **Run the package script:**
   ```bash
   ./package.sh
   ```

3. **What the script does:**
   - ✅ Copies `.env.production` → `.env` (for build)
   - ✅ Runs `npm run build` to compile frontend
   - ✅ Creates API `.env` template with placeholders (`???`)
   - ✅ Packages `build/*` and `api/*` into `app.zip`
   - ✅ Excludes `api/public/.htaccess` as requested
   - ✅ Restores your original `.env` file

4. **Output:**
   - `app.zip` - Ready for upload to shared hosting

---

## 🌐 Deployment to Shared Hosting

### Prerequisites
- Shared hosting with PHP 7.4+
- MySQL database created
- FTP/File Manager access

### Steps

1. **Upload files via FileZilla/cPanel:**
   - Upload `app.zip` to `public_html/`
   - Upload `installer.php` to `public_html/`
   - Upload `urban_bank_db.sql` (for database import)

2. **Extract app.zip manually:**
   - Using cPanel File Manager or FTP client, extract `app.zip` in `public_html/`
   - This will create:
     - `index.html` (frontend)
     - `assets/` directory (frontend assets)
     - `api/` directory (backend)
   - You can delete `app.zip` after extraction

3. **Access the installer:**
   - Navigate to: `https://yourdomain.com/installer.php`

4. **Fill in the configuration form:**

   **Database Configuration:**
   - **DB Host:** `localhost` (usually)
   - **DB Name:** Your database name
   - **DB User:** Your database username
   - **DB Password:** Your database password

   **Application URLs:**
   - **API URL:** `https://yourdomain.com/api/public/index.php`
   - **APP URL:** `https://yourdomain.com`

5. **Test database connection:**
   - Click "🔍 Test Database Connection" button
   - Wait for immediate result (green = success, red = error)
   - Fix any connection issues before proceeding

6. **Configure the application:**
   - Click "🚀 Install Application" button
   - The installer will:
     - ✅ Validate all inputs
     - ✅ Read `./api/.env` template
     - ✅ Replace placeholders (`???`) with your values
     - ✅ Write updated `./api/.env`
     - ✅ Show success message

7. **Import database:**
   - Use phpMyAdmin or MySQL command line
   - Import `urban_bank_db.sql` into your database

8. **Security - Delete installer:**
   - ⚠️ **IMPORTANT:** Manually delete `installer.php` from server
   - This prevents unauthorized reconfiguration

9. **Access your application:**
   - Visit: `https://yourdomain.com`

---

## 🔧 How installer.php Works

### Form Features
- Bootstrap 5 responsive design
- Real-time database connection testing
- Input validation
- Clear error messages

### Installation Process

1. **Validation:**
   - Checks all required fields
   - Tests database connection before proceeding

2. **Configuration (No Extraction):**
   - Assumes `app.zip` has been manually extracted
   - Reads `./api/.env` template
   - Replaces placeholders:
     ```
     DB_HOST=???          → DB_HOST=localhost
     DB_NAME=???          → DB_NAME=your_db_name
     DB_USER=???          → DB_USER=your_db_user
     DB_PASSWORD=???      → DB_PASSWORD=your_password
     API_URL=???          → API_URL=https://yourdomain.com/api/public/index.php
     APP_URL=???          → APP_URL=https://yourdomain.com
     ```
   - Also handles CodeIgniter format:
     ```
     database.default.hostname = ???
     database.default.database = ???
     database.default.username = ???
     database.default.password = ???
     ```

3. **Success:**
   - Shows what was configured
   - Displays next steps
   - Provides link to application

### No Database Migrations
- As requested, the installer does NOT run migrations or seeds
- You must manually import `urban_bank_db.sql`

### No Automatic Extraction
- The installer does NOT extract `app.zip`
- You must manually extract it using cPanel File Manager or FTP client
- This gives you more control and avoids permission issues

---

## 📁 Package Structure

After extraction, your hosting directory will contain:

```
public_html/
├── index.html              # Frontend entry point
├── assets/                 # Frontend compiled assets
│   ├── index-[hash].js
│   └── index-[hash].css
├── api/                    # Backend API
│   ├── .env               # Configured environment (DB credentials)
│   ├── app/
│   ├── public/
│   │   └── index.php      # API entry point
│   ├── vendor/
│   └── ...
└── installer.php          # DELETE THIS AFTER INSTALLATION!
```

---

## 🔍 Troubleshooting

### Build Issues

**Problem:** `npm run build` fails
- **Solution:** Run `npm install` first
- Check Node.js version compatibility

**Problem:** `.env.production` not found
- **Solution:** Create it with your production API URL

### Installation Issues

**Problem:** "app.zip not found"
- **Solution:** Ensure you uploaded both `app.zip` AND `installer.php`

**Problem:** Database connection test fails
- **Solution:** 
  - Verify database credentials
  - Check if database exists
  - Ensure MySQL user has proper permissions
  - Try `127.0.0.1` instead of `localhost`

**Problem:** "Failed to extract app.zip"
- **Solution:** 
  - Check if ZipArchive is enabled: `php -m | grep zip`
  - Verify file permissions on hosting
  - Ensure enough disk space

**Problem:** API returns 500 error
- **Solution:**
  - Check `./api/.env` was created correctly
  - Verify database credentials in `.env`
  - Check PHP error logs
  - Ensure all API dependencies are uploaded

### Post-Installation Issues

**Problem:** Frontend shows blank page
- **Solution:**
  - Check browser console for errors
  - Verify `index.html` exists in root
  - Check `.htaccess` rewrite rules

**Problem:** API endpoints return 404
- **Solution:**
  - Verify API URL in frontend build
  - Check `api/public/.htaccess` exists (if needed)
  - Test API directly: `https://yourdomain.com/api/public/index.php`

**Problem:** CORS errors
- **Solution:**
  - Update `CORS_ALLOWED_ORIGINS` in `api/.env`
  - Add your domain to allowed origins

---

## 🔐 Security Checklist

After deployment:

- [ ] Delete `installer.php` from server
- [ ] Verify `api/.env` is not publicly accessible
- [ ] Change `JWT_SECRET` in `api/.env` to a strong random value
- [ ] Set proper file permissions (644 for files, 755 for directories)
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure `.htaccess` to prevent directory listing
- [ ] Review CORS settings in production

---

## 📝 Environment Variables Reference

### Frontend (`.env.production`)
```bash
VITE_API_BASE_URL=https://yourdomain.com/api/public/index.php
```

### Backend (`api/.env` - configured by installer)
```bash
CI_ENVIRONMENT = production

database.default.hostname = localhost
database.default.database = your_db_name
database.default.username = your_db_user
database.default.password = your_db_password
database.default.DBDriver = MySQLi
database.default.port = 3306

API_URL=https://yourdomain.com/api/public/index.php
APP_URL=https://yourdomain.com

JWT_SECRET = your-secret-key-change-this
JWT_TIME_TO_LIVE = 3600

CORS_ALLOWED_ORIGINS = *
```

---

## 🎯 Quick Reference

### Local Build
```bash
./package.sh
```

### Upload to Server
1. `app.zip`
2. `installer.php`
3. `urban_bank_db.sql`

### Installation URL
```
https://yourdomain.com/installer.php
```

### Post-Installation
1. Import SQL file
2. Delete `installer.php`
3. Test application

---

## 💡 Tips

- **Test locally first:** Run `npm run build` locally to catch build errors
- **Backup database:** Always backup before importing SQL
- **Use strong passwords:** For database and JWT secret
- **Monitor logs:** Check PHP error logs after deployment
- **Test thoroughly:** Test all features after deployment

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review PHP error logs on your hosting
3. Verify all prerequisites are met
4. Test database connection manually

---

**Happy Deploying! 🚀**

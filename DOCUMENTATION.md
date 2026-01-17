# Urban Bank - Project Documentation

## 1. Overview
This documentation covers deployment, development, and troubleshooting for the Urban Bank application (CodeIgniter 4 API + React/Vite Frontend).

## 2. Deployment Workflow

### Prerequisites
-   **Shared Hosting** with PHP 8.1+, MySQL, and Apache.
-   **SSH Access** (optional but recommended) or FTP.
-   **Local Machine**: Node.js, NPM, PHP, Composer.

### Deployment Steps (Automated Package)

1.  **Prepare the Package locally**:
    Run the build script to compile the frontend and zip the application.
    ```bash
    ./package.sh
    ```
    This creates `app.zip` (containing the API and built frontend) without modifying your local environment.

2.  **Upload to Server**:
    Upload the following files to your `public_html` directory:
    -   `app.zip`
    -   `installer.php`
    -   `urban_bank_db.sql`

3.  **Run the Installer**:
    -   Navigate to `https://yourdomain.com/installer.php`.
    -   Enter your production database credentials.
    -   Click **Test Database** to verify connection.
    -   Click **Install Application**. This unzips the app and configures `.env` automatically.

4.  **Import Database**:
    -   Use phpMyAdmin to import `urban_bank_db.sql` into your database.

5.  **Clean Up**:
    -   Delete `installer.php` and `app.zip` from the server for security.

### FTP Manual Deployment (Alternative)
If you cannot use the package/installer:
1.  Upload `api/` folder to `public_html/api/`.
2.  Upload `build/` contents (after `npm run build`) to `public_html/`.
3.  Create/Edit `api/.env` with production DB credentials.
4.  Import SQL file.

## 3. Local Development

### Setup
1.  **Frontend**:
    ```bash
    npm install
    npm run dev
    ```
    Access: `http://localhost:8080`

2.  **Backend (API)**:
    ```bash
    cd api
    php spark serve
    ```
    Access: `http://localhost:8080/api`

### Directory Structure
-   `src/`: React Frontend source code.
-   `api/`: CodeIgniter 4 Backend.
-   `api/public/`: Publicly accessible API entry point.
-   `build/`: Production build output.

## 4. Troubleshooting & FAQs

### Common Production Errors

#### 500 Internal Server Error
**Cause**: Usually permissions or `.htaccess` configuration.
**Fixes**:
1.  **Check `.htaccess`**: Shared hosts often block `Options` directives.
    -   In `api/public/.htaccess`, check if `Options -Indexes` or `FollowSymLinks` are causing issues. Comment them out if needed.
2.  **Check Permissions**:
    -   Ensure `api/writable/` and its subfolders have **777** (or 755) permissions.
3.  **Database**:
    -   Verify credentials in `api/.env`.
4.  **Enable Debugging**:
    -   Set `CI_ENVIRONMENT = development` in `api/.env` to see the actual error message.

#### 404 Not Found (API Endpoints)
**Cause**: Missing URL rewriting.
**Fix**:
-   Ensure **root `api/.htaccess`** exists to redirect traffic to `api/public/`.
-   Content of `api/.htaccess`:
    ```apache
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteRule ^(.*)$ public/$1 [L]
    </IfModule>
    ```

#### 503 Service Unavailable
**Cause**: Often due to maintenance mode or server overload.
**Fix**:
-   Check if a `down` file exists in the CodeIgniter root.
-   Check server resource limits (memory/CPU).

#### "intl" Extension Error
**Issue**: Application fails requiring `intl` PHP extension.
**Fix**: Enable `intl` (Internationalization) extension in your cPanel PHP Selector.

### Debugging Tools
We have provided a diagnostic script (`diagnose.php`) to check your production environment.
-   Upload `diagnose.php` to your `api/` folder.
-   Visit `https://yourdomain.com/api/diagnose.php`.
-   **Security**: DELETE this file after use.

## 5. API Checklist
Before going live, ensure:
-   [ ] `CI_ENVIRONMENT` is set to `production`.
-   [ ] `app.baseURL` matches your domain (`https://.../api/public/`).
-   [ ] Database credentials are correct.
-   [ ] `writable` folder is writable.
-   [ ] `vendor` folder is uploaded (handled by `app.zip`).
-   [ ] `api/.htaccess` exists for redirection.

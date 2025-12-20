# Production Deployment Guide - Urban Bank

## Deployment Structure

Your production server should have the following structure:

```
/home/your-user/public_html/  (or your web root)
├── build/                     # Frontend build files (from npm run build)
│   ├── index.html
│   ├── assets/
│   └── ...
└── api/                       # Backend API folder
    ├── app/
    ├── public/
    │   └── index.php         # API entry point
    ├── vendor/
    ├── writable/
    └── ...
```

## Deployment Steps

### 1. Build the Frontend

Run the production build command:

```bash
npm run build
```

This will create a `build` folder with all compiled frontend files.

### 2. Upload Files to Server

Upload the following to your server:

- **Frontend**: Upload entire `build` folder to your web root
- **Backend**: Upload entire `api` folder to your web root

### 3. Configure API Database

1. Navigate to `api/app/Config/Database.php`
2. Update the production database credentials:

```php
public array $default = [
    'DSN'      => '',
    'hostname' => 'your-db-host',
    'username' => 'your-db-username',
    'password' => 'your-db-password',
    'database' => 'your-db-name',
    'DBDriver' => 'MySQLi',
    // ... rest of config
];
```

### 4. Set Folder Permissions

```bash
chmod -R 755 api/writable
chmod -R 755 api/public/uploads
```

### 5. Run Database Migrations

SSH into your server and run:

```bash
cd api
php spark migrate
php spark db:seed DatabaseSeeder
```

### 6. Verify URLs

**Frontend URL**: https://gcub.digitalks.in/
**API URL**: https://gcub.digitalks.in/api/public/index.php

The frontend is already configured to use the production API URL.

## Environment Configuration

The project uses environment-based configuration:

- **Development**: Uses `.env.development` (http://localhost:8080/api)
- **Production**: Uses `.env.production` (https://gcub.digitalks.in/api/public/index.php)

## Important Notes

1. **No .htaccess Required**: The build uses relative paths and works without .htaccess
2. **API Path**: The API must be accessible at `/api/public/index.php`
3. **CORS**: Already configured to allow requests from https://gcub.digitalks.in
4. **Uploads**: Ensure `api/public/uploads` folder exists and is writable

## Testing After Deployment

1. Visit https://gcub.digitalks.in/
2. Test navigation between pages
3. Test admin login at https://gcub.digitalks.in/#admin
4. Verify product pages load correctly
5. Test API endpoints are responding

## Troubleshooting

### Frontend shows blank page
- Check browser console for errors
- Verify all files in `build` folder were uploaded
- Check that index.html is accessible

### API not responding
- Verify `api/public/index.php` is accessible
- Check database credentials in `api/app/Config/Database.php`
- Ensure `api/writable` folder has write permissions
- Check PHP error logs

### CORS errors
- Verify domain is added in `api/app/Config/Cors.php`
- Check that API URL matches in `.env.production`

## Security Checklist

- [ ] Change default admin password after first login
- [ ] Update database credentials
- [ ] Set proper file permissions (755 for folders, 644 for files)
- [ ] Enable HTTPS (already configured in URLs)
- [ ] Keep CodeIgniter and dependencies updated
- [ ] Regularly backup database

## Support

For issues or questions, refer to:
- CodeIgniter 4 Documentation: https://codeigniter.com/user_guide/
- Vite Documentation: https://vitejs.dev/

# API Production Deployment Issues & Solutions

## Current Status

✅ **Frontend Build**: Complete and ready
✅ **Environment Config**: Fixed (production lowercase)
⚠️ **API**: Returning 500 errors
⚠️ **Database**: Connection status unknown

## Identified Issues from Logs

### 1. CORS Configuration Error
**Error**: "When responding to a credentialed request, the server must not specify the '*' wildcard for the Access-Control-Allow-Headers"

**Location**: `api/app/Config/Cors.php`

**Current Config**:
```php
'allowedHeaders' => ['Content-Type', 'Authorization', ...],
'supportsCredentials' => true,
```

**Issue**: Cannot use wildcard with credentials enabled

**Solution**: Already using specific headers (correct)

### 2. Environment Variable
**Fixed**: Changed `CI_ENVIRONMENT = Production` to `CI_ENVIRONMENT = production`

## Required Actions for Production Deployment

### Step 1: Database Setup
```bash
cd api
php spark migrate
php spark db:seed DatabaseSeeder
```

### Step 2: Verify Database Connection
Check `api/.env`:
```env
database.default.hostname = localhost
database.default.database = digit143_urbanbank
database.default.username = digit143_urbanbank
database.default.password = UrbanBank@123
```

### Step 3: Test API Locally First
```bash
# Start local API server
cd api
php spark serve

# In another terminal, run tests
cd ..
./test-api.sh
```

### Step 4: Check File Permissions
```bash
chmod -R 755 api/writable
chmod -R 755 api/public/uploads
```

### Step 5: Production Deployment Checklist

- [ ] Upload `build/` folder to server root
- [ ] Upload `api/` folder to server root
- [ ] Update `api/.env` with production database credentials
- [ ] Run migrations: `php spark migrate`
- [ ] Seed database: `php spark db:seed DatabaseSeeder`
- [ ] Set file permissions (755 for folders)
- [ ] Test API endpoint: `curl https://gcub.digitalks.in/api/public/index.php/stats`
- [ ] Test frontend: `https://gcub.digitalks.in/`

## Common 500 Errors & Solutions

### Database Connection Failed
- Verify credentials in `api/.env`
- Check if MySQL service is running
- Verify database exists
- Check user permissions

### Missing Tables
- Run: `php spark migrate`
- Run: `php spark db:seed DatabaseSeeder`

### File Permission Issues
- Ensure `api/writable/` is writable (755)
- Ensure `api/public/uploads/` exists and is writable

### PHP Errors
- Check `api/writable/logs/` for error details
- Ensure PHP 8.1+ is installed
- Verify all required PHP extensions are enabled

## Testing Commands

### Test Database Connection
```bash
cd api
php spark db:table users
```

### Test Specific Endpoint
```bash
curl -X GET http://localhost:8080/api/stats
```

### View Error Logs
```bash
tail -f api/writable/logs/log-$(date +%Y-%m-%d).log
```

### Run Migrations
```bash
cd api
php spark migrate
php spark migrate:status
```

### Seed Database
```bash
cd api
php spark db:seed DatabaseSeeder
```

## Production URLs

- **Frontend**: https://gcub.digitalks.in/
- **API Base**: https://gcub.digitalks.in/api/public/index.php
- **Test Endpoint**: https://gcub.digitalks.in/api/public/index.php/stats

## Files to Upload

### Frontend (to root)
```
build/
├── index.html
└── assets/
```

### Backend (to root)
```
api/
├── app/
├── public/
├── vendor/
├── writable/
└── .env (update with production credentials)
```

## Quick Fix for Current Errors

1. **Ensure database is set up**:
```bash
cd api
php spark migrate
php spark db:seed DatabaseSeeder
```

2. **Test locally first**:
```bash
php spark serve
# Then test: curl http://localhost:8080/api/stats
```

3. **If still errors, check logs**:
```bash
tail -50 api/writable/logs/*.log
```

## Next Steps

1. Run migrations and seeders locally
2. Test all endpoints locally using `./test-api.sh`
3. Once all tests pass locally, deploy to production
4. Update production `.env` with correct database credentials
5. Run migrations on production server
6. Test production endpoints

## Support

If issues persist:
1. Check `api/writable/logs/` for detailed error messages
2. Verify database connection with `php spark db:table users`
3. Test individual endpoints with curl
4. Check PHP error logs on server

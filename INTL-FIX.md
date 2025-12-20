# SOLUTION: Missing Intl Extension

## Root Cause Found! ✓

**Error:** `Class "Locale" not found`

**Cause:** The `intl` PHP extension is not installed on your server.

## Solution Options:

### Option 1: Ask Hosting to Enable Intl (Recommended)
Contact your hosting support and ask them to enable the `intl` PHP extension.

**Support Request Template:**
```
Subject: Enable PHP intl Extension

Hello,

Please enable the "intl" PHP extension for my account.
Domain: gcub.digitalks.in
PHP Version: 8.2.29

This is required for my CodeIgniter 4 application.

Thank you!
```

### Option 2: Disable Intl Requirement (Temporary Workaround)

If you can't get intl enabled immediately, use this workaround:

**Edit via FTP:** `api/app/Config/App.php`

Find this line (around line 96):
```php
public string $defaultLocale = 'en';
```

Add this line right after it:
```php
public bool $negotiateLocale = false;
```

Also find (around line 136):
```php
public string $appTimezone = 'UTC';
```

Change it to:
```php
public string $appTimezone = 'Asia/Kolkata';
```

### Option 3: Use Polyfill (Advanced)

Create file: `api/app/Config/Boot/production.php`

```php
<?php

// Polyfill for missing Locale class
if (!class_exists('Locale')) {
    class Locale {
        public static function getDefault() {
            return 'en';
        }
        
        public static function setDefault($locale) {
            return true;
        }
    }
}
```

## Testing After Fix:

Visit: `https://gcub.digitalks.in/api/public/index.php/news`

Should now return JSON data instead of error!

## Why This Happened:

- CodeIgniter 4 uses the `intl` extension for internationalization
- Your server doesn't have it installed
- The `Locale` class is part of the intl extension
- This is a server configuration issue, not your code

## Recommended Action:

**Contact your hosting support** - they can enable intl in 5 minutes!

Most shared hosting providers have intl available, it just needs to be enabled.

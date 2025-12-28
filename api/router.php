<?php
/**
 * Router script for PHP's built-in web server
 * This mimics Apache's mod_rewrite behavior for development
 * 
 * Usage: php -S localhost:8080 -t public router.php
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Special handling: /uploads is an API endpoint, but /uploads/* are static files
// If the URI is exactly "/uploads" or "/uploads/..." with query params, route to index.php
// If the URI is "/uploads/path/to/file.ext", serve as static file
if (preg_match('#^/uploads(/[^/]+/[^/]+.*)?$#', $uri)) {
    // This is either:
    // - /uploads (API endpoint)
    // - /uploads/folder/file.ext (static file)
    $filePath = __DIR__ . '/public' . $uri;
    if (is_file($filePath)) {
        // It's a static file, let PHP serve it
        return false;
    }
    // It's the API endpoint, route to index.php
}

// Serve other static files directly (images, CSS, JS, etc.)
if ($uri !== '/' && file_exists(__DIR__ . '/public' . $uri) && is_file(__DIR__ . '/public' . $uri)) {
    return false; // Let PHP's built-in server handle static files
}

// Route all other requests through index.php
$_SERVER['SCRIPT_NAME'] = '/index.php';
require __DIR__ . '/public/index.php';


<?php

/**
 * API Diagnostic Script
 * Run this to check database connection, tables, and configuration
 */

// Load CodeIgniter
require __DIR__ . '/api/vendor/autoload.php';

// Bootstrap the application
$app = \Config\Services::codeigniter();
$app->initialize();

echo "===========================================\n";
echo "Urban Bank API Diagnostic Tool\n";
echo "===========================================\n\n";

// 1. Check Environment
echo "1. Environment Configuration\n";
echo "-------------------------------------------\n";
echo "Environment: " . ENVIRONMENT . "\n";
echo "Base URL: " . base_url() . "\n\n";

// 2. Check Database Connection
echo "2. Database Connection\n";
echo "-------------------------------------------\n";
try {
    $db = \Config\Database::connect();
    echo "✓ Database connection successful\n";
    echo "Database: " . $db->database . "\n";
    echo "Host: " . $db->hostname . "\n\n";
} catch (\Exception $e) {
    echo "✗ Database connection failed: " . $e->getMessage() . "\n\n";
    exit(1);
}

// 3. Check Required Tables
echo "3. Database Tables\n";
echo "-------------------------------------------\n";
$requiredTables = [
    'users',
    'news',
    'events',
    'gallery',
    'downloads',
    'reports',
    'products',
    'product_rates',
    'branches',
    'team_members',
    'deaf_accounts',
    'settings',
    'pages',
    'slider',
    'loan_applications',
    'deposit_applications'
];

$existingTables = $db->listTables();
$missingTables = [];

foreach ($requiredTables as $table) {
    if (in_array($table, $existingTables)) {
        echo "✓ $table\n";
    } else {
        echo "✗ $table (MISSING)\n";
        $missingTables[] = $table;
    }
}

if (!empty($missingTables)) {
    echo "\n⚠ Missing tables: " . implode(', ', $missingTables) . "\n";
    echo "Run: php spark migrate\n\n";
} else {
    echo "\n✓ All required tables exist\n\n";
}

// 4. Check Table Data
echo "4. Table Data Check\n";
echo "-------------------------------------------\n";
foreach ($existingTables as $table) {
    if (in_array($table, $requiredTables)) {
        $count = $db->table($table)->countAll();
        echo "$table: $count records\n";
    }
}
echo "\n";

// 5. Check File Permissions
echo "5. File Permissions\n";
echo "-------------------------------------------\n";
$dirs = [
    'api/writable',
    'api/writable/cache',
    'api/writable/logs',
    'api/writable/session',
    'api/public/uploads'
];

foreach ($dirs as $dir) {
    if (is_writable($dir)) {
        echo "✓ $dir (writable)\n";
    } else {
        echo "✗ $dir (NOT writable)\n";
    }
}
echo "\n";

// 6. Check Routes
echo "6. API Routes\n";
echo "-------------------------------------------\n";
$routes = \Config\Services::routes();
$routes->loadRoutes();
$allRoutes = $routes->getRoutes();

$apiRoutes = array_filter(array_keys($allRoutes), function($route) {
    return strpos($route, 'api/') === 0;
});

echo "Total API routes: " . count($apiRoutes) . "\n";
foreach (array_slice($apiRoutes, 0, 10) as $route) {
    echo "  - $route\n";
}
if (count($apiRoutes) > 10) {
    echo "  ... and " . (count($apiRoutes) - 10) . " more\n";
}
echo "\n";

// 7. Summary
echo "===========================================\n";
echo "Summary\n";
echo "===========================================\n";
if (empty($missingTables)) {
    echo "✓ All checks passed!\n";
    echo "API should be working correctly.\n";
} else {
    echo "✗ Issues found:\n";
    echo "- Missing tables: " . implode(', ', $missingTables) . "\n";
    echo "\nRun these commands to fix:\n";
    echo "  cd api\n";
    echo "  php spark migrate\n";
    echo "  php spark db:seed DatabaseSeeder\n";
}
echo "\n";

<?php
// Simple API Test - Place in api/public/ folder
// Access via: https://gcub.digitalks.in/api/public/api-test.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$response = [
    'status' => 'success',
    'message' => 'API folder is accessible',
    'php_version' => phpversion(),
    'timestamp' => date('Y-m-d H:i:s'),
    'tests' => []
];

// Test 1: Check if index.php exists
$response['tests']['index_php_exists'] = file_exists(__DIR__ . '/index.php');

// Test 2: Check writable directory
$response['tests']['writable_exists'] = file_exists(__DIR__ . '/../writable');
$response['tests']['writable_is_writable'] = is_writable(__DIR__ . '/../writable');

// Test 3: Check .env file
$response['tests']['env_exists'] = file_exists(__DIR__ . '/../.env');

// Test 4: Try to load .env
if ($response['tests']['env_exists']) {
    $env_content = file_get_contents(__DIR__ . '/../.env');
    $response['tests']['env_readable'] = true;
    
    // Check environment setting
    if (preg_match('/CI_ENVIRONMENT\s*=\s*(.+)/', $env_content, $matches)) {
        $response['environment'] = trim($matches[1]);
    }
}

// Test 5: Check vendor directory
$response['tests']['vendor_exists'] = file_exists(__DIR__ . '/../vendor');
$response['tests']['autoload_exists'] = file_exists(__DIR__ . '/../vendor/autoload.php');

// Test 6: Try to include CodeIgniter
try {
    if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
        require __DIR__ . '/../vendor/autoload.php';
        $response['tests']['codeigniter_loaded'] = class_exists('CodeIgniter\CodeIgniter');
    } else {
        $response['tests']['codeigniter_loaded'] = false;
        $response['error'] = 'Vendor autoload not found';
    }
} catch (Exception $e) {
    $response['tests']['codeigniter_loaded'] = false;
    $response['error'] = $e->getMessage();
}

// Test 7: Check database connection
if (file_exists(__DIR__ . '/../.env')) {
    $env = file_get_contents(__DIR__ . '/../.env');
    preg_match('/database\.default\.hostname\s*=\s*(.+)/', $env, $host);
    preg_match('/database\.default\.database\s*=\s*(.+)/', $env, $db);
    preg_match('/database\.default\.username\s*=\s*(.+)/', $env, $user);
    preg_match('/database\.default\.password\s*=\s*(.+)/', $env, $pass);
    
    if (isset($host[1]) && isset($db[1]) && isset($user[1]) && isset($pass[1])) {
        $db_host = trim($host[1]);
        $db_name = trim($db[1]);
        $db_user = trim($user[1]);
        $db_pass = trim($pass[1]);
        
        $response['database'] = [
            'host' => $db_host,
            'database' => $db_name,
            'user' => $db_user
        ];
        
        if (extension_loaded('mysqli')) {
            @$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
            if ($conn->connect_error) {
                $response['tests']['database_connection'] = false;
                $response['database']['error'] = $conn->connect_error;
            } else {
                $response['tests']['database_connection'] = true;
                $conn->close();
            }
        }
    }
}

echo json_encode($response, JSON_PRETTY_PRINT);

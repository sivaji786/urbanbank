<?php
/**
 * Check Users Table
 * Upload to server and access via: https://gcub.digitalks.in/check-users.php
 */

header('Content-Type: application/json');

$host = 'localhost';
$db = 'digit143_urbanbank';
$user = 'digit143_urbanbank';
$pass = 'UrbanBank@123';

$response = ['status' => 'checking'];

try {
    $conn = new mysqli($host, $user, $pass, $db);
    
    if ($conn->connect_error) {
        $response['status'] = 'error';
        $response['error'] = $conn->connect_error;
        echo json_encode($response, JSON_PRETTY_PRINT);
        exit;
    }
    
    // Check if users table exists
    $result = $conn->query("SHOW TABLES LIKE 'users'");
    if ($result->num_rows === 0) {
        $response['status'] = 'error';
        $response['error'] = 'Users table does not exist';
        $response['solution'] = 'Run migrations: php spark migrate';
        echo json_encode($response, JSON_PRETTY_PRINT);
        exit;
    }
    
    // Get all users
    $result = $conn->query("SELECT id, email, created_at FROM users");
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    
    $response['status'] = 'success';
    $response['user_count'] = count($users);
    $response['users'] = $users;
    
    // Check if admin user exists
    $admin_result = $conn->query("SELECT id, email FROM users WHERE email = 'admin@urbanbank.com'");
    if ($admin_result->num_rows > 0) {
        $response['admin_exists'] = true;
        $response['admin_user'] = $admin_result->fetch_assoc();
    } else {
        $response['admin_exists'] = false;
        $response['solution'] = 'Admin user not found. Run: php spark db:seed DatabaseSeeder';
    }
    
    $conn->close();
    
} catch (Exception $e) {
    $response['status'] = 'error';
    $response['error'] = $e->getMessage();
}

echo json_encode($response, JSON_PRETTY_PRINT);
?>

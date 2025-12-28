<?php
/**
 * Test Password Hash
 * Upload to server: https://gcub.digitalks.in/test-password.php
 */

header('Content-Type: application/json');

$host = 'localhost';
$db = 'digit143_urbanbank';
$user = 'digit143_urbanbank';
$pass = 'UrbanBank@123';

$response = [];

try {
    $conn = new mysqli($host, $user, $pass, $db);
    
    if ($conn->connect_error) {
        $response['error'] = $conn->connect_error;
        echo json_encode($response, JSON_PRETTY_PRINT);
        exit;
    }
    
    // Get admin user
    $result = $conn->query("SELECT id, email, password FROM users WHERE email = 'admin@urbanbank.com'");
    
    if ($result->num_rows === 0) {
        $response['error'] = 'Admin user not found';
        echo json_encode($response, JSON_PRETTY_PRINT);
        exit;
    }
    
    $admin = $result->fetch_assoc();
    $stored_hash = $admin['password'];
    
    // Test passwords
    $test_passwords = ['admin123', 'password', 'admin', '123456'];
    
    $response['admin_email'] = $admin['email'];
    $response['stored_hash'] = $stored_hash;
    $response['hash_algorithm'] = substr($stored_hash, 0, 4); // Should be $2y$ for bcrypt
    $response['password_tests'] = [];
    
    foreach ($test_passwords as $test_pass) {
        $matches = password_verify($test_pass, $stored_hash);
        $response['password_tests'][$test_pass] = $matches ? 'MATCH ✓' : 'NO MATCH ✗';
        
        if ($matches) {
            $response['correct_password'] = $test_pass;
        }
    }
    
    // Generate new hash for admin123
    $new_hash = password_hash('admin123', PASSWORD_DEFAULT);
    $response['new_hash_for_admin123'] = $new_hash;
    $response['update_sql'] = "UPDATE users SET password = '$new_hash' WHERE email = 'admin@urbanbank.com';";
    
    $conn->close();
    
} catch (Exception $e) {
    $response['error'] = $e->getMessage();
}

echo json_encode($response, JSON_PRETTY_PRINT);
?>

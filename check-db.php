<?php
/**
 * Quick Database Check
 * Upload to: /home/digit143/gcub/check-db.php
 * Access via: https://gcub.digitalks.in/check-db.php
 */

header('Content-Type: application/json');

// Database credentials from .env
$host = 'localhost';
$db = 'urban_bank_db';
$user = 'root';
$pass = '';

$response = [
    'status' => 'checking',
    'database' => $db,
    'tables' => [],
    'data_counts' => []
];

try {
    $conn = new mysqli($host, $user, $pass, $db);

    if ($conn->connect_error) {
        $response['status'] = 'error';
        $response['error'] = 'Connection failed: ' . $conn->connect_error;
        echo json_encode($response, JSON_PRETTY_PRINT);
        exit;
    }

    $response['status'] = 'connected';

    // Get all tables
    $result = $conn->query("SHOW TABLES");
    while ($row = $result->fetch_array()) {
        $table = $row[0];
        $response['tables'][] = $table;

        // Count rows in each table
        $count_result = $conn->query("SELECT COUNT(*) as count FROM `$table`");
        $count_row = $count_result->fetch_assoc();
        $response['data_counts'][$table] = (int) $count_row['count'];
    }

    // Check specific tables
    $required_tables = ['users', 'news', 'events', 'products', 'branches', 'settings'];
    $response['missing_tables'] = [];

    foreach ($required_tables as $table) {
        if (!in_array($table, $response['tables'])) {
            $response['missing_tables'][] = $table;
        }
    }

    // Summary
    $response['summary'] = [
        'total_tables' => count($response['tables']),
        'has_data' => array_sum($response['data_counts']) > 0,
        'ready' => count($response['missing_tables']) === 0 && array_sum($response['data_counts']) > 0
    ];

    $conn->close();

} catch (Exception $e) {
    $response['status'] = 'error';
    $response['error'] = $e->getMessage();
}

echo json_encode($response, JSON_PRETTY_PRINT);
?>
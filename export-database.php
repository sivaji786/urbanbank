<?php
/**
 * Database Export Script
 * This creates a SQL dump of your local database for upload to production
 */

// Database credentials (update these to match your LOCAL database)
$host = 'localhost';
$user = 'root';
$pass = 'root';
$dbname = 'urbanbank';

// Output file
$output_file = __DIR__ . '/database-export.sql';

// Command to export
$command = sprintf(
    'mysqldump -h %s -u %s -p%s %s > %s',
    escapeshellarg($host),
    escapeshellarg($user),
    escapeshellarg($pass),
    escapeshellarg($dbname),
    escapeshellarg($output_file)
);

echo "Exporting database...\n";
echo "Database: $dbname\n";
echo "Output: $output_file\n\n";

exec($command, $output, $return_code);

if ($return_code === 0 && file_exists($output_file)) {
    $size = filesize($output_file);
    echo "✓ Export successful!\n";
    echo "File size: " . number_format($size / 1024, 2) . " KB\n";
    echo "\nNext steps:\n";
    echo "1. Upload this file to your server via FTP\n";
    echo "2. Import it via phpMyAdmin\n";
    echo "3. Update api/.env with production database credentials\n";
} else {
    echo "✗ Export failed!\n";
    echo "Make sure mysqldump is available and credentials are correct.\n";
    echo "\nAlternative: Export manually via phpMyAdmin\n";
}
?>

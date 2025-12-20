<?php

// Debug version of index.php - shows errors
// Replace api/public/index.php with this temporarily to see errors

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

echo "<!-- Debug mode enabled -->\n";

use CodeIgniter\Boot;
use Config\Paths;

/*
 *---------------------------------------------------------------
 * CHECK PHP VERSION
 *---------------------------------------------------------------
 */

$minPhpVersion = '8.1';
if (version_compare(PHP_VERSION, $minPhpVersion, '<')) {
    $message = sprintf(
        'Your PHP version must be %s or higher to run CodeIgniter. Current version: %s',
        $minPhpVersion,
        PHP_VERSION,
    );

    header('HTTP/1.1 503 Service Unavailable.', true, 503);
    echo $message;

    exit(1);
}

/*
 *---------------------------------------------------------------
 * SET THE CURRENT DIRECTORY
 *---------------------------------------------------------------
 */

// Path to the front controller (this file)
define('FCPATH', __DIR__ . DIRECTORY_SEPARATOR);

// Ensure the current directory is pointing to the front controller's directory
if (getcwd() . DIRECTORY_SEPARATOR !== FCPATH) {
    chdir(FCPATH);
}

/*
 *---------------------------------------------------------------
 * BOOTSTRAP THE APPLICATION
 *---------------------------------------------------------------
 */

// LOAD OUR PATHS CONFIG FILE
$pathsConfig = FCPATH . '../app/Config/Paths.php';

if (!file_exists($pathsConfig)) {
    die('ERROR: Paths.php not found at: ' . $pathsConfig);
}

require $pathsConfig;

$paths = new Paths();

// Check if system directory exists
if (!is_dir($paths->systemDirectory)) {
    die('ERROR: System directory not found at: ' . $paths->systemDirectory);
}

// LOAD THE FRAMEWORK BOOTSTRAP FILE
$bootFile = $paths->systemDirectory . '/Boot.php';

if (!file_exists($bootFile)) {
    die('ERROR: Boot.php not found at: ' . $bootFile);
}

require $bootFile;

try {
    exit(Boot::bootWeb($paths));
} catch (Exception $e) {
    echo '<h1>Application Error</h1>';
    echo '<p><strong>Message:</strong> ' . htmlspecialchars($e->getMessage()) . '</p>';
    echo '<p><strong>File:</strong> ' . htmlspecialchars($e->getFile()) . '</p>';
    echo '<p><strong>Line:</strong> ' . $e->getLine() . '</p>';
    echo '<h2>Stack Trace:</h2>';
    echo '<pre>' . htmlspecialchars($e->getTraceAsString()) . '</pre>';
    exit(1);
}

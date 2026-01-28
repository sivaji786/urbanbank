<?php
require 'api/vendor/autoload.php';
// Mock CI environment enough to use DB
define('FCPATH', __DIR__ . DIRECTORY_SEPARATOR . 'api' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR);
require 'api/app/Config/Paths.php';
$paths = new Config\Paths();
require 'api/system/Test/bootstrap.php';

$db = \Config\Database::connect();

echo "--- DOWNLOADS ---\n";
$downloads = $db->table('downloads')->limit(5)->get()->getResultArray();
print_r($downloads);

echo "\n--- FINANCIAL REPORTS ---\n";
$reports = $db->table('financial_reports')->limit(5)->get()->getResultArray();
print_r($reports);

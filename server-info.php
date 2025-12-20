<?php
// Server Info - Place in root directory
// Access via: https://gcub.digitalks.in/server-info.php

?>
<!DOCTYPE html>
<html>
<head>
    <title>Server Information</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        h1 { color: #0099ff; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f8f9fa; font-weight: bold; }
        .pass { color: #28a745; font-weight: bold; }
        .fail { color: #dc3545; font-weight: bold; }
        .section { margin: 30px 0; }
        pre { background: #f8f9fa; padding: 15px; border-radius: 4px; overflow-x: auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Server Information</h1>
        
        <div class="section">
            <h2>PHP Configuration</h2>
            <table>
                <tr><th>Setting</th><th>Value</th></tr>
                <tr><td>PHP Version</td><td><?php echo phpversion(); ?></td></tr>
                <tr><td>Server Software</td><td><?php echo $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'; ?></td></tr>
                <tr><td>Document Root</td><td><?php echo $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown'; ?></td></tr>
                <tr><td>Current Directory</td><td><?php echo __DIR__; ?></td></tr>
                <tr><td>Server Name</td><td><?php echo $_SERVER['SERVER_NAME'] ?? 'Unknown'; ?></td></tr>
            </table>
        </div>

        <div class="section">
            <h2>Required PHP Extensions</h2>
            <table>
                <tr><th>Extension</th><th>Status</th></tr>
                <?php
                $extensions = ['mysqli', 'mbstring', 'json', 'curl', 'intl', 'xml', 'gd'];
                foreach ($extensions as $ext) {
                    $loaded = extension_loaded($ext);
                    echo '<tr><td>' . $ext . '</td><td class="' . ($loaded ? 'pass' : 'fail') . '">' . ($loaded ? '✓ Loaded' : '✗ Missing') . '</td></tr>';
                }
                ?>
            </table>
        </div>

        <div class="section">
            <h2>File Structure Check</h2>
            <table>
                <tr><th>Path</th><th>Exists</th><th>Type</th></tr>
                <?php
                $paths = [
                    'index.html' => 'Frontend',
                    'api/public/index.php' => 'API Entry',
                    'api/.env' => 'Environment',
                    'api/vendor' => 'Dependencies',
                    'api/writable' => 'Writable Dir',
                    'test.php' => 'Test File'
                ];
                
                foreach ($paths as $path => $label) {
                    $exists = file_exists($path);
                    $type = $exists ? (is_dir($path) ? 'Directory' : 'File') : '-';
                    echo '<tr><td>' . $label . ' (' . $path . ')</td><td class="' . ($exists ? 'pass' : 'fail') . '">' . ($exists ? '✓' : '✗') . '</td><td>' . $type . '</td></tr>';
                }
                ?>
            </table>
        </div>

        <div class="section">
            <h2>API Test</h2>
            <p><strong>Testing API endpoint:</strong></p>
            <pre><?php
            $api_url = 'https://' . $_SERVER['HTTP_HOST'] . '/api/public/api-test.php';
            echo $api_url . "\n\n";
            
            if (function_exists('curl_init')) {
                $ch = curl_init($api_url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_TIMEOUT, 10);
                $response = curl_exec($ch);
                $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                curl_close($ch);
                
                echo "HTTP Status: " . $http_code . "\n";
                echo "Response:\n" . $response;
            } else {
                echo "cURL not available";
            }
            ?></pre>
        </div>

        <div class="section">
            <h2>Next Steps</h2>
            <ol>
                <li>If api-test.php returns success, the issue is with CodeIgniter routing</li>
                <li>If api-test.php fails, check file permissions and .env configuration</li>
                <li>Check if vendor folder was uploaded correctly</li>
                <li>Verify database credentials in api/.env</li>
                <li>Contact hosting support if issues persist</li>
            </ol>
        </div>

        <p><em>Delete this file after debugging</em></p>
    </div>
</body>
</html>

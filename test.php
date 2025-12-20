<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Urban Bank - System Test</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #0099ff, #0077cc);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 { font-size: 32px; margin-bottom: 10px; }
        .header p { opacity: 0.9; }
        .content { padding: 30px; }
        .section {
            margin-bottom: 30px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
        }
        .section-header {
            background: #f8f9fa;
            padding: 15px 20px;
            border-bottom: 1px solid #e0e0e0;
            font-weight: 600;
            font-size: 18px;
        }
        .section-body { padding: 20px; }
        .test-item {
            display: flex;
            align-items: center;
            padding: 12px;
            margin-bottom: 8px;
            background: #f8f9fa;
            border-radius: 6px;
        }
        .status {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin-right: 12px;
            flex-shrink: 0;
        }
        .status.pass { background: #28a745; }
        .status.fail { background: #dc3545; }
        .status.warn { background: #ffc107; }
        .status::after {
            content: '';
            display: block;
            width: 12px;
            height: 12px;
            margin: 6px;
            border-radius: 50%;
            background: white;
        }
        .test-label { flex: 1; font-weight: 500; }
        .test-value { 
            color: #666; 
            font-family: 'Courier New', monospace;
            font-size: 13px;
        }
        .code-block {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            margin: 10px 0;
        }
        .alert {
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 15px;
        }
        .alert-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .alert-danger { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .alert-warning { background: #fff3cd; color: #856404; border: 1px solid #ffeaa7; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e0e0e0; }
        th { background: #f8f9fa; font-weight: 600; }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        .summary-card {
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .summary-card.success { background: #d4edda; color: #155724; }
        .summary-card.danger { background: #f8d7da; color: #721c24; }
        .summary-card h3 { font-size: 36px; margin-bottom: 5px; }
        .summary-card p { font-size: 14px; opacity: 0.8; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏦 Urban Bank System Test</h1>
            <p>Comprehensive diagnostic tool for deployment verification</p>
        </div>
        <div class="content">
            <?php
            $tests_passed = 0;
            $tests_failed = 0;
            $warnings = 0;

            // Test 1: PHP Version
            echo '<div class="section">';
            echo '<div class="section-header">1. PHP Environment</div>';
            echo '<div class="section-body">';
            
            $php_version = phpversion();
            $php_ok = version_compare($php_version, '8.1.0', '>=');
            if ($php_ok) {
                $tests_passed++;
                echo '<div class="test-item"><div class="status pass"></div><div class="test-label">PHP Version</div><div class="test-value">' . $php_version . ' ✓</div></div>';
            } else {
                $tests_failed++;
                echo '<div class="test-item"><div class="status fail"></div><div class="test-label">PHP Version</div><div class="test-value">' . $php_version . ' (Requires 8.1+)</div></div>';
            }

            // Required Extensions
            $required_extensions = ['mysqli', 'mbstring', 'json', 'curl', 'intl'];
            foreach ($required_extensions as $ext) {
                if (extension_loaded($ext)) {
                    $tests_passed++;
                    echo '<div class="test-item"><div class="status pass"></div><div class="test-label">Extension: ' . $ext . '</div><div class="test-value">Loaded</div></div>';
                } else {
                    $tests_failed++;
                    echo '<div class="test-item"><div class="status fail"></div><div class="test-label">Extension: ' . $ext . '</div><div class="test-value">Missing</div></div>';
                }
            }
            
            echo '</div></div>';

            // Test 2: File Structure
            echo '<div class="section">';
            echo '<div class="section-header">2. File Structure</div>';
            echo '<div class="section-body">';
            
            $required_files = [
                'build/index.html' => 'Frontend Entry Point',
                'api/public/index.php' => 'API Entry Point',
                'api/app/Config/Database.php' => 'Database Config',
                'api/app/Config/App.php' => 'App Config',
                'api/.env' => 'Environment File'
            ];

            foreach ($required_files as $file => $label) {
                if (file_exists($file)) {
                    $tests_passed++;
                    echo '<div class="test-item"><div class="status pass"></div><div class="test-label">' . $label . '</div><div class="test-value">' . $file . '</div></div>';
                } else {
                    $tests_failed++;
                    echo '<div class="test-item"><div class="status fail"></div><div class="test-label">' . $label . '</div><div class="test-value">' . $file . ' (Missing)</div></div>';
                }
            }
            
            echo '</div></div>';

            // Test 3: Directory Permissions
            echo '<div class="section">';
            echo '<div class="section-header">3. Directory Permissions</div>';
            echo '<div class="section-body">';
            
            $writable_dirs = [
                'api/writable' => 'Writable Directory',
                'api/writable/cache' => 'Cache Directory',
                'api/writable/logs' => 'Logs Directory',
                'api/public/uploads' => 'Uploads Directory'
            ];

            foreach ($writable_dirs as $dir => $label) {
                if (file_exists($dir)) {
                    if (is_writable($dir)) {
                        $tests_passed++;
                        echo '<div class="test-item"><div class="status pass"></div><div class="test-label">' . $label . '</div><div class="test-value">Writable</div></div>';
                    } else {
                        $warnings++;
                        echo '<div class="test-item"><div class="status warn"></div><div class="test-label">' . $label . '</div><div class="test-value">Not Writable (chmod 755)</div></div>';
                    }
                } else {
                    $tests_failed++;
                    echo '<div class="test-item"><div class="status fail"></div><div class="test-label">' . $label . '</div><div class="test-value">Missing</div></div>';
                }
            }
            
            echo '</div></div>';

            // Test 4: Database Connection
            echo '<div class="section">';
            echo '<div class="section-header">4. Database Connection</div>';
            echo '<div class="section-body">';
            
            if (file_exists('api/.env')) {
                $env_content = file_get_contents('api/.env');
                preg_match('/database\.default\.hostname\s*=\s*(.+)/', $env_content, $host_match);
                preg_match('/database\.default\.database\s*=\s*(.+)/', $env_content, $db_match);
                preg_match('/database\.default\.username\s*=\s*(.+)/', $env_content, $user_match);
                preg_match('/database\.default\.password\s*=\s*(.+)/', $env_content, $pass_match);
                
                $db_host = isset($host_match[1]) ? trim($host_match[1]) : 'localhost';
                $db_name = isset($db_match[1]) ? trim($db_match[1]) : '';
                $db_user = isset($user_match[1]) ? trim($user_match[1]) : '';
                $db_pass = isset($pass_match[1]) ? trim($pass_match[1]) : '';
                
                echo '<div class="test-item"><div class="status pass"></div><div class="test-label">Database Host</div><div class="test-value">' . htmlspecialchars($db_host) . '</div></div>';
                echo '<div class="test-item"><div class="status pass"></div><div class="test-label">Database Name</div><div class="test-value">' . htmlspecialchars($db_name) . '</div></div>';
                echo '<div class="test-item"><div class="status pass"></div><div class="test-label">Database User</div><div class="test-value">' . htmlspecialchars($db_user) . '</div></div>';
                
                // Try to connect
                if (extension_loaded('mysqli')) {
                    @$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
                    if ($conn->connect_error) {
                        $tests_failed++;
                        echo '<div class="alert alert-danger"><strong>Database Connection Failed:</strong> ' . htmlspecialchars($conn->connect_error) . '</div>';
                    } else {
                        $tests_passed++;
                        echo '<div class="alert alert-success"><strong>Database Connected Successfully!</strong></div>';
                        
                        // Check tables
                        $tables = [];
                        $result = $conn->query("SHOW TABLES");
                        if ($result) {
                            while ($row = $result->fetch_array()) {
                                $tables[] = $row[0];
                            }
                            
                            echo '<p><strong>Database Tables (' . count($tables) . '):</strong></p>';
                            if (count($tables) > 0) {
                                echo '<div class="code-block">' . implode(', ', $tables) . '</div>';
                            } else {
                                echo '<div class="alert alert-warning"><strong>No tables found!</strong> Import the database SQL file via phpMyAdmin.</div>';
                            }
                        }
                        $conn->close();
                    }
                } else {
                    $tests_failed++;
                    echo '<div class="alert alert-danger">MySQLi extension not loaded</div>';
                }
            } else {
                $tests_failed++;
                echo '<div class="alert alert-danger">api/.env file not found</div>';
            }
            
            echo '</div></div>';

            // Test 5: API Endpoints
            echo '<div class="section">';
            echo '<div class="section-header">5. API Test</div>';
            echo '<div class="section-body">';
            
            $api_url = 'https://' . $_SERVER['HTTP_HOST'] . '/api/public/index.php/stats';
            echo '<p><strong>Testing API Endpoint:</strong></p>';
            echo '<div class="code-block">' . htmlspecialchars($api_url) . '</div>';
            
            $ch = curl_init($api_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            $response = curl_exec($ch);
            $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            if ($http_code == 200) {
                $tests_passed++;
                echo '<div class="alert alert-success"><strong>API Response: ' . $http_code . '</strong></div>';
                echo '<p><strong>Response Data:</strong></p>';
                echo '<div class="code-block">' . htmlspecialchars(substr($response, 0, 500)) . '</div>';
            } else {
                $tests_failed++;
                echo '<div class="alert alert-danger"><strong>API Error: HTTP ' . $http_code . '</strong></div>';
            }
            
            echo '</div></div>';

            // Summary
            echo '<div class="section">';
            echo '<div class="section-header">Summary</div>';
            echo '<div class="section-body">';
            echo '<div class="summary">';
            echo '<div class="summary-card success"><h3>' . $tests_passed . '</h3><p>Tests Passed</p></div>';
            echo '<div class="summary-card danger"><h3>' . $tests_failed . '</h3><p>Tests Failed</p></div>';
            echo '<div class="summary-card ' . ($warnings > 0 ? 'danger' : 'success') . '"><h3>' . $warnings . '</h3><p>Warnings</p></div>';
            echo '</div>';
            
            if ($tests_failed == 0 && $warnings == 0) {
                echo '<div class="alert alert-success"><strong>✓ All tests passed!</strong> Your system is ready for production.</div>';
            } else {
                echo '<div class="alert alert-warning"><strong>⚠ Action Required:</strong> Please fix the failed tests above.</div>';
            }
            
            echo '<h3>Next Steps:</h3>';
            echo '<ol style="line-height: 2;">';
            echo '<li>If database tables are missing, import the SQL file via phpMyAdmin</li>';
            echo '<li>If directories are not writable, contact your hosting provider</li>';
            echo '<li>Test the frontend at: <code>https://' . $_SERVER['HTTP_HOST'] . '/</code></li>';
            echo '<li>Test the admin portal at: <code>https://' . $_SERVER['HTTP_HOST'] . '/#admin</code></li>';
            echo '<li>Delete this test.php file after verification</li>';
            echo '</ol>';
            
            echo '</div></div>';
            ?>
        </div>
    </div>
</body>
</html>

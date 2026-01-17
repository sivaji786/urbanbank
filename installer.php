<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle AJAX database test request FIRST - before any HTML output
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['test_db'])) {
    header('Content-Type: application/json');
    
    $dbHost = $_POST['db_host'] ?? '';
    $dbName = $_POST['db_name'] ?? '';
    $dbUser = $_POST['db_user'] ?? '';
    $dbPassword = $_POST['db_password'] ?? '';
    
    try {
        $conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);
        
        if ($conn->connect_error) {
            echo json_encode([
                'success' => false,
                'message' => 'Connection failed: ' . $conn->connect_error
            ]);
        } else {
            $conn->close();
            echo json_encode([
                'success' => true,
                'message' => 'Database connection successful!'
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error: ' . $e->getMessage()
        ]);
    }
    exit; // Important: Stop execution after AJAX response
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Urban Bank - Application Installer</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 0;
        }
        .installer-container {
            max-width: 700px;
            margin: 0 auto;
        }
        .card {
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            border: none;
            border-radius: 15px;
        }
        .card-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px 15px 0 0 !important;
            padding: 25px;
        }
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
        }
        .btn-primary:hover {
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
        .test-result {
            margin-top: 10px;
            padding: 10px;
            border-radius: 5px;
            display: none;
        }
        .test-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .test-error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .spinner-border-sm {
            width: 1rem;
            height: 1rem;
        }
    </style>
</head>
<body>
    <div class="installer-container">
        <div class="card">
            <div class="card-header text-center">
                <h2 class="mb-0">🏦 Urban Bank Installer</h2>
                <p class="mb-0 mt-2">Configure your application settings</p>
                <small class="text-white-50 d-block mt-2">
                    ⚠️ Note: Extract app.zip manually before running this installer
                </small>
            </div>
            <div class="card-body p-4">
                <?php
                // Check if form is submitted
                if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['install'])) {
                    installApplication();
                } else {
                    showInstallationForm();
                }

                function showInstallationForm() {
                ?>
                    <form method="POST" id="installerForm">
                        <!-- Database Configuration -->
                        <h5 class="mb-3 text-primary">📊 Database Configuration</h5>
                        
                        <div class="mb-3">
                            <label for="db_host" class="form-label">Database Host</label>
                            <input type="text" class="form-control" id="db_host" name="db_host" 
                                   value="localhost" required>
                            <small class="form-text text-muted">Usually 'localhost' for shared hosting</small>
                        </div>

                        <div class="mb-3">
                            <label for="db_name" class="form-label">Database Name</label>
                            <input type="text" class="form-control" id="db_name" name="db_name" required>
                        </div>

                        <div class="mb-3">
                            <label for="db_user" class="form-label">Database Username</label>
                            <input type="text" class="form-control" id="db_user" name="db_user" required>
                        </div>

                        <div class="mb-3">
                            <label for="db_password" class="form-label">Database Password</label>
                            <input type="password" class="form-control" id="db_password" name="db_password">
                        </div>

                        <!-- Test Database Connection Button -->
                        <div class="mb-4">
                            <button type="button" class="btn btn-outline-primary" id="testDbBtn" onclick="testDatabaseConnection()">
                                <span id="testBtnText">🔍 Test Database Connection</span>
                                <span id="testBtnSpinner" class="spinner-border spinner-border-sm d-none" role="status"></span>
                            </button>
                            <div id="testResult" class="test-result"></div>
                        </div>

                        <hr class="my-4">

                        <!-- Application URLs -->
                        <h5 class="mb-3 text-primary">🌐 Application URLs</h5>

                        <div class="mb-3">
                            <label for="api_url" class="form-label">API URL</label>
                            <input type="url" class="form-control" id="api_url" name="api_url" 
                                   placeholder="https://yourdomain.com/api/public/index.php" required>
                            <small class="form-text text-muted">Full path to your API endpoint</small>
                        </div>

                        <div class="mb-3">
                            <label for="app_url" class="form-label">Application URL</label>
                            <input type="url" class="form-control" id="app_url" name="app_url" 
                                   placeholder="https://yourdomain.com" required>
                            <small class="form-text text-muted">Your main application URL</small>
                        </div>

                        <hr class="my-4">

                        <!-- Install Button -->
                        <div class="d-grid">
                            <button type="submit" name="install" class="btn btn-primary btn-lg">
                                🚀 Install Application
                            </button>
                        </div>
                    </form>
                <?php
                }

                function installApplication() {
                    // Get form data
                    $dbHost = $_POST['db_host'] ?? '';
                    $dbName = $_POST['db_name'] ?? '';
                    $dbUser = $_POST['db_user'] ?? '';
                    $dbPassword = $_POST['db_password'] ?? '';
                    $apiUrl = $_POST['api_url'] ?? '';
                    $appUrl = $_POST['app_url'] ?? '';

                    // Validate inputs
                    if (empty($dbHost) || empty($dbName) || empty($dbUser) || empty($apiUrl) || empty($appUrl)) {
                        showError("All fields except Database Password are required!");
                        return;
                    }

                    // Test database connection
                    try {
                        $conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);
                        if ($conn->connect_error) {
                            throw new Exception("Database connection failed: " . $conn->connect_error);
                        }
                        $conn->close();
                    } catch (Exception $e) {
                        showError($e->getMessage());
                        return;
                    }

                    // Note: We assume app.zip has been manually extracted already
                    // The installer only configures the .env file


                    // Read the API .env file
                    $envPath = __DIR__ . '/api/.env';
                    
                    // Check if extraction created the api directory
                    if (!is_dir(__DIR__ . '/api')) {
                        showError("API directory not found after extraction. The app.zip may not contain the expected structure.<br>Expected: api/ directory<br>Current directory: " . __DIR__);
                        return;
                    }
                    
                    if (!file_exists($envPath)) {
                        showError("API .env file not found at: " . $envPath . "<br>Please ensure app.zip contains api/.env file");
                        return;
                    }

                    $envContent = file_get_contents($envPath);
                    if ($envContent === false) {
                        showError("Failed to read .env file at: " . $envPath);
                        return;
                    }

                    // Replace placeholders with actual values
                    $replacements = [
                        'DB_HOST=???' => 'DB_HOST=' . $dbHost,
                        'DB_NAME=???' => 'DB_NAME=' . $dbName,
                        'DB_USER=???' => 'DB_USER=' . $dbUser,
                        'DB_PASSWORD=???' => 'DB_PASSWORD=' . $dbPassword,
                        'API_URL=???' => 'API_URL=' . $apiUrl,
                        'APP_URL=???' => 'APP_URL=' . $appUrl,
                        // Also handle variations without ???
                        'database.default.hostname = ???' => 'database.default.hostname = ' . $dbHost,
                        'database.default.database = ???' => 'database.default.database = ' . $dbName,
                        'database.default.username = ???' => 'database.default.username = ' . $dbUser,
                        'database.default.password = ???' => 'database.default.password = ' . $dbPassword,
                    ];

                    foreach ($replacements as $search => $replace) {
                        $envContent = str_replace($search, $replace, $envContent);
                    }

                    // Write updated .env file
                    if (file_put_contents($envPath, $envContent) === false) {
                        showError("Failed to write .env file at: " . $envPath . "<br>Check directory permissions.");
                        return;
                    }


                    // Show success message
                    showSuccess($appUrl);
                }

                function showError($message) {
                    echo '<div class="alert alert-danger" role="alert">';
                    echo '<h5 class="alert-heading">❌ Installation Failed</h5>';
                    echo '<p>' . htmlspecialchars($message) . '</p>';
                    echo '<hr>';
                    echo '<a href="installer.php" class="btn btn-outline-danger">← Try Again</a>';
                    echo '</div>';
                }

                function showSuccess($appUrl) {
                    echo '<div class="alert alert-success" role="alert">';
                    echo '<h4 class="alert-heading">✅ Configuration Successful!</h4>';
                    echo '<p class="mb-3">Your Urban Bank application has been configured successfully.</p>';
                    echo '<hr>';
                    echo '<h6>What was configured:</h6>';
                    echo '<ul class="mb-3">';
                    echo '<li>Database connection settings updated in <code>api/.env</code></li>';
                    echo '<li>API URL and Application URL configured</li>';
                    echo '<li>Environment set to production mode</li>';
                    echo '</ul>';
                    echo '<h6>Next Steps:</h6>';
                    echo '<ol class="mb-3">';
                    echo '<li><strong>Import Database:</strong> Import the SQL file (<code>urban_bank_db.sql</code>) into your database using phpMyAdmin or MySQL command line.</li>';
                    echo '<li><strong>Delete this installer:</strong> Manually delete <code>installer.php</code> from your server for security.</li>';
                    echo '<li><strong>Access Your Application:</strong> Visit your application at the URL below.</li>';
                    echo '</ol>';
                    echo '<div class="d-grid gap-2">';
                    echo '<a href="' . htmlspecialchars($appUrl) . '" class="btn btn-success btn-lg" target="_blank">🚀 Open Application</a>';
                    echo '</div>';
                    echo '<div class="alert alert-warning mt-3 mb-0">';
                    echo '<strong>⚠️ Security Warning:</strong> Please delete <code>installer.php</code> manually from your server immediately!';
                    echo '</div>';
                    echo '</div>';
                }
                ?>
            </div>
        </div>
    </div>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
        // Test database connection via AJAX
        function testDatabaseConnection() {
            const testBtn = document.getElementById('testDbBtn');
            const testBtnText = document.getElementById('testBtnText');
            const testBtnSpinner = document.getElementById('testBtnSpinner');
            const testResult = document.getElementById('testResult');
            
            // Get form values
            const dbHost = document.getElementById('db_host').value;
            const dbName = document.getElementById('db_name').value;
            const dbUser = document.getElementById('db_user').value;
            const dbPassword = document.getElementById('db_password').value;
            
            // Validate inputs
            if (!dbHost || !dbName || !dbUser) {
                testResult.className = 'test-result test-error';
                testResult.textContent = '❌ Please fill in all database fields (password is optional)';
                testResult.style.display = 'block';
                return;
            }
            
            // Show loading state
            testBtn.disabled = true;
            testBtnText.classList.add('d-none');
            testBtnSpinner.classList.remove('d-none');
            testResult.style.display = 'none';
            
            // Create form data
            const formData = new FormData();
            formData.append('test_db', '1');
            formData.append('db_host', dbHost);
            formData.append('db_name', dbName);
            formData.append('db_user', dbUser);
            formData.append('db_password', dbPassword);
            
            // Send AJAX request
            fetch('installer.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                testBtn.disabled = false;
                testBtnText.classList.remove('d-none');
                testBtnSpinner.classList.add('d-none');
                
                if (data.success) {
                    testResult.className = 'test-result test-success';
                    testResult.textContent = '✅ ' + data.message;
                } else {
                    testResult.className = 'test-result test-error';
                    testResult.textContent = '❌ ' + data.message;
                }
                testResult.style.display = 'block';
            })
            .catch(error => {
                testBtn.disabled = false;
                testBtnText.classList.remove('d-none');
                testBtnSpinner.classList.add('d-none');
                testResult.className = 'test-result test-error';
                testResult.textContent = '❌ Connection test failed: ' + error.message;
                testResult.style.display = 'block';
            });
        }
    </script>
</body>
</html>

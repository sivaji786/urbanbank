<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ApplicationModel;
use App\Models\ProductModel;

class ApplicationController extends ResourceController
{
    protected $modelName = 'App\Models\ApplicationModel';
    protected $format    = 'json';

    /**
     * Submit deposit application
     * POST /applications/deposit
     */
    public function submitDeposit()
    {
        $data = $this->request->getJSON(true);

        // Validate required fields
        if (!isset($data['name'], $data['email'], $data['phone'], $data['branch_id'], $data['deposit_type'])) {
            return $this->fail('Missing required fields', 400);
        }

        // Get product details
        $productModel = new ProductModel();
        $product = $productModel->where('title', $data['deposit_type'])
                                ->where('category', 'deposit')
                                ->first();

        if (!$product) {
            return $this->fail('Invalid deposit product', 400);
        }

        // Check for duplicate application
        $duplicate = $this->model->checkDuplicateApplication(
            $data['email'],
            $product['id'],
            'deposit',
            $data['phone']
        );

        if ($duplicate) {
            return $this->respond([
                'success' => false,
                'duplicate' => true,
                'message' => "You have already applied for {$product['title']}",
                'existing_application' => [
                    'application_id' => $duplicate['application_id'],
                    'status' => $duplicate['status'],
                    'applied_date' => $duplicate['created_at']
                ]
            ], 409);
        }

        // Generate unique application ID
        $applicationId = $this->model->generateApplicationId(
            $data['branch_id'],
            $product['id']
        );

        // Prepare application data
        $applicationData = [
            'application_id' => $applicationId,
            'application_type' => 'deposit',
            'product_id' => $product['id'],
            'product_name' => $product['title'],
            'branch_id' => $data['branch_id'],
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'status' => 'open',
        ];

        // Save application
        if ($this->model->insert($applicationData)) {
            return $this->respondCreated([
                'success' => true,
                'message' => 'Your deposit application has been submitted successfully!',
                'application_id' => $applicationId,
                'status' => 'open'
            ]);
        }

        return $this->fail('Failed to submit application. Please try again.', 500);
    }

    /**
     * Submit loan application
     * POST /applications/loan
     */
    public function submitLoan()
    {
        $data = $this->request->getJSON(true);

        // Validate required fields
        if (!isset($data['name'], $data['email'], $data['phone'], $data['branch_id'], $data['loan_type'])) {
            return $this->fail('Missing required fields', 400);
        }

        // Get product details
        $productModel = new ProductModel();
        $product = $productModel->where('title', $data['loan_type'])
                                ->where('category', 'loan')
                                ->first();

        if (!$product) {
            return $this->fail('Invalid loan product', 400);
        }

        // Check for duplicate application
        $duplicate = $this->model->checkDuplicateApplication(
            $data['email'],
            $product['id'],
            'loan',
            $data['phone']
        );

        if ($duplicate) {
            return $this->respond([
                'success' => false,
                'duplicate' => true,
                'message' => "You have already applied for {$product['title']}",
                'existing_application' => [
                    'application_id' => $duplicate['application_id'],
                    'status' => $duplicate['status'],
                    'applied_date' => $duplicate['created_at']
                ]
            ], 409);
        }

        // Generate unique application ID
        $applicationId = $this->model->generateApplicationId(
            $data['branch_id'],
            $product['id']
        );

        // Prepare application data
        $applicationData = [
            'application_id' => $applicationId,
            'application_type' => 'loan',
            'product_id' => $product['id'],
            'product_name' => $product['title'],
            'branch_id' => $data['branch_id'],
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'status' => 'open',
        ];

        // Save application
        if ($this->model->insert($applicationData)) {
            return $this->respondCreated([
                'success' => true,
                'message' => 'Your loan application has been submitted successfully!',
                'application_id' => $applicationId,
                'status' => 'open'
            ]);
        }

        return $this->fail('Failed to submit application. Please try again.', 500);
    }

    /**
     * Get all applications with filters
     * GET /applications
     */
    public function index()
    {
        $page = $this->request->getGet('page') ?? 1;
        $limit = $this->request->getGet('limit') ?? 50;
        $offset = ($page - 1) * $limit;

        $filters = [];
        if ($this->request->getGet('status')) {
            $filters['status'] = $this->request->getGet('status');
        }
        if ($this->request->getGet('application_type')) {
            $filters['application_type'] = $this->request->getGet('application_type');
        }
        if ($this->request->getGet('search')) {
            $filters['search'] = $this->request->getGet('search');
        }
        if ($this->request->getGet('branch_id')) {
            $filters['branch_id'] = $this->request->getGet('branch_id');
        }

        $applications = $this->model->getApplicationsWithFilters($filters, $limit, $offset);
        $total = $this->model->getApplicationsCount($filters);

        return $this->respond([
            'data' => $applications,
            'pagination' => [
                'page' => (int) $page,
                'limit' => (int) $limit,
                'total' => $total,
                'pages' => ceil($total / $limit),
            ],
        ]);
    }

    /**
     * Get single application
     * GET /applications/:id
     */
    public function show($id = null)
    {
        $application = $this->model->getApplicationById($id);
        
        if (!$application) {
            return $this->failNotFound('Application not found');
        }

        return $this->respond($application);
    }

    /**
     * Update application status
     * PUT /applications/:id/status
     */
    public function updateStatus($id = null)
    {
        $data = $this->request->getJSON(true);

        if (!isset($data['status'])) {
            return $this->fail('Status is required', 400);
        }

        $validStatuses = ['open', 'in-progress', 'rejected', 'approved'];
        if (!in_array($data['status'], $validStatuses)) {
            return $this->fail('Invalid status value', 400);
        }

        // Get the current application to retrieve old status
        $application = $this->model->find($id);
        if (!$application) {
            return $this->failNotFound('Application not found');
        }

        $oldStatus = $application['status'];
        $newStatus = $data['status'];
        $notes = $data['notes'] ?? null;

        // Update the application status
        if ($this->model->updateApplicationStatus($id, $newStatus, $notes)) {
            // Log the status change
            $logModel = new \App\Models\ApplicationStatusLogModel();
            $logModel->logStatusChange(
                $id,
                $oldStatus,
                $newStatus,
                $notes,
                null // TODO: Get current admin user ID from session/JWT
            );

            return $this->respond([
                'success' => true,
                'message' => 'Application status updated successfully'
            ]);
        }

        return $this->fail('Failed to update application status', 500);
    }

    /**
     * Check for duplicate application
     * GET /applications/check-duplicate?email=xxx&product_id=xxx&type=deposit&phone=xxx
     */
    public function checkDuplicate()
    {
        $email = $this->request->getGet('email');
        $productId = $this->request->getGet('product_id');
        $type = $this->request->getGet('type');
        $phone = $this->request->getGet('phone');

        if (!$email || !$productId || !$type) {
            return $this->fail('Missing required parameters', 400);
        }

        $duplicate = $this->model->checkDuplicateApplication($email, $productId, $type, $phone);

        if ($duplicate) {
            return $this->respond([
                'duplicate' => true,
                'application' => [
                    'application_id' => $duplicate['application_id'],
                    'status' => $duplicate['status'],
                    'product_name' => $duplicate['product_name'],
                    'applied_date' => $duplicate['created_at']
                ]
            ]);
        }

        return $this->respond(['duplicate' => false]);
    }

    /**
     * Get application statistics
     * GET /applications/statistics
     */
    public function statistics()
    {
        $stats = $this->model->getStatistics();
        return $this->respond($stats);
    }

    /**
     * Get all branches for filter dropdown
     * GET /applications/branches
     */
    public function getBranches()
    {
        $db = \Config\Database::connect();
        $branches = $db->table('branches')
                      ->select('id, name')
                      ->orderBy('name', 'ASC')
                      ->get()
                      ->getResultArray();
        
        return $this->respond($branches);
    }

    /**
     * Get status logs for an application
     * GET /applications/:id/status-logs
     */
    public function getStatusLogs($id = null)
    {
        if (!$id) {
            return $this->fail('Application ID is required', 400);
        }

        // Verify application exists
        $application = $this->model->find($id);
        if (!$application) {
            return $this->failNotFound('Application not found');
        }

        $logModel = new \App\Models\ApplicationStatusLogModel();
        $logs = $logModel->getLogsByApplicationId($id);

        return $this->respond($logs);
    }
}

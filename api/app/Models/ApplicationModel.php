<?php

namespace App\Models;

use CodeIgniter\Model;

class ApplicationModel extends Model
{
    protected $table            = 'applications';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'application_id',
        'application_type',
        'product_id',
        'product_name',
        'branch_id',
        'name',
        'email',
        'phone',
        'status',
        'notes'
    ];

    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    protected $validationRules = [
        'application_type' => 'required|in_list[deposit,loan]',
        'product_id'       => 'required|integer',
        'product_name'     => 'required|min_length[3]',
        'branch_id'        => 'required|integer',
        'name'             => 'required|min_length[3]',
        'email'            => 'required|valid_email',
        'phone'            => 'required|min_length[10]',
    ];

    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    /**
     * Generate unique application ID in format: GCUB-{branchId:02d}-{productId:02d}-{increment:04d}
     * Example: GCUB-01-05-0001
     */
    public function generateApplicationId(int $branchId, int $productId): string
    {
        // Get the last application for this branch-product combination
        $lastApp = $this->where('branch_id', $branchId)
                        ->where('product_id', $productId)
                        ->orderBy('id', 'DESC')
                        ->first();

        $increment = 1;
        if ($lastApp && isset($lastApp['application_id'])) {
            // Extract increment from last application_id (GCUB-01-05-0001 -> 1)
            $parts = explode('-', $lastApp['application_id']);
            if (count($parts) === 4) {
                $increment = intval($parts[3]) + 1;
            }
        }

        // Format with zero-padding: branch (2 digits), product (2 digits), increment (4 digits)
        return sprintf('GCUB-%02d-%02d-%04d', $branchId, $productId, $increment);
    }

    /**
     * Check if user has already applied for the same product
     * Checks both email and phone number
     * Returns the existing application if found, null otherwise
     */
    public function checkDuplicateApplication(string $email, int $productId, string $applicationType, ?string $phone = null): ?array
    {
        $builder = $this->where('product_id', $productId)
                        ->where('application_type', $applicationType)
                        ->whereNotIn('status', ['rejected']); // Don't count rejected applications
        
        // Check for duplicate by email OR phone
        $builder->groupStart()
                ->where('email', $email);
        
        if ($phone !== null) {
            $builder->orWhere('phone', $phone);
        }
        
        $builder->groupEnd();
        
        return $builder->first();
    }

    /**
     * Get applications by status
     */
    public function getApplicationsByStatus(string $status): array
    {
        return $this->where('status', $status)
                    ->orderBy('created_at', 'DESC')
                    ->findAll();
    }

    /**
     * Get applications with filters and pagination
     */
    public function getApplicationsWithFilters(array $filters = [], int $limit = 50, int $offset = 0): array
    {
        $builder = $this->db->table('applications');
        
        // Join with branches table to get branch name
        $builder->select('applications.*, branches.name as branch_name')
                ->join('branches', 'branches.id = applications.branch_id', 'left');

        if (!empty($filters['status'])) {
            $builder->where('applications.status', $filters['status']);
        }

        if (!empty($filters['application_type'])) {
            $builder->where('applications.application_type', $filters['application_type']);
        }

        if (!empty($filters['search'])) {
            $builder->groupStart()
                    ->like('applications.application_id', $filters['search'])
                    ->orLike('applications.name', $filters['search'])
                    ->orLike('applications.email', $filters['search'])
                    ->orLike('applications.phone', $filters['search'])
                    ->orLike('applications.product_name', $filters['search'])
                    ->groupEnd();
        }

        if (!empty($filters['branch_id'])) {
            $builder->where('applications.branch_id', $filters['branch_id']);
        }

        return $builder->orderBy('applications.created_at', 'DESC')
                       ->limit($limit, $offset)
                       ->get()
                       ->getResultArray();
    }

    /**
     * Get total count with filters
     */
    public function getApplicationsCount(array $filters = []): int
    {
        $builder = $this->builder();

        if (!empty($filters['status'])) {
            $builder->where('status', $filters['status']);
        }

        if (!empty($filters['application_type'])) {
            $builder->where('application_type', $filters['application_type']);
        }

        if (!empty($filters['search'])) {
            $builder->groupStart()
                    ->like('application_id', $filters['search'])
                    ->orLike('name', $filters['search'])
                    ->orLike('email', $filters['search'])
                    ->orLike('phone', $filters['search'])
                    ->groupEnd();
        }

        if (!empty($filters['branch_id'])) {
            $builder->where('branch_id', $filters['branch_id']);
        }

        return $builder->countAllResults();
    }

    /**
     * Update application status
     */
    public function updateApplicationStatus(int $id, string $status, ?string $notes = null): bool
    {
        $data = ['status' => $status];
        
        if ($notes !== null) {
            $data['notes'] = $notes;
        }

        return $this->update($id, $data);
    }

    /**
     * Get a single application by ID with branch name
     */
    public function getApplicationById(int $id): ?array
    {
        $builder = $this->db->table('applications');
        
        $result = $builder->select('applications.*, branches.name as branch_name')
                         ->join('branches', 'branches.id = applications.branch_id', 'left')
                         ->where('applications.id', $id)
                         ->get()
                         ->getRowArray();
        
        return $result ?: null;
    }

    /**
     * Get application statistics
     */
    public function getStatistics(): array
    {
        return [
            'total' => $this->countAll(),
            'open' => $this->where('status', 'open')->countAllResults(false),
            'in_progress' => $this->where('status', 'in-progress')->countAllResults(false),
            'approved' => $this->where('status', 'approved')->countAllResults(false),
            'rejected' => $this->where('status', 'rejected')->countAllResults(false),
        ];
    }
}

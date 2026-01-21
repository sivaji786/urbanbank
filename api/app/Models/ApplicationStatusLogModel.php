<?php

namespace App\Models;

use CodeIgniter\Model;

class ApplicationStatusLogModel extends Model
{
    protected $table = 'application_status_logs';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = [
        'application_id',
        'old_status',
        'new_status',
        'notes',
        'changed_by',
        'created_at'
    ];

    protected bool $allowEmptyInserts = false;
    protected bool $updateOnlyChanged = true;

    protected array $casts = [];
    protected array $castHandlers = [];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = '';
    protected $deletedField = 'deleted_at';

    // Validation
    protected $validationRules = [
        'application_id' => 'required|integer',
        'new_status' => 'required|in_list[open,in-progress,approved,rejected]',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert = [];
    protected $afterInsert = [];
    protected $beforeUpdate = [];
    protected $afterUpdate = [];
    protected $beforeFind = [];
    protected $afterFind = [];
    protected $beforeDelete = [];
    protected $afterDelete = [];

    /**
     * Get status logs for a specific application
     */
    public function getLogsByApplicationId(int $applicationId): array
    {
        return $this->where('application_id', $applicationId)
                    ->orderBy('created_at', 'DESC')
                    ->findAll();
    }

    /**
     * Create a status log entry
     */
    public function logStatusChange(int $applicationId, ?string $oldStatus, string $newStatus, ?string $notes = null, ?int $changedBy = null): bool
    {
        $data = [
            'application_id' => $applicationId,
            'old_status' => $oldStatus,
            'new_status' => $newStatus,
            'notes' => $notes,
            'changed_by' => $changedBy,
            'created_at' => date('Y-m-d H:i:s')
        ];

        return $this->insert($data) !== false;
    }
}

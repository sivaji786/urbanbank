<?php

namespace App\Models;

use CodeIgniter\Model;

class ServiceChargeModel extends Model
{
    protected $table = 'service_charges';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = [
        'service',
        'charge',
        'status',
        'sort_order'
    ];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    // Validation
    protected $validationRules = [
        'service' => 'required|max_length[255]',
        'charge' => 'required|max_length[100]',
        'status' => 'required|in_list[active,inactive]',
        'sort_order' => 'permit_empty|integer',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;
}

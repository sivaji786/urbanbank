<?php

namespace App\Models;

use CodeIgniter\Model;

class ServiceModel extends Model
{
    protected $table = 'services';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = [
        'title',
        'description',
        'icon',
        'features',
        'charges',
        'color',
        'bg_color',
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
        'title' => 'required|max_length[255]',
        'description' => 'permit_empty',
        'icon' => 'permit_empty|max_length[100]',
        'charges' => 'permit_empty|max_length[255]',
        'color' => 'permit_empty|max_length[50]',
        'bg_color' => 'permit_empty|max_length[50]',
        'status' => 'required|in_list[active,inactive]',
        'sort_order' => 'permit_empty|integer',
    ];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;
}

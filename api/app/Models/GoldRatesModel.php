<?php

namespace App\Models;

use CodeIgniter\Model;

class GoldRatesModel extends Model
{
    protected $table = 'gold_rates';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['title', 'description', 'headers', 'rows', 'status'];

    protected bool $allowEmptyInserts = false;
    protected bool $updateOnlyChanged = true;

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    // JSON casting
    protected array $casts = [
        'headers' => 'json',
        'rows' => 'json',
    ];
}

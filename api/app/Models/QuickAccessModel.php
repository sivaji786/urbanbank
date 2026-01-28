<?php

namespace App\Models;

use CodeIgniter\Model;

class QuickAccessModel extends Model
{
    protected $table = 'quick_access';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['title', 'subtitle', 'bg_color', 'icon', 'link', 'is_new_tab', 'order_index'];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
}

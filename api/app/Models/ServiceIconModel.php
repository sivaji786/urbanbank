<?php

namespace App\Models;

use CodeIgniter\Model;

class ServiceIconModel extends Model
{
    protected $table = 'service_icons';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['title', 'icon_url', 'link', 'is_new_tab', 'order_index'];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
}

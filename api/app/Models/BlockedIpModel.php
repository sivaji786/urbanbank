<?php

namespace App\Models;

use CodeIgniter\Model;

class BlockedIpModel extends Model
{
    protected $table = 'blocked_ips';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['ip_address', 'reason', 'created_at'];
    protected $useTimestamps = false;

    public function isBlocked($ip)
    {
        return $this->where('ip_address', $ip)->countAllResults() > 0;
    }
}

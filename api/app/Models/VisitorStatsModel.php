<?php

namespace App\Models;

use CodeIgniter\Model;

class VisitorStatsModel extends Model
{
    protected $table = 'visitor_stats';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = [
        'total_visits',
        'unique_visitors',
        'last_updated'
    ];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';

    /**
     * Increment total visits count
     */
    public function incrementVisits()
    {
        $this->db->table($this->table)
            ->set('total_visits', 'total_visits + 1', false)
            ->set('last_updated', date('Y-m-d H:i:s'))
            ->where('id', 1)
            ->update();
    }

    /**
     * Increment unique visitors count
     */
    public function incrementUniqueVisitors()
    {
        $this->db->table($this->table)
            ->set('unique_visitors', 'unique_visitors + 1', false)
            ->set('last_updated', date('Y-m-d H:i:s'))
            ->where('id', 1)
            ->update();
    }

    /**
     * Get current statistics
     */
    public function getStats()
    {
        return $this->find(1);
    }
}

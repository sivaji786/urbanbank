<?php

namespace App\Models;

use CodeIgniter\Model;

class VisitorLogModel extends Model
{
    protected $table = 'visitor_logs';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = [
        'visitor_id',
        'ip_address',
        'user_agent',
        'referrer',
        'page_url',
        'session_id',
        'is_unique',
        'visit_date',
        'created_at'
    ];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';

    /**
     * Check if visitor is unique (first time visiting)
     */
    public function isUniqueVisitor($visitorId)
    {
        $count = $this->where('visitor_id', $visitorId)->countAllResults();
        return $count === 0;
    }

    /**
     * Log a new visit
     */
    public function logVisit($data)
    {
        $data['created_at'] = date('Y-m-d H:i:s');
        $data['visit_date'] = date('Y-m-d');

        return $this->insert($data);
    }

    /**
     * Get visitor logs with optional filters
     */
    public function getVisitorLogs($limit = 100, $offset = 0, $filters = [])
    {
        $builder = $this->builder();

        // Apply date range filter
        if (isset($filters['start_date'])) {
            $builder->where('visit_date >=', $filters['start_date']);
        }
        if (isset($filters['end_date'])) {
            $builder->where('visit_date <=', $filters['end_date']);
        }

        // Apply unique filter
        if (isset($filters['is_unique'])) {
            $builder->where('is_unique', $filters['is_unique']);
        }

        return $builder->orderBy('created_at', 'DESC')
            ->limit($limit, $offset)
            ->get()
            ->getResultArray();
    }

    /**
     * Get total count of logs (for pagination)
     */
    public function getLogsCount($filters = [])
    {
        $builder = $this->builder();

        if (isset($filters['start_date'])) {
            $builder->where('visit_date >=', $filters['start_date']);
        }
        if (isset($filters['end_date'])) {
            $builder->where('visit_date <=', $filters['end_date']);
        }
        if (isset($filters['is_unique'])) {
            $builder->where('is_unique', $filters['is_unique']);
        }

        return $builder->countAllResults();
    }

    /**
     * Get daily visit statistics
     */
    public function getDailyStats($days = 30)
    {
        $startDate = date('Y-m-d', strtotime("-$days days"));

        return $this->db->table($this->table)
            ->select('visit_date, COUNT(*) as total_visits, SUM(is_unique) as unique_visits')
            ->where('visit_date >=', $startDate)
            ->groupBy('visit_date')
            ->orderBy('visit_date', 'ASC')
            ->get()
            ->getResultArray();
    }
}

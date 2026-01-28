<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\VisitorStatsModel;
use App\Models\VisitorLogModel;

class VisitorController extends ResourceController
{
    protected $format = 'json';

    /**
     * Track a new visit
     * POST /track-visit
     */
    public function trackVisit()
    {
        $data = $this->request->getJSON(true);

        // Get visitor information
        $ipAddress = $this->request->getIPAddress();

        // Check if IP is blocked
        $blockedModel = new \App\Models\BlockedIpModel();
        if ($blockedModel->isBlocked($ipAddress)) {
            return $this->respond([
                'success' => false,
                'message' => 'Access denied'
            ], 403);
        }

        $userAgent = $this->request->getUserAgent()->getAgentString();
        $referrer = $data['referrer'] ?? null;
        $pageUrl = $data['page_url'] ?? null;
        $sessionId = $data['session_id'] ?? null;

        // Generate unique visitor ID (hash of IP + User Agent)
        $visitorId = hash('sha256', $ipAddress . $userAgent);

        // Check if this is a unique visitor
        $logModel = new VisitorLogModel();
        $isUnique = $logModel->isUniqueVisitor($visitorId);

        // Fetch Geolocation data
        $geoData = $this->fetchGeoData($ipAddress);

        // Log the visit
        $logData = [
            'visitor_id' => $visitorId,
            'ip_address' => $ipAddress,
            'city' => $geoData['city'] ?? null,
            'country' => $geoData['country'] ?? null,
            'country_code' => $geoData['countryCode'] ?? null,
            'region' => $geoData['regionName'] ?? null,
            'timezone' => $geoData['timezone'] ?? null,
            'isp' => $geoData['isp'] ?? null,
            'user_agent' => $userAgent,
            'referrer' => $referrer,
            'page_url' => $pageUrl,
            'session_id' => $sessionId,
            'is_unique' => $isUnique,
        ];

        $logModel->logVisit($logData);

        // Update statistics
        $statsModel = new VisitorStatsModel();
        $statsModel->incrementVisits();

        if ($isUnique) {
            $statsModel->incrementUniqueVisitors();
        }

        return $this->respond([
            'success' => true,
            'is_unique' => $isUnique,
            'message' => 'Visit tracked successfully'
        ]);
    }

    /**
     * Fetch geolocation data for an IP
     */
    private function fetchGeoData($ip)
    {
        if ($ip === '127.0.0.1' || $ip === '::1') {
            return [];
        }

        try {
            $client = \Config\Services::curlrequest();
            $response = $client->get("http://ip-api.com/json/{$ip}?fields=status,message,country,countryCode,regionName,city,timezone,isp", [
                'timeout' => 2
            ]);

            if ($response->getStatusCode() === 200) {
                $data = json_decode($response->getBody(), true);
                if ($data['status'] === 'success') {
                    return $data;
                }
            }
        } catch (\Exception $e) {
            log_message('error', 'Geo fetching failed: ' . $e->getMessage());
        }

        return [];
    }

    /**
     * Block an IP address
     * POST /admin/block-ip
     */
    public function blockIP()
    {
        $ip = $this->request->getVar('ip_address');
        $reason = $this->request->getVar('reason') ?? 'Manual block';

        if (!$ip) {
            return $this->fail('IP address is required');
        }

        $blockedModel = new \App\Models\BlockedIpModel();

        if ($blockedModel->isBlocked($ip)) {
            return $this->fail('IP is already blocked');
        }

        $blockedModel->insert([
            'ip_address' => $ip,
            'reason' => $reason,
            'created_at' => date('Y-m-d H:i:s')
        ]);

        return $this->respond([
            'success' => true,
            'message' => "IP {$ip} has been blocked successfully"
        ]);
    }

    /**
     * Get visitor statistics
     * GET /visitor-stats
     */
    public function getStats()
    {
        $statsModel = new VisitorStatsModel();
        $stats = $statsModel->getStats();

        // Get today's stats
        $logModel = new VisitorLogModel();
        $todayStats = $logModel->where('visit_date', date('Y-m-d'))->countAllResults();
        $todayUnique = $logModel->where('visit_date', date('Y-m-d'))
            ->where('is_unique', true)
            ->countAllResults();

        // Get this week's stats
        $weekStart = date('Y-m-d', strtotime('monday this week'));
        $weekStats = $logModel->where('visit_date >=', $weekStart)->countAllResults();

        // Get visitor count offset from settings
        $settingsModel = new \App\Models\SettingsModel();
        $settings = $settingsModel->getSettingsArray();
        $visitorOffset = isset($settings['visitor_count_offset']) ? (int) $settings['visitor_count_offset'] : 0;

        return $this->respond([
            'total_visits' => ($stats['total_visits'] ?? 0) + $visitorOffset,
            'actual_visits' => $stats['total_visits'] ?? 0,
            'visitor_offset' => $visitorOffset,
            'unique_visitors' => $stats['unique_visitors'] ?? 0,
            'today_visits' => $todayStats,
            'today_unique' => $todayUnique,
            'week_visits' => $weekStats,
            'last_updated' => $stats['last_updated'] ?? null,
        ]);
    }

    /**
     * Get visitor logs (admin only)
     * GET /visitor-logs
     */
    public function getLogs()
    {
        $page = $this->request->getGet('page') ?? 1;
        $limit = $this->request->getGet('limit') ?? 50;
        $offset = ($page - 1) * $limit;

        // Get filters from query params
        $filters = [];
        if ($this->request->getGet('start_date')) {
            $filters['start_date'] = $this->request->getGet('start_date');
        }
        if ($this->request->getGet('end_date')) {
            $filters['end_date'] = $this->request->getGet('end_date');
        }
        if ($this->request->getGet('is_unique') !== null) {
            $filters['is_unique'] = $this->request->getGet('is_unique');
        }

        $logModel = new VisitorLogModel();
        $logs = $logModel->getVisitorLogs($limit, $offset, $filters);
        $total = $logModel->getLogsCount($filters);

        return $this->respond([
            'data' => $logs,
            'pagination' => [
                'page' => (int) $page,
                'limit' => (int) $limit,
                'total' => $total,
                'pages' => ceil($total / $limit),
            ],
        ]);
    }

    /**
     * Get daily statistics for charts
     * GET /visitor-daily-stats
     */
    public function getDailyStats()
    {
        $days = $this->request->getGet('days') ?? 30;

        $logModel = new VisitorLogModel();
        $stats = $logModel->getDailyStats($days);

        return $this->respond($stats);
    }
}

<?php

namespace App\Libraries;

use CodeIgniter\I18n\Time;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class SecurityLogger
{
    protected $email;

    public function __construct()
    {
        $this->email = \Config\Services::email();
    }

    public function logIncident(string $type, string $details)
    {
        $request = \Config\Services::request();
        $ipAddress = $request->getIPAddress();
        $timestamp = Time::now()->toDateTimeString();
        $userAgent = $request->getUserAgent()->getAgentString();
        
        $user = $this->getCurrentUser($request);
        $userInfo = $user ? "User: {$user['username']} (ID: {$user['id']})" : "User: Guest";

        $logMessage = sprintf(
            "[%s] Security Incident: %s | %s | IP: %s | User Agent: %s | Details: %s",
            $timestamp,
            $type,
            $userInfo,
            $ipAddress,
            $userAgent,
            $details
        );

        // Log to file
        log_message('critical', $logMessage);

        // Send email
        $this->sendEmail($type, $logMessage);
    }

    protected function getCurrentUser($request)
    {
        $key = getenv('JWT_SECRET') ?: 'urban_bank_secret_key';
        $header = $request->getHeaderLine('Authorization');
        $token = null;

        if (!empty($header)) {
            if (preg_match('/Bearer\s(\S+)/', $header, $matches)) {
                $token = $matches[1];
            }
        }

        if (!$token) {
            return null;
        }

        try {
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
            return [
                'id' => $decoded->uid,
                'username' => $decoded->username,
            ];
        } catch (\Exception $e) {
            return null;
        }
    }

    protected function sendEmail(string $type, string $body)
    {
        $this->email->setFrom('security@urbanbank.com', 'Urban Bank Security');
        $this->email->setTo(['rnagaraju@digitalks.in', 'sivaji@digitalks.in']);
        $this->email->setSubject("[Security Alert] {$type}");
        $this->email->setMessage($body);

        if (!$this->email->send()) {
            log_message('error', 'Failed to send security alert email: ' . $this->email->printDebugger(['headers']));
        }
    }
}

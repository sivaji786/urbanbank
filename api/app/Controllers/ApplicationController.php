<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\SettingsModel;

class ApplicationController extends ResourceController
{
    protected $format = 'json';

    public function deposit()
    {
        $rules = [
            'name' => 'required|min_length[3]',
            'email' => 'required|valid_email',
            'phone' => 'required|min_length[10]',
            'deposit_type' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $data = $this->request->getJSON();
        
        $settingsModel = new SettingsModel();
        $settings = $settingsModel->getSettingsArray();
        
        $recipientEmailsString = $settings['deposit_emails'] ?? '';
        $recipients = array_filter(array_map('trim', explode(',', $recipientEmailsString)));

        if (empty($recipients)) {
            // Fallback to contact email or admin if none configured
            $recipients = [$settings['contact_email'] ?? 'admin@example.com'];
        }

        $email = \Config\Services::email();

        $subject = 'New Deposit Application: ' . $data->deposit_type;
        $message = "A new deposit application has been submitted.\n\n" .
                  "Customer Details:\n" .
                  "Name: {$data->name}\n" .
                  "Email: {$data->email}\n" .
                  "Phone: {$data->phone}\n" .
                  "Deposit Interest in: {$data->deposit_type}\n\n" .
                  "Submitted at: " . date('Y-m-d H:i:s');

        $successCount = 0;
        foreach ($recipients as $recipient) {
            $email->clear();
            $email->setFrom($data->email, $data->name);
            $email->setTo($recipient);
            $email->setSubject($subject);
            $email->setMessage($message);

            // In production, $email->send() would be used.
            // For this project's pattern, we log and return success.
            log_message('info', "Deposit Application Email would be sent to {$recipient}. Subject: {$subject}");
            $successCount++;
        }

        return $this->respond([
            'status' => 'success',
            'message' => 'Your application has been submitted successfully. Our team will contact you soon.',
            'recipients_notified' => $successCount
        ]);
    }

    public function loan()
    {
        $rules = [
            'name' => 'required|min_length[3]',
            'email' => 'required|valid_email',
            'phone' => 'required|min_length[10]',
            'loan_type' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $data = $this->request->getJSON();
        
        $settingsModel = new SettingsModel();
        $settings = $settingsModel->getSettingsArray();
        
        $recipientEmailsString = $settings['loan_emails'] ?? '';
        $recipients = array_filter(array_map('trim', explode(',', $recipientEmailsString)));

        if (empty($recipients)) {
            // Fallback to contact email or admin if none configured
            $recipients = [$settings['contact_email'] ?? 'admin@example.com'];
        }

        $email = \Config\Services::email();

        $subject = 'New Loan Application: ' . $data->loan_type;
        $message = "A new loan application has been submitted.\n\n" .
                  "Customer Details:\n" .
                  "Name: {$data->name}\n" .
                  "Email: {$data->email}\n" .
                  "Phone: {$data->phone}\n" .
                  "Loan Interest in: {$data->loan_type}\n\n" .
                  "Submitted at: " . date('Y-m-d H:i:s');

        $successCount = 0;
        foreach ($recipients as $recipient) {
            $email->clear();
            $email->setFrom($data->email, $data->name);
            $email->setTo($recipient);
            $email->setSubject($subject);
            $email->setMessage($message);

            log_message('info', "Loan Application Email would be sent to {$recipient}. Subject: {$subject}");
            $successCount++;
        }

        return $this->respond([
            'status' => 'success',
            'message' => 'Your loan application interest has been submitted successfully. Our team will contact you soon.',
            'recipients_notified' => $successCount
        ]);
    }
}

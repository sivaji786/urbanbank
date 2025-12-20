<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\SettingsModel;

class ContactController extends ResourceController
{
    protected $format = 'json';

    public function send()
    {
        $rules = [
            'name' => 'required|min_length[3]',
            'email' => 'required|valid_email',
            'subject' => 'required|min_length[3]',
            'message' => 'required|min_length[10]',
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $settingsModel = new SettingsModel();
        $settings = $settingsModel->getSettingsArray();
        $recipientEmail = $settings['contact_email'] ?? 'admin@example.com';

        $data = $this->request->getJSON();

        $email = \Config\Services::email();

        $email->setFrom($data->email, $data->name);
        $email->setTo($recipientEmail);
        $email->setSubject('Contact Form: ' . $data->subject);
        $email->setMessage("Name: {$data->name}\nEmail: {$data->email}\n\nMessage:\n{$data->message}");

        // In a real environment, uncomment this:
        // if ($email->send()) {
        //     return $this->respond(['message' => 'Email sent successfully']);
        // } else {
        //     return $this->fail('Failed to send email');
        // }
        
        // For demo/development without SMTP:
        log_message('info', "Email would be sent to {$recipientEmail} from {$data->email}. Subject: {$data->subject}");
        return $this->respond(['message' => 'Message received. We will get back to you shortly.']);
    }
}

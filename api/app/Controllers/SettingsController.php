<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\SettingsModel;

class SettingsController extends ResourceController
{
    protected $modelName = 'App\Models\SettingsModel';
    protected $format    = 'json';

    public function index()
    {
        $settings = $this->model->getSettingsArray();
        return $this->respond($settings);
    }

    public function update_settings()
    {
        $data = $this->request->getJSON(true);
        
        if (empty($data)) {
            return $this->fail('No data provided');
        }

        foreach ($data as $key => $value) {
            $this->model->setSetting($key, $value);
        }

        return $this->respond(['message' => 'Settings updated successfully']);
    }
}

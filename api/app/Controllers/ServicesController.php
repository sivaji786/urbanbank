<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ServiceModel;

class ServicesController extends ResourceController
{
    protected $modelName = 'App\Models\ServiceModel';
    protected $format = 'json';

    public function index()
    {
        $services = $this->model->orderBy('sort_order', 'ASC')
            ->orderBy('id', 'ASC')
            ->findAll();

        // Decode JSON fields
        foreach ($services as &$service) {
            $service['features'] = json_decode($service['features'] ?? '[]', true);
        }

        return $this->respond($services);
    }

    public function show($id = null)
    {
        $service = $this->model->find($id);
        if (!$service) {
            return $this->failNotFound('Service not found');
        }

        $service['features'] = json_decode($service['features'] ?? '[]', true);

        return $this->respond($service);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        // Encode JSON fields
        if (isset($data['features'])) {
            $data['features'] = json_encode($data['features']);
        }

        if (!$this->model->insert($data)) {
            return $this->fail($this->model->errors());
        }

        $serviceId = $this->model->getInsertID();

        return $this->respondCreated(['id' => $serviceId], 'Service created');
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        // Encode JSON fields
        if (isset($data['features'])) {
            $data['features'] = json_encode($data['features']);
        }

        if (!$this->model->update($id, $data)) {
            return $this->fail($this->model->errors());
        }

        return $this->respond(['id' => $id], 200, 'Service updated');
    }

    public function delete($id = null)
    {
        if (!$this->model->delete($id)) {
            return $this->failNotFound('Service not found');
        }

        return $this->respondDeleted(['id' => $id], 'Service deleted');
    }
}

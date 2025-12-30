<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ServiceChargeModel;

class ServiceChargesController extends ResourceController
{
    protected $modelName = 'App\Models\ServiceChargeModel';
    protected $format = 'json';

    public function index()
    {
        $serviceCharges = $this->model->orderBy('sort_order', 'ASC')
            ->orderBy('id', 'ASC')
            ->findAll();

        return $this->respond($serviceCharges);
    }

    public function show($id = null)
    {
        $serviceCharge = $this->model->find($id);
        if (!$serviceCharge) {
            return $this->failNotFound('Service charge not found');
        }

        return $this->respond($serviceCharge);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        if (!$this->model->insert($data)) {
            return $this->fail($this->model->errors());
        }

        $serviceChargeId = $this->model->getInsertID();

        return $this->respondCreated(['id' => $serviceChargeId], 'Service charge created');
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        if (!$this->model->update($id, $data)) {
            return $this->fail($this->model->errors());
        }

        return $this->respond(['id' => $id], 200, 'Service charge updated');
    }

    public function delete($id = null)
    {
        if (!$this->model->delete($id)) {
            return $this->failNotFound('Service charge not found');
        }

        return $this->respondDeleted(['id' => $id], 'Service charge deleted');
    }
}

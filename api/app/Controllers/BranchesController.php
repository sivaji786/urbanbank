<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class BranchesController extends ResourceController
{
    protected $modelName = 'App\Models\BranchModel';
    protected $format    = 'json';

    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        if ($this->model->save($data)) {
            return $this->respondCreated(['status' => 201, 'message' => 'Branch created successfully', 'id' => $this->model->getInsertID()]);
        }
        
        return $this->failValidationErrors($this->model->errors());
    }

    public function show($id = null)
    {
        $branch = $this->model->find($id);
        if (!$branch) {
            return $this->failNotFound('Branch not found');
        }
        return $this->respond($branch);
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        $data['id'] = $id;

        if ($this->model->save($data)) {
            return $this->respond(['status' => 200, 'message' => 'Branch updated successfully']);
        }

        return $this->failValidationErrors($this->model->errors());
    }

    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['status' => 200, 'message' => 'Branch deleted successfully']);
        }

        return $this->failNotFound('Branch not found or already deleted');
    }
}

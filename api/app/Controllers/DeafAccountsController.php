<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class DeafAccountsController extends ResourceController
{
    protected $modelName = 'App\Models\DeafAccountModel';
    protected $format    = 'json';

    public function index()
    {
        $search = $this->request->getGet('search');
        if ($search) {
            // Search only by name and UDRN (not address)
            $data = $this->model->like('name', $search)
                                ->orLike('udrn', $search)
                                ->findAll();
        } else {
            $data = $this->model->findAll();
        }
        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        if (!$this->model->insert($data)) {
            return $this->fail($this->model->errors());
        }
        return $this->respondCreated($data, 'Account created');
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        if (!$this->model->update($id, $data)) {
            return $this->fail($this->model->errors());
        }
        return $this->respond($data, 200, 'Account updated');
    }

    public function delete($id = null)
    {
        if (!$this->model->delete($id)) {
            return $this->failNotFound('Account not found');
        }
        return $this->respondDeleted(['id' => $id], 'Account deleted');
    }
}

<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class TeamMemberController extends ResourceController
{
    protected $modelName = 'App\Models\TeamMemberModel';
    protected $format    = 'json';

    public function index()
    {
        // Support filtering by category
        $category = $this->request->getGet('category');
        
        if ($category) {
            $data = $this->model->where('category', $category)->orderBy('display_order', 'ASC')->findAll();
        } else {
            $data = $this->model->orderBy('display_order', 'ASC')->findAll();
        }

        return $this->respond($data);
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Team member not found');
        }
        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        if ($this->model->insert($data)) {
            return $this->respondCreated($this->model->find($this->model->getInsertID()));
        }
        return $this->fail($this->model->errors());
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        if ($this->model->update($id, $data)) {
            return $this->respond($this->model->find($id));
        }
        return $this->fail($this->model->errors());
    }

    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['id' => $id]);
        }
        return $this->failNotFound('Team member not found');
    }
}

<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class PageController extends ResourceController
{
    protected $modelName = 'App\Models\PageModel';
    protected $format    = 'json';

    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        // Try to find by ID first
        $data = $this->model->find($id);

        // If not found by ID, try to find by slug
        if (!$data) {
            $data = $this->model->where('slug', $id)->first();
        }

        if (!$data) {
            return $this->failNotFound('Page not found');
        }

        // Decode content JSON if it's a string
        if (isset($data['content']) && is_string($data['content'])) {
            $decoded = json_decode($data['content'], true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $data['content'] = $decoded;
            }
        }

        return $this->respond($data);
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        $data = $this->request->getJSON(true);
        
        // Encode content to JSON string if it's an array
        if (isset($data['content']) && is_array($data['content'])) {
            $data['content'] = json_encode($data['content']);
        }

        if ($this->model->insert($data)) {
            $id = $this->model->getInsertID();
            return $this->respondCreated($this->model->find($id));
        }

        return $this->fail($this->model->errors());
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        $data['id'] = $id;

        // Encode content to JSON string if it's an array
        if (isset($data['content']) && is_array($data['content'])) {
            $data['content'] = json_encode($data['content']);
        }

        // Manually set validation rule to ignore current ID
        $rules = $this->model->getValidationRules();
        if (isset($rules['slug'])) {
            $rules['slug'] = "required|is_unique[pages.slug,id,{$id}]";
        }
        $this->model->setValidationRules($rules);

        if ($this->model->save($data)) {
            return $this->respond($this->model->find($id));
        }

        return $this->fail($this->model->errors());
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['id' => $id]);
        }

        return $this->failNotFound('Page not found');
    }
}

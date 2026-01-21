<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;

class GalleryController extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format.
     *
     * @return ResponseInterface
     */
    protected $modelName = 'App\Models\GalleryModel';
    protected $format    = 'json';

    public function index()
    {
        $galleries = $this->model->orderBy('created_at', 'DESC')->findAll();
        $imageModel = new \App\Models\GalleryImageModel();
        
        foreach ($galleries as &$gallery) {
            $gallery['images'] = $imageModel->where('gallery_id', $gallery['id'])->findAll();
        }
        
        return $this->respond($galleries);
    }

    public function show($id = null)
    {
        $gallery = $this->model->find($id);
        if (!$gallery) {
            return $this->failNotFound('Gallery not found');
        }
        
        $imageModel = new \App\Models\GalleryImageModel();
        $gallery['images'] = $imageModel->where('gallery_id', $id)->findAll();
        
        return $this->respond($gallery);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        $images = $data['images'] ?? [];
        unset($data['images']);

        $db = \Config\Database::connect();
        $db->transStart();

        $galleryId = $this->model->insert($data);
        if (!$galleryId) {
            $db->transRollback();
            return $this->fail($this->model->errors());
        }

        $imageModel = new \App\Models\GalleryImageModel();
        foreach ($images as $imageUrl) {
            $imageModel->insert([
                'gallery_id' => $galleryId,
                'image_url' => $imageUrl
            ]);
        }

        $db->transComplete();

        if ($db->transStatus() === false) {
            return $this->fail('Failed to create gallery');
        }

        return $this->respondCreated(['id' => $galleryId], 'Gallery created');
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        $images = $data['images'] ?? null;
        unset($data['images']);

        $db = \Config\Database::connect();
        $db->transStart();

        if (!$this->model->update($id, $data)) {
            $db->transRollback();
            return $this->fail($this->model->errors());
        }

        if ($images !== null) {
            $imageModel = new \App\Models\GalleryImageModel();
            // Simple approach: delete existing and re-insert
            $imageModel->where('gallery_id', $id)->delete();
            foreach ($images as $imageUrl) {
                $imageModel->insert([
                    'gallery_id' => $id,
                    'image_url' => $imageUrl
                ]);
            }
        }

        $db->transComplete();

        if ($db->transStatus() === false) {
            return $this->fail('Failed to update gallery');
        }

        return $this->respond(['id' => $id], 200, 'Gallery updated');
    }

    public function delete($id = null)
    {
        // gallery_images has ON DELETE CASCADE, so we just delete the gallery
        if (!$this->model->delete($id)) {
            return $this->failNotFound('Gallery not found');
        }
        return $this->respondDeleted(['id' => $id], 'Gallery deleted');
    }


}

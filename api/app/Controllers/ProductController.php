<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ProductModel;
use App\Models\ProductRateModel;

class ProductController extends ResourceController
{
    protected $modelName = 'App\Models\ProductModel';
    protected $format    = 'json';

    public function index()
    {
        $category = $this->request->getGet('category');
        if ($category) {
            $this->model->where('category', $category);
        }
        
        $products = $this->model->findAll();
        
        // Fetch rates for each product
        $rateModel = new ProductRateModel();
        foreach ($products as &$product) {
            // Decode JSON fields
            $product['features'] = json_decode($product['features'] ?? '[]', true);
            $product['rate_headers'] = json_decode($product['rate_headers'] ?? '[]', true);
            
            $product['rates'] = $rateModel->where('product_id', $product['id'])
                                          ->orderBy('sort_order', 'ASC')
                                          ->findAll();
            
            foreach ($product['rates'] as &$rate) {
                $rate['row_data'] = json_decode($rate['row_data'] ?? '[]', true);
            }
        }

        return $this->respond($products);
    }

    public function show($id = null)
    {
        $product = $this->model->find($id);
        if (!$product) {
            return $this->failNotFound('Product not found');
        }

        $product['features'] = json_decode($product['features'] ?? '[]', true);
        $product['rate_headers'] = json_decode($product['rate_headers'] ?? '[]', true);

        $rateModel = new ProductRateModel();
        $product['rates'] = $rateModel->where('product_id', $id)
                                      ->orderBy('sort_order', 'ASC')
                                      ->findAll();

        foreach ($product['rates'] as &$rate) {
            $rate['row_data'] = json_decode($rate['row_data'] ?? '[]', true);
        }

        return $this->respond($product);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        
        // Extract rates if present
        $rates = $data['rates'] ?? [];
        unset($data['rates']);

        // Encode JSON fields
        if (isset($data['features'])) {
            $data['features'] = json_encode($data['features']);
        }
        if (isset($data['rate_headers'])) {
            $data['rate_headers'] = json_encode($data['rate_headers']);
        }

        if (!$this->model->insert($data)) {
            return $this->fail($this->model->errors());
        }

        $productId = $this->model->getInsertID();

        // Save rates
        $rateModel = new ProductRateModel();
        foreach ($rates as $index => $rateData) {
            $rateModel->insert([
                'product_id' => $productId,
                'row_data'   => json_encode($rateData['row_data'] ?? []),
                'sort_order' => $rateData['sort_order'] ?? $index
            ]);
        }

        return $this->respondCreated(['id' => $productId], 'Product created');
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        
        $rates = $data['rates'] ?? null;
        unset($data['rates']);

        // Encode JSON fields
        if (isset($data['features'])) {
            $data['features'] = json_encode($data['features']);
        }
        if (isset($data['rate_headers'])) {
            $data['rate_headers'] = json_encode($data['rate_headers']);
        }

        if (!$this->model->update($id, $data)) {
            return $this->fail($this->model->errors());
        }

        // Update rates if provided
        if ($rates !== null) {
            $rateModel = new ProductRateModel();
            
            // Simplest way: delete existing and re-insert
            $rateModel->where('product_id', $id)->delete();
            
            foreach ($rates as $index => $rateData) {
                $rateModel->insert([
                    'product_id' => $id,
                    'row_data'   => json_encode($rateData['row_data'] ?? []),
                    'sort_order' => $rateData['sort_order'] ?? $index
                ]);
            }
        }

        return $this->respond(['id' => $id], 200, 'Product updated');
    }

    public function delete($id = null)
    {
        if (!$this->model->delete($id)) {
            return $this->failNotFound('Product not found');
        }
        
        // Rates will be deleted by CASCADE foreign key
        return $this->respondDeleted(['id' => $id], 'Product deleted');
    }
}

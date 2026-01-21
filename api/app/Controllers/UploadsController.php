<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class UploadsController extends ResourceController
{
    public function index()
    {
        $path = $this->request->getGet('path') ?? '';
        
        // Prevent directory traversal
        if (strpos($path, '..') !== false) {
            return $this->failForbidden('Invalid path');
        }

        $basePath = FCPATH . 'uploads';
        
        // Ensure root uploads exists
        if (!is_dir($basePath)) {
            mkdir($basePath, 0777, true);
        }

        $targetPath = $basePath;
        if (!empty($path)) {
            $targetPath .= DIRECTORY_SEPARATOR . $path;
        }
        
        $targetPath = rtrim($targetPath, DIRECTORY_SEPARATOR);

        if (!is_dir($targetPath)) {
            return $this->respond([]);
        }

        $files = scandir($targetPath);
        $result = [];
        $baseUrl = rtrim(base_url('uploads'), '/');

        foreach ($files as $file) {
            if ($file === '.' || $file === '..') {
                continue;
            }

            $filePath = $targetPath . DIRECTORY_SEPARATOR . $file;
            $isDir = is_dir($filePath);
            
            // Calculate relative path
            $relativePath = $path ? $path . '/' . $file : $file;
            
            $result[] = [
                'name' => $file,
                'type' => $isDir ? 'directory' : 'file',
                'path' => $relativePath,
                'url' => $isDir ? null : $baseUrl . '/' . ltrim($relativePath, '/'),
            ];
        }

        return $this->respond($result);
    }

    public function upload()
    {
        $path = $this->request->getPost('path') ?? '';

        if (strpos($path, '..') !== false) {
            return $this->failForbidden('Invalid path');
        }

        $basePath = FCPATH . 'uploads';
        $targetPath = $basePath;
        if (!empty($path)) {
            $targetPath .= DIRECTORY_SEPARATOR . $path;
        }
        $targetPath = rtrim($targetPath, DIRECTORY_SEPARATOR);

        if (!is_dir($targetPath)) {
            mkdir($targetPath, 0777, true);
        }

        $file = $this->request->getFile('file');
        if (!$file->isValid()) {
            return $this->fail($file->getErrorString());
        }

        $newName = $file->getRandomName();
        $file->move($targetPath, $newName);

        $relativePath = $path ? $path . '/' . $newName : $newName;
        $baseUrl = rtrim(base_url('uploads'), '/');

        return $this->respond([
            'name' => $newName,
            'type' => 'file',
            'path' => $relativePath,
            'url' => $baseUrl . '/' . ltrim($relativePath, '/'),
        ]);
    }

    public function createFolder()
    {
        $input = $this->request->getJSON(true);
        $path = $input['path'] ?? $this->request->getPost('path') ?? '';
        $folderName = $input['name'] ?? $this->request->getPost('name');

        if (empty($folderName)) {
            return $this->fail('Folder name is required');
        }

        if (strpos($path, '..') !== false || strpos($folderName, '..') !== false) {
            return $this->failForbidden('Invalid path');
        }

        $basePath = FCPATH . 'uploads';
        $targetPath = $basePath;
        if (!empty($path)) {
            $targetPath .= DIRECTORY_SEPARATOR . $path;
        }
        $targetPath = rtrim($targetPath, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $folderName;

        if (is_dir($targetPath)) {
            return $this->fail('Folder already exists');
        }

        if (!mkdir($targetPath, 0777, true)) {
            return $this->failServerError('Failed to create folder');
        }

        return $this->respondCreated(['message' => 'Folder created successfully']);
    }

    public function uploadDocument()
    {
        $file = $this->request->getFile('file');
        if (!$file->isValid()) {
            return $this->fail($file->getErrorString());
        }

        $newName = $file->getRandomName();
        $targetPath = FCPATH . 'uploads/documents';

        if (!is_dir($targetPath)) {
            mkdir($targetPath, 0777, true);
        }

        $file->move($targetPath, $newName);

        return $this->respond([
            'name' => $newName,
            'type' => 'file',
            'path' => 'documents/' . $newName,
            'url'  => rtrim(base_url('uploads/documents'), '/') . '/' . $newName,
        ]);
    }
}

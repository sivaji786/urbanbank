<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class UploadsController extends ResourceController
{
    public function index()
    {
        $path = $this->request->getGet('path') ?? '';
        
        // Prevent directory traversal and invalid characters
        if (preg_match('/[^a-zA-Z0-9\/_\-]/', $path) || strpos($path, '..') !== false) {
            $logger = new \App\Libraries\SecurityLogger();
            $logger->logIncident('Path Traversal Attempt', "Invalid path accessed: {$path}");
            return $this->failForbidden('Invalid path');
        }

        $basePath = FCPATH . 'uploads';
        $targetPath = rtrim($basePath . '/' . $path, '/');

        if (!is_dir($targetPath)) {
            return $this->failNotFound('Directory not found');
        }

        $files = scandir($targetPath);
        $result = [];
        $baseUrl = base_url('uploads');

        foreach ($files as $file) {
            if ($file === '.' || $file === '..') {
                continue;
            }

            $filePath = $targetPath . '/' . $file;
            $isDir = is_dir($filePath);
            
            // Calculate relative path for the URL
            $relativePath = $path ? $path . '/' . $file : $file;
            
            $result[] = [
                'name' => $file,
                'type' => $isDir ? 'directory' : 'file',
                'path' => $relativePath,
                'url' => $isDir ? null : $baseUrl . '/' . $relativePath,
            ];
        }

        return $this->respond($result);
    }
    public function upload()
    {
        $path = $this->request->getPost('path') ?? '';

        // Prevent directory traversal and invalid characters
        if (preg_match('/[^a-zA-Z0-9\/_\-]/', $path) || strpos($path, '..') !== false) {
            $logger = new \App\Libraries\SecurityLogger();
            $logger->logIncident('Path Traversal Attempt', "Invalid upload path: {$path}");
            return $this->failForbidden('Invalid path');
        }

        $basePath = FCPATH . 'uploads';
        $targetPath = rtrim($basePath . '/' . $path, '/');

        if (!is_dir($targetPath)) {
            // Create directory if it doesn't exist
            if (!mkdir($targetPath, 0777, true)) {
                return $this->failServerError('Failed to create directory');
            }
        }

        $validationRule = [
            'file' => [
                'label' => 'Image File',
                'rules' => [
                    'uploaded[file]',
                    'is_image[file]',
                    'mime_in[file,image/jpg,image/jpeg,image/gif,image/png,image/webp]',
                    'max_size[file,2048]', // 2MB
                ],
            ],
        ];

        if (!$this->validate($validationRule)) {
            $logger = new \App\Libraries\SecurityLogger();
            $errors = implode(', ', $this->validator->getErrors());
            $logger->logIncident('Invalid File Upload', "Validation failed: {$errors}");
            return $this->fail($this->validator->getErrors());
        }

        $file = $this->request->getFile('file');

        if (!$file->isValid()) {
            return $this->fail($file->getErrorString());
        }

        // Sanitize filename
        $originalName = $file->getName();
        $safeName = preg_replace('/[^a-zA-Z0-9\._-]/', '', $originalName);
        $newName = $file->getRandomName(); // Still use random name for storage to be safe, but we could use safeName if needed. 
        // Let's stick to random name for storage security, but we've validated the content.

        $file->move($targetPath, $newName);

        $relativePath = $path ? $path . '/' . $newName : $newName;
        $baseUrl = base_url('uploads');

        return $this->respond([
            'name' => $newName,
            'type' => 'file',
            'path' => $relativePath,
            'url' => $baseUrl . '/' . $relativePath,
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

        // Validate folder name (alphanumeric, dashes, underscores only)
        if (!preg_match('/^[a-zA-Z0-9_\-]+$/', $folderName)) {
            return $this->fail('Invalid folder name');
        }

        // Prevent directory traversal in path
        if (preg_match('/[^a-zA-Z0-9\/_\-]/', $path) || strpos($path, '..') !== false) {
            $logger = new \App\Libraries\SecurityLogger();
            $logger->logIncident('Path Traversal Attempt', "Invalid path for folder creation: {$path}");
            return $this->failForbidden('Invalid path');
        }

        $basePath = FCPATH . 'uploads';
        $targetPath = rtrim($basePath . '/' . $path, '/') . '/' . $folderName;

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
        $validationRule = [
            'file' => [
                'label' => 'Document File',
                'rules' => [
                    'uploaded[file]',
                    'ext_in[file,pdf,doc,docx,xls,xlsx,ppt,pptx,zip,txt]',
                    'max_size[file,10240]', // 10MB
                ],
            ],
        ];

        if (!$this->validate($validationRule)) {
            $logger = new \App\Libraries\SecurityLogger();
            $errors = implode(', ', $this->validator->getErrors());
            $logger->logIncident('Invalid Document Upload', "Validation failed: {$errors}");
            return $this->fail($this->validator->getErrors());
        }

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
            'url'  => base_url('uploads/documents/' . $newName),
        ]);
    }
}

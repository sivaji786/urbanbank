<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController extends BaseController
{
    use ResponseTrait;

    public function login()
    {
        $userModel = new UserModel();
        $username = $this->request->getVar('username');
        $password = $this->request->getVar('password');

        $user = $userModel->where('username', $username)->first();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            return $this->failUnauthorized('Invalid username or password');
        }

        $key = getenv('JWT_SECRET') ?: 'urban_bank_secret_key';
        $payload = [
            'iat' => time(),
            'exp' => time() + 3600, // 1 hour
            'uid' => $user['id'],
            'username' => $user['username'],
        ];

        $token = JWT::encode($payload, $key, 'HS256');

        return $this->respond([
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'full_name' => $user['full_name'],
                'email' => $user['email'],
            ]
        ]);
    }

    public function me()
    {
        $key = getenv('JWT_SECRET') ?: 'urban_bank_secret_key';
        $header = $this->request->getHeaderLine('Authorization');
        $token = null;

        if (!empty($header)) {
            if (preg_match('/Bearer\s(\S+)/', $header, $matches)) {
                $token = $matches[1];
            }
        }

        if (!$token) {
            return $this->failUnauthorized('Token required');
        }

        try {
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
            $userModel = new UserModel();
            $user = $userModel->find($decoded->uid);

            if (!$user) {
                return $this->failUnauthorized('User not found');
            }

            return $this->respond([
                'id' => $user['id'],
                'username' => $user['username'],
                'full_name' => $user['full_name'],
                'email' => $user['email'],
            ]);
        } catch (\Exception $e) {
            return $this->failUnauthorized('Invalid token');
        }
    }

    public function updateProfile()
    {
        $key = getenv('JWT_SECRET') ?: 'urban_bank_secret_key';
        $header = $this->request->getHeaderLine('Authorization');
        $token = null;

        if (!empty($header)) {
            if (preg_match('/Bearer\s(\S+)/', $header, $matches)) {
                $token = $matches[1];
            }
        }

        if (!$token) {
            return $this->failUnauthorized('Token required');
        }

        try {
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
            $userModel = new UserModel();
            
            $data = $this->request->getJSON(true);
            $userId = $decoded->uid;

            $updateData = [];
            if (isset($data['username'])) $updateData['username'] = $data['username'];
            if (isset($data['full_name'])) $updateData['full_name'] = $data['full_name'];
            if (isset($data['email'])) $updateData['email'] = $data['email'];

            if (empty($updateData)) {
                return $this->fail('No data provided for update');
            }

            if ($userModel->update($userId, $updateData)) {
                $user = $userModel->find($userId);
                unset($user['password_hash']);
                return $this->respond([
                    'status' => 'success',
                    'message' => 'Profile updated successfully',
                    'user' => $user
                ]);
            }

            return $this->fail('Failed to update profile');
        } catch (\Exception $e) {
            return $this->failUnauthorized('Invalid token');
        }
    }

    public function changePassword()
    {
        $key = getenv('JWT_SECRET') ?: 'urban_bank_secret_key';
        $header = $this->request->getHeaderLine('Authorization');
        $token = null;

        if (!empty($header)) {
            if (preg_match('/Bearer\s(\S+)/', $header, $matches)) {
                $token = $matches[1];
            }
        }

        if (!$token) {
            return $this->failUnauthorized('Token required');
        }

        try {
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
            $userModel = new UserModel();
            
            $data = $this->request->getJSON(true);
            $userId = $decoded->uid;

            $oldPassword = $data['old_password'] ?? '';
            $newPassword = $data['new_password'] ?? '';

            if (empty($oldPassword) || empty($newPassword)) {
                return $this->fail('Old and new passwords are required');
            }

            $user = $userModel->find($userId);
            if (!$user || !password_verify($oldPassword, $user['password_hash'])) {
                return $this->failUnauthorized('Invalid old password');
            }

            if ($userModel->update($userId, ['password_hash' => password_hash($newPassword, PASSWORD_DEFAULT)])) {
                return $this->respond([
                    'status' => 'success',
                    'message' => 'Password changed successfully'
                ]);
            }

            return $this->fail('Failed to change password');
        } catch (\Exception $e) {
            return $this->failUnauthorized('Invalid token');
        }
    }
}

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
            return $this->respond([
                'id' => $decoded->uid,
                'username' => $decoded->username,
            ]);
        } catch (\Exception $e) {
            return $this->failUnauthorized('Invalid token');
        }
    }
}

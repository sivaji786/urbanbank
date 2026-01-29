<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use Config\Services;

class DatabaseController extends ResourceController
{
    public function migrate()
    {
        $secret = $this->request->getHeaderLine('X-Migration-Secret');
        if (empty($secret)) {
            $secret = $this->request->getGet('secret');
        }

        $expectedSecret = env('MIGRATION_SECRET') ?: 'urban-bank-migration-secret-2026';

        if ($secret !== $expectedSecret) {
            return $this->failUnauthorized('Invalid migration secret. Use X-Migration-Secret header or ?secret= query parameter.');
        }

        $migrate = Services::migrations();
        $runSeed = $this->request->getGet('seed') === 'true';

        try {
            $migrationResult = $migrate->latest();
            $seederResult = '';

            if ($runSeed) {
                $seeder = \Config\Database::seeder();
                $seeder->call('PageSyncSeeder');
                $seederResult = ' and PageSyncSeeder executed';
            }

            if ($migrationResult) {
                return $this->respond([
                    'status' => 'success',
                    'message' => 'Migrations completed successfully' . $seederResult . '.',
                ]);
            } else {
                return $this->respond([
                    'status' => 'info',
                    'message' => 'Database migrations are already up to date' . $seederResult . '.',
                ]);
            }
        } catch (\Throwable $e) {
            return $this->failServerError('Operation failed: ' . $e->getMessage());
        }
    }

    public function seed()
    {
        $secret = $this->request->getHeaderLine('X-Migration-Secret');
        if (empty($secret)) {
            $secret = $this->request->getGet('secret');
        }

        $expectedSecret = env('MIGRATION_SECRET') ?: 'urban-bank-migration-secret-2026';

        if ($secret !== $expectedSecret) {
            return $this->failUnauthorized('Invalid migration secret.');
        }

        $seederName = $this->request->getGet('name') ?: 'PageSyncSeeder';

        try {
            $seeder = \Config\Database::seeder();
            $seeder->call($seederName);
            return $this->respond([
                'status' => 'success',
                'message' => "Seeder {$seederName} executed successfully.",
            ]);
        } catch (\Throwable $e) {
            return $this->failServerError('Seeding failed: ' . $e->getMessage());
        }
    }
}

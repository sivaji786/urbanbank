<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class ServiceChargeSeeder extends Seeder
{
    public function run()
    {
        $data = [
            ['service' => 'Cheque Book (10 leaves)', 'charge' => 'Free', 'status' => 'active', 'sort_order' => 1],
            ['service' => 'Cheque Book (25 leaves)', 'charge' => '₹50 + GST', 'status' => 'active', 'sort_order' => 2],
            ['service' => 'Account Statement (Email)', 'charge' => 'Free', 'status' => 'active', 'sort_order' => 3],
            ['service' => 'Account Statement (Physical)', 'charge' => '₹20 + GST', 'status' => 'active', 'sort_order' => 4],
            ['service' => 'Duplicate Passbook', 'charge' => '₹50 + GST', 'status' => 'active', 'sort_order' => 5],
            ['service' => 'Cheque Return Charges', 'charge' => '₹300 + GST', 'status' => 'active', 'sort_order' => 6],
            ['service' => 'Stop Payment Request', 'charge' => '₹100 + GST', 'status' => 'active', 'sort_order' => 7],
            ['service' => 'Balance Enquiry (SMS)', 'charge' => 'Free', 'status' => 'active', 'sort_order' => 8],
            ['service' => 'NACH / ECS Mandate', 'charge' => '₹100 + GST', 'status' => 'active', 'sort_order' => 9],
            ['service' => 'Account Closure', 'charge' => '₹500 + GST', 'status' => 'active', 'sort_order' => 10],
        ];

        $this->db->table('service_charges')->insertBatch($data);
    }
}

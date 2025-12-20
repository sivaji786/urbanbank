<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run()
    {
        // News
        $newsData = [
            [
                'title'   => 'Urban Bank Launches New Mobile App',
                'content' => 'We are excited to announce the launch of our new mobile banking application, featuring enhanced security and a user-friendly interface.',
                'date'    => date('Y-m-d'),
                'created_at' => date('Y-m-d H:i:s'),
            ],
            [
                'title'   => 'Quarterly Financial Results Announced',
                'content' => 'Urban Bank has posted a record profit for the last quarter, demonstrating strong growth and stability.',
                'date'    => date('Y-m-d', strtotime('-1 week')),
                'created_at' => date('Y-m-d H:i:s'),
            ],
        ];
        $this->db->table('news')->insertBatch($newsData);

        // Events
        $eventsData = [
            [
                'title'       => 'Annual General Meeting',
                'description' => 'Join us for our AGM to discuss the bank\'s performance and future plans.',
                'date'        => date('Y-m-d', strtotime('+1 month')),
                'location'    => 'Main Branch Conference Hall',
                'created_at'  => date('Y-m-d H:i:s'),
            ],
            [
                'title'       => 'Financial Literacy Workshop',
                'description' => 'A free workshop to help you manage your finances better.',
                'date'        => date('Y-m-d', strtotime('+2 weeks')),
                'location'    => 'Community Center',
                'created_at'  => date('Y-m-d H:i:s'),
            ],
        ];
        $this->db->table('events')->insertBatch($eventsData);

        // Gallery
        $galleryData = [
            [
                'title'     => 'Branch Opening',
                'image_url' => 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=600&fit=crop',
                'category'  => 'Events',
                'created_at' => date('Y-m-d H:i:s'),
            ],
            [
                'title'     => 'Staff Training',
                'image_url' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
                'category'  => 'Training',
                'created_at' => date('Y-m-d H:i:s'),
            ],
        ];
        $this->db->table('gallery_images')->insertBatch($galleryData);

        // Downloads
        $downloadsData = [
            [
                'title'    => 'Account Opening Form',
                'file_url' => '#',
                'category' => 'Forms & Applications',
                'created_at' => date('Y-m-d H:i:s'),
            ],
            [
                'title'    => 'Loan Application',
                'file_url' => '#',
                'category' => 'Forms & Applications',
                'created_at' => date('Y-m-d H:i:s'),
            ],
            [
                'title'    => 'Interest Rates 2024',
                'file_url' => '#',
                'category' => 'Interest Rates & Charges',
                'created_at' => date('Y-m-d H:i:s'),
            ],
        ];
        $this->db->table('downloads')->insertBatch($downloadsData);

        // Financial Reports
        $reportsData = [
            [
                'title'       => 'Annual Report 2023-24',
                'file_url'    => '#',
                'fiscal_year' => '2023-24',
                'type'        => 'Annual Report',
                'created_at'  => date('Y-m-d H:i:s'),
            ],
            [
                'title'       => 'Balance Sheet 2023-24',
                'file_url'    => '#',
                'fiscal_year' => '2023-24',
                'type'        => 'Balance Sheet',
                'created_at'  => date('Y-m-d H:i:s'),
            ],
            [
                'title'       => 'Annual Report 2022-23',
                'file_url'    => '#',
                'fiscal_year' => '2022-23',
                'type'        => 'Annual Report',
                'created_at'  => date('Y-m-d H:i:s'),
            ],
        ];
        $this->db->table('financial_reports')->insertBatch($reportsData);
    }
}

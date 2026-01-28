<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class PageSyncSeeder extends Seeder
{
    public function run()
    {
        $pages = [
            [
                'slug' => 'services',
                'title' => 'Our Services',
                'content' => json_encode([
                    'hero_title' => 'Our Banking Services',
                    'hero_description' => 'Experience comprehensive banking services designed for convenience, security, and efficiency. From digital payments to secure lockers, we\'ve got you covered.'
                ])
            ],
            [
                'slug' => 'contact',
                'title' => 'Contact Us',
                'content' => json_encode([
                    'hero_title' => 'Contact Us',
                    'hero_description' => 'Get in touch with us. We\'re here to help and answer any questions you might have.',
                    'form_title' => 'Send us a Message',
                    'form_subtitle' => 'Fill out the form below and we\'ll get back to you as soon as possible.'
                ])
            ],
            [
                'slug' => 'gallery',
                'title' => 'Gallery',
                'content' => json_encode([
                    'hero_title' => 'Our Gallery',
                    'hero_description' => 'A visual journey through our bank\'s events, community initiatives, and milestones.'
                ])
            ],
            [
                'slug' => 'downloads',
                'title' => 'Downloads',
                'content' => json_encode([
                    'hero_title' => 'Downloads & Forms',
                    'hero_description' => 'Access and download various application forms, documents, and useful resources.'
                ])
            ],
            [
                'slug' => 'branch-locator',
                'title' => 'Branch Locator',
                'content' => json_encode([
                    'hero_title' => 'Our Branches',
                    'hero_description' => 'Find the nearest Guntur Co-operative Urban Bank branch to serve your banking needs.'
                ])
            ],
            [
                'slug' => 'financial-reports',
                'title' => 'Financial & Annual Reports',
                'content' => json_encode([
                    'hero_title' => 'Financial & Annual Reports',
                    'hero_description' => 'Transparency and accountability are at the core of our operations. View our financial performance and growth over the years.'
                ])
            ]
        ];

        foreach ($pages as $page) {
            $exists = $this->db->table('pages')->where('slug', $page['slug'])->countAllResults();
            if ($exists === 0) {
                $page['created_at'] = date('Y-m-d H:i:s');
                $page['updated_at'] = date('Y-m-d H:i:s');
                $this->db->table('pages')->insert($page);
            }
        }
    }
}

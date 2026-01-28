<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'slug' => 'about-us',
                'title' => 'About Us',
                'content' => json_encode([
                    'hero' => [
                        'title' => 'About Us',
                        'subtitle' => 'A Legacy of Trust Since 1947 • Serving Andhra Pradesh with Excellence'
                    ],
                    'intro' => [
                        'badge' => 'Premiere Cooperative Bank',
                        'title' => 'The Guntur Cooperative Urban Bank Limited',
                        'content' => 'THE GUNTUR COOPERATIVE URBAN BANK LIMITED, is premiere Co operative bank in state of Andhra Pradesh. It is having 13 branches. 5 Branches in Guntur city (Brodipet, Kothapet, Pattabhi puram, Chandramouli nagar, R.Agraharam), 6 branches in other towns in Guntur District (Sattenapalli, Chilakaluripet, Ponnur, Tenali, Narasaraopet, Mangalagiri), 1 in Krishna district (Gollapudi) & 1 in Prakasam District (Ongole), but a premiere co-operative bank and has initiated certain pioneering schemes for the co-operative banking sector in A.P.',
                        'stats' => [
                            ['label' => 'Branches', 'value' => '13'],
                            ['label' => 'Business', 'value' => '₹606Cr'],
                            ['label' => 'Years Legacy', 'value' => '75+']
                        ],
                        'established_year' => '1947'
                    ],
                    'journey' => [
                        [
                            'year' => '1947',
                            'title' => 'The Beginning',
                            'description' => 'The bank had its origin in the year 1947. Started as Cooperative Society in the name of "Produce Consumers Co-operative Society".'
                        ],
                        [
                            'year' => '1949',
                            'title' => 'Converted to Urban Bank',
                            'description' => 'The Co-operative Society was registered under Madras Co-operative Societies Act, 1932 and converted as Urban Bank in 1949. It started with one branch at Brodipet in 1949. Bank\'s Head Office is located at its own premises at Door No. 3/2, Brodipet, Guntur.'
                        ],
                        [
                            'year' => '1998',
                            'title' => 'New Act Implementation',
                            'description' => 'Bank started functioning under AP Mutually Aided Co-operative Societies Act 1995 since 6th November 1998.'
                        ],
                        [
                            'year' => '1999 - 2017',
                            'title' => 'Expansion in Guntur District',
                            'description' => 'Bank expanded its operations by opening branches in Guntur district and the number of branches increased to 11; i.e., 5 branches in Guntur City at Brodipet, Pattabhipuram, Kothapet, Chandramouli Nagar and R.Agraharam. 6 branches are opened in different towns in Guntur i.e., Sattenapalli, Chilakaluripet, Ponnur, Tenali, Mangalagiri and Narasaraopet.'
                        ],
                        [
                            'year' => '2018',
                            'title' => 'Multi-District Presence',
                            'description' => 'Bank expanded its operations to neighbouring Districts by opening branches at Ongole in Prakasam District and Gollapudi Near Vijayawada in Krishna District by increasing the number of branches to 13.'
                        ],
                        [
                            'year' => 'March 2020',
                            'title' => 'Business Milestone',
                            'description' => 'Present business levels of the bank as on 31st March 2020 is approximately Rs. 606 crores.'
                        ]
                    ],
                    'innovation' => [
                        'title' => 'Embracing Modern Banking',
                        'description' => 'We continuously invest in technology to provide you with the best banking experience',
                        'cards' => [
                            [
                                'title' => 'Core Banking System (CBS)',
                                'description' => 'Bank implemented core banking operations (CBS) software to enable the customers to transact from any of the branches of the bank, ensuring seamless and convenient banking experience.'
                            ],
                            [
                                'title' => 'Future Digital Services',
                                'description' => 'Bank is planning to introduce Mobile Banking and ATM banking in the near future, bringing modern digital banking solutions to our valued customers.'
                            ]
                        ]
                    ],
                    'coverage' => [
                        'title' => 'Serving Across Multiple Districts',
                        'cards' => [
                            [
                                'title' => 'Guntur District',
                                'count' => '11 Branches',
                                'details' => "• Brodipet, Pattabhipuram\n• Kothapet, Chandramouli Nagar\n• R.Agraharam, Sattenapalli\n• Chilakaluripet, Ponnur\n• Tenali, Mangalagiri, Narasaraopet"
                            ],
                            [
                                'title' => 'Krishna District',
                                'count' => '1 Branch',
                                'details' => "• Gollapudi (Near Vijayawada)"
                            ],
                            [
                                'title' => 'Prakasam District',
                                'count' => '1 Branch',
                                'details' => "• Ongole"
                            ]
                        ]
                    ]
                ])
            ],
            [
                'slug' => 'vision-mission',
                'title' => 'Vision, Mission & Values',
                'content' => json_encode([
                    'hero' => [
                        'title' => 'Vision, Mission & Values',
                        'subtitle' => 'Building a progressive banking institution grounded in cooperative values, operational excellence, and unwavering commitment to our customers'
                    ],
                    'vision' => [
                        'badge' => 'Our Future Direction',
                        'quote' => '"To be a progressive bank with all values of co-operation."',
                        'description' => 'We envision ourselves as a forward-thinking financial institution that embraces innovation while staying rooted in cooperative principles. Our commitment is to grow progressively, serving our community with integrity and fostering sustainable economic development for generations to come.'
                    ],
                    'mission' => [
                        'badge' => 'Our Purpose',
                        'quote' => '"To deliver operational excellence through innovation, Quality, Commitment and customer service."',
                        'pillars' => [
                            ['title' => 'Innovation', 'description' => 'Embracing modern banking solutions and technology'],
                            ['title' => 'Quality', 'description' => 'Delivering excellence in every service we provide'],
                            ['title' => 'Commitment', 'description' => 'Dedicated to our customers\' success and growth'],
                            ['title' => 'Customer Service', 'description' => 'Providing exceptional support at every touchpoint']
                        ]
                    ],
                    'values' => [
                        'title' => 'Our Core Values',
                        'description' => 'The fundamental principles that guide our actions, shape our culture, and define our relationship with customers and stakeholders',
                        'items' => [
                            [
                                'title' => 'Integrity & Professionalism',
                                'description' => 'We uphold the highest standards of integrity and professionalism in all our dealings, ensuring trust and transparency with our stakeholders.'
                            ],
                            [
                                'title' => 'Simplicity',
                                'description' => 'We believe in keeping banking simple and accessible, removing complexity to deliver straightforward solutions that meet our customers\' needs.'
                            ],
                            [
                                'title' => 'Team Spirit',
                                'description' => 'We foster a collaborative environment where teamwork and mutual respect drive our success and enable us to serve our customers better.'
                            ]
                        ]
                    ],
                    'commitment' => [
                        'title' => 'Our Commitment to Excellence',
                        'description' => 'At Guntur Co-operative Urban Bank, our vision, mission, and values are not just words on a page – they are the foundation of every decision we make and every service we provide. Together with our community, we build a stronger financial future.',
                        'stats' => [
                            ['label' => 'Serving the Community', 'value' => '60+ Years'],
                            ['label' => 'Total Business', 'value' => '₹606 Cr'],
                            ['label' => 'Across Andhra Pradesh', 'value' => '13 Branches']
                        ]
                    ]
                ])
            ],
            [
                'slug' => 'management',
                'title' => 'Management',
                'content' => json_encode([
                    'hero' => [
                        'title' => 'Our Leadership',
                        'subtitle' => 'Meet the experienced professionals who guide The Guntur Co-operative Urban Bank Ltd towards excellence and sustainable growth'
                    ],
                    'directors_title' => 'Board of Directors',
                    'executives_title' => 'Co-Opted Directors & Executive Leadership',
                    'chairman_role' => 'Chairman',
                    'vice_chairman_role' => 'Vice - Chairman'
                ])
            ],
            [
                'slug' => 'bank-objective',
                'title' => 'Bank Objectives',
                'content' => json_encode([
                    'hero' => [
                        'title' => 'Our Objectives',
                        'subtitle' => 'Established with a core mission to provide reliable and secure banking solutions for the community of Guntur.'
                    ],
                    'objectives' => [
                        ['title' => 'Financial Inclusion', 'description' => 'Providing simplified and accessible banking services to reach all sections of society, fostering economic growth.'],
                        ['title' => 'Customer Centricity', 'description' => 'Setting new standards in customer service through personalized attention mixed with modern direct banking.'],
                        ['title' => 'Community Empowerment', 'description' => 'Supporting local businesses and self-employed individuals with robust credit facilities.'],
                        ['title' => 'Operational Integrity', 'description' => 'Maintaining total transparency and highest security protocols in every transaction and operation.'],
                        ['title' => 'Cooperative Heritage', 'description' => 'Preserving the values of mutual help and togetherness that define the cooperative spirit.'],
                        ['title' => 'Modern Innovation', 'description' => 'Continuously upgrading our technology infrastructure to offer competitive digital banking solutions.']
                    ]
                ])
            ]
        ];

        // Using Query Builder
        foreach ($data as $page) {
            $exists = $this->db->table('pages')->where('slug', $page['slug'])->countAllResults();
            if ($exists > 0) {
                $this->db->table('pages')->where('slug', $page['slug'])->update(['content' => $page['content']]);
            } else {
                $this->db->table('pages')->insert($page);
            }
        }
    }
}

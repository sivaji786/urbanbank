<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class BranchSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'name' => 'Head Office',
                'address' => 'D.NO.5-25-26, 3/2 BRODIPET GUNTUR - 522002',
                'phone' => '8008499030',
                'email' => 'gcubltd@guntururbanbank.org',
                'ifsc' => 'YESB0GCUBI',
                'micr' => '520649002',
                'fax' => '08662435462',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Guntur',
                'is_headquarter' => true
            ],
            [
                'name' => 'Main Branch',
                'address' => 'D.NO.5-25-26, 3/2 BRODIPET GUNTUR - 522002',
                'phone' => '8008499323',
                'email' => 'gcubbpt@guntururbanbank.org',
                'ifsc' => 'YESB0GCUBI',
                'micr' => '520649002',
                'fax' => '08662435462',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Guntur',
                'is_headquarter' => true
            ],
            [
                'name' => 'Pattabhipuram Branch',
                'address' => 'B1/58/1 NEAR SATYANNARAYANA SWAMY TEMPLE, PATTABHIPURAM, GUNTUR - 522006',
                'phone' => '8008499325',
                'email' => 'gcubptb@guntururbanbank.org',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Guntur',
                'is_headquarter' => false
            ],
            [
                'name' => 'Kothapet Branch',
                'address' => 'D.NO: 12-1-86 NEAR BOSE BOMMA CENTER, KOTHAPET GUNTUR - 522001',
                'phone' => '8008499326',
                'email' => 'gcubkpt@guntururbanbank.org',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Guntur',
                'is_headquarter' => false
            ],
            [
                'name' => 'Ponnuru Branch',
                'address' => 'D.NO: 17-4 SUBBARAYA NAGAR, SPP ROAD, PONNURU - 522124',
                'phone' => '8008499327',
                'email' => 'gcubpnr@guntururbanbank.org',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Guntur',
                'is_headquarter' => false
            ],
            [
                'name' => 'Koretipadu Branch',
                'address' => 'D.NO: 4-4-66 NEAR KOLLAFARAM CENTRE, CHANDRAMOULINAGAR, KORETIPADU, GUNTUR - 522007',
                'phone' => '8008499328',
                'email' => 'gcubcmn@guntururbanbank.org',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Guntur',
                'is_headquarter' => false
            ],
            [
                'name' => 'A R Agraharam Branch',
                'address' => 'D.NO: 25-3-75/3 ADAPAVARI STREET NEAR VENKATESWARA SWAMY TEMPLE, A R AGRAHARAM, GUNTUR - 522004',
                'phone' => '8008499329',
                'email' => 'gcubrag@guntururbanbank.org',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Guntur',
                'is_headquarter' => false
            ],
            [
                'name' => 'Chilakaluripet Branch',
                'address' => 'D.NO: 21-223 OLD BSNL OFFICE, MADDI MALAIAH VEEDHI, CHILAKALURIPET - 522616',
                'phone' => '8008499330',
                'email' => 'gcubcpt@guntururbanbank.org',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Guntur',
                'is_headquarter' => false
            ],
            [
                'name' => 'Sattenapalli Branch',
                'address' => 'D.NO: 7-1-9/1 STATION ROAD, SATTENAPALLI - 522043',
                'phone' => '8008499331',
                'email' => 'gcubsap@guntururbanbank.org',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Guntur',
                'is_headquarter' => false
            ],
            [
                'name' => 'Tenali Branch',
                'address' => 'D.NO: 16-2-8 BOSE ROAD, NEAR POTTI SREERAMULU STATUE, OPP GDCC BANK, TENALI - 522201',
                'phone' => '8008499332',
                'email' => 'gcubtnl@guntururbanbank.org',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Guntur',
                'is_headquarter' => false
            ],
            [
                'name' => 'Mangalagiri Branch',
                'address' => 'D.NO: 3-232, MAIN ROAD, SREE VASAVI KANYAKA PARAMESWARI KALYANA MADAPAM, MANGALAGIRI - 522503',
                'phone' => '7997613332',
                'email' => 'gcubmag@guntururbanbank.org',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Guntur',
                'is_headquarter' => false
            ],
            [
                'name' => 'Narasaraopet Branch',
                'address' => 'D.NO: 12-17-9/1 PRAKASH NAGAR, BUSAVARI VIDILLU, NEAR TOWN HALL, NARASARAOPET - 522601',
                'phone' => '7997623332',
                'email' => 'gcubnrt@guntururbanbank.org',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Guntur',
                'is_headquarter' => false
            ],
            [
                'name' => 'Vijayawada Branch',
                'address' => 'D.NO: 7-36 ONE CENTRE, NEAR NTR STATUE, GOLLAPUDI MAIN ROAD, VIJAYAWADA - 521225',
                'phone' => '8886661477',
                'email' => 'gcubglp@guntururbanbank.org',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Krishna',
                'is_headquarter' => false
            ],
            [
                'name' => 'Ongole Branch',
                'address' => 'D.NO: 34-1-11A OPP, DISTRICT LIBRARY COURT CENTER, ONGOLE - 523001',
                'phone' => '8886625458',
                'email' => 'gcubongole@guntururbanbank.org',
                'timings' => '10:00 AM - 6:00 PM',
                'district' => 'Prakasam',
                'is_headquarter' => false
            ]
        ];

        // Using Query Builder in a loop to handle varying fields safely
        foreach ($data as $branch) {
            $this->db->table('branches')->insert($branch);
        }
    }
}

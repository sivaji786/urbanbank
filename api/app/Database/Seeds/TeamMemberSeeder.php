<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'name' => 'Sri Bonaboyina Srinivasa Rao',
                'position' => 'Chairman',
                'image_url' => 'uploads/management/chairman.png',
                'bio' => 'Sri Bonaboyina Srinivasa Rao, is a Graduate from Arts stream (B.A) He is the Chairman of The Guntur Co. operative Urban Bank Ltd since August 2016. During his term as Chairman, the bank opened 5 new branches in Guntur, Krishna and Prakasam districts i.e. Tenali, Mangalagiri, Narasaraopet, Gollapdudi and Ongole. Under his leadership and direction, the business of the bank has grown up by Rs. 270 crores. He is having 30 years experience in Cotton Business and 20 years experience in construction and other business fields.',
                'category' => 'board',
                'display_order' => 1
            ],
            [
                'name' => 'Sri Marreddy Basivi Reddy',
                'position' => 'Vice - Chairman',
                'image_url' => 'uploads/management/vice-chairman.png',
                'bio' => 'is a commerce graduate ( B.Com.) He was elected as Director to the bank in August 2011 and continuing as Director till date. He is having 20 Years Experience in Construction Field and 25 Years Experience in Agriculture. He is running a Firm with name M/s Harika Constructions and completed 11 Ventures in Guntur and Hyderabad.',
                'category' => 'board',
                'display_order' => 2
            ],
            [
                'name' => 'Sri Arthimalla Venkata Ratnam',
                'position' => 'Director',
                'image_url' => 'uploads/management/venkata-ratnam.png',
                'bio' => 'was elected as Director to the bank since September 2009.He is having 5 Years Experience in Construction Field and 40 Years Experience in Agriculture field.He is running a Firm with the name M/s Navodaya Constructions and completed 3 Ventures in Guntur. He is also experienced in cold storage activity.',
                'category' => 'board',
                'display_order' => 3
            ],
            [
                'name' => 'Sri Kakani Rama Rao',
                'position' => 'Director',
                'image_url' => 'uploads/management/rama-rao.png',
                'bio' => 'was elected as Director of the bank in August 2020. He is having 20 years experience in Business & Agriculture activity.',
                'category' => 'board',
                'display_order' => 4
            ],
            [
                'name' => 'Sri Busireddy Malleswara Reddy',
                'position' => 'Director',
                'image_url' => 'uploads/management/malleswara-reddy.png',
                'bio' => 'was elected as Director to the bank in 2021. He is having 40 years experience in Cloth Business and 20 years experience in construction field .He was the founder of \'Sai Baskar Hospitals\' Guntur.',
                'category' => 'board',
                'display_order' => 5
            ],
            [
                'name' => 'Sri Eeresam Narendra Babu',
                'position' => 'Director',
                'image_url' => 'uploads/management/narendra-babu.png',
                'bio' => 'was elected as Director to the bank in 2021. He is having 20 years of experience in the construction activity.',
                'category' => 'board',
                'display_order' => 6
            ],
            [
                'name' => 'CA Sri Gabbita Sivaramakrishna Prasad Garu',
                'position' => 'Director',
                'image_url' => 'uploads/management/gabbita-prasad.png',
                'bio' => 'He is a graduate with B.com. ,FCA. He is elected as director to the bank in April 2021. Senior partner in professional chartered accountants firm, M/s Uma Maheswara Rao & co., Guntur for last 35 years. worked as jr.officer in A.P State Financial Corporation-during the year 1984till 31st march 1986. In his practice since 35 years, he conducted the statuatory centeral audit of state bank of India, Oriental bank of commerce ,Andhra bank ,Indian bank in several regional & rural banks. Conducted audit in NTPC limited, NMDC ltd, power grid corporation of India Ltd, Ecil & also in several public &private limited companies. Director in the Guntur co-operative urban bank ltd., Guntur for more than 15 years i.e (01.09.2005 to 15.08.2020)including period as administrative committees.',
                'category' => 'board',
                'display_order' => 7
            ],
            [
                'name' => 'Sri Tattukolla Kesavaiah',
                'position' => 'Director',
                'image_url' => 'uploads/management/kesavaiah.png',
                'bio' => 'is elected as Director to the bank in April 2021. He is having 10 Years Experience in Construction Field.',
                'category' => 'board',
                'display_order' => 8
            ],
            [
                'name' => 'Sri Banda Ravindranadh',
                'position' => 'Director',
                'image_url' => 'uploads/management/ravindranadha.png',
                'bio' => 'was elected as a co-opted director to the bank in 2021. He was graduated from Science stream ( B.Sc.,) with additional qualifications of B.Ed and B.L. He retired from Food Corporation of India as an officer and worked in various departments of FCI with good experience. He is a good writer, in recent days he published a book with name "GURTHUKOSTUNNAYI"',
                'category' => 'board',
                'display_order' => 9
            ],
            [
                'name' => 'Smt Rayavarapu Anuradha',
                'position' => 'Director',
                'image_url' => 'uploads/management/anuradha.png',
                'bio' => 'appointed as director in Aug-2023',
                'category' => 'board',
                'display_order' => 10
            ],
            [
                'name' => 'Sri Shaik Saida Garu',
                'position' => 'Co-Opted Director',
                'image_url' => 'uploads/management/shaik-saida.png',
                'bio' => 'Co-Opted Director of The Guntur Co-operative Urban Bank Ltd.',
                'category' => 'co-opted',
                'display_order' => 11
            ],
            [
                'name' => 'Sri Nuthalapati Venkateswarlu',
                'position' => 'Co-Opted Director',
                'image_url' => 'uploads/management/venkateswarlu.png',
                'bio' => 'Co-Opted Director of The Guntur Co-operative Urban Bank Ltd.',
                'category' => 'co-opted',
                'display_order' => 12
            ],
            [
                'name' => 'Sri Rachamanti Bhaskara Rao',
                'position' => 'Co-Opted Director',
                'image_url' => 'uploads/management/rachamanti.png',
                'bio' => 'Co-Opted Director of The Guntur Co-operative Urban Bank Ltd.',
                'category' => 'co-opted',
                'display_order' => 13
            ],
            [
                'name' => 'Sri Govindaraju Sadanand',
                'position' => 'Chief Executive Officer',
                'image_url' => 'uploads/management/ceo.png',
                'bio' => 'Chief Executive Officer of The Guntur Co-operative Urban Bank Ltd.',
                'category' => 'executive',
                'display_order' => 14
            ]
        ];

        $this->db->table('team_members')->ignore(true)->insertBatch($data);
    }
}

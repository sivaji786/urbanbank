<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class DeafAccountsPageSeeder extends Seeder
{
    public function run()
    {
        // 1. Seed Page Content (Hero + Banner)
        $pageData = [
            'slug' => 'deaf-accounts',
            'title' => 'Deaf & Mute Account Holders',
            'content' => json_encode([
                'hero_title' => 'Deaf & Mute Account Holders',
                'hero_description' => 'List of Account Holders with Disability Reference Numbers',
                'info_banner' => [
                    'title' => 'Inclusive Banking Services',
                    'description' => 'Guntur Urban Bank is committed to providing accessible banking services to all customers, including those with disabilities. We maintain a dedicated list of deaf and mute account holders with UDRN (Unique Disability Reference Numbers) for specialized support.'
                ]
            ])
        ];

        $existingPage = $this->db->table('pages')->where('slug', $pageData['slug'])->get()->getRow();
        if ($existingPage) {
            $this->db->table('pages')->where('slug', $pageData['slug'])->update($pageData);
        } else {
            $this->db->table('pages')->insert($pageData);
        }

        // 2. Seed Deaf Accounts List
        $accounts = [
            ['id' => 1, 'name' => 'NEW TELEMOBILE SERVICE POINT', 'address' => 'OPP:KIRAN TAILORS,DNO-6-3-41/1. 3/1,ARUNDELPET KOTHAMASU PLAZA 522002 GUNTUR', 'udrn' => '002120100000742'],
            ['id' => 2, 'name' => 'SAMBA SIVA ELECTRONICS', 'address' => '5-45-9,OPP-SITI CABLE OFFICE 4/10 LANE BRODIPET GUNTUR 522002 GUNTUR', 'udrn' => '002120100000760'],
            ['id' => 3, 'name' => 'MOHAMMED KHAN & SONS JEWELLERS', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000714'],
            ['id' => 4, 'name' => 'GANDIKOTA SUBBA RAO', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000715'],
            ['id' => 5, 'name' => 'VASAVI GREATUS CLUB EDUCATION SCHOLORSHI', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000731'],
            ['id' => 6, 'name' => 'MANIKANTA INTEGRATED AGRO FORMS', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000732'],
            ['id' => 7, 'name' => 'SRINIVASA REDDY YAKKANTI', 'address' => 'PULLA REDDY RTC COLONY GUNTUR 522001 GUNTUR', 'udrn' => '002120100000740'],
            ['id' => 8, 'name' => 'SWETHA ADS', 'address' => 'D.NO:7-11-114, 2ND LANE, KAKUMANUVARI THOTA, 522002 GUNTUR', 'udrn' => '002120100000701'],
            ['id' => 9, 'name' => 'M/S VIJAYA DIESEL SERVICES', 'address' => '14-1-31 GOMDIYAMATAM ROAD GUNTURIVARITHOTA GUNTUR 522002 GUNTUR', 'udrn' => '002120100000736'],
            ['id' => 10, 'name' => 'S.S.COMMUNICATIONS', 'address' => 'D.NO:26-35-139/B, A.T-AGRAHARAM, 15TH LANE, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000696'],
            ['id' => 11, 'name' => 'ARAVIND PUBLICATIONS', 'address' => 'D.NO:5-94-15, 6/13, BRODIPET, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000697'],
            ['id' => 12, 'name' => 'SREE COMPUTERS', 'address' => '4/2 LANE, ARUNDELPET, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000685'],
            ['id' => 13, 'name' => 'SRI DURGA FINANCE', 'address' => 'RAMA RAJU TOWERS, 8/2, ARUNDELPET, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000689'],
            ['id' => 14, 'name' => 'KAKATIYA', 'address' => 'M.BENARJINADH, S/O SUBBA RAO D.NO:6-8-26, 8/1, ARUNDELPET, 522002 GUNTUR', 'udrn' => '002120100000690'],
            ['id' => 15, 'name' => 'RAGHAVA ADS', 'address' => 'D.NO:6-1-45, MEHAR VIHAR, 1/3, ARUNDELPET, GUNTUR-2. 522002 GUNTUR', 'udrn' => '002120100000704'],
            ['id' => 16, 'name' => 'SRI VENKATA SAI AUTO GAREGE', 'address' => 'NEAR MOSQUE, COBALDPET, 4TH LANE, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000705'],
            ['id' => 17, 'name' => 'LAKSHMI AGENCIES', 'address' => 'NEAR SAI BABA ROAD, VIDYA NAGAR, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000627'],
            ['id' => 18, 'name' => 'RAMESH ADS', 'address' => 'D.NO:23-11-34, ELURU BAZAR, GUNTUR-3. 522002 GUNTUR', 'udrn' => '002120100000674'],
            ['id' => 19, 'name' => 'BHARATA MAATA WEEKLY', 'address' => 'C/O NARASIMHA RAO 7/1, ARUNDELPET, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000616'],
            ['id' => 20, 'name' => 'SIVAM INTERNET SERVICES', 'address' => '5/1 LANE. BRODIPET, GUNTUR-2. 522002 GUNTUR', 'udrn' => '002120100000648'],
            ['id' => 21, 'name' => 'BALAJI INFOTECH', 'address' => 'D.NO:5-25-24, 3/2, BRODIPET, GUNTUR-2 522002 GUNTUR', 'udrn' => '002120100000703'],
            ['id' => 22, 'name' => 'SALAM MOTOR WORKS', 'address' => 'SHOP NO:120, AUTO NAGAR ROAD, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000708'],
            ['id' => 23, 'name' => 'VIGNESWARA DRESSES', 'address' => 'OPP: GANDHI PARK, SAMBASIVARAO PET, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000710'],
            ['id' => 24, 'name' => 'D.T.E.EXPORTS PRIVATE LIMITED', 'address' => 'D.NO:5-7-6, 4/5, BRODIPET, GUNTUR-2. 522002 GUNTUR', 'udrn' => '002120100000712'],
            ['id' => 25, 'name' => 'KANCHARLA AADS', 'address' => 'D.NO:11-688, INDUSTRIAL ESTATE, AMARAVATHI ROAD, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000677'],
            ['id' => 26, 'name' => 'SRI VENKATESWARA STONE CRUSH', 'address' => 'PROP:V.SAMBASIVA RAO, NEKKALLU, THULLURU VILLEGE, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000618'],
            ['id' => 27, 'name' => 'SRIKANTH FURNITURE WORKS', 'address' => 'PROP:GUDIPUDI KANTHA RAO MANGALADAS NAGAR, 1ST LANE, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000619'],
            ['id' => 28, 'name' => 'VITAL TELESYS', 'address' => 'D.NO:4-2-1/1, MAIN ROAD, OPP:DHANA LAKSHMI BANK, KORITEPADU, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000695'],
            ['id' => 29, 'name' => 'GANESH CAR TRAVELS', 'address' => '9/3 LANE, ARUNDELPET, GUNTUR-2. 522002 GUNTUR', 'udrn' => '002120100000700'],
            ['id' => 30, 'name' => 'VENCER TECHONOLAGIES', 'address' => '2/7 LANE, BRODIPET, GUNTUR-2. 522002 GUNTUR', 'udrn' => '002120100000637'],
            ['id' => 31, 'name' => 'BHARANI AGENCIES', 'address' => '2/1, ARUNDELPET, GUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000665'],
            ['id' => 32, 'name' => 'CHANDRAIAH HARIJANA CO.OP.SCTY', 'address' => 'KORNEPADU VILLEGE, VATTICHERUKURU MANDAL, MADIGAPALLI, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000678'],
            ['id' => 33, 'name' => 'SAGAR JYOTHI FURNITURE', 'address' => '2/2 LANE, ARUNDELPET, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000668'],
            ['id' => 34, 'name' => 'GNANA PEETAM', 'address' => '5-76-9, GUNTUR4TH LINE, PANDARIPURAM, 522002 GUNTUR', 'udrn' => '002120100000754'],
            ['id' => 35, 'name' => 'MEMBER WORKS COMMITTEE', 'address' => '1-46, 1ST WARD, PEDANANDIPADU (P) & (M) 522002 GUNTUR', 'udrn' => '002120100000753'],
            ['id' => 36, 'name' => 'M/S.SRI VINAYAKA ENTERPRISES', 'address' => '5-37-95, 4/13, BRODIPET, GUNTUR 522002 GUNTUR', 'udrn' => '002120100000750'],
            ['id' => 37, 'name' => 'TULASI DESIGNING CAFE', 'address' => '1-627, MUGGU BAZAR. 7/5, SRI NAGAR NEAR ANJANEYA TEMPLE, GUNTUR 522002 GUNTUR', 'udrn' => '002120100000770'],
            ['id' => 38, 'name' => 'M/S.KANAKA DURGA INDUSTRIES', 'address' => 'G.T.ROAD, OPP. MIRCHI YARD, GUNTUR 522002 GUNTUR', 'udrn' => '002120100000772'],
            ['id' => 39, 'name' => 'SRI SRINIVASA ENTERPRISES', 'address' => 'C/O NRKR COTTON MILLS, ETUKURU ROAD, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000666'],
            ['id' => 40, 'name' => 'M/S SRI BALAJI CONSTRUCTIONS', 'address' => 'FLAT NO:404,SAIMITHRA TOWERS J.K.C.NAGAR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000769'],
            ['id' => 41, 'name' => 'SREE VEERABRAHMENDRASWAMY SPINNING MILLS PRIVATE L', 'address' => 'KAVURU-LINGAMGUNTLA CHILAKALURIPET(M.D) GUNTUR(D.T) 522002 GUNTUR', 'udrn' => '002120100000759'],
            ['id' => 42, 'name' => 'SRAMIKA MARGAM', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000725'],
            ['id' => 43, 'name' => 'SRI BALAJI LAMINATION & SCREEN PRINTERS', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000734'],
            ['id' => 44, 'name' => 'RANGA MAHAL THEATER', 'address' => 'ARUNDELPET GUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000622'],
            ['id' => 45, 'name' => 'SESHMAHAL THEATER', 'address' => 'ARUNDELPET, GUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000623'],
            ['id' => 46, 'name' => 'N.PRAMEELA DEVI', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000670'],
            ['id' => 47, 'name' => 'SOUTH POWER LOOMS WEAVERS', 'address' => 'MANGALAGIRI GUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000560'],
            ['id' => 48, 'name' => 'RAGHAVENDRA V.BLINDS', 'address' => 'GUNTURGUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000582'],
            ['id' => 49, 'name' => 'NAGARJUNA ENTERPRISES', 'address' => '12-14-14,OPP.SIVALAYAM, KOTHAPET, GUNTUR. GUNTUR 522002 GUNTUR', 'udrn' => '002120100000613'],
            ['id' => 50, 'name' => 'M/S.AKSHAA ASSOCIATES', 'address' => '5-10-12 2/9, BRODIPET, GUNTUR 522002 GUNTUR', 'udrn' => '002120100000771'],
            ['id' => 51, 'name' => 'M/S.K.L.P.V.MEMORIAL & CHARITABLE TRUST', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000687'],
            ['id' => 52, 'name' => 'M/S MANI DURGA GENERAL ENGINEERING WORKS', 'address' => '22-5-167 MEDARA BAZAR LALAPET 522002 GUNTUR', 'udrn' => '002120100000721'],
            ['id' => 53, 'name' => 'FAST FARWARD', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000626'],
            ['id' => 54, 'name' => 'P.PURNACHANDRA RAO (STUDIOHANUMA)', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000652'],
            ['id' => 55, 'name' => 'JAYKAY PLASTICS', 'address' => 'GUNTURGUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000355'],
            ['id' => 56, 'name' => 'G.D.C.MOTORS TRANSPORT CO-OP', 'address' => 'DISTRICR CO-OP. OFFICE GUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000499'],
            ['id' => 57, 'name' => 'CO-OP SUB-REGISTARS CONSUMERS', 'address' => 'THE GUNTUR DIST.MEDICAL CO-OP STORES LTD., GUNTUR 522002 GUNTUR', 'udrn' => '002120100000532'],
            ['id' => 58, 'name' => 'M/S VASUNDHARA ENTERPRISES', 'address' => '17TH LANE,ARUNDELPET, GUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000606'],
            ['id' => 59, 'name' => 'SIVA JYOTHY PUBLICATION', 'address' => '17TH LANE,ARUNDELPET, GUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000607'],
            ['id' => 60, 'name' => 'M/S KANYAKAPARAMESWARI COLD STORAGE', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000631'],
            ['id' => 61, 'name' => 'GOVINDALURI SAMBASIVA RAO', 'address' => 'JOURNALIST,ANDHRA PATRIKA THAMBI CHETTU STREET, GUNTUR 522002 GUNTUR', 'udrn' => '002120100000369'],
            ['id' => 62, 'name' => 'SK.JOHNY BASHA', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000634'],
            ['id' => 63, 'name' => 'WINNING EDGE ADVERTISING', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000664'],
            ['id' => 64, 'name' => 'SARASWATHI TRADING COMPANY', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000667'],
            ['id' => 65, 'name' => 'M/MADABHUSHI SESHA CHARI', 'address' => 'GUNTURGUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000016'],
            ['id' => 66, 'name' => 'MAGHAM SURENDRA BABU', 'address' => 'DOOR NO:3-28-18/48, BRUNDAVAN GARDENS, GUNTUR. 522002 GUNTUR', 'udrn' => '002120100000669'],
            ['id' => 67, 'name' => 'GOLLAPALEM WEAVERS CO-OP.SOCT.', 'address' => 'GOLLAPALEM GUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000564'],
            ['id' => 68, 'name' => 'SRI SATYANARAYANA PRINTERS', 'address' => 'BRODIPET GUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000588'],
            ['id' => 69, 'name' => 'M/S SUBHASH FINANCE', 'address' => 'GUNTURGUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000597'],
            ['id' => 70, 'name' => 'NICKYS BAKERY', 'address' => '2/4,ARUNDELPET, GUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000601'],
            ['id' => 71, 'name' => 'R&R ARTS', 'address' => '7-9-26,KAKUMANUVARI THOTA 4TH LANE,ARUNDELPET,GUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000604'],
            ['id' => 72, 'name' => 'KRANTHI MAHILA MANDALI', 'address' => 'MEHABOOB NAGAR, A.T.AGRAHARAM, GUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000612'],
            ['id' => 73, 'name' => 'EESTERN ENGINEERING ENTPS.', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000625'],
            ['id' => 74, 'name' => 'VEDA GRAPHICS', 'address' => '6-7-77 7/5ARUNDELPET GUNTUR 522002 GUNTUR', 'udrn' => '002120100000744'],
            ['id' => 75, 'name' => 'MEMBER WORKS COMMITTEE', 'address' => 'KATRAPADU[V] PEDANANDIPADU [M.D]. GUNTUR 522002 GUNTUR', 'udrn' => '002120100000743'],
            ['id' => 76, 'name' => 'DEEPTI CONSUMABLES&PERIPHERALS', 'address' => 'SHOP NO,2 TOWER BUILDING 4THLINE DONKA ROAD GUNTUR 522002 GUNTUR', 'udrn' => '002120100000738'],
            ['id' => 77, 'name' => 'THE GUNTUR PATTANA PADMASALIYA DWITIYA SANGHAM', 'address' => '09-10-35 CLOTH BAZAR, KOTHAPET, GUNTUR 522002 GUNTUR', 'udrn' => '002120100000749'],
            ['id' => 78, 'name' => 'AKKANA PRAGADA CHIDAMBARA RAO', 'address' => 'HNO:16-24-34 AKKANAPRAGADA VARI STREET,OLD GUNTUR 522001 GUNTUR', 'udrn' => '002120100000551'],
            ['id' => 79, 'name' => 'ITCOS', 'address' => 'OPP-I.T.C LTD G.T.ROAD GUNTUR 522002 GUNTUR', 'udrn' => '002120100000762'],
            ['id' => 80, 'name' => 'M.S.VASU TRAVELS', 'address' => 'GUNTURGUNTURGUNTUR 522002 GUNTUR', 'udrn' => '002120100000717'],
            ['id' => 81, 'name' => 'R.K.ASSOCIATES', 'address' => '3-1-5A, 4TH LINE RAJANEDRA NAGAR SONEAR GNANODAYA PUBLIC SCHOOL, GUNTUR - 7 522002 GUNTUR', 'udrn' => '002120100000699'],
            ['id' => 82, 'name' => 'M/S GAFFAR ELCL.WORKS', 'address' => 'BHAGATH SINGH ST.,KOTHAPET, GUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000594'],
            ['id' => 83, 'name' => 'M/S SREE SILK INDUSTRIES', 'address' => '25-9-4,1ST LANE,R.AGRAHARAM, GUNTUR GUNTUR 522002 GUNTUR', 'udrn' => '002120100000595'],
            ['id' => 84, 'name' => 'SRI SAI BALAJI CABLE NET WORK', 'address' => 'DNO- 6/13 BRODIE PETA GUNTUR 522002 GUNTUR', 'udrn' => '002120100000706'],
            ['id' => 85, 'name' => 'GANESH MOTOR WORKS', 'address' => 'P LAKSHMI SATISH PROPRIETORSHOP NO 36 AUTO NAGAR ROADGUNTUR 522001 GUNTUR', 'udrn' => '002120100000707'],
            ['id' => 86, 'name' => 'M.SUBRAHMANYAM', 'address' => '2/9,BHARTH PETA, GUNTUR 522002 GUNTUR', 'udrn' => '000220010000081'],
            ['id' => 87, 'name' => 'SANKU SUBBA RAO', 'address' => '7-12-57, DONKA ROAD, 5THLINE, VALLURIVARI THOTA, GUNTUR 522002 GUNTUR', 'udrn' => '002100100009747'],
            ['id' => 88, 'name' => 'SK.MUNAFF', 'address' => '15-3-89,NEAR MANIPURAM RAILWAY GATE2ND LINE, ISRAILPET, GUNTUR 522002 GUNTUR', 'udrn' => '002100100009842'],
            ['id' => 89, 'name' => 'SHAIK MUNWAR', 'address' => '7-6-846/157, 6/7, RAJEEVGANDHI NAGAR, GUNTUR 522002 GUNTUR', 'udrn' => '002100100009572'],
            ['id' => 90, 'name' => 'KAREWMPUDI NARASIMHA RAO', 'address' => '8-12-27 9/3, NEHRUNAGAR, GUNTUR 522002 GUNTUR', 'udrn' => '002100100009356'],
            ['id' => 91, 'name' => 'KADARI BHASKAR RAO', 'address' => '7-17-202 2ND LINE LAST, SRINAGAR, GUNTUR 522002 GUNTUR', 'udrn' => '002100100009413'],
            ['id' => 92, 'name' => 'ALA.SUBBA RAO', 'address' => 'D.NO.6-19-6, SRI SIVA ELECTRICALS BOPP:KOHINOOR BAR, AMARAVATHI ROAD, GUNTUR 522002 GUNTUR', 'udrn' => '002100100009669'],
            ['id' => 93, 'name' => 'SARIPUDI RAMBABU', 'address' => '28-2-34/1A KANKARAGUNTA GUNTUR 522002 GUNTUR', 'udrn' => '002100100009233'],
            ['id' => 94, 'name' => 'SRUNGAVARAPU SUBBA RAO', 'address' => 'KODAVALIVARI PALEM (PO) KAREMCHEDU (MANDAL) PRAKASAM DIST 522002 GUNTUR', 'udrn' => '002100100009121'],
            ['id' => 95, 'name' => 'CHILUKURI SESHAGIRI RAO', 'address' => '1212 ONGOLE GUNTUR 522002 GUNTUR', 'udrn' => '002100100009118'],
            ['id' => 96, 'name' => 'MADALA VENKATA NAGENDRA RAO', 'address' => '7-19-160 VASANTHA RAYAPURAM GUNTUR 522002 GUNTUR', 'udrn' => '002100100009078'],
            ['id' => 97, 'name' => 'CHALLA DURGARAO', 'address' => '25-12-60 SRINIVASA RAO PET,7TH LINE GUNTUR 522002 GUNTUR', 'udrn' => '002100100009069'],
            ['id' => 98, 'name' => 'SANALA SASIKIRAN', 'address' => '46-20-160 6TH LINE,A.T AGRAHARAM GUNTUR 522002 GUNTUR', 'udrn' => '002100100009072'],
            ['id' => 99, 'name' => 'VELAGALETY UDAYABHASKAR', 'address' => '26-35-3/11 A.T AGRAHARAM 7TH LINE GUNTUR 522002 GUNTUR', 'udrn' => '002100100009185'],
            ['id' => 100, 'name' => 'TADIPATRI VEERA LAKSHMA REDDY', 'address' => '3-99 PEDAPARIMI THULLURU 522002 GUNTUR', 'udrn' => '002100100009081']
        ];

        // Using REPLACE INTO or similar might be dangerous if IDs don't match or auto-inc is different. 
        // For seeding, checking existence by UDRN or Name is safer, or plain insert if table is empty.
        // Let's iterate and update or insert.
        foreach ($accounts as $account) {
            $exists = $this->db->table('deaf_accounts')->where('id', $account['id'])->countAllResults();
            if ($exists) {
                $this->db->table('deaf_accounts')->where('id', $account['id'])->update($account);
            } else {
                $this->db->table('deaf_accounts')->insert($account);
            }
        }
    }
}

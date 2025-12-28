-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 20, 2025 at 09:01 AM
-- Server version: 8.0.44-0ubuntu0.24.04.2
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `urban_bank_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `address` text COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ifsc` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `micr` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fax` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `timings` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '10:00 AM - 6:00 PM',
  `district` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `is_headquarter` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `name`, `address`, `phone`, `email`, `ifsc`, `micr`, `fax`, `timings`, `district`, `is_headquarter`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Head Office', 'D.NO.5-25-26, 3/2 BRODIPET GUNTUR - 522002', '8008499030 ', 'gcubltd@guntururbanbank.org', 'YESB0GCUBI', '520649002', '08662435462', '10:00 AM - 6:00 PM', 'Guntur', 1, NULL, '2025-12-19 14:14:26', NULL),
(2, 'Main Branch', 'D.NO.5-25-26, 3/2 BRODIPET GUNTUR - 522002', '8008499323', 'gcubbpt@guntururbanbank.org', 'YESB0GCUBI', '520649002', '08662435462', '10:00 AM - 6:00 PM', 'Guntur', 1, NULL, NULL, NULL),
(3, 'Pattabhipuram Branch', 'B1/58/1 NEAR SATYANNARAYANA SWAMY TEMPLE, PATTABHIPURAM, GUNTUR - 522006', '8008499325', 'gcubptb@guntururbanbank.org', NULL, NULL, NULL, '10:00 AM - 6:00 PM', 'Guntur', 0, NULL, NULL, NULL),
(4, 'Kothapet Branch', 'D.NO: 12-1-86 NEAR BOSE BOMMA CENTER, KOTHAPET GUNTUR - 522001', '8008499326', 'gcubkpt@guntururbanbank.org', NULL, NULL, NULL, '10:00 AM - 6:00 PM', 'Guntur', 0, NULL, NULL, NULL),
(5, 'Ponnuru Branch', 'D.NO: 17-4 SUBBARAYA NAGAR, SPP ROAD, PONNURU - 522124', '8008499327', 'gcubpnr@guntururbanbank.org', NULL, NULL, NULL, '10:00 AM - 6:00 PM', 'Guntur', 0, NULL, NULL, NULL),
(6, 'Koretipadu Branch', 'D.NO: 4-4-66 NEAR KOLLAFARAM CENTRE, CHANDRAMOULINAGAR, KORETIPADU, GUNTUR - 522007', '8008499328', 'gcubcmn@guntururbanbank.org', NULL, NULL, NULL, '10:00 AM - 6:00 PM', 'Guntur', 0, NULL, NULL, NULL),
(7, 'A R Agraharam Branch', 'D.NO: 25-3-75/3 ADAPAVARI STREET NEAR VENKATESWARA SWAMY TEMPLE, A R AGRAHARAM, GUNTUR - 522004', '8008499329', 'gcubrag@guntururbanbank.org', NULL, NULL, NULL, '10:00 AM - 6:00 PM', 'Guntur', 0, NULL, NULL, NULL),
(8, 'Chilakaluripet Branch', 'D.NO: 21-223 OLD BSNL OFFICE, MADDI MALAIAH VEEDHI, CHILAKALURIPET - 522616', '8008499330', 'gcubcpt@guntururbanbank.org', NULL, NULL, NULL, '10:00 AM - 6:00 PM', 'Guntur', 0, NULL, NULL, NULL),
(9, 'Sattenapalli Branch', 'D.NO: 7-1-9/1 STATION ROAD, SATTENAPALLI - 522043', '8008499331', 'gcubsap@guntururbanbank.org', NULL, NULL, NULL, '10:00 AM - 6:00 PM', 'Guntur', 0, NULL, NULL, NULL),
(10, 'Tenali Branch', 'D.NO: 16-2-8 BOSE ROAD, NEAR POTTI SREERAMULU STATUE, OPP GDCC BANK, TENALI - 522201', '8008499332', 'gcubtnl@guntururbanbank.org', NULL, NULL, NULL, '10:00 AM - 6:00 PM', 'Guntur', 0, NULL, NULL, NULL),
(11, 'Mangalagiri Branch', 'D.NO: 3-232, MAIN ROAD, SREE VASAVI KANYAKA PARAMESWARI KALYANA MADAPAM, MANGALAGIRI - 522503', '7997613332', 'gcubmag@guntururbanbank.org', NULL, NULL, NULL, '10:00 AM - 6:00 PM', 'Guntur', 0, NULL, NULL, NULL),
(12, 'Narasaraopet Branch', 'D.NO: 12-17-9/1 PRAKASH NAGAR, BUSAVARI VIDILLU, NEAR TOWN HALL, NARASARAOPET - 522601', '7997623332', 'gcubnrt@guntururbanbank.org', NULL, NULL, NULL, '10:00 AM - 6:00 PM', 'Guntur', 0, NULL, NULL, NULL),
(13, 'Vijayawada Branch', 'D.NO: 7-36 ONE CENTRE, NEAR NTR STATUE, GOLLAPUDI MAIN ROAD, VIJAYAWADA - 521225', '8886661477', 'gcubglp@guntururbanbank.org', NULL, NULL, NULL, '10:00 AM - 6:00 PM', 'Krishna', 0, NULL, NULL, NULL),
(14, 'Ongole Branch', 'D.NO: 34-1-11A OPP, DISTRICT LIBRARY COURT CENTER, ONGOLE - 523001', '8886625458', 'gcubongole@guntururbanbank.org', NULL, NULL, NULL, '10:00 AM - 6:00 PM', 'Prakasam', 0, NULL, NULL, NULL),
(15, 'Testing Branch updated', 'Testing street, testing town, testing District, testing updated pin code -522007', '9966365544', 'sivaji786378@gmail.com', 'GUB00786', 'GUCUB0786', '99663655440', '12:00 AM - 10:00 PM', 'Krishna', 1, '2025-12-19 14:31:50', '2025-12-19 14:34:33', '2025-12-19 14:34:33');

-- --------------------------------------------------------

--
-- Table structure for table `deaf_accounts`
--

CREATE TABLE `deaf_accounts` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `address` text COLLATE utf8mb4_general_ci NOT NULL,
  `udrn` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deaf_accounts`
--

INSERT INTO `deaf_accounts` (`id`, `name`, `address`, `udrn`, `created_at`, `updated_at`) VALUES
(1, 'NEW TELEMOBILE SERVICE POINT', 'OPP:KIRAN TAILORS,DNO-6-3-41/1. 3/1,ARUNDELPET KOTHAMASU PLAZA 522002 GUNTUR', '002120100000742', NULL, NULL),
(2, 'SAMBA SIVA ELECTRONICS', '5-45-9,OPP-SITI CABLE OFFICE 4/10 LANE BRODIPET GUNTUR 522002 GUNTUR', '002120100000760', NULL, NULL),
(3, 'MOHAMMED KHAN & SONS JEWELLERS', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000714', NULL, NULL),
(4, 'GANDIKOTA SUBBA RAO', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000715', NULL, NULL),
(5, 'VASAVI GREATUS CLUB EDUCATION SCHOLORSHI', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000731', NULL, NULL),
(6, 'MANIKANTA INTEGRATED AGRO FORMS', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000732', NULL, NULL),
(7, 'SRINIVASA REDDY YAKKANTI', 'PULLA REDDY RTC COLONY GUNTUR 522001 GUNTUR', '002120100000740', NULL, NULL),
(8, 'SWETHA ADS', 'D.NO:7-11-114, 2ND LANE, KAKUMANUVARI THOTA, 522002 GUNTUR', '002120100000701', NULL, NULL),
(9, 'M/S VIJAYA DIESEL SERVICES', '14-1-31 GOMDIYAMATAM ROAD GUNTURIVARITHOTA GUNTUR 522002 GUNTUR', '002120100000736', NULL, NULL),
(10, 'S.S.COMMUNICATIONS', 'D.NO:26-35-139/B, A.T-AGRAHARAM, 15TH LANE, GUNTUR. 522002 GUNTUR', '002120100000696', NULL, NULL),
(11, 'ARAVIND PUBLICATIONS', 'D.NO:5-94-15, 6/13, BRODIPET, GUNTUR. 522002 GUNTUR', '002120100000697', NULL, NULL),
(12, 'SREE COMPUTERS', '4/2 LANE, ARUNDELPET, GUNTUR. 522002 GUNTUR', '002120100000685', NULL, NULL),
(13, 'SRI DURGA FINANCE', 'RAMA RAJU TOWERS, 8/2, ARUNDELPET, GUNTUR. 522002 GUNTUR', '002120100000689', NULL, NULL),
(14, 'KAKATIYA', 'M.BENARJINADH, S/O SUBBA RAO D.NO:6-8-26, 8/1, ARUNDELPET, 522002 GUNTUR', '002120100000690', NULL, NULL),
(15, 'RAGHAVA ADS', 'D.NO:6-1-45, MEHAR VIHAR, 1/3, ARUNDELPET, GUNTUR-2. 522002 GUNTUR', '002120100000704', NULL, NULL),
(16, 'SRI VENKATA SAI AUTO GAREGE', 'NEAR MOSQUE, COBALDPET, 4TH LANE, GUNTUR. 522002 GUNTUR', '002120100000705', NULL, NULL),
(17, 'LAKSHMI AGENCIES', 'NEAR SAI BABA ROAD, VIDYA NAGAR, GUNTUR. 522002 GUNTUR', '002120100000627', NULL, NULL),
(18, 'RAMESH ADS', 'D.NO:23-11-34, ELURU BAZAR, GUNTUR-3. 522002 GUNTUR', '002120100000674', NULL, NULL),
(19, 'BHARATA MAATA WEEKLY', 'C/O NARASIMHA RAO 7/1, ARUNDELPET, GUNTUR. 522002 GUNTUR', '002120100000616', NULL, NULL),
(20, 'SIVAM INTERNET SERVICES', '5/1 LANE. BRODIPET, GUNTUR-2. 522002 GUNTUR', '002120100000648', NULL, NULL),
(21, 'BALAJI INFOTECH', 'D.NO:5-25-24, 3/2, BRODIPET, GUNTUR-2 522002 GUNTUR', '002120100000703', NULL, NULL),
(22, 'SALAM MOTOR WORKS', 'SHOP NO:120, AUTO NAGAR ROAD, GUNTUR. 522002 GUNTUR', '002120100000708', NULL, NULL),
(23, 'VIGNESWARA DRESSES', 'OPP: GANDHI PARK, SAMBASIVARAO PET, GUNTUR. 522002 GUNTUR', '002120100000710', NULL, NULL),
(24, 'D.T.E.EXPORTS PRIVATE LIMITED', 'D.NO:5-7-6, 4/5, BRODIPET, GUNTUR-2. 522002 GUNTUR', '002120100000712', NULL, NULL),
(25, 'KANCHARLA AADS', 'D.NO:11-688, INDUSTRIAL ESTATE, AMARAVATHI ROAD, GUNTUR. 522002 GUNTUR', '002120100000677', NULL, NULL),
(26, 'SRI VENKATESWARA STONE CRUSH', 'PROP:V.SAMBASIVA RAO, NEKKALLU, THULLURU VILLEGE, GUNTUR. 522002 GUNTUR', '002120100000618', NULL, NULL),
(27, 'SRIKANTH FURNITURE WORKS', 'PROP:GUDIPUDI KANTHA RAO MANGALADAS NAGAR, 1ST LANE, GUNTUR. 522002 GUNTUR', '002120100000619', NULL, NULL),
(28, 'VITAL TELESYS', 'D.NO:4-2-1/1, MAIN ROAD, OPP:DHANA LAKSHMI BANK, KORITEPADU, GUNTUR. 522002 GUNTUR', '002120100000695', NULL, NULL),
(29, 'GANESH CAR TRAVELS', '9/3 LANE, ARUNDELPET, GUNTUR-2. 522002 GUNTUR', '002120100000700', NULL, NULL),
(30, 'VENCER TECHONOLAGIES', '2/7 LANE, BRODIPET, GUNTUR-2. 522002 GUNTUR', '002120100000637', NULL, NULL),
(31, 'BHARANI AGENCIES', '2/1, ARUNDELPET, GUNTUR GUNTUR 522002 GUNTUR', '002120100000665', NULL, NULL),
(32, 'CHANDRAIAH HARIJANA CO.OP.SCTY', 'KORNEPADU VILLEGE, VATTICHERUKURU MANDAL, MADIGAPALLI, GUNTUR. 522002 GUNTUR', '002120100000678', NULL, NULL),
(33, 'SAGAR JYOTHI FURNITURE', '2/2 LANE, ARUNDELPET, GUNTUR. 522002 GUNTUR', '002120100000668', NULL, NULL),
(34, 'GNANA PEETAM', '5-76-9, GUNTUR4TH LINE, PANDARIPURAM, 522002 GUNTUR', '002120100000754', NULL, NULL),
(35, 'MEMBER WORKS COMMITTEE', '1-46, 1ST WARD, PEDANANDIPADU (P) & (M) 522002 GUNTUR', '002120100000753', NULL, NULL),
(36, 'M/S.SRI VINAYAKA ENTERPRISES', '5-37-95, 4/13, BRODIPET, GUNTUR 522002 GUNTUR', '002120100000750', NULL, NULL),
(37, 'TULASI DESIGNING CAFE', '1-627, MUGGU BAZAR. 7/5, SRI NAGAR NEAR ANJANEYA TEMPLE, GUNTUR 522002 GUNTUR', '002120100000770', NULL, NULL),
(38, 'M/S.KANAKA DURGA INDUSTRIES', 'G.T.ROAD, OPP. MIRCHI YARD, GUNTUR 522002 GUNTUR', '002120100000772', NULL, NULL),
(39, 'SRI SRINIVASA ENTERPRISES', 'C/O NRKR COTTON MILLS, ETUKURU ROAD, GUNTUR. 522002 GUNTUR', '002120100000666', NULL, NULL),
(40, 'M/S SRI BALAJI CONSTRUCTIONS', 'FLAT NO:404,SAIMITHRA TOWERS J.K.C.NAGAR GUNTUR 522002 GUNTUR', '002120100000769', NULL, NULL),
(41, 'SREE VEERABRAHMENDRASWAMY SPINNING MILLS PRIVATE L', 'KAVURU-LINGAMGUNTLA CHILAKALURIPET(M.D) GUNTUR(D.T) 522002 GUNTUR', '002120100000759', NULL, NULL),
(42, 'SRAMIKA MARGAM', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000725', NULL, NULL),
(43, 'SRI BALAJI LAMINATION & SCREEN PRINTERS', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000734', NULL, NULL),
(44, 'RANGA MAHAL THEATER', 'ARUNDELPET GUNTUR GUNTUR 522002 GUNTUR', '002120100000622', NULL, NULL),
(45, 'SESHMAHAL THEATER', 'ARUNDELPET, GUNTUR GUNTUR 522002 GUNTUR', '002120100000623', NULL, NULL),
(46, 'N.PRAMEELA DEVI', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000670', NULL, NULL),
(47, 'SOUTH POWER LOOMS WEAVERS', 'MANGALAGIRI GUNTUR GUNTUR 522002 GUNTUR', '002120100000560', NULL, NULL),
(48, 'RAGHAVENDRA V.BLINDS', 'GUNTURGUNTUR GUNTUR 522002 GUNTUR', '002120100000582', NULL, NULL),
(49, 'NAGARJUNA ENTERPRISES', '12-14-14,OPP.SIVALAYAM, KOTHAPET, GUNTUR. GUNTUR 522002 GUNTUR', '002120100000613', NULL, NULL),
(50, 'M/S.AKSHAA ASSOCIATES', '5-10-12 2/9, BRODIPET, GUNTUR 522002 GUNTUR', '002120100000771', NULL, NULL),
(51, 'M/S.K.L.P.V.MEMORIAL & CHARITABLE TRUST', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000687', NULL, NULL),
(52, 'M/S MANI DURGA GENERAL ENGINEERING WORKS', '22-5-167 MEDARA BAZAR LALAPET 522002 GUNTUR', '002120100000721', NULL, NULL),
(53, 'FAST FARWARD', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000626', NULL, NULL),
(54, 'P.PURNACHANDRA RAO (STUDIOHANUMA)', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000652', NULL, NULL),
(55, 'JAYKAY PLASTICS', 'GUNTURGUNTUR GUNTUR 522002 GUNTUR', '002120100000355', NULL, NULL),
(56, 'G.D.C.MOTORS TRANSPORT CO-OP', 'DISTRICR CO-OP. OFFICE GUNTUR GUNTUR 522002 GUNTUR', '002120100000499', NULL, NULL),
(57, 'CO-OP SUB-REGISTARS CONSUMERS', 'THE GUNTUR DIST.MEDICAL CO-OP STORES LTD., GUNTUR 522002 GUNTUR', '002120100000532', NULL, NULL),
(58, 'M/S VASUNDHARA ENTERPRISES', '17TH LANE,ARUNDELPET, GUNTUR GUNTUR 522002 GUNTUR', '002120100000606', NULL, NULL),
(59, 'SIVA JYOTHY PUBLICATION', '17TH LANE,ARUNDELPET, GUNTUR GUNTUR 522002 GUNTUR', '002120100000607', NULL, NULL),
(60, 'M/S KANYAKAPARAMESWARI COLD STORAGE', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000631', NULL, NULL),
(61, 'GOVINDALURI SAMBASIVA RAO', 'JOURNALIST,ANDHRA PATRIKA THAMBI CHETTU STREET, GUNTUR 522002 GUNTUR', '002120100000369', NULL, NULL),
(62, 'SK.JOHNY BASHA', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000634', NULL, NULL),
(63, 'WINNING EDGE ADVERTISING', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000664', NULL, NULL),
(64, 'SARASWATHI TRADING COMPANY', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000667', NULL, NULL),
(65, 'M/MADABHUSHI SESHA CHARI', 'GUNTURGUNTUR GUNTUR 522002 GUNTUR', '002120100000016', NULL, NULL),
(66, 'MAGHAM SURENDRA BABU', 'DOOR NO:3-28-18/48, BRUNDAVAN GARDENS, GUNTUR. 522002 GUNTUR', '002120100000669', NULL, NULL),
(67, 'GOLLAPALEM WEAVERS CO-OP.SOCT.', 'GOLLAPALEM GUNTURGUNTUR 522002 GUNTUR', '002120100000564', NULL, NULL),
(68, 'SRI SATYANARAYANA PRINTERS', 'BRODIPET GUNTUR GUNTUR 522002 GUNTUR', '002120100000588', NULL, NULL),
(69, 'M/S SUBHASH FINANCE', 'GUNTURGUNTUR GUNTUR 522002 GUNTUR', '002120100000597', NULL, NULL),
(70, 'NICKYS BAKERY', '2/4,ARUNDELPET, GUNTUR GUNTUR 522002 GUNTUR', '002120100000601', NULL, NULL),
(71, 'R&R ARTS', '7-9-26,KAKUMANUVARI THOTA 4TH LANE,ARUNDELPET,GUNTUR GUNTUR 522002 GUNTUR', '002120100000604', NULL, NULL),
(72, 'KRANTHI MAHILA MANDALI', 'MEHABOOB NAGAR, A.T.AGRAHARAM, GUNTUR GUNTUR 522002 GUNTUR', '002120100000612', NULL, NULL),
(73, 'EESTERN ENGINEERING ENTPS.', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000625', NULL, NULL),
(74, 'VEDA GRAPHICS', '6-7-77 7/5ARUNDELPET GUNTUR 522002 GUNTUR', '002120100000744', NULL, NULL),
(75, 'MEMBER WORKS COMMITTEE', 'KATRAPADU[V] PEDANANDIPADU [M.D]. GUNTUR 522002 GUNTUR', '002120100000743', NULL, NULL),
(76, 'DEEPTI CONSUMABLES&PERIPHERALS', 'SHOP NO,2 TOWER BUILDING 4THLINE DONKA ROAD GUNTUR 522002 GUNTUR', '002120100000738', NULL, NULL),
(77, 'THE GUNTUR PATTANA PADMASALIYA DWITIYA SANGHAM', '09-10-35 CLOTH BAZAR, KOTHAPET, GUNTUR 522002 GUNTUR', '002120100000749', NULL, NULL),
(78, 'AKKANA PRAGADA CHIDAMBARA RAO', 'HNO:16-24-34 AKKANAPRAGADA VARI STREET,OLD GUNTUR 522001 GUNTUR', '002120100000551', NULL, NULL),
(79, 'ITCOS', 'OPP-I.T.C LTD G.T.ROAD GUNTUR 522002 GUNTUR', '002120100000762', NULL, NULL),
(80, 'M.S.VASU TRAVELS', 'GUNTURGUNTURGUNTUR 522002 GUNTUR', '002120100000717', NULL, NULL),
(81, 'R.K.ASSOCIATES', '3-1-5A, 4TH LINE RAJANEDRA NAGAR SONEAR GNANODAYA PUBLIC SCHOOL, GUNTUR - 7 522002 GUNTUR', '002120100000699', NULL, NULL),
(82, 'M/S GAFFAR ELCL.WORKS', 'BHAGATH SINGH ST.,KOTHAPET, GUNTUR GUNTUR 522002 GUNTUR', '002120100000594', NULL, NULL),
(83, 'M/S SREE SILK INDUSTRIES', '25-9-4,1ST LANE,R.AGRAHARAM, GUNTUR GUNTUR 522002 GUNTUR', '002120100000595', NULL, NULL),
(84, 'SRI SAI BALAJI CABLE NET WORK', 'DNO- 6/13 BRODIE PETA GUNTUR 522002 GUNTUR', '002120100000706', NULL, NULL),
(85, 'GANESH MOTOR WORKS', 'P LAKSHMI SATISH PROPRIETORSHOP NO 36 AUTO NAGAR ROADGUNTUR 522001 GUNTUR', '002120100000707', NULL, NULL),
(86, 'M.SUBRAHMANYAM', '2/9,BHARTH PETA, GUNTUR 522002 GUNTUR', '000220010000081', NULL, NULL),
(87, 'SANKU SUBBA RAO', '7-12-57, DONKA ROAD, 5THLINE, VALLURIVARI THOTA, GUNTUR 522002 GUNTUR', '002100100009747', NULL, NULL),
(88, 'SK.MUNAFF', '15-3-89,NEAR MANIPURAM RAILWAY GATE2ND LINE, ISRAILPET, GUNTUR 522002 GUNTUR', '002100100009842', NULL, NULL),
(89, 'SHAIK MUNWAR', '7-6-846/157, 6/7, RAJEEVGANDHI NAGAR, GUNTUR 522002 GUNTUR', '002100100009572', NULL, NULL),
(90, 'KAREWMPUDI NARASIMHA RAO', '8-12-27 9/3, NEHRUNAGAR, GUNTUR 522002 GUNTUR', '002100100009356', NULL, NULL),
(91, 'KADARI BHASKAR RAO', '7-17-202 2ND LINE LAST, SRINAGAR, GUNTUR 522002 GUNTUR', '002100100009413', NULL, NULL),
(92, 'ALA.SUBBA RAO', 'D.NO.6-19-6, SRI SIVA ELECTRICALS BOPP:KOHINOOR BAR, AMARAVATHI ROAD, GUNTUR 522002 GUNTUR', '002100100009669', NULL, NULL),
(93, 'SARIPUDI RAMBABU', '28-2-34/1A KANKARAGUNTA GUNTUR 522002 GUNTUR', '002100100009233', NULL, NULL),
(94, 'SRUNGAVARAPU SUBBA RAO', 'KODAVALIVARI PALEM (PO) KAREMCHEDU (MANDAL) PRAKASAM DIST 522002 GUNTUR', '002100100009121', NULL, NULL),
(95, 'CHILUKURI SESHAGIRI RAO', '1212 ONGOLE GUNTUR 522002 GUNTUR', '002100100009118', NULL, NULL),
(96, 'MADALA VENKATA NAGENDRA RAO', '7-19-160 VASANTHA RAYAPURAM GUNTUR 522002 GUNTUR', '002100100009078', NULL, NULL),
(97, 'CHALLA DURGARAO', '25-12-60 SRINIVASA RAO PET,7TH LINE GUNTUR 522002 GUNTUR', '002100100009069', NULL, NULL),
(98, 'SANALA SASIKIRAN', '46-20-160 6TH LINE,A.T AGRAHARAM GUNTUR 522002 GUNTUR', '002100100009072', NULL, NULL),
(99, 'VELAGALETY UDAYABHASKAR', '26-35-3/11 A.T AGRAHARAM 7TH LINE GUNTUR 522002 GUNTUR', '002100100009185', NULL, NULL),
(100, 'TADIPATRI VEERA LAKSHMA REDDY', '3-99 PEDAPARIMI THULLURU 522002 GUNTUR', '002100100009081', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `downloads`
--

CREATE TABLE `downloads` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `file_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `downloads`
--

INSERT INTO `downloads` (`id`, `title`, `file_url`, `category`, `created_at`, `updated_at`) VALUES
(1, 'Account Opening Form', '#', 'Forms & Applications', '2025-12-08 12:24:52', NULL),
(2, 'Loan Application', '#', 'Forms & Applications', '2025-12-08 12:24:52', NULL),
(3, 'Interest Rates 2024', '#', 'Interest Rates & Charges', '2025-12-08 12:24:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `date` date NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `date`, `location`, `created_at`, `updated_at`) VALUES
(1, 'Annual General Meeting', 'Join us for our AGM to discuss the bank\'s performance and future plans.', '2026-01-08', 'Main Branch Conference Hall', '2025-12-08 12:24:52', NULL),
(2, 'Financial Literacy Workshop', 'A free workshop to help you manage your finances better.', '2025-12-22', 'Community Center', '2025-12-08 12:24:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `financial_reports`
--

CREATE TABLE `financial_reports` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `file_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `year` varchar(4) COLLATE utf8mb4_general_ci NOT NULL,
  `quarter` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gallery_images`
--

CREATE TABLE `gallery_images` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery_images`
--

INSERT INTO `gallery_images` (`id`, `title`, `image_url`, `category`, `created_at`, `updated_at`) VALUES
(1, 'Branch Opening', 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=600&fit=crop', 'Events', '2025-12-08 12:24:52', NULL),
(2, 'Staff Training', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop', 'Training', '2025-12-08 12:24:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` bigint UNSIGNED NOT NULL,
  `version` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `class` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `group` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `namespace` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `time` int NOT NULL,
  `batch` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `version`, `class`, `group`, `namespace`, `time`, `batch`) VALUES
(1, '2025-12-08-121014', 'App\\Database\\Migrations\\InitialSchema', 'default', 'App', 1765195861, 1),
(2, '2025-12-09-060602', 'App\\Database\\Migrations\\AddPagesAndTeamMembers', 'default', 'App', 1765260399, 2),
(3, '2025-12-13-123427', 'App\\Database\\Migrations\\CreateDeafAccountsTable', 'default', 'App', 1765629298, 3),
(4, '2025-12-13-184500', 'App\\Database\\Migrations\\CreateSettingsTable', 'default', 'App', 1765631626, 4),
(5, '2025-12-13-192000', 'App\\Database\\Migrations\\CreateBranchesTable', 'default', 'App', 1765633222, 5),
(6, '2025-12-20-105500', 'App\\Database\\Migrations\\CreateProductTables', 'default', 'App', 1766208230, 6);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `date` date NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `date`, `created_at`, `updated_at`) VALUES
(1, 'Urban Bank Launches New Mobile App', 'We are excited to announce the launch of our new mobile banking application, featuring enhanced security and a user-friendly interface.', '2025-12-08', '2025-12-08 12:24:52', NULL),
(2, 'Quarterly Financial Results Announced', 'Urban Bank has posted a record profit for the last quarter, demonstrating strong growth and stability.', '2025-12-01', '2025-12-08 12:24:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int UNSIGNED NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `slug`, `title`, `content`, `created_at`, `updated_at`) VALUES
(1, 'about-us', 'About Us', '{\"hero\":{\"title\":\"About Us\",\"subtitle\":\"A Legacy of Trust Since 1947 \\u2022 Serving Andhra Pradesh with Excellence\"},\"intro\":{\"badge\":\"Premiere Cooperative Bank\",\"title\":\"The Guntur Cooperative Urban Bank Limited\",\"content\":\"THE GUNTUR COOPERATIVE URBAN BANK LIMITED, is premiere Co operative bank in state of Andhra Pradesh. It is having 13 branches. 5 Branches in Guntur city (Brodipet, Kothapet, Pattabhi puram, Chandramouli nagar, R.Agraharam), 6 branches in other towns in Guntur District (Sattenapalli, Chilakaluripet, Ponnur, Tenali, Narasaraopet, Mangalagiri), 1 in Krishna district (Gollapudi) & 1 in Prakasam District (Ongole), but a premiere co-operative bank and has initiated certain pioneering schemes for the co-operative banking sector in A.P.\",\"stats\":[{\"label\":\"Branches\",\"value\":\"13\"},{\"label\":\"Business\",\"value\":\"\\u20b9606Cr\"},{\"label\":\"Years Legacy\",\"value\":\"75+\"}],\"established_year\":\"1947\"},\"journey\":[{\"year\":\"1947\",\"title\":\"The Beginning\",\"description\":\"The bank had its origin in the year 1947. Started as Cooperative Society in the name of \\\"Produce Consumers Co-operative Society\\\".\"},{\"year\":\"1949\",\"title\":\"Converted to Urban Bank\",\"description\":\"The Co-operative Society was registered under Madras Co-operative Societies Act, 1932 and converted as Urban Bank in 1949. It started with one branch at Brodipet in 1949. Bank\'s Head Office is located at its own premises at Door No. 3\\/2, Brodipet, Guntur.\"},{\"year\":\"1998\",\"title\":\"New Act Implementation\",\"description\":\"Bank started functioning under AP Mutually Aided Co-operative Societies Act 1995 since 6th November 1998.\"},{\"year\":\"1999 - 2017\",\"title\":\"Expansion in Guntur District\",\"description\":\"Bank expanded its operations by opening branches in Guntur district and the number of branches increased to 11; i.e., 5 branches in Guntur City at Brodipet, Pattabhipuram, Kothapet, Chandramouli Nagar and R.Agraharam. 6 branches are opened in different towns in Guntur i.e., Sattenapalli, Chilakaluripet, Ponnur, Tenali, Mangalagiri and Narasaraopet.\"},{\"year\":\"2018\",\"title\":\"Multi-District Presence\",\"description\":\"Bank expanded its operations to neighbouring Districts by opening branches at Ongole in Prakasam District and Gollapudi Near Vijayawada in Krishna District by increasing the number of branches to 13.\"},{\"year\":\"March 2020\",\"title\":\"Business Milestone\",\"description\":\"Present business levels of the bank as on 31st March 2020 is approximately Rs. 606 crores.\"}],\"innovation\":{\"title\":\"Embracing Modern Banking\",\"description\":\"We continuously invest in technology to provide you with the best banking experience\",\"cards\":[{\"title\":\"Core Banking System (CBS)\",\"description\":\"Bank implemented core banking operations (CBS) software to enable the customers to transact from any of the branches of the bank, ensuring seamless and convenient banking experience.\"},{\"title\":\"Future Digital Services\",\"description\":\"Bank is planning to introduce Mobile Banking and ATM banking in the near future, bringing modern digital banking solutions to our valued customers.\"}]},\"coverage\":{\"title\":\"Serving Across Multiple Districts\",\"cards\":[{\"title\":\"Guntur District\",\"count\":\"11 Branches\",\"details\":[\"\\u2022 Brodipet, Pattabhipuram\",\"\\u2022 Kothapet, Chandramouli Nagar\",\"\\u2022 R.Agraharam, Sattenapalli\",\"\\u2022 Chilakaluripet, Ponnur\",\"\\u2022 Tenali, Mangalagiri, Narasaraopet\"]},{\"title\":\"Krishna District\",\"count\":\"1 Branch\",\"details\":[\"\\u2022 Gollapudi (Near Vijayawada)\"]},{\"title\":\"Prakasam District\",\"count\":\"1 Branch\",\"details\":[\"\\u2022 Ongole\"]}]}}', NULL, '2025-12-09 07:02:32'),
(2, 'vision-mission', 'Vision, Mission & Values', '{\"hero\":{\"title\":\"Vision, Mission & Values\",\"subtitle\":\"Building a progressive banking institution grounded in cooperative values, operational excellence, and unwavering commitment to our customers\"},\"vision\":{\"badge\":\"Our Future Direction\",\"quote\":\"\\\"To be a progressive bank with all values of co-operation.\\\"\",\"description\":\"We envision ourselves as a forward-thinking financial institution that embraces innovation while staying rooted in cooperative principles. Our commitment is to grow progressively, serving our community with integrity and fostering sustainable economic development for generations to come.\"},\"mission\":{\"badge\":\"Our Purpose\",\"quote\":\"\\\"To deliver operational excellence through innovation, Quality, Commitment and customer service.\\\"\",\"pillars\":[{\"title\":\"Innovation\",\"description\":\"Embracing modern banking solutions and technology\"},{\"title\":\"Quality\",\"description\":\"Delivering excellence in every service we provide\"},{\"title\":\"Commitment\",\"description\":\"Dedicated to our customers\' success and growth\"},{\"title\":\"Customer Service\",\"description\":\"Providing exceptional support at every touchpoint\"}]},\"values\":{\"title\":\"Our Core Values\",\"description\":\"The fundamental principles that guide our actions, shape our culture, and define our relationship with customers and stakeholders\",\"items\":[{\"title\":\"Integrity & Professionalism\",\"description\":\"We uphold the highest standards of integrity and professionalism in all our dealings, ensuring trust and transparency with our stakeholders.\"},{\"title\":\"Simplicity\",\"description\":\"We believe in keeping banking simple and accessible, removing complexity to deliver straightforward solutions that meet our customers\' needs.\"},{\"title\":\"Team Spirit\",\"description\":\"We foster a collaborative environment where teamwork and mutual respect drive our success and enable us to serve our customers better.\"}]},\"commitment\":{\"title\":\"Our Commitment to Excellence\",\"description\":\"At Guntur Co-operative Urban Bank, our vision, mission, and values are not just words on a page \\u2013 they are the foundation of every decision we make and every service we provide. Together with our community, we build a stronger financial future.\",\"stats\":[{\"label\":\"Serving the Community\",\"value\":\"60+ Years\"},{\"label\":\"Total Business\",\"value\":\"\\u20b9606 Cr\"},{\"label\":\"Across Andhra Pradesh\",\"value\":\"13 Branches\"}]}}', NULL, NULL),
(3, 'management', 'Management', '{\"hero\":{\"title\":\"Our Leadership Team\",\"subtitle\":\"Meet the experienced professionals who guide The Guntur Co-operative Urban Bank Ltd towards excellence and sustainable growth\"},\"directors_title\":\"Our Board\",\"executives_title\":\"Co-Opted Directors & Executive Leadership\",\"chairman_role\":\"Chairman\",\"vice_chairman_role\":\"Vice - Chairman\"}', NULL, '2025-12-09 07:58:33'),
(12, 'deposits', 'Deposit Products', '{\"hero_title\":\"Deposit Products\",\"hero_description\":\"Choose from our range of deposit products designed to help you save, grow, and secure your financial future with competitive interest rates and flexible terms.\",\"deposit_types\":[{\"title\":\"Savings Deposit\",\"description\":\"Earn interest on your daily balance while enjoying easy access to your funds.\",\"features\":[\"Easy withdrawals\",\"Monthly interest credits\",\"ATM\\/Debit card facility\",\"Minimum balance: \\u20b9500\"],\"interestRate\":\"3.50% p.a.\",\"icon\":\"Wallet\"},{\"title\":\"Current Deposit\",\"description\":\"Ideal for businesses and professionals with unlimited transaction facility.\",\"features\":[\"Unlimited transactions\",\"Overdraft facility\",\"Cheque book facility\",\"No maximum limit\"],\"interestRate\":\"Non-interest bearing\",\"icon\":\"Building2\"},{\"title\":\"Fixed Deposit\",\"description\":\"Secure your future with guaranteed returns on your investment.\",\"features\":[\"Higher interest rates\",\"Flexible tenure options\",\"Loan facility available\",\"Auto-renewal option\"],\"interestRate\":\"5.50% - 7.25% p.a.\",\"icon\":\"TrendingUp\"},{\"title\":\"Recurring Deposit\",\"description\":\"Build wealth systematically with regular monthly deposits.\",\"features\":[\"Disciplined savings\",\"Flexible monthly amounts\",\"Premature withdrawal\",\"Loan facility available\"],\"interestRate\":\"6.00% - 7.00% p.a.\",\"icon\":\"RefreshCw\"},{\"title\":\"Tax Saving Fixed Deposit\",\"description\":\"Save tax under Section 80C while earning competitive returns.\",\"features\":[\"Tax deduction benefits\",\"5-year lock-in period\",\"Guaranteed returns\",\"Safe investment\"],\"interestRate\":\"6.50% p.a.\",\"icon\":\"PiggyBank\"},{\"title\":\"Bulk Deposits\",\"description\":\"Special deposit schemes for institutions and bulk depositors.\",\"features\":[\"Customized solutions\",\"Higher interest rates\",\"Flexible terms\",\"Dedicated relationship manager\"],\"interestRate\":\"Negotiable rates\",\"icon\":\"Coins\"}],\"interest_rates\":[{\"period\":\"7 days to 45 days\",\"general\":\"4.00%\",\"senior\":\"4.50%\"},{\"period\":\"46 days to 90 days\",\"general\":\"4.50%\",\"senior\":\"5.00%\"},{\"period\":\"91 days to 180 days\",\"general\":\"5.50%\",\"senior\":\"6.00%\"},{\"period\":\"181 days to 1 year\",\"general\":\"6.25%\",\"senior\":\"6.75%\"},{\"period\":\"1 year to 2 years\",\"general\":\"6.75%\",\"senior\":\"7.25%\"},{\"period\":\"2 years to 3 years\",\"general\":\"7.00%\",\"senior\":\"7.50%\"},{\"period\":\"3 years to 5 years\",\"general\":\"7.25%\",\"senior\":\"7.75%\"},{\"period\":\"Above 5 years\",\"general\":\"7.25%\",\"senior\":\"7.75%\"}],\"insurance_info\":{\"title\":\"Deposit Insurance Protection\",\"description\":\"All deposits are insured by the Deposit Insurance and Credit Guarantee Corporation (DICGC) up to \\u20b95,00,000 per depositor per bank, ensuring your savings are protected.\"}}', '2025-12-09 11:14:55', '2025-12-09 11:14:55'),
(13, 'loans', 'Loans & Advances', '{\"hero_title\":\"Loans & Advances\",\"hero_description\":\"Comprehensive loan solutions designed to meet your personal, business, and educational financing needs with competitive rates and flexible terms.\",\"loan_products\":[{\"title\":\"Home Loan\",\"description\":\"Make your dream home a reality with our affordable home loan solutions.\",\"features\":[\"Loan up to \\u20b950 Lakhs\",\"Tenure up to 20 years\",\"Competitive interest rates\",\"Minimal documentation\"],\"interestRate\":\"Starting from 8.50% p.a.\",\"icon\":\"Home\",\"color\":\"text-blue-600\",\"bgColor\":\"bg-blue-50\"},{\"title\":\"MSME Loans\",\"description\":\"Empower your small business with customized financing solutions.\",\"features\":[\"Working capital support\",\"Equipment financing\",\"Quick processing\",\"Flexible repayment\"],\"interestRate\":\"Starting from 9.25% p.a.\",\"icon\":\"Factory\",\"color\":\"text-green-600\",\"bgColor\":\"bg-green-50\"},{\"title\":\"Education Loan\",\"description\":\"Invest in education for a brighter future with our education loans.\",\"features\":[\"Cover tuition & living costs\",\"Moratorium period available\",\"Tax benefits under 80E\",\"Study in India & abroad\"],\"interestRate\":\"Starting from 9.50% p.a.\",\"icon\":\"GraduationCap\",\"color\":\"text-purple-600\",\"bgColor\":\"bg-purple-50\"},{\"title\":\"Mortgage Loan\",\"description\":\"Unlock the value of your property for any financial requirement.\",\"features\":[\"Loan against property\",\"High loan-to-value ratio\",\"Multiple end-use options\",\"Long tenure available\"],\"interestRate\":\"Starting from 9.00% p.a.\",\"icon\":\"Landmark\",\"color\":\"text-orange-600\",\"bgColor\":\"bg-orange-50\"},{\"title\":\"Project Finance\",\"description\":\"Comprehensive financing for your business expansion and project needs.\",\"features\":[\"Large ticket size\",\"Customized structures\",\"Professional evaluation\",\"Long-term support\"],\"interestRate\":\"Starting from 9.75% p.a.\",\"icon\":\"Briefcase\",\"color\":\"text-red-600\",\"bgColor\":\"bg-red-50\"},{\"title\":\"Overdraft Facility\",\"description\":\"Flexible credit facility against your fixed deposits and securities.\",\"features\":[\"Instant liquidity\",\"Pay interest on utilized amount\",\"No prepayment charges\",\"Continue earning FD interest\"],\"interestRate\":\"FD Rate + 2.00% p.a.\",\"icon\":\"CreditCard\",\"color\":\"text-indigo-600\",\"bgColor\":\"bg-indigo-50\"},{\"title\":\"Urban Swagruha Loan\",\"description\":\"Special housing loan scheme for economically weaker sections.\",\"features\":[\"Lower interest rates\",\"Government subsidy eligible\",\"Flexible terms\",\"Minimal processing fees\"],\"interestRate\":\"Starting from 7.50% p.a.\",\"icon\":\"Home\",\"color\":\"text-teal-600\",\"bgColor\":\"bg-teal-50\"},{\"title\":\"Term Deposit Loan\",\"description\":\"Avail loan against your term deposits without breaking them.\",\"features\":[\"Up to 90% of deposit value\",\"Retain FD interest\",\"Instant approval\",\"Flexible repayment\"],\"interestRate\":\"FD Rate + 1.50% p.a.\",\"icon\":\"Building\",\"color\":\"text-cyan-600\",\"bgColor\":\"bg-cyan-50\"}],\"interest_rates\":[{\"loanType\":\"Home Loan\",\"tenure\":\"Up to 20 years\",\"rate\":\"8.50% - 9.50%\"},{\"loanType\":\"MSME Loans\",\"tenure\":\"Up to 10 years\",\"rate\":\"9.25% - 11.00%\"},{\"loanType\":\"Education Loan\",\"tenure\":\"Up to 15 years\",\"rate\":\"9.50% - 10.50%\"},{\"loanType\":\"Mortgage Loan\",\"tenure\":\"Up to 15 years\",\"rate\":\"9.00% - 10.00%\"},{\"loanType\":\"Project Finance\",\"tenure\":\"Up to 12 years\",\"rate\":\"9.75% - 11.50%\"},{\"loanType\":\"Secured Overdraft\",\"tenure\":\"Renewable annually\",\"rate\":\"10.50% - 12.00%\"}],\"emi_calculator\":{\"title\":\"Calculate Your EMI\",\"description\":\"Use our EMI calculator to plan your loan repayment and make informed financial decisions.\",\"example\":{\"amount\":\"Loan Amount: \\u20b910,00,000\",\"rate\":\"Interest Rate: 9.00% p.a.\",\"tenure\":\"Tenure: 10 years\",\"emi\":\"\\u20b912,668\"}},\"eligibility\":{\"title\":\"General Eligibility\",\"items\":[\"Age: 21 to 65 years\",\"Minimum income as per loan type\",\"Good credit history\",\"Resident of India\"]},\"documents\":{\"title\":\"Required Documents\",\"items\":[\"KYC documents (Aadhaar, PAN)\",\"Income proof (last 6 months)\",\"Bank statements (last 6 months)\",\"Property documents (for secured loans)\"]},\"contact_info\":{\"title\":\"Need Help Choosing the Right Loan?\",\"description\":\"Our loan experts are here to guide you through the process and help you find the perfect loan solution for your needs.\"}}', '2025-12-13 08:00:18', '2025-12-13 08:00:18'),
(14, 'deaf-accounts', 'Deaf & Mute Account Holders', '{\"hero_title\":\"Deaf & Mute Account Holders\",\"hero_description\":\"List of Account Holders with Disability Reference Numbers\",\"info_banner\":{\"title\":\"Inclusive Banking Services\",\"description\":\"Guntur Urban Bank is committed to providing accessible banking services to all customers, including those with disabilities. We maintain a dedicated list of deaf and mute account holders with UDRN (Unique Disability Reference Numbers) for specialized support.\"}}', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int UNSIGNED NOT NULL,
  `category` enum('deposit','loan') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'deposit',
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `icon` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `summary_rate` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `features` json DEFAULT NULL,
  `rate_headers` json DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'active',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category`, `title`, `description`, `icon`, `summary_rate`, `features`, `rate_headers`, `status`, `created_at`, `updated_at`) VALUES
(1, 'deposit', 'Savings Deposit', 'Earn interest on your daily balance while enjoying easy access to your funds.', 'Wallet', '3.50% p.a.', '[\"Easy withdrawals\", \"Monthly interest credits\", \"ATM/Debit card facility\", \"Minimum balance: ₹500\"]', '[\"Period\", \"General Public\", \"Senior Citizens\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(2, 'deposit', 'Current Deposit', 'Ideal for businesses and professionals with unlimited transaction facility.', 'Building2', 'Non-interest bearing', '[\"Unlimited transactions\", \"Overdraft facility\", \"Cheque book facility\", \"No maximum limit\"]', '[\"Period\", \"General Public\", \"Senior Citizens\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(3, 'deposit', 'Fixed Deposit', 'Secure your future with guaranteed returns on your investment.', 'TrendingUp', '5.50% - 7.25% p.a.', '[\"Higher interest rates\", \"Flexible tenure options\", \"Loan facility available\", \"Auto-renewal option\"]', '[\"Period\", \"General Public\", \"Senior Citizens\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(4, 'deposit', 'Recurring Deposit', 'Build wealth systematically with regular monthly deposits.', 'RefreshCw', '6.00% - 7.00% p.a.', '[\"Disciplined savings\", \"Flexible monthly amounts\", \"Premature withdrawal\", \"Loan facility available\"]', '[\"Period\", \"General Public\", \"Senior Citizens\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(5, 'deposit', 'Tax Saving Fixed Deposit', 'Save tax under Section 80C while earning competitive returns.', 'PiggyBank', '6.50% p.a.', '[\"Tax deduction benefits\", \"5-year lock-in period\", \"Guaranteed returns\", \"Safe investment\"]', '[\"Period\", \"General Public\", \"Senior Citizens\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(6, 'deposit', 'Bulk Deposits', 'Special deposit schemes for institutions and bulk depositors.', 'Coins', 'Negotiable rates', '[\"Customized solutions\", \"Higher interest rates\", \"Flexible terms\", \"Dedicated relationship manager\"]', '[\"Period\", \"General Public\", \"Senior Citizens\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(7, 'loan', 'Home Loan', 'Make your dream home a reality with our affordable home loan solutions.', 'Home', 'Starting from 8.50% p.a.', '[\"Loan up to ₹50 Lakhs\", \"Tenure up to 20 years\", \"Competitive interest rates\", \"Minimal documentation\"]', '[\"Loan Type\", \"Tenure\", \"Interest Rate\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:16:18'),
(8, 'loan', 'MSME Loans', 'Empower your small business with customized financing solutions.', 'Factory', 'Starting from 9.25% p.a.', '[\"Working capital support\", \"Equipment financing\", \"Quick processing\", \"Flexible repayment\"]', '[\"Loan Type\", \"Tenure\", \"Interest Rate\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(9, 'loan', 'Education Loan', 'Invest in education for a brighter future with our education loans.', 'GraduationCap', 'Starting from 9.50% p.a.', '[\"Cover tuition & living costs\", \"Moratorium period available\", \"Tax benefits under 80E\", \"Study in India & abroad\"]', '[\"Loan Type\", \"Tenure\", \"Interest Rate\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(10, 'loan', 'Mortgage Loan', 'Unlock the value of your property for any financial requirement.', 'Landmark', 'Starting from 9.00% p.a.', '[\"Loan against property\", \"High loan-to-value ratio\", \"Multiple end-use options\", \"Long tenure available\"]', '[\"Loan Type\", \"Tenure\", \"Interest Rate\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(11, 'loan', 'Project Finance', 'Comprehensive financing for your business expansion and project needs.', 'Briefcase', 'Starting from 9.75% p.a.', '[\"Large ticket size\", \"Customized structures\", \"Professional evaluation\", \"Long-term support\"]', '[\"Loan Type\", \"Tenure\", \"Interest Rate\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(12, 'loan', 'Overdraft Facility', 'Flexible credit facility against your fixed deposits and securities.', 'CreditCard', 'FD Rate + 2.00% p.a.', '[\"Instant liquidity\", \"Pay interest on utilized amount\", \"No prepayment charges\", \"Continue earning FD interest\"]', '[\"Loan Type\", \"Tenure\", \"Interest Rate\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(13, 'loan', 'Urban Swagruha Loan', 'Special housing loan scheme for economically weaker sections.', 'Home', 'Starting from 7.50% p.a.', '[\"Lower interest rates\", \"Government subsidy eligible\", \"Flexible terms\", \"Minimal processing fees\"]', '[\"Loan Type\", \"Tenure\", \"Interest Rate\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(14, 'loan', 'Term Deposit Loan', 'Avail loan against your term deposits without breaking them.', 'Building', 'FD Rate + 1.50% p.a.', '[\"Up to 90% of deposit value\", \"Retain FD interest\", \"Instant approval\", \"Flexible repayment\"]', '[\"Loan Type\", \"Tenure\", \"Interest Rate\"]', 'active', '2025-12-20 07:03:27', '2025-12-20 07:03:27');

-- --------------------------------------------------------

--
-- Table structure for table `product_rates`
--

CREATE TABLE `product_rates` (
  `id` int UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `row_data` json NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_rates`
--

INSERT INTO `product_rates` (`id`, `product_id`, `row_data`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 3, '[\"7 days to 45 days\", \"4.00%\", \"4.50%\"]', 0, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(2, 3, '[\"46 days to 90 days\", \"4.50%\", \"5.00%\"]', 1, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(3, 3, '[\"91 days to 180 days\", \"5.50%\", \"6.00%\"]', 2, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(4, 3, '[\"181 days to 1 year\", \"6.25%\", \"6.75%\"]', 3, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(5, 3, '[\"1 year to 2 years\", \"6.75%\", \"7.25%\"]', 4, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(6, 3, '[\"2 years to 3 years\", \"7.00%\", \"7.50%\"]', 5, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(7, 3, '[\"3 years to 5 years\", \"7.25%\", \"7.75%\"]', 6, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(8, 3, '[\"Above 5 years\", \"7.25%\", \"7.75%\"]', 7, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(9, 5, '[\"7 days to 45 days\", \"4.00%\", \"4.50%\"]', 0, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(10, 5, '[\"46 days to 90 days\", \"4.50%\", \"5.00%\"]', 1, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(11, 5, '[\"91 days to 180 days\", \"5.50%\", \"6.00%\"]', 2, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(12, 5, '[\"181 days to 1 year\", \"6.25%\", \"6.75%\"]', 3, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(13, 5, '[\"1 year to 2 years\", \"6.75%\", \"7.25%\"]', 4, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(14, 5, '[\"2 years to 3 years\", \"7.00%\", \"7.50%\"]', 5, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(15, 5, '[\"3 years to 5 years\", \"7.25%\", \"7.75%\"]', 6, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(16, 5, '[\"Above 5 years\", \"7.25%\", \"7.75%\"]', 7, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(18, 8, '[\"MSME Loans\", \"Up to 10 years\", \"9.25% - 11.00%\"]', 1, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(19, 9, '[\"Education Loan\", \"Up to 15 years\", \"9.50% - 10.50%\"]', 2, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(20, 10, '[\"Mortgage Loan\", \"Up to 15 years\", \"9.00% - 10.00%\"]', 3, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(21, 11, '[\"Project Finance\", \"Up to 12 years\", \"9.75% - 11.50%\"]', 4, '2025-12-20 07:03:27', '2025-12-20 07:03:27'),
(24, 7, '[\"Home Loan\", \"Up to 20 years\", \"8.50% - 9.50%\"]', 0, '2025-12-20 07:16:18', '2025-12-20 07:16:18');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int UNSIGNED NOT NULL,
  `setting_key` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `setting_value` text COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `setting_key`, `setting_value`, `created_at`, `updated_at`) VALUES
(1, 'contact_email', 'sivaji@digitalks.in', '2025-12-13 13:13:46', '2025-12-20 04:37:38'),
(2, 'deposit_emails', 'sivaji@digitalks.in, rnagaraju@digitalks.in', '2025-12-19 14:59:15', '2025-12-20 04:37:38');

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `position` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `bio` text COLLATE utf8mb4_general_ci NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_members`
--

INSERT INTO `team_members` (`id`, `name`, `position`, `bio`, `image_url`, `category`, `display_order`, `created_at`, `updated_at`) VALUES
(1, 'Sri Bonaboyina Srinivasa Rao', 'Chairman', 'Sri Bonaboyina Srinivasa Rao, is a Graduate from Arts stream (B.A) He is the Chairman of The Guntur Co. operative Urban Bank Ltd since August 2016. During his term as Chairman, the bank opened 5 new branches in Guntur, Krishna and Prakasam districts i.e. Tenali, Mangalagiri, Narasaraopet, Gollapdudi and Ongole. Under his leadership and direction, the business of the bank has grown up by Rs. 270 crores. He is having 30 years experience in Cotton Business and 20 years experience in construction and other business fields.', 'uploads/management/chairman.png', 'board', 1, NULL, NULL),
(7, 'CA Sri Gabbita Sivaramakrishna Prasad Garu', 'Director', 'He is a graduate with B.com. ,FCA. He is elected as director to the bank in April 2021. Senior partner in professional chartered accountants firm, M/s Uma Maheswara Rao & co., Guntur for last 35 years. worked as jr.officer in A.P State Financial Corporation-during the year 1984till 31st march 1986. In his practice since 35 years, he conducted the statuatory centeral audit of state bank of India, Oriental bank of commerce ,Andhra bank ,Indian bank in several regional & rural banks. Conducted audit in NTPC limited, NMDC ltd, power grid corporation of India Ltd, Ecil & also in several public &private limited companies. Director in the Guntur co-operative urban bank ltd., Guntur for more than 15 years i.e (01.09.2005 to 15.08.2020)including period as administrative committees.', 'uploads/management/gabbita-prasad.png', 'board', 7, NULL, NULL),
(9, 'Sri Banda Ravindranadh', 'Director', 'was elected as a co-opted director to the bank in 2021. He was graduated from Science stream ( B.Sc.,) with additional qualifications of B.Ed and B.L. He retired from Food Corporation of India as an officer and worked in various departments of FCI with good experience. He is a good writer, in recent days he published a book with name \"GURTHUKOSTUNNAYI\"', 'uploads/management/ravindranadha.png', 'board', 9, NULL, NULL),
(12, 'Sri Nuthalapati Venkateswarlu', 'Co-Opted Director', 'Co-Opted Director of The Guntur Co-operative Urban Bank Ltd.', 'uploads/management/venkateswarlu.png', 'co-opted', 12, NULL, NULL),
(17, 'Sri Arthimalla Venkata Ratnam', 'Director', 'was elected as Director to the bank since September 2009.He is having 5 Years Experience in Construction Field and 40 Years Experience in Agriculture field.He is running a Firm with the name M/s Navodaya Constructions and completed 3 Ventures in Guntur. He is also experienced in cold storage activity.', 'uploads/management/venkata-ratnam.png', 'board', 3, NULL, NULL),
(18, 'Sri Kakani Rama Rao', 'Director', 'was elected as Director of the bank in August 2020. He is having 20 years experience in Business & Agriculture activity.', 'uploads/management/rama-rao.png', 'board', 4, NULL, NULL),
(22, 'Sri Tattukolla Kesavaiah', 'Director', 'is elected as Director to the bank in April 2021. He is having 10 Years Experience in Construction Field.', 'uploads/management/kesavaiah.png', 'board', 8, NULL, NULL),
(30, 'Sri Marreddy Basivi Reddy', 'Vice - Chairman', 'is a commerce graduate ( B.Com.) He was elected as Director to the bank in August 2011 and continuing as Director till date. He is having 20 Years Experience in Construction Field and 25 Years Experience in Agriculture. He is running a Firm with name M/s Harika Constructions and completed 11 Ventures in Guntur and Hyderabad.', 'uploads/management/vice-chairman.png', 'board', 2, NULL, NULL),
(33, 'Sri Busireddy Malleswara Reddy', 'Director', 'was elected as Director to the bank in 2021. He is having 40 years experience in Cloth Business and 20 years experience in construction field .He was the founder of \'Sai Baskar Hospitals\' Guntur.', 'uploads/management/malleswara-reddy.png', 'board', 5, NULL, NULL),
(34, 'Sri Eeresam Narendra Babu', 'Director', 'was elected as Director to the bank in 2021. He is having 20 years of experience in the construction activity.', 'uploads/management/narendra-babu.png', 'board', 6, NULL, NULL),
(38, 'Smt Rayavarapu Anuradha', 'Director', 'appointed as director in Aug-2023', 'uploads/management/anuradha.png', 'board', 10, NULL, NULL),
(39, 'Sri Shaik Saida Garu', 'Co-Opted Director', 'Co-Opted Director of The Guntur Co-operative Urban Bank Ltd.', 'uploads/management/shaik-saida.png', 'co-opted', 11, NULL, NULL),
(41, 'Sri Rachamanti Bhaskara Rao', 'Co-Opted Director', 'Co-Opted Director of The Guntur Co-operative Urban Bank Ltd.', 'uploads/management/rachamanti.png', 'co-opted', 13, NULL, NULL),
(42, 'Sri Govindaraju Sadanand', 'Chief Executive Officer', 'Chief Executive Officer of The Guntur Co-operative Urban Bank Ltd.', 'uploads/management/ceo.png', 'executive', 14, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password_hash`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$10$/e7zAfRx2Xi3C0BnPmRSf.1/pENmowXu0.yLWJOsZLq5gdqSrHyw6', '2025-12-08 12:11:30', '2025-12-08 12:11:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deaf_accounts`
--
ALTER TABLE `deaf_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `downloads`
--
ALTER TABLE `downloads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `financial_reports`
--
ALTER TABLE `financial_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery_images`
--
ALTER TABLE `gallery_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_rates`
--
ALTER TABLE `product_rates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_rates_product_id_foreign` (`product_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `deaf_accounts`
--
ALTER TABLE `deaf_accounts`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `downloads`
--
ALTER TABLE `downloads`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `financial_reports`
--
ALTER TABLE `financial_reports`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gallery_images`
--
ALTER TABLE `gallery_images`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `product_rates`
--
ALTER TABLE `product_rates`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_rates`
--
ALTER TABLE `product_rates`
  ADD CONSTRAINT `product_rates_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

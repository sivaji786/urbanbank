<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'title' => 'RTGS - Real Time Gross Settlement',
                'description' => 'Transfer large amounts instantly and securely across banks in real-time.',
                'icon' => 'ArrowRightLeft',
                'features' => json_encode([
                    'Minimum amount: ₹2 Lakhs',
                    'No maximum limit',
                    'Real-time settlement',
                    'Available during bank hours'
                ]),
                'charges' => '₹25 + GST per transaction',
                'color' => 'text-blue-600',
                'bg_color' => 'bg-blue-50',
                'status' => 'active',
                'sort_order' => 1,
            ],
            [
                'title' => 'NEFT - National Electronic Funds Transfer',
                'description' => 'Fast and secure electronic fund transfer available 24x7 throughout the year.',
                'icon' => 'Zap',
                'features' => json_encode([
                    'No minimum limit',
                    'No maximum limit',
                    'Available 24x7',
                    'Settlement in batches'
                ]),
                'charges' => 'Up to ₹10,000: ₹2.50 + GST | Above: ₹5 + GST',
                'color' => 'text-green-600',
                'bg_color' => 'bg-green-50',
                'status' => 'active',
                'sort_order' => 2,
            ],
            [
                'title' => 'Demand Drafts',
                'description' => 'Safe and secure payment instrument for local and outstation payments.',
                'icon' => 'FileText',
                'features' => json_encode([
                    'Accepted nationwide',
                    'Valid for 3 months',
                    'Cancelation facility available',
                    'Safe alternative to cash'
                ]),
                'charges' => '₹50 + GST per DD',
                'color' => 'text-purple-600',
                'bg_color' => 'bg-purple-50',
                'status' => 'active',
                'sort_order' => 3,
            ],
            [
                'title' => 'Pay Orders',
                'description' => 'Instant payment guarantee for local transactions.',
                'icon' => 'FileText',
                'features' => json_encode([
                    'Instant issuance',
                    'Local clearing only',
                    'Valid for 3 months',
                    'Cancelation available'
                ]),
                'charges' => '₹40 + GST per Pay Order',
                'color' => 'text-orange-600',
                'bg_color' => 'bg-orange-50',
                'status' => 'active',
                'sort_order' => 4,
            ],
            [
                'title' => 'Digital Banking / IMPS',
                'description' => 'Transfer money instantly 24x7 using mobile or internet banking.',
                'icon' => 'Smartphone',
                'features' => json_encode([
                    'Instant transfer 24x7',
                    'Mobile & internet banking',
                    'Up to ₹2 Lakhs per transaction',
                    'Secure with OTP verification'
                ]),
                'charges' => 'Up to ₹1,000: ₹2 + GST | Above: ₹5 + GST',
                'color' => 'text-indigo-600',
                'bg_color' => 'bg-indigo-50',
                'status' => 'active',
                'sort_order' => 5,
            ],
            [
                'title' => 'ATM / Debit Card Facility',
                'description' => 'Access your account 24x7 with our RuPay debit card.',
                'icon' => 'CreditCard',
                'features' => json_encode([
                    'Free withdrawals at our ATMs',
                    'POS & online payments',
                    'Insurance coverage',
                    'EMV chip security'
                ]),
                'charges' => 'Annual Fee: ₹100 + GST',
                'color' => 'text-red-600',
                'bg_color' => 'bg-red-50',
                'status' => 'active',
                'sort_order' => 6,
            ],
            [
                'title' => 'Locker Facility',
                'description' => 'Secure storage for your valuables with advanced security.',
                'icon' => 'Lock',
                'features' => json_encode([
                    'Multiple size options',
                    'Fire & theft protection',
                    'Insurance coverage available',
                    'CCTV surveillance'
                ]),
                'charges' => 'Starting from ₹1,500/year',
                'color' => 'text-yellow-600',
                'bg_color' => 'bg-yellow-50',
                'status' => 'active',
                'sort_order' => 7,
            ],
            [
                'title' => 'Any Branch Banking (ABB)',
                'description' => 'Access your account from any of our branches across the network.',
                'icon' => 'Building2',
                'features' => json_encode([
                    'All 13 branches enabled',
                    'Deposit & withdrawal',
                    'Account statement',
                    'No additional charges'
                ]),
                'charges' => 'Free for all customers',
                'color' => 'text-teal-600',
                'bg_color' => 'bg-teal-50',
                'status' => 'active',
                'sort_order' => 8,
            ],
        ];

        $this->db->table('services')->insertBatch($data);
    }
}

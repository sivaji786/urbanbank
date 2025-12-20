<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class DepositsPageSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'slug'    => 'deposits',
            'title'   => 'Deposit Products',
            'content' => json_encode([
                'hero_title' => 'Deposit Products',
                'hero_description' => 'Choose from our range of deposit products designed to help you save, grow, and secure your financial future with competitive interest rates and flexible terms.',
                'deposit_types' => [
                    [
                        'title' => 'Savings Deposit',
                        'description' => 'Earn interest on your daily balance while enjoying easy access to your funds.',
                        'features' => ['Easy withdrawals', 'Monthly interest credits', 'ATM/Debit card facility', 'Minimum balance: ₹500'],
                        'interestRate' => '3.50% p.a.',
                        'icon' => 'Wallet'
                    ],
                    [
                        'title' => 'Current Deposit',
                        'description' => 'Ideal for businesses and professionals with unlimited transaction facility.',
                        'features' => ['Unlimited transactions', 'Overdraft facility', 'Cheque book facility', 'No maximum limit'],
                        'interestRate' => 'Non-interest bearing',
                        'icon' => 'Building2'
                    ],
                    [
                        'title' => 'Fixed Deposit',
                        'description' => 'Secure your future with guaranteed returns on your investment.',
                        'features' => ['Higher interest rates', 'Flexible tenure options', 'Loan facility available', 'Auto-renewal option'],
                        'interestRate' => '5.50% - 7.25% p.a.',
                        'icon' => 'TrendingUp'
                    ],
                    [
                        'title' => 'Recurring Deposit',
                        'description' => 'Build wealth systematically with regular monthly deposits.',
                        'features' => ['Disciplined savings', 'Flexible monthly amounts', 'Premature withdrawal', 'Loan facility available'],
                        'interestRate' => '6.00% - 7.00% p.a.',
                        'icon' => 'RefreshCw'
                    ],
                    [
                        'title' => 'Tax Saving Fixed Deposit',
                        'description' => 'Save tax under Section 80C while earning competitive returns.',
                        'features' => ['Tax deduction benefits', '5-year lock-in period', 'Guaranteed returns', 'Safe investment'],
                        'interestRate' => '6.50% p.a.',
                        'icon' => 'PiggyBank'
                    ],
                    [
                        'title' => 'Bulk Deposits',
                        'description' => 'Special deposit schemes for institutions and bulk depositors.',
                        'features' => ['Customized solutions', 'Higher interest rates', 'Flexible terms', 'Dedicated relationship manager'],
                        'interestRate' => 'Negotiable rates',
                        'icon' => 'Coins'
                    ]
                ],
                'interest_rates' => [
                    ['period' => '7 days to 45 days', 'general' => '4.00%', 'senior' => '4.50%'],
                    ['period' => '46 days to 90 days', 'general' => '4.50%', 'senior' => '5.00%'],
                    ['period' => '91 days to 180 days', 'general' => '5.50%', 'senior' => '6.00%'],
                    ['period' => '181 days to 1 year', 'general' => '6.25%', 'senior' => '6.75%'],
                    ['period' => '1 year to 2 years', 'general' => '6.75%', 'senior' => '7.25%'],
                    ['period' => '2 years to 3 years', 'general' => '7.00%', 'senior' => '7.50%'],
                    ['period' => '3 years to 5 years', 'general' => '7.25%', 'senior' => '7.75%'],
                    ['period' => 'Above 5 years', 'general' => '7.25%', 'senior' => '7.75%']
                ],
                'insurance_info' => [
                    'title' => 'Deposit Insurance Protection',
                    'description' => 'All deposits are insured by the Deposit Insurance and Credit Guarantee Corporation (DICGC) up to ₹5,00,000 per depositor per bank, ensuring your savings are protected.'
                ]
            ]),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        // Check if page exists
        $exists = $this->db->table('pages')->where('slug', 'deposits')->countAllResults();

        if ($exists > 0) {
            $this->db->table('pages')->where('slug', 'deposits')->update($data);
        } else {
            $this->db->table('pages')->insert($data);
        }
    }
}

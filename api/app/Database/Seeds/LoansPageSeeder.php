<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class LoansPageSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'slug'    => 'loans',
            'title'   => 'Loans & Advances',
            'content' => json_encode([
                'hero_title' => 'Loans & Advances',
                'hero_description' => 'Comprehensive loan solutions designed to meet your personal, business, and educational financing needs with competitive rates and flexible terms.',
                'loan_products' => [
                    [
                        'title' => 'Home Loan',
                        'description' => 'Make your dream home a reality with our affordable home loan solutions.',
                        'features' => ['Loan up to ₹50 Lakhs', 'Tenure up to 20 years', 'Competitive interest rates', 'Minimal documentation'],
                        'interestRate' => 'Starting from 8.50% p.a.',
                        'icon' => 'Home',
                        'color' => 'text-blue-600',
                        'bgColor' => 'bg-blue-50'
                    ],
                    [
                        'title' => 'MSME Loans',
                        'description' => 'Empower your small business with customized financing solutions.',
                        'features' => ['Working capital support', 'Equipment financing', 'Quick processing', 'Flexible repayment'],
                        'interestRate' => 'Starting from 9.25% p.a.',
                        'icon' => 'Factory',
                        'color' => 'text-green-600',
                        'bgColor' => 'bg-green-50'
                    ],
                    [
                        'title' => 'Education Loan',
                        'description' => 'Invest in education for a brighter future with our education loans.',
                        'features' => ['Cover tuition & living costs', 'Moratorium period available', 'Tax benefits under 80E', 'Study in India & abroad'],
                        'interestRate' => 'Starting from 9.50% p.a.',
                        'icon' => 'GraduationCap',
                        'color' => 'text-purple-600',
                        'bgColor' => 'bg-purple-50'
                    ],
                    [
                        'title' => 'Mortgage Loan',
                        'description' => 'Unlock the value of your property for any financial requirement.',
                        'features' => ['Loan against property', 'High loan-to-value ratio', 'Multiple end-use options', 'Long tenure available'],
                        'interestRate' => 'Starting from 9.00% p.a.',
                        'icon' => 'Landmark',
                        'color' => 'text-orange-600',
                        'bgColor' => 'bg-orange-50'
                    ],
                    [
                        'title' => 'Project Finance',
                        'description' => 'Comprehensive financing for your business expansion and project needs.',
                        'features' => ['Large ticket size', 'Customized structures', 'Professional evaluation', 'Long-term support'],
                        'interestRate' => 'Starting from 9.75% p.a.',
                        'icon' => 'Briefcase',
                        'color' => 'text-red-600',
                        'bgColor' => 'bg-red-50'
                    ],
                    [
                        'title' => 'Overdraft Facility',
                        'description' => 'Flexible credit facility against your fixed deposits and securities.',
                        'features' => ['Instant liquidity', 'Pay interest on utilized amount', 'No prepayment charges', 'Continue earning FD interest'],
                        'interestRate' => 'FD Rate + 2.00% p.a.',
                        'icon' => 'CreditCard',
                        'color' => 'text-indigo-600',
                        'bgColor' => 'bg-indigo-50'
                    ],
                    [
                        'title' => 'Urban Swagruha Loan',
                        'description' => 'Special housing loan scheme for economically weaker sections.',
                        'features' => ['Lower interest rates', 'Government subsidy eligible', 'Flexible terms', 'Minimal processing fees'],
                        'interestRate' => 'Starting from 7.50% p.a.',
                        'icon' => 'Home',
                        'color' => 'text-teal-600',
                        'bgColor' => 'bg-teal-50'
                    ],
                    [
                        'title' => 'Term Deposit Loan',
                        'description' => 'Avail loan against your term deposits without breaking them.',
                        'features' => ['Up to 90% of deposit value', 'Retain FD interest', 'Instant approval', 'Flexible repayment'],
                        'interestRate' => 'FD Rate + 1.50% p.a.',
                        'icon' => 'Building',
                        'color' => 'text-cyan-600',
                        'bgColor' => 'bg-cyan-50'
                    ]
                ],
                'interest_rates' => [
                    ['loanType' => 'Home Loan', 'tenure' => 'Up to 20 years', 'rate' => '8.50% - 9.50%'],
                    ['loanType' => 'MSME Loans', 'tenure' => 'Up to 10 years', 'rate' => '9.25% - 11.00%'],
                    ['loanType' => 'Education Loan', 'tenure' => 'Up to 15 years', 'rate' => '9.50% - 10.50%'],
                    ['loanType' => 'Mortgage Loan', 'tenure' => 'Up to 15 years', 'rate' => '9.00% - 10.00%'],
                    ['loanType' => 'Project Finance', 'tenure' => 'Up to 12 years', 'rate' => '9.75% - 11.50%'],
                    ['loanType' => 'Secured Overdraft', 'tenure' => 'Renewable annually', 'rate' => '10.50% - 12.00%']
                ],
                'emi_calculator' => [
                    'title' => 'Calculate Your EMI',
                    'description' => 'Use our EMI calculator to plan your loan repayment and make informed financial decisions.',
                    'example' => [
                        'amount' => 'Loan Amount: ₹10,00,000',
                        'rate' => 'Interest Rate: 9.00% p.a.',
                        'tenure' => 'Tenure: 10 years',
                        'emi' => '₹12,668'
                    ]
                ],
                'eligibility' => [
                    'title' => 'General Eligibility',
                    'items' => [
                        'Age: 21 to 65 years',
                        'Minimum income as per loan type',
                        'Good credit history',
                        'Resident of India'
                    ]
                ],
                'documents' => [
                    'title' => 'Required Documents',
                    'items' => [
                        'KYC documents (Aadhaar, PAN)',
                        'Income proof (last 6 months)',
                        'Bank statements (last 6 months)',
                        'Property documents (for secured loans)'
                    ]
                ],
                'contact_info' => [
                    'title' => 'Need Help Choosing the Right Loan?',
                    'description' => 'Our loan experts are here to guide you through the process and help you find the perfect loan solution for your needs.'
                ]
            ]),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        // Check if page exists
        $exists = $this->db->table('pages')->where('slug', 'loans')->countAllResults();

        if ($exists > 0) {
            $this->db->table('pages')->where('slug', 'loans')->update($data);
        } else {
            $this->db->table('pages')->insert($data);
        }
    }
}

<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use App\Models\ProductModel;
use App\Models\ProductRateModel;

class ProductMigratorSeeder extends Seeder
{
    public function run()
    {
        $db = \Config\Database::connect();
        
        // Disable foreign key checks to truncate tables
        $db->query('SET FOREIGN_KEY_CHECKS=0;');
        $db->table('product_rates')->truncate();
        $db->table('products')->truncate();
        $db->query('SET FOREIGN_KEY_CHECKS=1;');

        $productModel = new ProductModel();
        $rateModel = new ProductRateModel();

        // 1. Migrate Deposits
        $depositPage = $db->table('pages')->where('slug', 'deposits')->get()->getRowArray();
        if ($depositPage) {
            $content = json_decode($depositPage['content'], true);
            $depositTypes = $content['deposit_types'] ?? $content['deposits'] ?? [];
            
            foreach ($depositTypes as $type) {
                $productId = $productModel->insert([
                    'category' => 'deposit',
                    'title' => $type['title'],
                    'description' => $type['description'],
                    'icon' => $type['icon'] ?? 'Wallet',
                    'summary_rate' => $type['interestRate'] ?? '',
                    'features' => json_encode($type['features'] ?? []),
                    'rate_headers' => json_encode($content['rate_headers'] ?? ['Period', 'General Public', 'Senior Citizens']),
                    'status' => 'active'
                ]);

                // Migrate interest rates specifically for "Fixed Deposit" or similar
                if (str_contains(strtolower($type['title']), 'fixed') && isset($content['interest_rates'])) {
                    foreach ($content['interest_rates'] as $index => $rate) {
                        // Handle different key naming if necessary
                        $rowData = [
                            $rate['period'] ?? $rate['tenure'] ?? '',
                            $rate['general'] ?? $rate['rate'] ?? '',
                            $rate['senior'] ?? ''
                        ];
                        
                        $rateModel->insert([
                            'product_id' => $productId,
                            'row_data' => json_encode($rowData),
                            'sort_order' => $index
                        ]);
                    }
                }
            }
        }

        // 2. Migrate Loans
        $loanPage = $db->table('pages')->where('slug', 'loans')->get()->getRowArray();
        if ($loanPage) {
            $content = json_decode($loanPage['content'], true);
            $loanProducts = $content['loan_products'] ?? $content['loans'] ?? [];
            
            foreach ($loanProducts as $loan) {
                $productId = $productModel->insert([
                    'category' => 'loan',
                    'title' => $loan['title'],
                    'description' => $loan['description'],
                    'icon' => $loan['icon'] ?? 'TrendingUp',
                    'summary_rate' => $loan['interestRate'] ?? '',
                    'features' => json_encode($loan['features'] ?? []),
                    'rate_headers' => json_encode(['Loan Type', 'Tenure', 'Interest Rate']), // Standardized for loans
                    'status' => 'active'
                ]);
                
                // Migrate specific loan interest rates if available
                if (isset($content['interest_rates'])) {
                    foreach ($content['interest_rates'] as $index => $rate) {
                        // Check if this rate row belongs to this loan type
                        if (isset($rate['loanType']) && str_contains(strtolower($loan['title']), strtolower($rate['loanType']))) {
                            $rateModel->insert([
                                'product_id' => $productId,
                                'row_data' => json_encode([$rate['loanType'], $rate['tenure'], $rate['rate']]),
                                'sort_order' => $index
                            ]);
                        }
                    }
                }
            }
        }
    }
}

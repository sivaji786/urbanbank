<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class SeedGoldRatesPage extends Migration
{
    public function up()
    {
        $db = \Config\Database::connect();

        // Initial content structure for Gold Rates page
        $content = [
            'hero_title' => 'Gold Loan Interest Rates.',
            'hero_description' => "Unlock the value of your assets with Guntur Urban Bank's premium gold loan programs. Experience financial freedom within minutes.",
            'matrix_title' => 'INCREASE IN PRICE OF 22 CARAT GOLD',
            'matrix_description' => 'It is observed that the price of 22 Carat Gold has gone up...'
        ];

        $data = [
            'slug' => 'gold-rates',
            'title' => 'Gold Rates',
            'content' => json_encode($content),
        ];

        $db->table('pages')->insert($data);
    }

    public function down()
    {
        $db = \Config\Database::connect();
        $db->table('pages')->where('slug', 'gold-rates')->delete();
    }
}

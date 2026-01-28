<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddCountryCodeToVisitorLogs extends Migration
{
    public function up()
    {
        $fields = [
            'country_code' => [
                'type' => 'VARCHAR',
                'constraint' => '5',
                'null' => true,
                'after' => 'country'
            ],
        ];
        $this->forge->addColumn('visitor_logs', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('visitor_logs', 'country_code');
    }
}

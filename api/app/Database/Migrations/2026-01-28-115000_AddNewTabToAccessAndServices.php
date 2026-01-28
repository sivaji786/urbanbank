<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddNewTabToAccessAndServices extends Migration
{
    public function up()
    {
        $fields = [
            'is_new_tab' => [
                'type' => 'TINYINT',
                'constraint' => 1,
                'default' => 0,
                'after' => 'link'
            ],
        ];
        $this->forge->addColumn('quick_access', $fields);
        $this->forge->addColumn('service_icons', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('quick_access', 'is_new_tab');
        $this->forge->dropColumn('service_icons', 'is_new_tab');
    }
}

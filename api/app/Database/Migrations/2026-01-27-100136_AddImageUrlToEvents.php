<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddImageUrlToEvents extends Migration
{
    public function up()
    {
        $this->forge->addColumn('events', [
            'image_url' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => true,
                'after' => 'description'
            ],
        ]);
    }

    public function down()
    {
        $this->forge->dropColumn('events', 'image_url');
    }
}

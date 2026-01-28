<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateServiceIcons extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'title' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'icon_url' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => true,
            ],
            'link' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => true,
            ],
            'order_index' => [
                'type' => 'INT',
                'constraint' => 11,
                'default' => 0,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('service_icons');

        // Seed initial data
        $data = [
            ['title' => 'IMPS', 'icon_url' => 'assets/ICONS/1.jpg', 'order_index' => 1],
            ['title' => 'NEFT / RTGS', 'icon_url' => 'assets/ICONS/3.jpg', 'order_index' => 2],
            ['title' => 'UPI', 'icon_url' => 'assets/ICONS/4.jpg', 'order_index' => 3],
            ['title' => 'RuPay', 'icon_url' => 'assets/ICONS/2.jpg', 'order_index' => 4],
            ['title' => 'Net Banking', 'icon_url' => 'assets/ICONS/5.jpg', 'order_index' => 5],
            ['title' => 'Housing Loan', 'icon_url' => 'assets/ICONS/6.jpg', 'order_index' => 6],
            ['title' => 'Gold Loan', 'icon_url' => 'assets/ICONS/7.jpg', 'order_index' => 7],
            ['title' => 'Card Locking', 'icon_url' => 'assets/ICONS/8.jpg', 'order_index' => 8],
            ['title' => 'Cyber Security', 'icon_url' => 'assets/ICONS/9.jpg', 'order_index' => 9],
            ['title' => 'Toll Free Service', 'icon_url' => 'assets/ICONS/10.jpg', 'order_index' => 10],
        ];

        $this->db->table('service_icons')->insertBatch($data);
    }

    public function down()
    {
        $this->forge->dropTable('service_icons');
    }
}

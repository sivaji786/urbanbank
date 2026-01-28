<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateQuickAccess extends Migration
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
            'subtitle' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'bg_color' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
                'null' => true,
            ],
            'icon' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
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
        $this->forge->createTable('quick_access');

        // Seed initial data
        $data = [
            [
                'title' => 'New Gold Rates',
                'subtitle' => 'Check our updated competitive gold loan interest rates',
                'bg_color' => '#0077cc',
                'icon' => '🏆',
                'link' => '#gold-rates',
                'order_index' => 1,
            ],
            [
                'title' => 'Mobile Banking',
                'subtitle' => 'Download our mobile app for secure banking anytime',
                'bg_color' => '#717d8a',
                'icon' => '📱',
                'link' => '#mobile-banking',
                'order_index' => 2,
            ],
            [
                'title' => 'Net Banking Login',
                'subtitle' => 'Securely access your accounts through net banking',
                'bg_color' => '#4a5568',
                'icon' => '🔐',
                'link' => '#net-banking',
                'order_index' => 3,
            ],
        ];

        $this->db->table('quick_access')->insertBatch($data);
    }

    public function down()
    {
        $this->forge->dropTable('quick_access');
    }
}

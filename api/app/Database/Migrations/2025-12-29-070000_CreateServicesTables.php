<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateServicesTables extends Migration
{
    public function up()
    {
        // Services Table
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
            'description' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'icon' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => true,
            ],
            'features' => [
                'type' => 'JSON',
                'null' => true,
            ],
            'charges' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => true,
            ],
            'color' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
                'null' => true,
            ],
            'bg_color' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
                'null' => true,
            ],
            'status' => [
                'type' => 'ENUM',
                'constraint' => ['active', 'inactive'],
                'default' => 'active',
            ],
            'sort_order' => [
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
        $this->forge->createTable('services');

        // Service Charges Table
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'service' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'charge' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            'status' => [
                'type' => 'ENUM',
                'constraint' => ['active', 'inactive'],
                'default' => 'active',
            ],
            'sort_order' => [
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
        $this->forge->createTable('service_charges');
    }

    public function down()
    {
        $this->forge->dropTable('service_charges');
        $this->forge->dropTable('services');
    }
}

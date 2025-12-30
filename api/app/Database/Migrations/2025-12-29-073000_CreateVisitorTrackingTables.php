<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateVisitorTrackingTables extends Migration
{
    public function up()
    {
        // Visitor Stats Table
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'total_visits' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'default' => 0,
            ],
            'unique_visitors' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'default' => 0,
            ],
            'last_updated' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('visitor_stats');

        // Insert initial row
        $this->db->table('visitor_stats')->insert([
            'total_visits' => 0,
            'unique_visitors' => 0,
            'last_updated' => date('Y-m-d H:i:s'),
        ]);

        // Visitor Logs Table
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'visitor_id' => [
                'type' => 'VARCHAR',
                'constraint' => '64',
            ],
            'ip_address' => [
                'type' => 'VARCHAR',
                'constraint' => '45',
                'null' => true,
            ],
            'user_agent' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'referrer' => [
                'type' => 'VARCHAR',
                'constraint' => '500',
                'null' => true,
            ],
            'page_url' => [
                'type' => 'VARCHAR',
                'constraint' => '500',
                'null' => true,
            ],
            'session_id' => [
                'type' => 'VARCHAR',
                'constraint' => '64',
                'null' => true,
            ],
            'is_unique' => [
                'type' => 'BOOLEAN',
                'default' => false,
            ],
            'visit_date' => [
                'type' => 'DATE',
                'null' => true,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('visitor_id');
        $this->forge->addKey('visit_date');
        $this->forge->addKey('created_at');
        $this->forge->createTable('visitor_logs');
    }

    public function down()
    {
        $this->forge->dropTable('visitor_logs');
        $this->forge->dropTable('visitor_stats');
    }
}

<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class EnhanceVisitorTracking extends Migration
{
    public function up()
    {
        // Add geolocation fields to visitor_logs
        $fields = [
            'city' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => true,
                'after' => 'ip_address'
            ],
            'country' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => true,
                'after' => 'city'
            ],
            'region' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => true,
                'after' => 'country'
            ],
            'timezone' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => true,
                'after' => 'region'
            ],
            'isp' => [
                'type' => 'VARCHAR',
                'constraint' => '200',
                'null' => true,
                'after' => 'timezone'
            ],
        ];
        $this->forge->addColumn('visitor_logs', $fields);

        // Blocked IPs Table
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'ip_address' => [
                'type' => 'VARCHAR',
                'constraint' => '45',
            ],
            'reason' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => true,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('ip_address');
        $this->forge->createTable('blocked_ips');
    }

    public function down()
    {
        $this->forge->dropTable('blocked_ips');
        $this->forge->dropColumn('visitor_logs', ['city', 'country', 'region', 'timezone', 'isp']);
    }
}

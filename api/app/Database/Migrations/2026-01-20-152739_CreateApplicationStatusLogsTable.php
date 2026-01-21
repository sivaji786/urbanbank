<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateApplicationStatusLogsTable extends Migration
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
            'application_id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
            ],
            'old_status' => [
                'type' => 'ENUM',
                'constraint' => ['open', 'in-progress', 'approved', 'rejected'],
                'null' => true,
            ],
            'new_status' => [
                'type' => 'ENUM',
                'constraint' => ['open', 'in-progress', 'approved', 'rejected'],
            ],
            'notes' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'changed_by' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'null' => true,
                'comment' => 'Admin user ID who made the change',
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('application_id', 'applications', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('application_status_logs');
    }

    public function down()
    {
        $this->forge->dropTable('application_status_logs');
    }
}

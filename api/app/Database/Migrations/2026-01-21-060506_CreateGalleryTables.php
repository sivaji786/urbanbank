<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateGalleryTables extends Migration
{
    public function up()
    {
        // 1. Create galleries table
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'title' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
            ],
            'description' => [
                'type' => 'TEXT',
                'null' => true,
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
        $this->forge->createTable('galleries');

        // 2. Modify gallery_images table
        // Add gallery_id as a foreign key
        $modifyFields = [
            'gallery_id' => [
                'type'       => 'INT',
                'constraint' => 11,
                'unsigned'   => true,
                'null'       => true,
                'after'      => 'id',
            ],
        ];
        $this->forge->addColumn('gallery_images', $modifyFields);
        
        // Add foreign key constraint
        $this->db->query("ALTER TABLE gallery_images ADD CONSTRAINT fk_gallery_id FOREIGN KEY (gallery_id) REFERENCES galleries(id) ON DELETE CASCADE");

        // Optional: Keep title and category for now to avoid breaking existing code immediately, 
        // but they will be redundant once fully migrated.
    }

    public function down()
    {
        // Drop foreign key first
        $this->db->query("ALTER TABLE gallery_images DROP FOREIGN KEY fk_gallery_id");
        $this->forge->dropColumn('gallery_images', 'gallery_id');
        $this->forge->dropTable('galleries');
    }
}

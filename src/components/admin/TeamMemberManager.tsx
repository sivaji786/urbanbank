import { ContentManager } from './ContentManager';

export function TeamMemberManager() {
    return (
        <ContentManager
            title="Team Members Management"
            resource="team-members"
            columns={[
                { key: 'name', label: 'Name' },
                { key: 'position', label: 'Position' },
                { key: 'category', label: 'Category' },
                { key: 'image_url', label: 'Image', type: 'image' },
            ]}
            fields={[
                { key: 'name', label: 'Name', type: 'text' },
                { key: 'position', label: 'Position', type: 'text' },
                { key: 'bio', label: 'Bio', type: 'textarea' },
                { key: 'image_url', label: 'Image URL', type: 'image-select' },
                { key: 'category', label: 'Category (board/executive/co-opted)', type: 'text' },
                { key: 'display_order', label: 'Display Order', type: 'text' },
            ]}
            layout="grid"
            gridCols={6}
        />
    );
}

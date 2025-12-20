import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Image as ImageIcon, ArrowLeft, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import client, { API_BASE_URL } from '../../api/client';
import { ImageSelector } from './ImageSelector';
import { toast } from 'sonner';

interface Column {
    key: string;
    label: string;
    type?: 'text' | 'date' | 'image' | 'file';
}

interface Field {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'date' | 'image' | 'image-select' | 'file';
}

interface ContentManagerProps {
    title: string;
    resource: string;
    columns: Column[];
    fields: Field[];
    layout?: 'list' | 'grid';
}

export function ContentManager({ title, resource, columns, fields, layout = 'list' }: ContentManagerProps) {
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState<'list' | 'form' | 'image-selection'>('list');
    const [currentImageField, setCurrentImageField] = useState<string | null>(null);
    const [currentItem, setCurrentItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        fetchItems();
    }, [resource]);

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const response = await client.get(`/${resource}`);
            setItems(response.data);
        } catch (error) {
            console.error('Failed to fetch items', error);
            toast.error('Failed to load items');
        }
        setIsLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                await client.delete(`/${resource}/${id}`);
                toast.success('Item deleted successfully');
                fetchItems();
            } catch (error) {
                console.error('Failed to delete item', error);
                toast.error('Failed to delete item');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentItem) {
                await client.put(`/${resource}/${currentItem.id}`, formData);
                toast.success('Item updated successfully');
            } else {
                await client.post(`/${resource}`, formData);
                toast.success('Item created successfully');
            }
            setView('list');
            fetchItems();
            setFormData({});
            setCurrentItem(null);
        } catch (error) {
            console.error('Failed to save item', error);
            toast.error('Failed to save item');
        }
    };

    const openEditForm = (item: any) => {
        setCurrentItem(item);
        setFormData(item);
        setView('form');
    };

    const openCreateForm = () => {
        setCurrentItem(null);
        setFormData({});
        setView('form');
    };

    const filteredItems = items.filter((item) =>
        columns.some((col) =>
            String(item[col.key]).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const handleImageSelect = (url: string) => {
        if (currentImageField) {
            setFormData({ ...formData, [currentImageField]: url });
        }
        setView('form');
        setCurrentImageField(null);
    };

    return (
        <div className="space-y-6">
            {view === 'list' ? (
                <>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                            <p className="text-sm text-gray-500 mt-1">Manage your {title.toLowerCase()} content</p>
                        </div>
                        <Button onClick={openCreateForm} className="bg-[#0099ff] hover:bg-[#0077cc]">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New
                        </Button>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-9"
                                />
                            </div>
                        </div>

                        {layout === 'grid' ? (
                            <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {isLoading ? (
                                    <div className="col-span-full text-center py-12 text-gray-500">Loading...</div>
                                ) : filteredItems.length === 0 ? (
                                    <div className="col-span-full text-center py-12 text-gray-500">No items found</div>
                                ) : (
                                    filteredItems.map((item) => (
                                        <Card key={item.id} className="group relative overflow-hidden">
                                            <div className="aspect-[3/4] w-full bg-gray-100 relative">
                                                {columns.find(col => col.type === 'image') && (
                                                    <img
                                                        src={(() => {
                                                            const imgCol = columns.find(col => col.type === 'image');
                                                            const val = item[imgCol!.key];
                                                            return val?.startsWith('http') ? val : `${new URL(API_BASE_URL).origin}/${val}`;
                                                        })()}
                                                        alt={item.name || 'Item'}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <Button
                                                        variant="secondary"
                                                        size="icon"
                                                        onClick={() => openEditForm(item)}
                                                        className="h-8 w-8"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-8 w-8"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                {columns.map(col => {
                                                    if (col.type === 'image') return null;
                                                    return (
                                                        <p key={col.key} className="text-sm font-medium truncate text-gray-900">
                                                            {item[col.key]}
                                                        </p>
                                                    )
                                                })}
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        ) : (
                            <div className="relative w-full overflow-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                                            {columns.map((col) => (
                                                <TableHead key={col.key} className="font-semibold text-gray-700">
                                                    {col.label}
                                                </TableHead>
                                            ))}
                                            <TableHead className="text-right font-semibold text-gray-700 w-[100px]">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isLoading ? (
                                            <TableRow>
                                                <TableCell colSpan={columns.length + 1} className="h-32 text-center text-gray-500">
                                                    Loading...
                                                </TableCell>
                                            </TableRow>
                                        ) : filteredItems.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={columns.length + 1} className="h-32 text-center text-gray-500">
                                                    No items found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredItems.map((item, index) => (
                                                <TableRow key={item.id || index} className="hover:bg-gray-50/50">
                                                    {columns.map((col) => (
                                                        <TableCell key={col.key} className="py-3">
                                                            {col.type === 'image' ? (
                                                                <div className="w-10 h-10 rounded overflow-hidden bg-gray-100">
                                                                    <img
                                                                        src={item[col.key]?.startsWith('http')
                                                                            ? item[col.key]
                                                                            : `${new URL(API_BASE_URL).origin}/${item[col.key]}`
                                                                        }
                                                                        alt="Thumbnail"
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            ) : col.type === 'file' || (item[col.key] && item[col.key].toString().includes('uploads/documents')) ? (
                                                                <a
                                                                    href={item[col.key]}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium text-[#0099ff] bg-blue-50 hover:bg-blue-100 transition-colors"
                                                                >
                                                                    <FileText className="w-4 h-4" />
                                                                    View File
                                                                </a>
                                                            ) : (
                                                                <span className="text-gray-700 font-medium">
                                                                    {item[col.key]}
                                                                </span>
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => openEditForm(item)}
                                                                className="h-8 w-8 text-gray-500 hover:text-[#0099ff] hover:bg-blue-50"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleDelete(item.id)}
                                                                className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                </>
            ) : view === 'image-selection' ? (
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <Button variant="ghost" size="icon" onClick={() => setView('form')}>
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <h2 className="text-2xl font-bold text-gray-900">Select Image</h2>
                    </div>
                    <Card className="p-6">
                        <ImageSelector
                            onSelect={handleImageSelect}
                            onCancel={() => setView('form')}
                        />
                    </Card>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <Button variant="ghost" size="icon" onClick={() => setView('list')}>
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {currentItem ? 'Edit Item' : 'Add New Item'}
                        </h2>
                    </div>

                    <Card className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {fields.map((field) => (
                                <div key={field.key}>
                                    <Label htmlFor={field.key} className="mb-2 block font-medium text-gray-700">{field.label}</Label>
                                    {field.type === 'textarea' ? (
                                        <Textarea
                                            id={field.key}
                                            value={formData[field.key] || ''}
                                            onChange={(e) =>
                                                setFormData({ ...formData, [field.key]: e.target.value })
                                            }
                                            required
                                            className="min-h-[100px]"
                                        />
                                    ) : field.type === 'image-select' ? (
                                        <div className="flex gap-2">
                                            <Input
                                                id={field.key}
                                                value={formData[field.key] || ''}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, [field.key]: e.target.value })
                                                }
                                                required
                                                readOnly
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() => {
                                                    setCurrentImageField(field.key);
                                                    setView('image-selection');
                                                }}
                                            >
                                                <ImageIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ) : field.type === 'file' ? (
                                        <div className="flex gap-2 items-center">
                                            <Input
                                                id={field.key}
                                                value={formData[field.key] || ''}
                                                readOnly
                                                placeholder="File URL will appear here"
                                                className="flex-1 bg-gray-50"
                                                required
                                            />
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;

                                                        const form = new FormData();
                                                        form.append('file', file);

                                                        try {
                                                            const toastId = toast.loading('Uploading file...');
                                                            const response = await client.post('/uploads/document', form, {
                                                                headers: {
                                                                    'Content-Type': 'multipart/form-data',
                                                                },
                                                            });
                                                            toast.dismiss(toastId);
                                                            toast.success('File uploaded successfully');
                                                            setFormData({ ...formData, [field.key]: response.data.url });
                                                        } catch (error) {
                                                            console.error('Upload failed', error);
                                                            toast.error('File upload failed');
                                                        }
                                                    }}
                                                />
                                                <Button type="button" variant="outline" className="pointer-events-none">
                                                    Upload File
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Input
                                            id={field.key}
                                            type={field.type === 'date' ? 'date' : 'text'}
                                            value={formData[field.key] || ''}
                                            onChange={(e) =>
                                                setFormData({ ...formData, [field.key]: e.target.value })
                                            }
                                            required
                                            maxLength={255}
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-end gap-2 pt-4 border-t mt-6">
                                <Button type="button" variant="outline" onClick={() => setView('list')}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-[#0099ff] hover:bg-[#0077cc]">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}

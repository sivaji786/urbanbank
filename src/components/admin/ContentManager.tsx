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
import client, { getFullUrl } from '../../api/client';
import { ImageSelector } from './ImageSelector';
import { Switch } from '../ui/switch';
import { toast } from 'sonner';

interface Column {
    key: string;
    label: string;
    type?: 'text' | 'date' | 'image' | 'file';
}

interface Field {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'date' | 'image' | 'image-select' | 'file' | 'switch';
}

interface ContentManagerProps {
    title: string;
    resource: string;
    columns: Column[];
    fields: Field[];
    layout?: 'list' | 'grid';
    gridCols?: number;
}

export function ContentManager({ title, resource, columns, fields, layout = 'list', gridCols = 4 }: ContentManagerProps) {
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState<'list' | 'form' | 'image-selection'>('list');
    const [currentImageField, setCurrentImageField] = useState<string | null>(null);
    const [currentItem, setCurrentItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});

    const getSingularTitle = () => {
        // Remove " Management" and trailing "s" if possible
        let t = title.replace(' Management', '').trim();
        if (t.endsWith('s')) {
            // Special cases
            if (t === 'News') return 'News';
            return t.slice(0, -1);
        }
        return t;
    };

    const singularTitle = getSingularTitle();

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

    const handleImageSelect = (url: string | string[]) => {
        if (currentImageField) {
            const finalUrl = Array.isArray(url) ? url[0] : url;
            setFormData({ ...formData, [currentImageField]: finalUrl });
        }
        setView('form');
        setCurrentImageField(null);
    };

    return (
        <div className="space-y-4 animate-in fade-in duration-700 font-['Inter']">
            {view === 'list' ? (
                <>
                    <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
                        <div>
                            <h2 className="text-[28px] font-black text-gray-900 tracking-tighter leading-tight font-['Poppins']">{title}</h2>
                            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Institutional management protocol</p>
                        </div>
                        <Button onClick={openCreateForm} className="bg-[#0099ff] hover:bg-black text-[9px] font-black px-6 h-10 rounded-xl shadow-md uppercase tracking-[0.2em] transition-all duration-300">
                            <Plus className="w-4 h-4 mr-2" />
                            Provision New
                        </Button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-[#F1F5F9] overflow-hidden">
                        <div className="p-4 border-b border-[#F1F5F9] flex items-center gap-4 bg-[#F8FAFC]/50">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                <Input
                                    placeholder="LOCATE RECORD..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-10 text-[11px] font-black border-[#E5E7EB] bg-white rounded-xl placeholder:text-[#CBD5E1] tracking-widest uppercase"
                                />
                            </div>
                        </div>

                        {layout === 'grid' ? (
                            <div className={`p-4 grid gap-4 ${gridCols === 6
                                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
                                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
                                {isLoading ? (
                                    <div className="col-span-full text-center py-10 text-[#64748B] font-medium text-[12px]">
                                        <div className="animate-pulse">SYNCHRONIZING REPOSITORY...</div>
                                    </div>
                                ) : filteredItems.length === 0 ? (
                                    <div className="col-span-full text-center py-10 text-[#94A3B8] font-medium text-[12px] uppercase tracking-wider border-2 border-dashed border-[#F1F5F9] rounded-xl">
                                        No items found in active stream
                                    </div>
                                ) : (
                                    filteredItems.map((item) => (
                                        <Card key={item.id} className="group relative overflow-hidden rounded-xl border-[#E5E7EB] shadow-none hover:border-[#0099FF] transition-all duration-300">
                                            <div className="aspect-[3/4] w-full bg-[#F8FAFC] relative overflow-hidden">
                                                {columns.find(col => col.type === 'image') && (
                                                    <img
                                                        src={getFullUrl(item[columns.find(col => col.type === 'image')!.key])}
                                                        alt={item.name || 'Item'}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[1px]">
                                                    <Button
                                                        variant="secondary"
                                                        size="icon"
                                                        onClick={() => openEditForm(item)}
                                                        className="h-8 w-8 bg-white hover:bg-[#F1F8FF] text-[#0099ff] border-none shadow-md rounded-lg"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-8 w-8 bg-white hover:bg-red-50 text-red-600 border-none shadow-md rounded-lg"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-white">
                                                {columns.map(col => {
                                                    if (col.type === 'image') return null;
                                                    return (
                                                        <p key={col.key} className="text-[12px] font-medium truncate text-[#0F172A]">
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
                                        <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E5E7EB]">
                                            {columns.map((col) => (
                                                <TableHead key={col.key} className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                    {col.label}
                                                </TableHead>
                                            ))}
                                            <TableHead className="text-right py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-[100px]">Protocol</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isLoading ? (
                                            <TableRow>
                                                <TableCell colSpan={columns.length + 1} className="h-40 text-center text-[#94A3B8] font-black text-[10px] uppercase tracking-[0.3em] animate-pulse">
                                                    SYNCHRONIZING...
                                                </TableCell>
                                            </TableRow>
                                        ) : filteredItems.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={columns.length + 1} className="h-40 text-center text-[#94A3B8] font-black text-[10px] uppercase tracking-widest">
                                                    Zero institutional records detected
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredItems.map((item, index) => (
                                                <TableRow key={item.id || index} className="hover:bg-blue-50/30 transition-colors border-b border-[#F1F5F9] last:border-0 group">
                                                    {columns.map((col) => (
                                                        <TableCell key={col.key} className="py-3 px-4">
                                                            {col.type === 'image' ? (
                                                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F8FAFC] border border-[#F1F5F9] group-hover:scale-105 transition-transform duration-500 shadow-sm">
                                                                    <img
                                                                        src={getFullUrl(item[col.key])}
                                                                        alt="Thumbnail"
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            ) : col.type === 'file' || (item[col.key] && item[col.key].toString().includes('uploads/documents')) ? (
                                                                <a
                                                                    href={item[col.key]}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black text-[#0099ff] bg-blue-50 hover:bg-[#0099ff] hover:text-white transition-all border border-blue-100 uppercase tracking-widest"
                                                                >
                                                                    <FileText className="w-3.5 h-3.5" />
                                                                    View Doc
                                                                </a>
                                                            ) : (
                                                                <span className="text-gray-900 font-bold text-[13px] tracking-tight">
                                                                    {item[col.key]}
                                                                </span>
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                    <TableCell className="text-right py-3 px-4">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => openEditForm(item)}
                                                                className="h-9 w-9 text-gray-400 hover:text-[#0099ff] hover:bg-blue-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-blue-100"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleDelete(item.id)}
                                                                className="h-9 w-9 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-red-100"
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
                <div className="max-w-5xl mx-auto py-2">
                    <div className="flex items-center gap-3 mb-6">
                        <Button variant="ghost" size="icon" onClick={() => setView('form')} className="hover:bg-blue-50 text-[#0099ff] rounded-lg h-9 w-9">
                            <ArrowLeft className="w-4.5 h-4.5" />
                        </Button>
                        <h2 className="text-[20px] font-semibold text-[#0F172A] font-['Poppins']">Repository Access</h2>
                    </div>
                    <Card className="p-6 rounded-2xl border-[#E5E7EB] shadow-lg overflow-hidden">
                        <ImageSelector
                            onSelect={handleImageSelect}
                            onCancel={() => setView('form')}
                        />
                    </Card>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto py-2">
                    <div className="flex items-center gap-3 mb-6">
                        <Button variant="ghost" size="icon" onClick={() => setView('list')} className="hover:bg-blue-50 text-[#0099ff] rounded-lg h-9 w-9">
                            <ArrowLeft className="w-4.5 h-4.5" />
                        </Button>
                        <h2 className="text-[20px] font-semibold text-[#0F172A] font-['Poppins']">
                            {currentItem ? `Modify ${singularTitle}` : `Create ${singularTitle}`}
                        </h2>
                    </div>

                    <Card className="p-6 rounded-2xl border-[#E5E7EB] shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {fields.map((field) => (
                                <div key={field.key} className="space-y-1">
                                    <Label htmlFor={field.key} className="text-[12px] font-semibold text-[#334155] uppercase tracking-wider ml-0.5">{field.label}</Label>
                                    {field.type === 'textarea' ? (
                                        <Textarea
                                            id={field.key}
                                            value={formData[field.key] || ''}
                                            onChange={(e) =>
                                                setFormData({ ...formData, [field.key]: e.target.value })
                                            }
                                            required
                                            className="min-h-[100px] rounded-lg border-[#E5E7EB] text-[13px] leading-relaxed placeholder:text-[#CBD5E1] focus:ring-2 focus:ring-[#0099ff]/10 transition-all px-3 py-2"
                                            placeholder={`Provide detailed ${field.label.toLowerCase()}...`}
                                        />
                                    ) : field.type === 'image-select' ? (
                                        <div className="flex gap-2 text-sm">
                                            <Input
                                                id={field.key}
                                                value={formData[field.key] || ''}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, [field.key]: e.target.value })
                                                }
                                                required
                                                readOnly
                                                className="h-9 rounded-lg border-[#E5E7EB] bg-[#F8FAFC] text-[12px] px-3"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="h-9 w-9 rounded-lg border-[#E5E7EB] text-[#0099ff] hover:bg-blue-50 shrink-0"
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
                                                placeholder="Link securely established..."
                                                className="flex-1 h-9 bg-[#F8FAFC] border-[#E5E7EB] rounded-lg text-[12px] px-3"
                                                required
                                            />
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;

                                                        const form = new FormData();
                                                        form.append('file', file);

                                                        try {
                                                            const toastId = toast.loading('Establishing secure link...');
                                                            const response = await client.post('uploads/document', form, {
                                                                headers: {
                                                                    'Content-Type': 'multipart/form-data',
                                                                },
                                                            });
                                                            toast.dismiss(toastId);
                                                            toast.success('Document linked successfully');
                                                            setFormData({ ...formData, [field.key]: response.data.url });
                                                        } catch (error) {
                                                            console.error('Upload failed', error);
                                                            toast.error('Data synchronization failed');
                                                        }
                                                    }}
                                                />
                                                <Button type="button" variant="outline" className="h-9 rounded-lg border-[#E5E7EB] text-[#0099ff] hover:bg-blue-50 font-medium text-[12px] px-3">
                                                    ATTACH
                                                </Button>
                                            </div>
                                        </div>
                                    ) : field.type === 'switch' ? (
                                        <div className="flex items-center space-x-2 py-2">
                                            <Switch
                                                id={field.key}
                                                checked={formData[field.key] === '1' || formData[field.key] === 1 || formData[field.key] === true}
                                                onCheckedChange={(checked: boolean) =>
                                                    setFormData({ ...formData, [field.key]: checked ? '1' : '0' })
                                                }
                                            />
                                            <Label htmlFor={field.key} className="text-xs font-medium text-slate-500 lowercase">
                                                {formData[field.key] === '1' || formData[field.key] === 1 || formData[field.key] === true ? 'Enabled' : 'Disabled'}
                                            </Label>
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
                                            className="h-9 rounded-lg border-[#E5E7EB] text-[13px] focus:ring-2 focus:ring-[#0099ff]/10 transition-all font-medium px-3"
                                            maxLength={255}
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-end gap-3 pt-6 border-t border-[#F1F5F9] mt-8">
                                <Button type="button" variant="outline" onClick={() => setView('list')} className="h-10 px-6 rounded-xl border-[#E5E7EB] text-gray-500 font-black text-[9px] uppercase tracking-[0.2em] hover:bg-gray-50 transition-all">
                                    DISCARD CHANGES
                                </Button>
                                <Button type="submit" className="h-10 px-8 rounded-xl bg-[#0099ff] hover:bg-black text-white font-black text-[9px] uppercase tracking-[0.2em] shadow-lg shadow-blue-100 transition-all duration-300">
                                    SAVE REPOSITORY
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}

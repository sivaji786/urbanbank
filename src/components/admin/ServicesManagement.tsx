import { useState, useEffect } from 'react';
import { Plus, Trash2, AlertCircle, Check, ArrowLeft, Save, Loader2, List, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import client from '../../api/client';

interface Service {
    id?: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
    charges: string;
    color: string;
    bg_color: string;
    status: 'active' | 'inactive';
    sort_order: number;
}

type ViewState = 'list' | 'add' | 'edit';

const iconOptions = [
    'ArrowRightLeft', 'Zap', 'FileText', 'Smartphone', 'CreditCard',
    'Lock', 'Building2', 'Wallet', 'TrendingUp', 'Shield', 'DollarSign'
];

const colorOptions = [
    { value: 'text-blue-600', bg: 'bg-blue-50', label: 'Blue' },
    { value: 'text-green-600', bg: 'bg-green-50', label: 'Green' },
    { value: 'text-purple-600', bg: 'bg-purple-50', label: 'Purple' },
    { value: 'text-orange-600', bg: 'bg-orange-50', label: 'Orange' },
    { value: 'text-indigo-600', bg: 'bg-indigo-50', label: 'Indigo' },
    { value: 'text-red-600', bg: 'bg-red-50', label: 'Red' },
    { value: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Yellow' },
    { value: 'text-teal-600', bg: 'bg-teal-50', label: 'Teal' },
];

export function ServicesManagement() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [view, setView] = useState<ViewState>('list');
    const [editingItem, setEditingItem] = useState<Service | null>(null);

    const [formData, setFormData] = useState<Service>({
        title: '',
        description: '',
        icon: 'ArrowRightLeft',
        features: [''],
        charges: '',
        color: 'text-blue-600',
        bg_color: 'bg-blue-50',
        status: 'active',
        sort_order: 0
    });

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await client.get('services');
            setServices(response.data);
        } catch (err) {
            console.error('Failed to fetch services:', err);
            setError('Failed to load services. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingItem(null);
        setSuccess(null);
        setError(null);
        setFormData({
            title: '',
            description: '',
            icon: 'ArrowRightLeft',
            features: [''],
            charges: '',
            color: 'text-blue-600',
            bg_color: 'bg-blue-50',
            status: 'active',
            sort_order: services.length + 1
        });
        setView('add');
        window.scrollTo(0, 0);
    };

    const handleEdit = (item: Service) => {
        setEditingItem(item);
        setSuccess(null);
        setError(null);
        setFormData({
            ...item,
            features: (item.features && item.features.length > 0) ? item.features : ['']
        });
        setView('edit');
        window.scrollTo(0, 0);
    };

    const handleBackToList = () => {
        setView('list');
        setEditingItem(null);
        setError(null);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this service?')) {
            return;
        }

        try {
            await client.delete(`/services/${id}`);
            setServices(services.filter(item => item.id !== id));
            setSuccess('Service deleted successfully.');
        } catch (err) {
            setError('Failed to delete service.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const cleanedData = {
            ...formData,
            features: formData.features.filter(f => f.trim() !== '')
        };

        try {
            if (editingItem?.id) {
                await client.put(`/services/${editingItem.id}`, cleanedData);
                setSuccess('Service updated successfully.');
            } else {
                await client.post('services', cleanedData);
                setSuccess('Service added successfully.');
            }
            setView('list');
            fetchServices();
            window.scrollTo(0, 0);
        } catch (err) {
            setError('Failed to save service. Please check your inputs.');
        } finally {
            setSubmitting(false);
        }
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ''] });
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const removeFeature = (index: number) => {
        setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
    };

    if (view === 'add' || view === 'edit') {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                    <Button variant="outline" size="icon" onClick={handleBackToList} className="rounded-full h-10 w-10 border-gray-300 hover:bg-gray-100">
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {view === 'edit' ? `Edit ${formData.title}` : 'Add New Service'}
                        </h2>
                        <p className="text-gray-500 text-sm">Configure service details and features</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 max-w-5xl mx-auto">
                    <Card className="p-5 border-gray-100 shadow-lg shadow-gray-200/50 rounded-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Zap className="w-5 h-5 text-[#0099ff]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Service Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title" className="text-gray-700 font-semibold">Service Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. RTGS - Real Time Gross Settlement"
                                        className="h-11 rounded-xl"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description" className="text-gray-700 font-semibold">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="A short description of the service..."
                                        rows={4}
                                        className="rounded-xl resize-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="icon" className="text-gray-700 font-semibold">Icon</Label>
                                    <Select value={formData.icon} onValueChange={(val) => setFormData({ ...formData, icon: val })}>
                                        <SelectTrigger className="h-11 rounded-xl">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {iconOptions.map(icon => (
                                                <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="charges" className="text-gray-700 font-semibold">Charges</Label>
                                    <Input
                                        id="charges"
                                        value={formData.charges}
                                        onChange={e => setFormData({ ...formData, charges: e.target.value })}
                                        placeholder="e.g. ₹25 + GST per transaction"
                                        className="h-11 rounded-xl"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="color" className="text-gray-700 font-semibold">Color Theme</Label>
                                    <Select
                                        value={formData.color}
                                        onValueChange={(val) => {
                                            const selected = colorOptions.find(c => c.value === val);
                                            setFormData({ ...formData, color: val, bg_color: selected?.bg || 'bg-blue-50' });
                                        }}
                                    >
                                        <SelectTrigger className="h-11 rounded-xl">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {colorOptions.map(color => (
                                                <SelectItem key={color.value} value={color.value}>{color.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-6 mt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <List className="w-5 h-5 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Key Features</h3>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={addFeature} className="rounded-full gap-1">
                                <Plus className="h-3 w-3" /> Add Feature
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                            {formData.features.map((feature, idx) => (
                                <div key={idx} className="flex gap-2 group">
                                    <div className="h-10 w-10 bg-gray-50 rounded-lg flex items-center justify-center text-sm font-bold text-gray-400 shrink-0">
                                        {idx + 1}
                                    </div>
                                    <Input
                                        value={feature}
                                        onChange={e => updateFeature(idx, e.target.value)}
                                        placeholder={`Feature ${idx + 1}`}
                                        className="h-10 rounded-lg"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFeature(idx)}
                                        disabled={formData.features.length === 1}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="grid gap-2">
                                <Label htmlFor="status" className="text-gray-700 font-semibold">Status</Label>
                                <Select value={formData.status} onValueChange={(val: any) => setFormData({ ...formData, status: val })}>
                                    <SelectTrigger className="h-11 rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="sort_order" className="text-gray-700 font-semibold">Sort Order</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    value={formData.sort_order}
                                    onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                                    className="h-11 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6">
                            <Button type="button" variant="outline" onClick={handleBackToList} disabled={submitting} className="h-10 px-8 rounded-xl font-medium text-gray-600">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-[#0099ff] hover:bg-[#0077cc] h-10 px-8 rounded-xl font-bold text-md shadow-xl shadow-blue-500/20" disabled={submitting}>
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5 mr-2" /> Save Service
                                    </>
                                )}
                            </Button>
                        </div>
                    </Card>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-5 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-1">
                <div className="flex-1 min-w-0">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Services</h2>
                    <p className="text-gray-500 mt-1 text-lg">Manage banking services</p>
                </div>
                <Button onClick={handleAdd} className="bg-[#0099ff] hover:bg-[#0077cc] h-12 px-6 rounded-xl font-bold shadow-lg shadow-blue-500/20 gap-2">
                    <Plus className="h-5 w-5" />
                    Add Service
                </Button>
            </div>

            {success && (
                <Alert className="bg-green-50 border-green-100 text-green-800 rounded-xl shadow-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertDescription className="font-medium ml-2">{success}</AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert variant="destructive" className="rounded-xl shadow-sm">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-bold ml-2">Error</AlertTitle>
                    <AlertDescription className="ml-2">{error}</AlertDescription>
                </Alert>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center h-96 gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-[#0099ff]" />
                    <p className="text-gray-400 font-medium">Loading services...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {services.length === 0 ? (
                        <div className="text-center py-32 bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Plus className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No services found</h3>
                            <p className="text-gray-500 mb-6">Get started by creating your first service.</p>
                            <Button onClick={handleAdd} variant="outline" className="h-10 border-gray-300">
                                Create New Service
                            </Button>
                        </div>
                    ) : (
                        services.map((service) => (
                            <Card key={service.id} className="p-6 hover:shadow-2xl transition-all duration-300 border-gray-100 rounded-2xl group bg-white">
                                <div className="flex flex-col h-full">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`p-3 ${service.bg_color} rounded-2xl`}>
                                                <Zap className={`w-8 h-8 ${service.color}`} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-black text-gray-900 leading-tight">{service.title}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide ${service.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                        {service.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>

                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Features</h4>
                                            <ul className="space-y-1">
                                                {service.features?.slice(0, 3).map((f, i) => (
                                                    <li key={i} className="text-gray-700 text-xs font-medium flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0099ff]" /> {f}
                                                    </li>
                                                ))}
                                                {(service.features?.length || 0) > 3 && (
                                                    <li className="text-gray-400 text-xs font-medium pl-3.5">+{service.features.length - 3} more...</li>
                                                )}
                                            </ul>
                                        </div>

                                        <div className="text-sm text-gray-600">
                                            <span className="font-semibold">Charges:</span> {service.charges}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                                        <Button variant="outline" onClick={() => handleEdit(service)} className="h-11 flex-1 rounded-xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 font-bold text-gray-700">
                                            Edit
                                        </Button>
                                        <Button variant="ghost" onClick={() => handleDelete(service.id!)} className="h-11 flex-1 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 font-bold">
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

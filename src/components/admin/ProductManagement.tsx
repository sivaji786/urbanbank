import { useState, useEffect } from 'react';
import { Plus, Trash2, AlertCircle, Check, Layout, List, Table as TableIcon, X, ArrowLeft, Save, Loader2, Coins, Receipt, Percent } from 'lucide-react';
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
import { cn } from '../ui/utils';

interface RateRow {
    row_data: string[];
    sort_order?: number;
}

interface Product {
    id?: number;
    category: 'deposit' | 'loan';
    title: string;
    description: string;
    icon: string;
    summary_rate: string;
    features: string[];
    rate_headers: string[];
    rates: RateRow[];
    status: 'active' | 'inactive';
    image_url?: string;
}

type ViewState = 'list' | 'add' | 'edit';

interface ProductManagementProps {
    category: 'deposit' | 'loan';
}

export function ProductManagement({ category }: ProductManagementProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [view, setView] = useState<ViewState>('list');
    const [editingItem, setEditingItem] = useState<Product | null>(null);

    const [formData, setFormData] = useState<Product>({
        category: category,
        title: '',
        description: '',
        icon: category === 'deposit' ? 'Wallet' : 'TrendingUp',
        summary_rate: '',
        features: [''],
        rate_headers: category === 'deposit' ? ['Period', 'General Public', 'Senior Citizens'] : ['Loan Amount', 'Interest Rate', 'Tenure'],
        rates: [{ row_data: ['', '', ''] }],
        status: 'active'
    });

    const [submitting, setSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await client.get(`/products?category=${category}`);
            setProducts(response.data);
        } catch (err) {
            console.error('Failed to fetch products:', err);
            setError('Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingItem(null);
        setSuccess(null);
        setError(null);
        setFormData({
            category: category,
            title: '',
            description: '',
            icon: category === 'deposit' ? 'Wallet' : 'TrendingUp',
            summary_rate: '',
            features: [''],
            rate_headers: category === 'deposit' ? ['Period', 'General Public', 'Senior Citizens'] : ['Loan Amount', 'Interest Rate', 'Tenure'],
            rates: [{ row_data: ['', '', ''] }],
            status: 'active'
        });
        setSelectedImage(null);
        setImagePreview(null);
        setView('add');
        window.scrollTo(0, 0);
    };

    const handleEdit = (item: Product) => {
        setEditingItem(item);
        setSuccess(null);
        setError(null);
        setFormData({
            ...item,
            features: (item.features && item.features.length > 0) ? item.features : [''],
            rate_headers: (item.rate_headers && item.rate_headers.length > 0) ? item.rate_headers : ['Header'],
            rates: (item.rates && item.rates.length > 0) ? item.rates : [{ row_data: Array(item.rate_headers?.length || 1).fill('') }]
        });
        setSelectedImage(null);
        setImagePreview(item.image_url || null);
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
        if (!window.confirm('Are you sure you want to delete this product? All associated interest rates will be removed.')) {
            return;
        }

        try {
            await client.delete(`/products/${id}`);
            setProducts(products.filter(item => item.id !== id));
            setSuccess('Product deleted successfully.');
        } catch (err) {
            setError('Failed to delete product.');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        // Filter out empty features or rate rows
        const cleanedFeatures = formData.features.filter(f => f.trim() !== '');
        const cleanedRates = formData.rates.map(r => ({
            ...r,
            row_data: r.row_data.map(val => val.trim())
        })).filter(r => r.row_data.some(val => val !== ''));

        const data = new FormData();
        data.append('category', formData.category);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('icon', formData.icon);
        data.append('summary_rate', formData.summary_rate);
        data.append('status', formData.status);
        data.append('features', JSON.stringify(cleanedFeatures));
        data.append('rate_headers', JSON.stringify(formData.rate_headers));
        data.append('rates', JSON.stringify(cleanedRates));

        if (selectedImage) {
            data.append('image', selectedImage);
        }

        try {
            if (editingItem?.id) {
                // Use POST for updates when uploading files (CodeIgniter handles multipart better with POST)
                await client.post(`/products/${editingItem.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setSuccess('Product updated successfully.');
            } else {
                await client.post('products', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setSuccess('Product added successfully.');
            }
            setView('list');
            fetchProducts();
            window.scrollTo(0, 0);
        } catch (err) {
            console.error('Submit error:', err);
            setError('Failed to save product. Please check your inputs.');
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

    const addRateRow = () => {
        setFormData({
            ...formData,
            rates: [...formData.rates, { row_data: Array(formData.rate_headers.length).fill('') }]
        });
    };

    const updateRateData = (rowIndex: number, colIndex: number, value: string) => {
        const newRates = [...formData.rates];
        newRates[rowIndex].row_data[colIndex] = value;
        setFormData({ ...formData, rates: newRates });
    };

    const removeRateRow = (index: number) => {
        setFormData({ ...formData, rates: formData.rates.filter((_, i) => i !== index) });
    };

    const updateHeader = (index: number, value: string) => {
        const newHeaders = [...formData.rate_headers];
        newHeaders[index] = value;
        setFormData({ ...formData, rate_headers: newHeaders });
    };

    const addHeader = () => {
        setFormData({
            ...formData,
            rate_headers: [...formData.rate_headers, `Header ${formData.rate_headers.length + 1}`],
            rates: formData.rates.map(r => ({ ...r, row_data: [...r.row_data, ''] }))
        });
    };

    const removeHeader = (index: number) => {
        if (formData.rate_headers.length <= 1) return;
        setFormData({
            ...formData,
            rate_headers: formData.rate_headers.filter((_, i) => i !== index),
            rates: formData.rates.map(r => ({ ...r, row_data: r.row_data.filter((_, i) => i !== index) }))
        });
    };

    if (view === 'add' || view === 'edit') {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center gap-4 pb-4">
                    <Button variant="ghost" size="icon" onClick={handleBackToList} className="h-9 w-9 rounded-full hover:bg-slate-50 border border-slate-200 shadow-none">
                        <ArrowLeft className="h-4 w-4 text-slate-400" />
                    </Button>
                    <div>
                        <h2 className="text-[20px] font-semibold text-slate-900 leading-tight">
                            {view === 'edit' ? `Edit ${formData.title}` : `New ${category === 'deposit' ? 'Deposit' : 'Loan'} Configuration`}
                        </h2>
                        <p className="text-sm font-normal text-gray-500 tracking-wide mt-0.5">Define institutional {formData.category} parameters</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="animate-in slide-in-from-bottom-4 duration-700 w-full mx-auto pb-20">
                    <div className="flex flex-col md:flex-row gap-8 items-start w-full">

                        {/* Left Column: Basic Parameters (30%) */}
                        <div className="flex-1 shrink-0 space-y-6">
                            <Card className="p-6 border-slate-200 shadow-none rounded-2xl bg-white">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                                        <Receipt className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <h3 className="text-md font-semibold text-slate-900 uppercase tracking-[0.12em]">Basic Institutional Parameters</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">Product Nomenclature</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="e.g. Senior Citizen Fixed Deposit"
                                            className="h-11 text-[13px] rounded-xl border-slate-200 focus-visible:ring-blue-500/20 shadow-none"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">Executive Summary</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Brief technical overview..."
                                            rows={5}
                                            className="text-[13px] rounded-xl resize-none min-h-[120px] border-slate-200 focus-visible:ring-blue-500/20 shadow-none leading-relaxed"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">Branding Asset</Label>
                                        <div className="flex flex-col gap-4">
                                            {imagePreview && (
                                                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        className="absolute top-2 right-2 rounded-full h-8 w-8 bg-white/90 border-slate-200 backdrop-blur-sm"
                                                        onClick={() => {
                                                            setSelectedImage(null);
                                                            setImagePreview(null);
                                                        }}
                                                    >
                                                        <X className="h-4 w-4 text-slate-400" />
                                                    </Button>
                                                </div>
                                            )}
                                            <div className="flex items-center justify-center w-full">
                                                <label className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-slate-50 transition-all ${imagePreview ? 'border-slate-200' : 'border-slate-200 bg-slate-50/50 hover:border-blue-400/50'}`}>
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Layout className="w-8 h-8 text-slate-300 mb-2" />
                                                        <p className="text-[13px] text-slate-600 font-semibold">Deploy Portfolio Asset</p>
                                                        <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-tighter">PNG · JPG · WEBP (MAX 2MB)</p>
                                                    </div>
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="summary_rate" className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">Highlighted Yield</Label>
                                        <div className="relative">
                                            <Percent className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-300" />
                                            <Input
                                                id="summary_rate"
                                                value={formData.summary_rate}
                                                onChange={e => setFormData({ ...formData, summary_rate: e.target.value })}
                                                placeholder="e.g. 7.50% p.a."
                                                className="pl-10 h-11 text-[13px] rounded-xl border-slate-200 focus-visible:ring-blue-500/20 shadow-none font-semibold"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="status" className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">Operational Status</Label>
                                        <Select value={formData.status} onValueChange={(val: any) => setFormData({ ...formData, status: val })}>
                                            <SelectTrigger className="h-11 text-[13px] border-slate-200 rounded-xl shadow-none focus:ring-blue-500/20 bg-slate-50/30">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                                                <SelectItem value="active" className="text-[13px]">Operational (Active)</SelectItem>
                                                <SelectItem value="inactive" className="text-[13px]">Restricted (Inactive)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right Column: Features & Rates (70%) */}
                        <div className="basis-[70%] space-y-6 min-w-0">
                            {/* Features Card */}
                            <Card className="p-4 border-slate-200 shadow-none rounded-2xl bg-white">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                                            <List className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <h3 className="text-md font-semibold text-slate-900 uppercase tracking-[0.12em]">Product Features</h3>
                                    </div>
                                    <Button type="button" variant="outline" size="sm" onClick={addFeature} className="h-10 text-sm font-semibold uppercase tracking-wider border-slate-200 shadow-none rounded-xl hover:bg-blue-100 px-5">
                                        <Plus className="h-4 w-4 mr-2" /> Add Module
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    {formData.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 group mb-3">
                                            <div className="h-11 w-11 bg-slate-50 rounded-3xl p-2 flex items-center justify-center text-sm font-semibold text-slate-400 shrink-0 border border-slate-100 shadow-sm">
                                                {String(idx + 1).padStart(2, '0')}
                                            </div>
                                            <div className="flex-1">
                                                <Input
                                                    value={feature}
                                                    onChange={e => updateFeature(idx, e.target.value)}
                                                    placeholder={`Enter feature ${idx + 1}`}
                                                    className="h-11 text-[13px] rounded-xl border-slate-200 focus-visible:ring-blue-500/20 shadow-none"
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeFeature(idx)}
                                                disabled={formData.features.length === 1}
                                                className="h-11 w-11 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shrink-0 border border-transparent hover:border-red-100"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Rate Card Table */}
                            <Card className="p-8 border-slate-200 shadow-none rounded-2xl bg-white overflow-hidden">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                                            <Coins className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <h3 className="text-md font-semibold text-slate-900 uppercase tracking-[0.12em]">Interest Configuration</h3>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button type="button" variant="outline" size="sm" onClick={addHeader} className="h-10 text-sm font-semibold uppercase tracking-wider border-slate-200 shadow-none rounded-xl hover:bg-blue-100 font-['Inter']">
                                            <Layout className="w-4 h-4 mr-2" /> Add Column
                                        </Button>
                                        <Button type="button" variant="outline" size="sm" onClick={addRateRow} className="h-10 text-sm font-semibold uppercase tracking-wider border-slate-200 shadow-none rounded-xl hover:bg-blue-100">
                                            <List className="w-4 h-4 mr-2" /> Add Row
                                        </Button>
                                    </div>
                                </div>

                                <div className="overflow-x-auto border border-slate-100 rounded-2xl bg-slate-50/30">
                                    <table className="w-full text-[13px]">
                                        <thead>
                                            <tr className="bg-slate-100/50">
                                                {formData.rate_headers.map((header, colIdx) => (
                                                    <th key={colIdx} className="p-4 min-w-[180px] border-b border-slate-200">
                                                        <div className="flex items-center gap-2">
                                                            <Input
                                                                value={header}
                                                                onChange={e => updateHeader(colIdx, e.target.value)}
                                                                className="h-10 text-[11px] font-black uppercase tracking-widest border-slate-200 bg-white focus-visible:ring-blue-500/20 shadow-none rounded-lg text-slate-600"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-10 w-10 text-slate-300 hover:text-red-500 shrink-0 hover:bg-red-100 rounded-lg"
                                                                onClick={() => removeHeader(colIdx)}
                                                                disabled={formData.rate_headers.length === 1}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </th>
                                                ))}
                                                <th className="w-16 p-4 border-b border-slate-200"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.rates.map((rate, rowIdx) => (
                                                <tr key={rowIdx} className="hover:bg-white transition-colors border-b border-slate-100 last:border-0 group">
                                                    {rate.row_data.map((val, colIdx) => (
                                                        <td key={colIdx} className="p-4">
                                                            <Input
                                                                value={val}
                                                                onChange={e => updateRateData(rowIdx, colIdx, e.target.value)}
                                                                className="h-11 text-[13px] border-transparent hover:border-slate-200 focus:border-blue-400/50 bg-transparent focus:bg-white transition-all shadow-none rounded-lg font-medium"
                                                                placeholder="Data entry..."
                                                            />
                                                        </td>
                                                    ))}
                                                    <td className="p-4 text-center">
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-10 w-10 text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all rounded-lg"
                                                            onClick={() => removeRateRow(rowIdx)}
                                                            disabled={formData.rates.length === 1}
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>

                            {/* Actions Container */}
                            <div className="flex items-center justify-end gap-4 py-8 px-2">
                                <Button type="button" variant="ghost" onClick={handleBackToList} disabled={submitting} className="h-12 px-8 rounded-xl text-[12px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                                    Discard Changes
                                </Button>
                                <Button type="submit" className="bg-[#0099ff] hover:bg-[#0077cc] h-12 px-12 rounded-xl text-[12px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]" disabled={submitting}>
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin mr-3" /> COMMITTING...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5 mr-3" /> RECONCILE PRODUCT
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-6 space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1 pl-1">
                    <h2 className="text-xl font-semibold text-slate-900 leading-tight">
                        {category === 'deposit' ? 'Deposit' : 'Loan'} Management
                    </h2>
                    <p className="text-[13px] font-normal text-gray-500 tracking-wide">
                        Configure institutional {category} portfolios and rate tiers
                    </p>
                </div>
                <Button onClick={handleAdd} className="bg-[#0099ff] hover:bg-[#0077cc] h-9 px-5 rounded-lg font-semibold shadow-none gap-2 text-xs uppercase tracking-wider">
                    <Plus className="h-4 w-4" />
                    ADD {category === 'deposit' ? 'DEPOSIT' : 'LOAN'}
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
                    <p className="text-gray-400 font-medium">Loading products...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {products.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-slate-200">
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                <Plus className="w-6 h-6 text-slate-300" />
                            </div>
                            <h3 className="text-md font-semibold text-slate-900 mb-1">No {category} schemes found</h3>
                            <p className="text-sm text-slate-400 mb-6">Initialize your first production {category} scheme.</p>
                            <Button onClick={handleAdd} variant="outline" className="h-9 border-slate-200 text-xs font-semibold uppercase tracking-wider">
                                NEW {category === 'deposit' ? 'DEPOSIT' : 'LOAN'}
                            </Button>
                        </div>
                    ) : (
                        products.map((product) => (
                            <Card key={product.id} className="p-5 border-slate-200 rounded-xl bg-white shadow-none transition-all hover:border-slate-300 group">
                                <div className="flex flex-col flex-1 min-w-0">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden group-hover:bg-slate-100 transition-colors">
                                                {product.image_url ? (
                                                    <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Layout className="w-5 h-5 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-[17px] font-semibold text-blue-400 leading-tight mb-1">{product.title}</h3>
                                                <div className="flex items-center gap-2">
                                                    <span className={cn(
                                                        "px-2 py-1 rounded text-md font-semibold tracking-wider",
                                                        product.status === 'active' ? 'bg-blue-50 text-blue-500 border border-blue-100' : 'bg-slate-50 text-slate-500 border border-slate-200'
                                                    )}>
                                                        {product.status}
                                                    </span>
                                                    <span className="text-slate-300 text-sm">•</span>
                                                    <span className="text-slate-400 text-sm font-semibold tracking-widest">{product.category} Scheme</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 mb-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                            <div>
                                                <h4 className="text-sm text-gray-400 uppercase tracking-[0.08em] mb-4 flex items-center gap-1">
                                                    <List className="w-3 h-3" /> Scheme Features
                                                </h4>
                                                <ul className="space-y-1">
                                                    {product.features?.slice(0, 3).map((f, i) => (
                                                        <li key={i} className="text-slate-600 text-[12px] font-medium flex items-center gap-2">
                                                            <div className="w-1 h-1 rounded-full bg-blue-500" /> {f}
                                                        </li>
                                                    ))}
                                                    {(product.features?.length || 0) > 3 && (
                                                        <li className="text-slate-400 text-[11px] font-medium pl-3">+{product.features.length - 3} further</li>
                                                    )}
                                                </ul>
                                            </div>
                                            <div className="sm:border-l border-slate-200 sm:pl-4">
                                                <h4 className="text-sm text-gray-400 uppercase tracking-[0.08em] mb-4 flex items-center gap-1.5">
                                                    <Percent className="w-3 h-3" /> Yield Overview
                                                </h4>
                                                <p className="text-2xl font-semibold text-slate-900 tracking-tight leading-none mb-1">{product.summary_rate}</p>
                                                <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">
                                                    {product.rates?.length || 0} Tier Matrix
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-5">
                                        <Button variant="outline" onClick={() => handleEdit(product)} className="h-9 flex-1 rounded-lg border-slate-200 hover:bg-slate-50 font-semibold text-md uppercase tracking-wider text-slate-600 shadow-none">
                                            Edit
                                        </Button>
                                        <Button variant="ghost" onClick={() => handleDelete(product.id!)} className="h-9 flex-1 rounded-lg text-slate-400 border-slate-200 bg-blue-50 hover:text-red-600 hover:bg-red-50 font-semibold text-md uppercase tracking-wider">
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

export default ProductManagement;

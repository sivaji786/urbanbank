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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        // Filter out empty features or rate rows
        const cleanedData = {
            ...formData,
            features: formData.features.filter(f => f.trim() !== ''),
            rates: formData.rates.map(r => ({
                ...r,
                row_data: r.row_data.map(val => val.trim())
            })).filter(r => r.row_data.some(val => val !== ''))
        };

        try {
            if (editingItem?.id) {
                await client.put(`/products/${editingItem.id}`, cleanedData);
                setSuccess('Product updated successfully.');
            } else {
                await client.post('/products', cleanedData);
                setSuccess('Product added successfully.');
            }
            setView('list');
            fetchProducts();
            window.scrollTo(0, 0);
        } catch (err) {
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
                <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
                    <Button variant="outline" size="icon" onClick={handleBackToList} className="rounded-full h-10 w-10 border-gray-300 hover:bg-gray-100">
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{view === 'edit' ? 'Edit Product' : 'Add New Product'}</h2>
                        <p className="text-gray-500 text-sm">Configure {formData.category} details and features</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
                    {/* Basic Info Card */}
                    <Card className="p-8 border-gray-100 shadow-lg shadow-gray-200/50 rounded-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Receipt className="w-5 h-5 text-[#0099ff]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="title" className="text-gray-700 font-semibold">Product Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Senior Citizen Fixed Deposit"
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
                                        placeholder="A short, catchy summary for the product card..."
                                        rows={4}
                                        className="rounded-xl resize-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="summary_rate" className="text-gray-700 font-semibold">Highlighted Rate</Label>
                                    <div className="relative">
                                        <Percent className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="summary_rate"
                                            value={formData.summary_rate}
                                            onChange={e => setFormData({ ...formData, summary_rate: e.target.value })}
                                            placeholder="e.g. 7.50% p.a."
                                            className="pl-10 h-11 rounded-xl"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Display value for the main product card.</p>
                                </div>
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
                            </div>
                        </div>
                    </Card>

                    {/* Features Card */}
                    <Card className="p-8 border-gray-100 shadow-lg shadow-gray-200/50 rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </Card>

                    {/* Rate Card Table */}
                    <Card className="p-8 border-gray-100 shadow-lg shadow-gray-200/50 rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-50 rounded-lg">
                                    <Coins className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Interest Rate Card</h3>
                                    <p className="text-sm text-gray-500">Define table structure and data.</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="button" variant="outline" size="sm" onClick={addHeader} className="rounded-full gap-1">
                                    <Layout className="w-3 h-3" /> Add Column
                                </Button>
                                <Button type="button" variant="outline" size="sm" onClick={addRateRow} className="rounded-full gap-1">
                                    <List className="w-3 h-3" /> Add Row
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto border rounded-xl bg-gray-50/30">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-100/50 border-b border-gray-200">
                                        {formData.rate_headers.map((header, colIdx) => (
                                            <th key={colIdx} className="p-3 min-w-[200px]">
                                                <div className="flex gap-2">
                                                    <Input
                                                        value={header}
                                                        onChange={e => updateHeader(colIdx, e.target.value)}
                                                        className="h-9 font-bold border-gray-300 bg-white"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-9 w-9 text-gray-400 hover:text-red-500 shrink-0"
                                                        onClick={() => removeHeader(colIdx)}
                                                        disabled={formData.rate_headers.length === 1}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </th>
                                        ))}
                                        <th className="w-12 p-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.rates.map((rate, rowIdx) => (
                                        <tr key={rowIdx} className="border-b border-gray-100 bg-white last:border-0 hover:bg-gray-50/50">
                                            {rate.row_data.map((val, colIdx) => (
                                                <td key={colIdx} className="p-3">
                                                    <Input
                                                        value={val}
                                                        onChange={e => updateRateData(rowIdx, colIdx, e.target.value)}
                                                        className="h-10 border-transparent hover:border-gray-200 focus:border-[#0099ff] bg-transparent focus:bg-white transition-all"
                                                        placeholder="Value"
                                                    />
                                                </td>
                                            ))}
                                            <td className="p-3">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 text-gray-300 hover:text-red-500"
                                                    onClick={() => removeRateRow(rowIdx)}
                                                    disabled={formData.rates.length === 1}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <div className="flex justify-end gap-4 pt-6 pb-20">
                        <Button type="button" variant="outline" onClick={handleBackToList} disabled={submitting} className="h-12 px-8 rounded-xl font-medium text-gray-600">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-[#0099ff] hover:bg-[#0077cc] h-12 px-8 rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20" disabled={submitting}>
                            {submitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" /> Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" /> Save Product
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-1">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">{category === 'deposit' ? 'Deposits' : 'Loans'}</h2>
                    <p className="text-gray-500 mt-1 text-lg">Manage {category === 'deposit' ? 'deposit' : 'loan'} products and interest rates</p>
                </div>
                <Button onClick={handleAdd} className="bg-[#0099ff] hover:bg-[#0077cc] h-12 px-6 rounded-xl font-bold shadow-lg shadow-blue-500/20 gap-2">
                    <Plus className="h-5 w-5" />
                    Add {category === 'deposit' ? 'Deposit' : 'Loan'}
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
                <div className="grid grid-cols-1 gap-6">
                    {products.length === 0 ? (
                        <div className="text-center py-32 bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Plus className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No {category}s found</h3>
                            <p className="text-gray-500 mb-6">Get started by creating your first {category} product.</p>
                            <Button onClick={handleAdd} variant="outline" className="h-10 border-gray-300">
                                Create New {category === 'deposit' ? 'Deposit' : 'Loan'}
                            </Button>
                        </div>
                    ) : (
                        products.map((product) => (
                            <Card key={product.id} className="p-8 hover:shadow-xl transition-all duration-300 border-gray-100 rounded-[2rem] group bg-white">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="p-3 bg-[#0099ff]/10 rounded-2xl group-hover:bg-[#0099ff] transition-colors duration-300">
                                                <Layout className="w-8 h-8 text-[#0099ff] group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-gray-900 leading-tight">{product.title}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {product.status}
                                                    </span>
                                                    <span className="text-gray-400 text-xs">•</span>
                                                    <span className="text-gray-500 text-sm font-medium">{product.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-base mb-6 leading-relaxed max-w-2xl">{product.description}</p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                            <div>
                                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <List className="w-3 h-3" /> Key Features
                                                </h4>
                                                <ul className="space-y-2">
                                                    {product.features?.slice(0, 3).map((f, i) => (
                                                        <li key={i} className="text-gray-700 text-sm font-medium flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#0099ff]" /> {f}
                                                        </li>
                                                    ))}
                                                    {(product.features?.length || 0) > 3 && (
                                                        <li className="text-gray-400 text-xs font-medium pl-3.5">+{product.features.length - 3} more features...</li>
                                                    )}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <TableIcon className="w-3 h-3" /> Rates Overview
                                                </h4>
                                                <p className="text-3xl font-black text-gray-900 tracking-tight text-[#0099ff]">{product.summary_rate}</p>
                                                <p className="text-xs text-gray-500 font-medium mt-1">
                                                    {product.rates?.length || 0} configured rate rows
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                                        <Button variant="outline" onClick={() => handleEdit(product)} className="h-12 w-full md:w-32 rounded-xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 font-bold text-gray-700">
                                            Edit
                                        </Button>
                                        <Button variant="ghost" onClick={() => handleDelete(product.id!)} className="h-12 w-full md:w-32 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 font-bold">
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

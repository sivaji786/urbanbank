import { useState, useEffect } from 'react';
import { Plus, Trash2, AlertCircle, Check, List, X, Save, Loader2, Coins, Layout } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import client from '../../api/client';

interface RateRow {
    row_data: string[];
}

interface GoldRateScheme {
    id?: number;
    title: string;
    description: string;
    headers: string[];
    rows: RateRow[];
    status: 'active' | 'inactive';
}

export function GoldRatesManagement() {
    const [schemes, setSchemes] = useState<GoldRateScheme[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState<GoldRateScheme>({
        headers: ['Gold Loan /Jewel Loan period', 'Product Code', 'Rate of Interest', 'Present value per gram of 22 carat gold Rs.', 'Proposed value per gram of 22 carat gold Rs.'],
        rows: [{ row_data: ['', '', '', '', ''] }],
        status: 'active'
    });

    useEffect(() => {
        fetchSchemes();
    }, []);

    const fetchSchemes = async () => {
        setLoading(true);
        try {
            const response = await client.get('gold-rates');
            setSchemes(response.data);
        } catch (err) {
            console.error('Failed to fetch gold rates:', err);
            setError('Failed to load gold rates.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setFormData({
            headers: ['Gold Loan /Jewel Loan period', 'Product Code', 'Rate of Interest', 'Present value per gram of 22 carat gold Rs.', 'Proposed value per gram of 22 carat gold Rs.'],
            rows: [{ row_data: ['', '', '', '', ''] }],
            status: 'active'
        });
        setIsEditing(true);
        setSuccess(null);
        setError(null);
    };

    const handleEdit = (scheme: GoldRateScheme) => {
        setFormData({ ...scheme });
        setIsEditing(true);
        setSuccess(null);
        setError(null);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this gold rate scheme?')) return;
        try {
            await client.delete(`gold-rates/${id}`);
            setSchemes(schemes.filter(s => s.id !== id));
            setSuccess('Scheme deleted successfully.');
        } catch (err) {
            setError('Failed to delete scheme.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (formData.id) {
                await client.put(`gold-rates/${formData.id}`, formData);
                setSuccess('Gold rates updated successfully.');
            } else {
                await client.post('gold-rates', formData);
                setSuccess('Gold rates created successfully.');
            }
            setIsEditing(false);
            fetchSchemes();
        } catch (err) {
            console.error('Submit error:', err);
            setError('Failed to save gold rates.');
        } finally {
            setSubmitting(false);
        }
    };

    const addRow = () => {
        setFormData({
            ...formData,
            rows: [...formData.rows, { row_data: Array(formData.headers.length).fill('') }]
        });
    };

    const updateRowData = (rowIndex: number, colIndex: number, value: string) => {
        const newRows = [...formData.rows];
        newRows[rowIndex].row_data[colIndex] = value;
        setFormData({ ...formData, rows: newRows });
    };

    const removeRow = (index: number) => {
        if (formData.rows.length <= 1) return;
        setFormData({
            ...formData,
            rows: formData.rows.filter((_, i) => i !== index)
        });
    };

    const addHeader = () => {
        const newHeaders = [...formData.headers, 'New Column'];
        const newRows = formData.rows.map(row => ({
            ...row,
            row_data: [...row.row_data, '']
        }));
        setFormData({ ...formData, headers: newHeaders, rows: newRows });
    };

    const updateHeader = (index: number, value: string) => {
        const newHeaders = [...formData.headers];
        newHeaders[index] = value;
        setFormData({ ...formData, headers: newHeaders });
    };

    const removeHeader = (index: number) => {
        if (formData.headers.length <= 1) return;
        const newHeaders = formData.headers.filter((_, i) => i !== index);
        const newRows = formData.rows.map(row => ({
            ...row,
            row_data: row.row_data.filter((_, i) => i !== index)
        }));
        setFormData({ ...formData, headers: newHeaders, rows: newRows });
    };

    if (isEditing) {
        return (
            <div className="p-4 lg:p-6 space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} className="rounded-full shadow-none border border-slate-200">
                        <X className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold text-slate-900">
                        {formData.id ? 'Edit' : 'New'} Gold Rate Scheme
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
                    <Card className="p-6 border-slate-200 shadow-none rounded-2xl bg-blue-50/30">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Column Configuration</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addHeader} className="h-8 rounded-lg gap-2 text-[10px] font-bold uppercase tracking-widest border-blue-100 text-blue-600 hover:bg-blue-50">
                                    <Plus className="w-3.5 h-3.5" /> Append Column
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {formData.headers.map((header, i) => (
                                    <div key={i} className="flex gap-2">
                                        <Input
                                            value={header}
                                            onChange={e => updateHeader(i, e.target.value)}
                                            className="h-9 rounded-lg shadow-none text-xs font-bold"
                                            placeholder={`Header ${i + 1}`}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeHeader(i)}
                                            className="h-9 w-9 text-slate-300 hover:text-red-500 shrink-0"
                                            disabled={formData.headers.length <= 1}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 border-slate-200 shadow-none rounded-2xl overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                                    <Coins className="w-5 h-5 text-slate-400" />
                                </div>
                                <h3 className="text-md font-semibold text-slate-900 uppercase tracking-wider">Rate Matrix</h3>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={addRow} className="h-10 rounded-xl gap-2 font-semibold">
                                <Plus className="w-4 h-4" /> Add Row
                            </Button>
                        </div>

                        <div className="overflow-x-auto border border-slate-100 rounded-xl">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50">
                                    <tr>
                                        {formData.headers.map((header, i) => (
                                            <th key={i} className="p-4 border-b border-slate-200 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                        <th className="p-4 border-b border-slate-200 w-16"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="border-b border-slate-50 group hover:bg-slate-50/50 transition-colors">
                                            {row.row_data.map((val, colIndex) => (
                                                <td key={colIndex} className="p-2">
                                                    <Input
                                                        value={val}
                                                        onChange={e => updateRowData(rowIndex, colIndex, e.target.value)}
                                                        className="h-10 border-transparent bg-transparent hover:border-slate-200 focus:bg-white shadow-none rounded-lg"
                                                        placeholder="..."
                                                    />
                                                </td>
                                            ))}
                                            <td className="p-2 text-center">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeRow(rowIndex)}
                                                    className="h-8 w-8 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} className="rounded-xl px-8 uppercase text-xs font-bold tracking-widest text-slate-400">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={submitting} className="bg-[#0099ff] hover:bg-[#0077cc] rounded-xl px-10 gap-2 font-bold uppercase text-xs tracking-widest shadow-lg shadow-blue-500/20">
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Scheme
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-6 space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-slate-900">Gold Rates Management</h2>
                    <p className="text-[13px] text-gray-500">Configure and update gold loan interest rate tables</p>
                </div>
                <Button onClick={handleAdd} className="bg-[#0099ff] hover:bg-[#0077cc] h-9 px-5 rounded-lg font-semibold gap-2 text-xs uppercase tracking-wider">
                    <Plus className="h-4 w-4" /> Add New Scheme
                </Button>
            </div>

            {success && (
                <Alert className="bg-green-50 border-green-100 text-green-800 rounded-xl">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertDescription className="ml-2 font-medium">{success}</AlertDescription>
                </Alert>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-[#0099ff]" />
                    <p className="text-slate-400 text-sm">Loading gold rates...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {schemes.length === 0 ? (
                        <Card className="p-12 text-center border-dashed border-2 border-slate-200 bg-slate-50/50 rounded-2xl">
                            <Layout className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <h3 className="text-slate-900 font-semibold mb-1">No gold rate schemes yet</h3>
                            <p className="text-slate-400 text-sm mb-6">Create your first scheme to display on the website.</p>
                            <Button onClick={handleAdd} variant="outline" className="border-slate-200 text-xs font-bold uppercase">
                                Initialize First Scheme
                            </Button>
                        </Card>
                    ) : (
                        schemes.map(scheme => (
                            <Card key={scheme.id} className="p-5 border-slate-200 rounded-xl bg-white shadow-none hover:border-slate-300 transition-all group">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Coins className="w-4 h-4 text-[#0099ff]" />
                                            <h3 className="text-md font-bold text-slate-900 uppercase tracking-tight">Rate Matrix Index #{scheme.id}</h3>
                                        </div>
                                        <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                                            <span className="flex items-center gap-1.5"><List className="w-3.5 h-3.5" /> {scheme.rows.length} Data Points</span>
                                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-500 border border-blue-100">{scheme.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(scheme)} className="h-8 rounded-lg font-bold uppercase text-[10px] tracking-widest border-slate-200">
                                            Edit
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(scheme.id!)} className="h-8 rounded-lg font-bold uppercase text-[10px] tracking-widest text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100">
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

export default GoldRatesManagement;

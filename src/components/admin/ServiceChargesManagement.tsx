import { useState, useEffect } from 'react';
import { Plus, Trash2, AlertCircle, Check, Pencil, Loader2, ArrowLeft, Receipt, Coins, Save, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
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
import { DataTable, Column } from '../ui/DataTable';
import { cn } from '../ui/utils';

interface ServiceCharge {
    id?: number;
    service: string;
    charge: string;
    status: 'active' | 'inactive';
    sort_order: number;
}

export function ServiceChargesManagement() {
    const [serviceCharges, setServiceCharges] = useState<ServiceCharge[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
    const [editingItem, setEditingItem] = useState<ServiceCharge | null>(null);
    const [formData, setFormData] = useState<ServiceCharge>({
        service: '',
        charge: '',
        status: 'active',
        sort_order: 0
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchServiceCharges();
    }, []);

    const fetchServiceCharges = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await client.get('service-charges');
            setServiceCharges(response.data);
        } catch (err) {
            console.error('Failed to fetch service charges:', err);
            setError('Failed to load service charges. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingItem(null);
        setSuccess(null);
        setError(null);
        setFormData({
            service: '',
            charge: '',
            status: 'active',
            sort_order: serviceCharges.length + 1
        });
        setView('add');
    };

    const handleEdit = (item: ServiceCharge) => {
        setEditingItem(item);
        setSuccess(null);
        setError(null);
        setFormData({ ...item });
        setView('edit');
    };

    const handleBackToList = () => {
        setView('list');
        setEditingItem(null);
        setSuccess(null);
        setError(null);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this service charge?')) {
            return;
        }

        try {
            await client.delete(`/service-charges/${id}`);
            setServiceCharges(serviceCharges.filter(item => item.id !== id));
            setSuccess('Service charge deleted successfully.');
        } catch (err) {
            setError('Failed to delete service charge.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            if (editingItem?.id) {
                await client.put(`/service-charges/${editingItem.id}`, formData);
                setSuccess('Service charge updated successfully.');
            } else {
                await client.post('service-charges', formData);
                setSuccess('Service charge added successfully.');
            }
            setView('list');
            fetchServiceCharges();
        } catch (err) {
            setError('Failed to save service charge. Please check your inputs.');
        } finally {
            setSubmitting(false);
        }
    };

    const columns: Column<ServiceCharge>[] = [
        {
            header: 'Service',
            cell: (charge) => (
                <span className="font-bold text-[#0F172A]">{charge.service}</span>
            )
        },
        {
            header: 'Charge',
            accessorKey: 'charge',
            className: 'text-slate-600'
        },
        {
            header: 'Status',
            cell: (charge) => (
                <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap",
                    charge.status === 'active'
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-slate-50 text-slate-400 border border-slate-100"
                )}>
                    {charge.status}
                </span>
            )
        },
        {
            header: 'Order',
            accessorKey: 'sort_order',
            className: 'text-center font-medium text-slate-500'
        },
        {
            header: 'Actions',
            headerClassName: 'text-right',
            className: 'text-right',
            cell: (charge) => (
                <div className="flex items-center justify-end gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(charge)}
                        className="h-7 w-7 p-0 text-slate-400 hover:text-[#0099ff] hover:bg-blue-50"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(charge.id!)}
                        className="h-7 w-7 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            )
        }
    ];

    if (view === 'add' || view === 'edit') {
        return (
            <div className="animate-in fade-in duration-500 pb-20 max-w-4xl mx-auto px-4">
                <div className="flex items-center gap-6 mb-12 mt-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBackToList}
                        className="h-12 w-12 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-all shrink-0"
                    >
                        <ArrowLeft className="h-6 w-6 text-slate-600" />
                    </Button>
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900 leading-tight tracking-tight">
                            {view === 'edit' ? `Modify Tariff` : 'New Service Charge'}
                        </h2>
                        <p className="text-base font-medium text-slate-400 mt-1">Configure institutional tariff and fee parameters</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="animate-in slide-in-from-bottom-8 duration-700">
                    <Card className="overflow-hidden border-slate-200 rounded-2xl bg-white">
                        <div className="p-6 border-b border-slate-50">
                            <div className="flex items-center gap-5 mb-12">
                                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                    <Receipt className="w-7 h-7 text-[#0099ff]" />
                                </div>
                                <div className="px-2">
                                    <h3 className="text-xl font-bold text-slate-900 leading-tight">Tariff Details</h3>
                                    <p className="text-md font-semibold text-gray-400 tracking-[0.2em] mt-1.5">Official service charge configuration</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2">
                                <div className="space-y-3 md:col-span-2 mb-4">
                                    <Label htmlFor="service" className="text-sm font-semibold text-slate-500 uppercase tracking-widest ml-1">Service Nomenclature</Label>
                                    <Input
                                        id="service"
                                        value={formData.service}
                                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                                        placeholder="e.g. International Wire Transfer"
                                        className="h-12 text-lg px-8 rounded-2xl border-slate-200 focus-visible:ring-[#0099ff]/20 focus-visible:border-[#0099ff] bg-slate-50/50 transition-all font-medium placeholder:text-slate-300"
                                        required
                                    />
                                </div>

                                <div className="space-y-2 px-2">
                                    <Label htmlFor="charge" className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Tariff Amount</Label>
                                    <div className="relative">
                                        <Input
                                            id="charge"
                                            value={formData.charge}
                                            onChange={e => setFormData({ ...formData, charge: e.target.value })}
                                            placeholder="e.g. ₹250 + GST"
                                            className="h-12 pl-[12px] pr-8 text-md rounded-2xl border-slate-200 focus-visible:ring-[#0099ff]/20 focus-visible:border-[#0099ff] bg-slate-50/50 transition-all font-semibold placeholder:text-slate-300"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sort_order" className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Display Priority</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={formData.sort_order}
                                        onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                                        className="h-12 px-8 text-lg rounded-2xl border-slate-200 focus-visible:ring-[#0099ff]/20 focus-visible:border-[#0099ff] bg-slate-50/50 transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-3 md:col-span-2 mt-4">
                                    <Label htmlFor="status" className="text-sm font-semibold text-slate-500 uppercase tracking-widest ml-1">Deployment Status</Label>
                                    <Select value={formData.status} onValueChange={(val: any) => setFormData({ ...formData, status: val })}>
                                        <SelectTrigger className="h-12 px-8 text-md rounded-2xl border-slate-200 focus:ring-[#0099ff]/20 bg-slate-50/50 font-medium transition-all">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-2xl border-slate-200 shadow-2xl p-2">
                                            <SelectItem value="active" className="rounded-xl h-12 transition-colors focus:bg-emerald-50 focus:text-emerald-700">Operational (Active)</SelectItem>
                                            <SelectItem value="inactive" className="rounded-xl h-12 transition-colors focus:bg-slate-100 focus:text-slate-700">Restricted (Inactive)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-2 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-8 pb-4">
                            <div className="flex items-center gap-4 text-slate-400 group">
                                <div className="p-2 bg-white rounded-lg border border-slate-200 group-hover:border-blue-200 transition-colors">
                                    <AlertCircle className="w-5 h-5 text-slate-400 group-hover:text-[#0099ff]" />
                                </div>
                                <span className="text-sm font-semibold uppercase tracking-[0.15em] leading-tight max-w-[200px]">Review all figures before committing</span>
                            </div>
                            <div className="flex items-center gap-5 w-full sm:w-auto">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={handleBackToList}
                                    className="h-12 px-10 rounded-2xl text-xs font-semibold border-2 border-slate-200 mr-2 text-slate-400 hover:text-slate-600 hover:bg-white transition-all flex-1 sm:flex-none uppercase tracking-[0.2em]"
                                >
                                    Discard
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-[#0099ff] hover:bg-black h-12 px-14 rounded-2xl text-xs font-semibold uppercase tracking-[0.25em] shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] flex-1 sm:flex-none text-white"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin mr-3" /> COMMITTING...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-6 h-6 mr-3" /> {view === 'edit' ? 'Update Tariff' : 'Commit Charge'}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-in fade-in duration-300 mb-4 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-4">
                <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tighter leading-tight font-['Poppins']">Service Charges</h2>
                    <p className="text-sm font-black text-slate-400 tracking-widest mt-1">Commercial tariff and fee protocol</p>
                </div>
                <Button onClick={handleAdd} className="bg-[#0099ff] hover:bg-black text-sm font-semibold px-6 h-10 rounded-xl shadow-md uppercase tracking-[0.2em] transition-all duration-300 gap-2">
                    <Plus className="h-4 w-4" />
                    Add Service Charge
                </Button>
            </div>

            {success && (
                <Alert className="bg-green-50 border-green-100 text-green-800 rounded-xl shadow-sm py-2 px-4 mb-4">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-xs font-bold ml-2 uppercase tracking-wide">{success}</AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert variant="destructive" className="rounded-xl shadow-sm py-2 px-4 mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs font-bold ml-2 uppercase tracking-wide">{error}</AlertDescription>
                </Alert>
            )}

            <DataTable
                data={serviceCharges}
                columns={columns}
                isLoading={loading}
                searchPlaceholder="Search charges..."
                emptyMessage="No service charges found."
            />
        </div>
    );
}

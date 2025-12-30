import { useState, useEffect } from 'react';
import { Plus, Trash2, AlertCircle, Check, Pencil, Loader2, Receipt } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import client from '../../api/client';

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

    const [isDialogOpen, setIsDialogOpen] = useState(false);
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
            const response = await client.get('/service-charges');
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
        setIsDialogOpen(true);
    };

    const handleEdit = (item: ServiceCharge) => {
        setEditingItem(item);
        setSuccess(null);
        setError(null);
        setFormData({ ...item });
        setIsDialogOpen(true);
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
                await client.post('/service-charges', formData);
                setSuccess('Service charge added successfully.');
            }
            setIsDialogOpen(false);
            fetchServiceCharges();
        } catch (err) {
            setError('Failed to save service charge. Please check your inputs.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-5 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-1">
                <div className="flex-1 min-w-0">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Service Charges</h2>
                    <p className="text-gray-500 mt-1 text-lg">Manage customer service charges</p>
                </div>
                <Button onClick={handleAdd} className="bg-[#0099ff] hover:bg-[#0077cc] h-12 px-6 rounded-xl font-bold shadow-lg shadow-blue-500/20 gap-2">
                    <Plus className="h-5 w-5" />
                    Add Service Charge
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
                    <p className="text-gray-400 font-medium">Loading service charges...</p>
                </div>
            ) : (
                <Card className="p-6 border-gray-100 shadow-lg shadow-gray-200/50 rounded-2xl">
                    {serviceCharges.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Receipt className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No service charges found</h3>
                            <p className="text-gray-500 mb-6">Get started by creating your first service charge.</p>
                            <Button onClick={handleAdd} variant="outline" className="h-10 border-gray-300">
                                Create New Service Charge
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-[#0099ff]">
                                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Service</th>
                                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Charge</th>
                                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Status</th>
                                        <th className="text-center py-3 px-4 text-sm font-bold text-gray-700">Order</th>
                                        <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {serviceCharges.map((charge) => (
                                        <tr key={charge.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-4 text-sm text-gray-900 font-medium">{charge.service}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{charge.charge}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide ${charge.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {charge.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-center text-sm text-gray-600">{charge.sort_order}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEdit(charge)}
                                                        className="h-8 px-3 text-[#0099ff] hover:text-[#0077cc] hover:bg-blue-50"
                                                    >
                                                        <Pencil className="h-4 w-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(charge.id!)}
                                                        className="h-8 px-3 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-1" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            )}

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? 'Edit Service Charge' : 'Add Service Charge'}</DialogTitle>
                        <DialogDescription>
                            {editingItem ? 'Update the service charge details below.' : 'Fill in the details to create a new service charge.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="service">Service Name</Label>
                                <Input
                                    id="service"
                                    value={formData.service}
                                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                                    placeholder="e.g. Cheque Book (10 leaves)"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="charge">Charge Amount</Label>
                                <Input
                                    id="charge"
                                    value={formData.charge}
                                    onChange={e => setFormData({ ...formData, charge: e.target.value })}
                                    placeholder="e.g. ₹50 + GST or Free"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={formData.status} onValueChange={(val: any) => setFormData({ ...formData, status: val })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="sort_order">Sort Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={formData.sort_order}
                                        onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={submitting}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-[#0099ff] hover:bg-[#0077cc]" disabled={submitting}>
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...
                                    </>
                                ) : (
                                    editingItem ? 'Update' : 'Create'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

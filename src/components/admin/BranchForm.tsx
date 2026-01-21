import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import client from '../../api/client';

interface Branch {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    ifsc: string | null;
    micr: string | null;
    fax: string | null;
    timings: string;
    district: string;
    is_headquarter: boolean | number | string;
}

interface BranchFormProps {
    branch?: Partial<Branch>;
    onBack: () => void;
    onSuccess: () => void;
}

export function BranchForm({ branch, onBack, onSuccess }: BranchFormProps) {
    const [currentBranch, setCurrentBranch] = useState<Partial<Branch>>(() => {
        if (branch) {
            return {
                ...branch,
                // Convert is_headquarter to boolean for the toggle
                is_headquarter: branch.is_headquarter === 1 || branch.is_headquarter === '1' || branch.is_headquarter === true
            };
        }
        return {
            timings: '10:00 AM - 6:00 PM',
            is_headquarter: false
        };
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!currentBranch.name || !currentBranch.address) {
            toast.error('Name and Address are required');
            return;
        }

        setIsSaving(true);
        try {
            const data = {
                ...currentBranch,
                is_headquarter: currentBranch.is_headquarter ? 1 : 0
            };

            if (currentBranch.id) {
                await client.put(`/branches/${currentBranch.id}`, data);
                toast.success('Branch updated successfully');
            } else {
                await client.post('branches', data);
                toast.success('Branch added successfully');
            }
            onSuccess();
        } catch (error) {
            console.error('Failed to save branch', error);
            toast.error('Failed to save branch');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onBack}
                        className="h-10 w-10 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {currentBranch.id ? 'Edit Branch' : 'Add New Branch'}
                        </h2>
                        <p className="text-gray-600">
                            {currentBranch.id ? 'Modify branch details' : 'Create a new bank location'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={onBack} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving} className="bg-[#0099ff] hover:bg-[#0088ee]">
                        {isSaving ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        Save Branch
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Branch Name *</Label>
                        <Input
                            id="name"
                            value={currentBranch.name || ''}
                            onChange={(e) => setCurrentBranch({ ...currentBranch, name: e.target.value })}
                            placeholder="e.g. Main Branch"
                            className="mt-1.5 h-11 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Label htmlFor="address" className="text-sm font-semibold text-gray-700">Address *</Label>
                        <Textarea
                            id="address"
                            value={currentBranch.address || ''}
                            onChange={(e) => setCurrentBranch({ ...currentBranch, address: e.target.value })}
                            placeholder="Full address of the branch"
                            className="mt-1.5 min-h-[100px] border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number *</Label>
                        <Input
                            id="phone"
                            value={currentBranch.phone || ''}
                            onChange={(e) => setCurrentBranch({ ...currentBranch, phone: e.target.value })}
                            placeholder="Reception or Manager phone"
                            className="h-11 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={currentBranch.email || ''}
                            onChange={(e) => setCurrentBranch({ ...currentBranch, email: e.target.value })}
                            placeholder="branch@urbanbank.com"
                            className="h-11 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="district" className="text-sm font-semibold text-gray-700">District *</Label>
                        <Input
                            id="district"
                            value={currentBranch.district || ''}
                            onChange={(e) => setCurrentBranch({ ...currentBranch, district: e.target.value })}
                            placeholder="e.g. Guntur"
                            className="h-11 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="timings" className="text-sm font-semibold text-gray-700">Working Hours</Label>
                        <Input
                            id="timings"
                            value={currentBranch.timings || ''}
                            onChange={(e) => setCurrentBranch({ ...currentBranch, timings: e.target.value })}
                            placeholder="e.g. 10:00 AM - 6:00 PM"
                            className="h-11 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="ifsc" className="text-sm font-semibold text-gray-700">IFSC Code</Label>
                        <Input
                            id="ifsc"
                            value={currentBranch.ifsc || ''}
                            onChange={(e) => setCurrentBranch({ ...currentBranch, ifsc: e.target.value })}
                            placeholder="GUB0001"
                            className="h-11 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10 uppercase"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="micr" className="text-sm font-semibold text-gray-700">MICR Code</Label>
                        <Input
                            id="micr"
                            value={currentBranch.micr || ''}
                            onChange={(e) => setCurrentBranch({ ...currentBranch, micr: e.target.value })}
                            className="h-11 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="fax" className="text-sm font-semibold text-gray-700">Fax Number</Label>
                        <Input
                            id="fax"
                            value={currentBranch.fax || ''}
                            onChange={(e) => setCurrentBranch({ ...currentBranch, fax: e.target.value })}
                            className="h-11 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10"
                        />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 self-end h-11">
                        <Switch
                            id="is_headquarter"
                            checked={Boolean(currentBranch.is_headquarter)}
                            onCheckedChange={(checked: boolean) => setCurrentBranch({ ...currentBranch, is_headquarter: checked })}
                        />
                        <Label htmlFor="is_headquarter" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Mark as Headquarter Branch
                        </Label>
                    </div>
                </div>
            </div>
        </div>
    );
}

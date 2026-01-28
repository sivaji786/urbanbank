import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import client from '../../api/client';
import { BranchForm } from './BranchForm';
import { DataTable, Column } from '../ui/DataTable';

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

type ViewState = 'list' | 'add' | 'edit';

export function BranchManagement() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<ViewState>('list');
    const [selectedBranch, setSelectedBranch] = useState<Partial<Branch> | undefined>(undefined);

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        setIsLoading(true);
        try {
            const response = await client.get('branches');
            setBranches(response.data);
        } catch (error) {
            console.error('Failed to fetch branches', error);
            toast.error('Failed to load branches');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this branch?')) return;

        try {
            await client.delete(`/branches/${id}`);
            toast.success('Branch deleted successfully');
            fetchBranches();
        } catch (error) {
            console.error('Failed to delete branch', error);
            toast.error('Failed to delete branch');
        }
    };

    const handleEdit = (branch: Branch) => {
        setSelectedBranch(branch);
        setView('edit');
    };

    const handleAdd = () => {
        setSelectedBranch(undefined);
        setView('add');
    };

    const handleBack = () => {
        setView('list');
        setSelectedBranch(undefined);
    };

    const handleSuccess = () => {
        setView('list');
        setSelectedBranch(undefined);
        fetchBranches();
    };

    const columns: Column<Branch>[] = [
        {
            header: 'Branch Name',
            cell: (branch) => (
                <div className="font-semibold text-slate-900 flex items-center gap-2">
                    {branch.name}
                    {(branch.is_headquarter === 1 || branch.is_headquarter === '1' || branch.is_headquarter === true) && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-50 text-amber-700 font-bold border border-amber-100 uppercase tracking-tighter">
                            HQ
                        </span>
                    )}
                </div>
            )
        },
        {
            header: 'Address',
            cell: (branch) => (
                <div className="max-w-xs truncate text-xs text-slate-600" title={branch.address}>
                    {branch.address}
                </div>
            )
        },
        {
            header: 'Contact',
            cell: (branch) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">{branch.phone}</span>
                    <span className="text-[11px] text-slate-500">{branch.email}</span>
                </div>
            )
        },
        {
            header: 'District',
            accessorKey: 'district',
            className: 'text-slate-600'
        },
        {
            header: 'Actions',
            headerClassName: 'text-right',
            className: 'text-right',
            cell: (branch) => (
                <div className="flex items-center justify-end gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(branch)}
                        className="h-7 w-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(branch.id)}
                        className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            )
        }
    ];

    if (view === 'add' || view === 'edit') {
        return (
            <BranchForm
                branch={selectedBranch}
                onBack={handleBack}
                onSuccess={handleSuccess}
            />
        );
    }

    return (
        <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-6">
                <div>
                    <h2 className="text-[28px] font-black text-gray-900 tracking-tighter leading-tight font-['Poppins']">Branch Locator</h2>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Physical infrastructure management</p>
                </div>
                <Button onClick={handleAdd} className="bg-[#0099ff] hover:bg-black text-[9px] font-black px-6 h-10 rounded-xl shadow-md uppercase tracking-[0.2em] transition-all duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    PROVISION BRANCH
                </Button>
            </div>

            <DataTable
                data={branches}
                columns={columns}
                isLoading={isLoading}
                searchPlaceholder="Search branches..."
                emptyMessage="No branches found."
            />
        </div>
    );
}

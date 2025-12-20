import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import client from '../../api/client';
import { BranchForm } from './BranchForm';

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
    is_headquarter: boolean | number;
}

type ViewState = 'list' | 'add' | 'edit';

export function BranchManagement() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState<ViewState>('list');
    const [selectedBranch, setSelectedBranch] = useState<Partial<Branch> | undefined>(undefined);

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        setIsLoading(true);
        try {
            const response = await client.get('/branches');
            setBranches(response.data);
        } catch (error) {
            console.error('Failed to fetch branches', error);
            toast.error('Failed to load branches');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredBranches = branches.filter(branch =>
        branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.district.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Branch Locator</h2>
                    <p className="text-gray-600">Manage all bank branches and locations</p>
                </div>
                <Button onClick={handleAdd} className="bg-[#0099ff] hover:bg-[#0088ee]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Branch
                </Button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search branches..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 max-w-sm"
                    />
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-[#0099ff]" />
                    </div>
                ) : (
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Branch Name</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>District</TableHead>
                                    <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBranches.length > 0 ? (
                                    filteredBranches.map((branch) => (
                                        <TableRow key={branch.id}>
                                            <TableCell>
                                                <div className="font-medium flex items-center gap-2">
                                                    {branch.name}
                                                    {Boolean(branch.is_headquarter) && (
                                                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-yellow-100 text-yellow-700 font-semibold border border-yellow-200 uppercase">
                                                            HQ
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate" title={branch.address}>
                                                {branch.address}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div>{branch.phone}</div>
                                                    <div className="text-gray-500 text-xs">{branch.email}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{branch.district}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleEdit(branch)}
                                                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(branch.id)}
                                                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                                            No branches found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
}

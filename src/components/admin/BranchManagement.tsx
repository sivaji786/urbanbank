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
import { Plus, Pencil, Trash2, Search, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
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
    is_headquarter: boolean | number | string;
}

type ViewState = 'list' | 'add' | 'edit';

export function BranchManagement() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState<ViewState>('list');
    const [selectedBranch, setSelectedBranch] = useState<Partial<Branch> | undefined>(undefined);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchBranches();
    }, []);

    // Reset to first page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

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

    const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);
    const paginatedBranches = filteredBranches.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
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
                    <>
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
                                        paginatedBranches.map((branch) => (
                                            <TableRow key={branch.id}>
                                                <TableCell>
                                                    <div className="font-medium flex items-center gap-2">
                                                        {branch.name}
                                                        {(branch.is_headquarter === 1 || branch.is_headquarter === '1' || branch.is_headquarter === true) && (
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

                        {/* Pagination Controls */}
                        {filteredBranches.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-500 font-medium">
                                    Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                                    <span className="font-semibold text-gray-900">
                                        {Math.min(currentPage * itemsPerPage, filteredBranches.length)}
                                    </span> of{' '}
                                    <span className="font-semibold text-gray-900">{filteredBranches.length}</span> entries
                                </p>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="h-9 px-3 font-medium transition-all"
                                    >
                                        <ChevronLeft className="h-4 w-4 mr-1.5" /> Previous
                                    </Button>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                                            .filter(page => {
                                                return (
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    Math.abs(page - currentPage) <= 1
                                                );
                                            })
                                            .map((page, idx, array) => {
                                                const showDots = idx > 0 && page - array[idx - 1] > 1;

                                                return (
                                                    <div key={page} className="flex items-center">
                                                        {showDots && <span className="px-2 text-gray-400 text-xs font-bold">...</span>}
                                                        <Button
                                                            variant={currentPage === page ? "default" : "outline"}
                                                            size="sm"
                                                            onClick={() => setCurrentPage(page)}
                                                            className={`h-9 w-9 p-0 font-bold ${currentPage === page ? 'bg-[#0099ff] hover:bg-[#0077cc] text-white' : 'text-gray-600 hover:text-[#0099ff] hover:bg-blue-50'}`}
                                                        >
                                                            {page}
                                                        </Button>
                                                    </div>
                                                );
                                            })}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="h-9 px-3 font-medium transition-all"
                                    >
                                        Next <ChevronRight className="h-4 w-4 ml-1.5" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

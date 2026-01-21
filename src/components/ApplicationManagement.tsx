import { useState, useEffect, useMemo } from 'react';
import { Search, FileText, CheckCircle, XCircle, Clock, AlertCircle, ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight, FileDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import client from '../api/client';
import { toast } from 'sonner';
import { generateApplicationsCSV } from '../utils/applicationCsvExport';

interface Application {
    id: number;
    application_id: string;
    application_type: 'deposit' | 'loan';
    product_id: number;
    product_name: string;
    branch_id: number;
    branch_name: string;
    name: string;
    email: string;
    phone: string;
    status: 'open' | 'in-progress' | 'approved' | 'rejected';
    notes: string | null;
    created_at: string;
    updated_at: string;
}

interface Branch {
    id: number;
    name: string;
}

type SortField = 'application_id' | 'name' | 'created_at' | 'status' | 'application_type' | 'branch_name';
type SortDirection = 'asc' | 'desc';

const statusColors = {
    open: 'bg-blue-100 text-blue-700 border-blue-200',
    'in-progress': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    approved: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
};

const statusIcons = {
    open: Clock,
    'in-progress': AlertCircle,
    approved: CheckCircle,
    rejected: XCircle,
};

export function ApplicationManagement() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: '',
        type: '',
        branch: '',
        search: '',
    });
    const [searchInput, setSearchInput] = useState(''); // Local search input state for debouncing
    const [sortField, setSortField] = useState<SortField>('created_at');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        fetchBranches();
    }, []);

    // Debounce search input - only update filters.search after 500ms of no typing
    useEffect(() => {
        const timer = setTimeout(() => {
            // Only search if input is empty or has at least 3 characters
            if (searchInput === '' || searchInput.length >= 3) {
                setFilters(prev => ({ ...prev, search: searchInput }));
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    useEffect(() => {
        fetchApplications();
    }, [filters]);

    const fetchApplications = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.status) params.append('status', filters.status);
            if (filters.type) params.append('application_type', filters.type);
            if (filters.branch) params.append('branch_id', filters.branch);
            if (filters.search) params.append('search', filters.search);

            const response = await client.get(`/applications?${params.toString()}`);
            const apps = response.data?.data || response.data || [];
            setApplications(apps);
        } catch (error) {
            console.error('Failed to fetch applications', error);
            toast.error('Failed to load applications');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBranches = async () => {
        try {
            const response = await client.get('applications/branches');
            setBranches(response.data || []);
        } catch (error) {
            console.error('Failed to fetch branches', error);
        }
    };

    // Filter and sort applications (now only sorting, filtering is done server-side)
    const filteredAndSortedApplications = useMemo(() => {
        let filtered = [...applications];

        // Apply sorting
        filtered.sort((a, b) => {
            let aValue: any = a[sortField];
            let bValue: any = b[sortField];

            if (sortField === 'created_at') {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [applications, sortField, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedApplications.length / itemsPerPage);
    const paginatedApplications = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedApplications.slice(start, start + itemsPerPage);
    }, [filteredAndSortedApplications, currentPage, itemsPerPage]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, sortField, sortDirection]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
        return sortDirection === 'asc' ?
            <ChevronUp className="w-4 h-4 text-[#0099ff]" /> :
            <ChevronDown className="w-4 h-4 text-[#0099ff]" />;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusStats = () => {
        return {
            total: applications.length,
            open: applications.filter(a => a.status === 'open').length,
            inProgress: applications.filter(a => a.status === 'in-progress').length,
            approved: applications.filter(a => a.status === 'approved').length,
            rejected: applications.filter(a => a.status === 'rejected').length,
        };
    };

    const handleExportAll = async () => {
        try {
            // Fetch all applications without filters
            const response = await client.get('applications?limit=10000');
            generateApplicationsCSV(response.data);
            toast.success('All applications exported successfully');
        } catch (error) {
            console.error('Failed to export applications', error);
            toast.error('Failed to export applications');
        }
    };

    const handleExportFiltered = () => {
        if (filteredAndSortedApplications.length === 0) {
            toast.warning('No applications to export');
            return;
        }
        generateApplicationsCSV(filteredAndSortedApplications);
        toast.success(`Exported ${filteredAndSortedApplications.length} application(s)`);
    };

    const stats = getStatusStats();

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">Application Management</h1>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleExportFiltered}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <FileDown className="w-4 h-4" />
                            Export Filtered ({filteredAndSortedApplications.length})
                        </Button>
                        <Button
                            onClick={handleExportAll}
                            className="flex items-center gap-2 bg-gradient-to-r from-[#0099ff] to-[#0077cc] hover:from-[#0088ee] hover:to-[#0066bb] text-white"
                        >
                            <FileDown className="w-4 h-4" />
                            Export All
                        </Button>
                    </div>
                </div>
                <p className="text-gray-600 mb-6">Manage deposit and loan applications</p>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Total</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Open</p>
                        <p className="text-3xl font-bold text-blue-600">{stats.open}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">In Progress</p>
                        <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Approved</p>
                        <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Rejected</p>
                        <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="flex flex-col">
                        <Label htmlFor="search" className="text-sm font-semibold text-gray-700 mb-2">Search</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                id="search"
                                type="text"
                                placeholder="Search by ID, name, email, phone..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="pl-10 h-11 border-gray-300 focus:border-[#0099ff] focus:ring-2 focus:ring-[#0099ff]/20"
                            />
                        </div>
                        {searchInput.length > 0 && searchInput.length < 3 && (
                            <p className="text-xs text-gray-500 mt-1">Minimum 3 characters required</p>
                        )}
                    </div>

                    {/* Branch Filter */}
                    <div className="flex flex-col">
                        <Label htmlFor="branch" className="text-sm font-semibold text-gray-700 mb-2">Branch</Label>
                        <select
                            id="branch"
                            value={filters.branch}
                            onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
                            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:border-[#0099ff] focus:ring-2 focus:ring-[#0099ff]/20 outline-none bg-white text-sm"
                        >
                            <option value="">All Branches</option>
                            {branches.map(branch => (
                                <option key={branch.id} value={branch.id}>{branch.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="flex flex-col">
                        <Label htmlFor="status" className="text-sm font-semibold text-gray-700 mb-2">Status</Label>
                        <select
                            id="status"
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:border-[#0099ff] focus:ring-2 focus:ring-[#0099ff]/20 outline-none bg-white text-sm"
                        >
                            <option value="">All Statuses</option>
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    {/* Type Filter */}
                    <div className="flex flex-col">
                        <Label htmlFor="type" className="text-sm font-semibold text-gray-700 mb-2">Type</Label>
                        <select
                            id="type"
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:border-[#0099ff] focus:ring-2 focus:ring-[#0099ff]/20 outline-none bg-white text-sm"
                        >
                            <option value="">All Types</option>
                            <option value="deposit">Deposits</option>
                            <option value="loan">Loans</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#0099ff] border-t-transparent"></div>
                        <p className="mt-4 text-gray-600 font-medium">Loading applications...</p>
                    </div>
                ) : paginatedApplications.length === 0 ? (
                    <div className="p-12 text-center">
                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium text-lg">No applications found</p>
                        <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                                    <tr>
                                        <th
                                            className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSort('application_id')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Application ID
                                                <SortIcon field="application_id" />
                                            </div>
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSort('application_type')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Type
                                                <SortIcon field="application_type" />
                                            </div>
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSort('name')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Applicant
                                                <SortIcon field="name" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSort('branch_name')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Branch
                                                <SortIcon field="branch_name" />
                                            </div>
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSort('status')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Status
                                                <SortIcon field="status" />
                                            </div>
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSort('created_at')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Created
                                                <SortIcon field="created_at" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginatedApplications.map((app, index) => {
                                        const StatusIcon = statusIcons[app.status];
                                        return (
                                            <tr
                                                key={app.id}
                                                className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="font-mono text-sm font-bold text-[#0099ff] bg-blue-50 px-2 py-1 rounded">
                                                        {app.application_id}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="capitalize text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                                                        {app.application_type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm">
                                                        <div className="font-semibold text-gray-900">{app.name}</div>
                                                        <div className="text-gray-600 text-xs">{app.email}</div>
                                                        <div className="text-gray-600 text-xs">{app.phone}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {app.product_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    {app.branch_name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusColors[app.status]}`}>
                                                        <StatusIcon className="w-3.5 h-3.5" />
                                                        {app.status === 'in-progress' ? 'In Progress' : app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {formatDate(app.created_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <Button
                                                        onClick={() => window.location.hash = `#admin/application-details/${app.id}`}
                                                        className="bg-gradient-to-r from-[#0099ff] to-[#0077cc] hover:from-[#0088ee] hover:to-[#0066bb] text-white text-xs px-4 py-2 shadow-md hover:shadow-lg transition-all"
                                                    >
                                                        Update Status
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-700">
                                    Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                                    <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredAndSortedApplications.length)}</span> of{' '}
                                    <span className="font-semibold">{filteredAndSortedApplications.length}</span> results
                                </span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="h-9 px-3 border border-gray-300 rounded-lg text-sm focus:border-[#0099ff] focus:ring-2 focus:ring-[#0099ff]/20 outline-none"
                                >
                                    <option value={5}>5 per page</option>
                                    <option value={10}>10 per page</option>
                                    <option value={25}>25 per page</option>
                                    <option value={50}>50 per page</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    variant="outline"
                                    className="h-9 px-3 disabled:opacity-50"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>

                                {[...Array(totalPages)].map((_, i) => {
                                    const page = i + 1;
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                    ) {
                                        return (
                                            <Button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                variant={currentPage === page ? 'default' : 'outline'}
                                                className={`h-9 w-9 ${currentPage === page ? 'bg-[#0099ff] text-white' : ''}`}
                                            >
                                                {page}
                                            </Button>
                                        );
                                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                                        return <span key={page} className="px-2">...</span>;
                                    }
                                    return null;
                                })}

                                <Button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    variant="outline"
                                    className="h-9 px-3 disabled:opacity-50"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ApplicationManagement;


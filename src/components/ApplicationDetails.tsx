import { useState, useEffect } from 'react';
import { ArrowLeft, FileText, CheckCircle, XCircle, Clock, AlertCircle, Save, History, FileDown } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import client from '../api/client';
import { toast } from 'sonner';
import { generateApplicationPDF } from '../utils/applicationPdfExport';

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

interface StatusLog {
    id: number;
    application_id: number;
    old_status: string | null;
    new_status: string;
    notes: string | null;
    changed_by: number | null;
    created_at: string;
}

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

interface ApplicationDetailsProps {
    id: string;
}

export function ApplicationDetails({ id }: ApplicationDetailsProps) {
    const [application, setApplication] = useState<Application | null>(null);
    const [statusLogs, setStatusLogs] = useState<StatusLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingLogs, setIsLoadingLogs] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [notes, setNotes] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchApplication();
        fetchStatusLogs();
    }, [id]);

    const fetchApplication = async () => {
        setIsLoading(true);
        try {
            const response = await client.get(`/applications/${id}`);
            const app = response.data;
            setApplication(app);
            setNewStatus(app.status);
            setNotes(''); // Don't pre-fill notes
        } catch (error) {
            console.error('Failed to fetch application', error);
            toast.error('Failed to load application details');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStatusLogs = async () => {
        setIsLoadingLogs(true);
        try {
            const response = await client.get(`/applications/${id}/status-logs`);
            setStatusLogs(response.data);
        } catch (error) {
            console.error('Failed to fetch status logs', error);
        } finally {
            setIsLoadingLogs(false);
        }
    };

    const handleStatusUpdate = async () => {
        if (!application || !newStatus) return;

        setIsUpdating(true);
        try {
            await client.put(`/applications/${application.id}/status`, {
                status: newStatus,
                notes: notes || null,
            });

            toast.success('Application status updated successfully');
            // Refresh status logs after update
            await fetchStatusLogs();
            window.location.hash = '#admin/applications';
        } catch (error) {
            console.error('Failed to update status', error);
            toast.error('Failed to update application status');
        } finally {
            setIsUpdating(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleExportPDF = () => {
        if (!application) return;
        generateApplicationPDF(application, statusLogs);
        toast.success('PDF exported successfully');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#0099ff] border-t-transparent"></div>
            </div>
        );
    }

    if (!application) {
        return (
            <div className="p-8">
                <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium text-lg">Application not found</p>
                    <Button onClick={() => window.location.hash = '#admin/applications'} className="mt-4">
                        Back to Applications
                    </Button>
                </div>
            </div>
        );
    }

    const StatusIcon = statusIcons[application.status];

    return (
        <div className="space-y-6 p-6">
            {/* Header with Back Button and Export PDF */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => window.location.hash = '#admin/applications'}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
                        <p className="text-gray-600 mt-1">View and update application information</p>
                    </div>
                </div>
                <Button
                    onClick={handleExportPDF}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#0099ff] to-[#0077cc] hover:from-[#0088ee] hover:to-[#0066bb] text-white"
                >
                    <FileDown className="w-4 h-4" />
                    Export PDF
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Application Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Application Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label className="text-sm font-semibold text-gray-600">Application ID</Label>
                                <p className="mt-1 font-mono font-bold text-[#0099ff] text-lg">{application.application_id}</p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-gray-600">Type</Label>
                                <p className="mt-1 capitalize text-gray-900 font-medium">{application.application_type}</p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-gray-600">Product</Label>
                                <p className="mt-1 text-gray-900 font-medium">{application.product_name}</p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-gray-600">Branch</Label>
                                <p className="mt-1 text-gray-900 font-medium">{application.branch_name || 'N/A'}</p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-gray-600">Current Status</Label>
                                <div className="mt-1">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusColors[application.status]}`}>
                                        <StatusIcon className="w-3.5 h-3.5" />
                                        {application.status === 'in-progress' ? 'In Progress' : application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-gray-600">Submitted On</Label>
                                <p className="mt-1 text-gray-900">{formatDate(application.created_at)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Applicant Info Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Applicant Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label className="text-sm font-semibold text-gray-600">Name</Label>
                                <p className="mt-1 text-gray-900 font-medium">{application.name}</p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-gray-600">Email</Label>
                                <p className="mt-1 text-gray-900">{application.email}</p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-gray-600">Phone</Label>
                                <p className="mt-1 text-gray-900">{application.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Update Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Update Status</h2>

                        <div className="space-y-4">
                            {/* Status Selection */}
                            <div>
                                <Label htmlFor="newStatus" className="text-sm font-semibold text-gray-700 mb-2">New Status</Label>
                                <select
                                    id="newStatus"
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-[#0099ff] focus:ring-4 focus:ring-[#0099ff]/20 outline-none bg-white font-medium"
                                >
                                    <option value="open">Open</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>

                            {/* Notes */}
                            <div>
                                <Label htmlFor="notes" className="text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</Label>
                                <textarea
                                    id="notes"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add notes about this application..."
                                    rows={6}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0099ff] focus:ring-4 focus:ring-[#0099ff]/20 outline-none resize-none"
                                />
                            </div>

                            {/* Update Button */}
                            <Button
                                onClick={handleStatusUpdate}
                                disabled={isUpdating || newStatus === application.status}
                                className="w-full h-12 bg-gradient-to-r from-[#0099ff] to-[#0077cc] hover:from-[#0088ee] hover:to-[#0066bb] text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                {isUpdating ? 'Updating...' : 'Update Status'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status History Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <History className="w-5 h-5 text-[#0099ff]" />
                    <h2 className="text-xl font-bold text-gray-900">Status History</h2>
                </div>

                {isLoadingLogs ? (
                    <div className="flex justify-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#0099ff] border-t-transparent"></div>
                    </div>
                ) : statusLogs.length === 0 ? (
                    <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">No status changes recorded yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {statusLogs.map((log, index) => {
                            const StatusIcon = statusIcons[log.new_status as keyof typeof statusIcons];
                            const isFirst = index === 0;

                            return (
                                <div key={log.id} className="relative pl-8 pb-4">
                                    {/* Timeline line */}
                                    {index !== statusLogs.length - 1 && (
                                        <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                                    )}

                                    {/* Timeline dot */}
                                    <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 ${isFirst ? 'bg-[#0099ff] border-[#0099ff]' : 'bg-white border-gray-300'
                                        }`}></div>

                                    <div className={`${isFirst ? 'bg-blue-50' : 'bg-gray-50'} rounded-lg p-4 border ${isFirst ? 'border-blue-200' : 'border-gray-200'
                                        }`}>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    {log.old_status && (
                                                        <>
                                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${statusColors[log.old_status as keyof typeof statusColors]
                                                                }`}>
                                                                {log.old_status === 'in-progress' ? 'In Progress' :
                                                                    log.old_status.charAt(0).toUpperCase() + log.old_status.slice(1)}
                                                            </span>
                                                            <span className="text-gray-400">→</span>
                                                        </>
                                                    )}
                                                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold border ${statusColors[log.new_status as keyof typeof statusColors]
                                                        }`}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        {log.new_status === 'in-progress' ? 'In Progress' :
                                                            log.new_status.charAt(0).toUpperCase() + log.new_status.slice(1)}
                                                    </span>
                                                </div>

                                                {log.notes && (
                                                    <p className="text-sm text-gray-700 mt-2 italic">"{log.notes}"</p>
                                                )}
                                            </div>

                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">
                                                    {formatDate(log.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ApplicationDetails;

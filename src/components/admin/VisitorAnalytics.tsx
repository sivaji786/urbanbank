import { useState, useEffect } from 'react';
import { Users, Eye, TrendingUp, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { Card } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import client from '../../api/client';

interface VisitorStats {
    total_visits: number;
    unique_visitors: number;
    today_visits: number;
    today_unique: number;
    week_visits: number;
    last_updated: string;
}

interface VisitorLog {
    id: number;
    ip_address: string;
    user_agent: string;
    referrer: string;
    page_url: string;
    is_unique: boolean;
    created_at: string;
}

export function VisitorAnalytics() {
    const [stats, setStats] = useState<VisitorStats | null>(null);
    const [logs, setLogs] = useState<VisitorLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchStats();
        fetchLogs();
    }, [page]);

    const fetchStats = async () => {
        try {
            const response = await client.get('visitor-stats');
            setStats(response.data);
        } catch (err) {
            console.error('Failed to fetch visitor stats:', err);
            setError('Failed to load visitor statistics');
        }
    };

    const fetchLogs = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await client.get(`/visitor-logs?page=${page}&limit=20`);

            console.log('Visitor logs API response:', response.data); // Debug log

            // Handle different response structures
            if (Array.isArray(response.data)) {
                // API returns array directly
                setLogs(response.data);
                setTotalPages(1);
            } else if (response.data && response.data.data) {
                // API returns wrapped data
                setLogs(response.data.data);

                if (response.data.pagination && response.data.pagination.pages) {
                    setTotalPages(response.data.pagination.pages);
                } else {
                    setTotalPages(1);
                }
            } else {
                // Unexpected structure
                console.warn('Unexpected API response:', response.data);
                setLogs([]);
                setTotalPages(1);
            }
        } catch (err) {
            console.error('Failed to fetch visitor logs:', err);
            setError('Failed to load visitor logs');
            setLogs([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const truncateText = (text: string, maxLength: number) => {
        if (!text) return '-';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-1">
                <div className="flex-1 min-w-0">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Visitor Analytics</h2>
                    <p className="text-gray-500 mt-1 text-lg">Track website traffic and visitor statistics</p>
                </div>
            </div>

            {error && (
                <Alert variant="destructive" className="rounded-xl shadow-sm">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="ml-2">{error}</AlertDescription>
                </Alert>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 border-gray-100 shadow-lg shadow-gray-200/50 rounded-2xl bg-gradient-to-br from-blue-50 to-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <Eye className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Total Visits</h3>
                    <p className="text-3xl font-black text-gray-900">{stats?.total_visits?.toLocaleString() || 0}</p>
                    <p className="text-xs text-gray-500 mt-2">All-time page views</p>
                </Card>

                <Card className="p-6 border-gray-100 shadow-lg shadow-gray-200/50 rounded-2xl bg-gradient-to-br from-green-50 to-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Unique Visitors</h3>
                    <p className="text-3xl font-black text-gray-900">{stats?.unique_visitors?.toLocaleString() || 0}</p>
                    <p className="text-xs text-gray-500 mt-2">Distinct users</p>
                </Card>

                <Card className="p-6 border-gray-100 shadow-lg shadow-gray-200/50 rounded-2xl bg-gradient-to-br from-purple-50 to-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Today's Visits</h3>
                    <p className="text-3xl font-black text-gray-900">{stats?.today_visits?.toLocaleString() || 0}</p>
                    <p className="text-xs text-gray-500 mt-2">{stats?.today_unique || 0} unique today</p>
                </Card>

                <Card className="p-6 border-gray-100 shadow-lg shadow-gray-200/50 rounded-2xl bg-gradient-to-br from-orange-50 to-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-100 rounded-xl">
                            <Calendar className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">This Week</h3>
                    <p className="text-3xl font-black text-gray-900">{stats?.week_visits?.toLocaleString() || 0}</p>
                    <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
                </Card>
            </div>

            {/* Visitor Logs Table */}
            <Card className="p-6 border-gray-100 shadow-lg shadow-gray-200/50 rounded-2xl">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Recent Visitor Logs</h3>
                    <p className="text-sm text-gray-600">Detailed records of website visits</p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                        <Loader2 className="h-10 w-10 animate-spin text-[#0099ff]" />
                        <p className="text-gray-400 font-medium">Loading visitor logs...</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-[#0099ff]">
                                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Date & Time</th>
                                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">IP Address</th>
                                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Page URL</th>
                                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Referrer</th>
                                        <th className="text-center py-3 px-4 text-sm font-bold text-gray-700">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-gray-500">
                                                No visitor logs found
                                            </td>
                                        </tr>
                                    ) : (
                                        logs.map((log) => (
                                            <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4 text-sm text-gray-900">{formatDate(log.created_at)}</td>
                                                <td className="py-3 px-4 text-sm text-gray-900 font-mono">{log.ip_address || '-'}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700" title={log.page_url}>
                                                    {truncateText(log.page_url, 40)}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-700" title={log.referrer}>
                                                    {truncateText(log.referrer, 30)}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    {log.is_unique ? (
                                                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide bg-green-100 text-green-700">
                                                            New
                                                        </span>
                                                    ) : (
                                                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide bg-gray-100 text-gray-600">
                                                            Return
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    Page {page} of {totalPages}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="px-4 py-2 text-sm font-medium text-white bg-[#0099ff] border border-transparent rounded-lg hover:bg-[#0077cc] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Card>
        </div>
    );
}

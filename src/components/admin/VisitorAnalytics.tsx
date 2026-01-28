import { useState, useEffect } from 'react';
import { Users, Eye, TrendingUp, Calendar } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import client from '../../api/client';
import { DataTable, Column } from '../ui/DataTable';
import { cn } from '../ui/utils';
import { Button } from '../ui/button';

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
    city: string | null;
    country: string | null;
    country_code: string | null;
    region: string | null;
    timezone: string | null;
    isp: string | null;
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

    useEffect(() => {
        fetchStats();
        fetchLogs();
    }, []);

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
            const response = await client.get('/visitor-logs?limit=500');
            if (Array.isArray(response.data)) {
                setLogs(response.data);
            } else if (response.data && response.data.data) {
                setLogs(response.data.data);
            } else {
                setLogs([]);
            }
        } catch (err) {
            console.error('Failed to fetch visitor logs:', err);
            setError('Failed to load visitor logs');
            setLogs([]);
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

    const handleBlockIP = async (ip: string) => {
        if (!window.confirm(`Are you sure you want to block IP: ${ip}?`)) return;
        try {
            await client.post('/admin/block-ip', { ip_address: ip, reason: 'Security protocol' });
            fetchLogs();
        } catch (error) {
            console.error('Failed to block IP', error);
        }
    };

    const columns: Column<VisitorLog>[] = [
        {
            header: 'Occurred At',
            cell: (log) => (
                <div className="flex flex-col">
                    <span className="text-slate-900 font-semibold text-[13px]">
                        {formatDate(log.created_at)}
                    </span>
                    <div className="mt-1.5 flex">
                        <span className="px-2 py-1 rounded text-[11px] font-medium whitespace-nowrap bg-slate-100 text-slate-600">
                            {log.is_unique ? 'NEW VISITOR' : 'RETURNING'}
                        </span>
                    </div>
                </div>
            )
        },
        {
            header: 'Location',
            cell: (log) => (
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-0.5">
                        <img
                            src={`https://flagcdn.com/w20/${log.country_code ? log.country_code.toLowerCase() : 'unknown'}.png`}
                            className="w-4 h-3 object-cover rounded-sm border border-slate-100"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                        <span className="text-[13px] font-medium text-slate-800 tracking-tight">{log.city || 'Private Urban'}</span>
                    </div>
                    <span className="text-[12px] text-slate-400 font-normal">{log.region || 'Metropolis'}, {log.country || 'Zone'}</span>
                </div>
            )
        },
        {
            header: 'Network & ISP',
            cell: (log) => (
                <div className="flex flex-col max-w-[200px]">
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[12px] font-mono font-medium text-blue-600">
                            {log.ip_address || 'SYSTEM'}
                        </span>
                    </div>
                    <span className="text-[12px] text-slate-400 font-normal">
                        {log.isp || 'Urban Bank Intranet'}
                    </span>
                </div>
            )
        },
        {
            header: 'Destination Page',
            cell: (log) => (
                <div className="flex flex-col max-w-xs">
                    <span className="text-[13px] font-normal text-slate-600 truncate" title={log.page_url}>
                        {log.page_url?.replace(window.location.host, '').replace('http://', '').replace('https://', '') || '/'}
                    </span>
                    {log.referrer && (
                        <span className="text-[12px] text-slate-400 truncate mt-0.5 font-normal">
                            {log.referrer.replace(window.location.host, '')}
                        </span>
                    )}
                </div>
            )
        },
        {
            header: 'Control',
            headerClassName: 'text-right',
            className: 'text-right',
            cell: (log) => (
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 text-[12px] font-medium text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        onClick={() => handleBlockIP(log.ip_address)}
                    >
                        Block IP
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="p-4 lg:p-6 space-y-8 animate-in fade-in duration-500 pb-12">
            {/* Bank-Grade Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div className="space-y-1 pl-1">
                    <div className="text-sm font-medium text-gray-400 tracking-[0.08em]">
                        Live Intelligence Stream
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 leading-tight">
                        Visitor Insights
                    </h2>
                    <p className="text-sm font-normal text-gray-400 tracking-wide">
                        Real-time intelligence • Global interaction metrics
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-none flex items-center gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-widest whitespace-nowrap">
                            SYSTEM STATUS: <span className="text-gray-400 tracking-tight font-mono uppercase">Synchronized</span>
                        </span>
                    </div>
                </div>
            </div>

            {error && (
                <Alert variant="destructive" className="rounded-lg shadow-none border-red-100 bg-red-50/50">
                    <AlertDescription className="font-medium text-[12px] tracking-wide">{error}</AlertDescription>
                </Alert>
            )}

            {/* Statistics Grid - Solid Bank Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Visits', value: stats?.total_visits, icon: Eye },
                    { label: 'Unique Visitors', value: stats?.unique_visitors, icon: Users },
                    { label: 'Daily Velocity', value: stats?.today_visits, icon: TrendingUp },
                    { label: 'Weekly Drift', value: stats?.week_visits, icon: Calendar },
                ].map((card, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-none transition-all hover:border-slate-300">
                        <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 mb-4 transition-colors">
                            <card.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-[24px] font-semibold text-slate-900 mb-1 leading-none tracking-tight">
                                {card.value?.toLocaleString() || 0}
                            </h3>
                            <p className="text-md font-medium text-gray-400 tracking-[0.04em]">
                                {card.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Interaction Logs Table */}
            <div className="space-y-6">
                <DataTable
                    data={logs}
                    columns={columns}
                    isLoading={loading}
                    title="Audit Interaction Logs"
                    subtitle="Real-time system synchronization"
                    searchPlaceholder="Search logs..."
                    emptyMessage="No visitor activity detected in the current stream."
                    pageSize={15}
                />
            </div>
        </div>
    );
}

export default VisitorAnalytics;

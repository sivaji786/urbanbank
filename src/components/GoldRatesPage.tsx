import { useState, useEffect } from 'react';
import { Coins, Loader2, AlertCircle, TrendingUp, ShieldCheck, Clock, ArrowRight, ExternalLink, Calculator, Landmark } from 'lucide-react';
import client from '../api/client';
import { Card } from './ui/card';

interface RateRow {
    row_data: string[];
}

interface GoldRateScheme {
    id: number;
    title: string;
    description: string;
    headers: string[];
    rows: RateRow[];
    status: 'active' | 'inactive';
}

export function GoldRatesPage() {
    const [schemes, setSchemes] = useState<GoldRateScheme[]>([]);
    const [meta, setMeta] = useState<any>({
        hero_title: 'Gold Loan Interest Rates.',
        hero_description: "Unlock the value of your assets with Guntur Urban Bank's premium gold loan programs. Experience financial freedom within minutes.",
        title: 'INCREASE IN PRICE OF 22 CARAT GOLD',
        description: 'It is observed that the price of 22 Carat Gold has gone up...'
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Hero background path
    const heroBg = '/images/gold_rates_hero_bg.png';

    useEffect(() => {
        const loadAllData = async () => {
            setLoading(true);
            try {
                const [schemesRes, metaRes] = await Promise.all([
                    client.get('gold-rates'),
                    client.get('pages/gold-rates')
                ]);

                const activeSchemes = schemesRes.data.filter((s: GoldRateScheme) => s.status === 'active');
                setSchemes(activeSchemes);

                if (metaRes.data && metaRes.data.content) {
                    const content = typeof metaRes.data.content === 'string'
                        ? JSON.parse(metaRes.data.content)
                        : metaRes.data.content;
                    setMeta(content);
                }
            } catch (err) {
                console.error('Failed to fetch gold rates data:', err);
                setError('Unable to load gold rates at this time. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadAllData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-100 border-t-[#0099ff] rounded-full animate-spin"></div>
                    <Coins className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-[#0099ff]" />
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Synchronizing Matrix...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#fafbfc] min-h-screen font-['Inter',_sans-serif]">
            {/* Premium Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-0 md:pt-24 md:pb-32 bg-[#0a0f1c]">
                {/* Background Image with Mesh Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroBg}
                        className="w-full h-full object-cover opacity-60"
                        alt=""
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.opacity = '0';
                        }}
                    />
                    {/* Multi-layer gradient for depth and text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c] via-[#0a0f1c]/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fafbfc]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-4">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2 leading-[0.85] font-['Poppins'] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                            {meta.hero_title}
                        </h1>
                        <p className="text-slate-300 mb-2 text-sm md:text-lg max-w-xl leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            {meta.hero_description}
                        </p>
                    </div>
                </div>

                {/* Floating Stats or Details */}
                <div className="absolute bottom-6 left-0 right-0 z-20 hidden md:block">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { icon: ShieldCheck, label: 'Secure Storage', sub: 'Swiss-grade vault security' },
                                { icon: Clock, label: 'Instant Approval', sub: 'Payout in under 30 minutes' },
                                { icon: Calculator, label: 'Fair Valuation', sub: 'Daily market linked rates' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex items-center gap-5 group hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-400/20 group-hover:scale-110 transition-transform">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-base tracking-tight mb-0.5">{item.label}</p>
                                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Matrix Section */}
            <section className="relative z-30 mt-4">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Matrix Preface Section */}
                    {meta.title && (
                        <div className="mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
                            <div className="pl-5 border-l-[4px] border-[#0099ff] mb-4">
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase font-['Poppins']">
                                    {meta.title}
                                </h2>
                            </div>
                            {meta.description && (
                                <div className="bg-slate-50 border border-slate-100 p-5 md:p-6 rounded-3xl text-slate-600 text-sm md:text-base leading-relaxed font-medium shadow-none mb-6">
                                    {meta.description}
                                </div>
                            )}
                        </div>
                    )}

                    {error ? (
                        <Card className="border-red-100 bg-white rounded-[3rem] text-center border-2 shadow-2xl">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle className="w-10 h-10 text-red-500" />
                            </div>
                            <h2 className="text-3xl font-black text-red-900 tracking-tight mb-3 uppercase">API Connection Error</h2>
                            <p className="text-slate-500 font-medium mb-10 max-w-md mx-auto">{error}</p>
                            <button onClick={() => window.location.reload()} className="px-12 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-500/20">
                                Re-sync Matrix
                            </button>
                        </Card>
                    ) : (
                        <div className="space-y-2">
                            {schemes.length === 0 ? (
                                <Card className="p-4 border-blue-100 bg-white rounded-[4rem] text-center border shadow-[0_40px_80px_-20px_rgba(0,153,255,0.12)]">
                                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <Coins className="w-10 h-10 text-blue-300" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Awaiting Rate Matrix Pulse...</h3>
                                    <p className="text-slate-400 font-medium text-lg max-w-md mx-auto leading-relaxed">Our lending analysts are processing the latest market data. Rates will appear here momentarily.</p>
                                </Card>
                            ) : (
                                schemes.map((scheme) => (
                                    <div key={scheme.id} className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
                                        <div className="bg-white rounded-[3.5rem] overflow-hidden">

                                            {/* Data Matrix */}
                                            <div className="overflow-x-auto px-4 py-2">
                                                <table className="w-full table-auto border-collapse border border-slate-200">
                                                    <thead>
                                                        <tr className="bg-slate-50">
                                                            {scheme.headers.map((header, i) => (
                                                                <th key={i} className="px-5 py-3 text-left border border-slate-200">
                                                                    <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider leading-tight">
                                                                        {header}
                                                                    </div>
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {scheme.rows.map((row, rowIndex) => (
                                                            <tr key={rowIndex} className="group transition-all hover:bg-blue-50/30 relative">
                                                                {row.row_data.map((cell, cellIndex) => (
                                                                    <td key={cellIndex} className="px-5 py-2.5 border border-slate-200">
                                                                        <div className="text-slate-900 text-sm md:text-base font-semibold tracking-tight font-['Poppins']">
                                                                            {cell || '—'}
                                                                        </div>
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Legal & Action Bar */}
                                            <div className="bg-slate-900 px-6 py-4 flex flex-wrap items-center justify-between gap-4 overflow-hidden relative">
                                                <div className="flex items-center gap-3 relative z-10">
                                                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">RBI Guideline Compliant • Transparent Fee Structure</p>
                                                </div>
                                                <button
                                                    onClick={() => window.location.hash = '#loans'}
                                                    className="relative z-10 group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all font-['Poppins']"
                                                >
                                                    <span className="text-white font-bold text-[10px] uppercase tracking-widest">Loan Catalog</span>
                                                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                                {/* Decorative element for bar */}
                                                <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-blue-500/10 skew-x-[-20deg] translate-x-12"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
}

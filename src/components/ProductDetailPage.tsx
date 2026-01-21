import { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Loader2,
    CheckCircle2,
    TrendingUp,
    Coins,
    Clock,
    ShieldCheck,
    Calculator,
    Home,
    Briefcase,
    GraduationCap,
    Building2,
    Car,
    Plane,
    User,
    Heart,
    Wallet,
    PiggyBank,
    RefreshCw,
    CircleDollarSign
} from 'lucide-react';
import { Button } from './ui/button';
import client from '../api/client';

const iconMap: any = {
    Home,
    Briefcase,
    GraduationCap,
    Building2,
    Car,
    Plane,
    User,
    Heart,
    TrendingUp,
    CircleDollarSign,
    Wallet,
    PiggyBank,
    RefreshCw,
    Coins
};

interface RateRow {
    id: number;
    row_data: string[];
}

interface Product {
    id: number;
    category: 'deposit' | 'loan';
    title: string;
    description: string;
    icon: string;
    summary_rate: string;
    features: string[];
    rate_headers: string[];
    rates: RateRow[];
    status: 'active' | 'inactive';
    image_url?: string;
}

interface ProductDetailPageProps {
    id: string;
    category: 'deposit' | 'loan';
}

export function ProductDetailPage({ id, category }: ProductDetailPageProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await client.get(`/products/${id}`);
                if (response.data.category !== category) {
                    setError('Product not found');
                    return;
                }
                setProduct(response.data);
            } catch (err) {
                console.error('Failed to fetch product', err);
                setError('Failed to load product details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id, category]);

    const handleBack = () => {
        window.location.hash = `#${category === 'deposit' ? 'deposits' : 'loans'}`;
    };

    const handleApplyNow = () => {
        sessionStorage.setItem('pendingApplyId', id);
        window.location.hash = `#${category === 'deposit' ? 'deposits' : 'loans'}`;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-[#0099ff] mx-auto mb-4" />
                    <p className="text-gray-500 font-medium animate-pulse">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-[104px]">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CircleDollarSign className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
                    <Button onClick={handleBack} className="bg-[#0099ff] hover:bg-[#0088ee]">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to {category === 'deposit' ? 'Deposits' : 'Loans'}
                    </Button>
                </div>
            </div>
        );
    }

    const Icon = iconMap[product.icon] || (category === 'deposit' ? Wallet : Briefcase);
    const isLoan = category === 'loan';

    return (
        <div className="min-h-screen bg-gray-50 pt-[104px]">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#0099ff] to-[#0077cc] text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <div className="flex items-center gap-6">
                        {/* Back Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleBack}
                            className="text-white hover:bg-white/20 rounded-full shrink-0"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Button>

                        {/* Icon */}
                        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/10 shrink-0">
                            <Icon className="w-12 h-12 text-white" />
                        </div>

                        {/* Title and Description */}
                        <div className="flex-1 min-w-0">
                            <h1 className="text-3xl lg:text-4xl font-black mb-2 leading-tight">
                                {product.title}
                            </h1>
                            <p className="text-base lg:text-lg text-white/90 font-medium">
                                {product.description}
                            </p>
                        </div>

                        {/* Interest Rate (for deposits only) */}
                        {!isLoan && (
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shrink-0">
                                <TrendingUp className="w-6 h-6" />
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider opacity-80">Interest Rate</p>
                                    <p className="text-2xl font-black">{product.summary_rate}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-12">
                {/* Image and Key Features Section - Side by Side */}
                <div className="bg-white rounded-[4rem] p-8 lg:p-12 mb-12 border border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Side - Product Image */}
                        {product.image_url ? (
                            <div className="aspect-video rounded-2xl overflow-hidden border border-gray-200">
                                <img
                                    src={product.image_url}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-[#0099ff]/10 to-[#0077cc]/10 flex items-center justify-center">
                                <Icon className="w-24 h-24 text-[#0099ff]/30" />
                            </div>
                        )}

                        {/* Right Side - Key Features */}
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                <CheckCircle2 className="w-8 h-8 text-[#0099ff]" />
                                Key Features & Benefits
                            </h2>
                            <div className="space-y-4">
                                {product.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#0099ff]/30 transition-colors group">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-[#0099ff] transition-colors shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-[#0099ff] group-hover:text-white" />
                                        </div>
                                        <p className="text-gray-700 font-bold text-base leading-relaxed">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interest Rate Table */}
                {product.rates && product.rates.length > 0 && !isLoan && (
                    <div className="bg-white rounded-[5rem] border border-gray-200 overflow-hidden mb-12 animate-in slide-in-from-bottom-8 duration-700">
                        <div className="flex flex-col">
                            <div className={`${isLoan ? 'bg-gray-900' : 'bg-gradient-to-br from-[#0099ff] to-[#0077cc]'} p-12 lg:p-16 text-white relative`}>
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                                    <div className="max-w-2xl">
                                        <div className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-black uppercase tracking-[0.3em] rounded-full mb-6">
                                            Competitive Rates
                                        </div>
                                        <h2 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
                                            Interest Rate<br />
                                            <span className={isLoan ? 'text-[#0099ff]' : 'text-white/80'}>Structure</span>
                                        </h2>
                                        <p className="text-gray-300 mb-0 text-base leading-relaxed font-medium">
                                            {isLoan
                                                ? 'Flexible repayment tenures and quick approvals tailored for your financial needs.'
                                                : 'Competitive rates with quarterly interest credits. Higher rates for senior citizens.'}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:min-w-[450px]">
                                        <div className="flex items-center gap-4 p-4 bg-white/20 rounded-2xl border border-white/10">
                                            <div className="w-12 h-12 bg-[#0099ff]/10 rounded-xl flex items-center justify-center">
                                                <Clock className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-white/80 uppercase tracking-widest mb-1">
                                                    {isLoan ? 'Processing Time' : 'Interest Credit'}
                                                </p>
                                                <p className="text-lg font-bold">{isLoan ? '48 Working Hours*' : 'Quarterly'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-5 bg-white/20 rounded-2xl border border-white/10">
                                            <div className="w-12 h-12 bg-[#0099ff]/10 rounded-xl flex items-center justify-center">
                                                <ShieldCheck className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-white/80 uppercase tracking-widest mb-1">
                                                    {isLoan ? 'Prepayment' : 'Insurance'}
                                                </p>
                                                <p className="text-lg font-bold">{isLoan ? 'Nil Charges*' : 'DICGC Covered'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 lg:p-16 bg-white">
                                <div className="overflow-x-auto rounded-[3rem] border border-gray-200 mb-4">
                                    <table className="w-full min-w-[500px] border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                {product.rate_headers.map((header, hIdx) => (
                                                    <th
                                                        key={hIdx}
                                                        className={`py-4 px-8 text-xs font-black text-gray-900 uppercase tracking-[0.2em] border-b-2 border-gray-100 ${hIdx === 0 ? 'text-left' : 'text-center'
                                                            }`}
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-900">
                                            {product.rates.map((rate, rIdx) => (
                                                <tr key={rIdx} className="hover:bg-blue-50/30 transition-all duration-300">
                                                    {rate.row_data.map((val, vIdx) => (
                                                        <td
                                                            key={vIdx}
                                                            className={`py-3 border-b px-8 text-gray-800 ${vIdx === 0
                                                                ? 'text-base font-bold text-gray-900'
                                                                : 'text-center text-md font-black'
                                                                } ${vIdx > 0 && vIdx === product.rate_headers.length - 1 ? 'text-[#0099ff]' : ''
                                                                }`}
                                                        >
                                                            {val}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-10 flex flex-col sm:flex-row items-center gap-5 p-6 bg-[#0099ff]/5 rounded-2xl border border-[#0099ff]/10">
                                    <Calculator className="w-10 h-10 text-[#0099ff] shrink-0" />
                                    <div>
                                        <p className="text-gray-900 font-black mb-1">Need a customized plan?</p>
                                        <p className="text-gray-600 text-sm font-medium leading-relaxed">
                                            Rates shown are indicative. Actual rates depend on your profile. Contact us for a personalized quote.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CTA Section */}
                <div className="bg-[#0099ff]/10 rounded-[5rem] p-12 md:p-16 text-white text-center border border-gray-200">
                    <h2 className="text-3xl text-[#0099ff] md:text-4xl font-black mb-4">Ready to Get Started?</h2>
                    <p className="text-xl text-gray-900 mb-8 max-w-2xl mx-auto">
                        {isLoan
                            ? 'Apply now and our loan experts will contact you within 24 hours to guide you through the process.'
                            : 'Open your account today and start earning competitive interest on your savings.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={handleApplyNow}
                            className="bg-[#0099ff] text-white hover:bg-white/20 h-10 px-4 rounded-3xl font-black text-md"
                        >
                            Apply Now
                        </Button>
                        <Button
                            onClick={handleBack}
                            variant="outline"
                            className="border-white/30 text-gray-900 hover:bg-white/10 h-10 px-4 rounded-3xl font-black text-md"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            View All {isLoan ? 'Loans' : 'Deposits'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

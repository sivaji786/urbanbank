import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, PiggyBank, RefreshCw, Building2, Coins, Loader2, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import client from '../api/client';

const iconMap: any = {
  Wallet,
  TrendingUp,
  PiggyBank,
  RefreshCw,
  Building2,
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
}

type ViewState = 'list' | 'apply';

export function DepositsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<ViewState>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.get('/products?category=deposit');
        setProducts(response.data.filter((p: Product) => p.status === 'active'));
      } catch (error) {
        console.error('Failed to fetch deposits', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleApplyClick = (product: Product) => {
    setSelectedProduct(product);
    setView('apply');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setView('list');
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await client.post('/applications/deposit', {
        ...formData,
        deposit_type: selectedProduct?.title,
      });
      toast.success('Your application has been submitted successfully!');
      setView('list');
      setFormData({ name: '', email: '', phone: '' });
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Failed to submit application', error);
      toast.error('Failed to submit application. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#0099ff] mx-auto mb-4" />
          <p className="text-gray-500 font-medium animate-pulse">Loading deposit schemes...</p>
        </div>
      </div>
    );
  }

  if (view === 'apply' && selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 pt-[104px]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-[#0099ff] to-[#0077cc] px-8 py-10 text-white relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="absolute left-4 top-4 text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Apply for {selectedProduct.title}</h2>
                <p className="text-white/80">Fill in your details and our experts will reach out to you.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="h-12 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="h-12 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10"
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10 digit mobile number"
                    className="h-12 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10"
                    required
                  />
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-[2] h-12 bg-[#0099ff] hover:bg-[#0088ee] text-white font-semibold text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  Submit Interest
                </Button>
              </div>
              <p className="text-center text-xs text-gray-500 pt-4">
                By submitting, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[104px]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0099ff] to-[#0077cc] text-white py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="text-4xl lg:text-5xl mb-4 font-bold">Deposit Schemes</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Secure your future with our range of flexible and high-yield deposit options designed for every need.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((deposit) => {
            const Icon = iconMap[deposit.icon] || Wallet;
            return (
              <div
                key={deposit.id}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#0099ff]/30 group cursor-pointer"
                onClick={() => window.location.hash = `#deposit-details/${deposit.id}`}
              >
                <div className="p-4 bg-[#0099ff]/10 rounded-xl inline-block mb-6 group-hover:bg-[#0099ff] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{deposit.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed h-[4.5rem]">{deposit.description}</p>

                <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">Interest Rate</p>
                    <p className="text-xl font-black text-green-700">{deposit.summary_rate}</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-500 opacity-50" />
                </div>

                <ul className="space-y-3 mb-8 h-40 overflow-hidden">
                  {deposit.features.slice(0, 4).map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-[#0099ff] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleApplyClick(deposit);
                  }}
                  className="w-full bg-[#0099ff] hover:bg-[#0088ee] text-white h-12 font-bold text-lg rounded-xl shadow-lg border-b-4 border-[#0077cc] active:border-b-0 active:translate-y-1 transition-all"
                >
                  Apply Now
                </Button>
              </div>
            );
          })}
        </div>

        {/* Dynamic Interest Rate Cards for each product that has rates */}
        <div className="space-y-16">
          {products.filter(p => p.rates && p.rates.length > 0).map((product) => (
            <div key={`rates-${product.id}`} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative group animate-in slide-in-from-bottom-8 duration-700">
              <div className="bg-gradient-to-r from-[#0099ff] to-[#0077cc] p-8 md:p-10 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black mb-3">{product.title} Interest Rates</h2>
                    <p className="text-white/80 font-medium flex items-center gap-2">
                      Effective from June 1, 2024 | Rates are subject to change
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl text-white text-lg font-black border border-white/30 shadow-xl mb-2">
                      +0.50% for Senior Citizens
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-2xl">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50/50">
                        {product.rate_headers.map((header, hIdx) => (
                          <th key={hIdx} className={`py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b-2 border-gray-100 ${hIdx === 0 ? 'text-left' : 'text-center'}`}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {product.rates.map((rate, rIdx) => (
                        <tr key={rIdx} className="hover:bg-blue-50/30 transition-all duration-300 group/row">
                          {rate.row_data.map((val, vIdx) => (
                            <td key={vIdx} className={`py-6 px-8 text-gray-800 ${vIdx === 0 ? 'text-base font-bold text-gray-900' : 'text-center text-lg font-black'} ${vIdx > 0 && vIdx === product.rate_headers.length - 1 ? 'text-[#0099ff]' : ''}`}>
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 flex items-center gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                  <Coins className="w-8 h-8 text-amber-500 shrink-0" />
                  <p className="text-sm text-amber-800 leading-relaxed font-medium">
                    Interest on {product.title} is calculated on a daily basis and credited quarterly. For bulk deposits above ₹2 Crores, please contact our nearest branch for special rates.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DICGC Insurance Info */}
        <div className="mt-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-[2rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0099ff]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0099ff]/20 rounded-full border border-[#0099ff]/30 text-[#0099ff] text-sm font-bold mb-6">
                <CheckCircle2 className="w-4 h-4" />
                RBI Insured
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Your money is safe with us</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
                Every depositor in our bank is insured up to a maximum of ₹5,00,000 (Rupees Five Lakhs) for both principal and interest amount held by them in the same right and same capacity as on the date of liquidation/cancellation of bank's license or from the date on which the scheme of amalgamation/merger/reconstruction comes into force.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#0099ff] hover:bg-[#0088ee] text-white px-10 h-14 rounded-2xl font-bold text-lg shadow-xl shadow-[#0099ff]/20">
                  DICGC Official Website
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-10 h-14 rounded-2xl font-bold text-lg" onClick={() => (window.location.hash = '#contact')}>
                  Contact Support
                </Button>
              </div>
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-white/5 flex items-center justify-center p-8 bg-white/10 backdrop-blur-xl">
                <Building2 className="w-full h-full text-white/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import {
  Home,
  Briefcase,
  GraduationCap,
  Building2,
  Car,
  Plane,
  User,
  Heart,
  Loader2,
  ArrowLeft,
  Send,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  CircleDollarSign,
  Calculator,
  ShieldCheck,
  FileText,
  UserCheck
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
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
  CircleDollarSign
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

export function LoansPage() {
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
        const response = await client.get('/products?category=loan');
        setProducts(response.data.filter((p: Product) => p.status === 'active'));
      } catch (error) {
        console.error('Failed to fetch loans', error);
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
      await client.post('/applications/loan', {
        ...formData,
        loan_type: selectedProduct?.title,
      });
      toast.success('Your loan interest has been submitted successfully!');
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
          <p className="text-gray-500 font-medium animate-pulse">Loading loan solutions...</p>
        </div>
      </div>
    );
  }

  if (view === 'apply' && selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 pt-[104px]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-blue-900 to-[#0099ff] px-10 py-12 text-white relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="absolute left-6 top-6 text-white hover:bg-white/20 rounded-full"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div className="text-center">
                <h2 className="text-4xl font-black mb-4 tracking-tight">Apply for {selectedProduct.title}</h2>
                <p className="text-blue-100 text-lg font-medium">Quick processing, minimal documentation, and expert guidance.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-10 md:p-16 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-black uppercase tracking-widest text-gray-400">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="h-14 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10 rounded-2xl text-lg"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-black uppercase tracking-widest text-gray-400">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="h-14 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10 rounded-2xl text-lg"
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <Label htmlFor="phone" className="text-sm font-black uppercase tracking-widest text-gray-400">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="h-14 border-gray-200 focus:border-[#0099ff] focus:ring-[#0099ff]/10 rounded-2xl text-lg"
                    required
                  />
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-16 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-black rounded-2xl text-lg"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-[2] h-16 bg-[#0099ff] hover:bg-[#0088ee] text-white font-black text-xl rounded-2xl shadow-xl shadow-blue-500/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  ) : (
                    <Send className="w-6 h-6 mr-2" />
                  )}
                  Submit Interest
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Your data is encrypted and secure with us.
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[104px]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-[#0099ff] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight animate-in slide-in-from-left duration-700">Loans & Advances</h1>
          <p className="text-2xl text-white/90 max-w-2xl font-medium animate-in slide-in-from-left delay-100 duration-700">
            Turn your dreams into reality with our attractive loan schemes and simplified documentation process.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Loan Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 animate-in fade-in duration-1000">
          {products.map((loan) => {
            const Icon = iconMap[loan.icon] || Briefcase;
            return (
              <div
                key={loan.id}
                className="bg-white rounded-[3rem] shadow-xl p-10 hover:shadow-2xl transition-all duration-500 border border-gray-100 relative group flex flex-col cursor-pointer"
                onClick={() => window.location.hash = `#loan-details/${loan.id}`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-40 h-40" />
                </div>

                <div className="p-5 bg-blue-50 rounded-[1.5rem] inline-block mb-8 w-fit group-hover:bg-[#0099ff] group-hover:text-white transition-all duration-300">
                  <Icon className="w-10 h-10" />
                </div>

                <h3 className="text-3xl font-black text-gray-900 mb-4">{loan.title}</h3>
                <p className="text-gray-500 mb-10 flex-grow text-base leading-relaxed font-medium">{loan.description}</p>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg text-green-600">
                        <CircleDollarSign className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Interest Rate</span>
                    </div>
                    <span className="text-2xl font-black text-green-700">{loan.summary_rate}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-10 h-40 overflow-hidden">
                  {loan.features.slice(0, 4).map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-4 text-gray-700 font-bold group/li">
                      <div className="mt-1.5 w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center group-hover/li:bg-[#0099ff] transition-colors shrink-0">
                        <ArrowRight className="w-2.5 h-2.5 text-[#0099ff] group-hover/li:text-white" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleApplyClick(loan);
                  }}
                  className="w-full bg-[#0099ff] hover:bg-[#0088ee] text-white h-16 font-black text-xl rounded-2xl shadow-xl shadow-blue-500/20 transform group-hover:scale-[1.02] transition-all"
                >
                  Apply Now
                </Button>
              </div>
            );
          })}
        </div>

        {/* Loan Interest Rate Tables */}
        <div className="space-y-24 mb-20">
          {products.filter(p => p.rates && p.rates.length > 0).map((product) => (
            <div key={`rates-${product.id}`} className="bg-white rounded-[4rem] shadow-2xl border border-gray-100 overflow-hidden group animate-in slide-in-from-bottom-12 duration-1000">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-gray-900 p-12 lg:p-20 text-white flex flex-col justify-center relative">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                  <div className="relative z-10">
                    <div className="inline-block px-4 py-1.5 bg-[#0099ff] text-white text-xs font-black uppercase tracking-[0.3em] rounded-full mb-6">
                      Competitive Rates
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">{product.title}<br /><span className="text-[#0099ff]">Rate Card</span></h2>
                    <p className="text-gray-400 mb-12 text-lg leading-relaxed font-medium">
                      Flexible repayment tenures and quick approvals tailored for your financial needs.
                    </p>
                    <div className="space-y-6">
                      <div className="flex items-center gap-5 p-6 bg-white/5 rounded-3xl border border-white/10">
                        <div className="w-12 h-12 bg-[#0099ff]/20 rounded-2xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-[#0099ff]" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Processing Time</p>
                          <p className="text-xl font-bold">48 Working Hours*</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 p-6 bg-white/5 rounded-3xl border border-white/10">
                        <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                          <ShieldCheck className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Prepayment</p>
                          <p className="text-xl font-bold">Nil Charges*</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 p-12 lg:p-20 bg-white">
                  <div className="overflow-x-auto rounded-[2.5rem] border border-gray-100 shadow-inner">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="bg-gray-50/50">
                          {product.rate_headers.map((header, hIdx) => (
                            <th key={hIdx} className={`py-8 px-10 text-xs font-black text-gray-400 uppercase tracking-[0.3em] border-b-2 border-gray-100 ${hIdx === 0 ? 'text-left' : 'text-center'}`}>
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {product.rates.map((rate, rIdx) => (
                          <tr key={rIdx} className="hover:bg-blue-50/30 transition-all duration-300">
                            {rate.row_data.map((val, vIdx) => (
                              <td key={vIdx} className={`py-8 px-10 text-gray-800 ${vIdx === 0 ? 'text-lg font-bold text-gray-900 uppercase tracking-wide' : 'text-center text-xl font-black'} ${vIdx > 0 && vIdx === product.rate_headers.length - 1 ? 'text-[#0099ff]' : ''}`}>
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 p-8 bg-[#0099ff]/5 rounded-3xl border border-[#0099ff]/10">
                    <Calculator className="w-12 h-12 text-[#0099ff] shrink-0" />
                    <div>
                      <p className="text-gray-900 font-black mb-1">Need a customized EMI plan?</p>
                      <p className="text-gray-600 text-sm font-medium leading-relaxed">
                        Rates shown are indicative. Actual rates depend on your credit score, income profile, and loan tenure. Contact us for a personalized quote.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMI Calculator Placeholder or Integrated Section */}
        <div className="bg-white rounded-[3rem] shadow-2xl p-12 md:p-20 border border-gray-100 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">Plan your loan<br /><span className="text-[#0099ff]">Smarter & Better</span></h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium">
                Use our interactive EMI calculator to visualize your monthly repayments and plan your budget effectively.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <p className="text-2xl font-black text-gray-900 mb-1">0%</p>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Hidden Charges</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <p className="text-2xl font-black text-gray-900 mb-1">Easy</p>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Documentation</p>
                </div>
              </div>
            </div>
            <div className="p-10 bg-gray-900 rounded-[3rem] text-white shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent rounded-[3rem]"></div>
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#0099ff] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Quick Quote</h3>
                </div>
                <div className="space-y-4">
                  <Label className="text-gray-400 text-xs font-black uppercase tracking-widest">Desired Loan Amount</Label>
                  <Input className="bg-white/5 border-white/10 h-14 rounded-2xl text-xl font-bold focus:ring-[#0099ff]" placeholder="₹ 5,00,000" />
                </div>
                <div className="space-y-4">
                  <Label className="text-gray-400 text-xs font-black uppercase tracking-widest">Expected Tenure (Years)</Label>
                  <Input className="bg-white/5 border-white/10 h-14 rounded-2xl text-xl font-bold focus:ring-[#0099ff]" placeholder="5 Years" />
                </div>
                <Button className="w-full bg-[#0099ff] hover:bg-[#0088ee] h-16 rounded-2xl font-black text-xl shadow-xl shadow-blue-500/20">
                  Calculate EMI
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility & Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-[3rem] shadow-xl p-12 border border-blue-50">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
              <UserCheck className="w-8 h-8 text-[#0099ff]" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-6">Eligibility Criteria</h3>
            <ul className="space-y-5">
              {['Minimum age 21 years', 'Steady source of income', 'Good credit score (750+ preferred)', 'Resident of operational areas'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-600 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-[3rem] shadow-xl p-12 border border-green-50">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-6">Required Documents</h3>
            <ul className="space-y-5">
              {['ID Proof (Aadhar/PAN)', 'Address Proof', 'Income Proof (3 months)', 'Bank Statements (6 months)'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-600 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[#0099ff] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

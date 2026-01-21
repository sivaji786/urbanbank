import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, PiggyBank, RefreshCw, Building2, Coins, Loader2, ArrowLeft, Send, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import client from '../api/client';
import { Captcha } from './ui/Captcha';

const iconMap: any = {
  Wallet,
  TrendingUp,
  PiggyBank,
  RefreshCw,
  Building2,
  Coins
};

interface Branch {
  id: number;
  name: string;
  district: string;
}

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

type ViewState = 'list' | 'apply';

export function DepositsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<ViewState>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isBranchesLoading, setIsBranchesLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [applicationId, setApplicationId] = useState<string>('');
  const [duplicateWarning, setDuplicateWarning] = useState<any>(null);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch_id: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.get('products?category=deposit');
        setProducts(response.data.filter((p: Product) => p.status === 'active'));
      } catch (error) {
        console.error('Failed to fetch deposits', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      setIsBranchesLoading(true);
      try {
        const response = await client.get('branches');
        setBranches(response.data);
      } catch (error) {
        console.error('Failed to fetch branches', error);
        toast.error('Failed to load branches');
      } finally {
        setIsBranchesLoading(false);
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const pendingId = sessionStorage.getItem('pendingApplyId');
      if (pendingId) {
        const product = products.find(p => String(p.id) === String(pendingId));
        if (product) {
          handleApplyClick(product);
          sessionStorage.removeItem('pendingApplyId');
        }
      }
    }
  }, [products]);

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
    if (!formData.name || !formData.email || !formData.phone || !formData.branch_id) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isCaptchaValid) {
      toast.error('Please complete the CAPTCHA verification');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await client.post('applications/deposit', {
        ...formData,
        deposit_type: selectedProduct?.title,
      });

      if (response.data.success) {
        setApplicationId(response.data.application_id);
        setShowSuccessModal(true);
        setFormData({ name: '', email: '', phone: '', branch_id: '' });
        setIsCaptchaValid(false);
      }
    } catch (error: any) {
      console.error('Failed to submit application', error);
      if (error.response?.status === 409 && error.response?.data?.duplicate) {
        setDuplicateWarning(error.response.data.existing_application);
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to submit application. Please try again later.');
      }
      setIsCaptchaValid(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setView('list');
    window.scrollTo(0, 0);
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#d4e8f6] px-8 py-4 text-[#0099ff] relative border-b border-gray-100">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="absolute left-4 top-4 text-gray hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Apply for {selectedProduct.title}</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
              <p className="text-gary/80">Fill in your details and our experts will reach out to you.</p>
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
                <div className="space-y-2">
                  <Label htmlFor="branch" className="text-sm font-semibold text-gray-700">Select Branch</Label>
                  <select
                    id="branch"
                    value={formData.branch_id}
                    onChange={(e) => setFormData({ ...formData, branch_id: e.target.value })}
                    className="h-12 w-full border border-gray-200 rounded-md px-3 focus:border-[#0099ff] focus:ring-2 focus:ring-[#0099ff]/10 outline-none transition-all"
                    required
                    disabled={isBranchesLoading}
                  >
                    <option value="">Choose your preferred branch</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name} - {branch.district}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
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

              {/* Duplicate Warning */}
              {duplicateWarning && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-amber-900 mb-1">Application Already Exists</h4>
                    <p className="text-sm text-amber-800">
                      You have already applied for this product. Your application ID is{' '}
                      <span className="font-bold">{duplicateWarning.application_id}</span> and current status is{' '}
                      <span className="font-bold capitalize">{duplicateWarning.status}</span>.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDuplicateWarning(null)}
                    className="text-amber-600 hover:text-amber-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Custom CAPTCHA */}
              <div className="flex justify-center pt-4">
                <Captcha
                  onVerify={(isValid) => setIsCaptchaValid(isValid)}
                  onReset={() => setIsCaptchaValid(false)}
                />
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-[#d4e8f6] font-semibold"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-[2] h-12 bg-[#0099ff] hover:bg-[#0088ee] text-white font-semibold text-lg"
                  disabled={isSubmitting || !isCaptchaValid}
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

          {/* Success Modal */}
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in slide-in-from-bottom-4 duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                  <p className="text-gray-600 mb-6">
                    Your deposit application has been submitted successfully.
                  </p>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-1">Your Application ID</p>
                    <p className="text-2xl font-bold text-[#0099ff] tracking-wide">{applicationId}</p>
                    <p className="text-xs text-gray-500 mt-2">Please save this ID for future reference</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    Our team will review your application and contact you soon.
                  </p>
                  <Button
                    onClick={handleCloseSuccessModal}
                    className="w-full h-12 bg-[#0099ff] hover:bg-[#0088ee] text-white font-semibold transition-colors"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#0099ff]/30 group"
              >
                <div className="p-4 bg-[#0099ff]/10 rounded-xl inline-block mb-6 group-hover:bg-[#0099ff] group-hover:text-gray transition-colors duration-300 overflow-hidden w-16 h-16 shrink-0 flex items-center justify-center">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{deposit.title}</h3>

                {/* Product Image after title */}
                {deposit.image_url && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={deposit.image_url}
                      alt={deposit.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

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

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => window.location.hash = `#deposit-details/${deposit.id}`}
                    className="bg-[#0099ff]/10 h-10 border-gray-200 hover:bg-[#0088ee]/10 text-gray-700 hover:border-[#0099ff] hover:text-[#0099ff] font-bold rounded-xl transition-all"
                  >
                    Read More
                  </Button>
                  <Button
                    onClick={() => handleApplyClick(deposit)}
                    className="h-10 bg-[#0099ff] hover:bg-[#0088ee] text-white font-bold rounded-xl shadow-lg shadow-blue-500/10 transition-all active:scale-95"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Interest Rate Cards for each product that has rates */}
        <div className="space-y-16">
          {products.filter(p => p.rates && p.rates.length > 0 && p.title !== 'Fixed Deposit' && p.title !== 'Tax Saving Fixed Deposit').map((product) => (
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
        <div
          className="mt-20 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden rounded-xl border border-[#0099ff]/10"
          style={{ backgroundColor: 'oklab(66.9047% -0.0664032 -0.171257 / 0.1)' }}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0099ff]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0099ff]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-[#0099ff]/20 text-[#0099ff] text-sm font-bold mb-6">
                <CheckCircle2 className="w-4 h-4" />
                RBI Insured
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight text-gray-900">Your money is safe with us</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-2xl font-medium">
                Every depositor in our bank is insured up to a maximum of ₹5,00,000 (Rupees Five Lakhs) for both principal and interest amount held by them in the same right and same capacity as on the date of liquidation/cancellation of bank's license.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-[#0099ff] hover:bg-[#0088ee] text-white px-5 h-10 rounded-xl font-bold text-sm shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                  onClick={() => window.open('https://www.dicgc.org.in', '_blank')}
                >
                  DICGC Official Website
                </Button>
                <Button
                  variant="outline"
                  className="bg-white text-[#0099ff] hover:bg-white/50 px-5 h-10 rounded-xl font-bold text-sm transition-all"
                  onClick={() => (window.location.hash = '#contact')}
                >
                  Contact Support
                </Button>
              </div>
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] border-8 border-white flex items-center justify-center p-8 bg-white/40 backdrop-blur-xl rotate-12 hover:rotate-0 transition-transform duration-500 shadow-xl shadow-[#0099ff]/5">
                <Building2 className="w-full h-full text-[#0099ff]/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

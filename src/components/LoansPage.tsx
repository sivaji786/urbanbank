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
  TrendingUp,
  CircleDollarSign,
  Calculator,
  FileText,
  UserCheck,
  AlertCircle,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import client from '../api/client';
import { Captcha } from './ui/Captcha';

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

export function LoansPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<ViewState>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isBranchesLoading, setIsBranchesLoading] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [applicationId, setApplicationId] = useState<string>('');
  const [duplicateWarning, setDuplicateWarning] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch_id: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.get('products?category=loan');
        setProducts(response.data.filter((p: Product) => p.status === 'active'));
      } catch (error) {
        console.error('Failed to fetch loans', error);
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
      const response = await client.post('applications/loan', {
        ...formData,
        loan_type: selectedProduct?.title,
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
          <p className="text-gray-500 font-medium animate-pulse">Loading loan solutions...</p>
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
              <div className="pt-4">
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
                    Your loan application has been submitted successfully.
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
          <h1 className="text-4xl lg:text-5xl mb-4 font-bold">Loans & Advances</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Turn your dreams into reality with our attractive loan schemes and simplified documentation process.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Loan Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((loan) => {
            const Icon = iconMap[loan.icon] || Briefcase;
            return (
              <div
                key={loan.id}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#0099ff]/30 group"
              >
                <div className="p-4 bg-[#0099ff]/10 rounded-xl inline-block mb-6 group-hover:bg-[#0099ff] group-hover:text-gray transition-colors duration-300 overflow-hidden w-16 h-16 shrink-0 flex items-center justify-center">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{loan.title}</h3>

                {/* Product Image after title */}
                {loan.image_url && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={loan.image_url}
                      alt={loan.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed h-[4.5rem]">{loan.description}</p>

                <ul className="space-y-3 mb-8 h-40 overflow-hidden">
                  {loan.features.slice(0, 4).map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-[#0099ff] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => window.location.hash = `#loan-details/${loan.id}`}
                    className="bg-[#0099ff]/10 h-10 border-gray-200 hover:bg-[#0088ee]/10 text-gray-700 hover:border-[#0099ff] hover:text-[#0099ff] font-bold rounded-xl transition-all"
                  >
                    Read More
                  </Button>
                  <Button
                    onClick={() => handleApplyClick(loan)}
                    className="h-10 bg-[#0099ff] hover:bg-[#0088ee] text-white font-bold rounded-xl shadow-lg shadow-blue-500/10 transition-all active:scale-95"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tools and Eligibility Section */}
        <div
          className="mt-20 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden rounded-xl border border-[#0099ff]/10"
          style={{ backgroundColor: 'oklab(66.9047% -0.0664032 -0.171257 / 0.1)' }}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0099ff]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0099ff]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-[#0099ff]/20 text-[#0099ff] text-sm font-bold mb-6">
                <Calculator className="w-4 h-4" />
                EMI Planning
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight text-gray-900">Plan your loan smarter</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-2xl font-medium">
                Our attractive loan schemes come with high eligibility limits and simplified documentation process to help you achieve your goals faster.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-blue-50 shadow-sm">
                  <UserCheck className="w-8 h-8 text-[#0099ff] mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">Easy Eligibility</h4>
                  <p className="text-sm text-gray-500">Minimum age 21, steady income source.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-green-50 shadow-sm">
                  <FileText className="w-8 h-8 text-green-600 mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">Fast Processing</h4>
                  <p className="text-sm text-gray-500">Minimal documents and quick approvals.</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent rounded-[2.5rem]"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-[#0099ff] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Quick EMI Check</h3>
                </div>
                <div className="space-y-4">
                  <Label className="text-gray-400 text-xs font-black uppercase tracking-widest">Loan Amount</Label>
                  <Input className="bg-white/5 border-white/10 h-12 rounded-xl text-lg font-bold focus:ring-[#0099ff] text-white" placeholder="₹ 5,00,000" />
                </div>
                <div className="space-y-4">
                  <Label className="text-gray-400 text-xs font-black uppercase tracking-widest">Tenure (Years)</Label>
                  <Input className="bg-white/5 border-white/10 h-12 rounded-xl text-lg font-bold focus:ring-[#0099ff] text-white" placeholder="5 Years" />
                </div>
                <Button className="w-full bg-[#0099ff] hover:bg-[#0088ee] h-14 rounded-xl font-black text-lg shadow-xl shadow-blue-500/20">
                  Contact for Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

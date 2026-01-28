import { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, PiggyBank, Landmark, Sparkles } from 'lucide-react';
import client from '../api/client';

interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  category: 'deposit' | 'loan';
  status: 'active' | 'inactive';
}

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'deposit' | 'loan';
}

const defaultImage = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwc2VydmljZXN8ZW58MXx8fHwxNzYxODI4NzgwfDA&ixlib=rb-4.1.0&q=80&w=1080';

export function BankingExcellenceSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await client.get('products');
      const products: Product[] = response.data;

      const activeProducts = products
        .filter(product => product.status === 'active')
        .map(product => ({
          id: product.id,
          title: product.title,
          description: product.description || 'Explore our banking solutions tailored to meet your financial needs.',
          image: product.image_url || defaultImage,
          category: product.category
        }));

      setServices(activeProducts);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setIsLoading(false);
    }
  };

  const depositProducts = services.filter(s => s.category === 'deposit').slice(0, 3);
  const loanProducts = services.filter(s => s.category === 'loan').slice(0, 3);

  const handleNavigate = (path: string) => {
    window.location.hash = path;
    window.scrollTo(0, 0);
  };

  return (
    <section id="products-services" className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Compact Header */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gray-50 text-[#0099ff] text-sm font-semibold uppercase tracking-[0.3em] mb-2 shadow-sm border border-blue-100/50">
            <Sparkles className="w-4 h-4" />
            Financial Excellence
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">
            How can we <span className="text-[#0099ff]">help</span> you today?
          </h2>
        </div>

        {/* Single Row Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Savings Section - Single Row Card */}
          <div className="group bg-[#f8fbff] rounded-[2.5rem] p-6 md:p-8 border border-blue-50 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,153,255,0.08)]">
            <div className="flex flex-col md:flex-row md:items-start gap-8">

              {/* Category Info */}
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center text-[#0099ff] mb-4">
                  <PiggyBank className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tighter">Grow My Savings</h3>
                <p className="text-gray-500 font-medium text-xs mb-6 leading-relaxed">
                  High-yield savings plans and secure deposits to build your wealth with total security.
                </p>
                <button
                  onClick={() => handleNavigate('deposits')}
                  className="group/btn inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-[#0099ff] text-white font-black text-[9px] uppercase tracking-[0.2em] shadow-md hover:bg-black transition-all duration-500"
                >
                  Explore All
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1.5 transition-transform" />
                </button>
              </div>

              {/* Product List Row-style */}
              <div className="flex-1 space-y-3">
                {isLoading ? (
                  [1, 2].map(i => <div key={i} className="h-14 bg-white/50 rounded-xl animate-pulse" />)
                ) : depositProducts.slice(0, 3).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleNavigate(`deposit-details/${service.id}`)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-50 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 transform hover:-translate-x-1 text-left"
                  >
                    <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
                      <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-gray-800 text-[13px] leading-tight">{service.title}</h4>
                    </div>
                    <ChevronRight className="text-gray-300 group-hover:text-[#0099ff] w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loans Section - Single Row Card */}
          <div className="group bg-[#fff9f9] rounded-[2.5rem] p-6 md:p-8 border border-red-50 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(220,38,38,0.08)]">
            <div className="flex flex-col md:flex-row md:items-start gap-8">

              {/* Category Info */}
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center text-red-600 mb-4">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tighter">Fund My Dreams</h3>
                <p className="text-gray-500 font-medium text-xs mb-6 leading-relaxed">
                  Flexible financing for your home, business, and dreams with competitive low rates.
                </p>
                <button
                  onClick={() => handleNavigate('loans')}
                  className="group/btn inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-red-600 text-white font-black text-[9px] uppercase tracking-[0.2em] shadow-md hover:bg-black transition-all duration-500"
                >
                  Explore All
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1.5 transition-transform" />
                </button>
              </div>

              {/* Product List Row-style */}
              <div className="flex-1 space-y-3">
                {isLoading ? (
                  [1, 2].map(i => <div key={i} className="h-14 bg-white/50 rounded-xl animate-pulse" />)
                ) : loanProducts.slice(0, 3).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleNavigate(`loan-details/${service.id}`)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-50 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 transform hover:translate-x-1 text-left"
                  >
                    <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
                      <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-gray-800 text-[13px] leading-tight">{service.title}</h4>
                    </div>
                    <ChevronRight className="text-gray-300 group-hover:text-red-600 w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default BankingExcellenceSection;

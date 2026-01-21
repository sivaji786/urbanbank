import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import client from '../api/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

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

      // Filter active products and map to service items
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
      // Keep empty array on error - component will show nothing
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block px-4 py-1.5 bg-[#0099ff]/10 text-[#0099ff] text-xs font-black uppercase tracking-widest rounded-full mb-4">
            Financial Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Our Products <span className="text-[#0099ff]">&</span> Services
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
            Discover a wide range of innovative banking products designed to empower your financial journey and secure your future.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-[#0099ff]"></div>
            <p className="text-gray-400 font-bold animate-pulse">Loading Excellence...</p>
          </div>
        ) : services.length > 0 ? (
          /* Services Carousel - 4 cards visible */
          <div className="max-w-7xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-6">
                {services.map((service) => (
                  <CarouselItem key={service.id} className="pl-6 !basis-full sm:!basis-1/2 md:!basis-1/3 lg:!basis-1/4">
                    <div className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,153,255,0.15)] transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
                      <a
                        href={`#${service.category === 'deposit' ? 'deposit-details' : 'loan-details'}/${service.id}`}
                        className="flex flex-col flex-grow"
                      >
                        {/* Service Image Section */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0099ff] shadow-sm">
                            {service.category}
                          </div>
                        </div>

                        {/* Service Content */}
                        <div className="p-8 flex flex-col flex-grow">
                          <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[#0099ff] transition-colors leading-tight">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 text-base mb-6 line-clamp-3 leading-relaxed font-medium">
                            {service.description}
                          </p>
                        </div>
                      </a>

                      <div className="px-8 pb-8 flex flex-col mt-auto">
                        <div className="pt-6 border-t border-gray-50">
                          <a
                            href={`#${service.category === 'deposit' ? 'deposit-details' : 'loan-details'}/${service.id}`}
                            className="inline-flex items-center gap-2 text-[#0099ff] font-black text-sm uppercase tracking-wider group/link"
                          >
                            Learn More
                            <div className="w-8 h-8 rounded-full bg-[#0099ff]/10 flex items-center justify-center group-hover/link:bg-[#0099ff] group-hover/link:text-white transition-all duration-300">
                              <ChevronRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-12">
                <CarouselPrevious className="static translate-y-0 h-12 w-12 border-2 border-gray-100 bg-white text-gray-500 hover:bg-[#0099ff] hover:text-white hover:border-[#0099ff] transition-all rounded-full" />
                <CarouselNext className="static translate-y-0 h-12 w-12 border-2 border-gray-100 bg-white text-gray-500 hover:bg-[#0099ff] hover:text-white hover:border-[#0099ff] transition-all rounded-full" />
              </div>
            </Carousel>
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">No products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default BankingExcellenceSection;

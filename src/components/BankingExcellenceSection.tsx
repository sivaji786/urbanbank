import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';


const services = [
  {
    id: 1,
    title: 'Project Finance',
    description: 'Comprehensive financial solutions for large-scale infrastructure and industrial projects with flexible repayment options.',
    image: 'https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwZmluYW5jZSUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MTgyODc3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 2,
    title: 'Gold Loans',
    description: 'Quick and secure loans against gold jewelry with competitive interest rates and minimal documentation requirements.',
    image: 'https://images.unsplash.com/photo-1717409014701-8e630ff057f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwamV3ZWxyeSUyMGxvYW58ZW58MXx8fHwxNzYxODI4Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 3,
    title: 'MSME Loans',
    description: 'Tailored financing solutions for micro, small, and medium enterprises to support business growth and working capital needs.',
    image: 'https://images.unsplash.com/photo-1647973035166-2abf410c68b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGJ1c2luZXNzJTIwTVNNRXxlbnwxfHx8fDE3NjE4Mjg3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 4,
    title: 'Mortgage Loans',
    description: 'Flexible property-backed loans with attractive interest rates for both residential and commercial real estate financing.',
    image: 'https://images.unsplash.com/photo-1729838809728-48566c1ef0e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3J0Z2FnZSUyMHByb3BlcnR5JTIwbG9hbnxlbnwxfHx8fDE3NjE4Mjg3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 5,
    title: 'Home Loans',
    description: 'Affordable home loan solutions to help you purchase or construct your dream home with easy EMI options and long tenures.',
    image: 'https://images.unsplash.com/photo-1743487014165-c26c868b8186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwaG91c2UlMjBrZXlzfGVufDF8fHx8MTc2MTgyODc4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 6,
    title: 'Digital Banking',
    description: 'Modern banking at your fingertips with mobile and internet banking services for seamless transactions and account management.',
    image: 'https://images.unsplash.com/photo-1649486116188-b464d7f864a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYmFua2luZyUyMG1vYmlsZXxlbnwxfHx8fDE3NjE4MDk0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 7,
    title: 'ATM Facility',
    description: '24/7 access to your funds through our extensive network of ATMs with secure transactions and multiple banking services.',
    image: 'https://images.unsplash.com/photo-1746826618149-7c54e99e7946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBVE0lMjBiYW5raW5nJTIwbWFjaGluZXxlbnwxfHx8fDE3NjE4Mjg3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export function BankingExcellenceSection() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#0099ff] text-sm uppercase tracking-wide mb-2">Banking Excellence</p>
          <h2 className="text-gray-900">Our Products & Services</h2>
        </div>

        {/* Services Carousel */}
        <div className="max-w-7xl mx-auto mb-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {services.map((service) => (
                <CarouselItem key={service.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/5">
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
                    {/* Service Image */}
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Service Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Title */}
                      <h3 className="text-gray-900 text-base mb-2">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                        {service.description}
                      </p>

                      {/* Learn More Link */}
                      <a
                        href="#"
                        className="text-[#0099ff] hover:text-[#0077cc] transition-colors text-sm inline-flex items-center gap-1 group/link"
                      >
                        Learn More
                        <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </div>
      </div>


    </section>
  );
}

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import {
  PiggyBank,
  Wallet,
  FileText,
  Home,
  GraduationCap,
  Building2,
  Briefcase,
  CircleDollarSign,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const deposits = [
  {
    icon: PiggyBank,
    title: 'Savings Account',
    description: 'Secure savings with competitive interest rates and flexible access',
    color: 'from-[#0099ff] to-[#0077cc]'
  },
  {
    icon: Wallet,
    title: 'Current Account',
    description: 'Designed for businesses with unlimited transactions',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: FileText,
    title: 'Fixed Deposit',
    description: 'High returns with flexible tenure options from 1 to 5 years',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: CircleDollarSign,
    title: 'Recurring Deposit',
    description: 'Build your savings systematically with monthly deposits',
    color: 'from-green-500 to-green-600'
  },
];

const loans = [
  {
    icon: Home,
    title: 'Home Loan',
    description: 'Make your dream home a reality with attractive interest rates',
    color: 'from-[#0099ff] to-[#0077cc]'
  },
  {
    icon: Building2,
    title: 'Mortgage Loan',
    description: 'Unlock the value of your property with flexible repayment',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: GraduationCap,
    title: 'Education Loan',
    description: 'Invest in your future with comprehensive education financing',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Briefcase,
    title: 'Business Loan',
    description: 'Fuel your business growth with tailored financial solutions',
    color: 'from-cyan-500 to-[#0099ff]'
  },
];

export function Services() {
  // Deposits carousel
  const [emblaRefDeposits, emblaApiDeposits] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1
  });

  const onPrevDeposits = useCallback(() => {
    if (emblaApiDeposits) emblaApiDeposits.scrollPrev();
  }, [emblaApiDeposits]);

  const onNextDeposits = useCallback(() => {
    if (emblaApiDeposits) emblaApiDeposits.scrollNext();
  }, [emblaApiDeposits]);

  // Loans carousel
  const [emblaRefLoans, emblaApiLoans] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1
  });

  const onPrevLoans = useCallback(() => {
    if (emblaApiLoans) emblaApiLoans.scrollPrev();
  }, [emblaApiLoans]);

  const onNextLoans = useCallback(() => {
    if (emblaApiLoans) emblaApiLoans.scrollNext();
  }, [emblaApiLoans]);

  return (
    <section id="services" className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Deposits Carousel */}
        <div className="mb-16">
          <div className="mb-10">
            <span className="text-xs tracking-[0.15em] text-[#0099ff] uppercase">Financial Solutions</span>
            <h2 className="text-4xl text-gray-900 mt-3 mb-4 tracking-tight">Deposit Products</h2>
            <p className="text-base text-gray-600 max-w-3xl">
              Choose from our comprehensive range of deposit schemes designed to help you save and grow your wealth securely
            </p>
          </div>

          <div className="relative group">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRefDeposits}>
              <div className="flex -ml-4">
                {deposits.map((deposit, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 pl-4"
                    style={{ width: '300px', minWidth: '300px', maxWidth: '300px' }}
                  >
                    <Card className="group/card relative overflow-hidden border-0 bg-white hover:shadow-xl transition-all duration-500 cursor-pointer h-full" style={{ width: '100%' }}>
                      <CardContent className="p-6">
                        <div className={`w-14 h-14 bg-gradient-to-br ${deposit.color} rounded-xl flex items-center justify-center mb-4 group-hover/card:scale-110 group-hover/card:rotate-3 transition-all duration-300 shadow-md`}>
                          <deposit.icon className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-lg text-gray-900 mb-2">{deposit.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{deposit.description}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 group-hover/card:text-[#0099ff] p-0 h-auto"
                        >
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/card:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>

                      <div className="absolute inset-0 border border-transparent group-hover/card:border-gray-100 rounded-xl transition-all duration-300 pointer-events-none"></div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={onPrevDeposits}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0099ff] hover:bg-blue-50 z-10 border border-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={onNextDeposits}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0099ff] hover:bg-blue-50 z-10 border border-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Loans Carousel */}
        <div>
          <div className="mb-10">
            <span className="text-xs tracking-[0.15em] text-red-600 uppercase">Credit Facilities</span>
            <h2 className="text-4xl text-gray-900 mt-3 mb-4 tracking-tight">Loan Products</h2>
            <p className="text-base text-gray-600 max-w-3xl">
              Flexible loan solutions tailored to meet your personal and business aspirations with competitive rates
            </p>
          </div>

          <div className="relative group">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRefLoans}>
              <div className="flex -ml-4">
                {loans.map((loan, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 pl-4"
                    style={{ width: '300px', minWidth: '300px', maxWidth: '300px' }}
                  >
                    <Card className="group/card relative overflow-hidden border-0 bg-white hover:shadow-xl transition-all duration-500 cursor-pointer h-full" style={{ width: '100%' }}>
                      <CardContent className="p-6">
                        <div className={`w-14 h-14 bg-gradient-to-br ${loan.color} rounded-xl flex items-center justify-center mb-4 group-hover/card:scale-110 group-hover/card:rotate-3 transition-all duration-300 shadow-md`}>
                          <loan.icon className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-lg text-gray-900 mb-2">{loan.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{loan.description}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 group-hover/card:text-[#0099ff] p-0 h-auto"
                        >
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/card:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>

                      <div className="absolute inset-0 border border-transparent group-hover/card:border-gray-100 rounded-xl transition-all duration-300 pointer-events-none"></div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={onPrevLoans}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0099ff] hover:bg-blue-50 z-10 border border-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={onNextLoans}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0099ff] hover:bg-blue-50 z-10 border border-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

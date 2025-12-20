import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, Building2, Building, GraduationCap, Coins } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/6705fbbec794189a9f9b05c8b8f04e8469de538b.png';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1737955658451-851e128f98a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBsdXh1cnklMjB2aWxsYSUyMGhvbWV8ZW58MXx8fHwxNzYyMDU2OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Home Loans',
    title: 'Home Loans',
    description: 'Turn Your Dream Home Into Reality',
    icon: Home,
  },
  {
    image: 'https://images.unsplash.com/photo-1667375886014-3b29f2ab9382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMG1vZGVybiUyMG9mZmljZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MjA1Njk5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Mortgage Loans',
    title: 'Mortgage Loans',
    description: 'Flexible Financing for Your Property',
    icon: Building2,
  },
  {
    image: 'https://images.unsplash.com/photo-1632400386307-2b2f275b35da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGNvbnN0cnVjdGlvbiUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MjA1Njk5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Project Finance',
    title: 'Project Finance',
    description: 'Build Your Business, Build Your Future',
    icon: Building,
  },
  {
    image: 'https://images.unsplash.com/photo-1748542685954-e49304dd4c3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHVkZW50JTIwZ3JhZHVhdGlvbiUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNzYyMDU2OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Education Loan',
    title: 'Education Loan',
    description: 'Invest In Knowledge, Invest In Success',
    icon: GraduationCap,
  },
  {
    image: 'https://images.unsplash.com/photo-1760786933663-327c858d5434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBnb2xkJTIwb3JuYW1lbnRzJTIwamV3ZWxyeXxlbnwxfHx8fDE3NjIwNTY5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Gold Loans',
    title: 'Gold Loans',
    description: 'Quick Cash Against Your Gold Jewellery',
    icon: Coins,
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative h-[350px] lg:h-[550px] overflow-hidden bg-gray-900 mt-[104px]">
      {/* Fixed Logo Overlay */}
      <div className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-sm rounded-xl p-3 lg:p-4 shadow-2xl border border-gray-100">
        <img src={logo} alt="Guntur Bank Logo" className="h-12 w-12 lg:h-16 lg:w-16" />
      </div>

      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ImageWithFallback
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              
              {/* Text Overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-[1400px] mx-auto px-6 w-full">
                  <div className="max-w-2xl">
                    {/* Tagline */}
                    <div className="mb-6 lg:mb-8">
                      <p className="text-white/90 text-sm lg:text-base uppercase tracking-wider mb-1 drop-shadow-lg">
                        Serving Cooperative Values
                      </p>
                      <p className="text-white text-xl lg:text-2xl drop-shadow-lg">
                        Since 1949
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#0099ff]/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                      </div>
                      <div className="h-12 lg:h-16 w-1 bg-[#0099ff]/60"></div>
                    </div>
                    <h1 className="text-white mb-3 lg:mb-4 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-white/95 text-lg lg:text-2xl mb-4 lg:mb-6 drop-shadow-lg">
                      {slide.description}
                    </p>
                    
                    {/* Bank Description */}
                    <p className="text-white/85 text-sm lg:text-base mb-6 lg:mb-8 max-w-xl leading-relaxed drop-shadow-lg">
                      Your trusted banking partner in Andhra Pradesh, committed to your financial growth and prosperity through cooperative principles.
                    </p>

                    <button className="px-6 lg:px-8 py-3 lg:py-4 bg-[#0099ff] hover:bg-[#0088ee] text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 lg:w-10 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

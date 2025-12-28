import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, Building2, Building, GraduationCap, Coins } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/6705fbbec794189a9f9b05c8b8f04e8469de538b.png';

const slides = [
  {
    image: 'assets/5.jpg',
    alt: 'Home Loans',
    title: 'Home Loans',
    description: 'Turn Your Dream Home Into Reality',
    icon: Home,
  },
  {
    image: 'assets/2.jpg',
    alt: 'Mortgage Loans',
    title: 'Mortgage Loans',
    description: 'Flexible Financing for Your Property',
    icon: Building2,
  },
  {
    image: 'assets/3.jpg',
    alt: 'Project Finance',
    title: 'Project Finance',
    description: 'Build Your Business, Build Your Future',
    icon: Building,
  },
  {
    image: 'assets/4.jpg',
    alt: 'Education Loan',
    title: 'Education Loan',
    description: 'Invest In Knowledge, Invest In Success',
    icon: GraduationCap,
  },
  {
    image: 'assets/1.jpg',
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
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <ImageWithFallback
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
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
            className={`transition-all duration-300 rounded-full ${index === currentSlide
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

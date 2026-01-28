import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, Building2, Building, GraduationCap, Coins } from 'lucide-react';

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
    <section
      className="hero-section relative w-full bg-gray-900 overflow-hidden h-auto lg:h-[600px]"
    >
      <div className="relative w-full h-full">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-full h-full transition-opacity duration-1000 ease-in-out bg-gray-900 ${index === currentSlide ? 'opacity-100 z-10 relative lg:absolute lg:inset-0' : 'opacity-0 z-0 absolute inset-0'
                }`}
            >
              {/* Image Layer */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-auto lg:h-full lg:object-cover"
                style={{ objectPosition: 'center' }}
              />

              {/* Gradient Overlay - Removed for cleaner look */}
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 z-50 w-10 h-10 lg:w-16 lg:h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
          >
            <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 z-50 w-10 h-10 lg:w-16 lg:h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
          >
            <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 lg:gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 lg:h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 lg:w-12 bg-[#0099ff]' : 'w-3 lg:w-4 bg-white/40 hover:bg-white/70'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

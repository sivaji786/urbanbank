import { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import client from '../api/client';

export function CardsCarousel() {
    const [serviceIcons, setServiceIcons] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchIcons = async () => {
            try {
                const response = await client.get('service-icons');
                setServiceIcons(response.data);
            } catch (error) {
                console.error('Failed to fetch service icons', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchIcons();
    }, []);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 });

    const onPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const onNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (isLoading) return null;
    if (serviceIcons.length === 0) return null;

    return (
        <section className="w-full bg-[#E0F2FE] py-8">
            <div className="max-w-6xl px-4 lg:px-6 mx-auto relative group">

                {/* Carousel Container */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4">
                        {serviceIcons.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0"
                                style={{ width: '180px', paddingLeft: '16px' }}
                            >
                                <div
                                    onClick={() => {
                                        if (item.link) {
                                            const isNewTab = item.is_new_tab === '1' || item.is_new_tab === 1;
                                            window.open(item.link, isNewTab ? '_blank' : '_self');
                                        }
                                    }}
                                    className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 flex flex-col items-center justify-center gap-3 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 min-h-[140px] cursor-pointer"
                                    style={{ width: '100%' }}
                                >
                                    <div className="w-full relative flex items-center justify-center" style={{ height: '80px' }}>
                                        <img
                                            src={item.icon_url}
                                            alt={item.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-700 text-center leading-tight">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel Controls */}
                <button
                    onClick={onPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 z-10 border border-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={onNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 z-10 border border-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

            </div>
        </section>
    );
}

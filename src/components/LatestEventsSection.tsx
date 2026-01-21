import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import client from '../api/client';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

export function LatestEventsSection() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await client.get('events');
        const formattedEvents = response.data.map((item: any) => ({
          id: item.id,
          date: new Date(item.date).toLocaleDateString(),
          title: item.title,
          description: item.description,
          image: item.location || 'https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwZXZlbnQlMjBjZXJlbW9ueXxlbnwxfHx8fDE3NjE4MjgxODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Failed to fetch events', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#0099ff] text-sm uppercase tracking-wide mb-2">News & Updates</p>
          <h2 className="text-gray-900">Recent Events & Announcements</h2>
        </div>

        {/* Events Carousel */}
        <div className="max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {events.map((event) => (
                <CarouselItem key={event.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
                    {/* Event Image */}
                    <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                      {typeof event.image === 'string' ? (
                        <ImageWithFallback
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>

                    {/* Event Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Title */}
                      <h3 className="text-gray-900 text-base mb-2">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {event.description}
                      </p>

                      {/* Bottom Section - Date and Read More */}
                      <div className="pt-3 border-t border-gray-100 mt-auto flex items-center justify-between">
                        {/* Date - Left Side */}
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="text-xs">{event.date}</span>
                        </div>

                        {/* Read More Link - Right Side */}
                        <a
                          href="#"
                          className="text-[#0099ff] hover:text-[#0077cc] transition-colors text-sm inline-flex items-center gap-1 group/link"
                        >
                          Read More
                          <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0 bg-white border-2 border-gray-300 hover:bg-[#0099ff] hover:text-white hover:border-[#0099ff] transition-colors" />
              <CarouselNext className="static translate-y-0 bg-white border-2 border-gray-300 hover:bg-[#0099ff] hover:text-white hover:border-[#0099ff] transition-colors" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

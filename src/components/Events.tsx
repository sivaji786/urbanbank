import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const events = [
  {
    title: 'Grameena Urban Syndicate',
    date: 'October 5, 2021',
    location: 'Guntur Branch',
    image: 'https://images.unsplash.com/photo-1761423305403-5cf20f979cdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwY3VzdG9tZXIlMjBzZXJ2aWNlfGVufDF8fHx8MTc2MTgyMzMyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Community banking initiative for rural development',
  },
  {
    title: '72nd General Body Meet',
    date: 'September 15, 2022',
    location: 'Main Office, Guntur',
    image: 'https://images.unsplash.com/photo-1676275774895-7fbba85dce94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMG9mZmljZXxlbnwxfHx8fDE3NjE3NjQwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Annual general body meeting with all stakeholders',
  },
  {
    title: 'The Andhra Pradesh Co-operative Credit Societies Federation',
    date: 'May 14, 2022',
    location: 'Vijayawada',
    image: 'https://images.unsplash.com/photo-1696441315090-fe40d27275f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYW5rJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxODIzMzI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Federation meeting for co-operative banking initiatives',
  },
];

export function Events() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-blue-600 uppercase tracking-wide">Our Events</p>
          <h2 className="text-3xl lg:text-4xl text-gray-900 mt-2">Let's Checkout Our Events</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Join us in our various community and banking events across Guntur
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 group">
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-600 text-white">Event</Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-3">
                  <h3 className="text-gray-900 group-hover:text-blue-700 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600">{event.description}</p>
                  
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <Button variant="link" className="p-0 text-blue-600 hover:text-blue-700">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

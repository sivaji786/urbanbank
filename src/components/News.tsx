import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Calendar, ArrowRight, Bell } from 'lucide-react';

const newsItems = [
  {
    title: 'Link Your PAN with Aadhaar',
    date: 'January 15, 2025',
    category: 'Important Notice',
    description: 'Complete the PAN-Aadhaar linking process as mandated by government regulations to ensure uninterrupted banking services.',
    urgent: true,
  },
  {
    title: 'Updated Gold Loan Interest Rates',
    date: 'January 10, 2025',
    category: 'Rate Update',
    description: 'We have revised our gold loan interest rates. Check the new competitive rates for better financial planning.',
    urgent: false,
  },
  {
    title: 'New Branch Opening in Chirala',
    date: 'December 28, 2024',
    category: 'Announcement',
    description: 'We are pleased to announce the opening of our new branch in Chirala to serve you better.',
    urgent: false,
  },
  {
    title: 'Digital Banking Enhancements',
    date: 'December 20, 2024',
    category: 'Technology',
    description: 'Experience our upgraded online banking platform with enhanced security features and improved user interface.',
    urgent: false,
  },
];

export function News() {
  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-10">
          <span className="text-xs tracking-[0.15em] text-[#0099ff] uppercase">Stay Informed</span>
          <h2 className="text-4xl text-gray-900 mt-3 mb-3 tracking-tight">Latest Updates</h2>
          <p className="text-base text-gray-600 max-w-3xl">
            Stay up to date with the latest news, announcements, and updates from Guntur Urban Bank
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {newsItems.map((item, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 bg-gradient-to-br from-gray-50 to-white hover:shadow-xl transition-all duration-500"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs tracking-wider text-gray-500 uppercase">{item.category}</span>
                  {item.urgent && (
                    <div className="flex items-center gap-1.5 bg-red-50 text-red-600 px-2.5 py-1 rounded-full">
                      <Bell className="h-3 w-3" />
                      <span className="text-xs">Urgent</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl text-gray-900 mb-3 group-hover:text-[#0099ff] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{item.date}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#0099ff] hover:text-[#0077cc] group/btn p-0 h-auto"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>

              <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-gradient-to-br from-[#0099ff]/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-20">
          <Button
            size="lg"
            variant="outline"
            className="border border-gray-300 hover:border-[#0099ff] hover:text-[#0099ff] px-6"
          >
            View All Updates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

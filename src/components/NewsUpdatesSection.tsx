import { useEffect, useState } from 'react';
import { FileText, ArrowRight, Lightbulb } from 'lucide-react';
import client from '../api/client';

export function NewsUpdatesSection() {
  const [newsItems, setNewsItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await client.get('news');
        // Sort by date desc and take top 4
        const sorted = response.data
          .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 4);

        const formattedNews = sorted.map((item: any) => ({
          id: item.id,
          icon: <FileText className="w-5 h-5 text-[#0099ff]" />,
          title: item.title,
          subtitle: new Date(item.date).toLocaleDateString(),
          href: `#news-details/${item.id}`
        }));
        setNewsItems(formattedNews);
      } catch (error) {
        console.error('Failed to fetch news', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="py-12 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-4 px-2">
          <div>
            <span className="text-[#0099ff] font-bold tracking-[0.3em] uppercase text-xs block">Stay Informed</span>
            <h2 className="text-gray-900 text-4xl lg:text-6xl font-black tracking-tighter">Bank <span className="text-[#0099ff]">Updates</span></h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {newsItems.length === 0 ? (
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-20 text-center border border-gray-100 shadow-sm">
              <p className="text-gray-400 font-semibold italic text-xl">No recent news available at the moment.</p>
            </div>
          ) : (
            newsItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group bg-white p-3 rounded border border-gray-100 transition-all duration-500 flex items-start gap-8"
              >
                <div className="p-3 bg-blue-50 rounded-3xl group-hover:bg-[#0099ff] transition-all duration-500 shrink-0 shadow-inner">
                  <FileText className="w-5 h-5 text-[#0099ff] transition-colors duration-500" />
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-blue-400 uppercase tracking-[0.2em]">{item.subtitle}</span>
                  </div>
                  <h3 className="text-md text-gray-900 group-hover:text-[#0099ff] transition-colors line-clamp-2 leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <div className="mt-1 flex text-gray-600 items-center text-[#0099ff] text-base font-black opacity-50 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    Read Full Article <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </a>
            ))
          )}
        </div>


        <div className="mt-12 text-right">
          <a href="#news" className="mt-4 inline-flex items-right gap-3 text-[#0099ff] font-black text-md">
            View All News <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import client from '../api/client';

export function NewsToolsSection() {
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

  const tools = [
    { emoji: "🏆", title: "New Gold Rates" },
    { emoji: "💰", title: "Interest Calculator" },
    { emoji: "📱", title: "Mobile Banking" },
    { emoji: "🔐", title: "Net Banking Login" }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Guntur Bank News */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-gray-900 text-lg">Guntur Bank News</h3>
            </div>

            <div className="p-6 space-y-4 flex-1">
              {newsItems.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No recent news</p>
              ) : (
                newsItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className="mt-1">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 mb-1 group-hover:text-[#0099ff] transition-colors line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.subtitle}
                      </p>
                    </div>
                  </a>
                ))
              )}
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-center">
              <a href="#news" className="text-sm text-[#0099ff] hover:underline font-medium inline-flex items-center gap-1">
                View All News <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Guntur Bank Tools */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-gray-900 text-lg">Guntur Bank Tools</h3>
            </div>

            <div className="px-6 py-6 space-y-3">
              {tools.map((tool, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-4 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-2xl">{tool.emoji}</span>
                  <span className="flex-1 text-sm text-gray-700">{tool.title}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                </a>
              ))}

              <div className="mt-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-5 border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                    💡
                  </div>
                  <h4 className="text-sm text-gray-900">Need Help?</h4>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Contact our customer support team for assistance
                </p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-5 py-2 rounded-full transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Video */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-gray-900 text-lg">Video</h3>
            </div>

            <div className="px-6 py-6 space-y-4">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/OGFAFyab8-M"
                  title="Guntur Urban Bank Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div>
                <h4 className="text-sm text-gray-900 mb-2">Banking Made Simple</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Discover how Guntur Urban Bank provides comprehensive banking solutions tailored to your needs. Watch our video to learn more about our services and commitment to excellence.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Branches</p>
                  <p className="text-xl text-[#0099ff]">13+</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Since</p>
                  <p className="text-xl text-red-600">1948</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

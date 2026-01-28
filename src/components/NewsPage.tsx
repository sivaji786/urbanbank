import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Calendar, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import client from '../api/client';

interface NewsItem {
    id: number;
    title: string;
    content: string;
    date: string;
}

export function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await client.get('news');
            // Sort by date desc
            const sorted = response.data.sort((a: NewsItem, b: NewsItem) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            setNews(sorted);
        } catch (error) {
            console.error('Failed to fetch news', error);
            setNews([]);
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(news.length / itemsPerPage);
    const currentNews = news.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#0099ff] via-[#0088ee] to-[#0077dd] py-12 lg:py-16 border-b border-white/20 overflow-hidden shadow-lg">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-10 relative">
                    <div className="text-center">
                        <h1 className="text-white mb-3 font-bold text-4xl lg:text-5xl">Latest News & Updates</h1>
                        <div className="w-24 h-1 bg-white/80 mx-auto mb-4"></div>
                        <p className="text-white/90 max-w-2xl mx-auto leading-relaxed text-xl">
                            Stay informed with the latest announcements, events, and banking updates from our cooperative.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-12">

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0099ff] mx-auto mb-4"></div>
                        <p>Loading news...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {currentNews.map((item) => (
                                <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <FileText className="w-6 h-6 text-[#0099ff]" />
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(item.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                                        {item.content}
                                    </p>
                                    <a
                                        href={`#news-details/${item.id}`}
                                        className="text-[#0099ff] font-medium hover:underline inline-flex items-center gap-1"
                                    >
                                        Read More <ChevronRight className="w-4 h-4" />
                                    </a>
                                </Card>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2">
                                <Button
                                    variant="outline"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                                </Button>
                                <div className="flex items-center gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "default" : "outline"}
                                            className={currentPage === page ? "bg-[#0099ff] hover:bg-[#0077cc]" : ""}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                                <Button
                                    variant="outline"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                >
                                    Next <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Calendar, ArrowLeft, FileText } from 'lucide-react';
import client from '../api/client';

interface NewsItem {
    id: number;
    title: string;
    content: string;
    date: string;
}

export function NewsDetailsPage({ id }: { id: string }) {
    const [news, setNews] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNewsDetails();
    }, [id]);

    const fetchNewsDetails = async () => {
        try {
            const response = await client.get(`/news/${id}`);
            setNews(response.data);
        } catch (error) {
            console.error('Failed to fetch news details', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0099ff] mx-auto mb-4"></div>
                <p>Loading news details...</p>
            </div>
        );
    }

    if (!news) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">News Item Not Found</h2>
                <Button onClick={() => window.location.hash = '#news'} variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-[1000px] mx-auto px-6 py-12">
            <Button
                onClick={() => window.location.hash = '#news'}
                variant="ghost"
                className="mb-8 hover:bg-gray-100"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
            </Button>

            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        <span className="flex items-center gap-1.5 bg-blue-50 text-[#0099ff] px-3 py-1 rounded-full font-medium">
                            <FileText className="w-4 h-4" />
                            News Update
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(news.date).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                        {news.title}
                    </h1>

                    <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-wrap">
                        {news.content}
                    </div>
                </div>
            </article>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Calendar, ArrowLeft, MapPin } from 'lucide-react';
import client from '../api/client';

interface EventItem {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    image_url: string;
}

export function EventDetailsPage({ id }: { id: string }) {
    const [event, setEvent] = useState<EventItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEventDetails();
    }, [id]);

    const fetchEventDetails = async () => {
        try {
            const response = await client.get(`/events/${id}`);
            setEvent(response.data);
        } catch (error) {
            console.error('Failed to fetch event details', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0099ff] mx-auto mb-4"></div>
                <p>Loading event details...</p>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
                <Button onClick={() => window.location.hash = '#home'} variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <Button
                onClick={() => window.location.hash = '#home'}
                variant="ghost"
                className="mb-8 hover:bg-gray-100"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>

            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {event.image_url && (
                    <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden">
                        <img
                            src={event.image_url.startsWith('http') ? event.image_url : `${new URL(client.defaults.baseURL || '').origin}/${event.image_url}`}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="p-8 md:p-12">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                        <span className="flex items-center gap-1.5 bg-blue-50 text-[#0099ff] px-3 py-1 rounded-full font-medium">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        {event.location && (
                            <span className="flex items-center gap-1.5 font-medium">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                {event.location}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                        {event.title}
                    </h1>

                    <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-wrap">
                        {event.description}
                    </div>
                </div>
            </article>
        </div>
    );
}

import { Target, Shield, Users, TrendingUp, Lightbulb, Award, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import client from '../api/client';
import { Card } from './ui/card';

interface Objective {
    title: string;
    description: string;
}

interface BankObjectiveContent {
    hero: {
        title: string;
        subtitle: string;
    };
    objectives: Objective[];
}

export function BankObjectivePage() {
    const [content, setContent] = useState<BankObjectiveContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await client.get('pages/bank-objective');
                if (response.data && response.data.content) {
                    let data = response.data.content;
                    if (typeof data === 'string') {
                        try {
                            data = JSON.parse(data);
                        } catch (e) {
                            console.error("Error parsing content JSON", e);
                        }
                    }
                    setContent(data);
                    setLoading(false);
                    return;
                }
            } catch (error) {
                console.error('Failed to fetch Bank Objectives content, using fallback', error);
            }

            // Fallback content if API fails
            setContent({
                hero: {
                    title: "Our Objectives",
                    subtitle: "Established with a core mission to provide reliable and secure banking solutions for the community of Guntur."
                },
                objectives: [
                    { title: "Financial Inclusion", description: "Providing simplified and accessible banking services to reach all sections of society, fostering economic growth." },
                    { title: "Customer Centricity", description: "Setting new standards in customer service through personalized attention mixed with modern direct banking." },
                    { title: "Community Empowerment", description: "Supporting local businesses and self-employed individuals with robust credit facilities." },
                    { title: "Operational Integrity", description: "Maintaining total transparency and highest security protocols in every transaction and operation." },
                    { title: "Cooperative Heritage", description: "Preserving the values of mutual help and togetherness that define the cooperative spirit." },
                    { title: "Modern Innovation", description: "Continuously upgrading our technology infrastructure to offer competitive digital banking solutions." }
                ]
            });
            setLoading(false);
        };

        fetchContent();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#0099ff] border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    if (!content) {
        return <div className="min-h-screen flex items-center justify-center text-gray-500">Could not load objectives.</div>;
    }

    const icons = [Building2, Shield, Users, TrendingUp, Lightbulb, Award];
    function Building2(props: any) { return <Award {...props} />; } // Fallback if building2 not loaded corely

    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            {/* Refined Professional Header */}
            <div className="bg-blue-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-10 py-6 lg:py-8">

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <h1 className="text-gray-900 text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                                {content.hero.title}
                            </h1>
                            <div className="w-20 h-1.5 bg-[#0099ff] rounded-full mb-6"></div>
                            <p className="text-lg text-[#5D666F] leading-relaxed max-w-2xl font-normal">
                                {content.hero.subtitle}
                            </p>
                        </div>
                    </div>
                    <nav className="flex items-center gap-2 text-xs mb-4 text-gray-400 font-medium uppercase tracking-widest mt-4">
                        <button onClick={() => window.location.hash = '#home'} className="hover:text-[#0099ff] transition-colors">
                            Home
                        </button>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-blue-400 font-semibold">{content.hero.title}</span>
                    </nav>
                </div>
            </div>

            {/* Structured Objectives Grid - Low Padding as requested */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.objectives.map((obj, index) => {
                        const Icon = icons[index % icons.length];
                        return (
                            <Card
                                key={index}
                                className="group border border-gray-100 bg-white p-8 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-500 rounded-2xl overflow-hidden relative"
                            >
                                {/* Subtle Back Decoration */}
                                <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#0099ff]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-blue-50 text-[#0099ff] rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-400 group-hover:text-gray-900 transition-colors duration-500">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-gray-900 text-xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {obj.title}
                                    </h3>
                                    <div className="h-px w-8 bg-gray-100 mb-4 group-hover:w-16 transition-all duration-500 group-hover:bg-[#0099ff]/30"></div>
                                    <p className="text-[#5D666F] text-sm leading-relaxed font-normal">
                                        {obj.description}
                                    </p>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Understated Section for Commitment */}
            <div className="bg-blue-50 px-6 py-12">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#0099ff]/10 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-8 h-8 text-[#0099ff]" />
                    </div>
                    <h2 className="text-gray-900 text-3xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                        Seven Decades of Dedication
                    </h2>
                    <p className="text-[#5D666F] max-w-2xl mb-8 leading-relaxed font-normal">
                        Since our establishment, we have remained committed to these core values, ensuring that the Guntur Cooperative Urban Bank remains a pillar of trust and reliability in the region.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="bg-white px-6 py-3 rounded-full border border-gray-100 text-gray-600 text-sm font-medium shadow-sm flex items-center gap-2">
                            <Target className="w-4 h-4 text-[#0099ff]" />
                            Vision Driven
                        </div>
                        <div className="bg-white px-6 py-3 rounded-full border border-gray-100 text-gray-600 text-sm font-medium shadow-sm flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[#0099ff]" />
                            Security Guaranteed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CheckCircle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

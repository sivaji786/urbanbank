import React, { useState, useEffect } from 'react';
import client from '../api/client';

export function QuickAccessTools() {
    const [tools, setTools] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const response = await client.get('quick-access');
                setTools(response.data);
            } catch (error) {
                console.error('Failed to fetch quick access tools', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTools();
    }, []);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center text-gray-400 font-bold uppercase tracking-widest animate-pulse">
                Synchronizing Access Protocols...
            </div>
        );
    }

    if (tools.length === 0) return null;

    return (
        <section className="bg-white mb-6">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 rounded-[3rem] overflow-hidden border border-gray-100">
                    {tools.map((tool, index) => (
                        <a
                            key={index}
                            href={tool.link || `#${tool.title.toLowerCase().replace(/ /g, '-')}`}
                            target={tool.is_new_tab === '1' || tool.is_new_tab === 1 ? "_blank" : "_self"}
                            rel={tool.is_new_tab === '1' || tool.is_new_tab === 1 ? "noopener noreferrer" : ""}
                            style={{ backgroundColor: tool.bg_color }}
                            className="group relative overflow-hidden px-6 py-6 flex flex-col justify-center min-h-[220px] transition-all duration-500 hover:brightness-110 cursor-pointer text-white"
                        >
                            {/* Background Number */}

                            <div className="relative z-10 flex flex-col items-start">
                                <div className="flex items-center gap-5 mb-4">
                                    <span className="text-4xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                                    <h3 className="text-white text-2xl md:text-3xl tracking-tight leading-none">
                                        {tool.title}
                                    </h3>
                                </div>
                                <p className="text-white/90 text-sm md:text-lg max-w-[280px] leading-relaxed">
                                    {tool.subtitle}
                                </p>
                            </div>

                            {/* Indicator */}
                            <div className="absolute right-0 bottom-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-6 group-hover:translate-x-0">
                                <svg
                                    className="w-10 h-10 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>

                            {/* Subtle hover overlay */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

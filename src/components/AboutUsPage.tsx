import { ChevronRight, Building2, TrendingUp, Shield, Award, Calendar, MapPin, Target, Lightbulb } from 'lucide-react';
import { Card } from './ui/card';
import bankBuilding from 'figma:asset/21200a93a5779cdc5126bc24a66fcd4ea009605f.png';
import { useState, useEffect } from 'react';
import client from '../api/client';

interface AboutUsContent {
  hero: {
    title: string;
    subtitle: string;
  };
  intro: {
    badge: string;
    title: string;
    content: string;
    stats: Array<{ label: string; value: string }>;
    established_year: string;
  };
  journey: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  innovation: {
    title: string;
    description: string;
    cards: Array<{ title: string; description: string }>;
  };
  coverage: {
    title: string;
    cards: Array<{ title: string; count: string; details: string | string[] }>;
  };
}

export function AboutUsPage() {
  const [content, setContent] = useState<AboutUsContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await client.get('pages/about-us');
        if (response.data && response.data.content) {
          // The content might be a string (if double encoded) or object. 
          // Our controller ensures it returns object if possible, but let's be safe.
          let data = response.data.content;
          if (typeof data === 'string') {
            try {
              data = JSON.parse(data);
            } catch (e) {
              console.error("Error parsing content JSON", e);
            }
          }
          setContent(data);
        }
      } catch (error) {
        console.error('Failed to fetch About Us content', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!content) {
    return <div className="min-h-screen flex items-center justify-center">Failed to load content.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-50 overflow-hidden border-b border-blue-100">
        <div className="relative max-w-7xl mx-auto px-10 py-8 lg:py-12">

          <div className="flex items-center justify-between gap-8">
            <div className="text-gray-900 flex-1">
              <h1 className="text-gray-900 text-3xl mb-2">
                {content.hero.title}
              </h1>
              <p className="text-gray-600">
                {content.hero.subtitle}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0099ff] to-[#0077cc] rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
          <nav className="flex items-center gap-2 text-sm mb-4 text-gray-600">
            <button onClick={() => window.location.hash = '#home'} className="hover:text-[#0099ff] transition-colors">
              Home
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#0099ff]">{content.hero.title}</span>
          </nav>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Introduction Section with Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-block px-4 py-2 bg-[#0099ff]/10 rounded-full text-[#0099ff] text-sm mb-6">
              {content.intro.badge}
            </div>
            <h2 className="text-gray-900 text-3xl mb-6">
              {content.intro.title}
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                {content.intro.content}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {content.intro.stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                  <div className="text-2xl text-[#0099ff] mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={bankBuilding}
                alt="Guntur Cooperative Urban Bank Building"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0099ff]/10 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#0099ff]" />
                </div>
                <div>
                  <div className="text-gray-900">Established</div>
                  <div className="text-[#0099ff] text-xl">{content.intro.established_year}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Journey Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#0099ff]/10 rounded-full text-[#0099ff] text-sm mb-4">
              Our Journey
            </div>
            <h2 className="text-gray-900 text-3xl">
              A Rich History of Excellence
            </h2>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="space-y-8">
              {content.journey.map((item, index) => (
                <Card key={index} className="border border-gray-200 hover:border-[#0099ff]/30 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#0099ff] to-[#0077cc] rounded-xl flex items-center justify-center">
                          {index === 0 ? <Calendar className="w-8 h-8 text-white" /> :
                            index === 1 ? <Building2 className="w-8 h-8 text-white" /> :
                              index === 2 ? <Shield className="w-8 h-8 text-white" /> :
                                index === 3 ? <TrendingUp className="w-8 h-8 text-white" /> :
                                  index === 4 ? <MapPin className="w-8 h-8 text-white" /> :
                                    <Target className="w-8 h-8 text-white" />
                          }
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-[#0099ff] mb-2">{item.year}</div>
                        <h3 className="text-gray-900 text-xl mb-3">{item.title}</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Innovation & Technology Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-12 border border-blue-100">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#0099ff]/10 rounded-full text-[#0099ff] text-sm mb-4">
              Innovation & Technology
            </div>
            <h2 className="text-gray-900 text-3xl mb-4">
              {content.innovation.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {content.innovation.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {content.innovation.cards.map((card, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                <div className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0099ff] to-[#0077cc] rounded-xl flex items-center justify-center mb-4">
                    {index === 0 ? <Lightbulb className="w-7 h-7 text-white" /> : <Target className="w-7 h-7 text-white" />}
                  </div>
                  <h3 className="text-gray-900 text-xl mb-3">{card.title}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Coverage Map Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#0099ff]/10 rounded-full text-[#0099ff] text-sm mb-4">
              Our Presence
            </div>
            <h2 className="text-gray-900 text-3xl">
              {content.coverage.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {content.coverage.cards.map((card, index) => (
              <Card key={index} className="border border-gray-200 hover:border-[#0099ff]/30 hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0099ff] to-[#0077cc] rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 text-xl">{card.title}</h3>
                      <p className="text-[#0099ff]">{card.count}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-gray-700 text-sm whitespace-pre-line">
                    {Array.isArray(card.details) ? (
                      card.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                      ))
                    ) : (
                      <p>{card.details}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

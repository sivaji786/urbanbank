import { Target, Compass, Shield, Lightbulb, Users, CheckCircle, TrendingUp, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import client from '../api/client';

interface VisionMissionContent {
  hero: {
    title: string;
    subtitle: string;
  };
  vision: {
    badge: string;
    quote: string;
    description: string;
  };
  mission: {
    badge: string;
    quote: string;
    pillars: Array<{ title: string; description: string }>;
  };
  values: {
    title: string;
    description: string;
    items: Array<{ title: string; description: string }>;
  };
  commitment: {
    title: string;
    description: string;
    stats: Array<{ label: string; value: string }>;
  };
}

export function VisionMissionPage() {
  const [content, setContent] = useState<VisionMissionContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await client.get('pages/vision-mission');
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
        }
      } catch (error) {
        console.error('Failed to fetch Vision Mission content', error);
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

  const values = [
    {
      icon: Shield,
      title: content.values.items[0].title,
      description: content.values.items[0].description,
      gradient: 'from-[#0099ff] to-[#0077dd]'
    },
    {
      icon: Lightbulb,
      title: content.values.items[1].title,
      description: content.values.items[1].description,
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: Users,
      title: content.values.items[2].title,
      description: content.values.items[2].description,
      gradient: 'from-yellow-500 to-yellow-600'
    }
  ];

  const missionPillars = [
    { icon: Lightbulb, title: content.mission.pillars[0].title, description: content.mission.pillars[0].description },
    { icon: Award, title: content.mission.pillars[1].title, description: content.mission.pillars[1].description },
    { icon: CheckCircle, title: content.mission.pillars[2].title, description: content.mission.pillars[2].description },
    { icon: Users, title: content.mission.pillars[3].title, description: content.mission.pillars[3].description }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section - Consistent with other pages */}
      <section className="relative bg-gradient-to-br from-[#0099ff] via-[#0088ee] to-[#0077dd] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="text-center">
            <h1 className="text-white mb-4">{content.hero.title}</h1>
            <div className="w-24 h-1 bg-white/80 mx-auto mb-6"></div>
            <p className="text-white/90 max-w-3xl mx-auto text-xl leading-relaxed">
              {content.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Icon Side */}
              <div className="lg:col-span-2 bg-gradient-to-br from-[#0099ff]/5 to-blue-50 p-12 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#0099ff] rounded-full blur-3xl"></div>
                </div>
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#0099ff] to-[#0077dd] rounded-3xl flex items-center justify-center shadow-2xl mb-8">
                    <Target className="w-16 h-16 text-white" />
                  </div>
                  <h2 className="text-center text-gray-900 mb-4">Our Vision</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#0099ff] to-[#0077dd] mx-auto"></div>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:col-span-3 p-12 flex flex-col justify-center">
                <div className="mb-8">
                  <div className="inline-block px-5 py-2 bg-[#0099ff]/10 rounded-full text-[#0099ff] text-sm mb-6">
                    {content.vision.badge}
                  </div>
                  <blockquote className="text-3xl text-gray-800 leading-relaxed mb-8 italic border-l-4 border-[#0099ff] pl-6">
                    {content.vision.quote}
                  </blockquote>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {content.vision.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 to-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Content Side */}
              <div className="lg:col-span-3 p-12 flex flex-col justify-center order-2 lg:order-1">
                <div className="mb-8">
                  <div className="inline-block px-5 py-2 bg-red-500/10 rounded-full text-red-600 text-sm mb-6">
                    {content.mission.badge}
                  </div>
                  <blockquote className="text-3xl text-gray-800 leading-relaxed mb-8 italic border-l-4 border-red-500 pl-6">
                    {content.mission.quote}
                  </blockquote>
                </div>

                {/* Mission Pillars Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {missionPillars.map((pillar, index) => (
                    <div key={index} className="flex gap-4 p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#0099ff] to-[#0077dd] rounded-xl flex items-center justify-center">
                          <pillar.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-gray-900 mb-1">{pillar.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Icon Side */}
              <div className="lg:col-span-2 bg-gradient-to-br from-red-50 to-red-100/50 p-12 flex flex-col items-center justify-center relative overflow-hidden order-1 lg:order-2">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
                </div>
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl mb-8">
                    <Compass className="w-16 h-16 text-white" />
                  </div>
                  <h2 className="text-center text-gray-900 mb-4">Our Mission</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 bg-yellow-500/10 rounded-full text-yellow-600 text-sm mb-6">
              What Defines Us
            </div>
            <h2 className="text-gray-900 mb-6">{content.values.title}</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              {content.values.description}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0099ff] via-red-500 to-yellow-500 rounded-full mx-auto mt-6"></div>
          </div>

          {/* Values Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Icon Header */}
                <div className="relative h-48 bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient}`}></div>
                  </div>
                  <div className={`relative w-24 h-24 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-gray-900 mb-4 text-center">{value.title}</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-gray-300 to-transparent mx-auto mb-6"></div>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {value.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className={`h-2 bg-gradient-to-r ${value.gradient}`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Banner */}
      <section className="py-20 bg-gradient-to-br from-[#0099ff] to-[#0077dd] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="text-center mb-12">
            <h2 className="text-white mb-6">{content.commitment.title}</h2>
            <p className="text-white/90 text-xl max-w-4xl mx-auto leading-relaxed">
              {content.commitment.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {content.commitment.stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                {index === 0 ? <TrendingUp className="w-10 h-10 text-white mx-auto mb-4" /> :
                  index === 1 ? <Shield className="w-10 h-10 text-white mx-auto mb-4" /> :
                    <Users className="w-10 h-10 text-white mx-auto mb-4" />
                }
                <div className="text-white text-3xl mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

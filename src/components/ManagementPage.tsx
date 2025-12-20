import { useState, useEffect } from 'react';
import client, { API_BASE_URL } from '../api/client';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  category: string;
  display_order: number;
}

export function ManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamResponse, pageResponse] = await Promise.all([
          client.get('/team-members'),
          client.get('/pages/management')
        ]);
        setTeamMembers(teamResponse.data);
        setPageContent(pageResponse.data.content);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = API_BASE_URL.replace(/\/api$/, '');
    return `${baseUrl}/${path}`;
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const chairman = teamMembers.find(m => m.position === (pageContent?.chairman_role || 'Chairman'));
  const viceChairman = teamMembers.find(m => m.position === (pageContent?.vice_chairman_role || 'Vice - Chairman'));
  const directors = teamMembers.filter(m => m.category === 'board' && m.position !== (pageContent?.chairman_role || 'Chairman') && m.position !== (pageContent?.vice_chairman_role || 'Vice - Chairman'));
  const coOptedAndExecutive = teamMembers.filter(m => m.category === 'co-opted' || m.category === 'executive');

  // Default content if API fails or returns empty
  const heroTitle = pageContent?.hero?.title || "Our Leadership";
  const heroSubtitle = pageContent?.hero?.subtitle || "Meet the experienced professionals who guide The Guntur Co-operative Urban Bank Ltd towards excellence and sustainable growth";
  const directorsTitle = pageContent?.directors_title || "Board of Directors";
  const executivesTitle = pageContent?.executives_title || "Co-Opted Directors & Executive Leadership";
  const chairmanRole = pageContent?.chairman_role || "Chairman";
  const viceChairmanRole = pageContent?.vice_chairman_role || "Vice - Chairman";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0099ff] via-[#0088ee] to-[#0077dd] py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="text-center">
            <h1 className="text-white mb-4">{heroTitle}</h1>
            <div className="w-24 h-1 bg-white/80 mx-auto mb-6"></div>
            <p className="text-white/90 max-w-3xl mx-auto text-lg">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Management Team Grid */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Chairman - Featured Large Card */}
          {chairman && (
            <div className="mb-16">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Image Section */}
                  <div className="md:col-span-2 relative bg-gradient-to-br from-[#0099ff]/5 to-blue-50 p-8 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0099ff]/20 to-transparent rounded-full blur-2xl"></div>
                      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                        <img
                          src={getImageUrl(chairman.image_url)}
                          alt={chairman.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:col-span-3 p-10 flex flex-col justify-center">
                    <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#0099ff] to-[#0077dd] text-white rounded-full mb-4 self-start">
                      {chairman.position}
                    </div>
                    <h2 className="text-gray-900 mb-4">{chairman.name}</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#0099ff] to-[#0077dd] mb-6"></div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {chairman.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vice Chairman - Featured Card */}
          {viceChairman && (
            <div className="mb-16">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Content Section */}
                  <div className="md:col-span-3 p-10 flex flex-col justify-center order-2 md:order-1">
                    <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#0099ff] to-[#0077dd] text-white rounded-full mb-4 self-start">
                      {viceChairman.position}
                    </div>
                    <h2 className="text-gray-900 mb-4">{viceChairman.name}</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#0099ff] to-[#0077dd] mb-6"></div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {viceChairman.bio}
                    </p>
                  </div>

                  {/* Image Section */}
                  <div className="md:col-span-2 relative bg-gradient-to-br from-blue-50 to-[#0099ff]/5 p-8 flex items-center justify-center order-1 md:order-2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0099ff]/20 to-transparent rounded-full blur-2xl"></div>
                      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                        <img
                          src={getImageUrl(viceChairman.image_url)}
                          alt={viceChairman.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Directors Grid */}
          <div className="mb-10">
            <div className="text-center mb-12">
              <h2 className="text-gray-900 mb-3">{directorsTitle}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#0099ff] to-[#0077dd] mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {directors.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-80 bg-gradient-to-br from-[#0099ff]/5 to-blue-50 flex items-center justify-center p-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0099ff]/10 to-transparent rounded-full blur-xl"></div>
                      <div className="relative w-48 h-48 rounded-full overflow-hidden border-3 border-white shadow-lg">
                        <ImageWithFallback
                          src={getImageUrl(member.image_url)}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-[#0099ff]/10 text-[#0099ff] rounded-full text-sm mb-3">
                      {member.position}
                    </div>
                    <h3 className="text-gray-900 mb-3">{member.name}</h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#0099ff] to-transparent mb-4"></div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Co-Opted Directors & CEO */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-gray-900 mb-3">{executivesTitle}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#0099ff] to-[#0077dd] mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coOptedAndExecutive.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-64 bg-gradient-to-br from-[#0099ff]/5 to-blue-50 flex items-center justify-center p-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0099ff]/10 to-transparent rounded-full blur-xl"></div>
                      <div className="relative w-40 h-40 rounded-full overflow-hidden border-3 border-white shadow-lg">
                        <ImageWithFallback
                          src={getImageUrl(member.image_url)}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="inline-block px-3 py-1 bg-[#0099ff]/10 text-[#0099ff] rounded-full text-xs mb-2">
                      {member.position}
                    </div>
                    <h4 className="text-gray-900 mb-2">{member.name}</h4>
                    <div className="w-10 h-0.5 bg-gradient-to-r from-[#0099ff] to-transparent mb-3"></div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#0099ff] via-[#0088ee] to-[#0077dd] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 text-center relative">
          <h2 className="text-white mb-4">Join Us in Our Journey</h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Experience banking excellence with a team committed to your financial success
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:18004258873"
              className="px-8 py-3 bg-white text-[#0099ff] rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              Contact Us: 1800-425-8873
            </a>
            <a
              href="mailto:gcubhelpdesk@guntururbanbank.org"
              className="px-8 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Email Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import { MapPin, Phone, Mail, Building2, Search, Clock, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { useState, useEffect } from 'react';
import client from '../api/client';
import { toast } from 'sonner';

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  ifsc?: string;
  micr?: string;
  fax?: string;
  timings: string;
  district: string;
  is_headquarter?: boolean; // API might return 0/1 or boolean, handled gently
}

export function BranchLocator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await client.get('/branches');
        // Backend returns is_headquarter as 0/1 usually, so we map it if needed, or JS treats 1 as truthy.
        // Let's ensure it's handled correctly for the UI which expects boolean
        const data = response.data.map((b: any) => ({
          ...b,
          is_headquarter: b.is_headquarter == 1 || b.is_headquarter === true
        }));
        setBranches(data);
      } catch (error) {
        console.error('Failed to load branches', error);
        toast.error('Failed to load branch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const districts = ['All', ...Array.from(new Set(branches.map(b => b.district)))];

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (branch.ifsc && branch.ifsc.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (branch.micr && branch.micr.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDistrict = selectedDistrict === 'All' || branch.district === selectedDistrict;

    return matchesSearch && matchesDistrict;
  });

  const totalBranches = branches.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0099ff] via-[#0088ee] to-[#0077dd] py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">
          <div className="text-center">
            <h1 className="text-white mb-3">Branch Locator</h1>
            <div className="w-24 h-1 bg-white/80 mx-auto mb-4"></div>
            <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
              13 Branches Across Andhra Pradesh
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[#0099ff]" />
            </div>
          ) : (
            <>
              {/* Search & Filter */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search branches..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-10 bg-gray-50 border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {districts.map((district) => (
                      <button
                        key={district}
                        onClick={() => setSelectedDistrict(district)}
                        className={`px-3 py-2 rounded-md text-sm transition-all ${selectedDistrict === district
                          ? 'bg-[#0099ff] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {district}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Showing <span className="text-[#0099ff]">{filteredBranches.length}</span> of {totalBranches} branches
                </p>
              </div>

              {/* Branch Cards List */}
              <div className="space-y-3">
                {filteredBranches.map((branch, index) => (
                  <div
                    key={branch.id}
                    className="bg-white rounded-lg border border-gray-200 hover:border-[#0099ff]/40 hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="p-4">
                      {/* Header Row */}
                      <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-100">
                        {/* Number Badge */}
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-600">
                          {index + 1}
                        </div>

                        {/* Branch Name & Icon */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Building2 className={`w-4 h-4 flex-shrink-0 ${branch.is_headquarter ? 'text-yellow-600' : 'text-[#0099ff]'}`} />
                            <h3 className="text-gray-900 truncate">{branch.name}</h3>
                            {branch.is_headquarter && (
                              <span className="flex-shrink-0 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">
                                HQ
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{branch.district} District</p>
                        </div>

                        {/* IFSC/MICR Codes */}
                        <div className="flex-shrink-0 hidden sm:flex flex-col gap-1 text-right">
                          {branch.ifsc && (
                            <div className="px-2 py-1 bg-[#0099ff]/10 rounded text-xs">
                              <span className="text-gray-500">IFSC: </span>
                              <span className="text-[#0099ff]">{branch.ifsc}</span>
                            </div>
                          )}
                          {branch.micr && (
                            <div className="px-2 py-1 bg-green-50 rounded text-xs">
                              <span className="text-gray-500">MICR: </span>
                              <span className="text-green-600">{branch.micr}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm items-start">
                        {/* Address */}
                        <div className="sm:col-span-2 lg:col-span-2 flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-0.5">Address</p>
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address + ' ' + branch.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-gray-700 leading-relaxed hover:text-[#0099ff] hover:underline decoration-dotted transition-colors"
                            >
                              {branch.address}
                            </a>
                          </div>
                        </div>

                        {/* Contact */}
                        <div className="flex items-start gap-2">
                          <Phone className="w-4 h-4 text-[#0099ff] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-0.5">Contact</p>
                            <a href={`tel:${branch.phone}`} className="text-xs text-gray-700 hover:text-[#0099ff] block">
                              {branch.phone}
                            </a>
                            {branch.fax && (
                              <p className="text-xs text-gray-500 mt-0.5">Fax: {branch.fax}</p>
                            )}
                          </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-2 min-w-0">
                          <Mail className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500 mb-0.5">Email</p>
                            <a
                              href={`mailto:${branch.email}`}
                              className="text-xs text-gray-700 hover:text-purple-600 truncate block"
                            >
                              {branch.email}
                            </a>
                          </div>
                        </div>

                        {/* Map Action */}
                        <div className="sm:col-span-2 lg:col-span-1 flex items-center lg:justify-end pt-2 lg:pt-0">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address + ' ' + branch.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0099ff] hover:bg-[#0088ee] text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-blue-500/10 active:scale-95 whitespace-nowrap"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            View on Map
                          </a>
                        </div>
                      </div>

                      {/* Mobile IFSC/MICR */}
                      {(branch.ifsc || branch.micr) && (
                        <div className="sm:hidden mt-3 pt-3 border-t border-gray-100 flex gap-2">
                          {branch.ifsc && (
                            <div className="flex-1 px-2 py-1.5 bg-[#0099ff]/10 rounded text-xs text-center">
                              <span className="text-gray-500">IFSC: </span>
                              <span className="text-[#0099ff]">{branch.ifsc}</span>
                            </div>
                          )}
                          {branch.micr && (
                            <div className="flex-1 px-2 py-1.5 bg-green-50 rounded text-xs text-center">
                              <span className="text-gray-500">MICR: </span>
                              <span className="text-green-600">{branch.micr}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredBranches.length === 0 && (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-gray-900 mb-2">No branches found</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Try adjusting your search criteria
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setSearchTerm('')}
                      className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-[#0099ff] transition-all text-sm"
                    >
                      Clear Search
                    </button>
                    <button
                      onClick={() => setSelectedDistrict('All')}
                      className="px-4 py-2 bg-[#0099ff] text-white rounded-lg hover:bg-[#0088ee] transition-all text-sm"
                    >
                      Show All
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-12 bg-gradient-to-br from-[#0099ff] to-[#0077dd] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">
          <div className="text-center">
            <h2 className="text-white mb-3">Need Assistance?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Our customer support team is ready to help you
            </p>

            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all">
                <Phone className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white/80 text-xs mb-1">Toll Free</p>
                <a href="tel:18004258873" className="text-white hover:underline text-sm">1800-425-8873</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all">
                <Mail className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white/80 text-xs mb-1">Email</p>
                <a href="mailto:gcubhelpdesk@guntururbanbank.org" className="text-white hover:underline text-xs break-all">gcubhelpdesk@guntururbanbank.org</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all">
                <Clock className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white/80 text-xs mb-1">Hours</p>
                <p className="text-white text-sm">10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

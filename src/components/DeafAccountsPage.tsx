import { Search, User, MapPin, Hash } from 'lucide-react';
import { Input } from './ui/input';
import { useState, useEffect } from 'react';
import client from '../api/client';

interface DeafAccount {
  id: number;
  name: string;
  address: string;
  udrn: string;
}

interface PageContent {
  hero_title: string;
  hero_description: string;
  info_banner: {
    title: string;
    description: string;
  };
}

export function DeafAccountsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageData, setPageData] = useState<PageContent | null>(null);
  const [accounts, setAccounts] = useState<DeafAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const [pageResponse, accountsResponse] = await Promise.all([
          client.get('/pages/deaf-accounts'),
          client.get('/deaf-accounts')
        ]);

        // Process Page Content
        if (pageResponse.data && pageResponse.data.content) {
          let content = pageResponse.data.content;
          if (typeof content === 'string') {
            try {
              content = JSON.parse(content);
            } catch (e) {
              console.error("Failed to parse page content JSON", e);
            }
          }
          setPageData(content);
        }

        // Process Accounts List
        if (accountsResponse.data) {
          setAccounts(accountsResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch deaf accounts page data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageData();
  }, []);

  const filteredAccounts = accounts.filter(account => {
    const search = searchTerm.toLowerCase();
    return (
      account.name.toLowerCase().includes(search) ||
      account.address.toLowerCase().includes(search) ||
      account.udrn.toLowerCase().includes(search)
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0099ff]"></div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Failed to load content.</p>
      </div>
    );
  }

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
            <h1 className="text-white mb-3">{pageData.hero_title}</h1>
            <div className="w-24 h-1 bg-white/80 mx-auto mb-4"></div>
            <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
              {pageData.hero_description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, address or UDRN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 bg-gray-50 border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing <span className="text-[#0099ff]">{filteredAccounts.length}</span> of {accounts.length} account holders
            </p>
          </div>

          {/* Account Cards List */}
          <div className="space-y-3">
            {filteredAccounts.map((account) => (
              <div
                key={account.id}
                className="bg-white rounded-lg border border-gray-200 hover:border-[#0099ff]/40 hover:shadow-md transition-all overflow-hidden"
              >
                <div className="p-4">
                  {/* Header Row */}
                  <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-100">
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-600">
                      {account.id}
                    </div>

                    {/* Account Holder Name & Icon */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 flex-shrink-0 text-[#0099ff]" />
                        <h3 className="text-gray-900">{account.name}</h3>
                      </div>
                    </div>

                    {/* UDRN Code */}
                    <div className="flex-shrink-0 hidden sm:block">
                      <div className="px-3 py-1.5 bg-[#0099ff]/10 rounded-lg text-xs border border-[#0099ff]/20">
                        <div className="flex items-center gap-1.5">
                          <Hash className="w-3 h-3 text-[#0099ff]" />
                          <div>
                            <span className="text-gray-500">UDRN: </span>
                            <span className="text-[#0099ff]">{account.udrn}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">Address</p>
                      <p className="text-xs text-gray-700 leading-relaxed">{account.address}</p>
                    </div>
                  </div>

                  {/* Mobile UDRN */}
                  <div className="sm:hidden mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0099ff]/10 rounded-lg text-xs border border-[#0099ff]/20">
                      <Hash className="w-3 h-3 text-[#0099ff] flex-shrink-0" />
                      <div>
                        <span className="text-gray-500">UDRN: </span>
                        <span className="text-[#0099ff]">{account.udrn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredAccounts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-gray-900 mb-2">No accounts found</h3>
              <p className="text-gray-600 text-sm mb-6">
                Try adjusting your search criteria
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-[#0099ff] text-white rounded-lg hover:bg-[#0088ee] transition-all text-sm"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
            <div className="text-center">
              <h2 className="text-gray-900 mb-3">{pageData.info_banner?.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                {pageData.info_banner?.description}
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-3 bg-[#0099ff] text-white rounded-lg hover:bg-[#0088ee] transition-all">
                <User className="w-5 h-5" />
                <span>Total Registered: {accounts.length} Account Holders</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

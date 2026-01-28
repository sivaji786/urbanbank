import { Download, FileText, File, CalendarDays, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import client, { getFullUrl } from '../api/client';

export function DownloadsPage() {
  const [downloadCategories, setDownloadCategories] = useState<any[]>([]);
  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleDownload = async (url: string, filename: string) => {
    try {
      const fullUrl = getFullUrl(url);
      const response = await fetch(fullUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename.toLowerCase().endsWith('.pdf') ? filename : `${filename}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed', error);
      window.open(getFullUrl(url), '_blank');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [downloadsRes, pageRes] = await Promise.all([
          client.get('downloads'),
          client.get('pages/downloads')
        ]);

        const grouped = downloadsRes.data.reduce((acc: any, item: any) => {
          const category = item.category || 'General';
          if (!acc[category]) {
            acc[category] = {
              title: category,
              icon: FileText,
              items: []
            };
          }
          acc[category].items.push({
            name: item.title,
            size: 'PDF', // Placeholder
            format: 'PDF',
            date: new Date(item.created_at).toLocaleDateString(),
            file_url: item.file_url
          });
          return acc;
        }, {});
        setDownloadCategories(Object.values(grouped));

        if (pageRes.data && pageRes.data.content) {
          setPageContent(pageRes.data.content);
        }
      } catch (error) {
        console.error('Failed to fetch downloads data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0099ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0099ff] to-[#0077cc] text-white py-12 lg:py-16 relative overflow-hidden shadow-lg border-b border-blue-400/20">
        <div className="max-w-7xl mx-auto px-10 relative z-10">
          <h1 className="text-4xl lg:text-5xl mb-4 font-bold">{pageContent?.hero_title || 'Financial & Annual Reports'}</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            {pageContent?.hero_description || 'Access our comprehensive financial reports, annual statements, and performance data demonstrating our commitment to transparency and excellence.'}
          </p>
        </div>
      </div>

      {/* Downloads Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {downloadCategories.map((category, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#0099ff]/10 rounded-lg">
                  <category.icon className="w-6 h-6 text-[#0099ff]" />
                </div>
                <h2 className="text-2xl text-gray-900">{category.title}</h2>
              </div>

              <div className="grid gap-3">
                {category.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#0099ff]/30 hover:bg-[#0099ff]/5 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-gray-100 rounded group-hover:bg-[#0099ff]/10 transition-colors">
                        <FileText className="w-5 h-5 text-gray-600 group-hover:text-[#0099ff] transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base text-gray-900 mb-1">{item.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{item.format}</span>
                          <span>•</span>
                          <span>{item.size}</span>
                          {'date' in item && (
                            <>
                              <span>•</span>
                              <span className="text-[#0099ff]">{item.date}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={getFullUrl(item.file_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-[#0099ff] bg-transparent shadow-sm hover:bg-[#0099ff]/10 h-8 px-3 text-[#0099ff] gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </a>
                      <Button
                        size="sm"
                        className="bg-[#0099ff] hover:bg-[#0088ee] text-white gap-2"
                        onClick={() => handleDownload(item.file_url, item.name)}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-br from-[#0099ff]/10 to-[#0099ff]/5 border border-[#0099ff]/20 rounded-xl p-8">
          <h3 className="text-xl text-gray-900 mb-3">Need Help?</h3>
          <p className="text-base text-gray-700 mb-4">
            If you're having trouble downloading any document or need assistance with forms, please contact our support team.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:gcubhelpdesk@guntururbanbank.org"
              className="text-[#0099ff] hover:underline"
            >
              gcubhelpdesk@guntururbanbank.org
            </a>
            <span className="text-gray-400">|</span>
            <a href="tel:1800-425-8873" className="text-[#0099ff] hover:underline">
              1800-425-8873
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

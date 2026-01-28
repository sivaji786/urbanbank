import { useState, useEffect } from 'react';
import client, { getFullUrl } from '../api/client';
import {
  Download, TrendingUp, BarChart3, FileText, Calendar,
  CreditCard, DollarSign, Wallet, Users, Building, ShieldCheck,
  Smartphone, Globe, Briefcase, Award, Percent, PieChart,
  ArrowRight, ChevronRight, Home, Settings, Lock, Unlock,
  Bell, Mail, Phone, MapPin, Printer, Share2, AlertCircle,
  CheckCircle2, XCircle, Info, HelpCircle, User, LogOut,
  Menu, X, ChevronDown, ChevronUp, ChevronsRight, Eye
} from 'lucide-react';
import { Button } from './ui/button';

export function FinancialReportsPage() {
  const [financialReports, setFinancialReports] = useState<any[]>([]);
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
        const [reportsRes, pageRes] = await Promise.all([
          client.get('reports'),
          client.get('pages/financial-reports')
        ]);

        const grouped = reportsRes.data.reduce((acc: any, item: any) => {
          const year = item.year || item.fiscal_year || 'Unknown Year';
          if (!acc[year]) {
            acc[year] = {
              year: year,
              reports: []
            };
          }
          acc[year].reports.push({
            name: item.title,
            size: 'PDF', // Placeholder
            type: item.type || 'Report',
            file_url: item.file_url
          });
          return acc;
        }, {});
        const sortedReports = Object.values(grouped).sort((a: any, b: any) => b.year.localeCompare(a.year));
        setFinancialReports(sortedReports);

        if (pageRes.data && pageRes.data.content) {
          setPageContent(pageRes.data.content);
        }
      } catch (error) {
        console.error('Failed to fetch reports data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Icon mapping for dynamic highlights
  const IconComponent = ({ name, className }: { name: string, className: string }) => {
    const icons: { [key: string]: any } = {
      TrendingUp, BarChart3, Download, FileText, Calendar,
      CreditCard, DollarSign, Wallet, Users, Building, ShieldCheck,
      Smartphone, Globe, Briefcase, Award, Percent, PieChart,
      ArrowRight, ChevronRight, Home, Settings, Lock, Unlock,
      Bell, Mail, Phone, MapPin, Printer, Share2, AlertCircle,
      CheckCircle2, XCircle, Info, HelpCircle, User, LogOut,
      Menu, X, ChevronDown, ChevronUp, ChevronsRight
    };
    const Icon = icons[name] || HelpCircle;
    return <Icon className={className} />;
  };

  // Default highlights for fallback
  const defaultHighlights = [
    {
      title: 'Total Deposits',
      value: '₹850+ Crore',
      icon: 'TrendingUp',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Advances',
      value: '₹620+ Crore',
      icon: 'BarChart3',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Net Profit',
      value: '₹12.5+ Crore',
      icon: 'TrendingUp',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Branches',
      value: '13 Branches',
      icon: 'BarChart3',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const highlights = pageContent?.financial_highlights || defaultHighlights;
  const highlightsTitle = pageContent?.financial_highlights_title || 'Financial Highlights (2023-24)';

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
      <div className="bg-blue-50 text-gray-900 py-12 lg:py-16 relative overflow-hidden shadow-lg border-b border-blue-400/20">
        <div className="max-w-7xl mx-auto px-10 relative z-10">
          <h1 className="text-2xl lg:text-3xl mb-4 font-bold">{pageContent?.hero_title || 'Financial & Annual Reports'}</h1>
          <p className="text-md text-gray-900 max-w-3xl">
            {pageContent?.hero_description || 'Access our comprehensive financial reports, annual statements, and performance data demonstrating our commitment to transparency and excellence.'}
          </p>
        </div>
      </div>

      {/* Financial Highlights */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {highlights.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl text-gray-900 mb-6">{highlightsTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((highlight: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className={`inline-flex p-3 ${highlight.bgColor || 'bg-blue-50'} rounded-lg mb-4`}>
                    <IconComponent name={highlight.icon} className={`w-6 h-6 ${highlight.color || 'text-[#0099ff]'}`} />
                  </div>
                  <h3 className="text-base text-gray-600 mb-2">{highlight.title}</h3>
                  <p className="text-2xl text-gray-900">{highlight.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports by Year */}
        <div className="space-y-8">
          <h2 className="text-3xl text-gray-900">Annual Reports & Financial Statements</h2>

          {financialReports.map((yearData, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="p-3 bg-[#0099ff]/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-[#0099ff]" />
                </div>
                <div>
                  <h3 className="text-2xl text-gray-900">Financial Year {yearData.year}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {yearData.reports.length} documents available
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                {yearData.reports.map((report: any, reportIdx: number) => (
                  <div
                    key={reportIdx}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#0099ff]/30 hover:bg-[#0099ff]/5 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-gray-100 rounded group-hover:bg-[#0099ff]/10 transition-colors">
                        <FileText className="w-5 h-5 text-gray-600 group-hover:text-[#0099ff] transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base text-gray-900 mb-1">{report.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                            {report.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={getFullUrl(report.file_url)}
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
                        onClick={() => handleDownload(report.file_url, report.name)}
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

        {/* Additional Information */}
        <div className="mt-8 bg-gradient-to-br from-[#0099ff]/10 to-[#0099ff]/5 border border-[#0099ff]/20 rounded-xl p-8">
          <h3 className="text-xl text-gray-900 mb-3">About Our Financial Reports</h3>
          <div className="space-y-3 text-base text-gray-700">
            <p>
              All financial statements are prepared in accordance with Indian Accounting Standards (Ind AS) and audited by independent chartered accountants.
            </p>
            <p>
              Our annual reports provide comprehensive information about our financial performance, business operations, risk management, and corporate governance practices.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              For any queries regarding our financial reports, please contact our Accounts Department at{' '}
              <a href="mailto:accounts@guntururbanbank.org" className="text-[#0099ff] hover:underline">
                accounts@guntururbanbank.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

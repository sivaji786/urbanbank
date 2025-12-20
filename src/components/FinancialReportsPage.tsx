import { useState, useEffect } from 'react';
import client from '../api/client';
import { Download, TrendingUp, BarChart3, FileText, Calendar } from 'lucide-react';
import { Button } from './ui/button';

export function FinancialReportsPage() {
  const [financialReports, setFinancialReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await client.get('/reports');
        const grouped = response.data.reduce((acc: any, item: any) => {
          const year = item.fiscal_year || 'Unknown Year';
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
      } catch (error) {
        console.error('Failed to fetch reports', error);
      }
    };
    fetchReports();
  }, []);

  const financialHighlights = [
    {
      title: 'Total Deposits',
      value: '₹850+ Crore',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Advances',
      value: '₹620+ Crore',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Net Profit',
      value: '₹12.5+ Crore',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Branches',
      value: '13 Branches',
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0099ff] to-[#0077cc] text-white py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="text-4xl lg:text-5xl mb-4">Financial & Annual Reports</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Access our comprehensive financial reports, annual statements, and performance data demonstrating our commitment to transparency and excellence.
          </p>
        </div>
      </div>

      {/* Financial Highlights */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl text-gray-900 mb-6">Financial Highlights (2023-24)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialHighlights.map((highlight, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex p-3 ${highlight.bgColor} rounded-lg mb-4`}>
                  <highlight.icon className={`w-6 h-6 ${highlight.color}`} />
                </div>
                <h3 className="text-base text-gray-600 mb-2">{highlight.title}</h3>
                <p className="text-2xl text-gray-900">{highlight.value}</p>
              </div>
            ))}
          </div>
        </div>

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
                          <span>•</span>
                          <span>PDF</span>
                          <span>•</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#0099ff] hover:bg-[#0088ee] text-white gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
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

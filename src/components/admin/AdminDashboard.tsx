import { useState, useEffect } from 'react';
import '../../styles/custom-admin.css';
import {
  LayoutDashboard,
  Images,
  Newspaper,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Settings,
  Calendar,
  Download,
  TrendingUp,
  FileText,
  Users,
  Ear,
  ExternalLink,
  MapPin,
  Layout,
  PlusCircle,
  Sparkles,
  ArrowRight,
  Clock,
  Activity,
  History,
  ShieldCheck,
  Coins,
  User
} from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { ContentManager } from './ContentManager';
import { NewsManagement } from './NewsManagement';
import { SettingsManagement } from './SettingsManagement';
import { PageManager } from './PageManager';
import { TeamMemberManager } from './TeamMemberManager';
import { GalleryManagement } from './GalleryManagement';
import DeafAccountsManagement from './DeafAccountsManagement';
import { ProductManagement } from './ProductManagement';
import { GoldRatesManagement } from './GoldRatesManagement';
import { ProfileManagement } from './ProfileManagement';

import { BranchManagement } from './BranchManagement';
import { ServicesManagement } from './ServicesManagement';
import { ServiceChargesManagement } from './ServiceChargesManagement';
import { VisitorAnalytics } from './VisitorAnalytics';
import { ApplicationManagement } from '../ApplicationManagement';
import { ApplicationDetails } from '../ApplicationDetails';
import client from '../../api/client';

type AdminView = 'overview' | 'gallery' | 'news' | 'events' | 'downloads' | 'reports' | 'settings' | 'pages' | 'team-members' | 'deaf-accounts' | 'branches' | 'deposits' | 'loans' | 'services' | 'service-charges' | 'visitor-analytics' | 'applications' | 'gold-rates' | 'quick-access' | 'service-icons' | 'profile';

interface AdminDashboardProps {
  onLogout: () => void;
}

const defaultImage = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwc2VydmljZXN8ZW58MXx8fHwxNzYxODI4NzgwfDA&ixlib=rb-4.1.0&q=80&w=1080';

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [statsData, setStatsData] = useState({
    news: 0,
    events: 0,
    gallery: 0,
    downloads: 0
  });
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [latestEvents, setLatestEvents] = useState<any[]>([]);
  const { logout } = useAuth();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, newsRes, eventsRes] = await Promise.all([
          client.get('stats'),
          client.get('news'),
          client.get('events')
        ]);
        setStatsData(statsRes.data);
        setLatestNews(Array.isArray(newsRes.data) ? newsRes.data.slice(0, 3) : []);
        setLatestEvents(Array.isArray(eventsRes.data) ? eventsRes.data.slice(0, 3) : []);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
    };
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const menuItems = [
    { id: 'overview' as AdminView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'visitor-analytics' as AdminView, label: 'Visitor Insights', icon: Activity },
    { id: 'pages' as AdminView, label: 'Content Hub', icon: FileText },
    { id: 'team-members' as AdminView, label: 'Board of Directors', icon: Users },
    { id: 'news' as AdminView, label: 'Corporate News', icon: Newspaper },
    { id: 'events' as AdminView, label: 'Events', icon: Calendar },
    { id: 'gallery' as AdminView, label: 'Media Gallery', icon: Images },
    { id: 'branches' as AdminView, label: 'Branch Locator', icon: MapPin },
    { id: 'downloads' as AdminView, label: 'Downloads', icon: Download },
    { id: 'reports' as AdminView, label: 'Financial Reports', icon: TrendingUp },
    { id: 'deaf-accounts' as AdminView, label: 'Deaf Accounts', icon: Ear },
    { id: 'applications' as AdminView, label: 'Applications', icon: ShieldCheck },
    { id: 'gold-rates' as AdminView, label: 'Gold Rates', icon: Coins },
    { id: 'quick-access' as AdminView, label: 'Quick Access', icon: Sparkles },
    { id: 'service-icons' as AdminView, label: 'Service Icons', icon: Layout },
    { id: 'settings' as AdminView, label: 'Configurations', icon: Settings },
  ];

  const productSubMenuItems = [
    { id: 'deposits' as AdminView, label: 'Deposit Schemes', icon: Layout },
    { id: 'loans' as AdminView, label: 'Loan Products', icon: Layout },
    { id: 'services' as AdminView, label: 'Services', icon: Layout },
    { id: 'service-charges' as AdminView, label: 'Tariff & Charges', icon: Layout },
  ];

  const stats = [
    { label: 'Corporate News', value: (statsData?.news ?? 0).toString(), color: 'bg-blue-50', text: 'text-[#0099ff]', icon: Newspaper },
    { label: 'Active Events', value: (statsData?.events ?? 0).toString(), color: 'bg-rose-50', text: 'text-rose-600', icon: Calendar },
    { label: 'Media Assets', value: (statsData?.gallery ?? 0).toString(), color: 'bg-indigo-50', text: 'text-indigo-600', icon: Images },
    { label: 'Downloads', value: (statsData?.downloads ?? 0).toString(), color: 'bg-emerald-50', text: 'text-emerald-600', icon: Download },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Themed Full-Width Header */}
      <header className="h-12 bg-[#0099ff] fixed top-0 left-0 right-0 z-50 transition-all flex items-center px-6 justify-between shadow-md font-['Inter']">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-all"
          >
            <Menu className="h-5 w-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-black text-white leading-none tracking-widest uppercase mb-0.5 font-['Poppins']">Urban Bank</h1>
              <p className="text-sm text-white font-black uppercase tracking-[0.2em]">Operational Unit</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-medium text-white hover:bg-white hover:text-[#0099ff] border border-white/20 transition-all uppercase tracking-wider"
            onClick={() => window.open('/#home', '_blank')}
          >
            <ExternalLink className="h-3 w-3" />
            Site
          </button>
          <button
            onClick={() => {
              setCurrentView('profile');
              window.location.hash = '#admin/profile';
            }}
            className="flex items-center gap-2 px-3 py-1 rounded-[6px] bg-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <User className="h-3 w-3" />
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1 rounded-[6px] bg-white text-[#0099ff] text-xs font-bold uppercase tracking-widest hover:bg-blue-50 transition-all duration-300 shadow-sm"
          >
            <LogOut className="h-3 w-3" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Rock-Solid Sidebar */}
      <aside
        className={`fixed top-10 left-0 h-full w-64 bg-white border-r border-[#E5E7EB] transition-all duration-500 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} font-['Inter']`}
      >
        <nav className="px-3 pt-4 h-full overflow-y-auto custom-scrollbar flex flex-col gap-2 pb-16">

          {/* Main Navigation */}
          <div>
            <div className="space-y-0.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      window.location.hash = `#admin/${item.id}`;
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-all duration-300 relative group ${isActive
                      ? 'bg-[#E6F4FF] text-[#0099FF] font-semibold'
                      : 'text-[#334155] hover:bg-[#F1F8FF] hover:text-[#0F172A] font-medium'
                      }`}
                  >
                    {isActive && <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#0099FF] rounded-full" />}
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#0099FF]' : 'text-[#64748B] group-hover:text-[#0F172A]'}`} />
                    <span className="flex-1 text-left tracking-tight">{item.label}</span>
                    {isActive && <ChevronRight className="h-3 w-3 opacity-40 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Operational Products */}
          <div>
            <p className="px-3 text-sm font-semibold text-gray-400 uppercase tracking-[0.08em] mb-1">Operational Suites</p>
            <div className="space-y-0.5">
              {productSubMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      window.location.hash = `#admin/${item.id}`;
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-all duration-300 relative group ${isActive
                      ? 'bg-[#E6F4FF] text-[#0099FF] font-semibold'
                      : 'text-[#334155] hover:bg-[#F1F8FF] hover:text-[#0F172A] font-medium'
                      }`}
                  >
                    {isActive && <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#0099FF] rounded-full" />}
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#0099FF]' : 'text-[#64748B] group-hover:text-[#0F172A]'}`} />
                    <span className="flex-1 text-left tracking-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </aside>

      {/* Professional Density Content Area */}
      <main
        className={`min-h-screen transition-all duration-500 bg-gray-50 ${sidebarOpen ? 'lg:pl-64' : ''}`}
        style={{ marginTop: '3rem' }}
      >
        <div className="ui-page max-w-[1600px] mx-auto animate-in fade-in duration-700 px-4 py-2">

          {(() => {
            if (currentHash.startsWith('#admin/application-details/')) {
              const id = currentHash.split('/')[2];
              return <ApplicationDetails id={id} />;
            }
            return null;
          })()}

          {!currentHash.startsWith('#admin/application-details/') && (
            <div className="space-y-6">
              {currentView === 'overview' && (
                <>
                  {/* Strategic Welcome: Single Pattern Header */}
                  <div className="bg-[#f8fbff] rounded-[2rem] p-5 md:p-6 mb-4 transition-all duration-500">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1 font-['Poppins']">Welcome Back.</h2>
                        <p className="text-gray-500 font-medium text-sm font-['Inter'] max-w-xl">Overseeing data with precision architecture and minimalist clarity.</p>
                      </div>
                    </div>
                  </div>

                  {/* Quantitative Analysis Grid: Single Pattern Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {stats.map((stat, index) => (
                      <div
                        key={index}
                        className={`group p-4 rounded-2xl bg-white border border-[#F1F5F9] hover:border-[#0099FF]/30 shadow-sm transition-all duration-500 text-left`}
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center ${stat.text} mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                          <stat.icon className="w-5 h-5" />
                        </div>
                        <h3 className={`text-2xl font-black text-gray-900 mb-1 tracking-tighter font-['Poppins']`}>{stat.value}</h3>
                        <p className="text-md font-black text-gray-400 tracking-widest leading-none font-['Inter']">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Strategic Content Feed - Balanced 2-Column Grid */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">

                    {/* Single Pattern: Integrated Corporate Stream */}
                    <div className="group bg-white rounded-xl p-6 md:p-8 border border-blue-50 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,153,255,0.06)] mb-6">
                      <div className="flex flex-col lg:flex-row md:items-start gap-8">
                        {/* Left: Module Info */}
                        <div className="flex-1">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-[#0099ff] mb-5">
                            <Activity className="w-6 h-6" />
                          </div>
                          <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tighter font-['Poppins']">Corporate Stream</h3>
                          <p className="text-gray-500 font-medium text-xs mb-8 leading-relaxed font-['Inter']">
                            Real-time institutional intelligence and verified press releases from our core operations.
                          </p>
                          <button
                            onClick={() => setCurrentView('news')}
                            className="group/btn inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0099ff] text-white font-black text-[9px] uppercase tracking-[0.2em] shadow-md hover:bg-black transition-all duration-500"
                          >
                            Access Stream
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1.5 transition-transform" />
                          </button>
                        </div>

                        {/* Right: Feed Data */}
                        <div className="flex-1 space-y-3">
                          {latestNews.length > 0 ? latestNews.map((news) => (
                            <div key={news.id} className="w-full flex items-center gap-4 p-3 rounded-xl bg-white border border-gray-50 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 transform hover:-translate-x-1 cursor-pointer" onClick={() => setCurrentView('news')}>
                              <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                                <img src={news.image_url || defaultImage} className="w-full h-full object-cover" alt="" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-black text-gray-800 text-[13px] leading-tight mb-1 truncate">{news.title}</h4>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{news.date || 'Archives'}</p>
                              </div>
                              <ChevronRight className="text-gray-300 w-4 h-4 group-hover:text-[#0099ff]" />
                            </div>
                          )) : (
                            <div className="h-full flex flex-col items-center justify-center py-12 bg-white/50 rounded-2xl border-2 border-dashed border-blue-50">
                              <Newspaper className="w-8 h-8 text-blue-100 mb-3" />
                              <p className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em]">Repository Empty</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Single Pattern: Event Matrix */}
                    <div className="group bg-white rounded-xl p-6 md:p-8 border border-red-50 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.06)]">
                      <div className="flex flex-col lg:flex-row md:items-start gap-8">
                        {/* Left: Module Info */}
                        <div className="flex-1">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-red-600 mb-5">
                            <History className="w-6 h-6" />
                          </div>
                          <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tighter font-['Poppins']">Events</h3>
                          <p className="text-gray-500 font-medium text-xs mb-8 leading-relaxed font-['Inter']">
                            Strategic milestones and institutional calendars tracking our development path.
                          </p>
                          <button
                            onClick={() => setCurrentView('events')}
                            className="group/btn inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 text-white font-black text-[9px] uppercase tracking-[0.2em] shadow-md hover:bg-black transition-all duration-500"
                          >
                            Modify Matrix
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1.5 transition-transform" />
                          </button>
                        </div>

                        {/* Right: Matrix Grid */}
                        <div className="flex-1 space-y-3">
                          {latestEvents.length > 0 ? latestEvents.map((event) => (
                            <div key={event.id} className="w-full flex items-center gap-4 p-3 rounded-xl bg-white border border-gray-50 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 transform hover:-translate-x-1 cursor-pointer" onClick={() => setCurrentView('events')}>
                              <div className="w-12 h-12 rounded-lg bg-red-50/30 flex items-center justify-center text-red-600 shrink-0">
                                <Calendar className="w-6 h-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-black text-gray-800 text-[13px] leading-tight mb-1 truncate">{event.title}</h4>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{event.date || 'Archives'}</p>
                              </div>
                              <ChevronRight className="text-gray-300 w-4 h-4 group-hover:text-red-600" />
                            </div>
                          )) : (
                            <div className="h-full flex flex-col items-center justify-center py-12 bg-white/50 rounded-2xl border-2 border-dashed border-red-50">
                              <Calendar className="w-8 h-8 text-red-100 mb-3" />
                              <p className="text-[10px] font-black text-red-300 uppercase tracking-[0.2em]">Matrix Offline</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </>
              )}

              {/* Secure Secondary Viewpoints */}
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-1000">
                {currentView === 'pages' && <PageManager />}
                {currentView === 'team-members' && <TeamMemberManager />}
                {currentView === 'deaf-accounts' && <DeafAccountsManagement />}
                {currentView === 'news' && <NewsManagement />}
                {currentView === 'events' && (
                  <ContentManager
                    title="Events Hub"
                    resource="events"
                    columns={[
                      { key: 'image_url', label: 'Image', type: 'image' },
                      { key: 'title', label: 'Title' },
                      { key: 'date', label: 'Date', type: 'date' },
                      { key: 'location', label: 'Location' },
                    ]}
                    fields={[
                      { key: 'title', label: 'Title', type: 'text' },
                      { key: 'image_url', label: 'Event Banner', type: 'image-select' },
                      { key: 'description', label: 'Description', type: 'textarea' },
                      { key: 'date', label: 'Date', type: 'date' },
                      { key: 'location', label: 'Location', type: 'text' },
                    ]}
                  />
                )}
                {currentView === 'gallery' && <GalleryManagement />}
                {currentView === 'downloads' && (
                  <ContentManager
                    title="Resource Archive"
                    resource="downloads"
                    columns={[
                      { key: 'title', label: 'Title' },
                      { key: 'category', label: 'Category' },
                    ]}
                    fields={[
                      { key: 'title', label: 'Title', type: 'text' },
                      { key: 'file_url', label: 'File URL', type: 'file' },
                      { key: 'category', label: 'Category', type: 'text' },
                    ]}
                  />
                )}
                {currentView === 'reports' && (
                  <ContentManager
                    title="Financial Reporting"
                    resource="reports"
                    columns={[
                      { key: 'title', label: 'Title' },
                      { key: 'year', label: 'Year' },
                      { key: 'quarter', label: 'Quarter' },
                    ]}
                    fields={[
                      { key: 'title', label: 'Title', type: 'text' },
                      { key: 'file_url', label: 'File URL', type: 'file' },
                      { key: 'year', label: 'Year', type: 'text' },
                      { key: 'quarter', label: 'Quarter', type: 'text' },
                    ]}
                  />
                )}
                {currentView === 'settings' && <SettingsManagement />}
                {currentView === 'branches' && <BranchManagement />}
                {currentView === 'deposits' && <ProductManagement category="deposit" />}
                {currentView === 'loans' && <ProductManagement category="loan" />}
                {currentView === 'services' && <ServicesManagement />}
                {currentView === 'service-charges' && <ServiceChargesManagement />}
                {currentView === 'visitor-analytics' && <VisitorAnalytics />}
                {currentView === 'applications' && <ApplicationManagement />}
                {currentView === 'gold-rates' && <GoldRatesManagement />}
                {currentView === 'quick-access' && (
                  <ContentManager
                    title="Quick Access Tools"
                    resource="quick-access"
                    columns={[
                      { key: 'title', label: 'Title' },
                      { key: 'icon', label: 'Icon' },
                      { key: 'order_index', label: 'Order' },
                    ]}
                    fields={[
                      { key: 'title', label: 'Title', type: 'text' },
                      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
                      { key: 'icon', label: 'Icon (Emoji)', type: 'text' },
                      { key: 'bg_color', label: 'Background Color', type: 'text' },
                      { key: 'link', label: 'Link URL', type: 'text' },
                      { key: 'is_new_tab', label: 'Open in New Tab', type: 'switch' },
                      { key: 'order_index', label: 'Display Order', type: 'text' },
                    ]}
                  />
                )}
                {currentView === 'service-icons' && (
                  <ContentManager
                    title="Service Icons Carousel"
                    resource="service-icons"
                    columns={[
                      { key: 'icon_url', label: 'Icon', type: 'image' },
                      { key: 'title', label: 'Title' },
                      { key: 'order_index', label: 'Order' },
                    ]}
                    fields={[
                      { key: 'title', label: 'Title', type: 'text' },
                      { key: 'icon_url', label: 'Icon Image', type: 'image-select' },
                      { key: 'link', label: 'Link URL', type: 'text' },
                      { key: 'is_new_tab', label: 'Open in New Tab', type: 'switch' },
                      { key: 'order_index', label: 'Display Order', type: 'text' },
                    ]}
                  />
                )}
                {currentView === 'profile' && <ProfileManagement />}
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e2e8f0;
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;

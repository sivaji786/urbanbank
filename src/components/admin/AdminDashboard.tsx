import { useState, useEffect } from 'react';
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
  Layout
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

import { BranchManagement } from './BranchManagement';
import client from '../../api/client';

type AdminView = 'overview' | 'gallery' | 'news' | 'events' | 'downloads' | 'reports' | 'settings' | 'pages' | 'team-members' | 'deaf-accounts' | 'branches' | 'deposits' | 'loans';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [statsData, setStatsData] = useState({
    news: 0,
    events: 0,
    gallery: 0,
    downloads: 0
  });
  const { logout } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await client.get('/stats');
        setStatsData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard statistics', error);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const menuItems = [
    { id: 'overview' as AdminView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'branches' as AdminView, label: 'Branch Locator', icon: MapPin },
    { id: 'pages' as AdminView, label: 'Pages Content', icon: FileText },
    { id: 'team-members' as AdminView, label: 'Team Members', icon: Users },
    { id: 'deaf-accounts' as AdminView, label: 'Deaf Accounts', icon: Ear },
    { id: 'news' as AdminView, label: 'News', icon: Newspaper },
    { id: 'events' as AdminView, label: 'Events', icon: Calendar },
    { id: 'gallery' as AdminView, label: 'Gallery', icon: Images },
    { id: 'downloads' as AdminView, label: 'Downloads', icon: Download },
    { id: 'reports' as AdminView, label: 'Financial Reports', icon: TrendingUp },
    { id: 'settings' as AdminView, label: 'Settings', icon: Settings },
  ];

  const productSubMenuItems = [
    { id: 'deposits' as AdminView, label: 'Deposits', icon: Layout },
    { id: 'loans' as AdminView, label: 'Loans', icon: Layout },
  ];

  const stats = [
    { label: 'News Items', value: statsData.news.toString(), color: 'from-green-500 to-green-600' },
    { label: 'Events', value: statsData.events.toString(), color: 'from-purple-500 to-purple-600' },
    { label: 'Gallery Photos', value: statsData.gallery.toString(), color: 'from-blue-500 to-blue-600' },
    { label: 'Downloads', value: statsData.downloads.toString(), color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div>
              <h1 className="text-lg text-gray-900">Admin Portal</h1>
              <p className="text-sm text-gray-500">Guntur Urban Bank</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="gap-2 text-gray-600 hover:text-[#0099ff] hover:bg-blue-50"
              onClick={() => window.open('/#home', '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">View Website</span>
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-30 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                  ? 'bg-[#0099ff] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </button>
            );
          })}

          {/* Products Submenu */}
          <div className="pt-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Products
            </div>
            {productSubMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 pl-8 rounded-lg transition-all ${isActive
                    ? 'bg-[#0099ff] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {isActive && <ChevronRight className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-600 mb-1">Logged in as</p>
          <p className="text-sm text-gray-900">Administrator</p>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : ''
          }`}
      >
        <div className="p-6">
          {currentView === 'overview' && (
            <>
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-gray-900 mb-2">Welcome back, Administrator</h2>
                <p className="text-gray-600">
                  Manage your bank's website content from this dashboard
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} mb-4`}
                    >
                      <div className="w-6 h-6 bg-white/30 rounded"></div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <h3 className="text-gray-900">{stat.value}</h3>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {menuItems.slice(1, -1).map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentView(item.id)}
                        className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-[#0099ff] hover:bg-[#0099ff]/5 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gray-100 group-hover:bg-[#0099ff]/10 flex items-center justify-center transition-colors">
                          <Icon className="h-6 w-6 text-gray-600 group-hover:text-[#0099ff] transition-colors" />
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-[#0099ff] transition-colors">
                          Manage {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {currentView === 'pages' && <PageManager />}
          {currentView === 'team-members' && <TeamMemberManager />}
          {currentView === 'deaf-accounts' && <DeafAccountsManagement />}

          {currentView === 'news' && <NewsManagement />}

          {currentView === 'events' && (
            <ContentManager
              title="Events Management"
              resource="events"
              columns={[
                { key: 'title', label: 'Title' },
                { key: 'date', label: 'Date', type: 'date' },
                { key: 'location', label: 'Location' },
              ]}
              fields={[
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'date', label: 'Date', type: 'date' },
                { key: 'location', label: 'Location', type: 'text' },
              ]}
            />
          )}

          {currentView === 'gallery' && <GalleryManagement />}

          {currentView === 'downloads' && (
            <ContentManager
              title="Downloads Management"
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
              title="Financial Reports Management"
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
        </div>
      </main>
    </div>
  );
}

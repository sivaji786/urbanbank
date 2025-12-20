import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { AboutUsSection } from './components/AboutUsSection';
import { DICGCSection } from './components/DICGCSection';
import { NewsToolsSection } from './components/NewsToolsSection';
import { BankingExcellenceSection } from './components/BankingExcellenceSection';
import { LatestEventsSection } from './components/LatestEventsSection';
import { BranchLocator } from './components/BranchLocator';
import { AboutUsPage } from './components/AboutUsPage';
import { ManagementPage } from './components/ManagementPage';
import { VisionMissionPage } from './components/VisionMissionPage';
import { ContactPage } from './components/ContactPage';
import { DeafAccountsPage } from './components/DeafAccountsPage';
import { GalleryPage } from './components/GalleryPage';
import { DownloadsPage } from './components/DownloadsPage';
import { FinancialReportsPage } from './components/FinancialReportsPage';
import { DepositsPage } from './components/DepositsPage';
import { LoansPage } from './components/LoansPage';
import { ServicesPage } from './components/ServicesPage';
import { GrievanceCTA } from './components/GrievanceCTA';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { NewsPage } from './components/NewsPage';
import { NewsDetailsPage } from './components/NewsDetailsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useState, useEffect } from 'react';
import { getPageFromHash, PageType } from './utils/navigation';
import { Toaster } from 'sonner';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash;
    const page = getPageFromHash(hash);
    if (page === 'admin' && !isAuthenticated) {
      return 'login';
    }
    // Handle parameterized routes
    if (hash.startsWith('#news-details/') || hash.startsWith('#deposit-details/') || hash.startsWith('#loan-details/')) {
      return hash.replace('#', '');
    }
    return page || 'home';
  });

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const page = getPageFromHash(hash);

      if (hash.startsWith('#news-details/') || hash.startsWith('#deposit-details/') || hash.startsWith('#loan-details/')) {
        setCurrentPage(hash.replace('#', ''));
        window.scrollTo(0, 0);
        return;
      }

      if (page) {
        if (page === 'admin' && !isAuthenticated) {
          setCurrentPage('login');
        } else {
          setCurrentPage(page);
        }
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated]);

  // Sync state with hash on mount
  useEffect(() => {
    if (isLoading) return;

    const hash = window.location.hash;
    const page = getPageFromHash(hash);

    if (hash.startsWith('#news-details/') || hash.startsWith('#deposit-details/') || hash.startsWith('#loan-details/')) {
      setCurrentPage(hash.replace('#', ''));
      return;
    }

    if (page && page !== currentPage) {
      if (page === 'admin' && !isAuthenticated) {
        setCurrentPage('login');
      } else {
        setCurrentPage(page);
      }
    }
  }, [isAuthenticated, isLoading]);

  const handleLoginSuccess = () => {
    window.location.hash = '#admin';
    setCurrentPage('admin');
  };

  const handleLogout = () => {
    window.location.hash = '#home';
    setCurrentPage('home');
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && currentPage === 'login') {
      window.location.hash = '#admin';
      setCurrentPage('admin');
    }
  }, [isAuthenticated, currentPage, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-[#0099ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (currentPage === 'admin' && isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (currentPage === 'login') {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Check for dynamic routes
  if (currentPage.startsWith('news-details/')) {
    const id = currentPage.split('/')[1];
    return (
      <div className="min-h-screen bg-white">
        <Header onNavigate={(page) => setCurrentPage(page)} />
        <main className="pt-[104px]">
          <NewsDetailsPage id={id} />
        </main>
        <Footer />
      </div>
    );
  }

  if (currentPage.startsWith('deposit-details/')) {
    const id = currentPage.split('/')[1];
    return (
      <div className="min-h-screen bg-white">
        <Header onNavigate={(page) => setCurrentPage(page)} />
        <main>
          <ProductDetailPage id={id} category="deposit" />
        </main>
        <Footer />
      </div>
    );
  }

  if (currentPage.startsWith('loan-details/')) {
    const id = currentPage.split('/')[1];
    return (
      <div className="min-h-screen bg-white">
        <Header onNavigate={(page) => setCurrentPage(page)} />
        <main>
          <ProductDetailPage id={id} category="loan" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={(page) => setCurrentPage(page)} />
      <main>
        {currentPage === 'home' ? (
          <>
            <HeroSlider />
            <AboutUsSection />
            <DICGCSection />
            <BankingExcellenceSection />
            <NewsToolsSection />
            <LatestEventsSection />
            <GrievanceCTA />
          </>
        ) : currentPage === 'about-us' ? (
          <div className="pt-[104px]">
            <AboutUsPage />
          </div>
        ) : currentPage === 'management' ? (
          <div className="pt-[104px]">
            <ManagementPage />
          </div>
        ) : currentPage === 'vision-mission' ? (
          <div className="pt-[104px]">
            <VisionMissionPage />
          </div>
        ) : currentPage === 'contact' ? (
          <div className="pt-[104px]">
            <ContactPage />
          </div>
        ) : currentPage === 'deaf-accounts' ? (
          <div className="pt-[104px]">
            <DeafAccountsPage />
          </div>
        ) : currentPage === 'gallery' ? (
          <div className="pt-[104px]">
            <GalleryPage />
          </div>
        ) : currentPage === 'downloads' ? (
          <div className="pt-[104px]">
            <DownloadsPage />
          </div>
        ) : currentPage === 'financial-reports' ? (
          <div className="pt-[104px]">
            <FinancialReportsPage />
          </div>
        ) : currentPage === 'deposits' ? (
          <div className="pt-[104px]">
            <DepositsPage />
          </div>
        ) : currentPage === 'loans' ? (
          <div className="pt-[104px]">
            <LoansPage />
          </div>
        ) : currentPage === 'services' ? (
          <div className="pt-[104px]">
            <ServicesPage />
          </div>
        ) : currentPage === 'news' ? (
          <div className="pt-[104px]">
            <NewsPage />
          </div>
        ) : (
          <div className="pt-[104px]">
            <BranchLocator />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <AppContent />
    </AuthProvider>
  );
}
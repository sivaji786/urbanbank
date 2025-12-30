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
import { SettingsProvider } from './contexts/SettingsContext';
import { useState, useEffect } from 'react';
import { getPageFromHash } from './utils/navigation';
import { Toaster } from 'sonner';
import { useVisitorTracking } from './hooks/useVisitorTracking';
import { SEO } from './components/SEO';
import { useSettings } from './contexts/SettingsContext';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  // Track visitor on app mount
  useVisitorTracking();

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

  const { settings } = useSettings();

  const getPageSEO = () => {
    const siteName = settings.site_name || 'Guntur Urban Bank';

    // Base Schema
    const baseFinancialSchema = {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": siteName,
      "description": settings.site_description,
      "url": settings.domain_name || window.location.origin,
      "telephone": settings.support_phone || "1800-425-8873",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Guntur",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "522001",
        "addressCountry": "IN"
      }
    };

    if (currentPage === 'home') {
      return {
        title: 'Home',
        description: `Welcome to ${siteName}. Providing premium banking services, low-interest loans, and secure deposits for seven decades.`,
        schema: baseFinancialSchema
      };
    }
    if (currentPage === 'about-us') {
      return {
        title: 'About Us',
        description: `Learn about the history and heritage of ${siteName}, a premiere co-operative bank in Andhra Pradesh.`,
      };
    }
    if (currentPage === 'contact') {
      return {
        title: 'Contact Us',
        description: `Get in touch with ${siteName}. Reach out via phone, email, or visit our branches across Guntur.`,
        schema: {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "mainEntity": baseFinancialSchema
        }
      };
    }
    // Default fallback
    return {
      title: currentPage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      description: settings.site_description
    };
  };

  const seoData = getPageSEO();

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
    return (
      <>
        <SEO title="Admin Login" description="Secure access to the Urban Bank Administration Panel." />
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  // Check for dynamic routes
  if (currentPage.startsWith('news-details/')) {
    const id = currentPage.split('/')[1];
    return (
      <div className="min-h-screen bg-white">
        <SEO title="News & Events" />
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
        <SEO title="Deposit Product Details" />
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
        <SEO title="Loan Product Details" />
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
      <SEO {...seoData} />
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
    <SettingsProvider>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <AppContent />
      </AuthProvider>
    </SettingsProvider>
  );
}
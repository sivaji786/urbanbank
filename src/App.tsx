import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { AboutUsSection } from './components/AboutUsSection';
import { NewsToolsSection } from './components/NewsToolsSection';
import { BankingExcellenceSection } from './components/BankingExcellenceSection';
import { LatestEventsSection } from './components/LatestEventsSection';
import { GrievanceCTA } from './components/GrievanceCTA';
import { Footer } from './components/Footer';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { getPageFromHash, PageType } from './utils/navigation';
import { Toaster } from 'sonner';
import { useVisitorTracking } from './hooks/useVisitorTracking';
import { SEO } from './components/SEO';
import { useSettings } from './contexts/SettingsContext';

// Lazy load components that are not on the home page
const AboutUsPage = lazy(() => import('./components/AboutUsPage').then(m => ({ default: m.AboutUsPage })));
const ManagementPage = lazy(() => import('./components/ManagementPage').then(m => ({ default: m.ManagementPage })));
const VisionMissionPage = lazy(() => import('./components/VisionMissionPage').then(m => ({ default: m.VisionMissionPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then(m => ({ default: m.ContactPage })));
const DeafAccountsPage = lazy(() => import('./components/DeafAccountsPage').then(m => ({ default: m.DeafAccountsPage })));
const GalleryPage = lazy(() => import('./components/GalleryPage').then(m => ({ default: m.GalleryPage })));
const DownloadsPage = lazy(() => import('./components/DownloadsPage').then(m => ({ default: m.DownloadsPage })));
const FinancialReportsPage = lazy(() => import('./components/FinancialReportsPage').then(m => ({ default: m.FinancialReportsPage })));
const DepositsPage = lazy(() => import('./components/DepositsPage').then(m => ({ default: m.DepositsPage })));
const LoansPage = lazy(() => import('./components/LoansPage').then(m => ({ default: m.LoansPage })));
const ServicesPage = lazy(() => import('./components/ServicesPage').then(m => ({ default: m.ServicesPage })));
const LoginPage = lazy(() => import('./components/LoginPage').then(m => ({ default: m.LoginPage })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const NewsPage = lazy(() => import('./components/NewsPage').then(m => ({ default: m.NewsPage })));
const NewsDetailsPage = lazy(() => import('./components/NewsDetailsPage').then(m => ({ default: m.NewsDetailsPage })));
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const BranchLocator = lazy(() => import('./components/BranchLocator').then(m => ({ default: m.BranchLocator })));

// Loading component for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-4 border-[#0099ff] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
  }, [isAuthenticated, isLoading, currentPage]);

  const handleNavigate = useCallback((page: PageType) => {
    setCurrentPage(page);
  }, []);

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
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      {currentPage === 'admin' && isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : currentPage === 'login' ? (
        <>
          <SEO title="Admin Login" description="Secure access to the Urban Bank Administration Panel." />
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        </>
      ) : currentPage.startsWith('news-details/') ? (
        <div className="min-h-screen bg-white">
          <SEO title="News & Events" />
          <Header onNavigate={handleNavigate} />
          <main className="pt-[104px]">
            <NewsDetailsPage id={currentPage.split('/')[1]} />
          </main>
          <Footer />
        </div>
      ) : currentPage.startsWith('deposit-details/') ? (
        <div className="min-h-screen bg-white">
          <SEO title="Deposit Product Details" />
          <Header onNavigate={handleNavigate} />
          <main>
            <ProductDetailPage id={currentPage.split('/')[1]} category="deposit" />
          </main>
          <Footer />
        </div>
      ) : currentPage.startsWith('loan-details/') ? (
        <div className="min-h-screen bg-white">
          <SEO title="Loan Product Details" />
          <Header onNavigate={handleNavigate} />
          <main>
            <ProductDetailPage id={currentPage.split('/')[1]} category="loan" />
          </main>
          <Footer />
        </div>
      ) : (
        <div className="min-h-screen bg-white">
          <SEO {...seoData} />
          <Header onNavigate={handleNavigate} />
          <main>
            {currentPage === 'home' ? (
              <>
                <HeroSlider />
                <AboutUsSection />
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
      )}
    </Suspense>
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
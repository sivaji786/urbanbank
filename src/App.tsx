import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { AboutUsSection } from './components/AboutUsSection';
import { NewsUpdatesSection } from './components/NewsUpdatesSection';
import { QuickAccessTools } from './components/QuickAccessTools';
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
import { CardsCarousel } from './components/CardsCarousel';

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
const BankObjectivePage = lazy(() => import('./components/BankObjectivePage').then(m => ({ default: m.BankObjectivePage })));
const EventDetailsPage = lazy(() => import('./components/EventDetailsPage').then(m => ({ default: m.EventDetailsPage })));
const GoldRatesPage = lazy(() => import('./components/GoldRatesPage').then(m => ({ default: m.GoldRatesPage })));

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

  const [currentPage, setCurrentPage] = useState<PageType | string>(() => {
    const hash = window.location.hash;
    const page = getPageFromHash(hash);

    // During initialization, if we're on an admin route, we might not know 
    // auth status yet, but we shouldn't default to home.
    if (hash.startsWith('#admin')) return 'admin';

    // Handle parameterized routes
    if (hash.startsWith('#news-details/') || hash.startsWith('#event-details/') || hash.startsWith('#deposit-details/') || hash.startsWith('#loan-details/')) {
      return hash.replace('#', '');
    }
    return page || 'home';
  });

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const page = getPageFromHash(hash);

      if (hash.startsWith('#news-details/') || hash.startsWith('#event-details/') || hash.startsWith('#deposit-details/') || hash.startsWith('#loan-details/')) {
        setCurrentPage(hash.replace('#', ''));
        window.scrollTo(0, 0);
        return;
      }

      if (page) {
        if (page === 'admin' && !isAuthenticated && !isLoading) {
          setCurrentPage('login');
        } else {
          setCurrentPage(page);
        }
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated, isLoading]);

  // Sync state with hash on mount and when auth/loading changes
  useEffect(() => {
    if (isLoading) return;

    const hash = window.location.hash;
    const page = getPageFromHash(hash);

    if (hash.startsWith('#news-details/') || hash.startsWith('#event-details/') || hash.startsWith('#deposit-details/') || hash.startsWith('#loan-details/')) {
      setCurrentPage(hash.replace('#', ''));
      return;
    }


    if (page) {
      if (page === 'admin' && !isAuthenticated) {
        setCurrentPage('login');
      } else {
        setCurrentPage(page);
      }
    }
  }, [isAuthenticated, isLoading]);

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
    if (currentPage === 'gold-rates') {
      return {
        title: 'Gold Loan Interest Rates',
        description: `Check our latest competitive gold loan interest rates. Instant gold loans with minimal documentation at ${siteName}.`,
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
      {currentPage === 'admin' ? (
        isAuthenticated ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <>
            <SEO title="Admin Login" description="Secure access to the Urban Bank Administration Panel." />
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          </>
        )
      ) : currentPage === 'login' ? (
        <>
          <SEO title="Admin Login" description="Secure access to the Urban Bank Administration Panel." />
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        </>
      ) : currentPage.startsWith('event-details/') ? (
        <div className="min-h-screen bg-slate-50 flex justify-center">
          <div className="w-full max-w-[1440px] bg-white shadow-[0_0_80px_rgba(0,0,0,0.08)] flex flex-col relative">
            <SEO title="Event Details" />
            <Header onNavigate={handleNavigate} />
            <div className="h-32 xl:h-32"></div>
            <main className="flex-1">
              <EventDetailsPage id={currentPage.split('/')[1]} />
            </main>
            <Footer />
          </div>
        </div>
      ) : currentPage.startsWith('news-details/') ? (
        <div className="min-h-screen bg-slate-50 flex justify-center">
          <div className="w-full max-w-[1440px] bg-white shadow-[0_0_80px_rgba(0,0,0,0.08)] flex flex-col relative">
            <SEO title="News & Events" />
            <Header onNavigate={handleNavigate} />
            <div className="h-32 xl:h-32"></div>
            <main className="flex-1">
              <NewsDetailsPage id={currentPage.split('/')[1]} />
            </main>
            <Footer />
          </div>
        </div>
      ) : currentPage.startsWith('deposit-details/') ? (
        <div className="min-h-screen bg-slate-50 flex justify-center">
          <div className="w-full max-w-[1440px] bg-white shadow-[0_0_80px_rgba(0,0,0,0.08)] flex flex-col relative">
            <SEO title="Deposit Product Details" />
            <Header onNavigate={handleNavigate} />
            <div className="h-32 xl:h-32"></div>
            <main className="flex-1">
              <ProductDetailPage id={currentPage.split('/')[1]} category="deposit" />
            </main>
            <Footer />
          </div>
        </div>
      ) : currentPage.startsWith('loan-details/') ? (
        <div className="min-h-screen bg-slate-50 flex justify-center">
          <div className="w-full max-w-[1440px] bg-white shadow-[0_0_80px_rgba(0,0,0,0.08)] flex flex-col relative">
            <SEO title="Loan Product Details" />
            <Header onNavigate={handleNavigate} />
            <div className="h-32 xl:h-32"></div>
            <main className="flex-1">
              <ProductDetailPage id={currentPage.split('/')[1]} category="loan" />
            </main>
            <Footer />
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-slate-50 flex justify-center">
          <div className="w-full max-w-[1440px] bg-white shadow-[0_0_80px_rgba(0,0,0,0.08)] flex flex-col relative">
            <SEO {...seoData} />
            <Header onNavigate={handleNavigate} />
            <div className="h-32 xl:h-32"></div>
            <main className="flex-1">
              {currentPage === 'home' ? (
                <>
                  <HeroSlider />
                  <CardsCarousel />
                  <AboutUsSection />
                  <BankingExcellenceSection />
                  <QuickAccessTools />
                  <NewsUpdatesSection />
                  <LatestEventsSection />
                  <GrievanceCTA />
                </>
              ) : currentPage === 'about-us' ? (
                <div>
                  <AboutUsPage />
                </div>
              ) : currentPage === 'management' ? (
                <div>
                  <ManagementPage />
                </div>
              ) : currentPage === 'vision-mission' ? (
                <div>
                  <VisionMissionPage />
                </div>
              ) : currentPage === 'contact' ? (
                <div>
                  <ContactPage />
                </div>
              ) : currentPage === 'deaf-accounts' ? (
                <div>
                  <DeafAccountsPage />
                </div>
              ) : currentPage === 'gallery' ? (
                <div>
                  <GalleryPage />
                </div>
              ) : currentPage === 'downloads' ? (
                <div>
                  <DownloadsPage />
                </div>
              ) : currentPage === 'financial-reports' ? (
                <div>
                  <FinancialReportsPage />
                </div>
              ) : currentPage === 'deposits' ? (
                <div>
                  <DepositsPage />
                </div>
              ) : currentPage === 'loans' ? (
                <div>
                  <LoansPage />
                </div>
              ) : currentPage === 'services' ? (
                <div>
                  <ServicesPage />
                </div>
              ) : currentPage === 'bank-objectives' ? (
                <div>
                  <BankObjectivePage />
                </div>
              ) : currentPage === 'news' ? (
                <div>
                  <NewsPage />
                </div>
              ) : currentPage === 'gold-rates' ? (
                <div>
                  <GoldRatesPage />
                </div>
              ) : (
                <div>
                  <BranchLocator />
                </div>
              )}
            </main>
            <Footer />
          </div>
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
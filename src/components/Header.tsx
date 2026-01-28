import { Phone, User, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import '../styles/custom-frontend.css';
import { Button } from './ui/button';
import { useState, useEffect, memo } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import logo from 'figma:asset/6705fbbec794189a9f9b05c8b8f04e8469de538b.png';
import { navigationMap, PageType } from '../utils/navigation';

const menuItems = [
  {
    label: 'Home',
    href: '#home',
  },
  {
    label: 'About Us',
    href: '#about',
    submenu: [
      { label: 'About Us', href: '#about' },
      { label: 'Management', href: '#management' },
      { label: 'Bank Objectives', href: '#bank-objectives' },
      { label: 'Financial & Annual Reports', href: '#annual-reports' },
    ],
  },
  {
    label: 'Deposits',
    href: '#deposits',
  },
  {
    label: 'Loans & Advances',
    href: '#loans',
  },
  {
    label: 'Our Services',
    href: '#services',
  },
  {
    label: 'Gallery',
    href: '#gallery',
  },
  {
    label: 'Deaf Accs',
    href: '#deaf-accounts',
  },
  {
    label: 'Contact',
    href: '#contact',
  },
  {
    label: 'Downloads',
    href: '#downloads',
  },
  {
    label: 'Branch Locator',
    href: '#branch-locator',
  },
];

interface HeaderProps {
  onNavigate?: (page: PageType) => void;
}

export const Header = memo(function Header({ onNavigate }: HeaderProps) {
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

  const handleNavigation = (href: string, e?: React.MouseEvent) => {
    const page = navigationMap[href];
    if (page && onNavigate) {
      e?.preventDefault();
      // Update hash manually to trigger App.tsx hashchange listener
      window.location.hash = href;

      setMobileMenuOpen(false);
      setActiveDropdown(null);
      setMobileActiveDropdown(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] z-50">
        <header className="relative bg-white">
          {/* Top bar */}
          <div className="border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between h-20 gap-4">
                {/* Logo */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <img src={logo} alt="THE GUNTUR CO-OPERATIVE URBAN BANK LIMITED" className="h-16 w-16 object-contain" />
                  <div className="hidden sm:block">
                    <h1
                      className="font-black text-gray-900 tracking-tight uppercase whitespace-nowrap text-4xl lg:text-3xl"
                      style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900 }}
                    >
                      {settings.site_name || 'THE GUNTUR CO-OPERATIVE URBAN BANK LIMITED'}
                    </h1>
                  </div>
                </div>

                {/* Contact Info & ISO Logo */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <a href="tel:1800-425-8873" className="flex items-center gap-2 hover:text-[#0099ff] transition-colors font-semibold">
                      <Phone className="h-4 w-4 text-[#0099ff]" />
                      <span className="hidden sm:inline">Toll Free:</span>
                      <span>1800-425-8873</span>
                    </a>
                  </div>
                  <img src="/assets/iso.jpg" alt="ISO Certified" className="h-12 w-auto object-contain hidden sm:block" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Navigation - Sticky */}
        <div className={`bg-[#0099ff] shadow-sm transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-12">
              {/* Desktop navigation */}
              <nav className="hidden xl:flex items-center gap-0.5 flex-1">
                {menuItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.submenu && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavigation(item.href, e)}
                      className="px-2.5 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-1 group whitespace-nowrap rounded"
                    >
                      {item.label}
                      {item.submenu && (
                        <ChevronDown className="h-3 w-3 text-white/80 group-hover:text-white transition-colors" />
                      )}
                    </a>

                    {/* Dropdown menu */}
                    {item.submenu && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-0 min-w-[280px] bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-50">
                        {item.submenu.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            onClick={(e) => handleNavigation(subItem.href, e)}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0099ff]/10 hover:text-[#0099ff] transition-colors"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  size="sm"
                  onClick={() => window.location.hash = '#login'}
                  className="hidden lg:flex gap-2 bg-white text-[#0099ff] hover:bg-gray-100 h-9 px-5"
                >
                  <User className="h-4 w-4" />
                  Login
                </Button>

                {/* Mobile menu button */}
                <button
                  className="xl:hidden p-2 text-white hover:bg-white/10 rounded"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="xl:hidden border-t bg-white max-h-[calc(100vh-128px)] overflow-y-auto">
              <nav className="max-w-7xl mx-auto px-6 py-4">
                {menuItems.map((item) => (
                  <div key={item.label} className="mb-1">
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => setMobileActiveDropdown(
                            mobileActiveDropdown === item.label ? null : item.label
                          )}
                          className="w-full flex items-center justify-between px-3 py-2.5 text-base text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <span>{item.label}</span>
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${mobileActiveDropdown === item.label ? 'rotate-90' : ''
                              }`}
                          />
                        </button>
                        {mobileActiveDropdown === item.label && (
                          <div className="ml-4 mt-1 space-y-1">
                            {item.submenu.map((subItem) => (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                onClick={(e) => handleNavigation(subItem.href, e)}
                                className="block px-3 py-2 text-sm text-gray-700 hover:bg-[#0099ff]/10 hover:text-[#0099ff] rounded-lg transition-colors"
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => handleNavigation(item.href, e)}
                        className="block px-3 py-2.5 text-base text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
                <div className="pt-3 mt-3 border-t">
                  <Button
                    onClick={() => window.location.hash = '#login'}
                    className="w-full bg-[#0099ff] hover:bg-[#0088ee] text-white h-11"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
});
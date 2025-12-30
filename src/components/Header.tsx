import { Phone, User, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
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

export function Header({ onNavigate }: HeaderProps) {
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
      // onNavigate(page); // App.tsx handles this via hashchange now, but keeping it for immediate feedback might be safer?
      // Actually, if we update hash, App.tsx will catch it. 
      // But let's call onNavigate too just in case, or rely on hash.
      // If we call onNavigate, we might double render?
      // App.tsx: useEffect listens to hashchange.
      // If we set window.location.hash, it triggers hashchange.
      // So we don't strictly need to call onNavigate if App.tsx handles it.
      // But let's keep it consistent.

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
      }`}>
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <img src={logo} alt="THE GUNTUR CO-OPERATIVE URBAN BANK LIMITED" className="h-16 w-16 object-contain" />
              <div className="hidden sm:block">
                <h1
                  className="font-black text-gray-900 tracking-tighter uppercase flex flex-col leading-[1.1]"
                  style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900 }}
                >
                  {(() => {
                    const name = settings.site_name || 'THE GUNTUR CO-OPERATIVE URBAN BANK LIMITED';
                    const splitIndex = name.toUpperCase().indexOf('URBAN BANK');
                    if (splitIndex !== -1) {
                      return (
                        <>
                          <span className="text-[0.6rem] lg:text-xs text-gray-600 block -mb-0.5">
                            {name.substring(0, splitIndex).trim()}
                          </span>
                          <span className="text-lg lg:text-2xl block">
                            {name.substring(splitIndex).trim()}
                          </span>
                        </>
                      );
                    }
                    return <span className="text-xl lg:text-3xl">{name}</span>;
                  })()}
                </h1>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <a href="tel:1800-425-8873" className="flex items-center gap-2 hover:text-[#0099ff] transition-colors font-semibold">
                <Phone className="h-4 w-4 text-[#0099ff]" />
                <span className="hidden sm:inline">Toll Free:</span>
                <span>1800-425-8873</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header - Navigation */}
      <div className="bg-[#0099ff] shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6">
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
                onClick={() => onNavigate && onNavigate('login')}
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
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t bg-white max-h-[calc(100vh-104px)] overflow-y-auto">
          <nav className="max-w-[1400px] mx-auto px-6 py-4">
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
                onClick={() => onNavigate && onNavigate('login')}
                className="w-full bg-[#0099ff] hover:bg-[#0088ee] text-white h-11"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
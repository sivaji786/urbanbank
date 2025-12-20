import { Phone, Mail, User, Menu, X, ChevronDown, ChevronRight, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
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
    submenu: [
      { label: 'Saving Deposits', href: '#saving-deposits' },
      { label: 'Current Deposits', href: '#current-deposits' },
      { label: 'Deposit Insurance And Credit Guarantee Corporation', href: '#dicgc' },
      { label: 'Fixed Deposits', href: '#fixed-deposits' },
      { label: 'Deposit Rate Of Interests', href: '#deposit-rates' },
      { label: 'New Gold Rate Of Interests', href: '#gold-rates' },
      { label: 'Recurring Deposit', href: '#recurring-deposit' },
      { label: 'Rate Of Interests - Bulk Institutions', href: '#bulk-rates' },
    ],
  },
  {
    label: 'Loans & Advances',
    href: '#loans',
    submenu: [
      { label: 'Project Finance', href: '#project-finance' },
      { label: 'MSME Loans', href: '#msme-loans' },
      { label: 'Mortgage Loans', href: '#mortgage-loans' },
      { label: 'Home Loan', href: '#home-loan' },
      { label: 'Overdraft On Deposit Loans', href: '#overdraft-deposit' },
      { label: 'Secured Overdraft', href: '#secured-overdraft' },
      { label: 'Term Deposit Loans', href: '#term-deposit' },
      { label: 'Loan And Advances Interest Rates', href: '#loan-rates' },
      { label: 'Educational Loans', href: '#education-loans' },
      { label: 'Urban Swagruha Loan - Housing Loan', href: '#swagruha-loan' },
      { label: 'Interest Rates On Term Loans & Project Finance', href: '#term-loan-rates' },
    ],
  },
  {
    label: 'Our Services',
    href: '#services',
    submenu: [
      { label: 'RTGS', href: '#rtgs' },
      { label: 'NEFT', href: '#neft' },
      { label: "DD's", href: '#dd' },
      { label: 'Pay Orders', href: '#pay-orders' },
      { label: 'Digital Banking/IMPS', href: '#digital-banking' },
      { label: 'ATM Facility', href: '#atm' },
      { label: 'Locker Facility', href: '#locker' },
      { label: 'Customer Service Charges', href: '#service-charges' },
      { label: 'Any Branch Banking (ABB)', href: '#abb' },
    ],
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
          <div className="flex items-center justify-between h-14 gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <img src={logo} alt="Guntur Bank Logo" className="h-12 w-12 object-contain" />
              <div className="hidden sm:block">
                <h1 className="text-base font-semibold text-gray-900 leading-tight">THE GUNTUR CO-OPERATIVE</h1>
                <p className="text-sm font-medium text-gray-600">URBAN BANK LIMITED</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-2 lg:gap-4 text-xs text-gray-600 flex-wrap justify-end">
              <a href="mailto:gcubhelpdesk@guntururbanbank.org" className="flex items-center gap-1.5 hover:text-[#0099ff] transition-colors">
                <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="hidden xl:inline">Support Email:</span>
                <span className="hidden md:inline">gcubhelpdesk@guntururbanbank.org</span>
                <span className="md:hidden">Support</span>
              </a>
              <div className="hidden sm:block w-px h-3 bg-gray-200"></div>
              <a href="tel:1800-425-8873" className="flex items-center gap-1.5 hover:text-[#0099ff] transition-colors">
                <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="hidden lg:inline">Toll Free:</span>
                <span>1800-425-8873</span>
              </a>
              <div className="hidden lg:block w-px h-3 bg-gray-200"></div>
              <div className="hidden lg:flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                <span>10:00 AM to 6:00 PM</span>
              </div>
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
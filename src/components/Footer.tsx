import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Separator } from './ui/separator';
import logo from 'figma:asset/6705fbbec794189a9f9b05c8b8f04e8469de538b.png';
import { useState, useEffect, useRef } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import client from '../api/client';

export function Footer() {
  const { settings } = useSettings();
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [displayedVisits, setDisplayedVisits] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVisitorStats = async () => {
      try {
        const response = await client.get('visitor-stats');
        setTotalVisits(response.data.total_visits || 0);
      } catch (error) {
        console.debug('Failed to fetch visitor stats:', error);
      }
    };

    fetchVisitorStats();
  }, []);

  // Intersection Observer to trigger animation when footer is visible
  useEffect(() => {
    if (!counterRef.current || hasAnimated || totalVisits === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    observer.observe(counterRef.current);

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [totalVisits, hasAnimated]);

  const animateCounter = () => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames
    const increment = totalVisits / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayedVisits(totalVisits);
        clearInterval(timer);
      } else {
        setDisplayedVisits(Math.floor(increment * currentStep));
      }
    }, duration / steps);
  };

  const quickLinks = [
    'About Us',
    'Board of Directors',
    'Our Team',
    'Branches',
    'Careers',
    'Press Releases',
  ];

  const products = [
    'Savings Account',
    'Fixed Deposit',
    'Home Loan',
    'Business Loan',
    'Gold Loan',
    'Education Loan',
  ];

  const resources = [
    'Interest Rates',
    'Service Charges',
    'Downloads',
    'FAQs',
    'Privacy Policy',
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt={`${settings.site_name} Logo`} className="h-12 w-12" />
              <div>
                <h3 className="text-base uppercase">{settings.site_name}</h3>
                <p className="text-xs text-gray-400">{settings.site_tagline}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              {settings.site_description}
            </p>
            <div className="flex gap-2 mb-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-white/20"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            {/* Total Visits Counter with Digit Boxes */}
            <div ref={counterRef} className="flex items-center gap-2">
              <span className="text-sm text-gray-400">This site has</span>
              <div className="flex gap-1">
                {displayedVisits.toString().split('').map((digit, index) => (
                  <div
                    key={index}
                    className="w-8 h-10 bg-gray-900 border border-white/20 rounded flex items-center justify-center transition-all duration-300"
                  >
                    <span className="text-white text-lg font-bold">{digit}</span>
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-400">page visits</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h4 className="text-sm uppercase tracking-wider mb-4">Products</h4>
            <ul className="space-y-2">
              {products.map((product, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-sm uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400 leading-relaxed">
                  5-36-14/2 to 5-36-15/2<br />
                  Guntur - 522001<br />
                  Andhra Pradesh
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <p>1900-425-3873</p>
                  <p>08632-282001</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@guntururbanbank.org" className="text-sm text-gray-400 hover:text-white transition-colors">
                  info@guntururbanbank.org
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  Mon - Sat: 9:30 AM - 4:30 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 text-center md:text-left">
            <p>© {new Date().getFullYear()} {settings.site_name}. All rights reserved.</p>
            <span className="hidden md:inline text-gray-700">|</span>
            <p className="text-xs md:text-sm">
              Developed by <a href="https://www.digitalks.in" target="_blank" rel="noopener noreferrer" className="text-[#0099ff] hover:text-white transition-colors font-medium">DIGI TALKS INDIA</a>
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => window.location.hash = '#login'} className="hover:text-white transition-colors">Admin Login</button>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/api/index.php/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logo from 'figma:asset/6705fbbec794189a9f9b05c8b8f04e8469de538b.png';

export function Footer() {
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
    'EMI Calculator',
    'Downloads',
    'FAQs',
    'Privacy Policy',
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-400">
                Subscribe to our newsletter for the latest updates on banking services, interest rates, and exclusive offers.
              </p>
            </div>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11"
              />
              <Button className="bg-[#0099ff] hover:bg-[#0088ee] text-white h-11 px-6">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Guntur Bank Logo" className="h-12 w-12" />
              <div>
                <h3 className="text-base">Guntur Bank</h3>
                <p className="text-xs text-gray-400">Since 1948</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              A premiere co-operative bank serving Andhra Pradesh with excellence and integrity for over seven decades.
            </p>
            <div className="flex gap-2">
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
          <p>© 2025 The Guntur Co-operative Urban Bank Limited. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

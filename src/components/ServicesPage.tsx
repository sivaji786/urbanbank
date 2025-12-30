import { useState, useEffect } from 'react';
import { Building2, Shield, Smartphone, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import client from '../api/client';
import * as Icons from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  charges: string;
  color: string;
  bg_color: string;
  status: string;
}

interface ServiceCharge {
  id: number;
  service: string;
  charge: string;
  status: string;
}

// Helper function to get icon component by name
const getIconComponent = (iconName: string) => {
  const IconComponent = (Icons as any)[iconName];
  return IconComponent || Icons.FileText; // Fallback to FileText if icon not found
};

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceCharges, setServiceCharges] = useState<ServiceCharge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [servicesRes, chargesRes] = await Promise.all([
          client.get('/services'),
          client.get('/service-charges')
        ]);

        // Filter only active services and charges
        setServices(servicesRes.data.filter((s: Service) => s.status === 'active'));
        setServiceCharges(chargesRes.data.filter((c: ServiceCharge) => c.status === 'active'));
      } catch (err) {
        console.error('Failed to fetch services data:', err);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#0099ff] mx-auto mb-4" />
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Services</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-[#0099ff] hover:bg-[#0077cc]">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0099ff] to-[#0077cc] text-white py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="text-4xl lg:text-5xl mb-4">Our Banking Services</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Experience comprehensive banking services designed for convenience, security, and efficiency. From digital payments to secure lockers, we've got you covered.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => {
            const IconComponent = getIconComponent(service.icon);
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#0099ff]/30"
              >
                <div className={`p-3 ${service.bg_color} rounded-lg inline-block mb-4`}>
                  <IconComponent className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>

                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="text-[#0099ff] mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Service Charges</p>
                  <p className="text-sm text-gray-900">{service.charges}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Service Charges Table */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl text-gray-900 mb-6">Customer Service Charges</h2>
          <p className="text-sm text-gray-600 mb-6">
            Effective from January 1, 2024 | *All charges are subject to applicable GST
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#0099ff]">
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Service</th>
                  <th className="text-right py-3 px-4 text-sm text-gray-700">Charges</th>
                </tr>
              </thead>
              <tbody>
                {serviceCharges.map((charge) => (
                  <tr key={charge.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{charge.service}</td>
                    <td className="py-3 px-4 text-right text-sm text-gray-900">{charge.charge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Digital Banking Promo */}
        <div className="bg-gradient-to-br from-[#0099ff] to-[#0077cc] text-white rounded-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex p-3 bg-white/20 rounded-lg mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl mb-3">Safe & Secure Banking</h2>
              <p className="text-white/90 mb-6">
                All our digital services are protected with multi-layer security including OTP verification, encryption, and 24x7 fraud monitoring.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-white/20 rounded-lg text-sm">SSL Encrypted</div>
                <div className="px-4 py-2 bg-white/20 rounded-lg text-sm">OTP Verified</div>
                <div className="px-4 py-2 bg-white/20 rounded-lg text-sm">24x7 Monitoring</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg mb-4">Download Our Mobile App</h3>
              <p className="text-sm text-white/90 mb-6">
                Experience banking on the go with our secure mobile banking app.
              </p>
              <div className="flex gap-3">
                <Button className="bg-white text-[#0099ff] hover:bg-gray-100 flex-1">
                  Google Play
                </Button>
                <Button className="bg-white text-[#0099ff] hover:bg-gray-100 flex-1">
                  App Store
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-br from-[#0099ff]/10 to-[#0099ff]/5 border border-[#0099ff]/20 rounded-xl p-8">
          <h3 className="text-xl text-gray-900 mb-3">Need Assistance with Our Services?</h3>
          <p className="text-base text-gray-700 mb-4">
            Our customer service team is available to help you with any queries regarding our banking services.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Call Us</p>
              <p className="text-base text-[#0099ff]">1800-425-8873</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Email Us</p>
              <p className="text-base text-[#0099ff]">gcubhelpdesk@guntururbanbank.org</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Timing</p>
              <p className="text-base text-gray-900">10:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map or Additional Info Section */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-gray-900 mb-2">Visit Our Branches</h2>
            <p className="text-gray-600">
              We have 13 branches across Andhra Pradesh ready to serve you
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-8 border border-gray-200">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Building2 className="w-8 h-8 text-[#0099ff]" />
                </div>
                <h3 className="text-gray-900 mb-2">13 Branches</h3>
                <p className="text-gray-600 text-sm">
                  Serving customers across Guntur, Krishna, and Prakasam districts
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-gray-900 mb-2">Extended Hours</h3>
                <p className="text-gray-600 text-sm">
                  Open 6 days a week with convenient timings to serve you better
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Smartphone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm">
                  Toll-free helpline available round the clock for your convenience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

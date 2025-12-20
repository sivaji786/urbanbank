import { ArrowRightLeft, CreditCard, Lock, Smartphone, FileText, Building2, Zap, Shield } from 'lucide-react';
import { Button } from './ui/button';

const services = [
  {
    icon: ArrowRightLeft,
    title: 'RTGS - Real Time Gross Settlement',
    description: 'Transfer large amounts instantly and securely across banks in real-time.',
    features: [
      'Minimum amount: ₹2 Lakhs',
      'No maximum limit',
      'Real-time settlement',
      'Available during bank hours'
    ],
    charges: '₹25 + GST per transaction',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Zap,
    title: 'NEFT - National Electronic Funds Transfer',
    description: 'Fast and secure electronic fund transfer available 24x7 throughout the year.',
    features: [
      'No minimum limit',
      'No maximum limit',
      'Available 24x7',
      'Settlement in batches'
    ],
    charges: 'Up to ₹10,000: ₹2.50 + GST | Above: ₹5 + GST',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: FileText,
    title: 'Demand Drafts',
    description: 'Safe and secure payment instrument for local and outstation payments.',
    features: [
      'Accepted nationwide',
      'Valid for 3 months',
      'Cancelation facility available',
      'Safe alternative to cash'
    ],
    charges: '₹50 + GST per DD',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: FileText,
    title: 'Pay Orders',
    description: 'Instant payment guarantee for local transactions.',
    features: [
      'Instant issuance',
      'Local clearing only',
      'Valid for 3 months',
      'Cancelation available'
    ],
    charges: '₹40 + GST per Pay Order',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Smartphone,
    title: 'Digital Banking / IMPS',
    description: 'Transfer money instantly 24x7 using mobile or internet banking.',
    features: [
      'Instant transfer 24x7',
      'Mobile & internet banking',
      'Up to ₹2 Lakhs per transaction',
      'Secure with OTP verification'
    ],
    charges: 'Up to ₹1,000: ₹2 + GST | Above: ₹5 + GST',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: CreditCard,
    title: 'ATM / Debit Card Facility',
    description: 'Access your account 24x7 with our RuPay debit card.',
    features: [
      'Free withdrawals at our ATMs',
      'POS & online payments',
      'Insurance coverage',
      'EMV chip security'
    ],
    charges: 'Annual Fee: ₹100 + GST',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: Lock,
    title: 'Locker Facility',
    description: 'Secure storage for your valuables with advanced security.',
    features: [
      'Multiple size options',
      'Fire & theft protection',
      'Insurance coverage available',
      'CCTV surveillance'
    ],
    charges: 'Starting from ₹1,500/year',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Building2,
    title: 'Any Branch Banking (ABB)',
    description: 'Access your account from any of our branches across the network.',
    features: [
      'All 13 branches enabled',
      'Deposit & withdrawal',
      'Account statement',
      'No additional charges'
    ],
    charges: 'Free for all customers',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
];

const serviceCharges = [
  { service: 'Cheque Book (10 leaves)', charge: 'Free' },
  { service: 'Cheque Book (25 leaves)', charge: '₹50 + GST' },
  { service: 'Account Statement (Email)', charge: 'Free' },
  { service: 'Account Statement (Physical)', charge: '₹20 + GST' },
  { service: 'Duplicate Passbook', charge: '₹50 + GST' },
  { service: 'Cheque Return Charges', charge: '₹300 + GST' },
  { service: 'Stop Payment Request', charge: '₹100 + GST' },
  { service: 'Balance Enquiry (SMS)', charge: 'Free' },
  { service: 'NACH / ECS Mandate', charge: '₹100 + GST' },
  { service: 'Account Closure', charge: '₹500 + GST' },
];

export function ServicesPage() {
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
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#0099ff]/30"
            >
              <div className={`p-3 ${service.bgColor} rounded-lg inline-block mb-4`}>
                <service.icon className={`w-8 h-8 ${service.color}`} />
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
          ))}
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
                {serviceCharges.map((charge, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
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
    </div>
  );
}

import { Shield, Zap, Globe, HeadphonesIcon, Clock, Lock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'DICGC Insured',
    description: 'Your deposits are protected by Deposit Insurance and Credit Guarantee Corporation',
  },
  {
    icon: Zap,
    title: 'Instant Banking',
    description: 'NEFT, RTGS, and online banking services for seamless transactions',
  },
  {
    icon: Globe,
    title: '51 Branches',
    description: 'Wide network across Guntur district for your convenience',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Dedicated customer service team ready to assist you anytime',
  },
  {
    icon: Clock,
    title: 'Quick Processing',
    description: 'Fast loan approval and account opening with minimal documentation',
  },
  {
    icon: Lock,
    title: 'Secure Banking',
    description: 'Advanced security measures to protect your financial information',
  },
];

export function Features() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#0099ff] via-[#0088ee] to-[#0099ff] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.15em] text-white/70 uppercase">Why Choose Us</span>
          <h2 className="text-4xl text-white mt-3 mb-3 tracking-tight">Banking Excellence</h2>
          <p className="text-base text-white/80 max-w-3xl mx-auto">
            Experience the perfect blend of traditional values and modern banking technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/80 leading-relaxed">{feature.description}</p>
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

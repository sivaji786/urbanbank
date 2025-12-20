import { Button } from './ui/button';
import { ArrowRight, Award, Globe, TrendingUp, Users } from 'lucide-react';

export function WelcomeSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs tracking-[0.15em] text-[#0099ff] uppercase">Est. 1948</span>
              <h2 className="text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight">
                Welcome to<br />
                <span className="text-gray-600">Guntur Co-operative Urban Bank</span>
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                THE GUNTUR COOPERATIVE URBAN BANK LIMITED stands as a premiere co-operative bank 
                in Andhra Pradesh, pioneering innovative schemes and delivering exceptional 
                banking services across 51 branches.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With over seven decades of excellence, we are committed to providing personalized 
                banking solutions that empower individuals and businesses to achieve their financial goals.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button 
                size="lg" 
                className="bg-[#0099ff] hover:bg-[#0088ee] text-white px-6"
              >
                Open an Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-300 hover:border-[#0099ff] hover:text-[#0099ff] px-6"
              >
                Explore Services
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: Award,
                value: '75+',
                label: 'Years of Excellence',
                color: 'from-[#0099ff] to-[#0077cc]',
              },
              {
                icon: Users,
                value: '50K+',
                label: 'Satisfied Customers',
                color: 'from-red-500 to-red-600',
              },
              {
                icon: Globe,
                value: '51',
                label: 'Branch Network',
                color: 'from-yellow-500 to-yellow-600',
              },
              {
                icon: TrendingUp,
                value: '₹500Cr+',
                label: 'Assets Under Management',
                color: 'from-green-500 to-green-600',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative group bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-2xl text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600 leading-tight">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

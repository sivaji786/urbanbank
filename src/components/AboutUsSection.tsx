import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import bankBuilding from 'figma:asset/b1375a4d0dac914c59e97202a85c09fdbe93d5f9.png';

export function AboutUsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Square Bank Building Image with Rounded Corners */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px]">
              <img 
                src={bankBuilding} 
                alt="Guntur Urban Bank Building" 
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs tracking-[0.15em] text-[#0099ff] uppercase">Established 1949</span>
              <h2 className="text-4xl lg:text-5xl text-gray-900 tracking-tight">
                About Us
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-base text-gray-700 leading-relaxed">
                <span className="text-gray-900">THE GUNTUR COOPERATIVE URBAN BANK LIMITED</span>, is premiere Co-operative bank in state of Andhra Pradesh. It is having 13 branches.
              </p>
              
              <p className="text-base text-gray-600 leading-relaxed">
                5 Branches in Guntur city (Brodipet, Kothapet, Pattabhi puram, Chandramouli nagar, R.Agraharam), 6 branches in other towns in Guntur District (Sattenapalli, Chilakaluripet, Ponnur, Tenali, Narasaraopet, Mangalagiri), 1 in Krishna district (Gollapudi) & 1 in Prakasam District (Ongole).
              </p>

              <p className="text-base text-gray-600 leading-relaxed">
                As a premiere co-operative bank, we have initiated certain pioneering schemes for the co-operative banking sector in Andhra Pradesh.
              </p>
            </div>

            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-[#0099ff] hover:bg-[#0088ee] text-white px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                View More
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

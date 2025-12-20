import { ExternalLink } from 'lucide-react';
import dicgcLogo from 'figma:asset/7837ac0a4f8df8375eeee8474923d95f51c5b862.png';

export function DICGCSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="grid lg:grid-cols-3 gap-0">
            {/* Left: DICGC Logo */}
            <div className="lg:col-span-1 bg-gradient-to-br from-[#0099ff] to-[#0077cc] p-8 flex flex-col justify-center items-center">
              <div className="bg-white p-6 rounded-xl shadow-lg mb-4">
                <img 
                  src={dicgcLogo} 
                  alt="DICGC Logo" 
                  className="w-32 h-auto"
                />
              </div>
              <p className="text-white text-center text-sm">
                Deposit Insurance & Credit Guarantee
              </p>
            </div>

            {/* Right: Information */}
            <div className="lg:col-span-2 p-8 space-y-4">
              <div>
                <h3 className="text-xl text-gray-900 mb-1">
                  DEPOSIT INSURANCE AND CREDIT GUARANTEE CORPORATION
                </h3>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Mumbai</p>
              </div>

              <div className="bg-[#0099ff]/5 border border-[#0099ff]/20 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Deposit Insurance covers all deposits such as savings, fixed, current, recurring deposits up to the limit of <span className="text-gray-900">₹5,00,000 per depositor per bank</span>.
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-2">For further information please visit:</p>
                <a 
                  href="https://www.dicgc.org.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#0099ff] hover:text-[#0077cc] transition-colors text-sm group"
                >
                  <span>www.dicgc.org.in</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

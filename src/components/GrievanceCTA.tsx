import { Phone, Mail, ExternalLink } from 'lucide-react';
import dicgcLogo from 'figma:asset/7837ac0a4f8df8375eeee8474923d95f51c5b862.png';

export function GrievanceCTA() {
  return (
    <section className="bg-gradient-to-r from-[#0099ff] to-[#0077cc] py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Grievance Section */}
          <div className="space-y-8">
            <div className="text-left">
              <h2 className="text-white mb-2">Have a Grievance?</h2>
              <p className="text-white/90 text-lg">
                We're here to help. Reach out to our dedicated grievance officer.
              </p>
            </div>

            <div className="space-y-6">
              {/* Grievance Call */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-8 py-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white/80 text-sm uppercase tracking-wide mb-1">Grievance Call</p>
                  <a
                    href="tel:08632354847"
                    className="text-2xl lg:text-3xl text-white hover:text-white/90 transition-colors block"
                  >
                    0863-2354847
                  </a>
                </div>
              </div>

              {/* Contact Person */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-8 py-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white/80 text-sm uppercase tracking-wide mb-1">Contact Person</p>
                  <p className="text-2xl lg:text-3xl text-white">Branch Manager</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-left">
              <p className="text-white/70 text-sm">
                Our grievance redressal team is committed to resolving your concerns promptly.
                Available during business hours: Monday - Saturday, 10:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          {/* Right: DICGC Info Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 shrink-0">
                  <img
                    src={dicgcLogo}
                    alt="DICGC Logo"
                    className="w-24 h-auto"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-black text-gray-900 leading-tight mb-1">
                    DEPOSIT INSURANCE AND CREDIT GUARANTEE CORPORATION
                  </h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Mumbai, India</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#0099ff]/5 border border-[#0099ff]/10 rounded-2xl p-6">
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Deposit Insurance covers all deposits such as savings, fixed, current, and recurring deposits up to a limit of <span className="text-[#0099ff] font-black">₹5,00,000</span> per depositor per bank.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Official Portal</p>
                    <a
                      href="https://www.dicgc.org.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#0099ff] hover:text-[#0077cc] transition-all font-black text-sm group"
                    >
                      <span>www.dicgc.org.in</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                  <div className="px-4 py-2 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-[10px] text-green-600 font-black uppercase tracking-tight">Status: Insured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
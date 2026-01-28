import { Phone, Mail, ExternalLink } from 'lucide-react';
// DICGC assets referenced from public/assets/DICGCLogo.jpg and /assets/DICGCQrCode.png

export function GrievanceCTA() {
  return (
    <section className="bg-gradient-to-r from-[#0099ff] to-[#0077cc] py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Grievance Section */}
          <div className="space-y-4">
            <div className="text-left">
              <h3 className="text-white mb-2 text-xl font-bold">Have a Grievance?</h3>
              <p className="text-white/90 text-base">
                We're here to help. Reach out to our dedicated grievance officer.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Grievance Call */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white/80 text-[10px] uppercase tracking-wide mb-0.5">Grievance Call</p>
                  <a
                    href="tel:08632354847"
                    className="text-base lg:text-lg text-white hover:text-white/90 transition-colors block font-semibold"
                  >
                    0863-2354847
                  </a>
                </div>
              </div>

              {/* Contact Person */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white/80 text-[10px] uppercase tracking-wide mb-0.5">Contact Person</p>
                  <p className="text-base lg:text-lg text-white font-semibold">Branch Manager</p>
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
            <div className="bg-gradient-to-br from-gray-50 to-white p-5 lg:p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                {/* Visual Assets: Logo & QR */}
                <div className="flex flex-col items-center gap-2 shrink-0 bg-white p-3 rounded-xl shadow-lg shadow-[#0099ff]/5 border border-[#0099ff]/10 hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src="/assets/DICGCLogo.jpg"
                    alt="DICGC Logo"
                    className="w-24 lg:w-28 h-auto rounded"
                  />
                  <img
                    src="/assets/DICGCQrCode.png"
                    alt="DICGC QR Code"
                    className="w-16 lg:w-20 h-16 lg:h-20 rounded"
                  />
                </div>

                {/* Info Column */}
                <div className="flex-1 space-y-3">
                  <div className="text-left">
                    <h3 className="text-sm lg:text-base font-black text-gray-900 leading-tight">
                      DEPOSIT INSURANCE AND CREDIT GUARANTEE CORPORATION
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Mumbai, India</p>
                  </div>

                  <div className="bg-[#0099ff]/5 border border-[#0099ff]/10 rounded-xl p-3 lg:p-4">
                    <p className="text-gray-700 text-[12px] lg:text-[13px] leading-relaxed font-medium">
                      Deposit Insurance covers all deposits such as savings, fixed, current, and recurring deposits up to a limit of <span className="text-[#0099ff] font-black">₹5,00,000</span> per depositor per bank.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Official Portal</span>
                    <a
                      href="https://www.dicgc.org.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#0099ff] hover:text-[#0077cc] transition-all font-black text-[13px] group"
                    >
                      <span>www.dicgc.org.in</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
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
import { Phone, Mail } from 'lucide-react';

export function GrievanceCTA() {
  return (
    <section className="bg-gradient-to-r from-[#0099ff] to-[#0077cc] py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-white mb-2">Have a Grievance?</h2>
          <p className="text-white/90 text-lg">
            We're here to help. Reach out to our dedicated grievance officer.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
          {/* Grievance Call */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-8 py-6 border border-white/20 hover:bg-white/15 transition-all duration-300 w-full lg:w-auto">
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

          {/* Divider */}
          <div className="hidden lg:block w-px h-20 bg-white/30"></div>
          <div className="lg:hidden w-20 h-px bg-white/30"></div>

          {/* Contact Person */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-8 py-6 border border-white/20 hover:bg-white/15 transition-all duration-300 w-full lg:w-auto">
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
        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm max-w-2xl mx-auto">
            Our grievance redressal team is committed to resolving your concerns promptly. 
            Available during business hours: Monday - Saturday, 10:00 AM - 6:00 PM
          </p>
        </div>
      </div>
    </section>
  );
}
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckCircle2 } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1676275774895-7fbba85dce94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMG9mZmljZXxlbnwxfHx8fDE3NjE3NjQwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="About Guntur Bank"
              className="rounded-2xl shadow-xl relative z-10 w-full"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-blue-600 uppercase tracking-wide">About Us</p>
              <h2 className="text-3xl lg:text-4xl text-gray-900 mt-2">
                Leading Co-operative Bank in Andhra Pradesh
              </h2>
            </div>

            <p className="text-gray-600">
              THE GUNTUR COOPERATIVE URBAN BANK LIMITED, is a premiere Co-operative bank in state of Andhra Pradesh. 
              It is having 51 Branches in Guntur city (Roadwise), Kollapur, Kothapet, Ponnur, Tenali, Narasaraopet, 
              Mangalagiri (L), Chebrolu (Mangalagiri), Tadepalli, Chilakaluripet, Inamadugu, Ponnekallu, Tadikonda, 
              Edlapadu, Bapatla and Chirala.
            </p>

            <p className="text-gray-600">
              We are committed to pioneering schemes for the co-operative banking both at A.P level and National level.
            </p>

            <ul className="space-y-3">
              {[
                'NABARD refinance scheme',
                'Reserve Bank of India Credit Guarantee Corporation (CGCSOC-10004:04)',
                'Deposit Insurance and Credit Guarantee Corporation',
                'Multiple branches across Guntur District',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="bg-blue-900 hover:bg-blue-800">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

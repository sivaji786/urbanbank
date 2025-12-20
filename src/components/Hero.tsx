import { Button } from './ui/button';
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block bg-blue-700/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <p className="text-sm">Serving Guntur Since 1953</p>
            </div>
            
            <h2 className="text-4xl lg:text-5xl xl:text-6xl">
              Your Trusted Banking Partner
            </h2>
            
            <p className="text-lg text-blue-100">
              The Guntur Co-operative Urban Bank Limited is a premiere Co-operative bank in state of Andhra Pradesh. 
              We are committed to providing excellent banking services with personalized attention.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                Open Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore Services
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center lg:text-left">
                <Shield className="h-8 w-8 mb-2 mx-auto lg:mx-0" />
                <p className="text-2xl">70+</p>
                <p className="text-sm text-blue-200">Years Legacy</p>
              </div>
              <div className="text-center lg:text-left">
                <Users className="h-8 w-8 mb-2 mx-auto lg:mx-0" />
                <p className="text-2xl">50K+</p>
                <p className="text-sm text-blue-200">Happy Customers</p>
              </div>
              <div className="text-center lg:text-left">
                <TrendingUp className="h-8 w-8 mb-2 mx-auto lg:mx-0" />
                <p className="text-2xl">₹500Cr+</p>
                <p className="text-sm text-blue-200">Assets</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1696441315090-fe40d27275f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYW5rJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxODIzMzI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern Banking"
              className="rounded-3xl shadow-2xl relative z-10 w-full"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}

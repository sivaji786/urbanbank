import { MapPin, Phone, Mail, Clock, Send, Building2, Calendar } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

import client from '../api/client';
import { Loader2 } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await client.post('contact', formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send message', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0099ff] via-[#0088ee] to-[#0077dd] py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">
          <div className="text-center">
            <h1 className="text-white mb-3">Contact Us</h1>
            <div className="w-24 h-1 bg-white/80 mx-auto mb-4"></div>
            <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
              Get in touch with us. We're here to help and answer any questions you might have.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-gray-600 text-sm">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="category" className="text-sm text-gray-700 mb-1.5 block">
                    Request Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: string) => setFormData(prev => ({ ...prev, category: value }))}
                    required
                  >
                    <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Select type of request" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Enquiry">General Enquiry</SelectItem>
                      <SelectItem value="Fraud Complaint">Fraud Complaint</SelectItem>
                      <SelectItem value="Lodge a Complaint">Lodge a Complaint</SelectItem>
                      <SelectItem value="Feed Back">Feed Back</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="name" className="text-sm text-gray-700 mb-1.5 block">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-11 bg-gray-50 border-gray-200"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm text-gray-700 mb-1.5 block">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-11 bg-gray-50 border-gray-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm text-gray-700 mb-1.5 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-11 bg-gray-50 border-gray-200"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-sm text-gray-700 mb-1.5 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="h-11 bg-gray-50 border-gray-200"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm text-gray-700 mb-1.5 block">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-gray-50 border-gray-200 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#0099ff] to-[#0077cc] hover:from-[#0088ee] hover:to-[#0066bb] text-white h-11 rounded-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Head Office */}
              <div className="bg-gradient-to-br from-[#0099ff] to-[#0077dd] rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-white">Head Office</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-white/90" />
                    <div>
                      <p className="text-white/90 text-sm leading-relaxed">
                        D.No: 5-25-26, 3/2 Brodipet,<br />
                        GUNTUR-522002, Andhra Pradesh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 flex-shrink-0 text-white/90" />
                    <div>
                      <p className="text-white/70 text-xs mb-0.5">Toll Free</p>
                      <a href="tel:18004258873" className="text-white hover:underline">
                        1800-425-8873
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 flex-shrink-0 text-white/90" />
                    <div>
                      <p className="text-white/70 text-xs mb-0.5">Email</p>
                      <a
                        href="mailto:gcubhelpdesk@guntururbanbank.org"
                        className="text-white hover:underline text-sm break-all"
                      >
                        gcubhelpdesk@guntururbanbank.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 flex-shrink-0 text-white/90" />
                    <div>
                      <p className="text-white/70 text-xs mb-0.5">Working Hours</p>
                      <p className="text-white">10:00 AM to 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Timings */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Local Branches */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-[#0099ff]/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#0099ff]" />
                    </div>
                    <h3 className="text-gray-900 text-lg">Local Branches</h3>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-[#0099ff] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-700">Mon – Sat</p>
                        <p className="text-gray-900">10:00 AM to 6:00 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Coffee className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-700">Lunch Break</p>
                        <p className="text-gray-900">2:00 PM to 3:00 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-700">Closed</p>
                        <p className="text-gray-900 text-xs">2nd & 4th Saturday / Sundays</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Out Station Branches */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-gray-900 text-lg">Out Station</h3>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-700">Mon – Sat</p>
                        <p className="text-gray-900">10:00 AM to 5:00 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Coffee className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-700">Lunch Break</p>
                        <p className="text-gray-900">2:00 PM to 2:30 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-700">Closed</p>
                        <p className="text-gray-900 text-xs">2nd & 4th Saturday / Sundays</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                  <Phone className="w-6 h-6 text-[#0099ff] mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Call Us</p>
                  <p className="text-sm text-gray-900">24/7</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4 text-center border border-green-100">
                  <Mail className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Email</p>
                  <p className="text-sm text-gray-900">Quick Reply</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-100">
                  <MapPin className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Visit</p>
                  <p className="text-sm text-gray-900">13 Branches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Additional Info Section */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-gray-900 mb-2">Visit Our Branches</h2>
            <p className="text-gray-600">
              We have 13 branches across Andhra Pradesh ready to serve you
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-8 border border-gray-200">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Building2 className="w-8 h-8 text-[#0099ff]" />
                </div>
                <h3 className="text-gray-900 mb-2">13 Branches</h3>
                <p className="text-gray-600 text-sm">
                  Serving customers across Guntur, Krishna, and Prakasam districts
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-gray-900 mb-2">Extended Hours</h3>
                <p className="text-gray-600 text-sm">
                  Open 6 days a week with convenient timings to serve you better
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Phone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm">
                  Toll-free helpline available round the clock for your convenience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Coffee icon component (simple implementation)
function Coffee({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  );
}

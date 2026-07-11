import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, MessageSquare, Award } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenConsultation: () => void;
}

export default function Footer({ setActiveTab, onOpenConsultation }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-gray-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-gray-800">
          
          {/* Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-display text-2xl font-extrabold text-white tracking-tight">
                Mabasa<span className="text-brand">.</span>
              </span>
              <span className="ml-2 px-2 py-0.5 bg-gray-800 border border-gray-700 rounded-md text-[10px] font-mono uppercase tracking-widest text-brand font-semibold">
                eLearning
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Global eLearning consulting engineering highly interactive LMS platforms, compliant corporate upskilling programs, and gamified digital curricula.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="p-2 bg-gray-800 rounded-lg text-brand">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">
                13+ Years eLearning Leadership
              </span>
            </div>
          </div>

          {/* Quick Navigations */}
          <div>
            <h3 className="font-display text-base font-semibold text-white tracking-wide uppercase mb-4">
              eLearning Portals
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => setActiveTab('home')} 
                  className="hover:text-brand transition-colors cursor-pointer"
                >
                  Consulting Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('portfolio')} 
                  className="hover:text-brand transition-colors cursor-pointer"
                >
                  Interactive Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('portal')} 
                  className="hover:text-brand transition-colors cursor-pointer"
                >
                  Secure Client Billing
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenConsultation} 
                  className="text-brand font-medium hover:underline cursor-pointer"
                >
                  Submit Briefing & Request Call
                </button>
              </li>
            </ul>
          </div>

          {/* Core Focus Fields */}
          <div>
            <h3 className="font-display text-base font-semibold text-white tracking-wide uppercase mb-4">
              Core Expertise
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                Canvas & Moodle Arch
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                Storyline 360 & xAPI
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                Generative AI Lesson Chains
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                COPPA Compliance (K-12)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                Corporate Upskilling ROI
              </li>
            </ul>
          </div>

          {/* Global Communication Channels */}
          <div className="space-y-3 text-sm">
            <h3 className="font-display text-base font-semibold text-white tracking-wide uppercase mb-4">
              Global Support
            </h3>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand flex-shrink-0" />
              <a href="mailto:brucemabasa4@gmail.com" className="hover:text-white transition-colors">
                brucemabasa4@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-gray-400">
              <Phone className="w-4 h-4 text-brand flex-shrink-0" />
              <span>+27 (0) 82 596 5691</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-400">
              <MapPin className="w-4 h-4 text-brand flex-shrink-0" />
              <span>Gauteng, South Africa & Remote Global</span>
            </div>
            <div className="flex gap-3 pt-3">
              <a 
                href="#" 
                className="p-2 bg-gray-800 hover:bg-brand hover:text-white rounded-lg text-gray-400 transition-all cursor-pointer"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 hover:bg-brand hover:text-white rounded-lg text-gray-400 transition-all cursor-pointer"
                title="Global Consultancy Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 hover:bg-brand hover:text-white rounded-lg text-gray-400 transition-all cursor-pointer"
                title="Direct Slack Channel"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} Mabasa eLearning Consulting. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">PCI-DSS Secure Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

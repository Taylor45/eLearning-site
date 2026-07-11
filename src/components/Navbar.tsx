import React from 'react';
import { BookOpen, Calendar, DollarSign, Menu, X, Landmark, GraduationCap, Briefcase, Award } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenConsultation: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenConsultation }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: Award },
    { id: 'services', label: 'Services', icon: Landmark },
    { id: 'portal', label: 'Client Area', icon: DollarSign },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/60 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => { setActiveTab('home'); setIsOpen(false); }}>
            <span className="font-display text-2xl font-extrabold text-white tracking-tight">
              Mabasa<span className="text-brand">.</span>
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono uppercase tracking-widest text-blue-400 font-semibold">
              eLearning
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-brand bg-orange-50 font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Call To Action & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              id="cta-nav-consultation"
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-brand hover:bg-brand-hover text-white text-sm font-semibold rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Contact Me
            </button>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-hidden"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 h-6" /> : <Menu className="block h-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-white/10 bg-slate-950/90 backdrop-blur-2xl shadow-xl animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'text-brand bg-orange-50 font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-brand' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 pb-2 border-t border-gray-100 px-4">
              <button
                id="mobile-nav-cta"
                onClick={() => {
                  onOpenConsultation();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-3 bg-brand hover:bg-brand-hover text-white font-semibold rounded-lg shadow-xs transition-colors"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RoiCalculator from './components/RoiCalculator';
import PaymentPortal from './components/PaymentPortal';
import PortfolioShowcase from './components/PortfolioShowcase';
import { Course, Booking, Invoice, CaseStudy } from './types';
import { CASE_STUDIES, COURSES, CONSULTATION_TYPES, PORTFOLIO_PROJECTS } from './data';
import { 
  Award, ArrowRight, BookOpen, Users, CheckCircle2, Zap, 
  ChevronRight, Calendar, ShieldCheck, MessageSquare, MapPin, 
  Mail, Phone, Laptop, GraduationCap, ShieldAlert, HeartHandshake, CheckSquare 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [contactObjective, setContactObjective] = useState<string>('LMS Deployment & Architecture Integration');
  const [contactMessage, setContactMessage] = useState<string>('');

  // Load state from localStorage or default values
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('mabasa_bookings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    // Return robust initial records so the dashboard is lively and realistic
    return [
      {
        id: 'BKG-STR820X',
        date: '2026-07-25',
        timeSlot: '02:30 PM',
        name: 'Bruce Mabasa',
        email: 'brucemabasa4@gmail.com',
        organization: 'St. Jude Educational Group',
        projectNotes: 'Initial onboarding audit for physical K-12 STEM blended program.',
        consultationId: 'lms-architecture-audit',
        consultationTitle: 'Premium LMS Architecture Audit',
        amount: 180,
        paid: true,
        status: 'confirmed',
        meetLink: 'https://meet.google.com/mab-e-learning-consult',
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('mabasa_invoices');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'INV-A92B41',
        bookingId: 'BKG-STR820X',
        billingName: 'Bruce Mabasa',
        billingEmail: 'brucemabasa4@gmail.com',
        organization: 'St. Jude Educational Group',
        date: '2026-07-11',
        dueDate: '2026-07-11',
        amount: 194.4, // including tax
        description: 'Premium Strategy Consultation: Premium LMS Architecture Audit',
        status: 'paid',
        transactionId: 'TXN-LMSAUDIT902',
        paymentMethod: 'Credit Card (Stripe Verified)'
      }
    ];
  });

  // Keep track of active checkout item
  const [pendingItem, setPendingItem] = useState<{
    type: 'course' | 'booking';
    data: Course | Omit<Booking, 'id' | 'createdAt' | 'paid' | 'status' | 'meetLink'>;
  } | null>(null);

  // Sync state to localStorage on modification
  useEffect(() => {
    localStorage.setItem('mabasa_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('mabasa_invoices', JSON.stringify(invoices));
  }, [invoices]);

  // Handle free booking confirmation
  const handleConfirmFreeBooking = (newBkg: Booking) => {
    setBookings(prev => [newBkg, ...prev]);
    
    // Auto-create a corresponding R0 invoice
    const newInv: Invoice = {
      id: 'INV-FREE' + Math.random().toString(36).substr(2, 4).toUpperCase(),
      bookingId: newBkg.id,
      billingName: newBkg.name,
      billingEmail: newBkg.email,
      organization: newBkg.organization,
      date: new Date().toLocaleDateString('en-US'),
      dueDate: new Date().toLocaleDateString('en-US'),
      amount: 0,
      description: `Complimentary Call: ${newBkg.consultationTitle}`,
      status: 'paid',
      transactionId: 'TXN-FREE-GRANT',
      paymentMethod: 'Granted Voucher (R0)'
    };

    setInvoices(prev => [newInv, ...prev]);
    
    // Switch to Client Portal to view confirmed bookings
    setActiveTab('portal');
    setTimeout(() => {
      alert(`Success! Your complimentary strategy call has been confirmed. A Google Meet invitation has been added to your client area dashboard!`);
    }, 100);
  };

  // Handle paid items initiating checkout
  const handleInitiatePaidBooking = (bkgData: Omit<Booking, 'id' | 'createdAt' | 'paid' | 'status' | 'meetLink'>) => {
    setPendingItem({
      type: 'booking',
      data: bkgData
    });
    setActiveTab('portal');
  };

  const handleInitiateCourseBlueprintCheckout = (course: Course) => {
    setPendingItem({
      type: 'course',
      data: course
    });
    setActiveTab('portal');
  };

  // Handle paid item checkout completion
  const handleCompletePayment = (newInvoice: Invoice, confirmedBkg?: Booking, courseId?: string) => {
    setInvoices(prev => [newInvoice, ...prev]);
    
    if (confirmedBkg) {
      setBookings(prev => [confirmedBkg, ...prev]);
    }

    setPendingItem(null); // Clear checkout context
  };

  const handleCancelPayment = () => {
    setPendingItem(null);
    setActiveTab('home');
  };

  const triggerContactForm = (objective: string, message: string) => {
    setContactObjective(objective);
    setContactMessage(message);
    setActiveTab('home');
    setTimeout(() => {
      document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handle ROI trigger to Contact Section
  const handleRoiUnlock = (orgDetails: { size: number; currentCost: number; savings: number }) => {
    setActiveTab('home');
    setTimeout(() => {
      document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
      alert(`ROI Report Calculated! Estimated savings of R${orgDetails.savings.toLocaleString()} per year. Please submit your inquiry below to request your detailed roadmap session with Bruce Mabasa!`);
    }, 200);
  };

  // Contact form submission
  const [contactSuccess, setContactSuccess] = useState(false);
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 antialiased selection:bg-brand selection:text-white relative overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Navbar Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenConsultation={() => {
          setActiveTab('home');
          setTimeout(() => {
            document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }} 
      />

      {/* Main Content Render Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-20"
            >
              
              {/* Hero Section */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-xs font-semibold text-brand">
                    <Award className="w-3.5 h-3.5 text-brand" />
                    <span>Global eLearning Architect</span>
                  </div>
                  
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-dark tracking-tight leading-tight">
                    Scale Your <span className="text-brand">Learning Impact.</span>
                  </h1>
                  
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl">
                    High-conversion eLearning architecture, LMS deployment, and gamified instructional design. We empower corporate giants, elite universities, and digital creators to deploy modern, compliant, and highly engaging programs.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => {
                        setActiveTab('home');
                        setTimeout(() => {
                          document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="px-6 py-3.5 bg-brand hover:bg-brand-hover text-white text-sm font-semibold rounded-lg shadow-md hover:-translate-y-0.5 transition-all text-center cursor-pointer"
                    >
                      Consultation Inquiry
                    </button>
                    <button
                      onClick={() => setActiveTab('portfolio')}
                      className="px-6 py-3.5 border border-white/10 text-slate-300 bg-white/5 hover:bg-white/10 text-sm font-semibold rounded-lg text-center cursor-pointer"
                    >
                      Explore Portfolio
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                    <div>
                      <p className="font-display text-2xl font-extrabold text-navy-dark">13+</p>
                      <p className="text-[10px] text-gray-500 uppercase font-mono tracking-wider">Years Experience</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-extrabold text-navy-dark">50k+</p>
                      <p className="text-[10px] text-gray-500 uppercase font-mono tracking-wider">Learners Reached</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-extrabold text-navy-dark">100%</p>
                      <p className="text-[10px] text-gray-500 uppercase font-mono tracking-wider">Accreditation Rate</p>
                    </div>
                  </div>
                </div>

                {/* Hero Graphic Column (Right) */}
                <div className="lg:col-span-5 relative">
                  <div className="absolute -top-4 -left-4 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
                  <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse delay-75"></div>
                  
                  <div className="relative bg-white rounded-2xl border border-gray-150 p-3 shadow-xl">
                    <img 
                      src="/src/assets/images/profile_bruce_1783797787803.jpg" 
                      alt="Bruce Mabasa eLearning Consultant"
                      referrerPolicy="no-referrer"
                      className="rounded-xl w-full h-[380px] object-cover"
                    />
                    <div className="absolute bottom-6 left-6 right-6 bg-navy-dark/95 backdrop-blur-xs p-4 rounded-xl text-white flex justify-between items-center border border-gray-800">
                      <div>
                        <p className="font-bold text-sm">Bruce Mabasa</p>
                        <p className="text-[10px] text-gray-400 font-mono">Principal Consultant & ID Architect</p>
                      </div>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Company Services - From Inspiration Image */}
              <section className="space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-[11px] font-mono font-bold text-brand uppercase tracking-widest">Our Company Services</span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-dark tracking-tight">
                    Experience Professional eLearning Service
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Bespoke learning engineering designed around high scalability, compliance audits, and global performance metrics.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Service 1 */}
                  <div className="bg-white border border-gray-150 p-6 rounded-xl hover:shadow-md transition-all space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-brand flex items-center justify-center font-bold">
                      01
                    </div>
                    <h3 className="font-display font-bold text-base text-navy-dark">LMS Migration & Selection</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Formulate system strategies, select frameworks (Moodle, Canvas, Blackboard, custom), and orchestrate secure SIS-LMS data migrations.
                    </p>
                    <button 
                      onClick={() => triggerContactForm('LMS Deployment & Architecture Integration', 'Hi Bruce, I would like to request an LMS technical audit for our organization.')}
                      className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Request technical audit →
                    </button>
                  </div>

                  {/* Service 2 */}
                  <div className="bg-white border border-gray-150 p-6 rounded-xl hover:shadow-md transition-all space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      02
                    </div>
                    <h3 className="font-display font-bold text-base text-navy-dark">Instructional Design & Storyboarding</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Construct active competency maps, write scenario scripts, and storyboard visual assets utilizing validated cognitive frameworks.
                    </p>
                    <button 
                      onClick={() => triggerContactForm('Custom xAPI & Articulate Content Design', 'Hi Bruce, I would like to schedule a storyboarding and instructional design workshop.')}
                      className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Request storyboarding workshop →
                    </button>
                  </div>

                  {/* Service 3 */}
                  <div className="bg-white border border-gray-150 p-6 rounded-xl hover:shadow-md transition-all space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                      03
                    </div>
                    <h3 className="font-display font-bold text-base text-navy-dark">Interactive SCORM & xAPI Content</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Publish high-engagement Articulate Storyline modules tracking precise actions directly into centralized Learning Record Stores (LRS).
                    </p>
                    <button 
                      onClick={() => setActiveTab('portfolio')}
                      className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Explore Portfolio →
                    </button>
                  </div>

                  {/* Service 4 */}
                  <div className="bg-white border border-gray-150 p-6 rounded-xl hover:shadow-md transition-all space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                      04
                    </div>
                    <h3 className="font-display font-bold text-base text-navy-dark">AI-Augmented Courseware</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Integrate advanced language model chains (Gemini API) to automate adaptive quizzes, personalized coaching systems, and AI narration.
                    </p>
                    <button 
                      onClick={() => triggerContactForm('AI-Augmented Learning Pilot', 'Hi Bruce, I want to discuss integrating AI-augmented courseware and custom tutors into our curriculum.')}
                      className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Configure AI tutors →
                    </button>
                  </div>

                  {/* Service 5 */}
                  <div className="bg-white border border-gray-150 p-6 rounded-xl hover:shadow-md transition-all space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      05
                    </div>
                    <h3 className="font-display font-bold text-base text-navy-dark">Corporate Academy ROI</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Connect employee skills audits to commercial metrics, optimize training hour footprints, and build micro-credentials.
                    </p>
                    <button 
                      onClick={() => triggerContactForm('Corporate Program Accreditation', 'Hi Bruce, I would like to discuss formulating a corporate academy ROI roadmap.')}
                      className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Formulate competency roadmap →
                    </button>
                  </div>

                  {/* Service 6 */}
                  <div className="bg-white border border-gray-150 p-6 rounded-xl hover:shadow-md transition-all space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                      06
                    </div>
                    <h3 className="font-display font-bold text-base text-navy-dark">Accreditation Certifications</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Align online and blended programs with regional K-12 board requirements, higher education standards, or professional bodies.
                    </p>
                    <button 
                      onClick={() => triggerContactForm('Corporate Program Accreditation', 'Hi Bruce, I would like to schedule a compliance framework audit for our courses.')}
                      className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Audit compliance framework →
                    </button>
                  </div>

                </div>
              </section>

              {/* Experience Split Section - From Inspiration Image */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800" 
                    alt="Corporate training workshop"
                    referrerPolicy="no-referrer"
                    className="rounded-2xl border border-gray-200 w-full h-[360px] object-cover"
                  />
                  <div className="absolute -top-4 -right-4 bg-brand text-white p-6 rounded-xl font-display text-center shadow-lg">
                    <p className="text-3xl font-extrabold">13+</p>
                    <p className="text-[10px] font-mono uppercase tracking-wider">Years Active</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <span className="text-[11px] font-mono font-bold text-brand uppercase tracking-widest block">
                    Our Track Record
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-dark tracking-tight">
                    Professional Consultancy Improvement for More Than 13 Years
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    We don’t just deliver courses; we engineer learning infrastructures. By implementing the robust ADDIE and SAM systems, we align structural educational psychology with state-of-the-art technological architectures.
                  </p>
                  
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                      <span>Turnkey compliance solutions for hospitals and security institutes.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                      <span>Certified integrations of LTI 1.3 standard databases.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                      <span>Interactive scenario simulators running on state machines.</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => triggerContactForm('LMS Deployment & Architecture Integration', 'Hi Bruce, I\'d like to get a professional audit of our existing educational ecosystem.')}
                      className="px-5 py-3 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-lg shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      Audit Your Existing Ecosystem
                    </button>
                  </div>
                </div>
              </section>

              {/* Projects & Case Studies */}
              <section className="space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-[11px] font-mono font-bold text-brand uppercase tracking-widest">Selected Works</span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-dark tracking-tight">
                    Bruce's Portfolio Highlights
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Interact directly with Bruce Mabasa's live, fully interactive eLearning courses, digital storyboards, and custom instructional software.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PORTFOLIO_PROJECTS.slice(0, 3).map((project) => (
                    <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between">
                      <div className="relative">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-48 object-cover border-b border-gray-100"
                        />
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-navy-dark/95 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-wider rounded-sm">
                          {project.category}
                        </span>
                      </div>
                      <div className="p-5 space-y-3 flex-grow">
                        <h3 className="font-display font-bold text-sm text-navy-dark tracking-tight leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-1.5 py-0.5 bg-gray-50 border border-gray-100 text-[9px] text-gray-500 font-mono rounded-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="px-5 py-4 bg-gray-50 border-t border-gray-150 flex items-center justify-between">
                        {project.processUrl ? (
                          <a
                            href={project.processUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono font-bold text-gray-400 hover:text-navy-dark uppercase tracking-wider"
                          >
                            View Storyboard
                          </a>
                        ) : (
                          <span className="text-[10px] text-gray-300">Live Project</span>
                        )}
                        <a
                          href={project.courseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-semibold text-brand hover:underline inline-flex items-center gap-1"
                        >
                          Launch Project →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className="px-6 py-3 bg-brand hover:bg-brand-hover text-white text-xs font-bold rounded-lg shadow-md hover:-translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>View All Portfolio Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>

              {/* Lead Capture form */}
              <section id="contact-form-section" className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-10 shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-[10px] font-mono font-bold text-brand uppercase tracking-widest block">Direct Communications</span>
                    <h2 className="font-display text-2xl font-extrabold text-navy-dark tracking-tight">
                      Ready to Engineer Your System?
                    </h2>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                      Submit your learning requirements, program scale parameters, or compliance codes directly. Bruce Mabasa responds within 1 business day.
                    </p>

                    <div className="space-y-3 pt-2 text-xs text-gray-600 font-mono">
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-brand flex-shrink-0" />
                        <span>brucemabasa4@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-brand flex-shrink-0" />
                        <span>+27 (0) 82 596 5691</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-brand flex-shrink-0" />
                        <span>Johannesburg, South Africa</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="lg:col-span-7">
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      {contactSuccess ? (
                        <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                          <div>
                            <h4 className="font-bold text-sm">Inquiry Transmitted Successfully</h4>
                            <p className="text-xs text-emerald-700 mt-1">
                              Your briefing has been encrypted and sent to Bruce Mabasa. Expect a response in your inbox within 12-24 hours.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-gray-600">First Name *</label>
                              <input 
                                type="text" 
                                required 
                                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-brand" 
                                placeholder="Sarah"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-gray-600">Business Email *</label>
                              <input 
                                type="email" 
                                required 
                                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-brand" 
                                placeholder="s.jenkins@academy.org"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600">Primary Objective *</label>
                            <select 
                              value={contactObjective}
                              onChange={(e) => setContactObjective(e.target.value)}
                              className="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-brand"
                            >
                              <option>LMS Deployment & Architecture Integration</option>
                              <option>Custom xAPI & Articulate Content Design</option>
                              <option>AI-Augmented Learning Pilot</option>
                              <option>Corporate Program Accreditation</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600">Briefing Notes *</label>
                            <textarea 
                              rows={3} 
                              required
                              value={contactMessage}
                              onChange={(e) => setContactMessage(e.target.value)}
                              placeholder="Please describe your system capacity, target learners, and budget thresholds..."
                              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-brand"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3.5 bg-navy-dark hover:bg-navy-light text-white text-sm font-semibold rounded-lg shadow-md cursor-pointer transition-colors"
                          >
                            Transmit Digital Briefing
                          </button>
                        </>
                      )}
                    </form>
                  </div>

                </div>
              </section>

            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Detailed Services Content */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-xs font-mono font-bold text-brand uppercase tracking-wider">
                  Technical Service Matrix
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
                  eLearning Consulting Capabilities
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  Bruce Mabasa delivers targeted engineering services, ensuring your LMS structures are secure, compliant, and backed by robust learning analytics.
                </p>
              </div>

              {/* Service Blocks with detailed listings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Service Block 1 */}
                <div className="bg-white border border-gray-150 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xs">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <div className="p-3 bg-orange-100 rounded-xl text-brand">
                      <Laptop className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy-dark">LMS Migration & Selection</h3>
                      <p className="text-xs text-gray-400">Security audits, database configurations & SIS bindings</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Moving thousands of learners between ecosystems is a delicate database operation. We secure your historical gradebook databases, protect personal private data, and configure single sign-on (SSO) authentication.
                  </p>
                  <ul className="space-y-2 text-xs text-gray-600 font-medium">
                    <li className="flex items-center gap-2">✓ Moodle, Canvas, and custom system setups.</li>
                    <li className="flex items-center gap-2">✓ Shibboleth, SAML, and OAuth SSO integrations.</li>
                    <li className="flex items-center gap-2">✓ Media streaming and Amazon CloudFront optimization.</li>
                  </ul>
                  <button
                    onClick={() => triggerContactForm('LMS Deployment & Architecture Integration', 'Hi Bruce, I would like to schedule an LMS selection and migration consultation.')}
                    className="w-full py-2.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Inquire About LMS Migration
                  </button>
                </div>

                {/* Service Block 2 */}
                <div className="bg-white border border-gray-150 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xs">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy-dark">Instructional Design & xAPI</h3>
                      <p className="text-xs text-gray-400">Microlearning pathways, storyboarding & LRS integration</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    We transcend passive video clickers. We build scenario-based storylines with complex variables tracking student decisions and transmitting xAPI statement packets directly to LRS analytic systems.
                  </p>
                  <ul className="space-y-2 text-xs text-gray-600 font-medium">
                    <li className="flex items-center gap-2">✓ Custom interactive Articulate Storyline development.</li>
                    <li className="flex items-center gap-2">✓ xAPI (Tin Can) state logging architectures.</li>
                    <li className="flex items-center gap-2">✓ Gamification structures and digital badge certificates.</li>
                  </ul>
                  <button
                    onClick={() => triggerContactForm('Custom xAPI & Articulate Content Design', 'Hi Bruce, I would like to schedule an instructional design and storyboarding consultation.')}
                    className="w-full py-2.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Inquire About Storyboarding
                  </button>
                </div>

                {/* Service Block 3 */}
                <div className="bg-white border border-gray-150 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xs">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy-dark">AI-Powered Educational Systems</h3>
                      <p className="text-xs text-gray-400">Automated quizzes, custom LLM agents & lesson chains</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Deploy modern AI learning accelerators. We build custom language models (Google Gemini SDK) that act as private tutors, grade essays against strict rubrics, and deliver automated voiceovers in minutes.
                  </p>
                  <ul className="space-y-2 text-xs text-gray-600 font-medium">
                    <li className="flex items-center gap-2">✓ Adaptive tutoring bots synced with Canvas API.</li>
                    <li className="flex items-center gap-2">✓ Generative prompt engineering for fast curriculum drafts.</li>
                    <li className="flex items-center gap-2">✓ Automated voice synthesis and multi-lingual transcripts.</li>
                  </ul>
                  <button
                    onClick={() => triggerContactForm('AI-Augmented Learning Pilot', 'Hi Bruce, I would like to schedule a consultation regarding AI-powered educational systems.')}
                    className="w-full py-2.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Inquire About AI Systems
                  </button>
                </div>

                {/* Service Block 4 */}
                <div className="bg-white border border-gray-150 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xs">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy-dark">Corporate Accreditation</h3>
                      <p className="text-xs text-gray-400">K-12 compliance standards & Regional Board certificates</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    We certify that online courses adhere to rigorous regional and international educational boards, assuring program accreditation, employee compliance tracking, and legal safety standards.
                  </p>
                  <ul className="space-y-2 text-xs text-gray-600 font-medium">
                    <li className="flex items-center gap-2">✓ Safe, COPPA-compliant student spaces (K-12).</li>
                    <li className="flex items-center gap-2">✓ Training ROI dashboard and analytics metrics.</li>
                    <li className="flex items-center gap-2">✓ Regional Board of Education compliance documentation.</li>
                  </ul>
                  <button
                    onClick={() => triggerContactForm('Corporate Program Accreditation', 'Hi Bruce, I would like to schedule a consultation regarding corporate program accreditation.')}
                    className="w-full py-2.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Inquire About Accreditation
                  </button>
                </div>

              </div>

              {/* Technical methodology */}
              <div className="bg-gray-50 rounded-2xl border border-gray-150 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 text-brand rounded-lg">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-extrabold text-base text-navy-dark">Our Engineering Code</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  We strictly implement modern learning technologies. All SCORM assets comply with 1.2 and 2004 4th Edition standards, and all LTI connections adhere to LTI 1.3 Advantage protocol. Billing receipts and transactions are logged on local secure states. Let’s construct your dynamic learning ecosystem together.
                </p>
              </div>

            </motion.div>
          )}

          {activeTab === 'portal' && (
            <motion.div
              key="portal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PaymentPortal 
                pendingItem={pendingItem}
                bookings={bookings}
                invoices={invoices}
                onCompletePayment={handleCompletePayment}
                onCancelPayment={handleCancelPayment}
              />
            </motion.div>
          )}

          {activeTab === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PortfolioShowcase setActiveTab={setActiveTab} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer component */}
      <Footer setActiveTab={setActiveTab} onOpenConsultation={() => {
        setActiveTab('home');
        setTimeout(() => {
          document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }} />

    </div>
  );
}


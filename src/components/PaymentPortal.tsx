import React, { useState } from 'react';
import { Course, Booking, Invoice } from '../types';
import { CreditCard, Shield, Receipt, Download, CheckCircle2, ShoppingBag, Calendar, ArrowLeft, Printer, Award, ExternalLink } from 'lucide-react';

interface PaymentPortalProps {
  // Current item being paid for (can be a course or booking)
  pendingItem: {
    type: 'course' | 'booking';
    data: Course | Omit<Booking, 'id' | 'createdAt' | 'paid' | 'status' | 'meetLink'>;
  } | null;
  // State methods
  bookings: Booking[];
  invoices: Invoice[];
  onCompletePayment: (invoice: Invoice, bkg?: Booking, crsId?: string) => void;
  onCancelPayment: () => void;
}

export default function PaymentPortal({
  pendingItem,
  bookings,
  invoices,
  onCompletePayment,
  onCancelPayment
}: PaymentPortalProps) {
  
  // Card forms
  const [cardholder, setCardholder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [billingCountry, setBillingCountry] = useState('United States');
  const [processing, setProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState<Invoice | null>(null);

  // Math variables
  const itemPrice = pendingItem 
    ? (pendingItem.type === 'course' 
        ? (pendingItem.data as Course).price 
        : (pendingItem.data as any).amount)
    : 0;
  
  const taxAmount = parseFloat((itemPrice * 0.08).toFixed(2)); // 8% average tax/VAT
  const totalAmount = parseFloat((itemPrice + taxAmount).toFixed(2));

  // Submit Simulated Payment
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvc) {
      alert('Please fill in your credit card details.');
      return;
    }
    
    setProcessing(true);

    // Simulate 1.5s card verification and stripe request
    setTimeout(() => {
      setProcessing(false);
      
      const transactionId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const invoiceId = 'INV-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      const clientName = cardholder || (pendingItem?.type === 'booking' ? (pendingItem.data as any).name : 'Global Corporate Client');
      const clientEmail = pendingItem?.type === 'booking' ? (pendingItem.data as any).email : 'billing@company.com';
      const organization = pendingItem?.type === 'booking' ? (pendingItem.data as any).organization : 'Corporate Client';

      // Create new invoice object
      const newInvoice: Invoice = {
        id: invoiceId,
        billingName: clientName,
        billingEmail: clientEmail,
        organization,
        date: new Date().toLocaleDateString('en-US'),
        dueDate: new Date().toLocaleDateString('en-US'),
        amount: totalAmount,
        description: pendingItem?.type === 'course' 
          ? `eLearning Design Blueprint: ${(pendingItem.data as Course).title}`
          : `Premium Strategy Consultation: ${(pendingItem.data as any).consultationTitle}`,
        status: 'paid',
        transactionId,
        paymentMethod: 'Credit Card (Stripe Verified)'
      };

      if (pendingItem?.type === 'booking') {
        // Build the full confirmed booking object
        const finalBooking: Booking = {
          ...(pendingItem.data as any),
          id: 'BKG-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          paid: true,
          status: 'confirmed',
          meetLink: 'https://meet.google.com/mab-e-learning-consult',
          createdAt: new Date().toISOString()
        };
        newInvoice.bookingId = finalBooking.id;
        onCompletePayment(newInvoice, finalBooking, undefined);
      } else if (pendingItem?.type === 'course') {
        const courseId = (pendingItem.data as Course).id;
        newInvoice.courseId = courseId;
        onCompletePayment(newInvoice, undefined, courseId);
      }

      // Show instant success receipt modal
      setShowReceipt(newInvoice);
      
      // Reset input fields
      setCardholder('');
      setCardNumber('');
      setExpiry('');
      setCvc('');
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-xs font-mono font-bold text-brand uppercase tracking-wider">
          Client Billing
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-dark tracking-tight">
          Secure Payment & Account Dashboard
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          Manage your course blueprint licenses, consult history, and download official receipt invoices compliant with global corporate auditing.
        </p>
      </div>

      {/* Conditionally Render Active Checkout vs Dashboard */}
      {pendingItem ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card Form Column (Left) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-150 p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brand" />
                <h3 className="font-display text-lg font-bold text-navy-dark">
                  Credit Card Gateway
                </h3>
              </div>
              <button 
                onClick={onCancelPayment}
                className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-navy-dark transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Catalogs
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Cardholder Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Sarah Jenkins"
                  value={cardholder}
                  onChange={(e) => setCardholder(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-brand"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Credit Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={19}
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => {
                      // auto format spaces for credit cards
                      const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                      setCardNumber(val);
                    }}
                    className="w-full pl-3.5 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-brand"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-gray-400 uppercase">
                    Visa/MC
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    placeholder="12/28"
                    value={expiry}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\//g, '');
                      if (val.length >= 2) {
                        setExpiry(val.slice(0, 2) + '/' + val.slice(2, 4));
                      } else {
                        setExpiry(val);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-brand"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Secure CVC</label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    placeholder="•••"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-brand"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Billing Country/Jurisdiction</label>
                <select
                  value={billingCountry}
                  onChange={(e) => setBillingCountry(e.target.value)}
                  className="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-brand"
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>South Africa</option>
                  <option>Canada</option>
                  <option>Germany</option>
                  <option>Australia</option>
                </select>
              </div>

              {/* Secure Trust Marks */}
              <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600 font-semibold">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>Encrypted Stripe Gateway Integration</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Your payments are processed with modern 256-bit bank-grade SSL layers. We never store raw credit cards. Your corporate billing statement will display **MABASA CONSULTING**.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="stripe-checkout-btn"
                disabled={processing}
                className="w-full flex items-center justify-center px-5 py-4 bg-brand hover:bg-brand-hover text-white text-sm font-semibold rounded-lg shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Authenticating Gateway...
                  </span>
                ) : (
                  `Pay Securely: R${totalAmount} ZAR`
                )}
              </button>
            </form>
          </div>

          {/* Checkout Invoice Overview (Right) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-navy-dark text-white rounded-2xl p-6 shadow-md border border-gray-800 space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-brand uppercase tracking-wider block mb-1">
                  Global Client Checkout
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight">
                  Invoice Breakdown
                </h3>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-800 text-sm">
                
                {/* Item Details */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-semibold text-white">
                      {pendingItem.type === 'course' 
                        ? (pendingItem.data as Course).title 
                        : 'Premium 1-on-1 Consulting Call'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 font-mono">
                      {pendingItem.type === 'course' 
                        ? `Blueprint Lic: ${(pendingItem.data as Course).code}`
                        : `Session: ${(pendingItem.data as any).consultationTitle}`}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-gray-300">
                    R{itemPrice.toLocaleString()}
                  </span>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between text-gray-400 text-xs font-mono pt-4 border-t border-gray-800">
                  <span>Subtotal</span>
                  <span>R{itemPrice.toLocaleString()}</span>
                </div>

                {/* Tax / VAT */}
                <div className="flex justify-between text-gray-400 text-xs font-mono">
                  <span>Est. Sales Tax / VAT (8%)</span>
                  <span>R{taxAmount}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline pt-4 border-t border-gray-800">
                  <span className="text-sm font-semibold">Total Invoice Amount</span>
                  <span className="text-2xl font-display font-extrabold text-brand font-mono">
                    R{totalAmount}
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-gray-800 text-xs text-gray-400 space-y-2">
                <p>✓ Turnkey SCORM content & xAPI structures included.</p>
                <p>✓ 100% money-back satisfaction advisory guarantee.</p>
                <p>✓ Complete post-call written technical brief.</p>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Client Dashboard View */
        <div className="space-y-8">
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg text-brand">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-mono block">Paid Transactions</span>
                <span className="text-xl font-display font-bold text-navy-dark">{invoices.length} Invoices</span>
              </div>
            </div>
            <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-mono block">Mentorship Schedule</span>
                <span className="text-xl font-display font-bold text-navy-dark">{bookings.length} Bookings</span>
              </div>
            </div>
            <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-mono block">Active Program Lic.</span>
                <span className="text-xl font-display font-bold text-navy-dark">
                  {invoices.filter(i => i.courseId).length} Courses
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Bookings Tracker (Left) */}
            <div className="bg-white rounded-xl border border-gray-150 p-6 space-y-4">
              <h3 className="font-display text-base font-bold text-navy-dark flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand" />
                Active Consulting Bookings
              </h3>
              
              {bookings.length > 0 ? (
                <div className="space-y-3">
                  {bookings.map((bkg) => (
                    <div key={bkg.id} className="p-4 bg-gray-50 rounded-lg border border-gray-150 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded-sm font-bold uppercase">
                            {bkg.id}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">{bkg.date} @ {bkg.timeSlot}</span>
                        </div>
                        <h4 className="text-sm font-bold text-navy-dark">{bkg.consultationTitle}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Org: {bkg.organization}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2.5 py-1 text-[10px] font-bold font-mono bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 uppercase mb-2">
                          Confirmed
                        </span>
                        <a 
                          href={bkg.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[11px] text-brand font-semibold hover:underline"
                        >
                          Join Google Meet
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  <p className="text-xs text-gray-500">No sessions scheduled yet.</p>
                </div>
              )}
            </div>

            {/* Invoices List (Right) */}
            <div className="bg-white rounded-xl border border-gray-150 p-6 space-y-4">
              <h3 className="font-display text-base font-bold text-navy-dark flex items-center gap-2">
                <Receipt className="w-5 h-5 text-brand" />
                Billing Invoices & Receipts
              </h3>

              {invoices.length > 0 ? (
                <div className="space-y-3">
                  {invoices.map((inv) => (
                    <div key={inv.id} className="p-4 bg-gray-50 rounded-lg border border-gray-150 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-sm font-bold uppercase border border-emerald-100">
                            PAID RECEIPT
                          </span>
                          <span className="text-xs text-gray-400 font-mono">{inv.date}</span>
                        </div>
                        <h4 className="text-sm font-bold text-navy-dark line-clamp-1">{inv.description}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Inv: {inv.id} | Total: R{inv.amount}</p>
                      </div>
                      <button
                        id={`btn-invoice-${inv.id}`}
                        onClick={() => setShowReceipt(inv)}
                        className="px-3 py-1.5 border border-gray-200 text-gray-700 text-xs font-semibold rounded-md hover:bg-white transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Invoice
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  <p className="text-xs text-gray-500">No billing history found.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Invoice Digital PDF Print-friendly Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto animate-fade-in print-modal">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-gray-100 space-y-8 print:p-0 print:border-0 print:shadow-none">
            
            {/* Modal Actions */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 print:hidden">
              <span className="text-sm font-semibold text-gray-700">Digital Receipt Document</span>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 bg-navy-dark hover:bg-navy-light text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setShowReceipt(null)}
                  className="px-3.5 py-1.5 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Close Receipt
                </button>
              </div>
            </div>

            {/* printable invoice body */}
            <div className="space-y-6 text-gray-800" id="printable-invoice">
              
              {/* Invoice Logo / Header */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-display text-2xl font-extrabold text-navy-dark tracking-tight">
                    Mabasa<span className="text-brand">.</span>
                  </span>
                  <p className="text-[10px] font-mono text-gray-500 mt-1">
                    eLEARNING CONSULTING GLOBAL
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Gauteng, South Africa & Remote Global<br />
                    Reg No: 2024/098472/07 | VAT ID: ZA450821
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-4 py-1.5 text-xs font-extrabold font-mono bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-sm uppercase tracking-widest rotate-2">
                    PAID RECEIPT
                  </span>
                  <p className="text-xs text-gray-500 font-mono mt-3">
                    Invoice ID: <strong>{showReceipt.id}</strong><br />
                    Date: {showReceipt.date}
                  </p>
                </div>
              </div>

              {/* Billing Addresses */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-150 text-xs">
                <div>
                  <h4 className="font-mono text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">FROM (Consultant)</h4>
                  <p className="font-semibold text-navy-dark">Bruce Mabasa</p>
                  <p className="text-gray-500">eLearning Architect & Mentor</p>
                  <p className="text-gray-500">brucemabasa4@gmail.com</p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">TO (Corporate Client)</h4>
                  <p className="font-semibold text-navy-dark">{showReceipt.billingName}</p>
                  <p className="text-gray-500">{showReceipt.organization}</p>
                  <p className="text-gray-500">{showReceipt.billingEmail}</p>
                </div>
              </div>

              {/* Invoice Table */}
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-150 font-mono text-gray-500 text-[10px]">
                    <th className="py-3 px-2">Line Item Description</th>
                    <th className="py-3 px-2 text-right">Quantity</th>
                    <th className="py-3 px-2 text-right">Rate</th>
                    <th className="py-3 px-2 text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 text-gray-700">
                    <td className="py-4 px-2 font-semibold">
                      {showReceipt.description}
                      <p className="text-[10px] text-gray-400 font-mono font-normal mt-1">
                        Deployment package licensing & LMS setup blueprints included.
                      </p>
                    </td>
                    <td className="py-4 px-2 text-right font-mono">1</td>
                    <td className="py-4 px-2 text-right font-mono">R{(showReceipt.amount / 1.08).toFixed(2)}</td>
                    <td className="py-4 px-2 text-right font-mono font-semibold">R{(showReceipt.amount / 1.08).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              {/* Total Calculation breakdown */}
              <div className="flex justify-end pt-4">
                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal:</span>
                    <span className="font-mono">R{(showReceipt.amount / 1.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>VAT / Sales Tax (8%):</span>
                    <span className="font-mono">R{(showReceipt.amount - (showReceipt.amount / 1.08)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-navy-dark font-bold text-sm pt-2 border-t border-gray-150">
                    <span>Total Paid (ZAR):</span>
                    <span className="font-mono">R{showReceipt.amount}</span>
                  </div>
                </div>
              </div>

              {/* Payment details / SSL compliance notes */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-150 flex items-center justify-between text-[11px] text-gray-500">
                <div>
                  <p><strong>Payment Instrument:</strong> {showReceipt.paymentMethod}</p>
                  <p className="mt-0.5"><strong>Stripe ID Verification:</strong> {showReceipt.transactionId}</p>
                </div>
                <div className="text-right font-mono uppercase text-[9px] font-bold text-emerald-600">
                  🔒 Transaction Complete
                </div>
              </div>

              {/* Footer advisory */}
              <p className="text-center text-[10px] text-gray-400 font-mono">
                Thank you for your business. For administrative, billing, or audit enquiries, email **brucemabasa4@gmail.com**.
              </p>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

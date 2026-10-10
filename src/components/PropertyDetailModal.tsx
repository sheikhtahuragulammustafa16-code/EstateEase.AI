import React, { useState } from 'react';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Compass,
  Building,
  Calendar,
  ShieldCheck,
  Check,
  Bookmark,
  Scale,
  Send,
  Train,
  GraduationCap,
  Briefcase,
  Trees,
  CheckCircle2,
} from 'lucide-react';
import { Property, InquiryFormData } from '../types/property';
import { formatINR, formatArea, calculateEMI } from '../utils/formatters';

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  isInCompare: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onNavigateToAffordability?: (price: number) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isOpen,
  onClose,
  isSaved,
  isInCompare,
  onToggleSave,
  onToggleCompare,
  onNavigateToAffordability,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryData, setInquiryData] = useState<Partial<InquiryFormData>>({
    fullName: '',
    email: '',
    phone: '',
    buyerType: 'First-time Buyer',
    scheduledVisitDate: '',
    message: '',
  });

  if (!isOpen || !property) return null;

  const emiCalc =
    property.intent === 'buy'
      ? calculateEMI(property.price * 0.8, 8.5, 20)
      : null;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryData.fullName || (!inquiryData.phone && !inquiryData.email)) {
      alert('Please provide your name and phone or email to schedule an inquiry.');
      return;
    }
    setInquirySubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fade-in">
      <div className="relative bg-white rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col my-auto border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>{property.location.locality}</span>
              <span aria-hidden="true">·</span>
              <span>{property.location.city}</span>
              <span aria-hidden="true">·</span>
              <span className="uppercase text-[11px] font-semibold tracking-wider text-emerald-800">
                {property.intent === 'buy' ? 'For Sale' : 'For Rent'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {property.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(property.id)}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isInCompare
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isInCompare ? 'In Compare' : 'Compare'}
              </span>
            </button>
            <button
              onClick={() => onToggleSave(property.id)}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isSaved
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Section 1: Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-slate-900 rounded-xl overflow-hidden shadow-inner">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-mono rounded">
                Photo {activeImageIndex + 1} of {property.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-emerald-600 ring-2 ring-emerald-600/30'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Pricing & Key Metrics Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div>
              <span className="text-xs text-slate-500 block">List Price</span>
              <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                {property.intent === 'rent'
                  ? `${formatINR(property.price)} /month`
                  : formatINR(property.price)}
              </span>
              {property.pricePerSqFt && (
                <span className="text-xs text-slate-500 font-mono block mt-0.5">
                  ₹{property.pricePerSqFt.toLocaleString('en-IN')} per sq.ft
                </span>
              )}
            </div>

            <div>
              <span className="text-xs text-slate-500 block">Configuration</span>
              <span className="text-lg font-bold text-slate-900">
                {property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'Plot'}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                {property.bathrooms} Bathrooms · {property.balconies} Balconies
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-500 block">Carpet Area</span>
              <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {formatArea(property.carpetAreaSqFt)}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5 font-mono">
                Super built-up: {formatArea(property.superBuiltupAreaSqFt)}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-500 block">
                {property.intent === 'buy' ? 'Est. Monthly EMI' : 'Security Deposit'}
              </span>
              {emiCalc ? (
                <>
                  <span className="text-lg font-bold text-emerald-800 font-mono tabular-nums">
                    {formatINR(emiCalc.monthlyEMI)}/mo
                  </span>
                  {onNavigateToAffordability && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToAffordability(property.price);
                      }}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold underline block mt-0.5 cursor-pointer"
                    >
                      Customize Loan Inputs →
                    </button>
                  )}
                </>
              ) : (
                <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                  {formatINR(property.deposit || 0)}
                </span>
              )}
            </div>
          </div>

          {/* Section 3: Detailed Specifications Grid */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Property Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-slate-400 block mb-1">Furnishing Status</span>
                <span className="font-semibold text-slate-800">{property.furnishing}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-slate-400 block mb-1">Vastu / Facing</span>
                <span className="font-semibold text-slate-800">{property.facing} Facing</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-slate-400 block mb-1">Floor Placement</span>
                <span className="font-semibold text-slate-800">
                  {property.floorNumber ? `Floor ${property.floorNumber} of ${property.totalFloors}` : 'Ground + 1'}
                </span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-slate-400 block mb-1">Possession Status</span>
                <span className="font-semibold text-slate-800">{property.possessionYear}</span>
              </div>
            </div>
          </div>

          {/* Section 4: Description & Architectural Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Overview & Description
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {property.description}
              </p>

              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Key Distinctive Highlights
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {property.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Amenities List */}
              <div className="pt-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Verified Society & Living Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {property.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200/60 rounded text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location & Neighborhood Hubs */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Locality & Distance Matrix</span>
              </h3>
              <p className="text-xs text-slate-600">
                {property.location.address}, {property.location.locality}, {property.location.city} - {property.location.pincode}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2 text-xs">
                  <Train className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 block">{property.location.nearbyTransit}</span>
                    <span className="text-slate-500 font-mono">{property.location.transitDistanceKm} km away</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs">
                  <GraduationCap className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 block">{property.location.nearbySchool}</span>
                    <span className="text-slate-500 font-mono">{property.location.schoolDistanceKm} km away</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs">
                  <Briefcase className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 block">{property.location.nearbyHub}</span>
                    <span className="text-slate-500 font-mono">{property.location.hubDistanceKm} km away</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs">
                  <Trees className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 block">{property.location.nearbyPark}</span>
                    <span className="text-slate-500">Immediate neighborhood green</span>
                  </div>
                </div>
              </div>

              {/* RERA Notice */}
              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>RERA Reg: {property.reraId || 'Not registered / NA'}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Sample demo identifier for demonstration. Buyer due diligence recommended prior to purchase.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Direct Inquiry / Site Visit Form */}
          <div className="p-6 bg-slate-900 text-white rounded-xl">
            <h3 className="text-base font-bold text-white mb-1">
              Request Site Visit or Inquiry for {property.title}
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Connect with property representatives. (Demonstration mode: submissions are recorded locally).
            </p>

            {inquirySubmitted ? (
              <div className="p-4 bg-emerald-900/60 border border-emerald-500 rounded-lg text-emerald-200 text-xs">
                <p className="font-bold text-white text-sm mb-1">Inquiry Recorded Successfully!</p>
                <p>
                  Thank you, {inquiryData.fullName}. Your visit request for &ldquo;{property.title}&rdquo; has been registered in the demonstration state.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiryData.fullName || ''}
                    onChange={(e) => setInquiryData({ ...inquiryData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={inquiryData.phone || ''}
                    onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                    placeholder="+91 98200 XXXXX"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={inquiryData.scheduledVisitDate || ''}
                    onChange={(e) => setInquiryData({ ...inquiryData, scheduledVisitDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="sm:col-span-3 flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

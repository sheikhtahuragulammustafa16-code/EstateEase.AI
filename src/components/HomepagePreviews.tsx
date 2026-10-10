import React, { useState } from 'react';
import {
  Calculator,
  Scale,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Bed,
  Maximize2,
  FileText,
  BadgeAlert,
  Percent,
} from 'lucide-react';
import { formatINR, calculateEMI, formatArea } from '../utils/formatters';
import { SAMPLE_PROPERTIES } from '../data/properties';
import { Property } from '../types/property';

interface HomepagePreviewsProps {
  onNavigateToMatch: () => void;
  onNavigateToAffordability: (price?: number) => void;
  onNavigateToCompare: () => void;
  onNavigateToChecklist: () => void;
  onSelectProperty: (property: Property) => void;
}

export const HomepagePreviews: React.FC<HomepagePreviewsProps> = ({
  onNavigateToMatch,
  onNavigateToAffordability,
  onNavigateToCompare,
  onNavigateToChecklist,
  onSelectProperty,
}) => {
  // Live mini EMI calculator slider on homepage
  const [previewPrice, setPreviewPrice] = useState<number>(12000000); // 1.2 Cr
  const previewDownPayment = previewPrice * 0.2;
  const previewLoan = previewPrice * 0.8;
  const previewEMI = calculateEMI(previewLoan, 8.5, 20);

  // 3 sample properties for comparison preview
  const compareSamples = [
    SAMPLE_PROPERTIES[0], // Azure Heights
    SAMPLE_PROPERTIES[1], // Serena Forest Greens
    SAMPLE_PROPERTIES[2], // The Verdant Terraces
  ];

  return (
    <div className="space-y-0">
      {/* 1. Smart Property Match Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deterministic Compatibility Engine</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Smart Property Match: <br />
                <span className="text-emerald-700">Decisions Backed by Your Priorities.</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Most platforms bombard you with unvetted ads. EstateEase AI evaluates each home against your specific family commute, budget buffer, and must-have amenities, computing a clear compatibility score (0-99%) with transparent reasons and trade-offs.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">3 Verified Reasons for Every Match</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Explicit justification: metro reach, school proximity, or carpet area efficiency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <BadgeAlert className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Transparent Compromise Warnings</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Openly flags when a home is slightly above budget or beyond your ideal transit commute.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onNavigateToMatch}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-950 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Launch Smart Property Matchmaker</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Preview Card */}
            <div className="lg:col-span-6 bg-[#FAF9F6] border-2 border-amber-200/60 rounded-3xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-amber-200/50 mb-6">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Interactive Match Preview
                  </span>
                  <div className="text-base font-extrabold text-slate-900">
                    Sample Evaluation: Civil Lines, Nagpur
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-950 text-emerald-300 font-mono font-bold text-xs rounded-full shadow-xs">
                  94% Match
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="text-xs font-bold text-slate-900 mb-2">
                    Why Azure Heights Matches this Profile:
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Under budget by ₹15 Lakhs with safe financial cushion</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>1.2 km from Kasturchand Park Metro Station (walkable)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Verified 3 BHK with 1,450 sq.ft true carpet area</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                  <BadgeAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Flagged Compromise:</strong> Semi-furnished status requires ~₹5L interior finishing budget.
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200/50 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Ready to test with your own criteria?
                </span>
                <button
                  onClick={onNavigateToMatch}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>Test Your Criteria</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Affordability Preview Section (Live Slider) */}
      <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-amber-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs font-bold text-amber-950 uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5 text-amber-700" />
              <span>Real Indian Affordability Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              Know Your Exact Monthly EMI & Out-of-Pocket Cost
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Drag the property price slider below to estimate monthly repayments and upfront acquisition expenditure including stamp duty and registration.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl">
            {/* Slider Row */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Target Property Price:
                </label>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tabular-nums">
                  {formatINR(previewPrice)}
                </div>
              </div>

              <input
                type="range"
                min="3000000"
                max="50000000"
                step="500000"
                value={previewPrice}
                onChange={(e) => setPreviewPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />

              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>₹30 Lakhs</span>
                <span>₹1.5 Crore</span>
                <span>₹3.0 Crore</span>
                <span>₹5.0 Crore</span>
              </div>
            </div>

            {/* 3 Result Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Est. Monthly EMI (8.5%, 20y)
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-950 font-mono tabular-nums block mt-1">
                  {formatINR(previewEMI.monthlyEMI)}
                  <span className="text-xs font-normal text-emerald-800">/mo</span>
                </span>
                <span className="text-[11px] text-emerald-700 mt-1 block">
                  Reducing-balance formula
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                  Down Payment (20%)
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono tabular-nums block mt-1">
                  {formatINR(previewDownPayment, true)}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block font-mono">
                  Loan: {formatINR(previewLoan, true)}
                </span>
              </div>

              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
                  Stamp Duty & Reg. (~7%)
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-950 font-mono tabular-nums block mt-1">
                  {formatINR(previewPrice * 0.07, true)}
                </span>
                <span className="text-[11px] text-amber-800 mt-1 block">
                  Out-of-pocket government fee
                </span>
              </div>
            </div>

            {/* Direct CTA to Full Calculator */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Want to customize interest rate, interior budget, or test zero-interest cases?
              </span>
              <button
                onClick={() => onNavigateToAffordability(previewPrice)}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Open Full Affordability Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Compare Before You Decide Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                <Scale className="w-3.5 h-3.5 text-slate-700" />
                <span>Side-by-Side Matrix</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                Compare Before You Decide
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Benchmarking multiple properties prevents costly remorse. Compare price per square foot, usable carpet area, and transit radius side-by-side.
              </p>
            </div>

            <button
              onClick={onNavigateToCompare}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer"
            >
              <span>Launch Full Comparison Tool</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3-Column Preview Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {compareSamples.map((prop, idx) => (
              <div
                key={prop.id}
                onClick={() => onSelectProperty(prop)}
                className="bg-white border border-slate-200/90 hover:border-amber-300 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-950 text-white rounded">
                      {prop.location.city}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {prop.title}
                  </h3>
                  <div className="text-xs text-slate-500 mb-3">{prop.location.locality}</div>

                  <div className="space-y-2 py-3 border-y border-slate-100 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Price:</span>
                      <span className="font-mono font-bold text-slate-950">{formatINR(prop.price, true)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Rate / Sq.Ft:</span>
                      <span className="font-mono font-semibold text-slate-800">
                        ₹{prop.pricePerSqFt?.toLocaleString('en-IN') || 'NA'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Carpet Area:</span>
                      <span className="font-mono font-semibold text-slate-800">{formatArea(prop.carpetAreaSqFt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Transit Distance:</span>
                      <span className="font-mono font-semibold text-emerald-800">{prop.location.transitDistanceKm} km</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                  <span>View Full Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trust and Transparency Section */}
      <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950 border border-emerald-500/40 rounded-full text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Indian Real Estate Integrity</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  Trust and Transparency: <br />
                  <span className="text-amber-300">RERA Due Diligence for Every Buyer.</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  Purchasing a home in India involves significant capital. Our platform incorporates an actionable 8-point legal due diligence checklist—auditing 30-year mother deed chains, municipal Commencement Certificates (CC), Occupancy Certificates (OC), and bank encumbrances before you commit.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 className="text-xs font-bold text-amber-300 mb-1">Authentic RERA ID Lookup</h4>
                    <p className="text-[11px] text-slate-400">
                      Sample properties display verified RERA formats for MahaRERA and Karnataka RERA compliance review.
                    </p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 className="text-xs font-bold text-emerald-400 mb-1">True Usable Carpet Area</h4>
                    <p className="text-[11px] text-slate-400">
                      We highlight usable square feet rather than inflated super built-up claims.
                    </p>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={onNavigateToChecklist}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-950/40"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Open 8-Point Due Diligence Checklist</span>
                  </button>
                </div>
              </div>

              {/* Right Trust Stats Card */}
              <div className="lg:col-span-5 bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 backdrop-blur-xs">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                    Buyer Protection Protocol
                  </span>
                  <div className="text-lg font-bold text-white mt-1">
                    What EstateEase Checks:
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>30-Year Mother Deed Chain of Ownership</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Municipal Sanctioned Floor Plans & CC</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Occupancy Certificate (OC) Habitation Clearance</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Encumbrance Certificate (Form 15 & Bank NOC)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>CHSL Maintenance Dues & Transfer Sanction</span>
                  </li>
                </ul>

                <p className="text-[11px] text-slate-400 italic pt-2 border-t border-white/10">
                  * Note: Educational demonstration framework. Independent title search by a qualified property lawyer is always recommended.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

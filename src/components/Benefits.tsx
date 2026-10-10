import React from 'react';
import { Calculator, ShieldCheck, Sparkles, Scale, IndianRupee, FileCheck } from 'lucide-react';

interface BenefitsProps {
  onExploreClick: () => void;
  onCalculatorClick: () => void;
}

export const Benefits: React.FC<BenefitsProps> = ({
  onExploreClick,
  onCalculatorClick,
}) => {
  const benefits = [
    {
      title: 'Real Indian Affordability Breakdown',
      description:
        'Standard property portals only quote listing prices. EstateEase calculates stamp duty, registration charges, society maintenance, and reducing-balance home loan EMI.',
      icon: IndianRupee,
    },
    {
      title: 'Transparent Preference Scoring',
      description:
        'No mysterious "black-box AI" claims. Our matching engine explicitly explains the 3 reasons why a home matches your lifestyle and openly flags every compromise.',
      icon: Sparkles,
    },
    {
      title: 'Actionable RERA Due Diligence',
      description:
        'Avoid legal entrapments with our 8-point trust audit checklist, covering 30-year mother deed chains, occupancy certificates (OC), and bank encumbrances.',
      icon: ShieldCheck,
    },
    {
      title: 'Unbiased Comparison Matrix',
      description:
        'Benchmark up to three properties side-by-side on carpet area efficiency, price per sq.ft, and commute distance without biased sponsor rankings.',
      icon: Scale,
    },
    {
      title: 'True Carpet Area Focus',
      description:
        'We highlight verified carpet area rather than misleading super built-up inflation figures, ensuring you pay for actual usable floor space.',
      icon: FileCheck,
    },
    {
      title: 'Custom Financial Stress-Testing',
      description:
        'Simulate changes in interest rates, down-payment ratios, and loan tenures instantly to understand your financial safety cushion before booking.',
      icon: Calculator,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            Why Indian Homebuyers Choose EstateEase
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
            Built for Clarity, Not High-Pressure Sales
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Empowering first-time buyers, growing families, and astute property investors with transparent metrics and disciplined due diligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="p-6 bg-slate-50/60 rounded-xl border border-slate-200/80 flex flex-col justify-start"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mid-Page Call to Action Strip */}
        <div className="mt-16 bg-slate-950 text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
              Start Making Informed Decisions
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Know What You Can Truly Afford Today
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Calculate your exact monthly EMI, test loan tenures, and simulate all Indian acquisition costs in seconds with zero personal details required.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={onCalculatorClick}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm text-center"
            >
              Open Affordability Calculator
            </button>
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer text-center"
            >
              Explore 14+ Properties
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

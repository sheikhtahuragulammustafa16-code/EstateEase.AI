import React from 'react';
import { Search, Sparkles, Scale, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onStepClick: (stepId: string) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStepClick }) => {
  const steps = [
    {
      id: 'explore',
      stepNum: '01',
      title: 'Search Intelligently',
      description:
        'Filter residential properties across Nagpur, Pune, Mumbai, and Bengaluru by exact carpet area, budget limits, and metro transit proximity.',
      icon: Search,
      actionText: 'Browse Catalog',
    },
    {
      id: 'match',
      stepNum: '02',
      title: 'Match With Priorities',
      description:
        'Input your lifestyle criteria—schools, workplace commute, must-have amenities—and let our rules-based engine calculate transparent compatibility scores.',
      icon: Sparkles,
      actionText: 'Start Matchmaker',
    },
    {
      id: 'compare',
      stepNum: '03',
      title: 'Compare Side-by-Side',
      description:
        'Evaluate up to three shortlisted homes on an unbiased matrix of price per square foot, monthly EMI estimates, and floor efficiency.',
      icon: Scale,
      actionText: 'View Matrix',
    },
    {
      id: 'checklist',
      stepNum: '04',
      title: 'Decide With Due Diligence',
      description:
        'Use the 8-point Indian trust checklist to audit title deeds, RERA filings, Occupancy Certificates (OC), and encumbrances before committing capital.',
      icon: CheckCircle2,
      actionText: 'Open Checklist',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            A Proven 4-Step Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight text-balance">
            How EstateEase Works
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Eliminating broker asymmetry with transparent discovery, genuine financial calculations, and verifiable property checklists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {step.stepNum}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
                      <Icon className="w-5 h-5 text-emerald-700" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onStepClick(step.id)}
                    className="text-xs font-bold text-slate-900 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{step.actionText}</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

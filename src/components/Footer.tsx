import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base">
                E
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                EstateEase<span className="text-emerald-400 font-extrabold">.AI</span>
              </span>
            </div>
            <p className="text-sm font-medium text-slate-300">
              Find Your Place. Know Your Worth.
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Empowering Indian home buyers, tenants, and real estate investors with transparent discovery, reducing-balance home loan EMI modeling, and actionable 8-point RERA due diligence.
            </p>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Discovery & Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavClick('explore')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('match')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Smart Preference Matchmaker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('affordability')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Affordability & EMI Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('compare')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Side-by-Side Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('checklist')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  8-Point Trust Checklist
                </button>
              </li>
            </ul>
          </div>

          {/* Cities Covered */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Key Metros Covered
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-300">Nagpur:</span>{' '}
                <span className="text-slate-500">Civil Lines, Dharampeth, MIHAN, Besa</span>
              </li>
              <li>
                <span className="text-slate-300">Pune:</span>{' '}
                <span className="text-slate-500">Baner, Kharadi, Koregaon Park, Kalyani Nagar</span>
              </li>
              <li>
                <span className="text-slate-300">Mumbai:</span>{' '}
                <span className="text-slate-500">Worli, Bandra West, Powai</span>
              </li>
              <li>
                <span className="text-slate-300">Bengaluru:</span>{' '}
                <span className="text-slate-500">Indiranagar, Whitefield, HSR Layout</span>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Regulatory Standards
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>RERA Act 2016 Compliant Information Schema</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                All property samples, registration codes, and price estimates shown are illustrative representations for demonstration.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} EstateEase AI. All rights reserved. Indian PropTech Prototype.
          </div>
          <div className="flex items-center gap-4">
            <span>Built with precision for Indian real estate buyers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

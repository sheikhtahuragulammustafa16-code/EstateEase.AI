import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Square,
  ShieldCheck,
  ShieldAlert,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  FileText,
  Printer,
  CheckCircle2,
} from 'lucide-react';
import { DueDiligenceItem } from '../types/property';
import { INITIAL_CHECKLIST_ITEMS } from '../data/checklist';

const STORAGE_KEY = 'estateease_due_diligence_state_v1';

export const TrustChecklist: React.FC = () => {
  const [items, setItems] = useState<DueDiligenceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load checklist from localStorage', e);
    }
    return INITIAL_CHECKLIST_ITEMS;
  });

  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save checklist to localStorage', e);
    }
  }, [items]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const resetAll = () => {
    if (window.confirm('Reset all due diligence checklist items to unverified state?')) {
      const fresh = INITIAL_CHECKLIST_ITEMS.map((item) => ({ ...item, completed: false }));
      setItems(fresh);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="py-8 sm:py-12 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Buyer Due Diligence Protocol</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
            Indian Real Estate Trust & Verification Checklist
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            A practical 8-point due diligence framework for home buyers in India. Verify clear legal title, municipal approvals, and RERA authenticity before transferring any booking token.
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-slate-500 font-medium">Verification Progress</span>
              <div className="text-xl font-extrabold text-slate-950 font-mono tabular-nums mt-0.5">
                {completedCount} of {items.length} Points Verified ({progressPercent}%)
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetAll}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              style={{ width: `${progressPercent}%` }}
              className={`h-full transition-all duration-300 rounded-full ${
                progressPercent === 100
                  ? 'bg-emerald-600'
                  : progressPercent > 50
                  ? 'bg-emerald-500'
                  : 'bg-slate-900'
              }`}
            />
          </div>

          <p className="text-xs text-slate-500">
            {progressPercent === 100
              ? 'Excellent! You have reviewed all 8 key verification pillars. Ensure a qualified advocate cross-checks original stamp documents.'
              : progressPercent >= 50
              ? 'Good progress. Complete the remaining municipal and title inspections before paying final advance.'
              : 'Begin by checking the 30-year mother deed and project RERA registration.'}
          </p>
        </div>

        {/* 8-Point Items List */}
        <div className="space-y-3 mb-10">
          {items.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-white border rounded-xl transition-all overflow-hidden ${
                  item.completed
                    ? 'border-emerald-200 shadow-2xs bg-emerald-50/10'
                    : 'border-slate-200/90 shadow-2xs'
                }`}
              >
                <div
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex items-start gap-3.5 flex-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItem(item.id);
                      }}
                      className="mt-0.5 text-slate-700 hover:text-emerald-700 cursor-pointer"
                      aria-label={item.completed ? 'Mark unverified' : 'Mark verified'}
                    >
                      {item.completed ? (
                        <CheckSquare className="w-5 h-5 text-emerald-700 fill-emerald-50" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                        <span>Pillar {index + 1}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-500 font-semibold">{item.category}</span>
                      </div>
                      <h3
                        className={`text-sm sm:text-base font-bold mt-0.5 ${
                          item.completed ? 'text-emerald-950 line-through decoration-emerald-600/40' : 'text-slate-900'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId(isExpanded ? null : item.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 cursor-pointer shrink-0"
                    aria-label="Toggle details"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Verification Guide */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-700 border-t border-slate-100 bg-slate-50/50">
                    <div className="p-3.5 bg-white border border-slate-200/80 rounded-lg space-y-2">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                        <FileText className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Actionable Verification Step:</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.verificationGuide}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Clear Disclaimer as strictly required */}
        <div className="p-6 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>Statutory Legal Disclaimer</span>
          </div>
          <p className="leading-relaxed">
            This verification checklist is an educational tool designed for Indian property buyers to understand standard due diligence practices. It <strong>does not</strong> constitute legal certification, official document verification, or title guarantee. It does not replace independent legal advice or a comprehensive title search report prepared by a qualified, practicing real estate lawyer. Always verify physical documents with local authorities and the State RERA portal prior to financial commitment.
          </p>
        </div>
      </div>
    </div>
  );
};

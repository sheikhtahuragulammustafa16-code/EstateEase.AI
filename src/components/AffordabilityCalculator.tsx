import React, { useState, useMemo } from 'react';
import {
  Calculator,
  IndianRupee,
  ShieldAlert,
  Percent,
  Calendar,
  Layers,
  ArrowRight,
  Info,
  RotateCcw,
} from 'lucide-react';
import { formatINR, calculateEMI } from '../utils/formatters';

interface AffordabilityCalculatorProps {
  initialPrice?: number;
  onExploreWithinBudget?: (budget: number) => void;
}

export const AffordabilityCalculator: React.FC<AffordabilityCalculatorProps> = ({
  initialPrice = 12500000, // 1.25 Cr default
  onExploreWithinBudget,
}) => {
  // Inputs
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20); // 20%
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years

  // Additional Indian Purchase Cost Assumptions (Editable)
  const [stampDutyPct, setStampDutyPct] = useState<number>(6.0); // 6% in Maharashtra / Karnataka avg
  const [registrationFeePct, setRegistrationFeePct] = useState<number>(1.0); // 1%
  const [gstPct, setGstPct] = useState<number>(0.0); // 0% for ready OC, 5% for under-construction
  const [interiorBudget, setInteriorBudget] = useState<number>(800000); // ₹8 Lakhs interior/renovation

  // Calculations
  const calculations = useMemo(() => {
    const validPrice = Math.max(0, propertyPrice || 0);
    const validDownPaymentPct = Math.min(100, Math.max(0, downPaymentPct || 0));
    const downPaymentAmount = Math.round((validPrice * validDownPaymentPct) / 100);
    const loanPrincipal = Math.max(0, validPrice - downPaymentAmount);

    const validRate = Math.max(0, interestRate || 0);
    const validTenure = Math.max(1, tenureYears || 1);

    const emiDetails = calculateEMI(loanPrincipal, validRate, validTenure);

    // Additional acquisition costs
    const stampDuty = Math.round((validPrice * stampDutyPct) / 100);
    const registration = Math.round((validPrice * registrationFeePct) / 100);
    const gst = Math.round((validPrice * gstPct) / 100);
    const totalAdditionalCosts = stampDuty + registration + gst + interiorBudget;

    // Total cash outlay needed at booking / possession
    const upfrontCashNeeded = downPaymentAmount + totalAdditionalCosts;
    const totalLifetimeCost = validPrice + emiDetails.totalInterest + totalAdditionalCosts;

    return {
      propertyPrice: validPrice,
      downPaymentAmount,
      loanPrincipal,
      monthlyEMI: emiDetails.monthlyEMI,
      totalInterest: emiDetails.totalInterest,
      totalRepayment: emiDetails.totalPayment,
      stampDuty,
      registration,
      gst,
      totalAdditionalCosts,
      upfrontCashNeeded,
      totalLifetimeCost,
    };
  }, [
    propertyPrice,
    downPaymentPct,
    interestRate,
    tenureYears,
    stampDutyPct,
    registrationFeePct,
    gstPct,
    interiorBudget,
  ]);

  const presetPrices = [
    { label: '₹60 Lakhs', value: 6000000 },
    { label: '₹1.20 Crore', value: 12000000 },
    { label: '₹2.50 Crore', value: 25000000 },
    { label: '₹5.00 Crore', value: 50000000 },
  ];

  return (
    <div className="py-8 sm:py-12 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Reducing-Balance Financial Modeling</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
            Home Affordability & Loan EMI Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Simulate your true monthly obligation and total acquisition expenditure, factoring in Indian stamp duty, registration fees, and interior finishing.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-semibold text-slate-500 mr-1">Quick Benchmarks:</span>
          {presetPrices.map((preset) => (
            <button
              key={preset.value}
              onClick={() => setPropertyPrice(preset.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer font-mono ${
                propertyPrice === preset.value
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                Loan Parameters
              </h2>

              {/* Property Price */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <label className="font-semibold text-slate-700">Property Purchase Price</label>
                  <span className="font-mono text-base font-extrabold text-slate-950 tabular-nums">
                    {formatINR(propertyPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="100000000"
                  step="500000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>₹20 Lakhs</span>
                  <span>₹5.0 Crore</span>
                  <span>₹10.0 Crore</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <label className="font-semibold text-slate-700">
                    Down Payment ({downPaymentPct}%)
                  </label>
                  <span className="font-mono text-sm font-bold text-emerald-800 tabular-nums">
                    {formatINR(calculations.downPaymentAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="5"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>10% (Min)</span>
                  <span>20% (Standard)</span>
                  <span>80%</span>
                </div>
              </div>

              {/* Interest Rate & Tenure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <label className="font-semibold text-slate-700">Annual Interest Rate</label>
                    <span className="font-mono text-sm font-bold text-slate-900 tabular-nums">
                      {interestRate}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="15.0"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>5.0%</span>
                    <span>8.5% (SBI/HDFC avg)</span>
                    <span>15.0%</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <label className="font-semibold text-slate-700">Loan Tenure</label>
                    <span className="font-mono text-sm font-bold text-slate-900 tabular-nums">
                      {tenureYears} Years ({tenureYears * 12} mos)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>5 yrs</span>
                    <span>20 yrs</span>
                    <span>30 yrs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Indian Acquisition Costs Accordion/Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Indian Acquisition Out-of-Pocket Assumptions
                </h3>
                <span className="text-xs font-mono font-bold text-slate-700 tabular-nums">
                  Total Extra: {formatINR(calculations.totalAdditionalCosts, true)}
                </span>
              </div>

              <p className="text-xs text-slate-500">
                Banks finance only up to 80-90% of the agreement value. Stamp duty, registration, and interior decor must be paid out-of-pocket.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Stamp Duty ({stampDutyPct}%)
                  </label>
                  <select
                    value={stampDutyPct}
                    onChange={(e) => setStampDutyPct(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                  >
                    <option value={5.0}>5% (Women buyer concession)</option>
                    <option value={6.0}>6% (Maharashtra/Karnataka)</option>
                    <option value={7.0}>7% (Standard Tier-1)</option>
                  </select>
                  <span className="text-[11px] text-slate-500 font-mono block mt-1">
                    = {formatINR(calculations.stampDuty)}
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Registration ({registrationFeePct}%)
                  </label>
                  <select
                    value={registrationFeePct}
                    onChange={(e) => setRegistrationFeePct(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                  >
                    <option value={1.0}>1% (Cap standard)</option>
                    <option value={0.5}>0.5% (Special)</option>
                  </select>
                  <span className="text-[11px] text-slate-500 font-mono block mt-1">
                    = {formatINR(calculations.registration)}
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    GST Status
                  </label>
                  <select
                    value={gstPct}
                    onChange={(e) => setGstPct(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                  >
                    <option value={0}>0% (Ready OC / Resale)</option>
                    <option value={5}>5% (Under-Construction)</option>
                  </select>
                  <span className="text-[11px] text-slate-500 font-mono block mt-1">
                    = {formatINR(calculations.gst)}
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Interior & Fit-out
                  </label>
                  <input
                    type="number"
                    step="50000"
                    value={interiorBudget}
                    onChange={(e) => setInteriorBudget(Math.max(0, Number(e.target.value)))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                  />
                  <span className="text-[11px] text-slate-500 font-mono block mt-1">
                    = {formatINR(interiorBudget, true)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg space-y-6">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                  Estimated Monthly Commitment
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums mt-1">
                  {formatINR(calculations.monthlyEMI)}
                  <span className="text-base font-normal text-slate-400"> /month</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Calculated using reducing-balance formula for {tenureYears} years at {interestRate}% p.a.
                </div>
              </div>

              {/* Visual Breakdown Strip */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1.5">
                  <span>Principal: {formatINR(calculations.loanPrincipal, true)}</span>
                  <span>Interest: {formatINR(calculations.totalInterest, true)}</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    style={{
                      width: `${
                        calculations.totalRepayment > 0
                          ? (calculations.loanPrincipal / calculations.totalRepayment) * 100
                          : 50
                      }%`,
                    }}
                    className="bg-emerald-500 h-full"
                  />
                  <div
                    style={{
                      width: `${
                        calculations.totalRepayment > 0
                          ? (calculations.totalInterest / calculations.totalRepayment) * 100
                          : 50
                      }%`,
                    }}
                    className="bg-slate-600 h-full"
                  />
                </div>
                <div className="flex items-center gap-4 text-[10px] text-slate-400 mt-1.5 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-xs bg-emerald-500" />
                    <span>Loan Principal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-xs bg-slate-600" />
                    <span>Total Interest</span>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown List */}
              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Loan Amount (Principal):</span>
                  <span className="font-mono font-bold tabular-nums text-white">
                    {formatINR(calculations.loanPrincipal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Interest Payable:</span>
                  <span className="font-mono font-bold tabular-nums text-emerald-400">
                    {formatINR(calculations.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Loan Repayment (P + I):</span>
                  <span className="font-mono font-bold tabular-nums text-white">
                    {formatINR(calculations.totalRepayment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Extra Acquisition Costs:</span>
                  <span className="font-mono font-bold tabular-nums text-amber-300">
                    {formatINR(calculations.totalAdditionalCosts)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800">
                  <span className="font-semibold text-slate-200">Immediate Upfront Cash Required:</span>
                  <span className="font-mono font-black text-sm text-white tabular-nums">
                    {formatINR(calculations.upfrontCashNeeded)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {onExploreWithinBudget && (
                <div className="pt-2">
                  <button
                    onClick={() => onExploreWithinBudget(calculations.propertyPrice)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Explore Homes up to {formatINR(calculations.propertyPrice, true)}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Clear Legal Disclaimer (Mandatory Requirement) */}
            <div className="p-4 bg-amber-50/80 border border-amber-200/90 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold">Important Financial Notice:</span> All calculations and values displayed are estimates based on standard mathematical formulas and do not constitute an official loan offer or banking sanction. Final EMI, processing charges, interest rates, and loan-to-value (LTV) limits are governed by the lending financial institution based on personal credit scores (CIBIL) and property valuation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

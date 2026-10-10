/**
 * Indian Rupee and Real Estate formatting utilities
 */

export function formatINR(amount: number, compact: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }

  const absAmount = Math.abs(amount);

  if (compact) {
    if (absAmount >= 10000000) {
      const cr = amount / 10000000;
      return `₹${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
    }
    if (absAmount >= 100000) {
      const lakh = amount / 100000;
      return `₹${lakh.toFixed(2).replace(/\.00$/, '')} L`;
    }
    if (absAmount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}k`;
    }
  }

  // Standard Indian numbering grouping: 1,00,00,000
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatArea(sqFt: number): string {
  if (!sqFt) return '0 sq.ft';
  return `${new Intl.NumberFormat('en-IN').format(sqFt)} sq.ft`;
}

/**
 * Standard reducing-balance EMI formula
 * E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateEMI(
  principal: number,
  annualInterestRate: number,
  tenureYears: number
): {
  monthlyEMI: number;
  totalInterest: number;
  totalPayment: number;
} {
  const p = Math.max(0, principal);
  const tenureMonths = Math.max(1, tenureYears * 12);
  const rate = Math.max(0, annualInterestRate);

  if (p === 0) {
    return { monthlyEMI: 0, totalInterest: 0, totalPayment: 0 };
  }

  if (rate === 0) {
    const monthlyEMI = Math.round(p / tenureMonths);
    return {
      monthlyEMI,
      totalInterest: 0,
      totalPayment: p,
    };
  }

  const monthlyRate = rate / (12 * 100);
  const compoundFactor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (p * monthlyRate * compoundFactor) / (compoundFactor - 1);

  const roundedEMI = Math.round(emi);
  const totalPayment = Math.round(roundedEMI * tenureMonths);
  const totalInterest = Math.max(0, totalPayment - p);

  return {
    monthlyEMI: roundedEMI,
    totalInterest,
    totalPayment,
  };
}

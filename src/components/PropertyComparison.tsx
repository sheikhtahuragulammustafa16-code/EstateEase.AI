import React, { useState } from 'react';
import {
  Scale,
  X,
  Plus,
  Check,
  Award,
  ArrowRight,
  MapPin,
  Train,
  ShieldCheck,
  Bed,
  Maximize2,
} from 'lucide-react';
import { Property } from '../types/property';
import { formatINR, formatArea, calculateEMI } from '../utils/formatters';

interface PropertyComparisonProps {
  properties: Property[];
  compareIds: string[];
  onRemoveFromCompare: (id: string) => void;
  onAddToCompare: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onNavigateToExplore: () => void;
}

export const PropertyComparison: React.FC<PropertyComparisonProps> = ({
  properties,
  compareIds,
  onRemoveFromCompare,
  onAddToCompare,
  onSelectProperty,
  onNavigateToExplore,
}) => {
  const [priorityFocus, setPriorityFocus] = useState<
    'price' | 'valuePerSqFt' | 'area' | 'transit'
  >('valuePerSqFt');

  const selectedProperties = properties.filter((p) => compareIds.includes(p.id));
  const availableToAdd = properties.filter((p) => !compareIds.includes(p.id));

  // Determine which property excels in which selected priority
  const bestForPrice = [...selectedProperties].sort((a, b) => a.price - b.price)[0];
  const bestForValue = [...selectedProperties].sort(
    (a, b) => (a.pricePerSqFt || Infinity) - (b.pricePerSqFt || Infinity)
  )[0];
  const bestForArea = [...selectedProperties].sort(
    (a, b) => b.carpetAreaSqFt - a.carpetAreaSqFt
  )[0];
  const bestForTransit = [...selectedProperties].sort(
    (a, b) => a.location.transitDistanceKm - b.location.transitDistanceKm
  )[0];

  const getPriorityBadge = (p: Property) => {
    if (selectedProperties.length <= 1) return null;

    if (priorityFocus === 'price' && bestForPrice?.id === p.id) {
      return 'Lowest Total Outlay';
    }
    if (priorityFocus === 'valuePerSqFt' && bestForValue?.id === p.id) {
      return 'Highest Value / Lowest ₹/sq.ft';
    }
    if (priorityFocus === 'area' && bestForArea?.id === p.id) {
      return 'Most Spacious Carpet Area';
    }
    if (priorityFocus === 'transit' && bestForTransit?.id === p.id) {
      return 'Closest to Metro Transit';
    }
    return null;
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800">
              <Scale className="w-3.5 h-3.5 text-emerald-600" />
              <span>Multi-Property Benchmarking</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              Compare Shortlisted Properties
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Analyze up to 3 properties side-by-side across pricing, floor efficiency, transit distances, and legal standing.
            </p>
          </div>

          {/* Priority Focus Switcher */}
          {selectedProperties.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                Highlight priority:
              </span>
              <select
                value={priorityFocus}
                onChange={(e) => setPriorityFocus(e.target.value as any)}
                className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer shadow-2xs"
              >
                <option value="valuePerSqFt">Best Value (₹/sq.ft)</option>
                <option value="price">Lowest List Price</option>
                <option value="area">Maximum Carpet Area</option>
                <option value="transit">Shortest Metro Commute</option>
              </select>
            </div>
          )}
        </div>

        {selectedProperties.length === 0 ? (
          /* Empty state */
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto">
            <Scale className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">
              No properties selected for comparison
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Select up to 3 properties from the catalog to evaluate their pricing, carpet area, and specifications side by side.
            </p>
            <button
              onClick={onNavigateToExplore}
              className="px-5 py-2.5 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Browse Properties to Compare
            </button>
          </div>
        ) : (
          /* Comparison Table / Matrix */
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/60">
                    <th className="p-4 w-48 text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Metric / Property
                    </th>
                    {selectedProperties.map((p) => {
                      const priorityNote = getPriorityBadge(p);
                      return (
                        <th key={p.id} className="p-4 w-72 align-top">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-[11px] font-mono text-slate-400 uppercase">
                              {p.location.city}
                            </span>
                            <button
                              onClick={() => onRemoveFromCompare(p.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-slate-100 cursor-pointer"
                              title="Remove"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div
                            onClick={() => onSelectProperty(p)}
                            className="aspect-[16/10] rounded-lg overflow-hidden bg-slate-100 mb-2 cursor-pointer"
                          >
                            <img
                              src={p.images[0]}
                              alt={p.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover hover:scale-103 transition-transform"
                            />
                          </div>

                          <h3
                            onClick={() => onSelectProperty(p)}
                            className="text-sm font-bold text-slate-900 hover:text-emerald-700 cursor-pointer line-clamp-1"
                          >
                            {p.title}
                          </h3>

                          {priorityNote && (
                            <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <Award className="w-3 h-3 text-emerald-600" />
                              <span>{priorityNote}</span>
                            </div>
                          )}
                        </th>
                      );
                    })}

                    {/* Placeholder Slot if < 3 */}
                    {selectedProperties.length < 3 && (
                      <th className="p-4 w-64 align-middle text-center bg-slate-50/30 border-l border-slate-100">
                        <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl text-center space-y-3">
                          <Plus className="w-6 h-6 text-slate-400 mx-auto" />
                          <div className="text-xs font-semibold text-slate-700">
                            Add Another Property
                          </div>
                          <select
                            onChange={(e) => {
                              if (e.target.value) onAddToCompare(e.target.value);
                            }}
                            defaultValue=""
                            className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                          >
                            <option value="" disabled>
                              Select from catalog...
                            </option>
                            {availableToAdd.map((avail) => (
                              <option key={avail.id} value={avail.id}>
                                {avail.title} ({avail.location.city})
                              </option>
                            ))}
                          </select>
                        </div>
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {/* Row: Price */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-900">Purchase / Rent Price</td>
                    {selectedProperties.map((p) => (
                      <td key={p.id} className="p-4 font-mono font-extrabold text-sm text-slate-950 tabular-nums">
                        {p.intent === 'rent'
                          ? `${formatINR(p.price)} /mo`
                          : formatINR(p.price, true)}
                      </td>
                    ))}
                    {selectedProperties.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Row: Price per sq.ft */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-900">Price per Sq.Ft</td>
                    {selectedProperties.map((p) => (
                      <td key={p.id} className="p-4 font-mono font-bold tabular-nums">
                        {p.pricePerSqFt
                          ? `₹${p.pricePerSqFt.toLocaleString('en-IN')}/sq.ft`
                          : 'Not applicable'}
                      </td>
                    ))}
                    {selectedProperties.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Row: Carpet Area */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-900">Carpet Area</td>
                    {selectedProperties.map((p) => (
                      <td key={p.id} className="p-4 font-mono tabular-nums">
                        <span className="font-bold text-slate-900">{formatArea(p.carpetAreaSqFt)}</span>
                        <span className="text-slate-400 block text-[11px]">
                          (Super: {formatArea(p.superBuiltupAreaSqFt)})
                        </span>
                      </td>
                    ))}
                    {selectedProperties.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Row: Bedrooms & Bathrooms */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-900">Bedrooms & Bathrooms</td>
                    {selectedProperties.map((p) => (
                      <td key={p.id} className="p-4">
                        <span className="font-semibold text-slate-900">
                          {p.bedrooms > 0 ? `${p.bedrooms} BHK` : 'Plot'}
                        </span>
                        <span className="text-slate-500 block text-[11px]">
                          {p.bathrooms} Baths · {p.balconies} Balconies
                        </span>
                      </td>
                    ))}
                    {selectedProperties.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Row: Estimated EMI */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-900">Est. Monthly EMI (8.5%, 20y)</td>
                    {selectedProperties.map((p) => {
                      const emi =
                        p.intent === 'buy'
                          ? calculateEMI(p.price * 0.8, 8.5, 20)
                          : null;
                      return (
                        <td key={p.id} className="p-4 font-mono tabular-nums text-emerald-800 font-bold">
                          {emi ? `${formatINR(emi.monthlyEMI)}/mo` : 'Rental Listing'}
                        </td>
                      );
                    })}
                    {selectedProperties.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Row: Location & Metro Commute */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-900">Metro / Transit Reach</td>
                    {selectedProperties.map((p) => (
                      <td key={p.id} className="p-4">
                        <div className="font-medium text-slate-800">{p.location.locality}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {p.location.transitDistanceKm} km from {p.location.nearbyTransit}
                        </div>
                      </td>
                    ))}
                    {selectedProperties.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Row: RERA Registration */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-900">RERA Registration Status</td>
                    {selectedProperties.map((p) => (
                      <td key={p.id} className="p-4">
                        <span className="flex items-center gap-1 font-semibold text-slate-800">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Registered</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                          {p.reraId}
                        </span>
                      </td>
                    ))}
                    {selectedProperties.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Row: Key Amenities */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-900">Key Amenities</td>
                    {selectedProperties.map((p) => (
                      <td key={p.id} className="p-4">
                        <ul className="space-y-1 text-[11px] text-slate-600">
                          {p.amenities.slice(0, 5).map((a, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span className="truncate">{a}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    {selectedProperties.length < 3 && <td className="p-4 bg-slate-50/20" />}
                  </tr>

                  {/* Row: Action */}
                  <tr className="bg-slate-50/40">
                    <td className="p-4 font-semibold text-slate-900">Full Details</td>
                    {selectedProperties.map((p) => (
                      <td key={p.id} className="p-4">
                        <button
                          onClick={() => onSelectProperty(p)}
                          className="w-full py-2 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center"
                        >
                          View Full Details
                        </button>
                      </td>
                    ))}
                    {selectedProperties.length < 3 && <td className="p-4" />}
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-500 italic text-center">
              * Note: EstateEase AI highlights comparative strengths for your personal criteria, but avoids declaring any property universally superior. Always inspect property documents independently.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Bookmark,
  Scale,
  Train,
  GraduationCap,
  Briefcase,
  Trees,
  Info,
} from 'lucide-react';
import { Property, MatchPreferences, MatchScoreResult } from '../types/property';
import { rankPropertiesByPreferences } from '../utils/matchingEngine';
import { formatINR } from '../utils/formatters';

interface SmartMatchProps {
  properties: Property[];
  savedIds: string[];
  compareIds: string[];
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

const POPULAR_AMENITIES = [
  'Covered Car Parking',
  'Infinity Swimming Pool',
  'Gymnasium & Yoga Deck',
  '24/7 Security & CCTV',
  'EV Charging Bays',
  'Clubhouse',
  'Power Backup 100%',
];

export const SmartMatch: React.FC<SmartMatchProps> = ({
  properties,
  savedIds,
  compareIds,
  onToggleSave,
  onToggleCompare,
  onSelectProperty,
}) => {
  const [preferences, setPreferences] = useState<MatchPreferences>({
    city: 'Nagpur',
    localityPreference: 'Civil Lines',
    intent: 'buy',
    maxBudget: 15000000, // 1.5 Cr
    propertyType: 'Apartment',
    preferredBedrooms: 3,
    furnishing: 'Any',
    mustHaveAmenities: ['Covered Car Parking', '24/7 Security & CCTV'],
    lifestylePriorities: {
      transitProximity: true,
      schoolProximity: true,
      workHubProximity: false,
      greeneryAndParks: true,
      familyFriendly: true,
    },
  });

  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [results, setResults] = useState<MatchScoreResult[]>([]);

  const handleRunMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const evaluated = rankPropertiesByPreferences(properties, preferences);
    setResults(evaluated);
    setHasEvaluated(true);
  };

  const handleReset = () => {
    setHasEvaluated(false);
    setResults([]);
  };

  const toggleAmenity = (amenity: string) => {
    setPreferences((prev) => {
      const exists = prev.mustHaveAmenities.includes(amenity);
      return {
        ...prev,
        mustHaveAmenities: exists
          ? prev.mustHaveAmenities.filter((a) => a !== amenity)
          : [...prev.mustHaveAmenities, amenity],
      };
    });
  };

  const topMatches = results.filter((r) => r.score >= 70 && !r.isAlternative);
  const alternativeMatches = results.filter((r) => r.score < 70 || r.isAlternative);

  return (
    <div className="py-8 sm:py-12 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Rules-Based Recommendation Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
            Smart Property Matchmaker
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Answer a few questions about your budget, location, and daily lifestyle routine.
            We score properties against your criteria with transparent, verifiable explanations.
          </p>
        </div>

        {/* Algorithm Transparency Notice */}
        <div className="mb-8 p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold">Transparent Deterministic Scoring:</span> This engine calculates an objective compatibility score (0-100%) weighting budget tolerance (25%), location (25%), configuration (20%), verified amenities (15%), and transit/lifestyle radius (15%). No black-box or hallucinated metrics.
          </div>
        </div>

        {!hasEvaluated ? (
          /* Form Section */
          <form
            onSubmit={handleRunMatch}
            className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8"
          >
            {/* Step 1: Core Target */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                1. City, Locality & Intent
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Target City *
                  </label>
                  <select
                    value={preferences.city}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        city: e.target.value as MatchPreferences['city'],
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    <option value="Nagpur">Nagpur</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Locality / Area
                  </label>
                  <input
                    type="text"
                    value={preferences.localityPreference}
                    onChange={(e) =>
                      setPreferences({ ...preferences, localityPreference: e.target.value })
                    }
                    placeholder="e.g. Civil Lines, Baner, Indiranagar"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Buying or Renting? *
                  </label>
                  <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setPreferences({ ...preferences, intent: 'buy' })}
                      className={`py-1.5 text-xs font-medium rounded transition-colors cursor-pointer text-center ${
                        preferences.intent === 'buy'
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'text-slate-600'
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferences({ ...preferences, intent: 'rent' })}
                      className={`py-1.5 text-xs font-medium rounded transition-colors cursor-pointer text-center ${
                        preferences.intent === 'rent'
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'text-slate-600'
                      }`}
                    >
                      Rent
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Budget & Property Layout */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                2. Budget Limit & Preferred Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label className="font-semibold text-slate-700">Maximum Budget</label>
                    <span className="font-mono text-emerald-800 font-bold tabular-nums">
                      {formatINR(preferences.maxBudget, true)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={preferences.intent === 'buy' ? 2500000 : 15000}
                    max={preferences.intent === 'buy' ? 60000000 : 150000}
                    step={preferences.intent === 'buy' ? 500000 : 5000}
                    value={preferences.maxBudget}
                    onChange={(e) =>
                      setPreferences({ ...preferences, maxBudget: Number(e.target.value) })
                    }
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>{preferences.intent === 'buy' ? '₹25 L' : '₹15k/mo'}</span>
                    <span>{preferences.intent === 'buy' ? '₹6.0 Cr' : '₹1.5 L/mo'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Property Archetype
                  </label>
                  <select
                    value={preferences.propertyType}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        propertyType: e.target.value as MatchPreferences['propertyType'],
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    <option value="Any">Any Archetype</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Plot">Plot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Target Bedrooms (BHK)
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((bhk) => (
                      <button
                        key={bhk}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, preferredBedrooms: bhk })}
                        className={`flex-1 py-1.5 text-xs rounded-lg transition-colors cursor-pointer text-center ${
                          preferences.preferredBedrooms === bhk
                            ? 'bg-slate-900 text-white font-bold'
                            : 'bg-slate-50 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {bhk} BHK
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Must-Have Amenities */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
                3. Must-Have Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {POPULAR_AMENITIES.map((amenity) => {
                  const active = preferences.mustHaveAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-2.5 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer flex items-center justify-between ${
                        active
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{amenity}</span>
                      {active && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Lifestyle Priorities */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
                4. Lifestyle & Proximity Priorities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={preferences.lifestylePriorities.transitProximity}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        lifestylePriorities: {
                          ...preferences.lifestylePriorities,
                          transitProximity: e.target.checked,
                        },
                      })
                    }
                    className="mt-0.5 rounded text-emerald-600"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-900 block flex items-center gap-1">
                      <Train className="w-3.5 h-3.5 text-emerald-600" />
                      Metro & Transit
                    </span>
                    <span className="text-slate-500 text-[11px]">Under 1.5 km station reach</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={preferences.lifestylePriorities.schoolProximity}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        lifestylePriorities: {
                          ...preferences.lifestylePriorities,
                          schoolProximity: e.target.checked,
                        },
                      })
                    }
                    className="mt-0.5 rounded text-emerald-600"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-900 block flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                      Top Schools
                    </span>
                    <span className="text-slate-500 text-[11px]">Under 2.0 km school reach</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={preferences.lifestylePriorities.workHubProximity}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        lifestylePriorities: {
                          ...preferences.lifestylePriorities,
                          workHubProximity: e.target.checked,
                        },
                      })
                    }
                    className="mt-0.5 rounded text-emerald-600"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-900 block flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                      Tech & SEZ Hub
                    </span>
                    <span className="text-slate-500 text-[11px]">Under 4.0 km workplace reach</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={preferences.lifestylePriorities.greeneryAndParks}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        lifestylePriorities: {
                          ...preferences.lifestylePriorities,
                          greeneryAndParks: e.target.checked,
                        },
                      })
                    }
                    className="mt-0.5 rounded text-emerald-600"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-900 block flex items-center gap-1">
                      <Trees className="w-3.5 h-3.5 text-emerald-600" />
                      Greenery & Parks
                    </span>
                    <span className="text-slate-500 text-[11px]">Promenade or botanical park reach</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-slate-950 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Calculate Compatible Matches</span>
              </button>
            </div>
          </form>
        ) : (
          /* Match Results View */
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-xs text-slate-500">Evaluated Preferences:</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  {preferences.city} · {preferences.intent === 'buy' ? 'Buying' : 'Renting'} · Up to {formatINR(preferences.maxBudget, true)} · {preferences.preferredBedrooms} BHK
                </div>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 rounded-lg cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Modify Preferences</span>
              </button>
            </div>

            {/* Top Matches Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Top Recommended Properties ({topMatches.length})
                </h2>
                <span className="text-xs text-emerald-800 font-semibold">
                  Score &ge; 70% Match
                </span>
              </div>

              {topMatches.length === 0 ? (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-900 text-xs">
                  <p className="font-bold text-sm mb-1">No property satisfied 100% of these parameters</p>
                  <p>
                    Below are the closest alternatives that match the majority of your lifestyle requirements with minor trade-offs.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {topMatches.map((res) => (
                    <div
                      key={res.property.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-all flex flex-col md:flex-row gap-6"
                    >
                      {/* Left: Image with score badge */}
                      <div className="relative md:w-72 aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-slate-100">
                        <img
                          src={res.property.images[0]}
                          alt={res.property.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/85 backdrop-blur-xs text-white text-xs font-bold rounded">
                          {res.score}% Match Score
                        </div>
                      </div>

                      {/* Right: Detailed Match Justifications */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-baseline justify-between gap-4">
                            <div>
                              <div className="text-xs text-slate-500 font-medium">
                                {res.property.location.locality}, {res.property.location.city}
                              </div>
                              <h3
                                onClick={() => onSelectProperty(res.property)}
                                className="text-lg font-bold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                              >
                                {res.property.title}
                              </h3>
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-extrabold text-slate-950 font-mono tabular-nums block">
                                {res.property.intent === 'rent'
                                  ? `${formatINR(res.property.price)} /mo`
                                  : formatINR(res.property.price, true)}
                              </span>
                              <span className="text-[11px] text-slate-500 font-mono">
                                {res.property.bedrooms > 0 ? `${res.property.bedrooms} BHK` : 'Plot'} · {res.property.carpetAreaSqFt} sq.ft
                              </span>
                            </div>
                          </div>

                          {/* 3 Verified Reasons */}
                          <div className="mt-4 space-y-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Why this property matches your criteria:
                            </span>
                            <ul className="space-y-1 text-xs text-slate-700">
                              {res.reasons.map((reason, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Trade-offs & Compromises */}
                          {res.compromises.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-slate-100">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                                Important trade-offs to consider:
                              </span>
                              <ul className="space-y-1 text-xs text-slate-600 mt-1">
                                {res.compromises.map((comp, i) => (
                                  <li key={i} className="flex items-start gap-2 text-amber-800">
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                    <span>{comp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => onSelectProperty(res.property)}
                            className="text-xs font-bold text-slate-900 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                          >
                            <span>Inspect Full Specifications</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onToggleCompare(res.property.id)}
                              className={`px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                                compareIds.includes(res.property.id)
                                  ? 'bg-emerald-800 text-white border-emerald-800'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              <Scale className="w-3.5 h-3.5 inline mr-1" />
                              <span>{compareIds.includes(res.property.id) ? 'In Compare' : 'Compare'}</span>
                            </button>
                            <button
                              onClick={() => onToggleSave(res.property.id)}
                              className={`px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                                savedIds.includes(res.property.id)
                                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              <Bookmark className="w-3.5 h-3.5 inline mr-1" />
                              <span>{savedIds.includes(res.property.id) ? 'Saved' : 'Save'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Closest Alternatives Section */}
            {alternativeMatches.length > 0 && (
              <div className="pt-6 border-t border-slate-200">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-slate-900">
                    Closest Alternatives ({alternativeMatches.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Properties requiring slight budget flexibility or nearby locality compromises.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {alternativeMatches.slice(0, 3).map((res) => (
                    <div
                      key={res.property.id}
                      onClick={() => onSelectProperty(res.property)}
                      className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-100 mb-3">
                          <img
                            src={res.property.images[0]}
                            alt={res.property.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-2 left-2 text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-900/80 text-slate-200 rounded">
                            {res.score}% Compatibility
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-500 font-medium">
                          {res.property.location.locality}, {res.property.location.city}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                          {res.property.title}
                        </h4>

                        <div className="text-sm font-extrabold text-slate-950 font-mono mt-1">
                          {res.property.intent === 'rent'
                            ? `${formatINR(res.property.price)} /mo`
                            : formatINR(res.property.price, true)}
                        </div>

                        {res.compromises.length > 0 && (
                          <div className="text-[11px] text-amber-800 mt-2 line-clamp-2">
                            Compromise: {res.compromises[0]}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold text-emerald-800">
                        View Alternative Details →
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

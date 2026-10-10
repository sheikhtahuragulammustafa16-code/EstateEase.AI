import React, { useState } from 'react';
import { Bookmark, Scale, MapPin, Bed, Bath, Maximize2, ShieldCheck, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Property } from '../types/property';
import { formatINR, formatArea, calculateEMI } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  isInCompare: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelect: (property: Property) => void;
  matchScore?: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved,
  isInCompare,
  onToggleSave,
  onToggleCompare,
  onSelect,
  matchScore,
}) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  // Quick 20-yr EMI estimate for buy properties
  const emiInfo =
    property.intent === 'buy'
      ? calculateEMI(property.price * 0.8, 8.5, 20)
      : null;

  const isBestMatch = (matchScore !== undefined && matchScore >= 85) || property.isFeatured;

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 hover:border-amber-300/60 shadow-sm hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Visual Image Slot */}
      <div
        className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
        onClick={() => onSelect(property)}
      >
        {imageLoaded && property.images[0] ? (
          <img
            src={property.images[0]}
            alt={property.title}
            referrerPolicy="no-referrer"
            onError={() => setImageLoaded(false)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 text-center">
            <MapPin className="w-8 h-8 mb-2 stroke-1 text-slate-400" />
            <span className="text-xs font-semibold text-slate-600">{property.title}</span>
            <span className="text-[11px] text-slate-400 mt-1">
              {property.location.locality}, {property.location.city}
            </span>
          </div>
        )}

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges Strip */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-slate-950/90 text-white backdrop-blur-md rounded-md shadow-xs">
              {property.intent === 'buy' ? 'For Sale' : 'For Rent'}
            </span>
            {isBestMatch && (
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 bg-amber-500 text-slate-950 backdrop-blur-md rounded-md shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-slate-950" />
                <span>{matchScore ? `${matchScore}% Match` : 'Featured'}</span>
              </span>
            )}
          </div>

          {/* Quick Bookmark Action */}
          <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onToggleSave(property.id)}
              title={isSaved ? 'Remove from saved' : 'Save property'}
              aria-label="Toggle save property"
              className={`p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer shadow-sm ${
                isSaved
                  ? 'bg-rose-600 text-white scale-105'
                  : 'bg-white/90 text-slate-700 hover:bg-white hover:text-rose-600 hover:scale-105'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Image Overlay Strip */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{property.location.locality}, {property.location.city}</span>
          </div>
          {property.isReraRegistered && (
            <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 rounded backdrop-blur-xs flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>RERA Reg</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Unboxed Metadata Header */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1.5">
            <span className="text-slate-800 font-semibold">{property.type}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{property.furnishing}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{property.facing} Facing</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(property)}
            className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1 leading-snug"
          >
            {property.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 mb-3.5">
            {property.tagline}
          </p>

          {/* Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 mb-3 bg-[#FAF9F6] border border-amber-100/80 rounded-xl text-xs text-slate-700">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="font-semibold text-slate-800">
                {property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'Plot'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'NA'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-mono tabular-nums truncate">{formatArea(property.carpetAreaSqFt)}</span>
            </div>
          </div>
        </div>

        {/* Pricing & EMI Information */}
        <div className="pt-1">
          <div className="flex items-baseline justify-between mb-3.5">
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-950 font-mono tabular-nums tracking-tight">
                {property.intent === 'rent'
                  ? `${formatINR(property.price)} /mo`
                  : formatINR(property.price, true)}
              </div>
              {property.pricePerSqFt && (
                <div className="text-[11px] text-slate-500 font-mono tabular-nums">
                  ₹{property.pricePerSqFt.toLocaleString('en-IN')}/sq.ft carpet
                </div>
              )}
            </div>

            {emiInfo && (
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Est. EMI</div>
                <div className="text-xs font-bold text-emerald-800 font-mono tabular-nums">
                  {formatINR(emiInfo.monthlyEMI)}/mo
                </div>
              </div>
            )}
          </div>

          {/* Card Action Buttons (Clear, Explicit & Working) */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(property.id)}
              className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                isInCompare
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Scale className="w-3.5 h-3.5 shrink-0" />
              <span>{isInCompare ? 'In Compare' : 'Compare'}</span>
            </button>

            <button
              onClick={() => onSelect(property)}
              className="flex-1 py-2 px-3 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-xs"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

import React from 'react';
import { Bookmark, Trash2, ArrowRight, Scale, ExternalLink } from 'lucide-react';
import { Property } from '../types/property';
import { PropertyCard } from './PropertyCard';

interface SavedPropertiesProps {
  properties: Property[];
  savedIds: string[];
  compareIds: string[];
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onClearAllSaved: () => void;
  onNavigateToExplore: () => void;
}

export const SavedProperties: React.FC<SavedPropertiesProps> = ({
  properties,
  savedIds,
  compareIds,
  onToggleSave,
  onToggleCompare,
  onSelectProperty,
  onClearAllSaved,
  onNavigateToExplore,
}) => {
  const savedList = properties.filter((p) => savedIds.includes(p.id));

  return (
    <div className="py-8 sm:py-12 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800">
              <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
              <span>Personal Shortlist</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              Saved Properties ({savedList.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Your bookmarked residences saved securely in your local browser storage.
            </p>
          </div>

          {savedList.length > 0 && (
            <button
              onClick={onClearAllSaved}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Shortlist</span>
            </button>
          )}
        </div>

        {savedList.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto">
            <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">
              Your shortlist is currently empty
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Bookmark homes while browsing our catalog or running smart matchmaker to compare them later.
            </p>
            <button
              onClick={onNavigateToExplore}
              className="px-5 py-2.5 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Browse Available Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedList.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={true}
                isInCompare={compareIds.includes(property.id)}
                onToggleSave={onToggleSave}
                onToggleCompare={onToggleCompare}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

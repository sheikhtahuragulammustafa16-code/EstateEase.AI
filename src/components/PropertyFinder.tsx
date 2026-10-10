import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  MapPin,
  Check,
  Building,
  Bed,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { Property, FilterState } from '../types/property';
import { PropertyCard } from './PropertyCard';
import { formatINR, formatArea } from '../utils/formatters';

interface PropertyFinderProps {
  properties: Property[];
  savedIds: string[];
  compareIds: string[];
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  initialFilters?: Partial<FilterState>;
}

const COMMON_AMENITIES = [
  'Covered Car Parking',
  'Infinity Swimming Pool',
  'Gymnasium & Yoga Deck',
  '24/7 Security & CCTV',
  'EV Charging Bays',
  'Children Play Area',
  'Power Backup 100%',
  'Clubhouse',
];

export const PropertyFinder: React.FC<PropertyFinderProps> = ({
  properties,
  savedIds,
  compareIds,
  onToggleSave,
  onToggleCompare,
  onSelectProperty,
  initialFilters,
}) => {
  const defaultFilters: FilterState = {
    searchQuery: '',
    city: 'all',
    intent: 'all',
    propertyType: 'all',
    minPrice: 0,
    maxPrice: 100000000, // 10 Cr
    bedrooms: 'all',
    minArea: 0,
    maxArea: 5000,
    furnishing: 'all',
    amenities: [],
    sortBy: 'recommended',
  };

  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    ...initialFilters,
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  // Filter & Sort logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Search query (title, locality, description)
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchLocality = p.location.locality.toLowerCase().includes(q);
          const matchCity = p.location.city.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchTitle && !matchLocality && !matchCity && !matchDesc) return false;
        }

        // City
        if (filters.city !== 'all' && p.location.city.toLowerCase() !== filters.city.toLowerCase()) {
          return false;
        }

        // Intent (buy / rent)
        if (filters.intent !== 'all' && p.intent !== filters.intent) {
          return false;
        }

        // Property Type
        if (filters.propertyType !== 'all' && p.type.toLowerCase() !== filters.propertyType.toLowerCase()) {
          return false;
        }

        // Bedrooms
        if (filters.bedrooms !== 'all') {
          if (filters.bedrooms === 4) {
            if (p.bedrooms < 4) return false;
          } else if (p.bedrooms !== filters.bedrooms) {
            return false;
          }
        }

        // Price range
        if (filters.minPrice > 0 && p.price < filters.minPrice) return false;
        if (filters.maxPrice < 100000000 && p.price > filters.maxPrice) return false;

        // Area (sq.ft)
        if (filters.minArea > 0 && p.carpetAreaSqFt < filters.minArea) return false;
        if (filters.maxArea < 5000 && p.carpetAreaSqFt > filters.maxArea) return false;

        // Furnishing
        if (filters.furnishing !== 'all' && p.furnishing.toLowerCase() !== filters.furnishing.toLowerCase()) {
          return false;
        }

        // Amenities
        if (filters.amenities.length > 0) {
          const hasAllSelected = filters.amenities.every((a) =>
            p.amenities.some((propAmenity) => propAmenity.toLowerCase().includes(a.toLowerCase()))
          );
          if (!hasAllSelected) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'area-desc') return b.carpetAreaSqFt - a.carpetAreaSqFt;
        // Default 'recommended'
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [properties, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.city !== 'all') count++;
    if (filters.intent !== 'all') count++;
    if (filters.propertyType !== 'all') count++;
    if (filters.bedrooms !== 'all') count++;
    if (filters.furnishing !== 'all') count++;
    if (filters.minPrice > 0 || filters.maxPrice < 100000000) count++;
    if (filters.minArea > 0 || filters.maxArea < 5000) count++;
    if (filters.amenities.length > 0) count += filters.amenities.length;
    return count;
  }, [filters]);

  return (
    <div className="py-8 sm:py-12 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                Property Discovery Catalog
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
                Explore Available Properties
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Showing {filteredProperties.length} of {properties.length} sample residential listings across 4 Indian growth hubs.
              </p>
            </div>

            {/* View Mode & Active Filter Reset */}
            <div className="flex items-center gap-3">
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg cursor-pointer transition-colors shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Filters ({activeFilterCount})</span>
                </button>
              )}

              {/* Grid / List switch */}
              <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg shadow-2xs">
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>
            </div>
          </div>

          {/* Quick Search & Sort Bar */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            {/* Search Query Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Search by neighborhood, project name, or landmarks (e.g. Civil Lines, Indiranagar, Baner)..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
                className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value="recommended">Recommended & Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Area: Largest Sq.Ft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout with Sidebar Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar / Mobile Modal */}
          <aside
            className={`lg:block ${
              mobileFilterOpen
                ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto block'
                : 'hidden'
            } lg:relative lg:p-0 lg:bg-transparent lg:overflow-visible`}
          >
            {mobileFilterOpen && (
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 lg:hidden">
                <span className="font-bold text-base text-slate-900">Filter Discovery</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="px-3 py-1 text-xs bg-slate-900 text-white rounded font-medium cursor-pointer"
                >
                  Apply & Close
                </button>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Filter Criteria
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-emerald-700 hover:underline font-semibold cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Target Indian City
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['all', 'Nagpur', 'Pune', 'Mumbai', 'Bengaluru'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setFilters({ ...filters, city: c })}
                      className={`px-2.5 py-1.5 text-xs rounded-md text-left transition-colors cursor-pointer capitalize ${
                        filters.city.toLowerCase() === c.toLowerCase()
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {c === 'all' ? 'All Cities' : c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Intent (Buy / Rent) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Transaction Mode
                </label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'buy', label: 'Buy' },
                    { id: 'rent', label: 'Rent' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setFilters({ ...filters, intent: item.id as FilterState['intent'] })}
                      className={`py-1 text-xs font-medium rounded transition-colors cursor-pointer text-center ${
                        filters.intent === item.id
                          ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Property Archetype
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Independent House">Independent House</option>
                  <option value="Plot">Plot</option>
                </select>
              </div>

              {/* Bedrooms (BHK) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Bedrooms (BHK)
                </label>
                <div className="flex items-center gap-1">
                  {[
                    { id: 'all', label: 'Any' },
                    { id: 1, label: '1' },
                    { id: 2, label: '2' },
                    { id: 3, label: '3' },
                    { id: 4, label: '4+' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setFilters({ ...filters, bedrooms: item.id as FilterState['bedrooms'] })}
                      className={`flex-1 py-1.5 text-xs rounded-md transition-colors cursor-pointer text-center ${
                        filters.bedrooms === item.id
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Filter */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-700">Max Budget</span>
                  <span className="font-mono text-emerald-800 font-bold tabular-nums">
                    {filters.maxPrice >= 100000000 ? 'No Max' : formatINR(filters.maxPrice, true)}
                  </span>
                </div>
                <input
                  type="range"
                  min="30000"
                  max="100000000"
                  step="500000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>₹30k</span>
                  <span>₹5 Cr</span>
                  <span>₹10 Cr+</span>
                </div>
              </div>

              {/* Area Filter */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-700">Min Carpet Area</span>
                  <span className="font-mono text-slate-700 font-bold tabular-nums">
                    {filters.minArea === 0 ? 'Any' : `${filters.minArea} sq.ft`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3500"
                  step="100"
                  value={filters.minArea}
                  onChange={(e) => setFilters({ ...filters, minArea: Number(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Furnishing Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Furnishing
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {['all', 'Furnished', 'Semi-Furnished', 'Unfurnished'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilters({ ...filters, furnishing: f })}
                      className={`px-2 py-1.5 rounded-md text-left transition-colors cursor-pointer ${
                        filters.furnishing.toLowerCase() === f.toLowerCase()
                          ? 'bg-slate-900 text-white font-medium'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {f === 'all' ? 'Any' : f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities Checklist */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Amenities
                </label>
                <div className="space-y-1.5">
                  {COMMON_AMENITIES.map((amenity) => {
                    const checked = filters.amenities.includes(amenity);
                    return (
                      <label
                        key={amenity}
                        className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className="truncate">{amenity}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Properties Grid / List */}
          <main className="lg:col-span-3">
            {filteredProperties.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto">
                <Building className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900">
                  No properties matched your active criteria
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  Try broadening your budget parameters or clearing specific amenities to see more sample listings.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Clear All Applied Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isSaved={savedIds.includes(property.id)}
                    isInCompare={compareIds.includes(property.id)}
                    onToggleSave={onToggleSave}
                    onToggleCompare={onToggleCompare}
                    onSelect={onSelectProperty}
                  />
                ))}
              </div>
            ) : (
              /* List View Mode */
              <div className="space-y-4">
                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    onClick={() => onSelectProperty(property)}
                    className="group bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row gap-5 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="relative md:w-64 aspect-[4/3] rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-900 text-white rounded">
                        {property.intent === 'buy' ? 'For Sale' : 'For Rent'}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                          <span>{property.location.locality}</span>
                          <span aria-hidden="true">·</span>
                          <span>{property.location.city}</span>
                          <span aria-hidden="true">·</span>
                          <span>{property.type}</span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {property.title}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 mb-3">
                          {property.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700">
                          <span className="font-semibold">{property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'Plot'}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{formatArea(property.carpetAreaSqFt)} carpet</span>
                          <span aria-hidden="true">·</span>
                          <span>{property.furnishing}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-xl font-extrabold text-slate-950 font-mono tabular-nums">
                            {property.intent === 'rent'
                              ? `${formatINR(property.price)} /mo`
                              : formatINR(property.price, true)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => onToggleCompare(property.id)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                              compareIds.includes(property.id)
                                ? 'bg-emerald-800 text-white border-emerald-800'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            Compare
                          </button>
                          <button
                            onClick={() => onToggleSave(property.id)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                              savedIds.includes(property.id)
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {savedIds.includes(property.id) ? 'Saved' : 'Save'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

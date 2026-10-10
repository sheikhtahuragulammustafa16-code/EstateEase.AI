/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { PropertyFinder } from './components/PropertyFinder';
import { SmartMatch } from './components/SmartMatch';
import { AffordabilityCalculator } from './components/AffordabilityCalculator';
import { PropertyComparison } from './components/PropertyComparison';
import { TrustChecklist } from './components/TrustChecklist';
import { SavedProperties } from './components/SavedProperties';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { Footer } from './components/Footer';
import { PropertyCard } from './components/PropertyCard';
import { ExploreLifestyle } from './components/ExploreLifestyle';
import { HomepagePreviews } from './components/HomepagePreviews';
import { SAMPLE_PROPERTIES } from './data/properties';
import { Property, FilterState } from './types/property';
import { ArrowRight, Sparkles, Building2, SlidersHorizontal } from 'lucide-react';

const SAVED_STORAGE_KEY = 'estateease_saved_ids_v1';
const COMPARE_STORAGE_KEY = 'estateease_compare_ids_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [preselectedInquiryId, setPreselectedInquiryId] = useState<string | undefined>(undefined);

  // Filter pass-through state from hero to finder
  const [finderFilters, setFinderFilters] = useState<Partial<FilterState>>({});
  const [affordabilityPrice, setAffordabilityPrice] = useState<number>(13500000);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // LocalStorage saved items
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['prop-101', 'prop-103'];
    } catch {
      return ['prop-101', 'prop-103'];
    }
  });

  // LocalStorage compare items
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(COMPARE_STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['prop-101', 'prop-102'];
    } catch {
      return ['prop-101', 'prop-102'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(compareIds));
    } catch (e) {
      console.warn('LocalStorage compare save failed', e);
    }
  }, [compareIds]);

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from saved shortlist');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to personal shortlist');
        return [...prev, id];
      }
    });
  };

  const handleToggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from comparison table');
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 3) {
          showToast('Comparison limit reached (max 3 properties). Remove one first.');
          return prev;
        }
        showToast(`Added to comparison table (${prev.length + 1}/3)`);
        return [...prev, id];
      }
    });
  };

  const handleHeroSearch = (filters: {
    city: string;
    intent: 'buy' | 'rent';
    propertyType: string;
    maxBudget: number;
  }) => {
    setFinderFilters({
      city: filters.city,
      intent: filters.intent,
      propertyType: filters.propertyType,
      maxPrice: filters.maxBudget,
    });
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiry = (propertyId?: string) => {
    setPreselectedInquiryId(propertyId);
    setIsInquiryOpen(true);
  };

  const [featuredCategory, setFeaturedCategory] = useState<string>('all');

  const filteredFeaturedProperties = SAMPLE_PROPERTIES.filter((p) => {
    if (featuredCategory === 'all') return p.isFeatured;
    if (featuredCategory === 'villas') return p.type === 'Villa' || p.type === 'Independent House';
    return p.location.city.toLowerCase() === featuredCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl border border-slate-800 flex items-center gap-2 animate-bounce-subtle">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIds.length}
        compareCount={compareIds.length}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Tab Router Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <HomeHero
              onSearch={handleHeroSearch}
              onNavigateToMatch={() => {
                setActiveTab('match');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Featured Properties Section */}
            <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                      Curated Opportunities
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1 tracking-tight">
                      Featured Indian Residences
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Handpicked sample developments with clear titles, verified RERA certificates, and prime connectivity.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('explore');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-emerald-700 cursor-pointer"
                  >
                    <span>View All 14 Properties</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Category Pills Filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
                  {[
                    { id: 'all', label: 'All Featured' },
                    { id: 'Nagpur', label: 'Nagpur' },
                    { id: 'Pune', label: 'Pune' },
                    { id: 'Mumbai', label: 'Mumbai' },
                    { id: 'Bengaluru', label: 'Bengaluru' },
                    { id: 'villas', label: 'Villas & Bungalows' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFeaturedCategory(cat.id)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap border ${
                        featuredCategory === cat.id
                          ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-950'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredFeaturedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isSaved={savedIds.includes(property.id)}
                      isInCompare={compareIds.includes(property.id)}
                      onToggleSave={handleToggleSave}
                      onToggleCompare={handleToggleCompare}
                      onSelect={(p) => setSelectedProperty(p)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Explore by Lifestyle Section */}
            <ExploreLifestyle
              onSelectLifestyle={(filters) => {
                setFinderFilters(filters);
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Visual Homepage Previews (Smart Match, Affordability live simulator, Compare preview, Trust) */}
            <HomepagePreviews
              onNavigateToMatch={() => {
                setActiveTab('match');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToAffordability={(price) => {
                if (price) setAffordabilityPrice(price);
                setActiveTab('affordability');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToCompare={() => {
                setActiveTab('compare');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToChecklist={() => {
                setActiveTab('checklist');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectProperty={(p) => setSelectedProperty(p)}
            />

            {/* How It Works Section */}
            <HowItWorks
              onStepClick={(stepId) => {
                setActiveTab(stepId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Key Benefits Section */}
            <Benefits
              onExploreClick={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCalculatorClick={() => {
                setActiveTab('affordability');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activeTab === 'explore' && (
          <PropertyFinder
            properties={SAMPLE_PROPERTIES}
            savedIds={savedIds}
            compareIds={compareIds}
            onToggleSave={handleToggleSave}
            onToggleCompare={handleToggleCompare}
            onSelectProperty={(p) => setSelectedProperty(p)}
            initialFilters={finderFilters}
          />
        )}

        {activeTab === 'match' && (
          <SmartMatch
            properties={SAMPLE_PROPERTIES}
            savedIds={savedIds}
            compareIds={compareIds}
            onToggleSave={handleToggleSave}
            onToggleCompare={handleToggleCompare}
            onSelectProperty={(p) => setSelectedProperty(p)}
          />
        )}

        {activeTab === 'affordability' && (
          <AffordabilityCalculator
            initialPrice={affordabilityPrice}
            onExploreWithinBudget={(budget) => {
              setFinderFilters({ maxPrice: budget });
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'compare' && (
          <PropertyComparison
            properties={SAMPLE_PROPERTIES}
            compareIds={compareIds}
            onRemoveFromCompare={(id) => handleToggleCompare(id)}
            onAddToCompare={(id) => handleToggleCompare(id)}
            onSelectProperty={(p) => setSelectedProperty(p)}
            onNavigateToExplore={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'checklist' && <TrustChecklist />}

        {activeTab === 'saved' && (
          <SavedProperties
            properties={SAMPLE_PROPERTIES}
            savedIds={savedIds}
            compareIds={compareIds}
            onToggleSave={handleToggleSave}
            onToggleCompare={handleToggleCompare}
            onSelectProperty={(p) => setSelectedProperty(p)}
            onClearAllSaved={() => {
              if (window.confirm('Clear all saved properties?')) {
                setSavedIds([]);
              }
            }}
            onNavigateToExplore={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Property Details Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isSaved={selectedProperty ? savedIds.includes(selectedProperty.id) : false}
        isInCompare={selectedProperty ? compareIds.includes(selectedProperty.id) : false}
        onToggleSave={handleToggleSave}
        onToggleCompare={handleToggleCompare}
        onNavigateToAffordability={(price) => {
          setAffordabilityPrice(price);
          setActiveTab('affordability');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* General Demo Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        properties={SAMPLE_PROPERTIES}
        preselectedPropertyId={preselectedInquiryId}
      />

      {/* Footer */}
      <Footer onNavClick={(tabId) => {
        setActiveTab(tabId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}

import React, { useState } from 'react';
import { Search, MapPin, Building2, Banknote, ShieldCheck, Sparkles, Star, ChevronRight } from 'lucide-react';
import penthouseInteriorImg from '../assets/images/luxury_indian_penthouse_interior_1791614966768.jpg';
import villaSunsetImg from '../assets/images/modern_villa_facade_sunset_1791614978393.jpg';
import heroVillaImg from '../assets/images/hero_modern_villa_1791613339682.jpg';

interface HomeHeroProps {
  onSearch: (filters: {
    city: string;
    intent: 'buy' | 'rent';
    propertyType: string;
    maxBudget: number;
  }) => void;
  onNavigateToMatch: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onSearch, onNavigateToMatch }) => {
  const [city, setCity] = useState('Nagpur');
  const [intent, setIntent] = useState<'buy' | 'rent'>('buy');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [budgetTier, setBudgetTier] = useState<number>(15000000); // 1.5 Cr default

  // Hero showcase image toggle
  const [activeShowcase, setActiveShowcase] = useState<number>(0);
  const showcaseImages = [
    {
      src: villaSunsetImg,
      title: 'Serena Forest Greens Villa',
      location: 'Baner Hills, Pune',
      tag: 'Sunset Bungalow Enclave',
    },
    {
      src: heroVillaImg,
      title: 'Azure Heights Residences',
      location: 'Civil Lines, Nagpur',
      tag: 'Lake View High-Rise',
    },
    {
      src: penthouseInteriorImg,
      title: 'The Baycrest Penthouse',
      location: 'Worli Seaface, Mumbai',
      tag: 'Double-Height Sea Suite',
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      city,
      intent,
      propertyType,
      maxBudget: budgetTier,
    });
  };

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] bg-slate-950 text-white overflow-hidden flex flex-col justify-between">
      {/* High-Resolution Luxury Architectural Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={penthouseInteriorImg}
          alt="Modern Indian Luxury Architecture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-102 filter brightness-[0.45] contrast-[1.05]"
        />
        {/* Multi-layered Soft Dark & Amber Gradient Overlay for absolute text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
        {/* Subtle decorative warm gold radial glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Value Proposition & Search Panel */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Kicker with Gold/Emerald Touch */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-amber-300/30 rounded-full text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="tracking-wide">India&apos;s Trusted PropTech Discovery Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.12] text-balance">
              Your Dream Home, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-200">
                Smarter to Find.
              </span>
            </h1>

            {/* Tagline & Pitch */}
            <div className="space-y-2 max-w-xl">
              <p className="text-base sm:text-lg font-bold text-amber-100/90 tracking-wide">
                &ldquo;Find Your Place. Know Your Worth.&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Discover verified residential properties across Nagpur, Pune, Mumbai, and Bengaluru.
                Compare true out-of-pocket EMI repayments, explore lifestyle matches, and verify RERA documentation with zero broker bias.
              </p>
            </div>

            {/* Prominent Property Search Panel (Ivory / Clean Card on Dark Hero) */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white/95 backdrop-blur-md border border-amber-200/50 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4 text-slate-900 transition-all"
            >
              {/* Buy / Rent Interactive Tabs */}
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setIntent('buy')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      intent === 'buy'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Buy Property
                  </button>
                  <button
                    type="button"
                    onClick={() => setIntent('rent')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      intent === 'rent'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Rent Home
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Direct Demo Catalog
                </div>
              </div>

              {/* Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Location Select */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Target City
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 cursor-pointer"
                    >
                      <option value="Nagpur">Nagpur</option>
                      <option value="Pune">Pune</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bengaluru">Bengaluru</option>
                    </select>
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Property Type
                  </label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 cursor-pointer"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Independent House">Independent House</option>
                      <option value="Plot">Plot</option>
                    </select>
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Max Budget
                  </label>
                  <div className="relative">
                    <Banknote className="w-3.5 h-3.5 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={budgetTier}
                      onChange={(e) => setBudgetTier(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-semibold focus:outline-none focus:border-emerald-600 cursor-pointer"
                    >
                      {intent === 'buy' ? (
                        <>
                          <option value={8000000}>Up to ₹80 Lakhs</option>
                          <option value={15000000}>Up to ₹1.5 Crore</option>
                          <option value={30000000}>Up to ₹3.0 Crore</option>
                          <option value={60000000}>Up to ₹6.0 Crore</option>
                          <option value={100000000}>Above ₹6.0 Crore</option>
                        </>
                      ) : (
                        <>
                          <option value={30000}>Up to ₹30,000 /mo</option>
                          <option value={50000}>Up to ₹50,000 /mo</option>
                          <option value={100000}>Up to ₹1.0 Lakh /mo</option>
                          <option value={200000}>Above ₹1.0 Lakh /mo</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/20 hover:shadow-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  <Search className="w-4 h-4 text-emerald-200" />
                  <span>Find My Perfect Property</span>
                </button>

                <button
                  type="button"
                  onClick={onNavigateToMatch}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300/70 text-xs font-bold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Smart Matchmaker</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Large, Attractive Property Showcase on the Right */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-200/30 shadow-2xl bg-slate-900 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={showcaseImages[activeShowcase].src}
                alt={showcaseImages[activeShowcase].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-black/20 to-transparent pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-amber-300 text-[11px] font-bold rounded-full border border-amber-400/30 flex items-center gap-1.5 shadow-sm">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>Curated Luxury Showcase</span>
                </span>
                <span className="px-2.5 py-1 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[11px] font-bold rounded-full border border-emerald-500/30">
                  RERA Verified Demo
                </span>
              </div>

              {/* Bottom In-Frame Caption Card */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="p-3.5 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 mb-0.5">
                    {showcaseImages[activeShowcase].tag}
                  </div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {showcaseImages[activeShowcase].title}
                  </h3>
                  <div className="text-xs text-slate-300 flex items-center justify-between mt-1">
                    <span>{showcaseImages[activeShowcase].location}</span>
                    <span className="font-mono font-bold text-amber-300">₹1.35 Cr – ₹8.80 Cr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Selectors to Switch Showcase Photo */}
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {showcaseImages.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveShowcase(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeShowcase === idx
                        ? 'w-8 bg-amber-400'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Showcase image ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="text-[11px] text-slate-300 font-mono">
                Explore 14+ architectural residences
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Row Adjacency */}
        <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-3 bg-white/5 backdrop-blur-xs rounded-xl border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs font-bold text-white mt-0.5">
              Transparent EMI Math
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              Reducing-balance with stamp duty & registration
            </div>
          </div>

          <div className="p-3 bg-white/5 backdrop-blur-xs rounded-xl border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono tabular-nums">
              8-Pillar
            </div>
            <div className="text-xs font-bold text-white mt-0.5">
              RERA Due Diligence
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              Mother deed, OC/CC, and Encumbrance audit
            </div>
          </div>

          <div className="p-3 bg-white/5 backdrop-blur-xs rounded-xl border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono tabular-nums">
              3-Way
            </div>
            <div className="text-xs font-bold text-white mt-0.5">
              Matrix Benchmarking
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              Price per sq.ft, carpet area, and transit radius
            </div>
          </div>

          <div className="p-3 bg-white/5 backdrop-blur-xs rounded-xl border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono tabular-nums">
              0%
            </div>
            <div className="text-xs font-bold text-white mt-0.5">
              Broker Bias or Hype
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              Transparent compromise explanations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Sparkles, ArrowRight, Home, Building, ShieldCheck, TrendingUp, Gem } from 'lucide-react';
import penthouseInteriorImg from '../assets/images/luxury_indian_penthouse_interior_1791614966768.jpg';
import villaSunsetImg from '../assets/images/modern_villa_facade_sunset_1791614978393.jpg';
import familyGreensImg from '../assets/images/lifestyle_family_greens_1791614989614.jpg';
import nagpurHighriseImg from '../assets/images/property_nagpur_highrise_1791613353436.jpg';
import bengaluruTechImg from '../assets/images/property_bengaluru_tech_1791613387956.jpg';

interface ExploreLifestyleProps {
  onSelectLifestyle: (filter: {
    propertyType?: string;
    maxPrice?: number;
    intent?: 'buy' | 'rent';
    city?: string;
  }) => void;
}

export const ExploreLifestyle: React.FC<ExploreLifestyleProps> = ({ onSelectLifestyle }) => {
  const lifestyles = [
    {
      id: 'luxury',
      title: 'Luxury Penthouses & Sky Suites',
      subtitle: 'Seafront & Skyline Panoramas',
      description: 'Exclusive double-height ceiling residences in Worli, Koregaon Park & Indiranagar.',
      priceStarting: 'Starting ₹2.45 Cr',
      image: penthouseInteriorImg,
      icon: Gem,
      filter: { propertyType: 'Apartment', maxPrice: 100000000 },
      badge: 'Signature Collection',
    },
    {
      id: 'family',
      title: 'Serene Family Communities',
      subtitle: 'Green Parks & Top Schools',
      description: 'Spacious 3-4 BHK homes with low density layouts in Civil Lines & Dharampeth.',
      priceStarting: 'Starting ₹98 Lakhs',
      image: familyGreensImg,
      icon: Home,
      filter: { propertyType: 'Apartment', maxPrice: 15000000 },
      badge: 'Family Focused',
    },
    {
      id: 'villas',
      title: 'Private Bungalows & Villas',
      subtitle: 'Independent Freehold Plots',
      description: 'Custom duplexes with private lawns, open terraces, and gated clubhouse living.',
      priceStarting: 'Starting ₹1.15 Cr',
      image: villaSunsetImg,
      icon: Building,
      filter: { propertyType: 'Villa', maxPrice: 40000000 },
      badge: 'Private Grounds',
    },
    {
      id: 'investment',
      title: 'High-Yield IT Hub Condos',
      subtitle: 'Tech Corridors & Steady Cashflow',
      description: 'Strategic rental-ready homes near EON IT Park, MIHAN SEZ & Whitefield ITPL.',
      priceStarting: 'Rentals ₹36k/mo · Buy ₹76 L',
      image: bengaluruTechImg,
      icon: TrendingUp,
      filter: { propertyType: 'Apartment', maxPrice: 18500000 },
      badge: 'High Rental Yield',
    },
    {
      id: 'budget',
      title: 'Growth Corridor Smart Homes',
      subtitle: 'Accessible Metro Connectivity',
      description: 'Value-engineered 2-3 BHK flats with high capital appreciation potential.',
      priceStarting: 'Starting ₹76 Lakhs',
      image: nagpurHighriseImg,
      icon: ShieldCheck,
      filter: { maxPrice: 10000000, intent: 'buy' },
      badge: 'High Value',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-amber-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tailored Discovery Archetypes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1 tracking-tight">
              Explore by Lifestyle
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Whether you are upgrading for family comfort, seeking high rental returns near tech hubs, or acquiring an iconic penthouse, discover curated property archetypes.
            </p>
          </div>
        </div>

        {/* 5-Card Lifestyle Grid with Feature Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifestyles.map((item, index) => {
            const Icon = item.icon;
            const isFeatured = index === 0;
            return (
              <div
                key={item.id}
                onClick={() => onSelectLifestyle(item.filter as any)}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between ${
                  isFeatured
                    ? 'md:col-span-2 lg:col-span-2 border-amber-300/60 bg-slate-900 text-white min-h-[340px]'
                    : 'border-slate-200/80 bg-white text-slate-900 min-h-[320px]'
                }`}
              >
                {/* Background Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-slate-950/80 text-amber-300 border border-amber-400/30 rounded-md backdrop-blur-md">
                      {item.badge}
                    </span>
                  </div>

                  {/* Starting Price Overlay */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 text-xs font-mono font-bold bg-white/95 text-slate-950 rounded-md shadow-sm">
                      {item.priceStarting}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-emerald-700" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">{item.subtitle}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-950 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 group-hover:underline">
                      Explore Matching Listings
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

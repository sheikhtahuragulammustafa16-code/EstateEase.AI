import { Property, MatchPreferences, MatchScoreResult } from '../types/property';
import { formatINR } from './formatters';

export function evaluatePropertyMatch(
  property: Property,
  prefs: MatchPreferences
): MatchScoreResult {
  let score = 0;
  const reasons: string[] = [];
  const compromises: string[] = [];

  // 1. Intent Match (Base criterion)
  const intentMatches = property.intent === prefs.intent;
  if (!intentMatches) {
    // Large mismatch: looking for buy vs rent
    compromises.push(
      `Listed for ${property.intent.toUpperCase()} instead of preferred ${prefs.intent.toUpperCase()}`
    );
  }

  // 2. City Match (Max 25 pts)
  if (!prefs.city || property.location.city.toLowerCase() === prefs.city.toLowerCase()) {
    score += 25;
    reasons.push(`Located directly in preferred city: ${property.location.city}`);
    
    // Neighborhood bonus check
    if (
      prefs.localityPreference &&
      property.location.locality.toLowerCase().includes(prefs.localityPreference.toLowerCase().trim())
    ) {
      score += 5;
      reasons.push(`Situated in your desired locality (${property.location.locality})`);
    }
  } else {
    score += 5;
    compromises.push(
      `Located in ${property.location.city} rather than preferred ${prefs.city}`
    );
  }

  // 3. Budget Match (Max 25 pts)
  const maxBudget = prefs.maxBudget;
  if (maxBudget > 0) {
    if (property.price <= maxBudget) {
      score += 25;
      const savings = maxBudget - property.price;
      if (savings > 0) {
        reasons.push(
          `Under budget by ${formatINR(savings, true)} (${formatINR(property.price, true)} vs max ${formatINR(maxBudget, true)})`
        );
      } else {
        reasons.push(`Exactly matches your maximum budget of ${formatINR(maxBudget, true)}`);
      }
    } else {
      const overBudgetPct = ((property.price - maxBudget) / maxBudget) * 100;
      if (overBudgetPct <= 15) {
        score += 12;
        compromises.push(
          `Slightly exceeds maximum budget by ${formatINR(property.price - maxBudget, true)} (+${Math.round(overBudgetPct)}%)`
        );
      } else {
        score += 2;
        compromises.push(
          `Exceeds maximum budget by ${formatINR(property.price - maxBudget, true)} (+${Math.round(overBudgetPct)}%)`
        );
      }
    }
  } else {
    score += 20;
  }

  // 4. Bedroom Count & Property Type (Max 20 pts)
  if (prefs.preferredBedrooms > 0) {
    if (property.bedrooms === prefs.preferredBedrooms) {
      score += 10;
      reasons.push(`Exact ${property.bedrooms} BHK configuration required`);
    } else if (property.bedrooms === prefs.preferredBedrooms + 1) {
      score += 6;
      reasons.push(`Offers an extra bedroom (${property.bedrooms} BHK instead of ${prefs.preferredBedrooms} BHK)`);
    } else {
      compromises.push(
        `${property.bedrooms} BHK instead of requested ${prefs.preferredBedrooms} BHK`
      );
    }
  } else {
    score += 10;
  }

  if (prefs.propertyType === 'Any' || !prefs.propertyType) {
    score += 10;
  } else if (property.type.toLowerCase() === prefs.propertyType.toLowerCase()) {
    score += 10;
    reasons.push(`Matches requested property archetype: ${property.type}`);
  } else {
    compromises.push(`Listed as ${property.type} instead of ${prefs.propertyType}`);
  }

  // 5. Must-Have Amenities Match (Max 15 pts)
  if (prefs.mustHaveAmenities.length > 0) {
    const matchedAmenities = prefs.mustHaveAmenities.filter((amenity) =>
      property.amenities.some(
        (a) => a.toLowerCase().includes(amenity.toLowerCase()) || amenity.toLowerCase().includes(a.toLowerCase())
      )
    );
    const amenityRatio = matchedAmenities.length / prefs.mustHaveAmenities.length;
    score += Math.round(amenityRatio * 15);

    if (matchedAmenities.length === prefs.mustHaveAmenities.length) {
      reasons.push(`All ${matchedAmenities.length} required amenities are verified`);
    } else if (matchedAmenities.length > 0) {
      reasons.push(`Features ${matchedAmenities.length} of ${prefs.mustHaveAmenities.length} requested amenities`);
      const missing = prefs.mustHaveAmenities.filter((a) => !matchedAmenities.includes(a));
      compromises.push(`Missing requested amenities: ${missing.join(', ')}`);
    } else {
      compromises.push(`Lacks preferred amenities (${prefs.mustHaveAmenities.join(', ')})`);
    }
  } else {
    score += 15;
  }

  // 6. Lifestyle Priorities (Max 15 pts)
  const lifestyle = prefs.lifestylePriorities;
  let lifestyleCount = 0;
  let lifestyleMatched = 0;

  if (lifestyle.transitProximity) {
    lifestyleCount++;
    if (property.location.transitDistanceKm <= 1.5) {
      lifestyleMatched++;
      reasons.push(
        `High transit accessibility: only ${property.location.transitDistanceKm} km from ${property.location.nearbyTransit}`
      );
    } else {
      compromises.push(
        `Transit station is ${property.location.transitDistanceKm} km away (>1.5 km ideal)`
      );
    }
  }

  if (lifestyle.schoolProximity) {
    lifestyleCount++;
    if (property.location.schoolDistanceKm <= 2.0) {
      lifestyleMatched++;
      reasons.push(
        `Near top schools: ${property.location.schoolDistanceKm} km to ${property.location.nearbySchool}`
      );
    } else {
      compromises.push(
        `School district is ${property.location.schoolDistanceKm} km away`
      );
    }
  }

  if (lifestyle.workHubProximity) {
    lifestyleCount++;
    if (property.location.hubDistanceKm <= 4.0) {
      lifestyleMatched++;
      reasons.push(
        `Short work commute: ${property.location.hubDistanceKm} km to ${property.location.nearbyHub}`
      );
    } else {
      compromises.push(
        `Commute to employment corridor is ${property.location.hubDistanceKm} km`
      );
    }
  }

  if (lifestyle.greeneryAndParks) {
    lifestyleCount++;
    if (property.location.nearbyPark) {
      lifestyleMatched++;
      reasons.push(`Adjacent to green recreation: ${property.location.nearbyPark}`);
    }
  }

  if (lifestyleCount > 0) {
    const lifestyleRatio = lifestyleMatched / lifestyleCount;
    score += Math.round(lifestyleRatio * 15);
  } else {
    score += 15;
  }

  // Cap score between 10 and 99% (honest transparency)
  const finalScore = Math.min(99, Math.max(15, Math.round(score)));

  // Ensure at least 3 reasons are picked
  while (reasons.length < 3) {
    if (property.isReraRegistered && !reasons.includes('Verified RERA registration with clear documentation')) {
      reasons.push('Verified RERA registration with clear documentation');
    } else if (property.carpetAreaSqFt && !reasons.some((r) => r.includes('sq.ft'))) {
      reasons.push(`Generous carpet area of ${property.carpetAreaSqFt} sq.ft`);
    } else if (!reasons.includes(`High connectivity in ${property.location.locality}`)) {
      reasons.push(`High connectivity in ${property.location.locality}`);
    } else {
      reasons.push(`Equipped with ${property.amenities.slice(0, 2).join(' & ')}`);
    }
  }

  return {
    property,
    score: finalScore,
    reasons: reasons.slice(0, 3),
    compromises: compromises.slice(0, 2),
    isAlternative: finalScore < 70 || !intentMatches,
  };
}

export function rankPropertiesByPreferences(
  properties: Property[],
  prefs: MatchPreferences
): MatchScoreResult[] {
  // First evaluate all properties
  const results = properties.map((p) => evaluatePropertyMatch(p, prefs));

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results;
}

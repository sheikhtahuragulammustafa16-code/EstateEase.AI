import { DueDiligenceItem } from '../types/property';

export const INITIAL_CHECKLIST_ITEMS: DueDiligenceItem[] = [
  {
    id: 'dd-1',
    category: 'Title & Ownership',
    title: 'Mother Deed & Chain of Title Deeds (30-Year Record)',
    description:
      'Verify the chain of ownership transfers going back at least 30 years to trace unencumbered legal title from original owner to present seller.',
    verificationGuide:
      'Inspect registered Sale Deeds, Gift Deeds, Partition Deeds, and extract non-encumbrance records at the Sub-Registrar Office.',
    completed: false,
  },
  {
    id: 'dd-2',
    category: 'RERA Compliance',
    title: 'State RERA Registration & Project Details Match',
    description:
      'Check whether the residential layout or tower is registered on the respective State RERA portal (e.g. MahaRERA / Karnataka RERA).',
    verificationGuide:
      'Look up the RERA registration number on the official state portal to verify declared completion timeline, sanctioned building plans, and litigations.',
    completed: false,
  },
  {
    id: 'dd-3',
    category: 'Municipal & Building Sanctions',
    title: 'Sanctioned Layout Plan & Commencement Certificate (CC)',
    description:
      'Confirm the building was constructed in accordance with the sanctioned floor plan without unauthorized alterations or illegal FSI extensions.',
    verificationGuide:
      'Cross-check the municipal corporation approved layout stamp and Commencement Certificate issued up to the floor you are purchasing.',
    completed: false,
  },
  {
    id: 'dd-4',
    category: 'Occupancy & Completion',
    title: 'Occupancy Certificate (OC) / Completion Certificate (CC)',
    description:
      'Essential for ready-to-move properties to ensure civic bodies have cleared the building for safe human habitation with water and electricity connections.',
    verificationGuide:
      'Request the formal OC issued by the local municipal corporation (e.g., NMC, PMC, BMC, BBMP). Buying without an OC risks eviction or disconnection.',
    completed: false,
  },
  {
    id: 'dd-5',
    category: 'Financial Encumbrance',
    title: 'Encumbrance Certificate (EC - Form 15) & Bank NOC',
    description:
      'Ensure the property has no mortgage, ongoing foreclosure, unpaid property tax dues, or pending bank liens.',
    verificationGuide:
      'Obtain an updated Encumbrance Certificate for 15-30 years. If the builder took a project construction loan, insist on a specific Bank NOC releasing your unit.',
    completed: false,
  },
  {
    id: 'dd-6',
    category: 'Society & Maintenance',
    title: 'No Objection Certificate (NOC) & Maintenance Clarity',
    description:
      'Check pending society maintenance arrears, sinking fund contributions, and society transfer fees.',
    verificationGuide:
      'For resale units, request a formal NOC from the Registered Co-operative Housing Society (CHSL) or Apartment Owners Association confirming zero dues.',
    completed: false,
  },
  {
    id: 'dd-7',
    category: 'Contractual Clauses',
    title: 'Agreement for Sale (RERA Model Agreement Alignment)',
    description:
      'Ensure the sale agreement adheres strictly to standard RERA format without unfair cancellation penalties, delay waivers, or hidden escalation costs.',
    verificationGuide:
      'Scrutinize carpet area definition (exclude super built-up inflation), penalty for builder delay (SBI MCLR + 2%), and parking space allotment letter.',
    completed: false,
  },
  {
    id: 'dd-8',
    category: 'Physical & Structural Verification',
    title: 'Physical Site Audit & Utility Cross-Inspection',
    description:
      'Conduct a daytime physical inspection of room dimensions, water pressure, seepage, electrical switches, natural daylight, and car parking slot accessibility.',
    verificationGuide:
      'Hire an independent snagging engineer or bring a laser tape to audit carpet area versus brochure claims. Check mobile phone network coverage indoors.',
    completed: false,
  },
];

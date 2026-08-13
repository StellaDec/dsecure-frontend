// अंतर्राष्ट्रीय डेटा सुरक्षा कानून - Region-wise categorized data
import type { LucideIcon } from 'lucide-react';
import {
  Shield, Globe, Landmark, Building2, HeartPulse, CreditCard,
  Scale, FileCheck, Lock, BookOpen, Gavel, ScrollText,
  Flag, MapPin, Users, ShieldCheck, Fingerprint, Eye,
  BadgeCheck, AlertTriangle, Briefcase, Database
} from 'lucide-react';

export interface DataProtectionLaw {
  id: string;
  name: string;
  fullName: string;
  country: string;
  countryCode: string;
  region: Region;
  year: number;
  description: string;
  keyPoints: string[];
  learnMoreUrl: string;
  // Lucide icon reference (emoji nahi)
  icon: LucideIcon;
}

export type Region = 'all' | 'north-america' | 'europe' | 'asia-pacific' | 'middle-east-africa' | 'latin-america';

export interface RegionInfo {
  id: Region;
  name: string;
  // Lucide icon reference
  icon: LucideIcon;
  count?: number;
}

// सभी regions की list - Lucide icons ke saath
export const regions: RegionInfo[] = [
  { id: 'all', name: 'All Regions', icon: Globe },
  { id: 'north-america', name: 'North America', icon: Flag },
  { id: 'europe', name: 'Europe', icon: Landmark },
  { id: 'asia-pacific', name: 'Asia Pacific', icon: MapPin },
  { id: 'middle-east-africa', name: 'Middle East & Africa', icon: Building2 },
  { id: 'latin-america', name: 'Latin America', icon: Scale },
];

// सभी अंतर्राष्ट्रीय कानूनों का data - Lucide icons ke saath
export const internationalLaws: DataProtectionLaw[] = [
  // ─── EUROPE ───
  {
    id: 'gdpr',
    name: 'GDPR',
    fullName: 'General Data Protection Regulation',
    country: 'European Union',
    countryCode: 'EU',
    region: 'europe',
    year: 2018,
    description: 'The GDPR is the world\'s most comprehensive data privacy regulation, providing individuals with robust rights over their personal data, including the Right to Erasure (Article 17).',
    keyPoints: [
      'Right to Erasure (Article 17)',
      'Data minimization & storage limitation',
      'Mandatory breach notification within 72 hours',
      'Fines up to €20M or 4% of global turnover',
    ],
    learnMoreUrl: '/blog/everything-you-need-to-know-to-ensure-GDPR-EU-Compliance',
    icon: Shield,
  },
  {
    id: 'uk-dpa',
    name: 'UK DPA 2018',
    fullName: 'UK Data Protection Act 2018 & UK GDPR',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'europe',
    year: 2018,
    description: 'Post Brexit, public and private bodies in the UK are obligated to comply with two data protection laws: Data Protection Act (DPA) 2018 and UK GDPR.',
    keyPoints: [
      'Mirrors EU GDPR post-Brexit',
      'Covers all UK-based data processing',
      'ICO enforcement with substantial fines',
      'Lawful basis required for processing',
    ],
    learnMoreUrl: '/blog/uk-dpa-compliance',
    icon: ShieldCheck,
  },
  {
    id: 'bdsg',
    name: 'BDSG',
    fullName: 'Bundesdatenschutzgesetz — Germany\'s Federal Data Protection Law',
    country: 'Germany',
    countryCode: 'DE',
    region: 'europe',
    year: 2018,
    description: 'Germany\'s Federal Data Protection Act incorporates guidelines set forth by EU-GDPR and adds data protection regulations specific to the country.',
    keyPoints: [
      'Supplements EU GDPR with German-specific rules',
      'Strict employee data protection provisions',
      'Federal Commissioner for Data Protection oversight',
      'Special categories of personal data handling',
    ],
    learnMoreUrl: '/blog/bdsg-compliance',
    icon: Landmark,
  },
  {
    id: 'fdpa',
    name: 'FDPA',
    fullName: 'French Data Protection Act (Loi Informatique et Libertés)',
    country: 'France',
    countryCode: 'FR',
    region: 'europe',
    year: 2018,
    description: 'The French Data Protection Act complements the EU-GDPR and ensures that the processing of personal data of French residents is done with consideration to privacy and rights of individuals.',
    keyPoints: [
      'Complements EU GDPR locally',
      'CNIL enforcement authority',
      'Special provisions for health data',
      'Strict rules on automated decision-making',
    ],
    learnMoreUrl: '/blog/fdpa-compliance',
    icon: ScrollText,
  },
  {
    id: 'fadp',
    name: 'FADP',
    fullName: 'Switzerland\'s Federal Act on Data Protection',
    country: 'Switzerland',
    countryCode: 'CH',
    region: 'europe',
    year: 2023,
    description: 'The latest Federal Act on Data Protection (nFADP) enforced in Sep 2023 aims to protect its citizens\' privacy when their data is processed.',
    keyPoints: [
      'Aligned with EU GDPR standards',
      'Privacy by design & default mandatory',
      'Data Protection Impact Assessments required',
      'Cross-border data transfer restrictions',
    ],
    learnMoreUrl: '/blog/fadp-compliance',
    icon: Lock,
  },

  // ─── NORTH AMERICA ───
  {
    id: 'ccpa',
    name: 'CCPA / CPRA',
    fullName: 'California Consumer Privacy Act / California Privacy Rights Act',
    country: 'United States (California)',
    countryCode: 'US',
    region: 'north-america',
    year: 2020,
    description: 'The CCPA is a ground-breaking data privacy regulation providing new data privacy rights to California residents, enhanced by CPRA in 2023.',
    keyPoints: [
      'Right to know, delete & opt-out',
      'Applies to businesses meeting revenue thresholds',
      'CPRA adds data correction rights',
      'California Privacy Protection Agency (CPPA) enforcement',
    ],
    learnMoreUrl: '/blog/deciphered-the-basics-of-CCPA',
    icon: Eye,
  },
  {
    id: 'hipaa',
    name: 'HIPAA',
    fullName: 'Health Insurance Portability and Accountability Act',
    country: 'United States',
    countryCode: 'US',
    region: 'north-america',
    year: 1996,
    description: 'HIPAA Security Rule mandates safeguards to protect the confidentiality, integrity, and availability of electronic protected health information (ePHI).',
    keyPoints: [
      'Protects PHI and ePHI data',
      'Requires secure disposal of health records',
      'Administrative, physical & technical safeguards',
      'Penalties up to $1.5M per violation category',
    ],
    learnMoreUrl: '/blog/hipaa-compliance',
    icon: HeartPulse,
  },
  {
    id: 'glba',
    name: 'GLBA',
    fullName: 'Gramm-Leach-Bliley Act',
    country: 'United States',
    countryCode: 'US',
    region: 'north-america',
    year: 1999,
    description: 'The US federal law regulates the handling of nonpublic personal information by financial institutions.',
    keyPoints: [
      'Financial Privacy Rule',
      'Safeguards Rule for data protection',
      'Requires secure disposal of customer info',
      'FTC & federal agency enforcement',
    ],
    learnMoreUrl: '/blog/glba-compliance',
    icon: CreditCard,
  },
  {
    id: 'sox',
    name: 'SOX',
    fullName: 'Sarbanes-Oxley Act',
    country: 'United States',
    countryCode: 'US',
    region: 'north-america',
    year: 2002,
    description: 'SOX is a federal law that regulates corporate governance and accountability across various aspects of corporate business practices and securities markets.',
    keyPoints: [
      'Corporate financial accountability',
      'Internal controls for data integrity',
      'Document retention & destruction policies',
      'Criminal penalties for non-compliance',
    ],
    learnMoreUrl: '/blog/sox-compliance',
    icon: Briefcase,
  },
  {
    id: 'us-privacy-act',
    name: 'US Privacy Act',
    fullName: 'US Privacy Act of 1974',
    country: 'United States',
    countryCode: 'US',
    region: 'north-america',
    year: 1974,
    description: 'Regulates how federal agencies collect, maintain, use, and disseminate Personally Identifiable Information (PII) about individuals.',
    keyPoints: [
      'Governs federal agency data handling',
      'Individual access & amendment rights',
      'Restricts unauthorized data disclosure',
      'Applies to federal record systems',
    ],
    learnMoreUrl: '/blog/us-privacy-act-compliance',
    icon: Gavel,
  },
  {
    id: 'nypa',
    name: 'NYPA',
    fullName: 'New York Privacy Act 2021',
    country: 'United States (New York)',
    countryCode: 'US',
    region: 'north-america',
    year: 2021,
    description: 'The proposed New York Privacy Act focuses on the protection of consumer privacy by obligating companies to obtain consumers\' consent before processing their personal data.',
    keyPoints: [
      'Consumer consent required for data processing',
      'Data fiduciary obligations for companies',
      'Private right of action for violations',
      'Algorithmic decision-making transparency',
    ],
    learnMoreUrl: '/blog/new-york-data-privacy-law',
    icon: Users,
  },
  {
    id: 'tdpsa',
    name: 'TDPSA',
    fullName: 'Texas Data Privacy and Security Act',
    country: 'United States (Texas)',
    countryCode: 'US',
    region: 'north-america',
    year: 2024,
    description: 'The Texas Data Privacy and Security Act (TDPSA) is one of the broadest comprehensive state privacy laws in the United States, notable for applying to businesses of nearly any size.',
    keyPoints: [
      'Consumer data access & deletion rights',
      'Opt-out of targeted advertising',
      'Data protection assessments required',
      'AG enforcement with cure period',
    ],
    learnMoreUrl: '/blog/tdpsa-compliance',
    icon: FileCheck,
  },
  {
    id: 'vcdpa',
    name: 'VCDPA',
    fullName: 'Virginia Consumer Data Protection Act',
    country: 'United States (Virginia)',
    countryCode: 'US',
    region: 'north-america',
    year: 2023,
    description: 'The Virginia Consumer Data Protection Act (VCDPA) was the second comprehensive consumer privacy law in the United States, giving Virginia residents meaningful rights over their personal data.',
    keyPoints: [
      'Consumer rights over personal data',
      'Data minimization requirements',
      'Opt-out of data sales & profiling',
      'AG enforcement mechanism',
    ],
    learnMoreUrl: '/blog/vcdpa-compliance',
    icon: BadgeCheck,
  },
  {
    id: 'mhmda',
    name: 'MHMDA',
    fullName: 'Washington: My Health My Data Act',
    country: 'United States (Washington)',
    countryCode: 'US',
    region: 'north-america',
    year: 2023,
    description: 'Washington\'s My Health My Data Act (MHMDA) is the first law in the United States specifically designed to protect consumer health data that falls outside the scope of HIPAA.',
    keyPoints: [
      'Covers consumer health data outside HIPAA',
      'Consent required before data collection',
      'Geofencing restrictions near health facilities',
      'Private right of action available',
    ],
    learnMoreUrl: '/blog/mhmda-compliance',
    icon: HeartPulse,
  },
  {
    id: 'pipeda',
    name: 'PIPEDA',
    fullName: 'Personal Information Protection & Electronic Documents Act',
    country: 'Canada',
    countryCode: 'CA',
    region: 'north-america',
    year: 2000,
    description: 'PIPEDA is a Canadian law that governs the collection, use, and disclosure of PII in commercial activities.',
    keyPoints: [
      '10 fair information principles',
      'Meaningful consent for data use',
      'Individual access to personal information',
      'Privacy Commissioner of Canada oversight',
    ],
    learnMoreUrl: '/blog/pipeda-compliance',
    icon: BookOpen,
  },

  // ─── ASIA PACIFIC ───
  {
    id: 'dpdp',
    name: 'DPDP Act',
    fullName: 'India\'s Digital Personal Data Protection Act 2023',
    country: 'India',
    countryCode: 'IN',
    region: 'asia-pacific',
    year: 2023,
    description: 'India adopts the Digital Personal Data Protection Act, 2023 — a landmark privacy law for the world\'s largest democracy.',
    keyPoints: [
      'Data Principal consent-based processing',
      'Right to erasure & data portability',
      'Data Protection Board of India enforcement',
      'Penalties up to ₹250 crore',
    ],
    learnMoreUrl: '/blog/dpdp-compliance',
    icon: Fingerprint,
  },
  {
    id: 'appi',
    name: 'APPI',
    fullName: 'Japan\'s Act on Protection of Personal Information',
    country: 'Japan',
    countryCode: 'JP',
    region: 'asia-pacific',
    year: 2003,
    description: 'Before the EU GDPR became a known international privacy law, Japan had passed a law to protect the personal information of Japanese Citizens.',
    keyPoints: [
      'Purpose limitation for data use',
      'Cross-border transfer restrictions',
      'Personal Information Protection Commission',
      'Amended in 2022 with stricter penalties',
    ],
    learnMoreUrl: '/blog/appi-compliance',
    icon: Shield,
  },
  {
    id: 'pipl',
    name: 'PIPL',
    fullName: 'China\'s Personal Information Protection Law',
    country: 'China',
    countryCode: 'CN',
    region: 'asia-pacific',
    year: 2021,
    description: 'China PIPL protects Chinese residents\' personal information inside the nation, regardless of where it is processed.',
    keyPoints: [
      'Extraterritorial jurisdiction',
      'Consent-based data processing',
      'Data localization requirements',
      'Fines up to ¥50M or 5% revenue',
    ],
    learnMoreUrl: '/blog/pipl-compliance',
    icon: Database,
  },
  {
    id: 'pdp-ph',
    name: 'DPA 2012',
    fullName: 'Philippines Data Privacy Act',
    country: 'Philippines',
    countryCode: 'PH',
    region: 'asia-pacific',
    year: 2012,
    description: 'Protects the fundamental human right of privacy of Filipinos, ensures the free flow of information, and promotes responsible data handling.',
    keyPoints: [
      'National Privacy Commission enforcement',
      'Data subject rights & consent requirements',
      'Mandatory breach notification',
      'Criminal penalties for violations',
    ],
    learnMoreUrl: '/blog/philippines-dpa-compliance',
    icon: AlertTriangle,
  },
  {
    id: 'privacy-act-au',
    name: 'Privacy Act 1988',
    fullName: 'Australia\'s Privacy Act 1988',
    country: 'Australia',
    countryCode: 'AU',
    region: 'asia-pacific',
    year: 1988,
    description: 'Outlines 13 Australian Privacy Principles (APPs) for government agencies and certain private sector organizations to protect individuals\' personal information.',
    keyPoints: [
      '13 Australian Privacy Principles (APPs)',
      'Notifiable Data Breaches scheme',
      'OAIC enforcement authority',
      'Applies to organizations over $3M revenue',
    ],
    learnMoreUrl: '/blog/privacy-act-au-compliance',
    icon: ScrollText,
  },
  {
    id: 'nz-privacy',
    name: 'Privacy Act 2020',
    fullName: 'New Zealand Privacy Act 2020',
    country: 'New Zealand',
    countryCode: 'NZ',
    region: 'asia-pacific',
    year: 2020,
    description: 'Governs the protection of the privacy of individuals whose personal information is held and accessed by agencies in the public and private sectors.',
    keyPoints: [
      '13 Information Privacy Principles',
      'Mandatory privacy breach reporting',
      'Cross-border data disclosure rules',
      'Privacy Commissioner enforcement',
    ],
    learnMoreUrl: '/blog/nz-privacy-act-compliance',
    icon: Lock,
  },

  // ─── MIDDLE EAST & AFRICA ───
  {
    id: 'pdpl-sa',
    name: 'PDPL',
    fullName: 'Saudi Arabia\'s Personal Data Protection Law',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    region: 'middle-east-africa',
    year: 2022,
    description: 'Personal Data Protection Law (PDPL) is Saudi Arabia\'s new comprehensive Data Protection Law.',
    keyPoints: [
      'Consent-based data processing',
      'Data localization within Saudi Arabia',
      'SDAIA & NDMO regulatory oversight',
      'Penalties up to SAR 5 million',
    ],
    learnMoreUrl: '/blog/pdpl-sa-compliance',
    icon: Building2,
  },
  {
    id: 'popia',
    name: 'POPIA',
    fullName: 'Protection of Personal Information Act',
    country: 'South Africa',
    countryCode: 'ZA',
    region: 'middle-east-africa',
    year: 2021,
    description: 'POPIA protects personal data and prevents sensitive information from getting compromised for businesses handling personal information in South Africa.',
    keyPoints: [
      '8 conditions for lawful processing',
      'Information Regulator enforcement',
      'Mandatory data breach notification',
      'Fines up to R10 million or imprisonment',
    ],
    learnMoreUrl: '/blog/popia-compliance',
    icon: ShieldCheck,
  },

  // ─── LATIN AMERICA ───
  {
    id: 'lgpd',
    name: 'LGPD',
    fullName: 'Brazil\'s General Data Protection Law (Lei Geral de Proteção de Dados)',
    country: 'Brazil',
    countryCode: 'BR',
    region: 'latin-america',
    year: 2020,
    description: 'Brazil enacted its first comprehensive data protection law in 2020 — LGPD ensures responsible handling of personal data.',
    keyPoints: [
      '10 legal bases for data processing',
      'ANPD (National Data Protection Authority)',
      'Data subject rights similar to GDPR',
      'Fines up to 2% of revenue (R$50M cap)',
    ],
    learnMoreUrl: '/blog/lgpd-compliance',
    icon: Globe,
  },
  {
    id: 'lfpdppp',
    name: 'LFPDPPP',
    fullName: 'Mexico\'s Federal Law on Personal Data Protection',
    country: 'Mexico',
    countryCode: 'MX',
    region: 'latin-america',
    year: 2010,
    description: 'Enacted on July 6, 2010, LFPDPPP regulates how private entities in Mexico process personal data.',
    keyPoints: [
      'ARCO rights (Access, Rectification, Cancellation, Opposition)',
      'Privacy notice requirements',
      'INAI enforcement authority',
      'Cross-border data transfer rules',
    ],
    learnMoreUrl: '/blog/lfpdppp-compliance',
    icon: FileCheck,
  },
  {
    id: 'ley-25326',
    name: 'Ley 25.326',
    fullName: 'Argentina Personal Data Protection Act',
    country: 'Argentina',
    countryCode: 'AR',
    region: 'latin-america',
    year: 2000,
    description: 'Argentina\'s Personal Data Protection Law — Ley 25.326 — was one of the earliest comprehensive data protection statutes in Latin America and remains the country\'s principal privacy framework today.',
    keyPoints: [
      'Constitutional right to data protection',
      'AAIP regulatory authority',
      'EU adequacy status for data transfers',
      'Habeas Data rights for individuals',
    ],
    learnMoreUrl: '/blog/ley-25326-compliance',
    icon: Scale,
  },
  {
    id: 'peru-pdp',
    name: 'Ley 29733',
    fullName: 'Peru Personal Data Protection Law',
    country: 'Peru',
    countryCode: 'PE',
    region: 'latin-america',
    year: 2011,
    description: 'Peru\'s Personal Data Protection Law — Ley de Protección de Datos Personales, Ley No. 29733 — is the country\'s foundational data privacy statute, governing how public and private entities collect, process, and store personal data.',
    keyPoints: [
      'National Authority for Personal Data Protection',
      'Consent-based data processing',
      'Cross-border transfer restrictions',
      'Administrative and criminal sanctions',
    ],
    learnMoreUrl: '/blog/peru-pdp-compliance',
    icon: Gavel,
  },
];

// Helper: Region-wise count nikaalein
export const getRegionCounts = (): Record<Region, number> => {
  const counts: Record<Region, number> = {
    'all': internationalLaws.length,
    'north-america': 0,
    'europe': 0,
    'asia-pacific': 0,
    'middle-east-africa': 0,
    'latin-america': 0,
  };
  internationalLaws.forEach(law => {
    counts[law.region]++;
  });
  return counts;
};

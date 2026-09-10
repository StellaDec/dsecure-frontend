/**
 * ============================================================================
 * D-SECURE CASE STUDIES DATA
 * ============================================================================
 * Case study listing page ke liye saara data yahan centralized hai.
 * Industries, products, aur individual case studies — sab ek jagah.
 */

import type { ElementType } from 'react';

// ─── TypeScript Interfaces ───
export interface CaseStudyResult {
  /** Metric label, jaise "Devices Processed" */
  label: string;
  /** Metric value, jaise "15,000+" */
  value: string;
}

/** Detail page ka content — challenge, solution, implementation, outcome */
export interface CaseStudyDetail {
  /** Client ke paas kya problem thi */
  challenge: string;
  /** D-Secure ne kaise solve kiya */
  solution: string;
  /** Implementation ke technical steps */
  implementation: string[];
  /** Final outcome / client quote */
  outcome: string;
  /** D-Secure products jo use hue */
  productsUsed: string[];
  /** Compliance standards met */
  complianceStandards: string[];
}

export interface CaseStudy {
  /** Unique identifier */
  id: string;
  /** URL-friendly slug */
  slug: string;
  /** Company ya organization ka naam */
  company: string;
  /** Case study ka title */
  title: string;
  /** Short summary (2-3 lines) */
  summary: string;
  /** Industry category */
  industry: IndustryFilter;
  /** D-Secure product used */
  product: ProductFilter;
  /** Key results / metrics */
  results: CaseStudyResult[];
  /** Featured case study flag — hero mein dikhayenge */
  featured: boolean;
  /** Lucide icon name for the industry (component reference) */
  iconName: string;
  /** Detail page content — optional, sirf un case studies ke liye jo detail page rakhti hain */
  detailContent?: CaseStudyDetail;
}

// ─── Filter Types ───
export type IndustryFilter =
  | 'Banking & Finance'
  | 'Healthcare'
  | 'Government'
  | 'ITAD'
  | 'Manufacturing'
  | 'Education'
  | 'Telecom'
  | 'MSP'
  | 'Consultant'
  | 'Non Profit'
  | 'Infrastructure';

export type ProductFilter =
  | 'Drive Eraser'
  | 'File Eraser'
  | 'Smartphone Eraser'
  | 'Hardware Diagnostics'
  | 'Drive Verifier'
  | 'Autopilot Detection';

// ─── Filter Options (sidebar mein dikhayenge) ───
export const industryFilters: IndustryFilter[] = [
  'Banking & Finance',
  'Healthcare',
  'Government',
  'ITAD',
  'Manufacturing',
  'Education',
  'Telecom',
  'MSP',
  'Consultant',
  'Non Profit',
  'Infrastructure',
];

export const productFilters: ProductFilter[] = [
  'Drive Eraser',
  'File Eraser',
  'Smartphone Eraser',
  'Hardware Diagnostics',
  'Drive Verifier',
  'Autopilot Detection',
];
// ─── Case Studies Data — Sirf real case studies, fake data nahi ───
export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-001',
    slug: 'file-eraser-enterprise-clients',
    company: 'Southeast Asian IT Solutions Leader',
    title: 'A Southeast Asian IT Solutions Leader Secures Large-Scale File Data with D-Secure File Eraser',
    summary:
      'A 20+ year old IT solutions company serving SMEs to MNCs across Southeast Asia partnered with D-Secure to securely erase over 250 TB of sensitive file and folder data — smoothly and without disruption to ongoing operations.',
    // Valid IndustryFilter type use karein
    industry: 'MSP',
    product: 'File Eraser',
    results: [
      { label: 'Data Erased', value: '250+ TB' },
      { label: 'Time Taken', value: '4 Days' },
      { label: 'Verification', value: 'Full Verification' },
    ],
    featured: true,
    iconName: 'FileSearch',
    detailContent: {
      challenge:
        'As a managed IT services and digital transformation provider, the client regularly handles sensitive file-level data on behalf of its enterprise customers — ranging from HR records and financial documents to project files retired during migrations, offboarding, or infrastructure refreshes. Standard file deletion methods left this data recoverable and produced no verifiable record of destruction. With clients spanning regulated industries and large file volumes — including individual files of very large sizes — the organization needed a way to erase data reliably at scale, without slowing down day-to-day IT operations or requiring custom infrastructure.',
      solution:
        'D-Secure File Eraser gave the client a straightforward, scalable way to erase files and folders across storage environments — including large individual files — while generating a documented, tamper-evident record for every erasure job. The solution was built to handle high-volume, large-chunk data erasure smoothly, allowing the team to retire sensitive data as part of routine workflows rather than as a separate, resource-heavy exercise.',
      implementation: [
        'High-speed large-scale file erasure — Over 250 TB of file and folder data was securely erased in just 4 days without performance issues or job failures.',
        'File & folder-level targeting — Erasure was applied precisely at the file and folder level, avoiding the need to wipe entire drives when only specific data needed to be destroyed.',
        'Smooth handling of large data chunks — Large-size files were processed reliably as part of bulk erasure jobs, supporting the scale the organization operates at.',
        'Documented erasure records — Every job produced a verifiable report generated using the Full Verification method, giving the client absolute evidence of destruction for compliance needs.',
      ],
      outcome:
        '"We needed a way to erase large volumes of file-level data without it becoming a bottleneck. D-Secure File Eraser handled over 250 TB smoothly, including some very large files, and gave us a clear record for every job."',
      productsUsed: ['File Eraser'],
      complianceStandards: ['Data Privacy Compliance', 'Audit-Ready Documentation', 'Policy-Driven Automation'],
    },
  },
];

// ─── Helper: Featured case studies nikalo ───
export const getFeaturedCaseStudies = (): CaseStudy[] =>
  caseStudies.filter((cs) => cs.featured);

// ─── Helper: Slug se case study dhundho ───
export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((cs) => cs.slug === slug);

// ─── Helper: Sirf detail page wali case studies (jinke paas detailContent hai) ───
export const getCaseStudiesWithDetail = (): CaseStudy[] =>
  caseStudies.filter((cs) => cs.detailContent != null);

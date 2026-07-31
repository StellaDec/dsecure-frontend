import React, { Suspense, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MANUAL_COMPONENTS } from '../../../routes/manualRegistry';
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from '../../../utils/seo';
import PageLoadingSkeleton from '../../../components/PageLoadingSkeleton';

// Manual Page Renderer Component
// Yeh component URL slug ke basis pe correct manual page render karta hai aur SEO apply karta hai.
const ManualPageRenderer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Check if component exists in registry
  const Component = useMemo(() => (slug ? MANUAL_COMPONENTS[slug] : null), [slug]);

  if (!slug || !Component) {
    // Agar slug invalid hai toh help-manual pe bhej do
    return <Navigate to="/support/help-manual" replace />;
  }

  // Manual whitelist array for SEO (17 slugs)
  const whitelist = [
    'installation', 'quickstart', 'cryptographic-erasure', 'windows-crypto-erasure',
    'windows-system-files', 'certificate-generation', 'windows-command-line',
    'government-defense', 'remote-management', 'scripting-automation',
    'physical-destruction', 'windows-filesystems', 'windows-builtin-tools',
    'windows-preparation', 'pre-installation', 'system-requirements', 'verification-overview'
  ];

  // Generate SEO for this page using the registry slug
  // Hum manual priority dete hain taaki components ke andar ke fallback SEO override ho sakein.
  const seoData = useMemo(() => {
    const baseSeo = getSEOForPage(slug);
    if (!whitelist.includes(slug)) {
      baseSeo.noindex = true;
    }
    return baseSeo;
  }, [slug]);

  return (
    <>
      <SEOHeadNative seo={seoData} />
      <Suspense fallback={<PageLoadingSkeleton />}>
        <Component />
      </Suspense>
    </>
  );
};

export default ManualPageRenderer;

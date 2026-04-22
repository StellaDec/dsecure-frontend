import React, { Suspense, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MANUAL_COMPONENTS } from '../../../routes/manualRegistry';
import SEOHead from '../../../components/SEOHead';
import { getSEOForPage } from '../../../utils/seo';
import Loading from '../../../components/Loading'; // Use existing loading component if available

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

  // Generate SEO for this page using the registry slug
  // Hum manual priority dete hain taaki components ke andar ke fallback SEO override ho sakein.
  const seoData = useMemo(() => getSEOForPage(slug), [slug]);

  return (
    <>
      <SEOHead seo={seoData} />
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </>
  );
};

export default ManualPageRenderer;

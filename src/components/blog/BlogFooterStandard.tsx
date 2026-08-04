import React from 'react';

import Reveal from '@/components/Reveal';
import { ExpertSolutionSection } from "./ExpertSolutionSection";
import RelatedArticles from './RelatedArticles';
import { FAQ } from '@/utils/seo.core';
import CommentSection from './CommentSection';
import FAQSection from './FAQSection';
import { blogFaqs } from '@/data/blogFaqs';
import EnquiryForm from './EnquiryForm';
import EngagementSection from './EngagementSection';
import ProductInternalLinks, { PRODUCT_LINKS } from "../ProductInternalLinks";
import StandardDeepDive from "./StandardDeepDive";
import { ThemeSection } from '@/components/ui/Theme';
import ThemeAwareLogoFooter from '@/components/ThemeAwareLogoFooter';

interface BlogFooterStandardProps {
  blogId: string;
  blogTitle: string;
  category?: string;
  tag?: string;
  faqs?: FAQ[];
}

const BlogFooterStandard: React.FC<BlogFooterStandardProps> = ({ 
  blogId, 
  blogTitle, 
  category, 
  tag,
  faqs 
}) => {
  // Use provided faqs or fallback to blogFaqs registry
  const displayFaqs = faqs || blogFaqs[blogId] || [];

  // Logic to determine relevant products for the internal linking section
  const getRelatedProducts = () => {
    const lowCat = category?.toLowerCase() || '';
    const lowTag = tag?.toLowerCase() || '';

    if (lowCat.includes('mobile') || lowTag.includes('mobile') || lowCat.includes('smartphone')) {
      return [PRODUCT_LINKS['smartphone-eraser'], PRODUCT_LINKS['smartphone-diagnostic'], PRODUCT_LINKS['drive-eraser']];
    }
    if (lowCat.includes('file') || lowTag.includes('privacy')) {
      return [PRODUCT_LINKS['file-eraser'], PRODUCT_LINKS['file-eraser-network'], PRODUCT_LINKS['drive-eraser']];
    }
    if (lowCat.includes('diagnostic')) {
      return [PRODUCT_LINKS['hardware-diagnostics'], PRODUCT_LINKS['smartphone-diagnostic'], PRODUCT_LINKS['drive-verifier']];
    }
    if (lowCat.includes('compliance') || lowCat.includes('nist') || lowTag.includes('itad')) {
      return [PRODUCT_LINKS['drive-eraser'], PRODUCT_LINKS['drive-verifier'], PRODUCT_LINKS['file-eraser']];
    }
    if (lowCat.includes('cloud') || lowCat.includes('vm')) {
      return [PRODUCT_LINKS['virtual-machine-eraser'], PRODUCT_LINKS['lun-eraser'], PRODUCT_LINKS['drive-eraser']];
    }
    
    // Default set
    return [PRODUCT_LINKS['drive-eraser'], PRODUCT_LINKS['smartphone-eraser'], PRODUCT_LINKS['file-eraser']];
  };

  const relatedProducts = getRelatedProducts();

  // Logic to determine primary product for ExpertSolutionSection
  const getPrimaryProduct = () => {
    const products = getRelatedProducts();
    return { link: products[0].href, label: products[0].label };
  };

  const productInfo = getPrimaryProduct();

  return (
    <div className="w-full">
      {/* Standard Deep Dive Content Expansion */}
      <ThemeSection>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <StandardDeepDive category={category} blogTitle={blogTitle} blogId={blogId} />
        </div>
      </ThemeSection>

      {/* Related Products - SEO Internal Linking */}
      {/* <ProductInternalLinks links={relatedProducts} heading={`Solutions for ${category || 'Your Enterprise'}`} /> */}

      {/* Expert Solution Section - High intent CTA */}
      {/* <ThemeSection alternate>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal>
            <ExpertSolutionSection 
              productLink={productInfo.link} 
              productLabel={productInfo.label} 
            />
          </Reveal>
        </div>
      </ThemeSection> */}

      {/* Related Articles - Internal Linking */}
      <ThemeSection>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal>
            <RelatedArticles 
              currentPostId={blogId} 
              category={category} 
              tag={tag} 
            />
          </Reveal>
        </div>
      </ThemeSection>

      {/* FAQ, Engagement & Comments */}
      <ThemeSection alternate>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Engagement (Likes/Dislikes) */}
          <Reveal>
            <div className="mb-12 border-b border-[#d0d5dc] pb-8">
              <EngagementSection blogId={blogId} />
            </div>
          </Reveal>

          {displayFaqs && displayFaqs.length > 0 && (
            <Reveal>
              <div className="mb-16">
                <FAQSection faqs={displayFaqs} />
              </div>
            </Reveal>
          )}
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div className="mt-4">
                <CommentSection blogId={blogId} />
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-4">
                <EnquiryForm blogId={blogId} blogTitle={blogTitle} />
              </div>
            </Reveal>
          </div>
        </div>
      </ThemeSection>
      
      {/* Footer Branding Area */}
      {/* 
      <ThemeSection>
        <div className="max-w-4xl mx-auto text-center px-4 py-12 bg-[#0e7c66] border border-[#0e7c66] rounded-none shadow-xl">
          <Reveal>
            <ThemeAwareLogoFooter className="mx-auto mb-6" size="lg" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Secure Your Data Lifecycle</h2>
            <p className="text-[#d4ede4] text-lg mb-0 max-w-2xl mx-auto">
              Trusted by global enterprises for zero-leakage data sanitization.
            </p>
          </Reveal>
        </div>
      </ThemeSection>
      */}
    </div>
  );
};

export default BlogFooterStandard;

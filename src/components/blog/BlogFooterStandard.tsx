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
      <section className="px-4 md:px-8 lg:px-16 pb-12">
        <StandardDeepDive category={category} blogTitle={blogTitle} blogId={blogId} />
      </section>

      {/* Related Products - SEO Internal Linking */}
      <ProductInternalLinks links={relatedProducts} heading={`Solutions for ${category || 'Your Enterprise'}`} />

      {/* Expert Solution Section - High intent CTA */}
      <section className="px-4 md:px-8 lg:px-16 py-12">
        <Reveal>
          <ExpertSolutionSection 
            productLink={productInfo.link} 
            productLabel={productInfo.label} 
          />
        </Reveal>
      </section>

      {/* Related Articles - Internal Linking */}
      <section className="px-4 md:px-8 lg:px-16 py-12 bg-white">
        <Reveal>
          <RelatedArticles 
            currentPostId={blogId} 
            category={category} 
            tag={tag} 
          />
        </Reveal>
      </section>

      {/* FAQ, Engagement & Comments */}
      <section className="px-4 md:px-8 lg:px-16 py-12 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          {/* Engagement (Likes/Dislikes) */}
          <Reveal>
            <div className="mb-12 border-b border-slate-200 pb-8">
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
      </section>
    </div>
  );
};

export default BlogFooterStandard;

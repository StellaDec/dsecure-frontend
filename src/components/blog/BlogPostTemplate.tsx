import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/Reveal";
import OptimizedImage from "@/components/OptimizedImage";
import { ThemeSection, themeClasses, ThemeSectionHeading } from "@/components/ui/Theme";

interface BlogPostTemplateProps {
  title: string;
  description: string;
  publishDate?: string;
  author?: string;
  image: string;
  keywords: string;
  canonicalUrl: string;
  tag?: string;
  children: React.ReactNode;
}

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  title,
  description,
  publishDate,
  author = "D-Secure Team",
  image,
  keywords,
  canonicalUrl,
  tag,
  children,
}) => {
  const seoData = {
    title: `${title} | D-Secure Tech Blog`,
    description,
    keywords,
    canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    author,
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead seo={seoData} />

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden bg-[#0e7c66] text-white border-b border-[#0e7c66]">
        <div className="absolute inset-0 bg-[#0e7c66]/90 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        
        <Reveal>
          <div className="relative z-20 max-w-4xl mx-auto text-center text-white">
            {tag && (
              <span className="inline-block py-1 px-3 rounded-none bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6">
                {tag}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
              {description}
            </p>
            {publishDate && (
              <div className="mt-6 text-white/70 text-sm flex items-center justify-center gap-4">
                <span>{publishDate}</span>
                <span>•</span>
                <span>{author}</span>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <ThemeSection alternate className="!py-12">
          <div className="max-w-[95%] lg:max-w-7xl mx-auto px-2 lg:px-8">
            <div className={`${themeClasses.card.base} p-8 md:p-12 shadow-sm text-justify`}>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672]">
                {children}
              </div>
            </div>
          </div>
      </ThemeSection>

      {/* Call to Action */}
      <ThemeSection className="text-center border-t border-[#d0d5dc]">
        <Reveal>
            <ThemeSectionHeading centered subtitle="Explore our compliance-verified erasure solutions compliant with global standards.">
              Need Professional Data Security?
            </ThemeSectionHeading>
             <a href="/solutions/enterprise" className={themeClasses.button.base + " " + themeClasses.button.primary}>
                View Solutions
            </a>
        </Reveal>
      </ThemeSection>
      <BlogFooterStandard 
        blogId="default-blog-id" 
        blogTitle="D-Secure Blog" 
      />
    </div>
  );
};

export default BlogPostTemplate;

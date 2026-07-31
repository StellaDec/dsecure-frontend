import React, { useMemo, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";
import BlogFooterStandard from "@/components/blog/BlogFooterStandard";
import { blogPosts } from "@/data/blogPosts";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getBlogSEO } from "@/utils/seo";
import { FAQ } from "@/utils/seo.core";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import { 
  Shield as ShieldIcon, 
  ArrowLeft as ArrowLeftIcon,
  Calendar as CalendarIcon,
  Share2 as ShareIcon,
  Clock as ClockIcon
} from "lucide-react";
import { ThemeIconContainer, themeClasses, ThemeSection } from "@/components/ui/Theme";

import { BlogRegistry } from "@/components/blog/BlogRegistry";
import PageLoadingSkeleton from "@/components/PageLoadingSkeleton";

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Relevant blog post ko dhoondna (Find the relevant blog post - Hindi comment as requested)
  const post = useMemo(() => {
    return blogPosts.find((p) => p.slug === slug);
  }, [slug]);

  // Generate dynamic SEO with specialized getBlogSEO utility for Article schema support
  const seoData = useMemo(() => {
    if (!post) return null;
    
    return getBlogSEO({
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      author: post.author,
      publishDate: post.publishDate,
      keywords: post.keywords,
      tag: post.tag
    });
  }, [post]);

  // Agar post nahi mila, to NotFoundPage render karein (If post not found, return NotFoundPage)
  if (!post || !seoData) {
    return <NotFoundPage />;
  }

  const SpecificBlogComponent = BlogRegistry[post.slug];

  if (SpecificBlogComponent) {
    return (
      <Suspense fallback={<PageLoadingSkeleton />}>
        <SpecificBlogComponent />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEOHeadNative seo={seoData} />

      {/* Breadcrumb Navigation — Blog SEO ke liye */}
      <div className="container mx-auto px-4 max-w-4xl pt-4 pb-1">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />
      </div>

      {/* Progress Bar (Subtle) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white z-50">
        <div className="h-full bg-[#0e7c66] w-1/3 transition-all duration-300"></div>
      </div>

      {/* Hero Header */}
      <header className="relative py-16 md:py-24 bg-[#0a2e1e] text-white overflow-hidden border-b border-[#0e7c66]">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 L100,0 L100,100 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Reveal>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-[#d4ede4] hover:text-white font-medium mb-8 transition-colors group"
            >
              <ArrowLeftIcon className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              Back to Technical Blog
            </Link>
          </Reveal>

          <Reveal delayMs={100}>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-none text-white text-xs font-bold uppercase tracking-wider">
                {post.tag}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-sm">
                <ClockIcon className="w-4 h-4" />
                {post.readTime || '5 min read'}
              </span>
            </div>
          </Reveal>

          <Reveal delayMs={200}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delayMs={300}>
            <div className="flex flex-wrap items-center gap-6 text-white/80 border-t border-white/10 pt-8 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0e7c66] flex items-center justify-center text-white font-bold border border-white/20">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{post.author}</div>
                  <div className="text-xs text-white/60">Security Research</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#d4ede4]" />
                <span className="text-sm">{post.publishDate}</span>
              </div>

              <div className="ml-auto flex items-center gap-4">
                <button className="p-2 rounded-none hover:bg-white/10 transition-colors border border-transparent hover:border-white/20" title="Share Article">
                  <ShareIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-16 bg-[#f4fbf8]">
        <ThemeSection alternate className="!pt-12 !pb-6">
          <div className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8">
            <Reveal>
              <article className={`${themeClasses.card.base} p-8 md:p-12 space-y-10 text-justify shadow-sm`}>
            {/* Lead Excerpt */}
            <p className="text-xl md:text-2xl text-[#5a6672] leading-relaxed font-medium italic border-l-4 border-[#0e7c66] pl-6 mb-12 bg-[#f4fbf8] p-4">
              {post.excerpt}
            </p>

            {/* Main Body (Placeholder for actual content if missing) */}
            <div className="text-[#5a6672] leading-relaxed space-y-8 prose prose-emerald max-w-none">
              {post.content ? (
                /* In a real app, this would be dangerouslySetInnerHTML or a Markdown renderer */
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }} />
              ) : (
                <>
                  <p>
                    Ensuring data security in the modern enterprise landscape requires more than just standard deletion. As storage technologies evolve, particularly with the widespread adoption of SSDs and NVMe drives, traditional overwriting methods often fall short of meeting global compliance standards.
                  </p>
                  
                  <h2 className="text-2xl font-bold text-[#0a2e1e] mt-12 mb-6">Strategic Importance</h2>
                  <p>
                    Data sanitization is not just a technical requirement—it's a critical component of risk management. Organizations that fail to implement compliance-verified erasure protocols remain vulnerable to data breaches even after assets have left their physical control. This is especially true for sectors like <strong>Finance, Healthcare, and Government</strong> where regulatory scrutiny is highest.
                  </p>

                  <div className="bg-[#d4ede4] rounded-none p-8 border border-[#0e7c66]/30 my-12 shadow-sm">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#0a2e1e]">
                      <ShieldIcon className="w-6 h-6 text-[#0e7c66]" />
                      The D-Secure Advantage
                    </h3>
                    <p className="text-[#0a2e1e] mb-0 font-medium">
                      Our proprietary erasure engines support 20+ international standards, providing audit-proof reports that guarantee 100% data destruction across all media types. By combining hardware acceleration with cryptographic sanitization, we deliver the industry's fastest and most secure decommissioning workflow.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold text-[#0a2e1e] mt-12 mb-6">Compliance Standards Mapping</h2>
                  <p>
                    Whether it's <strong>NIST 800-88, GDPR, or India's DPDP Act 2023</strong>, D-Secure maps technical erasure methods directly to regulatory obligations. Our platform generates digitally signed certificates that provide a complete chain of custody for every sanitized asset.
                  </p>

                  <h3 className="text-xl font-bold mt-8 mb-4 text-[#0a2e1e]">Key Takeaways:</h3>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>Factory resets are insufficient for modern SSD wear-leveling algorithms.</li>
                    <li>Cryptographic erasure offers a rapid and highly secure alternative to multi-pass overwriting.</li>
                    <li>Centralized audit trails are essential for proving compliance during data protection audits.</li>
                  </ul>
                </>
              )}
            </div>
            </article>
          </Reveal>
          </div>
        </ThemeSection>

        <ThemeSection alternate className="!py-6">
          <div className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8">
            {/* Standardized Blog Footer */}
          <BlogFooterStandard 
            blogId={post.id}
            blogTitle={post.title}
            category={post.category}
            tag={post.tag}
            faqs={seoData.faqs as FAQ[]}
          />
          </div>
        </ThemeSection>

        {/* Footer Navigation */}
        <ThemeSection alternate className="!py-10 border-t border-[#d0d5dc]">
          <div className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
              <ThemeIconContainer icon={ShieldIcon} size="lg" />
              <div>
                <h4 className="font-bold text-[#0a2e1e]">Secure Your Data Lifecycle</h4>
                <p className="text-sm text-[#5a6672]">Learn how D-Secure protects your business.</p>
              </div>
            </div>
            
            <Link 
              to="/contact" 
              className={themeClasses.button.base + " " + themeClasses.button.primary}
            >
              Consult an Expert
            </Link>
            </div>
          </div>
        </ThemeSection>
      </main>
    </div>
  );
};

export default BlogPostDetail;

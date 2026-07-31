import React, { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { getSEOForPage } from "@/utils/seo";
import { SEOHead } from "@/components/SEOHead";
import { blogPosts } from "@/data/blogPosts";
import { BookOpen, Search } from "lucide-react";

const BlogPage: React.FC = () => {
  const [search, setSearch] = useState("");

  // सभी posts ko search filter karo
  const filtered = blogPosts.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <SEOHead seo={getSEOForPage("blog")} />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 text-center bg-white border-b border-[#d4ede4]">
          <Reveal>
            <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
              Knowledge Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a2e1e] mb-4">
              D-Secure Blog
            </h1>
            <p className="text-lg md:text-xl text-[#5a6672] max-w-2xl mx-auto mb-8">
              Insights and practical guides on data erasure, cybersecurity, and
              IT asset lifecycle management.
            </p>
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-[#d0d5dc] focus:border-[#0e7c66] focus:ring-1 focus:ring-[#0e7c66] outline-none text-[#0a2e1e] rounded-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5a6672]" />
            </div>
          </Reveal>
        </section>

        {/* Blog Cards */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#5a6672]">
              <p className="text-xl">No articles found for "{search}"</p>
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-[#0e7c66] underline text-sm"
              >
                Clear search
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-[#5a6672] mb-8">
                Showing <strong>{filtered.length}</strong> article{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((blog, idx) => (
                  <Reveal key={blog.id} delayMs={idx * 20}>
                    <Link
                      to={blog.link}
                      className="group flex flex-col h-full bg-white border border-[#d4ede4] hover:border-[#0e7c66] hover:shadow-lg transition-all duration-300 relative"
                    >
                      {/* Category badge */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-block px-3 py-1 text-xs font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full">
                            {blog.tag}
                          </span>
                          {blog.readTime && (
                            <span className="text-xs text-[#5a6672]">
                              {blog.readTime}
                            </span>
                          )}
                        </div>
                        <h2 className="text-lg font-bold text-[#0a2e1e] mb-3 leading-snug group-hover:text-[#0e7c66] transition-colors duration-200 flex-1">
                          {blog.title}
                        </h2>
                        <p className="text-sm text-[#5a6672] leading-relaxed mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>
                        <div className="mt-auto pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
                          <span className="text-xs text-[#5a6672]">
                            {blog.publishDate}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[#0e7c66] text-sm font-semibold group-hover:underline">
                            <BookOpen className="w-4 h-4" />
                            Read Article
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#0a2e1e] text-center mt-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Informed with D-Secure
            </h2>
            <p className="text-lg text-[#d4ede4] mb-6 max-w-2xl mx-auto">
              Subscribe to get updates on secure data erasure best practices and
              cybersecurity insights.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-[#0a2e1e] px-6 py-3 rounded-none font-semibold hover:bg-[#d4ede4] transition-colors"
            >
              Contact Us
            </Link>
          </Reveal>
        </section>
      </div>
    </>
  );
};

export default BlogPage;

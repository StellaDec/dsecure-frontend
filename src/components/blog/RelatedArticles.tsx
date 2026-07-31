import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { ThemeCard, ThemeSectionHeading } from '@/components/ui/Theme';

interface RelatedArticlesProps {
  currentPostId: string;
  category?: string;
  tag?: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentPostId, category, tag }) => {
  const relatedPosts = useMemo(() => {
    return blogPosts
      .filter(p => p.id !== currentPostId && (p.category === category || p.tag === tag))
      .slice(0, 3);
  }, [currentPostId, category, tag]);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-12 pt-12 border-t border-[#d0d5dc]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <ThemeSectionHeading className="mb-0 md:mb-0">Related Articles</ThemeSectionHeading>
        <Link to="/blog" className="text-[#0e7c66] font-bold hover:text-[#0a2e1e] flex items-center gap-2 transition-colors">
          View All Blog Posts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link 
            key={post.id}
            to={post.link}
            className="group block"
          >
            <ThemeCard className="h-full hover:border-[#0e7c66] transition-colors">
              <div className="flex items-center gap-2 text-[#0e7c66] text-[10px] font-bold uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0e7c66]" />
                {post.tag}
              </div>
              <h3 className="text-xl font-bold text-[#0a2e1e] group-hover:text-[#0e7c66] transition-colors mb-4 line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <div className="mt-auto pt-4 border-t border-[#d0d5dc]/40 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-[#5a6672] uppercase tracking-tighter">By {post.author}</span>
                  <span className="text-[10px] text-[#5a6672]">{post.publishDate}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-[#0e7c66] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </ThemeCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;

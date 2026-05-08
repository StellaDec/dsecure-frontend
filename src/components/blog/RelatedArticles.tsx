import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import { ArrowRightIcon, ShieldIcon } from '@/components/FlatIcons';
import { blogPosts } from '@/data/blogPosts';

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
    <div className="mt-24 pt-16 border-t border-slate-100">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Related Articles</h2>
        <Link to="/blog" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-2">
          View All Blog Posts <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link 
            key={post.id}
            to={post.link}
            className="group flex flex-col p-6 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {post.tag}
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-4 line-clamp-2 leading-snug">
              {post.title}
            </h3>
            <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">By {post.author}</span>
                <span className="text-[10px] text-slate-300">{post.publishDate}</span>
              </div>
              <ArrowRightIcon className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;

'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import type { BlogPostFrontmatter } from "@/lib/blog-types";
import FeaturedArticleCard from "@/components/blog/FeaturedArticleCard";
import ArticleCard from "@/components/blog/ArticleCard";

const POSTS_PER_PAGE = 6;

interface BlogListingClientProps {
  posts: BlogPostFrontmatter[];
}

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const remainingPosts = posts.length > 1 ? posts.slice(1) : [];
  const visiblePosts = remainingPosts.slice(0, visibleCount);
  const hasMore = visibleCount < remainingPosts.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:50px_50px] opacity-40 dark:opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-text-main tracking-tighter">
            Insights &amp; Updates
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            Expert perspectives on Bangladesh&apos;s real estate market, property investment
            guides, company news, and community events from the AHS Properties team.
          </p>
        </div>

        {/* Featured Article */}
        {featuredPost && (
          <div className="mb-12">
            <FeaturedArticleCard post={featuredPost} />
          </div>
        )}

        {/* Article Grid */}
        {visiblePosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePosts.map((post, i) => (
                <ArticleCard key={post.slug} post={post} index={i} />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center mt-12"
              >
                <button
                  onClick={loadMore}
                  className="px-8 py-3 rounded-full bg-surface-alt border border-border-main text-sm font-semibold text-text-main hover:bg-accent hover:text-text-on-accent hover:border-accent transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                >
                  Load More Articles
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">
              No articles found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
